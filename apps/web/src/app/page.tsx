import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  BarChart2,
  // Bug,
  Database,
  // Github,
  MessageSquare,
} from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <Database className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Nexus</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/features"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Streamline Your Admin Experience
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Centralized logging, feedback management, and database analytics in
            one powerful platform.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild className="mr-4">
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </section>

        <section className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Key Features
          </h3>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
                  Intuitive Logging
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Send logs via SDKs or APIs. Access centralized logs on demand
                  through our dashboard for efficient tracking and management.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                  Feedback & Bug Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Easily manage user feedback and bug reports. Our bot
                  automatically creates GitHub issues for bugs and feature
                  requests.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
                  Database Stats & Dashboards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor database metrics with drag-and-drop dashboards. Track
                  user growth, activity levels, and more for actionable
                  insights.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">
                1. Send Logs & Feedback
              </h4>
              <p className="text-gray-600">
                Use our SDKs or APIs to send logs and user feedback to Admin
                Nexus.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">2. Store & Process</h4>
              <p className="text-gray-600">
                We securely store your data and automatically process feedback
                into GitHub issues.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">3. Analyze & Act</h4>
              <p className="text-gray-600">
                Access your logs, track issues, and gain insights through our
                intuitive dashboards.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20 bg-white rounded-lg shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to streamline your admin experience?
          </h3>
          <p className="text-gray-600 mb-6">
            Join thousands of developers who trust Admin Nexus for their
            logging, feedback management, and analytics needs.
          </p>
          <Button asChild size="lg">
            <Link href="/signup">Start Your Free Trial</Link>
          </Button>
        </section>
      </main>

      <footer className="bg-gray-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="hover:text-gray-300">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-gray-300">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-gray-300">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:text-gray-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-gray-300">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gray-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="hover:text-gray-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-gray-300">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-gray-300">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="hover:text-gray-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-gray-300">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2023 Admin Nexus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
