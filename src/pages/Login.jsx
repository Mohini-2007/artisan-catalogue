
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const [role, setRole] = useState('customer')
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    // Temporary frontend demo only.
    // Real authentication will be connected to the backend later.
    localStorage.setItem('userRole', role)
    localStorage.setItem('userName', name || email.split('@')[0])
    navigate(role === 'artisan' ? '/upload' : '/home')
  }

  return (
    <main className="auth-page">
      <section className="auth-story" aria-label="Artisan-made goods">
        <div className="auth-story-image" />
        <div className="auth-story-shade" />
        <a className="auth-brand auth-brand-light" href="/login">
          <span className="auth-brand-mark" aria-hidden="true">AC</span>
          <span>Artisan Catalogue</span>
        </a>
        <div className="auth-story-copy">
          <span className="auth-eyebrow">Made by hand, found with heart</span>
          <h1>Good things<br />are made slowly.</h1>
          <p>Meet the makers behind the pieces you’ll keep for years.</p>
        </div>
        <span className="auth-image-credit">A marketplace for thoughtful making</span>
      </section>

      <section className="auth-panel">
        <div className="auth-form-wrap">
          <a className="auth-brand auth-brand-dark" href="/login">
            <span className="auth-brand-mark" aria-hidden="true">AC</span>
            <span>Artisan Catalogue</span>
          </a>
          <p className="auth-tagline">Discover handmade products. Support local artisans.</p>

          <div className="auth-heading-row">
            <div>
              <p className="auth-kicker">{isLogin ? 'YOUR NEXT FIND STARTS HERE' : 'JOIN OUR COMMUNITY'}</p>
              <h2>{isLogin ? 'Welcome back' : 'Create your account'}</h2>
            </div>
          </div>

          <div className="auth-mode-switch" role="tablist" aria-label="Account access">
            <button
              type="button"
              role="tab"
              aria-selected={isLogin}
              className={isLogin ? 'is-active' : ''}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={!isLogin}
              className={!isLogin ? 'is-active' : ''}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <div className="auth-role-label">I’m here as a</div>
          <div className="auth-role-switch" aria-label="Choose your role">
            <button
              type="button"
              aria-pressed={role === 'customer'}
              className={role === 'customer' ? 'is-active' : ''}
              onClick={() => setRole('customer')}
            >
              <span aria-hidden="true">◎</span> Customer
            </button>
            <button
              type="button"
              aria-pressed={role === 'artisan'}
              className={role === 'artisan' ? 'is-active' : ''}
              onClick={() => setRole('artisan')}
            >
              <span aria-hidden="true">✳</span> Artisan
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="auth-field">
                <label htmlFor="auth-name">Full name</label>
                <input
                  id="auth-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
            )}

            <div className="auth-field">
              <label htmlFor="auth-email">Email address</label>
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="auth-password">Password</label>
              <input
                id="auth-password"
                type="password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                placeholder="At least 8 characters"
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <button className="auth-submit" type="submit">
              {isLogin ? 'Login' : 'Create account'}
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="auth-demo-note">
            Demo only: account details are not verified. Authentication will be added later.
          </p>
        </div>
      </section>
    </main>
  )
}

export default Login