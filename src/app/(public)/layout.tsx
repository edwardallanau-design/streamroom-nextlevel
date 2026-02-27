import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </>
  )
}
