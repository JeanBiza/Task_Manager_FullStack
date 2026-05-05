import { useState } from 'react'

export default function TaskCard({ task, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')

  const handleUpdate = () => {
    onUpdate(task.id, { title, description, completed: task.completed })
    setEditing(false)
  }
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
  }

    return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px 20px', borderLeft: `4px solid ${task.completed ? '#22c55e' : 'var(--accent)'}` }}>
        {editing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input value={title} onChange={(e) => setTitle(e.target.value)}
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-h)', borderRadius: '8px', padding: '8px 12px', fontSize: '14px', outline: 'none' }} />
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción (opcional)"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-h)', borderRadius: '8px', padding: '8px 12px', fontSize: '14px', outline: 'none' }} />
            <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleUpdate} style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', padding: '6px 14px', fontSize: '13px', cursor: 'pointer' }}>Guardar</button>
            <button onClick={() => setEditing(false)} style={{ background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', padding: '6px 14px', fontSize: '13px', cursor: 'pointer' }}>Cancelar</button>
            </div>
        </div>
        ) : (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ color: task.completed ? 'var(--text)' : 'var(--text-h)', fontSize: '16px', fontWeight: '600', textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
            </h3>
            <span style={{ background: task.completed ? 'rgba(34,197,94,0.1)' : 'var(--accent-bg)', color: task.completed ? '#22c55e' : 'var(--accent)', border: `1px solid ${task.completed ? '#22c55e' : 'var(--accent)'}`, borderRadius: '20px', padding: '2px 10px', fontSize: '12px' }}>
                {task.completed ? 'Completada' : 'Pendiente'}
            </span>
            </div>

            {task.description && (
            <p style={{ color: 'var(--text)', fontSize: '14px', marginBottom: '12px' }}>{task.description}</p>
            )}

            <p style={{ color: 'var(--text)', fontSize: '12px', marginBottom: '10px' }}>
            Creada el {formatDate(task.created_at)}
            </p>

            <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => onUpdate(task.id, { completed: !task.completed })}
                style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid #22c55e', borderRadius: '8px', padding: '5px 12px', fontSize: '13px', cursor: 'pointer' }}>
                {task.completed ? 'Desmarcar' : 'Completar'}
            </button>
            <button onClick={() => setEditing(true)}
                style={{ background: 'rgba(234,179,8,0.1)', color: '#eab308', border: '1px solid #eab308', borderRadius: '8px', padding: '5px 12px', fontSize: '13px', cursor: 'pointer' }}>
                Editar
            </button>
            <button onClick={() => onDelete(task.id)}
                style={{ background: 'var(--accent-bg)', color: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: '8px', padding: '5px 12px', fontSize: '13px', cursor: 'pointer' }}>
                Eliminar
            </button>
            </div>
        </>
        )}
    </div>
    )
}