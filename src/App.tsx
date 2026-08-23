import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from '@/components/ScrollToTop'
import CustomCursor from '@/components/CustomCursor'
import Home from '@/pages/Home'
import ServicesPage from '@/pages/Services'
import PortfolioPage from '@/pages/Portfolio'
import AboutPage from '@/pages/About'
import TestimonialsPage from '@/pages/Testimonials'
import PricingPage from '@/pages/Pricing'
import BlogPage from '@/pages/Blog'
import ContactPage from '@/pages/Contact'
import ProjectDetail from '@/pages/ProjectDetail'
import Admin from '@/pages/admin'
import AppErrorBoundary from '@/components/AppErrorBoundary'

export default function App() {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <div className="grain" />
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:id" element={<ProjectDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </AppErrorBoundary>
  )
}