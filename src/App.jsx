import { useState } from 'react'
import './App.css'
import MaterialSymbol from './components/MaterialSymbol.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import TherapistsPage from './pages/TherapistsPage.jsx'
import ClientsPage from './pages/ClientsPage.jsx'
import StaffPage from './pages/StaffPage.jsx'
import RoomsPage from './pages/RoomsPage.jsx'
import AnalyticsPage from './pages/AnalyticsPage.jsx'
import InsightsPage from './pages/InsightsPage.jsx'
import AppointmentsPage from './pages/AppointmentsPage.jsx'
import OffersPage from './pages/OffersPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

const NAV_SECTIONS = [
  {
    title: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { id: 'clients', label: 'Clients', icon: 'groups' },
      { id: 'therapists', label: 'Therapist', icon: 'medical_services' },
      { id: 'staff', label: 'Staff', icon: 'badge' },
      { id: 'rooms', label: 'Rooms', icon: 'meeting_room' },
    ],
  },
  {
    title: 'Experience',
    items: [
      { id: 'appointments', label: 'Appointment', icon: 'event' },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      { id: 'analytics', label: 'Analytics', icon: 'monitoring' },
      { id: 'insights', label: 'AI Insights', icon: 'auto_awesome' },
    ],
  },
  {
    title: 'System',
    items: [
      { id: 'settings', label: 'Settings', icon: 'settings' },
    ],
  },
]

const VIEW_META = {
  dashboard: {
    title: 'Good Morning, Elena',
    subtitle: 'Your sanctuary is ready for you today.',
  },
  services: {
    title: 'Serene Rituals',
    subtitle: 'Experience our curated collection of restorative therapies.',
  },
  therapists: {
    title: 'Expert Therapists',
    subtitle: 'Guided by intuition, grounded in expertise.',
  },
  appointments: {
    title: '',
    subtitle: '',
  },
  clients: {
    title: '',
    subtitle: '',
  },
  staff: {
    title: '',
    subtitle: '',
  },
  rooms: {
    title: '',
    subtitle: '',
  },
  analytics: {
    title: '',
    subtitle: '',
  },
  insights: {
    title: '',
    subtitle: '',
  },
  offers: {
    title: 'Signature Packages',
    subtitle: 'Limited availability for seasonal rituals and retreats.',
  },
  settings: {
    title: 'Settings',
    subtitle: 'Configure spa business rules and notifications.',
  },
}

function App() {
  const [view, setView] = useState(() => {
    const token = window.localStorage.getItem('access_token')
    return token ? 'dashboard' : 'login'
  })
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@example.com',
      phone: '+91 98765 43210',
      status: 'Active',
      address: '123 Wellness Lane, Sanctuary City',
      age: '28',
      preferences: 'Swedish Massage, Aromatherapy',
      appointmentHistory: [
        { date: '2024-04-10', service: 'Swedish Massage', status: 'Completed' },
        { date: '2024-03-15', service: 'Aromatherapy', status: 'Completed' },
      ],
      paymentHistory: [
        { date: '2024-04-10', amount: 1500, status: 'Paid' },
        { date: '2024-03-15', amount: 1800, status: 'Paid' },
      ],
    },
    {
      id: 2,
      name: 'Emily Johnson',
      email: 'emily.johnson@example.com',
      phone: '+91 98765 43211',
      status: 'Active',
      address: '456 Relaxation St, Calm Town',
      age: '32',
      preferences: 'Facial Treatments',
      appointmentHistory: [
        { date: '2024-04-05', service: 'Basic Facial', status: 'Completed' },
      ],
      paymentHistory: [
        { date: '2024-04-05', amount: 800, status: 'Paid' },
      ],
    },
    {
      id: 3,
      name: 'Marcus Chen',
      email: 'marcus.chen@example.com',
      phone: '+91 98765 43212',
      status: 'Inactive',
      address: '789 Serenity Blvd, Peace City',
      age: '45',
      preferences: 'Hair Services',
      appointmentHistory: [],
      paymentHistory: [],
    },
  ])

  if (view === 'login') {
    return <LoginPage onSignIn={() => setView('dashboard')} />
  }

  return (
    <div className="app-frame">
      <AppShell view={view} onNav={setView} clients={clients} setClients={setClients} />
    </div>
  )
}

