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
  const [editSpaInfo, setEditSpaInfo] = useState(false)
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
      setSettings(JSON.parse(stored))
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
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings))
  }

  const updateSpaInfo = (key, value) => {
    persistSettings({
      ...settings,
      spaInfo: {
        ...settings.spaInfo,
        [key]: value,
      },
    })
  }

  const updateWorkingHours = (key, value) => {
    persistSettings({
      ...settings,
      workingHours: {
        ...settings.workingHours,
        [key]: value,
      },
    })
  }

  const toggleWorkingDay = (day) => {
    persistSettings({
      ...settings,
      workingHours: {
        ...settings.workingHours,
        days: {
          ...settings.workingHours.days,
          [day]: !settings.workingHours.days[day],
        },
      },
    })
  }

  const updateAppointment = (key, value) => {
    persistSettings({
      ...settings,
      appointment: {
        ...settings.appointment,
        [key]: value,
      },
    })
  }

  const updateNotifications = (key, value) => {
    persistSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: value,
      },
    })
  }

  const updatePayment = (key, value) => {
    persistSettings({
      ...settings,
      payment: {
        ...settings.payment,
        [key]: value,
      },
    })
  }

  const updateAccount = (key, value) => {
    persistSettings({
      ...settings,
      account: {
        ...settings.account,
        [key]: value,
      },
    })
  }

  const updatePasswordField = (key, value) => {
    setPasswordForm((prev) => ({ ...prev, [key]: value }))
  }

  const saveSection = (section) => {
    if (section === 'payment' && !settings.payment.cash && !settings.payment.upi) {
      setSectionMessage('Select at least one payment method.')
      setPasswordError('')
      return
    }
    setSectionMessage('Settings saved successfully.')
    setSavedMessage('')
  }

  const saveSpaInfo = () => {
    setEditSpaInfo(false)
    setSavedMessage('Business information saved successfully.')
    setSectionMessage('')
  }

  const submitPasswordChange = () => {
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
    persistSettings({
      ...settings,
      auth: {
        ...settings.auth,
        password: passwordForm.newPassword,
      },
    })
    setPasswordSuccess('Password updated successfully.')
    setPasswordError('')
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  return (
    <div className="view-body settings-view">
      <div className="space-y-6">
        <div className="section-head">
          <div>
            <h1>Settings Module</h1>
            <p className="muted">Configure system-wide spa, booking, billing, and account settings.</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {savedMessage && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
                {savedMessage}
              </div>
            )}
            <button type="button" className="pill bg-primary text-white">
              <MaterialSymbol name="save" className="text-[16px]" />
              Save All Settings
            </button>
          </div>
        </div>

        <section className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between mb-6">
            <div>
              <h2>Spa / Business Information</h2>
              <p className="muted">Editable business values used across dashboard, booking pages, and invoices.</p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setEditSpaInfo(true)} className="pill">
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
                value={settings.spaInfo.spaName}
                onChange={(e) => updateSpaInfo('spaName', e.target.value)}
                disabled={!editSpaInfo}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Contact Number</label>
              <input
                type="tel"
                value={settings.spaInfo.contactNumber}
                onChange={(e) => updateSpaInfo('contactNumber', e.target.value)}
                disabled={!editSpaInfo}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Email</label>
              <input
                type="email"
                value={settings.spaInfo.email}
                onChange={(e) => updateSpaInfo('email', e.target.value)}
                disabled={!editSpaInfo}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px] disabled:bg-slate-50"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Address</label>
              <textarea
                value={settings.spaInfo.address}
                onChange={(e) => updateSpaInfo('address', e.target.value)}
                disabled={!editSpaInfo}
                rows="3"
                className="w-full rounded-[18px] border border-primary/15 bg-white px-4 py-3 text-[14px] resize-none disabled:bg-slate-50"
              />
            </div>
            <div className="space-y-4 lg:col-span-2">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Logo (optional)</label>
              <input
                type="text"
                value={settings.spaInfo.logo}
                onChange={(e) => updateSpaInfo('logo', e.target.value)}
                disabled={!editSpaInfo}
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
            <button type="button" onClick={() => saveSection('workingHours')} className="pill bg-primary text-white">
              Save
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Opening Time</label>
              <input
                type="time"
                value={settings.workingHours.openingTime}
                onChange={(e) => updateWorkingHours('openingTime', e.target.value)}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px]"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Closing Time</label>
              <input
                type="time"
                value={settings.workingHours.closingTime}
                onChange={(e) => updateWorkingHours('closingTime', e.target.value)}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px]"
              />
            </div>
            <div className="space-y-4">
              <p className="block text-sm text-muted uppercase tracking-[1px]">Working Days</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {Object.entries(settings.workingHours.days).map(([day, enabled]) => (
                  <label key={day} className="flex items-center gap-3 rounded-2xl border border-primary/15 bg-white px-3 py-2">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={() => toggleWorkingDay(day)}
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
            <button type="button" onClick={() => saveSection('appointment')} className="pill bg-primary text-white">
              Save
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Slot Duration</label>
              <select
                value={settings.appointment.slotDuration}
                onChange={(e) => updateAppointment('slotDuration', e.target.value)}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px]"
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
                value={settings.appointment.maxAppointmentsPerDay}
                onChange={(e) => updateAppointment('maxAppointmentsPerDay', e.target.value)}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px]"
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
                    checked={settings.appointment.autoConfirmBooking}
                    onChange={(e) => updateAppointment('autoConfirmBooking', e.target.checked)}
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
                value={settings.appointment.bufferTime}
                onChange={(e) => updateAppointment('bufferTime', e.target.value)}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px]"
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
            <button type="button" onClick={() => saveSection('notifications')} className="pill bg-primary text-white">
              Save
            </button>
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
                  checked={settings.notifications.emailNotifications}
                  onChange={(e) => updateNotifications('emailNotifications', e.target.checked)}
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
                  checked={settings.notifications.appointmentReminders}
                  onChange={(e) => updateNotifications('appointmentReminders', e.target.checked)}
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
            <button type="button" onClick={() => saveSection('payment')} className="pill bg-primary text-white">
              Save
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-primary/15 bg-soft p-4 space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.payment.cash}
                  onChange={(e) => updatePayment('cash', e.target.checked)}
                  className="accent-primary"
                />
                Cash
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.payment.upi}
                  onChange={(e) => updatePayment('upi', e.target.checked)}
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
                value={settings.payment.taxPercentage}
                onChange={(e) => updatePayment('taxPercentage', e.target.value)}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px]"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Discount Percentage (%)</label>
              <input
                type="number"
                min="0"
                value={settings.payment.discountPercentage}
                onChange={(e) => updatePayment('discountPercentage', e.target.value)}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px]"
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
            <button type="button" onClick={() => saveSection('account')} className="pill bg-primary text-white">
              Save
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Name</label>
              <input
                type="text"
                value={settings.account.name}
                onChange={(e) => updateAccount('name', e.target.value)}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px]"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Email</label>
              <input
                type="email"
                value={settings.account.email}
                onChange={(e) => updateAccount('email', e.target.value)}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px]"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Phone Number</label>
              <input
                type="tel"
                value={settings.account.phone}
                onChange={(e) => updateAccount('phone', e.target.value)}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px]"
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
            <button type="button" onClick={submitPasswordChange} className="pill bg-primary text-white">
              Update
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Current Password</label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => updatePasswordField('currentPassword', e.target.value)}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px]"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">New Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => updatePasswordField('newPassword', e.target.value)}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px]"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm text-muted uppercase tracking-[1px]">Confirm Password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => updatePasswordField('confirmPassword', e.target.value)}
                className="w-full h-11 rounded-[18px] border border-primary/15 bg-white px-4 text-[14px]"
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
