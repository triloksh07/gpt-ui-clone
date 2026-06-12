// "use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarTrigger,
    useSidebar,
    SidebarMenuAction,
} from "@/components/ui/sidebar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"

import {
    Sparkles,
    Search,
    Library,
    LayoutGrid,
    Code2,
    MoreHorizontal,
    Plus,
    Pin,
    MessageSquare,
    FolderOpen,
    ChevronDown,
    Settings,
    HelpCircle,
    LogOut,
    User,
    Crown,
    Image,
    Microscope,
    Bot,
} from "lucide-react"

const data = {
    pinned: [
        { id: "1", title: "Landing Page Design" },
        { id: "2", title: "K3 Studios" },
        { id: "3", title: "GSAP Website" },
    ],

    projects: [
        { id: "1", title: "DeepSession" },
        { id: "2", title: "ChaiForms" },
        { id: "3", title: "Portfolio" },
    ],

    chats: [
        { id: "1", title: "React State Issue" },
        { id: "2", title: "GSAP Animations" },
        { id: "3", title: "Wireframe Sketch" },
    ],
}

function FloatingList({
    title,
    items,
}: {
    title: string
    items: { id: string; title: string }[]
}) {
    return (
        <div className="w-72">
            <div className="border-b px-3 py-2 font-medium">
                {title}
            </div>

            <div className="max-h-96 overflow-auto p-2">
                {items.map((item) => (
                    <button
                        key={item.id}
                        className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
                    >
                        {item.title}
                    </button>
                ))}
            </div>
        </div>
    )
}

