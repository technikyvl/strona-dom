"use client"

import { useInView } from "@/lib/use-in-view"
import { useI18n } from "@/components/ui/lang"
import { useState } from "react"

export function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.1, once: false })
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    people: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.checkIn || !formData.checkOut || !formData.people || !formData.name || !formData.email || !formData.phone) {
      alert("Proszę wypełnić wszystkie wymagane pola")
      return
    }

    setIsSubmitting(true)
    
    // Create email body
    const emailBody = `Nowe zapytanie o dostępność:

Data przyjazdu: ${formData.checkIn}
Data wyjazdu: ${formData.checkOut}
Liczba osób: ${formData.people}

Dane kontaktowe:
Imię i nazwisko: ${formData.name}
Email: ${formData.email}
Telefon: ${formData.phone}

Wiadomość: ${formData.message || "Brak"}`

    try {
      // Open email client
      const mailtoLink = `mailto:kontakt@szczyrkdom.pl?subject=${encodeURIComponent("Zapytanie o dostępność")}&body=${encodeURIComponent(emailBody)}`
      window.location.href = mailtoLink
      
      // Reset form after a delay
      setTimeout(() => {
        setIsSubmitting(false)
        setFormData({
          checkIn: "",
          checkOut: "",
          people: "",
          name: "",
          email: "",
          phone: "",
          message: "",
        })
        alert("Formularz został wysłany. Sprawdź swoją skrzynkę pocztową.")
      }, 500)
    } catch (error) {
      console.error("Błąd podczas wysyłania formularza:", error)
      setIsSubmitting(false)
      alert("Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.")
    }
  }

  return (
    <section id="kontakt" ref={ref as any} className="min-h-screen bg-white flex items-center py-20">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-12 transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-serif-brand">{t("contactTitle")}</h2>
          <p className="text-foreground/60 mt-3">{t("contactSubtitle")}</p>
        </div>

        <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className={`lg:col-span-1 space-y-6 transition-all duration-1000 ease-out delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <a href="tel:+48501558530" className="block rounded-2xl border border-border bg-muted/50 p-6 text-center text-foreground/90 hover:text-foreground hover:bg-muted transition">
              <div className="text-sm uppercase tracking-wider">{t("phone")}</div>
              <div className="mt-2 text-lg font-semibold">+48 501 558 530</div>
            </a>
            <a href="mailto:kontakt@szczyrkdom.pl" className="block rounded-2xl border border-border bg-muted/50 p-6 text-center text-foreground/90 hover:text-foreground hover:bg-muted transition">
              <div className="text-sm uppercase tracking-wider">{t("email")}</div>
              <div className="mt-2 text-lg font-semibold">kontakt@szczyrkdom.pl</div>
            </a>
            <div className="rounded-2xl border border-border bg-muted/50 p-6 text-center text-foreground/90">
              <div className="text-sm uppercase tracking-wider">{t("address")}</div>
              <div className="mt-2 text-lg font-semibold">{t("addressValue")}</div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-2 transition-all duration-1000 ease-out delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="checkIn" className="block text-sm font-medium text-foreground mb-2">
                    Data przyjazdu *
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="checkOut" className="block text-sm font-medium text-foreground mb-2">
                    Data wyjazdu *
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    required
                    min={formData.checkIn}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="people" className="block text-sm font-medium text-foreground mb-2">
                    Liczba osób *
                  </label>
                  <select
                    id="people"
                    name="people"
                    value={formData.people}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Wybierz liczbę osób</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "osoba" : num < 5 ? "osoby" : "osób"}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Imię i nazwisko *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Wiadomość (opcjonalnie)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Dodatkowe informacje..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Wysyłanie..." : "Wyślij zapytanie"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}


