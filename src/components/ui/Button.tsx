import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary: 'bg-signal text-signal-ink shadow-signal hover:bg-[#ff7d55] font-semibold',
  secondary: 'border border-line-strong bg-white/[0.03] text-fg hover:border-white/25 hover:bg-white/[0.07] font-medium',
  ghost: 'text-fg-muted hover:text-fg hover:bg-white/[0.05] font-medium',
}

const sizes: Record<Size, string> = {
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-[0.95rem] gap-2.5',
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
}

/** Link styled as a button. External URLs open in a new tab automatically. */
export function ButtonLink({ variant = 'primary', size = 'md', className = '', children, ...rest }: ButtonLinkProps) {
  const external = rest.href?.startsWith('http')
  return (
    <a
      className={`group inline-flex items-center justify-center rounded-full whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 ease-out active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}
