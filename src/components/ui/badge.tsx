import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type RadixColor = (typeof COLORS)[number];

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent [a&]:hover:opacity-90",
        secondary: "border-transparent [a&]:hover:opacity-80",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "[a&]:hover:opacity-80",
        surface: "[a&]:hover:opacity-80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  color?: RadixColor;
}

function Badge({
  className,
  variant = "default",
  color = "gray",
  asChild = false,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  const getColorStyles = () => {
    switch (variant) {
      case "default":
        return {
          backgroundColor: `var(--${color}-9)`,
          color: `var(--${color}-contrast)`,
        };
      case "secondary":
        return {
          backgroundColor: `var(--${color}-3)`,
          color: `var(--${color}-11)`,
        };
      case "surface":
        return {
          backgroundColor: `var(--${color}-surface)`,
          boxShadow: `0 0 0 1px var(--${color}-6)`,
          color: `var(--${color}-11)`,
        };
      case "outline":
        return {
          color: `var(--${color}-11)`,
          boxShadow: `0 0 0 1px var(--${color}-8)`,
          // borderColor: `var(--${color}-7)`,
        };
      default:
        return {};
    }
  };

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      style={getColorStyles()}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Badge, badgeVariants, type BadgeProps };
