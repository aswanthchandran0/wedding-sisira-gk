import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, useLocation } from 'react-router-dom'
import { Router } from './routes/router.jsx'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
      
<RouterProvider router={Router}>
  <ScrollToTop />
  </RouterProvider>
  </StrictMode>,
)
