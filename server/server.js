const mongoose = require('mongoose');
const {
    general_chatbot,
    quiz_generate
} = require('./controllers/gptController');
const {
    addUser,
    loginUser,
    addChatSession,
    getMessage,
    addMessage,
    deleteMessages
} = require('./controllers/chatbotController');

const express = require('express');
const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // Allow requests from this origin
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // Include PATCH in the list of methods allowed
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    if (req.method === 'OPTIONS') {
        // Respond with 200 status for OPTIONS preflight request
        res.sendStatus(200);
    } else {
        next();
    }
});
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/chatbot')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.post('/chatbot', general_chatbot);

app.post('/quiz', quiz_generate);

app.post('/register', addUser);

app.post('/login', loginUser);

app.post('/newchat/:userId', addChatSession);

app.get('/chat/:userId', getMessage);

app.delete('/chat/:userId', deleteMessages);

app.patch('/chat/:userId', addMessage);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});