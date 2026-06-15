import { BROWSE_CATEGORIES } from '@/data/mockData'
import { SectionHeading } from '@/components/common/SectionHeading'

export function BrowseByCategory() {
  return (
    <section className="section-figma">
      <SectionHeading tag="Categories" title="Browse By Category" className="mb-[60px]" />

      <div className="flex flex-wrap justify-center gap-[30px] lg:justify-between">
        {BROWSE_CATEGORIES.map((category) => (
          <button
            key={category.id}
            type="button"
            className="flex h-[145px] w-[170px] flex-col items-center justify-center gap-4 rounded-figma border border-line-light bg-bg-secondary transition-shadow hover:shadow-figma"
          >
            <div className="flex h-14 w-14 items-center justify-center">
              <img src={category.icon} alt={category.name} className="h-full w-full object-contain" />
            </div>
            <span className="text-figma-base font-medium text-secondary">{category.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <span className="h-3 w-3 rounded-full bg-primary" />
        <span className="h-3 w-3 rounded-full bg-primary/30" />
        <span className="h-3 w-3 rounded-full bg-primary/30" />
      </div>
    </section>
  )
}
