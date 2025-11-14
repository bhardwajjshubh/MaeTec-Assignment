import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store'
import './index.css'

async function init() {
  // Allow enabling the mock service worker in production for demo deployments
  // by setting the Vite env var `VITE_ENABLE_MSW=true` in the host (e.g. Vercel).
  const enableMsw = import.meta.env.DEV || import.meta.env.VITE_ENABLE_MSW === 'true'
  if (enableMsw) {
    const { worker } = await import('./mocks/browser')
    await worker.start({ onUnhandledRequest: 'bypass' })
  }

  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}

init()
