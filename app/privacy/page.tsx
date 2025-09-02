'use client';

import { PrivacyPolicy } from '../../components/PrivacyPolicy';
import { useRouter } from 'next/navigation';

export default function Privacy() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return <PrivacyPolicy onBack={handleBack} />;
}