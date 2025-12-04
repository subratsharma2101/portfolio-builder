const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[a-z0-9_-]+$/, 'Username can only contain letters, numbers, underscores and dashes']
    },
    plan: {
        type: String,
        enum: ['free', 'pro', 'enterprise'],
        default: 'free'
    },
    portfolio: {
        personalInfo: {
            name: { type: String, default: '' },
            title: { type: String, default: '' },
            email: { type: String, default: '' },
            phone: { type: String, default: '' },
            location: { type: String, default: '' },
            github: { type: String, default: '' },
            linkedin: { type: String, default: '' },
            summary: [{ type: String }]
        },
        skills: {
            languages: [{ type: String }],
            frameworks: [{ type: String }],
            tools: [{ type: String }],
            domains: [{ type: String }]
        },
        experience: [{
            company: String,
            position: String,
            location: String,
            period: String,
            description: String,
            highlights: [String]
        }],
        projects: [{
            title: String,
            year: String,
            description: String,
            technologies: [String],
            status: { type: String, enum: ['Completed', 'In Development', 'On Hold'], default: 'Completed' }
        }],
        education: [{
            degree: String,
            institution: String,
            period: String
        }],
        certifications: [{
            title: String,
            issuer: String
        }]
    },
    theme: {
        type: String,
        default: 'default'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
