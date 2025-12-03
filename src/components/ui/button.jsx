import * as React from "react";
import { cn } from "@/lib/utils";

export function Button({ className = "", variant = "default", size = "default", asChild = false, children, ...props }) {
  const Comp = asChild ? "span" : "button";
  const base = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50";
  const sizeClass =
    size === "sm"
      ? "h-9 px-3"
      : size === "lg"
      ? "h-11 px-8"
      : size === "icon"
      ? "h-10 w-10"
      : "h-10 px-4 py-2";
  const variantClass =
    variant === "ghost"
      ? "hover:bg-accent"
      : variant === "link"
      ? "text-primary underline-offset-4 hover:underline"
      : variant === "outline"
      ? "border border-input bg-background hover:bg-accent"
      : "bg-primary text-white hover:bg-primary/90";

  return (
    <Comp className={cn(base, sizeClass, variantClass, className)} {...props}>
      {children}
    </Comp>
  );
}

export default Button;
