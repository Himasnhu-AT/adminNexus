import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <section className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl tracking-tight">
            Contact Us
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-600">
            We’d love to hear from you! Whether you have a question about
            features, pricing, or anything else, our team is ready to answer all
            your questions.
          </p>
        </section>

        {/* Get in Touch Section */}
        <section className="mt-20">
          <h3 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Get in Touch
          </h3>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Email Card */}
            <Card className="transition-transform transform hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-6 w-6 mr-2 text-blue-500" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <Link
                    href={"mailto:hyattherate2005@gmail.com"}
                    className={cn(
                      "",
                      buttonVariants({
                        variant: "link",
                        className: "text-lg font-medium hover:underline",
                      }),
                    )}
                  >
                    hyattherate2005@gmail.com
                  </Link>
                </CardDescription>
              </CardContent>
            </Card>

            {/* Book a Call Card */}
            <Card className="transition-transform transform hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-6 w-6 mr-2 text-green-500" />
                  Book a Call
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <Link
                    href="https://cal.com/himanshu-at/30"
                    className={cn(
                      "",
                      buttonVariants({
                        variant: "link",
                        className: "text-lg font-medium hover:underline",
                      }),
                    )}
                  >
                    Cal.com
                  </Link>
                </CardDescription>
              </CardContent>
            </Card>

            {/* GitHub Card */}
            <Card className="transition-transform transform hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-6 w-6 mr-2 text-purple-500" />
                  GitHub
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <Link
                    href="https://github.com/himasnhu-at/adminNexus"
                    className={cn(
                      "",
                      buttonVariants({
                        variant: "link",
                        className: "text-lg font-medium hover:underline",
                      }),
                    )}
                  >
                    GitHub
                  </Link>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Send Us a Message Section */}
        <section className="mt-20">
          <h3 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Send Us a Message
          </h3>
          <form className="bg-white rounded-lg shadow-lg p-10 space-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Message Input */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Send Message
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
}
