'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function FeaturedWorkSection({ onSelectCase }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const cases = [
    {
      id: 'holiday-magic',
      title: 'HOLIDAY MAGIC',
      category: 'PRIVATE CELEBRATION',
      guests: '650+ GUESTS',
      location: 'KYIV & BERLIN',
      year: '2024',
      image: '/assets/work_holiday_magic.png',
      badge: 'CROWD FAVORITE',
      description: 'A transformative winter wonderland gala featuring 360-degree immersive projection domes, Michelin-starred sensory dining, and an acoustic live orchestra.',
    },
    {
      id: 'teamtrek',
      title: 'TEAMTREK 2024',
      category: 'CORPORATE OFFSITE',
      guests: '1,200+ ATTENDEES',
      location: 'CARPATHIAN HIGHLANDS',
      year: '2024',
      image: '/assets/work_teamtrek.png',
      badge: 'HIGH ADRENALINE',
      description: 'Three-day extreme mountain summit blending tactical survival quests, high-octane team dynamics, and midnight acoustic bonfire sets.',
    },
    {
      id: 'influence-con',
      title: 'INFLUENCE CON',
      category: 'CREATOR SUMMIT',
      guests: '3,800+ CREATORS',
      location: 'WARSAW EXPO CENTER',
      year: '2023',
      image: '/assets/work_influence.png',
      badge: 'VIRAL IMPACT',
      description: 'The defining digital creator congress with multi-stage keynote setups, dynamic hologram interactions, and instant content recording studios.',
    },
    {
      id: 'future-sparks',
      title: 'FUTURE SPARKS',
      category: 'TECH & INNOVATION',
      guests: '5,000+ VISIONARIES',
      location: 'PRAGUE TECH PARK',
      year: '2023',
      image: '/assets/work_innovation.png',
      badge: 'STATE OF THE ART',
      description: 'Futuristic expo and sensory light experience showcasing cutting-edge AI breakthroughs with generative laser stages and synchronized drones.',
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    // Header reveal
    gsap.fromTo(
      section.querySelector('.section-header'),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      }
    );

    // Staggered Cards Entrance & Parallax on Scroll
    cardsRef.current.forEach((card, idx) => {
      if (!card) return;

      gsap.fromTo(
        card,
        {
          y: 80,
          scale: 0.92,
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Inner image parallax scrub
      const img = card.querySelector('.card-image-el');
      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -12, scale: 1.1 },
          {
            yPercent: 12,
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section id="work" ref={sectionRef} className="featured-work-section card-stack-section">
      <div className="section-header">
        <div className="section-tag-wrapper">
          <span className="section-dot"></span>
          <span className="section-tag">FEATURED WORK</span>
        </div>
        <h2 className="section-title">
          SELECTED CASES <span className="text-muted-bracket">[ 04 ]</span>
        </h2>
        <p className="section-subtitle">
          Each event is custom engineered from scratch. No templates, no compromises.
        </p>
      </div>

      <div className="cases-grid">
        {cases.map((c, index) => (
          <div
            key={c.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="case-card interactive-card"
            data-cursor="view"
            onClick={() => onSelectCase(c)}
          >
            <div className="case-image-wrapper overflow-hidden relative">
              <img src={c.image} alt={c.title} className="card-image-el" />
              <div className="case-overlay-pill">
                <span className="badge-bullet">✦</span>
                <span>{c.badge}</span>
              </div>
              <div className="case-hover-action">
                <span>EXPLORE CASE</span>
                <span className="hover-arrow">↗</span>
              </div>
            </div>

            <div className="case-card-meta">
              <div className="meta-top">
                <span className="meta-category">{c.category}</span>
                <span className="meta-year">{c.year}</span>
              </div>
              <h3 className="case-card-title">{c.title}</h3>
              <p className="case-card-desc">{c.description}</p>
              <div className="meta-bottom">
                <span className="meta-stat">👥 {c.guests}</span>
                <span className="meta-stat">📍 {c.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
