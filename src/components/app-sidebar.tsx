
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    // SidebarGroupAction,
    SidebarGroupContent,
    // SidebarGroupLabel,
    SidebarTrigger,
    SidebarMenuAction,
} from "@/components/ui/sidebar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import {
    Sparkles,
    Search,
    Library,
    LayoutGrid,
    Code2,
    MoreHorizontal,
    Plus,
    Edit,
    Pin,
    MessageSquare,
    FolderOpen,
    ChevronDown,
    Settings,
    HelpCircle,
    LogOut,
    User,
    Crown,
    Image as ImageIcon,
    Microscope,
    Bot,
    PenLine,
    Download,
    Command,
    FileText,
    Info,
    Bug,
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

function FloatingList({ title, items }: { title: string; items: { id: string; title: string }[] }) {
    return (
        <div className="w-72 rounded-xl bg-popover text-popover-foreground shadow-md outline-none">
            <div className="border-b px-3 py-2 text-sm font-medium">
                {title}
            </div>
            <div className="max-h-96 overflow-auto p-2">
                {items.map((item) => (
                    <button
                        key={item.id}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
                    >
                        {title === "Projects" ? <FolderOpen className="size-4" /> : <MessageSquare className="size-4" />}
                        <span className="truncate">{item.title}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export function AppSidebar() {
    return (
        <Sidebar variant="sidebar" collapsible="icon">
            {/* HEADER */}
            <SidebarHeader className="gap-2 p-2">

                <div className="flex h-8 items-center justify-between group-data-[collapsible=icon]:justify-center">
                    <div className="flex items-center gap-2 px-2 overflow-hidden group-data-[collapsible=icon]:hidden">
                        <Sparkles className="size-4 shrink-0 text-foreground" />
                        {/* <img width={5} height={5} src="/project-new/gpt-ui/gpt-ui/src/assets/chat-gpt.png" /> */}
                        {/* <span className="font-medium">ChatGPT</span> */}
                    </div>
                    <SidebarTrigger className="group-data-[collapsible=icon]:ml-0" />
                </div>

                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="New chat">
                            <Edit className="size-4" />
                            <span>New chat</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* CONTENT */}
            <SidebarContent>
                {/* ALWAYS VISIBLE: Search */}
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Search">
                                <Search className="size-4" />
                                <span>Search</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                {/* HIDDEN WHEN COLLAPSED */}
                <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton><Library className="size-4" /><span>Library</span></SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton><LayoutGrid className="size-4" /><span>Apps</span></SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton><Code2 className="size-4" /><span>Codex</span></SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton><MoreHorizontal className="size-4" /><span>More</span></SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="right">
                                    <DropdownMenuItem><Bot className="mr-2 size-4" /> GPTs</DropdownMenuItem>
                                    <DropdownMenuItem><ImageIcon className="mr-2 size-4" /> Images</DropdownMenuItem>
                                    <DropdownMenuItem><Microscope className="mr-2 size-4" /> Deep Research</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                {/* PINNED */}
                <SidebarGroup>
                    <SidebarMenu className="hidden group-data-[collapsible=icon]:flex">
                        <SidebarMenuItem>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <SidebarMenuButton tooltip="Pinned" className="cursor-pointer"><Pin className="size-4" /></SidebarMenuButton>
                                </PopoverTrigger>
                                <PopoverContent side="right" align="start" className="p-0 border-none shadow-none bg-transparent">
                                    <FloatingList title="Pinned" items={data.pinned} />
                                </PopoverContent>
                            </Popover>
                        </SidebarMenuItem>
                    </SidebarMenu>

                    <Collapsible defaultOpen className="group/collapsible group-data-[collapsible=icon]:hidden">
                        <CollapsibleTrigger asChild>
                            <div className="flex w-full items-center justify-between px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
                                Pinned
                                <ChevronDown className="size-4 transition-transform group-data-[state=closed]/collapsible:-rotate-90" />
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {data.pinned.map((item) => (
                                        <SidebarMenuItem key={item.id}>
                                            <SidebarMenuButton className="cursor-pointer"><span>{item.title}</span></SidebarMenuButton>
                                            <SidebarMenuAction showOnHover className="cursor-pointer"><MoreHorizontal className="size-4" /></SidebarMenuAction>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </Collapsible>
                </SidebarGroup>

                {/* PROJECTS */}
                <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                    <Collapsible defaultOpen className="group/collapsible">
                        <div className="flex items-center justify-between px-2 py-1 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">
                            <CollapsibleTrigger className="flex flex-1 items-center text-xs font-medium py-0.5 outline-none cursor-pointer">
                                Projects
                                <ChevronDown className="cursor-pointer ml-auto size-4 transition-transform group-data-[state=closed]/collapsible:-rotate-90" />
                            </CollapsibleTrigger>
                            <button className="hidden ml-1 p-0.5 rounded-sm hover:bg-background/80 outline-none"><Plus className="size-4" /></button>
                        </div>

                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {data.projects.map((item) => (
                                        <SidebarMenuItem key={item.id}>
                                            <SidebarMenuButton className="cursor-pointer"><FolderOpen className="size-4" /><span>{item.title}</span></SidebarMenuButton>
                                            <SidebarMenuAction showOnHover className="cursor-pointer"><MoreHorizontal className="size-4" /></SidebarMenuAction>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </Collapsible>
                </SidebarGroup>

                {/* CHATS */}
                <SidebarGroup>
                    <SidebarMenu className="hidden group-data-[collapsible=icon]:flex">
                        <SidebarMenuItem>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <SidebarMenuButton tooltip="Chats" className="cursor-pointer"><MessageSquare className="size-4" /></SidebarMenuButton>
                                </PopoverTrigger>
                                <PopoverContent side="right" align="start" className="p-0 border-none shadow-none bg-transparent">
                                    <FloatingList title="Chats" items={data.chats} />
                                </PopoverContent>
                            </Popover>
                        </SidebarMenuItem>
                    </SidebarMenu>

                    <Collapsible defaultOpen className="group/collapsible group-data-[collapsible=icon]:hidden">
                        <CollapsibleTrigger asChild>
                            <div className="flex w-full items-center justify-between px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
                                Chats
                                <ChevronDown className="size-4 transition-transform group-data-[state=closed]/collapsible:-rotate-90" />
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {data.chats.map((item) => (
                                        <SidebarMenuItem key={item.id}>
                                            <SidebarMenuButton className="cursor-pointer"><span>{item.title}</span></SidebarMenuButton>
                                            <SidebarMenuAction showOnHover className="cursor-pointer"><MoreHorizontal className="size-4" /></SidebarMenuAction>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </Collapsible>
                </SidebarGroup>


            </SidebarContent>


            {/* FOOTER */}
            <SidebarFooter>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size="lg" className="h-12 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <Avatar className="size-8 rounded-full">
                                <AvatarFallback className="bg-muted text-xs font-medium">TR</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start text-left leading-tight group-data-[collapsible=icon]:hidden">
                                <span className="text-sm font-semibold">Trilok</span>
                                <span className="text-xs text-muted-foreground">Go</span>
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="right" align="end" className="w-64 rounded-xl p-2">
                        <div className="flex items-center gap-2 px-2 py-2">
                            <Avatar className="size-8 rounded-full">
                                <AvatarFallback className="bg-muted text-xs font-medium">TR</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col text-sm">
                                <span className="font-medium">Trilok</span>
                                <span className="text-xs text-muted-foreground">trilok@example.com</span>
                            </div>
                        </div>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="gap-2 cursor-pointer"><Crown className="size-4" /><span>Upgrade Plan</span></DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer"><User className="size-4" /><span>Profile</span></DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer"><Settings className="size-4" /><span>Settings</span></DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {/* NESTED HELP MENU */}
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="gap-2 cursor-pointer">
                                <HelpCircle className="size-4" />
                                <span>Help</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent className="w-56 p-1">
                                    <DropdownMenuItem className="gap-2 cursor-pointer"><HelpCircle className="size-4" /> Help center</DropdownMenuItem>
                                    <DropdownMenuItem className="gap-2 cursor-pointer"><PenLine className="size-4" /> Release notes</DropdownMenuItem>
                                    <DropdownMenuItem className="gap-2 cursor-pointer"><Download className="size-4" /> Download apps</DropdownMenuItem>
                                    <DropdownMenuItem className="gap-2 cursor-pointer"><Command className="size-4" /> Keyboard shortcuts</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="gap-2 cursor-pointer"><FileText className="size-4" /> Terms of Service</DropdownMenuItem>
                                    <DropdownMenuItem className="gap-2 cursor-pointer"><Info className="size-4" /> Privacy Policy</DropdownMenuItem>
                                    <DropdownMenuItem className="gap-2 cursor-pointer"><Bug className="size-4" /> Report a bug</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="gap-2 cursor-pointer"><LogOut className="size-4" /><span>Log out</span></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    )
}