import { Breadcrumb } from '@/components/common/Breadcrumb'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Container } from '@/components/layout/Container'
import { TEAM_MEMBERS } from '@/data/mockData'

const STATS = [
  { value: '10.5k', label: 'Sellers active our site' },
  { value: '33k', label: 'Monthly Product Sale', highlight: true },
  { value: '45.5k', label: 'Customer active in our site' },
  { value: '25k', label: 'Annual gross sale in our site' },
]

export function AboutPage() {
  return (
    <Container className="py-20">
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'About' }]} />

      <div className="mt-16 grid items-center gap-16 lg:grid-cols-2">
        <div>
          <h1 className="text-figma-2xl font-semibold tracking-wide text-secondary">Our Story</h1>
          <div className="mt-8 space-y-4 text-figma-base leading-6 text-secondary">
            <p>
              Launched in 2015, Exclusive is South Asia&apos;s premier online shopping marketplace
              with an active presence in Bangladesh. Supported by a wide range of tailored
              marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands
              and serves 3 million customers across the region.
            </p>
            <p>
              Exclusive has more than 1 Million products to offer, growing at a very fast pace.
              Exclusive offers a diverse assortment in categories ranging from consumer.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-figma bg-primary/8 p-0">
          <img
            src="/assets/about/shopping.svg.jpg"
            alt="Shopping"
            className="max-h-[400px] w-full object-contain"
          />
        </div>
      </div>

      <div className="mt-[100px] grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-figma border p-8 text-center ${
              stat.highlight
                ? 'border-primary bg-primary text-white'
                : 'border-line-light bg-bg-secondary'
            }`}
          >
            <p className="text-figma-2xl font-bold">{stat.value}</p>
            <p className={`mt-2 text-figma-base ${stat.highlight ? 'text-white/90' : 'text-secondary'}`}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

<section className="mt-[100px]">
  <SectionHeading
    tag="Team"
    title="Our Team"
    className="mb-[60px]"
  />

  <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
    {TEAM_MEMBERS.map((member) => (
      <div key={member.name} className="text-center">
        <div className="mx-auto mb-6 flex h-[420px] w-[280px] items-end justify-center overflow-hidden rounded-figma">
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full object-cover"
          />
        </div>

        <h3 className="text-figma-xl font-medium text-secondary">
          {member.name}
        </h3>

        <p className="mt-2 text-figma-base text-secondary">
          {member.role}
        </p>

        <div className="mt-4 flex justify-center gap-3">
          {['𝕏', 'in', 'f'].map((icon) => (
            <span
              key={icon}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm transition-colors hover:bg-bg-secondary"
            >
              {icon}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>
    </Container>
  )
}
