"use client"

import { useInView } from "@/lib/use-in-view"
import { useI18n } from "@/components/ui/lang"
import { useState } from "react"

export function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.05, once: false })
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
    e.stopPropagation()
    
    // Prevent double submission
    if (isSubmitting) {
      return
    }
    
    // Validate all required fields
    const trimmedName = formData.name.trim()
    const trimmedEmail = formData.email.trim()
    const trimmedPhone = formData.phone.trim()
    
    if (!formData.checkIn || !formData.checkOut || !formData.people || !trimmedName || !trimmedEmail || !trimmedPhone) {
      alert(t("fillAllFields"))
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      alert(t("invalidEmail"))
      return
    }

    setIsSubmitting(true)
    
    // Create email body with trimmed values
    const emailBody = `${t("askAvailability")}:

${t("checkInDate")}: ${formData.checkIn}
${t("checkOutDate")}: ${formData.checkOut}
${t("numberOfPeople")}: ${formData.people}

${t("contactTitle")}:
${t("name")}: ${trimmedName}
${t("email")}: ${trimmedEmail}
${t("phoneNumber")}: ${trimmedPhone}

${t("message")}: ${formData.message.trim() || "-"}`

    // Create and open mailto link
    const subject = encodeURIComponent(t("askAvailability"))
    const body = encodeURIComponent(emailBody)
    const mailtoLink = `mailto:kontakt@szczyrkdom.pl?subject=${subject}&body=${body}`
    
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
    
    // Open email client
    try {
      const link = document.createElement('a')
      link.href = mailtoLink
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link)
        }
      }, 100)
      
      setTimeout(() => {
        setIsSubmitting(false)
        alert(t("formSent"))
      }, 300)
    } catch (error) {
      console.error("Error opening email:", error)
      window.location.href = mailtoLink
      setTimeout(() => {
        setIsSubmitting(false)
        alert(t("formSent"))
      }, 500)
    }
  }

  return (
    <section 
      id="kontakt" 
      ref={ref as any} 
      className="min-h-screen bg-white flex items-center py-8 sm:py-12 md:py-16 lg:py-20 scroll-mt-24"
      style={{ position: 'relative', zIndex: 100, pointerEvents: 'auto' }}
    >
      <div className="container mx-auto px-4 sm:px-6 w-full" style={{ position: 'relative', zIndex: 101, pointerEvents: 'auto' }}>
        <div className={`text-center mb-6 sm:mb-8 md:mb-12 transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-serif-brand">{t("contactTitle")}</h2>
          <p className="text-foreground/60 mt-2 sm:mt-3 text-sm sm:text-base md:text-lg">{t("contactSubtitle")}</p>
        </div>

        <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8" style={{ position: 'relative', zIndex: 102, pointerEvents: 'auto' }}>
          {/* Contact Info */}
          <div className={`lg:col-span-1 space-y-3 sm:space-y-4 md:space-y-6 transition-all duration-1000 ease-out delay-200 mb-6 lg:mb-0 ${inView ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"}`} style={{ pointerEvents: 'auto' }}>
            <a 
              href="tel:+48501558530" 
              className="block rounded-xl sm:rounded-2xl border border-border bg-muted/50 p-3 sm:p-4 md:p-6 text-center text-foreground/90 hover:text-foreground hover:bg-muted active:bg-muted/80 transition shadow-sm hover:shadow-md"
              style={{ pointerEvents: 'auto', position: 'relative', zIndex: 200 }}
            >
              <div className="text-xs sm:text-sm uppercase tracking-wider">{t("phone")}</div>
              <div className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg font-semibold break-all">+48 501 558 530</div>
            </a>
            <a 
              href="mailto:kontakt@szczyrkdom.pl" 
              className="block rounded-xl sm:rounded-2xl border border-border bg-muted/50 p-3 sm:p-4 md:p-6 text-center text-foreground/90 hover:text-foreground hover:bg-muted active:bg-muted/80 transition shadow-sm hover:shadow-md"
              style={{ pointerEvents: 'auto', position: 'relative', zIndex: 200 }}
            >
              <div className="text-xs sm:text-sm uppercase tracking-wider">{t("email")}</div>
              <div className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-lg font-semibold break-all">kontakt@szczyrkdom.pl</div>
            </a>
            <div className="rounded-xl sm:rounded-2xl border border-border bg-muted/50 p-3 sm:p-4 md:p-6 text-center text-foreground/90 shadow-sm">
              <div className="text-xs sm:text-sm uppercase tracking-wider">{t("address")}</div>
              <div className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg font-semibold">{t("addressValue")}</div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-2 transition-all duration-1000 ease-out delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"}`} style={{ position: 'relative', zIndex: 103, pointerEvents: 'auto' }}>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6" style={{ pointerEvents: 'auto', position: 'relative', zIndex: 200 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div>
                  <label htmlFor="checkIn" className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
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
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm sm:text-base touch-manipulation min-h-[44px]"
                    style={{ pointerEvents: 'auto', position: 'relative', zIndex: 300, cursor: 'pointer' }}
                  />
                </div>
                <div>
                  <label htmlFor="checkOut" className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
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
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm sm:text-base touch-manipulation min-h-[44px]"
                    style={{ pointerEvents: 'auto', position: 'relative', zIndex: 300, cursor: 'pointer' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div>
                  <label htmlFor="people" className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                    {t("numberOfPeople")} *
                  </label>
                  <select
                    id="people"
                    name="people"
                    value={formData.people}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer text-sm sm:text-base touch-manipulation min-h-[44px]"
                    style={{ pointerEvents: 'auto', position: 'relative', zIndex: 300, cursor: 'pointer' }}
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
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                    {t("name")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm sm:text-base touch-manipulation min-h-[44px]"
                    style={{ pointerEvents: 'auto', position: 'relative', zIndex: 300, cursor: 'text' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                    {t("email")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm sm:text-base touch-manipulation min-h-[44px]"
                    style={{ pointerEvents: 'auto', position: 'relative', zIndex: 300, cursor: 'text' }}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                    {t("phoneNumber")} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm sm:text-base touch-manipulation min-h-[44px]"
                    style={{ pointerEvents: 'auto', position: 'relative', zIndex: 300, cursor: 'text' }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2">
                  {t("messageOptional")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all text-sm sm:text-base touch-manipulation"
                  placeholder={t("additionalInfo")}
                  style={{ pointerEvents: 'auto', position: 'relative', zIndex: 300, cursor: 'text' }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 sm:py-3.5 px-5 sm:px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 active:bg-primary/95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg text-sm sm:text-base touch-manipulation min-h-[48px] sm:min-h-[52px] mt-2 sm:mt-4"
                style={{ pointerEvents: 'auto', position: 'relative', zIndex: 400, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
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
