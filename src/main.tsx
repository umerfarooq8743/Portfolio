import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Opt in to scroll-reveal styles only once JS is running, so content is never hidden without it.
document.documentElement.classList.add('js-reveal')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
