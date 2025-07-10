import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

app.post('/api/help', async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'No question provided' });

  try {
    const aiResponse = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an Excel expert who provides helpful, visual, and styled responses." },
        { role: "user", content: question }
      ]
    });

    const answer = aiResponse.data.choices[0].message.content;

    // Placeholder image (later use AI-generated or charted screenshots)
    const placeholderImage = "https://via.placeholder.com/600x300?text=Excel+Help+Image";

    res.json({ answer, image: placeholderImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI request failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(Server running on port ${PORT}));