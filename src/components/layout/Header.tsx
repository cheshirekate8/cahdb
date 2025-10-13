'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { UserMenu } from './UserMenu';
import { Layers } from 'lucide-react';
import { ScrollProgress } from './ScrollProgress';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Transform scroll to blur and shadow
  const backdropBlur = useTransform(scrollY, [0, 50], [0, 10]);
  const boxShadow = useTransform(
    scrollY,
    [0, 50],
    ['0 0 0 0 rgba(0,0,0,0)', '0 1px 3px 0 rgba(0,0,0,0.1)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <motion.header
        style={{
          backdropFilter: isScrolled ? `blur(${backdropBlur}px)` : 'none',
          boxShadow,
        }}
        className={`sticky top-0 z-50 w-full border-b transition-colors duration-200 ${
          isScrolled ? 'bg-background/80' : 'bg-background'
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
          >
            <Layers className="h-6 w-6 text-primary" />
            <span>Deck Builder</span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <UserMenu />
            <MobileNav />
          </div>
        </div>
      </motion.header>
    </>
  );
}
