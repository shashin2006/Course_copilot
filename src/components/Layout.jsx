import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/chat', label: 'RAG Chat' },
  { to: '/plan', label: 'Study Plan' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/progress', label: 'Progress' },
];

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="text-blue-600 font-bold text-xl">IPC</div>
              <h1 className="text-lg font-semibold text-gray-900">Interview Prep Copilot</h1>
            </div>

            <div className="hidden md:flex items-center space-x-6">
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
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden bg-white border-t">
            <div className="px-4 py-3 space-y-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;