import { Link, useLocation } from 'react-router-dom'
import { NAV_ITEMS, type NavItem } from '../../constants/navItems'
import { Button } from '@/components/ui/button'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from '../../contexts/ThemeContext'

export default function Navbar() {
  const location = useLocation()
  const { isDark, toggleTheme } = useTheme()

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  location.pathname === item.path
                    ? 'border-b-2 border-blue-500 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? <FaSun className="w-5 h-5 text-yellow-500" /> : <FaMoon className="w-5 h-5 text-gray-600" />}
            </Button>
            <Link to="/admin">
              <Button variant="outline" size="sm">
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}