import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide transition-[background-color,color,box-shadow,opacity,transform] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-45 disabled:cursor-default focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sage",
  {
    variants: {
      variant: {
        primary:
          "bg-sage-deep text-paper shadow-[0_10px_28px_rgba(107,125,94,0.28)] hover:bg-forest",
        ghost:
          "bg-transparent text-forest shadow-[0_0_0_1px_rgba(47,61,50,0.18)] hover:bg-paper",
        quiet: "bg-transparent text-muted hover:text-forest",
      },
      size: {
        md: "h-11 px-6 text-sm rounded-pill",
        sm: "h-9 px-4 text-xs rounded-pill",
        lg: "h-12 px-7 text-sm rounded-pill",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
