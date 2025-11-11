import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { 
  FaUsers,
  FaDatabase,
  FaChevronRight,
  FaStar,
  FaBolt,
  FaBars,
  FaTimes
} from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'

const menuItems = [
  {
    path: '/admin',
    label: 'Dashboard',
    icon: MdDashboard,
    gradient: 'from-indigo-500 to-purple-600',
    bgGradient: 'from-indigo-50 to-purple-50',
    hoverGradient: 'from-indigo-100 to-purple-100'
  },
  {
    path: '/admin/api-users',
    label: 'API Products',
    icon: FaDatabase,
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50',
    hoverGradient: 'from-emerald-100 to-teal-100'
  },
  {
    path: '/admin/local-users',
    label: 'Local Users',
    icon: FaUsers,
    gradient: 'from-violet-500 to-fuchsia-600',
    bgGradient: 'from-violet-50 to-fuchsia-50',
    hoverGradient: 'from-violet-100 to-fuchsia-100'
  }
]

export default function Sidebar() {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-gray-800 shadow-2xl border-r border-gray-200 dark:border-gray-700 relative overflow-hidden transition-all duration-300`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl"></div>
      </div>
      
      {/* Header */}
      <div className="relative p-8 border-b border-gradient-to-r from-gray-200/50 to-transparent">
        <div className="flex items-center justify-between mb-2">
          {!isCollapsed && (
            <div>
              <h2 className="text-2xl font-black text-black dark:text-white">
                Admin Panel
              </h2>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {isCollapsed ? <FaBars className="w-4 h-4 text-gray-600 dark:text-gray-300" /> : <FaTimes className="w-4 h-4 text-gray-600 dark:text-gray-300" />}
          </button>
        </div>
        {!isCollapsed && (
          <div className="flex items-center space-x-2 mt-3">
            
           
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <nav className={`relative mt-8 ${isCollapsed ? 'px-2' : 'px-4'} space-y-3`}>
        {menuItems.map((item, index) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group relative flex items-center ${isCollapsed ? 'justify-center px-3 py-3' : 'px-6 py-4'} rounded-2xl font-semibold transition-all duration-300 ${
                isActive
                  ? `bg-gradient-to-r ${item.bgGradient} border-2 border-white shadow-xl backdrop-blur-sm`
                  : `hover:bg-gradient-to-r hover:${item.hoverGradient} hover:shadow-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white`
              }`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
              title={isCollapsed ? item.label : ''}
            >
              {/* Animated Background for Active Item */}
              {isActive && (
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-5 rounded-2xl animate-pulse`}></div>
              )}
              
              {/* Icon with Animation */}
              <div className={`relative p-2 rounded-xl ${isCollapsed ? '' : 'mr-4'} transition-all duration-300 ${
                isActive 
                  ? 'bg-red-500 shadow-lg' 
                  : 'bg-gray-100 hover:bg-white hover:shadow-md'
              }`}>
                <Icon className={`w-5 h-5 transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white'
                }`} />
              </div>
              
              {/* Label - Only show when not collapsed */}
              {!isCollapsed && (
                <span className={`relative text-sm font-bold transition-all duration-300 ${
                  isActive 
                    ? 'text-gray-800 dark:text-white' 
                    : 'text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
                }`}>
                  {item.label}
                </span>
              )}
              
              {/* Active Indicator - Only show when not collapsed */}
              {isActive && !isCollapsed && (
                <div className="ml-auto flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"></div>
                  <FaChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
              )}
              
              {/* Active dot for collapsed state */}
              {isActive && isCollapsed && (
                <div className="absolute -right-1 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"></div>
                </div>
              )}
              
              {/* Hover Effect - Only show when not collapsed */}
              {!isActive && !isCollapsed && (
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <FaBolt className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                </div>
              )}
              
              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? `bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10` 
                  : 'bg-gradient-to-r from-gray-400 to-gray-600 opacity-0 group-hover:opacity-5'
              }`}></div>
            </Link>
          )
        })}
      </nav>
      
      {/* Bottom Decoration */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className={`flex ${isCollapsed ? 'flex-col space-y-2' : 'space-x-2'}`}>
          <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"></div>
          <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
          <div className="w-2 h-2 bg-gradient-to-r from-violet-400 to-fuchsia-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}