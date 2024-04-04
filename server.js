const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = 3000;

// Ваш ключ API OpenAI
const openai = new OpenAIApi(new Configuration({
  apiKey: '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',
}));

app.use(bodyParser.json());

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
