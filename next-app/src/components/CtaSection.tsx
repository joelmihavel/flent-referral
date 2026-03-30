import ScrollReveal from './ScrollReveal';

export default function CtaSection() {
  return (
    <section className="cta-section">
      <div className="cta-bg" />
      <ScrollReveal>
        <div className="cta-inner">
          <h2 className="cta-title">Your next reward is</h2>
          <div className="cta-title-italic">one referral away.</div>
          <p className="cta-desc">Free to join. Takes under a minute. Your code is waiting.</p>
          <div className="cta-buttons">
            <a href="#" className="btn-base btn-pill-white">Get my referral code — it&apos;s free</a>
            <span className="cta-signin">Already a member? Sign in →</span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
