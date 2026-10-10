'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Recycle,
  Search,
  Package,
  MapPin,
  LogOut,
  User,
  ShoppingCart,
  Heart,
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
  seller: {
    email: string
    firstName: string | null
    lastName: string | null
    company: string | null
  } | null
  status: 'ACTIVE' | 'SOLD' | 'PENDING'
  createdAt: string
}

export default function BuyerDashboard() {
  const [userEmail, setUserEmail] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [minWeight, setMinWeight] = useState('')
  const [maxWeight, setMaxWeight] = useState('')
  const [selectedUnit, setSelectedUnit] = useState('')
  const [wasteListings, setWasteListings] = useState<WasteListing[]>([])
  const [filteredListings, setFilteredListings] = useState<WasteListing[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const userType = localStorage.getItem('userType')
    const email = localStorage.getItem('userEmail')

    if (userType !== 'buyer' || !email) {
      router.push('/buyer/login')
      return
    }

    setUserEmail(email)
  }, [router])

  const fetchListings = useCallback(async () => {
    setIsFetching(true)
    setFetchError('')
    try {
      const response = await fetch('/api/listings')
      if (!response.ok) {
        throw new Error('Failed to fetch listings')
      }
      const data = await response.json()
      const listings: WasteListing[] = Array.isArray(data.listings)
        ? data.listings.filter((listing) => listing.status === 'ACTIVE')
        : []
      setWasteListings(listings)
      setFilteredListings(listings)
    } catch (error) {
      console.error('[FETCH_BUYER_LISTINGS]', error)
      setFetchError('Unable to load listings. Please try again later.')
      setWasteListings([])
      setFilteredListings([])
    } finally {
      setIsFetching(false)
    }
  }, [])

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  useEffect(() => {
    let filtered = wasteListings

    if (searchTerm) {
      filtered = filtered.filter((listing) =>
        [listing.type, listing.description, listing.location, listing.seller?.company, listing.seller?.email]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedType) {
      filtered = filtered.filter((listing) => listing.type === selectedType)
    }

    if (selectedLocation) {
      filtered = filtered.filter((listing) => listing.location === selectedLocation)
    }

    if (minWeight) {
      const minWeightNum = parseFloat(minWeight)
      filtered = filtered.filter((listing) => convertWeight(listing, selectedUnit || listing.unit) >= minWeightNum)
    }

    if (maxWeight) {
      const maxWeightNum = parseFloat(maxWeight)
      filtered = filtered.filter((listing) => convertWeight(listing, selectedUnit || listing.unit) <= maxWeightNum)
    }

    setFilteredListings(filtered)
  }, [searchTerm, selectedType, selectedLocation, minWeight, maxWeight, selectedUnit, wasteListings])

  const convertWeight = (listing: WasteListing, unit: string) => {
    if (unit === listing.unit) return listing.weight
    if (unit === 'kg' && listing.unit === 'lbs') return listing.weight * 0.453592
    if (unit === 'lbs' && listing.unit === 'kg') return listing.weight * 2.20462
    if (unit === 'tons' && listing.unit === 'kg') return listing.weight / 1000
    if (unit === 'kg' && listing.unit === 'tons') return listing.weight * 1000
    return listing.weight
  }

  const handleLogout = () => {
    localStorage.removeItem('userType')
    localStorage.removeItem('userEmail')
    router.push('/')
  }

  const toggleFavorite = (listingId: string) => {
    setFavorites((prev) =>
      prev.includes(listingId)
        ? prev.filter((id) => id !== listingId)
        : [...prev, listingId]
    )
  }

  const getUniqueTypes = () => Array.from(new Set(wasteListings.map((listing) => listing.type)))
  const getUniqueLocations = () => Array.from(new Set(wasteListings.map((listing) => listing.location)))

  return (
    <div className="min-h-screen bg-secondary-50">
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
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Buyer Dashboard</h1>
          <p className="text-secondary-600">Find and purchase waste materials for recycling</p>
        </div>

        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Search materials..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Material Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="input-field"
              >
                <option value="">All Types</option>
                {getUniqueTypes().map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="input-field"
              >
                <option value="">All Locations</option>
                {getUniqueLocations().map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t border-secondary-200 pt-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Filter by Weight</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Min Weight
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={minWeight}
                  onChange={(e) => setMinWeight(e.target.value)}
                  className="input-field"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Max Weight
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={maxWeight}
                  onChange={(e) => setMaxWeight(e.target.value)}
                  className="input-field"
                  placeholder="100.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Unit
                </label>
                <select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                  className="input-field"
                >
                  <option value="">Detected unit</option>
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                  <option value="tons">tons</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedType('')
                    setSelectedLocation('')
                    setMinWeight('')
                    setMaxWeight('')
                    setSelectedUnit('')
                    setFilteredListings(wasteListings)
                  }}
                  className="btn-secondary w-full"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-secondary-600">
            Showing {filteredListings.length} of {wasteListings.length} available materials
          </p>
        </div>

        {isFetching ? (
          <div className="card text-center py-12 text-secondary-600">Loading listings...</div>
        ) : fetchError ? (
          <div className="card text-center py-12 text-red-600">{fetchError}</div>
        ) : filteredListings.length === 0 ? (
          <div className="card text-center py-12">
            <Package className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
            <p className="text-secondary-600">No waste materials found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedType('')
                setSelectedLocation('')
                setMinWeight('')
                setMaxWeight('')
                setSelectedUnit('')
                setFilteredListings(wasteListings)
              }}
              className="btn-primary mt-4"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => {
              const sellerFullName = `${listing.seller?.firstName ?? ''} ${listing.seller?.lastName ?? ''}`.trim()
              const sellerDisplay = listing.seller?.company || sellerFullName || 'Seller'

              return (
                <div key={listing.id} className="card hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <Package className="h-6 w-6 text-primary-600" />
                    </div>
                    <button
                      onClick={() => toggleFavorite(listing.id)}
                      className={`p-2 rounded-full transition-colors ${
                        favorites.includes(listing.id)
                          ? 'text-red-500 bg-red-50'
                          : 'text-secondary-400 hover:text-red-500 hover:bg-red-50'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${favorites.includes(listing.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">{listing.type}</h3>
                  <p className="text-secondary-600 text-sm mb-4">{listing.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary-600">Weight:</span>
                      <span className="font-medium text-secondary-900">
                        {listing.weight} {listing.unit}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary-600">Price:</span>
                      <span className="font-bold text-primary-600 text-lg">₹{listing.price.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary-600">Seller:</span>
                      <span className="font-medium text-secondary-900 text-sm">{sellerDisplay}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary-600">Location:</span>
                      <div className="flex items-center text-sm text-secondary-900">
                        <MapPin className="h-4 w-4 text-secondary-400 mr-1" />
                        {listing.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="btn-primary flex-1 flex items-center justify-center space-x-2">
                      <ShoppingCart className="h-4 w-4" />
                      <span>Purchase</span>
                    </button>
                    <button className="btn-secondary px-4">Contact</button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
