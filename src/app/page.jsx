'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  ROTATING_WORDS,
  FILOSOFIA_INSTITUCIONAL,
  CITA_BIBLICA,
  BINACIONAL_INFO,
  PROGRAMAS_OFICIALES,
  WORK_CATEGORIES,
  DIMENSIONES_IMPACTO,
  TIMELINE_HITOS,
  GOBIERNO_INSTITUCIONAL,
  LEGAL_DOCUMENTS,
} from './foundationData';

export default function ArcaDeLaAlianzaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLineInterest, setModalLineInterest] = useState('Donación / Aporte General');
  const [copiedBank, setCopiedBank] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [activeLegalDocKey, setActiveLegalDocKey] = useState('privacidad');
  const [activeService, setActiveService] = useState('01');
  const [activeWorkCategory, setActiveWorkCategory] = useState('todos');
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [ratingCount, setRatingCount] = useState('0.0');
  const [wordIndex, setWordIndex] = useState(0);

  // Rotating kinetic title word interval
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Refs for GSAP & Lenis
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const cursorRef = useRef(null);
  const statementRef = useRef(null);
  const workRef = useRef(null);
  const workTrackRef = useRef(null);
  const servicesRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineTrackRef = useRef(null);
  const peopleRef = useRef(null);
  const footerRef = useRef(null);
  const giantMavkaRef = useRef(null);

  const handleCopyBankAccount = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('0263760061');
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2500);
    }
  };

  const openLegalDocument = (key) => {
    setActiveLegalDocKey(key);
    setLegalModalOpen(true);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.75,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);
    window.__lenis = lenis;

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Custom Magnetic Cursor (Fixed position)
    const cursor = cursorRef.current;
    if (cursor && !window.matchMedia('(pointer: coarse)').matches) {
      const xTo = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3' });
      const yTo = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3' });

      const onMouseMove = (e) => {
        cursor.classList.add('visible');
        xTo(e.clientX);
        yTo(e.clientY);
      };

      const onMouseLeave = () => {
        cursor.classList.remove('visible');
      };

      window.addEventListener('mousemove', onMouseMove);
      document.body.addEventListener('mouseleave', onMouseLeave);
    }

    // GSAP ScrollTrigger Animations
    const ctx = gsap.context(() => {
      // 1. HERO CINEMATIC SCROLL PARALLAX
      const heroEl = heroRef.current;
      if (heroEl) {
        gsap.to('.hero-cinematic-center', {
          yPercent: -12,
          opacity: 0.85,
          ease: 'none',
          scrollTrigger: {
            trigger: heroEl,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // 2. STATEMENT / EDITORIAL REVEAL ON SCROLL
      const statementEl = statementRef.current;
      if (statementEl) {
        gsap.fromTo(
          statementEl.querySelector('.statement-editorial-left'),
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statementEl,
              start: 'top 80%',
            },
          }
        );

        gsap.fromTo(
          statementEl.querySelector('.statement-editorial-right'),
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statementEl,
              start: 'top 80%',
            },
          }
        );
      }

      // 3. FEATURED WORK HORIZONTAL WHEEL & CARDS ANIMATION
      const workEl = workRef.current;
      const workTrack = workTrackRef.current;
      if (workTrack) {
        const onWorkWheel = (e) => {
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            workTrack.scrollLeft += e.deltaY;
          }
        };
        workTrack.addEventListener('wheel', onWorkWheel, { passive: true });
      }

      if (workEl) {
        const cards = workEl.querySelectorAll('.work-showcase-card');
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: workEl,
              start: 'top 80%',
            },
          }
        );
      }

      // 4. SERVICES HIGHLIGHT ON SCROLL
      const srvEl = servicesRef.current;
      if (srvEl) {
        const items = srvEl.querySelectorAll('.service-item');
        items.forEach((item) => {
          const idx = item.getAttribute('data-index');
          ScrollTrigger.create({
            trigger: item,
            start: 'top 65%',
            end: 'bottom 45%',
            onEnter: () => setActiveService(idx),
            onEnterBack: () => setActiveService(idx),
          });
        });
      }

      // 5. TIMELINE SPOTLIGHT & RAIL ENTRANCE
      const tlSection = timelineRef.current;
      if (tlSection) {
        const tlStage = tlSection.querySelector('.timeline-spotlight-stage');
        const tlRail = tlSection.querySelector('.timeline-rail-wrapper');
        if (tlRail && tlStage) {
          gsap.fromTo(
            [tlRail, tlStage],
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: tlSection,
                start: 'top 80%',
              },
            }
          );
        }
      }

      // 6. PEOPLE & METRIC COUNTERS ON SCROLL
      const peopleEl = peopleRef.current;
      if (peopleEl) {
        const counterTarget = { projects: 0, rating: 0 };
        ScrollTrigger.create({
          trigger: peopleEl,
          start: 'top 75%',
          onEnter: () => {
            gsap.to(counterTarget, {
              projects: 14500,
              rating: 100,
              duration: 2.2,
              ease: 'power2.out',
              onUpdate: () => {
                setProjectsCount(Math.floor(counterTarget.projects));
                setRatingCount(Math.floor(counterTarget.rating));
              },
            });

            gsap.fromTo(
              peopleEl.querySelectorAll('.people-metric-card, .board-member-card'),
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' }
            );
          },
        });
      }

      // 7. FOOTER GIANT WORDMARK REVEAL
      const footEl = footerRef.current;
      const bigWord = giantMavkaRef.current;
      if (footEl && bigWord) {
        gsap.fromTo(
          bigWord,
          { yPercent: 12, scale: 0.96 },
          {
            yPercent: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: footEl,
              start: 'top bottom',
              end: 'top top',
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(tickerCb);
    };
  }, []);

  const handleWorkPrev = () => {
    if (workTrackRef.current) {
      workTrackRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const handleWorkNext = () => {
    if (workTrackRef.current) {
      workTrackRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  const handleTimelinePrev = () => {
    setActiveTimelineIdx((prev) => (prev > 0 ? prev - 1 : TIMELINE_HITOS.length - 1));
  };

  const handleTimelineNext = () => {
    setActiveTimelineIdx((prev) => (prev < TIMELINE_HITOS.length - 1 ? prev + 1 : 0));
  };

  return (
    <div ref={containerRef} className="site-root-container">
      {/* Custom Interactive Magnetic Gold Arrow Cursor */}
      <div ref={cursorRef} id="custom-cursor" className="custom-cursor">
        <svg
          className="cursor-arrow"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#101633"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>

      {/* Floating Fixed Pill Navigation Bar */}
      <header className="navbar-wrapper">
        <nav className="pill-navbar" id="navbar">
          <a href="#hero" className="brand-logo">
            <img
              src="/assets/logo_arca.png"
              alt="Fundación El Arca de la Alianza Logo"
              className="brand-logo-img"
            />
            <div className="brand-text-col">
              <span className="logo-bold">FUNDACIÓN</span>
              <span className="logo-light">El Arca de la Alianza</span>
            </div>
          </a>
          <div className="nav-links">
            <a href="#about" className="nav-item">Identidad</a>
            <a href="#work" className="nav-item">Programas</a>
            <a href="#services" className="nav-item">Dimensiones</a>
            <a href="#timeline" className="nav-item">Trayectoria</a>
            <a href="#people" className="nav-item">Gobierno</a>
            <a href="#contact" className="nav-item">Contacto</a>
          </div>
          <button
            type="button"
            className="nav-contact-btn"
            onClick={() => {
              setModalLineInterest('Donación / Aporte General');
              setIsModalOpen(true);
            }}
          >
            Sumar Apoyo
            <svg
              className="phone-icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </button>
        </nav>
      </header>

      {/* Main Full-Width Content Viewport (Sticky 100vh Stacking Deck) */}
      <main className="site-main-viewport">

        {/* 1. HERO SECTION (Dark Navy with Kinetic Video Background & Binational Monumental Presence) */}
        <section ref={heroRef} className="section hero-section" id="hero">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video-bg"
          >
            <source src="/assets/hero_background.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" />

          <div className="hero-cinematic-stage">
            {/* Top Bar: Institutional Emblem & Live Status */}
            <div className="hero-cinematic-topbar">
              <div className="hero-emblem-badge">
                <img
                  src="/assets/logo_hands_symbol.png"
                  alt="Emblema Manos Fundación Arca de la Alianza"
                  className="hero-emblem-logo-img"
                />
                <div className="hero-emblem-info">
                  <span className="hero-emblem-title">FUNDACIÓN ARCA DE LA ALIANZA</span>
                  <span className="hero-emblem-sub">COLOMBIA (NIT 901.689.340-5) · EE.UU. (EIN 82-5293343)</span>
                </div>
              </div>

              <div className="hero-live-pill">
                <span className="live-pulse" />
                <span className="live-label">PRESENCIA BINACIONAL · COLOMBIA 🇨🇴 &amp; EE.UU. 🇺🇸</span>
              </div>
            </div>

            {/* Center Stage: Monumental Title with Rotating Kinetic Word */}
            <div className="hero-cinematic-center">
              <div className="hero-kicker-tag">
                <span className="kicker-line" />
                <span>DOS PAÍSES, UNA MISMA MISIÓN</span>
                <span className="kicker-line" />
              </div>

              <h1 className="hero-monumental-title">
                SERVIR Y<br className="hero-br-desktop" />
                SEMBRAR{' '}
                <span className="hero-rotator-inline">
                  <span key={wordIndex} className="hero-rotator-word-active">
                    {ROTATING_WORDS[wordIndex]}
                  </span>
                </span>
              </h1>

              <p className="hero-cinematic-narrative">
                {BINACIONAL_INFO.resumen}
              </p>

              {/* Spiritual Quote Pill */}
              <div className="hero-verse-pill">
                <span style={{ color: 'var(--color-yellow)' }}>✦</span>
                <span className="font-serif-quote">
                  {CITA_BIBLICA.versiculo} <strong>{CITA_BIBLICA.cita}</strong>
                </span>
              </div>

              {/* Cinematic CTAs: Magnetic Gold Pill + Secondary Frosted Glass */}
              <div className="hero-cinematic-ctas">
                <button
                  type="button"
                  className="hero-btn-magnetic-gold"
                  onClick={() => {
                    setModalLineInterest('Donación / Aporte General');
                    setIsModalOpen(true);
                  }}
                >
                  <span>Sumar Apoyo Directo</span>
                  <span className="btn-arrow-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </button>

                <a href="#about" className="hero-btn-cinematic-glass">
                  <span className="btn-play-bullet">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </span>
                  <span>Conocer Presencia Binacional</span>
                </a>
              </div>
            </div>

            {/* Bottom Bar: Clean Minimalist Metrics + Scroll Cue */}
            <div className="hero-cinematic-bottom">
              <div className="hero-clean-metrics">
                <div className="hero-clean-metric-item">
                  <div className="metric-number-bold">+14.500</div>
                  <div className="metric-caption">
                    <strong>Platos y Ayudas</strong>
                    <span>Atención integral comunitaria</span>
                  </div>
                </div>

                <div className="hero-metric-separator" />

                <div className="hero-clean-metric-item">
                  <div className="metric-number-bold">870+</div>
                  <div className="metric-caption">
                    <strong>Niños en Aulas</strong>
                    <span>Útiles y juguetes en resguardos</span>
                  </div>
                </div>

                <div className="hero-metric-separator" />

                <div className="hero-clean-metric-item">
                  <div className="metric-number-bold">2 Países</div>
                  <div className="metric-caption">
                    <strong>Puente Solidario</strong>
                    <span>Colombia 🇨🇴 · Estados Unidos 🇺🇸</span>
                  </div>
                </div>
              </div>

              <div className="hero-cinematic-scroll-cue">
                <a href="#about" className="scroll-cue-link">
                  <span className="scroll-cue-text">EXPLORAR</span>
                  <div className="scroll-cue-track">
                    <div className="scroll-cue-dot" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. STATEMENT / IDENTIDAD INSTITUCIONAL (White Card, 100vw x 100vh Sticky Slide) */}
        <section ref={statementRef} className="section statement-section" id="about">
          <div className="statement-editorial-container">
            {/* Left Column: Editorial Typography & Manifesto Narrative */}
            <div className="statement-editorial-left">
              <div className="statement-kicker-row">
                <span className="statement-kicker-dot" />
                <span className="statement-kicker-text">IDENTIDAD &amp; MANIFIESTO INSTITUCIONAL</span>
              </div>

              <h2 className="statement-headline-solid">
                CONSTRUYENDO ESPERANZA Y{' '}
                <span className="statement-serif-word">FUTURO DIGNO.</span>
              </h2>

              <blockquote className="statement-manifesto-quote">
                «Generamos capacidad instalada en las comunidades para que cada persona se empodere de su propio proyecto de vida».
              </blockquote>

              <p className="statement-narrative-text">
                En la <strong>Fundación Arca de la Alianza</strong> articulamos voluntades, fe y recursos para transformar realidades de extrema pobreza en oportunidades tangibles de desarrollo humano. Acompañamos a madres gestantes, niñez en resguardos indígenas y familias vulnerables con programas continuos que crean autonomía duradera.
              </p>

              {/* Institutional Credentials */}
              <div className="statement-credentials-row">
                <div className="credential-chip">
                  <span className="chip-flag">🇨🇴</span>
                  <div className="chip-col">
                    <span className="chip-label">COLOMBIA</span>
                    <span className="chip-val">NIT 901.689.340-5</span>
                  </div>
                </div>

                <div className="credential-chip">
                  <span className="chip-flag">🇺🇸</span>
                  <div className="chip-col">
                    <span className="chip-label">ESTADOS UNIDOS</span>
                    <span className="chip-val">EIN 82-5293343</span>
                  </div>
                </div>

                <div className="credential-chip credential-chip-gold">
                  <span className="chip-icon">✦</span>
                  <div className="chip-col">
                    <span className="chip-label">PERSONERÍA JURÍDICA</span>
                    <span className="chip-val">ESAL Social &amp; Comunitaria</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: High-End Photographic Showcase Card */}
            <div className="statement-editorial-right">
              <div className="statement-photo-card">
                <img
                  src="/assets/community_portrait.jpg"
                  alt="Comunidad y familias acompañadas por la Fundación Arca de la Alianza"
                  className="statement-photo-img"
                />
                <div className="statement-photo-scrim" />

                {/* Floating Top Pill */}
                <div className="statement-photo-tag">
                  <span className="photo-tag-pulse" />
                  <span>PRESENCIA ACTIVA EN TERRITORIO</span>
                </div>

                {/* Floating Bottom Card Details */}
                <div className="statement-photo-bottom">
                  <div className="photo-bottom-year">
                    <span className="year-num">2010</span>
                    <span className="year-label">Inicio de labor social ininterrumpida</span>
                  </div>
                  <p className="photo-bottom-quote">
                    {FILOSOFIA_INSTITUCIONAL}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURED WORK / PROGRAMAS DESTACADOS (White Card, 100vw x 100vh Sticky Slide) */}
        <section ref={workRef} className="section work-section" id="work">
          <div className="featured-work-container">
            {/* Editorial Header with Kicker, Monumental Serif Title & Interactive Navigation */}
            <div className="work-editorial-header">
              <div className="work-header-left">
                <div className="statement-kicker-row">
                  <span className="statement-kicker-dot" />
                  <span className="statement-kicker-text">ACCIÓN SOCIAL DIRECTA EN TERRITORIO</span>
                </div>
                <h3 className="work-headline-solid">
                  PROGRAMAS QUE{' '}
                  <span className="statement-serif-word">TRANSFORMAN VIDAS.</span>
                </h3>
                <p className="work-headline-sub">
                  Siete líneas permanentes de desarrollo humano, dignidad e inclusión comunitaria en Colombia y Estados Unidos.
                </p>
              </div>

              {/* Navigation Controls & Category Filter Chips */}
              <div className="work-header-right">
                <div className="work-controls-row">
                  <div className="work-nav-arrows">
                    <button
                      type="button"
                      onClick={handleWorkPrev}
                      className="work-arrow-btn"
                      aria-label="Programa anterior"
                      title="Ver programa anterior"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                      </svg>
                    </button>
                    <span className="work-counter-pill">
                      {PROGRAMAS_OFICIALES.length} PROGRAMAS EN TERRITORIO
                    </span>
                    <button
                      type="button"
                      onClick={handleWorkNext}
                      className="work-arrow-btn"
                      aria-label="Siguiente programa"
                      title="Ver siguiente programa"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="work-category-filters">
                  {WORK_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      className={`work-filter-chip ${activeWorkCategory === cat.id ? 'active' : ''}`}
                      onClick={() => {
                        setActiveWorkCategory(cat.id);
                        if (workTrackRef.current) {
                          workTrackRef.current.scrollLeft = 0;
                        }
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Showcase Carousel Track */}
            <div className="work-carousel-container">
              <div ref={workTrackRef} className="work-carousel-track">
                {(activeWorkCategory === 'todos'
                  ? PROGRAMAS_OFICIALES
                  : PROGRAMAS_OFICIALES.filter((p) => p.category === activeWorkCategory)
                ).map((prog, idx) => (
                  <article
                    key={prog.id}
                    className="work-showcase-card"
                    onClick={() => {
                      setModalLineInterest(prog.title);
                      setIsModalOpen(true);
                    }}
                  >
                    {/* Media Box (Top 48%) */}
                    <div className="card-media-box">
                      <img
                        src={prog.img}
                        alt={prog.title}
                        className="card-media-photo"
                        loading="lazy"
                      />
                      <div className="card-media-gradient" />

                      {/* Floating Top Pills */}
                      <div className="card-media-top-pills">
                        <span className="card-tag-pill">{prog.tag.split('·')[0].trim()}</span>
                        <span className="card-index-pill">0{idx + 1}</span>
                      </div>

                      {/* Floating Bottom Media Bar */}
                      <div className="card-media-meta-bar">
                        <span className="media-meta-chip">
                          <span className="meta-chip-sparkle">✦</span>
                          <span>{prog.chip.split('·')[0].trim()}</span>
                        </span>
                      </div>
                    </div>

                    {/* Content Body (Bottom 52%) */}
                    <div className="card-content-body">
                      <div className="card-title-group">
                        <h4 className="card-main-title">{prog.title}</h4>
                        <div className="card-accent-dash" />
                      </div>

                      <p className="card-summary-desc">{prog.desc}</p>

                      <div className="card-cta-footer">
                        <span className="card-cta-label">{prog.actionText || 'Sumar Apoyo Directo'}</span>
                        <span className="card-cta-arrow-circle">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. SERVICES SECTION: TRANSFORMACIÓN EN 4 DIMENSIONES (Black/Navy Card, 100vh Sticky Slide) */}
        <section ref={servicesRef} className="section black-card-section" id="services">
          <div className="services-header">
            <h2 className="services-headline">
              TRANSFORMAMOS VIDAS
              <br />
              EN CUATRO DIMENSIONES!
            </h2>
            <p className="services-sub">
              Nuestros equipos interdisciplinarios y voluntarios trabajan día a día para crear puentes de esperanza,
              salud y desarrollo integral donde más se necesita.
            </p>
          </div>

          {/* Interactive Services List with Thumbnails */}
          <div className="services-list" id="services-list">
            {/* 01/ SALUD Y MATERNIDAD */}
            <div
              className={`service-item ${activeService === '01' ? 'active-hover' : ''}`}
              data-index="01"
              onMouseEnter={() => setActiveService('01')}
              onClick={() => {
                setModalLineInterest('Mamita Déjalo Latir');
                setIsModalOpen(true);
              }}
            >
              <span className="service-num" style={{ color: '#E7CD54' }}>
                01/
              </span>
              <div className="service-name-wrap">
                <span className="service-name">SALUD Y MATERNIDAD (MAMITA DÉJALO LATIR)</span>
              </div>
              <div className="service-thumb-wrap">
                <img src="/assets/mamita_dejalo_latir.jpg" alt="Salud y Maternidad" className="service-thumb" />
              </div>
            </div>

            {/* 02/ EDUCACIÓN Y NIÑEZ */}
            <div
              className={`service-item ${activeService === '02' ? 'active-hover' : ''}`}
              data-index="02"
              onMouseEnter={() => setActiveService('02')}
              onClick={() => {
                setModalLineInterest('El Niño De Belén');
                setIsModalOpen(true);
              }}
            >
              <span className="service-num" style={{ color: '#E7CD54' }}>
                02/
              </span>
              <div className="service-thumb-wrap">
                <img src="/assets/education_program.jpg" alt="Educación y Niñez" className="service-thumb" />
              </div>
              <div className="service-name-wrap">
                <span className="service-name">EDUCACIÓN Y NIÑEZ (EL NIÑO DE BELÉN)</span>
              </div>
            </div>

            {/* 03/ SEGURIDAD ALIMENTARIA */}
            <div
              className={`service-item ${activeService === '03' ? 'active-hover' : ''}`}
              data-index="03"
              onMouseEnter={() => setActiveService('03')}
              onClick={() => {
                setModalLineInterest('Apoyo Alimentario y Comunitario');
                setIsModalOpen(true);
              }}
            >
              <span className="service-num" style={{ color: '#E7CD54' }}>
                03/
              </span>
              <div className="service-name-wrap">
                <span className="service-name">SEGURIDAD ALIMENTARIA &amp; CALLE</span>
              </div>
              <div className="service-thumb-wrap">
                <img src="/assets/nutrition_program.jpg" alt="Seguridad Alimentaria" className="service-thumb" />
              </div>
            </div>

            {/* 04/ EMPRENDIMIENTO Y CENTRO INTEGRAL */}
            <div
              className={`service-item ${activeService === '04' ? 'active-hover' : ''}`}
              data-index="04"
              onMouseEnter={() => setActiveService('04')}
              onClick={() => {
                setModalLineInterest('Construcción Centro Integral');
                setIsModalOpen(true);
              }}
            >
              <span className="service-num" style={{ color: '#E7CD54' }}>
                04/
              </span>
              <div className="service-thumb-wrap">
                <img src="/assets/centro_integral.jpg" alt="Centro Integral y Formación" className="service-thumb" />
              </div>
              <div className="service-name-wrap">
                <span className="service-name">CENTRO INTEGRAL &amp; EMPRENDIMIENTO</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. TIMELINE SECTION: NUESTRA TRAYECTORIA (Interactive Historical Chronicle & Split Stage) */}
        <section ref={timelineRef} className="section timeline-section" id="timeline">
          <div className="timeline-interactive-container">
            {/* Editorial Header */}
            <div className="timeline-editorial-header">
              <div className="timeline-header-left">
                <div className="statement-kicker-row">
                  <span className="statement-kicker-dot" />
                  <span className="statement-kicker-text">MEMORIA INSTITUCIONAL · 2010 A 2030+</span>
                </div>
                <h3 className="timeline-headline-solid">
                  CRÓNICA DE UNA{' '}
                  <span className="statement-serif-word">PROMESA EN ACCIÓN.</span>
                </h3>
                <p className="timeline-headline-sub">
                  Siete momentos clave que transformaron una semilla de fe y servicio en una fundación binacional consolidada.
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="timeline-header-right">
                <div className="timeline-controls-row">
                  <button
                    type="button"
                    onClick={handleTimelinePrev}
                    className="timeline-nav-arrow-btn"
                    aria-label="Hito anterior"
                    title="Ver hito anterior"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                  </button>
                  <span className="timeline-step-indicator">
                    HITO <strong>0{activeTimelineIdx + 1}</strong> / 0{TIMELINE_HITOS.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleTimelineNext}
                    className="timeline-nav-arrow-btn"
                    aria-label="Siguiente hito"
                    title="Ver siguiente hito"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Timeline Rail / Ribbon */}
            <div className="timeline-rail-wrapper">
              <div className="timeline-rail-track">
                <div
                  className="timeline-rail-progress"
                  style={{ width: `${(activeTimelineIdx / (TIMELINE_HITOS.length - 1)) * 100}%` }}
                />
                {TIMELINE_HITOS.map((hito, idx) => {
                  const isActive = activeTimelineIdx === idx;
                  const isPassed = activeTimelineIdx >= idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`timeline-station-btn ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                      onClick={() => setActiveTimelineIdx(idx)}
                      aria-label={`Ver hito ${hito.year}: ${hito.title}`}
                    >
                      <span className="station-node-dot">
                        <span className="station-inner-glow" />
                      </span>
                      <span className="station-year-label">{hito.shortYear || hito.year}</span>
                      <span className="station-sub-label">{hito.badge.split('·')[0].trim()}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Grand Split Spotlight Stage */}
            {(() => {
              const currentHito = TIMELINE_HITOS[activeTimelineIdx] || TIMELINE_HITOS[0];
              return (
                <div key={activeTimelineIdx} className="timeline-spotlight-stage">
                  {/* Left Column: Documentary Visual Frame (~42%) */}
                  <div className="spotlight-visual-card">
                    <div className="spotlight-img-wrapper">
                      <img
                        src={currentHito.img}
                        alt={currentHito.title}
                        className="spotlight-photo"
                      />
                      <div className="spotlight-photo-vignette" />

                      {/* Top Badges */}
                      <div className="spotlight-top-meta">
                        <span className="spotlight-chapter-pill">
                          CAPÍTULO 0{activeTimelineIdx + 1}
                        </span>
                        <span className="spotlight-badge-pill">
                          ✦ {currentHito.badge}
                        </span>
                      </div>

                      {/* Bottom Quote Box */}
                      <div className="spotlight-quote-overlay">
                        <p className="spotlight-quote-text">
                          {currentHito.quote || `«${currentHito.title}»`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Historical Chronicle Details (~58%) */}
                  <div className="spotlight-narrative-card">
                    <div className="narrative-meta-top">
                      <div className="narrative-year-display">
                        <span className="narrative-large-year">{currentHito.year}</span>
                        <span className="narrative-period-chip">{currentHito.category}</span>
                      </div>

                      <div className="narrative-territory-pill">
                        <span className="territory-icon">📍</span>
                        <span>{currentHito.location}</span>
                      </div>
                    </div>

                    <h4 className="narrative-chapter-title">
                      {currentHito.title}
                    </h4>

                    <div className="narrative-body-text">
                      <p>{currentHito.desc}</p>
                    </div>

                    {/* Metadata Specs Pills */}
                    <div className="narrative-specs-grid">
                      <div className="narrative-spec-item">
                        <span className="spec-label">Marco Legal:</span>
                        <span className="spec-value">{currentHito.legal}</span>
                      </div>
                      <div className="narrative-spec-item">
                        <span className="spec-label">Enfoque:</span>
                        <span className="spec-value">{currentHito.badge}</span>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="narrative-actions-row">
                      <div className="narrative-step-dots">
                        {TIMELINE_HITOS.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            type="button"
                            className={`timeline-dot-indicator ${activeTimelineIdx === dotIdx ? 'active' : ''}`}
                            onClick={() => setActiveTimelineIdx(dotIdx)}
                            aria-label={`Ir al hito ${dotIdx + 1}`}
                          />
                        ))}
                      </div>

                      <div className="narrative-button-group">
                        <button
                          type="button"
                          className="narrative-cta-btn"
                          onClick={() => {
                            setModalLineInterest(`Hito Histórico: ${currentHito.title} (${currentHito.year})`);
                            setIsModalOpen(true);
                          }}
                        >
                          <span>Sumar a la Historia</span>
                          <span className="btn-arrow">↗</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* 6. PEOPLE & STATS SECTION: GOBIERNO & IMPACTO (White Card, 100vw x 100vh Sticky Slide) */}
        <section ref={peopleRef} className="section people-stats-section" id="people">
          <div className="people-container">
            {/* Editorial Header */}
            <div className="people-editorial-header">
              <div className="people-header-left">
                <div className="statement-kicker-row">
                  <span className="statement-kicker-dot" />
                  <span className="statement-kicker-text">GOBIERNO INSTITUCIONAL &amp; TRANSPARENCIA</span>
                </div>
                <h3 className="people-headline-solid">
                  LIDERAZGO CON{' '}
                  <span className="statement-serif-word">PROPÓSITO ÉTICO.</span>
                </h3>
                <p className="people-headline-sub">
                  Gobernanza binacional, rendición de cuentas permanente y vocación de servicio para transformar realidades.
                </p>
              </div>

              <div className="people-header-right">
                <button
                  type="button"
                  onClick={() => openLegalDocument('institucional')}
                  className="people-compliance-btn"
                >
                  <span className="compliance-icon">⚖️</span>
                  <span>Marco Jurídico &amp; DIAN / IRS</span>
                </button>
              </div>
            </div>

            {/* Impact Metric Chips Bar (3 Metrics) */}
            <div className="people-metrics-row">
              <div className="people-metric-card">
                <div className="metric-tag-row">
                  <span className="metric-badge-dot" style={{ background: '#262F66' }} />
                  <span className="metric-badge-title">SEGURIDAD ALIMENTARIA</span>
                </div>
                <div className="metric-primary-value">+{projectsCount.toLocaleString()}</div>
                <div className="metric-primary-caption">Platos &amp; Raciones Servidas</div>
                <p className="metric-primary-desc">Jornadas directas: «Cena bajo las estrellas», donatones y auxilio nutricional.</p>
              </div>

              <div className="people-metric-card metric-card-gold">
                <div className="metric-tag-row">
                  <span className="metric-badge-dot" style={{ background: '#E6CE54' }} />
                  <span className="metric-badge-title">EDUCACIÓN &amp; NIÑEZ</span>
                </div>
                <div className="metric-primary-value" style={{ color: '#E6CE54' }}>870+</div>
                <div className="metric-primary-caption">Kits Escolares &amp; Juguetes</div>
                <p className="metric-primary-desc">Niñas y niños acompañados en resguardos indígenas para erradicar la deserción escolar.</p>
              </div>

              <div className="people-metric-card">
                <div className="metric-tag-row">
                  <span className="metric-badge-dot" style={{ background: '#10B981' }} />
                  <span className="metric-badge-title">CUMPLIMIENTO FISCAL &amp; RTE</span>
                </div>
                <div className="metric-primary-value" style={{ color: '#10B981' }}>{ratingCount}%</div>
                <div className="metric-primary-caption">Habilitación Tributaria</div>
                <p className="metric-primary-desc">Certificación para emitir certificados de donación con deducción fiscal en Colombia y EE.UU.</p>
              </div>
            </div>

            {/* Leadership & Board Grid (4 Members) */}
            <div className="people-board-grid">
              {GOBIERNO_INSTITUCIONAL.juntaDirectiva.map((member, idx) => (
                <div key={idx} className="board-member-card">
                  <div className="member-top-row">
                    <div className="member-avatar-circle">
                      <span>{member.initial}</span>
                    </div>
                    <div className="member-id-pill">
                      <span>JUNTA DIRECTIVA</span>
                    </div>
                  </div>

                  <div className="member-info-col">
                    <h4 className="member-name">{member.name}</h4>
                    <span className="member-role">{member.role}</span>
                    <p className="member-bio">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FOOTER SECTION: CONTACTO & POLÍTICAS (Deep Midnight Navy, 100vh Sticky Slide) */}
        <footer ref={footerRef} className="section footer-section" id="contact" style={{ backgroundColor: '#070A18' }}>
          <div className="footer-huge-wordmark">
            <h1 ref={giantMavkaRef} className="giant-mavka" style={{ color: '#ffffff' }}>
              ARCA DE LA ALIANZA
            </h1>
          </div>

          <div className="footer-cards-grid">
            {/* Colombia Office Card */}
            <div className="footer-card" style={{ backgroundColor: '#0F1535', borderColor: 'rgba(231, 205, 84, 0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '18px' }}>🇨🇴</span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#E7CD54', textTransform: 'uppercase' }}>
                  SEDE COLOMBIA
                </span>
              </div>
              <h3 className="footer-card-title" style={{ fontSize: '16px' }}>
                {BINACIONAL_INFO.colombia.razonSocial}
              </h3>
              <p style={{ fontSize: '12px', color: '#A1A8C5', lineHeight: '1.5', marginBottom: '10px' }}>
                NIT: {BINACIONAL_INFO.colombia.nit}<br />
                {BINACIONAL_INFO.colombia.direccion}
              </p>
              <a href={`mailto:${BINACIONAL_INFO.colombia.correo}`} className="contact-link email-link" style={{ color: '#E7CD54' }}>
                {BINACIONAL_INFO.colombia.correo}
              </a>
              <a href={`tel:${BINACIONAL_INFO.colombia.telefono.replace(/\s+/g, '')}`} className="contact-link phone-link">
                {BINACIONAL_INFO.colombia.telefono}
              </a>
            </div>

            {/* USA Office Card */}
            <div className="footer-card" style={{ backgroundColor: '#0F1535', borderColor: 'rgba(231, 205, 84, 0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '18px' }}>🇺🇸</span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#E7CD54', textTransform: 'uppercase' }}>
                  SEDE ESTADOS UNIDOS
                </span>
              </div>
              <h3 className="footer-card-title" style={{ fontSize: '16px' }}>
                {BINACIONAL_INFO.usa.razonSocial}
              </h3>
              <p style={{ fontSize: '12px', color: '#A1A8C5', lineHeight: '1.5', marginBottom: '10px' }}>
                EIN: {BINACIONAL_INFO.usa.ein}<br />
                Registro: {BINACIONAL_INFO.usa.registro} (Florida Active)
              </p>
              <a href={`mailto:${BINACIONAL_INFO.usa.correo}`} className="contact-link email-link" style={{ color: '#E7CD54' }}>
                {BINACIONAL_INFO.usa.correo}
              </a>
              <a href={`tel:${BINACIONAL_INFO.usa.telefono.replace(/\s+/g, '')}`} className="contact-link phone-link">
                {BINACIONAL_INFO.usa.telefono}
              </a>
            </div>

            {/* Transparency & Legal Policies */}
            <div className="footer-card" style={{ backgroundColor: '#0F1535', borderColor: 'rgba(231, 205, 84, 0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '18px' }}>📜</span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#E7CD54', textTransform: 'uppercase' }}>
                  TRANSPARENCIA INSTITUCIONAL
                </span>
              </div>
              <h3 className="footer-card-title" style={{ fontSize: '16px' }}>
                DOCUMENTOS &amp; POLÍTICAS
              </h3>
              <p style={{ fontSize: '12px', color: '#A1A8C5', marginBottom: '12px' }}>
                Consulta nuestras 6 políticas aprobadas de datos, ética y transparencia:
              </p>
              <button
                type="button"
                onClick={() => openLegalDocument('privacidad')}
                style={{ background: '#E7CD54', color: '#101633', border: 'none', borderRadius: '9999px', padding: '8px 16px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
              >
                Ver Políticas Legales →
              </button>
            </div>
          </div>

          {/* Bottom Footer Details */}
          <div className="footer-meta-row">
            <div className="footer-address">
              <p><strong>Fundación Arca de la Alianza (Colombia) &amp; Arca de la Alianza Inc. (EE.UU.)</strong></p>
              <p>NIT: 901.689.340-5 · EIN: 82-5293343 · ESAL Social y Comunitaria</p>
              <p className="vat-no" style={{ color: '#E7CD54' }}>elarcadelaalianza.org</p>
            </div>

            <div className="social-icons-row">
              <a
                href="https://instagram.com/Alianzafl"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="Instagram @Alianzafl"
                title="@Alianzafl"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://wa.me/573181101131"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="WhatsApp"
                title="+57 318 110 1131"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom Banner Bar */}
          <div className="footer-banner-bar" style={{ backgroundColor: '#101633', borderColor: 'rgba(231, 205, 84, 0.25)' }}>
            <div className="banner-asterisk" style={{ color: '#E7CD54' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="2" x2="12" y2="22"></line>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                <line x1="19.07" y1="4.93" x2="4.93" y2="19.07"></line>
              </svg>
            </div>
            <div className="banner-text">
              {FILOSOFIA_INSTITUCIONAL}
            </div>
            <button
              type="button"
              className="banner-meet-btn"
              style={{ backgroundColor: '#E7CD54', color: '#101633', fontWeight: '800' }}
              onClick={() => setIsModalOpen(true)}
            >
              Sumar Apoyo
            </button>
          </div>
        </footer>
      </main>

      {/* ==========================================================================
          INTERACTIVE LEGAL DOCUMENTS MODAL
          ========================================================================== */}
      {legalModalOpen && (
        <div
          id="legal-doc-modal"
          className="legal-modal-backdrop"
          onClick={(e) => {
            if (e.target.id === 'legal-doc-modal') setLegalModalOpen(false);
          }}
        >
          <div className="legal-modal-card">
            <div className="legal-modal-header">
              <div>
                <span className="capsule-tag" style={{ backgroundColor: '#E7CD54', color: '#101633', fontSize: '11px', fontWeight: '800', padding: '3px 10px', borderRadius: '6px' }}>
                  TRANSPARENCIA &amp; DOCUMENTOS LEGALES
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', marginTop: '6px' }}>
                  Fundación Arca de la Alianza
                </h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setLegalModalOpen(false)}
                aria-label="Cerrar ventana legal"
                style={{ position: 'static' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Nav Tabs for 6 Legal Docs */}
            <div className="legal-modal-nav">
              <button
                type="button"
                className={`legal-tab-button ${activeLegalDocKey === 'privacidad' ? 'active' : ''}`}
                onClick={() => setActiveLegalDocKey('privacidad')}
              >
                1. Tratamiento de Datos
              </button>
              <button
                type="button"
                className={`legal-tab-button ${activeLegalDocKey === 'terminos' ? 'active' : ''}`}
                onClick={() => setActiveLegalDocKey('terminos')}
              >
                2. Términos &amp; Condiciones
              </button>
              <button
                type="button"
                className={`legal-tab-button ${activeLegalDocKey === 'aviso' ? 'active' : ''}`}
                onClick={() => setActiveLegalDocKey('aviso')}
              >
                3. Aviso de Privacidad
              </button>
              <button
                type="button"
                className={`legal-tab-button ${activeLegalDocKey === 'donaciones' ? 'active' : ''}`}
                onClick={() => setActiveLegalDocKey('donaciones')}
              >
                4. Política de Donaciones
              </button>
              <button
                type="button"
                className={`legal-tab-button ${activeLegalDocKey === 'institucional' ? 'active' : ''}`}
                onClick={() => setActiveLegalDocKey('institucional')}
              >
                5. Info Binacional
              </button>
              <button
                type="button"
                className={`legal-tab-button ${activeLegalDocKey === 'etica' ? 'active' : ''}`}
                onClick={() => setActiveLegalDocKey('etica')}
              >
                6. Ética &amp; Buen Gobierno
              </button>
            </div>

            {/* Modal Body with Active Document */}
            {LEGAL_DOCUMENTS[activeLegalDocKey] && (
              <div className="legal-modal-body">
                <h2 className="legal-doc-title">
                  {LEGAL_DOCUMENTS[activeLegalDocKey].title}
                </h2>
                <div className="legal-doc-subtitle">
                  {LEGAL_DOCUMENTS[activeLegalDocKey].subtitle}
                </div>

                <div>
                  {LEGAL_DOCUMENTS[activeLegalDocKey].articles.map((art) => (
                    <div key={art.num} className="legal-article-block">
                      <h4 className="legal-article-title">
                        Artículo {art.num}: {art.title}
                      </h4>
                      <p className="legal-article-text">
                        {art.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#8F98BA' }}>
                    Documento institucional sujeto a revisión jurídica · Vigente en Colombia y Estados Unidos
                  </span>
                  <button
                    type="button"
                    onClick={() => setLegalModalOpen(false)}
                    style={{ background: '#E7CD54', color: '#101633', border: 'none', borderRadius: '9999px', padding: '8px 20px', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}
                  >
                    Entendido / Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==========================================================================
          INTERACTIVE DONATION & CONTACT MODAL (REGIONS BANK USA)
          ========================================================================== */}
      {isModalOpen && (
        <div
          id="contact-modal"
          className="modal-backdrop open"
          onClick={(e) => {
            if (e.target.id === 'contact-modal') setIsModalOpen(false);
          }}
        >
          <div className="modal-card">
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsModalOpen(false)}
              aria-label="Cerrar modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <span style={{ fontSize: '11px', fontWeight: '800', color: '#E7CD54', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              FUNDACIÓN ARCA DE LA ALIANZA · COLOMBIA &amp; EE.UU.
            </span>
            <h3 className="modal-title" style={{ color: '#ffffff' }}>
              Sumar Apoyo / Donar
            </h3>
            <p className="modal-sub">
              Tu solidaridad transforma vidas. Puedes realizar un aporte bancario oficial en Estados Unidos, sumarte como voluntario o apoyar programas en Colombia.
            </p>

            {/* Quick Bank Details USA */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(231, 205, 84, 0.3)', borderRadius: '16px', padding: '14px 18px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#E7CD54', textTransform: 'uppercase' }}>
                  CUENTA BANCARIA OFICIAL (REGIONS BANK - EE.UU.)
                </span>
                <button
                  type="button"
                  onClick={handleCopyBankAccount}
                  style={{ background: '#E7CD54', color: '#101633', border: 'none', borderRadius: '6px', padding: '3px 10px', fontSize: '10.5px', fontWeight: '800', cursor: 'pointer' }}
                >
                  {copiedBank ? '¡Copiado!' : 'Copiar Cuenta'}
                </button>
              </div>
              <div style={{ fontSize: '12.5px', color: '#ffffff' }}>
                <strong>Cuenta Corriente:</strong> <span style={{ fontFamily: 'monospace', color: '#E7CD54' }}>0263760061</span> · <strong>Routing:</strong> 063104668<br />
                <strong>Titular:</strong> Fundación Arca de la Alianza / ARCA DE LA ALIANZA INC.
              </div>
            </div>

            <form
              className="modal-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert('¡Gracias por tu mensaje! El equipo de Fundación Arca de la Alianza se comunicará contigo pronto.');
                setIsModalOpen(false);
              }}
            >
              <div className="form-row">
                <input type="text" required placeholder="Tu Nombre o Empresa" className="form-input" />
                <input type="text" required placeholder="Correo o Teléfono" className="form-input" />
              </div>

              <select
                className="form-input select-input"
                value={modalLineInterest}
                onChange={(e) => setModalLineInterest(e.target.value)}
              >
                <option value="Donación / Aporte General">Donación Económica General</option>
                <option value="Donación Colombia">Donación en Colombia (NIT 901.689.340-5)</option>
                <option value="Donación USA">Donación en Estados Unidos (Regions Bank)</option>
                <option value="Mamita Déjalo Latir">Programa: Mamita Déjalo Latir</option>
                <option value="El Niño De Belén">Programa: El Niño De Belén</option>
                <option value="Dando Amor a Amigos de la Calle">Programa: Amigos de la Calle (Nutrición & Cena)</option>
                <option value="Banco de Ropa & Casi New">Campaña: Banco de Ropa & Casi New</option>
                <option value="Misioneros & Parroquias">Iniciativa: Misioneros & Parroquias</option>
                <option value="Turismo Misionero con Propósito">Programa: Turismo Misionero con Propósito</option>
                <option value="Escuela de Formación y Oficios">Programa: Escuela de Formación y Oficios</option>
                <option value="Construcción Centro Integral">Proyecto: Construcción Centro Integral</option>
                <option value="Voluntariado en Territorio">Voluntariado (Nacional / Internacional)</option>
                <option value="Certificados y Transparencia">Certificado de Donación / Beneficio Tributario</option>
              </select>

              <textarea rows={3} placeholder="¿Cómo te gustaría colaborar o en qué podemos apoyarte?" className="form-input textarea-input"></textarea>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', margin: '4px 0' }}>
                <input type="checkbox" id="privacy-consent" required style={{ marginTop: '3px' }} />
                <label htmlFor="privacy-consent" style={{ fontSize: '11.5px', color: '#A1A8C5' }}>
                  Autorizo el tratamiento de mis datos personales de acuerdo con la{' '}
                  <button
                    type="button"
                    onClick={() => openLegalDocument('privacidad')}
                    style={{ background: 'none', border: 'none', color: '#E7CD54', padding: 0, textDecoration: 'underline', cursor: 'pointer', fontSize: '11.5px' }}
                  >
                    Política de Tratamiento de Datos
                  </button>.
                </label>
              </div>

              <button
                type="submit"
                className="modal-submit-btn"
              >
                Enviar Mensaje Solidario →
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
