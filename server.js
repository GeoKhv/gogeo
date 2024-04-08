console.log("API ключ:", process.env.OPENAI_API_KEY); // Добавьте эту строку в начало вашего файла server.js

const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from gogeo!');
});

const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.post('/ask', async (req, res) => {
  console.log("Запрос получен:", req.body);
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
    console.error("Ошибка при выполнении запроса к OpenAI:", error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
