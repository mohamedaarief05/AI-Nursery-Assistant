import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth-helper';
import ProfileClient from './ProfileClient';

export default async function ProfilePage() {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  // Check if user is admin
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', user.email)
    .single();
    
  const isAdmin = !!adminUser;

  // Fetch the user's submitted enquiries if they match the email, filtering out 'Completed' ones
  const { data: userEnquiries } = await supabase
    .from('enquiries')
    .select('*, plants(name)')
    .eq('email', user.email)
    .neq('status', 'Completed')
    .order('created_at', { ascending: false });

  // Fetch the user's orders
  const { data: userOrders } = await supabase
    .from('orders')
    .select('*, plants(name, image_url)')
    .eq('email', user.email)
    .order('created_at', { ascending: false });

  return (
    <ProfileClient
      user={{
        id: user.id,
        email: user.email || '',
        created_at: user.created_at,
        user_metadata: user.user_metadata || {},
      }}
      isAdmin={isAdmin}
      userOrders={userOrders || []}
      userEnquiries={userEnquiries || []}
    />
  );
}

