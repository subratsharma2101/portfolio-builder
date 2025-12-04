import { useState, useEffect, useMemo } from 'react'

// API endpoint
const API_BASE = 'http://localhost:3001/api'

interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  github: string
  linkedin: string
  summary: string[]
}

interface Skills {
  languages: string[]
  frameworks: string[]
  tools: string[]
  domains: string[]
}

interface Experience {
  company: string
  position: string
  location: string
  period: string
  description: string
  highlights: string[]
}

interface Project {
  title: string
  year: string
  description: string
  technologies: string[]
  status: string
}

interface Education {
  degree: string
  institution: string
  period: string
}

interface Certification {
  title: string
  issuer: string
}

interface PortfolioData {
  personalInfo: PersonalInfo
  skills: Skills
  experience: Experience[]
  projects: Project[]
  education: Education[]
  certifications: Certification[]
}

// Default data (fallback if API fails)
const defaultData: PortfolioData = {
  personalInfo: {
    name: "Subrat Sharma",
    title: "Full-Stack Developer & ML Enthusiast",
    email: "subrat.sharma@example.com",
    phone: "+91 XXXXXXXXXX",
    location: "New Delhi, India",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    summary: [
      "Motivated and detail-oriented Computer Science undergraduate with hands-on experience in full-stack web development and applied machine learning.",
      "Developed scalable MERN-based platforms and AI-driven applications during academic projects and internships."
    ]
  },
  skills: {
    languages: ["C++", "Python", "JavaScript", "TypeScript", "SQL"],
    frameworks: ["React.js", "Node.js", "Express.js", "MongoDB", "TensorFlow"],
    tools: ["Git & GitHub", "Docker", "VS Code"],
    domains: ["Full-Stack Web Development", "Machine Learning", "Problem Solving"]
  },
  experience: [],
  projects: [],
  education: [],
  certifications: []
}

// Items per page
const ITEMS_PER_PAGE = 4

