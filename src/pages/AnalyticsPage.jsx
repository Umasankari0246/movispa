import { useEffect, useMemo, useState } from 'react'
import { apiGet } from '../api/apiClient.js'
import CalendarPopover from '../components/CalendarPopover.jsx'
import HistoryPopover from '../components/HistoryPopover.jsx'
import MaterialSymbol from '../components/MaterialSymbol.jsx'
import usePageHistory from '../hooks/usePageHistory.js'
import { filterByMonth } from '../utils/dateFilter.js'

const DEFAULT_POPULAR = [
  { name: 'Stone Therapy', value: '42%' },
  { name: 'Deep Tissue', value: '28%' },
  { name: 'Hydra-Facial', value: '15%' },
  { name: 'Hydrotherapy', value: '15%' },
]

const DEFAULT_LIFECYCLE = [
  14, 46, 28, 66, 48, 58, 29, 27, 59, 31, 72, 52, 22,
]

const LIFECYCLE_DATA = {
  weekly: [
    14, 46, 28, 66, 48, 58, 29, 27, 59, 31, 72, 52, 22,
  ],
  monthly: [
    22, 58, 35, 72, 54, 65, 38, 42, 68, 45, 78, 62, 35,
  ],
  yearly: [
    31, 65, 48, 78, 62, 72, 45, 55, 75, 58, 82, 68, 48,
  ]
}

const POPULAR_TREATMENT_ICONS = {
  'Stone Therapy': 'spa',
  'Deep Tissue': 'back_hand',
  'Hydra-Facial': 'water_drop',
  'Hydrotherapy': 'pool',
}

