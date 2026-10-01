import { useState } from 'react'
import { Link } from 'react-router-dom'
import { readProducts } from '../utils/products'

function Catalogue() {
  const [products] = useState(readProducts)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = [
    'All',
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="container py-5">
      <h2 className="mb-2">Our Artisan Catalogue</h2>
      <p className="text-muted mb-4">
        Discover handmade products created by talented artisans.
      </p>

      <div className="row g-3 mb-4">
        <div className="col-md-7">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search products by name..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="col-md-5">
          <select
            className="form-select form-select-lg"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-muted">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {products.length === 0 ? (
        <div className="text-center py-5">
          <h5>No products added yet</h5>
          <p>Upload your first artisan product to get started!</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-5">
          <h5>No matching products found</h5>
          <p>Try another search or select a different category.</p>
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              setSearch('')
              setSelectedCategory('All')
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div className="col-md-4" key={product.id}>
              <div className="card h-100 shadow-sm">
                {product.image && (
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: '220px', objectFit: 'cover' }}
                  />
                )}

                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="text-muted">{product.category}</p>
                  <h6>₹{product.price}</h6>
                  <p className="card-text">{product.description}</p>
                  <Link
                    className="btn btn-primary mt-2"
                    to={`/product/${encodeURIComponent(product.id)}`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Catalogue