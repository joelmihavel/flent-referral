'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import TypingText from './TypingText';

export default function CtaSection() {
  return (
    <section className="cta-section">
      <div className="cta-bg" />
      <div className="cta-inner">
        <TypingText
          text="Your next reward is"
          className="cta-title"
          tag="h2"
          charDelay={0.035}
          startDelay={0.1}
        />
        <ScrollReveal delay={0.5}>
          <div className="cta-title-italic">one referral away.</div>
        </ScrollReveal>
        <ScrollReveal delay={0.7}>
          <p className="cta-desc">Free to join. Takes under a minute. Your code is waiting.</p>
        </ScrollReveal>
        <ScrollReveal delay={0.85}>
          <div className="cta-buttons">
            <motion.a
              href="#"
              className="btn-base btn-pill-white"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Get my referral code — it&apos;s free
            </motion.a>
            <span className="cta-signin">Already a member? Sign in →</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
