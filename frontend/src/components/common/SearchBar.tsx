import { Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchBarProps {
  placeholder?: string
  onSearch?: () => void
}

export function SearchBar({
  placeholder = 'What are you looking for?',
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) {
      navigate(`/products?search=${encodeURIComponent(trimmed)}`)
    } else {
      navigate('/products')
    }
    onSearch?.()
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-[243px]">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="h-[38px] w-full rounded-figma bg-bg-light pl-3 pr-10 text-figma-xs outline-none placeholder:text-text-light focus:ring-1 focus:ring-border-light"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
      >
        <Search size={18} strokeWidth={1.5} />
      </button>
    </form>
  )
}
