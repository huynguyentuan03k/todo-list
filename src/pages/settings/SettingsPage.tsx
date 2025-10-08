// src/pages/settings/SettingsPage.tsx
import { Button } from "@/components/ui/button"
import { NavLink, Outlet, useLocation } from "react-router-dom"

export default function SettingsPage() {
  const location = useLocation()

  return (
    <div className="flex p-6 gap-6">
      {/* Left vertical nav */}
      <nav className="w-48 flex flex-col space-y-2 border-r pr-4">
        <NavLink to="SeasonalThemes">
          {({ isActive }) => (
            <Button
              variant={isActive ? "default" : "ghost"}
              className="justify-start w-full"
            >
              Seasonal Themes
            </Button>
          )}
        </NavLink>

        <NavLink to="keywordSuggestions">
          {({ isActive }) => (
            <Button
              variant={isActive ? "default" : "ghost"}
              className="justify-start w-full"
            >
              Keyword Suggestions
            </Button>
          )}
        </NavLink>
      </nav>

      {/* Sub-page content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
