'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { tierData, allSymbols, bannerColors, coinDisplayData } from '@/lib/constants';
import { launchConfetti } from '@/lib/confetti';
import type { TierData } from '@/types';
import ScrollReveal from '../ScrollReveal';

export default function RewardsSection() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [activeCoin, setActiveCoin] = useState<number | null>(null);
  const [machineState, setMachineState] = useState<'idle' | 'spinning' | 'won'>('idle');
  const [popupData, setPopupData] = useState<TierData | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const confettiRef = useRef<HTMLCanvasElement>(null);
  const reelRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const buildReel = useCallback((reelIndex: number, winSymbol: string) => {
    const track = reelRefs.current[reelIndex];
    if (!track) return track;
    track.innerHTML = '';
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 20; i++) {
      const div = document.createElement('div');
      div.className = 'slot-reel-item';
      div.textContent = allSymbols[Math.floor(Math.random() * allSymbols.length)];
      frag.appendChild(div);
    }
    const winDiv = document.createElement('div');
    winDiv.className = 'slot-reel-item';
    winDiv.textContent = winSymbol;
    frag.appendChild(winDiv);
    track.appendChild(frag);
    track.style.transition = 'none';
    track.style.transform = 'translateY(0)';
    return track;
  }, []);

  const spinSlot = useCallback((tierIndex: number) => {
    if (isSpinning) return;
    setIsSpinning(true);
    setActiveCoin(tierIndex);
    setMachineState('spinning');

    const data = tierData[tierIndex];
    const winSymbol = data.symbols[0];

    const tracks = [
      buildReel(0, winSymbol),
      buildReel(1, winSymbol),
      buildReel(2, winSymbol),
    ];

    // Force reflow
    if (tracks[0]) void tracks[0].offsetHeight;

    const itemH = 128;
    const stopAt = -(20 * itemH);

    tracks.forEach((track, i) => {
      if (!track) return;
      const delay = i * 300;
      const duration = 1.6 + i * 0.4;
      setTimeout(() => {
        track.style.transition = `transform ${duration}s cubic-bezier(0.15, 0.85, 0.35, 1)`;
        track.style.transform = `translateY(${stopAt}px)`;
      }, delay);
    });

    const totalDuration = (1.6 + 2 * 0.4) * 1000 + 2 * 300 + 400;
    setTimeout(() => {
      setMachineState('won');
      setPopupData(data);
      setShowPopup(true);
      if (confettiRef.current) launchConfetti(confettiRef.current);
      setIsSpinning(false);
    }, totalDuration);
  }, [isSpinning, buildReel]);

  const closePopup = useCallback(() => {
    setShowPopup(false);
    setMachineState('idle');
    setActiveCoin(null);
    reelRefs.current.forEach(track => {
      if (!track) return;
      track.style.transition = 'none';
      track.style.transform = 'translateY(0)';
      track.innerHTML = '';
      const div = document.createElement('div');
      div.className = 'slot-reel-item';
      div.textContent = allSymbols[Math.floor(Math.random() * allSymbols.length)];
      track.appendChild(div);
    });
  }, []);

  const handleClaim = useCallback(() => {
    closePopup();
    document.querySelector('.cta-section')?.scrollIntoView({ behavior: 'smooth' });
  }, [closePopup]);

  return (
    <section className="rewards">
      <div className="rewards-bg" />
      <ScrollReveal className="rewards-inner">
        <div className="section-label centered white">Reward Journey</div>
        <h2 className="rewards-title">Every referral, a better reward</h2>
        <p className="rewards-desc">Build your streak. Each move-in unlocks the next tier — and the prizes keep getting better.</p>

        {/* Tier Coins */}
        <div className={`slot-coins${activeCoin !== null ? ' has-active' : ''}`}>
          {coinDisplayData.map((coin, i) => (
            <div
              key={i}
              className={`slot-coin${activeCoin === i ? ' active' : ''}`}
              data-tier={i + 1}
              onClick={() => spinSlot(i)}
            >
              <span className="slot-coin-tier">{coin.tier}</span>
              <span className="slot-coin-number">{coin.number}</span>
              <span className="slot-coin-label">{coin.label}</span>
              <span className="slot-coin-prize">{coin.prize}</span>
            </div>
          ))}
        </div>

        {/* Slot Machine */}
        <div className={`slot-machine${machineState === 'spinning' ? ' spinning' : ''}${machineState === 'won' ? ' won' : ''}`}>
          <div className="slot-machine-top">
            <div className="slot-machine-light" />
            <div className="slot-machine-light" />
            <div className="slot-machine-light" />
            <span className="slot-machine-label">Flent Rewards</span>
            <div className="slot-machine-light" />
            <div className="slot-machine-light" />
            <div className="slot-machine-light" />
          </div>
          <div className="slot-reels">
            {[0, 1, 2].map(i => (
              <div className="slot-reel" key={i}>
                <div
                  className="slot-reel-track"
                  ref={(el) => { reelRefs.current[i] = el; }}
                />
              </div>
            ))}
          </div>
          <div className="slot-prompt">Pick a coin to spin &amp; reveal your reward</div>
        </div>

        <p className="rewards-footnote">Streak resets only when you redeem — never for missing a month.</p>
      </ScrollReveal>

      {/* Portal overlay + confetti to document.body so they aren't clipped by overflow:hidden */}
      {mounted && createPortal(
        <>
          <div className={`slot-overlay${showPopup ? ' visible' : ''}`}>
            <div className="slot-popup">
              <div className="slot-popup-banner" style={{ background: popupData ? bannerColors[popupData.tier - 1] : undefined }}>
                <div className="slot-popup-emoji-ring" style={{ background: 'var(--white)' }}>
                  <div className="slot-popup-emoji">{popupData?.emoji}</div>
                </div>
                <div className="slot-popup-tier">
                  TIER {popupData?.tier}{popupData?.tier === 5 ? ' — GRAND PRIZE' : ''}
                </div>
              </div>
              <div className="slot-popup-body">
                <div className="slot-popup-prize">{popupData?.prize}</div>
                <div className="slot-popup-name">{popupData?.name}</div>
                <div className="slot-popup-desc">{popupData?.desc}</div>
                <div className="slot-popup-referrals">
                  {popupData && `${popupData.refs} ${popupData.refs === 1 ? 'referral needed' : 'referrals needed'}`}
                </div>
                <div className="slot-popup-actions">
                  <button className="slot-popup-cta-secondary" onClick={closePopup}>Try another tier</button>
                  <button className="slot-popup-cta" onClick={handleClaim}>Start referring</button>
                </div>
              </div>
            </div>
          </div>
          <canvas className="confetti-canvas" ref={confettiRef} />
        </>,
        document.body
      )}
    </section>
  );
}
