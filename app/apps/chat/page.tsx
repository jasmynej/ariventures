'use client'
import chat from '@/styles/chat.module.css'
import {useEffect, useState, useRef} from "react";
import {AiChatMessage, ChatPOV, initMessage} from "@/types/Ai";
import {aiChat} from "@/lib/chat";
import ChatMessage from "@/components/ChatMessage";

export default function AriAiChatPage(){
    const STORAGE_KEY = "ari-chat:messages";
    const [messages, setMessages] = useState<AiChatMessage[]>([])
    const [question, setQuestion] = useState<string>("")
    const [isTyping, setIsTyping] = useState(false);
    const chatAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && saved != '[]') setMessages(JSON.parse(saved));
        else setMessages(prev => [...prev, initMessage]);
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTo({
                top: chatAreaRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [messages]);

    const sendMessage = async () => {
        const q = question.trim();
        if (!q || isTyping) return;

        setMessages(prev => [...prev, { direction: ChatPOV.USER, text: q,  timestamp:new Date() }]);
        setQuestion("");
        setIsTyping(true);

        try {
            const res = await aiChat(q);
            setMessages(prev => [
                ...prev,
                { direction: ChatPOV.BOT, text: res.answer, sources: res.sources,  timestamp:new Date() }
            ]);
        } catch (e) {
            setMessages(prev => [
                ...prev,
                { direction: ChatPOV.BOT, text: "Sorry—something went wrong. Try again.", timestamp:new Date() }

            ]);
            console.error(e);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className={chat.chatPageContainer}>
            <div className={chat.chatHeader}>
                <p>Header</p>
            </div>
            <div className={chat.botContainer}>
                <div className={chat.chatArea} ref={chatAreaRef}>
                    {messages.map((m, i) => <ChatMessage message={m} key={i} />)}
                    {isTyping && <ChatMessage message={{ direction: ChatPOV.BOT, text: "…", timestamp:new Date() }} />}
                </div>
                <div className={chat.inputArea}>
                    <div className={chat.chatInput}>
                        <input
                            placeholder="Type your question here..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage();
                                }
                            }}
                        />
                        <button onClick={sendMessage} disabled={isTyping || !question.trim()}>
                            <i className="fi fi-tr-paper-plane-top" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}