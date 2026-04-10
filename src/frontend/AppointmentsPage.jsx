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
  appointmentDateTime: '2026-04-15T10:00',
  selectedService: 'Swedish Massage',
  assignedTherapist: 'Sarah Jenkins',
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
  const [step, setStep] = useState(1)

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
      Boolean(form.assignedTherapist),
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
      setIsSuccessOpen(true)
      setIsModalOpen(false)
      setStep(1)
      setForm(initialFormState)
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
      <div className="appointments-header flex items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-[28px] font-semibold">Appointments</h3>
          <p className="text-sm text-muted">Manage admissions, bookings and therapist assignments.</p>
        </div>
        <button
          type="button"
          className="rounded-full bg-primary px-5 py-3 text-[13px] font-semibold uppercase tracking-[1px] text-white shadow-soft transition hover:brightness-110"
          onClick={openModal}
        >
          New Appointment
        </button>
      </div>

      <div className="appointments-grid">
        <div className="appointments-main">
          <article className="feature-card wide">
            <span className="tag">Latest admission</span>
            <div className="feature-content">
              <div>
                <h3>New client intake and booking tracker</h3>
                <p className="muted">Create admissions quickly and keep every appointment on schedule.</p>
                <div className="pill-row">
                  <button type="button" className="pill">Review form</button>
                  <button type="button" className="pill ghost">Download summary</button>
                </div>
              </div>
            </div>
          </article>

          <div className="appointment-list">
            {appointmentItems.map((item) => (
              <div key={item.title} className="appointment-item">
                <div className="avatar"></div>
                <div>
                  <p className="appointment-date">{item.date}</p>
                  <h5>{item.title}</h5>
                  <span className="muted">Assigned therapist {item.therapist}</span>
                </div>
                <div className="appointment-actions">
                  <span className={`status-badge ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                  <button type="button" className="pill ghost">Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="appointments-side">
          <div className="tip-card">
            <h5>Admission checklist</h5>
            <p className="muted">Collect client details, medical disclosures, and payment terms before confirming.</p>
          </div>
          <div className="stats-card">
            <p className="muted">Today's admissions</p>
            <div className="stat-row">
              <span>Total booked</span>
              <strong>8</strong>
            </div>
            <div className="stat-row">
              <span>Available therapists</span>
              <strong>3</strong>
            </div>
          </div>
          <div className="prep-card">
            <p className="muted">Reminder</p>
            <ul>
              <li>Require signed consent</li>
              <li>Confirm therapist availability</li>
              <li>Review health disclosures</li>
            </ul>
          </div>
        </aside>
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

      {isSuccessOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-[28px] bg-white p-6 text-center shadow-[0_28px_60px_rgba(31,77,62,0.18)]">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              ?
            </div>
            <h3 className="text-2xl font-semibold">Successfully Updated!</h3>
            <div className="mt-4 space-y-2">
              <p className="text-lg font-medium text-emerald-700">Thank you, {customerName}!</p>
              <p className="text-sm text-slate-600">Your appointment has been confirmed</p>
              <div className="mt-3 rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Transaction ID</p>
                <p className="text-sm font-mono font-semibold text-slate-800">{transactionId}</p>
              </div>
            </div>
            <button
              type="button"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white hover:brightness-110 transition"
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
