import type { ReactNode } from 'react';
import Link from 'next/link';

import NavBar from '../components/NavBar';
import './globals.css';
import { orbitron, exo_2 } from './fonts';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={`${orbitron.variable} ${exo_2.variable}`}>
      <body className='bg-orange-50 px-4 py-2 flex flex-col min-h-screen'>
        <header>
          <NavBar />
        </header>
        <main className='flex-1'> {children}</main>
        <footer className='border-t py-3s text-center text-xs text-slate-500'>
          Game data and images courtesy of{' '}
          <a
            href='https://rawg.io/'
            target='blank'
            className='text-orange-800 hover:underline '
          >
            RAWG
          </a>
        </footer>
      </body>
    </html>
  );
}
