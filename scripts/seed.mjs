#!/usr/bin/env node
// One-time seed script.
//
//   1. Paste supabase/schema.sql into the Supabase SQL editor and run it.
//   2. Set ADMIN_PASSWORD in your shell, then:
//        node scripts/seed.mjs
//   3. Sign in at /admin/login with admin@dingbro.com + that password.

import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { extname } from 'node:path'

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@dingbro.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

if (!URL || !KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY (load .env.local first)')
  process.exit(1)
}

const supabase = createClient(URL, KEY, { auth: { persistSession: false } })

const sponsors = [
  { name: 'Police Scotland',          track: 'A', width: 140, url: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/89/Logo_of_Police_Scotland.svg/500px-Logo_of_Police_Scotland.svg.png' },
  { name: 'Scottish Ambulance Service',track: 'A', width: 170, url: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/75/Scottish_Ambulance_Service_logo.svg/1280px-Scottish_Ambulance_Service_logo.svg.png' },
  { name: 'Scottish Fire and Rescue', track: 'A', width: 170, url: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Scottish_Fire_and_Rescue_Service_logo.svg/1280px-Scottish_Fire_and_Rescue_Service_logo.svg.png' },
  { name: 'Scotland Excel',           track: 'A', width: 160, url: 'https://home.scotland-excel.org.uk/images/Logo.png' },
  { name: 'TAQA Offshore',            track: 'A', width: 120, url: 'https://i.postimg.cc/KjjfrcZN/taqa-small-logo.webp' },
  { name: 'Tidewater Marine',         track: 'A', width: 150, url: 'https://i.postimg.cc/SNwdCpHB/tidee.png' },
  { name: 'Vroon Offshore Services',  track: 'A', width: 150, url: 'https://i.postimg.cc/d3g228NC/vroon-removebg-preview.png' },
  { name: 'Bosch',                    track: 'B', width: 130, url: 'https://i.postimg.cc/0yySzXNq/Bosch-logo-svg.png' },
  { name: 'Delphi Technologies',      track: 'B', width: 150, url: 'https://i.postimg.cc/Rhm64XYQ/delph-removebg-preview.png' },
  { name: 'Mann + Hummel',            track: 'B', width: 160, url: 'https://i.postimg.cc/qBKxrFNC/mannn.png' },
  { name: 'AkzoNobel',                track: 'B', width: 150, url: 'https://i.postimg.cc/Rqrt6vqg/Akzo-Nobel-Logo.png' },
  { name: 'PPG Refinish',             track: 'B', width: 130, url: 'https://i.postimg.cc/wvZ22873/asw-removebg-preview.png' },
  { name: 'MaxMeyer',                 track: 'B', width: 140, url: 'https://i.postimg.cc/rwR8Z5hv/Max-Meyer-4col-logo-1.png' },
  { name: 'NGK Spark Plugs',          track: 'B', width: 70,  url: 'https://i.postimg.cc/GhsNZzC7/NGK-Spark-Plugs-(Circle).webp' },
  { name: 'Hella',                    track: 'B', width: 120, url: 'https://i.postimg.cc/BbZSmyk0/Hella-logo-svg.png' },
  { name: 'Exide Technologies',       track: 'B', width: 150, url: 'https://i.postimg.cc/nhNLn3jQ/exxx-removebg-preview.png' },
]

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 60)
}

async function ensureAdminUser() {
  if (!ADMIN_PASSWORD) {
    console.log('• ADMIN_PASSWORD not set — skipping admin user creation.')
    return
  }
  const { data: list } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 })
  const existing = list?.users?.find((u) => u.email === ADMIN_EMAIL)
  if (existing) {
    const { error } = await supabase.auth.admin.updateUserById(existing.id, { password: ADMIN_PASSWORD, email_confirm: true })
    if (error) throw error
    console.log(`✓ Updated password for ${ADMIN_EMAIL}`)
  } else {
    const { error } = await supabase.auth.admin.createUser({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD, email_confirm: true })
    if (error) throw error
    console.log(`✓ Created admin user ${ADMIN_EMAIL}`)
  }
}

async function uploadSponsor(s) {
  const res = await fetch(s.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Dingbro/seed)' } })
  if (!res.ok) throw new Error(`fetch ${s.url} → ${res.status}`)
  const contentType = res.headers.get('content-type') || 'image/png'
  const ext = (extname(new URL(s.url).pathname) || `.${contentType.split('/')[1] || 'png'}`).replace('.', '')
  const buf = Buffer.from(await res.arrayBuffer())
  const path = `${slug(s.name)}.${ext}`

  const up = await supabase.storage.from('logos').upload(path, buf, { contentType, upsert: true })
  if (up.error) throw up.error

  const { data: pub } = supabase.storage.from('logos').getPublicUrl(path)
  return { path, publicUrl: pub.publicUrl }
}

async function seedSponsors() {
  console.log(`• Seeding ${sponsors.length} sponsors…`)
  // wipe existing seeded rows so re-runs don't duplicate
  await supabase.from('sponsors').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  for (let i = 0; i < sponsors.length; i++) {
    const s = sponsors[i]
    try {
      const { path, publicUrl } = await uploadSponsor(s)
      const ins = await supabase.from('sponsors').insert({
        name: s.name,
        track: s.track,
        display_width: s.width,
        logo_url: publicUrl,
        storage_path: path,
        position: i,
      })
      if (ins.error) throw ins.error
      console.log(`  ✓ ${s.name}`)
    } catch (err) {
      console.warn(`  ✗ ${s.name} — ${err.message || err}`)
    }
  }
}

async function main() {
  await ensureAdminUser()
  await seedSponsors()
  console.log('\nDone. Visit /admin/login to sign in.')
}

main().catch((e) => { console.error(e); process.exit(1) })
