
import { useState } from 'react'
import { readProducts, writeProducts } from '../utils/products'

function readImageAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Unable to read this image.'))
    reader.readAsDataURL(file)
  })
}

function Upload() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const [isReadingImage, setIsReadingImage] = useState(false)

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0]
    setMessage('')

    if (!file) {
      setImage(null)
      setPreview('')
      return
    }

    if (!file.type.startsWith('image/')) {
      setImage(null)
      setPreview('')
      setMessageType('error')
      setMessage('Please select a valid image file.')
      event.target.value = ''
      return
    }

    setImage(file)
    setPreview('')
    setIsReadingImage(true)

    try {
      setPreview(await readImageAsDataUrl(file))
    } catch {
      setImage(null)
      setMessageType('error')
      setMessage('Unable to read this image. Please choose another file.')
      event.target.value = ''
    } finally {
      setIsReadingImage(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget

    if (!name.trim() || !category || !description.trim() || !image || !preview) {
      setMessageType('error')
      setMessage('Complete all required fields and select a product image.')
      return
    }

    const numericPrice = Number(price)
    if (price.trim() === '' || !Number.isFinite(numericPrice) || numericPrice < 0) {
      setMessageType('error')
      setMessage('Enter a valid price that is zero or greater.')
      return
    }

    const product = {
      id: String(Date.now()),
      name: name.trim(),
      category,
      price: numericPrice,
      description: description.trim(),
      image: preview,
    }

    if (!writeProducts([...readProducts(), product])) {
      setMessageType('error')
      setMessage('The product could not be saved. Check browser storage and try again.')
      return
    }

    setMessageType('success')
    setMessage('Product added successfully! It is now available in the Catalogue.')
    setName('')
    setCategory('')
    setPrice('')
    setDescription('')
    setImage(null)
    setPreview('')
    form.reset()
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Upload Your Artisan Product</h2>

      <form onSubmit={handleSubmit}>
        {message && (
          <div
            className={`alert alert-${messageType === 'error' ? 'danger' : 'success'}`}
            role={messageType === 'error' ? 'alert' : 'status'}
          >
            {message}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleImageChange}
            required
          />
        </div>

        {preview && (
          <div className="mb-3">
            <img
              src={preview}
              alt="Product preview"
              style={{
                width: '180px',
                height: '180px',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="Handicrafts">Handicrafts</option>
            <option value="Jewellery">Jewellery</option>
            <option value="Clothing">Clothing</option>
            <option value="Home Decor">Home Decor</option>
            <option value="Paintings">Paintings</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            className="form-control"
            min="0"
            step="any"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isReadingImage}>
          Add Product
        </button>
      </form>
    </div>
  )
}

export default Upload