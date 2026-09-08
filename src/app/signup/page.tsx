import { signup } from '@/app/auth/actions'
import Link from 'next/link'
import { Sprout } from 'lucide-react'

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const params = await searchParams;
  const isRateLimitError = params?.message?.toLowerCase().includes('rate limit') || params?.message?.toLowerCase().includes('exceeded');

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FDFCF8]">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-100">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mx-auto mb-4">
            <Sprout className="h-7 w-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Create an account
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-emerald-700 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <form className="space-y-6" action={signup}>
          {params?.message && (
            <div className="p-4 rounded-2xl text-xs sm:text-sm border leading-relaxed bg-red-50 text-red-700 border-red-200">
              <p className="font-bold mb-1">
                {isRateLimitError ? 'Email Service Rate Limit Notice' : 'Signup Note'}
              </p>
              <p className="text-slate-700">{params.message}</p>
              {isRateLimitError && (
                <div className="mt-3 pt-2 border-t border-red-200/60">
                  <Link href="/login" className="text-xs font-extrabold text-emerald-700 hover:underline inline-flex items-center gap-1">
                    Click here to Sign In with your credentials →
                  </Link>
                </div>
              )}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                placeholder="Enter your email address..."
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                placeholder="Create a password (min 6 characters)"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3.5 px-4 border border-transparent text-xs sm:text-sm font-extrabold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition shadow-xs"
            >
              Sign up
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
            <Link href="/forgot-password" className="text-slate-500 hover:text-emerald-700 transition">
              Forgot password?
            </Link>
            <Link href="/login" className="text-emerald-700 hover:underline">
              Sign In Instead
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
