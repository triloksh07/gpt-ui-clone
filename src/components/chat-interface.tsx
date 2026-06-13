
import * as React from "react"
import {
    Paperclip,
    Globe,
    Lightbulb,
    Image as ImageIcon,
    Telescope,
    Mic,
    AudioLines,
    ChevronDown,
    MoreHorizontal,
    Folder,
    FileText,
    PenLine,
    Plus,
    Sparkles,
    ArrowUp,
    X,
    LayoutGrid,
    Globe2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuPortal
} from "@/components/ui/dropdown-menu"

// --- TYPES ---
type ChatMode = "default" | "think" | "image" | "research" | "write"

interface Message {
    id: string
    role: "user" | "assistant"
    content: string
}

export function ChatInterface() {
    // --- STATE ---
    const [input, setInput] = React.useState("")
    const [messages, setMessages] = React.useState<Message[]>([])
    const [mode, setMode] = React.useState<ChatMode>("default")
    const [selectedFiles, setSelectedFiles] = React.useState<File[]>([])

    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const fileInputRef = React.useRef<HTMLInputElement>(null)
    const endOfMessagesRef = React.useRef<HTMLDivElement>(null)

    // --- EFFECTS ---
    React.useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
        }
    }, [input])

    React.useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    // --- HANDLERS ---
    const triggerFileSelect = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files!)])
        }
        // Reset input so the same file can be selected again if needed
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const handleSendMessage = () => {
        if (!input.trim() && selectedFiles.length === 0) return

        setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", content: input }])
        setInput("")
        setSelectedFiles([])

        // Reset to default mode after sending a message if desired, or keep active.
        // setMode("default") 

        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: `Responding in ${mode} mode to your request.`
            }])
        }, 1000)
    }

    // --- RENDER HELPERS ---
    const getPlaceholder = () => {
        switch (mode) {
            case "image": return "Describe or edit an image"
            case "research": return "Get a detailed report"
            default: return "Ask anything"
        }
    }

    const renderInputArea = () => (
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-2">

            {/* MAIN INPUT CONTAINER */}
            <div className="relative flex flex-col w-full rounded-[26px] bg-secondary pt-3 pb-2 px-3 focus-within:ring-1 focus-within:ring-ring shadow-sm">


                {/* ROW 2: Main Input Bar (Plus icon, Textarea, Send button) */}
                <div className="flex items-end gap-2 w-full min-h-[40px]">

                    {/* Left side: Plus button */}
                    <div className="flex items-center pb-1">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="size-8 shrink-0 rounded-full text-muted-foreground hover:bg-background/50 hover:text-foreground">
                                    <Plus className="size-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-56 rounded-xl p-1.5 shadow-xl">
                                <DropdownMenuItem onClick={triggerFileSelect} className="gap-3 cursor-pointer py-2">
                                    <Paperclip className="size-4" /> Add photos & files
                                </DropdownMenuItem>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger className="gap-3 cursor-pointer py-2">
                                        <FileText className="size-4" /> Recent files
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent className="w-48 p-1">
                                            <DropdownMenuItem disabled>No recent files</DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setMode("image")} className="gap-3 cursor-pointer py-2">
                                    <ImageIcon className="size-4" /> Create image
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setMode("think")} className="gap-3 cursor-pointer py-2">
                                    <Lightbulb className="size-4" /> Thinking
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setMode("research")} className="gap-3 cursor-pointer py-2">
                                    <Telescope className="size-4" /> Deep research
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setMode("default")} className="gap-3 cursor-pointer py-2">
                                    <Globe className="size-4" /> Web search
                                </DropdownMenuItem>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger className="gap-3 cursor-pointer py-2">
                                        <MoreHorizontal className="size-4" /> More
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent className="w-48 p-1">
                                            <DropdownMenuItem className="gap-3"><PenLine className="size-4" /> Write</DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DropdownMenuSeparator />
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger className="gap-3 cursor-pointer py-2">
                                        <Folder className="size-4" /> Projects
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent className="w-48 p-1">
                                            <DropdownMenuItem className="gap-3"><PenLine className="size-4" /> Writing</DropdownMenuItem>
                                            <DropdownMenuItem className="gap-3"><Folder className="size-4" /> DeepSession-v2</DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Hidden File Input */}
                    <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    {/* Textarea */}
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={getPlaceholder()}
                        className="max-h-[200px] min-h-[32px] flex-1 resize-none bg-transparent py-1.5 text-[15px] outline-none placeholder:text-muted-foreground/70"
                    />

                    {/* Right side: Mic, Audio, Submit */}
                    <div className="flex items-center gap-1.5 pb-1 pr-1">
                        {input || selectedFiles.length > 0 ? (
                            <Button
                                onClick={handleSendMessage}
                                size="icon"
                                className="size-8 rounded-full bg-foreground text-background hover:bg-foreground/80 shrink-0"
                            >
                                <ArrowUp className="size-5" />
                            </Button>
                        ) : (
                            <>
                                <Button variant="ghost" size="icon" className="size-8 rounded-full text-muted-foreground hover:text-foreground shrink-0">
                                    <Mic className="size-5" />
                                </Button>
                                <Button variant="default" size="icon" className="size-8 rounded-full bg-[#1778ff] text-white hover:bg-[#1778ff]/90 shrink-0">
                                    <AudioLines className="size-4" />
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* ROW 1: Files and Pills (Renders above the text area) */}
                {(selectedFiles.length > 0 || mode !== "default") && (
                    <div className="flex flex-wrap items-center gap-2 px-1 pb-2">

                        {mode === "think" && (
                            <div className="flex h-8 items-center gap-1.5 rounded-full bg-blue-500/10 pl-3 pr-1.5 text-sm font-medium text-blue-500">
                                <Lightbulb className="size-4" /> Think
                                <button onClick={() => setMode("default")} className="rounded-full p-1 hover:bg-blue-500/20 text-blue-500 transition-colors">
                                    <X className="size-3" />
                                </button>
                            </div>
                        )}
                        {mode === "research" && (
                            <div className="flex h-8 items-center gap-1.5 rounded-full bg-blue-500/10 pl-3 pr-1.5 text-sm font-medium text-blue-500">
                                <Telescope className="size-4" /> Deep research
                                <div className="mx-1 h-3 w-px bg-blue-500/30" />
                                <span className="flex items-center gap-1 text-foreground/70"><LayoutGrid className="size-3.5" /> Apps <ChevronDown className="size-3" /></span>
                                <span className="flex items-center gap-1 text-foreground/70"><Globe2 className="size-3.5" /> Sites <ChevronDown className="size-3" /></span>
                                <button onClick={() => setMode("default")} className="ml-1 rounded-full p-1 hover:bg-blue-500/20 text-blue-500 transition-colors">
                                    <X className="size-3" />
                                </button>
                            </div>
                        )}
                        {mode === "image" && (
                            <div className="flex h-8 items-center gap-1.5 rounded-full bg-blue-500/10 pl-3 pr-1.5 text-sm font-medium text-blue-500">
                                <ImageIcon className="size-4" /> Image
                                <div className="mx-1 h-3 w-px bg-blue-500/30" />
                                <span className="flex items-center gap-1 text-foreground/70">Auto <ChevronDown className="size-3" /></span>
                                <button onClick={() => setMode("default")} className="ml-1 rounded-full p-1 hover:bg-blue-500/20 text-blue-500 transition-colors">
                                    <X className="size-3" />
                                </button>
                            </div>
                        )}

                        {selectedFiles.map((file, i) => (
                            <div key={i} className="group relative flex h-8 items-center gap-2 rounded-xl bg-background px-3 py-1 text-sm shadow-sm border border-border/50">
                                <div className="text-primary"><Paperclip className="size-3.5" /></div>
                                <span className="max-w-[120px] truncate font-medium">{file.name}</span>
                                <button
                                    onClick={() => removeFile(i)}
                                    className="ml-1 rounded-full p-1 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X className="size-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

            </div>

            <div className="text-center text-xs text-muted-foreground mt-1">
                ChatGPT can make mistakes. Check important info.
            </div>
        </div>
    )

    return (
        <div className="flex h-full w-full flex-col bg-background text-foreground relative">

            {/* TOP HEADER */}
            <header className="absolute top-0 w-full flex h-14 items-center justify-between px-4 z-10">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="gap-2 px-2 text-lg font-semibold hover:bg-transparent">
                            ChatGPT <ChevronDown className="size-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[300px] rounded-xl p-2">
                        <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer rounded-lg">
                            <div className="flex items-center gap-2 font-medium">
                                <Sparkles className="size-4 text-purple-500" /> ChatGPT Plus
                                <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 text-xs">Upgrade</span>
                            </div>
                            <span className="text-xs text-muted-foreground">Our smartest model & more</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer rounded-lg">
                            <div className="flex items-center gap-2 font-medium">
                                <div className="size-4 rounded-sm bg-foreground flex items-center justify-center">
                                    <Sparkles className="size-3 text-background" />
                                </div>
                                ChatGPT
                            </div>
                            <span className="text-xs text-muted-foreground">Great for everyday tasks</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full">
                {messages.length === 0 ? (

                    /* EXACT EMPTY STATE (Centered) */
                    <div className="flex h-full flex-col items-center justify-center px-4 md:px-8">
                        <h1 className="text-2xl font-semibold mb-8">Ready when you are.</h1>

                        <div className="w-full max-w-3xl flex flex-col gap-4">
                            {renderInputArea()}

                            {/* Mode Specific Dynamic Content Below Input */}
                            <div className="flex justify-center w-full mt-2 transition-all">

                                {/* DEFAULT: 3 Action Pills */}
                                {mode === "default" && (
                                    <div className="flex items-center gap-2 flex-wrap justify-center">
                                        <Button onClick={() => setMode("image")} variant="outline" className="rounded-full gap-2 border-secondary bg-transparent text-muted-foreground hover:text-foreground">
                                            <ImageIcon className="size-4" /> Create an image
                                        </Button>
                                        <Button onClick={() => setMode("write")} variant="outline" className="rounded-full gap-2 border-secondary bg-transparent text-muted-foreground hover:text-foreground">
                                            <PenLine className="size-4" /> Write or edit
                                        </Button>
                                        <Button onClick={() => setMode("research")} variant="outline" className="rounded-full gap-2 border-secondary bg-transparent text-muted-foreground hover:text-foreground">
                                            <Globe className="size-4" /> Look something up
                                        </Button>
                                    </div>
                                )}

                                {/* IMAGE MODE: Explore Ideas Grid */}
                                {mode === "image" && (
                                    <div className="w-full pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-semibold text-foreground">Explore ideas</h3>
                                            <span className="text-xs text-muted-foreground cursor-pointer hover:underline underline-offset-2">What's new</span>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            <div onClick={triggerFileSelect} className="flex flex-col items-center justify-center gap-2 rounded-xl bg-secondary/50 border border-secondary p-4 aspect-[3/4] cursor-pointer hover:bg-secondary transition-colors">
                                                <Plus className="size-6 text-muted-foreground" />
                                                <span className="text-sm font-medium mt-auto">Upload a photo</span>
                                            </div>
                                            {/* Mocking the reference images using stylized divs since actual external images aren't available */}
                                            <div className="relative rounded-xl bg-gradient-to-br from-blue-900 to-slate-900 aspect-[3/4] p-3 flex items-end overflow-hidden cursor-pointer hover:opacity-90">
                                                <span className="text-sm font-medium text-white relative z-10">Messi mode</span>
                                            </div>
                                            <div className="relative rounded-xl bg-gradient-to-br from-indigo-900 to-purple-900 aspect-[3/4] p-3 flex items-end overflow-hidden cursor-pointer hover:opacity-90">
                                                <span className="text-sm font-medium text-white relative z-10">Football figurine</span>
                                            </div>
                                            <div className="relative rounded-xl bg-gradient-to-br from-zinc-800 to-black aspect-[3/4] p-3 flex items-end overflow-hidden cursor-pointer hover:opacity-90 border border-secondary">
                                                <span className="text-sm font-medium text-white relative z-10">Disco mode</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                ) : (

                    /* ACTIVE CHAT THREAD */
                    <div className="flex flex-col h-full">
                        <div className="flex-1 overflow-y-auto px-4 pt-16 pb-4">
                            <div className="mx-auto max-w-3xl space-y-6">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                        <div className={`rounded-2xl px-4 py-2.5 text-[15px] ${msg.role === "user"
                                            ? "bg-secondary text-foreground max-w-[80%]"
                                            : "bg-transparent text-foreground max-w-[100%]"
                                            }`}>
                                            <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={endOfMessagesRef} />
                            </div>
                        </div>

                        {/* Input drops to bottom in active chat */}
                        <div className="w-full px-4 pb-4 pt-2 bg-background/80 backdrop-blur-sm">
                            {renderInputArea()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}