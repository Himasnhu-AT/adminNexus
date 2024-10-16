import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Briefcase, Globe, Code } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 sm:text-6xl sm:tracking-tight lg:text-7xl">
            Redefining Innovation.
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-500">
            At Admin Nexus, we empower organizations to achieve extraordinary
            outcomes by streamlining processes and unleashing the true potential
            of their teams.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h3>
          <Card className="p-6 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Globe className="h-6 w-6 mr-3 text-blue-600" />
                Accelerating Development for a Brighter Future
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our mission is to empower development teams across the globe by
                offering open-source solutions that fuel innovation, inspire
                creativity, and help deliver groundbreaking results—faster.
              </CardDescription>
            </CardContent>
          </Card>
        </section>

        {/* Values Section */}
        <section className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h3>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Users className="h-6 w-6 mr-3 text-blue-600" />
                  Powered by Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Collaboration is at the heart of what we do. We believe in the
                  power of community to inspire innovation and deliver truly
                  transformative results.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Code className="h-6 w-6 mr-3 text-blue-600" />
                  Open by Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Transparency drives progress. By embracing open-source, we
                  ensure that our tools are accessible to everyone—fostering a
                  culture of shared knowledge and relentless improvement.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Briefcase className="h-6 w-6 mr-3 text-blue-600" />
                  Excellence Without Compromise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our commitment to excellence runs deep. We hold ourselves to
                  the highest standards of quality, ensuring that every line of
                  code meets the demands of modern development.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h3>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Users className="h-6 w-6 mr-3 text-blue-600" />
                  Visionary Creators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our team is a diverse group of innovators, united by a passion
                  for crafting exceptional solutions that redefine the future of
                  development.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Briefcase className="h-6 w-6 mr-3 text-blue-600" />
                  Industry Experts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  With deep industry knowledge and expertise, we bring a unique
                  perspective to solving the toughest challenges facing modern
                  development teams.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="mt-20 bg-white rounded-lg shadow-xl p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Join Us</h3>
          <p className="text-lg text-gray-600 mb-8">
            We’re always seeking talented individuals who share our passion for
            innovation. Explore our career opportunities and join a team that’s
            shaping the future of development.
          </p>
          <Button asChild size="lg" className="rounded-full px-8 py-4">
            <Link href="/careers">Explore Careers</Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
