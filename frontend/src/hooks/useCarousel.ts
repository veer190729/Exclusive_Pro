import { useCallback, useState } from 'react'

export function useCarousel(totalSlides: number) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(((index % totalSlides) + totalSlides) % totalSlides)
    },
    [totalSlides],
  )

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo])
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo])

  return { currentIndex, goTo, next, prev }
}
