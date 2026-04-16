import { useState } from 'react'
import MaterialSymbol from '../components/MaterialSymbol.jsx'

export default function ClientsView({ clients, setClients }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTier, setSelectedTier] = useState('all')
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    age: '',
    preferences: '',
    status: 'Active',
  })

  const tierOptions = [
    { id: 'all', label: 'All Clients' },
    { id: 'diamond', label: 'Diamond' },
    { id: 'gold', label: 'Gold' },
    { id: 'silver', label: 'Silver' },
  ]

  const tierPalette = ['Diamond Elite', 'Gold Member', 'Silver Member']

  const resolveTierLabel = (client, index) => {
    if (client.membership) {
      return client.membership
    }
    return tierPalette[index % tierPalette.length]
  }

  const resolveTierId = (label) => {
    const normalized = String(label || '').toLowerCase()
    if (normalized.includes('diamond')) return 'diamond'
    if (normalized.includes('gold')) return 'gold'
    if (normalized.includes('silver')) return 'silver'
    return 'diamond'
  }

  const formatDate = (value) => {
    if (!value) return '—'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
  }

  const clientsWithMeta = clients.map((client, index) => {
    const membership = resolveTierLabel(client, index)
    const membershipKey = resolveTierId(membership)
    const latestVisit = client.appointmentHistory?.[0]
    const lastVisitDate = formatDate(latestVisit?.date)
    const lastVisitService = latestVisit?.service || client.preferences || '—'
    return {
      ...client,
      membership,
      membershipKey,
      lastVisitDate,
      lastVisitService,
      listIndex: index,
    }
  })

  const filteredClients = clientsWithMeta.filter((client) => {
    const matchesSearch = searchTerm === '' ||
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTier = selectedTier === 'all' || client.membershipKey === selectedTier
    return matchesSearch && matchesTier
  })

  const handleViewClient = (client) => {
    setSelectedClient(client)
    setIsViewModalOpen(true)
  }

  const handleAddClient = () => {
    setIsAddModalOpen(true)
  }

  const handleSaveNewClient = () => {
    const id = clients.length + 1
    setClients([...clients, { ...newClient, id, appointmentHistory: [], paymentHistory: [] }])
    setNewClient({ name: '', email: '', phone: '', address: '', age: '', preferences: '', status: 'Active' })
    setIsAddModalOpen(false)
  }

  return (
    <div className="view-body clients-view">
      <header className="clients-header">
        <div className="clients-header-left">
          <h2 className="clients-title">Clients</h2>
        </div>
        <div className="clients-header-right">
          <div className="clients-search">
            <MaterialSymbol name="search" className="text-[18px]" />
            <input
              type="text"
              placeholder="Search client directory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="clients-icon-row">
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

      <section className="clients-toolbar">
        <div className="tier-group">
          <p className="tier-label">Membership Tier</p>
          <div className="tier-chips">
            {tierOptions.map((tier) => (
              <button
                key={tier.id}
                type="button"
                className={`tier-chip${selectedTier === tier.id ? ' is-active' : ''}`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>
        <div className="clients-actions">
          <button type="button" className="ghost-button">
            <MaterialSymbol name="tune" className="text-[16px]" />
            More Filters
          </button>
          <button type="button" className="primary-button" onClick={handleAddClient}>
            <MaterialSymbol name="person_add" className="text-[18px]" />
            New Client
          </button>
        </div>
      </section>

      <section className="clients-card">
        <div className="clients-table-head">
          <span>Client Name</span>
          <span>Contact Info</span>
          <span>Last Visit</span>
          <span>Membership</span>
          <span>Actions</span>
        </div>
        <div className="clients-table-body">
          {filteredClients.map((client) => (
            <div className="clients-row" key={client.id}>
              <div className="client-cell client-name-cell">
                <div className="client-avatar">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <p className="client-name">{client.name}</p>
                  <p className="client-id">ID: MS-{String(client.id).padStart(4, '0')}</p>
                </div>
              </div>
              <div className="client-cell">
                <p className="client-main">{client.phone}</p>
                <p className="client-sub">{client.email}</p>
              </div>
              <div className="client-cell">
                <p className="client-main">{client.lastVisitDate}</p>
                <p className="client-sub">{client.lastVisitService}</p>
              </div>
              <div className="client-cell">
                <span className={`tier-badge ${client.membershipKey}`}>
                  {client.membership}
                </span>
              </div>
              <div className="client-cell client-actions">
                <button
                  type="button"
                  className="clients-icon-button"
                  aria-label="More actions"
                  onClick={() => handleViewClient(client)}
                >
                  <MaterialSymbol name="more_horiz" className="text-[18px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="clients-footer">
          <p>Showing 1 to {Math.min(filteredClients.length, 10)} of {filteredClients.length} clients</p>
          <div className="pagination">
            <button type="button" className="page-arrow" aria-label="Previous">
              <MaterialSymbol name="chevron_left" className="text-[18px]" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                className={`page-number${page === 1 ? ' is-active' : ''}`}
              >
                {page}
              </button>
            ))}
            <button type="button" className="page-arrow" aria-label="Next">
              <MaterialSymbol name="chevron_right" className="text-[18px]" />
            </button>
          </div>
        </div>
      </section>

      {/* View Client Modal */}
      {isViewModalOpen && selectedClient && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-4xl h-[calc(100vh-100px)] overflow-hidden rounded-[28px] bg-white shadow-[0_28px_60px_rgba(31,77,62,0.18)]">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-[13px] uppercase tracking-[1.3px] text-muted">Client Profile</p>
                <h3 className="text-[26px] font-semibold">{selectedClient.name}</h3>
              </div>
              <button
                type="button"
                className="text-muted transition hover:text-ink"
                onClick={() => setIsViewModalOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Personal Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {selectedClient.name}</p>
                    <p><strong>Email:</strong> {selectedClient.email}</p>
                    <p><strong>Phone:</strong> {selectedClient.phone}</p>
                    <p><strong>Address:</strong> {selectedClient.address}</p>
                    <p><strong>Age:</strong> {selectedClient.age}</p>
                    <p><strong>Preferences:</strong> {selectedClient.preferences}</p>
                    <p><strong>Status:</strong> {selectedClient.status}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Appointment History</h4>
                  <div className="space-y-2">
                    {selectedClient.appointmentHistory.map((appt, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm"><strong>Date:</strong> {appt.date}</p>
                        <p className="text-sm"><strong>Service:</strong> {appt.service}</p>
                        <p className="text-sm"><strong>Status:</strong> {appt.status}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4">Payment History</h4>
                <div className="space-y-2">
                  {selectedClient.paymentHistory.map((pay, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm"><strong>Date:</strong> {pay.date}</p>
                      <p className="text-sm"><strong>Amount:</strong> ₹{pay.amount}</p>
                      <p className="text-sm"><strong>Status:</strong> {pay.status}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-6">
          <div className="client-modal">
            <header className="client-modal-header">
              <div>
                <p className="client-modal-breadcrumb">Clients / Registration</p>
                <h3 className="client-modal-title">New Client Registration</h3>
                <p className="client-modal-subtitle">
                  Create a personalized profile for a new guest in the Sanctuary ecosystem.
                </p>
              </div>
              <button
                type="button"
                className="client-modal-close"
                onClick={() => setIsAddModalOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </header>
            <div className="client-modal-card">
              <div className="client-modal-divider"></div>
              <form
                className="client-modal-grid"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSaveNewClient()
                }}
              >
                <section className="client-modal-section">
                  <h4>Personal Details</h4>
                  <label>
                    Full Name
                    <input
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Phone Number
                    <input
                      value={newClient.phone}
                      onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Email Address
                    <input
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                      required
                    />
                  </label>
                  <div className="client-modal-radio">
                    <p>Preferred Contact Method</p>
                    <label>
                      <input type="radio" name="contact" defaultChecked />
                      Email
                    </label>
                    <label>
                      <input type="radio" name="contact" />
                      SMS
                    </label>
                  </div>
                </section>

                <section className="client-modal-section">
                  <h4>Account Configuration</h4>
                  <p className="client-modal-field">Membership Tier</p>
                  <div className="tier-grid">
                    {[
                      { id: 'silver', label: 'Silver', note: 'Essential Serenity', icon: 'spa' },
                      { id: 'gold', label: 'Gold', note: 'Elevated Wellness', icon: 'workspace_premium' },
                      { id: 'platinum', label: 'Platinum', note: 'Absolute Luxury', icon: 'diamond' },
                      { id: 'custom', label: 'Custom', note: 'Bespoke Rituals', icon: 'auto_awesome' },
                    ].map((tier) => (
                      <button key={tier.id} type="button" className="tier-card">
                        <span className="tier-card-icon">
                          <MaterialSymbol name={tier.icon} className="text-[18px]" />
                        </span>
                        <strong>{tier.label}</strong>
                        <span>{tier.note}</span>
                      </button>
                    ))}
                  </div>
                  <label className="client-modal-textarea">
                    Appointment Notes & Preferences
                    <textarea
                      rows={4}
                      value={newClient.preferences}
                      onChange={(e) => setNewClient({ ...newClient, preferences: e.target.value })}
                    />
                  </label>
                </section>
                <div className="client-modal-actions">
                  <button type="button" className="ghost-button" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="primary-button">
                    Create Client
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
