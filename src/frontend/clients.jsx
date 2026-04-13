import { useState } from 'react'
import MaterialSymbol from '../components/MaterialSymbol.jsx'

export default function ClientsView({ clients, setClients }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [notification, setNotification] = useState(null)
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    age: '',
    preferences: '',
    status: 'Active',
  })

  const filteredClients = clients.filter(client => {
    const matchesSearch = searchTerm === '' ||
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm)
    const matchesFilter = filterStatus === 'all' || client.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const handleViewClient = (client) => {
    setSelectedClient(client)
    setIsViewModalOpen(true)
  }

  const handleEditClient = (client) => {
    setEditingClient(client)
    setIsEditModalOpen(true)
  }

  const handleDeleteClient = (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(c => c.id !== clientId))
    }
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

  const handleSaveEditClient = () => {
    setClients(clients.map(c => c.id === editingClient.id ? editingClient : c))
    setIsEditModalOpen(false)
    setEditingClient(null)
  }

  return (
    <div className="view-body clients-view">
      <div className="mb-6">
        <div>
          <h3 className="text-[28px] font-semibold">Clients</h3>
          <p className="text-sm text-muted">Manage client information and records.</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-300 bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent"
            />
            <MaterialSymbol name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-12 px-4 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            type="button"
            className="rounded-full px-6 py-3 text-[13px] font-semibold uppercase tracking-[1px] text-white shadow-soft transition hover:brightness-110"
            style={{ backgroundColor: '#1f4d3e' }}
            onClick={handleAddClient}
          >
            + Add Client
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{client.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      client.status === 'Active' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                        title="View"
                        onClick={() => handleViewClient(client)}
                      >
                        <MaterialSymbol name="visibility" className="text-[20px]" />
                      </button>
                      <button
                        type="button"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                        title="Edit"
                        onClick={() => handleEditClient(client)}
                      >
                        <MaterialSymbol name="edit_square" className="text-[20px]" />
                      </button>
                      <button
                        type="button"
                        className="text-gray-600 hover:text-red-600 transition-colors"
                        title="Delete"
                        onClick={() => handleDeleteClient(client.id)}
                      >
                        <MaterialSymbol name="delete" className="text-[20px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
      {isEditModalOpen && editingClient && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-[0_28px_60px_rgba(31,77,62,0.18)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Edit Client</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setIsEditModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveEditClient(); }}>
              <div className="space-y-4">
                <label className="block text-sm text-slate-800">
                  Name
                  <input
                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                    value={editingClient.name}
                    onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                  />
                </label>
                <label className="block text-sm text-slate-800">
                  Email
                  <input
                    type="email"
                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                    value={editingClient.email}
                    onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })}
                  />
                </label>
                <label className="block text-sm text-slate-800">
                  Phone
                  <input
                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                    value={editingClient.phone}
                    onChange={(e) => setEditingClient({ ...editingClient, phone: e.target.value })}
                  />
                </label>
                <label className="block text-sm text-slate-800">
                  Address
                  <input
                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                    value={editingClient.address}
                    onChange={(e) => setEditingClient({ ...editingClient, address: e.target.value })}
                  />
                </label>
                <label className="block text-sm text-slate-800">
                  Age
                  <input
                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                    value={editingClient.age}
                    onChange={(e) => setEditingClient({ ...editingClient, age: e.target.value })}
                  />
                </label>
                <label className="block text-sm text-slate-800">
                  Preferences
                  <input
                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                    value={editingClient.preferences}
                    onChange={(e) => setEditingClient({ ...editingClient, preferences: e.target.value })}
                  />
                </label>
                <label className="block text-sm text-slate-800">
                  Status
                  <select
                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                    value={editingClient.status}
                    onChange={(e) => setEditingClient({ ...editingClient, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </label>
                <button
                  type="submit"
                  className="w-full h-12 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-[0_28px_60px_rgba(31,77,62,0.18)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Add New Client</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setIsAddModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveNewClient(); }}>
              <div className="space-y-4">
                <label className="block text-sm text-slate-800">
                  Name
                  <input
                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    required
                  />
                </label>
                <label className="block text-sm text-slate-800">
                  Email
                  <input
                    type="email"
                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    required
                  />
                </label>
                <label className="block text-sm text-slate-800">
                  Phone
                  <input
                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    required
                  />
                </label>
                <label className="block text-sm text-slate-800">
                  Address
                  <input
                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                    value={newClient.address}
                    onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                  />
                </label>
                <label className="block text-sm text-slate-800">
                  Age
                  <input
                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                    value={newClient.age}
                    onChange={(e) => setNewClient({ ...newClient, age: e.target.value })}
                  />
                </label>
                <label className="block text-sm text-slate-800">
                  Preferences
                  <input
                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                    value={newClient.preferences}
                    onChange={(e) => setNewClient({ ...newClient, preferences: e.target.value })}
                  />
                </label>
                <button
                  type="submit"
                  className="w-full h-12 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                >
                  Add Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
