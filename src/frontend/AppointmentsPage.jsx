import { useState } from 'react'
import MaterialSymbol from '../components/MaterialSymbol.jsx'

const therapists = [
  { value: 'Sarah Jenkins', label: 'Sarah Jenkins' },
  { value: 'Julian Reed', label: 'Julian Reed' },
  { value: 'Elena Moretti', label: 'Elena Moretti' },
]

const serviceGroups = [
  {
    label: 'Massage Services',
    options: [
      { value: 'Swedish Massage', label: 'Swedish Massage' },
      { value: 'Deep Tissue Massage', label: 'Deep Tissue Massage' },
      { value: 'Aromatherapy Massage', label: 'Aromatherapy Massage' },
    ],
  },
  {
    label: 'Facial Treatments',
    options: [
      { value: 'Basic Facial', label: 'Basic Facial' },
      { value: 'Herbal Facial', label: 'Herbal Facial' },
      { value: 'Anti-Aging Facial', label: 'Anti-Aging Facial' },
      { value: 'Acne Treatment Facial', label: 'Acne Treatment Facial' },
    ],
  },
  {
    label: 'Beauty & Grooming',
    options: [
      { value: 'Manicure', label: 'Manicure' },
      { value: 'Pedicure', label: 'Pedicure' },
      { value: 'Nail Art', label: 'Nail Art' },
    ],
  },
  {
    label: 'Body Treatments',
    options: [
      { value: 'Body Scrub', label: 'Body Scrub' },
      { value: 'Body Polishing', label: 'Body Polishing' },
      { value: 'Body Wrap', label: 'Body Wrap' },
    ],
  },
  {
    label: 'Hair Services',
    options: [
      { value: 'Hair Spa', label: 'Hair Spa' },
      { value: 'Hair Cut', label: 'Hair Cut' },
      { value: 'Hair Coloring', label: 'Hair Coloring' },
      { value: 'Hair Smoothening / Straightening', label: 'Hair Smoothening / Straightening' },
    ],
  },
  {
    label: 'Wellness & Relaxation',
    options: [
      { value: 'Steam Bath', label: 'Steam Bath' },
      { value: 'Yoga Session', label: 'Yoga Session' },
      { value: 'Meditation Therapy', label: 'Meditation Therapy' },
    ],
  },
]

const appointmentItems = [
  {
    date: 'Apr 14, 10:30 AM',
    title: 'Aromatherapy Massage',
    therapist: 'Sarah Jenkins',
    status: 'Confirmed',
  },
  {
    date: 'Apr 18, 2:00 PM',
    title: 'Herbal Facial',
    therapist: 'Julian Reed',
    status: 'Rescheduled',
  },
]

const rooms = [
  { value: 'Room 101', label: 'Room 101 - Massage Suite' },
  { value: 'Room 102', label: 'Room 102 - Facial Room' },
  { value: 'Room 103', label: 'Room 103 - Wellness Suite' },
  { value: 'Room 104', label: 'Room 104 - Meditate Therapy' },
  { value: 'Room 105', label: 'Room 105 - Asana Room' },
]

const initialFormState = {
  fullName: '',
  gender: '',
  ageOrDob: '',
  phone: '',
  email: '',
  address: '',
  skinType: '',
  allergies: '',
  medicalConditions: '',
  preferredService: 'Swedish Massage',
  appointmentDate: '',
  appointmentTime: '',
  selectedService: 'Swedish Massage',
  assignedTherapist: therapists[0].value,
  assignedRoom: rooms[0].value,
  paymentMethod: 'Credit/Debit Card',
  discount: '',
  cardHolderName: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  upiId: '',
  upiApp: '',
  termsAccepted: false,
  cancellationAccepted: false,
  safetyAccepted: false,
}

const demoFormData = {
  fullName: 'Sarah Anderson',
  gender: 'Female',
  ageOrDob: '28',
  phone: '+91 98765 43210',
  email: 'sarah.anderson@example.com',
  address: '123 Wellness Lane, Sanctuary City, SC 12345',
  skinType: 'Sensitive, Nut allergy',
  medicalConditions: 'Mild back tension, regular exercise lover',
  preferredService: 'Swedish Massage',
  appointmentDate: '2026-04-15',
  appointmentTime: '10:00',
  selectedService: 'Swedish Massage',
  assignedTherapist: 'Sarah Jenkins',
  assignedRoom: 'Room 101 - Massage Suite',
  discount: '10%',
  cardHolderName: 'Sarah Anderson',
  cardNumber: '4532 1234 5678 9010',
  expiryDate: '12/26',
  cvv: '123',
  upiId: 'sarah.anderson@okaxis',
  upiApp: 'GPay',
}

