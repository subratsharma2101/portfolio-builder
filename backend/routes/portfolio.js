const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get current user's portfolio (protected)
router.get('/my', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user.portfolio);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update personal info
router.put('/personal', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        user.portfolio.personalInfo = { ...user.portfolio.personalInfo, ...req.body };
        await user.save();
        res.json({ success: true, data: user.portfolio.personalInfo });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update' });
    }
});

// Update skills
router.put('/skills', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        user.portfolio.skills = req.body;
        await user.save();
        res.json({ success: true, data: user.portfolio.skills });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update' });
    }
});

// Experience CRUD
router.post('/experience', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        user.portfolio.experience.push(req.body);
        await user.save();
        res.json({ success: true, data: user.portfolio.experience });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add' });
    }
});

router.put('/experience/:index', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const index = parseInt(req.params.index);
        if (index >= 0 && index < user.portfolio.experience.length) {
            user.portfolio.experience[index] = req.body;
            await user.save();
            res.json({ success: true, data: user.portfolio.experience });
        } else {
            res.status(404).json({ error: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update' });
    }
});

router.delete('/experience/:index', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const index = parseInt(req.params.index);
        user.portfolio.experience.splice(index, 1);
        await user.save();
        res.json({ success: true, data: user.portfolio.experience });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete' });
    }
});

// Projects CRUD
router.post('/projects', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        user.portfolio.projects.push(req.body);
        await user.save();
        res.json({ success: true, data: user.portfolio.projects });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add' });
    }
});

router.put('/projects/:index', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const index = parseInt(req.params.index);
        if (index >= 0 && index < user.portfolio.projects.length) {
            user.portfolio.projects[index] = req.body;
            await user.save();
            res.json({ success: true, data: user.portfolio.projects });
        } else {
            res.status(404).json({ error: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update' });
    }
});

router.delete('/projects/:index', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const index = parseInt(req.params.index);
        user.portfolio.projects.splice(index, 1);
        await user.save();
        res.json({ success: true, data: user.portfolio.projects });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete' });
    }
});

// Education
router.put('/education', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        user.portfolio.education = req.body;
        await user.save();
        res.json({ success: true, data: user.portfolio.education });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update' });
    }
});

// Certifications
router.put('/certifications', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        user.portfolio.certifications = req.body;
        await user.save();
        res.json({ success: true, data: user.portfolio.certifications });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update' });
    }
});

// PUBLIC: Get portfolio by username
router.get('/u/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }
        res.json({
            username: user.username,
            portfolio: user.portfolio,
            theme: user.theme
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
