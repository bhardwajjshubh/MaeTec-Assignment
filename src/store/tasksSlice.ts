import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

type Task = { id: string; title: string; description?: string; status?: string }

export const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
  const res = await axios.get('/tasks')
  return res.data
})

export const addTask = createAsyncThunk('tasks/add', async (payload: Partial<Task>) => {
  const res = await axios.post('/tasks', payload)
  return res.data
})

export const updateTask = createAsyncThunk('tasks/update', async (payload: Task) => {
  const res = await axios.put(`/tasks/${payload.id}`, payload)
  return res.data
})

export const deleteTask = createAsyncThunk('tasks/delete', async (id: string) => {
  await axios.delete(`/tasks/${id}`)
  return id
})

const slice = createSlice({
  name: 'tasks',
  initialState: { items: [] as Task[], status: 'idle' as string },
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(fetchTasks.fulfilled, (s, a)=>{ s.items = a.payload })
    builder.addCase(addTask.fulfilled, (s, a)=>{ s.items.unshift(a.payload) })
    builder.addCase(updateTask.fulfilled, (s, a)=>{ s.items = s.items.map(t=> t.id===a.payload.id ? a.payload : t) })
    builder.addCase(deleteTask.fulfilled, (s, a)=>{ s.items = s.items.filter(t=> t.id!==a.payload) })
  }
})

export default slice.reducer
