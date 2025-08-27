import {AiSource} from "@/types/Ai";
import chat from "@/styles/chat.module.css";

interface MessageSourceProps {
    source: AiSource
}

export default function MessageSource({source}: MessageSourceProps){
    const blogBase = process.env.NEXT_PUBLIC_BLOG_ROOT_URL ?? 'http://localhost:3000/blog'
    const href = `${blogBase}/${source.slug}`;
    return (
        <div className={chat.sourceContainer}
             onClick={() => window.open(href, "_blank")}>
            <div
                className={chat.sourceImg}
                style={{ backgroundImage: `url(${source.img})`}}>
            </div>
            <p>{source.title ?? source.slug}</p>
        </div>
    )
}