function AppointmentsView() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState(initialFormState)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [termsAgreed, setTermsAgreed] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      clientName: 'Emily Johnson',
      clientId: '#MS-8342',
      therapist: 'Sarah Jenkins',
      service: 'Swedish Massage',
      room: 'Tranquil Room',
      date: 'Oct 22, 2023',
      time: '10:00 AM - 11:00 AM',
      status: 'Pending',
      transactionId: 'TXN12345678'
    },
    {
      id: 2,
      clientName: 'Julian Thorne',
      clientId: '#MS-8832',
      therapist: 'Sofia Rossi',
      service: 'Hot Stone',
      room: 'Cedar Room',
      date: 'Oct 24, 2023',
      time: '01:00 PM - 02:30 PM',
      status: 'Pending',
      transactionId: 'TXN87654321'
    },
    {
      id: 3,
      clientName: 'Sarah Jenkins',
      clientId: '#MS-9445',
      therapist: 'Elena Thorne',
      service: 'Aromatherapy',
      room: 'Zen Den',
      date: 'Oct 24, 2023',
      time: '03:45 PM - 04:45 PM',
      status: 'Rejected',
      transactionId: 'TXN98765432'
    },
    {
      id: 4,
      clientName: 'Beatrice Miller',
      clientId: '#MS-1022',
      therapist: 'Marcus Chen',
      service: 'Swedish',
      room: 'Lotus Suite',
      date: 'Oct 25, 2023',
      time: '09:00 AM - 10:00 AM',
      status: 'Confirmed',
      transactionId: 'TXN11223344'
    }
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isEditFormModalOpen, setIsEditFormModalOpen] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState(null)
  const [filterBy, setFilterBy] = useState('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  // Filter appointments based on search and filter
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = searchTerm === '' || 
      appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.therapist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.clientId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterBy === 'all' || appointment.status.toLowerCase() === filterBy.toLowerCase()
    
    return matchesSearch && matchesFilter
  })

  const stepCompletion = {
    1:
      Boolean(form.fullName) &&
      Boolean(form.gender) &&
      Boolean(form.ageOrDob) &&
      Boolean(form.phone) &&
      Boolean(form.email) &&
      Boolean(form.address),
    2:
      Boolean(form.skinType) &&
      Boolean(form.medicalConditions) &&
      Boolean(form.preferredService),
    3:
      Boolean(form.appointmentDate) &&
      Boolean(form.appointmentTime) &&
      Boolean(form.selectedService) &&
      Boolean(form.assignedTherapist) &&
      Boolean(form.assignedRoom),
    4: Boolean(form.paymentMethod),
    5: form.termsAccepted,
  }

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAutoFill = () => {
    setForm(demoFormData)
  }

  const handlePayment = (event) => {
    event.preventDefault()
    if (stepCompletion[4]) {
      // Generate transaction ID
      const txnId = 'TXN' + Date.now().toString().slice(-8)
      setTransactionId(txnId)
      setCustomerName(form.fullName)
      setPaymentSuccess(true)
      // Show payment success popup
      setIsPaymentSuccessOpen(true)
      // Proceed to step 5 after a delay
      setTimeout(() => {
        setIsPaymentSuccessOpen(false)
        setStep(5)
      }, 2000)
    }
  }

  const handleStepNext = (event) => {
    event.preventDefault()
    if (step < 5) {
      setStep(step + 1)
    } else if (stepCompletion[5]) {
      handleConfirmBooking()
    }
  }

  const handleConfirmBooking = () => {
    // Generate random transaction ID
    const transactionId = 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase()
    
    // Add new appointment to the appointments list
    const newAppointment = {
      id: appointments.length + 1,
      clientName: form.fullName,
      clientId: '#MS-' + Math.random().toString(36).substr(2, 4).toUpperCase(),
      therapist: form.assignedTherapist,
      service: form.selectedService,
      room: form.assignedRoom,
      date: form.appointmentDate,
      time: form.appointmentTime,
      status: 'Pending',
      transactionId: transactionId
    }
    
    setAppointments([...appointments, newAppointment])
    setIsPaymentSuccessOpen(true)
    setTimeout(() => {
      setIsPaymentSuccessOpen(false)
      setIsSuccessOpen(true)
    }, 2000)
  }

  const handleApproveAppointment = (appointmentId) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? {...apt, status: 'Confirmed'} : apt
    ))
  }

  const handleRejectAppointment = (appointmentId) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? {...apt, status: 'Rejected'} : apt
    ))
  }

  const handleStepBack = () => {
    setStep((current) => Math.max(1, current - 1))
  }

  const openModal = () => {
    setIsModalOpen(true)
    setStep(1)
  }

  return (
    <div className="view-body appointments-view">
      <div className="mb-6">
        <div>
          <h3 className="text-[28px] font-semibold">Appointments</h3>
          <p className="text-sm text-muted">Manage admissions, bookings and therapist assignments.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">TODAY'S TOTAL</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">38</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-medium text-green-600">+12%</span>
                <span className="text-xs text-gray-500">8 more than yesterday</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
              <MaterialSymbol name="calendar_month" className="text-[24px] text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">CONFIRMED</p>
              <p className="text-3xl font-bold text-green-600 mt-1">24</p>
              <p className="text-xs text-gray-500 mt-2">63% capacity reached</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
              <MaterialSymbol name="check_circle" className="text-[24px] text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">PENDING</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">09</p>
              <p className="text-xs text-yellow-600 mt-2">Requires urgent action</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-yellow-50 flex items-center justify-center">
              <MaterialSymbol name="pending" className="text-[24px] text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl p-6 shadow-sm" style={{backgroundColor: 'lch(89.06% 14.1 91.93)'}}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium" style={{color: '#3e2723'}}>NEXT UP</p>
              <p className="text-lg font-bold mt-1" style={{color: '#3e2723'}}>Sarah Jenkins</p>
              <p className="text-sm mt-1" style={{color: '#3e2723'}}>Aromatherapy Session</p>
              <p className="text-xs mt-2" style={{color: '#3e2723', opacity: 0.9}}>in 14 min</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
              <MaterialSymbol name="schedule" className="text-[24px] text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search client, service, or room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-300 bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent"
              style={{focusRingColor: '#1f4d3e'}}
            />
            <MaterialSymbol name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              className="flex items-center gap-2 h-12 px-4 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <MaterialSymbol name="filter_alt" className="text-[16px]" />
              Filters
              <MaterialSymbol name="expand_more" className="text-[14px]" />
            </button>
            {showFilterDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="py-2">
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setFilterBy('all')
                      setShowFilterDropdown(false)
                    }}
                  >
                    All Appointments
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setFilterBy('confirmed')
                      setShowFilterDropdown(false)
                    }}
                  >
                    Confirmed
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setFilterBy('pending')
                      setShowFilterDropdown(false)
                    }}
                  >
                    Pending
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setFilterBy('rejected')
                      setShowFilterDropdown(false)
                    }}
                  >
                    Rejected
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            className="rounded-full px-6 py-3 text-[13px] font-semibold uppercase tracking-[1px] text-white shadow-soft transition hover:brightness-110"
            style={{backgroundColor: '#1f4d3e'}}
            onClick={openModal}
          >
            + New Appointment
          </button>
        </div>
      </div>


      
      {/* Appointments Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">CLIENT</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">THERAPIST</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SERVICE</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ROOM</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">DATE & TIME</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">STATUS</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{backgroundColor: '#1f4d3e'}}>
                        <span className="text-sm font-bold text-white">
                          {appointment.clientName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">{appointment.clientName}</div>
                        <div className="text-xs text-gray-500">{appointment.clientId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.therapist}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.room}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.date}</div>
                    <div className="text-xs text-gray-500">{appointment.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      appointment.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <button 
                        type="button" 
                        className="text-gray-600 hover:text-blue-600 transition-colors" 
                        title="View"
                        onClick={() => {
                          setSelectedAppointment(appointment)
                          setIsViewModalOpen(true)
                        }}
                      >
                        <MaterialSymbol name="visibility" className="text-[20px]" />
                      </button>
                      <button 
                        type="button" 
                        className="text-gray-600 hover:text-blue-600 transition-colors" 
                        title="Edit"
                        onClick={() => {
                          const editForm = {
                            fullName: appointment.clientName,
                            gender: '',
                            ageOrDob: '',
                            phone: '',
                            email: '',
                            address: '',
                            skinType: '',
                            allergies: '',
                            medicalConditions: '',
                            preferredService: appointment.service,
                            appointmentDate: appointment.date,
                            appointmentTime: appointment.time,
                            selectedService: appointment.service,
                            assignedTherapist: appointment.therapist,
                            assignedRoom: appointment.room,
                            paymentMethod: 'Credit/Debit Card',
                            discount: '',
                            cardHolderName: '',
                            cardNumber: '',
                            expiryDate: '',
                            cvv: '',
                            upiId: '',
                            upiApp: '',
                            termsAccepted: true,
                            cancellationAccepted: false,
                            safetyAccepted: false,
                          }
                          setForm(editForm)
                          setEditingAppointment(appointment)
                          setIsEditFormModalOpen(true)
                          setStep(1)
                        }}
                      >
                        <MaterialSymbol name="edit_square" className="text-[20px]" />
                      </button>
                      {appointment.status === 'Pending' && (
                        <>
                          <button 
                            className="p-2 rounded-lg border border-gray-300 bg-white text-green-600 hover:bg-green-50 transition-colors"
                            onClick={() => {
                              handleApproveAppointment(appointment.id)
                            }}
                            title="Approve"
                          >
                            <MaterialSymbol name="check" className="text-[16px]" />
                          </button>
                          <button 
                            className="p-2 rounded-lg border border-gray-300 bg-white text-red-600 hover:bg-red-50 transition-colors"
                            onClick={() => {
                              handleRejectAppointment(appointment.id)
                            }}
                            title="Reject"
                          >
                            <MaterialSymbol name="close" className="text-[16px]" />
                          </button>
                        </>
                      )}
                      {appointment.status !== 'Pending' && (
                        <button 
                          className="p-2 rounded-lg border border-gray-300 bg-white text-red-600 hover:bg-red-50 transition-colors"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this appointment?')) {
                              setAppointments(appointments.filter(a => a.id !== appointment.id))
                            }
                          }}
                          title="Delete"
                        >
                          <MaterialSymbol name="delete" className="text-[16px]" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredAppointments.length}</span> of <span className="font-semibold">{appointments.length}</span> appointments
          </div>
          <div className="flex items-center gap-2">
            <button 
              className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              <MaterialSymbol name="chevron_left" className="text-[16px]" />
            </button>
            <button 
              className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              <MaterialSymbol name="chevron_right" className="text-[16px]" />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
    <div className="w-full max-w-[920px] h-[calc(100vh-100px)] max-h-[860px] overflow-hidden rounded-[28px] bg-white shadow-[0_28px_60px_rgba(31,77,62,0.18)]">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
        <div>
          <p className="text-[13px] uppercase tracking-[1.3px] text-muted">Appointment intake</p>
          <h3 className="text-[26px] font-semibold">New appointment admission</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
                  onClick={handleAutoFill}
                  title="Auto-fill with demo data"
                >
                  ↻ Demo
                </button>
                <button
                  type="button"
                  className="text-muted transition hover:text-ink"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close form"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex h-full flex-col overflow-hidden px-6 py-5">
              <div className="mb-5 grid gap-3 md:grid-cols-5">
                {[
                  { id: 1, label: 'Client details' },
                  { id: 2, label: 'Health details' },
                  { id: 3, label: 'Appointment' },
                  { id: 4, label: 'Payment' },
                  { id: 5, label: 'Terms' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStep(item.id)}
                    className={`rounded-2xl border px-3 py-3 text-left text-sm transition ${
                      step === item.id
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full border ${
                          stepCompletion[item.id]
                            ? 'border-emerald-500 bg-emerald-100 text-emerald-700'
                            : 'border-slate-300 bg-white text-slate-500'
                        }`}
                      >
                        {stepCompletion[item.id] ? '✓' : item.id}
                      </span>
                      <span className="font-medium">Step {item.id}</span>
                    </div>
                    <p className="mt-2 text-[11px] uppercase tracking-[1px] text-muted">{item.label}</p>
                  </button>
                ))}
              </div>

              <form className="flex h-full flex-col overflow-hidden" onSubmit={handleStepNext}>
                <div className="flex-1 overflow-y-auto pr-1">
                  {step === 1 && (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-5 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                        <h4 className="text-lg font-semibold">1. Basic Client Details</h4>
                        <label className="block text-sm text-slate-800">
                          Full Name
                          <input
                            className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                            value={form.fullName}
                            onChange={handleChange('fullName')}
                            placeholder="Enter full name"
                          />
                        </label>
                        <label className="block text-sm text-slate-800">
                          Gender
                          <select
                            className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                            value={form.gender}
                            onChange={handleChange('gender')}
                          >
                            <option value="">Select gender</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Non-binary">Non-binary</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                          </select>
                        </label>
                        <label className="block text-sm text-slate-800">
                          Age / Date of Birth
                          <input
                            className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                            value={form.ageOrDob}
                            onChange={handleChange('ageOrDob')}
                            placeholder="e.g. 34 / 1990-08-12"
                          />
                        </label>
                      </div>
                      <div className="space-y-5 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                        <h4 className="text-lg font-semibold invisible">placeholder</h4>
                        <label className="block text-sm text-slate-800">
                          Phone Number
                          <input
                            className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange('phone')}
                            placeholder="+91 98765 43210"
                          />
                        </label>
                        <label className="block text-sm text-slate-800">
                          Email ID
                          <input
                            className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                            type="email"
                            value={form.email}
                            onChange={handleChange('email')}
                            placeholder="client@example.com"
                          />
                        </label>
                        <label className="block text-sm text-slate-800">
                          Address
                          <textarea
                            rows="3"
                            className="mt-2 w-full rounded-[18px] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 resize-none"
                            value={form.address}
                            onChange={handleChange('address')}
                            placeholder="Client address"
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-5 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                      <h4 className="text-lg font-semibold">2. Health & Preference Details</h4>
                      <label className="block text-sm text-slate-800">
                        Skin type / allergies
                        <input
                          className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                          value={form.skinType}
                          onChange={handleChange('skinType')}
                          placeholder="Example: sensitive, oily, nut allergy"
                        />
                      </label>
                      <label className="block text-sm text-slate-800">
                        Medical conditions (if any)
                        <textarea
                          rows="4"
                          className="mt-2 w-full rounded-[18px] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 resize-none"
                          value={form.medicalConditions}
                          onChange={handleChange('medicalConditions')}
                          placeholder="Type medical conditions here"
                        />
                      </label>
                      <label className="block text-sm text-slate-800">
                        Preferred services
                        <select
                          className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                          value={form.preferredService}
                          onChange={handleChange('preferredService')}
                        >
                          {serviceGroups.map((group) => (
                            <optgroup key={group.label} label={group.label}>
                              {group.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      </label>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-5 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                      <h4 className="text-lg font-semibold">3. Appointment Details</h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <label className="block text-sm text-slate-800">
                          Date of visit
                          <input
                            type="date"
                            className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                            value={form.appointmentDate || ''}
                            onChange={handleChange('appointmentDate')}
                          />
                        </label>
                        <label className="block text-sm text-slate-800">
                          Time of visit
                          <input
                            type="time"
                            className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                            value={form.appointmentTime || ''}
                            onChange={handleChange('appointmentTime')}
                          />
                        </label>
                      </div>
                      <label className="block text-sm text-slate-800">
                        Selected service
                        <select
                          className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                          value={form.selectedService}
                          onChange={handleChange('selectedService')}
                        >
                          {serviceGroups.flatMap((group) => group.options).map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="block text-sm text-slate-800">
                        Assigned therapist
                        <select
                          className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                          value={form.assignedTherapist}
                          onChange={handleChange('assignedTherapist')}
                        >
                          {therapists.map((therapist) => (
                            <option key={therapist.value} value={therapist.value}>
                              {therapist.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="block text-sm text-slate-800">
                        Room assignment
                        <select
                          className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                          value={form.assignedRoom}
                          onChange={handleChange('assignedRoom')}
                        >
                          {rooms.map((room) => (
                            <option key={room.value} value={room.value}>
                              {room.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-5">
                      <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                        <h4 className="text-lg font-semibold mb-4">4. Payment Method</h4>
                        <div className="space-y-4">
                          <label className="flex items-center gap-3 text-sm text-slate-800">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="Credit/Debit Card"
                              checked={form.paymentMethod === 'Credit/Debit Card'}
                              onChange={handleChange('paymentMethod')}
                              className="accent-primary"
                            />
                            Credit / Debit Card
                          </label>
                          <label className="flex items-center gap-3 text-sm text-slate-800">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="UPI"
                              checked={form.paymentMethod === 'UPI'}
                              onChange={handleChange('paymentMethod')}
                              className="accent-primary"
                            />
                            UPI
                          </label>
                        </div>

                        {form.paymentMethod === 'Credit/Debit Card' && (
                          <div className="mt-5 space-y-4 rounded-[18px] border border-blue-200 bg-blue-50 p-4">
                            <h5 className="text-sm font-semibold text-slate-800">Card Details</h5>
                            <label className="block text-sm text-slate-800">
                              Card Holder Name
                              <input
                                className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                                value={form.cardHolderName}
                                onChange={handleChange('cardHolderName')}
                                placeholder="John Doe"
                              />
                            </label>
                            <label className="block text-sm text-slate-800">
                              Card Number
                              <input
                                className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                                value={form.cardNumber}
                                onChange={handleChange('cardNumber')}
                                placeholder="4532 1234 5678 9010"
                              />
                            </label>
                            <div className="grid gap-4 md:grid-cols-2">
                              <label className="block text-sm text-slate-800">
                                Expiry Date
                                <input
                                  className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                                  value={form.expiryDate}
                                  onChange={handleChange('expiryDate')}
                                  placeholder="MM/YY"
                                />
                              </label>
                              <label className="block text-sm text-slate-800">
                                CVV
                                <input
                                  className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                                  value={form.cvv}
                                  onChange={handleChange('cvv')}
                                  placeholder="123"
                                />
                              </label>
                            </div>
                          </div>
                        )}

                        {form.paymentMethod === 'UPI' && (
                          <div className="mt-5 space-y-4 rounded-[18px] border border-purple-200 bg-purple-50 p-4">
                            <h5 className="text-sm font-semibold text-slate-800">UPI Details</h5>
                            <div className="grid gap-4 md:grid-cols-2 items-start">
                              <div>
                                <label className="block text-sm text-slate-800">
                                  UPI ID
                                  <input
                                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                                    value={form.upiId}
                                    onChange={handleChange('upiId')}
                                    placeholder="you@upi"
                                  />
                                </label>
                                <label className="block text-sm text-slate-800 mt-4">
                                  App Used
                                  <select
                                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                                    value={form.upiApp}
                                    onChange={handleChange('upiApp')}
                                  >
                                    <option value="">Select UPI App</option>
                                    <option value="GPay">Google Pay (GPay)</option>
                                    <option value="PhonePe">PhonePe</option>
                                    <option value="Paytm">Paytm</option>
                                  </select>
                                </label>
                              </div>
                              <div className="flex items-center justify-center">
                                <div className="rounded-[12px] border border-slate-300 bg-white p-3">
                                  <img
                                    src="https://static.vecteezy.com/system/resources/previews/002/258/271/original/template-of-qr-code-ready-to-scan-with-smartphone-illustration-vector.jpg"
                                    alt="QR Code"
                                    className="h-32 w-32 object-cover"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="mt-6 flex justify-center">
                          <button
                            type="button"
                            className="h-12 rounded-full bg-primary px-8 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-slate-300"
                            disabled={!stepCompletion[4]}
                            onClick={handlePayment}
                          >
                            Pay to Book Appointment
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="space-y-5">
                      <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                        <h4 className="text-lg font-semibold mb-4">5. Terms & Conditions</h4>
                        <div className="space-y-4">
                          <div className="bg-white rounded-lg p-4 border border-slate-200">
                            <h5 className="font-semibold text-slate-800 mb-3">Terms & Conditions (Simple)</h5>
                            <ul className="space-y-2 text-sm text-slate-600">
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-600 mt-0.5">?</span>
                                <span>I will arrive on time for my appointment.</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-600 mt-0.5">?</span>
                                <span>I agree to make the payment before or after the service.</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-600 mt-0.5">?</span>
                                <span>I can cancel or reschedule my appointment in advance.</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-600 mt-0.5">?</span>
                                <span>I will inform any health issues or allergies before the service.</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-600 mt-0.5">?</span>
                                <span>I understand that packages are non-refundable and have validity.</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-600 mt-0.5">?</span>
                                <span>I am responsible for my personal belongings.</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <label className="flex items-start gap-3 text-sm text-slate-800 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={form.termsAccepted}
                                onChange={handleChange('termsAccepted')}
                                className="mt-1 accent-primary w-4 h-4"
                              />
                              <span className="font-medium text-amber-800">
                                ? I agree to the Terms & Conditions
                                <span className="text-red-500 ml-1">*</span>
                              </span>
                            </label>
                            <p className="text-xs text-amber-700 mt-2 ml-7">This checkbox is mandatory to proceed with booking.</p>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                          <button
                            type="button"
                            className="h-12 rounded-full bg-primary px-8 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-slate-300"
                            disabled={!stepCompletion[5]}
                            onClick={handleConfirmBooking}
                          >
                            Confirm Booking
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-muted">
                    {step < 4
                      ? 'Complete the current step to continue.'
                      : step === 4
                      ? 'Select payment method to continue.'
                      : 'Agree to terms to confirm booking.'}
                  </div>
                  <div className="flex items-center gap-3">
                    {step > 1 && (
                      <button
                        type="button"
                        className="h-12 rounded-full border border-slate-300 bg-white px-6 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                        onClick={handleStepBack}
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="button"
                      className="h-12 rounded-full border px-6 text-sm font-medium transition hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{borderColor: '#1f4d3e', color: '#1f4d3e'}}
                      onClick={handleStepNext}
                      disabled={!stepCompletion[step]}
                    >
                      Next
                    </button>
                    <button
                      type="submit"
                      className="h-12 rounded-full px-6 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-gray-300"
                      style={{backgroundColor: '#2f7d6d'}}
                      disabled={step === 5 ? !stepCompletion[5] : !stepCompletion[step]}
                    >
                      {step < 4 ? 'Next' : step === 4 ? 'Next' : 'Confirm Booking'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isViewModalOpen && selectedAppointment && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-[0_28px_60px_rgba(31,77,62,0.18)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Appointment Details</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setIsViewModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Client:</span>
                <span className="font-semibold">{selectedAppointment.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ID:</span>
                <span className="font-semibold">{selectedAppointment.clientId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Therapist:</span>
                <span className="font-semibold">{selectedAppointment.therapist}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-semibold">{selectedAppointment.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Room:</span>
                <span className="font-semibold">{selectedAppointment.room}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">{selectedAppointment.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-semibold">{selectedAppointment.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-semibold font-mono">{selectedAppointment.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-semibold ${
                  selectedAppointment.status === 'Confirmed' ? 'text-green-600' :
                  selectedAppointment.status === 'Pending' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>{selectedAppointment.status}</span>
              </div>
            </div>
            <button
              type="button"
              className="mt-6 w-full h-10 rounded-full bg-primary text-white font-semibold hover:brightness-110 transition"
              onClick={() => setIsViewModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isEditFormModalOpen && (
  <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
    <div className="w-full max-w-[920px] h-[calc(100vh-100px)] max-h-[860px] overflow-hidden rounded-[28px] bg-white shadow-[0_28px_60px_rgba(31,77,62,0.18)]">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
        <div>
          <p className="text-[13px] uppercase tracking-[1.3px] text-muted">Edit Appointment</p>
          <h3 className="text-[26px] font-semibold">Update Appointment Details</h3>
        </div>
        <button
          type="button"
          className="text-muted transition hover:text-ink"
          onClick={() => setIsEditFormModalOpen(false)}
          aria-label="Close form"
        >
          ✕
        </button>
      </div>

      <div className="flex h-full flex-col overflow-hidden px-6 py-5">
        <div className="mb-5 grid gap-3 md:grid-cols-5">
          {[
            { id: 1, label: 'Client details' },
            { id: 2, label: 'Health details' },
            { id: 3, label: 'Appointment' },
            { id: 4, label: 'Payment' },
            { id: 5, label: 'Terms' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setStep(item.id)}
              className={`rounded-2xl border px-3 py-3 text-left text-sm transition ${
                step === item.id
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-slate-200 bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-full border ${
                    stepCompletion[item.id]
                      ? 'border-emerald-500 bg-emerald-100 text-emerald-700'
                      : 'border-slate-300 bg-white text-slate-500'
                  }`}
                >
                  {stepCompletion[item.id] ? '✓' : item.id}
                </span>
                <span className="font-medium">Step {item.id}</span>
              </div>
              <p className="mt-2 text-[11px] uppercase tracking-[1px] text-muted">{item.label}</p>
            </button>
          ))}
        </div>

        <form className="flex h-full flex-col overflow-hidden" onSubmit={handleStepNext}>
          <div className="flex-1 overflow-y-auto pr-1">
            {step === 1 && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-5 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                  <h4 className="text-lg font-semibold">1. Basic Client Details</h4>
                  <label className="block text-sm text-slate-800">
                    Full Name
                    <input
                      className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                      value={form.fullName}
                      onChange={handleChange('fullName')}
                      placeholder="Enter full name"
                    />
                  </label>
                  <label className="block text-sm text-slate-800">
                    Gender
                    <select
                      className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                      value={form.gender}
                      onChange={handleChange('gender')}
                    >
                      <option value="">Select gender</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </label>
                  <label className="block text-sm text-slate-800">
                    Age / Date of Birth
                    <input
                      className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                      value={form.ageOrDob}
                      onChange={handleChange('ageOrDob')}
                      placeholder="e.g. 34 / 1990-08-12"
                    />
                  </label>
                </div>
                <div className="space-y-5 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                  <h4 className="text-lg font-semibold invisible">placeholder</h4>
                  <label className="block text-sm text-slate-800">
                    Phone Number
                    <input
                      className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      placeholder="+91 98765 43210"
                    />
                  </label>
                  <label className="block text-sm text-slate-800">
                    Email ID
                    <input
                      className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      placeholder="client@example.com"
                    />
                  </label>
                  <label className="block text-sm text-slate-800">
                    Address
                    <textarea
                      rows="3"
                      className="mt-2 w-full rounded-[18px] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 resize-none"
                      value={form.address}
                      onChange={handleChange('address')}
                      placeholder="Client address"
                    />
                  </label>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <h4 className="text-lg font-semibold">2. Health & Preference Details</h4>
                <label className="block text-sm text-slate-800">
                  Skin type / allergies
                  <input
                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                    value={form.skinType}
                    onChange={handleChange('skinType')}
                    placeholder="Example: sensitive, oily, nut allergy"
                  />
                </label>
                <label className="block text-sm text-slate-800">
                  Medical conditions (if any)
                  <textarea
                    rows="4"
                    className="mt-2 w-full rounded-[18px] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 resize-none"
                    value={form.medicalConditions}
                    onChange={handleChange('medicalConditions')}
                    placeholder="Type medical conditions here"
                  />
                </label>
                <label className="block text-sm text-slate-800">
                  Preferred services
                  <select
                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                    value={form.preferredService}
                    onChange={handleChange('preferredService')}
                  >
                    {serviceGroups.map((group) => (
                      <optgroup key={group.label} label={group.label}>
                        {group.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <h4 className="text-lg font-semibold">3. Appointment Details</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-sm text-slate-800">
                    Date of visit
                    <input
                      type="date"
                      className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                      value={form.appointmentDate || ''}
                      onChange={handleChange('appointmentDate')}
                    />
                  </label>
                  <label className="block text-sm text-slate-800">
                    Time of visit
                    <input
                      type="time"
                      className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                      value={form.appointmentTime || ''}
                      onChange={handleChange('appointmentTime')}
                    />
                  </label>
                </div>
                <label className="block text-sm text-slate-800">
                  Selected service
                  <select
                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                    value={form.selectedService}
                    onChange={handleChange('selectedService')}
                  >
                    {serviceGroups.flatMap((group) => group.options).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm text-slate-800">
                  Assigned therapist
                  <select
                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                    value={form.assignedTherapist}
                    onChange={handleChange('assignedTherapist')}
                  >
                    {therapists.map((therapist) => (
                      <option key={therapist.value} value={therapist.value}>
                        {therapist.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm text-slate-800">
                  Room assignment
                  <select
                    className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                    value={form.assignedRoom}
                    onChange={handleChange('assignedRoom')}
                  >
                    {rooms.map((room) => (
                      <option key={room.value} value={room.value}>
                        {room.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                  <h4 className="text-lg font-semibold mb-4">4. Payment Method</h4>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 text-sm text-slate-800">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Credit/Debit Card"
                        checked={form.paymentMethod === 'Credit/Debit Card'}
                        onChange={handleChange('paymentMethod')}
                        className="accent-primary"
                      />
                      Credit / Debit Card
                    </label>
                    <label className="flex items-center gap-3 text-sm text-slate-800">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="UPI"
                        checked={form.paymentMethod === 'UPI'}
                        onChange={handleChange('paymentMethod')}
                        className="accent-primary"
                      />
                      UPI
                    </label>
                  </div>

                  {form.paymentMethod === 'Credit/Debit Card' && (
                    <div className="mt-5 space-y-4 rounded-[18px] border border-blue-200 bg-blue-50 p-4">
                      <h5 className="text-sm font-semibold text-slate-800">Card Details</h5>
                      <label className="block text-sm text-slate-800">
                        Card Holder Name
                        <input
                          className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                          value={form.cardHolderName}
                          onChange={handleChange('cardHolderName')}
                          placeholder="John Doe"
                        />
                      </label>
                      <label className="block text-sm text-slate-800">
                        Card Number
                        <input
                          className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                          value={form.cardNumber}
                          onChange={handleChange('cardNumber')}
                          placeholder="4532 1234 5678 9010"
                        />
                      </label>
                      <div className="grid gap-4 md:grid-cols-2">
                        <label className="block text-sm text-slate-800">
                          Expiry Date
                          <input
                            className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                            value={form.expiryDate}
                            onChange={handleChange('expiryDate')}
                            placeholder="MM/YY"
                          />
                        </label>
                        <label className="block text-sm text-slate-800">
                          CVV
                          <input
                            className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                            value={form.cvv}
                            onChange={handleChange('cvv')}
                            placeholder="123"
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {form.paymentMethod === 'UPI' && (
                    <div className="mt-5 space-y-4 rounded-[18px] border border-purple-200 bg-purple-50 p-4">
                      <h5 className="text-sm font-semibold text-slate-800">UPI Details</h5>
                      <div className="grid gap-4 md:grid-cols-2 items-start">
                        <div>
                          <label className="block text-sm text-slate-800">
                            UPI ID
                            <input
                              className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                              value={form.upiId}
                              onChange={handleChange('upiId')}
                              placeholder="you@upi"
                            />
                          </label>
                          <label className="block text-sm text-slate-800 mt-4">
                            App Used
                            <select
                              className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                              value={form.upiApp}
                              onChange={handleChange('upiApp')}
                            >
                              <option value="">Select UPI App</option>
                              <option value="GPay">Google Pay (GPay)</option>
                              <option value="PhonePe">PhonePe</option>
                              <option value="Paytm">Paytm</option>
                            </select>
                          </label>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="rounded-[12px] border border-slate-300 bg-white p-3">
                            <img
                              src="https://static.vecteezy.com/system/resources/previews/002/258/271/original/template-of-qr-code-ready-to-scan-with-smartphone-illustration-vector.jpg"
                              alt="QR Code"
                              className="h-32 w-32 object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-5">
                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                  <h4 className="text-lg font-semibold mb-4">5. Terms & Conditions</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h5 className="font-semibold text-slate-800 mb-3">Terms & Conditions (Simple)</h5>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 mt-0.5">✓</span>
                          <span>I will arrive on time for my appointment.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 mt-0.5">✓</span>
                          <span>I agree to make the payment before or after the service.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 mt-0.5">✓</span>
                          <span>I can cancel or reschedule my appointment in advance.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 mt-0.5">✓</span>
                          <span>I will inform any health issues or allergies before the service.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 mt-0.5">✓</span>
                          <span>I understand that packages are non-refundable and have validity.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-600 mt-0.5">✓</span>
                          <span>I am responsible for my personal belongings.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <label className="flex items-start gap-3 text-sm text-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.termsAccepted}
                          onChange={handleChange('termsAccepted')}
                          className="mt-1 accent-primary w-4 h-4"
                        />
                        <span className="font-medium text-amber-800">
                          ✓ I agree to the Terms & Conditions
                          <span className="text-red-500 ml-1">*</span>
                        </span>
                      </label>
                      <p className="text-xs text-amber-700 mt-2 ml-7">This checkbox is mandatory to proceed with booking.</p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      className="h-12 rounded-full bg-primary px-8 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-slate-300"
                      disabled={!stepCompletion[5]}
                      onClick={() => {
                        setAppointments(appointments.map(apt => 
                          apt.id === editingAppointment.id 
                            ? {...apt, clientName: form.fullName, service: form.selectedService, therapist: form.assignedTherapist, room: form.assignedRoom}
                            : apt
                        ))
                        setIsEditFormModalOpen(false)
                        setStep(1)
                        setForm(initialFormState)
                      }}
                    >
                      Update Appointment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted">
              {step < 4
                ? 'Complete the current step to continue.'
                : step === 4
                ? 'Select payment method to continue.'
                : 'Agree to terms to confirm update.'}
            </div>
            <div className="flex items-center gap-3">
              {step > 1 && (
                <button
                  type="button"
                  className="h-12 rounded-full border border-slate-300 bg-white px-6 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  onClick={handleStepBack}
                >
                  Back
                </button>
              )}
              {step < 5 && (
                <button
                  type="button"
                  className="h-12 rounded-full border px-6 text-sm font-medium transition hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{borderColor: '#1f4d3e', color: '#1f4d3e'}}
                  onClick={handleStepNext}
                  disabled={!stepCompletion[step]}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

      {isEditModalOpen && editingAppointment && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-[920px] h-[calc(100vh-100px)] max-h-[860px] overflow-hidden rounded-[28px] bg-white shadow-[0_28px_60px_rgba(31,77,62,0.18)]">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-[13px] uppercase tracking-[1.3px] text-muted">Edit Appointment</p>
                <h3 className="text-[26px] font-semibold">Update Appointment Details</h3>
              </div>
              <button
                type="button"
                className="text-muted transition hover:text-ink"
                onClick={() => setIsEditModalOpen(false)}
                aria-label="Close form"
              >
                ✕
              </button>
            </div>

            <div className="flex h-full flex-col overflow-hidden px-6 py-5">
              <form className="flex h-full flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto pr-1">
                  <div className="space-y-5 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                    <h4 className="text-lg font-semibold">Appointment Information</h4>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm text-slate-800">Client Name</label>
                        <input
                          disabled
                          className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-gray-100 px-4 text-sm text-slate-900 cursor-not-allowed"
                          value={editingAppointment.clientName}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-800">Service</label>
                        <input
                          disabled
                          className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-gray-100 px-4 text-sm text-slate-900 cursor-not-allowed"
                          value={editingAppointment.service}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm text-slate-800">Date</label>
                        <input
                          disabled
                          className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-gray-100 px-4 text-sm text-slate-900 cursor-not-allowed"
                          value={editingAppointment.date}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-800">Time</label>
                        <input
                          disabled
                          className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-gray-100 px-4 text-sm text-slate-900 cursor-not-allowed"
                          value={editingAppointment.time}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm text-slate-800">Therapist</label>
                        <input
                          disabled
                          className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-gray-100 px-4 text-sm text-slate-900 cursor-not-allowed"
                          value={editingAppointment.therapist}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-800">Room</label>
                        <input
                          disabled
                          className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-gray-100 px-4 text-sm text-slate-900 cursor-not-allowed"
                          value={editingAppointment.room}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-slate-800">Status</label>
                      <select 
                        className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-white px-4 text-sm text-slate-900"
                        defaultValue={editingAppointment.status}
                        onChange={(e) => {
                          setEditingAppointment({...editingAppointment, status: e.target.value})
                        }}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-slate-800">Transaction ID</label>
                      <input
                        disabled
                        className="mt-2 h-11 w-full rounded-[18px] border border-slate-300 bg-gray-100 px-4 text-sm text-slate-900 cursor-not-allowed"
                        value={editingAppointment.transactionId}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-end">
                  <button
                    type="button"
                    className="h-12 rounded-full border border-slate-300 bg-white px-6 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="h-12 rounded-full px-6 text-sm font-semibold text-white transition hover:brightness-110"
                    style={{backgroundColor: '#1f4d3e'}}
                    onClick={() => {
                      setAppointments(appointments.map(apt => 
                        apt.id === editingAppointment.id ? editingAppointment : apt
                      ))
                      setIsEditModalOpen(false)
                    }}
                  >
                    Update Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isPaymentSuccessOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-[28px] bg-white p-6 text-center shadow-[0_28px_60px_rgba(31,77,62,0.18)]">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              ?
            </div>
            <h3 className="text-xl font-semibold text-emerald-700">Successfully Paid!</h3>
            <div className="mt-4 space-y-2">
              <p className="text-lg font-medium text-slate-800">Thank you, {customerName}!</p>
              <div className="space-y-1">
                <p className="text-sm text-slate-600">Service: <span className="font-semibold">{form.selectedService}</span></p>
                <p className="text-sm text-slate-600">Transaction ID: <span className="font-mono font-semibold">{transactionId}</span></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSuccessOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-md mx-4 rounded-[28px] bg-white p-6 text-center shadow-[0_28px_60px_rgba(31,77,62,0.18)]">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              ?
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-emerald-700">Appointment booked successfully!</h3>
            <div className="mt-4 space-y-2">
              <p className="text-base md:text-lg font-medium text-emerald-700">Thank you, {customerName}!</p>
              <p className="text-sm md:text-base text-slate-600">Your appointment has been confirmed</p>
              <div className="mt-3 rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Transaction ID</p>
                <p className="text-sm md:text-base font-mono font-semibold text-slate-800">{transactionId}</p>
              </div>
            </div>
            <button
              type="button"
              className="mt-6 w-full inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white hover:brightness-110 transition"
              onClick={() => setIsSuccessOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppointmentsView
