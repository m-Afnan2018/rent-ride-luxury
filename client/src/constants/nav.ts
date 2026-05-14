export interface NavLink {
  label: string;
  href?: string;
  dropdown?: { label: string; href: string }[];
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Categories',
    dropdown: [
      { label: 'Sports', href: '/cars?category=Sports' },
      { label: 'SUV', href: '/cars?category=Suv' },
      { label: 'Sedan', href: '/cars?category=Sedan' },
      { label: 'Coupe', href: '/cars?category=Coupe' },
    ],
  },
  { label: 'Cars', href: '/cars' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact Us', href: '/contact' },
];
