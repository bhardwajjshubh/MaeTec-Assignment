import React, { useState } from 'react'
import axios from 'axios'
import { useAppDispatch } from '../store/hooks'
import { loginSuccess } from '../store/authSlice'

export default function Login() {
  const dispatch = useAppDispatch()
  const [username, setUsername] = useState('test')
  const [password, setPassword] = useState('test123')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await axios.post('/login', { username, password })
      dispatch(loginSuccess(res.data))
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="card card-blur rounded-3xl p-8 shadow-2xl login-bg">
        <div className="mb-6 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">MT</div>
          <h1 className="text-2xl font-semibold mt-4">MeaTec Tasks</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">A clean mock task manager</p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm mb-2 text-gray-700 dark:text-gray-200">Username</label>
            <input value={username} onChange={(e)=>setUsername(e.target.value)} className="w-full border dark:border-gray-700 p-3 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-700 dark:text-gray-200">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full border dark:border-gray-700 p-3 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div>
            <button disabled={loading} className="btn-primary w-full text-center">{loading ? 'Signing in...' : 'Sign in'}</button>
          </div>
        </form>

        <div className="footer-small">© 2025 MeaTec – Mock frontend only</div>
      </div>
    </div>
  )
}
