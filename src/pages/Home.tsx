import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About'
import Offerings from '@/components/Offerings'
import Services from '@/components/Services'
import Work from '@/components/Work'
import SocialShowcase from '@/components/SocialShowcase'
import Process from '@/components/Process'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Offerings />
        <Services />
        <Work />
        <SocialShowcase />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}