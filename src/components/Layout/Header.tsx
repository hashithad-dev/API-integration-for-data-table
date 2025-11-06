import { FaBell, FaSearch, FaUser, FaMoon, FaSun } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTheme } from '../../contexts/ThemeContext'

export default function Header() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Dashboard </h1>
        </div>
        
        <div className="flex items-center space-x-4">
         
          
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? <FaSun className="w-5 h-5 text-yellow-500" /> : <FaMoon className="w-5 h-5 text-gray-600" />}
          </Button>
          
         
        </div>
      </div>
    </header>
  )
}