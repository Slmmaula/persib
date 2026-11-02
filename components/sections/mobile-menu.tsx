"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { duration, ease } from "@/lib/motion";
import { isActivePath, mainLinks, otherLinks } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  pathname: string;
  onClose: () => void;
  onLogin: () => void;
}

const linkClass =
  "flex min-h-12 items-center font-heading text-xl font-semibold transition-colors duration-(--duration-fast) hover:text-accent";

export function MobileMenu({
  open,
  pathname,
  onClose,
  onLogin,
}: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const media = window.matchMedia("(min-width: 80rem)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) onClose();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    media.addEventListener("change", handleChange);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      media.removeEventListener("change", handleChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: duration.fast, ease }}
          className="fixed inset-x-0 bottom-0 top-header overflow-y-auto bg-canvas-edge px-page pb-10 pt-2 xl:hidden"
        >
          <nav aria-label="Navigasi seluler">
            <ul className="divide-y divide-glass-border">
              {mainLinks.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onClick={onClose}
                      className={cn(linkClass, active && "text-accent")}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pb-2 pt-5">
                <p className="text-label font-bold uppercase tracking-label text-muted">
                  Lainnya
                </p>
                <ul className="mt-1">
                  {otherLinks.map((link) => {
                    const active = isActivePath(pathname, link.href);
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          onClick={onClose}
                          className={cn(linkClass, active && "text-accent")}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            onClick={onLogin}
            className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-pill border border-glass-border text-label font-bold uppercase tracking-label transition-colors duration-(--duration-fast) hover:bg-glass-hover"
          >
            Login
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
