import { Github, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-2">Deck Builder</h3>
            <p className="text-sm text-muted-foreground">
              Create, save, and share custom card decks with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/builder"
                className="text-muted-foreground hover:text-foreground"
              >
                Deck Builder
              </Link>
              <Link
                href="/decks"
                className="text-muted-foreground hover:text-foreground"
              >
                My Decks
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-2">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/cheshirekate8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/cheshirekate8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:katie.f.young@me.com"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Deck Builder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
