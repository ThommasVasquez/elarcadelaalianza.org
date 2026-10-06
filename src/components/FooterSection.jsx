'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function FooterSection({ onOpenConsultation }) {
  const footerRef = useRef(null);
  const bigWordRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const footer = footerRef.current;
    const bigWord = bigWordRef.current;
    if (!footer || !bigWord) return;

    // Giant MAVKA letters reveal on scroll
    gsap.fromTo(
      bigWord,
      { yPercent: 40, opacity: 0.1, scale: 0.9 },
      {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
          scrub: 1,
        },
      }
    );

    // Marquee continuous loop
    const marquee = marqueeRef.current;
    if (marquee) {
      const loop = gsap.to(marquee, {
        xPercent: -50,
        repeat: -1,
        duration: 18,
        ease: 'none',
      });

      // Speed up marquee on scroll
      ScrollTrigger.create({
        trigger: footer,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity() / 300);
          gsap.to(loop, { timeScale: 1 + velocity, duration: 0.3 });
        },
      });

      return () => {
        loop.kill();
      };
    }
  }, []);

  return (
    <footer id="contact" ref={footerRef} className="footer-section card-stack-section">
      {/* Running Marquee Ticker */}
      <div className="footer-marquee-strip overflow-hidden">
        <div ref={marqueeRef} className="marquee-inner flex whitespace-nowrap">
          <span className="marquee-phrase">✦ LET&apos;S CREATE MAGIC</span>
          <span className="marquee-phrase">✦ BOOK YOUR SUPER EVENT</span>
          <span className="marquee-phrase">✦ UNFORGETTABLE EMOTIONS</span>
          <span className="marquee-phrase">✦ WORLDWIDE PRODUCTION</span>
          <span className="marquee-phrase">✦ LET&apos;S CREATE MAGIC</span>
          <span className="marquee-phrase">✦ BOOK YOUR SUPER EVENT</span>
          <span className="marquee-phrase">✦ UNFORGETTABLE EMOTIONS</span>
          <span className="marquee-phrase">✦ WORLDWIDE PRODUCTION</span>
        </div>
      </div>

      <div className="footer-body">
        <div className="footer-cta-card">
          <div className="cta-left">
            <span className="cta-subtitle">READY TO IGNITE THE CROWD?</span>
            <h2 className="cta-title">
              LET&apos;S BRING YOUR <br />
              <span className="text-[#FFD152]">WILD VISION</span> TO LIFE.
            </h2>
          </div>

          <div className="cta-right">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="btn-giant-cta"
              data-cursor="pointer"
            >
              <span>START A PROJECT</span>
              <div className="giant-arrow">↗</div>
            </button>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h4 className="col-title">DIRECT INQUIRIES</h4>
            <a href="mailto:hello@mavkaevent.com" className="footer-link-highlight">
              hello@mavkaevent.com
            </a>
            <a href="tel:+380931234567" className="footer-link">
              +380 (93) 123-4567
            </a>
            <span className="footer-sub">Mon — Sun / 09:00 — 21:00 EET</span>
          </div>

          <div className="footer-col">
            <h4 className="col-title">OFFICES</h4>
            <p className="footer-text">Kyiv: Khreshchatyk 22, 4th Floor</p>
            <p className="footer-text">Berlin: Friedrichstraße 180</p>
            <p className="footer-text">Warsaw: Złota 44</p>
          </div>

          <div className="footer-col">
            <h4 className="col-title">FOLLOW THE VIBE</h4>
            <div className="social-links-list">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-pill">
                INSTAGRAM ↗
              </a>
              <a href="https://telegram.org" target="_blank" rel="noreferrer" className="social-pill">
                TELEGRAM ↗
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-pill">
                LINKEDIN ↗
              </a>
            </div>
          </div>
        </div>

        {/* Giant MAVKA wordmark */}
        <div className="giant-wordmark-container">
          <div ref={bigWordRef} className="giant-mavka-letters">
            MAVKA
          </div>
        </div>

        <div className="footer-copyright-row">
          <span>MAVKA EVENT AGENCY © {new Date().getFullYear()}</span>
          <span>ALL RIGHTS RESERVED • CRAFTED FOR EMOTIONAL SUPER EVENTS</span>
          <a href="#hero" className="back-to-top-link">
            TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
