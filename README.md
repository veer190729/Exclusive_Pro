# Exclusive E-Commerce App

Full-stack e-commerce application matching the [Full E-Commerce Website UI/UX Design (Figma Community)](https://www.figma.com/design/JVSZsm47IBLpSux9BbdN9A/Full-E-Commerce-Website-UI-UX-Design--Community-?node-id=1-3&p=f).

## Pages (matching Figma design)

| Page | Route | Status |
|------|-------|--------|
| Home | `/` | Full — all sections |
| Login | `/login` | Split layout with illustration |
| Sign Up | `/signup` | Split layout + social login |
| Contact | `/contact` | Call/Write + form |
| About | `/about` | Story, stats, team |
| Products | `/products` | All products grid |
| Product Details | `/products/:id` | Gallery, colors, sizes, related |
| Cart | `/cart` | Table + cart totals |
| Checkout | `/checkout` | Billing + order summary |
| Wishlist | `/wishlist` | Table with actions |
| My Account | `/account` | Sidebar + profile form |
| 404 | `*` | Illustration + back home |

## Home Page Sections

1. Announcement bar + Header
2. Hero (category sidebar + carousel)
3. Flash Sales (countdown + slider)
4. Browse By Category
5. Best Selling Products
6. Explore Our Products (category tabs)
7. New Arrival (countdown + slider)
8. Services (delivery, support, guarantee)
9. Promo Banners
10. Footer

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

### Backend
```bash
cd backend
npm install
npm run dev
```
API at http://localhost:5000/api

## Database Details

Set these values in `backend/.env` or your local environment:

| Variable | Value |
| --- | --- |
| `DB_HOST` | `localhost` |
| `DB_USER` | `root` |
| `DB_PASSWORD` | your local MySQL password |
| `DB_NAME` | `shoppingexclusive` |
| `DB_DIALECT` | `mysql` |

The backend still keeps its current data layer, but the database settings are now prepared for MySQL-based setup.

## Tech Stack

**Frontend:** React 19, TypeScript, Vite 6, Tailwind CSS 3, React Router 6, Lucide Icons

**Backend:** Node.js, Express, TypeScript, MySQL (mysql2)

## Database Setup

| Setting | Value |
| --- | --- |
| Host | `localhost` |
| Username | `root` |
| Password | `Veer$1907@` |
| Database | `shoppingexclusive` |
| Dialect | `mysql` |

The backend creates the database tables automatically on startup and seeds the existing mock products and categories so the app works immediately.

### Tables Created

| Table | Purpose |
| --- | --- |
| `categories` | Stores navigation and product category data |
| `products` | Stores all catalog products, including pasted image data |
| `users` | Stores the default admin account and future auth-ready users |
| `customers` | Stores customer identity and status details |
| `customer_addresses` | Stores shipping and billing addresses |
| `orders` | Stores order summaries, totals, and payment status |
| `order_items` | Stores each product inside an order |
| `shipments` | Stores shipping carrier, tracking, and delivery status |
| `carts` | Stores active carts per customer |
| `cart_items` | Stores products inside a cart |
| `wishlists` | Stores customer wishlists |
| `wishlist_items` | Stores products saved to a wishlist |
| `contact_messages` | Stores submitted contact form details for admin review |
