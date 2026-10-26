import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BookingModal from './components/BookingModal';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import { api, getAuthToken, setAuthToken } from './api';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [settings, setSettings] = useState(null);

  // Auth state
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Booking Modal
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');

  // Sync hash routing if user opens with #admin or #services or pathname
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.replace('#', '');
      const path = window.location.pathname.replace('/', '');
      if (hash === 'admin' || path === 'admin') {
        setCurrentView('admin');
      } else if (hash && ['home', 'services', 'bridal', 'gallery', 'about', 'contact'].includes(hash)) {
        setCurrentView(hash);
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    return () => window.removeEventListener('hashchange', handleLocationChange);
  }, []);

  // Update hash when currentView changes
  useEffect(() => {
    if (currentView === 'home') {
      window.history.replaceState(null, '', window.location.pathname);
    } else {
      window.location.hash = currentView;
    }
  }, [currentView]);

  // Load public data
  const loadPublicData = async () => {
    try {
      const [servicesRes, galleryRes, settingsRes] = await Promise.all([
        api.getServices().catch(() => ({ services: [] })),
        api.getGallery().catch(() => ({ gallery: [] })),
        api.getSettings().catch(() => ({ settings: {} }))
      ]);

      if (servicesRes.services) setServices(servicesRes.services);
      if (galleryRes.gallery) setGallery(galleryRes.gallery);
      if (settingsRes.settings) setSettings(settingsRes.settings);
    } catch (err) {
      console.warn('Initial data load warning:', err.message);
    }
  };

  // Check existing session token
  const checkAuth = async () => {
    const token = getAuthToken();
    if (!token) {
      setIsAuthChecking(false);
      return;
    }

    try {
      const data = await api.getProfile();
      if (data.user) {
        setCurrentUser(data.user);
      } else {
        setAuthToken(null);
      }
    } catch (err) {
      setAuthToken(null);
    } finally {
      setIsAuthChecking(false);
    }
  };

  useEffect(() => {
    loadPublicData();
    checkAuth();
  }, []);

  const openBookingModal = (serviceTitle = '') => {
    setPreselectedService(serviceTitle);
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setPreselectedService('');
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentView('admin');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  return (
    <div className="diyazhu-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Luxury Trailing Cursor for Desktop */}
      <CustomCursor />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp settings={settings} />

      {/* Sticky Top Navbar (hidden when inside admin dashboard for focused control) */}
      {!(currentView === 'admin' && currentUser) && (
        <Navbar
          currentView={currentView}
          setCurrentView={setCurrentView}
          openBookingModal={openBookingModal}
          settings={settings}
          isAuthenticated={!!currentUser}
        />
      )}

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {currentView === 'home' && (
          <HomePage
            services={services}
            gallery={gallery}
            settings={settings}
            openBookingModal={openBookingModal}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'services' && (
          <ServicesPage
            services={services}
            openBookingModal={openBookingModal}
            settings={settings}
          />
        )}

        {currentView === 'bridal' && (
          <GalleryPage
            gallery={gallery.filter((g) => g.category === 'Bridal Looks' || g.category === 'Hairstyling')}
            openBookingModal={openBookingModal}
          />
        )}

        {currentView === 'gallery' && (
          <GalleryPage
            gallery={gallery}
            openBookingModal={openBookingModal}
          />
        )}

        {currentView === 'about' && (
          <AboutPage
            settings={settings}
            openBookingModal={openBookingModal}
          />
        )}

        {currentView === 'contact' && (
          <ContactPage
            settings={settings}
            openBookingModal={openBookingModal}
          />
        )}

        {currentView === 'admin' && (
          currentUser ? (
            <AdminDashboard
              user={currentUser}
              onLogout={handleLogout}
              setCurrentView={setCurrentView}
              onRefreshPublicData={loadPublicData}
            />
          ) : (
            <AdminLogin
              onLoginSuccess={handleLoginSuccess}
              setCurrentView={setCurrentView}
            />
          )
        )}
      </main>

      {/* Footer (hidden when inside admin dashboard) */}
      {!(currentView === 'admin' && currentUser) && (
        <Footer
          setCurrentView={setCurrentView}
          settings={settings}
          openBookingModal={openBookingModal}
        />
      )}

      {/* Appointment Request Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={closeBookingModal}
        preselectedService={preselectedService}
        services={services}
        settings={settings}
      />
    </div>
  );
}
