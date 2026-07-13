import { GoogleGenerativeAI } from "@google/generative-ai";

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

    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = ai.getGenerativeModel({ 
      model: "gemini-3.5-flash",
      systemInstruction: `You are 'StudyCircle AI', a dedicated study assistant for NITRR MCA (Master of Computer Applications) students. Your ONLY purpose is to help with:
- MCA coursework subjects (DBMS, OS, DSA, Java, Computer Networks, Software Engineering, etc.)
- Programming concepts, code, and debugging help
- Math/theory relevant to the MCA curriculum
- Placement preparation (aptitude, technical interview prep, resumes for tech roles)
- General study strategies for these subjects

Break down concepts cleanly. Use clear formatting, bullet points, and code snippets when relevant.

STRICT SCOPE RULE: If a question is unrelated to the above (e.g. health/medical advice, personal life advice, entertainment, general trivia, current events, or anything outside MCA academics and tech placements), do NOT answer it. Instead, politely decline in one short sentence and redirect the student back to study topics, for example: "I'm StudyCircle AI, built just for your MCA studies and placement prep — I can't help with that, but ask me anything about DBMS, DSA, OS, or your other subjects!" Keep this decline brief and friendly, do not lecture the student, and do not provide any information about the off-topic question itself.`
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