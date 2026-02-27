import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Chat endpoint
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ reply: "⚠️ No message received from user." });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a chatbot for Harsh’s portfolio. Answer only questions about his education, skills, projects, and achievements."
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("❌ OpenAI API error:", data);
            return res.status(500).json({ reply: "⚠️ OpenAI error: " + (data.error?.message || "Unknown error") });
        }

        const reply = data.choices?.[0]?.message?.content?.trim() || "⚠️ No reply generated.";
        res.json({ reply });

    } catch (error) {
        console.error("❌ Server error contacting OpenAI:", error);
        res.status(500).json({ reply: "⚠️ Server error while contacting OpenAI." });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