export function AppSidebar() {
    const { state } = useSidebar()

    const collapsed = state === "collapsed"

    return (
        <Sidebar variant="sidebar" collapsible="icon">

            {/* HEADER */}

            <SidebarHeader className="gap-2 p-2">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2 overflow-hidden">
                        <Sparkles className="size-4 shrink-0" />

                        {!collapsed && (
                            <span className="font-medium">
                                ChatGPT
                            </span>
                        )}
                    </div>

                    <SidebarTrigger />
                </div>

                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
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
                                <span>Search</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        {!collapsed && (
                            <>
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
                                    <DropdownMenu>

                                        <DropdownMenuTrigger asChild>
                                            <SidebarMenuButton>
                                                <MoreHorizontal />
                                                <span>More</span>
                                            </SidebarMenuButton>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent side="right">

                                            <DropdownMenuItem>
                                                <Bot />
                                                GPTs
                                            </DropdownMenuItem>

                                            <DropdownMenuItem>
                                                <Image />
                                                Images
                                            </DropdownMenuItem>

                                            <DropdownMenuItem>
                                                <Microscope />
                                                Deep Research
                                            </DropdownMenuItem>

                                        </DropdownMenuContent>

                                    </DropdownMenu>
                                </SidebarMenuItem>
                            </>
                        )}

                    </SidebarMenu>

                </SidebarGroup>

                {/* COLLAPSED MODE */}

                {collapsed && (
                    <SidebarGroup>

                        <SidebarMenu>

                            <SidebarMenuItem>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <SidebarMenuButton tooltip="Pinned">
                                            <Pin />
                                        </SidebarMenuButton>
                                    </PopoverTrigger>

                                    <PopoverContent
                                        side="right"
                                        align="start"
                                        className="p-0"
                                    >
                                        <FloatingList
                                            title="Pinned"
                                            items={data.pinned}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <SidebarMenuButton tooltip="Chats">
                                            <MessageSquare />
                                        </SidebarMenuButton>
                                    </PopoverTrigger>

                                    <PopoverContent
                                        side="right"
                                        align="start"
                                        className="p-0"
                                    >
                                        <FloatingList
                                            title="Chats"
                                            items={data.chats}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </SidebarMenuItem>

                        </SidebarMenu>

                    </SidebarGroup>
                )}

                {/* EXPANDED MODE */}

                {!collapsed && (
                    <>
                        <Collapsible defaultOpen>

                            <SidebarGroup>

                                <div className="flex items-center justify-between">

                                    <CollapsibleTrigger asChild>

                                        <SidebarGroupLabel className="cursor-pointer">
                                            Pinned
                                            <ChevronDown className="ml-auto size-4" />
                                        </SidebarGroupLabel>

                                    </CollapsibleTrigger>

                                </div>

                                <CollapsibleContent>

                                    <SidebarGroupContent>

                                        <SidebarMenu>

                                            {data.pinned.map((item) => (
                                                <SidebarMenuItem key={item.id}>
                                                    <SidebarMenuButton>
                                                        <span>{item.title}</span>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}

                                        </SidebarMenu>

                                    </SidebarGroupContent>

                                </CollapsibleContent>

                            </SidebarGroup>

                        </Collapsible>

                        <Collapsible defaultOpen>

                            <SidebarGroup>

                                <SidebarGroupLabel>
                                    Projects
                                </SidebarGroupLabel>

                                <SidebarGroupAction>
                                    <Plus className="size-4" />
                                </SidebarGroupAction>

                                <CollapsibleContent>

                                    <SidebarGroupContent>

                                        <SidebarMenu>

                                            {data.projects.map((item) => (
                                                <SidebarMenuItem key={item.id}>
                                                    <SidebarMenuButton>
                                                        <FolderOpen />
                                                        <span>{item.title}</span>
                                                    </SidebarMenuButton>

                                                    <SidebarMenuAction showOnHover>
                                                        <MoreHorizontal className="size-4" />
                                                    </SidebarMenuAction>
                                                </SidebarMenuItem>
                                            ))}

                                        </SidebarMenu>

                                    </SidebarGroupContent>

                                </CollapsibleContent>

                            </SidebarGroup>

                        </Collapsible>

                        <Collapsible defaultOpen>

                            <SidebarGroup>

                                <SidebarGroupLabel>
                                    Chats
                                </SidebarGroupLabel>

                                <CollapsibleContent>

                                    <SidebarGroupContent>

                                        <SidebarMenu>

                                            {data.chats.map((item) => (
                                                <SidebarMenuItem key={item.id}>
                                                    <SidebarMenuButton>
                                                        <span>{item.title}</span>
                                                    </SidebarMenuButton>

                                                    <SidebarMenuAction showOnHover>
                                                        <MoreHorizontal className="size-4" />
                                                    </SidebarMenuAction>
                                                </SidebarMenuItem>
                                            ))}

                                        </SidebarMenu>

                                    </SidebarGroupContent>

                                </CollapsibleContent>

                            </SidebarGroup>

                        </Collapsible>
                    </>
                )}

            </SidebarContent>

            {/* FOOTER */}

            <SidebarFooter>

                <DropdownMenu>

                    <DropdownMenuTrigger asChild>

                        <SidebarMenuButton className="h-12">

                            <Avatar className="size-8">
                                <AvatarFallback>
                                    TR
                                </AvatarFallback>
                            </Avatar>

                            {!collapsed && (
                                <div className="flex flex-col items-start">
                                    <span className="text-sm">
                                        Trilok
                                    </span>

                                    <span className="text-xs text-muted-foreground">
                                        Go
                                    </span>
                                </div>
                            )}

                        </SidebarMenuButton>

                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        side="top"
                        align="start"
                        className="w-72"
                    >

                        <div className="px-2 py-2">
                            <div className="font-medium">
                                Trilok
                            </div>

                            <div className="text-sm text-muted-foreground">
                                trilok@example.com
                            </div>
                        </div>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            <Crown />
                            Upgrade Plan
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <User />
                            Profile
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Settings />
                            Settings
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            <HelpCircle />
                            Help Center
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>

                    </DropdownMenuContent>

                </DropdownMenu>

            </SidebarFooter>

        </Sidebar>
    )
}