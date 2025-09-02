'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LandingPage } from '../components/LandingPage';
import { useAuth } from './providers/auth-provider';

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  const handleGetStarted = () => {
    router.push('/auth');
  };

  const handleNavigate = (path: string) => {
    router.push(`/${path}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <LandingPage onGetStarted={handleGetStarted} onNavigate={handleNavigate} />;
}