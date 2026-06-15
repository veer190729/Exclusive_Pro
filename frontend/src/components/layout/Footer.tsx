import { Link } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { env } from '@/config/env'

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <Container className="pb-6 pt-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-6 text-figma-xl font-bold">{env.appName}</h3>
            <p className="text-figma-lg font-medium">Subscribe</p>
            <p className="mt-2 text-figma-sm text-white/70">Get 10% off your first order</p>
            <div className="mt-6 max-w-[360px]">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 w-full rounded-figma border border-white/25 bg-transparent px-4 pr-14 text-figma-base outline-none placeholder:text-white/60"
                />
                <button
                  type="button"
                  className="absolute right-1 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-figma bg-white/10 text-white text-lg transition-colors hover:bg-white/20"
                  aria-label="Subscribe"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-figma-lg font-medium">Support</h4>
            <p className="text-figma-base leading-6 text-white/70">
              111 Bijoy sarani, Dhaka,
              <br />
              DH 1515, Bangladesh.
            </p>
            <p className="mt-4 text-figma-base text-white/70">exclusive@gmail.com</p>
            <p className="text-figma-base text-white/70">+88015-88888-9999</p>
          </div>

          <div>
            <h4 className="mb-6 text-figma-lg font-medium">Account</h4>
            <ul className="space-y-4 text-figma-base text-white/70">
              <li>
                <Link to="/account" className="transition-colors hover:text-white">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/login" className="transition-colors hover:text-white">
                  Login / Register
                </Link>
              </li>
              <li>
                <Link to="/cart" className="transition-colors hover:text-white">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="transition-colors hover:text-white">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/products" className="transition-colors hover:text-white">
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-figma-lg font-medium">Quick Link</h4>
            <ul className="space-y-4 text-figma-base text-white/70">
              <li>
                <Link to="/about" className="transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-white">
                  Terms Of Use
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Download App column removed per request */}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-figma-base opacity-60">© Copyright {env.appName} 2022. All right reserved</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
