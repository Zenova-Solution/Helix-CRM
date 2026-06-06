import type { ReactNode } from 'react';
import '@/styles/index.css';

export const metadata = { title: 'Helix CRM' };

export default function RootLayout({ children }: { children: ReactNode }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return (
    <html lang="en">
      <body>
        <script src={`${basePath}/data.js`} />
        {children}
      </body>
    </html>
  );
}
