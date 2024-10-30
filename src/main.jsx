import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DocumentProvider } from './context/documents.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DocumentProvider>
      <App />
    </DocumentProvider>
  </StrictMode>,
)
