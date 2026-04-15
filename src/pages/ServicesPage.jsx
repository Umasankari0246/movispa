import MaterialSymbol from '../components/MaterialSymbol.jsx'

export default function ServicesPage() {
  return (
    <div className="view-body services-view">
      <div className="chip-row service-filters">
        <button className="chip active" type="button">All Treatments</button>
        <button className="chip" type="button">Aromatherapy</button>
        <button className="chip" type="button">Signature</button>
        <button className="chip" type="button">Detox</button>
        <button className="chip" type="button">Rapid Glow</button>
      </div>

      <div className="service-grid-large">
        {[
          {
            title: 'Ocean Drift Massage',
            desc:
              'A rhythmic movement ritual using warm sea-shell infusions to melt deep muscle tension.',
            meta: '60 min - $185',
            badge: 'Signature',
            tone: 'gold',
          },
          {
            title: 'Golden Hour Facial',
            desc:
              'A transformative treatment utilizing micro-currents and Vitamin C to restore youthful luminosity.',
            meta: '75 min - $220',
            badge: 'Bestseller',
            tone: 'pearl',
          },
          {
            title: 'Himalayan Salt Scrub',
            desc: 'Exfoliating ritual with mineral-rich salts to soften and renew.',
            meta: '45 min - $140',
            badge: 'New',
            tone: 'rose',
          },
        ].map((card) => (
          <article key={card.title} className={`service-tile ${card.tone}`}>
            <div className="service-image">
              <span className="service-badge">{card.badge}</span>
            </div>
            <div className="service-info">
              <h4>{card.title}</h4>
              <p className="muted">{card.desc}</p>
              <div className="service-footer">
                <span>{card.meta}</span>
                <button type="button" className="service-add">+</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="promo-row">
        <div className="promo-card">
          <span className="promo-icon icon-crest icon-crest--muted">
            <MaterialSymbol name="auto_awesome" className="text-[18px]" />
          </span>
          <div>
            <p className="promo-label">New Ritual</p>
            <h4>Celestial Sound Bath</h4>
            <p className="muted">Available June 1st</p>
          </div>
          <button type="button" className="pill">Learn More</button>
        </div>
      </div>
    </div>
  )
}
