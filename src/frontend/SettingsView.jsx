import { useEffect, useState } from 'react'
import MaterialSymbol from '../components/MaterialSymbol.jsx'

const defaultSettings = {
  spaInfo: {
    spaName: 'Movi Cloud Spa',
    address: '123 Cloud Avenue, Wellness District',
    contactNumber: '+1 (555) 123-4567',
    email: 'contact@movicloudspa.com',
    logo: '',
  },
  workingHours: {
    openingTime: '09:00',
    closingTime: '18:00',
    days: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: false,
    },
  },
  appointment: {
    slotDuration: '60',
    maxAppointmentsPerDay: '12',
    autoConfirmBooking: true,
    bufferTime: '10',
  },
  notifications: {
    emailNotifications: true,
    appointmentReminders: true,
  },
  payment: {
    cash: true,
    upi: false,
    taxPercentage: '5',
    discountPercentage: '0',
  },
  account: {
    name: 'Admin User',
    email: 'admin@movicloudspa.com',
    phone: '+1 (555) 987-6543',
  },
  auth: {
    password: 'password123',
  },
}

const STORAGE_KEY = 'movicloudspa_settings'

export default function SettingsView() {
  const [settings, setSettings] = useState(defaultSettings)
  const [draftSettings, setDraftSettings] = useState(defaultSettings)
  const [editMode, setEditMode] = useState({
    spaInfo: false,
    workingHours: false,
    appointment: false,
    notifications: false,
    payment: false,
    account: false,
    password: false,
  })
  const [savedMessage, setSavedMessage] = useState('')
  const [sectionMessage, setSectionMessage] = useState('')
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      setSettings(parsed)
      setDraftSettings(parsed)
    }
  }, [])

  useEffect(() => {
    if (savedMessage || sectionMessage || passwordSuccess || passwordError) {
      const timer = setTimeout(() => {
        setSavedMessage('')
        setSectionMessage('')
        setPasswordSuccess('')
        setPasswordError('')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [savedMessage, sectionMessage, passwordSuccess, passwordError])

  const persistSettings = (updatedSettings) => {
    setSettings(updatedSettings)
    setDraftSettings(updatedSettings)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings))
  }

  const startEdit = (section) => {
    setDraftSettings(settings)
    setEditMode((prev) => ({ ...prev, [section]: true }))
    setSectionMessage('')
    setSavedMessage('')
  }

  const updateDraftField = (section, key, value) => {
    setDraftSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }))
  }

  const updateDaysDraft = (day) => {
    setDraftSettings((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        days: {
          ...prev.workingHours.days,
          [day]: !prev.workingHours.days[day],
        },
      },
    }))
  }

  const saveSection = (section) => {
    const sectionLabels = {
      spaInfo: 'Business Information',
      workingHours: 'Working Hours',
      appointment: 'Appointment Settings',
      notifications: 'Notification Settings',
      payment: 'Payment Settings',
      account: 'Account Settings',
    }

    if (section === 'payment' && !draftSettings.payment.cash && !draftSettings.payment.upi) {
      setSectionMessage('Select at least one payment method.')
      setSavedMessage('')
      return
    }

    persistSettings({
      ...settings,
      [section]: draftSettings[section],
    })
    setEditMode((prev) => ({ ...prev, [section]: false }))
    setSavedMessage(`${sectionLabels[section]} saved successfully.`)
    setSectionMessage('')
  }

  const saveSpaInfo = () => {
    saveSection('spaInfo')
  }

  const submitPasswordChange = () => {
    if (!editMode.password) {
      setPasswordError('Click Edit before updating your password.')
      setPasswordSuccess('')
      return
    }

    if (passwordForm.currentPassword !== settings.auth.password) {
      setPasswordError('Current password is incorrect.')
      setPasswordSuccess('')
      return
    }
    if (!passwordForm.newPassword || passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match.')
      setPasswordSuccess('')
      return
    }

    const updated = {
      ...settings,
      auth: {
        ...settings.auth,
        password: passwordForm.newPassword,
      },
    }
    persistSettings(updated)
    setEditMode((prev) => ({ ...prev, password: false }))
    setPasswordSuccess('Password updated successfully.')
    setPasswordError('')
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const currentWorkingHours = editMode.workingHours ? draftSettings.workingHours : settings.workingHours
  const currentAppointment = editMode.appointment ? draftSettings.appointment : settings.appointment
  const currentNotifications = editMode.notifications ? draftSettings.notifications : settings.notifications
  const currentPayment = editMode.payment ? draftSettings.payment : settings.payment
  const currentAccount = editMode.account ? draftSettings.account : settings.account

  return (
    <div className="view-body settings-view">
      <div className="space-y-6">
        {savedMessage && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
            {savedMessage}
          </div>
        )}

        <section className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between mb-6">
            <div>
              <h2>Spa / Business Information</h2>
              <p className="muted">Editable business values used across dashboard, booking pages, and invoices.</p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => startEdit('spaInfo')} className="pill">
                Edit
              </button>
              <button type="button" onClick={saveSpaInfo} className="pill bg-primary text-white">
                Save
              </button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Spa Name</label>
              <input
                type="text"
                value={editMode.spaInfo ? draftSettings.spaInfo.spaName : settings.spaInfo.spaName}
                onChange={(e) => updateDraftField('spaInfo', 'spaName', e.target.value)}
                disabled={!editMode.spaInfo}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Contact Number</label>
              <input
                type="tel"
                value={editMode.spaInfo ? draftSettings.spaInfo.contactNumber : settings.spaInfo.contactNumber}
                onChange={(e) => updateDraftField('spaInfo', 'contactNumber', e.target.value)}
                disabled={!editMode.spaInfo}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Email</label>
              <input
                type="email"
                value={editMode.spaInfo ? draftSettings.spaInfo.email : settings.spaInfo.email}
                onChange={(e) => updateDraftField('spaInfo', 'email', e.target.value)}
                disabled={!editMode.spaInfo}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Address</label>
              <textarea
                value={editMode.spaInfo ? draftSettings.spaInfo.address : settings.spaInfo.address}
                onChange={(e) => updateDraftField('spaInfo', 'address', e.target.value)}
                disabled={!editMode.spaInfo}
                rows="3"
                className="w-full rounded-[18px] border border-primary/15 bg-white px-4 py-3 text-[14px] resize-none disabled:bg-slate-50"
              />
            </div>
            <div className="space-y-4 lg:col-span-2">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Logo (optional)</label>
              <input
                type="text"
                value={editMode.spaInfo ? draftSettings.spaInfo.logo : settings.spaInfo.logo}
                onChange={(e) => updateDraftField('spaInfo', 'logo', e.target.value)}
                disabled={!editMode.spaInfo}
                placeholder="Logo URL or filename"
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              />
              <p className="text-xs text-muted">Optional logo used on invoices and brand headers.</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2>Working Hours</h2>
              <p className="muted">Modify the days and hours when the spa is bookable.</p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => startEdit('workingHours')} className="pill">
                Edit
              </button>
              <button
                type="button"
                onClick={() => saveSection('workingHours')}
                className="pill bg-primary text-white"
                disabled={!editMode.workingHours}
              >
                Save
              </button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Opening Time</label>
              <input
                type="time"
                value={currentWorkingHours.openingTime}
                onChange={(e) => updateDraftField('workingHours', 'openingTime', e.target.value)}
                disabled={!editMode.workingHours}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Closing Time</label>
              <input
                type="time"
                value={currentWorkingHours.closingTime}
                onChange={(e) => updateDraftField('workingHours', 'closingTime', e.target.value)}
                disabled={!editMode.workingHours}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              />
            </div>
            <div className="space-y-4">
              <p className="block text-sm text-muted uppercase tracking-[1px]">Working Days</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {Object.entries(currentWorkingHours.days).map(([day, enabled]) => (
                  <label key={day} className="flex items-center gap-3 rounded-2xl border border-primary/15 bg-white px-3 py-2">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={() => updateDaysDraft(day)}
                      disabled={!editMode.workingHours}
                      className="accent-primary"
                    />
                    <span className="text-sm">{day.slice(0, 3)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2>Appointment Settings</h2>
              <p className="muted">Configure booking intervals, capacity, and session buffers.</p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => startEdit('appointment')} className="pill">
                Edit
              </button>
              <button
                type="button"
                onClick={() => saveSection('appointment')}
                className="pill bg-primary text-white"
                disabled={!editMode.appointment}
              >
                Save
              </button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Slot Duration</label>
              <select
                value={currentAppointment.slotDuration}
                onChange={(e) => updateDraftField('appointment', 'slotDuration', e.target.value)}
                disabled={!editMode.appointment}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              >
                <option value="30">30 mins</option>
                <option value="60">60 mins</option>
              </select>
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Max Appointments per Day</label>
              <input
                type="number"
                min="1"
                value={currentAppointment.maxAppointmentsPerDay}
                onChange={(e) => updateDraftField('appointment', 'maxAppointmentsPerDay', e.target.value)}
                disabled={!editMode.appointment}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              />
            </div>
            <div className="rounded-2xl border border-primary/15 bg-soft p-4">
              <p className="text-sm text-muted uppercase tracking-[1px]">Auto-confirm Booking</p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm">Enabled</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={currentAppointment.autoConfirmBooking}
                    onChange={(e) => updateDraftField('appointment', 'autoConfirmBooking', e.target.checked)}
                    disabled={!editMode.appointment}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-primary transition-all" />
                  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
                </label>
              </div>
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Buffer Time (mins)</label>
              <input
                type="number"
                min="0"
                value={currentAppointment.bufferTime}
                onChange={(e) => updateDraftField('appointment', 'bufferTime', e.target.value)}
                disabled={!editMode.appointment}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2>Notification Settings</h2>
              <p className="muted">Toggle the alert settings that users receive.</p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => startEdit('notifications')} className="pill">
                Edit
              </button>
              <button
                type="button"
                onClick={() => saveSection('notifications')}
                className="pill bg-primary text-white"
                disabled={!editMode.notifications}
              >
                Save
              </button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-primary/15 bg-soft p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted">Send booking confirmation emails.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={currentNotifications.emailNotifications}
                  onChange={(e) => updateDraftField('notifications', 'emailNotifications', e.target.checked)}
                  disabled={!editMode.notifications}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-primary transition-all" />
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
              </label>
            </div>
            <div className="rounded-2xl border border-primary/15 bg-soft p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">Appointment Reminders</p>
                <p className="text-sm text-muted">Send reminders before sessions.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={currentNotifications.appointmentReminders}
                  onChange={(e) => updateDraftField('notifications', 'appointmentReminders', e.target.checked)}
                  disabled={!editMode.notifications}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-primary transition-all" />
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
              </label>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2>Payment Settings</h2>
              <p className="muted">Configure allowed methods, taxes, and discount rules.</p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => startEdit('payment')} className="pill">
                Edit
              </button>
              <button
                type="button"
                onClick={() => saveSection('payment')}
                className="pill bg-primary text-white"
                disabled={!editMode.payment}
              >
                Save
              </button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-primary/15 bg-soft p-4 space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={currentPayment.cash}
                  onChange={(e) => updateDraftField('payment', 'cash', e.target.checked)}
                  disabled={!editMode.payment}
                  className="accent-primary"
                />
                Cash
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={currentPayment.upi}
                  onChange={(e) => updateDraftField('payment', 'upi', e.target.checked)}
                  disabled={!editMode.payment}
                  className="accent-primary"
                />
                UPI
              </label>
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Tax Percentage (%)</label>
              <input
                type="number"
                min="0"
                value={currentPayment.taxPercentage}
                onChange={(e) => updateDraftField('payment', 'taxPercentage', e.target.value)}
                disabled={!editMode.payment}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Discount Percentage (%)</label>
              <input
                type="number"
                min="0"
                value={currentPayment.discountPercentage}
                onChange={(e) => updateDraftField('payment', 'discountPercentage', e.target.value)}
                disabled={!editMode.payment}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-amber-600">At least one payment method must be selected.</p>
          {sectionMessage && <p className="mt-3 text-sm text-green-700">{sectionMessage}</p>}
        </section>

        <section className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2>Account Settings</h2>
              <p className="muted">Editable user/admin profile details.</p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => startEdit('account')} className="pill">
                Edit
              </button>
              <button
                type="button"
                onClick={() => saveSection('account')}
                className="pill bg-primary text-white"
                disabled={!editMode.account}
              >
                Save
              </button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Name</label>
              <input
                type="text"
                value={currentAccount.name}
                onChange={(e) => updateDraftField('account', 'name', e.target.value)}
                disabled={!editMode.account}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Email</label>
              <input
                type="email"
                value={currentAccount.email}
                onChange={(e) => updateDraftField('account', 'email', e.target.value)}
                disabled={!editMode.account}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Phone Number</label>
              <input
                type="tel"
                value={currentAccount.phone}
                onChange={(e) => updateDraftField('account', 'phone', e.target.value)}
                disabled={!editMode.account}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2>Change Password</h2>
              <p className="muted">Validate current password and update to a new one.</p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => startEdit('password')} className="pill">
                Edit
              </button>
              <button
                type="button"
                onClick={submitPasswordChange}
                className="pill bg-primary text-white"
                disabled={!editMode.password}
              >
                Save
              </button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Current Password</label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                disabled={!editMode.password}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">New Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                disabled={!editMode.password}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Confirm Password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                disabled={!editMode.password}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              />
            </div>
          </div>

          {passwordError && <p className="mt-4 text-sm text-red-600">{passwordError}</p>}
          {passwordSuccess && <p className="mt-4 text-sm text-green-600">{passwordSuccess}</p>}
        </section>
      </div>
    </div>
  )
}
