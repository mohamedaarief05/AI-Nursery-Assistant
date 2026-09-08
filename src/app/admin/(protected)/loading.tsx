import { Loader2 } from 'lucide-react';

export default function AdminLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
      <p className="text-sm font-semibold text-slate-500">Loading admin dashboard data...</p>
    </div>
  );
}
