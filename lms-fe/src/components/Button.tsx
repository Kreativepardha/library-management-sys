import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold font-sans capitalize  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground bg-black text-white   hover:bg-sky-400",
        destructive: "bg-primary text-primary-foreground  border-red-200 border-2  hover:bg-red-400",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-black text-white text-primary-foreground    hover:bg-yellow-400",
        ghost: "hover:bg-yellow-400 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ asChild = false, variant, size, ...props }) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={buttonVariants({ variant, size })} {...props} />
  );
};