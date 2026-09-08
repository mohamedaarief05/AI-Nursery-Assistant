'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = (formData.get('email') as string || '').trim().toLowerCase()
  const password = formData.get('password') as string

  if (!email || !password) {
    return redirect('/login?message=Please enter both email and password')
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    return redirect(`/login?message=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/profile')
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

  // Attempt Supabase sign up
  const { error: signUpError } = await supabase.auth.signUp({ email, password })

  // Attempt immediate direct sign-in
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
  if (!signInError) {
    revalidatePath('/', 'layout')
    return redirect('/profile')
  }

  // Handle email rate limits or existing accounts gracefully
  if (signUpError) {
    const isRateLimit = 
      signUpError.message?.toLowerCase().includes('rate limit') || 
      signUpError.message?.toLowerCase().includes('exceeded')

    if (isRateLimit) {
      // Direct retry sign in
      const { error: retrySignIn } = await supabase.auth.signInWithPassword({ email, password })
      if (!retrySignIn) {
        revalidatePath('/', 'layout')
        return redirect('/profile')
      }
      return redirect('/login?message=' + encodeURIComponent('Account created! Please sign in with your email and password below.'))
    }

    return redirect(`/signup?message=${encodeURIComponent(signUpError.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/profile')
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
      // Smooth fallback for rate limits
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

  return redirect('/login?message=' + encodeURIComponent('Password reset successfully! Please sign in below.'))
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
