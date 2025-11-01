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
    e.stopPropagation()
    
    console.log("Form submit handler called", { formData, isSubmitting })
    
    // Prevent double submission
    if (isSubmitting) {
      console.log("Already submitting, ignoring")
      return
    }
    
    // Validate all required fields
    const trimmedName = formData.name.trim()
    const trimmedEmail = formData.email.trim()
    const trimmedPhone = formData.phone.trim()
    
    console.log("Validating fields", { 
      checkIn: formData.checkIn, 
      checkOut: formData.checkOut, 
      people: formData.people,
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone
    })
    
    if (!formData.checkIn || !formData.checkOut || !formData.people || !trimmedName || !trimmedEmail || !trimmedPhone) {
      console.log("Validation failed - missing required fields")
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
    console.log("Setting isSubmitting to true")
    
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
    
    console.log("Created mailto link:", mailtoLink.substring(0, 100) + "...")
    
    // Reset form immediately (before opening mailto)
    setFormData({
      checkIn: "",
      checkOut: "",
      people: "",
      name: "",
      email: "",
      phone: "",
      message: "",
    })
    
    console.log("Form data reset")
    
    // Open email client using multiple methods for maximum compatibility
    let emailOpened = false
    
    try {
      // Method 1: Try creating a link and clicking it
      console.log("Trying method 1: createElement and click")
      const link = document.createElement('a')
      link.href = mailtoLink
      link.style.display = 'none'
      link.setAttribute('data-mailto', 'true')
      document.body.appendChild(link)
      link.click()
      // Wait a bit before removing to ensure click is processed
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link)
        }
      }, 100)
      emailOpened = true
      console.log("Method 1 executed")
    } catch (error) {
      console.error("Method 1 failed:", error)
    }
    
    // Method 2: Fallback to window.location.href (only if method 1 didn't work)
    if (!emailOpened) {
      try {
        console.log("Trying method 2: window.location.href")
        // Use setTimeout to ensure the form reset happens first
        setTimeout(() => {
          window.location.href = mailtoLink
        }, 100)
        emailOpened = true
        console.log("Method 2 executed")
      } catch (error) {
        console.error("Method 2 failed:", error)
      }
    }
    
    // Show success message and reset submitting state
    setTimeout(() => {
      console.log("Showing success message", { emailOpened })
      setIsSubmitting(false)
      if (emailOpened) {
        alert(t("formSent"))
      } else {
        // If all methods failed, show error but still confirm form was processed
        alert(t("formError"))
      }
    }, 500)
  }

  return (
    <section id="kontakt" ref={ref as any} className="min-h-screen bg-white flex items-center py-12 sm:py-16 md:py-20 relative z-10 scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 w-full">
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground font-serif-brand">{t("contactTitle")}</h2>
          <p className="text-foreground/60 mt-2 sm:mt-3 text-sm sm:text-base">{t("contactSubtitle")}</p>
        </div>

        <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Contact Info */}
          <div className={`lg:col-span-1 space-y-4 sm:space-y-6 transition-all duration-1000 ease-out delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} relative z-20`}>
            <a href="tel:+48501558530" className="block rounded-xl sm:rounded-2xl border border-border bg-muted/50 p-4 sm:p-6 text-center text-foreground/90 hover:text-foreground hover:bg-muted active:bg-muted/80 transition touch-manipulation relative z-30 cursor-pointer">
              <div className="text-xs sm:text-sm uppercase tracking-wider">{t("phone")}</div>
              <div className="mt-2 text-base sm:text-lg font-semibold break-all">+48 501 558 530</div>
            </a>
            <a href="mailto:kontakt@szczyrkdom.pl" className="block rounded-xl sm:rounded-2xl border border-border bg-muted/50 p-4 sm:p-6 text-center text-foreground/90 hover:text-foreground hover:bg-muted active:bg-muted/80 transition touch-manipulation relative z-30 cursor-pointer">
              <div className="text-xs sm:text-sm uppercase tracking-wider">{t("email")}</div>
              <div className="mt-2 text-sm sm:text-lg font-semibold break-all">kontakt@szczyrkdom.pl</div>
            </a>
            <div className="rounded-xl sm:rounded-2xl border border-border bg-muted/50 p-4 sm:p-6 text-center text-foreground/90">
              <div className="text-xs sm:text-sm uppercase tracking-wider">{t("address")}</div>
              <div className="mt-2 text-base sm:text-lg font-semibold">{t("addressValue")}</div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-2 transition-all duration-1000 ease-out delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} relative z-20`}>
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


