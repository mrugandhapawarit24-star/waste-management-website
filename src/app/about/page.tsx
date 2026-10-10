import Link from 'next/link'
import { Recycle, Leaf, Users, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-secondary-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Recycle className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-secondary-900">EcoWaste</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/" className="text-secondary-600 hover:text-primary-600 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-primary-600 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-secondary-600 hover:text-primary-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-6">
            About EcoWaste
          </h1>
          <p className="text-xl text-secondary-600 mb-8">
            We're on a mission to revolutionize waste management by creating a sustainable 
            marketplace that connects waste producers with recyclers.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">Our Mission</h2>
              <p className="text-lg text-secondary-600 mb-6">
                EcoWaste is dedicated to creating a circular economy where waste becomes a valuable 
                resource. We believe that every piece of recyclable material has the potential to 
                contribute to a sustainable future.
              </p>
              <p className="text-lg text-secondary-600 mb-6">
                By connecting sellers and buyers of waste materials, we're building a community 
                that prioritizes environmental responsibility while creating economic opportunities 
                for all participants.
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Leaf className="h-8 w-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900">Environmental Impact</h3>
                  <p className="text-secondary-600">Reducing waste in landfills</p>
                </div>
              </div>
            </div>
            <div className="bg-primary-50 p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="bg-white p-4 rounded-xl shadow-sm mb-3">
                    <Recycle className="h-8 w-8 text-primary-600 mx-auto" />
                  </div>
                  <h4 className="font-semibold text-secondary-900">Recycling</h4>
                  <p className="text-sm text-secondary-600">Sustainable waste processing</p>
                </div>
                <div className="text-center">
                  <div className="bg-white p-4 rounded-xl shadow-sm mb-3">
                    <Users className="h-8 w-8 text-primary-600 mx-auto" />
                  </div>
                  <h4 className="font-semibold text-secondary-900">Community</h4>
                  <p className="text-sm text-secondary-600">Building connections</p>
                </div>
                <div className="text-center">
                  <div className="bg-white p-4 rounded-xl shadow-sm mb-3">
                    <Globe className="h-8 w-8 text-primary-600 mx-auto" />
                  </div>
                  <h4 className="font-semibold text-secondary-900">Global Impact</h4>
                  <p className="text-sm text-secondary-600">Worldwide sustainability</p>
                </div>
                <div className="text-center">
                  <div className="bg-white p-4 rounded-xl shadow-sm mb-3">
                    <Leaf className="h-8 w-8 text-primary-600 mx-auto" />
                  </div>
                  <h4 className="font-semibold text-secondary-900">Green Future</h4>
                  <p className="text-sm text-secondary-600">Eco-friendly solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-secondary-900 mb-16">
            How EcoWaste Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">List Your Waste</h3>
              <p className="text-secondary-600">
                Sellers can easily list their recyclable waste materials with details about 
                type, weight, and pricing.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Connect & Discover</h3>
              <p className="text-secondary-600">
                Buyers can search, filter, and discover waste materials that match their 
                recycling needs and location.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Complete Transactions</h3>
              <p className="text-secondary-600">
                Facilitate secure transactions and coordinate pickup or delivery to complete 
                the recycling process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-secondary-900 mb-16">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Sustainability</h3>
              <p className="text-secondary-600">Committed to environmental protection</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Community</h3>
              <p className="text-secondary-600">Building strong partnerships</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Innovation</h3>
              <p className="text-secondary-600">Creative waste management solutions</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Global Impact</h3>
              <p className="text-secondary-600">Making a difference worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join the Waste Management Revolution
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Whether you're a seller looking to monetize your waste or a buyer seeking 
            materials for recycling, EcoWaste is your platform for sustainable success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="bg-white text-primary-600 hover:bg-primary-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              Get Started
            </Link>
            <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Recycle className="h-6 w-6 text-primary-400" />
            <span className="text-xl font-bold">EcoWaste</span>
          </div>
          <p className="text-secondary-300 mb-4">
            Building a sustainable future through smart waste management
          </p>
          <p className="text-secondary-400 text-sm">
            © 2024 EcoWaste. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
