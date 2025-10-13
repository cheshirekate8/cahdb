import { Home, Layers, PackageOpen, Info } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
  requiresAuth?: boolean;
}

export const navigationLinks: NavLink[] = [
  {
    label: 'Home',
    href: '/',
    icon: Home,
    requiresAuth: false,
  },
  {
    label: 'Builder',
    href: '/builder',
    icon: Layers,
    requiresAuth: true,
  },
  {
    label: 'My Decks',
    href: '/decks',
    icon: PackageOpen,
    requiresAuth: true,
  },
  {
    label: 'About',
    href: '/about',
    icon: Info,
    requiresAuth: false,
  },
];
