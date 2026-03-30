import ScrollReveal from './ScrollReveal';

export default function StatsBar() {
  return (
    <ScrollReveal>
      <section className="stats-bar">
        <div className="stats-bar-inner">
          <div className="stat-item">
            <span className="stat-number">₹0</span>
            <span className="stat-label-inline">to join</span>
            <span className="stat-desc">Free forever, no fees</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">∞</span>
            <span className="stat-label-inline">referrals</span>
            <span className="stat-desc">No cap, ever</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">12</span>
            <span className="stat-label-inline">rewards to unlock</span>
            <span className="stat-desc">Each one bigger than the last</span>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
