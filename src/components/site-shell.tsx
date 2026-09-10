import { Link, useLocation } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

const navigation = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Solutions", to: "/solutions" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground antialiased">
      <header className="site-header">
        <div className="site-container flex h-16 items-center justify-between gap-6">
          <Link to="/" className="brand-lockup" onClick={() => setOpen(false)}>
            <span className="brand-mark" aria-hidden="true"><span /></span>
            <span className="font-display text-lg tracking-wide">BAHARUL ISLAM</span>
            <span className="brand-tag">CROP SCIENCE</span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            {navigation.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "nav-link nav-link-active" }}
                inactiveProps={{ className: "nav-link" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/contact" className="button button-primary button-small hidden sm:inline-flex">
              Enquiry <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="icon-button md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open ? (
          <nav className="mobile-nav md:hidden" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={location.pathname === item.to ? "mobile-nav-link mobile-nav-link-active" : "mobile-nav-link"}
                onClick={() => setOpen(false)}
              >
                {item.label}
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            ))}
          </nav>
        ) : null}
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="site-container flex flex-col items-start justify-between gap-7 py-10 md:flex-row md:items-center">
          <Link to="/" className="brand-lockup" aria-label="Baharul Islam home">
            <span className="brand-mark brand-mark-small" aria-hidden="true"><span /></span>
            <span className="font-display text-lg tracking-wide">BAHARUL ISLAM</span>
          </Link>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <Link to="/products" className="footer-link">Products</Link>
            <Link to="/solutions" className="footer-link">Solutions</Link>
            <Link to="/about" className="footer-link">About</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">© 2026 Baharul Islam</span>
        </div>
      </footer>
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <span className="section-label">{children}</span>;
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="page-intro reveal-up">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h1 className="font-display page-title">{title}</h1>
      <p className="page-lede">{description}</p>
    </div>
  );
}

export function ArrowLink({ children, to = "/contact" }: { children: ReactNode; to?: "/" | "/products" | "/solutions" | "/about" | "/contact" }) {
  return <Link to={to} className="text-link">{children}<ArrowUpRight size={15} aria-hidden="true" /></Link>;
}
