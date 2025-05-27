"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, toast, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

type ActionToastProps = {
  actionData: { error: boolean; message: string }
  duration?: number
  className?: string
}

function actionToast({ actionData, ...props }: ActionToastProps) {
  return toast(
    <div className="flex flex-col gap-1">
      <strong className={actionData.error ? "text-red-600" : "text-green-600"}>
        {actionData.error ? "Error" : "Success"}
      </strong>
      <span>{actionData.message}</span>
    </div>,
    {
      duration: props.duration,
      className: props.className,
    }
  )
}

export { Toaster, actionToast }
