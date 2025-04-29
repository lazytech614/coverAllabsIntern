"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import noteBook from "../../public/note-book.png";
import Image from "next/image";
import {tabs} from "../lib/contants";

export default function Nav() {
  const path = usePathname();

  return (
    <header className="border-b border-gray-400">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-x-2">
          <Image src={noteBook} alt="NoteBook" />
          <h1 className="text-2xl font-bold">NoteBook</h1>
        </Link>
        <nav className="flex space-x-2 ">
          {tabs.map(({ href, Icon, label }) => {
            const active = path === href;
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "flex items-center px-3 py-2 rounded-lg transition border border-gray-400",
                  active
                    ? "bg-[#00A82D] text-white shadow"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon className="mr-1" size={18} />
                <span className="text-sm">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
