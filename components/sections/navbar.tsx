"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { AuthModal } from "@/components/sections/auth-modal";
import { MobileMenu } from "@/components/sections/mobile-menu";
import { Dropdown } from "@/components/ui/dropdown";
import { Logo } from "@/components/ui/logo";
import { isActivePath, mainLinks, otherLinks } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const linkClass =
  "inline-flex min-h-11 items-center text-nav font-bold uppercase tracking-nav transition-colors duration-(--duration-fast) hover:text-accent";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeLogin = useCallback(() => setLoginOpen(false), []);

  function openLogin() {
    setMenuOpen(false);
    setLoginOpen(true);
  }

  const othersActive = otherLinks.some((link) =>
    isActivePath(pathname, link.href),
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-glass-border bg-canvas-edge pt-[env(safe-area-inset-top)] xl:absolute xl:border-transparent xl:bg-transparent xl:pt-0">
        <div className="container-page flex h-[4.5rem] items-center xl:h-header">
          <Link
            href="/"
            aria-label="PERSIB Bandung, ke beranda"
            className="shrink-0"
          >
            <Logo priority className="h-9 w-auto xl:h-[46px]" />
          </Link>

          <nav
            aria-label="Navigasi utama"
            className="ml-nav-offset hidden xl:block"
          >
            <ul className="flex items-center gap-nav">
              {mainLinks.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(linkClass, active && "text-accent")}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Dropdown
                  label="Lainnya"
                  triggerClassName={othersActive ? "text-accent" : undefined}
                  items={otherLinks.map((link) => ({
                    label: link.label,
                    href: link.href,
                    active: isActivePath(pathname, link.href),
                  }))}
                />
              </li>
            </ul>
          </nav>

          <div className="ml-auto hidden items-center xl:flex">
            <button type="button" onClick={openLogin} className={linkClass}>
              Login
            </button>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((current) => !current)}
            className="-mr-2 ml-auto inline-flex size-11 items-center justify-center xl:hidden"
          >
            {menuOpen ? (
              <X aria-hidden className="size-6" />
            ) : (
              <Menu aria-hidden className="size-6" />
            )}
          </button>

          <MobileMenu
            open={menuOpen}
            pathname={pathname}
            onClose={closeMenu}
            onLogin={openLogin}
          />
        </div>
      </header>

      <AuthModal open={loginOpen} onClose={closeLogin} />
    </>
  );
}
