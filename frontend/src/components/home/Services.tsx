import { Headphones, ShieldCheck, Truck } from 'lucide-react'
import { SERVICES } from '@/data/mockData'

const iconMap = {
  truck: Truck,
  headphones: Headphones,
  shield: ShieldCheck,
}

export function Services() {
  return (
    <section className="section-figma">
      <div className="grid gap-6 md:grid-cols-3">
        {SERVICES.map((service) => {
          const Icon = iconMap[service.icon as keyof typeof iconMap]
          return (
            <div
              key={service.title}
              className="flex flex-col items-center gap-4 rounded-figma border border-line px-8 py-8 text-center md:py-10"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10">
                <Icon size={32} strokeWidth={1.5} className="text-secondary" />
              </div>
              <h3 className="text-figma-xl font-semibold uppercase tracking-wide text-secondary">
                {service.title}
              </h3>
              <p className="text-figma-sm text-secondary">{service.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
