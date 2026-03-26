import * as React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const baseButtonStyles = "inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
const primaryButtonStyles = "bg-black text-white shadow hover:bg-gray-800 dark:border dark:border-input dark:bg-background dark:shadow-sm dark:hover:bg-accent dark:hover:text-accent-foreground"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
}

const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, href, ...props }, ref) => {
    const styles = cn(baseButtonStyles, primaryButtonStyles, className)

    if (href) {
      return (
        <Link href={href} className={styles}>
          {props.children}
        </Link>
      )
    }

    return (
      <button
        className={styles}
        ref={ref}
        {...props}
      />
    )
  }
)
PrimaryButton.displayName = "PrimaryButton"

export default PrimaryButton 