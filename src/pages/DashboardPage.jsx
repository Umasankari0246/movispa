import MaterialSymbol from '../components/MaterialSymbol.jsx'

export default function DashboardPage() {
  const metricCards = [
    {
      label: 'Total Clients',
      value: '1,284',
      delta: '+12% vs LY',
      icon: 'groups',
    },
    {
      label: 'Today Appointments',
      value: '42',
      delta: 'Active Today',
      icon: 'event_available',
    },
    {
      label: 'Active Therapists',
      value: '18 / 24',
      delta: 'On-shift',
      icon: 'medical_services',
    },
    {
      label: 'Room Usage',
      value: '85%',
      delta: '',
      icon: 'meeting_room',
    },
  ]

  return (
    <div className="view-body dashboard-view">
      <section className="dashboard-metrics">
        {metricCards.map((card) => (
          <article className="metric-card" key={card.label}>
            <div className="metric-card-top">
              <span className="metric-icon-pill">
                <MaterialSymbol name={card.icon} className="text-[18px]" />
              </span>
              {card.delta && <span className="metric-delta">{card.delta}</span>}
            </div>
            <div className="metric-card-body">
              <p className="metric-value">{card.value}</p>
              <p className="metric-label">{card.label}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="dashboard-panels">
        <div className="panel-card panel-chart">
          <div className="panel-header">
            <div>
              <h3>Appointment Trends</h3>
              <p className="muted">Session volume over the last 30 days</p>
            </div>
            <div className="panel-tabs">
              <button type="button" className="panel-tab is-active">Month</button>
              <button type="button" className="panel-tab">Quarter</button>
            </div>
          </div>
          <div className="chart-bars">
            {[32, 48, 44, 62, 38, 82, 54, 40, 52, 66].map((height, index) => (
              <span
                key={`bar-${index}`}
                className={`chart-bar${index === 5 ? ' is-highlight' : ''}`}
                style={{ height: `${height}%` }}
              ></span>
            ))}
          </div>
          <div className="chart-labels">
            <span>WK 1</span>
            <span>WK 2</span>
            <span>WK 3</span>
            <span>WK 4</span>
          </div>
        </div>

        <aside className="panel-card panel-revenue">
          <div>
            <h3>Monthly Revenue</h3>
            <p className="muted">Service vs. Product Performance</p>
          </div>
          <div className="revenue-block">
            <div className="revenue-row">
              <span>Services</span>
              <strong>$24,850</strong>
            </div>
            <div className="revenue-bar">
              <span style={{ width: '78%' }}></span>
            </div>
          </div>
          <div className="revenue-block">
            <div className="revenue-row">
              <span>Retail</span>
              <strong>$8,240</strong>
            </div>
            <div className="revenue-bar light">
              <span style={{ width: '36%' }}></span>
            </div>
          </div>
          <div className="revenue-total">
            <span>Total</span>
            <strong>$33,090</strong>
          </div>
          <div className="revenue-watermark"></div>
        </aside>
      </section>
    </div>
  )
}
