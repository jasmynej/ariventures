import {AiChatMessage, ChatPOV} from "@/types/Ai";
import chat from "@/styles/chat.module.css"
import MessageSource from "@/components/MessageSource";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {getTime} from '@/lib/utils'
interface ChatMessageProps {
    message: AiChatMessage
}

export default function ChatMessage({message}: ChatMessageProps){
    const containerClassName =
        message.direction === ChatPOV.BOT ? chat.botMessage : chat.userMessage;
    const sender = message.direction === ChatPOV.USER
        ? 'You'
        : 'Ariventures AI';
    return (

        <div>

            <div className={containerClassName}>
                <div className={chat.messageInfo}>
                    <p className={chat.sender}>{sender}</p>
                    <p id="time">{getTime(message.timestamp)}</p>
                </div>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.text}
                </ReactMarkdown>
                {message.sources?.length ? (
                    <div className={chat.sources}>
                        <p>Related resources</p>
                        {message.sources.map((source, i) => {
                            return (
                                <MessageSource source={source} key={i}/>
                            );
                        })}
                    </div>
                ) : null}
            </div>


        </div>
    )
}