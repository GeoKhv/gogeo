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
    // Обновлено для использования GPT-4
    const response = await openai.createCompletion({
      model: "gpt-4", // Убедитесь, что модель доступна в вашем тарифе
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.7,
    });
    res.json({ response: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error("Ошибка при выполнении запроса к OpenAI:", error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
