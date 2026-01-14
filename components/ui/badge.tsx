import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary/80 text-primary-foreground shadow hover:bg-primary/60",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
                outline: "text-foreground",
                idea: "border-transparent bg-yellow-500/15 text-yellow-500 hover:bg-yellow-500/25",
                script: "border-transparent bg-blue-500/15 text-blue-500 hover:bg-blue-500/25",
                recording: "border-transparent bg-red-500/15 text-red-500 hover:bg-red-500/25",
                editing: "border-transparent bg-purple-500/15 text-purple-500 hover:bg-purple-500/25",
                scheduled: "border-transparent bg-orange-500/15 text-orange-500 hover:bg-orange-500/25",
                published: "border-transparent bg-green-500/15 text-green-500 hover:bg-green-500/25",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
