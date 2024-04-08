console.log("API ключ:", process.env.OPENAI_API_KEY);

const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from gogeo!');
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/ask', async (req, res) => {
  const prompt = req.body.prompt;
  console.log("Запрос получен:", req.body);
  try {
    // Используем модель GPT-4
    const completion = await openai.createCompletion({
      model: "GPT-4", // Замените на "gpt-4" как только она станет доступна в SDK
      prompt: prompt,
      max_tokens: 150,
      n: 1,
      temperature: 0.5,
    });
    res.json({ response: completion.data.choices[0].text.trim() });
  } catch (error) {
    console.error("Ошибка при выполнении запроса к OpenAI:", error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
