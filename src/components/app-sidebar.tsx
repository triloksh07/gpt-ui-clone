import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import {
    Search,
    Library,
    LayoutGrid,
    Code2,
    MoreHorizontal,
    Plus,
} from "lucide-react"

const pinned = [
    "Landing Page Design",
    "K3 studios",
    "GSAP Website",
]

const projects = [
    "DeepSession",
    "ChaiForms",
    "Portfolio",
]

const chats = [
    "React State Issue",
    "GSAP Animations",
    "Wireframe Sketch",
]

export function AppSidebar() {
    return (
        <Sidebar variant="sidebar" collapsible="icon">

            {/* HEADER */}

            <SidebarHeader className="p-2">
                <div className="flex items-center justify-between">
                    <div className="h-8 w-8 rounded-md bg-white/10" />
                    <SidebarTrigger />
                </div>

                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className="bg-muted hover:bg-muted"
                        >
                            <Plus />
                            <span>New chat</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* CONTENT */}

            <SidebarContent>

                {/* MAIN NAV */}

                <SidebarGroup>
                    <SidebarMenu>

                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <Search />
                                <span>Search chats</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <Library />
                                <span>Library</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <LayoutGrid />
                                <span>Apps</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <Code2 />
                                <span>Codex</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <MoreHorizontal />
                                <span>More</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                    </SidebarMenu>
                </SidebarGroup>

                {/* PINNED */}

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Pinned
                    </SidebarGroupLabel>

                    <SidebarMenu>
                        {pinned.map((item) => (
                            <SidebarMenuItem key={item}>
                                <SidebarMenuButton>
                                    <span>{item}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>

                {/* PROJECTS */}

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Projects
                    </SidebarGroupLabel>

                    <SidebarMenu>
                        {projects.map((item) => (
                            <SidebarMenuItem key={item}>
                                <SidebarMenuButton>
                                    <span>{item}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>

                {/* CHATS */}

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Chats
                    </SidebarGroupLabel>

                    <SidebarMenu>
                        {chats.map((item) => (
                            <SidebarMenuItem key={item}>
                                <SidebarMenuButton>
                                    <span>{item}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>

            </SidebarContent>

            {/* FOOTER */}

            <SidebarFooter>

                <SidebarMenu>

                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <span>Help</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs">
                                TR
                            </div>

                            <div className="flex flex-col items-start">
                                <span>Trilok</span>
                                <span className="text-xs text-muted-foreground">
                                    Go
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>

            </SidebarFooter>

        </Sidebar>
    )
}