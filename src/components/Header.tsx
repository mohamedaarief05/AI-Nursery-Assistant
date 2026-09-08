import { createClient } from '@/lib/supabase-server';
import HeaderClient from './HeaderClient';

export default async function Header() {
  let userEmail: string | null = null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (!error && data?.user) {
      userEmail = data.user.email || null;
    }
  } catch {
    userEmail = null;
  }

  return <HeaderClient userEmail={userEmail} />;
}
