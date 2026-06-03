import { useState } from "react"
import LanguageSelect from "@/components/custom/language-select"
import ThemeToggle from "@/components/custom/theme-toggle"
import { Button } from "@/components/ui/button"
import { BookOpenText, RotateCcw, Gauge } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"

export default function Header() {
  const queryClient = useQueryClient()
  const [isClearing, setIsClearing] = useState(false)

  const handleClearCache = async () => {
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
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Button asChild variant="outline" className="h-10 gap-2 rounded-full">
        <a href="/swagger" target="_blank" rel="noreferrer">
          <img src="/swagger.webp" alt="Swagger" className="h-4 w-4" />
          <span>Swagger</span>
        </a>
      </Button>

      <Button asChild variant="outline" className="h-10 gap-2 rounded-full">
        <a href="/horizon" target="_blank" rel="noreferrer">
          <Gauge className="h-4 w-4" />
          <span>Horizon</span>
        </a>
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={handleClearCache}
        className="h-10 gap-2 rounded-full"
        disabled={isClearing}
      >
        <RotateCcw className={isClearing ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
        <span>Clear cache</span>
      </Button>

      <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/80 p-1 shadow-sm backdrop-blur">
        <BookOpenText className="ml-2 h-4 w-4 text-muted-foreground" />
        <LanguageSelect />
      </div>

      <ThemeToggle />
    </div>
  )
}
