'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { createClient } from '@/lib/supabase';
import { ArrowLeft, Loader2, ShieldCheck, Truck, ShoppingBag, QrCode, Banknote, Copy, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  const { items, subtotal, deliveryFee, totalPrice, clearCart } = useCart();
  const { error: toastError, success: toastSuccess } = useToast();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi'>('cod');
  const [transactionId, setTransactionId] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  const nurseryUpiId = 'ainursery@upi';

  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    notes: '',
  });

  // Pre-fill email if user is signed in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) {
          setFormData((prev) => ({
            ...prev,
            email: user.email!,
          }));
        }
      } catch {
        // Ignore user check error
      }
    };
    checkUser();
  }, []);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(nurseryUpiId);
    setCopiedUpi(true);
    toastSuccess('UPI ID copied to clipboard!');
    setTimeout(() => setCopiedUpi(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toastError('Your cart is empty. Please select plants to order.');
      return;
    }

    if (!formData.customer_name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      toastError('Please fill in all required delivery fields.');
      return;
    }

    if (paymentMethod === 'upi' && !transactionId.trim()) {
      toastError('Please enter your 12-digit GPay/UPI Transaction Reference (UTR) ID after making payment.');
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();

      const paymentTag = paymentMethod === 'upi'
        ? `[Payment: Online UPI (GPay/PhonePe) | Transaction UTR: ${transactionId.trim()}]`
        : `[Payment: Cash on Delivery]`;

      const fullAddress = `${formData.address.trim()}, ${formData.city ? formData.city.trim() + ', ' : ''}${
        formData.pincode ? 'PIN: ' + formData.pincode.trim() : ''
      }${formData.notes ? ' (Notes: ' + formData.notes.trim() + ')' : ''} ${paymentTag}`;

      // Status MUST be 'Pending' to satisfy Supabase orders_status_check constraint
      const ordersToInsert = items.map((item) => ({
        customer_name: formData.customer_name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || null,
        address: fullAddress,
        plant_id: item.plant.id,
        quantity: item.quantity,
        total_price: item.plant.price * item.quantity,
        status: 'Pending',
      }));

      const { data, error } = await supabase
        .from('orders')
        .insert(ordersToInsert)
        .select();

      if (error) {
        throw error;
      }

      const firstOrderId = data && data[0]?.id ? data[0].id : 'new';
      clearCart();

      // Redirect to confirmation page
      router.push(`/order-confirmation?orderId=${encodeURIComponent(firstOrderId)}&total=${totalPrice}&method=${paymentMethod}`);
    } catch (err: any) {
      console.error('Order creation error:', err);
      toastError(err.message || 'Failed to place order. Please check connection and try again.');
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-md">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
          🛒
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 text-sm mb-6">
          Add some plants from our catalog before checking out.
        </p>
        <Link
          href="/plants"
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-bold rounded-xl text-sm"
        >
          Browse Plants
        </Link>
      </div>
    );
  }

  // Dynamic QR Code payload for UPI (GPay / PhonePe / Paytm)
  const upiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    `upi://pay?pa=${nurseryUpiId}&pn=AI%20Nursery&am=${totalPrice}&cu=INR`
  )}`;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Link 
        href="/cart" 
        className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-green-700 mb-8 transition"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Return to Cart
      </Link>

      <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">
        Checkout & Payment Options
      </h1>
      <p className="text-slate-500 text-sm mb-8">
        Choose your preferred payment method below to confirm your plant order.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-green-600" /> Delivery Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone / WhatsApp Number *
                </label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. ramesh@example.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Street Address / House No. *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House/Flat No, Street, Landmark"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  City / Town
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Krishnagiri"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  PIN Code
                </label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  placeholder="e.g. 635106"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Delivery Notes / Special Instructions
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Call before delivery"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="pt-4 border-t border-slate-100">
              <h2 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Banknote className="w-5 h-5 text-green-600" /> Select Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {/* Cash on Delivery Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border-2 text-left transition flex items-start gap-3 ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-2xs'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${paymentMethod === 'cod' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Cash / Pay on Delivery</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Pay in cash or UPI when your plants arrive at your door.</p>
                  </div>
                </button>

                {/* Online Pay via UPI QR Scanner */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border-2 text-left transition flex items-start gap-3 ${
                    paymentMethod === 'upi'
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-2xs'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${paymentMethod === 'upi' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Pay Online (GPay / UPI Scanner)</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Scan QR code with GPay/PhonePe and submit transaction reference.</p>
                  </div>
                </button>
              </div>

              {/* Online Pay UPI QR & Transaction ID Details Box */}
              {paymentMethod === 'upi' && (
                <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-5 animate-in fade-in">
                  <div className="text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
                    {/* QR Code Container */}
                    <div className="bg-white p-3 rounded-2xl shadow-lg flex flex-col items-center flex-shrink-0">
                      <img 
                        src={upiQrUrl} 
                        alt="Nursery GPay UPI QR Code" 
                        className="w-44 h-44 object-contain rounded-lg" 
                      />
                      <span className="text-[10px] font-bold text-slate-500 mt-2">Scan & Pay ₹{totalPrice}</span>
                    </div>

                    <div className="space-y-3 flex-1 text-center sm:text-left">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800">
                        Scan with GPay / PhonePe / Paytm
                      </span>

                      <h3 className="text-lg font-bold text-white">
                        Scan QR Code or copy UPI ID to pay <span className="text-emerald-400">₹{totalPrice.toLocaleString()}</span>
                      </h3>

                      <div className="flex items-center justify-center sm:justify-start gap-2 bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                        <span className="text-xs font-mono text-slate-300">UPI ID: <strong>{nurseryUpiId}</strong></span>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="ml-auto text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1 rounded-lg transition flex items-center gap-1"
                        >
                          {copiedUpi ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedUpi ? 'Copied' : 'Copy'}
                        </button>
                      </div>

                      <p className="text-xs text-slate-400">
                        After paying on Google Pay / PhonePe, copy the <strong>12-digit UTR / Transaction Reference ID</strong> from your payment receipt and paste it below.
                      </p>
                    </div>
                  </div>

                  {/* Transaction Reference ID Input */}
                  <div className="pt-2 border-t border-slate-800">
                    <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5">
                      Enter GPay / UPI 12-Digit Transaction Reference (UTR) ID *
                    </label>
                    <input
                      required={paymentMethod === 'upi'}
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="e.g. 45262282910118187 or GPay Ref No."
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      This transaction ID will be verified by the admin against our nursery GPay account to confirm your order.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-base disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Order...
                </>
              ) : paymentMethod === 'upi' ? (
                `Confirm Online Order • ₹${totalPrice.toLocaleString()}`
              ) : (
                `Confirm Cash Order • ₹${totalPrice.toLocaleString()}`
              )}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5 sticky top-24">
          <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-3 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-green-600" /> Items in Order ({items.length})
          </h3>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.plant.id} className="flex items-center gap-3 text-sm">
                <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                  {item.plant.image_url ? (
                    <img src={item.plant.image_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs">🪴</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 truncate">{item.plant.name}</p>
                  <p className="text-xs text-slate-400">Qty: {item.quantity} × ₹{item.plant.price}</p>
                </div>
                <div className="font-bold text-slate-800 text-xs">
                  ₹{(item.plant.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-800">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Delivery</span>
              <span className="font-semibold text-slate-800">
                {deliveryFee === 0 ? <span className="text-green-600 font-bold">FREE</span> : `₹${deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between items-center text-base font-bold text-slate-900 pt-2 border-t border-slate-100">
              <span>Total to Pay</span>
              <span className="text-green-700 text-xl">₹{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
