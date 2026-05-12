"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";

const navContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const navItem: Variants = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

const MotionLink = motion.create(Link);

export function BarraNavegacao() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const links = [
    { name: "Início", href: "/" },
    { name: "Painel", href: "/painel" },
    { name: "Sobre", href: "/sobre" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 border-b border-border/40 bg-background/60 backdrop-blur-md"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.02 }}
    >
      <motion.div
        className="container mx-auto px-4 h-16 grid grid-cols-3 items-center"
        variants={navContainer}
        initial="hidden"
        animate="show"
      >
        {/* Logo */}
        <motion.div variants={navItem} className="flex items-center gap-2">
          <Image
            src="/icon.svg"
            alt="GovData-BR"
            width={28}
            height={28}
            className="rounded-md"
          />
          <span className="text-xl font-bold">GovData-BR</span>
        </motion.div>

        {/* Links */}
        <nav className="flex items-center justify-center gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <MotionLink
                key={link.name}
                href={link.href}
                variants={navItem}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileFocus={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className={`
                  block rounded-full px-3 py-1 text-sm font-medium
                  transition-colors duration-200
                  ${
                    isActive
                      ? "bg-[#009c3b]/15 border border-[#009c3b]/30 text-[#00b341] shadow-[0_0_12px_rgba(0,156,59,0.55)]"
                      : "text-muted-foreground hover:text-[#ffdf00]"
                  }
                `}
              >
                {link.name}
              </MotionLink>
            );
          })}
        </nav>
      </motion.div>
    </motion.header>
  );
}
