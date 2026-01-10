import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { logout, isAuthenticated } from '../utils/auth'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/chat', label: 'RAG Chat' },
  { to: '/plan', label: 'Study Plan' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/progress', label: 'Progress' },
]

export default function Layout({ children }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold">CP</div>
              <div>
                <div className="text-lg font-semibold">Course Copilot</div>
                <div className="text-xs text-gray-500">Personalized interview prep</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              {isAuthenticated() ? (
                <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200">Logout</button>
              ) : (
                <NavLink to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900">Login</NavLink>
              )}
            </nav>

            <div className="md:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-md bg-gray-100"
                aria-label="menu"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3 space-y-2">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="pt-2">
                {isAuthenticated() ? (
                  <button onClick={() => { setOpen(false); handleLogout(); }} className="w-full text-left px-3 py-2 rounded-md bg-gray-100">Logout</button>
                ) : (
                  <NavLink onClick={() => setOpen(false)} to="/login" className="block px-3 py-2 rounded-md">Login</NavLink>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}