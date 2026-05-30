'use server'

import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@dingbro.com'

export async function login(formData: FormData) {
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const password = String(formData.get('password') || '')

  if (email !== ADMIN_EMAIL) {
    redirect('/admin/login?error=' + encodeURIComponent('Access denied. This account is not permitted.'))
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect('/admin/login?error=' + encodeURIComponent(error.message))
  }

  redirect('/admin')
}
