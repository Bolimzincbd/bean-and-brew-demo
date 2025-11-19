import './global.css'

export const metadata = {
  title: 'Bean & Brew - Voice Search Demo',
  description: 'A demo website optimized for voice search and local SEO.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}