import { useState } from 'react'
import './App.css'
import MaterialSymbol from './components/MaterialSymbol.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import TherapistsPage from './pages/TherapistsPage.jsx'
import ClientsPage from './pages/ClientsPage.jsx'
import AppointmentsPage from './pages/AppointmentsPage.jsx'
import OffersPage from './pages/OffersPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'services', label: 'Services', icon: 'spa' },
  { id: 'therapists', label: 'Therapists', icon: 'person' },
  { id: 'clients', label: 'Clients', icon: 'groups' },
  { id: 'appointments', label: 'Appointments', icon: 'calendar_month' },
  { id: 'offers', label: 'Offers', icon: 'sell' },
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
    title: 'Client Management',
    subtitle: 'View client profiles, bookings, and loyalty details.',
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
  const [view, setView] = useState('login')
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
  const showTopbarText = Boolean(meta.title || meta.subtitle)
  const showTopbarActions = view === 'dashboard'
  const showTopbar = showTopbarText || showTopbarActions

  return (
    <div className={`app-shell view-${view}${collapsed ? ' is-collapsed' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark small icon-crest icon-crest--brand icon-crest--compact" aria-hidden="true">
            <MaterialSymbol name="spa" className="text-[18px]" filled />
          </div>
          <div className="brand-text">
            <p className="brand-name">Movi Cloud Spa</p>
            <p className="brand-tagline">Zen-modern spa</p>
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
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-item${view === item.id ? ' is-active' : ''}`}
              onClick={() => onNav(item.id)}
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
        </nav>

        <div className="sidebar-footer">
          <button
            type="button"
            className={`settings-row${view === 'settings' ? ' is-active' : ''}`}
            onClick={() => onNav('settings')}
          >
            <span className="settings-icon icon-crest icon-crest--muted icon-crest--compact">
              <MaterialSymbol
                name="settings"
                className="text-[16px]"
                filled={view === 'settings'}
              />
            </span>
            <span className="settings-label">Settings</span>
          </button>
          <div className="user-pill">
            <div className="avatar" aria-hidden="true"></div>
            <div>
              <p>Elena Rose</p>
              <span>Gold Member</span>
            </div>
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
          <header className="topbar">
            {showTopbarText && (
              <div>
                <p className="topbar-title">{meta.title}</p>
                <p className="topbar-sub">{meta.subtitle}</p>
              </div>
            )}
            {showTopbarActions && (
              <div className="topbar-actions">
                <button
                  type="button"
                  className="icon-pill icon-crest icon-crest--muted"
                  aria-label="Alerts"
                >
                  <MaterialSymbol name="notifications" className="text-[20px]" />
                </button>
              </div>
            )}
          </header>
        )}

        {view === 'dashboard' && <DashboardPage />}
        {view === 'services' && <ServicesPage />}
        {view === 'therapists' && <TherapistsPage />}
        {view === 'clients' && <ClientsPage clients={clients} setClients={setClients} />}
        {view === 'appointments' && (
          <AppointmentsPage clients={clients} setClients={setClients} />
        )}
        {view === 'offers' && <OffersPage />}
        {view === 'settings' && <SettingsPage />}
      </main>
    </div>
  )
}

export default App
