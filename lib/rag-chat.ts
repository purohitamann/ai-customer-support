import { RAGChat, upstash, UpstashChatModel } from "@upstash/rag-chat"
export const ragChat =  new RAGChat({
    model: upstash("meta-llama/Meta-Llama-3-8B-Instruct"),
})