import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'
import  { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
    <App />
  </StrictMode>
  <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#28a745', // Green background for success
            color: '#fff',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
          success: {
            style: {
              background: '#28a745', // Green background for success
            },
          },
          error: {
            style: {
              background: '#dc3545', // Red background for error
            },
          },
        }}
      />
  </Provider>
  
)
