"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X, User, ChevronDown } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Replace with actual auth state

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-600"></div>
          <span className="text-xl font-bold text-gray-900">Before you gogo</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "relative text-sm font-medium transition-colors hover:text-violet-600",
                pathname === link.href
                  ? "text-violet-600"
                  : "text-gray-700"
              )}
            >
              {link.name}
              {pathname === link.href && (
                <motion.div
                  className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-violet-600"
                  layoutId="navbar-indicator"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* User Menu / Login Button */}
        <div className="hidden md:block">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>My Account</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-gray-700 hover:text-violet-600"
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-violet-600 text-white hover:bg-violet-700">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-violet-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">
              {mobileMenuOpen ? "Close menu" : "Open menu"}
            </span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  pathname === link.href
                    ? "bg-violet-50 text-violet-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-violet-600"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!isLoggedIn ? (
              <div className="mt-4 flex flex-col space-y-2">
                <Link
                  href="/login"
                  className="rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-violet-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-md bg-violet-600 px-3 py-2 text-center text-base font-medium text-white hover:bg-violet-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4">
                <Link
                  href="/profile"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-violet-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-violet-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-violet-600"
                  onClick={() => {
                    setIsLoggedIn(false)
                    setMobileMenuOpen(false)
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </header>
  )
}
