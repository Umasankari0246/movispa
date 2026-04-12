import { useState } from 'react'
import './App.css'
import AppointmentsView from './frontend/AppointmentsPage.jsx'
import TherapistManagement from './frontend/TherapistManagement.jsx'
import MaterialSymbol from './components/MaterialSymbol.jsx'
import heroImage from './assets/hero.png'

const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
  },
  {
    id: 'services',
    label: 'Services',
    icon: 'spa',
  },
  {
    id: 'therapists',
    label: 'Therapists',
    icon: 'person',
  },
  {
    id: 'appointments',
    label: 'Appointments',
    icon: 'calendar_month',
  },
  {
    id: 'offers',
    label: 'Offers',
    icon: 'sell',
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
            <span className="icon-crest icon-crest--brand icon-crest--compact h-9 w-9 rounded-xl bg-white/15 text-gold flex items-center justify-center backdrop-blur">
              <MaterialSymbol name="spa" className="text-[20px]" filled />
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
                icon: <MaterialSymbol name="verified_user" className="text-[16px]" />,
              },
              {
                title: '24/7 concierge',
                subtitle: 'Priority tech support',
                icon: <MaterialSymbol name="support_agent" className="text-[16px]" />,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur"
              >
                <span className="icon-crest icon-crest--metric icon-crest--compact h-7 w-7 rounded-full bg-[radial-gradient(circle,_#f0d7b0,_#c8a97e)] text-[#1f4d3e] shadow-[0_0_0_6px_rgba(200,169,126,0.18)] flex items-center justify-center">
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
                    <MaterialSymbol name="visibility" className="text-[20px]" />
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
                  <MaterialSymbol name="lock" className="text-[14px]" key="lock" />,
                  <MaterialSymbol name="policy" className="text-[14px]" key="policy" />,
                  <MaterialSymbol name="verified_user" className="text-[14px]" key="secure" />,
                ].map((icon, index) => (
                  <span
                    key={`secure-${index}`}
                    className="icon-crest icon-crest--security icon-crest--compact h-6 w-6 rounded-full border border-primary/10 bg-white text-primary flex items-center justify-center"
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
          <button type="button" className="settings-row">
            <span className="settings-icon icon-crest icon-crest--muted icon-crest--compact">
              <MaterialSymbol name="settings" className="text-[16px]" />
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

        {view === 'dashboard' && <DashboardView />}
        {view === 'services' && <ServicesView />}
        {view === 'therapists' && <TherapistManagement />}
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
            <MaterialSymbol name="event" className="text-[12px]" />
            Next appointment
          </span>
          <div className="feature-content">
            <div>
              <h3>Swedish Massage Therapy</h3>
              <div className="feature-meta">
                <div className="info-item">
                  <span className="info-icon icon-crest icon-crest--muted icon-crest--compact">
                    <MaterialSymbol name="schedule" className="text-[16px]" />
                  </span>
                  <div>
                    <p className="info-label">Time</p>
                    <p className="info-value">Tomorrow, 10:00 AM</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon icon-crest icon-crest--muted icon-crest--compact">
                    <MaterialSymbol name="medical_services" className="text-[16px]" />
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
            <div className="feature-media">
              <img
                src={heroImage}
                alt="Spa wellness setup"
                className="feature-media-image"
              />
            </div>
          </div>
        </article>
        <aside className="insight-card">
          <p className="insight-title">Wellness insight</p>
          <div className="insight-meter">
            <div className="insight-meter-content">
              <span>15h</span>
              <small>Relaxation</small>
            </div>
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
              <span className="ritual-action-icon icon-crest icon-crest--muted icon-crest--compact">
                <MaterialSymbol name="autorenew" className="text-[14px]" />
              </span>
              Book Again
            </button>
          </div>
          <div className="ritual-card amber">
            <div className="ritual-media stone"></div>
            <h5>Volcanic Stone Ritual</h5>
            <span>Last visited: 1 month ago</span>
            <button type="button" className="ritual-action">
              <span className="ritual-action-icon icon-crest icon-crest--muted icon-crest--compact">
                <MaterialSymbol name="autorenew" className="text-[14px]" />
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
        <MaterialSymbol name="add" className="text-[24px]" />
      </button>
    </div>
  )
}

function ServicesView() {
  return (
    <div className="view-body services-view">
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
          <span className="promo-icon icon-crest icon-crest--muted">
            <MaterialSymbol name="auto_awesome" className="text-[18px]" />
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
