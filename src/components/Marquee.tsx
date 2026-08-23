const ITEMS = ['WEB DESIGN', 'BRANDING', 'MOTION', 'SOCIAL MEDIA', 'DEVELOPMENT', 'SEO', 'DIGITAL MARKETING']

function Row({ reverse = false }: { reverse?: boolean }) {
  const list = [...ITEMS, ...ITEMS]
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className={`inline-flex ${reverse ? 'animate-marquee-right' : 'animate-marquee-left'}`}>
        {[...list, ...list].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8 mx-8">
            <span className={`text-4xl sm:text-6xl font-medium tracking-tight ${reverse ? 'text-ink/15' : 'text-ink/10'}`}>
              {item}
            </span>
            <span className="text-2xl text-accent/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="py-10 border-y border-ink/10 select-none">
      <Row />
      <div className="mt-2">
        <Row reverse />
      </div>
    </section>
  )
}
