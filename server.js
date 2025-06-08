import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { CohereClient } from 'cohere-ai';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const cohere = new CohereClient({
  token: '5KsHfezmJc03TCojoXyO0QdCjG4hD4HgY4EYUa1f',
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the E-Commerce API!');
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await cohere.chat({
      message: message,
      model: 'command-r',
      chatHistory: [],
      connectors: [],
      promptTruncation: 'AUTO',
      temperature: 0.5,
      preamble: `You are a helpful assistant for an e-commerce website. 
The website sells fitness wearables such as shoes,clothes watches, and other accessories.
You should provide accurate and helpful responses to user queries, first give a promt asking Hi I am a helpful assistant for an e-commerce website, how can I help you today?, then if they mention any product mention the products overview is still work in progress.`,
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
