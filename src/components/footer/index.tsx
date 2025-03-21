import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="border-b py-10">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl font-bold text-gray-900">Stay updated with our newsletter</h3>
            <p className="mt-2 text-gray-600">Get the latest news and updates delivered straight to your inbox.</p>
            <div className="mt-6 flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <div className="w-full max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="border-violet-200 focus-visible:ring-violet-500"
                />
              </div>
              <Button className="w-full bg-violet-600 text-white hover:bg-violet-700 sm:w-auto">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-600"></div>
              <span className="text-xl font-bold text-gray-900">Before you gogo</span>
            </div>
            <p className="text-sm text-gray-600">Beautiful, accessible UI components for your Next.js applications.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 transition-colors hover:text-violet-600" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 transition-colors hover:text-violet-600" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 transition-colors hover:text-violet-600" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 transition-colors hover:text-violet-600" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Product</h4>
            <ul className="space-y-3">
              {["Features", "Pricing", "Testimonials", "Documentation", "Changelog"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-600 transition-colors hover:text-violet-600">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Company</h4>
            <ul className="space-y-3">
              {["About", "Team", "Careers", "Press", "Partners"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-600 transition-colors hover:text-violet-600">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Support</h4>
            <ul className="space-y-3">
              {["Help Center", "Contact Us", "Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-600 transition-colors hover:text-violet-600">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Before you gogo. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="#" className="text-sm text-gray-600 transition-colors hover:text-violet-600">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-600 transition-colors hover:text-violet-600">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-600 transition-colors hover:text-violet-600">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

