import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/header.jsx'
import Form from './components/form.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Form />
  </StrictMode>,
)
