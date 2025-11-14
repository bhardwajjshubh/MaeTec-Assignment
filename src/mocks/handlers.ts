import { rest } from 'msw'

// Basic in-memory persistence via localStorage
const TASKS_KEY = 'mock_tasks_v1'

function readTasks(){
  const raw = localStorage.getItem(TASKS_KEY)
  if (!raw) return []
  try { return JSON.parse(raw) } catch { return [] }
}

function writeTasks(tasks:any[]){ localStorage.setItem(TASKS_KEY, JSON.stringify(tasks)) }

// Ensure default tasks exist
if (!localStorage.getItem(TASKS_KEY)){
  writeTasks([
    { id: '1', title: 'Sample task', description: 'This is a sample', status: 'todo' }
  ])
}

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    // accept only test/test123 in this mock
    const { username, password } = req.body as any
    if (username === 'test' && password === 'test123'){
      const token = 'fake-jwt-' + Date.now()
      return res(ctx.status(200), ctx.json({ token, user: { username } }))
    }
    return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }))
  }),

  rest.get('/tasks', (req, res, ctx) => {
    const tasks = readTasks()
    return res(ctx.status(200), ctx.json(tasks))
  }),

  rest.post('/tasks', async (req, res, ctx) => {
    const body = await req.json()
    const tasks = readTasks()
    const item = { id: String(Date.now()), title: body.title, description: body.description || '', status: body.status || 'todo' }
    tasks.unshift(item)
    writeTasks(tasks)
    return res(ctx.status(201), ctx.json(item))
  }),

  rest.put('/tasks/:id', async (req, res, ctx) => {
    const { id } = req.params as any
    const body = await req.json()
    const tasks = readTasks()
    const idx = tasks.findIndex((t:any)=>t.id === id)
    if (idx === -1) return res(ctx.status(404), ctx.json({ message: 'Not found' }))
    tasks[idx] = { ...tasks[idx], ...body }
    writeTasks(tasks)
    return res(ctx.status(200), ctx.json(tasks[idx]))
  }),

  rest.delete('/tasks/:id', (req, res, ctx) => {
    const { id } = req.params as any
    let tasks = readTasks()
    tasks = tasks.filter((t:any)=>t.id !== id)
    writeTasks(tasks)
    return res(ctx.status(204))
  })
]
