import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EcoWaste - Sustainable Waste Management',
  description: 'Connect sellers and buyers for sustainable waste management and recycling',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        {children}
      </body>
    </html>
  )
}
