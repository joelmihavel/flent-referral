import { IconCashOff, IconWallet } from '@tabler/icons-react';
import ScrollReveal from './ScrollReveal';

export default function FriendBento() {
  return (
    <section className="friend-section">
      <div className="friend-inner">
        <ScrollReveal>
          <div className="section-label centered">For your friend</div>
          <h2 className="friend-title">Give them a home worth moving into</h2>
          <p className="friend-desc">
            Flent homes are different. Here&apos;s why your referral isn&apos;t just good for you — it&apos;s genuinely great for them.
          </p>
        </ScrollReveal>
        <div className="friend-bento">
          {/* Hero — No brokerage */}
          <ScrollReveal className="fb-card fb-hero">
            <div className="fb-hero-left">
              <div className="fb-hero-icon">
                <IconCashOff size={26} color="var(--forest-green)" />
              </div>
              <div className="fb-hero-amount">₹0</div>
              <div className="fb-hero-amount-label">Brokerage</div>
            </div>
            <div className="fb-hero-content">
              <div className="fb-card-label">The big one</div>
              <h3 className="fb-hero-heading">
                <span className="highlight">No brokerage.</span> Not for them, not for you.
              </h3>
              <p className="fb-card-text">
                Flent cuts out brokers entirely. Instead of your friend paying a broker one month&apos;s rent, that money stays in their pocket — and we reward you for the introduction.
              </p>
            </div>
          </ScrollReveal>

          {/* Bottom-left — Deposit card */}
          <ScrollReveal className="fb-card fb-tall" delay={0.1}>
            <div className="fb-tall-icon">
              <IconWallet size={22} color="var(--blue-12)" />
            </div>
            <div className="fb-tall-keyword">₹0</div>
            <h4 className="fb-tall-heading">
              <span className="highlight">No hefty deposit.</span> Move in light.
            </h4>
            <p className="fb-card-text">
              Minimal upfront costs — your friend holds on to their money for the things that matter.
            </p>
          </ScrollReveal>

          {/* Bottom-right — Stacked cards */}
          <ScrollReveal className="fb-stack" delay={0.2}>
            <div className="fb-compact yellow">
              <div className="fb-compact-stat">
                <div className="fb-compact-number">200+</div>
                <div className="fb-compact-unit">Items</div>
              </div>
              <div className="fb-compact-content">
                <div className="fb-compact-heading">Fully furnished from day one</div>
                <p className="fb-compact-text">Arrive, drop the bag, start living. Zero setup needed.</p>
              </div>
            </div>
            <div className="fb-compact pink">
              <div className="fb-compact-stat">
                <div className="fb-compact-number">Zero</div>
                <div className="fb-compact-unit">Hassle</div>
              </div>
              <div className="fb-compact-content">
                <div className="fb-compact-heading">Maintenance is on us</div>
                <p className="fb-compact-text">Repairs, cleaning, support — Flent handles it all.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
