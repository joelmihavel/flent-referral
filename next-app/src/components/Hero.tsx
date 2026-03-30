export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-badge">
          <div className="hero-badge-dot" />
          <span className="hero-badge-text">Open to everyone — tenants and non-tenants</span>
        </div>
        <div className="hero-title">
          <div className="hero-title-line1">Refer friends to Flent.</div>
          <div className="hero-title-line2">Earn real rewards.</div>
        </div>
        <p className="hero-subtitle">
          Share your code. Friend moves in. You earn — and every milestone gets better.
        </p>
        <div className="hero-cta">
          <button className="btn-base btn-pill">Get my referral code →</button>
          <p className="hero-cta-sub">
            Already a member? <a href="#">Track your progress →</a>
          </p>
        </div>
        <div className="hero-bottom" />
      </div>
    </section>
  );
}
