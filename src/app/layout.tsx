import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import HeaderApp from '../components/header/HeaderApp';
import ReduxProvider from '@/redux/provider';
import Info from '@/components/com-small/Info';
import AuthInitializer from './AuthInitializer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Email services',
  description: 'Email services - by Mohamed Abdelrahman',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en" >
        <meta name="twitter:image:src" content="https://avatars.githubusercontent.com/u/54208900" />
        <meta name="twitter:site" content="@m7md_0a" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Mohamed Abdelrahman" />
        <meta name="twitter:description" className="meta_description" content="Email services - by Mohamed Abdelrahman" />
        <meta property="og:image" content="https://avatars.githubusercontent.com/u/54208900" />
        <meta property="og:image:alt" className="meta_description" content="Email services - by Mohamed Abdelrahman" />
        <meta property="og:site_name" content="Email services - by Mohamed Abdelrahman" />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="Email services - by Mohamed Abdelrahman" />
        <meta property="og:url" content="https://m-abdelrahman.vercel.app" />
        <meta property="og:description" className="meta_description" content="Email services - by Mohamed Abdelrahman" />
        <meta property="profile:username" content="Email services - by Mohamed Abdelrahman" />
        <body className={' bg-base-100'}>
          <div id='modal-root'></div>
            <ReduxProvider >
              <AuthInitializer >
                <HeaderApp />  
                  <main className={inter.className + 'mb-8'}>
                    {children}
                  </main>
                <Info />
              </AuthInitializer>
            </ReduxProvider>
        </body>
      </html>
  )
}
