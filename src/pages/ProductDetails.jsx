
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { readProducts } from '../utils/products'

function ProductDetails() {
  const { id } = useParams()
  const [products] = useState(readProducts)
  const product = products.find((item) => item.id === id)

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
        <p className="text-muted">This product may have been removed.</p>
        <Link className="btn btn-primary" to="/catalogue">
          Return to Catalogue
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <Link className="btn btn-outline-primary mb-4" to="/catalogue">
        Return to Catalogue
      </Link>

      <div className="row g-4 align-items-start">
        <div className="col-md-6">
          {product.image && (
            <img
              src={product.image}
              className="img-fluid rounded shadow-sm"
              alt={product.name}
            />
          )}
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.category}</p>
          <h4>₹{product.price}</h4>
          <p className="mt-3">{product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails