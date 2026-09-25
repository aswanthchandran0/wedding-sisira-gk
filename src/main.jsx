import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, useLocation } from 'react-router-dom'
import { Router } from './routes/router.jsx'
import { Analytics } from '@vercel/analytics/react'

// ScrollToTop must be inside the Router context.
// We use it inside a layout wrapper so useLocation() works.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router} />
     <ScrollToTop />
    <Analytics />
  </StrictMode>,
)