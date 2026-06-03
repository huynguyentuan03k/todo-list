// src/pages/settings/SettingsPage.tsx
import { Button } from "@/components/ui/button"
import { NavLink, Outlet, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const location = useLocation()

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="rounded-2xl border border-border/70 bg-background/80 p-4 shadow-sm backdrop-blur">
        <div className="mb-4">
          <p className="text-sm font-semibold tracking-tight">Settings</p>
          <p className="text-xs text-muted-foreground">
            {location.pathname.includes("SeasonalThemes")
              ? "Seasonal Themes"
              : "Keyword Suggestions"}
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          <NavLink to="SeasonalThemes">
            {({ isActive }) => (
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "justify-start w-full rounded-xl px-4 py-6 text-left",
                  isActive && "shadow-sm"
                )}
              >
                Seasonal Themes
              </Button>
            )}
          </NavLink>

          <NavLink to="keywordSuggestions">
            {({ isActive }) => (
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "justify-start w-full rounded-xl px-4 py-6 text-left",
                  isActive && "shadow-sm"
                )}
              >
                Keyword Suggestions
              </Button>
            )}
          </NavLink>
        </nav>
      </aside>

      {/* Sub-page content */}
      <section className="min-w-0 rounded-2xl border border-border/70 bg-background/80 p-4 shadow-sm backdrop-blur sm:p-6 lg:p-8">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Portal settings
            </p>
            <h1 className="text-xl font-semibold tracking-tight">
              {location.pathname.includes("SeasonalThemes")
                ? "Seasonal Themes"
                : "Keyword Suggestions"}
            </h1>
          </div>
        </div>

        <div className="min-w-0">
          <Outlet />
        </div>
      </section>
    </div>
  )
}
