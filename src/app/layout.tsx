import type { ReactNode } from 'react';
import Script from 'next/script';
import '@/styles/index.css';

export const metadata = {
  title: 'Helix CRM',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return (
    <html lang="en">
      <body>
        <Script src={`${basePath}/data.js`} strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
