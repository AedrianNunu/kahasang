"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

// Animation variants for scroll reveal
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Equipment", href: "#equipment" },
    { name: "Contact", href: "#contact-us" },
    { name: "FAQs", href: "#faqs" },
  ];

  return (
    <motion.header
      className="sticky top-0 z-50 border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-white/60"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        {/* Logo with Title */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo-white.png"
            alt="CHMSU Fisheries Logo"
            width={60}
            height={15}
            className="object-contain"
          />
          <span className="text-xl font-pacifico text-black">CHMSU Fisheries</span>
        </Link>

        {/* Centered Navigation and Sign In Button */}
         <div className="flex-1 flex items-center justify-center absolute left-0 right-0">
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-bold text-black hover:text-[#16a34a] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <Button
            variant="outline"
            className="hidden md:block border-[#16a34a] text-[#16a34a] hover:bg-[#16a34a] hover:text-white cursor-pointer"
            onClick={() => {}}
          >
            Sign In
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu className="h-6 w-6 text-black" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[240px] flex flex-col justify-between bg-white"
          >
            <nav className="flex flex-col gap-4 text-center pt-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-bold text-black hover:text-[#16a34a] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-6 border-t pt-4 border-black">
              <Button
                variant="outline"
                className="border-[#16a34a] text-[#16a34a] hover:bg-[#16a34a] hover:text-white w-full max-w-[200px] mx-auto"
                onClick={() => {
                  setIsMenuOpen(false);
                  // Add Sign Up modal logic here if needed
                }}
              >
                Sign Up
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}