import { ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import { HERO_SLIDES } from '@/data/mockData'
import { useCarousel } from '@/hooks/useCarousel'

export function HeroBanner() {
  const { currentIndex, goTo, next } = useCarousel(HERO_SLIDES.length)
  const slide = HERO_SLIDES[currentIndex]

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <div
      className="relative flex h-[344px] flex-1 items-center overflow-hidden rounded-figma"
      style={{ backgroundColor: slide.bgColor }}
    >
      <div className="flex w-full items-center justify-between pl-16 pr-8">
        <div className="z-10 max-w-[349px] text-white">
          <div className="mb-3 flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden>
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <span className="text-figma-base">{slide.brand}</span>
          </div>
          <h2 className="mb-4 text-figma-hero font-semibold">{slide.subtitle}</h2>
          <p className="mb-4 text-figma-base opacity-80">{slide.title}</p>
          <button
            type="button"
            className="group inline-flex items-center gap-2 border-b border-white pb-1 text-figma-base transition-opacity hover:opacity-80"
          >
            {slide.cta}
            <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="hidden md:block">
          <img
            src={slide.image}
            alt={slide.title}
            className="h-[300px] w-auto object-contain"
          />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-3 w-3 rounded-full transition-colors ${
              index === currentIndex
                ? 'border-2 border-white bg-primary'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
