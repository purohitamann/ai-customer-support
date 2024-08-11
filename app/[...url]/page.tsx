import { ragChat } from '@/lib/rag-chat';
import React from 'react';
import { redis } from '@/lib/redis';
import ChatBox from '@/components/ChatBox';
import { Container } from '@mui/material';
interface PageProps {
    params: {
        url: string | string[] | undefined
    }
}

function reconstructURL({ url }: { url: string[] }) {
    const decodeComponents = url.map((component) => decodeURIComponent(component))
    return decodeComponents.join('/');
}
const page = async ({ params }: PageProps) => {
    console.log(params);
    const reconstructedUrl = reconstructURL({ url: params.url as string[] })
    const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl)

    const session = "mock-session";
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
        <Container>
            <ChatBox sessionId={session} />
        </Container>
    )
}

export default page
