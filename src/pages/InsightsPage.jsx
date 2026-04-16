import MaterialSymbol from '../components/MaterialSymbol.jsx'

const HIGHLIGHTS = [
  {
    title: 'AI Recommendations',
    description: 'Actionable insights tailored for each sanctuary zone.',
    value: '98.2% Accuracy',
  },
  {
    title: 'Guest Return Lift',
    description: 'Projected uplift from wellness sequencing.',
    value: '02 Months',
  },
]

const FEED_ITEMS = [
  {
    id: 1,
    text: 'Sent a pricing forecast to the Executive team for Q2 wellness packages.',
    time: '2 min ago',
  },
  {
    id: 2,
    text: 'Identified late-cancellation risk in Saturday evening appointments.',
    time: '12 min ago',
  },
  {
    id: 3,
    text: 'Adjusted staffing prediction for the Rain Ritual campaign launch.',
    time: '45 min ago',
  },
]

export default function InsightsPage() {
  return (
    <div className="view-body insights-view">
      <header className="insights-header">
        <h2>AI Insights</h2>
        <div className="insights-header-right">
          <div className="insights-search">
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

      <section className="insights-hero">
        <article className="insights-hero-card">
          <span className="insights-chip">Guest Experience Intelligence</span>
          <h3>Elevating guest experiences through predictive wellness.</h3>
          <p>
            Our AI surfaces behavior trends, occupancy shifts, and ritual affinity to craft
            personalized journeys and proactive staffing plans.
          </p>
          <div className="insights-highlight-row">
            {HIGHLIGHTS.map((item) => (
              <div key={item.title}>
                <p>{item.title}</p>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>
        <aside className="insights-side-card">
          <div className="insights-side-top">
            <MaterialSymbol name="trending_up" className="text-[18px]" />
            <span>Priority</span>
          </div>
          <h4>Customer Retention</h4>
          <p>
            Retention confidence scored at 86% for the next 14 days with reduced churn risk.
          </p>
          <button type="button" className="primary-button">Explore Strategy</button>
        </aside>
      </section>

      <section className="insights-grid">
        <article className="insights-card">
          <div className="insights-card-head">
            <h4>Peak Hours Insight</h4>
            <span>July</span>
          </div>
          <div className="insights-chart">
            {[30, 50, 72, 46, 36].map((height, index) => (
              <span
                key={`peak-${index}`}
                className={`insights-bar${index === 2 ? ' is-accent' : ''}`}
                style={{ height: `${height}%` }}
              ></span>
            ))}
          </div>
          <p className="insights-card-text">
            Peak appointments cluster between 6 PM - 8 PM, ideal for premium add-ons.
          </p>
        </article>

        <article className="insights-card">
          <h4>Top Influencers</h4>
          <div className="insights-list">
            {['Sasha Kim', 'Marcos Lee', 'Ava Holt'].map((name) => (
              <div className="insights-list-row" key={name}>
                <div className="insights-avatar"></div>
                <div>
                  <p>{name}</p>
                  <span>Wellness Advocate</span>
                </div>
                <strong>+8%</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="insights-card">
          <h4>Customer Trends</h4>
          <div className="insights-trend-list">
            {['Aromatherapy', 'Couples Massage', 'Facial Treatments'].map((item, index) => (
              <div className="insights-trend" key={item}>
                <span>{item}</span>
                <span>{[28, 22, 16][index]}%</span>
              </div>
            ))}
          </div>
          <div className="insights-callout">
            AI suggests bundling aromatherapy add-ons in evening slots.
          </div>
        </article>
      </section>

      <section className="insights-feed">
        <div className="insights-feed-head">
          <h4>Neural Activity Feed</h4>
          <button type="button" className="ghost-button">View history</button>
        </div>
        <div className="insights-feed-list">
          {FEED_ITEMS.map((item) => (
            <div className="insights-feed-row" key={item.id}>
              <p>{item.text}</p>
              <span>{item.time}</span>
            </div>
          ))}
        </div>
      </section>

      <button type="button" className="insights-fab" aria-label="New insight">
        <MaterialSymbol name="add" className="text-[20px]" />
      </button>
    </div>
  )
}
