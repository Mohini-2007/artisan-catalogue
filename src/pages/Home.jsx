
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Home() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.hash === '#about') {
      document.getElementById('about')?.scrollIntoView()
    }
  }, [location.hash])

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              <span className="badge-custom">
                ✨ AI-Powered Artisan Platform
              </span>

              <h1 className="hero-title">
                Preserve Tradition.
                <br />
                <span>Showcase Your Craft.</span>
              </h1>

              <p className="hero-text">
                Turn your handmade products into beautiful
                digital catalogues with the power of AI.
              </p>

              <button
                className="btn btn-primary btn-lg px-4"
                onClick={() => navigate('/upload')}
              >
                + Add Your Product
              </button>

              <button
                className="btn btn-outline-dark btn-lg ms-3 px-4"
                onClick={() => navigate('/catalogue')}
              >
                View Catalogue
              </button>
            </div>

            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="hero-card">
                <div className="floating-tag">
                  🤖 AI Generated
                </div>

                <div className="product-placeholder">
                  🧺
                </div>

                <h4>Traditional Bamboo Basket</h4>

                <p>
                  Handmade • Eco-friendly • Traditional Craft
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-section" id="about">
        <div className="container">
          <div className="text-center mb-5">
            <p className="section-label">SIMPLE PROCESS</p>

            <h2 className="section-title">
              From Craft to Catalogue
            </h2>

            <p className="text-muted">
              Create your digital product listing in just a few steps.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">📷</div>

                <h4>Upload</h4>

                <p>
                  Upload a photo of your handmade product.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">✨</div>

                <h4>AI Creates</h4>

                <p>
                  AI generates a title, description and relevant tags.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">📦</div>

                <h4>Build Catalogue</h4>

                <p>
                  Review your details and add products to your catalogue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home