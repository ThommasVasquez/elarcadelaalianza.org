'use client';

export default function Navigation({ onOpenConsultation }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="site-navbar">
      <div className="nav-container">
        <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
          <span className="logo-sparkle">✦</span>
          <span className="logo-text">MAVKA</span>
        </a>

        <div className="nav-links">
          <button type="button" onClick={() => scrollTo('work')} className="nav-link">
            CASES
          </button>
          <button type="button" onClick={() => scrollTo('services')} className="nav-link">
            SERVICES
          </button>
          <button type="button" onClick={() => scrollTo('timeline')} className="nav-link">
            TIMELINE
          </button>
          <button type="button" onClick={() => scrollTo('people')} className="nav-link">
            TEAM
          </button>
        </div>

        <div className="nav-cta">
          <button
            type="button"
            onClick={onOpenConsultation}
            className="btn-pill-yellow"
            data-cursor="pointer"
          >
            <span>GET IN TOUCH</span>
            <div className="pill-arrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
