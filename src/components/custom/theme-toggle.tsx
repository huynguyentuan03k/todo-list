import { MoonStar, SunMedium } from "lucide-react"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Toggle theme"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/80 text-slate-700 shadow-sm backdrop-blur transition-colors hover:bg-blue-600 hover:text-white"
        >
          {isDark ? (
            <SunMedium className="h-4 w-4" />
          ) : (
            <MoonStar className="h-4 w-4" />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent className="border-blue-500 bg-blue-600 text-white shadow-lg">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </TooltipContent>
    </Tooltip>
  )
}
