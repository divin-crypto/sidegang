import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Collections from './pages/Collections';
import CollectionDetail from './pages/CollectionDetail';
import ProductDetail from './pages/ProductDetail';
import Lookbook from './pages/Lookbook';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Search from './pages/Search';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/shop', element: <Shop /> },
      { path: '/collections', element: <Collections /> },
      { path: '/collections/:slug', element: <CollectionDetail /> },
      { path: '/product/:slug', element: <ProductDetail /> },
      { path: '/lookbook', element: <Lookbook /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/shipping', element: <Shipping /> },
      { path: '/returns', element: <Returns /> },
      { path: '/privacy', element: <Privacy /> },
      { path: '/terms', element: <Terms /> },
      { path: '/search', element: <Search /> },
      { path: '/cart', element: <CartPage /> },
      // legacy anchors
      { path: '/collections/all', element: <Navigate to="/collections" replace /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
