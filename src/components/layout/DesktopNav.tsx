'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { navigationLinks } from '@/lib/navigation';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export function DesktopNav() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  // Filter links based on auth status
  const visibleLinks = navigationLinks.filter(
    (link) => !link.requiresAuth || isAuthenticated
  );

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {visibleLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'relative px-4 py-2 rounded-lg transition-colors font-medium',
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {link.label}

            {/* Active Indicator */}
            {isActive && (
              <motion.div
                layoutId="activeNav"
                className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
