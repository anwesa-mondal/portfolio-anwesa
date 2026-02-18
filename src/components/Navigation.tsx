"use client";

import Link from "next/link";
import PillNav from "./PillNav";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarLogo,
  NavBody,
  NavItems,
} from "./ui/resizable-navbar";
import { useState, useCallback, memo, useEffect } from "react";

const Navigation = memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const navItems = [
    { name: "Home", link: "#hero" },
    { name: "Education", link: "#education" },
    { name: "Experience", link: "#experience" },
    { name: "CP", link: "#competitive-programming" },
    { name: "Projects", link: "#projects" },
    { name: "Gallery", link: "#gallery" },
    { name: "Contact", link: "#contact" },
  ];

  // Active section detection
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = navItems.map((item) => item.link.substring(1));
          const scrollPosition = window.scrollY + 100; // Offset for navbar height

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection(i);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleItemClick = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems
            items={navItems}
            onItemClick={handleItemClick}
            activeSection={activeSection}
          />
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu}>
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={closeMobileMenu}
                className={`relative block px-4 py-2 text-neutral-600 dark:text-neutral-300 transition-colors ${
                  activeSection === idx
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : ""
                }`}
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
});

Navigation.displayName = "Navigation";

export default Navigation;
