import { useState, type FormEvent } from 'react'
import { Mail, Phone } from 'lucide-react'
import { Breadcrumb } from '@/components/common/Breadcrumb'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { contactService } from '@/services/contactService'

export function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [sending, setSending] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    setStatusMessage('')
    setSending(true)

    try {
      const success = await contactService.sendMessage({ name, email, phone, message })
      if (!success) {
        setErrorMessage('Unable to send your message right now.')
        return
      }

      setStatusMessage('Message sent successfully!')
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
    } catch {
      setErrorMessage('Unable to send your message right now.')
    } finally {
      setSending(false)
    }
  }

  return (
    <Container className="py-20">
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Contact' }]} />

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="flex gap-4 figma-card p-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
              <Phone size={20} className="text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-figma-base font-medium text-secondary">Call To Us</h3>
              <p className="mt-2 text-figma-sm text-secondary">We are available 24/7, 7 days a week.</p>
              <p className="mt-1 text-figma-sm text-secondary">Phone: +88015-88888-9999</p>
            </div>
          </div>

          <div className="flex gap-4 figma-card p-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
              <Mail size={20} className="text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-figma-base font-medium text-secondary">Write To US</h3>
              <p className="mt-2 text-figma-sm text-secondary">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="mt-1 text-figma-sm text-secondary">Emails: customer@exclusive.com</p>
              <p className="text-figma-sm text-secondary">Emails: support@exclusive.com</p>
            </div>
          </div>
        </div>

        <form className="figma-card space-y-4 p-8" onSubmit={handleSubmit}>
          {errorMessage && (
            <p className="rounded-figma bg-primary/10 px-4 py-3 text-figma-sm text-primary">
              {errorMessage}
            </p>
          )}

          {statusMessage && (
            <p className="rounded-figma bg-secondary/10 px-4 py-3 text-figma-sm text-secondary">
              {statusMessage}
            </p>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Your Name *"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="figma-input"
            />
            <input
              type="email"
              placeholder="Your Email *"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="figma-input"
            />
          </div>
          <input
            type="tel"
            placeholder="Your Phone *"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="figma-input"
          />
          <textarea
            placeholder="Your Message"
            rows={6}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="figma-input resize-none"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={sending}>
              {sending ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  )
}
