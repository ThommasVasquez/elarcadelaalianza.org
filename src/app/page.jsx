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

      // 3. FEATURED WORK CARDS ON SCROLL
      const workEl = workRef.current;
      if (workEl) {
        const cards = workEl.querySelectorAll('.work-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0, scale: 0.96 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          const img = card.querySelector('.card-img');
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -8 },
              {
                yPercent: 8,
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

      // 5. TIMELINE HORIZONTAL INTERACTION
      const tlSection = timelineRef.current;
      const tlTrack = timelineTrackRef.current;
      if (tlSection && tlTrack) {
        const onWheel = (e) => {
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            tlTrack.scrollLeft += e.deltaY;
          }
        };
        tlTrack.addEventListener('wheel', onWheel, { passive: true });
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
              peopleEl.querySelectorAll('.portrait-avatar'),
              { scale: 0, rotate: -15 },
              { scale: 1, rotate: 0, duration: 0.6, stagger: 0.12, ease: 'back.out(2)' }
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

  const handleTimelinePrev = () => {
    if (timelineTrackRef.current) {
      timelineTrackRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const handleTimelineNext = () => {
    if (timelineTrackRef.current) {
      timelineTrackRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
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
            <div className="featured-work-header">
              <div className="statement-badge" style={{ marginBottom: '8px' }}>
                <span className="statement-badge-dot" />
                <span>LÍNEAS DE ACCIÓN SOCIAL DIRECTA</span>
              </div>
              <h3 className="section-title" style={{ color: '#262F66', margin: 0 }}>
                PROGRAMAS QUE TRANSFORMAN
              </h3>
            </div>

            <div className="work-grid">
              {/* Card 1: Mamita Déjalo Latir */}
              <div
                className="work-card"
                data-work="maternidad"
                onClick={() => {
                  setModalLineInterest('Mamita Déjalo Latir');
                  setIsModalOpen(true);
                }}
              >
                <div className="card-media-wrapper">
                  <img src="/assets/mamita_dejalo_latir.jpg" alt="Programa Mamita Déjalo Latir" className="card-img" />
                </div>
                <div className="card-scrim-gradient" />
                <span className="card-top-pill">Maternidad &amp; Vida</span>
                <div className="card-content-bottom">
                  <h4 className="card-program-title">Mamita Déjalo Latir</h4>
                  <p className="card-program-desc">
                    Acompañamiento integral, emocional, psicosocial y formativo a madres gestantes en situación de vulnerabilidad.
                  </p>
                  <div className="card-action-row">
                    <span className="card-action-text">Sumar Apoyo Directo</span>
                    <span className="card-arrow-circle">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: El Niño de Belén */}
              <div
                className="work-card"
                data-work="infancia"
                onClick={() => {
                  setModalLineInterest('El Niño De Belén');
                  setIsModalOpen(true);
                }}
              >
                <div className="card-media-wrapper">
                  <img
                    src="/assets/education_program.jpg"
                    alt="Programa El Niño de Belén"
                    className="card-img"
                  />
                </div>
                <div className="card-scrim-gradient" />
                <span className="card-top-pill">Niñez &amp; Educación</span>
                <div className="card-content-bottom">
                  <h4 className="card-program-title">El Niño De Belén</h4>
                  <p className="card-program-desc">
                    Entrega de útiles escolares y juguetes nuevos en comunidades vulnerables y resguardos indígenas.
                  </p>
                  <div className="card-action-row">
                    <span className="card-action-text">Apadrinar un Niño</span>
                    <span className="card-arrow-circle">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 3: Banco de Ropa & Casi New */}
              <div
                className="work-card"
                data-work="economia-circular"
                onClick={() => {
                  setModalLineInterest('Banco de Ropa');
                  setIsModalOpen(true);
                }}
              >
                <div className="card-media-wrapper">
                  <img
                    src="/assets/banco_de_ropa.jpg"
                    alt="Banco de Ropa & Casi New"
                    className="card-img"
                  />
                </div>
                <div className="card-scrim-gradient" />
                <span className="card-top-pill">Economía Circular</span>
                <div className="card-content-bottom">
                  <h4 className="card-program-title">Banco de Ropa &amp; Casi New</h4>
                  <p className="card-program-desc">
                    Campañas de recaudo y entrega solidaria de prendas, cobijas e insumos para comunidades necesitadas.
                  </p>
                  <div className="card-action-row">
                    <span className="card-action-text">Donar Insumos / Ropa</span>
                    <span className="card-arrow-circle">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </span>
                  </div>
                </div>
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

        {/* 5. TIMELINE SECTION: NUESTRA TRAYECTORIA (White Card, 100vh Sticky Slide) */}
        <section ref={timelineRef} className="section timeline-section" id="timeline">
          <div className="timeline-header">
            <h2 className="timeline-headline" style={{ color: '#262F66' }}>
              NUESTRA TRAYECTORIA
            </h2>
            <div className="carousel-nav-arrows">
              <button
                type="button"
                className="arrow-btn"
                onClick={handleTimelinePrev}
                aria-label="Anterior hito"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              <button
                type="button"
                className="arrow-btn"
                onClick={handleTimelineNext}
                aria-label="Siguiente hito"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Timeline Slider Track */}
          <div ref={timelineTrackRef} className="timeline-track-container" id="timeline-scroll">
            <div className="timeline-card-col">
              <div className="timeline-img-card">
                <img src="/assets/timeline_gift.png" alt="Génesis y Casi New" className="timeline-gift-img" />
              </div>
              <div className="timeline-info">
                <h3 className="timeline-step-title" style={{ color: '#262F66' }}>
                  GÉNESIS: CASI NEW
                  <br />
                  (2010 - EE.UU.)
                </h3>
                <p className="timeline-step-p" style={{ color: '#3A3A3A' }}>
                  Sandra Milena siente el llamado en EE.UU. al ver que lo que otros desechaban podía generar empleo digno y esperanza para madres en Colombia.
                </p>
              </div>
            </div>

            {/* Giant Cheering Hands Card */}
            <div className="timeline-cheers-col">
              <img
                src="/assets/timeline_cheers.png"
                alt="Celebración del impacto y la solidaridad de El Arca"
                className="timeline-cheers-img"
              />
            </div>

            {/* Planning and Concept Card */}
            <div className="timeline-concept-col">
              <div className="concept-black-card" style={{ backgroundColor: '#101633' }}>
                <h3 className="concept-card-title" style={{ color: '#E7CD54' }}>
                  CONSTITUCIÓN
                  <br />
                  BINACIONAL
                  <br />
                  OFICIAL
                </h3>
                <p className="concept-card-p">
                  Constituida en EE.UU. en 2018 (EIN 82-5293343) y formalizada en Colombia en 2021 (NIT 901.689.340-5). Organización formalmente habilitada ante la DIAN.
                </p>
                <button
                  type="button"
                  className="meet-team-btn"
                  style={{ backgroundColor: '#E7CD54', color: '#101633' }}
                  onClick={() => setIsModalOpen(true)}
                >
                  Sumar Apoyo
                  <svg
                    className="phone-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Step 3: Presente y Futuro */}
            <div className="timeline-card-col">
              <div className="timeline-info" style={{ marginTop: '40px' }}>
                <h3 className="timeline-step-title" style={{ color: '#262F66' }}>
                  EXPANSIÓN &amp;
                  <br />
                  CENTRO INTEGRAL
                </h3>
                <p className="timeline-step-p" style={{ color: '#3A3A3A' }}>
                  Más de 14.500 ayudas entregadas y el proyecto maestro para construir una sede modelo que albergue formación, salud y emprendimiento social.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. PEOPLE & STATS SECTION: GOBIERNO & IMPACTO (White Card, 100vh Sticky Slide) */}
        <section ref={peopleRef} className="section people-stats-section" id="people">
          {/* Headline with Floating Portrait Badges */}
          <div className="moments-statement">
            <h2 className="moments-headline">
              <span className="moments-row">CREANDO</span>
              <span className="moments-row">HUELLAS QUE DEJAN</span>
              <span className="moments-row inline-portraits-row">
                <span className="moments-word">AM</span>
                <span className="portrait-avatar portrait-1" title="Dirección de Proyectos Sociales">
                  <img src="/assets/portrait_1.png" alt="Directora de Proyectos Sociales" />
                </span>
                <span className="moments-word">OR EN LA M</span>
                <span className="portrait-avatar portrait-2" title="Coordinación de Voluntariado">
                  <img src="/assets/portrait_2.png" alt="Coordinadora de Voluntariado" />
                </span>
                <span className="moments-word">EM</span>
                <span className="portrait-avatar portrait-3" title="Dirección Comunitaria">
                  <img src="/assets/portrait_3.png" alt="Directora Comunitaria" />
                </span>
                <span className="moments-word">ORIA</span>
              </span>
            </h2>
          </div>

          {/* 3 Colored Metric Cards in Navy, Gold and Warm Accent */}
          <div className="metric-cards-container">
            {/* Card 1: Transparencia Fiscal RTE */}
            <div className="stat-card-wrapper card-blog">
              <div className="card-black-roof">
                <span className="capsule-tag" style={{ backgroundColor: '#262F66', color: '#fff' }}>
                  RÉGIMEN DIAN · RTE
                </span>
              </div>
              <div className="card-colored-body purple-body" style={{ background: 'linear-gradient(135deg, #101633, #222c60)' }}>
                <span className="counter-label-light">CERTIFICACIÓN TRIBUTARIA</span>
                <div className="counter-large-stat">{ratingCount}%</div>
                <p className="card-desc">Habilitados para emitir certificados de donación con deducción aplicable en renta.</p>
                <div className="card-bottom-action">
                  <span className="action-label">DOCUMENTACIÓN<br />LEGAL AL DÍA</span>
                  <button
                    type="button"
                    onClick={() => openLegalDocument('institucional')}
                    className="circle-action-btn"
                    style={{ backgroundColor: '#E7CD54', color: '#101633' }}
                    aria-label="Ver documentación legal"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Impacto Acumulado */}
            <div className="stat-card-wrapper card-success">
              <div className="card-black-roof">
                <span className="capsule-tag dark-tag" style={{ color: '#101633' }}>
                  SEGURIDAD ALIMENTARIA
                </span>
              </div>
              <div className="card-colored-body yellow-body" style={{ backgroundColor: '#E7CD54' }}>
                <span className="counter-label-dark">PLATOS Y AYUDAS ENTREGADAS</span>
                <div className="counter-large-stat text-dark">
                  +{projectsCount.toLocaleString()}
                </div>
                <p className="card-desc-dark">Jornadas comunitarias directas: Cena bajo las estrellas, donatones y auxilio nutricional.</p>
                <div className="card-bottom-action">
                  <span className="action-label text-dark">TRAZABILIDAD<br />EN CAMPO</span>
                  <button
                    type="button"
                    onClick={() => {
                      setModalLineInterest('Apoyo Alimentario y Comunitario');
                      setIsModalOpen(true);
                    }}
                    className="circle-action-btn dark-circle-btn"
                    style={{ backgroundColor: '#101633', color: '#E7CD54' }}
                    aria-label="Ver impacto"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Niñez y Educación */}
            <div className="stat-card-wrapper card-confidence">
              <div className="card-black-roof">
                <span className="capsule-tag" style={{ backgroundColor: '#262F66', color: '#fff' }}>
                  EL NIÑO DE BELÉN
                </span>
              </div>
              <div className="card-colored-body peach-body" style={{ background: 'linear-gradient(135deg, #101633, #222c60)' }}>
                <span className="counter-label-light">INFANCIA EN AULAS &amp; NAVIDAD</span>
                <div className="counter-large-stat text-gold" style={{ color: '#E7CD54' }}>
                  870+
                </div>
                <p className="card-desc">Niñas y niños beneficiados con útiles para evitar deserción y juguetes nuevos en resguardos indígenas.</p>
                <div className="card-bottom-action">
                  <span className="action-label">REDUCCIÓN DE<br />DESERCIÓN ESCOLAR</span>
                  <button
                    type="button"
                    onClick={() => {
                      setModalLineInterest('Programa El Niño de Belén');
                      setIsModalOpen(true);
                    }}
                    className="circle-action-btn"
                    style={{ backgroundColor: '#E7CD54', color: '#101633' }}
                    aria-label="Apadrinar un niño"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
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
                <option value="Banco de Ropa">Campaña: Banco de Ropa</option>
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
