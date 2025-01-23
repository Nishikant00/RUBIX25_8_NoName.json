import { DSidebar } from "@/components/DSidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <DSidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  )
}

