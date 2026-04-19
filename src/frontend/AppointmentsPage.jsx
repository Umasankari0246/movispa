import { useEffect, useMemo, useState } from 'react'
import { apiGet, apiPost } from '../api/apiClient.js'
import CalendarPopover from '../components/CalendarPopover.jsx'
import HistoryPopover from '../components/HistoryPopover.jsx'
import MaterialSymbol from '../components/MaterialSymbol.jsx'
import usePageHistory from '../hooks/usePageHistory.js'
import { filterByMonth } from '../utils/dateFilter.js'

const DEFAULT_CALENDAR_DAYS = [
  { day: 29, muted: true },
  { day: 30, muted: true },
  { day: 1, events: ['9:00 AM'] },
  { day: 2 },
  { day: 3, events: ['1:30 PM', '4:00 PM'] },
  { day: 4 },
  { day: 5 },
  { day: 6 },
  { day: 7, events: ['10:00 AM'] },
  { day: 8 },
  { day: 9 },
  { day: 10, events: ['10:30 AM'] },
  { day: 11 },
  { day: 12 },
]

const DEFAULT_UPCOMING = [
  {
    name: 'Elena Gilbert',
    service: 'Deep Tissue Massage',
    status: 'Active',
    time: '10:00 - 11:30 AM',
    therapist: 'Dr. Julianne S.',
  },
  {
    name: 'Marcus Vane',
    service: 'Facial Cleansing',
    status: 'Upcoming',
    time: '01:45 - 02:45 PM',
    therapist: 'Therapist Ryan',
  },
  {
    name: 'Sarah Koenig',
    service: 'Full Body Detox',
    status: 'Upcoming',
    time: '04:00 - 05:30 PM',
    therapist: 'Dr. Elena M.',
  },
]

const DEFAULT_OCCUPANCY = [
  { name: 'Zen Suite', value: 68 },
  { name: 'Lotus Room', value: 42 },
  { name: 'Ocean Mist Hall', value: 78 },
]

const DEFAULT_AVAILABILITY = [
  { name: 'Dr. Julianne', status: 'Available' },
  { name: 'Ryan H.', status: 'In Session' },
  { name: 'Marcus L.', status: 'Available' },
  { name: 'Elena M.', status: 'Off Duty' },
]

const toDateKey = (value) => {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString().slice(0, 10)
}

const parseTimeLabel = (value) => {
  if (!value) return 'Appointment'
  const parts = String(value).split('-')
  return parts[0]?.trim() || value
}

const formatEventLabel = (item) => {
  if (!item) return 'Appointment'
  const time = parseTimeLabel(item.time)
  if (!item.name) return time
  return `${time} ${item.name}`
}

const buildCalendarGrid = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevMonthDays = new Date(year, month, 0).getDate()
  const cells = []

  for (let i = 0; i < firstDay; i += 1) {
    const day = prevMonthDays - firstDay + i + 1
    cells.push({ day, muted: true, date: new Date(year, month - 1, day) })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, muted: false, date: new Date(year, month, day) })
  }

  const remainder = cells.length % 7
  if (remainder !== 0) {
    const fill = 7 - remainder
    for (let day = 1; day <= fill; day += 1) {
      cells.push({ day, muted: true, date: new Date(year, month + 1, day) })
    }
  }

  return cells
}

const formatDisplayDate = (value) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

const resolveLegacyCalendarDate = (item, year, month) => {
  if (!item || typeof item.day !== 'number') return null
  if (!item.muted) return new Date(year, month, item.day)
  if (item.day > 20) return new Date(year, month - 1, item.day)
  return new Date(year, month + 1, item.day)
}

