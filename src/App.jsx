import { useState } from 'react'
import './App.css'
import AppointmentsView from './frontend/AppointmentsPage.jsx'

const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" role="presentation">
        <rect x="3" y="3" width="7" height="7" rx="2" fill="none" />
        <rect x="14" y="3" width="7" height="7" rx="2" fill="none" />
        <rect x="3" y="14" width="7" height="7" rx="2" fill="none" />
        <rect x="14" y="14" width="7" height="7" rx="2" fill="none" />
      </svg>
    ),
  },
  {
    id: 'services',
    label: 'Services',
    icon: (
      <svg viewBox="0 0 24 24" role="presentation">
        <path
          d="M12 4c-2 3-3 5-3 8a3 3 0 0 0 6 0c0-3-1-5-3-8z"
          fill="none"
        />
        <path d="M6 13c0 4 3 7 6 7s6-3 6-7" fill="none" />
      </svg>
    ),
  },
  {
    id: 'therapists',
    label: 'Therapists',
    icon: (
      <svg viewBox="0 0 24 24" role="presentation">
        <circle cx="12" cy="8" r="4" fill="none" />
        <path d="M4 21c0-4 4-7 8-7s8 3 8 7" fill="none" />
      </svg>
    ),
  },
  {
    id: 'appointments',
    label: 'Appointments',
    icon: (
      <svg viewBox="0 0 24 24" role="presentation">
        <rect x="3" y="5" width="18" height="16" rx="3" fill="none" />
        <path d="M7 3v4M17 3v4M3 10h18" fill="none" />
      </svg>
    ),
  },
  {
    id: 'offers',
    label: 'Offers',
    icon: (
      <svg viewBox="0 0 24 24" role="presentation">
        <path
          d="M3 10l7-7h7l4 4v7l-7 7-11-11z"
          fill="none"
        />
        <circle cx="16" cy="8" r="1.5" fill="none" />
      </svg>
    ),
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
    title: 'My Journey',
    subtitle: 'Upcoming and past experiences at a glance.',
  },
  offers: {
    title: 'Signature Packages',
    subtitle: 'Limited availability for seasonal rituals and retreats.',
  },
}

function App() {
  const [view, setView] = useState('login')

  if (view === 'login') {
    return <LoginScreen onSignIn={() => setView('dashboard')} />
  }

  return (
    <div className="app-frame">
      <AppShell view={view} onNav={setView} />
    </div>
  )
}

