'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SparklesCanvas from './SparklesCanvas';

export default function HeroSection({ onOpenConsultation }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadRef = useRef(null);
  const imageRef = useRef(null);
  const badgeRef = useRef(null);
  const tagsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const headline = headlineRef.current;
    const image = imageRef.current;
    if (!section || !headline) return;

    // Kinetic Entrance Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(
      headline.querySelectorAll('.slice-layer'),
      { yPercent: 120, skewY: 7, opacity: 0 },
      { yPercent: 0, skewY: 0, opacity: 1, duration: 1.2, stagger: 0.15 }
    )
      .fromTo(
        subheadRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(
        tagsRef.current?.children || [],
        { scale: 0.8, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
        '-=0.5'
      )
      .fromTo(
        badgeRef.current,
        { scale: 0, rotate: -20 },
        { scale: 1, rotate: 0, duration: 0.7, ease: 'back.out(1.7)' },
        '-=0.4'
      );

    // ScrollTrigger Scrub Animation
    const slices = headline.querySelectorAll('.slice-layer');
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Parallax slice offsets
    if (slices[0]) scrollTl.to(slices[0], { xPercent: -15, ease: 'none' }, 0);
    if (slices[1]) scrollTl.to(slices[1], { xPercent: 12, ease: 'none' }, 0);
    if (slices[2]) scrollTl.to(slices[2], { xPercent: -10, ease: 'none' }, 0);

    // Image depth zoom
    if (image) {
      scrollTl.to(image, { scale: 1.12, yPercent: 10, ease: 'none' }, 0);
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="hero-section relative overflow-hidden">
      <SparklesCanvas />

      <div className="hero-content relative z-20">
        {/* Kinetic Sliced Headline */}
        <div ref={headlineRef} className="kinetic-headline-container">
          <div className="slice-wrapper slice-top">
            <span className="slice-layer">MAVKA EVENT</span>
          </div>
          <div className="slice-wrapper slice-middle">
            <span className="slice-layer">MAVKA EVENT</span>
          </div>
          <div className="slice-wrapper slice-bottom">
            <span className="slice-layer">MAVKA EVENT</span>
          </div>
        </div>

        {/* Floating Rotating Energy Badge */}
        <div ref={badgeRef} className="hero-energy-badge" data-cursor="pointer" onClick={onOpenConsultation}>
          <div className="badge-ring">
            <svg viewBox="0 0 100 100" className="badge-text-svg">
              <path
                id="textPath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text>
                <textPath href="#textPath" className="badge-letters">
                  • SUPER EVENTS • UNFORGETTABLE VIBES
                </textPath>
              </text>
            </svg>
          </div>
          <div className="badge-center-icon">✦</div>
        </div>

        {/* Subhead with Grotesque Typography */}
        <div ref={subheadRef} className="hero-subhead">
          <p className="hero-tagline">
            ORGANIZERS OF EMOTIONAL <span className="text-highlight-yellow">SUPER EVENTS</span>
          </p>
          <p className="hero-description">
            We turn bold, wild ideas into visceral live moments. From confidential VIP galas to stadium-sized activations, MAVKA crafts memories that linger forever.
          </p>
        </div>

        {/* Action Tags */}
        <div ref={tagsRef} className="hero-tag-pills">
          <span className="hero-pill">⚡ CRAZY CELEBRATION VIBES</span>
          <span className="hero-pill">✨ UNFORGETTABLE MEMORIES</span>
          <span className="hero-pill">🎨 CUSTOM CONCEPT DEV</span>
        </div>
      </div>

      {/* Hero Backdrop Illustration */}
      <div className="hero-backdrop-container">
        <img
          ref={imageRef}
          src="/assets/hero_clean_art.png"
          alt="MAVKA Celebration Table Atmosphere"
          className="hero-art-img"
        />
        <div className="hero-bottom-gradient"></div>
      </div>
    </section>
  );
}
