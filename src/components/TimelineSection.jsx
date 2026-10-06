'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function TimelineSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const milestones = [
    {
      year: '2021',
      title: 'HUMBLE ROOTS & CRAZY DREAMS',
      description: 'Founded with one relentless obsession: kill boring corporate banquets. Orchestrated 15 bespoke underground private celebrations.',
      stat: '15 EVENTS',
      tag: 'ORIGINS',
      image: null,
    },
    {
      year: '2022',
      title: 'CROSSING BORDERS — 50+ EVENTS',
      description: 'Expanded across European capitals. Produced high-profile weddings, VIP summits, and confidential corporate galas in Vienna, Berlin, and Warsaw.',
      stat: '50+ PRODUCTIONS',
      tag: 'EXPANSION',
      image: '/assets/timeline_gift.png',
    },
    {
      year: '2023',
      title: 'STADIUM SCALE & SENSORY TECH',
      description: 'Scaled to multi-thousand attendee tech summits. Integrated generative AI lasers, dynamic kinetic ceiling trusses, and synchronized drones.',
      stat: '120+ EVENTS',
      tag: 'SCALE',
      image: null,
    },
    {
      year: '2024',
      title: 'THE NEXT ERA OF EMOTIONS',
      description: '300+ career milestones completed. A powerhouse team of 45+ visionary directors, stage architects, and technical masters.',
      stat: '300+ MILESTONES',
      tag: 'PRESENT',
      image: '/assets/timeline_cheers.png',
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Check screen width for desktop horizontal pin scrub
    const isDesktop = window.innerWidth > 768;

    if (isDesktop) {
      const scrollTween = gsap.to(track, {
        x: () => -(track.scrollWidth - track.clientWidth + 120),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${track.scrollWidth - track.clientWidth + 400}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        scrollTween.scrollTrigger?.kill();
        scrollTween.kill();
      };
    }
  }, []);

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section id="timeline" ref={sectionRef} className="timeline-section card-stack-section">
      <div className="timeline-header-container">
        <div className="section-header">
          <div className="section-tag-wrapper">
            <span className="section-dot"></span>
            <span className="section-tag">OUR JOURNEY</span>
          </div>
          <h2 className="section-title">
            THE TIMELINE <span className="text-muted-bracket">[ 2021 — 2024 ]</span>
          </h2>
          <p className="section-subtitle">
            From intimate private galas to stadium-scale sensory spectacles.
          </p>
        </div>

        <div className="timeline-nav-buttons">
          <button type="button" onClick={scrollLeft} className="timeline-arrow-btn" aria-label="Previous milestone">
            ←
          </button>
          <button type="button" onClick={scrollRight} className="timeline-arrow-btn" aria-label="Next milestone">
            →
          </button>
        </div>
      </div>

      <div ref={trackRef} className="timeline-track" data-cursor="drag">
        {milestones.map((m) => (
          <div key={m.year} className="timeline-card interactive-card">
            <div className="timeline-card-top">
              <span className="timeline-year">{m.year}</span>
              <span className="timeline-tag">{m.tag}</span>
            </div>

            <h3 className="timeline-card-title">{m.title}</h3>
            <p className="timeline-card-desc">{m.description}</p>

            {m.image ? (
              <div className="timeline-image-box">
                <img src={m.image} alt={m.title} className="timeline-card-img" />
              </div>
            ) : (
              <div className="timeline-stat-box">
                <span className="timeline-big-stat">{m.stat}</span>
                <span className="timeline-stat-sub">PROVEN TRACK RECORD</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
