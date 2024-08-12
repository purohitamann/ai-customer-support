'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { type Message } from 'ai/react';
import { useChat } from 'ai/react';
import Messages from "./Messages"

export default function ChatBox({ sessionId, initialMessages }: { sessionId: string, initialMessages: Message[] }) {
    //under the hood this is just state
    const { messages, handleInputChange, handleSubmit, input } = useChat({
        api: "/api/chat",
        body: { sessionId },
        initialMessages
    });
    return (
        <section className="items-center justify-center min-h-screen min-w-screen py-2">
            <Box>
                <Box className="flex flex-col gap-4">
                    <p className="text-sm font-medium leading-none">
                        AI Customer Support
                    </p>
                    <p className="text-sm text-muted-foreground">
                        local time
                    </p>

                </Box>
                <Stack direction={"column"} gap={4}>
                    <ScrollArea className="h-[70vh] w-full rounded-md border p-4">
                        <Stack gap={3} className=" min-h-dvh">

                            <Messages messages={messages} />
                        </Stack>


                    </ScrollArea>

                    <form className="display flex flex-row gap-4" onSubmit={handleSubmit}>
                        <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>Usr</AvatarFallback>
                        </Avatar>

                        <Input value={input} placeholder="Type here" onChange={handleInputChange} />
                        <Button type="submit"  >Send</Button>
                    </form>

                </Stack>
                {/* <Box>
                    {JSON.stringify(messages)}
                </Box> */}
            </Box>
        </section>
    )
}
