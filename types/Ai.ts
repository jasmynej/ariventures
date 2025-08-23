

export enum ChatPOV  {
    USER = 'user',
    BOT = 'bot'
}
export type AiSource = {
    img: string
    slug: string
    tags: string[]
    categories: string[]
    wp_post_id: number
    title: string
}

export type AiChatResponse = {
    answer: string
    sources: AiSource[]
}

export type AiChatMessage = {
    direction: ChatPOV
    text: string
    sources?: AiSource[]
    timestamp: Date
}

export const initMessage: AiChatMessage = {
    direction: ChatPOV.BOT,
    text: "Hi! I'm Ari, your virtual travel assistant. I can give you information based on our Blogs and other verified data sources",
    timestamp: new Date()
}