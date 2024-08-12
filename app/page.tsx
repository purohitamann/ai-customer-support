'use client'
import Image from "next/image";
import ChatBox from "../components/ChatBox";
import Container from "@mui/material/Container";
import { Typography, Box } from "@mui/material";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-2">

      <Container maxWidth="md"  >

        <ChatBox sessionId="mock-session" initialMessages={[]} />

      </Container>
    </section >

  );
}
