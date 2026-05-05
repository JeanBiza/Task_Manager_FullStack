import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/useAuth'

export default function Login() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const formData = new FormData()
      formData.append('username', identifier)
      formData.append('password', password)

      const res = await api.post('/auth/login', formData)
      const token = res.data.access_token

      login(token, { identifier })
      navigate('/tasks')
    } catch (err) {
      setError(err.response?.data?.detail || 'Credenciales incorrectas')
    }
  }

    return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '420px', boxShadow: 'var(--shadow)' }}>
        <h1 style={{ color: 'var(--text-h)', fontSize: '24px', fontWeight: '600', textAlign: 'center', marginBottom: '28px' }}>Iniciar sesión</h1>

        {error && (
            <div style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '10px 16px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
            {error}
            </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
            type="text"
            placeholder="Email o username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-h)', borderRadius: '8px', padding: '10px 16px', fontSize: '15px', outline: 'none' }}
            />
            <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-h)', borderRadius: '8px', padding: '10px 16px', fontSize: '15px', outline: 'none' }}
            />
            <button
            type="submit"
            style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', padding: '11px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', marginTop: '4px' }}
            >
            Entrar
            </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text)', marginTop: '20px' }}>
            ¿No tienes cuenta?{' '}
            <Link to="/register" style={{ color: 'var(--accent)' }}>Regístrate</Link>
        </p>
        </div>
    </div>
    )
}