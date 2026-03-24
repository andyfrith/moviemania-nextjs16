"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Profile", href: "/profile" },
    { name: "TMDB", href: "/movies/tmdb/search" },
    { name: "OMDB", href: "/movies/omdb/search" },
  ];

  return (
    <nav>
      <ul className="flex items-center gap-10 mb-10">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              className={`text-white text-2xl font-bold hover:text-yellow-400 transition-colors duration-300 ease-in-out hover:cursor-pointer ${pathname === item.href || pathname.toLowerCase().includes(item.name.toLowerCase()) ? "text-yellow-400" : ""}`}
              href={item.href}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
