import SearchBox from "@/pages/components/custom/SearchBox"
import { NavLink, Outlet } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Building2,
  FolderTree,
  Users,
  Mic,
  Radio,
  BookOpen,
  Settings,
  Menu,
  ChevronDown,
  List,
  Plus,
  PanelLeftClose,
  PanelLeft,
  CircleUserRound
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import SinglePlayerQueue from "@/pages/aboutMe/SinglePlayerQueue"
import { AudioProvider as CustomAudioProvider } from "@/Context/AppAudioContext"

// Navigation items with icons and optional children
const NAV_ITEMS = [
  { path: "/portal/aboutme", label: "About Me", icon: CircleUserRound },
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/portal/publishers", label: "Publishers", icon: Building2 },
  { path: "/portal/categories", label: "Categories", icon: FolderTree },
  { path: "/portal/authors", label: "Authors", icon: Users },
  { path: "/portal/episodes", label: "Episodes", icon: Mic },
  {
    path: "/portal/podcasts",
    label: "Podcasts",
    icon: Radio,
    children: [
      { path: "/portal/podcasts", label: "All Podcasts", icon: List },
      { path: "/portal/podcasts/create", label: "Create New", icon: Plus },
    ]
  },
  { path: "/epub", label: "Epub", icon: BookOpen },
  { path: "/portal/settings", label: "Settings", icon: Settings },
] as const

// Single Nav Item Component
function NavItem({
  item,
  onNavigate,
  isCollapsed
}: {
  item: typeof NAV_ITEMS[number]
  onNavigate?: () => void
  isCollapsed?: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const Icon = item.icon

  // If item has children, render as Collapsible
  if ('children' in item && item.children) {
    if (isCollapsed) {
      // When sidebar is collapsed, show parent as regular link
      return (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <NavLink
                to={item.path}
                onClick={onNavigate}
              >
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="icon"
                    className={cn(
                      "w-full",
                      isActive && "bg-secondary"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                )}
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 pl-6 pt-1">
          {item.children.map((child) => {
            const ChildIcon = child.icon
            return (
              <NavLink
                key={child.path}
                to={child.path}
                end={child.path === item.path}
                onClick={onNavigate}
              >
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full justify-start gap-3",
                      isActive && "bg-secondary"
                    )}
                  >
                    <ChildIcon className="h-3.5 w-3.5" />
                    <span className="text-sm">{child.label}</span>
                  </Button>
                )}
              </NavLink>
            )
          })}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  // Regular nav item without children
  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <NavLink
              to={item.path}
              end={item.path === "/"}
              onClick={onNavigate}
            >
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="icon"
                  className={cn(
                    "w-full",
                    isActive && "bg-secondary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              )}
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{item.label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <NavLink
      to={item.path}
      end={item.path === "/"}
      onClick={onNavigate}
    >
      {({ isActive }) => (
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-3",
            isActive && "bg-secondary"
          )}
        >
          <Icon className="h-4 w-4" />
          <span>{item.label}</span>
        </Button>
      )}
    </NavLink>
  )
}

// Sidebar Content Component (reusable for both desktop and mobile)
function SidebarContent({
  onNavigate,
  isCollapsed,
  onToggleCollapse
}: {
  onNavigate?: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}) {
  return (
    <>
      {/* Header with Search */}
      {!isCollapsed && (
        <div className="p-4 border-b">
          <SearchBox />
        </div>
      )}

      {/* Toggle Button */}
      {onToggleCollapse && (
        <div className={cn("p-2 border-b", isCollapsed && "flex justify-center")}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className={cn(!isCollapsed && "w-full justify-start gap-3")}
          >
            {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            {!isCollapsed && <span className="text-sm">Collapse</span>}
          </Button>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-2">
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.path}
              item={item}
              onNavigate={onNavigate}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      {!isCollapsed && (
        <>
          <Separator />
          <div className="p-4">
            <h2 className="text-sm font-semibold text-muted-foreground">
              React Router Contacts
            </h2>
          </div>
        </>
      )}
    </>
  )
}

export default function Root() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="h-screen flex">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex border-r bg-background flex-col transition-all duration-300",
          isCollapsed ? "w-[70px]" : "w-[280px]"
        )}
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
      </aside>

      {/* Mobile Header + Sheet */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 border-b bg-background">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-semibold">Menu</h1>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0 flex flex-col [&>button]:hidden">
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <CustomAudioProvider>

        {/* Main Content */}
        <main className="flex-1 overflow-auto pt-24 px-4 pb-4 lg:p-4 mb-10">
          {/**
         * tu 0 - 1024 > : padding 4
         * tu 0 - 640 > : padding top 20 va padding left right 4
         */}
          <Outlet />
        </main>

        {/* audio phải nằm ngoài layour, sử dụng position fixed */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <SinglePlayerQueue />
        </div>
      </CustomAudioProvider>

    </div>
  )
}
