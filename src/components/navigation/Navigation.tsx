"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import { navigationItems } from "@/content/navigation";
import { profile } from "@/content/profile";

import { ScrollProgress } from "./ScrollProgress";
import { ThemeToggle } from "./ThemeToggle";
import { useActiveSection } from "./useActiveSection";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDialogRef = useRef<HTMLDivElement>(null);
  const activeSection = useActiveSection(navigationItems);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    function updateScrollState() {
      setIsScrolled(window.scrollY > 8);
    }

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const dialog = mobileDialogRef.current;
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const firstFocusable = dialog?.querySelector<HTMLElement>(focusableSelector);

    firstFocusable?.focus();

    function handleDialogKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !dialog) {
        return;
      }

      const focusableElements = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) {
        event.preventDefault();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    window.addEventListener("keydown", handleDialogKeydown);

    return () => window.removeEventListener("keydown", handleDialogKeydown);
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <ScrollProgress />
      <a
        className="sr-only fixed left-4 top-4 z-[70] rounded-md bg-[var(--brand)] px-4 py-2 font-medium text-[var(--on-brand)] focus:not-sr-only"
        href="#main-content"
      >
        Skip to main content
      </a>
      <header
        className="sticky top-0 z-50 border-b border-transparent transition-[background-color,border-color,box-shadow] duration-200"
        data-scrolled={isScrolled}
      >
        <Container className="flex min-h-16 items-center justify-between gap-3" size="wide">
          <a
            className="shrink-0 text-base font-semibold text-[var(--text)] transition-colors hover:text-[var(--brand)]"
            href="#main-content"
            onClick={closeMenu}
          >
            {profile.name}
          </a>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
            {navigationItems.map((item) => {
              const sectionId = item.href.slice(1);
              const isActive = activeSection === sectionId;

              return (
                <a
                  aria-current={isActive ? "location" : undefined}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] ${
                    isActive
                      ? "bg-[var(--brand-subtle)] text-[var(--brand-strong)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--surface-subtle)] hover:text-[var(--text)]"
                  }`}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex size-10 items-center justify-center rounded-md text-[var(--text)] transition-colors hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] lg:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              ref={menuButtonRef}
              type="button"
            >
              {isMenuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
            </button>
          </div>
        </Container>

      </header>
      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            aria-label="Mobile navigation"
            aria-modal="true"
            className="fixed inset-0 z-40 bg-[color-mix(in_srgb,var(--canvas)_94%,transparent)] px-5 pt-24 backdrop-blur-xl lg:hidden sm:px-6"
            exit={{ opacity: 0 }}
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0 }}
            ref={mobileDialogRef}
            role="dialog"
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
          >
            <nav aria-label="Mobile navigation" className="mx-auto flex h-full max-w-7xl items-center">
              <ul className="grid w-full gap-2">
                {navigationItems.map((item, index) => {
                  const sectionId = item.href.slice(1);
                  const isActive = activeSection === sectionId;

                  return (
                    <motion.li
                      animate={{ opacity: 1, x: 0 }}
                      initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                      key={item.href}
                      transition={{
                        delay: reduceMotion ? 0 : 0.04 * index,
                        duration: reduceMotion ? 0 : 0.2,
                        ease: "easeOut",
                      }}
                    >
                      <a
                        aria-current={isActive ? "location" : undefined}
                        className={`block rounded-md px-4 py-4 text-2xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] sm:text-3xl ${
                          isActive
                            ? "bg-[var(--brand-subtle)] text-[var(--brand-strong)]"
                            : "text-[var(--text)] hover:bg-[var(--surface-subtle)]"
                        }`}
                        href={item.href}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
