"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight, Book } from "lucide-react";

type Page = {
  title: string;
  slug: string;
};

type Section = {
  title: string;
  pages: Page[];
};

type SidebarProps = {
  sections: Section[];
};

export default function Sidebar({ sections }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-50 h-screen overflow-y-auto border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <Link href="/docs" className="flex items-center space-x-2">
          <Book className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">
            adminNexus Docs
          </span>
        </Link>
      </div>
      <nav className="p-4">
        {sections.map((section, index) => (
          <SidebarSection key={index} section={section} />
        ))}
      </nav>
    </div>
  );
}

function SidebarSection({ section }: { section: Section }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-4">
      <button
        className="flex items-center justify-between w-full text-left font-semibold text-gray-700 hover:text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        {section.title}
        {isOpen ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>
      {isOpen && (
        <ul className="mt-2 space-y-2 pl-4">
          {section.pages.map((page, index) => (
            <li key={index}>
              <Link
                href={`/docs/${page.slug}`}
                className="text-gray-600 hover:text-blue-600 hover:underline"
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
