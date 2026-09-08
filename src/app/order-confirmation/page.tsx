import Link from 'next/link';
import { CheckCircle2, ShoppingBag, User, Clock, QrCode, Banknote, Sprout } from 'lucide-react';
import { createClient } from '@/lib/supabase-server';
import PrintableBillActions from '@/components/PrintableBillActions';

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; total?: string; method?: string }>;
}) {
  const params = await searchParams;
  const orderId = params?.orderId || 'NEW';
  const urlTotal = params?.total ? Number(params.total) : null;
  const isOnline = params?.method === 'upi';

  // Fetch order details from Supabase if valid ID
  let orderData: any = null;
  if (orderId && orderId !== 'NEW') {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from('orders')
        .select('*, plants(name, price, image_url)')
        .eq('id', orderId)
        .single();
      if (data) orderData = data;
    } catch {
      // Fallback
    }
  }

  const customerName = orderData?.customer_name || 'Valued Customer';
  const rawPhone = orderData?.phone || '';
  const plantName = orderData?.plants?.name || 'Nursery Plant';
  const plantPrice = orderData?.plants?.price || (urlTotal ? urlTotal : 0);
  const qty = orderData?.quantity || 1;
  
  // Calculate total amount reliably
  const calculatedTotal = orderData?.total_price || (urlTotal ? urlTotal : plantPrice * qty);
  const formattedTotal = `₹${Number(calculatedTotal).toLocaleString()}`;
  const shortId = orderId.length > 8 ? orderId.substring(0, 8).toUpperCase() : orderId;
  const orderDate = orderData?.created_at ? new Date(orderData.created_at).toLocaleDateString() : new Date().toLocaleDateString();
  const paymentLabel = isOnline ? 'Online UPI (GPay/PhonePe)' : 'Cash / Pay on Delivery';

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      {/* Printable Invoice Container */}
      <div id="printable-bill" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        
        {/* Success Icon */}
        <div className="text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3 animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Thank You for Your Order! 🌱
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            {isOnline 
              ? 'Your payment transaction details have been submitted. Our team will verify your GPay/UPI reference and dispatch your plants.' 
              : 'Your cash-on-delivery order has been received and sent to our nursery team for preparation.'}
          </p>
        </div>

        {/* Invoice Header */}
        <div className="flex justify-between items-start border-t border-b border-slate-200 py-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-emerald-700 text-white rounded-xl flex items-center justify-center font-bold">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">AI Nursery</h2>
              <p className="text-xs text-slate-500 font-medium">Official Tax Invoice & Receipt</p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-extrabold text-xs rounded-full border border-emerald-200 mb-1">
              CONFIRMED
            </span>
            <p className="text-xs text-slate-500 font-mono">Invoice Date: {orderDate}</p>
          </div>
        </div>

        {/* Order Reference Banner */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-wrap justify-between items-center gap-2">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Order Reference No.</span>
            <span className="font-mono text-lg font-black text-slate-800">#{shortId}</span>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Payment Method</span>
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
              {isOnline ? <QrCode className="w-3.5 h-3.5 text-purple-600" /> : <Banknote className="w-3.5 h-3.5 text-emerald-600" />}
              {paymentLabel}
            </span>
          </div>
        </div>

        {/* Customer Details */}
        <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
          <div>
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-0.5">Billed To</span>
            <p className="font-extrabold text-slate-800 text-sm">{customerName}</p>
            {rawPhone && <p className="text-slate-600 font-medium mt-0.5">Phone: {rawPhone}</p>}
          </div>

          <div>
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-0.5">Fulfillment Status</span>
            <p className="font-bold text-emerald-700 text-sm flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Order Accepted
            </p>
            <p className="text-slate-500 mt-0.5">Dispatch within 24 hours</p>
          </div>
        </div>

        {/* Itemized Bill Table */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 border-b border-slate-200 font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Plant Description</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right">Price</th>
                <th className="p-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              <tr>
                <td className="p-3 font-bold text-slate-900">{plantName}</td>
                <td className="p-3 text-center">{qty}</td>
                <td className="p-3 text-right">₹{Number(plantPrice).toLocaleString()}</td>
                <td className="p-3 text-right font-bold">₹{(plantPrice * qty).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Highlighted Total Amount Banner */}
        <div className="p-5 bg-emerald-900 text-white rounded-2xl flex justify-between items-center shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block">Total Bill Amount</span>
            <span className="text-2xl sm:text-3xl font-black text-white">{formattedTotal}</span>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-emerald-200 block">Status: Confirmed</span>
            <span className="text-[11px] text-emerald-300">Nursery Quality Guarantee 🌱</span>
          </div>
        </div>

        {/* Instant Download Bill Image Component */}
        <PrintableBillActions
          orderId={orderId}
          customerName={customerName}
          plantName={plantName}
          quantity={qty}
          totalAmount={formattedTotal}
          paymentMethod={paymentLabel}
          orderDate={orderDate}
        />

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 print:hidden">
          <Link
            href="/plants"
            className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition flex items-center justify-center gap-2 text-sm"
          >
            <ShoppingBag className="w-4 h-4" /> Continue Shopping
          </Link>
          <Link
            href="/profile"
            className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition flex items-center justify-center gap-2 text-sm"
          >
            <User className="w-4 h-4" /> View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
