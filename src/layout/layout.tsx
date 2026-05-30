import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import LanguageSelect from "@/components/custom/language-select"

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div className="flex items-end justify-end mb-3">
          <LanguageSelect />
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
