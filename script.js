function askQuestion() {
    const question = document.getElementById('question').value;
    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: question }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('answer').textContent = data.response;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
