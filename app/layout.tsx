import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from './providers/auth-provider';

export const metadata: Metadata = {
  title: 'AI Career Assistant',
  description: 'AI-powered recruitment and career development platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}