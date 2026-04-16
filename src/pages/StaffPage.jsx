import { useState } from 'react'
import MaterialSymbol from '../components/MaterialSymbol.jsx'

const STAFF_MEMBERS = [
  {
    id: 1,
    name: 'Elena Rodriguez',
    role: 'Head Esthetician',
    tag: 'Senior',
    status: 'Active Today',
    statusClass: 'active',
  },
  {
    id: 2,
    name: 'Marcus Thorne',
    role: 'Sports Massage Specialist',
    tag: 'Lead',
    status: 'In Treatment',
    statusClass: 'treatment',
  },
  {
    id: 3,
    name: 'Sasha Chen',
    role: 'Guest Relations Manager',
    tag: 'Front Desk',
    status: 'Shift Started',
    statusClass: 'shift',
  },
  {
    id: 4,
    name: 'Julian Vane',
    role: 'Aromatherapy Specialist',
    tag: 'Therapist',
    status: 'Off Duty',
    statusClass: 'off',
  },
]

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOnboardOpen, setIsOnboardOpen] = useState(false)

  const visibleStaff = STAFF_MEMBERS.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="view-body staff-view">
      <header className="staff-topbar">
        <h2 className="staff-title">Staff</h2>
        <div className="staff-topbar-right">
          <div className="staff-search">
            <MaterialSymbol name="search" className="text-[18px]" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <div className="staff-icon-row">
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
        </div>
      </header>

      <section className="staff-hero">
        <div>
          <p className="staff-eyebrow">Our Dedicated Team</p>
          <h3 className="staff-headline">Nurturing excellence through expert care.</h3>
          <p className="staff-description">
            Meet the professionals behind Movi Cloud Spa. Manage roles, track shift availability,
            and optimize your sanctuary’s service delivery.
          </p>
        </div>
        <button
          type="button"
          className="primary-button staff-cta"
          onClick={() => setIsOnboardOpen(true)}
        >
          <MaterialSymbol name="person_add" className="text-[18px]" />
          Onboard New Staff
        </button>
      </section>

      <section className="staff-grid">
        {visibleStaff.map((member) => (
          <article className="staff-card" key={member.id}>
            <div className="staff-card-top">
              <div className="staff-photo" aria-hidden="true"></div>
              <span className="staff-tag">{member.tag}</span>
            </div>
            <div className="staff-info">
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </div>
            <div className={`staff-status ${member.statusClass}`}>
              <span className="status-dot"></span>
              {member.status}
            </div>
            <button type="button" className="staff-button">View Profile</button>
          </article>
        ))}
      </section>

      {isOnboardOpen && (
        <div className="staff-modal-overlay">
          <div className="staff-modal">
            <button
              type="button"
              className="staff-modal-close"
              aria-label="Close"
              onClick={() => setIsOnboardOpen(false)}
            >
              ✕
            </button>
            <div className="staff-modal-content">
              <aside className="staff-modal-left">
                <p className="staff-modal-breadcrumb">Staff / Onboard New Staff</p>
                <h3>Expansion of the Sanctuary</h3>
                <p>
                  Adding new talent to our wellness ecosystem ensures the harmony and premium
                  service our guests expect. Please complete the professional dossier for the new
                  staff member.
                </p>
                <div className="staff-modal-checklist">
                  <div className="staff-check-card">
                    <span className="check-icon">
                      <MaterialSymbol name="verified_user" className="text-[18px]" />
                    </span>
                    <div>
                      <h5>Identity Check</h5>
                      <span>Verify legal documentation before finalizing onboard.</span>
                    </div>
                  </div>
                  <div className="staff-check-card">
                    <span className="check-icon">
                      <MaterialSymbol name="lock" className="text-[18px]" />
                    </span>
                    <div>
                      <h5>Secure Access</h5>
                      <span>Permission levels dictate digital vault access.</span>
                    </div>
                  </div>
                </div>
                <div className="staff-philosophy">
                  <div className="staff-philosophy-card">
                    <p className="philosophy-tag">Our Philosophy</p>
                    <p className="philosophy-quote">“Peace is the foundation of all we build.”</p>
                    <p className="philosophy-brand">Movi Cloud Spa Culture</p>
                  </div>
                </div>
              </aside>
              <section className="staff-modal-form">
                <div className="staff-form-card">
                  <h4>Professional Identity</h4>
                  <div className="staff-form-row">
                    <label>
                      Legal Full Name
                      <input type="text" placeholder="e.g. Julian Thorne" />
                    </label>
                    <label>
                      Professional Role
                      <input type="text" placeholder="e.g. Senior Esthetician" />
                    </label>
                  </div>

                  <h4>Sanctuary Placement</h4>
                  <div className="staff-placement">
                    <button type="button" className="placement-card">
                      <MaterialSymbol name="support_agent" className="text-[18px]" />
                      Front Desk
                    </button>
                    <button type="button" className="placement-card is-active">
                      <MaterialSymbol name="spa" className="text-[18px]" />
                      Therapy
                    </button>
                    <button type="button" className="placement-card">
                      <MaterialSymbol name="cleaning_services" className="text-[18px]" />
                      Cleaning
                    </button>
                  </div>

                  <div className="staff-form-row">
                    <label>
                      Email Address
                      <input type="email" placeholder="julian@sanctuary.com" />
                    </label>
                    <label>
                      Contact Phone
                      <input type="tel" placeholder="+1 (555) 000-0000" />
                    </label>
                  </div>

                  <div className="staff-permissions">
                    <div className="permissions-head">
                      <span>Permissions Level</span>
                      <span className="permission-pill">Level 2: Standard Staff</span>
                    </div>
                    <div className="permissions-bar">
                      <span></span>
                    </div>
                    <div className="permissions-labels">
                      <span>Trainee</span>
                      <span>Staff</span>
                      <span>Manager</span>
                      <span>Executive</span>
                    </div>
                  </div>

                  <div className="staff-form-footer">
                    <p>
                      By initiating onboarding, you agree to generate a digital credential and
                      welcome sequence for the new member.
                    </p>
                    <button type="button" className="primary-button">
                      Onboard Staff
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
