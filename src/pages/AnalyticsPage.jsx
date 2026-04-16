import MaterialSymbol from '../components/MaterialSymbol.jsx'

const POPULAR_TREATMENTS = [
  { name: 'Stone Therapy', value: '42%' },
  { name: 'Deep Tissue', value: '28%' },
  { name: 'Hydra-Facial', value: '15%' },
  { name: 'Hydrotherapy', value: '15%' },
]

const LIFECYCLE_DATA = [
  14, 46, 28, 66, 48, 58, 29, 27, 59, 31, 72, 52, 22,
]

export default function AnalyticsPage() {
  return (
    <div className="view-body analytics-view">
      <header className="analytics-header">
        <h2>Analytics</h2>
        <div className="analytics-header-right">
          <div className="analytics-search">
            <MaterialSymbol name="search" className="text-[18px]" />
            <input type="text" placeholder="Search insights..." />
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

      <section className="analytics-grid">
        <article className="analytics-card analytics-revenue">
          <p className="analytics-label">Total Revenue - Q1 2024</p>
          <h3>$142,850.00</h3>
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
              <h4>84.2%</h4>
            </div>
            <div className="analytics-ring">
              <span>+5%</span>
            </div>
          </article>
          <article className="analytics-card analytics-mini">
            <div>
              <p className="analytics-label">Average Ticket</p>
              <h4>$185</h4>
            </div>
            <span className="analytics-mini-delta">+22%</span>
          </article>
          <article className="analytics-card analytics-mini">
            <div>
              <p className="analytics-label">Active Memberships</p>
              <h4>1,248</h4>
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
            <button type="button" className="ghost-button">View detailed breakdown</button>
          </div>
          <div className="analytics-popular-list">
            {POPULAR_TREATMENTS.map((item) => (
              <div className="popular-row" key={item.name}>
                <div>
                  <p>{item.name}</p>
                  <span>Trending</span>
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
          {LIFECYCLE_DATA.map((value, index) => (
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
        <button type="button" className="primary-button">Apply strategy</button>
      </section>
    </div>
  )
}
