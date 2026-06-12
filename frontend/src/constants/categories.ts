import type { Category } from '@/types/category'

export const CATEGORIES: Category[] = [
  {
    id: 'womens-fashion',
    name: "Woman's Fashion",
    hasSubmenu: true,
    subcategories: ['Dresses', 'Tops', 'Handbags', 'Shoes'],
  },
  {
    id: 'mens-fashion',
    name: "Men's Fashion",
    hasSubmenu: true,
    subcategories: ['Shirts', 'Pants', 'Watches', 'Shoes'],
  },
  { id: 'electronics', name: 'Electronics' },
  { id: 'home-lifestyle', name: 'Home & Lifestyle' },
  { id: 'medicine', name: 'Medicine' },
  { id: 'sports-outdoor', name: 'Sports & Outdoor' },
  { id: 'babys-toys', name: "Baby's & Toys" },
  { id: 'groceries-pets', name: 'Groceries & Pets' },
  { id: 'health-beauty', name: 'Health & Beauty' },
]
