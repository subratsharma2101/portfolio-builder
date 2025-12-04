import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const API_BASE = 'http://localhost:3001/api'

export default function Dashboard() {
    const { user, token, logout } = useAuth()
    const [portfolio, setPortfolio] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('overview')

    useEffect(() => {
        fetchPortfolio()
    }, [token])

    const fetchPortfolio = async () => {
        try {
            const res = await fetch(`${API_BASE}/portfolio/my`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) {
                const data = await res.json()
                setPortfolio(data)
            }
        } catch (error) {
            console.error('Failed to fetch portfolio')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)' }}>
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    const portfolioUrl = `${window.location.origin}/u/${user?.username}`

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)' }}>
            {/* Header */}
            <header className="glass border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold gradient-text">Portfolio Builder</h1>
                        <span className="px-2 py-1 text-xs bg-indigo-500/20 text-indigo-400 rounded-full">{user?.plan.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href={portfolioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            View Portfolio
                        </a>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Welcome Banner */}
                <div className="glass rounded-2xl p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Welcome back, {portfolio?.personalInfo?.name || user?.username}! 👋
                            </h2>
                            <p className="text-gray-400">Manage your portfolio and track your progress</p>
                        </div>
                        <div className="hidden md:block">
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-xl">
                                <span className="text-gray-400 text-sm">Your URL:</span>
                                <code className="text-indigo-400 text-sm">{user?.username}.portfoliobuilder.com</code>
                                <button
                                    onClick={() => navigator.clipboard.writeText(portfolioUrl)}
                                    className="p-1 hover:bg-gray-700 rounded"
                                    title="Copy URL"
                                >
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="glass rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">{portfolio?.experience?.length || 0}</p>
                                <p className="text-gray-400 text-sm">Experiences</p>
                            </div>
                        </div>
                    </div>
                    <div className="glass rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">{portfolio?.projects?.length || 0}</p>
                                <p className="text-gray-400 text-sm">Projects</p>
                            </div>
                        </div>
                    </div>
                    <div className="glass rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">{(portfolio?.skills?.languages?.length || 0) + (portfolio?.skills?.frameworks?.length || 0)}</p>
                                <p className="text-gray-400 text-sm">Skills</p>
                            </div>
                        </div>
                    </div>
                    <div className="glass rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">{portfolio?.certifications?.length || 0}</p>
                                <p className="text-gray-400 text-sm">Certifications</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <a
                            href="http://localhost:3001/admin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </div>
                            <div>
                                <p className="font-medium text-white">Edit Portfolio</p>
                                <p className="text-sm text-gray-400">Update your content</p>
                            </div>
                        </a>
                        <button className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors group text-left">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                            </div>
                            <div>
                                <p className="font-medium text-white">Change Theme</p>
                                <p className="text-sm text-gray-400">Customize look</p>
                            </div>
                        </button>
                        <button className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors group text-left">
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            </div>
                            <div>
                                <p className="font-medium text-white">View Analytics</p>
                                <p className="text-sm text-gray-400">Track visitors</p>
                            </div>
                        </button>
                        <button className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors group text-left">
                            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                            </div>
                            <div>
                                <p className="font-medium text-white">Share Portfolio</p>
                                <p className="text-sm text-gray-400">Get your link</p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Upgrade Banner (for free users) */}
                {user?.plan === 'free' && (
                    <div className="mt-8 glass rounded-2xl p-6 border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">Upgrade to Pro</h3>
                                <p className="text-gray-400">Get custom domain, remove branding, and unlock all themes</p>
                            </div>
                            <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity">
                                Upgrade Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
