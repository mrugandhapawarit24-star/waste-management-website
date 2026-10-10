'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Recycle,
  Plus,
  Package,
  DollarSign,
  Calendar,
  MapPin,
  Scale,
  LogOut,
  User,
} from 'lucide-react'

interface WasteListing {
  id: string
  type: string
  weight: number
  unit: string
  price: number
  location: string
  address: string
  contactNumber: string
  description: string
  status: 'ACTIVE' | 'SOLD' | 'PENDING'
  createdAt: string
}

export default function SellerDashboard() {
  const [userEmail, setUserEmail] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [wasteListings, setWasteListings] = useState<WasteListing[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const router = useRouter()

  const [formData, setFormData] = useState({
    type: '',
    weight: '',
    unit: 'kg',
    price: '',
    location: '',
    address: '',
    contactNumber: '',
    description: '',
  })

  const fetchListings = useCallback(async (email: string) => {
    setIsFetching(true)
    setFetchError('')
    try {
      const response = await fetch(`/api/listings?sellerEmail=${encodeURIComponent(email)}`)
      if (!response.ok) {
        throw new Error('Failed to load listings')
      }
      const data = await response.json()
      setWasteListings(Array.isArray(data.listings) ? data.listings : [])
    } catch (error) {
      console.error('[FETCH_SELLER_LISTINGS]', error)
      setFetchError('Unable to load your listings. Please try again later.')
      setWasteListings([])
    } finally {
      setIsFetching(false)
    }
  }, [])

  useEffect(() => {
    const userType = localStorage.getItem('userType')
    const email = localStorage.getItem('userEmail')

    if (userType !== 'seller' || !email) {
      router.push('/seller/login')
      return
    }

    setUserEmail(email)
    fetchListings(email)
  }, [router, fetchListings])

  const handleLogout = () => {
    localStorage.removeItem('userType')
    localStorage.removeItem('userEmail')
    router.push('/')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userEmail) return

    setIsLoading(true)

    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: formData.type,
          weight: parseFloat(formData.weight),
          unit: formData.unit,
          price: parseFloat(formData.price),
          location: formData.location,
          address: formData.address,
          contactNumber: formData.contactNumber,
          description: formData.description,
          sellerEmail: userEmail,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message ?? 'Failed to add listing')
      }

      setFormData({
        type: '',
        weight: '',
        unit: 'kg',
        price: '',
        location: '',
        address: '',
        contactNumber: '',
        description: '',
      })
      setShowAddForm(false)
      await fetchListings(userEmail)
    } catch (error) {
      console.error('[CREATE_LISTING]', error)
      alert(
        error instanceof Error
          ? error.message
          : 'Unable to add listing. Please try again later.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800'
      case 'SOLD':
        return 'bg-blue-100 text-blue-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const totalValue = wasteListings.reduce((sum, listing) => sum + listing.price, 0)
  const activeCount = wasteListings.filter((listing) => listing.status === 'ACTIVE').length
  const thisMonthCount = wasteListings.filter((listing) =>
    listing.createdAt.startsWith(new Date().toISOString().slice(0, 7))
  ).length

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Recycle className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-secondary-900">EcoWaste</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-secondary-600">
                <User className="h-5 w-5" />
                <span>{userEmail}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-secondary-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Seller Dashboard</h1>
          <p className="text-secondary-600">Manage your waste listings and track sales</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="bg-primary-100 p-3 rounded-lg">
                <Package className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">Total Listings</p>
                <p className="text-2xl font-bold text-secondary-900">{wasteListings.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Scale className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">Active Listings</p>
                <p className="text-2xl font-bold text-secondary-900">{activeCount}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">Total Value</p>
                <p className="text-2xl font-bold text-secondary-900">₹{totalValue.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">This Month</p>
                <p className="text-2xl font-bold text-secondary-900">{thisMonthCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Waste Listing</span>
          </button>
        </div>

        {showAddForm && (
          <div className="card mb-8">
            <h3 className="text-xl font-semibold text-secondary-900 mb-6">Add New Waste Listing</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Waste Type
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Plastic Bottles, Cardboard, Metal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Weight
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="input-field flex-1"
                      placeholder="0.00"
                    />
                    <select
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="input-field w-20"
                    >
                      <option value="kg">kg</option>
                      <option value="lbs">lbs</option>
                      <option value="tons">tons</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Price per {formData.unit}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500">₹</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="input-field pl-8"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="input-field"
                    placeholder="City, State"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Full Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="input-field"
                    placeholder="Street address for pickup/delivery"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    required
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactNumber: e.target.value.replace(/\D/g, '').slice(0, 10),
                      })
                    }
                    className="input-field"
                    placeholder="Enter 10-digit phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  rows={3}
                  placeholder="Describe the waste material, condition, etc."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary px-8 disabled:opacity-50"
                >
                  {isLoading ? 'Adding...' : 'Add Listing'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="card">
          <h3 className="text-xl font-semibold text-secondary-900 mb-6">Your Waste Listings</h3>
          {isFetching ? (
            <div className="text-center py-12 text-secondary-600">Loading listings...</div>
          ) : fetchError ? (
            <div className="text-center py-12 text-red-600">{fetchError}</div>
          ) : wasteListings.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
              <p className="text-secondary-600">No waste listings yet. Add your first one!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-secondary-200">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Weight
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary-200">
                  {wasteListings.map((listing) => (
                    <tr key={listing.id} className="hover:bg-secondary-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-secondary-900">{listing.type}</div>
                          <div className="text-sm text-secondary-500">{listing.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                        {listing.weight} {listing.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                        ₹{listing.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-secondary-400 mr-1" />
                          {listing.location}
                        </div>
                        <div className="text-xs text-secondary-500 mt-1">{listing.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                        {listing.contactNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(listing.status)}`}>
                          {listing.status.toLowerCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                        {new Date(listing.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
