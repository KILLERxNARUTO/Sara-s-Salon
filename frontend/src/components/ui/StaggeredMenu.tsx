'use client';

import React, { useCallback, useLayoutEffect, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Phone, MapPin, Clock, X } from 'lucide-react';
import './StaggeredMenu.css';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#B8955A', '#2A241E', '#141210'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = '/logo.png',
  menuButtonColor = '#D4B87A',
  openMenuButtonColor = '#FFFFFF',
  accentColor = '#D4B87A',
  changeMenuColorOnOpen = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  // Setup initial offscreen positions
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const backdrop = backdropRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll<HTMLElement>('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], {
        xPercent: offscreen,
        opacity: 1,
        visibility: 'hidden',
      });
      if (backdrop) {
        gsap.set(backdrop, { opacity: 0, visibility: 'hidden', pointerEvents: 'none' });
      }
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1, visibility: 'hidden' });
      }
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  // Smooth, buttery 60fps open animation (interruptible)
  const playOpen = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    const preContainer = preLayersRef.current;
    const backdrop = backdropRef.current;
    if (!panel) return;

    // Show containers immediately
    gsap.set([panel, ...layers], { visibility: 'visible' });
    if (preContainer) gsap.set(preContainer, { visibility: 'visible' });

    // Fade backdrop in
    if (backdrop) {
      gsap.to(backdrop, {
        opacity: 1,
        visibility: 'visible',
        pointerEvents: 'auto',
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    // Staggered underlay slide-in
    layers.forEach((layer, i) => {
      gsap.to(layer, {
        xPercent: 0,
        duration: 0.42,
        ease: 'power3.out',
        delay: i * 0.05,
        overwrite: 'auto',
      });
    });

    const panelDelay = Math.min(layers.length * 0.05, 0.12);

    // Panel slide-in flush to right
    gsap.to(panel, {
      xPercent: 0,
      duration: 0.48,
      ease: 'power3.out',
      delay: panelDelay,
      overwrite: 'auto',
    });

    // Menu items reveal with cascade
    const itemEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-list[data-numbering] .sm-panel-item'));

    if (itemEls.length) {
      gsap.to(itemEls, {
        yPercent: 0,
        rotate: 0,
        opacity: 1,
        duration: 0.45,
        ease: 'power3.out',
        stagger: 0.03,
        delay: panelDelay + 0.08,
        overwrite: 'auto',
      });
    }

    if (numberEls.length) {
      gsap.to(numberEls, {
        '--sm-num-opacity': 1,
        duration: 0.35,
        ease: 'power2.out',
        stagger: 0.03,
        delay: panelDelay + 0.1,
        overwrite: 'auto',
      });
    }
  }, []);

  // Smooth, buttery close animation (interruptible)
  const playClose = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    const preContainer = preLayersRef.current;
    const backdrop = backdropRef.current;
    if (!panel) return;

    const offscreen = position === 'left' ? -100 : 100;

    // Fade backdrop out
    if (backdrop) {
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.28,
        ease: 'power2.inOut',
        overwrite: 'auto',
        onComplete: () => {
          if (backdropRef.current) {
            gsap.set(backdropRef.current, { visibility: 'hidden', pointerEvents: 'none' });
          }
        },
      });
    }

    // Slightly recess menu items
    const itemEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-itemLabel'));
    if (itemEls.length) {
      gsap.to(itemEls, {
        yPercent: 30,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        overwrite: 'auto',
      });
    }

    const all = [...layers, panel];

    gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.inOut',
      overwrite: 'auto',
      onComplete: () => {
        gsap.set([panel, ...layers], { visibility: 'hidden' });
        if (preContainer) gsap.set(preContainer, { visibility: 'hidden' });
      },
    });
  }, [position]);

  // Fast icon animation without React re-render
  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    if (!icon) return;
    gsap.to(icon, {
      rotate: opening ? 225 : 0,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  }, []);

  // Fast color animation
  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      if (changeMenuColorOnOpen) {
        gsap.to(btn, {
          color: opening ? openMenuButtonColor : menuButtonColor,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  // Fast text roll animation between "Menu" and "Close" with 0 React re-renders
  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    gsap.to(inner, {
      yPercent: opening ? -50 : 0,
      duration: 0.32,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  }, []);

  const openMenu = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    if (!openRef.current) {
      openRef.current = true;
      setOpen(true);
      onMenuOpen?.();
      playOpen();
      animateIcon(true);
      animateColor(true);
      animateText(true);
    }
  }, [playOpen, animateIcon, animateColor, animateText, onMenuOpen]);

  const closeMenu = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
    }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  const toggleMenu = useCallback(() => {
    if (openRef.current) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [closeMenu, openMenu]);

  // Hover triggers for the toggle button
  const handleButtonMouseEnter = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    openMenu();
  };

  const handleButtonMouseLeave = (e: React.MouseEvent) => {
    // If moving directly into the sliding panel, don't initiate close
    if (panelRef.current && panelRef.current.contains(e.relatedTarget as Node)) {
      return;
    }
    // Grace period to allow moving cursor from toggle button across the screen to sliding panel
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      closeMenu();
    }, 500);
  };

  // Hover triggers for the main panel
  const handlePanelMouseEnter = () => {
    // Cursor entered panel: cancel any pending close
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };

  const handlePanelMouseLeave = (e: React.MouseEvent) => {
    // If moving back to toggle button, let button handle it
    if (toggleBtnRef.current && toggleBtnRef.current.contains(e.relatedTarget as Node)) {
      return;
    }
    // Cursor taken away from panel: close the staggered menu!
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      closeMenu();
    }, 250);
  };

  // Close on outside click
  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (link.startsWith('http') || link.startsWith('tel:') || link.startsWith('mailto:')) {
      return;
    }
    e.preventDefault();
    closeMenu();
    navigate(link);
  };

  return (
    <>
      {/* Inline Menu Toggle Button inside Navbar */}
      <div
        className={(className ? className + ' ' : '') + 'staggered-menu-wrapper'}
        onMouseEnter={handleButtonMouseEnter}
        onMouseLeave={handleButtonMouseLeave}
      >
        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              <span className="sm-toggle-line">Menu</span>
              <span className="sm-toggle-line">Close</span>
            </span>
          </span>
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </div>

      {/* Portaled Drawer & Underlay Layers Flush at the True Right Edge */}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            className="staggered-menu-portal-root"
            style={accentColor ? { ['--sm-accent' as any]: accentColor } : undefined}
            data-position={position}
            data-open={open || undefined}
          >
            {/* Backdrop overlay (Closes menu when clicked) */}
            <div
              ref={backdropRef}
              className="sm-backdrop"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* GSAP Staggered Underlay Layers */}
            <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
              {(() => {
                const raw = colors && colors.length ? colors.slice(0, 4) : ['#B8955A', '#2A241E', '#141210'];
                let arr = [...raw];
                if (arr.length >= 3) {
                  const mid = Math.floor(arr.length / 2);
                  arr.splice(mid, 1);
                }
                return arr.map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />);
              })()}
            </div>

            {/* Staggered Content Panel (Closes when cursor is taken away) */}
            <aside
              id="staggered-menu-panel"
              ref={panelRef}
              className="staggered-menu-panel"
              aria-hidden={!open}
              onMouseEnter={handlePanelMouseEnter}
              onMouseLeave={handlePanelMouseLeave}
            >
              <div className="sm-panel-inner">
                {/* Header Info Tag with Logo and Close */}
                <div className="sm-panel-header-badge">
                  <div className="flex items-center gap-3">
                    <img
                      src={logoUrl || '/logo.png'}
                      alt="Sara's Atelier Logo"
                      className="w-10 h-10 object-contain drop-shadow-[0_2px_10px_rgba(212,184,122,0.5)]"
                    />
                    <div className="flex flex-col">
                      <span className="text-white text-sm tracking-[0.22em] uppercase font-bold">
                        SARA'S ATELIER
                      </span>
                      <span className="text-[10px] text-[#D4B87A] tracking-[0.26em] uppercase font-light mt-0.5">
                        LADIES &amp; KIDS ONLY
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeMenu}
                    className="sm-panel-close-btn"
                    aria-label="Close menu drawer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Staggered Numbered Nav Items (Grand Luxury Size) */}
                <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
                  {items && items.length ? (
                    items.map((it, idx) => (
                      <li className="sm-panel-itemWrap" key={it.label + idx}>
                        <a
                          className="sm-panel-item"
                          href={it.link}
                          aria-label={it.ariaLabel || it.label}
                          data-index={idx + 1}
                          onClick={(e) => handleLinkClick(e, it.link)}
                        >
                          <span className="sm-panel-itemLabel">{it.label}</span>
                        </a>
                      </li>
                    ))
                  ) : (
                    <li className="sm-panel-itemWrap" aria-hidden="true">
                      <span className="sm-panel-item">
                        <span className="sm-panel-itemLabel">No items</span>
                      </span>
                    </li>
                  )}
                </ul>

                {/* Studio Quick Details */}
                <div className="sm-studio-info">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#D4B87A] flex-shrink-0" />
                    <span>Mon – Sun: 10:00 AM – 8:30 PM</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#D4B87A] flex-shrink-0" />
                    <span>Near NPR Mandapam, Mahalakshmi Nagar, Guduvanchery</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#D4B87A] flex-shrink-0" />
                    <a href="tel:+919790690628" className="hover:text-[#D4B87A] transition-colors">
                      +91 97906 90628 / +91 99400 99380
                    </a>
                  </div>
                </div>

                {/* Social and Quick Actions */}
                {displaySocials && socialItems && socialItems.length > 0 && (
                  <div className="sm-socials" aria-label="Social links">
                    <h3 className="sm-socials-title">Connect With Us</h3>
                    <ul className="sm-socials-list" role="list">
                      {socialItems.map((s, i) => (
                        <li key={s.label + i} className="sm-socials-item">
                          <a
                            href={s.link}
                            target={s.link.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className="sm-socials-link"
                          >
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>,
          document.body
        )}
    </>
  );
};

export default StaggeredMenu;
