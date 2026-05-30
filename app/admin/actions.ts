'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@dingbro.com'

async function assertAdmin() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== ADMIN_EMAIL) throw new Error('Not authorised')
  return user
}

function revalidateAll() {
  revalidatePath('/', 'layout')
  revalidatePath('/admin')
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 60)
}

// ── HERO IMAGE ──
export async function uploadHero(formData: FormData) {
  await assertAdmin()
  const file = formData.get('file') as File
  if (!file || file.size === 0) throw new Error('No file')

  const admin = createSupabaseAdminClient()
  const ext = file.name.split('.').pop() || 'jpg'
  const path = `hero-${Date.now()}.${ext}`
  const buf = Buffer.from(await file.arrayBuffer())

  const up = await admin.storage.from('hero').upload(path, buf, {
    contentType: file.type || 'image/jpeg',
    upsert: true,
  })
  if (up.error) throw up.error

  const { data: pub } = admin.storage.from('hero').getPublicUrl(path)

  await admin.from('site_config').upsert({
    key: 'hero_image_url',
    value: pub.publicUrl,
    updated_at: new Date().toISOString(),
  })

  revalidateAll()
}

// ── SPONSORS ──
export async function createSponsor(formData: FormData) {
  await assertAdmin()
  const name = String(formData.get('name') || '').trim()
  const track = String(formData.get('track') || 'A')
  const width = parseInt(String(formData.get('width') || '150'), 10)
  const file = formData.get('logo') as File

  if (!name) throw new Error('Name required')
  if (!file || file.size === 0) throw new Error('Logo file required')
  if (!['A', 'B'].includes(track)) throw new Error('Invalid track')

  const admin = createSupabaseAdminClient()
  const ext = file.name.split('.').pop()?.toLowerCase() || 'png'
  const path = `${slug(name)}-${Date.now()}.${ext}`
  const buf = Buffer.from(await file.arrayBuffer())

  const up = await admin.storage.from('logos').upload(path, buf, {
    contentType: file.type || 'image/png',
    upsert: false,
  })
  if (up.error) throw up.error

  const { data: pub } = admin.storage.from('logos').getPublicUrl(path)

  const ins = await admin.from('sponsors').insert({
    name,
    track,
    display_width: Number.isFinite(width) ? width : 150,
    logo_url: pub.publicUrl,
    storage_path: path,
  })
  if (ins.error) throw ins.error

  revalidateAll()
}

export async function deleteSponsor(formData: FormData) {
  await assertAdmin()
  const id = String(formData.get('id') || '')
  const path = String(formData.get('path') || '')
  if (!id) throw new Error('Missing id')

  const admin = createSupabaseAdminClient()
  if (path) await admin.storage.from('logos').remove([path])
  const del = await admin.from('sponsors').delete().eq('id', id)
  if (del.error) throw del.error

  revalidateAll()
}

// ── SERVICES ──
export async function createService(formData: FormData) {
  await assertAdmin()
  const title = String(formData.get('title') || '').trim()
  const body = String(formData.get('body') || '').trim()
  const icon = String(formData.get('icon') || 'wrench').trim()
  if (!title || !body) throw new Error('Title and body required')

  const admin = createSupabaseAdminClient()
  const ins = await admin.from('services').insert({ title, body, icon })
  if (ins.error) throw ins.error

  revalidateAll()
}

export async function deleteService(formData: FormData) {
  await assertAdmin()
  const id = String(formData.get('id') || '')
  if (!id) throw new Error('Missing id')

  const admin = createSupabaseAdminClient()
  const del = await admin.from('services').delete().eq('id', id)
  if (del.error) throw del.error

  revalidateAll()
}

// ── PRODUCTS ──
export async function createProduct(formData: FormData) {
  await assertAdmin()
  const name = String(formData.get('name') || '').trim()
  const category = String(formData.get('category') || '').trim()
  const description = String(formData.get('description') || '').trim()
  const file = formData.get('image') as File | null
  if (!name) throw new Error('Product name required')

  const admin = createSupabaseAdminClient()
  let image_url: string | null = null

  if (file && file.size > 0) {
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const path = `${slug(name)}-${Date.now()}.${ext}`
    const buf = Buffer.from(await file.arrayBuffer())
    const up = await admin.storage.from('products').upload(path, buf, {
      contentType: file.type || 'image/jpeg',
      upsert: false,
    })
    if (up.error) throw up.error
    const { data: pub } = admin.storage.from('products').getPublicUrl(path)
    image_url = pub.publicUrl
  }

  const ins = await admin.from('products').insert({ name, category, description, image_url })
  if (ins.error) throw ins.error

  revalidateAll()
}

export async function deleteProduct(formData: FormData) {
  await assertAdmin()
  const id = String(formData.get('id') || '')
  if (!id) throw new Error('Missing id')

  const admin = createSupabaseAdminClient()
  const del = await admin.from('products').delete().eq('id', id)
  if (del.error) throw del.error

  revalidateAll()
}
