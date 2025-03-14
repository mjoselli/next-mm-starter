import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import WalletNav from '@/components/wallet-nav';

import './globals.css';

export const metadata: Metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn'
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='mx-auto bg-[#F4F4F5] px-3 py-2 md:py-3 lg:max-w-screen-xl lg:px-0'>
        <WalletNav />
        {children}
      </body>
    </html>
  );
}
