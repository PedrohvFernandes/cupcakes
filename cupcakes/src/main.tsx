import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { isDev } from '@utils/isDev.ts'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  isDev ? (
    <App />
  ) : (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
)
