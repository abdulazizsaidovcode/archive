import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DocumentProvider } from './context/documents.jsx'
import { ModalProvider } from './context/modalcontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DocumentProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </DocumentProvider>
  </StrictMode>,
)
