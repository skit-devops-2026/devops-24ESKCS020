const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { isValidTodoText } = require('./utils');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/todos';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(MONGO_URL)
    .then(() => console.log(`Connected to MongoDB at ${MONGO_URL}`))
    .catch((err) => console.error(`MongoDB connection error: ${err.message}`));

// Todo Schema & Model
const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Todo = mongoose.model('Todo', todoSchema);

// GET /todos - Fetch all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: 1 });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

// POST /todos - Create a new todo
app.post('/todos', async (req, res) => {
    try {
        const { text } = req.body;
        if (!isValidTodoText(text)) {
            return res.status(400).json({ error: 'Valid todo text is required' });
        }
        const newTodo = new Todo({ text: text.trim() });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create todo' });
    }
});

// DELETE /todos/:id - Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
