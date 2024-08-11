'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

import { useChat } from 'ai/react';

export default function ChatBox({ sessionId }: { sessionId: string }) {
    const { messages, handleInputChange } = useChat({
        api: "/api/chat",
        body: {}
    });
    return (
        <div className="w-full h-full" >
            <Box>
                <Stack direction={"column"} gap={4}>
                    <ScrollArea className="h-[70vh] w-full rounded-md border p-4">
                        <Stack gap={2} className=" min-h-dvh">
                            <Box className="flex flex-row gap-4 justify-start"  >
                                <Avatar>
                                    <AvatarImage src="" />
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                                <div className=" flex items-center space-x-4 rounded-md border p-4">

                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            Hi there! I am your AI customer support. How can I help you today?
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            you can ask me anything about your orders, shipping, returns, etc.
                                        </p>
                                    </div>
                                </div>

                            </Box>
                            <Box className="flex flex-row gap-4 justify-end">

                                <div className=" flex items-center space-x-4 rounded-md border p-4">

                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            The product i recieved is damaged, I'd liked to return it.
                                        </p>
                                        {/* <p className="text-sm text-muted-foreground">
                                            you can ask me anything about your orders, shipping, returns, etc.
                                        </p> */}
                                    </div>
                                </div>
                                <Avatar>
                                    <AvatarImage src="" />
                                    <AvatarFallback>usr</AvatarFallback>
                                </Avatar>

                            </Box>
                            <Box className="flex flex-row gap-4">
                                <Avatar>
                                    <AvatarImage src="" />
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-2">

                                    {/* <p>Hi there! How can I help you today?</p> */}
                                    <Skeleton className="w-[100px] h-[20px] rounded-full" />
                                    <Skeleton className="w-[200px] h-[20px] rounded-full" />
                                </div>

                            </Box>


                        </Stack>


                    </ScrollArea>
                    <section className="display flex flex-row gap-4">


                        <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>Usr</AvatarFallback>
                        </Avatar>

                        <Input placeholder="Type here" onChange={handleInputChange} />
                        <Button  >Send</Button>
                    </section>
                </Stack>
                <Box>
                    {JSON.stringify(messages)}
                </Box>
            </Box>
        </div>
    )
}
