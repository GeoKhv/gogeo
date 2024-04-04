function getAssistantResponse(input) {
  fetch('/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: input }),
  })
  .then(response => response.json())
  .then(data => {
    addMessageToChat('Ассистент', data.response);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
