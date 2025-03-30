import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EDUFUNDX | Connecting Researchers with Funders',
  description: 'Platform connecting innovative researchers with visionary funders'
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-700">EDUFUNDX</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-700">
              How It Works
            </a>
            <a href="#benefits" className="text-gray-600 hover:text-blue-700">
              Benefits
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-700">
              Success Stories
            </a>
            <a href="#faq" className="text-gray-600 hover:text-blue-700">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connecting Innovative Research <br className="hidden md:block" />
              <span className="text-blue-700">with Visionary Funding</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              EDUFUNDX bridges the gap between groundbreaking research projects and the funding they
              need to change the world.
            </p>

            <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Researcher Login Button */}
              <Link
                href="/auth/researcher-login"
                className="flex flex-col items-center p-8 rounded-xl shadow-lg bg-white text-gray-800 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-105 w-full md:w-64"
              >
                <div className="text-4xl mb-4">👩‍🔬</div>
                <h3 className="text-xl font-bold mb-2">Researchers</h3>
                <p className="text-sm text-gray-500 group-hover:text-blue-100">
                  Showcase your research and connect with funders
                </p>
              </Link>

              {/* Funder Login Button */}
              <Link
                href="/auth/funder-login"
                className="flex flex-col items-center p-8 rounded-xl shadow-lg bg-white text-gray-800 transition-all duration-300 hover:bg-green-600 hover:text-white hover:scale-105 w-full md:w-64"
              >
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-bold mb-2">Funders</h3>
                <p className="text-sm text-gray-500 group-hover:text-green-100">
                  Discover promising research projects to support
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-600 mb-12">
              How EDUFUNDX Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* For Researchers */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-blue-700 mb-4">For Researchers</h3>
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      1
                    </span>
                    <span className="text-gray-500">
                      Create a profile showcasing your research background and current projects
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      2
                    </span>
                    <span className="text-gray-500">
                      Submit detailed proposals for funding with clear objectives and impact
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      3
                    </span>
                    <span className="text-gray-500">
                      Connect directly with interested funders and discuss collaboration
                    </span>
                  </li>
                </ol>
              </div>

              {/* Platform Features */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-purple-700 mb-4">Platform Features</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-purple-700 mr-3">✓</span>
                    <span className="text-gray-500">
                      Smart matching algorithm to connect compatible researchers and funders
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-700 mr-3">✓</span>
                    <span className="text-gray-500">
                      Secure messaging and document sharing system
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-700 mr-3">✓</span>
                    <span className="text-gray-500">
                      Progress tracking and milestone reporting tools
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-700 mr-3">✓</span>
                    <span className="text-gray-500">
                      Verification and vetting process for all platform members
                    </span>
                  </li>
                </ul>
              </div>

              {/* For Funders */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-green-700 mb-4">For Funders</h3>
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      1
                    </span>
                    <span className="text-gray-500">
                      Create an organization profile with funding interests and requirements
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      2
                    </span>
                    <span className="text-gray-500">
                      Browse curated research projects that match your funding criteria
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      3
                    </span>
                    <span className="text-gray-500">
                      Initiate contact with researchers and track funded projects
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-500 mb-12">
              Why Choose EDUFUNDX
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-blue-700 mb-6">For Researchers</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-blue-100 p-2 rounded-full mr-4">🔍</span>
                    <div>
                      <h4 className="font-bold text-gray-400">Increased Visibility</h4>
                      <p className="text-gray-600">
                        Showcase your work to a curated network of funders interested in your field
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 p-2 rounded-full mr-4">⏱️</span>
                    <div>
                      <h4 className="font-bold text-gray-400">Time Efficiency</h4>
                      <p className="text-gray-600">
                        Reduce time spent on grant applications by connecting directly with
                        interested funders
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 p-2 rounded-full mr-4">🤝</span>
                    <div>
                      <h4 className="font-bold text-gray-400">Meaningful Partnerships</h4>
                      <p className="text-gray-600">
                        Build relationships with funders who understand and value your research area
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-green-700 mb-6">For Funders</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-green-100 p-2 rounded-full mr-4">🎯</span>
                    <div>
                      <h4 className="font-bold text-gray-400">Targeted Discovery</h4>
                      <p className="text-gray-600">
                        Find research projects that precisely match your organization&apos;s funding
                        priorities
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 p-2 rounded-full mr-4">📊</span>
                    <div>
                      <h4 className="font-bold text-gray-400">Impact Tracking</h4>
                      <p className="text-gray-600">
                        Monitor the progress and outcomes of funded projects with built-in reporting
                        tools
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 p-2 rounded-full mr-4">🌟</span>
                    <div>
                      <h4 className="font-bold text-gray-400">Early Access</h4>
                      <p className="text-gray-600">
                        Discover groundbreaking research before it reaches mainstream funding
                        channels
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Connect?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our growing community of researchers and funders changing the future of
              scientific innovation.
            </p>

            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
              <Link
                href="/auth/researcher-login"
                className="bg-white text-blue-700 px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-50 transition duration-300 inline-block"
              >
                Join as a Researcher
              </Link>

              <Link
                href="/auth/funder-login"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-green-500 transition duration-300 inline-block"
              >
                Join as a Funder
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EDUFUNDX</h3>
              <p className="text-gray-400">
                Bridging the gap between innovative research and the funding it deserves.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Research Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Funding Best Practices
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} EDUFUNDX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
