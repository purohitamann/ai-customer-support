import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Box } from '@mui/material'
import { type Message as TMessage } from 'ai/react'; // type kwyword will only import the typescript definition and not the implementation 
import MessageComponent from './Message';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot } from 'lucide-react';
interface MessagesProps {

    messages: TMessage[] // this is just a type. it's not used in the code.
}
const Messages = ({ messages }: MessagesProps) => {
    return (
        <div>
            <div className="flex flex-col gap-4" >

                {messages.length ? messages.map((message, i) => (
                    <MessageComponent key={i} content={message.content} isUserMessage={message.role === "user"} />
                )) : < Box className="flex flex-row gap-4">
                    <Avatar>

                        <AvatarFallback><Bot size={24} /></AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">

                        <p>Hi there! How can I help you today?</p>
                        <Skeleton className="w-[100px] h-[20px] rounded-full" />
                        <Skeleton className="w-[200px] h-[20px] rounded-full" />
                    </div>

                </Box>}
            </div>



        </div >
    )
}

export default Messages
