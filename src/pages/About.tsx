import Navbar from '@/components/Navbar'
import About from '@/components/About'
import Agency from '@/components/Agency'
import Process from '@/components/Process'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <About />
        <Agency />
        <Process />
        <CTA />
      </main>
      <Footer />
    </>
  )
}