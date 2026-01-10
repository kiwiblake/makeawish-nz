import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Builder } from "@builder.io/react";

// Type for individual navigation links
interface NavLinkItem {
  text: string;
  link: string;
  children?: NavLinkItem[]; // For dropdown sub-items
}

// Type for the CTA button
interface CtaButton {
  text: string;
  link: string;
  // Optional styling props if needed, using Tailwind classes
  desktopBgColor?: string;
  desktopTextColor?: string;
  desktopHoverBgColor?: string;
  mobileBgColor?: string;
  mobileTextColor?: string;
  mobileHoverBgColor?: string;
}

interface Props {
  logoUrl?: string;
  logoAlt?: string;
  navLinks?: NavLinkItem[];
  ctaButton?: CtaButton;
}

export const Header: React.FC<Props> = ({
  logoUrl = "https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/logo.webp",
  logoAlt = "Make-A-Wish NZ",
  navLinks = [
    { text: "Our Wishes", link: "/wish-stories" },
    {
      text: "Fundraising",
      link: "#", // Placeholder link for dropdown parent
      children: [
        { text: "Fundraise In Your Community", link: "/fundraise" },
        { text: "Partner With Us", link: "/partner" },
        { text: "Legacies", link: "/legacies" },
        { text: "Regular Givers", link: "/regular-giving" },
      ],
    },
    {
      text: "Ways to donate",
      link: "#", // Placeholder link for dropdown parent
      children: [
        { text: "One-time donation", link: "/donate-1" },
        { text: "Monthly giving", link: "/donate-2" },
        { text: "Gift in memory", link: "/donate-3" },
      ],
    },
    { text: "Volunteer", link: "/volunteer" },
    // Added About Us & Contact Us based on mobile menu
    { text: "About Us", link: "/about-us" },
    { text: "Contact Us", link: "/contact-us" },
  ],
  ctaButton = {
    text: "Donate",
    link: "/donate",
    desktopBgColor: "bg-destructive", // Red
    desktopTextColor: "text-destructive-foreground", // White
    desktopHoverBgColor: "hover:bg-destructive/90", // Darker Red on hover
    mobileBgColor: "bg-destructive", // Red
    mobileTextColor: "text-destructive-foreground", // White
    mobileHoverBgColor: "hover:bg-destructive/90", // Darker Red on hover
  },
}) => {
  // State for dropdowns (using unique keys based on link text)
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState<Record<string, boolean>>({});

  // Refs for hover delay timeouts
  const timeoutRefs = useRef<Record<string, NodeJS.Timeout | null>>({});

  const handleMouseEnter = (key: string) => {
    if (timeoutRefs.current[key]) {
      clearTimeout(timeoutRefs.current[key]!);
    }
    setOpenDropdowns((prev) => ({ ...prev, [key]: true }));
  };

  const handleMouseLeave = (key: string) => {
    timeoutRefs.current[key] = setTimeout(() => {
      setOpenDropdowns((prev) => ({ ...prev, [key]: false }));
    }, 150); // 150ms delay
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close desktop dropdowns when opening mobile menu
    if (!mobileMenuOpen) {
      setOpenDropdowns({});
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    // Reset mobile submenu states when closing main mobile menu
    setOpenMobileSubmenus({});
  };

  const toggleMobileSubmenu = (key: string) => {
    setOpenMobileSubmenus(prev => ({...prev, [key]: !prev[key]}));
  };

  // Helper to render a link or dropdown button
  const renderNavItem = (item: NavLinkItem, isMobile = false) => {
    const key = item.text; // Use text as key for state

    if (item.children && item.children.length > 0) {
      // Render Dropdown
      if (isMobile) {
        return (
          <div key={key}>
            <button
              className="flex w-full items-center justify-between py-2 text-base font-medium text-foreground hover:text-primary"
              onClick={() => toggleMobileSubmenu(key)}
            >
              <span>{item.text}</span>
              <ChevronDown size={16} className={`ml-1 transition-transform ${openMobileSubmenus[key] ? 'rotate-180' : ''}`} />
            </button>
            {openMobileSubmenus[key] && (
              <div className="pl-4 mt-1 space-y-2 pb-2">
                {item.children.map((child) => (
                  <Link
                    key={child.link}
                    to={child.link}
                    className="block text-sm text-muted-foreground hover:text-primary"
                    onClick={closeMobileMenu} // Close main menu on sub-item click
                  >
                    {child.text}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      } else {
        // Desktop Dropdown
        return (
          <div
            key={key}
            className="relative"
            onMouseLeave={() => handleMouseLeave(key)}
          >
            <button
              className="flex items-center text-foreground hover:text-primary transition"
              onMouseEnter={() => handleMouseEnter(key)}
            >
              <span>{item.text}</span>
              <ChevronDown size={16} className="ml-1" />
            </button>
            {openDropdowns[key] && (
              <div
                className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-md py-2 z-20"
                onMouseEnter={() => handleMouseEnter(key)} // Keep open when hovering dropdown
              >
                {item.children.map((child) => (
                  <Link
                    key={child.link}
                    to={child.link}
                    className="block px-4 py-2 hover:bg-primary/10"
                    onClick={() => { setOpenDropdowns({}); closeMobileMenu(); }} // Close dropdown on click
                  >
                    {child.text}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      }
    } else {
      // Render Simple Link
      return (
        <Link
          key={item.link}
          to={item.link}
          className={isMobile 
            ? "block py-2 text-base font-medium text-foreground hover:text-primary"
            : "text-foreground hover:text-primary transition"}
          onClick={closeMobileMenu} // Close mobile menu on any link click
        >
          {item.text}
        </Link>
      );
    }
  };

  return (
    <nav className="relative w-full flex items-center justify-between px-4 sm:px-6 py-4 bg-card shadow-md">
      {/* Logo */}
      <div className="flex-shrink-0 flex items-center">
        <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
          <img
            src={logoUrl}
            alt={logoAlt}
            className="h-7 sm:h-10 w-auto" // Keep original sizing
          />
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
        {navLinks?.map(item => renderNavItem(item, false))}

        {/* Desktop Donate Button */}
        {ctaButton && (
          <a 
            href={ctaButton.link} 
            // Apply dynamic Tailwind classes using template literals
            className={`${ctaButton.desktopBgColor || 'bg-accent'} ${ctaButton.desktopHoverBgColor || 'hover:bg-accent/90'} ${ctaButton.desktopTextColor || 'text-accent-foreground'} font-medium py-2 px-4 lg:px-6 rounded-full transition text-sm lg:text-base whitespace-nowrap`}
            // Prevent navigation in Builder editor
            onClick={(e) => { if (Builder.isEditing || Builder.isPreviewing) e.preventDefault(); }}
           >
            {ctaButton.text}
          </a>
        )}
      </div>

      {/* Hamburger Menu Button & Mobile Donate */}
      <div className="md:hidden flex items-center">
         {ctaButton && (
             <a 
                href={ctaButton.link} 
                className={`${ctaButton.mobileBgColor || 'bg-accent'} ${ctaButton.mobileHoverBgColor || 'hover:bg-accent/90'} ${ctaButton.mobileTextColor || 'text-accent-foreground'} font-medium py-2 px-4 rounded-full transition text-sm mr-3`}
                onClick={(e) => { if (Builder.isEditing || Builder.isPreviewing) e.preventDefault(); closeMobileMenu(); }}
                >
                 {ctaButton.text}
             </a>
         )}
        <button
          onClick={toggleMobileMenu}
          className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          aria-controls="mobile-menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          {mobileMenuOpen ? (
            <X className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu */} 
      <div
        id="mobile-menu"
        className={`absolute top-full left-0 w-full bg-card shadow-lg md:hidden z-30 overflow-y-auto transition-all duration-300 ease-in-out ${ 
          mobileMenuOpen ? 'max-h-[calc(100vh-4rem)] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
        }`}
        style={{ maxHeight: mobileMenuOpen ? 'calc(100vh - 4rem)' : '0' }} 
      >
          <div className="px-5 pb-4">
            {navLinks?.map(item => renderNavItem(item, true))}
          </div>
      </div>
    </nav>
  );
};
