"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export interface DropdownItem {
  label: string;
  value: string;
  onClick?: () => void;
}

export interface MotionDropdownProps {
  label: string;
  items?: DropdownItem[];
  children?: React.ReactNode;
  className?: string;
}

export const MotionDropdown = React.forwardRef<
  HTMLDivElement,
  MotionDropdownProps
>(({ label, items, children, className }, forwardedRef) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [menuStyle, setMenuStyle] = React.useState<React.CSSProperties>({});
  const [mounted, setMounted] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  React.useImperativeHandle(forwardedRef, () => containerRef.current!);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const updateMenuPosition = React.useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMenuStyle({
      position: "fixed",
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
    });
  }, []);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const handleScroll = () => {
      if (isOpen) updateMenuPosition();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen, updateMenuPosition]);

  const handleToggle = () => {
    if (!isOpen) updateMenuPosition();
    setIsOpen((prev) => !prev);
  };

  const menu = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : -10,
            scale: shouldReduceMotion ? 1 : 0.95,
          }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : -10,
            scale: shouldReduceMotion ? 1 : 0.95,
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0.15, ease: "easeOut" }
              : { type: "spring", stiffness: 400, damping: 30 }
          }
          style={menuStyle}
          className="min-w-48 origin-top-left rounded-xl border border-white/8 bg-[#0a0a0a]/90 backdrop-blur-xl shadow-lg ring-1"
        >
          <div className="py-1 p-1 max-h-64 overflow-y-auto">
            {children
              ? children
              : items?.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      item.onClick?.();
                      setIsOpen(false);
                    }}
                    className="w-full text-left flex items-center px-3 py-2 text-sm text-neutral-400 hover:bg-white/4 hover:text-neutral-200 rounded-md transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left w-full sm:w-auto ${className ?? ""}`}
    >
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="inline-flex items-center justify-between w-full sm:w-48 px-4 py-2.5 rounded-xl border border-white/8 bg-white/2 backdrop-blur-md shadow-sm text-sm font-medium hover:bg-white/6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2"
      >
        {label}
        <svg
          className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {mounted && createPortal(menu, document.body)}
    </div>
  );
});
MotionDropdown.displayName = "MotionDropdown";
