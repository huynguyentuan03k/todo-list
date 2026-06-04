import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { Footer2 } from "@/layout/footer"
import Header from "@/layout/header"

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="min-h-screen flex-1 bg-background">
        <div className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 border-b border-border/70 bg-background/80 pb-4 backdrop-blur">
            <SidebarTrigger />
            <Header />
          </div>

          <div className="flex-1 py-6">
            <div className="mx-auto w-full max-w-[1680px]">
              <Outlet />
            </div>
          </div>

          <Footer2 className="py-10" />
        </div>
      </main>
    </SidebarProvider>
  )
}
