import { cn } from '@/lib/utils'
import React from 'react'
import { User } from "lucide-react";
import { Bot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Box } from '@mui/material'
import { getCurrentTime } from '@/lib/utils';
interface MessageProps {
    content: string
    isUserMessage: boolean
}
const MessageComponent = ({ content, isUserMessage }: MessageProps) => {
    return (
        <Box className={cn({
            'justify-end': isUserMessage,
            'justify-start': !isUserMessage
        })}>
            <Box className={cn("flex flex-row gap-4", {
                'flex-row-reverse ': isUserMessage,
                'flex-row': !isUserMessage
            })}>


                <Avatar>

                    <AvatarFallback> {isUserMessage ? <User size={24} /> : <Bot size={24} />} </AvatarFallback>
                </Avatar>
                <div className=" flex items-center space-x-4 rounded-md border p-4">

                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {content}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {getCurrentTime()} local time
                        </p>
                    </div>
                </div>
            </Box>

        </Box>
    )
}

export default MessageComponent;
