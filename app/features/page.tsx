'use client';

import { FeaturesPage } from '../../components/FeaturesPage';
import { useRouter } from 'next/navigation';

export default function Features() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return <FeaturesPage onBack={handleBack} />;
}