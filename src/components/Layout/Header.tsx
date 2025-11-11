import { FaBell, FaSearch, FaUser, FaMoon, FaSun } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTheme } from '../../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Dashboard </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaUser className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </Button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border dark:border-gray-700 z-50">
                <div className="py-1">
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      navigate('/profile')
                      setIsDropdownOpen(false)
                    }}
                  >
                    Profile
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      navigate('/login')
                      setIsDropdownOpen(false)
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? <FaSun className="w-5 h-5 text-yellow-500" /> : <FaMoon className="w-5 h-5 text-gray-600" />}
          </Button>
        </div>
      </div>
    </header>
  )
}