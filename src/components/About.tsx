import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-32 md:py-44 px-5 sm:px-8 md:px-12 lg:px-16">
      <div className="max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl lg:text-7xl font-medium font-display tracking-tight leading-[1.05]"
        >
          GOOD DESIGN
          <br />
          GETS ATTENTION.
          <br />
          <span className="text-ink/30">GREAT DESIGN</span>
          <br />
          <span className="text-ink/30">GETS REMEMBERED.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="mt-12 max-w-xl text-ink/65 text-lg leading-relaxed"
        >
          The Design Dhamaka is a creative digital agency helping ambitious businesses build
          brands, websites and digital experiences that people actually remember.
        </motion.p>
      </div>
    </section>
  )
}
