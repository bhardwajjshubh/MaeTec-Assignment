import React, { useEffect, useState, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { logout } from '../store/authSlice'
import { fetchTasks, addTask, updateTask, deleteTask } from '../store/tasksSlice'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'

export default function Dashboard(){
  const dispatch = useAppDispatch()
  const user = useAppSelector(s => s.auth.user)
  const tasksState = useAppSelector(s => s.tasks)
  const [editing, setEditing] = useState<any | null>(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all'|'todo'|'in-progress'|'done'>('all')

  useEffect(()=>{ dispatch(fetchTasks()) }, [dispatch])

  const filteredTasks = useMemo(()=>{
    const items = tasksState.items || []
    const s = search.trim().toLowerCase()
    return items.filter(t=> {
      if (filter !== 'all' && t.status !== filter) return false
      if (!s) return true
      return t.title.toLowerCase().includes(s)
    })
  }, [tasksState.items, search, filter])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Tasks</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">Welcome, {user?.username}</div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2 w-full md:w-2/3">
          <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search by title..."
            className="w-full border dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="flex items-center gap-2">
          {(['all','todo','in-progress','done'] as const).map((key)=>{
            const label = key === 'all' ? 'All' : key === 'todo' ? 'To Do' : key === 'in-progress' ? 'In Progress' : 'Done'
            const active = filter === key
            return (
              <button key={key}
                onClick={()=>setFilter(key)}
                className={`px-3 py-1 rounded ${active ? 'bg-blue-600 text-white' : 'border bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}>
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {(!filteredTasks || filteredTasks.length === 0) ? (
            <div className="card text-center p-8">
              <h3 className="text-lg font-semibold">No tasks found</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Try a different search or create a new task.</p>
            </div>
          ) : (
            <TaskList tasks={filteredTasks} onEdit={t=>setEditing(t)} onDelete={id=>dispatch(deleteTask(id))} />
          )}
        </div>
        <div>
          <TaskForm
            key={editing?.id ?? 'new'}
            task={editing}
            onCancel={()=>setEditing(null)}
            onSave={(payload:any)=>{
              if (editing) dispatch(updateTask(payload))
              else dispatch(addTask(payload))
              setEditing(null)
            }}
          />
        </div>
      </section>
    </div>
  )
}
