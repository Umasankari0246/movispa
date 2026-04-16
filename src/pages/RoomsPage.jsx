import { useState } from 'react'
import MaterialSymbol from '../components/MaterialSymbol.jsx'

const ROOMS = [
  {
    id: 1,
    name: 'The Zen Suite',
    type: 'Oriental Therapy',
    status: 'Available',
    statusClass: 'available',
    meta: ['24C', 'Purified'],
    imageClass: 'zen',
  },
  {
    id: 2,
    name: 'Garden Alcove',
    type: 'Aromatherapy',
    status: 'Occupied',
    statusClass: 'occupied',
    meta: ['15m left', 'Lavender Mist'],
    imageClass: 'garden',
  },
  {
    id: 3,
    name: 'Azure Pool',
    type: 'Hydrotherapy',
    status: 'Available',
    statusClass: 'available',
    meta: ['38C', 'Ready'],
    imageClass: 'pool',
  },
  {
    id: 4,
    name: 'Salt Haven',
    type: 'Halotherapy',
    status: 'Cleaning',
    statusClass: 'cleaning',
    meta: ['45% Hum.', 'Silent'],
    imageClass: 'salt',
  },
  {
    id: 5,
    name: 'Lotus Duet',
    type: 'Couples Therapy',
    status: 'Occupied',
    statusClass: 'occupied',
    meta: ['2 Guests', '45m left'],
    imageClass: 'lotus',
  },
  {
    id: 6,
    name: 'Lumina Clinic',
    type: 'Facial Aesthetics',
    status: 'Available',
    statusClass: 'available',
    meta: ['UV Sterilized', 'Equipped'],
    imageClass: 'clinic',
  },
]

export default function RoomsPage() {
  const [isAddOpen, setIsAddOpen] = useState(false)

  return (
    <div className="view-body rooms-view">
      <header className="rooms-topbar">
        <div className="rooms-topbar-left">
          <h2>Rooms</h2>
          <span className="rooms-location">
            <MaterialSymbol name="location_on" className="text-[14px]" />
            Main Sanctuary Wing
          </span>
        </div>
        <div className="rooms-topbar-right">
          <div className="rooms-search">
            <MaterialSymbol name="search" className="text-[18px]" />
            <input type="text" placeholder="Search facilities..." />
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
      </header>

      <section className="rooms-hero">
        <div>
          <h3>Space & Serenity</h3>
          <p>
            Manage your treatment sanctuaries. Each room is designed for specific modalities,
            from hydrotherapy to deep tissue massage.
          </p>
        </div>
        <div className="rooms-stats">
          <div className="stat-card">
            <span>Total Rooms</span>
            <strong>06</strong>
          </div>
          <div className="stat-card dark">
            <span>Active Now</span>
            <strong>04</strong>
          </div>
        </div>
      </section>

      <section className="rooms-grid">
        {ROOMS.map((room) => (
          <article className="room-card" key={room.id}>
            <div className={`room-media ${room.imageClass}`} aria-hidden="true"></div>
            <div className="room-body">
              <div>
                <h4>{room.name}</h4>
                <p>{room.type}</p>
              </div>
              <span className={`room-status ${room.statusClass}`}>{room.status}</span>
            </div>
            <div className="room-meta">
              {room.meta.map((item) => (
                <span className="meta-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <button
        type="button"
        className="rooms-fab"
        aria-label="Add room"
        onClick={() => setIsAddOpen(true)}
      >
        <MaterialSymbol name="add" className="text-[22px]" />
      </button>

      {isAddOpen && (
        <div className="rooms-modal-overlay">
          <div className="rooms-modal">
            <div className="rooms-modal-header">
              <div>
                <h3>Add New Room</h3>
                <p>Configure a new treatment or wellness space.</p>
              </div>
              <button
                type="button"
                className="rooms-modal-close"
                aria-label="Close"
                onClick={() => setIsAddOpen(false)}
              >
                ✕
              </button>
            </div>
            <form
              className="rooms-modal-body"
              onSubmit={(event) => {
                event.preventDefault()
                setIsAddOpen(false)
              }}
            >
              <label>
                Room Name
                <input type="text" placeholder="e.g., Lotus Suite" required />
              </label>
              <div className="rooms-modal-row">
                <label>
                  Type
                  <select defaultValue="Massage">
                    <option>Massage</option>
                    <option>Hydrotherapy</option>
                    <option>Facial</option>
                    <option>Couples</option>
                  </select>
                </label>
                <label>
                  Status
                  <select defaultValue="Available">
                    <option>Available</option>
                    <option>Occupied</option>
                    <option>Cleaning</option>
                  </select>
                </label>
              </div>
              <label>
                Notes
                <textarea
                  rows={4}
                  placeholder="Mention specific equipment or maintenance schedules..."
                />
              </label>
              <div className="rooms-modal-actions">
                <button type="button" className="ghost-button" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
