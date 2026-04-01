"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Clock } from "lucide-react";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-warm-gray">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-navy font-semibold text-lg">
            <Clock className="w-6 h-6 text-amber" aria-hidden="true" />
            <span>The Hour Club</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-navy-light">
            <Link href="/#about" className="hover:text-amber transition-colors">
              About
            </Link>
            <Link href="/#getting-here" className="hover:text-amber transition-colors">
              Getting Here
            </Link>
            <Link href="/#get-involved" className="hover:text-amber transition-colors">
              Get Involved
            </Link>
            <Link
              href="/meetings"
              className="inline-flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg hover:bg-navy-light transition-colors"
            >
              Meeting Schedule
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-warm-gray">
          <div className="px-4 py-4 flex flex-col gap-4 text-sm font-medium text-navy-light">
            <Link
              href="/#about"
              className="hover:text-amber transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <Link
              href="/#getting-here"
              className="hover:text-amber transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Getting Here
            </Link>
            <Link
              href="/#get-involved"
              className="hover:text-amber transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Get Involved
            </Link>
            <Link
              href="/meetings"
              className="inline-flex items-center justify-center gap-2 bg-navy text-white px-4 py-2 rounded-lg hover:bg-navy-light transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Meeting Schedule
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