function App() {
  const [data, setData] = useState<PortfolioData>(defaultData)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

  // Pagination states
  const [showAllExperience, setShowAllExperience] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [showAllEducation, setShowAllEducation] = useState(false)

  // Filter states
  const [projectFilter, setProjectFilter] = useState<string>('all')
  const [projectStatusFilter, setProjectStatusFilter] = useState<string>('all')

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/data`)
        if (res.ok) {
          const json = await res.json()
          setData(json)
        }
      } catch (error) {
        console.log('Using default data (backend not running)')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const navItems = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact']

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  const { personalInfo, skills, experience, projects, education, certifications } = data

  // Get all unique technologies from projects
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>()
    projects.forEach(p => p.technologies.forEach(t => techs.add(t)))
    return Array.from(techs).sort()
  }, [projects])

  // Get unique statuses
  const allStatuses = useMemo(() => {
    const statuses = new Set<string>()
    projects.forEach(p => statuses.add(p.status))
    return Array.from(statuses)
  }, [projects])

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesTech = projectFilter === 'all' || p.technologies.includes(projectFilter)
      const matchesStatus = projectStatusFilter === 'all' || p.status === projectStatusFilter
      return matchesTech && matchesStatus
    })
  }, [projects, projectFilter, projectStatusFilter])

  // Displayed items (with Load More)
  const displayedExperience = showAllExperience ? experience : experience.slice(0, ITEMS_PER_PAGE)
  const displayedProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 6)
  const displayedEducation = showAllEducation ? education : education.slice(0, ITEMS_PER_PAGE)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container flex items-center justify-between h-16">
          <a href="#home" className="text-xl font-bold gradient-text">Subrat.dev</a>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize text-sm font-medium transition-colors hover:text-indigo-400 ${activeSection === item ? 'text-indigo-400' : 'text-gray-400'}`}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Hire Me
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative z-10">
        <div className="container text-center">
          <div className="mb-6 inline-block">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 animate-pulse-glow">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                <span className="text-4xl font-bold gradient-text">{personalInfo.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
            </div>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full text-green-400 text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Available for hire
            </div>
          </div>

          <p className="text-indigo-400 font-medium mb-2">Hello, I'm</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text">{personalInfo.name}</h1>
          <h2 className="text-xl md:text-2xl text-gray-400 mb-6">{personalInfo.title}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Building scalable web applications and AI-driven solutions with MERN stack.
            Passionate about creating elegant solutions to complex problems.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-gray-800/80 hover:bg-gray-700 rounded-xl transition-colors border border-gray-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              GitHub
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-gray-800/80 hover:bg-gray-700 rounded-xl transition-colors border border-gray-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              LinkedIn
            </a>
            <button onClick={() => scrollToSection('contact')} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-xl transition-all font-medium shadow-lg shadow-indigo-500/25">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-8"></div>

          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-indigo-400 mb-4">Professional Summary</h3>
            <ul className="space-y-4">
              {personalInfo.summary.map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <span className="text-indigo-400 mt-1">▹</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative z-10">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center gradient-text">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-12 mx-auto"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-indigo-400 mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-sm hover:bg-indigo-500/20 transition-colors cursor-default">{skill}</span>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg text-sm hover:bg-purple-500/20 transition-colors cursor-default">{skill}</span>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-sm hover:bg-cyan-500/20 transition-colors cursor-default">{skill}</span>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-pink-400 mb-4">Domains</h3>
              <div className="flex flex-wrap gap-2">
                {skills.domains.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-pink-500/10 border border-pink-500/30 rounded-lg text-sm hover:bg-pink-500/20 transition-colors cursor-default">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative z-10">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center gradient-text">Work Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-4 mx-auto"></div>
          <p className="text-center text-gray-500 mb-8">{experience.length} position{experience.length !== 1 ? 's' : ''}</p>

          <div className="max-w-3xl mx-auto space-y-6">
            {displayedExperience.map((exp, index) => (
              <div key={index} className="glass rounded-2xl p-6 hover:border-indigo-500/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
                    <p className="text-indigo-400 font-medium">{exp.company}</p>
                    <p className="text-gray-400 text-sm mb-3">{exp.location} • {exp.period}</p>
                    <p className="text-gray-300 mb-3">{exp.description}</p>
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                            <span className="text-indigo-400">▹</span>{h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {experience.length > ITEMS_PER_PAGE && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllExperience(!showAllExperience)}
                className="px-6 py-3 glass rounded-xl hover:bg-white/10 transition-colors text-gray-300"
              >
                {showAllExperience ? '← Show Less' : `Show All ${experience.length} Experiences →`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative z-10">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center gradient-text">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-4 mx-auto"></div>
          <p className="text-center text-gray-500 mb-8">{filteredProjects.length} of {projects.length} project{projects.length !== 1 ? 's' : ''}</p>

          {/* Filters */}
          {projects.length > 3 && (
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">Status:</span>
                <select
                  value={projectStatusFilter}
                  onChange={(e) => setProjectStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">All</option>
                  {allStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Tech Filter */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">Tech:</span>
                <select
                  value={projectFilter}
                  onChange={(e) => setProjectFilter(e.target.value)}
                  className="px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">All Technologies</option>
                  {allTechnologies.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>

              {/* Reset */}
              {(projectFilter !== 'all' || projectStatusFilter !== 'all') && (
                <button
                  onClick={() => { setProjectFilter('all'); setProjectStatusFilter('all') }}
                  className="px-4 py-2 text-indigo-400 hover:text-indigo-300 text-sm"
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project, index) => (
              <div key={index} className="glass rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all group hover:-translate-y-1">
                <div className={`h-32 bg-gradient-to-br ${index % 3 === 0 ? 'from-purple-500 to-pink-500' : index % 3 === 1 ? 'from-blue-500 to-cyan-500' : 'from-green-500 to-emerald-500'} flex items-center justify-center relative`}>
                  <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${project.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                    {project.status}
                  </span>
                  <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                    <span className="text-indigo-400 text-sm">{project.year}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-1 text-xs bg-gray-800 rounded-lg border border-gray-700">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-indigo-500/10 text-indigo-400 rounded-lg">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No projects match your filters. <button onClick={() => { setProjectFilter('all'); setProjectStatusFilter('all') }} className="text-indigo-400 hover:underline">Reset filters</button>
            </div>
          )}

          {/* Load More Button */}
          {filteredProjects.length > 6 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="px-6 py-3 glass rounded-xl hover:bg-white/10 transition-colors text-gray-300"
              >
                {showAllProjects ? '← Show Less' : `Show All ${filteredProjects.length} Projects →`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 relative z-10">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center gradient-text">Education</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-12 mx-auto"></div>

          <div className="max-w-3xl mx-auto space-y-6">
            {displayedEducation.map((edu, index) => (
              <div key={index} className="glass rounded-2xl p-6 hover:border-purple-500/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                    <p className="text-purple-400">{edu.institution}</p>
                    <p className="text-gray-400 text-sm">{edu.period}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {education.length > ITEMS_PER_PAGE && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllEducation(!showAllEducation)}
                className="px-6 py-3 glass rounded-xl hover:bg-white/10 transition-colors text-gray-300"
              >
                {showAllEducation ? '← Show Less' : `Show All ${education.length} →`}
              </button>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="max-w-4xl mx-auto mt-12">
              <h3 className="text-2xl font-semibold text-center text-white mb-6">Certifications ({certifications.length})</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="glass rounded-xl p-4 text-center hover:border-indigo-500/50 transition-colors">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                    </div>
                    <h4 className="font-medium text-white text-sm mb-1">{cert.title}</h4>
                    <p className="text-gray-400 text-xs">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative z-10">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center gradient-text">Let's Work Together</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-8 mx-auto"></div>
          <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>

          <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
            <a href={`mailto:${personalInfo.email}`} className="glass rounded-2xl p-6 text-center hover:border-red-500/50 transition-colors group">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <p className="text-gray-400 text-sm mb-1">Email</p>
              <p className="text-white font-medium text-sm break-all">{personalInfo.email}</p>
            </a>
            <a href={`tel:${personalInfo.phone}`} className="glass rounded-2xl p-6 text-center hover:border-green-500/50 transition-colors group">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <p className="text-gray-400 text-sm mb-1">Phone</p>
              <p className="text-white font-medium text-sm">{personalInfo.phone}</p>
            </a>
            <div className="glass rounded-2xl p-6 text-center hover:border-blue-500/50 transition-colors group">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <p className="text-gray-400 text-sm mb-1">Location</p>
              <p className="text-white font-medium text-sm">{personalInfo.location}</p>
            </div>
          </div>

          <div className="text-center mb-12">
            <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-xl font-semibold shadow-lg shadow-indigo-500/25 transition-all">
              Send Me a Message
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </a>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-4 glass rounded-xl hover:border-gray-600 transition-colors hover:text-white text-gray-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 glass rounded-xl hover:border-blue-500/50 transition-colors hover:text-blue-400 text-gray-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
              Made with <span className="text-red-500">❤</span> by {personalInfo.name}
            </p>
            <p className="text-gray-600 text-xs mt-2">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
