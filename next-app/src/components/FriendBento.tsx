'use client';

import { motion } from 'framer-motion';
import { IconCashOff, IconWallet } from '@tabler/icons-react';
import ScrollReveal from './ScrollReveal';
import TypingText from './TypingText';

export default function FriendBento() {
  return (
    <section className="friend-section">
      <div className="friend-inner">
        <ScrollReveal>
          <div className="section-label centered">For your friend</div>
        </ScrollReveal>
        <TypingText
          text="Give them a home worth moving into"
          className="friend-title"
          tag="h2"
          charDelay={0.025}
          startDelay={0.15}
        />
        <ScrollReveal delay={0.3}>
          <p className="friend-desc">
            Flent homes are different. Here&apos;s why your referral isn&apos;t just good for you — it&apos;s genuinely great for them.
          </p>
        </ScrollReveal>

        <div className="friend-bento">
          {/* Hero — No brokerage */}
          <ScrollReveal className="fb-card fb-hero" y={50}>
            <div className="fb-hero-left">
              <motion.div
                className="fb-hero-icon"
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
              >
                <IconCashOff size={26} color="var(--forest-green)" />
              </motion.div>
              <motion.div
                className="fb-hero-amount"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ type: 'spring', damping: 15, stiffness: 250, delay: 0.35 }}
              >
                ₹0
              </motion.div>
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
          <ScrollReveal className="fb-card fb-tall" delay={0.1} y={60}>
            <motion.div
              className="fb-tall-icon"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.15 }}
            >
              <IconWallet size={22} color="var(--blue-12)" />
            </motion.div>
            <motion.div
              className="fb-tall-keyword"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              ₹0
            </motion.div>
            <h4 className="fb-tall-heading">
              <span className="highlight">No hefty deposit.</span> Move in light.
            </h4>
            <p className="fb-card-text">
              Minimal upfront costs — your friend holds on to their money for the things that matter.
            </p>
          </ScrollReveal>

          {/* Bottom-right — Stacked cards */}
          <div className="fb-stack">
            <ScrollReveal delay={0.15} y={40}>
              <motion.div
                className="fb-compact yellow"
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className="fb-compact-stat">
                  <div className="fb-compact-number">200+</div>
                  <div className="fb-compact-unit">Items</div>
                </div>
                <div className="fb-compact-content">
                  <div className="fb-compact-heading">Fully furnished from day one</div>
                  <p className="fb-compact-text">Arrive, drop the bag, start living. Zero setup needed.</p>
                </div>
              </motion.div>
            </ScrollReveal>
            <ScrollReveal delay={0.25} y={40}>
              <motion.div
                className="fb-compact pink"
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className="fb-compact-stat">
                  <div className="fb-compact-number">Zero</div>
                  <div className="fb-compact-unit">Hassle</div>
                </div>
                <div className="fb-compact-content">
                  <div className="fb-compact-heading">Maintenance is on us</div>
                  <p className="fb-compact-text">Repairs, cleaning, support — Flent handles it all.</p>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
