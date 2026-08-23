import Navbar from '@/components/Navbar'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}