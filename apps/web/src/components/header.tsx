import { Database } from "lucide-react";
import Link from "next/link";

export default function CustomHeader() {
  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <Database className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-4xl font-extrabold text-gray-900">Admin Nexus</h1>
        </div>
        <nav>
          <ul className="flex space-x-6 text-lg font-semibold">
            <li>
              <Link
                href="/features"
                className="text-gray-600 hover:text-gray-900"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="text-gray-600 hover:text-gray-900"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/docs" className="text-gray-600 hover:text-gray-900">
                Docs
              </Link>
            </li>
            <li>
              <Link
                href="/auth/login"
                className="text-gray-600 hover:text-gray-900"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
