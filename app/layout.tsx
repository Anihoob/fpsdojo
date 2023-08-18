import Navbar from '@/components/navbar'
import './globals.css'
import localFont from 'next/font/local'

const myFont = localFont({
  src: './fonts/SF-Pro.ttf',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={myFont.className}>{children}
      <Navbar/>
      </body>
    </html>
  )
}
