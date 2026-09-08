import { getCurrentUser } from '@/lib/auth-helper';
import HeaderClient from './HeaderClient';

export default async function Header() {
  let userEmail: string | null = null;
  try {
    const user = await getCurrentUser();
    if (user?.email) {
      userEmail = user.email;
    }
  } catch {
    userEmail = null;
  }

  return <HeaderClient userEmail={userEmail} />;
}
