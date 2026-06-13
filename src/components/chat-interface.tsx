import * as React from "react"
import { 
    Paperclip, 
    Globe, 
    Brain, 
    ArrowUp, 
    X, 
    MessageSquare, 
    Sparkles, 
    Code2, 
    Compass,
    ChevronDown,
    Copy,
    ThumbsUp,
    ThumbsDown,
    RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// --- TYPES ---
interface Attachment {
    id: string
    name: string
    size: string
    type: string
}

interface Message {
    id: string
    role: "user" | "assistant"
    content: string
    isReasoning?: boolean
    reasoningContent?: string
    attachments?: Attachment[]
}

export function ChatInterface() {
    // --- STATE MANAGEMENT ---
    const [input, setInput] = React.useState("")
    const [messages, setMessages] = React.useState<Message[]>([])
    const [attachments, setAttachments] = React.useState<Attachment[]>([])
    const [isSearchActive, setIsSearchActive] = React.useState(false)
    const [isReasoningActive, setIsReasoningActive] = React.useState(false)
    
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const chatEndRef = React.useRef<HTMLDivElement>(null)

    // Auto-grow textarea height matching production input frames
    React.useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
        }
    }, [input])

    // Keep chat pinned to the bottom on new streaming chunks
    React.useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    // --- HANDLERS ---
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const triggerFileSelect = () => {
        // Mock file generation for ui simulation
        const mockFiles: Attachment[] = [
            { id: String(Date.now()), name: "analytics_query.sql", size: "4.2 KB", type: "code" },
            { id: String(Date.now() + 1), name: "dashboard_mockup.png", size: "1.2 MB", type: "image" }
        ]
        setAttachments((prev) => [...prev, ...mockFiles])
    }

    const removeAttachment = (id: string) => {
        setAttachments((prev) => prev.filter((file) => file.id !== id))
    }

    const handleSendMessage = () => {
        if (!input.trim() && attachments.length === 0) return

        const userMsg: Message = {
            id: String(Date.now()),
            role: "user",
            content: input,
            attachments: attachments
        }

        setMessages((prev) => [...prev, userMsg])
        setInput("")
        setAttachments([])

        // Mock assistant response trigger
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: String(Date.now() + 1),
                    role: "assistant",
                    isReasoning: isReasoningActive,
                    reasoningContent: isReasoningActive 
                        ? "Thinking Process:\n1. Parsed user request relative to client state layout architecture.\n2. Resolved DOM mounting context bounds.\n3. Formulating localized production response." 
                        : undefined,
                    content: `I've received your request along with ${userMsg.attachments?.length || 0} files. Let's break down the next steps for implementation.`
                }
            ])
        }, 1000)
    }

    return (
        <div className="flex h-full w-full flex-col bg-background text-foreground">
            {/* TOP HEADER */}
            <header className="flex h-14 items-center justify-between border-b px-4">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" className="gap-1 px-2 text-muted-foreground hover:text-foreground">
                        <span className="font-semibold text-foreground">ChatGPT 4o</span>
                        <ChevronDown className="size-4" />
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    {/* Placeholder for sharing or auxiliary views */}
                </div>
            </header>

            {/* CHAT DISPLAY HUB */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
                {messages.length === 0 ? (
                    /* EMPTY VIEW: PROMPT CHIPS */
                    <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                            <h2 className="text-2xl font-semibold tracking-tight">What can I help with today?</h2>
                        </div>
                        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                            <button onClick={() => setInput("Write a typescript script to Virtualize List records...")} className="flex flex-col items-start gap-1 rounded-2xl border p-4 text-left transition-colors hover:bg-muted/50">
                                <Code2 className="size-5 text-indigo-500" />
                                <span className="text-sm font-medium">Code specialized components</span>
                            </button>
                            <button onClick={() => setInput("Analyze my DeepSession logs to patch core performance drops.")} className="flex flex-col items-start gap-1 rounded-2xl border p-4 text-left transition-colors hover:bg-muted/50">
                                <Sparkles className="size-5 text-amber-500" />
                                <span className="text-sm font-medium">Analyze complex log lines</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    /* THREAD VIEW */
                    <div className="mx-auto max-w-3xl space-y-6 pb-24">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                {msg.role === "assistant" && (
                                    <Avatar className="size-8 border">
                                        <AvatarFallback className="bg-primary/10 text-xs font-semibold">AI</AvatarFallback>
                                    </Avatar>
                                )}
                                
                                <div className={`flex flex-col gap-2 max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                                    {/* User Attachments Preview inside text bubble */}
                                    {msg.attachments && msg.attachments.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-1">
                                            {msg.attachments.map((file) => (
                                                <div key={file.id} className="flex items-center gap-2 rounded-xl border bg-muted/30 px-3 py-1.5 text-xs">
                                                    <Paperclip className="size-3.5 text-muted-foreground" />
                                                    <span className="font-medium truncate max-w-[140px]">{file.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Core message text box */}
                                    <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                                        msg.role === "user" 
                                            ? "bg-muted text-foreground" 
                                            : "bg-transparent text-foreground"
                                    }`}>
                                        {/* Deep Think reasoning toggle view */}
                                        {msg.isReasoning && msg.reasoningContent && (
                                            <div className="mb-3 border-l-2 pl-3 text-xs text-muted-foreground/80 space-y-1">
                                                <div className="flex items-center gap-1 font-semibold text-muted-foreground">
                                                    <Brain className="size-3" /> Thought Process
                                                </div>
                                                <pre className="font-sans whitespace-pre-wrap">{msg.reasoningContent}</pre>
                                            </div>
                                        )}
                                        <p className="whitespace-pre-wrap">{msg.content}</p>
                                    </div>

                                    {/* Action row underneath AI responses */}
                                    {msg.role === "assistant" && (
                                        <div className="flex items-center gap-1 pl-1 text-muted-foreground">
                                            <Button variant="ghost" size="icon" className="size-7"><Copy className="size-3.5" /></Button>
                                            <Button variant="ghost" size="icon" className="size-7"><ThumbsUp className="size-3.5" /></Button>
                                            <Button variant="ghost" size="icon" className="size-7"><ThumbsDown className="size-3.5" /></Button>
                                            <Button variant="ghost" size="icon" className="size-7"><RefreshCw className="size-3.5" /></Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                )}
            </div>

            {/* FLOATING LOWER INPUT MECHANISM */}
            <div className="border-t bg-background p-4">
                <div className="mx-auto max-w-3xl">
                    <div className="relative flex flex-col rounded-[26px] border bg-muted/40 focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
                        
                        {/* ATTACHMENTS PREVIEW TRACK (Shows above textarea input line) */}
                        {attachments.length > 0 && (
                            <div className="flex flex-wrap gap-2 px-4 pt-4">
                                {attachments.map((file) => (
                                    <div key={file.id} className="group relative flex items-center gap-2 rounded-xl border bg-background p-2 pr-8 text-xs shadow-sm">
                                        <div className="rounded-lg bg-primary/5 p-1.5 text-primary">
                                            <Paperclip className="size-3.5" />
                                        </div>
                                        <div className="flex flex-col truncate">
                                            <span className="font-medium truncate max-w-[120px]">{file.name}</span>
                                            <span className="text-[10px] text-muted-foreground">{file.size}</span>
                                        </div>
                                        <button 
                                            onClick={() => removeAttachment(file.id)}
                                            className="absolute right-1.5 top-1.5 rounded-full p-0.5 bg-muted hover:bg-destructive hover:text-destructive-foreground opacity-80 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="size-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* TEXT INTERACTIVE ZONE */}
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Message ChatGPT..."
                            className="w-full resize-none bg-transparent px-4 py-4 text-sm outline-none placeholder:text-muted-foreground max-h-[200px]"
                        />

                        {/* LOWER ACTION CONTROL PANEL */}
                        <div className="flex items-center justify-between px-3 pb-3">
                            <div className="flex items-center gap-1.5">
                                {/* Attachment Trigger */}
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button onClick={triggerFileSelect} variant="ghost" size="icon" className="size-8 rounded-full text-muted-foreground hover:text-foreground">
                                            <Paperclip className="size-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Attach files</TooltipContent>
                                </Tooltip>

                                {/* Web Search Switch Button */}
                                <Button 
                                    onClick={() => setIsSearchActive(!isSearchActive)}
                                    variant={isSearchActive ? "secondary" : "ghost"} 
                                    size="sm" 
                                    className={`h-8 rounded-full gap-1.5 px-3 text-xs font-medium ${
                                        isSearchActive ? "bg-sky-500/10 text-sky-600 hover:bg-sky-500/20 dark:text-sky-400" : "text-muted-foreground"
                                    }`}
                                >
                                    <Globe className="size-3.5" />
                                    <span>Search</span>
                                </Button>

                                {/* Reason / Thought Switch Button */}
                                <Button 
                                    onClick={() => setIsReasoningActive(!isReasoningActive)}
                                    variant={isReasoningActive ? "secondary" : "ghost"} 
                                    size="sm" 
                                    className={`h-8 rounded-full gap-1.5 px-3 text-xs font-medium ${
                                        isReasoningActive ? "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 dark:text-amber-400" : "text-muted-foreground"
                                    }`}
                                >
                                    <Brain className="size-3.5" />
                                    <span>Reason</span>
                                </Button>
                            </div>

                            {/* Execution Submit Button */}
                            <Button 
                                onClick={handleSendMessage}
                                disabled={!input.trim() && attachments.length === 0}
                                size="icon" 
                                className="size-8 rounded-full shrink-0 transition-all disabled:opacity-30"
                            >
                                <ArrowUp className="size-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="mt-2 text-center text-[11px] text-muted-foreground">
                        ChatGPT can make mistakes. Verify important info.
                    </div>
                </div>
            </div>
        </div>
    )
}