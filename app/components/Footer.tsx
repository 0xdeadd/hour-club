"use client";

import { Clock, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();

  // Don't show footer on login page
  if (pathname === "/login") return null;

  return (
    <footer className="bg-navy-dark text-white/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-white font-semibold text-lg mb-3">
              <Clock className="w-5 h-5 text-amber" aria-hidden="true" />
              <span>The Hour Club</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              A welcoming recovery clubhouse in Carrollton, Georgia.
            </p>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-white font-semibold mb-3">Location</h3>
            <address className="not-italic text-sm leading-relaxed flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-amber" aria-hidden="true" />
              <span>
                218 Mandeville Ave<br />
                Carrollton, GA 30117
              </span>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/meetings" className="hover:text-amber transition-colors">
                  Meetings
                </Link>
              </li>
              <li>
                <Link href="/announcements" className="hover:text-amber transition-colors">
                  Announcements
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-amber transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 text-center text-xs text-white/40 space-y-2">
          <p>
            The Hour Club is not affiliated with AA World Services, NA World Services, Al-Anon Family Groups, or Crystal Meth Anonymous.
          </p>
          <p>&copy; {new Date().getFullYear()} The Hour Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
