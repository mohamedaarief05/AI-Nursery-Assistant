import { createClient } from '@/lib/supabase-server'
import { cookies } from 'next/headers'

export async function getCurrentUser() {
  let userEmail: string | null = null;
  let createdAt: string = new Date().toISOString();
  let userId: string = 'user_' + Date.now();

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    if (data?.user?.email) {
      return data.user;
    }
  } catch {
    // Supabase auth fallback
  }

  // Check fallback session cookie
  try {
    const cookieStore = await cookies();
    const fallbackEmail = cookieStore.get('nursery_user_email')?.value;
    if (fallbackEmail) {
      userEmail = fallbackEmail;
      userId = 'usr_' + fallbackEmail.replace(/[^a-zA-Z0-9]/g, '_');
      return {
        id: userId,
        email: userEmail,
        created_at: createdAt,
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        role: 'authenticated'
      } as any;
    }
  } catch {}

  return null;
}
