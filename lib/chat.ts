import axios from "axios";
import {AiChatResponse} from "@/types";

async function aiChat(question: string): Promise<AiChatResponse>{
    const response = await axios.post("/api/ai/chat", {question:question})
    return response.data
}

export {aiChat}