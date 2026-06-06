import { type ReactNode, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

import LanguageSelect from "@/components/custom/language-select"
import ThemeToggle from "@/components/custom/theme-toggle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

function HeaderIcon({
  href,
  onClick,
  label,
  children,
  className,
}: {
  href?: string
  onClick?: () => void
  label: string
  children: ReactNode
  className?: string
}) {
  const sharedClassName =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/80 text-slate-700 shadow-sm backdrop-blur transition-colors hover:bg-blue-600 hover:text-white"

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className={cn(sharedClassName, className)}
          >
            {children}
          </a>
        ) : (
          <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className={cn(sharedClassName, className)}
          >
            {children}
          </button>
        )}
      </TooltipTrigger>
      <TooltipContent className="border-blue-500 bg-blue-600 text-white shadow-lg">
        {label}
      </TooltipContent>
    </Tooltip>
  )
}

function SwaggerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M7.5 7.5H16.5C17.3284 7.5 18 8.17157 18 9V15C18 15.8284 17.3284 16.5 16.5 16.5H7.5C6.67157 16.5 6 15.8284 6 15V9C6 8.17157 6.67157 7.5 7.5 7.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M9 11.25H15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 13.75H13.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M9.75 7.5V6.75C9.75 5.7835 10.5335 5 11.5 5H12.5C13.4665 5 14.25 5.7835 14.25 6.75V7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function HorizonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M4 15.5C6.25 13.25 8.2 12.2 10.25 12.2C12.3 12.2 14.1 13.2 16 15.1C17.35 16.45 18.7 17.25 20 17.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4 11.75C6.15 9.6 8.15 8.6 10.2 8.6C12.25 8.6 14.05 9.5 15.9 11.35C17.45 12.9 18.95 13.75 20 13.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path d="M4 19.25H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function ClearCacheIcon({
  className,
  spinning,
}: {
  className?: string
  spinning?: boolean
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(className, spinning && "animate-spin")}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7.2 7.2A7.25 7.25 0 0 1 19.25 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M17.5 12h1.75v-1.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.8 16.8A7.25 7.25 0 0 1 4.75 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.5 12H4.75v1.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Header() {
  const queryClient = useQueryClient()
  const [isClearing, setIsClearing] = useState(false)

  const handleClearCache = () => {
    if (isClearing) return
    setIsClearing(true)

    queryClient.clear()

    ;["PER_PAGE", "counter-storage"].forEach((key) => {
      localStorage.removeItem(key)
    })

    sessionStorage.clear()

    window.setTimeout(() => {
      setIsClearing(false)
      window.location.reload()
    }, 650)
  }

  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <HeaderIcon href="/swagger" label="Swagger">
          <SwaggerIcon className="h-4 w-4" />
        </HeaderIcon>

        <HeaderIcon href="/horizon" label="Horizon">
          <HorizonIcon className="h-4 w-4" />
        </HeaderIcon>

        <HeaderIcon onClick={handleClearCache} label="Clear cache">
          <ClearCacheIcon className="h-4 w-4" spinning={isClearing} />
        </HeaderIcon>

        <LanguageSelect />

        <ThemeToggle />
      </div>
    </TooltipProvider>
  )
}
