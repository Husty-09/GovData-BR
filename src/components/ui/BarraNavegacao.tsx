"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";


export function BarraNavegacao() {
  const[hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();

  const links = [
    { name: "Início", href: "/" },
    { name: "Painel", href: "/painel" },
    { name: "Sobre", href: "/sobre" },
  ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 border-b border-border/40 bg-background/60 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-xl font-bold">GovData-BR</div>
        <nav className="flex space-x-8">
          {links.map((link, index) => {
            const isActive = pathname === link.href;
            const isHovered = hoveredIndex === index;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-2 px-1 text-sm font-medium transition-colors hover:text-foreground ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {link.name}
                {isHovered && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="navbarIndicator"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
    );
}