export default function AppointmentsView({ onToggleNotifications, onCloseNotifications }) {
  const [viewMode, setViewMode] = useState('calendar')
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [filterDate, setFilterDate] = useState(null)
  const [calendarMonth, setCalendarMonth] = useState(() => new Date().getMonth())
  const [calendarYear, setCalendarYear] = useState(() => new Date().getFullYear())
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [appointmentsData, setAppointmentsData] = useState({
    calendar_days: DEFAULT_CALENDAR_DAYS,
    upcoming_today: DEFAULT_UPCOMING,
    room_occupancy: DEFAULT_OCCUPANCY,
    therapist_availability: DEFAULT_AVAILABILITY,
    new_appointment: {
      time_slots: ['09:00 AM', '10:30 AM', '12:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'],
      rooms: [
        { name: 'Eucalyptus Sanctuary', status: 'Free' },
        { name: 'Waterfall Room', status: 'In Use' },
      ],
      status_options: ['Confirmed', 'Pending'],
    },
  })
  const [statusMessage, setStatusMessage] = useState('')
  const [newAppointment, setNewAppointment] = useState({
    name: '',
    service: 'Deep Tissue Renewal (90 min)',
    therapist: 'Elena Vance',
    time: '10:30 AM',
    room: 'Eucalyptus Sanctuary',
    status: 'Confirmed',
  })

  useEffect(() => {
    apiGet('/api/appointments')
      .then((data) => {
        if (!data) return
        setAppointmentsData((prev) => ({
          ...prev,
          ...data,
          new_appointment: data.new_appointment || prev.new_appointment,
        }))
      })
      .catch(() => {})
  }, [])

  const filteredUpcoming = appointmentsData.upcoming_today.filter((item) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      item.name.toLowerCase().includes(query) ||
      item.service.toLowerCase().includes(query) ||
      item.therapist.toLowerCase().includes(query)
    )
  })

  const dateFilteredUpcoming = filterByMonth(
    filteredUpcoming,
    filterDate,
    (item) => item.date
  )

  const eventsByDate = useMemo(() => {
    const map = {}
    appointmentsData.upcoming_today.forEach((item) => {
      const key = toDateKey(item.date)
      if (!key) return
      if (!map[key]) map[key] = []
      map[key].push(formatEventLabel(item))
    })
    appointmentsData.calendar_days.forEach((item) => {
      const date = resolveLegacyCalendarDate(item, calendarYear, calendarMonth)
      const key = toDateKey(date)
      if (!key || !item.events?.length) return
      if (!map[key]) map[key] = []
      item.events.forEach((event) => map[key].push(event))
    })
    return map
  }, [appointmentsData.calendar_days, appointmentsData.upcoming_today, calendarMonth, calendarYear])

  const calendarCells = useMemo(() => {
    const cells = buildCalendarGrid(calendarYear, calendarMonth)
    return cells.map((cell) => {
      const key = toDateKey(cell.date)
      return {
        ...cell,
        key,
        events: key && eventsByDate[key] ? eventsByDate[key] : [],
      }
    })
  }, [calendarMonth, calendarYear, eventsByDate])

  const monthLabel = useMemo(
    () =>
      new Date(calendarYear, calendarMonth, 1).toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
    [calendarMonth, calendarYear]
  )

  const todayKey = toDateKey(new Date())
  const todayCount = todayKey ? (eventsByDate[todayKey] || []).length : 0

  const appointmentsHistory = usePageHistory('appointments', isHistoryOpen)
  const filteredHistory = filterByMonth(appointmentsHistory, filterDate, (item) => item.date)

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

  const handleAddAppointment = async () => {
    setStatusMessage('')
    try {
      const payload = {
        name: newAppointment.name || 'New Client',
        service: newAppointment.service,
        status: newAppointment.status,
        time: newAppointment.time,
        therapist: newAppointment.therapist,
        date: new Date().toISOString().slice(0, 10),
      }
      const saved = await apiPost('/api/appointments', payload)
      setAppointmentsData((prev) => ({
        ...prev,
        upcoming_today: [saved, ...prev.upcoming_today],
      }))
      setIsAddOpen(false)
      setNewAppointment({
        name: '',
        service: 'Deep Tissue Renewal (90 min)',
        therapist: 'Elena Vance',
        time: '10:30 AM',
        room: 'Eucalyptus Sanctuary',
        status: 'Confirmed',
      })
      setStatusMessage('Appointment booked successfully.')
    } catch (error) {
      setStatusMessage(error.message || 'Unable to book appointment.')
    }
  }

  return (
    <div className="view-body appointments-view">
      <header className="appointments-header">
        <h2>Appointments</h2>
        <div className="appointments-header-right action-popover-anchor">
          <div className="appointments-search">
            <MaterialSymbol name="search" className="text-[18px]" />
            <input
              type="text"
              placeholder="Search appointments or clients..."
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
              title="Appointments History"
              items={filteredHistory}
              onClose={() => setIsHistoryOpen(false)}
            />
          )}
        </div>
      </header>

      {statusMessage && <p className="appointments-status">{statusMessage}</p>}

      <section className="appointments-toolbar">
        <div>
  
          <p>Managing the rhythm of sanctuary</p>
        </div>
        <div className="appointments-actions">
          <div className="appointments-toggle">
            <button
              type="button"
              className={viewMode === 'calendar' ? 'is-active' : ''}
              onClick={() => setViewMode('calendar')}
            >
              Calendar
            </button>
            <button
              type="button"
              className={viewMode === 'list' ? 'is-active' : ''}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
          </div>
          <button type="button" className="primary-button" onClick={() => setIsAddOpen(true)}>
            <MaterialSymbol name="add" className="text-[18px]" />
            New Appointment
          </button>
        </div>
      </section>

      {viewMode === 'calendar' ? (
        <>
          <section className="appointments-layout">
            <div className="calendar-card">
              <div className="calendar-head">
                <div>
                  <h4>{monthLabel}</h4>
                  <p>
                    You have {todayCount} appointment{todayCount === 1 ? '' : 's'} scheduled today
                  </p>
                </div>
                <div className="calendar-nav">
                  <button type="button" aria-label="Previous" onClick={() => shiftMonth(-1)}>
                    <MaterialSymbol name="chevron_left" className="text-[18px]" />
                  </button>
                  <button type="button" aria-label="Next" onClick={() => shiftMonth(1)}>
                    <MaterialSymbol name="chevron_right" className="text-[18px]" />
                  </button>
                </div>
              </div>
              <div className="calendar-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((label) => (
                  <span className="calendar-label" key={label}>
                    {label}
                  </span>
                ))}
                {calendarCells.map((item) => (
                  <div
                    key={item.key || `day-${item.day}-${item.muted ? 'muted' : 'current'}`}
                    className={item.muted ? 'calendar-cell muted' : 'calendar-cell'}
                  >
                    <span className="calendar-day">{item.day}</span>
                    {item.events.map((event, index) => (
                      <span
                        key={`${item.key || item.day}-${event}-${index}`}
                        className={`calendar-event${index === 0 ? '' : ' alt'}`}
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <aside className="appointments-side">
              <div className="upcoming-card">
                <h4>Upcoming Today</h4>
                <div className="upcoming-list">
                  {dateFilteredUpcoming.map((item) => (
                    <div className="upcoming-item" key={item.name}>
                      <div className="upcoming-avatar">{item.name.charAt(0)}</div>
                      <div>
                        <p>{item.name}</p>
                        <span>{item.service}</span>
                        <div className="upcoming-meta">
                          <span>{item.therapist}</span>
                          <span>{item.time}</span>
                        </div>
                      </div>
                      <span className={`upcoming-status ${item.status.toLowerCase()}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="occupancy-card">
                <h4>Room Occupancy</h4>
                {appointmentsData.room_occupancy.map((room) => (
                  <div className="occupancy-row" key={room.name}>
                    <div>
                      <p>{room.name}</p>
                      <div className="occupancy-bar">
                        <span style={{ width: `${room.value}%` }}></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <section className="availability-card">
            <div className="availability-head">
              <h4>Therapist Availability</h4>
              <button
                type="button"
                className="ghost-button"
                onClick={() => setStatusMessage('Staff availability list opened.')}
              >
                View all staff
              </button>
            </div>
            <div className="availability-list">
              {appointmentsData.therapist_availability.map((therapist) => (
                <div className="availability-item" key={therapist.name}>
                  <div className="availability-avatar">{therapist.name.charAt(0)}</div>
                  <div>
                    <p>{therapist.name}</p>
                    <span>{therapist.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="appointments-list-card">
          <div className="appointments-list-head">
            <div>
              <h4>All Appointments</h4>
              <p>{dateFilteredUpcoming.length} scheduled sessions</p>
            </div>
          </div>
          <div className="appointments-list">
            {dateFilteredUpcoming.length === 0 ? (
              <p className="appointments-empty">No appointments found.</p>
            ) : (
              dateFilteredUpcoming.map((item) => (
                <div className="appointment-row" key={`${item.name}-${item.time}`}>
                  <div className="appointment-row-main">
                    <div className="appointment-avatar">{item.name.charAt(0)}</div>
                    <div>
                      <p className="appointment-client">{item.name}</p>
                      <span className="appointment-service">{item.service}</span>
                    </div>
                  </div>
                  <div className="appointment-meta">
                    <span>
                      <MaterialSymbol name="calendar_month" className="text-[14px]" />
                      {formatDisplayDate(item.date)}
                    </span>
                    <span>
                      <MaterialSymbol name="schedule" className="text-[14px]" />
                      {item.time}
                    </span>
                    <span>
                      <MaterialSymbol name="medical_services" className="text-[14px]" />
                      {item.therapist}
                    </span>
                  </div>
                  <span className={`upcoming-status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {isAddOpen && (
        <div className="appointment-modal-overlay">
          <div className="appointment-modal">
            <div className="appointment-modal-header">
              <div>
                <h3>New Appointment</h3>
                <p>
                  Expand your wellness schedule. Fill in the details below to register a new session.
                </p>
              </div>
              <button
                type="button"
                className="appointment-modal-close"
                onClick={() => setIsAddOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="appointment-modal-grid">
              <section className="appointment-panel">
                <h4>Session Details</h4>
                <p>Select the client and service details for this therapeutic journey.</p>
                <label>
                  Client Name
                  <div className="appointment-input">
                    <input
                      type="text"
                      placeholder="Search for a registered client..."
                      value={newAppointment.name}
                      onChange={(event) => setNewAppointment({ ...newAppointment, name: event.target.value })}
                    />
                    <MaterialSymbol name="search" className="text-[16px]" />
                  </div>
                  <div className="appointment-tags">
                    <span>Frequent: Julianne Moore</span>
                    <span>Frequent: Arthur P.</span>
                  </div>
                </label>
                <div className="appointment-therapists">
                  <button
                    type="button"
                    className={newAppointment.therapist === 'Elena Vance' ? 'therapist-chip is-active' : 'therapist-chip'}
                    onClick={() => setNewAppointment({ ...newAppointment, therapist: 'Elena Vance' })}
                  >
                    <span className="chip-avatar">E</span>
                    <div>
                      <strong>Elena Vance</strong>
                      <span>Holistic Massage Expert</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={newAppointment.therapist === 'Marcus Thorn' ? 'therapist-chip is-active' : 'therapist-chip'}
                    onClick={() => setNewAppointment({ ...newAppointment, therapist: 'Marcus Thorn' })}
                  >
                    <span className="chip-avatar">M</span>
                    <div>
                      <strong>Marcus Thorn</strong>
                      <span>Cognitive Specialist</span>
                    </div>
                  </button>
                </div>
                <label>
                  Service Selection
                  <select
                    value={newAppointment.service}
                    onChange={(event) => setNewAppointment({ ...newAppointment, service: event.target.value })}
                  >
                    <option>Deep Tissue Renewal (90 min)</option>
                    <option>Aromatherapy Ritual</option>
                    <option>Hydrotherapy Reset</option>
                  </select>
                </label>
                <div className="appointment-hero-card">
                  <p>Member Exclusive</p>
                  <h5>The Lavender Suite is currently available for priority bookings.</h5>
                </div>
              </section>

              <section className="appointment-panel">
                <h4>Time & Space</h4>
                <p>Availability orchestration</p>
                <div className="appointment-calendar">
                  <div className="calendar-headline">
                    <strong>October 2023</strong>
                    <div className="calendar-nav">
                      <button type="button" aria-label="Previous">
                        <MaterialSymbol name="chevron_left" className="text-[16px]" />
                      </button>
                      <button type="button" aria-label="Next">
                        <MaterialSymbol name="chevron_right" className="text-[16px]" />
                      </button>
                    </div>
                  </div>
                  <div className="appointment-calendar-grid">
                    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((label) => (
                      <span key={label}>{label}</span>
                    ))}
                    {[25, 26, 27, 28, 29, 30, 1].map((day) => (
                      <button type="button" key={`cal-${day}`}>{day}</button>
                    ))}
                    {[2, 3, 4, 5, 6, 7, 8].map((day) => (
                      <button type="button" key={`cal-next-${day}`} className={day === 3 ? 'is-active' : ''}>
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="appointment-slots">
                  <p>Preferred Time Slot</p>
                  <div>
                    {appointmentsData.new_appointment.time_slots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        className={newAppointment.time === slot ? 'is-active' : ''}
                        onClick={() => setNewAppointment({ ...newAppointment, time: slot })}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="appointment-rooms">
                  <p>Room Selection</p>
                  {appointmentsData.new_appointment.rooms.map((room) => (
                    <button
                      type="button"
                      className={newAppointment.room === room.name ? 'room-option is-active' : 'room-option'}
                      key={room.name}
                      onClick={() => setNewAppointment({ ...newAppointment, room: room.name })}
                    >
                      <span>{room.name}</span>
                      <span className={`badge ${room.status === 'Free' ? 'free' : 'busy'}`}>
                        {room.status}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="appointment-status">
                  <p>Status</p>
                  <div>
                    {appointmentsData.new_appointment.status_options.map((status) => (
                      <button
                        type="button"
                        key={status}
                        className={newAppointment.status === status ? 'is-active' : ''}
                        onClick={() => setNewAppointment({ ...newAppointment, status })}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {statusMessage && <p className="appointments-status">{statusMessage}</p>}
                <button
                  type="button"
                  className="primary-button full-width"
                  onClick={handleAddAppointment}
                >
                  Book Appointment
                  <MaterialSymbol name="arrow_right_alt" className="text-[18px]" />
                </button>

                <div className="appointment-note">
                  <MaterialSymbol name="info" className="text-[18px]" />
                  Confirmed appointments will automatically trigger an SMS notification to the client.
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
