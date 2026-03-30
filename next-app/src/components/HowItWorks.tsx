'use client';

import { useEffect, useRef, useState } from 'react';
import { hiwSteps } from '@/lib/constants';
import ScrollReveal from './ScrollReveal';
import Image from 'next/image';

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackFillRef = useRef<HTMLDivElement>(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (!stepsRef.current) return;
      const viewMid = window.innerHeight * 0.55;
      let newActive = 0;

      stepRefs.current.forEach((step, i) => {
        if (step) {
          const rect = step.getBoundingClientRect();
          const stepMid = rect.top + rect.height / 2;
          if (stepMid < viewMid) newActive = i;
        }
      });

      setActiveIndex(newActive);

      // Update track fill
      if (trackFillRef.current && stepRefs.current[0] && stepRefs.current[newActive]) {
        const firstNode = stepRefs.current[0]?.querySelector('.hiw-step-node') as HTMLElement;
        const activeNode = stepRefs.current[newActive]?.querySelector('.hiw-step-node') as HTMLElement;
        if (firstNode && activeNode) {
          const startY = firstNode.offsetTop + 20;
          const endY = activeNode.offsetTop + 20;
          trackFillRef.current.style.top = `${startY}px`;
          trackFillRef.current.style.height = `${endY - startY}px`;
        }
      }
    }

    function rafScroll() {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(() => {
          onScroll();
          tickingRef.current = false;
        });
      }
    }

    window.addEventListener('scroll', rafScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', rafScroll);
  }, []);

  return (
    <section className="how-it-works">
      <ScrollReveal>
        <div className="hiw-header" style={{ maxWidth: 960, margin: '0 auto' }}>
          <div className="section-label centered">How it works</div>
          <h2 className="hiw-title">How Flent Referrals Work</h2>
          <p className="hiw-desc">A simple, trackable journey — built to feel private, premium, and worth sharing.</p>
        </div>
      </ScrollReveal>
      <div className="hiw-steps" ref={stepsRef}>
        <div className="hiw-track-fill" ref={trackFillRef} />
        {hiwSteps.map((step, i) => (
          <div
            key={i}
            className={`hiw-step${i <= activeIndex ? ' active' : ''}`}
            data-step={i + 1}
            ref={(el) => { stepRefs.current[i] = el; }}
          >
            <div className="hiw-step-node">{i + 1}</div>
            <div className="hiw-step-card">
              <div className="hiw-step-header">
                <div className="hiw-step-num">{step.num}</div>
                <div className="hiw-step-badge">
                  <Image src={step.badgeIcon} alt="" width={14} height={14} />
                  <span>{step.badgeText}</span>
                </div>
              </div>
              <div className="hiw-step-body">
                <h3 className="hiw-step-title">{step.title}</h3>
                <p className="hiw-step-text">{step.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
