import { type ReactNode } from "react"

type BadgeVariant =
  | "default"
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "purple"
  | "pink"
  | "primary"

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-400/10 text-gray-400",
  primary: "bg-primary/10 text-primary",
  red: "bg-red-400/10 text-red-400",
  yellow: "bg-yellow-400/10 text-yellow-500",
  green: "bg-green-400/10 text-green-400",
  blue: "bg-blue-400/10 text-blue-400",
  indigo: "bg-indigo-400/10 text-indigo-400",
  purple: "bg-purple-400/10 text-purple-400",
  pink: "bg-pink-400/10 text-pink-400",
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  )
}
