import { NextRequest } from "next/server"
import { ragChat } from "@/lib/rag-chat"
import {aiUseChatAdapter} from "@upstash/rag-chat/nextjs"
//http verb we want to repond to is POST. it can be DELETE as per NExtjs convention
export const POST = async (req: NextRequest) => {

  const {messages, sessionId} = await req.json()

  const lastMessage = messages[messages.length-1].content
  const response = await ragChat.chat(lastMessage, {streaming: true, sessionId});
  console.log("RESPONSE",response);
  return aiUseChatAdapter(response);
}