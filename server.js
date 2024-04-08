const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAI } = require('openai');

const app = express();
const port = 3000;

// Использование bodyParser для обработки JSON-тел запросов
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from gogeo!');
});

// Инициализация клиента OpenAI с использованием ключа API из переменных окружения
const openai = new OpenAI(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

app.post('/ask', async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      maxTokens: 150,
      n: 1,
      stop: null,
      temperature: 0.5,
    });
    res.json({ response: completion.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
