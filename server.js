const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const User = require('./models/User');
const searchRoutes = require('./routes/search');
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ error: "Not authenticated" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid or expired token" });
        req.user = user;
        next();
    });
}

require('dotenv').config();

if (!process.env.JWT_SECRET_KEY || !process.env.MONGODB_URI) {
    console.error("Essential environment variables are missing!");
    process.exit(1);
}

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy...';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Authorization', 'Content-Type'],
    optionsSuccessStatus: 204
};

app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api/search', searchRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/user/:username', authenticateToken, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    if (req.user.username !== req.params.username) {
        return res.status(403).json({ error: "Not authorized" });
    }

    try {
        const user = await User.findOne({ username: req.params.username });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/recent-users', async (req, res) => {
    try {
        const recentUsers = await User.find({ createdAt: { $gte: new Date('2023-01-01') } });
        res.json(recentUsers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/delete/:username', authenticateToken, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    if (req.user.username !== req.params.username) {
        return res.status(403).json({ error: "Not authorized to delete this user" });
    }

    try {
        await User.findOneAndDelete({ username: req.params.username });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.post('/logout', (req, res) => {
    return res.status(200).json({ message: "Logged out" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    if (process.env.NODE_ENV === 'development') {
        res.status(500).json({ error: err.message, stack: err.stack });
    } else {
        res.status(500).json({ error: 'Something broke!' });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
