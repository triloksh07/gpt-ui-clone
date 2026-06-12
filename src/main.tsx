import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <SidebarProvider>
        <AppSidebar />
        {/* <SidebarTrigger /> */}
        <App />
      </SidebarProvider>
    </ThemeProvider>
  </StrictMode>
)
