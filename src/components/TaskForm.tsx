import React, { useState } from 'react'

type Task = { id?: string, title: string, description?: string, status?: string }

export default function TaskForm({ task, onSave, onCancel }:{task?:Task | null; onSave:(t:Task)=>void; onCancel?:()=>void}){
  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [status, setStatus] = useState(task?.status || 'todo')

  // keep internal state in sync when `task` prop changes (entering edit mode or clearing)
  React.useEffect(()=>{
    setTitle(task?.title || '')
    setDescription(task?.description || '')
    setStatus(task?.status || 'todo')
  }, [task])

  const submit = (e:React.FormEvent)=>{
    e.preventDefault()
    if (!title.trim()) return
    onSave({ id: task?.id, title, description, status })

    // If we just created a new task (not editing), clear the form for next create
    if (!task) {
      setTitle('')
      setDescription('')
      setStatus('todo')
    }
  }

  return (
    <form onSubmit={submit} className="card space-y-3">
      <h3 className="font-semibold">{task ? 'Edit Task' : 'Create Task'}</h3>
      <div>
        <input className="w-full border dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" />
      </div>
      <div>
        <textarea className="w-full border dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" />
      </div>
      <div>
        <select className="w-full border dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" value={status} onChange={(e)=>setStatus(e.target.value)}>
          <option value="todo">To do</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-blue-600 text-white rounded" type="submit">Save</button>
        {onCancel && <button type="button" onClick={onCancel} className="px-3 py-1 border rounded">Cancel</button>}
      </div>
    </form>
  )
}
