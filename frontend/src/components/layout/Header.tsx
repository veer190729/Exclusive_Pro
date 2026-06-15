import { ChevronDown, Heart, LogOut, Menu, Package, Shield, ShoppingCart, UserRound, Users, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { SearchBar } from '@/components/common/SearchBar'
import { Container } from '@/components/layout/Container'
import { NAV_LINKS } from '@/constants/navigation'
import { env } from '@/config/env'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'

export function Header() {
  const { totalItems } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const accountPath = isAuthenticated ? '/account' : '/login'
  const initials = user?.name ? user.name.trim()[0].toUpperCase() : ''
  const isAdminShell = isAdmin
  const adminMenuItems = [
    { label: 'Overview', path: '/admin?section=overview', icon: Shield },
    { label: 'Products', path: '/admin?section=products', icon: Package },
    { label: 'Orders', path: '/admin?section=orders', icon: ShoppingCart },
    { label: 'Customers', path: '/admin?section=customers', icon: Users },
  ]

  const navigateTo = (path: string) => {
    setMenuOpen(false)
    navigate(path)
  }

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (!menuRef.current) return
      if (menuOpen && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <header className="border-b border-line-light bg-white">
      <Container className="flex items-center justify-between gap-6 py-header-y">
        <Link
          to={isAdminShell ? '/admin' : '/'}
          className="shrink-0 text-figma-xl font-bold tracking-[0.03em] text-secondary"
        >
          {env.appName}
        </Link>

        {!isAdminShell && (
          <nav className="hidden items-center gap-12 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  isActive ? 'figma-nav-link-active' : 'figma-nav-link'
                }
              >
                {link.label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? 'figma-nav-link-active' : 'figma-nav-link'
                }
              >
                Admin
              </NavLink>
            )}
          </nav>
        )}

        <div className="flex items-center gap-6">
          {!isAdminShell && (
            <>
              <div className="hidden xl:block">
                <SearchBar />
              </div>

              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className="relative text-secondary transition-opacity hover:opacity-70"
              >
                <Heart size={24} strokeWidth={1.5} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                aria-label="Cart"
                className="relative text-secondary transition-opacity hover:opacity-70"
              >
                <ShoppingCart size={24} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                    {totalItems}
                  </span>
                )}
              </Link>
            </>
          )}

          {isAuthenticated ? (
            <div className="relative hidden lg:block">
              <button
                type="button"
                aria-label={isAdminShell ? 'Admin menu' : 'Profile'}
                title={user ? `Hi, ${user.name}` : 'Account'}
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex h-9 min-w-9 items-center gap-2 rounded-full bg-bg-secondary px-2 text-secondary"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold">
                  {initials}
                </span>
                <ChevronDown size={16} strokeWidth={1.7} className="text-secondary" />
              </button>

              {menuOpen && (
                <div
                  ref={menuRef}
                  className="absolute right-0 z-50 mt-2 w-64 rounded-figma border border-line-light bg-white shadow-figma"
                >
                  {isAdminShell ? (
                    <>
                      <div className="border-b border-line-light px-4 py-3">
                        <p className="text-figma-xs uppercase tracking-[0.16em] text-text-light">Admin menu</p>
                      </div>
                      <ul className="p-2">
                        {adminMenuItems.map((item) => {
                          const Icon = item.icon
                          return (
                            <li key={item.label}>
                              <button
                                type="button"
                                onClick={() => navigateTo(item.path)}
                                className="flex w-full items-center gap-3 px-3 py-2 text-left text-figma-sm text-secondary hover:bg-bg-light"
                              >
                                <Icon size={16} strokeWidth={1.8} />
                                {item.label}
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                      <div className="border-t border-line-light p-2">
                        <button
                          type="button"
                          onClick={() => {
                            logout()
                            setMenuOpen(false)
                            navigate('/')
                          }}
                          className="flex w-full items-center gap-3 px-3 py-2 text-left text-figma-sm text-secondary hover:bg-bg-light"
                        >
                          <LogOut size={16} strokeWidth={1.8} />
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <ul className="p-2">
                      <li>
                        <button
                          type="button"
                          onClick={() => navigateTo('/account?tab=profile')}
                          className="flex w-full items-center gap-3 px-3 py-2 text-left text-figma-sm text-secondary hover:bg-bg-light"
                        >
                          <UserRound size={16} strokeWidth={1.8} />
                          Manage My Account
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => navigateTo('/account?tab=orders')}
                          className="w-full text-left px-3 py-2 text-figma-sm text-secondary hover:bg-bg-light"
                        >
                          My Order
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => navigateTo('/account?tab=cancellations')}
                          className="w-full text-left px-3 py-2 text-figma-sm text-secondary hover:bg-bg-light"
                        >
                          My Cancellations
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => navigateTo('/account?tab=reviews')}
                          className="w-full text-left px-3 py-2 text-figma-sm text-secondary hover:bg-bg-light"
                        >
                          My Reviews
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            logout()
                            setMenuOpen(false)
                            navigate('/')
                          }}
                          className="w-full text-left px-3 py-2 text-figma-sm text-text-light hover:bg-bg-light"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Link
              to={accountPath}
              aria-label="Account"
              title={user ? `Hi, ${user.name}` : 'Login'}
              className="hidden text-secondary transition-opacity hover:opacity-70 lg:block"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-secondary"
              >
                <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          )}

          {!isAdminShell && (
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-secondary lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </Container>

      {!isAdminShell && mobileOpen && (
        <div className="border-t border-line-light bg-white lg:hidden">
          <Container className="py-4">
            <div className="mb-4">
              <SearchBar onSearch={() => setMobileOpen(false)} />
            </div>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `text-figma-base ${isActive ? 'font-medium text-primary' : 'text-secondary'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to={accountPath}
                onClick={() => setMobileOpen(false)}
                className="text-figma-base text-secondary"
              >
                {isAuthenticated ? `My Account (${user?.name})` : 'Log In'}
              </NavLink>
              {isAdmin && (
                <NavLink
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="text-figma-base text-secondary"
                >
                  Admin Dashboard
                </NavLink>
              )}
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}
