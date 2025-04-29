// src/components/Nav.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, List } from "lucide-react";
import clsx from "clsx";

export default function Nav() {
  const path = usePathname();
  const tabs = [
    { href: "/add-note", Icon: Plus, label: "Add" },
    { href: "/view-notes", Icon: List, label: "Notes" },
  ];

  return (
    <nav className="flex space-x-2">
      {tabs.map(({ href, Icon, label }) => {
        const active = path === href;
        return (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex items-center px-3 py-2 rounded-lg transition",
              active
                ? "bg-blue-600 text-white shadow"
                : "bg-white text-gray-700 hover:bg-gray-100"
            )}
          >
            <Icon className="mr-1" size={18} />
            <span className="text-sm">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