function LoginScreen({ onSignIn }) {
  return (
    <div className="h-screen grid place-items-center overflow-hidden px-4">
      <div className="w-full max-w-[1200px] h-[calc(100vh-32px)] grid lg:grid-cols-2 rounded-[24px] overflow-hidden bg-card shadow-[0_25px_60px_rgba(31,77,62,0.18)]">
        <aside className="relative px-10 py-10 text-white flex flex-col gap-8 bg-gradient-to-br from-primary to-accent">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.18),transparent_45%)]"></div>
            <div className="absolute inset-[16%_12%_18%_12%] rounded-[28px] border border-white/15 bg-[linear-gradient(120deg,rgba(255,255,255,0.18),rgba(255,255,255,0))] shadow-[inset_0_0_80px_rgba(0,0,0,0.45)]"></div>
            <div className="absolute inset-[8%_22%_10%_22%] rounded-[22px] border border-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.55)]"></div>
          </div>

          <header className="relative z-10 flex items-center gap-3">
            <span className="h-9 w-9 rounded-xl bg-white/15 text-gold flex items-center justify-center backdrop-blur">
              <svg viewBox="0 0 64 64" role="presentation" className="h-5 w-5">
                <defs>
                  <linearGradient id="leafGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#f6d5a7" />
                    <stop offset="1" stopColor="#c8a97e" />
                  </linearGradient>
                </defs>
                <path
                  d="M32 8c9 6 14 16 13 26-1 10-8 18-18 20-9 2-19-3-22-11 6-10 15-20 27-35z"
                  fill="url(#leafGradient)"
                />
                <path
                  d="M16 20c-7 3-11 9-11 15 0 6 4 11 10 12 4-8 6-17 1-27z"
                  fill="url(#leafGradient)"
                  opacity="0.95"
                />
                <path
                  d="M47 20c7 3 11 9 11 15 0 6-4 11-10 12-4-8-6-17-1-27z"
                  fill="url(#leafGradient)"
                  opacity="0.95"
                />
                <path
                  d="M32 18v30"
                  fill="none"
                  stroke="url(#leafGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <div>
              <p className="font-heading text-lg tracking-[0.6px]">Movi Cloud Spa</p>
              <p className="text-[11px] uppercase tracking-[1.2px] text-white/70">
                Zen-modern sanctuary
              </p>
            </div>
          </header>

          <div className="relative z-10 space-y-4">
            <h1 className="text-[38px] leading-tight">
              Luxury Spa <em className="font-heading italic">Management</em> System
            </h1>
            <p className="text-[15px] text-white/80 max-w-[360px]">
              The definitive operating system for high-end wellness sanctuaries.
              Orchestrating tranquility through intelligent scheduling and
              concierge automation.
            </p>
          </div>

          <div className="relative z-10 mt-auto grid grid-cols-2 gap-3">
            {[
              {
                title: '99.9% reliable',
                subtitle: 'Uptime guaranteed',
                icon: (
                  <svg viewBox="0 0 24 24" role="presentation" className="h-4 w-4">
                    <path
                      d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M9 12l2 2 4-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
              },
              {
                title: '24/7 concierge',
                subtitle: 'Priority tech support',
                icon: (
                  <svg viewBox="0 0 24 24" role="presentation" className="h-4 w-4">
                    <path
                      d="M4 12a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <rect x="3" y="11" width="4" height="6" rx="2" />
                    <rect x="17" y="11" width="4" height="6" rx="2" />
                    <path
                      d="M12 16v2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur"
              >
                <span className="h-7 w-7 rounded-full bg-[radial-gradient(circle,_#f0d7b0,_#c8a97e)] text-[#1f4d3e] shadow-[0_0_0_6px_rgba(200,169,126,0.18)] flex items-center justify-center">
                  {item.icon}
                </span>
                <div>
                  <p className="text-[12px] uppercase tracking-[1px]">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-white/70">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

        </aside>

        <main className="bg-soft px-10 py-5 grid h-full grid-rows-[1fr_auto_auto] items-center gap-2">
          <div className="w-full max-w-[460px] justify-self-center rounded-[24px] bg-white/95 p-6 shadow-soft">
            <div className="space-y-2 text-center">
              <h2 className="text-[30px]">Welcome Back</h2>
              <p className="text-[14px] text-muted">
                Enter your credentials to access the management dashboard.
              </p>
            </div>

            <form
              className="mt-4 space-y-4"
              onSubmit={(event) => {
                event.preventDefault()
                onSignIn()
              }}
            >
              <label className="block text-[11px] uppercase tracking-[1px] text-muted">
                Email address
                <input
                  type="email"
                  placeholder="manager@movicloudspa.com"
                  aria-label="Email address"
                  className="mt-2 h-10 w-full rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] text-heading shadow-[0_8px_16px_rgba(31,77,62,0.06)] transition"
                />
              </label>

              <label className="block text-[11px] uppercase tracking-[1px] text-muted">
                Password
                <div className="relative mt-2">
                  <input
                    type="password"
                    placeholder="************"
                    aria-label="Password"
                    className="h-10 w-full rounded-[18px] border border-primary/15 bg-white px-4 pr-12 text-[14px] text-heading shadow-[0_8px_16px_rgba(31,77,62,0.06)] transition"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                    aria-label="Show"
                  >
                    <svg viewBox="0 0 24 24" role="presentation" className="h-5 w-5">
                      <path
                        d="M12 5c5.2 0 9.3 4.3 10.6 6-1.3 1.7-5.4 6-10.6 6S2.7 12.7 1.4 11C2.7 9.3 6.8 5 12 5z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <circle cx="12" cy="11" r="3" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              </label>

              <label className="block text-[11px] uppercase tracking-[1px] text-muted">
                Security code
                <div className="mt-2 grid grid-cols-[1fr_90px] gap-3">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0 0 0 0"
                    aria-label="Security code"
                    className="h-10 w-full rounded-[18px] border border-primary/15 bg-white px-4 text-center text-[14px] tracking-[6px] text-heading shadow-[0_8px_16px_rgba(31,77,62,0.06)] transition"
                  />
                  <div className="h-10 rounded-[18px] bg-primary text-white flex items-center justify-center font-heading tracking-[3px]">
                    K7R9
                  </div>
                </div>
              </label>

              <div className="flex items-center justify-between text-[12px] text-muted">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-primary" />
                  Remember me
                </label>
                <button type="button" className="text-accent">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="h-11 w-full rounded-full bg-gradient-to-br from-primary to-accent text-[12px] uppercase tracking-[1.2px] text-white shadow-[0_18px_28px_rgba(31,77,62,0.28)] transition-all duration-300 hover:scale-[1.02]"
              >
                Sign in to dashboard <span aria-hidden="true">&gt;</span>
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-[10px] uppercase tracking-[1.2px] text-muted">
                Secured by serenity protocols
              </p>
              <div className="mt-3 flex justify-center gap-3">
                {[
                  (
                    <svg viewBox="0 0 24 24" role="presentation" className="h-3 w-3">
                      <rect x="6" y="10" width="12" height="9" rx="2" />
                      <path
                        d="M9 10V7a3 3 0 0 1 6 0v3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                  (
                    <svg viewBox="0 0 24 24" role="presentation" className="h-3 w-3">
                      <path
                        d="M12 4c4 0 7 3 7 7 0 5-4 8-7 8s-7-3-7-8c0-4 3-7 7-7z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M12 8a3 3 0 0 1 3 3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M12 11v4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                  (
                    <svg viewBox="0 0 24 24" role="presentation" className="h-3 w-3">
                      <path
                        d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                    </svg>
                  ),
                ].map((icon, index) => (
                  <span
                    key={`secure-${index}`}
                    className="h-6 w-6 rounded-full border border-primary/10 bg-white text-primary flex items-center justify-center"
                  >
                    {icon}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] uppercase tracking-[1px] text-muted">
            <a className="transition-colors hover:text-primary" href="#privacy">
              Privacy policy
            </a>
            <a className="transition-colors hover:text-primary" href="#terms">
              Terms of service
            </a>
            <a className="transition-colors hover:text-primary" href="#support">
              Contact support
            </a>
          </div>

          <p className="text-center text-[11px] text-muted">
            2024 Serenity Sanctuary. All rights reserved.
          </p>
        </main>
      </div>
    </div>
  )
}

function AppShell({ view, onNav }) {
  const meta = VIEW_META[view]
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`app-shell view-${view}${collapsed ? ' is-collapsed' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark small" aria-hidden="true">
            <svg viewBox="0 0 64 64" role="presentation">
              <path
                d="M32 8c9 6 14 16 13 26-1 10-8 18-18 20-9 2-19-3-22-11 6-10 15-20 27-35z"
                fill="currentColor"
              />
              <path
                d="M16 20c-7 3-11 9-11 15 0 6 4 11 10 12 4-8 6-17 1-27z"
                fill="currentColor"
              />
              <path
                d="M47 20c7 3 11 9 11 15 0 6-4 11-10 12-4-8-6-17-1-27z"
                fill="currentColor"
              />
              <path
                d="M32 18v30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
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
            <svg viewBox="0 0 24 24" role="presentation">
              <path
                d="M9 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button type="button" className="settings-row">
            <span className="settings-icon">
              <svg viewBox="0 0 24 24" role="presentation">
                <path
                  d="M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z"
                  fill="none"
                />
                <path
                  d="M4 12c0-.4.1-.8.1-1.2l-2-1.5 2-3.4 2.4.7c.6-.5 1.2-.9 1.9-1.2L9 2h4l.6 2.9c.7.3 1.3.7 1.9 1.2l2.4-.7 2 3.4-2 1.5c.1.4.1.8.1 1.2s-.1.8-.1 1.2l2 1.5-2 3.4-2.4-.7c-.6.5-1.2.9-1.9 1.2L13 22H9l-.6-2.9c-.7-.3-1.3-.7-1.9-1.2l-2.4.7-2-3.4 2-1.5c0-.4-.1-.8-.1-1.2z"
                  fill="none"
                />
              </svg>
            </span>
            <span className="settings-label">Settings</span>
          </button>
          <div className="user-pill">
            <div className="avatar" aria-hidden="true"></div>
            <div>
              <p>Elena Rose</p>
              <span>Gold Member</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="app-main">
        <header className="topbar">
          <div>
            <p className="topbar-title">{meta.title}</p>
            <p className="topbar-sub">{meta.subtitle}</p>
          </div>
          <div className="topbar-actions">
            <button type="button" className="icon-pill" aria-label="Alerts">
              <svg viewBox="0 0 24 24" role="presentation">
                <path
                  d="M6 17h12c-1.5-1.6-2-4.1-2-6.5 0-3-1.8-5.5-4-5.5s-4 2.5-4 5.5c0 2.4-.5 4.9-2 6.5z"
                  fill="none"
                />
                <path
                  d="M10 19a2 2 0 0 0 4 0"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button type="button" className="icon-pill" aria-label="Profile">
              <svg viewBox="0 0 24 24" role="presentation">
                <circle cx="12" cy="9" r="4" fill="none" />
                <path d="M5 20c1.6-3.3 5-5 7-5s5.4 1.7 7 5" fill="none" />
              </svg>
            </button>
          </div>
        </header>

        {view === 'dashboard' && <DashboardView />}
        {view === 'services' && <ServicesView />}
        {view === 'therapists' && <TherapistsView />}
        {view === 'appointments' && <AppointmentsView />}
        {view === 'offers' && <OffersView />}
      </main>
    </div>
  )
}

function DashboardView() {
  return (
    <div className="view-body dashboard-view">
      <section className="dashboard-grid">
        <article className="feature-card primary">
          <span className="tag">
            <svg viewBox="0 0 24 24" role="presentation">
              <rect x="4" y="6" width="16" height="14" rx="3" fill="none" />
              <path d="M8 4v4M16 4v4M4 10h16" fill="none" />
            </svg>
            Next appointment
          </span>
          <div className="feature-content">
            <div>
              <h3>Swedish Massage Therapy</h3>
              <div className="feature-meta">
                <div className="info-item">
                  <span className="info-icon">
                    <svg viewBox="0 0 24 24" role="presentation">
                      <circle cx="12" cy="12" r="9" fill="none" />
                      <path d="M12 7v5l3 2" fill="none" />
                    </svg>
                  </span>
                  <div>
                    <p className="info-label">Time</p>
                    <p className="info-value">Tomorrow, 10:00 AM</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">
                    <svg viewBox="0 0 24 24" role="presentation">
                      <circle cx="12" cy="8" r="3" fill="none" />
                      <path d="M5 20c2-4 5-6 7-6s5 2 7 6" fill="none" />
                    </svg>
                  </span>
                  <div>
                    <p className="info-label">Therapist</p>
                    <p className="info-value">Marcus Thorne</p>
                  </div>
                </div>
              </div>
              <div className="pill-row">
                <button type="button" className="pill">Reschedule</button>
                <button type="button" className="pill ghost">Details</button>
              </div>
            </div>
            <div className="feature-media"></div>
          </div>
        </article>
        <aside className="insight-card">
          <p className="insight-title">Wellness insight</p>
          <div className="insight-meter">
            <span>15h</span>
            <small>Relaxation</small>
          </div>
          <p className="muted">80% towards your mindful goal.</p>
        </aside>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h4>Book Again</h4>
            <p className="muted">Quick access to your favorite rituals.</p>
          </div>
          <button type="button" className="link-button small">
            View history
          </button>
        </div>
        <div className="card-row">
          <div className="ritual-card teal">
            <div className="ritual-media face"></div>
            <h5>Deep Hydration Facial</h5>
            <span>Last visited: 2 weeks ago</span>
            <button type="button" className="ritual-action">
              <span className="ritual-action-icon">
                <svg viewBox="0 0 24 24" role="presentation">
                  <path d="M4 12h6l2-2 4 6 4-8" fill="none" />
                  <circle cx="6" cy="12" r="1" fill="currentColor" />
                </svg>
              </span>
              Book Again
            </button>
          </div>
          <div className="ritual-card amber">
            <div className="ritual-media stone"></div>
            <h5>Volcanic Stone Ritual</h5>
            <span>Last visited: 1 month ago</span>
            <button type="button" className="ritual-action">
              <span className="ritual-action-icon">
                <svg viewBox="0 0 24 24" role="presentation">
                  <path d="M4 12h6l2-2 4 6 4-8" fill="none" />
                  <circle cx="6" cy="12" r="1" fill="currentColor" />
                </svg>
              </span>
              Book Again
            </button>
          </div>
          <div className="ritual-card mint highlight">
            <div className="ritual-media float"></div>
            <h5>Floating Sanctuary</h5>
            <span>"Escape from gravity."</span>
            <button type="button" className="ritual-action primary">
              Book New
            </button>
          </div>
        </div>
      </section>
      <button type="button" className="fab" aria-label="Add">
        +
      </button>
    </div>
  )
}

function ServicesView() {
  return (
    <div className="view-body services-view">
      <section className="services-hero">
        <h3>Serene Rituals</h3>
        <p className="muted">
          Experience our curated collection of restorative therapies designed to
          align body, mind, and spirit.
        </p>
      </section>

      <div className="chip-row service-filters">
        <button className="chip active" type="button">All Treatments</button>
        <button className="chip" type="button">Aromatherapy</button>
        <button className="chip" type="button">Signature</button>
        <button className="chip" type="button">Detox</button>
        <button className="chip" type="button">Rapid Glow</button>
      </div>

      <div className="service-grid-large">
        {[
          {
            title: 'Ocean Drift Massage',
            desc:
              'A rhythmic movement ritual using warm sea-shell infusions to melt deep muscle tension.',
            meta: '60 min — $185',
            badge: 'Signature',
            tone: 'gold',
          },
          {
            title: 'Golden Hour Facial',
            desc:
              'A transformative treatment utilizing micro-currents and Vitamin C to restore youthful luminosity.',
            meta: '75 min — $220',
            badge: 'Bestseller',
            tone: 'pearl',
          },
          {
            title: 'Himalayan Salt Scrub',
            desc: 'Exfoliating ritual with mineral-rich salts to soften and renew.',
            meta: '45 min — $140',
            badge: 'New',
            tone: 'rose',
          },
        ].map((card) => (
          <article key={card.title} className={`service-tile ${card.tone}`}>
            <div className="service-image">
              <span className="service-badge">{card.badge}</span>
            </div>
            <div className="service-info">
              <h4>{card.title}</h4>
              <p className="muted">{card.desc}</p>
              <div className="service-footer">
                <span>{card.meta}</span>
                <button type="button" className="service-add">+</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="promo-row">
        <div className="promo-card">
          <span className="promo-icon">
            <svg viewBox="0 0 24 24" role="presentation">
              <path d="M12 4c4 0 7 3 7 7 0 5-4 8-7 8s-7-3-7-8c0-4 3-7 7-7z" fill="none" />
              <path d="M12 9a3 3 0 0 1 3 3" fill="none" />
            </svg>
          </span>
          <div>
            <p className="promo-label">New Ritual</p>
            <h4>Celestial Sound Bath</h4>
            <p className="muted">Available June 1st</p>
          </div>
          <button type="button" className="pill">Learn More</button>
        </div>
      </div>
    </div>
  )
}

function TherapistsView() {
  return (
    <div className="view-body">
      <section className="chip-row">
        {['All therapists', 'Deep tissue', 'Ayurvedic', 'Available today', 'Energy work', 'Sports therapy'].map(
          (chip) => (
            <button
              key={chip}
              className={`chip${chip === 'All therapists' ? ' active' : ''}`}
              type="button"
            >
              {chip}
            </button>
          )
        )}
      </section>

      <section className="therapist-hero">
        <div className="therapist-portrait"></div>
        <div className="therapist-quote">
          <p className="quote">Balance is not something you find, it is something you create.</p>
          <p className="muted">Dr. Maya Chen, Lead holistic practitioner</p>
          <button type="button" className="pill">Read more</button>
        </div>
        <div className="therapist-copy">
          <h3>Mastering the art of restoration.</h3>
          <p className="muted">
            Each therapist at Sanctuary is hand-selected for their technical
            mastery and empathetic presence.
          </p>
          <div className="status-pill">12 therapists available today</div>
        </div>
      </section>

      <section className="card-row">
        {[
          { name: 'Sarah Jenkins', role: 'Deep tissue expert' },
          { name: 'Julian Reed', role: 'Sports therapy' },
          { name: 'Elena Moretti', role: 'Energy work' },
        ].map((therapist) => (
          <div key={therapist.name} className="therapist-card">
            <div className="avatar large"></div>
            <h5>{therapist.name}</h5>
            <span>{therapist.role}</span>
          </div>
        ))}
      </section>

      <div className="cta-banner">
        <div>
          <h4>Unsure who to choose?</h4>
          <p className="muted">Take our 2-minute matching quiz.</p>
        </div>
        <button type="button" className="pill">Start quiz</button>
      </div>
    </div>
  )
}

function OffersView() {
  return (
    <div className="view-body">
      <div className="offers-grid">
        <article className="offer-hero">
          <span className="tag">Ending in 48h</span>
          <div>
            <h3>Signature Packages</h3>
            <p className="muted">Exclusive rituals crafted for seasonal renewal.</p>
          </div>
          <div className="offer-media"></div>
          <div className="offer-banner">
            <p>Special gift for you</p>
            <button type="button" className="pill">Claim benefit</button>
          </div>
        </article>

        <aside className="offer-side">
          <div className="rewards-card">
            <p className="muted">My rewards</p>
            <h4>300</h4>
            <span>200 points until your next complimentary session.</span>
          </div>
          <div className="offer-card">
            <div className="offer-thumb"></div>
            <div>
              <h5>Sage Ritual</h5>
              <p className="muted">
                Full-body exfoliation with wild harvested sage and sea minerals.
              </p>
              <div className="price-row">
                <strong>$110</strong>
                <span>$145</span>
              </div>
            </div>
            <button type="button" className="pill">&gt;</button>
          </div>
          <div className="offer-card">
            <div className="offer-thumb floral"></div>
            <div>
              <h5>Bloom reset</h5>
              <p className="muted">Rehydrate and glow with botanical oils.</p>
            </div>
            <button type="button" className="pill">&gt;</button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default App
