import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { logout } from '../store/authSlice'

function useSystemPrefersDark(){
  if (typeof window === 'undefined') return false
  try {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch { return false }
}

export default function Header(){
  const dispatch = useAppDispatch()
  const user = useAppSelector(s=>s.auth.user)

  // Initialize theme from localStorage, falling back to system preference
  const [isDark, setIsDark] = React.useState<boolean>(()=>{
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') return true
    if (saved === 'light') return false
    return useSystemPrefersDark()
  })

  // Apply class and persist whenever isDark changes
  React.useEffect(()=>{
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme','dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme','light')
    }
  }, [isDark])

  const toggle = ()=> setIsDark(v => !v)

  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b dark:border-gray-700 transition-colors">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 text-white rounded flex items-center justify-center font-bold">MT</div>
          <div>
            <div className="font-semibold">MeaTec Tasks</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Simple mock task manager</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggle} className="btn flex items-center gap-2" title="Toggle theme" aria-pressed={isDark}>
            <span aria-hidden>
              {isDark ? '🌙' : '☀️'}
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-300">{isDark ? 'Dark' : 'Light'}</span>
          </button>
          {user && <div className="text-sm mr-2">{user.username}</div>}
          <button onClick={()=>dispatch(logout())} className="btn text-red-600">Logout</button>
        </div>
      </div>
    </header>
  )
}
