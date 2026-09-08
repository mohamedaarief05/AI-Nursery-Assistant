import { login } from '@/app/auth/actions'
import Link from 'next/link'
import { Leaf } from 'lucide-react'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const params = await searchParams;
  const isPositiveMessage = params?.message?.includes('ready') || params?.message?.includes('complete') || params?.message?.includes('sent');

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FDFCF8]">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-100">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mx-auto mb-4">
            <Leaf className="h-7 w-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Or{' '}
            <Link href="/signup" className="font-bold text-emerald-700 hover:underline">
              create a new account
            </Link>
          </p>
        </div>

        <form className="space-y-6" action={login}>
          {params?.message && (
            <p className={`p-4 text-center rounded-2xl text-xs sm:text-sm border leading-relaxed ${
              isPositiveMessage 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold' 
                : 'bg-red-50 text-red-600 border-red-100 font-medium'
            }`}>
              {params.message}
            </p>
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
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline transition"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                placeholder="Enter your password..."
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3.5 px-4 border border-transparent text-xs sm:text-sm font-extrabold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition shadow-xs"
            >
              Sign in
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Need help? Contact nursery support at <a href="mailto:hello@ainursery.example.com" className="text-emerald-700 font-bold hover:underline">hello@ainursery.example.com</a>
          </div>
        </form>
      </div>
    </div>
  )
}
