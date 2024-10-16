import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, BarChart2, Database, MessageSquare } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="bg-yellow-600 text-white text-center py-2 font-semibold">
        <p>
          We&apos;re evolving. Services are temporarily offline while we build
          something extraordinary.
        </p>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 sm:tracking-tight lg:text-6xl leading-tight">
            Unleash the Future of Admin Management
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 leading-relaxed">
            Seamlessly integrate logging, feedback, and analytics into one
            unified platform. Admin Nexus empowers you to innovate faster.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Button
              size="lg"
              asChild
              className="rounded-full px-8 py-4 shadow-lg hover:bg-blue-700"
            >
              <Link href="/auth/signup">Start Now</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-full px-8 py-4 border-blue-600 shadow-lg hover:bg-gray-200"
            >
              <Link href="/demo">Watch the Demo</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Why Admin Nexus?
          </h3>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="shadow-lg transform hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold">
                  <AlertCircle className="h-6 w-6 mr-3 text-blue-600" />
                  Effortless Logging
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Capture and track every event with precision. Access logs
                  instantly through our intuitive dashboard.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-lg transform hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold">
                  <MessageSquare className="h-6 w-6 mr-3 text-blue-600" />
                  Unified Feedback & Issue Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Gather user feedback effortlessly and transform it into
                  actionable insights. Bugs? We’ll handle them.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-lg transform hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold">
                  <BarChart2 className="h-6 w-6 mr-3 text-blue-600" />
                  Real-Time Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor usage and performance in real time. Stay ahead with
                  our advanced tracking features.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            How Admin Nexus Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Step 1: Integrate</h4>
              <p className="text-gray-600">
                Use our API or SDK to start sending logs and user feedback
                immediately.
              </p>
            </div>

            <div>
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">
                Step 2: Store & Process
              </h4>
              <p className="text-gray-600">
                We store and process all your data securely, ensuring it&apos;s
                always available when you need it.
              </p>
            </div>

            <div>
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">
                Step 3: Analyze & Act
              </h4>
              <p className="text-gray-600">
                Track performance and resolve issues with powerful insights
                directly from your dashboard.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-20 bg-white rounded-lg shadow-xl p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            The Future of Admin Management is Here
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            Join the thousands of teams optimizing their workflows with Admin
            Nexus.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 py-4 shadow-lg"
          >
            <Link href="/signup">Start Free Trial</Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
