import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'accent' | 'secondary' | 'ghost'

const styles: Record<Variant, string> = {
  primary:
    'bg-fg text-ink-950 hover:bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_30px_-8px_rgba(129,140,248,0.55)]',
  accent:
    'bg-gradient-to-r from-teal-300 to-indigo-300 text-ink-950 hover:brightness-110 shadow-[0_8px_30px_-8px_rgba(94,234,212,0.45)]',
  secondary: 'border border-line-strong bg-white/[0.03] text-fg hover:bg-white/[0.07] hover:border-white/20',
  ghost: 'text-fg-muted hover:text-fg hover:bg-white/[0.05]',
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  children: ReactNode
}

export function ButtonLink({ variant = 'primary', className = '', children, ...rest }: ButtonLinkProps) {
  const external = rest.href?.startsWith('http')
  return (
    <a
      className={`group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] ${styles[variant]} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}
