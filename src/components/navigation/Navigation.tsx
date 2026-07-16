"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileText, Github, Linkedin, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navigationItems } from "@/content/navigation";
import { socials } from "@/content/socials";

import { ScrollProgress } from "./ScrollProgress";
import { ThemeToggle } from "./ThemeToggle";
import { useActiveSection } from "./useActiveSection";

const github = socials.find((social) => social.platform === "github");
const linkedin = socials.find((social) => social.platform === "linkedin");
const navigationLinkBaseClassName =
  "rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]";
const iconLinkClassName =
  "inline-flex size-10 items-center justify-center rounded-md text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-subtle)] hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]";

function navigationLinkClassName(isActive: boolean, isMobile = false) {
  const stateClassName = isActive
    ? "bg-[var(--brand-subtle)] text-[var(--brand-strong)]"
    : "text-[var(--text-muted)] hover:bg-[var(--surface-subtle)] hover:text-[var(--text)]";
  const sizeClassName = isMobile ? "block px-4 py-4 text-2xl sm:text-3xl" : "px-3 py-2 text-sm";

  return `${navigationLinkBaseClassName} ${sizeClassName} ${stateClassName}`;
}

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
            aria-label="Martin Chetty, back to top"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-sm font-semibold text-[var(--text)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
            href="#main-content"
            onClick={closeMenu}
          >
            MC
          </a>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
            {navigationItems.map((item) => {
              const sectionId = item.href.slice(1);
              const isActive = activeSection === sectionId;

              return (
                <a
                  aria-current={isActive ? "location" : undefined}
                  className={navigationLinkClassName(isActive)}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <div className="hidden items-center gap-1 lg:flex">
              {github ? (
                <a
                  aria-label="GitHub profile (opens in a new tab)"
                  className={iconLinkClassName}
                  href={github.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Github aria-hidden="true" size={18} />
                </a>
              ) : null}
              {linkedin ? (
                <a
                  aria-label="LinkedIn profile (opens in a new tab)"
                  className={iconLinkClassName}
                  href={linkedin.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Linkedin aria-hidden="true" size={18} />
                </a>
              ) : null}
              <a
                aria-label="Download resume PDF"
                className={iconLinkClassName}
                download
                href="/documents/resume.pdf"
              >
                <FileText aria-hidden="true" size={18} />
              </a>
            </div>
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
            className="fixed inset-0 z-[65] bg-[color-mix(in_srgb,var(--canvas)_94%,transparent)] backdrop-blur-xl lg:hidden"
            exit={{ opacity: 0 }}
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0 }}
            ref={mobileDialogRef}
            role="dialog"
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
          >
            <Container className="relative flex h-full items-center" size="wide">
              <Button
                aria-label="Close navigation menu"
                className="absolute right-5 top-3 size-10 min-h-0 p-0 sm:right-6 lg:right-8"
                onClick={() => {
                  setIsMenuOpen(false);
                  menuButtonRef.current?.focus();
                }}
                variant="ghost"
              >
                <X aria-hidden="true" size={20} />
              </Button>
              <div className="w-full">
                <nav aria-label="Mobile navigation">
                  <ul className="grid gap-2">
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
                            className={navigationLinkClassName(isActive, true)}
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
                <div className="mt-10 flex items-center gap-2 border-t border-[var(--border)] pt-6">
                  {github ? (
                    <a
                      aria-label="GitHub profile (opens in a new tab)"
                      className={iconLinkClassName}
                      href={github.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Github aria-hidden="true" size={18} />
                    </a>
                  ) : null}
                  {linkedin ? (
                    <a
                      aria-label="LinkedIn profile (opens in a new tab)"
                      className={iconLinkClassName}
                      href={linkedin.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Linkedin aria-hidden="true" size={18} />
                    </a>
                  ) : null}
                  <a
                    aria-label="Download resume PDF"
                    className={iconLinkClassName}
                    download
                    href="/documents/resume.pdf"
                  >
                    <FileText aria-hidden="true" size={18} />
                  </a>
                </div>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
