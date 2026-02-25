const STORAGE_KEY = 'users'

export const loadUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch (e) {
    console.error('Failed to parse users from localStorage', e)
    return []
  }
}

export const saveUsers = (users) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  } catch (e) {
    console.error('Failed to save users to localStorage', e)
  }
}

export const registerUser = (user) => {
  const users = loadUsers()
  const exists = users.some((u) => u.email === (user.email || '').toLowerCase())
  if (exists) {
    return { success: false, error: 'Email already registered' }
  }
  const toSave = { ...user, email: (user.email || '').toLowerCase(), createdAt: Date.now() }
  users.push(toSave)
  saveUsers(users)
  return { success: true, user: toSave }
}

export const findUser = (email, password) => {
  const users = loadUsers()
  return users.find((u) => u.email === (email || '').toLowerCase() && u.password === password) || null
}

export const setAuth = (user, remember = false) => {
  try {
    const storage = remember ? localStorage : sessionStorage
    storage.setItem('authUser', JSON.stringify({ email: user.email, createdAt: Date.now() }))
  } catch (e) {
    console.error('Failed to set auth user', e)
  }
}

export const clearAuth = () => {
  try {
    localStorage.removeItem('authUser')
    sessionStorage.removeItem('authUser')
    localStorage.removeItem('authToken')
    localStorage.removeItem('currentUser')
  } catch (e) {
    console.error('Failed to clear auth', e)
  }
}

export const getAuth = () => {
  try {
    const sessionAuth = sessionStorage.getItem('authUser')
    if (sessionAuth) return JSON.parse(sessionAuth)

    const localAuth = localStorage.getItem('authUser')
    if (localAuth) return JSON.parse(localAuth)

    // Fallback: if legacy/currentUser or authToken exist in localStorage, return minimal auth object
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) return { email: currentUser }

    return null
  } catch (e) {
    return null
  }
}

export default {
  loadUsers,
  saveUsers,
  registerUser,
  findUser,
  setAuth,
  clearAuth,
  getAuth,
}
