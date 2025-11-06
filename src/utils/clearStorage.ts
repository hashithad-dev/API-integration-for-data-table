// Run this once to clear old data
export const clearUserStorage = () => {
  localStorage.removeItem('user-storage')
  localStorage.removeItem('api-users')
  localStorage.removeItem('userData')
  sessionStorage.removeItem('user-storage')
  console.log('All user storage cleared!')
}

// Clear all manually added users
export const clearManualUsers = () => {
  const storageKey = import.meta.env.VITE_STORAGE_KEY || 'user-storage'
  localStorage.removeItem(storageKey)
  sessionStorage.removeItem(storageKey)
  console.log('Manual users cleared!')
  window.location.reload()
}

// Uncomment to run once:
// clearManualUsers()