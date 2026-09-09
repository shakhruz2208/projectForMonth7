import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { store } from './store'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import Layout from './components/layout/Layout'

import Home from './pages/Home'
import Destinations from './pages/Destinations'
import DestinationDetail from './pages/DestinationDetail'
import Itinerary from './pages/Itinerary'
import Budget from './pages/Budget'
import Weather from './pages/Weather'
import PackingList from './pages/PackingList'
import SavedTrips from './pages/SavedTrips'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Reviews from './pages/Reviews'
import CurrencyConverter from './pages/CurrencyConverter'
import Emergency from './pages/Emergency'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

import './index.css'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LanguageProvider>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/destinations" element={<Destinations />} />
                  <Route path="/destination/:id" element={<DestinationDetail />} />
                  <Route path="/itinerary" element={<Itinerary />} />
                  <Route path="/budget" element={<Budget />} />
                  <Route path="/weather" element={<Weather />} />
                  <Route path="/packing" element={<PackingList />} />
                  <Route path="/saved" element={<SavedTrips />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogDetail />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/currency" element={<CurrencyConverter />} />
                  <Route path="/emergency" element={<Emergency />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
            <Toaster
              position="top-right"
              toastOptions={{ duration: 3000, style: { background: '#1e293b', color: '#fff', borderRadius: '12px' } }}
            />
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
)
