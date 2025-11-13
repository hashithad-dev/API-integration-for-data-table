import { FaBell, FaSearch, FaUser, FaMoon, FaSun, FaUserCircle, FaSignOutAlt, FaEnvelope, FaEdit, FaLock, FaCamera } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useTheme } from '../../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'

export default function Header() {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const { user, logout } = useAuthStore()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      navigate('/login')
    } catch (error) {
      toast.error('Logout failed')
    }
    setIsDropdownOpen(false)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        
        <div className="relative">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FaUser className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700">{user?.name}</span>
          </Button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
              <div className="py-1">
                <button 
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    setIsProfileOpen(true)
                    setIsDropdownOpen(false)
                  }}
                >
                  <FaUserCircle className="w-4 h-4 mr-2" />
                  Profile
                </button>
                <button 
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-lg w-full max-h-[90vh] overflow-y-auto bg-white border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <FaUser className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              User Profile
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <FaUser className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer transition-colors">
                    <FaCamera className="w-3 h-3" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      className="sr-only"
                    />
                  </label>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <FaUser className="w-4 h-4 text-gray-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-1">Full Name</p>
                    {isEditing ? (
                      <Input 
                        value={editName} 
                        onChange={(e) => setEditName(e.target.value)}
                        className="font-semibold"
                      />
                    ) : (
                      <p className="font-semibold text-gray-900">{user?.name}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="w-4 h-4 text-gray-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-1">Email Address</p>
                    {isEditing ? (
                      <Input 
                        value={editEmail} 
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="font-semibold"
                        type="email"
                      />
                    ) : (
                      <p className="font-semibold text-gray-900">{user?.email}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              {isEditing ? (
                <>
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      toast.success('Profile updated successfully!')
                      setIsEditing(false)
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setIsEditing(false)
                      setEditName(user?.name || '')
                      setEditEmail(user?.email || '')
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                      setIsEditing(true)
                      setEditName(user?.name || '')
                      setEditEmail(user?.email || '')
                    }}
                  >
                    <FaEdit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      toast.info('Change Password feature coming soon!')
                    }}
                  >
                    <FaLock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}