from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

openai.api_key = 'YOUR_OPENAI_API_KEY'  # Замените на ваш реальный API ключ

@app.route('/')
def home():
    return '''
    <h1>Welcome to Geo's Personal Assistant</h1>
    <p>Type your query in the chat below:</p>
    <form action="/ask" method="POST">
        <input type="text" name="question">
        <input type="submit" value="Ask">
    </form>
    '''

@app.route('/ask', methods=['POST'])
def ask():
    question = request.form['question']
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Respond to the following query based on Geo's personal experience: {question}",
        max_tokens=150
    )
    answer = response.choices[0].text.strip()
    return jsonify({"answer": answer})

if __name__ == '__main__':
    app.run(host='0.0.0.0')

