import { useEffect, useState } from 'react'

interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeRemaining(targetDate: Date): CountdownTime {
  const total = Math.max(0, targetDate.getTime() - Date.now())

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  }
}

function pad(value: number): string {
  return value.toString().padStart(2, '0')
}

export function useCountdown(targetDate: Date) {
  const [time, setTime] = useState<CountdownTime>(() => getTimeRemaining(targetDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(targetDate))
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return {
    days: pad(time.days),
    hours: pad(time.hours),
    minutes: pad(time.minutes),
    seconds: pad(time.seconds),
  }
}
