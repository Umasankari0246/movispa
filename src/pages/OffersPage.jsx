export default function OffersPage() {
  return (
    <div className="view-body">
      <div className="offers-grid">
        <article className="offer-hero">
          <span className="tag">Ending in 48h</span>
          <div>
            <h3>Signature Packages</h3>
            <p className="muted">Exclusive rituals crafted for seasonal renewal.</p>
          </div>
          <div className="offer-media"></div>
          <div className="offer-banner">
            <p>Special gift for you</p>
            <button type="button" className="pill">Claim benefit</button>
          </div>
        </article>

        <aside className="offer-side">
          <div className="rewards-card">
            <p className="muted">My rewards</p>
            <h4>300</h4>
            <span>200 points until your next complimentary session.</span>
          </div>
          <div className="offer-card">
            <div className="offer-thumb"></div>
            <div>
              <h5>Sage Ritual</h5>
              <p className="muted">
                Full-body exfoliation with wild harvested sage and sea minerals.
              </p>
              <div className="price-row">
                <strong>$110</strong>
                <span>$145</span>
              </div>
            </div>
            <button type="button" className="pill">&gt;</button>
          </div>
          <div className="offer-card">
            <div className="offer-thumb floral"></div>
            <div>
              <h5>Bloom reset</h5>
              <p className="muted">Rehydrate and glow with botanical oils.</p>
            </div>
            <button type="button" className="pill">&gt;</button>
          </div>
        </aside>
      </div>
    </div>
  )
}
