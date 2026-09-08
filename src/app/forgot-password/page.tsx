import { forgotPassword } from '@/app/auth/actions'
import Link from 'next/link'
import { KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react'

export default async function ForgotPasswordPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string; status?: string; email?: string }>
}) {
  const params = await searchParams;
  const isSent = params?.status === 'sent';
  const sentEmail = params?.email || '';

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FDFCF8]">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-100">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mx-auto mb-4">
            <KeyRound className="h-7 w-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Forgot Password?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Enter your account email address and we'll send you instructions to reset your password.
          </p>
        </div>

        {isSent ? (
          <div className="space-y-6">
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">Reset Request Sent</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If an account exists for <strong className="text-emerald-800">{sentEmail}</strong>, password reset instructions have been dispatched.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/login"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-xs"
              >
                Return to Sign In
              </Link>
              <Link
                href="/signup"
                className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition text-center"
              >
                Create a New Account
              </Link>
            </div>
          </div>
        ) : (
          <form className="space-y-6" action={forgotPassword}>
            {params?.message && (
              <p className="bg-red-50 text-red-600 p-4 text-center rounded-xl text-xs sm:text-sm border border-red-100 leading-relaxed">
                {params.message}
              </p>
            )}

            <div>
              <label htmlFor="email-address" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Account Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                placeholder="Enter your registered email address..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 border border-transparent text-xs sm:text-sm font-extrabold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition shadow-xs flex items-center justify-center gap-2"
            >
              Send Password Reset Link
            </button>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
              <Link href="/login" className="text-slate-600 hover:text-emerald-700 transition flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
              </Link>
              <Link href="/signup" className="text-emerald-700 hover:underline">
                Create Account
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
