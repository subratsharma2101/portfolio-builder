require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Connect to MongoDB
const connectDB = async () => {
    try {
        if (process.env.MONGODB_URI) {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('✅ Connected to MongoDB');
        } else {
            console.log('⚠️  MongoDB URI not found. Running in demo mode with JSON file.');
        }
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        console.log('⚠️  Running in demo mode with JSON file.');
    }
};

connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Legacy routes for backward compatibility (JSON file based)
const fs = require('fs');
const DATA_FILE = path.join(__dirname, 'data.json');

const readData = () => {
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (error) {
        return null;
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        return false;
    }
};

// Get all data (demo mode)
app.get('/api/data', (req, res) => {
    const data = readData();
    if (data) {
        res.json(data);
    } else {
        res.status(500).json({ error: 'Failed to read data' });
    }
});

// Update routes for demo mode
app.put('/api/personal', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed to read data' });
    data.personalInfo = { ...data.personalInfo, ...req.body };
    if (writeData(data)) {
        res.json({ success: true, data: data.personalInfo });
    } else {
        res.status(500).json({ error: 'Failed to save' });
    }
});

app.put('/api/skills', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed to read data' });
    data.skills = req.body;
    if (writeData(data)) {
        res.json({ success: true, data: data.skills });
    } else {
        res.status(500).json({ error: 'Failed to save' });
    }
});

// Experience CRUD (demo mode)
app.post('/api/experience', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed' });
    data.experience.push(req.body);
    writeData(data);
    res.json({ success: true, data: data.experience });
});

app.put('/api/experience/:index', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed' });
    const index = parseInt(req.params.index);
    data.experience[index] = req.body;
    writeData(data);
    res.json({ success: true, data: data.experience });
});

app.delete('/api/experience/:index', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed' });
    data.experience.splice(parseInt(req.params.index), 1);
    writeData(data);
    res.json({ success: true, data: data.experience });
});

// Projects CRUD (demo mode)  
app.post('/api/projects', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed' });
    data.projects.push(req.body);
    writeData(data);
    res.json({ success: true, data: data.projects });
});

app.put('/api/projects/:index', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed' });
    const index = parseInt(req.params.index);
    data.projects[index] = req.body;
    writeData(data);
    res.json({ success: true, data: data.projects });
});

app.delete('/api/projects/:index', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed' });
    data.projects.splice(parseInt(req.params.index), 1);
    writeData(data);
    res.json({ success: true, data: data.projects });
});

// Education & Certifications (demo mode)
app.put('/api/education', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed' });
    data.education = req.body;
    writeData(data);
    res.json({ success: true, data: data.education });
});

app.put('/api/certifications', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed' });
    data.certifications = req.body;
    writeData(data);
    res.json({ success: true, data: data.certifications });
});

// Serve admin panel
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 Portfolio Builder API Server                          ║
║                                                            ║
║   Admin Panel: http://localhost:${PORT}/admin                ║
║   API Base:    http://localhost:${PORT}/api                  ║
║                                                            ║
║   Auth Endpoints:                                          ║
║   POST /api/auth/register - Create account                 ║
║   POST /api/auth/login    - Login                          ║
║   GET  /api/auth/me       - Get current user               ║
║                                                            ║
║   Portfolio Endpoints:                                     ║
║   GET  /api/portfolio/u/:username - Public portfolio       ║
║   GET  /api/portfolio/my          - My portfolio           ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});
