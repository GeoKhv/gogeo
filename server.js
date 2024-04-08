// Сначала импортируем SDK
const { OpenAI } = require('openai');

// Инициализируем клиента OpenAI
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Добавляем middleware для парсинга JSON
app.use(bodyParser.json());

// Основной маршрут для проверки работоспособности
app.get('/', (req, res) => {
  res.send('Hello from gogeo!');
});

// Маршрут для обработки запросов к OpenAI
app.post('/ask', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: req.body.prompt,
        },
      ],
    });

    // Отправляем ответ от OpenAI клиенту
    res.json({ response: completion.data.choices[0].message.content });
  } catch (error) {
    console.error("Ошибка при выполнении запроса к OpenAI:", error);
    res.status(500).send('An error occurred');
  }
});

// Запускаем сервер
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
