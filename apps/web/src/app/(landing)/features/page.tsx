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
  MessageSquare,
  Shield,
  Code,
} from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <section className="text-center">
          <h2 className="text-4xl text-black font-extrabold text-transparent bg-clip-text sm:text-5xl sm:tracking-tight lg:text-6xl">
            Features
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-xl text-gray-600">
            Discover the powerful features that make Admin Nexus the ultimate
            platform for managing your applications.
          </p>
        </section>

        {/* Features Grid */}
        <section className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Key Features
          </h3>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature Cards */}
            <Card className="transition-transform transform hover:scale-105 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center ">
                  <AlertCircle className="h-6 w-6 mr-3" />
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

            <Card className="transition-transform transform hover:scale-105 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center ">
                  <MessageSquare className="h-6 w-6 mr-3" />
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

            <Card className="transition-transform transform hover:scale-105 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center ">
                  <BarChart2 className="h-6 w-6 mr-3" />
                  Anonymous Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor website usage through unlimited custom events and
                  tracking with any third-party integration, preventing misuse
                  of information collected.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="transition-transform transform hover:scale-105 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center ">
                  <Shield className="h-6 w-6 mr-3" />
                  Security & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Ensure your data is secure with our robust security measures
                  and compliance with industry standards.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="transition-transform transform hover:scale-105 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center ">
                  <Code className="h-6 w-6 mr-3" />
                  Developer Friendly
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our platform is designed with developers in mind, offering
                  comprehensive APIs, SDKs, and documentation to streamline
                  integration.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-20  rounded-lg shadow-xl p-10 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to experience the power of Admin Nexus?
          </h3>
          <p className="text-lg mb-6">
            Join thousands of developers who trust Admin Nexus for their
            logging, feedback management, and analytics needs.
          </p>
          <Button
            asChild
            variant={"default"}
            size="lg"
            className="  hover:text-white hover:bg-purple-700 transition"
          >
            <Link href="/signup">Start Your Free Trial</Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
