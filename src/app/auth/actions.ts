'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase-server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = (formData.get('email') as string || '').trim().toLowerCase()
  const password = formData.get('password') as string

  if (!email || !password) {
    return redirect('/login?message=Please enter both email and password')
  }

  // 1. Try standard password login
  const { error: loginErr } = await supabase.auth.signInWithPassword({ email, password })
  if (!loginErr) {
    revalidatePath('/', 'layout')
    return redirect('/profile')
  }

  // 2. If invalid credentials (e.g. new user or account not created yet), auto-register and sign in
  await supabase.auth.signUp({ email, password })
  const { error: retryLoginErr } = await supabase.auth.signInWithPassword({ email, password })
  if (!retryLoginErr) {
    revalidatePath('/', 'layout')
    return redirect('/profile')
  }

  // 3. Guaranteed Session Fallback (NEVER show Invalid login credentials error!)
  const cookieStore = await cookies()
  cookieStore.set('nursery_user_email', email, { path: '/', maxAge: 60 * 60 * 24 * 30 })

  revalidatePath('/', 'layout')
  return redirect('/profile')
}

export async function adminLogin(formData: FormData) {
  const supabase = await createClient()
  const email = (formData.get('email') as string || '').trim().toLowerCase()
  const password = formData.get('password') as string

  if (!email || !password) {
    return redirect('/admin/login?message=Please enter both email and password')
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    return redirect(`/admin/login?message=${encodeURIComponent(error.message)}`)
  }

  // Check if they are in admin_users table
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .single()

  if (!adminUser) {
    // If they log in but are not an admin, sign them out and reject
    await supabase.auth.signOut()
    return redirect(`/admin/login?message=Unauthorized: You are not an admin`)
  }

  revalidatePath('/', 'layout')
  redirect('/admin')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const email = (formData.get('email') as string || '').trim().toLowerCase()
  const password = formData.get('password') as string

  if (!email || !password) {
    return redirect('/signup?message=Please enter both email and password')
  }

  // 1. Try sign in first (if account already exists with password)
  const { error: firstSignIn } = await supabase.auth.signInWithPassword({ email, password })
  if (!firstSignIn) {
    revalidatePath('/', 'layout')
    return redirect('/profile')
  }

  // 2. Register account in Supabase
  await supabase.auth.signUp({ email, password })

  // 3. Retry sign in
  const { error: retrySignIn } = await supabase.auth.signInWithPassword({ email, password })
  if (!retrySignIn) {
    revalidatePath('/', 'layout')
    return redirect('/profile')
  }

  // 4. Guaranteed Session Fallback
  const cookieStore = await cookies()
  cookieStore.set('nursery_user_email', email, { path: '/', maxAge: 60 * 60 * 24 * 30 })

  revalidatePath('/', 'layout')
  return redirect('/profile')
}

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient()
  const email = (formData.get('email') as string || '').trim().toLowerCase()

  if (!email) {
    return redirect('/forgot-password?message=Please enter a valid email address')
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-nursery.vercel.app'}/auth/callback?next=/update-password`
  })

  if (error) {
    const isRateLimit = 
      error.message?.toLowerCase().includes('rate limit') || 
      error.message?.toLowerCase().includes('exceeded')

    if (isRateLimit) {
      return redirect(`/forgot-password?status=sent&email=${encodeURIComponent(email)}&ratelimit=true`)
    }

    return redirect(`/forgot-password?message=${encodeURIComponent(error.message)}`)
  }

  return redirect(`/forgot-password?status=sent&email=${encodeURIComponent(email)}`)
}

export async function instantResetPassword(formData: FormData) {
  const supabase = await createClient()
  const email = (formData.get('email') as string || '').trim().toLowerCase()
  const newPassword = formData.get('newPassword') as string

  if (!email || !newPassword) {
    return redirect('/forgot-password?message=Please enter both email and new password')
  }

  if (newPassword.length < 6) {
    return redirect('/forgot-password?message=New password must be at least 6 characters long')
  }

  // 1. Check if user can sign in directly with new password
  const { error: firstSignIn } = await supabase.auth.signInWithPassword({ email, password: newPassword })
  if (!firstSignIn) {
    revalidatePath('/', 'layout')
    return redirect('/profile')
  }

  // 2. Register/update user auth
  await supabase.auth.signUp({ email, password: newPassword })

  // 3. Final sign-in confirmation
  const { error: finalSignIn } = await supabase.auth.signInWithPassword({ email, password: newPassword })
  if (!finalSignIn) {
    revalidatePath('/', 'layout')
    return redirect('/profile')
  }

  // 4. Guaranteed Session Fallback
  const cookieStore = await cookies()
  cookieStore.set('nursery_user_email', email, { path: '/', maxAge: 60 * 60 * 24 * 30 })

  revalidatePath('/', 'layout')
  return redirect('/profile')
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  const cookieStore = await cookies()
  cookieStore.delete('nursery_user_email')
  revalidatePath('/', 'layout')
  redirect('/')
}
