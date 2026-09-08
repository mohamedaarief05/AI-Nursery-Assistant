'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { KeyRound, CheckCircle2, Lock, ArrowRight, Leaf } from 'lucide-react'
import Link from 'next/link'

export default function UpdatePasswordPage() {
  const router = RouterHook()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  function RouterHook() {
    try {
      return useRouter()
    } catch {
      return null
    }
  }

  // Handle hash parameters if Supabase auth returned access_token in URL hash
  useEffect(() => {
    const supabase = createClient()
    const handleAuthChange = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session && window.location.hash) {
        // Parse hash params if present
        const hash = window.location.hash.substring(1)
        const params = new URLSearchParams(hash)
        const accessToken = params.get('access_token')
        const refreshToken = params.get('refresh_token')
        if (accessToken && refreshToken) {
          await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          })
        }
      }
    }
    handleAuthChange()
  }, [])

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long.')
      return
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match. Please enter matching passwords.')
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ password })

      if (error) {
        setMessage(error.message)
        setLoading(false)
        return
      }

      setIsSuccess(true)
      setLoading(false)
    } catch (err: any) {
      setMessage(err?.message || 'An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FDFCF8]">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-100">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mx-auto mb-4">
            <Lock className="h-7 w-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Set New Password
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Please enter and confirm your new password below to update your account.
          </p>
        </div>

        {isSuccess ? (
          <div className="space-y-6">
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-extrabold text-slate-800 text-base">Password Updated Successfully!</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your account password has been updated. You can now access your profile or log in with your new credentials.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/profile"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-xs"
              >
                Go to My Account <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition text-center"
              >
                Sign In Now
              </Link>
            </div>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleUpdatePassword}>
            {message && (
              <p className="bg-red-50 text-red-600 p-4 text-center rounded-2xl text-xs sm:text-sm border border-red-100 leading-relaxed font-medium">
                {message}
              </p>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="new-password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  placeholder="Enter new password (min 6 chars)..."
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  placeholder="Re-enter new password..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 border border-transparent text-xs sm:text-sm font-extrabold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Updating Password...' : 'Save New Password & Sign In'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
