import { ragChat } from '@/lib/rag-chat';
import React from 'react';
import { redis } from '@/lib/redis';
import ChatBox from '@/components/ChatBox';
import { Container } from '@mui/material';
import { Box } from '@mui/material';
import { cookies } from 'next/headers';
interface PageProps {
    params: {
        url: string | string[] | undefined
    }
}

function reconstructURL({ url }: { url: string[] }) {
    const decodeComponents = url.map((component) => decodeURIComponent(component))
    console.log(decodeComponents);
    return decodeComponents.join('/');

}
const page = async ({ params }: PageProps) => {
    const sessionCookie = cookies().get("sessionid")?.value;
    console.log(params);
    const reconstructedUrl = reconstructURL({ url: params.url as string[] })
    const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl)

    const sessionId = (reconstructedUrl + "--" + sessionCookie).replace(/\//g, "");

    const initialMessages = await ragChat.history.getMessages({ amount: 10, sessionId });
    console.log(isAlreadyIndexed);
    if (!isAlreadyIndexed) {
        await ragChat.context.add({
            type: "html",
            source: reconstructedUrl,
            config: {
                chunkOverlap: 50, chunkSize: 200
            }
        });

        await redis.sadd("indexed-urls", reconstructedUrl);
    }

    return (
        <Container maxWidth="md" >

            <ChatBox sessionId={sessionId} initialMessages={initialMessages} />

        </Container>
    )
}

export default page
