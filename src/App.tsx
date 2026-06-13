
import { AppSidebar } from "./components/app-sidebar"
import { SidebarProvider } from "./components/ui/sidebar"
import { TooltipProvider } from "./components/ui/tooltip"
import { ChatInterface } from "./components/chat-interface"

export function App() {
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <div className="flex min-h-svh p-6">

          <AppSidebar />

          <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
            <ChatInterface />
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}

export default App
