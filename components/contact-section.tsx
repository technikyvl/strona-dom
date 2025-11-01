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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all required fields
    if (!formData.checkIn || !formData.checkOut || !formData.people || !formData.name || !formData.email || !formData.phone) {
      alert(t("fillAllFields"))
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert(t("invalidEmail"))
      return
    }

    setIsSubmitting(true)
    
    // Create email body
    const emailBody = `${t("askAvailability")}:

${t("checkInDate")}: ${formData.checkIn}
${t("checkOutDate")}: ${formData.checkOut}
${t("numberOfPeople")}: ${formData.people}

${t("contactTitle")}:
${t("name")}: ${formData.name}
${t("email")}: ${formData.email}
${t("phoneNumber")}: ${formData.phone}

${t("message")}: ${formData.message || "-"}`

    // Create and open mailto link
    const mailtoLink = `mailto:kontakt@szczyrkdom.pl?subject=${encodeURIComponent(t("askAvailability"))}&body=${encodeURIComponent(emailBody)}`
    
    // Reset form immediately
    setFormData({
      checkIn: "",
      checkOut: "",
      people: "",
      name: "",
      email: "",
      phone: "",
      message: "",
    })
    
    // Open email client using a more reliable method
    try {
      // Create a temporary anchor element and click it
      const link = document.createElement('a')
      link.href = mailtoLink
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Show success message after a short delay
      setTimeout(() => {
        setIsSubmitting(false)
        alert(t("formSent"))
      }, 300)
    } catch (error) {
      console.error("Error opening email client:", error)
      setIsSubmitting(false)
      // Fallback: try window.location.href
      window.location.href = mailtoLink
      setTimeout(() => {
        alert(t("formSent"))
      }, 500)
    }
  }

  return (
    <section id="kontakt" ref={ref as any} className="min-h-screen bg-white flex items-center py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 w-full">
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground font-serif-brand">{t("contactTitle")}</h2>
          <p className="text-foreground/60 mt-2 sm:mt-3 text-sm sm:text-base">{t("contactSubtitle")}</p>
        </div>

        <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Contact Info */}
          <div className={`lg:col-span-1 space-y-4 sm:space-y-6 transition-all duration-1000 ease-out delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <a href="tel:+48501558530" className="block rounded-xl sm:rounded-2xl border border-border bg-muted/50 p-4 sm:p-6 text-center text-foreground/90 hover:text-foreground hover:bg-muted active:bg-muted/80 transition touch-manipulation">
              <div className="text-xs sm:text-sm uppercase tracking-wider">{t("phone")}</div>
              <div className="mt-2 text-base sm:text-lg font-semibold break-all">+48 501 558 530</div>
            </a>
            <a href="mailto:kontakt@szczyrkdom.pl" className="block rounded-xl sm:rounded-2xl border border-border bg-muted/50 p-4 sm:p-6 text-center text-foreground/90 hover:text-foreground hover:bg-muted active:bg-muted/80 transition touch-manipulation">
              <div className="text-xs sm:text-sm uppercase tracking-wider">{t("email")}</div>
              <div className="mt-2 text-sm sm:text-lg font-semibold break-all">kontakt@szczyrkdom.pl</div>
            </a>
            <div className="rounded-xl sm:rounded-2xl border border-border bg-muted/50 p-4 sm:p-6 text-center text-foreground/90">
              <div className="text-xs sm:text-sm uppercase tracking-wider">{t("address")}</div>
              <div className="mt-2 text-base sm:text-lg font-semibold">{t("addressValue")}</div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-2 transition-all duration-1000 ease-out delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="checkIn" className="block text-sm font-medium text-foreground mb-2">
                    {t("checkInDate")} *
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-base touch-manipulation min-h-[44px]"
                  />
                </div>
                <div>
                  <label htmlFor="checkOut" className="block text-sm font-medium text-foreground mb-2">
                    {t("checkOutDate")} *
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    required
                    min={formData.checkIn || new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-base touch-manipulation min-h-[44px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="people" className="block text-sm font-medium text-foreground mb-2">
                    {t("numberOfPeople")} *
                  </label>
                  <select
                    id="people"
                    name="people"
                    value={formData.people}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer text-base touch-manipulation min-h-[44px]"
                  >
                    <option value="">{t("selectPeople")}</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? t("person") : num < 5 ? t("people") : t("peopleMany")}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t("name")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-base touch-manipulation min-h-[44px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t("email")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-base touch-manipulation min-h-[44px]"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    {t("phoneNumber")} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-base touch-manipulation min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  {t("messageOptional")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all text-base touch-manipulation"
                  placeholder={t("additionalInfo")}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 sm:py-3.5 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 active:bg-primary/95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg text-sm sm:text-base touch-manipulation min-h-[44px]"
              >
                {isSubmitting ? t("sending") : t("sendInquiry")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}


