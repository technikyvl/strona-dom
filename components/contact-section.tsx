export function ContactSection() {
  return (
    <section id="kontakt" className="py-24 bg-[#0a0e1a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Kontakt</h2>
          <p className="text-white/60 mt-3">Zapytaj o dostępność i wycenę pobytu</p>
        </div>

        <div className="mx-auto max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="tel:+48501558530" className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center text-white/90 hover:text-white hover:bg-white/10 transition">
            <div className="text-sm uppercase tracking-wider">Telefon</div>
            <div className="mt-2 text-lg font-semibold">+48 501 558 530</div>
          </a>
          <a href="mailto:kontakt@szczyrkdom.pl" className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center text-white/90 hover:text-white hover:bg-white/10 transition">
            <div className="text-sm uppercase tracking-wider">Email</div>
            <div className="mt-2 text-lg font-semibold">kontakt@szczyrkdom.pl</div>
          </a>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center text-white/90">
            <div className="text-sm uppercase tracking-wider">Adres</div>
            <div className="mt-2 text-lg font-semibold">Szczyrk, centrum</div>
          </div>
        </div>
      </div>
    </section>
  )
}


