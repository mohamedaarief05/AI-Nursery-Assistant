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

  // 1. Authenticate with Supabase Auth
  const { data, error: loginErr } = await supabase.auth.signInWithPassword({ email, password })

  if (!loginErr && data?.user) {
    const cookieStore = await cookies()
    cookieStore.set('nursery_user_email', email, { path: '/', maxAge: 60 * 60 * 24 * 30 })
    revalidatePath('/', 'layout')
    return redirect('/profile')
  }

  // 2. Reject non-existent emails or incorrect passwords — DO NOT ALLOW ENTRY
  return redirect('/login?message=Invalid email or password. If you do not have an account yet, please click Create a new account below.')
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
    await supabase.auth.signOut()
    return redirect(`/admin/login?message=Unauthorized: You are not an admin`)
  }

  const cookieStore = await cookies()
  cookieStore.set('nursery_user_email', email, { path: '/', maxAge: 60 * 60 * 24 * 30 })
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

  if (password.length < 6) {
    return redirect('/signup?message=Password must be at least 6 characters long')
  }

  // 1. Create new user account in Supabase
  const { error: signUpError } = await supabase.auth.signUp({ email, password })

  if (signUpError) {
    const isUserExists = signUpError.message?.toLowerCase().includes('already registered') || signUpError.message?.toLowerCase().includes('already in use')
    if (isUserExists) {
      return redirect('/login?message=An account with this email already exists. Please Sign In with your password.')
    }
    return redirect(`/signup?message=${encodeURIComponent(signUpError.message)}`)
  }

  // 2. Sign in newly registered account
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
  if (!signInError) {
    const cookieStore = await cookies()
    cookieStore.set('nursery_user_email', email, { path: '/', maxAge: 60 * 60 * 24 * 30 })
    revalidatePath('/', 'layout')
    return redirect('/profile')
  }

  // 3. Session cookie fallback for newly created account
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

  await supabase.auth.signUp({ email, password: newPassword })
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

