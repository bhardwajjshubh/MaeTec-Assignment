import React from 'react'
import { useAppSelector } from './store/hooks'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'

export default function App() {
  const token = useAppSelector((s) => s.auth.token)

  return (
    <div className="app-container">
      {token && <Header />}
      {/* For login view, center vertically; for dashboard use normal padded layout */}
      <main className={token ? 'max-w-5xl mx-auto px-4 py-8' : 'min-h-screen flex items-center justify-center px-4'}>
        {token ? <Dashboard /> : <Login />}
      </main>
    </div>
  )
}
