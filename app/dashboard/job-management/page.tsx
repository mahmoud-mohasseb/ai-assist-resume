'use client';

import { useRouter } from 'next/navigation';
import { JobManagement } from '../../../components/JobManagement';

export default function JobManagementPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/dashboard');
  };

  return <JobManagement onBack={handleBack} />;
}