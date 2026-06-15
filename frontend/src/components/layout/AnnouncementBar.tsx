import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/layout/Container'

export function AnnouncementBar() {
  return (
    <div className="bg-secondary text-white">
      <Container className="flex h-12 items-center justify-between">
        <div className="hidden w-[74px] lg:block" />

        <p className="flex-1 text-center text-figma-sm">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
          <Link to="/products" className="font-semibold underline underline-offset-2">
            ShopNow
          </Link>
        </p>

        <div className="flex w-[74px] items-center justify-end gap-1 text-figma-sm">
          <span>English</span>
          <ChevronDown size={16} strokeWidth={1.5} />
        </div>
      </Container>
    </div>
  )
}
