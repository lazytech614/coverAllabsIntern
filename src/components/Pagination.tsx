"use client";

import clsx from "clsx";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (n: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex space-x-1 justify-center mt-6 absolute bottom-16 left-1/2 transform -translate-x-1/2">
      <button
        className="px-2 py-1 border rounded disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹ Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={clsx(
            "px-3 py-1 border rounded",
            p === currentPage ? "bg-[#00A82D] text-white" : "bg-white hover:bg-gray-100"
          )}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}
      <button
        className="px-2 py-1 border rounded disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next ›
      </button>
    </div>
  );
}
