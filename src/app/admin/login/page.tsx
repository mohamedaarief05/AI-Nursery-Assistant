import { adminLogin } from '@/app/auth/actions'
import { Shield } from 'lucide-react'

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const params = await searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-100">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-lg border border-slate-200">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-slate-800" />
          <h2 className="mt-6 text-3xl font-extrabold text-slate-800">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Authorized personnel only.
          </p>
        </div>
        <form className="mt-8 space-y-6" action={adminLogin}>
          {params?.message && (
            <p className="bg-red-50 text-red-600 p-4 text-center rounded-xl text-sm border border-red-100">
              {params.message}
            </p>
          )}
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-slate-700 mb-1">
                Admin Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition"
            >
              Sign in as Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
