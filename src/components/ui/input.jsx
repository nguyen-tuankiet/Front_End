import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef(({ className = "", type = "text", ...props }, ref) => {
  const base =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

  return <input type={type} className={cn(base, className)} ref={ref} {...props} />;
});

Input.displayName = "Input";
