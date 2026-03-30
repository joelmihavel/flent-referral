'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqItems } from '@/lib/constants';
import ScrollReveal from './ScrollReveal';
import TypingText from './TypingText';

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const answerRefs = useRef<Map<number, { typed: boolean; abortId: ReturnType<typeof setTimeout> | null; aborted: boolean }>>(new Map());
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const resetAnswer = useCallback((index: number) => {
    const data = answerRefs.current.get(index);
    if (data) {
      if (data.abortId) clearTimeout(data.abortId);
      data.aborted = true;
      data.typed = false;
    }
    const p = paragraphRefs.current[index];
    if (p) p.textContent = '';
  }, []);

  const typeAnswer = useCallback((index: number) => {
    let data = answerRefs.current.get(index);
    if (!data) {
      data = { typed: false, abortId: null, aborted: false };
      answerRefs.current.set(index, data);
    }
    if (data.typed) return;
    data.aborted = false;

    const p = paragraphRefs.current[index];
    if (!p) return;
    const text = faqItems[index].answer;
    const words = text.split(/\s+/);
    p.innerHTML = '';

    const spans = words.map(w => {
      const span = document.createElement('span');
      span.className = 'faq-word';
      span.textContent = w + ' ';
      p.appendChild(span);
      return span;
    });

    const cursor = document.createElement('span');
    cursor.style.cssText = 'display:inline-block;width:2px;height:1em;background:rgba(255,255,255,0.85);margin-left:1px;vertical-align:text-bottom;animation:faq-blink 0.6s steps(1) infinite;';

    let i = 0;
    function showNext() {
      if (data!.aborted) { cursor.remove(); return; }
      if (i < spans.length) {
        spans[i].classList.add('visible');
        spans[i].after(cursor);
        i++;
        data!.abortId = setTimeout(showNext, 35);
      } else {
        cursor.remove();
        data!.typed = true;
      }
    }
    data.abortId = setTimeout(showNext, 80);
  }, []);

  const handleToggle = useCallback((index: number) => {
    const isOpen = openIndex === index;

    if (openIndex !== null) {
      resetAnswer(openIndex);
    }

    if (isOpen) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
      resetAnswer(index);
      setTimeout(() => typeAnswer(index), 250);
    }
  }, [openIndex, resetAnswer, typeAnswer]);

  return (
    <section className="faq">
      <div className="faq-inner">
        <div className="faq-left">
          <TypingText
            text="You got questions?"
            className="faq-heading"
            tag="h2"
            charDelay={0.03}
            startDelay={0.1}
          />
          <ScrollReveal delay={0.5}>
            <em style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              display: 'block',
              color: 'var(--forest-green)',
              fontSize: '44px',
              lineHeight: 1.15,
              fontWeight: 800,
            }}>
              We got answers.
            </em>
          </ScrollReveal>
          <ScrollReveal delay={0.6}>
            <p className="faq-subtitle">Everything you need to know about the Flent Referral Program.</p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="faq-right" delay={0.15}>
          <p className="faq-right-label">Common questions about referrals</p>
          <div className="faq-list">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                className={`faq-item${openIndex === i ? ' open' : ''}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <button className="faq-button" onClick={() => handleToggle(i)}>
                  <span className="faq-question">{item.question}</span>
                  <motion.span
                    className="faq-toggle"
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    +
                  </motion.span>
                </button>
                <div className="faq-answer">
                  <div>
                    <div className="faq-answer-card">
                      <p ref={(el) => { paragraphRefs.current[i] = el; }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
      <ScrollReveal className="faq-footer-wrap">
        <motion.div
          className="faq-footer-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <p className="faq-footer">Still have questions? <a href="mailto:sales@flent.in">Email us at sales@flent.in</a></p>
        </motion.div>
      </ScrollReveal>
    </section>
  );
}
