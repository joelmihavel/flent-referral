'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { boardCards } from '@/lib/constants';
import ScrollReveal from './ScrollReveal';

function FlapDigit({ accentColor }: { accentColor: string }) {
  return (
    <div className="flap" data-char="0" style={{ '--accent': accentColor } as React.CSSProperties}>
      <div className="flap-top"><div className="flap-inner">0</div></div>
      <div className="flap-bottom"><div className="flap-inner">0</div></div>
      <div className="flap-flip-top"><div className="flap-inner">0</div></div>
    </div>
  );
}

export default function CommunityBoard() {
  const sectionRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  const flipToChar = useCallback((flap: HTMLElement, newChar: string): Promise<void> => {
    return new Promise(resolve => {
      const oldChar = flap.dataset.char;
      if (oldChar === newChar) { resolve(); return; }

      const flipTop = flap.querySelector('.flap-flip-top .flap-inner') as HTMLElement;
      flipTop.textContent = oldChar || '0';
      (flap.querySelector('.flap-bottom .flap-inner') as HTMLElement).textContent = newChar;
      flap.classList.add('flipping');

      setTimeout(() => {
        (flap.querySelector('.flap-top .flap-inner') as HTMLElement).textContent = newChar;
        flap.classList.remove('flipping');
        flap.dataset.char = newChar;
        resolve();
      }, 400);
    });
  }, []);

  const animateCard = useCallback(async (card: HTMLElement) => {
    const target = card.dataset.target || '';
    const flaps = card.querySelectorAll('.flap') as NodeListOf<HTMLElement>;
    const digits = target.split('');
    while (digits.length < flaps.length) digits.unshift('0');

    const promises = Array.from(flaps).map((flap, i) => {
      return new Promise<void>(async resolve => {
        await new Promise(r => setTimeout(r, i * 120));
        const targetDigit = parseInt(digits[i]) || 0;
        const totalSteps = targetDigit + 4;

        for (let step = 0; step < totalSteps; step++) {
          const isLast = step === totalSteps - 1;
          const char = isLast ? digits[i] : String(Math.floor(Math.random() * 10));
          const delay = isLast ? 0 : Math.max(60, 200 - step * 15);
          await flipToChar(flap, char);
          if (!isLast) await new Promise(r => setTimeout(r, delay));
        }
        resolve();
      });
    });

    await Promise.all(promises);
  }, [flipToChar]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const cards = boardRef.current?.querySelectorAll('.board-card') as NodeListOf<HTMLElement>;
          cards?.forEach((card, i) => {
            setTimeout(() => animateCard(card), i * 300);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animateCard]);

  return (
    <ScrollReveal>
      <section className="community" id="community-section" ref={sectionRef}>
        <div className="community-inner">
          <div className="section-label centered">By the numbers</div>
          <h2 className="community-title">A community that&apos;s already growing fast</h2>
          <div className="community-board" ref={boardRef}>
            {boardCards.map((card, cardIndex) => {
              const digitCount = card.target.length;
              const hasCurrencyPrefix = cardIndex === 0;
              return (
                <div className="board-card" key={cardIndex} data-target={card.target}>
                  <div className="board-digits">
                    {hasCurrencyPrefix && <div className="flap-suffix">₹</div>}
                    {Array.from({ length: digitCount }).map((_, i) => (
                      <FlapDigit key={i} accentColor={card.accentColor} />
                    ))}
                    <div className="flap-suffix">{card.suffix}</div>
                  </div>
                  <div className="board-card-label">{card.label}</div>
                  <p className="board-card-text">{card.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
