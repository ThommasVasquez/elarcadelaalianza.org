'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function PeopleSection({ onOpenConsultation }) {
  const sectionRef = useRef(null);
  const countEventsRef = useRef(null);
  const countRatingRef = useRef(null);
  const [eventsVal, setEventsVal] = useState(0);
  const [ratingVal, setRatingVal] = useState('0.0');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    // Number Counter Animation on ScrollTrigger
    const counterObj = { count: 0, rating: 0 };

    ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(counterObj, {
          count: 304,
          rating: 4.9,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: () => {
            setEventsVal(Math.floor(counterObj.count));
            setRatingVal(counterObj.rating.toFixed(1));
          },
        });

        // Team avatar stagger
        gsap.fromTo(
          section.querySelectorAll('.avatar-circle'),
          { scale: 0, x: -20 },
          { scale: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'back.out(1.7)' }
        );
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section id="people" ref={sectionRef} className="people-section card-stack-section">
      <div className="section-header">
        <div className="section-tag-wrapper">
          <span className="section-dot"></span>
          <span className="section-tag">THE PEOPLE</span>
        </div>
        <h2 className="section-title">
          TRUSTED BY LEADERS <span className="text-muted-bracket">[ STATS ]</span>
        </h2>
        <p className="section-subtitle">
          Driven by relentless attention to emotional resonance and technical precision.
        </p>
      </div>

      <div className="stats-grid">
        {/* Stat 1: Total Events */}
        <div className="stat-card interactive-card">
          <div className="stat-card-badge">PRODUCTION VOLUME</div>
          <div className="stat-number-wrapper">
            <span ref={countEventsRef} className="stat-big-number">
              {eventsVal}
            </span>
            <span className="stat-plus">+</span>
          </div>
          <p className="stat-label">COMPLETED SUPER EVENTS</p>
          <p className="stat-subtext">Across 14 countries in Europe, the Middle East, and the Americas.</p>
        </div>

        {/* Stat 2: Rating */}
        <div className="stat-card interactive-card">
          <div className="stat-card-badge">CLIENT LOYALTY</div>
          <div className="stat-number-wrapper">
            <span ref={countRatingRef} className="stat-big-number">
              {ratingVal}
            </span>
            <span className="stat-star">★</span>
          </div>
          <p className="stat-label">AVERAGE CLIENT RATING</p>
          <p className="stat-subtext">98.4% of corporate clients re-book MAVKA for their next annual summit.</p>
        </div>

        {/* Team Avatars Card */}
        <div className="stat-card interactive-card team-card">
          <div className="stat-card-badge">THE ARCHITECTS</div>
          <div className="team-avatars-cluster">
            <img src="/assets/portrait_1.png" alt="Director 1" className="avatar-circle" />
            <img src="/assets/portrait_2.png" alt="Director 2" className="avatar-circle" />
            <img src="/assets/portrait_3.png" alt="Director 3" className="avatar-circle" />
            <div className="avatar-count-badge">+42</div>
          </div>
          <p className="stat-label">PASSIONATE SPECIALISTS</p>
          <p className="stat-subtext">
            Stage directors, lighting engineers, sound designers, and protocol concierges working in unison.
          </p>
          <button type="button" onClick={onOpenConsultation} className="btn-team-chat">
            <span>Talk With Our Directors</span>
            <span className="btn-arrow">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}
