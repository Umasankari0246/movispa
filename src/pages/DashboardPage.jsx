import MaterialSymbol from '../components/MaterialSymbol.jsx'
import heroImage from '../assets/hero.png'

export default function DashboardPage() {
  return (
    <div className="view-body dashboard-view">
      <section className="dashboard-grid">
        <article className="feature-card primary">
          <span className="tag">
            <MaterialSymbol name="event" className="text-[12px]" />
            Next appointment
          </span>
          <div className="feature-content">
            <div>
              <h3>Swedish Massage Therapy</h3>
              <div className="feature-meta">
                <div className="info-item">
                  <span className="info-icon icon-crest icon-crest--muted icon-crest--compact">
                    <MaterialSymbol name="schedule" className="text-[16px]" />
                  </span>
                  <div>
                    <p className="info-label">Time</p>
                    <p className="info-value">Tomorrow, 10:00 AM</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon icon-crest icon-crest--muted icon-crest--compact">
                    <MaterialSymbol name="medical_services" className="text-[16px]" />
                  </span>
                  <div>
                    <p className="info-label">Therapist</p>
                    <p className="info-value">Marcus Thorne</p>
                  </div>
                </div>
              </div>
              <div className="pill-row">
                <button type="button" className="pill">Reschedule</button>
                <button type="button" className="pill ghost">Details</button>
              </div>
            </div>
            <div className="feature-media">
              <img
                src={heroImage}
                alt="Spa wellness setup"
                className="feature-media-image"
              />
            </div>
          </div>
        </article>
        <aside className="insight-card">
          <p className="insight-title">Wellness insight</p>
          <div className="insight-meter">
            <div className="insight-meter-content">
              <span>15h</span>
              <small>Relaxation</small>
            </div>
          </div>
          <p className="muted">80% towards your mindful goal.</p>
        </aside>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h4>Book Again</h4>
            <p className="muted">Quick access to your favorite rituals.</p>
          </div>
          <button type="button" className="link-button small">
            View history
          </button>
        </div>
        <div className="card-row">
          <div className="ritual-card teal">
            <div className="ritual-media face"></div>
            <h5>Deep Hydration Facial</h5>
            <span>Last visited: 2 weeks ago</span>
            <button type="button" className="ritual-action">
              <span className="ritual-action-icon icon-crest icon-crest--muted icon-crest--compact">
                <MaterialSymbol name="autorenew" className="text-[14px]" />
              </span>
              Book Again
            </button>
          </div>
          <div className="ritual-card amber">
            <div className="ritual-media stone"></div>
            <h5>Volcanic Stone Ritual</h5>
            <span>Last visited: 1 month ago</span>
            <button type="button" className="ritual-action">
              <span className="ritual-action-icon icon-crest icon-crest--muted icon-crest--compact">
                <MaterialSymbol name="autorenew" className="text-[14px]" />
              </span>
              Book Again
            </button>
          </div>
          <div className="ritual-card mint highlight">
            <div className="ritual-media float"></div>
            <h5>Floating Sanctuary</h5>
            <span>"Escape from gravity."</span>
            <button type="button" className="ritual-action primary">
              Book New
            </button>
          </div>
        </div>
      </section>
      <button type="button" className="fab" aria-label="Add">
        <MaterialSymbol name="add" className="text-[24px]" />
      </button>
    </div>
  )
}
