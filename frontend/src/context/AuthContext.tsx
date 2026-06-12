import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export interface User {
  name: string
  email: string
  address?: string
  role?: 'admin' | 'customer'
}

interface StoredUser extends User {
  password: string
}

const ADMIN_USER: StoredUser = {
  name: 'Admin',
  email: 'admin@admin.com',
  password: 'admin123',
  role: 'admin',
}

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string; isAdmin?: boolean }>
  signup: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>
  updateAccount: (payload: {
    name: string
    email: string
    address: string
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }) => Promise<{ success: boolean; message?: string }>
  logout: () => void
}

const AUTH_KEY = 'exclusive_auth_user'
const USERS_KEY = 'exclusive_registered_users'

const AuthContext = createContext<AuthContextValue | null>(null)

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    const users = raw ? (JSON.parse(raw) as StoredUser[]) : []
    const normalizedUsers = users.map((user) =>
      user.email === ADMIN_USER.email ? { ...user, role: 'admin' as const } : user,
    )
    if (!normalizedUsers.some((user) => user.email === ADMIN_USER.email)) {
      const nextUsers = [ADMIN_USER, ...normalizedUsers]
      localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers))
      return nextUsers
    }
    if (normalizedUsers.some((user) => user.email === ADMIN_USER.email && user.role !== 'admin')) {
      localStorage.setItem(USERS_KEY, JSON.stringify(normalizedUsers))
    }
    return normalizedUsers
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify([ADMIN_USER]))
    return [ADMIN_USER]
  }
}

function saveUser(user: StoredUser) {
  const users = getStoredUsers()
  const exists = users.some((u) => u.email === user.email)
  if (!exists) {
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]))
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY)
      if (raw) setUser(JSON.parse(raw) as User)
    } catch {
      localStorage.removeItem(AUTH_KEY)
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const trimmedEmail = email.trim().toLowerCase()
    const users = getStoredUsers()
    const found = users.find((u) => u.email === trimmedEmail && u.password === password)

    if (!found) {
      return { success: false, message: 'Invalid email or password' }
    }

    const sessionUser = {
      name: found.name,
      email: found.email,
      address: found.address,
      role: found.role ?? (found.email === ADMIN_USER.email ? 'admin' : 'customer'),
    }
    localStorage.setItem(AUTH_KEY, JSON.stringify(sessionUser))
    setUser(sessionUser)
    return { success: true, isAdmin: sessionUser.role === 'admin' }
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const trimmedName = name.trim()
    const trimmedEmail = email.trim().toLowerCase()

    if (!trimmedName || !trimmedEmail || !password) {
      return { success: false, message: 'Please fill in all fields' }
    }

    const users = getStoredUsers()
    if (users.some((u) => u.email === trimmedEmail)) {
      return { success: false, message: 'An account with this email already exists' }
    }

    const newUser: StoredUser = { name: trimmedName, email: trimmedEmail, password }
    saveUser(newUser)

    const sessionUser = { name: newUser.name, email: newUser.email, role: 'customer' as const }
    localStorage.setItem(AUTH_KEY, JSON.stringify(sessionUser))
    setUser(sessionUser)
    return { success: true }
  }, [])

  const updateAccount = useCallback(
    async ({
      name,
      email,
      address,
      currentPassword,
      newPassword,
      confirmPassword,
    }: {
      name: string
      email: string
      address: string
      currentPassword: string
      newPassword: string
      confirmPassword: string
    }) => {
      if (!user) {
        return { success: false, message: 'Please log in to update your account' }
      }

      const trimmedName = name.trim()
      const trimmedEmail = email.trim().toLowerCase()
      const trimmedAddress = address.trim()
      const users = getStoredUsers()
      const currentIndex = users.findIndex((storedUser) => storedUser.email === user.email)

      if (currentIndex === -1) {
        return { success: false, message: 'Unable to update account right now' }
      }

      if (!trimmedName || !trimmedEmail) {
        return { success: false, message: 'Please fill in the required fields' }
      }

      const currentUser = users[currentIndex]
      const passwordChangeRequested = Boolean(currentPassword || newPassword || confirmPassword)

      if (passwordChangeRequested) {
        if (!currentPassword || !newPassword || !confirmPassword) {
          return { success: false, message: 'Please complete all password fields' }
        }

        if (currentUser.password !== currentPassword) {
          return { success: false, message: 'Current password is incorrect' }
        }

        if (newPassword !== confirmPassword) {
          return { success: false, message: 'New passwords do not match' }
        }
      }

      if (users.some((storedUser, index) => index !== currentIndex && storedUser.email === trimmedEmail)) {
        return { success: false, message: 'An account with this email already exists' }
      }

      const updatedUser: StoredUser = {
        ...currentUser,
        name: trimmedName,
        email: trimmedEmail,
        address: trimmedAddress,
        password: passwordChangeRequested ? newPassword : currentUser.password,
      }

      const nextUsers = [...users]
      nextUsers[currentIndex] = updatedUser
      localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers))

      const sessionUser = {
        name: updatedUser.name,
        email: updatedUser.email,
        address: updatedUser.address,
        role: currentUser.role ?? (currentUser.email === ADMIN_USER.email ? 'admin' : 'customer'),
      }
      localStorage.setItem(AUTH_KEY, JSON.stringify(sessionUser))
      setUser(sessionUser)
      return { success: true }
    },
    [user],
  )

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      login,
      signup,
      updateAccount,
      logout,
    }),
    [user, login, signup, updateAccount, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
