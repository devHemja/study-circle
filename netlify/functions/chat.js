const { GoogleGenAI } = require("@google/generative-ai");

exports.handler = async (event, context) => {
  // Allow only POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { message, history } = JSON.parse(event.body);

    // Initialize Gemini with the environment variable stored safely in Netlify
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // Using gemini-1.5-flash for incredibly fast & cost-efficient responses
    const model = ai.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are 'StudyCircle AI', an expert computer science tutor for NITRR MCA students. Break down complex programming, math, and theory concepts cleanly. Use clear formatting, bullet points, and code snippets (C++, Java, Python) when relevant. Keep your tone supportive, academic, and engaging."
    });

    // Format chat history for the Gemini API structure
    const chat = model.startChat({
      history: history || []
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply: responseText }),
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch response from StudyCircle AI" }),
    };
  }
};