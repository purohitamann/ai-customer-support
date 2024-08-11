import { NextResponse } from 'next/server';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerativeModel,
  ChatSession,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

const model: GenerativeModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You are a Student Assistant Chatbot designed to help students with various aspects of their academic life. 
  Before assisting, always ask the student for the name of their college or university and the specific program they are enrolled in. 
  Your role includes: 
  - Course Assistance: Guide students on the courses they are taking, provide overviews, and help them rate or evaluate courses.
  - Administrative Support: Assist with tasks like registration, deadlines, and academic records.
  - Department Connection: Help students connect with relevant departments, such as financial aid or academic advising.
  - General Information: Offer information about the campus, events, and student services.
  Be friendly, concise, and informative, aiming to support and enhance the student experience.`,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function POST(req: Request) {
  const data = await req.json();

  const chatSession: ChatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          { text: "I am a Computer Science student at Sheridan College. Tell me about Software Development and Network Engineering at Sheridan." },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `{
              "Software Development": {
                "overview": "Sheridan's Software Development program offers a comprehensive curriculum covering various programming languages, software development methodologies, and industry-relevant technologies. Students gain hands-on experience in designing, developing, and testing software applications across different platforms.",
                "course_highlights": ["Object-Oriented Programming", "Web Development", "Mobile Application Development", "Database Management", "Software Engineering Principles"],
                "career_paths": ["Software Developer", "Web Developer", "Mobile App Developer", "Software Engineer", "Database Administrator"]
              },
              "Network Engineering": {
                "overview": "Sheridan's Network Engineering program prepares students for careers in the growing field of network infrastructure. They gain knowledge of network protocols, security, troubleshooting, and network design, with hands-on experience in setting up and managing real-world network environments.",
                "course_highlights": ["Network Fundamentals", "Network Security", "Cisco Networking", "Routing and Switching", "Wireless Networking"],
                "career_paths": ["Network Engineer", "Network Administrator", "Systems Administrator", "Cybersecurity Analyst", "IT Consultant"]
              }
            }`,
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");

  const stream = new ReadableStream({
    async start(controller) {
    const encoder = new TextEncoder();
    try {
        if (Array.isArray(result)) {
            for await (const chunk of result) {
                const content = chunk.choices[0]?.delta?.content;
                if (content) {
                    const text = encoder.encode(content);
                    controller.enqueue(text);
                }
            }
        }
    } catch (err) {
        controller.error(err);
    } finally {
        controller.close();
    }
    },
  });

  return new NextResponse(stream);
}
