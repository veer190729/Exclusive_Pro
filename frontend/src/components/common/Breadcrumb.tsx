import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface BreadcrumbItem {
  label: string
  path?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex flex-wrap items-center gap-3 text-figma-sm">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-3">
          {index > 0 && (
            <ChevronRight size={14} className="text-text-light" strokeWidth={1.5} />
          )}
          {item.path ? (
            <Link to={item.path} className="text-text-light transition-colors hover:text-secondary">
              {item.label}
            </Link>
          ) : (
            <span className="text-text-light">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
