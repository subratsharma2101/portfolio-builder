# Professional Portfolio Website

A modern, industry-standard portfolio website built with React, Vite, and Tailwind CSS. Features dark mode, smooth animations, and a responsive design.

## Features

- 🎨 **Modern Dark Theme** - Professional dark background with gradient accents
- ✨ **Smooth Animations** - Framer Motion powered animations and transitions
- 📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- 🚀 **Fast Performance** - Built with Vite for optimal build times and HMR
- 🎯 **SEO Friendly** - Optimized structure and meta tags

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
portfolio-website/
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   ├── App.tsx      # Main app component
│   ├── main.tsx     # Entry point
│   └── index.css    # Global styles
├── index.html       # HTML template
└── package.json     # Dependencies
```

## Customization

### Update Personal Information

Edit the following files to update your information:
- `src/components/Hero.tsx` - Name and title
- `src/components/About.tsx` - Professional summary
- `src/components/Skills.tsx` - Skills and technologies
- `src/components/Experience.tsx` - Work experience
- `src/components/Projects.tsx` - Projects
- `src/components/Education.tsx` - Education
- `src/components/Contact.tsx` - Contact information

### Change Colors

Edit `tailwind.config.js` to customize the color scheme:
- `primary` - Primary accent color
- `accent` - Secondary accent color

### Add Resume PDF

Place your resume PDF in the `public/` directory and name it `resume.pdf`. The download button in the Hero section will automatically link to it.

## License

MIT

