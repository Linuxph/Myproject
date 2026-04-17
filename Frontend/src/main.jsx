import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import store from './store'
import './index.css'
import { toast } from 'react-toastify'

window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
  toast.error('An unexpected error occurred. Please refresh the page.')
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  toast.error('Something went wrong. Please try again.')
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
