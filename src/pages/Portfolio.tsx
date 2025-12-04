import { useState, useEffect, useMemo } from 'react'

const API_BASE = 'http://localhost:3001/api'

interface PortfolioProps {
    username: string
}

export default function Portfolio({ username }: PortfolioProps) {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [activeSection, setActiveSection] = useState('home')
    const [showAllProjects, setShowAllProjects] = useState(false)

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const res = await fetch(`${API_BASE}/portfolio/u/${username}`)
                if (res.ok) {
                    const result = await res.json()
                    setData(result.portfolio)
                } else {
                    setError('Portfolio not found')
                }
            } catch {
                setError('Failed to load portfolio')
            } finally {
                setLoading(false)
            }
        }
        fetchPortfolio()
    }, [username])

    const navItems = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact']

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setActiveSection(id)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)' }}>
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)' }}>
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">404</h1>
                    <p className="text-gray-400 mb-6">{error}</p>
                    <a href="/" className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                        Go Home
                    </a>
                </div>
            </div>
        )
    }

    const { personalInfo, skills, experience, projects, education, certifications } = data

    const displayedProjects = showAllProjects ? projects : projects?.slice(0, 6)

    return (
        <div className="min-h-screen">
            {/* Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass">
                <div className="container flex items-center justify-between h-16">
                    <span className="text-xl font-bold gradient-text">{personalInfo?.name?.split(' ')[0] || username}.dev</span>
                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <button key={item} onClick={() => scrollToSection(item)} className={`capitalize text-sm font-medium transition-colors hover:text-indigo-400 ${activeSection === item ? 'text-indigo-400' : 'text-gray-400'}`}>
                                {item}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => scrollToSection('contact')} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-sm font-medium">
                        Hire Me
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative z-10">
                <div className="container text-center">
                    <div className="mb-6">
                        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 animate-pulse-glow">
                            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                                <span className="text-4xl font-bold gradient-text">{personalInfo?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}</span>
                            </div>
                        </div>
                        <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full text-green-400 text-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Available for hire
                        </div>
                    </div>
                    <p className="text-indigo-400 font-medium mb-2">Hello, I'm</p>
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text">{personalInfo?.name}</h1>
                    <h2 className="text-xl md:text-2xl text-gray-400 mb-6">{personalInfo?.title}</h2>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {personalInfo?.github && (
                            <a href={personalInfo.github} target="_blank" className="flex items-center gap-2 px-6 py-3 bg-gray-800/80 rounded-xl border border-gray-700">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                GitHub
                            </a>
                        )}
                        <button onClick={() => scrollToSection('contact')} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-medium">
                            Get In Touch
                        </button>
                    </div>
                </div>
            </section>

            {/* About */}
            <section id="about" className="py-20 relative z-10">
                <div className="container">
                    <h2 className="text-3xl font-bold mb-8 gradient-text">About Me</h2>
                    <div className="glass rounded-2xl p-8">
                        <ul className="space-y-4">
                            {personalInfo?.summary?.map((point: string, i: number) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300">
                                    <span className="text-indigo-400 mt-1">▹</span><span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section id="skills" className="py-20 relative z-10">
                <div className="container">
                    <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Skills</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {['languages', 'frameworks', 'tools', 'domains'].map((cat, idx) => (
                            <div key={cat} className="glass rounded-2xl p-6">
                                <h3 className={`text-lg font-semibold mb-4 ${idx === 0 ? 'text-indigo-400' : idx === 1 ? 'text-purple-400' : idx === 2 ? 'text-cyan-400' : 'text-pink-400'}`}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills?.[cat]?.map((skill: string, i: number) => (
                                        <span key={i} className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience */}
            <section id="experience" className="py-20 relative z-10">
                <div className="container">
                    <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Experience</h2>
                    <div className="max-w-3xl mx-auto space-y-6">
                        {experience?.map((exp: any, i: number) => (
                            <div key={i} className="glass rounded-2xl p-6">
                                <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
                                <p className="text-indigo-400">{exp.company}</p>
                                <p className="text-gray-400 text-sm mb-3">{exp.location} • {exp.period}</p>
                                <p className="text-gray-300">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects */}
            <section id="projects" className="py-20 relative z-10">
                <div className="container">
                    <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Projects</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedProjects?.map((proj: any, i: number) => (
                            <div key={i} className="glass rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform">
                                <div className={`h-32 bg-gradient-to-br ${i % 3 === 0 ? 'from-purple-500 to-pink-500' : i % 3 === 1 ? 'from-blue-500 to-cyan-500' : 'from-green-500 to-emerald-500'} flex items-center justify-center relative`}>
                                    <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${proj.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'}`}>{proj.status}</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-white mb-2">{proj.title}</h3>
                                    <p className="text-gray-400 text-sm mb-4">{proj.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {proj.technologies?.slice(0, 3).map((t: string, j: number) => (
                                            <span key={j} className="px-2 py-1 text-xs bg-gray-800 rounded-lg">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {projects?.length > 6 && (
                        <div className="text-center mt-8">
                            <button onClick={() => setShowAllProjects(!showAllProjects)} className="px-6 py-3 glass rounded-xl hover:bg-white/10">
                                {showAllProjects ? 'Show Less' : `Show All ${projects.length} Projects`}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Education */}
            <section id="education" className="py-20 relative z-10">
                <div className="container">
                    <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Education</h2>
                    <div className="max-w-3xl mx-auto space-y-6">
                        {education?.map((edu: any, i: number) => (
                            <div key={i} className="glass rounded-2xl p-6">
                                <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                                <p className="text-purple-400">{edu.institution}</p>
                                <p className="text-gray-400 text-sm">{edu.period}</p>
                            </div>
                        ))}
                    </div>
                    {certifications?.length > 0 && (
                        <div className="max-w-4xl mx-auto mt-12">
                            <h3 className="text-2xl font-semibold text-center text-white mb-6">Certifications</h3>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {certifications.map((cert: any, i: number) => (
                                    <div key={i} className="glass rounded-xl p-4 text-center">
                                        <h4 className="font-medium text-white text-sm mb-1">{cert.title}</h4>
                                        <p className="text-gray-400 text-xs">{cert.issuer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="py-20 relative z-10">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold mb-8 gradient-text">Let's Connect</h2>
                    <div className="max-w-md mx-auto glass rounded-2xl p-8">
                        <a href={`mailto:${personalInfo?.email}`} className="block w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-medium mb-4">
                            Send Email
                        </a>
                        <p className="text-gray-400">{personalInfo?.email}</p>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-800">
                        <p className="text-gray-500 text-sm">Built with Portfolio Builder</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
