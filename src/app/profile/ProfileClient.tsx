'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Calendar, MessageSquare, Leaf, ShoppingBag, Edit3, Phone, MapPin, Sparkles, Save, X, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { signout } from '@/app/auth/actions';
import { createClient } from '@/lib/supabase';

interface ProfileClientProps {
  user: {
    id: string;
    email: string;
    created_at?: string;
    user_metadata?: Record<string, any>;
  };
  isAdmin: boolean;
  userOrders: any[];
  userEnquiries: any[];
}

export default function ProfileClient({ user, isAdmin, userOrders, userEnquiries }: ProfileClientProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [preference, setPreference] = useState('Indoor Plants');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Load saved user profile details from user_metadata or localStorage
  useEffect(() => {
    try {
      const meta = user.user_metadata || {};
      const storageKey = `profile_info_${user.email}`;
      const saved = localStorage.getItem(storageKey);
      const parsed = saved ? JSON.parse(saved) : {};

      const name = parsed.fullName || meta.full_name || meta.fullName || (user.email ? user.email.split('@')[0] : 'User');
      const ph = parsed.phone || meta.phone || '';
      const addr = parsed.address || meta.address || '';
      const pref = parsed.preference || meta.preference || 'Indoor Plants';

      setFullName(name.charAt(0).toUpperCase() + name.slice(1));
      setPhone(ph);
      setAddress(addr);
      setPreference(pref);
    } catch {}
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const cleanName = fullName.trim();
      const cleanPhone = phone.trim();
      const cleanAddress = address.trim();

      const profileData = {
        fullName: cleanName,
        phone: cleanPhone,
        address: cleanAddress,
        preference,
        updatedAt: new Date().toISOString()
      };

      // 1. Save to local storage for instant offline / client persistence
      const storageKey = `profile_info_${user.email}`;
      localStorage.setItem(storageKey, JSON.stringify(profileData));

      // 2. Save to Supabase Auth user_metadata
      const supabase = createClient();
      await supabase.auth.updateUser({
        data: {
          full_name: cleanName,
          phone: cleanPhone,
          address: cleanAddress,
          preference: preference
        }
      });
    } catch (err) {
      console.error('Failed to update Supabase user metadata:', err);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    }
  };


  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Recently';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      {/* Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-20 right-4 sm:right-8 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-xl z-50 flex items-center gap-2 border border-slate-700 animate-slide-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">Profile Information Updated Successfully!</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Account Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight mt-2">
            My Account &amp; Profile
          </h1>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl transition shadow-xs flex items-center justify-center gap-2"
        >
          <Edit3 className="w-4 h-4" /> Edit Profile Information
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Details Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl -z-10 opacity-60"></div>
            
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border-2 ${
              isAdmin ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-emerald-100 border-emerald-200 text-emerald-800'
            }`}>
              <User className="w-12 h-12" />
            </div>

            <h2 className="text-2xl font-black text-slate-800 mb-1">
              {fullName || user.email.split('@')[0]}
            </h2>

            <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold mb-5 ${
              isAdmin ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
            }`}>
              {isAdmin ? '🛡️ Administrator' : '🌱 Registered Customer'}
            </span>

            {/* Profile Information List */}
            <div className="space-y-3 text-left text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
              <div className="flex items-center text-slate-700 font-medium truncate">
                <Mail className="w-4 h-4 text-emerald-600 mr-2.5 flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>

              <div className="flex items-center text-slate-700 font-medium">
                <Phone className="w-4 h-4 text-emerald-600 mr-2.5 flex-shrink-0" />
                <span>{phone || 'Add phone number...'}</span>
              </div>

              <div className="flex items-start text-slate-700 font-medium">
                <MapPin className="w-4 h-4 text-emerald-600 mr-2.5 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-2">{address || 'Add delivery address...'}</span>
              </div>

              <div className="flex items-center text-slate-700 font-medium">
                <Sparkles className="w-4 h-4 text-emerald-600 mr-2.5 flex-shrink-0" />
                <span>Interest: {preference}</span>
              </div>

              <div className="flex items-center text-slate-400 text-[11px] pt-1 border-t border-slate-200/60">
                <Calendar className="w-3.5 h-3.5 text-slate-400 mr-2 flex-shrink-0" />
                <span>Joined {formatDate(user.created_at)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Profile Details
              </button>

              <form action={signout}>
                <button
                  type="submit"
                  className="w-full bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold py-2.5 rounded-xl transition text-xs flex items-center justify-center gap-1.5"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>

          {isAdmin && (
            <div className="bg-slate-900 p-6 rounded-3xl shadow-sm text-center text-white space-y-3">
              <h3 className="font-bold text-sm">Admin Management Portal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Access stock inventory, enquiry replies, and order fulfillment.
              </p>
              <Link href="/admin" className="block w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-2.5 rounded-xl text-xs transition shadow-xs">
                Go to Admin Dashboard
              </Link>
            </div>
          )}
        </div>

        {/* Orders & Enquiries Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order History */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-purple-600" /> Order History
              </span>
              <span className="text-xs font-bold text-slate-400">
                {userOrders?.length || 0} Orders
              </span>
            </h2>

            {!userOrders || userOrders.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-slate-500 text-sm mb-4">You haven't placed any plant orders yet.</p>
                <Link
                  href="/plants"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition inline-flex items-center gap-1.5"
                >
                  <Leaf className="w-4 h-4" /> Browse Plant Catalog
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.map((order) => (
                  <div key={order.id} className="border border-slate-100 bg-slate-50/50 p-4 rounded-2xl flex flex-col sm:flex-row gap-4">
                    <div className="w-20 h-20 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                      {order.plants?.image_url ? (
                        <img src={order.plants.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">🪴</div>
                      )}
                    </div>
                    <div className="flex-grow text-xs">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-slate-800 text-sm">{order.plants?.name || 'Plant Order'} (x{order.quantity})</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          order.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                          order.status === 'Cancelled' ? 'bg-rose-100 text-rose-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-slate-500 mb-2">Order #{order.id.split('-')[0]} • {formatDate(order.created_at)}</p>
                      <div className="flex justify-between items-end mt-auto pt-2 border-t border-slate-200/60">
                        <span className="text-slate-500 truncate max-w-[200px]">To: {order.address}</span>
                        <span className="font-extrabold text-emerald-700 text-sm">₹{order.total_price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* My Enquiries */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" /> My Enquiries
              </span>
              <span className="text-xs font-bold text-slate-400">
                {userEnquiries?.length || 0} Enquiries
              </span>
            </h2>

            {!userEnquiries || userEnquiries.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-slate-500 text-sm mb-4">You haven't sent any care enquiries yet.</p>
                <Link href="/contact" className="text-emerald-700 font-bold text-xs hover:underline">
                  Send an Enquiry
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userEnquiries.map((enq) => (
                  <div key={enq.id} className="border border-slate-100 bg-slate-50/50 p-4 rounded-2xl text-xs space-y-2">
                    <div className="flex justify-between items-start">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        enq.status === 'New' ? 'bg-blue-100 text-blue-800' :
                        enq.status === 'Contacted' ? 'bg-amber-100 text-amber-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {enq.status}
                      </span>
                      <span className="text-[11px] text-slate-400">{formatDate(enq.created_at)}</span>
                    </div>

                    {enq.plants?.name && (
                      <p className="font-bold text-slate-800 text-xs">
                        Regarding: {enq.plants.name}
                      </p>
                    )}

                    <p className="text-slate-600 leading-relaxed">{enq.message}</p>

                    {enq.admin_reply && (
                      <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-950">
                        <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 mb-1 flex items-center">
                          <Leaf className="w-3 h-3 mr-1" /> Nursery Support Reply
                        </p>
                        <p className="text-xs font-medium leading-relaxed">{enq.admin_reply}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EDIT PROFILE INFORMATION MODAL */}
      {isEditing && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-800">Edit Profile Information</h3>
                <p className="text-xs text-slate-500">Update your name, contact phone, and delivery address.</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210 (For WhatsApp updates)"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Default Delivery Address
                </label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter house no, street, city, pin code..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white leading-relaxed"
                />
              </div>

              {/* Plant Preferences */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Plant Interest
                </label>
                <select
                  value={preference}
                  onChange={(e) => setPreference(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                >
                  <option value="Indoor Plants">Indoor Air-Purifying Plants</option>
                  <option value="Balcony & Sunlight">Balcony &amp; Direct Sunlight Plants</option>
                  <option value="Low Maintenance">Low Maintenance Succulents</option>
                  <option value="Flowering Plants">Flowering &amp; Garden Plants</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-1.5"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
