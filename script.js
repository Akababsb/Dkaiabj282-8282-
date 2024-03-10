const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    scrollToBottom();
}

function userSendMessage() {
    const message = userInput.value.trim();
    console.log('User Message:', message); // Add this line to log user's message
    if (message === '') return;
    addMessage(message, 'user');
    userInput.value = '';
    
    // Making a request to OpenAI's API
    fetch('https://api.openai.com/v1/answers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': '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' // Replace YOUR_OPENAI_API_KEY with your actual API key
        },
        body: JSON.stringify({
            question: message,
            model: 'davinci', // You can change the model according to your preference
            examples_context: 'Your optional examples context',
            max_tokens: 100 // Adjust according to your preference
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('API Response:', data); // Add this line to log API response
        const aiResponse = data.answers[0].text;
        addMessage(aiResponse, 'bot');
    })
    .catch(error => console.error('Error:', error));
}

userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        userSendMessage();
    }
});

// Initial welcome message
addMessage("Welcome! How can I assist you?", 'bot');
