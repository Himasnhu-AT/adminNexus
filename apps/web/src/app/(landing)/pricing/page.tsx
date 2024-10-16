import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <section className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-900">
            Pricing Plans
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Flexible pricing to meet the needs of every team. Choose a plan that
            fits your project today!
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Free Plan */}
          <Card className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 transition-transform duration-300 transform hover:scale-105">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                Free
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Perfect for individuals and small projects.
              </p>
              <ul className="text-gray-700 space-y-3 mb-6">
                <li>- Up to 2 Projects</li>
                <li>- 2000 Logs per month</li>
                <li>- 500 Feedback submissions</li>
                <li>- Basic Analytics Dashboard</li>
              </ul>
              <Button className="w-full" variant="default">
                Start for Free
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="bg-white rounded-lg shadow-lg p-8 border-2 border-blue-600 transition-transform duration-300 transform hover:scale-105">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-600 mb-4">
                Pro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Ideal for growing teams looking for advanced features.
              </p>
              <ul className="text-gray-700 space-y-3 mb-6">
                <li>- Up to 10 Projects</li>
                <li>- 20000 Logs per month</li>
                <li>- 5000 Feedback submissions</li>
                <li>- Advanced Analytics Tools</li>
              </ul>
              <Button className="w-full" variant="default">
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 transition-transform duration-300 transform hover:scale-105">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                Enterprise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Customizable solutions for large organizations.
              </p>
              <ul className="text-gray-700 space-y-3 mb-6">
                <li>- Host on Your Own Server</li>
                <li>- Full Customization Options</li>
                <li>- Choose between Docker or GitHub Integration</li>
              </ul>
              <Button className="w-full mb-4" variant="default">
                Talk to Sales
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Self Hosting Options */}
        <section className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Self-Hosting Options
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Docker Hosting */}
            <Card className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 transition-transform duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                  Docker Hosting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Easily deploy our platform using Docker.
                </p>
                <Button className="w-full" variant="default">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            {/* GitHub Hosting */}
            <Card className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 transition-transform duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                  GitHub Hosting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Integrate seamlessly with your GitHub projects.
                </p>
                <Button className="w-full" variant="default">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
