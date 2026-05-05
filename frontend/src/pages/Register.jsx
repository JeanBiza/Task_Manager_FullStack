import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

export default function Register() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      await api.post('/users/register', { email, username, password })
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al registrarse')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '420px', boxShadow: 'var(--shadow)' }}>
        <h1 style={{ color: 'var(--text-h)', fontSize: '24px', fontWeight: '600', textAlign: 'center', marginBottom: '28px' }}>Crear cuenta</h1>

       {error && (
            <div style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '10px 16px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
            {error}
            </div>
        )}


        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-h)', borderRadius: '8px', padding: '10px 16px', fontSize: '15px', outline: 'none' }}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-h)', borderRadius: '8px', padding: '10px 16px', fontSize: '15px', outline: 'none' }}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-h)', borderRadius: '8px', padding: '10px 16px', fontSize: '15px', outline: 'none' }}
            required
          />
          <button
            type="submit"
            style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', padding: '11px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', marginTop: '4px' }}
          >
            Registrarse
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text)', marginTop: '20px' }}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={{ color: 'var(--accent)' }}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}