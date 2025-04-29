// src/components/Nav.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Nav() {
  const path = usePathname();
  const links = [
    { href: "/add-note", label: "Add Note" },
    { href: "/view-notes", label: "View Notes" },
  ];
  return (
    <nav className="flex space-x-4">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={clsx("px-3 py-1 rounded", {
            "bg-blue-500 text-white": path === href,
            "hover:bg-gray-200": path !== href,
          })}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
