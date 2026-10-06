'use client';

import { useState } from 'react';

export default function PresentationControls({ isMockupFrame, setIsMockupFrame, onOpenConsultation }) {
  const [soundActive, setSoundActive] = useState(false);

  const toggleSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5 note
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch {
      // AudioContext fallback
    }
    setSoundActive(!soundActive);
  };

  return (
    <div className="presentation-controls">
      <div className="controls-left">
        <div className="pulse-indicator"></div>
        <span className="controls-title">MAVKA EVENT — LIVE PRODUCTION</span>
      </div>

      <div className="controls-right">
        <button
          type="button"
          onClick={() => setIsMockupFrame(!isMockupFrame)}
          className={`control-btn ${isMockupFrame ? 'active' : ''}`}
          title="Toggle Dribbble Bezel Frame / Full Browser View"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          <span>{isMockupFrame ? 'Dribbble Mockup' : 'Full Browser'}</span>
        </button>

        <button
          type="button"
          onClick={toggleSound}
          className={`control-btn ${soundActive ? 'active' : ''}`}
          title="Toggle Audio Atmosphere"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          <span>Sound: {soundActive ? 'ON' : 'OFF'}</span>
        </button>

        <button
          type="button"
          onClick={onOpenConsultation}
          className="control-btn primary"
        >
          <span>Free Consultation</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
