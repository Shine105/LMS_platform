import { cn } from "@/lib/utils";
import { Asterisk, AsteriskIcon } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";


export default function RequiredLabelIcon({ className,...props}: ComponentPropsWithoutRef<typeof AsteriskIcon>) {
  return (
    <AsteriskIcon {...props} className={cn("text-destructive inline size-4 align-top", className)}
    />
  )
}


