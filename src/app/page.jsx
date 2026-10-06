'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default function ArcaDeLaAlianzaPage() {
  const [isFrameMode, setIsFrameMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeService, setActiveService] = useState('02');
  const [projectsCount, setProjectsCount] = useState(0);
  const [ratingCount, setRatingCount] = useState('0.0');

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
      // A. HERO KINETIC SCROLL SCRUB
      const heroEl = heroRef.current;
      const heroTitle = heroTitleRef.current;
      const heroArt = heroArtworkRef.current;

      if (heroEl && heroTitle) {
        const topSlice = heroTitle.querySelector('.slice-top');
        const midSlice = heroTitle.querySelector('.slice-mid');
        const botSlice = heroTitle.querySelector('.slice-bottom');

        // Initial entrance
        gsap.fromTo(
          [topSlice, midSlice, botSlice],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out' }
        );

        // Scroll scrub: slices drift horizontally as you scroll
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroEl,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        if (topSlice) heroTl.to(topSlice, { x: -60, ease: 'none' }, 0);
        if (midSlice) heroTl.to(midSlice, { x: 75, ease: 'none' }, 0);
        if (botSlice) heroTl.to(botSlice, { x: -40, ease: 'none' }, 0);
        if (heroArt) heroTl.to(heroArt, { scale: 1.08, y: 30, ease: 'none' }, 0);
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

      // E. TIMELINE PINNED HORIZONTAL SCROLL SCRUB
      const tlSection = timelineRef.current;
      const tlTrack = timelineTrackRef.current;
      if (tlSection && tlTrack && window.innerWidth > 768) {
        const scrollDistance = tlTrack.scrollWidth - tlTrack.clientWidth;
        if (scrollDistance > 0) {
          gsap.to(tlTrack, {
            x: -scrollDistance - 80,
            ease: 'none',
            scrollTrigger: {
              trigger: tlSection,
              pin: true,
              scrub: 1,
              start: 'top top',
              end: () => `+=${scrollDistance + 350}`,
              invalidateOnRefresh: true,
            },
          });
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
          { yPercent: 30, opacity: 0.2, scale: 0.92 },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footEl,
              start: 'top 80%',
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

      {/* Presentation Mode Toggle Header Bar (Dribbble Frame / Full View) */}
      <div className="presentation-controls">
        <div className="controls-left">
          <span className="pulse-indicator" style={{ backgroundColor: '#E7CD54', boxShadow: '0 0 10px #E7CD54' }}></span>
          <span className="controls-title">FUNDACIÓN EL ARCA DE LA ALIANZA</span>
        </div>
        <div className="controls-right">
          <button
            type="button"
            className="ctrl-btn"
            onClick={() => {
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }}
            title="Auto scroll showcase"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Auto Tour
          </button>
          <button
            type="button"
            className={`ctrl-btn ${isFrameMode ? 'active' : ''}`}
            onClick={() => setIsFrameMode(!isFrameMode)}
            title="Toggle Frame mode"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
            {isFrameMode ? 'Marco Dribbble' : 'Pantalla Completa'}
          </button>
        </div>
      </div>

      {/* Main Outer Container (Mockup Bezel Frame as in Dribbble Video) */}
      <div id="mockup-frame" className={`mockup-frame ${!isFrameMode ? 'full-mode' : ''}`}>
        <div className="inner-viewport" id="viewport">
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
                <a href="#about" className="nav-item">
                  Nosotros
                </a>
                <a href="#work" className="nav-item">
                  Programas
                </a>
                <a href="#services" className="nav-item">
                  Acción
                </a>
                <a href="#timeline" className="nav-item">
                  Trayectoria
                </a>
                <a href="#contact" className="nav-item">
                  Contacto
                </a>
              </div>
              <button
                type="button"
                className="nav-contact-btn"
                onClick={() => setIsModalOpen(true)}
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

          {/* 1. HERO SECTION (Dark Navy with Kinetic Sliced Typography) */}
          <section ref={heroRef} className="section hero-section" id="hero">
            <div className="hero-header-meta">
              <span className="hero-tag" style={{ color: '#E7CD54' }}>
                ORGANIZACIÓN SOCIAL &amp; SOLIDARIA
              </span>
            </div>

            {/* Massive Title with Sliced Kinetic Typography Effect */}
            <div className="hero-title-container" id="hero-title-trigger">
              <div ref={heroTitleRef} className="sliced-title-group animating" data-title="EL ARCA">
                <h1 className="hero-main-title">EL ARCA DE LA ALIANZA</h1>
                <div className="slice slice-top" aria-hidden="true">
                  EL ARCA DE LA ALIANZA
                </div>
                <div className="slice slice-mid" aria-hidden="true">
                  EL ARCA DE LA ALIANZA
                </div>
                <div className="slice slice-bottom" aria-hidden="true">
                  EL ARCA DE LA ALIANZA
                </div>
              </div>
              <div className="hero-subtitle-meta">
                CONSTRUYENDO ESPERANZA,
                <br />
                TRANSFORMANDO COMUNIDADES
              </div>
            </div>

            {/* Hero Illustration Artwork Container */}
            <div className="hero-stage">
              <img
                ref={heroArtworkRef}
                src="/assets/hero_clean_art.png"
                alt="Encuentro de celebración, esperanza y mesa compartida de Fundación El Arca de la Alianza"
                className="hero-artwork-img"
                id="hero-artwork"
              />
              {/* Ambient particle canvas */}
              <canvas ref={canvasRef} id="sparkles-canvas" className="sparkles-canvas"></canvas>
            </div>
          </section>

          {/* 2. STATEMENT & FEATURED WORK SECTION (White Card) */}
          <section ref={statementRef} className="section white-card-section" id="about">
            {/* Sliced Typography Headline */}
            <div className="statement-container">
              <div className="sliced-statement-wrapper">
                <div className="sliced-block glitching" data-text="CONSTRUYENDO">
                  <h2 className="statement-line" style={{ color: '#262F66' }}>
                    CONSTRUYENDO
                  </h2>
                  <div className="slice slice-top">CONSTRUYENDO</div>
                  <div className="slice slice-bottom">CONSTRUYENDO</div>
                </div>
                <div className="sliced-block glitching" data-text="ESPERANZA Y">
                  <h2 className="statement-line" style={{ color: '#262F66' }}>
                    ESPERANZA Y
                  </h2>
                  <div className="slice slice-top">ESPERANZA Y</div>
                  <div className="slice slice-bottom">ESPERANZA Y</div>
                </div>
                <div className="sliced-block glitching" data-text="FUTURO DIGNO">
                  <h2 className="statement-line" style={{ color: '#E7CD54' }}>
                    FUTURO DIGNO
                  </h2>
                  <div className="slice slice-top">FUTURO DIGNO</div>
                  <div className="slice slice-bottom">FUTURO DIGNO</div>
                </div>
              </div>
              <div className="statement-description">
                <p style={{ color: '#3A3A3A', fontSize: '16px', lineHeight: 1.6 }}>
                  En la <strong>Fundación El Arca de la Alianza</strong> articulamos voluntades, recursos y corazones para
                  brindar oportunidades tangibles a familias y comunidades vulnerables. Diseñamos programas sostenibles
                  que generan un impacto humano duradero.
                </p>
              </div>
            </div>

            {/* Featured Work Grid */}
            <div ref={workRef} className="featured-work-container" id="work">
              <h3 className="section-title" style={{ color: '#262F66' }}>
                PROGRAMAS
                <br />
                DESTACADOS
              </h3>

              <div className="work-grid">
                {/* Left Column Card: Programa Nutricional y Familiar */}
                <div
                  className="work-card large-card holiday-magic-card"
                  data-work="nutricion"
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className="card-media-wrapper">
                    <img src="/assets/work_holiday_magic.png" alt="Programa Nutrición y Bienestar Familiar" className="card-img" />
                  </div>
                </div>

                {/* Right Column Top Card: Desarrollo Infantil */}
                <div className="work-card teamtrek-card" data-work="infancia" onClick={() => setIsModalOpen(true)}>
                  <div className="card-media-wrapper">
                    <img
                      src="/assets/work_teamtrek.png"
                      alt="Jornadas de Inspiración y Desarrollo Infantil"
                      className="card-img"
                    />
                  </div>
                </div>

                {/* Mid text block */}
                <div className="work-text-block">
                  <h4 className="work-text-title" style={{ color: '#262F66' }}>
                    CÓMO TRANSFORMAMOS
                    <br />
                    CADA COMUNIDAD
                  </h4>
                  <p className="work-text-p" style={{ color: '#3A3A3A' }}>
                    Nuestra metodología combina intervención directa, acompañamiento psicosocial, educación en valores y
                    alianzas estratégicas con empresas y líderes sociales.
                  </p>
                </div>

                {/* Right Column Mid Card: Alianzas y Líderes */}
                <div className="work-card influence-card" data-work="alianzas" onClick={() => setIsModalOpen(true)}>
                  <div className="card-media-wrapper">
                    <img
                      src="/assets/work_influence.png"
                      alt="Cumbre de Alianzas Estratégicas y Donantes"
                      className="card-img"
                    />
                  </div>
                </div>

                {/* Right Column Bottom Card: Innovación Social */}
                <div className="work-card innovation-card" data-work="innovacion" onClick={() => setIsModalOpen(true)}>
                  <div className="card-media-wrapper">
                    <img
                      src="/assets/work_innovation.png"
                      alt="Iniciativas de Progreso e Innovación Social"
                      className="card-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. SERVICES SECTION (Black/Navy Card) */}
          <section ref={servicesRef} className="section black-card-section" id="services">
            <div className="services-header">
              <h2 className="services-headline">
                TRANSFORMAMOS VIDAS
                <br />
                EN REALIDADES!
              </h2>
              <p className="services-sub">
                Nuestros equipos interdisciplinarios y voluntarios trabajan día a día para crear puentes de esperanza,
                salud y desarrollo integral donde más se necesita.
              </p>
            </div>

            {/* Interactive Services List with Thumbnails */}
            <div className="services-list" id="services-list">
              {/* 01/ APOYO NUTRICIONAL */}
              <div
                className={`service-item ${activeService === '01' ? 'active-hover' : ''}`}
                data-index="01"
                onMouseEnter={() => setActiveService('01')}
                onClick={() => setIsModalOpen(true)}
              >
                <span className="service-num" style={{ color: '#E7CD54' }}>
                  01/
                </span>
                <div className="service-name-wrap">
                  <span className="service-name">APOYO NUTRICIONAL</span>
                </div>
                <div className="service-thumb-wrap">
                  <img src="/assets/service_cake.png" alt="Gestión de Alimentos y Nutrición" className="service-thumb" />
                </div>
              </div>

              {/* 02/ DESARROLLO INFANTIL */}
              <div
                className={`service-item ${activeService === '02' ? 'active-hover' : ''}`}
                data-index="02"
                onMouseEnter={() => setActiveService('02')}
                onClick={() => setIsModalOpen(true)}
              >
                <span className="service-num" style={{ color: '#E7CD54' }}>
                  02/
                </span>
                <div className="service-thumb-wrap">
                  <img src="/assets/service_martini.png" alt="Acompañamiento a Niños y Familias" className="service-thumb" />
                </div>
                <div className="service-name-wrap">
                  <span className="service-name">DESARROLLO INFANTIL</span>
                </div>
              </div>

              {/* 03/ ALIANZAS ESTRATÉGICAS */}
              <div
                className={`service-item ${activeService === '03' ? 'active-hover' : ''}`}
                data-index="03"
                onMouseEnter={() => setActiveService('03')}
                onClick={() => setIsModalOpen(true)}
              >
                <span className="service-num" style={{ color: '#E7CD54' }}>
                  03/
                </span>
                <div className="service-name-wrap">
                  <span className="service-name">ALIANZAS ESTRATÉGICAS</span>
                </div>
                <div className="service-thumb-wrap">
                  <img src="/assets/service_conf.png" alt="Encuentros y Redes Solidarias" className="service-thumb" />
                </div>
              </div>

              {/* 04/ VOLUNTARIADO Y SOLIDARIDAD */}
              <div
                className={`service-item ${activeService === '04' ? 'active-hover' : ''}`}
                data-index="04"
                onMouseEnter={() => setActiveService('04')}
                onClick={() => setIsModalOpen(true)}
              >
                <span className="service-num" style={{ color: '#E7CD54' }}>
                  04/
                </span>
                <div className="service-thumb-wrap">
                  <img src="/assets/service_disco.png" alt="Voluntariado y Acción Comunitaria" className="service-thumb" />
                </div>
                <div className="service-name-wrap">
                  <span className="service-name">VOLUNTARIADO ACTIVO</span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. TIMELINE SECTION (White Card) */}
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
                  <img src="/assets/timeline_gift.png" alt="Fundación y Primeras Alianzas" className="timeline-gift-img" />
                </div>
                <div className="timeline-info">
                  <h3 className="timeline-step-title" style={{ color: '#262F66' }}>
                    NACIMIENTO DE
                    <br />
                    LA ALIANZA (2021)
                  </h3>
                  <p className="timeline-step-p" style={{ color: '#3A3A3A' }}>
                    Comenzamos con una visión clara: ser un arca de protección y esperanza para quienes más lo necesitan,
                    articulando las primeras 15 brigadas de ayuda social.
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
                    EXPANSIÓN
                    <br />
                    Y PROGRAMAS
                    <br />
                    SOSTENIBLES
                  </h3>
                  <p className="concept-card-p">
                    Consolidación de alianzas con entidades públicas y privadas. Apertura de centros de refuerzo escolar y
                    comedores comunitarios asistidos.
                  </p>
                  <button
                    type="button"
                    className="meet-team-btn"
                    style={{ backgroundColor: '#E7CD54', color: '#101633' }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Conoce el Equipo
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

              {/* Step 3 & 4 */}
              <div className="timeline-card-col">
                <div className="timeline-info" style={{ marginTop: '40px' }}>
                  <h3 className="timeline-step-title" style={{ color: '#262F66' }}>
                    IMPACTO NACIONAL &amp;
                    <br />
                    FUTURO DIGNO (2024)
                  </h3>
                  <p className="timeline-step-p" style={{ color: '#3A3A3A' }}>
                    Más de 300 proyectos ejecutados, cientos de voluntarios comprometidos y un legado de dignidad que sigue
                    creciendo cada día.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. PEOPLE & STATS SECTION */}
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
              {/* Card 1: Boletín / Noticias (Navy / Purple) */}
              <div className="stat-card-wrapper card-blog">
                <div className="card-black-roof">
                  <span className="capsule-tag" style={{ backgroundColor: '#262F66', color: '#fff' }}>
                    COMUNIDAD
                  </span>
                </div>
                <div className="card-colored-body purple-body" style={{ background: 'linear-gradient(135deg, #262F66, #37438A)' }}>
                  <p className="card-desc">Conoce los testimonios, historias de superación y próximas jornadas de nuestra fundación.</p>
                  <div className="card-bottom-action">
                    <span className="action-label">
                      HISTORIAS
                      <br />
                      DE IMPACTO
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="circle-action-btn"
                      style={{ backgroundColor: '#E7CD54', color: '#101633' }}
                      aria-label="Ver historias"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: Proyectos Exitosos (Yellow / Gold) */}
              <div className="stat-card-wrapper card-success">
                <div className="card-black-roof">
                  <span className="capsule-tag" style={{ backgroundColor: '#101633', color: '#E7CD54' }}>
                    LOGROS
                  </span>
                </div>
                <div className="card-colored-body yellow-body" style={{ backgroundColor: '#E7CD54' }}>
                  <span className="counter-label" style={{ color: '#101633' }}>
                    PROYECTOS
                    <br />
                    CULMINADOS
                  </span>
                  <div className="counter-value" id="counter-projects" style={{ color: '#101633' }}>
                    {projectsCount}
                  </div>
                </div>
              </div>

              {/* Card 3: Confianza y Calificación (Warm Blue / Slate) */}
              <div className="stat-card-wrapper card-confidence">
                <div className="card-black-roof">
                  <span className="capsule-tag" style={{ backgroundColor: '#262F66', color: '#fff' }}>
                    TRANSPARENCIA
                  </span>
                </div>
                <div className="card-colored-body peach-body" style={{ background: 'linear-gradient(135deg, #1A2250, #262F66)' }}>
                  <div className="rating-value" id="counter-rating" style={{ color: '#E7CD54' }}>
                    {ratingCount}
                    <span className="star-glyph">★</span>
                  </div>
                  <span className="rating-sub" style={{ color: '#ffffff' }}>
                    ÍNDICE DE
                    <br />
                    CONFIANZA Y
                    <br />
                    TRANSPARENCIA
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 6. FOOTER SECTION (Deep Midnight Navy) */}
          <footer ref={footerRef} className="section footer-section" id="contact" style={{ backgroundColor: '#070A18' }}>
            <div className="footer-huge-wordmark">
              <h1 ref={giantMavkaRef} className="giant-mavka" style={{ color: 'rgba(231, 205, 84, 0.08)' }}>
                EL ARCA
              </h1>
            </div>

            <div className="footer-cards-grid">
              {/* Social Networks Card */}
              <div className="footer-card" style={{ backgroundColor: '#0F1535', borderColor: 'rgba(231, 205, 84, 0.15)' }}>
                <h3 className="footer-card-title">
                  SÍGUENOS EN REDES
                  <br />
                  SOCIALES
                </h3>
                <div className="social-icons-row">
                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="Instagram"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="Facebook"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="WhatsApp"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Contact Us Card */}
              <div className="footer-card" style={{ backgroundColor: '#0F1535', borderColor: 'rgba(231, 205, 84, 0.15)' }}>
                <h3 className="footer-card-title">CANALES DE CONTACTO</h3>
                <a href="mailto:contacto@arcadelaalianza.org" className="contact-link email-link" style={{ color: '#E7CD54' }}>
                  CONTACTO@ARCADELAALIANZA.ORG
                </a>
                <a href="tel:+573001234567" className="contact-link phone-link">
                  +57 (300) 123-4567
                </a>
              </div>
            </div>

            {/* Bottom Footer Details */}
            <div className="footer-meta-row">
              <form
                className="newsletter-capsule"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('¡Gracias por unirte a la red de Fundación El Arca de la Alianza!');
                }}
              >
                <input
                  type="email"
                  placeholder="Suscríbete a nuestro boletín solidario"
                  required
                  className="newsletter-input"
                />
                <button
                  type="submit"
                  className="newsletter-submit-btn"
                  style={{ backgroundColor: '#E7CD54', color: '#101633' }}
                  aria-label="Suscribirse"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>

              <div className="footer-address">
                <p><strong>Fundación El Arca de la Alianza</strong></p>
                <p>Transformación, Solidaridad y Esperanza Social</p>
                <p className="vat-no" style={{ color: '#E7CD54' }}>arcadelaalianza.org</p>
              </div>
            </div>

            {/* Bottom Banner (Sumar Apoyo) */}
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
                ¿Deseas sumar como aliado, empresa o voluntario? Únete hoy a nuestra misión de esperanza.
              </div>
              <button
                type="button"
                className="banner-meet-btn"
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
          </footer>
        </div>
      </div>

      {/* Interactive Contact / Meeting Modal */}
      {isModalOpen && (
        <div
          id="contact-modal"
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target.id === 'contact-modal') setIsModalOpen(false);
          }}
        >
          <div className="modal-card" style={{ backgroundColor: '#0F1535', borderColor: 'rgba(231, 205, 84, 0.3)' }}>
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
            <span className="capsule-tag" style={{ backgroundColor: '#E7CD54', color: '#101633' }}>
              FUNDACIÓN EL ARCA
            </span>
            <h3 className="modal-title" style={{ color: '#ffffff' }}>
              Unirse o Contactar
            </h3>
            <p className="modal-sub">
              Cuéntanos sobre tu interés: voluntariado, donación, alianza corporativa o información general.
            </p>

            <form
              className="modal-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert('¡Gracias por tu mensaje! El equipo de Fundación El Arca de la Alianza se comunicará contigo pronto.');
                setIsModalOpen(false);
              }}
            >
              <div className="form-group">
                <label className="form-label">Nombre Completo o Empresa</label>
                <input type="text" required placeholder="Tu nombre o empresa" className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Correo Electrónico o Teléfono</label>
                <input type="text" required placeholder="correo@ejemplo.com o teléfono" className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Línea de Interés</label>
                <select className="form-input form-select" defaultValue="Alianza Corporativa">
                  <option>Alianza Corporativa / Donación</option>
                  <option>Voluntariado Activo</option>
                  <option>Programa de Nutrición y Salud</option>
                  <option>Desarrollo Infantil y Educación</option>
                  <option>Consulta General</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Mensaje o Propuesta</label>
                <textarea rows={3} placeholder="¿Cómo te gustaría colaborar o en qué podemos apoyarte?" className="form-input"></textarea>
              </div>

              <button
                type="submit"
                className="form-submit-btn"
                style={{ backgroundColor: '#E7CD54', color: '#101633', fontWeight: '800' }}
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
