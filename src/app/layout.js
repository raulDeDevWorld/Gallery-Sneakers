
import { UserProvider } from '@/context'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/favicon.png' /> 
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-navbutton-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#000000" />
        <meta name="description" content="Sistema de Administracion LAVA VELOX" />
        <meta name="keywords" content="Velox" />
        <meta name="author" content="Velox" />
        <title>Lava Velox</title>
      </head>
      <body className={inter.className}>
        <UserProvider>
          <main className='h-screen bg-white'>
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  )
}