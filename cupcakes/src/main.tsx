import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'

const isDev = import.meta.env.VITE_ENVIRONMENT === 'development'

ReactDOM.createRoot(document.getElementById('root')!).render(
  isDev ? (
    <App />
  ) : (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
)
