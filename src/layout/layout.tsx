import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { Footer2 } from "@/layout/footer"
import Header from "@/layout/header"

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Header />
        <Outlet />
        <Footer2 />
      </main>
    </SidebarProvider>
  )
}
