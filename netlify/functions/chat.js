import { GoogleGenAI } from "@google/generative-ai";

export default async (req, context) => {
  // Allow only POST requests
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { message, history } = await req.json();

    // Check if key is available
    if (!process.env.GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: "API Key missing in backend" }), { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const model = ai.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are 'StudyCircle AI', an expert computer science tutor for NITRR MCA students. Break down complex programming, math, and theory concepts cleanly. Use clear formatting, bullet points, and code snippets when relevant."
    });

    const chat = model.startChat({ history: history || [] });
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return new Response(JSON.stringify({ reply: responseText }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Gemini Backend Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch response from AI" }), { status: 500 });
  }
};