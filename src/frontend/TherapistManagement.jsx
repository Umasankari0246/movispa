import { useState, useEffect } from 'react'
import React from 'react'
import MaterialSymbol from '../components/MaterialSymbol.jsx'

const TherapistManagement = () => {
  const [activeTab, setActiveTab] = useState('details')
  const [showAddTherapist, setShowAddTherapist] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [therapists, setTherapists] = useState([
    {
      id: 1,
      name: 'Sarah Jenkins',
      phone: '+1 (555) 123-4567',
      email: 'sarah.jenkins@movicloudspa.com',
      specialization: 'Deep Tissue Massage',
      experience: 8,
      profilePhoto: null,
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      startTime: '09:00',
      endTime: '18:00',
      leaveDates: ['2024-04-15', '2024-04-16'],
      assignedServices: ['Aromatherapy Massage', 'Deep Tissue Massage', 'Swedish Massage'],
      appointments: [
        {
          id: 1,
          clientName: 'Emily Johnson',
          service: 'Aromatherapy Massage',
          date: '2024-04-12',
          time: '10:00 AM',
          status: 'Confirmed',
          notes: ''
        },
        {
          id: 2,
          clientName: 'Michael Brown',
          service: 'Deep Tissue Massage',
          date: '2024-04-12',
          time: '2:00 PM',
          status: 'Completed',
          notes: 'Client had lower back tension, focused on lumbar region'
        },
        {
          id: 5,
          clientName: 'Lisa Anderson',
          service: 'Swedish Massage',
          date: '2024-04-14',
          time: '11:30 AM',
          status: 'Confirmed',
          notes: ''
        }
      ]
    },
    {
      id: 2,
      name: 'Julian Reed',
      phone: '+1 (555) 234-5678',
      email: 'julian.reed@movicloudspa.com',
      specialization: 'Sports Therapy',
      experience: 12,
      profilePhoto: null,
      workingDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      startTime: '08:00',
      endTime: '17:00',
      leaveDates: [],
      assignedServices: ['Sports Therapy', 'Swedish Massage', 'Body Spa'],
      appointments: [
        {
          id: 3,
          clientName: 'David Wilson',
          service: 'Sports Therapy',
          date: '2024-04-13',
          time: '11:00 AM',
          status: 'Confirmed',
          notes: ''
        },
        {
          id: 6,
          clientName: 'James Taylor',
          service: 'Body Spa',
          date: '2024-04-15',
          time: '3:00 PM',
          status: 'Confirmed',
          notes: ''
        }
      ]
    },
    {
      id: 3,
      name: 'Elena Moretti',
      phone: '+1 (555) 345-6789',
      email: 'elena.moretti@movicloudspa.com',
      specialization: 'Energy Work',
      experience: 6,
      profilePhoto: null,
      workingDays: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
      startTime: '10:00',
      endTime: '19:00',
      leaveDates: ['2024-04-20'],
      assignedServices: ['Herbal Facial', 'Skin Care', 'Aromatherapy Massage'],
      appointments: [
        {
          id: 4,
          clientName: 'Sarah Martinez',
          service: 'Herbal Facial',
          date: '2024-04-13',
          time: '3:00 PM',
          status: 'Cancelled',
          notes: 'Client cancelled due to emergency'
        },
        {
          id: 7,
          clientName: 'Nina Patel',
          service: 'Skin Care',
          date: '2024-04-16',
          time: '2:00 PM',
          status: 'Confirmed',
          notes: ''
        }
      ]
    },
    {
      id: 4,
      name: 'Marcus Chen',
      phone: '+1 (555) 456-7890',
      email: 'marcus.chen@movicloudspa.com',
      specialization: 'Swedish Massage',
      experience: 10,
      profilePhoto: null,
      workingDays: ['Monday', 'Wednesday', 'Friday'],
      startTime: '09:00',
      endTime: '17:00',
      leaveDates: [],
      assignedServices: ['Swedish Massage', 'Aromatherapy Massage', 'Body Spa'],
      appointments: [
        {
          id: 8,
          clientName: 'Robert Kim',
          service: 'Swedish Massage',
          date: '2024-04-14',
          time: '9:00 AM',
          status: 'Confirmed',
          notes: ''
        }
      ]
    },
    {
      id: 5,
      name: 'Isabella Rodriguez',
      phone: '+1 (555) 567-8901',
      email: 'isabella.rodriguez@movicloudspa.com',
      specialization: 'Herbal Facial',
      experience: 7,
      profilePhoto: null,
      workingDays: ['Tuesday', 'Thursday', 'Saturday'],
      startTime: '10:00',
      endTime: '18:00',
      leaveDates: ['2024-04-25'],
      assignedServices: ['Herbal Facial', 'Skin Care', 'Aromatherapy Massage'],
      appointments: [
        {
          id: 9,
          clientName: 'Amanda White',
          service: 'Herbal Facial',
          date: '2024-04-17',
          time: '1:00 PM',
          status: 'Confirmed',
          notes: ''
        },
        {
          id: 10,
          clientName: 'Sophie Turner',
          service: 'Skin Care',
          date: '2024-04-18',
          time: '11:00 AM',
          status: 'Confirmed',
          notes: ''
        }
      ]
    }
  ])

  const [selectedTherapist, setSelectedTherapist] = useState(therapists[0])
  const [editingTherapist, setEditingTherapist] = useState(null)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [availabilityDraft, setAvailabilityDraft] = useState({
    workingDays: therapists[0].workingDays,
    startTime: therapists[0].startTime,
    endTime: therapists[0].endTime,
    leaveDates: therapists[0].leaveDates,
    useDefaultHours: false
  })
  const [serviceDraft, setServiceDraft] = useState(therapists[0].assignedServices)
  const [isAvailabilityEditing, setIsAvailabilityEditing] = useState(false)
  const [isServiceEditing, setIsServiceEditing] = useState(false)
  const [showLeaveDateInput, setShowLeaveDateInput] = useState(false)
  const [newLeaveDate, setNewLeaveDate] = useState('')

  useEffect(() => {
    setAvailabilityDraft({
      workingDays: selectedTherapist.workingDays,
      startTime: selectedTherapist.startTime,
      endTime: selectedTherapist.endTime,
      leaveDates: selectedTherapist.leaveDates,
      useDefaultHours: false
    })
    setServiceDraft(selectedTherapist.assignedServices)
  }, [selectedTherapist])

  const todayDate = new Date().toLocaleDateString('en-CA')
  const todayWeekday = new Date().toLocaleString('en-US', { weekday: 'long' })

  const filteredTherapists = therapists.filter(therapist => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return true
    return (
      therapist.name.toLowerCase().includes(query) ||
      therapist.specialization.toLowerCase().includes(query) ||
      therapist.email.toLowerCase().includes(query)
    )
  })

  const totalTherapists = therapists.length
  const therapistsOnLeaveToday = therapists.filter(therapist => therapist.leaveDates.includes(todayDate)).length
  const therapistsAvailableToday = therapists.filter(therapist =>
    therapist.workingDays.includes(todayWeekday) && !therapist.leaveDates.includes(todayDate)
  ).length
  const activeSessions = therapists.reduce((count, therapist) => {
    return count + therapist.appointments.filter(appointment =>
      appointment.status === 'Confirmed' && appointment.date === todayDate
    ).length
  }, 0)

  const availableServices = [
    'Swedish Massage',
    'Deep Tissue Massage',
    'Aromatherapy Massage',
    'Basic Facial',
    'Herbal Facial',
    'Anti-Aging Facial',
    'Acne Treatment Facial',
    'Manicure',
    'Pedicure',
    'Nail Art',
    'Body Scrub',
    'Body Polishing',
    'Body Wrap',
    'Hair Spa',
    'Hair Cut',
    'Hair Coloring',
    'Hair Smoothening / Straightening',
    'Steam Bath',
    'Yoga Session',
    'Meditation Therapy'
  ]

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const handleUpdateAppointmentStatus = (appointmentId, newStatus, notes) => {
    setTherapists(prev => prev.map(therapist => {
      if (therapist.id === selectedTherapist.id) {
        const updatedAppointments = therapist.appointments.map(apt => 
          apt.id === appointmentId ? { ...apt, status: newStatus, notes } : apt
        )
        const updatedTherapist = { ...therapist, appointments: updatedAppointments }
        setSelectedTherapist(updatedTherapist)
        return updatedTherapist
      }
      return therapist
    }))
  }

  const handleUpdateTherapistDetails = (updatedDetails) => {
    setTherapists(prev => prev.map(therapist => 
      therapist.id === selectedTherapist.id 
        ? { ...therapist, ...updatedDetails }
        : therapist
    ))
    setSelectedTherapist(prev => ({ ...prev, ...updatedDetails }))
    setEditingTherapist(null)
  }

  const handleAddTherapist = (newTherapistData) => {
    const newTherapist = {
      id: Math.max(...therapists.map(t => t.id), 0) + 1,
      ...newTherapistData,
      profilePhoto: null,
      workingDays: [],
      startTime: '09:00',
      endTime: '18:00',
      leaveDates: [],
      assignedServices: [],
      appointments: []
    }
    setTherapists(prev => [...prev, newTherapist])
    setSelectedTherapist(newTherapist)
    setActiveTab('details')
    setEditingTherapist(null)
    setAvailabilityDraft({
      workingDays: [],
      startTime: '09:00',
      endTime: '18:00',
      useDefaultHours: false
    })
    setServiceDraft([])
    setShowAddTherapist(false)
  }

  const handleSaveAvailability = () => {
    const updatedHours = availabilityDraft.useDefaultHours
      ? { startTime: '09:00', endTime: '18:00' }
      : { startTime: availabilityDraft.startTime, endTime: availabilityDraft.endTime }

    const updatedTherapist = {
      ...selectedTherapist,
      workingDays: availabilityDraft.workingDays,
      startTime: updatedHours.startTime,
      endTime: updatedHours.endTime,
      leaveDates: availabilityDraft.leaveDates
    }

    setTherapists(prev => prev.map(therapist =>
      therapist.id === selectedTherapist.id ? updatedTherapist : therapist
    ))
    setSelectedTherapist(updatedTherapist)
    setIsAvailabilityEditing(false)
    setShowLeaveDateInput(false)
  }

  const handleCancelAvailability = () => {
    setAvailabilityDraft({
      workingDays: selectedTherapist.workingDays,
      startTime: selectedTherapist.startTime,
      endTime: selectedTherapist.endTime,
      leaveDates: selectedTherapist.leaveDates,
      useDefaultHours: false
    })
    setIsAvailabilityEditing(false)
    setShowLeaveDateInput(false)
  }

  const handleSaveServices = () => {
    const updatedTherapist = {
      ...selectedTherapist,
      assignedServices: serviceDraft
    }

    setTherapists(prev => prev.map(therapist =>
      therapist.id === selectedTherapist.id ? updatedTherapist : therapist
    ))
    setSelectedTherapist(updatedTherapist)
    setIsServiceEditing(false)
  }

  const handleCancelServices = () => {
    setServiceDraft(selectedTherapist.assignedServices)
    setIsServiceEditing(false)
  }

  const handleToggleSelectAllServices = () => {
    if (serviceDraft.length === availableServices.length) {
      setServiceDraft([])
    } else {
      setServiceDraft([...availableServices])
    }
  }

  const handleAddLeaveDate = (date) => {
    setAvailabilityDraft(prev => ({
      ...prev,
      leaveDates: [...prev.leaveDates, date]
    }))
    setNewLeaveDate('')
  }

  const handleRemoveLeaveDate = (dateToRemove) => {
    setAvailabilityDraft(prev => ({
      ...prev,
      leaveDates: prev.leaveDates.filter(date => date !== dateToRemove)
    }))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'text-green-600 bg-green-50'
      case 'Completed': return 'text-blue-600 bg-blue-50'
      case 'Cancelled': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="view-body">
      <div className="space-y-6">
        {/* Main Content Area */}
        <div>
<div className="grid gap-4 mb-6 md:grid-cols-3">
                <div className="stats-card">
                  <p className="text-sm text-muted uppercase tracking-[1px]">Total Therapists</p>
                  <p className="text-3xl font-semibold mt-3">{totalTherapists}</p>
                </div>
                <div className="stats-card">
                  <p className="text-sm text-muted uppercase tracking-[1px]">Available Today</p>
                  <p className="text-3xl font-semibold mt-3">{therapistsAvailableToday}</p>
                </div>
                <div className="stats-card">
                  <p className="text-sm text-muted uppercase tracking-[1px]">On Leave</p>
                  <p className="text-3xl font-semibold mt-3">{therapistsOnLeaveToday}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
                <label className="relative flex-1">
                  <MaterialSymbol name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search therapist, specialization, or email..."
                    className="w-full h-12 rounded-[18px] border border-primary/15 bg-white pl-12 pr-4 text-[14px] shadow-[0_8px_16px_rgba(31,77,62,0.06)]"
                  />
                </label>
                <button
                  onClick={() => setShowAddTherapist(true)}
                  className="h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white text-sm uppercase tracking-[1.2px] px-6 shadow-[0_18px_28px_rgba(31,77,62,0.28)] hover:scale-[1.02] transition-all"
                >
                  + Add New Therapist
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="chip-row mb-6">
                {[
                  { id: 'details', label: 'Details' },
                  { id: 'availability', label: 'Availability' },
                  { id: 'services', label: 'Services' },
                  { id: 'appointments', label: 'Appointments' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`chip ${activeTab === tab.id ? 'active' : ''}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-2xl p-6 shadow-soft">
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-[1.15fr_1.4fr]">
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted uppercase tracking-[1px]">Therapists</p>
                        <h4 className="text-lg font-semibold">Available team</h4>
                      </div>
                      <span className="text-sm text-muted">Showing {filteredTherapists.length} of {totalTherapists}</span>
                    </div>
                    <div className="space-y-3">
                      {filteredTherapists.length > 0 ? (
                        filteredTherapists.map(therapist => (
                          <button
                            key={therapist.id}
                            type="button"
                            onClick={() => setSelectedTherapist(therapist)}
                            className={`w-full text-left flex items-center justify-between gap-4 rounded-2xl border p-4 transition ${selectedTherapist.id === therapist.id ? 'border-primary/15 bg-white shadow-soft' : 'border-transparent bg-white/80 hover:bg-white'}`}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                                {therapist.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="font-medium">{therapist.name}</p>
                                <p className="text-sm text-muted">{therapist.specialization}</p>
                              </div>
                            </div>
                          </button>
                        ))
                      ) : (
                        <p className="text-sm text-muted">No therapists match your search.</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">Therapist Details</h3>
                        <p className="text-sm text-muted">Selected profile and summary data appear here.</p>
                      </div>
                      {!editingTherapist && (
                        <button 
                          onClick={() => setEditingTherapist(selectedTherapist)}
                          className="h-10 rounded-full bg-primary px-4 text-sm uppercase tracking-[1.2px] text-white hover:brightness-110"
                        >
                          Edit Details
                        </button>
                      )}
                    </div>

                    {editingTherapist ? (
                      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                        <TherapistDetailsForm
                          therapist={editingTherapist}
                          onSave={handleUpdateTherapistDetails}
                          onCancel={() => setEditingTherapist(null)}
                        />
                      </div>
                    ) : (
                      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-muted uppercase tracking-[1px]">Full Name</p>
                              <p className="font-medium">{selectedTherapist.name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted uppercase tracking-[1px]">Phone Number</p>
                              <p className="font-medium">{selectedTherapist.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted uppercase tracking-[1px]">Email Address</p>
                              <p className="font-medium">{selectedTherapist.email}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-muted uppercase tracking-[1px]">Specialization</p>
                              <p className="font-medium">{selectedTherapist.specialization}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted uppercase tracking-[1px]">Experience</p>
                              <p className="font-medium">{selectedTherapist.experience} years</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted uppercase tracking-[1px]">Profile Photo</p>
                              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-xl">
                                {selectedTherapist.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'availability' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold">Availability Schedule</h3>
                    <p className="text-sm text-muted">Manage working days, hours, and leave dates</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAvailabilityEditing(prev => !prev)}
                    className="h-10 rounded-full bg-primary px-4 text-sm uppercase tracking-[1.2px] text-white hover:brightness-110"
                  >
                    {isAvailabilityEditing ? 'Cancel Edit' : 'Edit Availability'}
                  </button>
                </div>

                {isAvailabilityEditing ? (
                  <>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-muted uppercase tracking-[1px] mb-3">Working Days</p>
                        <div className="space-y-2">
                          {daysOfWeek.map(day => (
                            <label key={day} className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={availabilityDraft.workingDays.includes(day)}
                                className="accent-primary"
                                onChange={() => {
                                  setAvailabilityDraft(prev => ({
                                    ...prev,
                                    workingDays: prev.workingDays.includes(day)
                                      ? prev.workingDays.filter(d => d !== day)
                                      : [...prev.workingDays, day]
                                  }))
                                }}
                              />
                              <span className={availabilityDraft.workingDays.includes(day) ? 'font-medium' : 'text-muted'}>
                                {day}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm text-muted uppercase tracking-[1px]">Working Hours</p>
                            <label className="flex items-center gap-2 text-sm text-muted">
                              <input
                                type="checkbox"
                                checked={availabilityDraft.useDefaultHours}
                                onChange={(e) => {
                                  const useDefault = e.target.checked
                                  setAvailabilityDraft(prev => ({
                                    ...prev,
                                    useDefaultHours: useDefault,
                                    startTime: useDefault ? '09:00' : prev.startTime,
                                    endTime: useDefault ? '18:00' : prev.endTime
                                  }))
                                }}
                                className="accent-primary"
                              />
                              Use default spa hours
                            </label>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm text-muted uppercase tracking-[1px] mb-2">Start Time</label>
                              <input
                                type="time"
                                value={availabilityDraft.startTime}
                                onChange={(e) => setAvailabilityDraft(prev => ({ ...prev, startTime: e.target.value }))}
                                className="w-full h-10 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] shadow-[0_8px_16px_rgba(31,77,62,0.06)]"
                                disabled={availabilityDraft.useDefaultHours}
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-muted uppercase tracking-[1px] mb-2">End Time</label>
                              <input
                                type="time"
                                value={availabilityDraft.endTime}
                                onChange={(e) => setAvailabilityDraft(prev => ({ ...prev, endTime: e.target.value }))}
                                className="w-full h-10 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] shadow-[0_8px_16px_rgba(31,77,62,0.06)]"
                                disabled={availabilityDraft.useDefaultHours}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted uppercase tracking-[1px] mb-3">Leave/Unavailable Dates</p>
                          <div className="space-y-2">
                            {availabilityDraft.leaveDates.length > 0 ? (
                              availabilityDraft.leaveDates.map(date => (
                                <div key={date} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                                  <span className="text-red-600">{date}</span>
                                  <button 
                                    onClick={() => handleRemoveLeaveDate(date)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <MaterialSymbol name="close" className="text-[16px]" />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <p className="text-muted">No leave dates scheduled</p>
                            )}
                          </div>
                          {showLeaveDateInput ? (
                            <div className="mt-3 space-y-3">
                              <input
                                type="date"
                                value={newLeaveDate}
                                onChange={(e) => setNewLeaveDate(e.target.value)}
                                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px]"
                              />
                              <div className="flex gap-3 justify-end">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (newLeaveDate) {
                                      handleAddLeaveDate(newLeaveDate)
                                      setShowLeaveDateInput(false)
                                    }
                                  }}
                                  className="pill text-sm"
                                >
                                  Add Date
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowLeaveDateInput(false)
                                    setNewLeaveDate('')
                                  }}
                                  className="pill ghost text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button 
                              type="button"
                              onClick={() => setShowLeaveDateInput(true)}
                              className="pill mt-3"
                            >
                              + Add Leave Date
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={handleCancelAvailability}
                        className="h-11 rounded-full border border-primary/20 text-primary text-sm uppercase tracking-[1.2px] px-6 hover:bg-primary/10"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveAvailability}
                        className="h-11 rounded-full bg-gradient-to-br from-primary to-accent text-white text-sm uppercase tracking-[1.2px] px-6 shadow-[0_18px_28px_rgba(31,77,62,0.28)] hover:scale-[1.02] transition-all"
                      >
                        Save Availability
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted uppercase tracking-[1px]">Working Days</p>
                        <p className="font-medium">{selectedTherapist.workingDays.join(', ') || 'Not set'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted uppercase tracking-[1px]">Start Time</p>
                        <p className="font-medium">{selectedTherapist.startTime}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted uppercase tracking-[1px]">End Time</p>
                        <p className="font-medium">{selectedTherapist.endTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted uppercase tracking-[1px]">Leave Dates</p>
                        {selectedTherapist.leaveDates.length > 0 ? (
                          <ul className="list-disc pl-5 text-sm space-y-1">
                            {selectedTherapist.leaveDates.map(date => (
                              <li key={date} className="text-muted">{date}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="font-medium">No leave dates scheduled</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold">Assigned Services</h3>
                    <p className="text-sm text-muted uppercase tracking-[1px]">Services this therapist can perform</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsServiceEditing(prev => !prev)}
                    className="h-10 rounded-full bg-primary px-4 text-sm uppercase tracking-[1.2px] text-white hover:brightness-110"
                  >
                    {isServiceEditing ? 'Cancel Edit' : 'Edit Services'}
                  </button>
                </div>

                {isServiceEditing ? (
                  <>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-muted uppercase tracking-[1px] mb-3">Select services</p>
                      <button
                        type="button"
                        onClick={handleToggleSelectAllServices}
                        className="h-10 rounded-full border border-primary/20 px-4 text-sm uppercase tracking-[1.2px] text-primary hover:bg-primary/10"
                      >
                        {serviceDraft.length === availableServices.length ? 'Clear All' : 'Select All'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-2">
                      {availableServices.map(service => (
                        <label key={service} className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50">
                          <input
                            type="checkbox"
                            checked={serviceDraft.includes(service)}
                            onChange={() => {
                              setServiceDraft(prev => prev.includes(service)
                                ? prev.filter(s => s !== service)
                                : [...prev, service]
                              )
                            }}
                            className="accent-primary w-5 h-5"
                          />
                          <span className={`text-base ${serviceDraft.includes(service) ? 'font-medium' : ''}`}>
                            {service}
                          </span>
                        </label>
                      ))}
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={handleCancelServices}
                        className="h-11 rounded-full border border-primary/20 text-primary text-sm uppercase tracking-[1.2px] px-6 hover:bg-primary/10"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveServices}
                        className="h-11 rounded-full bg-gradient-to-br from-primary to-accent text-white text-sm uppercase tracking-[1.2px] px-6 shadow-[0_18px_28px_rgba(31,77,62,0.28)] hover:scale-[1.02] transition-all"
                      >
                        Save Services
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    {selectedTherapist.assignedServices.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted">
                        {selectedTherapist.assignedServices.map(service => (
                          <li key={service}>{service}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="font-medium">No services assigned</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Assigned Appointments</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted">
                      {selectedTherapist.appointments.length} appointment{selectedTherapist.appointments.length !== 1 ? 's' : ''}
                    </span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {selectedTherapist.appointments.filter(apt => apt.status === 'Confirmed').length} confirmed
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {selectedTherapist.appointments.map(appointment => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      onUpdateStatus={handleUpdateAppointmentStatus}
                    />
                  ))}
                  
                  {selectedTherapist.appointments.length === 0 && (
                    <div className="text-center py-8 text-muted">
                      <p>No appointments assigned to {selectedTherapist.name}</p>
                      <p className="text-sm mt-2">Appointments will appear here when assigned.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddTherapist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-6">
          <div className="w-full max-w-3xl rounded-[32px] bg-slate-50 p-6 shadow-[0_40px_90px_rgba(31,77,62,0.18)]">
            <AddTherapistForm
              onSave={handleAddTherapist}
              onClose={() => setShowAddTherapist(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const TherapistDetailsForm = ({ therapist, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: therapist.name,
    phone: therapist.phone,
    email: therapist.email,
    specialization: therapist.specialization,
    experience: therapist.experience
  })

  React.useEffect(() => {
    setFormData({
      name: therapist.name,
      phone: therapist.phone,
      email: therapist.email,
      specialization: therapist.specialization,
      experience: therapist.experience
    })
  }, [therapist])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted uppercase tracking-[1px] mb-2">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full h-10 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] shadow-[0_8px_16px_rgba(31,77,62,0.06)]"
          />
        </div>
        <div>
          <label className="block text-sm text-muted uppercase tracking-[1px] mb-2">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full h-10 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] shadow-[0_8px_16px_rgba(31,77,62,0.06)]"
          />
        </div>
        <div>
          <label className="block text-sm text-muted uppercase tracking-[1px] mb-2">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full h-10 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] shadow-[0_8px_16px_rgba(31,77,62,0.06)]"
          />
        </div>
        <div>
          <label className="block text-sm text-muted uppercase tracking-[1px] mb-2">Specialization</label>
          <input
            type="text"
            value={formData.specialization}
            onChange={(e) => setFormData({...formData, specialization: e.target.value})}
            className="w-full h-10 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] shadow-[0_8px_16px_rgba(31,77,62,0.06)]"
          />
        </div>
        <div>
          <label className="block text-sm text-muted uppercase tracking-[1px] mb-2">Experience (years)</label>
          <input
            type="number"
            value={formData.experience}
            onChange={(e) => setFormData({...formData, experience: parseInt(e.target.value)})}
            className="w-full h-10 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] shadow-[0_8px_16px_rgba(31,77,62,0.06)]"
          />
        </div>
      </div>
      
      <div className="flex gap-3">
        <button
          type="submit"
          className="h-11 rounded-full bg-gradient-to-br from-primary to-accent text-white text-sm uppercase tracking-[1.2px] px-6 shadow-[0_18px_28px_rgba(31,77,62,0.28)] hover:scale-[1.02] transition-all"
        >
          Save Changes
        </button>
        <button type="button" onClick={onCancel} className="pill ghost">
          Cancel
        </button>
      </div>
    </form>
  )
}

const AppointmentCard = ({ appointment, onUpdateStatus }) => {
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState(appointment.notes || '')

  const handleStatusUpdate = (newStatus) => {
    onUpdateStatus(appointment.id, newStatus, notes)
    setShowNotes(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'text-green-600 bg-green-50'
      case 'Completed': return 'text-blue-600 bg-blue-50'
      case 'Cancelled': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="border rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">{appointment.clientName}</h4>
          <p className="text-muted">{appointment.service}</p>
          <p className="text-sm text-muted">{appointment.date} at {appointment.time}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
          {appointment.status}
        </span>
      </div>

      {appointment.notes && (
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-muted">Notes:</p>
          <p className="text-sm">{appointment.notes}</p>
        </div>
      )}

      {appointment.status === 'Confirmed' && (
        <div className="flex gap-2">
          <button 
            onClick={() => handleStatusUpdate('Completed')}
            className="pill text-sm"
          >
            Mark Completed
          </button>
          <button 
            onClick={() => setShowNotes(!showNotes)}
            className="pill ghost text-sm"
          >
            {showNotes ? 'Hide' : 'Add'} Notes
          </button>
        </div>
      )}

      {showNotes && (
        <div className="space-y-2">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add session notes..."
            className="w-full p-3 border rounded-lg resize-none"
            rows="3"
          />
          <button 
            onClick={() => handleStatusUpdate(appointment.status)}
            className="pill text-sm"
          >
            Save Notes
          </button>
        </div>
      )}
    </div>
  )
}

const AddTherapistForm = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    specialization: '',
    experience: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      experience: parseInt(formData.experience, 10) || 0
    })
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-[1.6px] text-muted mb-1">Add New Therapist</p>
          <h3 className="text-2xl font-semibold">New therapist admission</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-sm font-medium text-muted hover:text-black"
        >
          Close
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-muted uppercase tracking-[1px] mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full h-12 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] shadow-[0_8px_16px_rgba(31,77,62,0.06)]"
              placeholder="Enter full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-muted uppercase tracking-[1px] mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full h-12 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] shadow-[0_8px_16px_rgba(31,77,62,0.06)]"
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-muted uppercase tracking-[1px] mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full h-12 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] shadow-[0_8px_16px_rgba(31,77,62,0.06)]"
              placeholder="therapist@movicloudspa.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-muted uppercase tracking-[1px] mb-2">Specialization</label>
            <input
              type="text"
              value={formData.specialization}
              onChange={(e) => setFormData({...formData, specialization: e.target.value})}
              className="w-full h-12 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] shadow-[0_8px_16px_rgba(31,77,62,0.06)]"
              placeholder="Massage / Facial / etc."
              required
            />
          </div>
          <div>
            <label className="block text-sm text-muted uppercase tracking-[1px] mb-2">Experience</label>
            <input
              type="number"
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              className="w-full h-12 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] shadow-[0_8px_16px_rgba(31,77,62,0.06)]"
              placeholder="8"
              min="0"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="h-12 rounded-full border border-primary/20 text-primary px-6 text-sm uppercase tracking-[1.2px] hover:bg-primary/10"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white px-6 text-sm uppercase tracking-[1.2px] shadow-[0_18px_28px_rgba(31,77,62,0.28)] hover:scale-[1.02] transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

const PasswordChangeForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle password change logic here
    alert('Password changed successfully!')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Change Password</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-muted uppercase tracking-[1px] mb-2">Current Password</label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
              className="w-full h-10 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] shadow-[0_8px_16px_rgba(31,77,62,0.06)]"
            />
          </div>
          
          <div>
            <label className="block text-sm text-muted uppercase tracking-[1px] mb-2">New Password</label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
              className="w-full h-10 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] shadow-[0_8px_16px_rgba(31,77,62,0.06)]"
            />
          </div>
          
          <div>
            <label className="block text-sm text-muted uppercase tracking-[1px] mb-2">Confirm New Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full h-10 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] shadow-[0_8px_16px_rgba(31,77,62,0.06)]"
            />
          </div>
          
          <div className="flex gap-3">
            <button type="submit" className="pill">
              Update Password
            </button>
            <button type="button" onClick={onClose} className="pill ghost">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TherapistManagement
