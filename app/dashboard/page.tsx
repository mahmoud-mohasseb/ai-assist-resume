'use client';

import { useRouter } from 'next/navigation';
import { Dashboard } from '../../components/DashboardFixed';
import { useAuth } from '../providers/auth-provider';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleModeChange = (mode: string) => {
    router.push(`/dashboard/${mode}`);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) return null;

  return (
    <Dashboard 
      user={user} 
      onModeChange={handleModeChange}
      onLogout={handleLogout}
    />
  );
}