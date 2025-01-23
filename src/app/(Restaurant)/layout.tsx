import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DSidebar } from "@/components/DSidebar"


export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
          <SidebarProvider>
              <DSidebar />
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </SidebarProvider>
  )
}

