import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import Portfolio from './pages/Portfolio'

// Landing Page Component
function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)' }}>
      {/* Background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <h1 className="text-2xl font-bold gradient-text">Portfolio Builder</h1>
          <div className="flex items-center gap-4">
            <a href="/login" className="text-gray-400 hover:text-white transition-colors">Login</a>
            <a href="/login" className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg font-medium hover:opacity-90">
              Get Started Free
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-sm mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Now in Beta - Free to use!
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Build Your Portfolio</span>
            <br />
            <span className="text-white">In Minutes</span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Create a stunning developer portfolio without any coding. Just fill in your details and get a beautiful, responsive website instantly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/login" className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25">
              Create Your Portfolio →
            </a>
            <a href="/u/demo" className="px-8 py-4 glass rounded-xl font-medium hover:bg-white/10 transition-colors">
              View Demo
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-20 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Why Portfolio Builder?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-400">Create your portfolio in under 5 minutes. No coding required.</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Beautiful Themes</h3>
              <p className="text-gray-400">Choose from stunning, professionally designed templates.</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-pink-500/20 flex items-center justify-center">
                <svg className="w-7 h-7 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Your Own Domain</h3>
              <p className="text-gray-400">Get yourname.portfoliobuilder.com or use your custom domain.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Stand Out?</h2>
          <p className="text-gray-400 mb-8">Join thousands of developers who showcase their work with Portfolio Builder</p>
          <a href="/login" className="inline-flex px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Start Building for Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500">
          <p>© 2024 Portfolio Builder. Made with ❤️ by Subrat Sharma</p>
        </div>
      </footer>
    </div>
  )
}

// Public Portfolio Wrapper
function PublicPortfolio() {
  const { username } = useParams()
  return <Portfolio username={username || ''} />
}

function App() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)' }}>
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/u/:username" element={<PublicPortfolio />} />

      {/* Auth routes */}
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <AuthPage onSuccess={() => window.location.href = '/dashboard'} />}
      />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
