'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthSystem } from '../../components/AuthSystem';
import { useAuth } from '../providers/auth-provider';

export default function AuthPage() {
  const { user, login, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  const handleLogin = (userData: any) => {
    login(userData);
    router.push('/dashboard');
  };

  const handleBack = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect via useEffect
  }

  return <AuthSystem onLogin={handleLogin} onBack={handleBack} />;
}