const STORAGE_KEY = 'products'

function normalizeProduct(product) {
  if (!product || typeof product !== 'object' || Array.isArray(product)) {
    return null
  }

  const id = product.id == null ? '' : String(product.id)
  const name = typeof product.name === 'string' ? product.name.trim() : ''
  const category = typeof product.category === 'string' ? product.category.trim() : ''
  const hasPrice =
    (typeof product.price === 'number' && Number.isFinite(product.price)) ||
    (typeof product.price === 'string' && product.price.trim() !== '')
  const price = Number(product.price)

  if (!id || !name || !category || !hasPrice || !Number.isFinite(price) || price < 0) {
    return null
  }

  return {
    id,
    name,
    category,
    price,
    description: typeof product.description === 'string' ? product.description : '',
    image: typeof product.image === 'string' ? product.image : '',
  }
}

export function readProducts() {
  try {
    const savedProducts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')

    if (!Array.isArray(savedProducts)) return []

    return savedProducts.map(normalizeProduct).filter(Boolean)
  } catch {
    return []
  }
}

export function writeProducts(products) {
  try {
    const normalizedProducts = products.map(normalizeProduct).filter(Boolean)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedProducts))
    return true
  } catch {
    return false
  }
}