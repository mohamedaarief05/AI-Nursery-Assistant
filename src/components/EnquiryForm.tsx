'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createClient } from '@/lib/supabase';
import { Loader2, CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
  customer_name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required').optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  plant_id: z.string().optional(),
});

export default function EnquiryForm({ prefilledPlantId }: { prefilledPlantId?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plant_id: prefilledPlantId || '',
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        reset({ ...getValues(), email: user.email });
      }
    };
    fetchUser();
  }, [reset, getValues]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const supabase = createClient();
      const { error: submitError } = await supabase
        .from('enquiries')
        .insert({
          customer_name: values.customer_name,
          phone: values.phone,
          email: values.email || null,
          message: values.message,
          plant_id: values.plant_id || null,
          status: 'New'
        });

      if (submitError) throw submitError;
      
      setIsSuccess(true);
      reset();
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 p-8 rounded-2xl border border-green-100 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">Thank you!</h3>
        <p className="text-green-700">Your enquiry has been received. The nursery will contact you soon.</p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-6 text-green-600 font-medium hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
        <input 
          {...register('customer_name')}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          placeholder="Your full name"
        />
        {errors.customer_name && <p className="text-red-500 text-xs mt-1">{errors.customer_name.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
          <input 
            {...register('phone')}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Your phone number"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email (Optional)</label>
          <input 
            {...register('email')}
            type="email"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Message *</label>
        <textarea 
          {...register('message')}
          rows={4}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          placeholder="What would you like to know? (e.g., Is Rose plant available? I would like to purchase 5 plants.)"
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-900 transition flex justify-center items-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Enquiry'
        )}
      </button>
    </form>
  );
}
