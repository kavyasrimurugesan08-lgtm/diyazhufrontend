import React, { useState, useEffect } from 'react';
import {
  Calendar, CheckCircle2, Clock, AlertCircle, Sparkles, Image,
  Settings, Shield, LogOut, Plus, Trash2, Edit2, Search, Filter,
  Phone, MessageCircle, ExternalLink, RefreshCw, Eye, EyeOff, Save, Check
} from 'lucide-react';
import { api, setAuthToken } from '../api';

export default function AdminDashboard({ user, onLogout, setCurrentView, onRefreshPublicData }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [settingsForm, setSettingsForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ type: '', msg: '' });

  // Appointment filters
  const [apptStatusFilter, setApptStatusFilter] = useState('All');
  const [apptSearch, setApptSearch] = useState('');

  // Service form modal
  const [editingService, setEditingService] = useState(null);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    category: 'Bridal Makeup',
    description: '',
    price: '',
    duration: '',
    image_url: '',
    sort_order: 0,
    is_active: 1
  });

  // Gallery form modal
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [galleryFormData, setGalleryFormData] = useState({
    title: '',
    category: 'Bridal Looks',
    caption: '',
    image_url: '',
    is_featured: 0
  });
  const [galleryFile, setGalleryFile] = useState(null);

  // Security password change
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Fetch initial data
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [statsRes, apptsRes, servicesRes, galleryRes, settingsRes] = await Promise.all([
        api.getStats(),
        api.getAdminAppointments(apptStatusFilter, apptSearch),
        api.getAdminServices(),
        api.getAdminGallery(),
        api.getSettings()
      ]);

      setStats(statsRes.stats);
      setAppointments(apptsRes.appointments || []);
      setServices(servicesRes.services || []);
      setGallery(galleryRes.gallery || []);
      setSettingsForm(settingsRes.settings || {});
    } catch (err) {
      if (err.message === 'Unauthorized') {
        onLogout();
      } else {
        showFeedback('error', err.message || 'Failed to load dashboard data');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const showFeedback = (type, msg) => {
    setFeedback({ type, msg });
    setTimeout(() => setFeedback({ type: '', msg: '' }), 4000);
  };

  // Status badge helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="badge-status badge-pending">Pending</span>;
      case 'Confirmed':
        return <span className="badge-status badge-confirmed">Confirmed</span>;
      case 'Rescheduled':
        return <span className="badge-status badge-rescheduled">Rescheduled</span>;
      case 'Completed':
        return <span className="badge-status badge-completed">Completed</span>;
      case 'Rejected':
        return <span className="badge-status badge-rejected">Rejected</span>;
      default:
        return <span className="badge-status">{status}</span>;
    }
  };

  // Appointment status change
  const handleUpdateApptStatus = async (id, newStatus) => {
    try {
      await api.updateAppointmentStatus(id, newStatus);
      showFeedback('success', `Appointment updated to ${newStatus}`);
      // Refresh
      const res = await api.getAdminAppointments(apptStatusFilter, apptSearch);
      setAppointments(res.appointments || []);
      const statsRes = await api.getStats();
      setStats(statsRes.stats);
    } catch (err) {
      showFeedback('error', err.message || 'Failed to update status');
    }
  };

  // Delete appointment
  const handleDeleteAppt = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment request?')) return;
    try {
      await api.deleteAppointment(id);
      showFeedback('success', 'Appointment deleted');
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      const statsRes = await api.getStats();
      setStats(statsRes.stats);
    } catch (err) {
      showFeedback('error', err.message);
    }
  };

  // Filter appointments
  const handleApptFilter = async () => {
    try {
      const res = await api.getAdminAppointments(apptStatusFilter, apptSearch);
      setAppointments(res.appointments || []);
    } catch (err) {
      showFeedback('error', 'Search failed');
    }
  };

  // Service save
  const handleSaveService = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await api.updateService(editingService.id, serviceFormData);
        showFeedback('success', 'Service updated successfully');
      } else {
        await api.createService(serviceFormData);
        showFeedback('success', 'New service created successfully');
      }
      setServiceModalOpen(false);
      setEditingService(null);
      const res = await api.getAdminServices();
      setServices(res.services || []);
      if (onRefreshPublicData) onRefreshPublicData();
    } catch (err) {
      showFeedback('error', err.message || 'Failed to save service');
    }
  };

  // Toggle service active
  const handleToggleService = async (id) => {
    try {
      await api.toggleServiceStatus(id);
      const res = await api.getAdminServices();
      setServices(res.services || []);
      if (onRefreshPublicData) onRefreshPublicData();
    } catch (err) {
      showFeedback('error', 'Status toggle failed');
    }
  };

  // Delete service
  const handleDeleteService = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await api.deleteService(id);
      showFeedback('success', 'Service removed');
      setServices((prev) => prev.filter((s) => s.id !== id));
      if (onRefreshPublicData) onRefreshPublicData();
    } catch (err) {
      showFeedback('error', err.message);
    }
  };

  // Save gallery photo
  const handleSaveGallery = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append('title', galleryFormData.title);
      fd.append('category', galleryFormData.category);
      fd.append('caption', galleryFormData.caption || '');
      fd.append('is_featured', galleryFormData.is_featured ? '1' : '0');

      if (galleryFile) {
        fd.append('image', galleryFile);
      } else if (galleryFormData.image_url) {
        fd.append('image_url', galleryFormData.image_url);
      } else {
        showFeedback('error', 'Please provide an image file or URL');
        return;
      }

      await api.addGalleryItem(fd);
      showFeedback('success', 'Photo added to gallery');
      setGalleryModalOpen(false);
      setGalleryFormData({
        title: '',
        category: 'Bridal Looks',
        caption: '',
        image_url: '',
        is_featured: 0
      });
      setGalleryFile(null);
      const res = await api.getAdminGallery();
      setGallery(res.gallery || []);
      if (onRefreshPublicData) onRefreshPublicData();
    } catch (err) {
      showFeedback('error', err.message || 'Failed to upload photo');
    }
  };

  // Delete gallery item
  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Delete this photo from the gallery?')) return;
    try {
      await api.deleteGalleryItem(id);
      showFeedback('success', 'Photo deleted');
      setGallery((prev) => prev.filter((g) => g.id !== id));
      if (onRefreshPublicData) onRefreshPublicData();
    } catch (err) {
      showFeedback('error', err.message);
    }
  };

  // Settings save
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await api.updateSettings(settingsForm);
      showFeedback('success', 'Website settings published live!');
      if (onRefreshPublicData) onRefreshPublicData();
    } catch (err) {
      showFeedback('error', err.message || 'Failed to update settings');
    }
  };

  // Password change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showFeedback('error', 'New passwords do not match');
      return;
    }
    try {
      await api.changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      showFeedback('success', 'Admin password changed successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      showFeedback('error', err.message || 'Failed to change password');
    }
  };

  return (
    <div style={{ backgroundColor: '#f7f4f0', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Admin Top Navigation Bar */}
      <div
        className="admin-top-header"
        style={{
          background: '#ffffff',
          borderBottom: '1px solid var(--border-solid)',
          padding: '1rem 1.5rem',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-subtle)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'var(--rose-gold-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 700,
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem'
            }}
          >
            D
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--deep-rose)', fontSize: '1.15rem' }}>
              Diyazhu Makeovers Admin
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', letterSpacing: '0.04em' }}>
              Logged in as {user?.name || 'Administrator'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setCurrentView('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.82rem',
              color: 'var(--deep-rose)',
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-rose)',
              background: 'var(--bg-blush)'
            }}
          >
            <ExternalLink size={15} />
            <span>View Public Website</span>
          </button>

          <button
            onClick={() => {
              setAuthToken(null);
              onLogout();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.82rem',
              color: '#c53030',
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid #feb2b2',
              background: '#fff5f5'
            }}
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Global Toast Feedback */}
      {feedback.msg && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 99999,
            padding: '0.85rem 1.75rem',
            borderRadius: 'var(--radius-full)',
            background: feedback.type === 'error' ? '#9b2c2c' : '#22543d',
            color: '#ffffff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
            fontSize: '0.9rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            animation: 'fadeIn 0.2s ease-in'
          }}
        >
          {feedback.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          <span>{feedback.msg}</span>
        </div>
      )}

      <div className="container" style={{ marginTop: '2rem' }}>
        {/* Navigation Tabs */}
        <div
          className="admin-nav-tabs"
          style={{
            display: 'flex',
            gap: '0.5rem',
            background: '#ffffff',
            padding: '0.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            marginBottom: '2rem',
            overflowX: 'auto'
          }}
        >
          {[
            { id: 'overview', label: 'Overview', icon: <Sparkles size={16} /> },
            { id: 'appointments', label: `Appointments (${appointments.length})`, icon: <Calendar size={16} /> },
            { id: 'services', label: `Services (${services.length})`, icon: <CheckCircle2 size={16} /> },
            { id: 'gallery', label: `Gallery (${gallery.length})`, icon: <Image size={16} /> },
            { id: 'settings', label: 'Website Content', icon: <Settings size={16} /> },
            { id: 'security', label: 'Security & Access', icon: <Shield size={16} /> }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 500,
                  background: isActive ? 'var(--deep-rose)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            {/* Real Metrics Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.25rem',
                marginBottom: '2.5rem'
              }}
            >
              <div className="glass-card" style={{ background: '#ffffff', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Total Requests
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--deep-rose)', marginTop: '4px' }}>
                  {stats?.totalAppointments ?? appointments.length}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Lifetime enquiries received
                </div>
              </div>

              <div className="glass-card" style={{ background: '#ffffff', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.8rem', color: '#b7791f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Pending Approval
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 700, color: '#b7791f', marginTop: '4px' }}>
                  {stats?.pendingAppointments ?? appointments.filter((a) => a.status === 'Pending').length}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Needs studio confirmation
                </div>
              </div>

              <div className="glass-card" style={{ background: '#ffffff', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.8rem', color: '#276749', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Confirmed Sessions
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 700, color: '#276749', marginTop: '4px' }}>
                  {stats?.confirmedAppointments ?? appointments.filter((a) => a.status === 'Confirmed').length}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Approved on calendar
                </div>
              </div>

              <div className="glass-card" style={{ background: '#ffffff', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--rose-gold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Active Services
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--rose-gold-dark)', marginTop: '4px' }}>
                  {services.filter((s) => s.is_active).length}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Visible to customers
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Requests */}
            <div className="glass-card" style={{ background: '#ffffff', padding: '2rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--deep-rose)' }}>
                    Recent Appointment Requests
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                    Quick review of latest customer enquiries
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('appointments')}
                  className="btn-secondary btn-sm"
                >
                  Manage All Requests
                </button>
              </div>

              {appointments.slice(0, 5).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                  No appointment requests yet.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border-solid)', textAlign: 'left', color: 'var(--text-muted)' }}>
                        <th style={{ padding: '0.75rem 0.5rem' }}>Customer</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>Service</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>Date & Time</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                        <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.slice(0, 5).map((appt) => {
                        const cleanPhone = appt.contact_number.replace(/\D/g, '');
                        const replyMsg = `Hello ${appt.customer_name}, this is Diyazhu Makeovers regarding your appointment request for ${appt.service_name} on ${appt.preferred_date} (${appt.preferred_time}).`;
                        const replyUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(replyMsg)}`;

                        return (
                          <tr key={appt.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                            <td style={{ padding: '0.85rem 0.5rem' }}>
                              <strong style={{ color: 'var(--text-main)', display: 'block' }}>{appt.customer_name}</strong>
                              <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>+91 {appt.contact_number}</span>
                            </td>
                            <td style={{ padding: '0.85rem 0.5rem' }}>{appt.service_name}</td>
                            <td style={{ padding: '0.85rem 0.5rem' }}>
                              <div>{appt.preferred_date}</div>
                              <span style={{ fontSize: '0.76rem', color: 'var(--text-light)' }}>{appt.preferred_time}</span>
                            </td>
                            <td style={{ padding: '0.85rem 0.5rem' }}>
                              {getStatusBadge(appt.status)}
                            </td>
                            <td style={{ padding: '0.85rem 0.5rem', textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                                <a
                                  href={replyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn-whatsapp btn-sm"
                                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                                  title="Reply on WhatsApp"
                                >
                                  <MessageCircle size={14} />
                                  <span>WhatsApp</span>
                                </a>
                                {appt.status === 'Pending' && (
                                  <button
                                    onClick={() => handleUpdateApptStatus(appt.id, 'Confirmed')}
                                    className="btn-primary btn-sm"
                                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                                  >
                                    Confirm
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: APPOINTMENTS MANAGEMENT */}
        {activeTab === 'appointments' && (
          <div className="glass-card" style={{ background: '#ffffff', padding: '2rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--deep-rose)' }}>
                  All Appointment Requests ({appointments.length})
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Review, approve, reschedule, or communicate directly with clients.
                </p>
              </div>

              {/* Status Filter & Search */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Filter size={15} color="var(--text-light)" />
                  <select
                    value={apptStatusFilter}
                    onChange={(e) => {
                      setApptStatusFilter(e.target.value);
                      api.getAdminAppointments(e.target.value, apptSearch).then((r) => setAppointments(r.appointments || []));
                    }}
                    style={{
                      padding: '0.5rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-solid)',
                      fontSize: '0.84rem'
                    }}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Rescheduled">Rescheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={apptSearch}
                    onChange={(e) => setApptSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleApptFilter()}
                    placeholder="Search name, phone..."
                    style={{
                      padding: '0.5rem 1rem 0.5rem 2.2rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-solid)',
                      fontSize: '0.84rem'
                    }}
                  />
                  <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                </div>
              </div>
            </div>

            {appointments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                No appointments matched your query.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-solid)', textAlign: 'left', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Ref #</th>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Customer Details</th>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Service</th>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Appointment Date</th>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Customer Notes</th>
                      <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                      <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appt) => {
                      const cleanPhone = appt.contact_number.replace(/\D/g, '');
                      const replyMsg = `Hello ${appt.customer_name}, this is Diyazhu Makeovers regarding your appointment request for ${appt.service_name} on ${appt.preferred_date} at ${appt.preferred_time}.`;
                      const replyUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(replyMsg)}`;

                      return (
                        <tr key={appt.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                          <td style={{ padding: '0.85rem 0.5rem', color: 'var(--text-light)', fontSize: '0.8rem' }}>
                            #{appt.id}
                          </td>
                          <td style={{ padding: '0.85rem 0.5rem' }}>
                            <strong style={{ color: 'var(--text-main)', display: 'block' }}>{appt.customer_name}</strong>
                            <a href={`tel:${cleanPhone}`} style={{ fontSize: '0.8rem', color: 'var(--deep-rose)', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                              <Phone size={12} />
                              <span>{appt.contact_number}</span>
                            </a>
                          </td>
                          <td style={{ padding: '0.85rem 0.5rem' }}>
                            <span style={{ fontWeight: 600 }}>{appt.service_name}</span>
                          </td>
                          <td style={{ padding: '0.85rem 0.5rem' }}>
                            <div>{appt.preferred_date}</div>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>{appt.preferred_time}</span>
                          </td>
                          <td style={{ padding: '0.85rem 0.5rem', maxWidth: '200px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {appt.message || '—'}
                          </td>
                          <td style={{ padding: '0.85rem 0.5rem' }}>
                            <select
                              value={appt.status}
                              onChange={(e) => handleUpdateApptStatus(appt.id, e.target.value)}
                              style={{
                                padding: '0.35rem 0.6rem',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                border: '1px solid var(--border-solid)'
                              }}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Rescheduled">Rescheduled</option>
                              <option value="Completed">Completed</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                          <td style={{ padding: '0.85rem 0.5rem', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '0.4rem', alignItems: 'center' }}>
                              <a
                                href={replyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-whatsapp btn-sm"
                                style={{ padding: '0.35rem 0.65rem', fontSize: '0.76rem' }}
                                title="Reply via WhatsApp"
                              >
                                <MessageCircle size={14} />
                                <span>WhatsApp</span>
                              </a>

                              <button
                                onClick={() => handleDeleteAppt(appt.id)}
                                style={{
                                  padding: '0.35rem 0.5rem',
                                  color: '#c53030',
                                  borderRadius: 'var(--radius-sm)',
                                  background: '#fff5f5',
                                  border: '1px solid #feb2b2'
                                }}
                                title="Delete Record"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SERVICES MANAGEMENT */}
        {activeTab === 'services' && (
          <div className="glass-card" style={{ background: '#ffffff', padding: '2rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--deep-rose)' }}>
                  Service Offerings ({services.length})
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Add, edit descriptions, adjust pricing, or publish/unpublish services.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingService(null);
                  setServiceFormData({
                    title: '',
                    category: 'Bridal Makeup',
                    description: '',
                    price: '',
                    duration: '',
                    image_url: '',
                    sort_order: services.length + 1,
                    is_active: 1
                  });
                  setServiceModalOpen(true);
                }}
                className="btn-primary btn-sm"
              >
                <Plus size={16} />
                <span>Add New Service</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {services.map((s) => (
                <div
                  key={s.id}
                  style={{
                    border: '1px solid var(--border-solid)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: s.is_active ? 1 : 0.6
                  }}
                >
                  <div style={{ height: '160px', position: 'relative' }}>
                    <img
                      src={s.image_url || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'}
                      alt={s.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        left: '0.75rem',
                        background: 'rgba(255,255,255,0.92)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: 'var(--deep-rose)'
                      }}
                    >
                      {s.category}
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        background: s.is_active ? '#276749' : '#c53030',
                        color: '#ffffff',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.72rem',
                        fontWeight: 600
                      }}
                    >
                      {s.is_active ? 'Published' : 'Hidden'}
                    </div>
                  </div>

                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--deep-rose)', marginBottom: '0.35rem' }}>
                      {s.title}
                    </h4>

                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
                      <span>Price: <strong>{s.price || 'On Request'}</strong></span>
                      <span>Duration: <strong>{s.duration || 'Flexible'}</strong></span>
                    </div>

                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, flex: 1, marginBottom: '1.25rem' }}>
                      {s.description}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '0.85rem' }}>
                      <button
                        onClick={() => handleToggleService(s.id)}
                        style={{
                          fontSize: '0.78rem',
                          color: s.is_active ? '#c53030' : '#276749',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        {s.is_active ? <EyeOff size={14} /> : <Eye size={14} />}
                        <span>{s.is_active ? 'Unpublish' : 'Publish'}</span>
                      </button>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => {
                            setEditingService(s);
                            setServiceFormData({
                              title: s.title,
                              category: s.category,
                              description: s.description,
                              price: s.price || '',
                              duration: s.duration || '',
                              image_url: s.image_url || '',
                              sort_order: s.sort_order || 0,
                              is_active: s.is_active
                            });
                            setServiceModalOpen(true);
                          }}
                          className="btn-secondary btn-sm"
                          style={{ padding: '0.3rem 0.65rem', fontSize: '0.76rem' }}
                        >
                          <Edit2 size={13} />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleDeleteService(s.id)}
                          style={{
                            padding: '0.3rem 0.65rem',
                            color: '#c53030',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid #feb2b2',
                            background: '#fff5f5'
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="glass-card" style={{ background: '#ffffff', padding: '2rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--deep-rose)' }}>
                  Portfolio Gallery ({gallery.length})
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Upload authentic makeover photographs or update demonstration images.
                </p>
              </div>

              <button
                onClick={() => setGalleryModalOpen(true)}
                className="btn-primary btn-sm"
              >
                <Plus size={16} />
                <span>Add Photo</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {gallery.map((g) => (
                <div
                  key={g.id}
                  style={{
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-solid)',
                    boxShadow: 'var(--shadow-subtle)',
                    position: 'relative'
                  }}
                >
                  <div style={{ height: '220px' }}>
                    <img src={g.image_url} alt={g.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '1rem', background: '#ffffff' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--rose-gold)', textTransform: 'uppercase', fontWeight: 600 }}>
                      {g.category}
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--deep-rose)', fontWeight: 600 }}>
                      {g.title}
                    </div>
                    {g.caption && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {g.caption}
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
                      <button
                        onClick={() => handleDeleteGallery(g.id)}
                        style={{
                          padding: '0.3rem 0.6rem',
                          color: '#c53030',
                          background: '#fff5f5',
                          border: '1px solid #feb2b2',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.76rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: WEBSITE CONTENT MANAGEMENT */}
        {activeTab === 'settings' && (
          <div className="glass-card" style={{ background: '#ffffff', padding: '2.5rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--deep-rose)' }}>
                Website Content Management
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                Edits made here instantly update the public website without code changes.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Brand & Contact Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                    Business / Studio Name
                  </label>
                  <input
                    type="text"
                    value={settingsForm.site_name || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, site_name: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.tagline || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                    Phone Number (Click to call)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsapp || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                  />
                </div>
              </div>

              {/* Hours & Address */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                    Business Hours
                  </label>
                  <input
                    type="text"
                    value={settingsForm.hours || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, hours: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                    Studio Address / Coverage Area
                  </label>
                  <input
                    type="text"
                    value={settingsForm.address || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                  />
                </div>
              </div>

              {/* Hero Section Copy */}
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--deep-rose)', marginBottom: '1rem' }}>
                  Homepage Hero Content
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                      Hero Main Title
                    </label>
                    <input
                      type="text"
                      value={settingsForm.hero_title || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, hero_title: e.target.value })}
                      style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                      Hero Subtitle Description
                    </label>
                    <textarea
                      rows={2}
                      value={settingsForm.hero_subtitle || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, hero_subtitle: e.target.value })}
                      style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Welcome & Philosophy */}
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--deep-rose)', marginBottom: '1rem' }}>
                  Brand Welcome & Story Content
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                      Welcome Section Title
                    </label>
                    <input
                      type="text"
                      value={settingsForm.welcome_title || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, welcome_title: e.target.value })}
                      style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                      Welcome Brand Message
                    </label>
                    <textarea
                      rows={3}
                      value={settingsForm.welcome_text || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, welcome_text: e.target.value })}
                      style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                      About Us Philosophy
                    </label>
                    <textarea
                      rows={3}
                      value={settingsForm.about_philosophy || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, about_philosophy: e.target.value })}
                      style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '0.85rem 2rem' }}
                >
                  <Save size={16} />
                  <span>Save & Publish Live Updates</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 6: SECURITY & ACCESS */}
        {activeTab === 'security' && (
          <div className="glass-card" style={{ background: '#ffffff', padding: '2.5rem', borderRadius: 'var(--radius-md)', maxWidth: '560px' }}>
            <div style={{ marginBottom: '1.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--deep-rose)' }}>
                Security Settings
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                Change your studio admin password. Passwords are salted and hashed with bcrypt.
              </p>
            </div>

            <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  Current Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    required
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem 2.5rem 0.7rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', display: 'flex', alignItems: 'center' }}
                    aria-label="Toggle password visibility"
                  >
                    {showCurrentPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  New Password (min 6 characters)
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    required
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem 2.5rem 0.7rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', display: 'flex', alignItems: 'center' }}
                    aria-label="Toggle password visibility"
                  >
                    {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  Confirm New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    required
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem 2.5rem 0.7rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-light)', display: 'flex', alignItems: 'center' }}
                    aria-label="Toggle password visibility"
                  >
                    {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '0.85rem', marginTop: '0.5rem' }}
              >
                <Shield size={16} />
                <span>Update Password</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* SERVICE MODAL */}
      {serviceModalOpen && (
        <div className="lightbox-overlay">
          <div
            className="glass-card admin-modal-card"
            style={{
              width: '100%',
              maxWidth: '540px',
              maxHeight: '92vh',
              overflowY: 'auto',
              padding: '2rem',
              background: '#ffffff',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--deep-rose)', marginBottom: '1.25rem' }}>
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h3>

            <form onSubmit={handleSaveService} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={serviceFormData.title}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
                  placeholder="e.g. Traditional Bridal Makeover"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Category *
                </label>
                <select
                  value={serviceFormData.category}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, category: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                >
                  <option value="Bridal Makeup">Bridal Makeup</option>
                  <option value="Party Makeup">Party Makeup</option>
                  <option value="Hairstyling">Hairstyling</option>
                  <option value="Facials & Skin">Facials & Skin</option>
                  <option value="Other Services">Other Services</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={serviceFormData.description}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                  placeholder="Detailed description of techniques, products, and inclusions..."
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Price (Optional)
                  </label>
                  <input
                    type="text"
                    value={serviceFormData.price}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, price: e.target.value })}
                    placeholder="e.g. ₹12,000"
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Duration
                  </label>
                  <input
                    type="text"
                    value={serviceFormData.duration}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, duration: e.target.value })}
                    placeholder="e.g. 3 - 4 Hours"
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Image URL
                </label>
                <input
                  type="url"
                  value={serviceFormData.image_url}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, image_url: e.target.value })}
                  placeholder="https://..."
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary btn-sm"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GALLERY MODAL */}
      {galleryModalOpen && (
        <div className="lightbox-overlay">
          <div
            className="glass-card admin-modal-card"
            style={{
              width: '100%',
              maxWidth: '520px',
              maxHeight: '92vh',
              overflowY: 'auto',
              padding: '2rem',
              background: '#ffffff',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--deep-rose)', marginBottom: '1.25rem' }}>
              Add Portfolio Photograph
            </h3>

            <form onSubmit={handleSaveGallery} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={galleryFormData.title}
                  onChange={(e) => setGalleryFormData({ ...galleryFormData, title: e.target.value })}
                  placeholder="e.g. Royal Muhurtham Bride"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Category *
                </label>
                <select
                  value={galleryFormData.category}
                  onChange={(e) => setGalleryFormData({ ...galleryFormData, category: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                >
                  <option value="Bridal Looks">Bridal Looks</option>
                  <option value="Reception & Party">Reception & Party</option>
                  <option value="Hairstyling">Hairstyling</option>
                  <option value="Transformations">Transformations</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Upload File from Computer
                </label>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={(e) => setGalleryFile(e.target.files[0] || null)}
                  style={{ width: '100%', padding: '0.45rem', fontSize: '0.84rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  OR Image Web URL
                </label>
                <input
                  type="url"
                  value={galleryFormData.image_url}
                  onChange={(e) => setGalleryFormData({ ...galleryFormData, image_url: e.target.value })}
                  placeholder="https://..."
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Caption (Optional)
                </label>
                <input
                  type="text"
                  value={galleryFormData.caption}
                  onChange={(e) => setGalleryFormData({ ...galleryFormData, caption: e.target.value })}
                  placeholder="Brief note about the styling or makeup technique..."
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary btn-sm"
                >
                  Upload & Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Dashboard Responsive CSS */}
      <style>{`
        .admin-nav-tabs {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .admin-nav-tabs::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 640px) {
          .admin-top-header {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.75rem !important;
            padding: 0.85rem 1rem !important;
          }
          .admin-top-header > div:last-child {
            justify-content: space-between;
          }
          .admin-modal-card {
            padding: 1.5rem 1.15rem !important;
          }
          .admin-modal-card input,
          .admin-modal-card select,
          .admin-modal-card textarea {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
