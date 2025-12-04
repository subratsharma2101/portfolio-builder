const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Read data from JSON file
const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data:', error);
        return null;
    }
};

// Write data to JSON file
const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing data:', error);
        return false;
    }
};

// API Routes

// Get all data
app.get('/api/data', (req, res) => {
    const data = readData();
    if (data) {
        res.json(data);
    } else {
        res.status(500).json({ error: 'Failed to read data' });
    }
});

// Update personal info
app.put('/api/personal', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed to read data' });

    data.personalInfo = { ...data.personalInfo, ...req.body };
    if (writeData(data)) {
        res.json({ success: true, data: data.personalInfo });
    } else {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Update skills
app.put('/api/skills', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed to read data' });

    data.skills = req.body;
    if (writeData(data)) {
        res.json({ success: true, data: data.skills });
    } else {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Experience CRUD
app.get('/api/experience', (req, res) => {
    const data = readData();
    res.json(data?.experience || []);
});

app.post('/api/experience', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed to read data' });

    data.experience.push(req.body);
    if (writeData(data)) {
        res.json({ success: true, data: data.experience });
    } else {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

app.put('/api/experience/:index', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed to read data' });

    const index = parseInt(req.params.index);
    if (index >= 0 && index < data.experience.length) {
        data.experience[index] = req.body;
        if (writeData(data)) {
            res.json({ success: true, data: data.experience });
        } else {
            res.status(500).json({ error: 'Failed to save data' });
        }
    } else {
        res.status(404).json({ error: 'Experience not found' });
    }
});

app.delete('/api/experience/:index', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed to read data' });

    const index = parseInt(req.params.index);
    if (index >= 0 && index < data.experience.length) {
        data.experience.splice(index, 1);
        if (writeData(data)) {
            res.json({ success: true, data: data.experience });
        } else {
            res.status(500).json({ error: 'Failed to save data' });
        }
    } else {
        res.status(404).json({ error: 'Experience not found' });
    }
});

// Projects CRUD
app.get('/api/projects', (req, res) => {
    const data = readData();
    res.json(data?.projects || []);
});

app.post('/api/projects', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed to read data' });

    data.projects.push(req.body);
    if (writeData(data)) {
        res.json({ success: true, data: data.projects });
    } else {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

app.put('/api/projects/:index', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed to read data' });

    const index = parseInt(req.params.index);
    if (index >= 0 && index < data.projects.length) {
        data.projects[index] = req.body;
        if (writeData(data)) {
            res.json({ success: true, data: data.projects });
        } else {
            res.status(500).json({ error: 'Failed to save data' });
        }
    } else {
        res.status(404).json({ error: 'Project not found' });
    }
});

app.delete('/api/projects/:index', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed to read data' });

    const index = parseInt(req.params.index);
    if (index >= 0 && index < data.projects.length) {
        data.projects.splice(index, 1);
        if (writeData(data)) {
            res.json({ success: true, data: data.projects });
        } else {
            res.status(500).json({ error: 'Failed to save data' });
        }
    } else {
        res.status(404).json({ error: 'Project not found' });
    }
});

// Education CRUD
app.put('/api/education', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed to read data' });

    data.education = req.body;
    if (writeData(data)) {
        res.json({ success: true, data: data.education });
    } else {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Certifications CRUD
app.put('/api/certifications', (req, res) => {
    const data = readData();
    if (!data) return res.status(500).json({ error: 'Failed to read data' });

    data.certifications = req.body;
    if (writeData(data)) {
        res.json({ success: true, data: data.certifications });
    } else {
        res.status(500).json({ error: 'Failed to save data' });
    }
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
║   🚀 Portfolio Admin Backend Server                        ║
║                                                            ║
║   Admin Panel: http://localhost:${PORT}/admin                ║
║   API Base:    http://localhost:${PORT}/api                  ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});
