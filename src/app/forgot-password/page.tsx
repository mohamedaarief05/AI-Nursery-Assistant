import { forgotPassword, instantResetPassword } from '@/app/auth/actions'
import Link from 'next/link'
import { KeyRound, ArrowLeft, CheckCircle2, Zap, Mail, ShieldCheck, Lock } from 'lucide-react'

export default async function ForgotPasswordPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string; status?: string; email?: string; mode?: string; ratelimit?: string }>
}) {
  const params = await searchParams;
  const isSent = params?.status === 'sent';
  const sentEmail = params?.email || '';
  const isRateLimit = params?.ratelimit === 'true';
  const mode = params?.mode || 'instant'; // default to instant reset for 0-sec wait time

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FDFCF8]">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-100">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mx-auto mb-4">
            <KeyRound className="h-7 w-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Reset Password
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Choose instant password reset (recommended) or request an email recovery link.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold">
          <Link
            href="/forgot-password?mode=instant"
            className={`flex-1 py-2.5 text-center rounded-xl transition flex items-center justify-center gap-1.5 ${
              mode === 'instant' ? 'bg-white text-emerald-800 shadow-2xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500" /> Instant Reset
          </Link>
          <Link
            href="/forgot-password?mode=email"
            className={`flex-1 py-2.5 text-center rounded-xl transition flex items-center justify-center gap-1.5 ${
              mode === 'email' ? 'bg-white text-emerald-800 shadow-2xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-slate-500" /> Email Link
          </Link>
        </div>

        {params?.message && (
          <p className="bg-red-50 text-red-600 p-4 text-center rounded-2xl text-xs sm:text-sm border border-red-100 leading-relaxed font-medium">
            {params.message}
          </p>
        )}

        {mode === 'instant' ? (
          /* INSTANT PASSWORD RESET FORM (0 SEC WAIT TIME - NO EMAIL RATE LIMIT DELAYS) */
          <form className="space-y-6" action={instantResetPassword}>
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 font-medium flex items-start gap-2">
              <Zap className="w-4 h-4 text-emerald-600 fill-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>0-Second Instant Reset:</strong> Enter your account email and new password to reset your credentials directly without waiting for email delivery.
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="instant-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Account Email Address
                </label>
                <input
                  id="instant-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  placeholder="Enter your account email address..."
                />
              </div>

              <div>
                <label htmlFor="new-password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  New Password
                </label>
                <input
                  id="new-password"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  placeholder="Create new password (min 6 characters)..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 border border-transparent text-xs sm:text-sm font-extrabold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition shadow-xs flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Reset Password &amp; Sign In Now
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
        ) : (
          /* EMAIL LINK FORM */
          <>
            {isSent ? (
              <div className="space-y-6">
                <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h3 className="font-bold text-slate-800 text-sm">Reset Request Processed</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Reset request sent for <strong className="text-emerald-800">{sentEmail}</strong>.
                  </p>
                  {isRateLimit && (
                    <p className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 mt-2">
                      💡 Free SMTP email rate limit detected. Click the <strong>Instant Reset</strong> tab above to update your password in 0 seconds!
                    </p>
                  )}
                </div>

                <div className="space-y-3 pt-2">
                  <Link
                    href="/forgot-password?mode=instant"
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-xs"
                  >
                    <Zap className="w-4 h-4 fill-white" /> Use Instant Reset (0 Sec Wait)
                  </Link>
                  <Link
                    href="/login"
                    className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition text-center"
                  >
                    Return to Sign In
                  </Link>
                </div>
              </div>
            ) : (
              <form className="space-y-6" action={forgotPassword}>
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
                  className="w-full py-3.5 px-4 border border-transparent text-xs sm:text-sm font-extrabold rounded-xl text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 transition shadow-xs flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" /> Send Email Link
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
          </>
        )}
      </div>
    </div>
  )
}
