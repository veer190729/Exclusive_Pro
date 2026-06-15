import { ChevronRight } from 'lucide-react'
import { CATEGORIES } from '@/constants/categories'

export function CategorySidebar() {
  return (
    <aside className="hidden w-[217px] shrink-0 border-r border-line pr-6 lg:block">
      <ul className="flex flex-col gap-4">
        {CATEGORIES.map((category) => (
          <li key={category.id}>
            <button
              type="button"
              className="flex w-full items-center justify-between text-figma-base text-secondary transition-colors hover:text-primary"
            >
              <span>{category.name}</span>
              {category.hasSubmenu && <ChevronRight size={18} strokeWidth={1.5} />}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
