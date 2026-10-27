'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import {
  ROTATING_WORDS,
  FILOSOFIA_INSTITUCIONAL,
  ESENCIA_ESPIRITUAL,
  CITA_BIBLICA,
  BINACIONAL_INFO,
  LOGO_SIGNIFICADO,
  VALORES_INSTITUCIONALES,
  PRINCIPIOS_INSTITUCIONALES,
  OBJETIVO_GENERAL,
  OBJETIVOS_ESPECIFICOS,
  HISTORIA_HITOS,
  PROGRAMAS_OFICIALES,
  CENTRO_INTEGRAL_MODULOS,
  DIMENSIONES_IMPACTO,
  RESULTADOS_LABOR,
  FUENTES_FINANCIACION,
  DESTINO_RECURSOS,
  ALIANZAS_ESTRATEGICAS,
  SOSTENIBILIDAD_ESTRATEGIAS,
  GOBIERNO_INSTITUCIONAL,
  LEGAL_DOCUMENTS,
} from './foundationData';

export default function ArcaDeLaAlianzaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLineInterest, setModalLineInterest] = useState('Donación / Aporte General');
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [activeLegalDocKey, setActiveLegalDocKey] = useState('privacidad');
  const [copiedBank, setCopiedBank] = useState(false);
  const [activeService, setActiveService] = useState('01');
  const [aboutTab, setAboutTab] = useState('mision');
  const [projectsCount, setProjectsCount] = useState(0);
  const [ratingCount, setRatingCount] = useState('0.0');
  const [wordIndex, setWordIndex] = useState(0);

  const openLegalDocument = (key) => {
    setActiveLegalDocKey(key);
    setLegalModalOpen(true);
  };

  const handleCopyBankAccount = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('0263760061');
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2500);
    }
  };


  // Auto-rotate keyword for Cinematic Hero every 2.6s
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  // Refs for GSAP
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroArtworkRef = useRef(null);
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const statementRef = useRef(null);
  const workRef = useRef(null);
  const servicesRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineTrackRef = useRef(null);
  const peopleRef = useRef(null);
  const footerRef = useRef(null);
  const giantMavkaRef = useRef(null);

  // Initialize Lenis Smooth Scroll & GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    window.__lenis = lenis;

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // 1. Custom Magnetic Cursor
    const cursor = cursorRef.current;
    if (cursor && !window.matchMedia('(pointer: coarse)').matches) {
      const xTo = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3' });
      const yTo = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3' });

      const onMouseMove = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener('mousemove', onMouseMove);
    }

    // 2. Ambient Canvas Sparkles in Hero
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
      let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

      const handleResize = () => {
        if (!canvas.parentElement) return;
        w = canvas.width = canvas.parentElement.clientWidth;
        h = canvas.height = canvas.parentElement.clientHeight;
      };
      window.addEventListener('resize', handleResize);

      const sparks = Array.from({ length: 35 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 2 + 1,
        color: ['#E7CD54', '#FFFFFF', '#3E51B5', '#F0D558'][Math.floor(Math.random() * 4)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        pulse: Math.random() * 0.03 + 0.01,
      }));

      let animId;
      const drawSparks = () => {
        ctx.clearRect(0, 0, w, h);
        sparks.forEach((s) => {
          s.x += s.vx;
          s.y += s.vy;
          if (s.x < 0) s.x = w;
          if (s.x > w) s.x = 0;
          if (s.y < 0) s.y = h;
          if (s.y > h) s.y = 0;
          s.alpha += Math.sin(Date.now() * s.pulse) * 0.01;
          const a = Math.max(0.1, Math.min(0.9, s.alpha));

          ctx.save();
          ctx.fillStyle = s.color;
          ctx.globalAlpha = a;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
        animId = requestAnimationFrame(drawSparks);
      };
      drawSparks();
    }

    // ==========================================
    // GSAP ScrollTrigger Animations
    // ==========================================

    const ctx = gsap.context(() => {
      // A. HERO KINETIC SCROLL SCRUB & ENTRANCE (Opción B: Cinematic Full-Bleed)
      const heroEl = heroRef.current;
      if (heroEl) {
        const topbar = heroEl.querySelector('.hero-cinematic-topbar');
        const center = heroEl.querySelector('.hero-cinematic-center');
        const bottom = heroEl.querySelector('.hero-cinematic-bottom');
        const videoBg = heroEl.querySelector('.hero-video-bg');

        // Initial entrance
        gsap.fromTo(
          [topbar, center, bottom].filter(Boolean),
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
        );

        // Scroll scrub: Video zoom and stage parallax as card scrolls up
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroEl,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        if (videoBg) heroTl.to(videoBg, { scale: 1.18, y: 50, ease: 'none' }, 0);
        if (center) heroTl.to(center, { y: -30, opacity: 0.5, ease: 'none' }, 0);
      }

      // B. STATEMENT TYPOGRAPHY ON SCROLL
      const statementEl = statementRef.current;
      if (statementEl) {
        const blocks = statementEl.querySelectorAll('.sliced-block');
        blocks.forEach((b, i) => {
          const top = b.querySelector('.slice-top');
          const bot = b.querySelector('.slice-bottom');
          gsap.fromTo(
            b,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: b,
                start: 'top 85%',
              },
            }
          );

          if (top && bot) {
            gsap.to(top, {
              x: i % 2 === 0 ? -30 : 30,
              scrollTrigger: {
                trigger: b,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            });
            gsap.to(bot, {
              x: i % 2 === 0 ? 30 : -30,
              scrollTrigger: {
                trigger: b,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            });
          }
        });
      }

      // C. FEATURED WORK CARDS ON SCROLL
      const workEl = workRef.current;
      if (workEl) {
        const cards = workEl.querySelectorAll('.work-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 70, opacity: 0, scale: 0.95 },
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

          // Card inner image parallax
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

      // D. SERVICES HIGHLIGHT ON SCROLL
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

      // E. TIMELINE HORIZONTAL INTERACTION & CARDS ENTRANCE
      const tlSection = timelineRef.current;
      const tlTrack = timelineTrackRef.current;
      if (tlSection && tlTrack) {
        const onWheel = (e) => {
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            tlTrack.scrollLeft += e.deltaY;
          }
        };
        tlTrack.addEventListener('wheel', onWheel, { passive: true });

        const tlCards = tlSection.querySelectorAll('.timeline-card');
        if (tlCards.length) {
          gsap.fromTo(
            tlCards,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: tlSection,
                start: 'top 80%',
              },
            }
          );
        }
      }

      // F. PEOPLE & METRIC COUNTERS ON SCROLL
      const peopleEl = peopleRef.current;
      if (peopleEl) {
        const counterTarget = { projects: 0, rating: 0 };
        ScrollTrigger.create({
          trigger: peopleEl,
          start: 'top 75%',
          onEnter: () => {
            gsap.to(counterTarget, {
              projects: 304,
              rating: 4.9,
              duration: 2.2,
              ease: 'power2.out',
              onUpdate: () => {
                setProjectsCount(Math.floor(counterTarget.projects));
                setRatingCount(counterTarget.rating.toFixed(1));
              },
            });

            // Portrait avatars bounce
            gsap.fromTo(
              peopleEl.querySelectorAll('.portrait-avatar'),
              { scale: 0, rotate: -15 },
              { scale: 1, rotate: 0, duration: 0.6, stagger: 0.12, ease: 'back.out(2)' }
            );
          },
        });
      }

      // G. FOOTER GIANT WORDMARK REVEAL
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
      <div ref={cursorRef} id="custom-cursor" className="custom-cursor" style={{ backgroundColor: '#E7CD54' }}>
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

      {/* Floating Fixed Pill Navbar with Official Logo */}
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
                <a href="#binacional" className="nav-item">
                  Binacional
                </a>
                <a href="#about" className="nav-item">
                  Identidad
                </a>
                <a href="#historia" className="nav-item">
                  Nuestra Historia
                </a>
                <a href="#work" className="nav-item">
                  Programas
                </a>
                <a href="#centro-integral" className="nav-item">
                  Centro Integral
                </a>
                <a href="#aliados" className="nav-item">
                  Aliados
                </a>
                <a href="#transparencia" className="nav-item">
                  Transparencia
                </a>
                <a href="#people" className="nav-item">
                  Gobierno
                </a>
                <a href="#contact" className="nav-item">
                  Contacto
                </a>
              </div>
              <button
                type="button"
                className="nav-contact-btn"
                onClick={() => {
                  setModalLineInterest('Donación / Aporte General');
                  setIsModalOpen(true);
                }}
              >
                Sumar Apoyo / Donar
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

      {/* Main Full-Width Content Viewport */}
      <main className="site-main-viewport">

        {/* 1. HERO SECTION (Inmersivo Cinematográfico Full-Bleed Binacional) */}
        <section ref={heroRef} className="section hero-section hero-cinematic-theme" id="hero">
            {/* Exclusive Video Background */}
            <div className="hero-video-container">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/assets/hero_bg.png"
                className="hero-video-bg"
              >
                <source src="/assets/hero_background.mp4" type="video/mp4" />
              </video>
              <div className="hero-cinematic-vignette" />
              <div className="hero-film-grain" />
            </div>

            {/* Foreground Cinematic Stage */}
            <div className="hero-cinematic-stage">
              {/* Top Bar: Institutional Emblem & Live Status */}
              <div className="hero-cinematic-topbar">
                <div className="hero-emblem-badge">
                  <div className="hero-emblem-hands">
                    <img
                      src="/assets/hand_navy_master.png"
                      alt="Mano Azul"
                      className="mini-hand mini-hand-navy"
                    />
                    <img
                      src="/assets/hand_gold_master.png"
                      alt="Mano Oro"
                      className="mini-hand mini-hand-gold"
                    />
                    <img
                      src="/assets/hand_white_master.png"
                      alt="Mano Blanca"
                      className="mini-hand mini-hand-white"
                    />
                  </div>
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

              {/* Center Stage: Monumental Title with Rotating Accent */}
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
                <div style={{ margin: '14px 0 20px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(40, 47, 98, 0.45)', border: '1px solid rgba(227, 206, 104, 0.3)', borderRadius: '9999px' }}>
                  <span style={{ color: '#E3CE68', fontSize: '13px' }}>✦</span>
                  <span className="font-serif-quote" style={{ fontSize: '13.5px', color: '#FFFFFF', letterSpacing: '0.01em' }}>
                    {CITA_BIBLICA.versiculo} <strong style={{ color: '#E3CE68' }}>{CITA_BIBLICA.cita}</strong>
                  </span>
                </div>

                {/* Cinematic CTAs: Magnetic Gold Pill + Secondary Program Pill */}
                <div className="hero-cinematic-ctas">
                  <button
                    type="button"
                    className="hero-btn-magnetic-gold"
                    onClick={() => setIsModalOpen(true)}
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

                  <a href="#binacional" className="hero-btn-cinematic-glass">
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
                  <a href="#binacional" className="scroll-cue-link">
                    <span className="scroll-cue-text">EXPLORAR</span>
                    <div className="scroll-cue-track">
                      <div className="scroll-cue-dot" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* 1.1 PRESENTACIÓN INSTITUCIONAL BINACIONAL: COLOMBIA · ESTADOS UNIDOS */}
          <section className="binational-section" id="binacional">
            <div className="featured-work-container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
              <div className="featured-work-header">
                <div>
                  <div className="work-kicker-tag" style={{ color: '#E3CE68' }}>PRESENCIA INSTITUCIONAL BINACIONAL</div>
                  <h2 className="section-title font-heading" style={{ color: '#ffffff' }}>
                    COLOMBIA · ESTADOS UNIDOS
                  </h2>
                </div>
                <p className="work-header-desc" style={{ color: '#B0B7D1' }}>
                  {BINACIONAL_INFO.lema}
                </p>
              </div>

              {/* Dual Country Comparison Cards */}
              <div className="binational-grid">
                {/* 1. ESTADOS UNIDOS CARD */}
                <div className="binational-card">
                  <div className="binational-badge-row">
                    <span className="country-flag-pill">
                      <span>{BINACIONAL_INFO.usa.bandera}</span>
                      <span>{BINACIONAL_INFO.usa.pais}</span>
                    </span>
                    <span className="status-active-pill">{BINACIONAL_INFO.usa.estado}</span>
                  </div>

                  <h3 className="binational-title font-heading">{BINACIONAL_INFO.usa.razonSocial}</h3>
                  <p style={{ fontSize: '13px', color: '#9DA6C7', marginBottom: '14px' }}>
                    {BINACIONAL_INFO.usa.naturaleza}
                  </p>

                  <ul className="binational-meta-list">
                    <li className="binational-meta-item">
                      <span className="binational-meta-label">Identificación Fiscal Federal (FEI / EIN)</span>
                      <span className="binational-meta-value">{BINACIONAL_INFO.usa.ein}</span>
                    </li>
                    <li className="binational-meta-item">
                      <span className="binational-meta-label">Número de Registro Oficial</span>
                      <span className="binational-meta-value">{BINACIONAL_INFO.usa.registro}</span>
                    </li>
                    <li className="binational-meta-item">
                      <span className="binational-meta-label">Fecha &amp; Lugar de Constitución</span>
                      <span className="binational-meta-value">{BINACIONAL_INFO.usa.fechaConstitucion} · {BINACIONAL_INFO.usa.lugar}</span>
                    </li>
                    <li className="binational-meta-item">
                      <span className="binational-meta-label">Entidad de Registro</span>
                      <span className="binational-meta-value">{BINACIONAL_INFO.usa.entidad}</span>
                    </li>
                    <li className="binational-meta-item">
                      <span className="binational-meta-label">Representación Oficial</span>
                      <span className="binational-meta-value">{BINACIONAL_INFO.usa.representante} ({BINACIONAL_INFO.usa.cargo})</span>
                    </li>
                    <li className="binational-meta-item">
                      <span className="binational-meta-label">Canales de Contacto EE.UU.</span>
                      <span className="binational-meta-value">
                        <a href={`mailto:${BINACIONAL_INFO.usa.correo}`} style={{ color: '#E3CE68', textDecoration: 'none' }}>{BINACIONAL_INFO.usa.correo}</a> · Tel: {BINACIONAL_INFO.usa.telefono}
                      </span>
                    </li>
                  </ul>

                  {/* Regions Bank Box */}
                  <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(227, 206, 104, 0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#E3CE68', fontWeight: '700', letterSpacing: '0.06em' }}>
                        CANAL OFICIAL DE DONACIÓN (EE.UU.)
                      </span>
                      <span style={{ fontSize: '11px', color: '#A1A8C5' }}>Regions Bank</span>
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '10px 14px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <div>
                        <div style={{ fontSize: '11px', color: '#8F98BA' }}>Cuenta Corriente #</div>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', fontFamily: 'monospace' }}>
                          {BINACIONAL_INFO.usa.bancoOficial.numeroCuenta}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyBankAccount}
                        style={{ background: '#E3CE68', color: '#101633', border: 'none', borderRadius: '9999px', padding: '6px 14px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }}
                      >
                        {copiedBank ? '¡Copiado!' : 'Copiar Cuenta'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. COLOMBIA CARD */}
                <div className="binational-card">
                  <div className="binational-badge-row">
                    <span className="country-flag-pill">
                      <span>{BINACIONAL_INFO.colombia.bandera}</span>
                      <span>{BINACIONAL_INFO.colombia.pais}</span>
                    </span>
                    <span className="status-active-pill">ACTIVA · ESAL</span>
                  </div>

                  <h3 className="binational-title font-heading">{BINACIONAL_INFO.colombia.razonSocial}</h3>
                  <p style={{ fontSize: '13px', color: '#9DA6C7', marginBottom: '14px' }}>
                    {BINACIONAL_INFO.colombia.naturaleza}
                  </p>

                  <ul className="binational-meta-list">
                    <li className="binational-meta-item">
                      <span className="binational-meta-label">Número de Identificación Tributaria (NIT)</span>
                      <span className="binational-meta-value">{BINACIONAL_INFO.colombia.nit}</span>
                    </li>
                    <li className="binational-meta-item">
                      <span className="binational-meta-label">Fecha &amp; Lugar de Constitución</span>
                      <span className="binational-meta-value">{BINACIONAL_INFO.colombia.fechaConstitucion} · {BINACIONAL_INFO.colombia.lugar}</span>
                    </li>
                    <li className="binational-meta-item">
                      <span className="binational-meta-label">Dirección Institucional</span>
                      <span className="binational-meta-value">{BINACIONAL_INFO.colombia.direccion}</span>
                    </li>
                    <li className="binational-meta-item">
                      <span className="binational-meta-label">Representación Oficial</span>
                      <span className="binational-meta-value">{BINACIONAL_INFO.colombia.representante} ({BINACIONAL_INFO.colombia.cargo})</span>
                    </li>
                    <li className="binational-meta-item">
                      <span className="binational-meta-label">Canales de Contacto Colombia</span>
                      <span className="binational-meta-value">
                        <a href={`mailto:${BINACIONAL_INFO.colombia.correo}`} style={{ color: '#E3CE68', textDecoration: 'none' }}>{BINACIONAL_INFO.colombia.correo}</a> · Tel: {BINACIONAL_INFO.colombia.telefono}
                      </span>
                    </li>
                    <li className="binational-meta-item">
                      <span className="binational-meta-label">Presencia Digital</span>
                      <span className="binational-meta-value">Instagram: {BINACIONAL_INFO.colombia.instagram} · arcadelaalianza.org</span>
                    </li>
                  </ul>

                  <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(227, 206, 104, 0.2)' }}>
                    <button
                      type="button"
                      className="hero-btn-magnetic-gold"
                      onClick={() => {
                        setModalLineInterest('Donación Colombia');
                        setIsModalOpen(true);
                      }}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <span>Sumar Apoyo en Colombia</span>
                      <span className="btn-arrow-icon">→</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Relationship Bridge Banner */}
              <div className="binational-bridge-box">
                <div style={{ flex: '1 1 540px' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#E3CE68', fontWeight: '800', letterSpacing: '0.08em' }}>
                    RELACIÓN BINACIONAL &amp; AUTONOMÍA JURÍDICA
                  </span>
                  <h4 style={{ fontSize: '17px', color: '#ffffff', fontWeight: '700', marginTop: '6px' }}>
                    Dos entidades diferenciadas, un puente de solidaridad y esperanza
                  </h4>
                  <p style={{ fontSize: '13.5px', color: '#C5CBDD', marginTop: '6px', lineHeight: '1.6' }}>
                    {BINACIONAL_INFO.relacion}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openLegalDocument('institucional')}
                  className="hero-btn-cinematic-glass"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <span>Ver Detalle Jurídico Binacional</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </section>


          {/* 2. STATEMENT / MANIFIESTO SECTION (White Card, 100vw x 100vh) */}
          <section ref={statementRef} className="section statement-section" id="about">
            <div className="statement-container">
              <div className="statement-top-meta">
                <div className="statement-badge">
                  <span className="statement-badge-dot" />
                  <span>IDENTIDAD INSTITUCIONAL · ESAL SOCIAL Y COMUNITARIA</span>
                </div>
                <div className="statement-legal-tag">
                  <span>CONSTITUIDA EL 26 DE NOVIEMBRE DE 2021 · NIT 901.689.340 - 5</span>
                </div>
              </div>

              <div className="statement-hero-text">
                <h2 className="statement-main-title">
                  GENERAMOS CAPACIDAD INSTALADA:<br />
                  <span className="statement-gold-highlight">EMPODERAMOS PROYECTOS DE VIDA.</span>
                </h2>
                <p className="statement-lead-paragraph">
                  La <strong>Fundación Arca de la Alianza</strong> es una entidad sin ánimo de lucro (ESAL), de carácter social y comunitario, orientada a mejorar la calidad de vida de personas en condiciones de pobreza extrema y vulnerabilidad mediante acompañamiento psicosocial, educación, identidad cultural y redes comunitarias sostenibles.
                </p>
              </div>

              {/* Interactive Institutional Tabs Navigation */}
              <div className="about-tabs-bar" role="tablist" aria-label="Información Institucional">
                <button
                  type="button"
                  className={`about-tab-btn ${aboutTab === 'mision' ? 'active' : ''}`}
                  onClick={() => setAboutTab('mision')}
                  role="tab"
                  aria-selected={aboutTab === 'mision'}
                >
                  <span className="tab-dot" />
                  <span>Misión, Visión &amp; Filosofía</span>
                </button>

                <button
                  type="button"
                  className={`about-tab-btn ${aboutTab === 'valores' ? 'active' : ''}`}
                  onClick={() => setAboutTab('valores')}
                  role="tab"
                  aria-selected={aboutTab === 'valores'}
                >
                  <span className="tab-dot" />
                  <span>Nuestros Valores (8)</span>
                </button>

                <button
                  type="button"
                  className={`about-tab-btn ${aboutTab === 'principios' ? 'active' : ''}`}
                  onClick={() => setAboutTab('principios')}
                  role="tab"
                  aria-selected={aboutTab === 'principios'}
                >
                  <span className="tab-dot" />
                  <span>Principios Institucionales (8)</span>
                </button>

                <button
                  type="button"
                  className={`about-tab-btn ${aboutTab === 'objetivos' ? 'active' : ''}`}
                  onClick={() => setAboutTab('objetivos')}
                  role="tab"
                  aria-selected={aboutTab === 'objetivos'}
                >
                  <span className="tab-dot" />
                  <span>Objetivos Estratégicos (12)</span>
                </button>

                <button
                  type="button"
                  className={`about-tab-btn ${aboutTab === 'espiritual' ? 'active' : ''}`}
                  onClick={() => setAboutTab('espiritual')}
                  role="tab"
                  aria-selected={aboutTab === 'espiritual'}
                >
                  <span className="tab-dot" />
                  <span>Identidad Espiritual &amp; Logotipo</span>
                </button>
              </div>

              {/* Tab Panel Content */}
              <div className="about-tab-panel">
                {/* 1. MISIÓN & VISIÓN */}
                {aboutTab === 'mision' && (
                  <div>
                    <div className="about-philosophy-card">
                      <p className="philosophy-quote">{FILOSOFIA_INSTITUCIONAL}</p>
                      <span className="philosophy-tag">Filosofía Institucional · Fundación Arca de la Alianza</span>
                    </div>

                    <div className="mv-deck-grid">
                      <div className="mv-card">
                        <div>
                          <div className="mv-card-header">
                            <span className="mv-card-badge">PROPÓSITO</span>
                            <h3 className="mv-card-title">MISIÓN INSTITUCIONAL</h3>
                          </div>
                          <p className="mv-card-body">
                            Generar capacidad instalada en las comunidades en la que Arca de la Alianza realiza su accionar, promoviendo la solidaridad y el trabajo comunitario para que las personas se empoderen de sus proyectos de vida.
                          </p>
                        </div>
                      </div>

                      <div className="mv-card">
                        <div>
                          <div className="mv-card-header">
                            <span className="mv-card-badge" style={{ backgroundColor: '#b89814' }}>HORIZONTE 2030</span>
                            <h3 className="mv-card-title">VISIÓN INSTITUCIONAL</h3>
                          </div>
                          <p className="mv-card-body">
                            Para el año 2030, la fundación el Arca de la Alianza, será reconocida por su trabajo en pro de los más necesitados, a través del acompañamiento psicosocial y el fortalecimiento del trabajo comunitario, promoviendo la construcción de redes de apoyo.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="target-populations-bar">
                      <span className="populations-label">Poblaciones de Atención Prioritaria:</span>
                      <div className="populations-chips">
                        <span className="pop-chip">👩 Mujeres &amp; Madres</span>
                        <span className="pop-chip">🧒 Niñez &amp; Adolescencia</span>
                        <span className="pop-chip">🪶 Poblaciones Indígenas</span>
                        <span className="pop-chip">👵 Adultos Mayores</span>
                        <span className="pop-chip">🤝 Habitantes de Calle</span>
                        <span className="pop-chip">🏡 Familias Vulnerables</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. VALORES INSTITUCIONALES (8) */}
                {aboutTab === 'valores' && (
                  <div className="values-8-grid">
                    {VALORES_INSTITUCIONALES.map((val) => (
                      <div key={val.num} className="value-item-card">
                        <div>
                          <div className="value-card-top">
                            <span className="value-num">{val.num}/</span>
                            <span style={{ fontSize: '14px' }}>✦</span>
                          </div>
                          <h4 className="value-title">{val.title}</h4>
                        </div>
                        <p className="value-desc">{val.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. PRINCIPIOS INSTITUCIONALES (8) */}
                {aboutTab === 'principios' && (
                  <div className="principles-8-grid">
                    {PRINCIPIOS_INSTITUCIONALES.map((prin) => (
                      <div key={prin.num} className="value-item-card">
                        <div>
                          <div className="value-card-top">
                            <span className="value-num" style={{ color: '#101633' }}>{prin.num}/</span>
                            <span style={{ fontSize: '14px', color: '#b89814' }}>◈</span>
                          </div>
                          <h4 className="value-title">{prin.title}</h4>
                        </div>
                        <p className="value-desc">{prin.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. OBJETIVOS ESTRATÉGICOS (General + 12 Específicos) */}
                {aboutTab === 'objetivos' && (
                  <div className="objectives-deck-wrapper">
                    <div className="general-objective-card">
                      <div className="gen-obj-kicker">OBJETIVO GENERAL INSTITUCIONAL</div>
                      <h3 className="gen-obj-title">Bienestar Integral, Inclusión Social y Capacidades Sostenibles</h3>
                      <p className="gen-obj-desc">
                        Contribuir al mejoramiento de la calidad de vida y al bienestar integral de las personas y comunidades en situación de vulnerabilidad, especialmente mujeres, niños, niñas, adolescentes, adultos mayores, comunidades indígenas y habitantes de calle, mediante programas sociales, educativos, culturales, humanitarios y de acompañamiento psicosocial que promuevan la dignidad humana, la autonomía y la construcción de proyectos de vida sostenibles.
                      </p>
                    </div>

                    <div className="specific-objectives-grid">
                      {OBJETIVOS_ESPECIFICOS.map((obj) => (
                        <div key={obj.num} className="spec-obj-card">
                          <div className="spec-obj-header">
                            <span className="spec-obj-num">{obj.num}</span>
                            <h4 className="spec-obj-title">{obj.title}</h4>
                          </div>
                          <p className="spec-obj-desc">{obj.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. IDENTIDAD ESPIRITUAL & SIGNIFICADO DEL LOGOTIPO */}
                {aboutTab === 'espiritual' && (
                  <div>
                    <div className="about-philosophy-card" style={{ borderColor: 'rgba(40, 47, 98, 0.4)' }}>
                      <p className="philosophy-quote font-serif-quote" style={{ fontSize: '18px', color: '#282F62' }}>
                        {ESENCIA_ESPIRITUAL}
                      </p>
                      <span className="philosophy-tag" style={{ backgroundColor: '#282F62', color: '#ffffff' }}>
                        {CITA_BIBLICA.versiculo} <strong>{CITA_BIBLICA.cita}</strong>
                      </span>
                    </div>

                    <div style={{ margin: '20px 0', padding: '24px 28px', background: '#F8F9FD', borderRadius: '20px', border: '1px solid rgba(40, 47, 98, 0.1)' }}>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#282F62', fontWeight: '800', letterSpacing: '0.08em' }}>
                        CONCEPTO CENTRAL DE MARCA
                      </span>
                      <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1E2338', marginTop: '6px' }}>
                        {LOGO_SIGNIFICADO.lema}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#4A526E', marginTop: '6px', lineHeight: '1.6' }}>
                        {LOGO_SIGNIFICADO.introduccion}
                      </p>
                    </div>

                    {/* 3 Hands Meaning */}
                    <div className="hands-meaning-grid">
                      {LOGO_SIGNIFICADO.manos.map((mano, idx) => (
                        <div key={idx} className={`hand-meaning-card ${mano.borderClass}`} style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: mano.hex === '#FFFFFF' ? '#555' : mano.hex, letterSpacing: '0.06em' }}>
                              {mano.color}
                            </span>
                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: mano.hex, border: '1px solid #ccc' }} />
                          </div>
                          <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#1E2338', marginBottom: '8px' }}>
                            {mano.title}
                          </h4>
                          <p style={{ fontSize: '13px', color: '#555d7a', lineHeight: '1.6' }}>
                            {mano.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Meaning of the Name */}
                    <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                      <div style={{ padding: '20px 24px', background: '#F8F9FD', borderRadius: '16px', borderLeft: '4px solid #282F62' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#282F62', marginBottom: '6px' }}>EL ARCA · REFUGIO &amp; ACOGIDA</h4>
                        <p style={{ fontSize: '13px', color: '#4B5370', lineHeight: '1.6' }}>{LOGO_SIGNIFICADO.nombre.arca}</p>
                      </div>
                      <div style={{ padding: '20px 24px', background: '#F8F9FD', borderRadius: '16px', borderLeft: '4px solid #E3CE68' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#978216', marginBottom: '6px' }}>LA ALIANZA · COMPROMISO CON DIOS</h4>
                        <p style={{ fontSize: '13px', color: '#4B5370', lineHeight: '1.6' }}>{LOGO_SIGNIFICADO.nombre.alianza}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 3. FEATURED WORK / 5 PROGRAMAS OFICIALES EN TERRITORIO */}
          <section ref={workRef} className="section work-section" id="work">
            <div className="featured-work-container">
              <div className="featured-work-header">
                <div className="work-header-left">
                  <div className="work-kicker-tag">PROGRAMAS SOCIALES EN TERRITORIO</div>
                  <h3 className="section-title">
                    PROGRAMAS QUE APOYAMOS
                  </h3>
                </div>
                <p className="work-header-desc">
                  Acciones continuas e integrales orientadas a mejorar las condiciones de vida de mujeres, niños, comunidades indígenas, amigos en situación de calle y familias vulnerables.
                </p>
              </div>

              {/* 5 Official Programs Grid */}
              <div className="programs-grid-5">
                {PROGRAMAS_OFICIALES.map((prog) => (
                  <div
                    key={prog.id}
                    className="program-card-modern"
                    onClick={() => {
                      setModalLineInterest(prog.title);
                      setIsModalOpen(true);
                    }}
                  >
                    <div className="program-media-box">
                      <img
                        src={prog.img}
                        alt={prog.title}
                        className="program-media-img"
                      />
                      <span className="program-tag-badge">{prog.tag}</span>
                    </div>

                    <div className="program-body-box">
                      <h4 className="program-name-title">{prog.title}</h4>
                      <p className="program-desc-p">{prog.desc}</p>
                      
                      <div className="program-schedule-chip">
                        <span>🗓️</span>
                        <span>{prog.chip}</span>
                      </div>

                      <div className="program-card-action">
                        <span>{prog.actionText}</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. SERVICES / RESULTADOS E IMPACTO SOCIAL (4 Dimensiones) */}
          <section ref={servicesRef} className="section black-card-section" id="services">
            <div className="services-header">
              <div>
                <div className="services-kicker-badge">RESULTADOS E IMPACTO SOCIAL</div>
                <h2 className="services-headline">
                  TRANSFORMACIÓN EN CUATRO DIMENSIONES
                </h2>
              </div>
              <p className="services-sub">
                Desde 2010 trabajamos con la convicción de que pequeños actos de solidaridad generan grandes transformaciones en la vida de las personas y sus comunidades.
              </p>
            </div>

            {/* 4 Dimensions of Impact Cards */}
            <div className="dimensions-4-grid">
              {DIMENSIONES_IMPACTO.map((dim, i) => (
                <div key={i} className="dim-card">
                  <div className="dim-icon-pill">{dim.icon}</div>
                  <h4 className="dim-card-title">{dim.title}</h4>
                  <p className="dim-card-desc">{dim.desc}</p>
                </div>
              ))}
            </div>

            {/* 6 Verified Results of Labor Since 2010 */}
            <div style={{ marginTop: '40px' }}>
              <div className="services-kicker-badge" style={{ backgroundColor: 'rgba(231, 205, 84, 0.2)', color: '#f7df6d' }}>
                LOGROS COMPROBADOS DESDE NUESTROS ORÍGENES
              </div>
              <div className="values-8-grid" style={{ marginTop: '16px' }}>
                {RESULTADOS_LABOR.map((res) => (
                  <div key={res.num} className="value-item-card" style={{ background: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.12)' }}>
                    <div>
                      <div className="value-card-top">
                        <span className="value-num" style={{ color: '#E7CD54' }}>{res.num}/</span>
                        <span style={{ fontSize: '14px', color: '#E7CD54' }}>✦</span>
                      </div>
                      <h4 className="value-title" style={{ color: '#ffffff' }}>{res.title}</h4>
                    </div>
                    <p className="value-desc" style={{ color: '#adb5d4' }}>{res.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Institutional Commitment Banner */}
            <div className="about-philosophy-card" style={{ marginTop: '32px', backgroundColor: 'rgba(16, 22, 51, 0.85)', borderColor: 'rgba(231, 205, 84, 0.4)' }}>
              <p className="philosophy-quote" style={{ color: '#f7df6d' }}>
                «No se trata solamente de entregar una donación, sino de sembrar esperanza, fortalecer capacidades y abrir caminos hacia una vida más digna».
              </p>
              <span className="philosophy-tag" style={{ color: '#ffffff' }}>
                Compromiso Institucional · Fundación Arca de la Alianza
              </span>
            </div>
          </section>

          {/* 5. HISTORIA FUNDACIONAL & TRAYECTORIA */}
          <section ref={timelineRef} className="section timeline-section" id="historia">
            <div className="timeline-header">
              <div>
                <div className="timeline-kicker-tag">UNA HISTORIA DE FE, OBEDIENCIA Y SERVICIO</div>
                <h2 className="timeline-headline">
                  CÓMO Y POR QUÉ NACIÓ LA FUNDACIÓN
                </h2>
              </div>
              <div className="carousel-nav-arrows">
                <button
                  type="button"
                  className="arrow-btn"
                  onClick={handleTimelinePrev}
                  aria-label="Anterior hito"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            {/* Narrative Manifesto Box */}
            <div className="story-manifesto-card">
              <div className="story-quote-highlight">
                «Servir a los demás es una de las expresiones más grandes del amor de Dios».
              </div>
              <p className="story-lead-p">
                <strong>La Fundación Arca de la Alianza</strong> nació mucho antes de tener un nombre. Nació en el corazón de su fundadora desde niña, gracias a su madre, quien le enseñó que el amor de Dios se manifiesta acompañando y ayudando a quienes más lo necesitan en cada comunidad.
              </p>
              <p className="story-lead-p">
                En el año <strong>2010</strong>, durante un tiempo de ayuno y búsqueda espiritual en Estados Unidos, Sandra Milena sintió un llamado claro al notar cómo muchas personas desechaban ropa, muebles y artículos en excelente estado, mientras que en Colombia familias enteras los necesitaban: <em>«Lo que para unos era basura, para otros esperanza»</em>. Nació así <strong>Casi New</strong>, iniciativa que durante 7 años generó empleo digno para madres cabeza de familia a través de la economía circular.
              </p>
              <p className="story-lead-p">
                Una madrugada a las 3:00 a.m. recibió una revelación en sueños con el nombre que debía llevar esta obra: <strong>«Fundación Arca de la Alianza»</strong>, y la instrucción sagrada: <em>«Levántate y escribe»</em>. Escribió hasta las diez de la mañana plasmando la visión que uniría la generación de oportunidades de Casi New con la labor comunitaria sin ánimo de lucro. El <strong>26 de noviembre de 2021</strong> se formalizó jurídicamente en Colombia (NIT 901.689.340-5).
              </p>
              <p className="story-lead-p" style={{ fontWeight: '700', color: 'var(--color-navy)', marginBottom: 0 }}>
                «Porque creemos que nada ni nadie está tan olvidado que no pueda encontrar una nueva oportunidad».
              </p>
            </div>

            {/* Timeline Slider Track */}
            <div ref={timelineTrackRef} className="timeline-track-container" id="timeline-scroll">
              {HISTORIA_HITOS.map((hito, idx) => (
                hito.isHeroConcept ? (
                  <div key={idx} className="timeline-concept-col">
                    <div className="concept-black-card">
                      <div className="concept-top-row">
                        <span className="concept-year-badge">{hito.badge}</span>
                        <span className="concept-star">✦</span>
                      </div>
                      <h3 className="concept-card-title">
                        {hito.title}
                      </h3>
                      <p className="concept-card-p">
                        {hito.desc}
                      </p>
                      <button
                        type="button"
                        className="meet-team-btn"
                        onClick={() => {
                          setModalLineInterest('Historia & Propósito');
                          setIsModalOpen(true);
                        }}
                      >
                        <span>Conocer Nuestra Misión</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div key={idx} className="timeline-card-col">
                    <div className="timeline-img-card">
                      <img
                        src={hito.img}
                        alt={hito.title}
                        className="timeline-gift-img"
                      />
                      <div className="timeline-year-chip">{hito.year}</div>
                    </div>
                    <div className="timeline-info">
                      <span className="capsule-tag" style={{ fontSize: '10.5px', marginBottom: '6px' }}>{hito.badge}</span>
                      <h3 className="timeline-step-title">{hito.title}</h3>
                      <p className="timeline-step-p">{hito.desc}</p>
                    </div>
                  </div>
                )
              ))}
            </div>
          </section>

          {/* 6. PROYECTOS EN CURSO & EL GRAN SUEÑO: CENTRO INTEGRAL ARCA DE LA ALIANZA */}
          <section className="section" id="centro-integral" style={{ padding: '40px 24px', backgroundColor: '#0A0E22' }}>
            <div className="centro-integral-section">
              <div className="featured-work-header" style={{ marginBottom: '28px' }}>
                <div>
                  <div className="services-kicker-badge" style={{ backgroundColor: 'rgba(231, 205, 84, 0.25)', color: '#f7df6d' }}>
                    PROYECTOS EN CURSO Y PLANES A FUTURO
                  </div>
                  <h2 className="services-headline" style={{ color: '#ffffff' }}>
                    EL GRAN SUEÑO: CENTRO INTEGRAL
                  </h2>
                </div>
                <p className="services-sub" style={{ color: '#adb5d4' }}>
                  Un espacio para servir, formar, emprender y transformar vidas. Proyectamos construir una sede modelo que reúna todos nuestros programas sociales.
                </p>
              </div>

              {/* Showcase Grid with Architectural Render */}
              <div className="centro-hero-grid">
                <div className="centro-img-frame">
                  <img
                    src="/assets/centro_integral.jpg"
                    alt="Centro Integral Arca de la Alianza - Proyecto Arquitectónico Social"
                  />
                  <div className="centro-img-badge">
                    ✦ PROYECTO MAESTRO · SEDE COMUNITARIA INTEGRAL
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#E7CD54', marginBottom: '14px', lineHeight: '1.25' }}>
                    Un Hogar de Esperanza y Oportunidades Reales
                  </h3>
                  <p style={{ fontSize: '14.5px', color: '#cad2ea', lineHeight: '1.65', marginBottom: '16px' }}>
                    Uno de nuestros mayores sueños es levantar una sede propia donde una madre encuentre cómo generar ingresos, un joven descubra sus talentos, un niño reciba refuerzo escolar y una familia entera pueda comenzar de nuevo.
                  </p>
                  
                  {/* Ongoing Projects Chips */}
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#E7CD54', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Iniciativas en Desarrollo:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                      <span className="pop-chip" style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#ffffff' }}>✈️ Turismo Misionero: Viajar con Propósito</span>
                      <span className="pop-chip" style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#ffffff' }}>♻️ Economía Circular y Transformación</span>
                      <span className="pop-chip" style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#ffffff' }}>👩 Mujeres que Transforman Vidas</span>
                      <span className="pop-chip" style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#ffffff' }}>🤝 Misiones Solidarias Comunitarias</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="hero-btn-magnetic-gold"
                    onClick={() => {
                      setModalLineInterest('Construcción Centro Integral');
                      setIsModalOpen(true);
                    }}
                  >
                    <span>Sumarse al Centro Integral</span>
                    <span className="btn-arrow-icon">→</span>
                  </button>
                </div>
              </div>

              {/* 9 Functional Modules Grid */}
              <div>
                <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', marginBottom: '18px' }}>
                  Las 9 Áreas Estratégicas del Centro Integral:
                </h4>
                <div className="modules-9-grid">
                  {CENTRO_INTEGRAL_MODULOS.map((mod) => (
                    <div key={mod.num} className="module-box">
                      <div className="module-header-row">
                        <span className="module-num">{mod.num}</span>
                        <h5 className="module-title">{mod.title}</h5>
                      </div>
                      <p className="module-desc">{mod.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 4. ALIANZAS ESTRATÉGICAS Y ORGANIZACIONES QUE NOS RESPALDAN */}
          <section className="section" id="aliados" style={{ padding: '60px 24px', backgroundColor: '#070A18', borderTop: '1px solid rgba(227, 206, 104, 0.15)' }}>
            <div className="featured-work-container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
              <div className="featured-work-header">
                <div>
                  <div className="work-kicker-tag" style={{ color: '#E3CE68' }}>RED DE COLABORACIÓN Y RESPALDO</div>
                  <h2 className="section-title font-heading" style={{ color: '#ffffff' }}>
                    ALIANZAS QUE TRANSFORMAN VIDAS
                  </h2>
                </div>
                <p className="work-header-desc" style={{ color: '#B0B7D1' }}>
                  «Cuando unimos nuestras manos para servir, multiplicamos las oportunidades de transformar vidas». Ninguna transformación verdadera se construye en soledad.
                </p>
              </div>

              {/* Principal Donor & Partner Card: Casi New S.A.S. */}
              <div style={{ background: 'linear-gradient(135deg, rgba(40, 47, 98, 0.6), rgba(15, 21, 53, 0.85))', border: '1px solid rgba(227, 206, 104, 0.35)', borderRadius: '24px', padding: '32px 28px', margin: '24px 0 32px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '14px' }}>
                  <span className="capsule-tag" style={{ backgroundColor: '#E3CE68', color: '#101633', fontWeight: '800' }}>
                    {ALIANZAS_ESTRATEGICAS.principalAliado.categoria}
                  </span>
                  <span style={{ fontSize: '12px', color: '#E3CE68', fontWeight: '700' }}>
                    DESDE 2010 · ECONOMÍA CIRCULAR &amp; EMPLEO DIGNO
                  </span>
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', marginBottom: '10px' }}>
                  {ALIANZAS_ESTRATEGICAS.principalAliado.nombre}
                </h3>
                <p style={{ fontSize: '14.5px', color: '#C8CFE5', lineHeight: '1.7', maxWidth: '860px' }}>
                  {ALIANZAS_ESTRATEGICAS.principalAliado.desc}
                </p>
              </div>

              {/* Grid: Comunidades Religiosas vs Instituciones y Empresas */}
              <div className="allies-section-grid">
                {/* Comunidades Religiosas */}
                <div className="ally-category-card">
                  <h3 className="ally-category-title">
                    <span>⛪</span>
                    <span>Comunidades Religiosas y Misioneras</span>
                  </h3>
                  <p style={{ fontSize: '13px', color: '#9DA6C7', marginBottom: '16px' }}>
                    Aliados espirituales y misioneros que fortalecen nuestra vocación de servicio comunitario:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {ALIANZAS_ESTRATEGICAS.comunidadesReligiosas.map((com, idx) => (
                      <div key={idx} style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '14px', borderLeft: '3px solid #E3CE68' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff' }}>{com.nombre}</div>
                        <div style={{ fontSize: '12px', color: '#A0A7C4', marginTop: '2px' }}>{com.detalle}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instituciones y Empresas Aliadas */}
                <div className="ally-category-card">
                  <h3 className="ally-category-title">
                    <span>🤝</span>
                    <span>Instituciones y Empresas Aliadas</span>
                  </h3>
                  <p style={{ fontSize: '13px', color: '#9DA6C7', marginBottom: '16px' }}>
                    Organizaciones que aportan logística, voluntariado, deporte, cultura y reactivación comunitaria:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {ALIANZAS_ESTRATEGICAS.institucionesEmpresas.map((inst, idx) => (
                      <div key={idx} style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '14px', borderLeft: '3px solid #282F62' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff' }}>{inst.nombre}</div>
                        <div style={{ fontSize: '12px', color: '#A0A7C4', marginTop: '2px' }}>{inst.detalle}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. TRANSPARENCIA: ORIGEN Y DESTINO DE LOS RECURSOS & CUENTAS OFICIALES */}
          <section className="section" id="transparencia" style={{ padding: '60px 24px', backgroundColor: '#F4F5F9' }}>
            <div className="featured-work-container">
              <div className="featured-work-header">
                <div>
                  <div className="work-kicker-tag">GESTIÓN ÉTICA Y TRANSPARENCIA</div>
                  <h2 className="section-title font-heading" style={{ color: 'var(--color-navy)' }}>
                    ORIGEN Y DESTINO DE LOS RECURSOS
                  </h2>
                </div>
                <p className="work-header-desc" style={{ color: '#4B526D' }}>
                  En la Fundación Arca de la Alianza creemos que cada donación representa un acto sagrado de confianza. Administramos los recursos de manera ética, eficiente y orientada al cumplimiento de nuestra misión social.
                </p>
              </div>

              {/* Official US Bank Account Highlight Card */}
              <div className="bank-official-card">
                <div className="bank-header-row">
                  <div>
                    <span className="capsule-tag" style={{ backgroundColor: '#E3CE68', color: '#101633', fontWeight: '800' }}>
                      CANAL BANCARIO OFICIAL DE RECAUDO EN ESTADOS UNIDOS
                    </span>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginTop: '8px' }}>
                      Regions Bank · Arca de la Alianza Inc.
                    </h3>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => openLegalDocument('donaciones')}
                      className="legal-footer-btn"
                    >
                      <span>Ver Política de Donaciones</span>
                      <span>→</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openLegalDocument('etica')}
                      className="legal-footer-btn"
                    >
                      <span>Política de Transparencia &amp; Ética</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>

                <div className="bank-grid-fields">
                  <div className="bank-field-pill">
                    <span className="bank-field-label">Entidad Bancaria</span>
                    <span className="bank-field-value">{BINACIONAL_INFO.usa.bancoOficial.banco}</span>
                  </div>
                  <div className="bank-field-pill">
                    <span className="bank-field-label">Tipo de Cuenta</span>
                    <span className="bank-field-value">{BINACIONAL_INFO.usa.bancoOficial.tipoCuenta}</span>
                  </div>
                  <div className="bank-field-pill" style={{ border: '1px solid rgba(227, 206, 104, 0.4)', background: 'rgba(227, 206, 104, 0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="bank-field-label">Número de Cuenta</span>
                      <button
                        type="button"
                        onClick={handleCopyBankAccount}
                        style={{ background: '#E3CE68', color: '#101633', border: 'none', borderRadius: '6px', padding: '2px 8px', fontSize: '10px', fontWeight: '700', cursor: 'pointer' }}
                      >
                        {copiedBank ? '¡Copiado!' : 'Copiar'}
                      </button>
                    </div>
                    <span className="bank-field-value" style={{ color: '#E3CE68' }}>{BINACIONAL_INFO.usa.bancoOficial.numeroCuenta}</span>
                  </div>
                  <div className="bank-field-pill">
                    <span className="bank-field-label">Routing Number</span>
                    <span className="bank-field-value">{BINACIONAL_INFO.usa.bancoOficial.routingNumber}</span>
                  </div>
                  <div className="bank-field-pill">
                    <span className="bank-field-label">Titular Oficial</span>
                    <span className="bank-field-value" style={{ fontSize: '13px' }}>{BINACIONAL_INFO.usa.bancoOficial.titular}</span>
                  </div>
                </div>
              </div>

              {/* Dual Column: Fuentes vs Destino */}
              <div className="resources-dual-grid">
                {/* 4.1 Fuentes de Financiación */}
                <div className="resource-column-card">
                  <h3 className="resource-column-title">
                    <span>📥</span>
                    <span>4.1 Fuentes de Financiación</span>
                  </h3>
                  <div>
                    {FUENTES_FINANCIACION.map((fuente, i) => (
                      <div key={i} className="resource-item-row" style={fuente.isPrimary ? { borderLeftColor: '#E3CE68', background: 'rgba(227, 206, 104, 0.08)' } : {}}>
                        <div className="resource-item-head">
                          {fuente.title}
                        </div>
                        <div className="resource-item-body">{fuente.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4.2 Destino de los Recursos */}
                <div className="resource-column-card">
                  <h3 className="resource-column-title">
                    <span>📤</span>
                    <span>4.2 Destino de los Recursos</span>
                  </h3>
                  <div>
                    {DESTINO_RECURSOS.map((destino, i) => (
                      <div key={i} className="resource-item-row" style={{ borderLeftColor: 'var(--color-navy)' }}>
                        <div className="resource-item-head">{destino.title}</div>
                        <div className="resource-item-body">{destino.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contabilidad Profesional & Estados Financieros 2025/2026 */}
              <div style={{ marginTop: '30px', padding: '24px 28px', borderRadius: '20px', background: '#ffffff', border: '1px solid rgba(16, 22, 51, 0.1)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
                <div>
                  <span className="capsule-tag" style={{ backgroundColor: 'var(--color-navy)', color: '#ffffff' }}>
                    CONTROL CONTABLE &amp; RENDICIÓN DE CUENTAS 2025 · 2026
                  </span>
                  <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-dark)', marginTop: '8px' }}>
                    Acompañamiento Profesional, Estados Financieros e Informes de Gestión
                  </h4>
                  <p style={{ fontSize: '13.5px', color: '#555d7a', maxWidth: '680px', marginTop: '4px' }}>
                    Contamos con acompañamiento contable profesional continuo, estados financieros y memorias de gestión correspondientes a los años 2025 y 2026. Emitimos certificados de donación válidos bajo la legislación colombiana (Estatuto Tributario Art. 125) y estadounidense.
                  </p>
                </div>
                <button
                  type="button"
                  className="hero-btn-magnetic-gold"
                  onClick={() => openLegalDocument('etica')}
                  style={{ alignSelf: 'center' }}
                >
                  <span>Ver Política de Transparencia</span>
                  <span className="btn-arrow-icon">→</span>
                </button>
              </div>

              {/* 7 Estrategias de Sostenibilidad Institucional */}
              <div style={{ marginTop: '36px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#1E2338', marginBottom: '16px' }}>
                  Proyección de Sostenibilidad Institucional (7 Estrategias):
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                  {SOSTENIBILIDAD_ESTRATEGIAS.map((est) => (
                    <div key={est.num} style={{ background: '#ffffff', padding: '18px 20px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                      <div style={{ fontSize: '11px', fontWeight: '800', color: '#282F62', textTransform: 'uppercase', marginBottom: '4px' }}>
                        {est.num} · Estrategia
                      </div>
                      <h5 style={{ fontSize: '14.5px', fontWeight: '700', color: '#1E2338', marginBottom: '6px' }}>
                        {est.title}
                      </h5>
                      <p style={{ fontSize: '12.5px', color: '#555d7a', lineHeight: '1.5' }}>
                        {est.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 6. GOBIERNO & EQUIPO SECTION (4 Miembros de Junta Directiva) */}
          <section ref={peopleRef} className="section people-stats-section" id="people">
            <div className="moments-statement">
              <div className="governance-kicker">GOBIERNO &amp; EQUIPO HUMANO</div>
              <h2 className="moments-headline font-heading">
                LIDERAZGO COMPROMETIDO CON LA TRANSFORMACIÓN
              </h2>

              <p className="governance-lead">
                Nuestra labor se fundamenta en la integridad, el servicio desinteresado y la articulación con aliados, empresas, comunidades religiosas y cooperantes para construir un futuro con dignidad y oportunidades.
              </p>

              {/* Official 4-Leader Board Grid */}
              <div className="leadership-board-grid-4">
                {GOBIERNO_INSTITUCIONAL.juntaDirectiva.map((member, idx) => (
                  <div key={idx} className="leader-card-box">
                    <div className="leader-avatar-circle-sm">{member.initial}</div>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#ffffff', marginBottom: '2px' }}>
                        {member.name}
                      </h4>
                      <span style={{ fontSize: '12px', color: '#E3CE68', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                        {member.role}
                      </span>
                      <p style={{ fontSize: '12px', color: '#A0A7C2', margin: 0, lineHeight: '1.4' }}>
                        {member.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="moments-team-strip" style={{ marginTop: '28px' }}>
                <div className="portrait-bubbles-group">
                  <div className="portrait-avatar-bubble" title="Dirección de Proyectos Sociales">
                    <img src="/assets/portrait_1.png" alt="Directora de Proyectos Sociales" />
                  </div>
                  <div className="portrait-avatar-bubble" title="Coordinación de Voluntariado">
                    <img src="/assets/portrait_2.png" alt="Coordinadora de Voluntariado" />
                  </div>
                  <div className="portrait-avatar-bubble" title="Dirección Comunitaria">
                    <img src="/assets/portrait_3.png" alt="Directora Comunitaria" />
                  </div>
                </div>
                <div className="moments-team-info">
                  <strong className="team-info-title">Red de Voluntarios Nacionales e Internacionales</strong>
                  <span className="team-info-sub">+45 profesionales y voluntarios en territorio en Colombia y EE.UU.</span>
                </div>
              </div>
            </div>

            {/* 3 Metric Cards */}
            <div className="metric-cards-container">
              {/* Card 1: Transparencia Fiscal RTE */}
              <div className="stat-card-wrapper card-blog">
                <div className="card-black-roof">
                  <span className="capsule-tag">
                    RÉGIMEN DIAN · RTE
                  </span>
                </div>
                <div className="card-colored-body purple-body">
                  <span className="counter-label-light">CERTIFICACIÓN TRIBUTARIA</span>
                  <div className="counter-large-stat">100%</div>
                  <p className="card-desc">
                    Habilitados formalmente para emitir certificados de donación con deducción aplicable en declaración de renta.
                  </p>
                  <div className="card-bottom-action">
                    <span className="action-label">DOCUMENTACIÓN<br />LEGAL AL DÍA</span>
                    <button
                      type="button"
                      onClick={() => openLegalDocument('institucional')}
                      className="circle-action-btn"
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
                  <span className="capsule-tag dark-tag">
                    SEGURIDAD ALIMENTARIA &amp; APOYO
                  </span>
                </div>
                <div className="card-colored-body yellow-body">
                  <span className="counter-label-dark">PLATOS Y AYUDAS ENTREGADAS</span>
                  <div className="counter-large-stat text-dark">
                    +14.500
                  </div>
                  <p className="card-desc-dark">
                    Jornadas comunitarias directas: Cena bajo las estrellas, donatones de ropa y auxilio nutricional sin intermediarios.
                  </p>
                  <div className="card-bottom-action">
                    <span className="action-label text-dark">TRAZABILIDAD<br />EN CAMPO</span>
                    <button
                      type="button"
                      onClick={() => {
                        setModalLineInterest('Apoyo Alimentario y Comunitario');
                        setIsModalOpen(true);
                      }}
                      className="circle-action-btn dark-circle-btn"
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
                  <span className="capsule-tag">
                    EL NIÑO DE BELÉN
                  </span>
                </div>
                <div className="card-colored-body peach-body">
                  <span className="counter-label-light">INFANCIA EN AULAS &amp; NAVIDAD</span>
                  <div className="counter-large-stat text-gold">
                    870+
                  </div>
                  <p className="card-desc">
                    Niñas y niños beneficiados con útiles escolares para evitar deserción y juguetes nuevos en resguardos indígenas.
                  </p>
                  <div className="card-bottom-action">
                    <span className="action-label">REDUCCIÓN DE<br />DESERCIÓN ESCOLAR</span>
                    <button
                      type="button"
                      onClick={() => {
                        setModalLineInterest('Programa El Niño de Belén');
                        setIsModalOpen(true);
                      }}
                      className="circle-action-btn"
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

          {/* 7. FOOTER SECTION & APARTADO 7.7: TRANSPARENCIA Y POLÍTICAS LEGALES */}
          <footer ref={footerRef} className="section footer-section" id="contact" style={{ backgroundColor: '#070A18' }}>
            <div className="footer-huge-wordmark">
              <h1 ref={giantMavkaRef} className="giant-mavka font-heading" style={{ color: '#ffffff', fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
                ARCA DE LA ALIANZA
              </h1>
            </div>

            {/* SECCIÓN OBLIGATORIA 7.7: TRANSPARENCIA Y POLÍTICAS LEGALES */}
            <div style={{ background: '#0D132D', border: '1px solid rgba(227, 206, 104, 0.25)', borderRadius: '24px', padding: '32px 28px', margin: '20px 0 36px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <span className="capsule-tag" style={{ backgroundColor: '#E3CE68', color: '#101633', fontWeight: '800' }}>
                    APARTADO INSTITUCIONAL OFICIAL
                  </span>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginTop: '6px' }}>
                    Transparencia y Políticas Legales
                  </h3>
                </div>
                <p style={{ fontSize: '13px', color: '#A1A8C5', maxWidth: '580px', margin: 0 }}>
                  Consulta los documentos completos aprobados por la Fundación que respaldan nuestro compromiso institucional con la transparencia, la protección de datos personales y la administración ética de los recursos.
                </p>
              </div>

              {/* Legal Links Buttons */}
              <div className="legal-footer-nav-list">
                <button
                  type="button"
                  onClick={() => openLegalDocument('privacidad')}
                  className="legal-footer-btn"
                >
                  <span>📜</span>
                  <span>Política de Tratamiento de Datos Personales y Privacidad</span>
                </button>

                <button
                  type="button"
                  onClick={() => openLegalDocument('terminos')}
                  className="legal-footer-btn"
                >
                  <span>⚖️</span>
                  <span>Términos y Condiciones de Uso</span>
                </button>

                <button
                  type="button"
                  onClick={() => openLegalDocument('aviso')}
                  className="legal-footer-btn"
                >
                  <span>🔒</span>
                  <span>Aviso de Privacidad</span>
                </button>

                <button
                  type="button"
                  onClick={() => openLegalDocument('donaciones')}
                  className="legal-footer-btn"
                >
                  <span>💛</span>
                  <span>Política de Donaciones y Aportes Solidarios</span>
                </button>

                <button
                  type="button"
                  onClick={() => openLegalDocument('institucional')}
                  className="legal-footer-btn"
                >
                  <span>🌐</span>
                  <span>Información Institucional Binacional (Colombia &amp; EE.UU.)</span>
                </button>

                <button
                  type="button"
                  onClick={() => openLegalDocument('etica')}
                  className="legal-footer-btn"
                >
                  <span>🛡️</span>
                  <span>Política de Transparencia, Ética y Buen Gobierno</span>
                </button>
              </div>
            </div>

            {/* Official Binational Contact Cards Grid */}
            <div className="footer-cards-grid">
              {/* Colombia Office Card */}
              <div className="footer-card" style={{ backgroundColor: '#0F1535', borderColor: 'rgba(227, 206, 104, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '18px' }}>🇨🇴</span>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#E3CE68', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    SEDE COLOMBIA
                  </span>
                </div>
                <h3 className="footer-card-title" style={{ fontSize: '18px' }}>
                  {BINACIONAL_INFO.colombia.razonSocial}
                </h3>
                <p style={{ fontSize: '12.5px', color: '#C2C8DD', lineHeight: '1.5', marginBottom: '10px' }}>
                  NIT: {BINACIONAL_INFO.colombia.nit}<br />
                  {BINACIONAL_INFO.colombia.direccion}<br />
                  Directora: {BINACIONAL_INFO.colombia.representante}
                </p>
                <a href={`mailto:${BINACIONAL_INFO.colombia.correo}`} className="contact-link email-link" style={{ color: '#E3CE68' }}>
                  {BINACIONAL_INFO.colombia.correo}
                </a>
                <a href={`tel:${BINACIONAL_INFO.colombia.telefono.replace(/\s+/g, '')}`} className="contact-link phone-link">
                  {BINACIONAL_INFO.colombia.telefono}
                </a>
              </div>

              {/* USA Office Card */}
              <div className="footer-card" style={{ backgroundColor: '#0F1535', borderColor: 'rgba(227, 206, 104, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '18px' }}>🇺🇸</span>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#E3CE68', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    SEDE ESTADOS UNIDOS
                  </span>
                </div>
                <h3 className="footer-card-title" style={{ fontSize: '18px' }}>
                  {BINACIONAL_INFO.usa.razonSocial}
                </h3>
                <p style={{ fontSize: '12.5px', color: '#C2C8DD', lineHeight: '1.5', marginBottom: '10px' }}>
                  EIN / Tax ID: {BINACIONAL_INFO.usa.ein}<br />
                  Registro: {BINACIONAL_INFO.usa.registro} (Florida Active)<br />
                  Presidenta: {BINACIONAL_INFO.usa.representante}
                </p>
                <a href={`mailto:${BINACIONAL_INFO.usa.correo}`} className="contact-link email-link" style={{ color: '#E3CE68' }}>
                  {BINACIONAL_INFO.usa.correo}
                </a>
                <a href={`tel:${BINACIONAL_INFO.usa.telefono.replace(/\s+/g, '')}`} className="contact-link phone-link">
                  {BINACIONAL_INFO.usa.telefono}
                </a>
              </div>

              {/* Social Networks & Digital Presence */}
              <div className="footer-card" style={{ backgroundColor: '#0F1535', borderColor: 'rgba(227, 206, 104, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '18px' }}>📱</span>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#E3CE68', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    PRESENCIA DIGITAL
                  </span>
                </div>
                <h3 className="footer-card-title" style={{ fontSize: '18px' }}>
                  CONÉCTATE CON NUESTRA MISIÓN
                </h3>
                <p style={{ fontSize: '12.5px', color: '#C2C8DD', marginBottom: '14px' }}>
                  Síguenos en Instagram para conocer testimonios y avances de las misiones:
                </p>
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
            </div>

            {/* Bottom Footer Details */}
            <div className="footer-meta-row">
              <form
                className="newsletter-capsule"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('¡Gracias por unirte a la red binacional de Fundación Arca de la Alianza!');
                }}
              >
                <input
                  type="email"
                  placeholder="Suscríbete al boletín solidario binacional"
                  required
                  className="newsletter-input"
                />
                <button
                  type="submit"
                  className="newsletter-submit-btn"
                  style={{ backgroundColor: '#E3CE68', color: '#101633' }}
                  aria-label="Suscribirse"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>

              <div className="footer-address">
                <p><strong>Fundación Arca de la Alianza (Colombia) &amp; Arca de la Alianza Inc. (EE.UU.)</strong></p>
                <p>NIT: 901.689.340-5 · EIN: 82-5293343 · ESAL Social y Comunitaria</p>
                <p className="vat-no" style={{ color: '#E3CE68' }}>arcadelaalianza.org</p>
              </div>
            </div>

            {/* Bottom Banner (Mantra Institucional) */}
            <div className="footer-banner-bar" style={{ backgroundColor: '#101633', borderColor: 'rgba(227, 206, 104, 0.25)' }}>
              <div className="banner-asterisk" style={{ color: '#E3CE68' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="2" x2="12" y2="22"></line>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                  <line x1="19.07" y1="4.93" x2="4.93" y2="19.07"></line>
                </svg>
              </div>
              <div className="banner-text font-serif-quote">
                {FILOSOFIA_INSTITUCIONAL}
              </div>
              <button
                type="button"
                className="banner-meet-btn"
                style={{ backgroundColor: '#E3CE68', color: '#101633', fontWeight: '800' }}
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
          </footer>
        </main>

      {/* ==========================================================================
          INTERACTIVE LEGAL DOCUMENTS MODAL (SECCIÓN 7.7 REQUISITOS)
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
            {/* Header */}
            <div className="legal-modal-header">
              <div>
                <span className="capsule-tag" style={{ backgroundColor: '#E3CE68', color: '#101633', fontSize: '11px', fontWeight: '800' }}>
                  TRANSPARENCIA &amp; DOCUMENTOS LEGALES
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>
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
                <h2 className="legal-doc-title font-heading">
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
                    style={{ background: '#E3CE68', color: '#101633', border: 'none', borderRadius: '9999px', padding: '8px 20px', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}
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
          INTERACTIVE DONATION & CONTACT MODAL (CON CUENTA OFICIAL USA)
          ========================================================================== */}
      {isModalOpen && (
        <div
          id="contact-modal"
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target.id === 'contact-modal') setIsModalOpen(false);
          }}
        >
          <div className="modal-card" style={{ backgroundColor: '#0F1535', borderColor: 'rgba(227, 206, 104, 0.3)', maxWidth: '580px' }}>
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

            <span className="capsule-tag" style={{ backgroundColor: '#E3CE68', color: '#101633', fontWeight: '800' }}>
              FUNDACIÓN ARCA DE LA ALIANZA · COLOMBIA &amp; EE.UU.
            </span>
            <h3 className="modal-title font-heading" style={{ color: '#ffffff' }}>
              Sumar Apoyo / Donar
            </h3>
            <p className="modal-sub">
              Tu solidaridad transforma vidas. Puedes realizar un aporte bancario oficial en Estados Unidos, sumarte como voluntario o apoyar programas en Colombia.
            </p>

            {/* Quick Bank Details USA */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(227, 206, 104, 0.3)', borderRadius: '16px', padding: '14px 18px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#E3CE68', textTransform: 'uppercase' }}>
                  CUENTA BANCARIA OFICIAL (REGIONS BANK - EE.UU.)
                </span>
                <button
                  type="button"
                  onClick={handleCopyBankAccount}
                  style={{ background: '#E3CE68', color: '#101633', border: 'none', borderRadius: '6px', padding: '3px 10px', fontSize: '10.5px', fontWeight: '800', cursor: 'pointer' }}
                >
                  {copiedBank ? '¡Copiado!' : 'Copiar Cuenta'}
                </button>
              </div>
              <div style={{ fontSize: '12.5px', color: '#ffffff' }}>
                <strong>Cuenta Corriente:</strong> <span style={{ fontFamily: 'monospace', color: '#E3CE68' }}>0263760061</span> · <strong>Routing:</strong> 063104668<br />
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
              <div className="form-group">
                <label className="form-label">Nombre Completo o Empresa</label>
                <input type="text" required placeholder="Tu nombre o entidad" className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Correo Electrónico o Teléfono</label>
                <input type="text" required placeholder="correo@ejemplo.com o teléfono" className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Línea de Interés / Modalidad de Apoyo</label>
                <select
                  className="form-input form-select"
                  value={modalLineInterest}
                  onChange={(e) => setModalLineInterest(e.target.value)}
                >
                  <option value="Donación / Aporte General">Donación Económica General</option>
                  <option value="Donación Colombia">Donación en Colombia (NIT 901.689.340-5)</option>
                  <option value="Donación USA">Donación en Estados Unidos (Regions Bank)</option>
                  <option value="Donación en Especie">Donación en Especie (Ropa, Útiles, Juguetes, Muebles)</option>
                  <option value="Mamita Déjalo Latir">Programa: Mamita Déjalo Latir (Maternidad &amp; Embarazo)</option>
                  <option value="El Niño De Belén">Programa: El Niño De Belén (Juguetes &amp; Útiles Escolares)</option>
                  <option value="Dando Amor a Nuestros Amigos de la Calle">Iniciativa: Dando Amor a Nuestros Amigos de la Calle</option>
                  <option value="Banco de Ropa">Campaña: Banco de Ropa (Donatón)</option>
                  <option value="Misioneros">Iniciativa: Misioneros &amp; Construcción Comunitaria</option>
                  <option value="Turismo Misionero">Proyecto: Turismo Misionero (Viajar con Propósito)</option>
                  <option value="Escuela de Formación">Proyecto: Escuela de Formación para la Vida y el Trabajo</option>
                  <option value="Construcción Centro Integral">Proyecto: Construcción Centro Integral Arca de la Alianza</option>
                  <option value="Alianza Estratégica / Donación Corporativa">Alianza Estratégica / Donación Corporativa (RSC)</option>
                  <option value="Voluntariado en Territorio">Voluntariado (Nacional / Internacional)</option>
                  <option value="Certificados y Transparencia">Certificado de Donación / Beneficio Tributario</option>
                  <option value="Consulta General">Consulta General / Información Institucional</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Mensaje o Propuesta</label>
                <textarea rows={3} placeholder="¿Cómo te gustaría colaborar o en qué podemos apoyarte?" className="form-input"></textarea>
              </div>

              {/* Mandatory Privacy Notice and Authorization (Sección 7.7) */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', margin: '4px 0 10px' }}>
                <input type="checkbox" id="privacy-consent" required style={{ marginTop: '3px' }} />
                <label htmlFor="privacy-consent" style={{ fontSize: '11.5px', color: '#A1A8C5', lineHeight: '1.4' }}>
                  Autorizo el tratamiento de mis datos personales de acuerdo con la{' '}
                  <button
                    type="button"
                    onClick={() => openLegalDocument('privacidad')}
                    style={{ background: 'none', border: 'none', color: '#E3CE68', padding: 0, textDecoration: 'underline', cursor: 'pointer', fontSize: '11.5px' }}
                  >
                    Política de Tratamiento de Datos
                  </button>{' '}
                  de la Fundación para gestionar mi solicitud.
                </label>
              </div>

              <button
                type="submit"
                className="form-submit-btn font-heading"
                style={{ backgroundColor: '#E3CE68', color: '#101633', fontWeight: '800' }}
              >
                Enviar Mensaje Solidario
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

