import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/users"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                location.pathname === '/users'
                  ? 'border-b-2 border-blue-500 text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Users
            </Link>
            <Link
              to="/payments"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                location.pathname === '/payments'
                  ? 'border-b-2 border-blue-500 text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              API Users 
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}