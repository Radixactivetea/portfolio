'use client'

import * as React from 'react'
import Link from 'next/link'

import type { VariantProps } from 'class-variance-authority'

import { Button, type buttonVariants } from '@/components/ui/button'

import { cn } from '@/lib/utils'

const CraftButtonContext = React.createContext<{
  size?: VariantProps<typeof buttonVariants>['size']
}>({})

interface CraftButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: VariantProps<typeof buttonVariants>['size']
  children?: React.ReactNode
  asChild?: boolean
  /** If provided, renders as a link that navigates to this path (e.g. "/about") */
  href?: string
}

interface CraftButtonLabelProps {
  children: React.ReactNode
  className?: string
}

interface CraftButtonIconProps {
  children: React.ReactNode
  className?: string
}

function CraftButtonLabel({ children, className }: CraftButtonLabelProps) {
  return (
    <span
      className={cn(
        'group-hover:text-foreground group-active:text-foreground relative z-2 transition-colors duration-500',
        className
      )}
    >
      {children}
    </span>
  )
}

function CraftButtonIcon({ children, className }: CraftButtonIconProps) {
  const { size } = React.useContext(CraftButtonContext)
  const iconSize = size === 'lg' ? 'size-6' : size === 'sm' ? 'size-4' : 'size-5'

  return (
    <span className={cn('relative z-1', iconSize, className)}>
      <span
        className={cn(
          'bg-background absolute inset-0 -z-1 rounded-full transition-transform duration-500 group-hover:scale-[15] group-active:scale-[15]',
          iconSize
        )}
      />
      <span
        className={cn(
          'bg-background text-primary group-hover:bg-primary group-active:bg-primary group-hover:text-background group-active:text-background relative z-2 flex items-center justify-center rounded-full transition-all duration-500',
          iconSize
        )}
      >
        {children}
      </span>
    </span>
  )
}

function CraftButton(props: CraftButtonProps) {
  const { children, size, asChild = false, href, className, ...rest } = props

  const buttonClassName = cn(
    'group hover:bg-background dark:hover:border-primary/30 relative cursor-pointer touch-manipulation overflow-hidden rounded-full duration-500 hover:shadow-md dark:border dark:border-transparent [-webkit-tap-highlight-color:transparent]',
    className
  )

  // If an href is given, render the button as a Link (via asChild) so it
  // navigates on click/tap while keeping all the hover/active animations.
  if (href) {
    return (
      <CraftButtonContext.Provider value={{ size }}>
        <Button size={size} asChild className={buttonClassName}>
          <Link href={href} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
            {children}
          </Link>
        </Button>
      </CraftButtonContext.Provider>
    )
  }

  return (
    <CraftButtonContext.Provider value={{ size }}>
      <Button
        size={size}
        asChild={asChild}
        className={buttonClassName}
        {...rest}
      >
        {children}
      </Button>
    </CraftButtonContext.Provider>
  )
}

export {
  CraftButton,
  CraftButtonLabel,
  CraftButtonIcon,
  type CraftButtonProps,
  type CraftButtonLabelProps,
  type CraftButtonIconProps
}