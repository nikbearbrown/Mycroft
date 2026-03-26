import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import Link from "next/link"

const baseButtonStyles = cva(
  "inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
)

const secondaryButtonStyles = cva(
  "bg-black text-white shadow hover:bg-gray-800 dark:border dark:border-input dark:bg-background dark:shadow-sm dark:hover:bg-accent dark:hover:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-input",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type ButtonBaseProps = VariantProps<typeof secondaryButtonStyles> & {
  className?: string
  asChild?: boolean
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined
  }

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string
  }

type SecondaryButtonProps = ButtonAsButton | ButtonAsLink

const SecondaryButton = React.forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  ({ className, variant, asChild = false, href, ...props }, ref) => {
    const styles = cn(baseButtonStyles(), secondaryButtonStyles({ variant }), className)

    if (href) {
      return (
        <Link href={href} className={styles} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {props.children}
        </Link>
      )
    }

    if (asChild) {
      return <Slot className={styles} ref={ref} {...props} />
    }

    return (
      <button className={styles} ref={ref} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)} />
    )
  }
)
SecondaryButton.displayName = "SecondaryButton"

export default SecondaryButton 