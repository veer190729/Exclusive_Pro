import { Container } from '@/components/layout/Container'
import { CategorySidebar } from '@/components/home/CategorySidebar'
import { HeroBanner } from '@/components/home/HeroBanner'

export function HeroSection() {
  return (
    <Container className="pt-11">
      <div className="flex gap-[45px]">
        <CategorySidebar />
        <HeroBanner />
      </div>
    </Container>
  )
}
