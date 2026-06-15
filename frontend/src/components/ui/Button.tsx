import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'black'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variantStyles = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'bg-secondary text-white hover:bg-secondary/90',
  black: 'bg-secondary text-white hover:bg-secondary/90',
  outline:
    'border border-secondary bg-transparent text-secondary hover:bg-bg-light',
  ghost: 'text-secondary hover:bg-bg-light',
}

const sizeStyles = {
  sm: 'h-9 px-6 text-figma-sm',
  md: 'h-11 px-8 text-figma-base',
  lg: 'h-14 min-w-[234px] px-12 text-figma-base font-medium',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-figma transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
