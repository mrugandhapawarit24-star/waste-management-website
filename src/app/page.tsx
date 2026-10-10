'use client'

import { useState } from 'react'
import { Recycle, Users, Scale, Leaf } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [userType, setUserType] = useState<'seller' | 'buyer' | null>(null)

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
              <Link href="/about" className="text-secondary-600 hover:text-primary-600 transition-colors">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-secondary-900 mb-6">
            Sustainable Waste
            <span className="text-primary-600 block">Management</span>
          </h1>
          <p className="text-xl text-secondary-600 mb-12 max-w-3xl mx-auto">
            Connect with buyers and sellers to create a sustainable future. 
            Turn waste into opportunity while protecting our environment.
          </p>
          
          {/* User Type Selection */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-secondary-800 mb-6">
              I am a...
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setUserType('seller')}
                className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
                  userType === 'seller'
                    ? 'border-primary-500 bg-primary-50 shadow-lg'
                    : 'border-secondary-200 bg-white hover:border-primary-300 hover:shadow-md'
                }`}
              >
                <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Waste Seller</h3>
                <p className="text-secondary-600">Sell your recyclable waste and earn money</p>
              </button>
              
              <button
                onClick={() => setUserType('buyer')}
                className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
                  userType === 'buyer'
                    ? 'border-primary-500 bg-primary-50 shadow-lg'
                    : 'border-secondary-200 bg-white hover:border-primary-300 hover:shadow-md'
                }`}
              >
                <Scale className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">Waste Buyer</h3>
                <p className="text-secondary-600">Purchase waste materials for recycling</p>
              </button>
            </div>
            
            {userType && (
              <div className="mt-8">
                <Link
                  href={`/${userType}/login`}
                  className="btn-primary text-lg px-8 py-3 inline-block"
                >
                  Continue as {userType === 'seller' ? 'Seller' : 'Buyer'}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-secondary-900 mb-16">
            Why Choose EcoWaste?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Sustainable Impact</h3>
              <p className="text-secondary-600">Reduce environmental impact through proper waste management</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Fair Pricing</h3>
              <p className="text-secondary-600">Get competitive prices for your waste materials</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Eco-Friendly</h3>
              <p className="text-secondary-600">Contribute to a greener, more sustainable future</p>
            </div>
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