function AppShell({ view, onNav, clients, setClients }) {
  const meta = VIEW_META[view]
  const [collapsed, setCollapsed] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const showTopbarText = Boolean(meta.title || meta.subtitle)
  const isDashboard = view === 'dashboard'
  const showTopbar = showTopbarText || isDashboard

  return (
    <div className={`app-shell view-${view}${collapsed ? ' is-collapsed' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark small icon-crest icon-crest--brand icon-crest--compact" aria-hidden="true">
            <MaterialSymbol name="spa" className="text-[18px]" filled />
          </div>
          <div className="brand-text">
            <p className="brand-name">Movi Cloud Spa</p>
            <p className="brand-tagline">Relax. Refresh. Renew.</p>
          </div>
          <button
            type="button"
            className="sidebar-toggle"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setCollapsed((prev) => !prev)}
          >
            <MaterialSymbol name="chevron_left" className="text-[18px]" />
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Primary">
          {NAV_SECTIONS.map((section) => (
            <div className="nav-section" key={section.title}>
              <p className="nav-section-title">{section.title}</p>
              {section.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`nav-item${view === item.id ? ' is-active' : ''}${
                    item.disabled ? ' is-disabled' : ''
                  }`}
                  disabled={item.disabled}
                  onClick={() => {
                    if (!item.disabled) {
                      onNav(item.id)
                    }
                  }}
                >
                  <span className="nav-icon icon-crest icon-crest--muted icon-crest--compact">
                    <MaterialSymbol
                      name={item.icon}
                      className="text-[20px]"
                      filled={view === item.id}
                    />
                  </span>
                  <span className="nav-label">{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-pill">
            <button
              type="button"
              className="user-pill-main"
              onClick={() => setIsProfileOpen(true)}
              aria-label="Open profile"
            >
              <div className="avatar" aria-hidden="true"></div>
              <div>
                <p>Admin Name</p>
                <span>admin@movi.spa</span>
              </div>
            </button>
            <button
              type="button"
              className="logout-button"
              aria-label="Log out"
              onClick={() => {
                window.localStorage.removeItem('access_token')
                onNav('login')
              }}
            >
              <MaterialSymbol name="logout" className="text-[16px]" />
            </button>
          </div>
        </div>
      </aside>

      <main className="app-main">
        {showTopbar && (
          <header className={`topbar${isDashboard ? ' dashboard-topbar' : ''}`}>
            {isDashboard ? (
              <>
                <div className="topbar-left">
                  <p className="topbar-title">Dashboard</p>
                  <span className="topbar-pill">Overview</span>
                </div>
                <div className="topbar-right">
                  <div className="topbar-search">
                    <MaterialSymbol name="search" className="text-[18px]" />
                    <input
                      type="text"
                      placeholder="Search appointments or clients..."
                      aria-label="Search"
                    />
                  </div>
                  <button type="button" className="icon-pill" aria-label="Calendar">
                    <MaterialSymbol name="calendar_month" className="text-[18px]" />
                  </button>
                  <button type="button" className="icon-pill" aria-label="Clock">
                    <MaterialSymbol name="schedule" className="text-[18px]" />
                  </button>
                  <button type="button" className="icon-pill" aria-label="Alerts">
                    <MaterialSymbol name="notifications" className="text-[18px]" />
                  </button>
                </div>
              </>
            ) : (
              showTopbarText && (
                <div>
                  <p className="topbar-title">{meta.title}</p>
                  <p className="topbar-sub">{meta.subtitle}</p>
                </div>
              )
            )}
          </header>
        )}

        {view === 'dashboard' && <DashboardPage />}
        {view === 'services' && <ServicesPage />}
        {view === 'therapists' && <TherapistsPage />}
        {view === 'staff' && <StaffPage />}
        {view === 'rooms' && <RoomsPage />}
        {view === 'analytics' && <AnalyticsPage />}
        {view === 'insights' && <InsightsPage />}
        {view === 'clients' && <ClientsPage clients={clients} setClients={setClients} />}
        {view === 'appointments' && (
          <AppointmentsPage clients={clients} setClients={setClients} />
        )}
        {view === 'offers' && <OffersPage />}
        {view === 'settings' && <SettingsPage />}
      </main>

      {isProfileOpen && (
        <div className="profile-modal-overlay">
          <div className="profile-modal">
            <div className="profile-modal-header">
              <div>
                <h3>Profile Information</h3>
                <p>Manage your profile identity and admin credentials.</p>
              </div>
              <button type="button" className="profile-save">Save Changes</button>
            </div>

            <section className="profile-card">
              <div className="profile-card-top">
                <div className="profile-avatar"></div>
                <div>
                  <p className="profile-name">Profile Photo</p>
                  <span className="profile-meta">PNG, JPG up to 10MB</span>
                  <div className="profile-actions">
                    <button type="button" className="link-button">Update</button>
                    <button type="button" className="link-button danger">Remove</button>
                  </div>
                </div>
              </div>
              <div className="profile-grid">
                <label>
                  Full Name
                  <input type="text" defaultValue="Julian Montgomery" />
                </label>
                <label>
                  Email Address
                  <input type="email" defaultValue="julian@movi.spa" />
                </label>
                <label>
                  Role
                  <input type="text" defaultValue="Lead Administrator" />
                </label>
                <label>
                  Time Zone
                  <select defaultValue="GMT +5:30 Eastern Time">
                    <option>GMT +5:30 Eastern Time</option>
                    <option>GMT +1:00 Central Europe</option>
                    <option>GMT -5:00 Eastern Time</option>
                  </select>
                </label>
              </div>
            </section>

            <section className="profile-card">
              <div className="profile-section-head">
                <h4>Spa Operations</h4>
                <p>Customize the environment and booking rules for your sanctuary.</p>
              </div>
              <div className="profile-toggle-row">
                <div>
                  <h5>AI Treatment Recommendations</h5>
                  <span>Suggest rituals based on client history and profile.</span>
                </div>
                <button type="button" className="toggle is-on">
                  <span></span>
                </button>
              </div>
              <div className="profile-toggle-row">
                <div>
                  <h5>Automatic Waitlist</h5>
                  <span>Notify VIP tiers immediately when a slot opens up.</span>
                </div>
                <button type="button" className="toggle is-on">
                  <span></span>
                </button>
              </div>
              <div className="profile-toggle-row">
                <div>
                  <h5>Ambient Audio Integration</h5>
                  <span>Currently playing: Morning Spa (Acoustic Playlist)</span>
                </div>
                <button type="button" className="ghost-button">Configure</button>
              </div>
            </section>

            <section className="profile-card">
              <div className="profile-section-head">
                <h4>Notification Channels</h4>
                <p>How would you like to stay connected?</p>
              </div>
              <div className="notification-grid">
                <div className="notification-head">
                  <span>Notification Type</span>
                  <span>Push</span>
                  <span>Email</span>
                  <span>SMS</span>
                </div>
                {[
                  'New Bookings',
                  'Cancellations',
                  'Inventory Alerts',
                ].map((item) => (
                  <div className="notification-row" key={item}>
                    <span>{item}</span>
                    <input type="checkbox" defaultChecked />
                    <input type="checkbox" />
                    <input type="checkbox" />
                  </div>
                ))}
              </div>
            </section>

            <section className="profile-card danger-zone">
              <div>
                <h4>Danger Zone</h4>
                <p>Permanently delete your account and all spa data.</p>
              </div>
              <button type="button" className="ghost-button danger">Delete Account</button>
            </section>

            <button
              type="button"
              className="profile-modal-close"
              aria-label="Close"
              onClick={() => setIsProfileOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
