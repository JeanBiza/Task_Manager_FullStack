import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/useAuth'
import TaskCard from '../components/TaskCard'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  const [taskToDelete, setTaskToDelete] = useState(null)

  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const loadTasks = async () => {
        try {
        const res = await api.get('/tasks/')
        setTasks(res.data)
        } catch (err) {
        setError('Error al cargar las tareas: ', err)
        }
    }
    loadTasks()
    }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/tasks/', { title, description })
      setTasks([...tasks, res.data])
      setTitle('')
      setDescription('')
    } catch (err) {
      setError('Error al crear la tarea: ', err)
    }
  }

  const handleDelete = async (taskId) => {
    setTaskToDelete(taskId)
  }

  const confirmDelete = async () => {
    try {
        await api.delete(`/tasks/${taskToDelete}`)
        setTasks(tasks.filter(t => t.id !== taskToDelete))
        setTaskToDelete(null) // cierra el modal
    } catch (err) {
        setError('Error al eliminar la tarea: ', err)
    }
  }

  const handleUpdate = async (taskId, updatedData) => {
    try {
      const res = await api.put(`/tasks/${taskId}`, updatedData)
      setTasks(tasks.map(t => t.id === taskId ? res.data : t))
    } catch (err) {
      setError('Error al actualizar la tarea: ', err)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const completed = tasks.filter(t => t.completed).length
  const total = tasks.length

  const filteredTasks = tasks.filter(t => {
  if (filter === 'pending') return !t.completed
  if (filter === 'completed') return t.completed
  return true // 'all'
  })

    return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        {/* Navbar */}
        <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'var(--accent)', fontSize: '22px', fontWeight: '700' }}>Mis Tareas</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: 'var(--text)', fontSize: '13px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '20px', padding: '4px 12px' }}>
                {completed}/{total} completadas
            </span>
    
            <span style={{ color: 'var(--text)', fontSize: '14px' }}>Hola, {user?.identifier}</span>
            <button onClick={handleLogout} style={{ background: 'var(--accent-bg)', color: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: '8px', padding: '6px 14px', fontSize: '14px', cursor: 'pointer' }}>
            Cerrar sesión
            </button>
        </div>
        </div>

        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Formulario */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
            <h2 style={{ color: 'var(--text-h)', fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Nueva tarea</h2>
            {error && (
            <div style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '10px 16px', borderRadius: '8px', marginBottom: '12px', fontSize: '14px' }}>
                {error}
            </div>
            )}
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-h)', borderRadius: '8px', padding: '10px 16px', fontSize: '15px', outline: 'none' }}
            />
            <input
                type="text"
                placeholder="Descripción (opcional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-h)', borderRadius: '8px', padding: '10px 16px', fontSize: '15px', outline: 'none' }}
            />
            <button type="submit" style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', padding: '11px', fontWeight: '600', fontSize: '15px', cursor: 'pointer' }}>
                Agregar tarea
            </button>
            </form>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'pending', 'completed'].map(f => (
                <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                    background: filter === f ? 'var(--accent)' : 'var(--bg-card)',
                    color: filter === f ? '#fff' : 'var(--text)',
                    border: '1px solid var(--border)',
                    borderRadius: '20px',
                    padding: '6px 16px',
                    fontSize: '13px',
                    cursor: 'pointer'
                }}
                >
                {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendientes' : 'Completadas'}
                </button>
            ))}
        </div>


            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {tasks.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text)', marginTop: '16px' }}>No tienes tareas aún</p>
                ) : (
                filteredTasks.map(task => (
                    <TaskCard key={task.id} task={task} onDelete={handleDelete} onUpdate={handleUpdate} />
                ))
                )}
            </div>
        </div>

        {taskToDelete && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px', maxWidth: '380px', width: '90%', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--text-h)', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>¿Eliminar tarea?</h3>
                <p style={{ color: 'var(--text)', fontSize: '14px', marginBottom: '24px' }}>Esta acción no se puede deshacer.</p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button
                    onClick={() => setTaskToDelete(null)}
                    style={{ background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px 20px', cursor: 'pointer' }}
                    >
                    Cancelar
                    </button>
                    <button
                    onClick={confirmDelete}
                    style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 20px', cursor: 'pointer', fontWeight: '600' }}
                    >
                    Eliminar
                    </button>
                </div>
                </div>
            </div>
        )}

    </div>
    )
}