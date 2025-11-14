import React from 'react'

type Task = {
  id: string
  title: string
  description?: string
  status?: 'todo' | 'in-progress' | 'done'
}

export default function TaskList({ tasks, onEdit, onDelete }:{tasks: Task[]; onEdit:(t:Task)=>void; onDelete:(id:string)=>void}){
  if (!tasks || tasks.length===0) return <div className="card text-center p-8">No tasks yet</div>

  const statusBadge = (status?: string) => {
    const s = status || 'todo'
    const map:{[k:string]:{color:string;icon:string;label:string}} = {
      'todo': { color: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200', icon: '🕒', label: 'To Do' },
      'in-progress': { color: 'bg-yellow-200 text-yellow-800', icon: '🚧', label: 'In Progress' },
      'done': { color: 'bg-green-200 text-green-800', icon: '✅', label: 'Done' }
    }
    const info = map[s] ?? map['todo']
    return (
      <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${info.color}`}>
        <span>{info.icon}</span>
        <span>{info.label}</span>
      </span>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map(t=> (
        <div key={t.id} className="card flex justify-between items-start hover:shadow-xl transition-shadow duration-150 rounded-lg">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-lg">{t.title.charAt(0).toUpperCase()}</div>
              <div>
                <div className="font-semibold text-lg">{t.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{t.description}</div>
              </div>
            </div>
            <div className="mt-3">{statusBadge(t.status)}</div>
          </div>

          <div className="flex gap-2">
            <button onClick={()=>onEdit(t)} className="btn">Edit</button>
            <button onClick={()=>onDelete(t.id)} className="btn text-red-600">Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}
