import { useCountdown } from '@/hooks/useCountdown'

interface CountdownTimerProps {
  targetDate: Date
}

interface TimeUnitProps {
  label: string
  value: string
}

function TimeUnit({ label, value }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-figma-xs font-medium text-secondary">{label}</span>
      <span className="text-[32px] font-bold leading-none tracking-wider text-secondary">
        {value}
      </span>
    </div>
  )
}

function Separator() {
  return (
    <span className="mb-1 self-end text-[32px] font-bold leading-none text-primary">:</span>
  )
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate)

  return (
    <div className="flex items-end gap-4">
      <TimeUnit label="Days" value={days} />
      <Separator />
      <TimeUnit label="Hours" value={hours} />
      <Separator />
      <TimeUnit label="Minutes" value={minutes} />
      <Separator />
      <TimeUnit label="Seconds" value={seconds} />
    </div>
  )
}
