import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../api/apiClient.js'
import CalendarPopover from '../components/CalendarPopover.jsx'
import HistoryPopover from '../components/HistoryPopover.jsx'
import MaterialSymbol from '../components/MaterialSymbol.jsx'
import usePageHistory from '../hooks/usePageHistory.js'
import { filterByMonth } from '../utils/dateFilter.js'

const DEFAULT_THERAPISTS = [
  {
    id: 1,
    name: 'Dr. Elise Preston',
    specialty: 'Lead Practitioner',
    role: 'Integrative Wellness',
    status: 'Available',
    statusClass: 'available',
    imageClass: 'elise',
    photo_url:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Julian Thorne',
    specialty: 'Aromatherapy Specialist',
    role: 'Mindful Healing',
    status: 'In Session',
    statusClass: 'session',
    imageClass: 'julian',
    photo_url:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Sophie Chase',
    specialty: 'Senior Esthetician',
    role: 'Holistic Skincare',
    status: 'Available',
    statusClass: 'available',
    imageClass: 'sophie',
    photo_url:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80',
  },
]

const THERAPIST_PHOTOS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80',
]

export default function TherapistManagement({ onToggleNotifications, onCloseNotifications }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [therapists, setTherapists] = useState(DEFAULT_THERAPISTS)
  const [statusMessage, setStatusMessage] = useState('')
  const [filterDate, setFilterDate] = useState(null)
  const [calendarMonth, setCalendarMonth] = useState(() => new Date().getMonth())
  const [calendarYear, setCalendarYear] = useState(() => new Date().getFullYear())
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [newTherapist, setNewTherapist] = useState({
    name: '',
    specialty: '',
    role: '',
    status: 'Available',
    bio: '',
  })

  useEffect(() => {
    apiGet('/api/therapists')
      .then((data) => setTherapists(data || DEFAULT_THERAPISTS))
      .catch(() => setTherapists(DEFAULT_THERAPISTS))
  }, [])

  const filteredTherapists = filterByMonth(
    therapists.filter((therapist) =>
      therapist.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    filterDate,
    (therapist) => therapist.last_session_date || therapist.created_at
  )

  const therapistHistory = usePageHistory('therapists', isHistoryOpen)
  const filteredHistory = filterByMonth(therapistHistory, filterDate, (item) => item.date)

  const shiftMonth = (delta) => {
    const nextMonth = calendarMonth + delta
    if (nextMonth < 0) {
      setCalendarMonth(11)
      setCalendarYear((prev) => prev - 1)
      return
    }
    if (nextMonth > 11) {
      setCalendarMonth(0)
      setCalendarYear((prev) => prev + 1)
      return
    }
    setCalendarMonth(nextMonth)
  }

  const handleSaveTherapist = async () => {
    setStatusMessage('')
    try {
      const payload = {
        name: newTherapist.name,
        specialty: newTherapist.specialty,
        role: newTherapist.role,
        status: newTherapist.status,
        created_at: new Date().toISOString().slice(0, 10),
        last_session_date: new Date().toISOString().slice(0, 10),
        photo_url: THERAPIST_PHOTOS[therapists.length % THERAPIST_PHOTOS.length],
      }
      const saved = await apiPost('/api/therapists', payload)
      setTherapists([...therapists, saved])
      setNewTherapist({ name: '', specialty: '', role: '', status: 'Available', bio: '' })
      setIsAddOpen(false)
      setStatusMessage('Specialist added successfully.')
    } catch (error) {
      setStatusMessage(error.message || 'Unable to add specialist.')
    }
  }

  const resolveStatusClass = (therapist) => {
    if (therapist.statusClass) return therapist.statusClass
    const status = (therapist.status || '').toLowerCase()
    if (status.includes('session')) return 'session'
    return 'available'
  }

  const resolveTherapistImage = (therapist, index) =>
    therapist.photo_url || THERAPIST_PHOTOS[index % THERAPIST_PHOTOS.length]

  return (
    <div className="view-body therapists-view">
      {statusMessage && <p className="therapists-status">{statusMessage}</p>}
      <header className="therapists-topbar">
        <h2>Therapists</h2>
        <div className="therapists-topbar-right action-popover-anchor">
          <div className="therapists-search">
            <MaterialSymbol name="search" className="text-[18px]" />
            <input
              type="text"
              placeholder="Search specialists..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
          <button
            type="button"
            className="icon-pill"
            aria-label="Calendar"
            onClick={() => {
              onCloseNotifications?.()
              setIsCalendarOpen((prev) => !prev)
              setIsHistoryOpen(false)
            }}
          >
            <MaterialSymbol name="calendar_month" className="text-[18px]" />
          </button>
          <button
            type="button"
            className="icon-pill"
            aria-label="Clock"
            onClick={() => {
              onCloseNotifications?.()
              setIsHistoryOpen((prev) => !prev)
              setIsCalendarOpen(false)
            }}
          >
            <MaterialSymbol name="schedule" className="text-[18px]" />
          </button>
          <button
            type="button"
            className="icon-pill"
            aria-label="Alerts"
            onClick={onToggleNotifications}
          >
            <MaterialSymbol name="notifications" className="text-[18px]" />
          </button>
          {isCalendarOpen && (
            <CalendarPopover
              selectedDate={filterDate}
              month={calendarMonth}
              year={calendarYear}
              onPrev={() => shiftMonth(-1)}
              onNext={() => shiftMonth(1)}
              onSelectDate={(date) => {
                setFilterDate(date)
                setIsCalendarOpen(false)
              }}
              onClear={() => {
                setFilterDate(null)
                setIsCalendarOpen(false)
              }}
              onClose={() => setIsCalendarOpen(false)}
            />
          )}
          {isHistoryOpen && (
            <HistoryPopover
              title="Therapists History"
              items={filteredHistory}
              onClose={() => setIsHistoryOpen(false)}
            />
          )}
        </div>
      </header>

      <section className="therapists-hero">
        <div>
          <p className="therapists-eyebrow">Our Practitioners</p>
          <h3>Masters of Healing & Holistic Wellness</h3>
        </div>
        <button
          type="button"
          className="primary-button therapists-cta"
          onClick={() => setIsAddOpen(true)}
        >
          <MaterialSymbol name="add" className="text-[18px]" />
          Add New Specialist
        </button>
      </section>

      <section className="therapists-grid">
        {filteredTherapists.map((therapist, index) => (
          <article className="therapist-card" key={therapist.id}>
            <div
              className={`therapist-media ${therapist.imageClass || 'elise'}`}
              style={{ backgroundImage: `url(${resolveTherapistImage(therapist, index)})` }}
            >
              <span className={`therapist-status ${resolveStatusClass(therapist)}`}>
                {therapist.status}
              </span>
            </div>
            <div className="therapist-info">
              <p>{therapist.specialty}</p>
              <h4>{therapist.name}</h4>
              <span>{therapist.role}</span>
            </div>
          </article>
        ))}
      </section>

      {isAddOpen && (
        <div className="therapist-modal-overlay">
          <div className="therapist-modal">
            <div className="therapist-modal-header">
              <div>
                <p className="therapist-modal-breadcrumb">Therapist / Add New Specialist</p>
                <h3>New Practitioner</h3>
                <p>
                  Expand your wellness team. Fill in the details below to register a new specialist
                  into the digital sanctuary ecosystem.
                </p>
              </div>
              <button
                type="button"
                className="therapist-modal-close"
                onClick={() => setIsAddOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form
              className="therapist-modal-grid"
              onSubmit={(event) => {
                event.preventDefault()
                handleSaveTherapist()
              }}
            >
              <section className="therapist-form-card">
                <div className="therapist-card-head">
                  <MaterialSymbol name="badge" className="text-[18px]" />
                  <h4>Basic Information</h4>
                </div>
                <label>
                  Full Name
                  <input
                    type="text"
                    placeholder="e.g. Dr. Helena Vance"
                    value={newTherapist.name}
                    onChange={(event) => setNewTherapist({ ...newTherapist, name: event.target.value })}
                    required
                  />
                </label>
                <label>
                  Professional Biography
                  <textarea
                    rows={5}
                    placeholder="Describe the practitioner's philosophy and background..."
                    value={newTherapist.bio}
                    onChange={(event) => setNewTherapist({ ...newTherapist, bio: event.target.value })}
                  />
                </label>
              </section>

              <section className="therapist-side">
                <div className="therapist-upload-card">
                  <p>Profile Image</p>
                  <div className="upload-box">
                    <MaterialSymbol name="add_a_photo" className="text-[22px]" />
                    <span>Upload Portrait</span>
                  </div>
                  <small>Recommended: 800x800px. High-resolution portrait with a neutral background.</small>
                </div>
                <div className="therapist-quick-card">
                  <h5>Quick Settings</h5>
                  <div>
                    <span>Profile Status</span>
                    <strong>Draft</strong>
                  </div>
                  <div>
                    <span>Booking Priority</span>
                    <strong>Standard</strong>
                  </div>
                  <div>
                    <span>Onboarding</span>
                    <strong>Pending</strong>
                  </div>
                </div>
              </section>
              <div className="therapist-modal-actions">
                {statusMessage && <span className="therapist-status-message">{statusMessage}</span>}
                <button type="submit" className="primary-button">
                  Save Specialist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
