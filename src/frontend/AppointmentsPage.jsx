import { useState } from 'react'

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
      clientName: 'Sarah Anderson',
      therapist: 'Sarah Jenkins',
      service: 'Swedish Massage',
      room: 'Room 101 - Massage Suite',
      dateTime: 'Apr 14, 10:30 AM',
      status: 'Confirmed',
      transactionId: 'TXN12345678'
    },
    {
      id: 2,
      clientName: 'Michael Chen',
      therapist: 'Julian Reed',
      service: 'Deep Tissue Massage',
      room: 'Room 103 - Wellness Suite',
      dateTime: 'Apr 14, 2:00 PM',
      status: 'Pending',
      transactionId: 'TXN87654321'
    }
  ])

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
    // Generate transaction ID
    const txnId = 'TXN' + Date.now().toString().slice(-8)
    setTransactionId(txnId)
    setCustomerName(form.fullName)
    
    // Add new appointment to appointments array
    const newAppointment = {
      id: appointments.length + 1,
      clientName: form.fullName,
      therapist: form.assignedTherapist,
      service: form.selectedService,
      room: form.assignedRoom,
      dateTime: `${form.appointmentDate}, ${form.appointmentTime}`,
      status: 'Pending', // New appointments start as pending
      transactionId: txnId
    }
    
    setAppointments([...appointments, newAppointment])
    setPaymentSuccess(true)
    setIsSuccessOpen(true)
    setIsModalOpen(false)
    setStep(1)
    setForm(initialFormState)
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
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-[28px] font-semibold">Appointments</h3>
          <p className="text-sm text-muted">Manage admissions, bookings and therapist assignments.</p>
        </div>
        <button
          type="button"
          className="rounded-full bg-primary px-6 py-3 text-[13px] font-semibold uppercase tracking-[1px] text-white shadow-soft transition hover:brightness-110"
          onClick={openModal}
        >
          + New Appointment
        </button>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Today's Total Appointments</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{appointments.length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Confirmed Appointments</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{appointments.filter(a => a.status === 'Confirmed').length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Pending Appointments</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{appointments.filter(a => a.status === 'Pending').length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
              <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Reminder/Alert Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-900">Important Reminder</h4>
            <p className="text-sm text-blue-700 mt-1">New client arrives at 4:30 PM - Room 102 - Facial Room</p>
          </div>
        </div>
      </div>

      
      {/* Appointment Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h4 className="text-lg font-semibold text-slate-900">Appointment Schedule</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Client Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Therapist</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-slate-600">
                          {appointment.clientName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{appointment.clientName}</div>
                        <div className="text-sm text-slate-500">{appointment.transactionId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{appointment.therapist}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{appointment.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{appointment.room}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{appointment.dateTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      appointment.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                      appointment.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                      appointment.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {appointment.status === 'Confirmed' && 'Confirmed'}
                      {appointment.status === 'Pending' && 'Pending'}
                      {appointment.status === 'In Progress' && 'In Progress'}
                      {appointment.status === 'Completed' && 'Completed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button type="button" className="text-slate-600 hover:text-slate-900" title="View">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button type="button" className="text-slate-600 hover:text-slate-900" title="Edit">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button type="button" className="text-red-600 hover:text-red-900" title="Delete">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                      className="h-12 rounded-full border border-slate-300 bg-white px-6 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                      onClick={handleStepNext}
                      disabled={!stepCompletion[step]}
                    >
                      Next
                    </button>
                    <button
                      type="submit"
                      className="h-12 rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-slate-300"
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