export default function AnalyticsPage({ onToggleNotifications, onCloseNotifications }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [filterDate, setFilterDate] = useState(null)
  const [calendarMonth, setCalendarMonth] = useState(() => new Date().getMonth())
  const [calendarYear, setCalendarYear] = useState(() => new Date().getFullYear())
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  
  // Enhanced analytics state
  const [dateFilter, setDateFilter] = useState('today')
  const [bookingTrendView, setBookingTrendView] = useState('monthly')
  const [lifecycleView, setLifecycleView] = useState('weekly')
  const [selectedTreatment, setSelectedTreatment] = useState(null)
  const [showTreatmentModal, setShowTreatmentModal] = useState(false)
  const [comprehensiveAnalytics, setComprehensiveAnalytics] = useState(null)
  const [strategyApplied, setStrategyApplied] = useState(false)
  const [analytics, setAnalytics] = useState({
    revenue: 142850,
    retention_rate: 84.2,
    avg_ticket: 185,
    active_memberships: 1248,
    popular_treatments: DEFAULT_POPULAR,
    lifecycle_heatmap: DEFAULT_LIFECYCLE,
    periods: [],
  })

  useEffect(() => {
    apiGet('/api/analytics')
      .then((data) => {
        if (!data) return
        setAnalytics({
          revenue: data.revenue ?? 142850,
          retention_rate: data.retention_rate ?? 84.2,
          avg_ticket: data.avg_ticket ?? 185,
          active_memberships: data.active_memberships ?? 1248,
          popular_treatments: data.popular_treatments || DEFAULT_POPULAR,
          lifecycle_heatmap: data.lifecycle_heatmap || DEFAULT_LIFECYCLE,
          periods: data.periods || [],
        })
      })
      .catch(() => {})
  }, [])

  const selectedPeriod = useMemo(() => {
    if (!filterDate || !analytics.periods?.length) return null
    const selectedTime = new Date(filterDate).getTime()
    if (Number.isNaN(selectedTime)) return null
    return analytics.periods.find((period) => {
      const start = new Date(period.period_start).getTime()
      const end = new Date(period.period_end).getTime()
      if (Number.isNaN(start) || Number.isNaN(end)) return false
      return selectedTime >= start && selectedTime <= end
    })
  }, [analytics.periods, filterDate])

  const resolvedAnalytics = selectedPeriod || analytics

  const filteredPopular = useMemo(() => {
    if (!searchTerm) return resolvedAnalytics.popular_treatments
    return resolvedAnalytics.popular_treatments.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [resolvedAnalytics.popular_treatments, searchTerm])

  const analyticsHistory = usePageHistory('analytics', isHistoryOpen)
  const filteredHistory = filterByMonth(analyticsHistory, filterDate, (item) => item.date)

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

  return (
    <div className="view-body analytics-view">
      {statusMessage && <p className="analytics-status">{statusMessage}</p>}
      <header className="analytics-header">
        <h2>Analytics</h2>
        <div className="analytics-header-right action-popover-anchor">
          <div className="analytics-search">
            <MaterialSymbol name="search" className="text-[18px]" />
            <input
              type="text"
              placeholder="Search insights..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
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
              title="Analytics History"
              items={filteredHistory}
              onClose={() => setIsHistoryOpen(false)}
            />
          )}
        </div>
      </header>

      <section className="analytics-grid">
        <article className="analytics-card analytics-revenue">
          <p className="analytics-label">Total Revenue - Q1 2024</p>
          <h3 className="analytics-revenue-value">
            ${Number(resolvedAnalytics.revenue).toLocaleString()}.00
          </h3>
          <span className="analytics-pill">
            <MaterialSymbol name="trending_up" className="text-[14px]" />
            12.4%
          </span>
          <div className="analytics-bars">
            {[18, 26, 34, 48, 60, 80].map((height, index) => (
              <span
                key={`rev-${index}`}
                className={`analytics-bar${index === 5 ? ' is-highlight' : ''}`}
                style={{ height: `${height}%` }}
              ></span>
            ))}
          </div>
        </article>

        <div className="analytics-stack">
          <article className="analytics-card analytics-mini">
            <div>
              <p className="analytics-label">Retention Rate</p>
              <h4>{resolvedAnalytics.retention_rate}%</h4>
            </div>
            <div className="analytics-ring">
              <span>+5%</span>
            </div>
          </article>
          <article className="analytics-card analytics-mini">
            <div>
              <p className="analytics-label">Average Ticket</p>
              <h4>${resolvedAnalytics.avg_ticket}</h4>
            </div>
            <span className="analytics-mini-delta">+22%</span>
          </article>
          <article className="analytics-card analytics-mini">
            <div>
              <p className="analytics-label">Active Memberships</p>
              <h4>{Number(resolvedAnalytics.active_memberships).toLocaleString()}</h4>
            </div>
            <span className="analytics-mini-delta positive">+110 new</span>
          </article>
        </div>
      </section>

      <section className="analytics-split">
        <article className="analytics-card analytics-trends">
          <div className="analytics-trends-head">
            <div>
              <h4>Booking Trends</h4>
              <p className="analytics-sub">Monthly volume comparison (2023 vs 2024)</p>
            </div>
            <div className="analytics-legend">
              <span>2024</span>
              <span>2023</span>
            </div>
          </div>
          <div className="analytics-line-chart">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month) => (
              <div key={month}>
                <span className="trend-bar"></span>
                <span className="trend-bar thin"></span>
                <p>{month}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="analytics-card analytics-popular">
          <div className="analytics-popular-head">
            <h4>Popular Treatments</h4>
            <button
              type="button"
              className="ghost-button"
              onClick={() => setStatusMessage('Detailed breakdown opened.')}
            >
              View detailed breakdown
            </button>
          </div>
          <div className="analytics-popular-list">
            {filteredPopular.map((item) => (
              <div className="popular-row" key={item.name}>
                <div className="popular-row-main">
                  <span className="popular-icon">
                    <MaterialSymbol
                      name={POPULAR_TREATMENT_ICONS[item.name] || 'spa'}
                      className="text-[16px]"
                    />
                  </span>
                  <div>
                    <p>{item.name}</p>
                    <span>Trending</span>
                  </div>
                </div>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="analytics-card analytics-lifecycle">
        <div className="analytics-lifecycle-head">
          <div>
            <h4>Customer Lifecycle Analytics</h4>
            <p className="analytics-sub">Customer return probability by visit frequency</p>
          </div>
          <div className="analytics-tabs">
            <button type="button" className="tab is-active">Weekly</button>
            <button type="button" className="tab">Monthly</button>
            <button type="button" className="tab">Yearly</button>
          </div>
        </div>
        <div className="analytics-heatmap">
          {(resolvedAnalytics.lifecycle_heatmap || DEFAULT_LIFECYCLE).map((value, index) => (
            <div className="heat-cell" key={`heat-${index}`}>
              {value}%
            </div>
          ))}
        </div>
      </section>

      <section className="analytics-card analytics-insight">
        <div>
          <p className="analytics-label">AI Revenue Optimization Opportunity</p>
          <p className="analytics-sub">
            Based on the last 3 months, Friday evening “Couples Massage” has a 94% occupancy rate but
            has not seen a price adjustment in 12 months. A 8% price increase could generate an
            additional $2,400 monthly without affecting retention.
          </p>
        </div>
        <button
          type="button"
          className="primary-button"
          onClick={() => setStatusMessage('Pricing strategy queued for review.')}
        >
          Apply strategy
        </button>
      </section>
    </div>
  )
}
