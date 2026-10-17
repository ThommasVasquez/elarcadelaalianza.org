'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const ROTATING_WORDS = ['DIGNIDAD.', 'CAPACIDAD.', 'COMUNIDAD.', 'ESPERANZA.'];

const FILOSOFIA_INSTITUCIONAL = '«Servimos con amor, transformamos con esperanza y construimos juntos un futuro con dignidad y oportunidades para todos».';

const VALORES_INSTITUCIONALES = [
  {
    num: '01',
    title: 'Amor y solidaridad',
    desc: 'Servimos con amor, sensibilidad y vocación, brindando apoyo a quienes más lo necesitan y promoviendo una cultura de ayuda mutua.',
  },
  {
    num: '02',
    title: 'Respeto y dignidad humana',
    desc: 'Reconocemos el valor de cada persona, sin distinción de género, edad, origen, cultura, religión o condición social.',
  },
  {
    num: '03',
    title: 'Compromiso social',
    desc: 'Trabajamos con responsabilidad y dedicación para mejorar las condiciones de vida de las comunidades más vulnerables.',
  },
  {
    num: '04',
    title: 'Empatía y compasión',
    desc: 'Escuchamos, comprendemos y acompañamos las realidades de quienes enfrentan situaciones difíciles, ofreciendo un trato humano y cercano.',
  },
  {
    num: '05',
    title: 'Honestidad y transparencia',
    desc: 'Actuamos con integridad y responsabilidad en la administración de los recursos, las relaciones institucionales y el desarrollo de proyectos.',
  },
  {
    num: '06',
    title: 'Inclusión y equidad',
    desc: 'Promovemos la igualdad de oportunidades, la participación y el reconocimiento de la diversidad cultural y social.',
  },
  {
    num: '07',
    title: 'Esperanza y transformación',
    desc: 'Creemos en la capacidad de las personas para superar las adversidades, reconstruir sus proyectos de vida y forjar un futuro mejor.',
  },
  {
    num: '08',
    title: 'Trabajo en comunidad',
    desc: 'Fomentamos la cooperación, la participación ciudadana y la construcción de redes de apoyo que generen cambios sostenibles.',
  },
];

const PRINCIPIOS_INSTITUCIONALES = [
  {
    num: '01',
    title: 'Primacía de la dignidad humana',
    desc: 'Toda intervención debe reconocer y proteger los derechos fundamentales de las personas.',
  },
  {
    num: '02',
    title: 'Servicio desinteresado',
    desc: 'Nuestra labor está orientada al bienestar colectivo y no al beneficio económico particular.',
  },
  {
    num: '03',
    title: 'Participación comunitaria',
    desc: 'Reconocemos a las comunidades como verdaderas protagonistas de su propio desarrollo.',
  },
  {
    num: '04',
    title: 'Autonomía y empoderamiento',
    desc: 'Promovemos capacidades y herramientas para que las personas construyan sus propios proyectos de vida.',
  },
  {
    num: '05',
    title: 'Responsabilidad y transparencia',
    desc: 'Administramos los recursos de manera ética, eficiente y orientada al cumplimiento de nuestra misión.',
  },
  {
    num: '06',
    title: 'Respeto por la diversidad',
    desc: 'Valoramos las tradiciones, culturas, creencias y formas de vida de cada comunidad.',
  },
  {
    num: '07',
    title: 'Sostenibilidad social',
    desc: 'Buscamos que nuestros proyectos generen beneficios duraderos y fortalezcan las capacidades locales.',
  },
  {
    num: '08',
    title: 'Construcción de alianzas',
    desc: 'Impulsamos el trabajo conjunto con organizaciones, instituciones, empresas y personas comprometidas.',
  },
];

const OBJETIVOS_ESPECIFICOS = [
  {
    num: '01',
    title: 'Calidad de vida en poblaciones vulnerables',
    desc: 'Desarrollar programas sociales que contribuyan al bienestar integral de mujeres, niños, niñas, adolescentes, adultos mayores, comunidades indígenas, habitantes de calle y familias.',
  },
  {
    num: '02',
    title: 'Acompañamiento psicosocial y bienestar emocional',
    desc: 'Implementar estrategias de orientación, prevención y atención psicosocial que promuevan la salud emocional, fortalecimiento familiar, autoestima y proyectos de vida.',
  },
  {
    num: '03',
    title: 'Educación y formación para el desarrollo humano',
    desc: 'Generar oportunidades de aprendizaje y capacitación para fortalecer habilidades personales, sociales, laborales y productivas fomentando la autonomía.',
  },
  {
    num: '04',
    title: 'Emprendimiento y oportunidades económicas',
    desc: 'Impulsar iniciativas de emprendimiento, formación para el trabajo y proyectos productivos que contribuyan a la independencia económica y sostenibilidad.',
  },
  {
    num: '05',
    title: 'Participación y desarrollo comunitario',
    desc: 'Promover la organización, solidaridad, liderazgo y trabajo colaborativo, fortaleciendo redes de apoyo y participación ciudadana activa.',
  },
  {
    num: '06',
    title: 'Inclusión social y derechos humanos',
    desc: 'Desarrollar acciones orientadas a prevenir la discriminación, exclusión, violencia y desigualdades, garantizando el respeto por la dignidad.',
  },
  {
    num: '07',
    title: 'Identidad cultural y tradiciones comunitarias',
    desc: 'Apoyar iniciativas culturales, artísticas, artesanales y de turismo comunitario responsable para reconocer saberes ancestrales y conservar el patrimonio.',
  },
  {
    num: '08',
    title: 'Solidaridad y ayuda humanitaria',
    desc: 'Gestionar y desarrollar campañas de apoyo, donaciones y asistencia social para necesidades básicas de poblaciones vulnerables y emergencias.',
  },
  {
    num: '09',
    title: 'Alianzas estratégicas para el desarrollo',
    desc: 'Establecer relaciones de cooperación con entidades públicas, privadas, organizaciones sociales, instituciones educativas y organismos nacionales e internacionales.',
  },
  {
    num: '10',
    title: 'Desarrollo sostenible y medio ambiente',
    desc: 'Fomentar iniciativas de educación ambiental, protección de los recursos naturales y aprovechamiento responsable del territorio vinculando a las comunidades.',
  },
  {
    num: '11',
    title: 'Gestión institucional ética y transparente',
    desc: 'Fortalecer procesos administrativos, financieros y operativos, promoviendo el uso responsable de recursos, rendición de cuentas y evaluación de impacto.',
  },
  {
    num: '12',
    title: 'Capacidades para transformación social sostenible',
    desc: 'Diseñar proyectos para que las personas desarrollen herramientas que superen la vulnerabilidad y se conviertan en protagonistas de su desarrollo.',
  },
];

export default function ArcaDeLaAlianzaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeService, setActiveService] = useState('01');
  const [aboutTab, setAboutTab] = useState('mision');
  const [projectsCount, setProjectsCount] = useState(0);
  const [ratingCount, setRatingCount] = useState('0.0');
  const [wordIndex, setWordIndex] = useState(0);

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

      {/* Main Full-Width Content Viewport */}
      <main className="site-main-viewport">

        {/* 1. HERO SECTION (Opción B: Inmersivo Cinematográfico Full-Bleed con Palabras Rotativas) */}
        <section ref={heroRef} className="section hero-section hero-cinematic-theme" id="hero">
            {/* Exclusive Video Background (Restricted exclusively to Hero Section) */}
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
                    <span className="hero-emblem-sub">COLOMBIA · NIT 901.689.340 - 5 · ESAL SOCIAL Y COMUNITARIA</span>
                  </div>
                </div>

                <div className="hero-live-pill">
                  <span className="live-pulse" />
                  <span className="live-label">MISIÓN EN ACCIÓN · 2026</span>
                </div>
              </div>

              {/* Center Stage: Monumental Title with Rotating Accent */}
              <div className="hero-cinematic-center">
                <div className="hero-kicker-tag">
                  <span className="kicker-line" />
                  <span>CAPACIDAD INSTALADA &amp; EMPODERAMIENTO SOCIAL</span>
                  <span className="kicker-line" />
                </div>

                <h1 className="hero-monumental-title">
                  UNIMOS MANOS<br className="hero-br-desktop" />
                  POR LA{' '}
                  <span className="hero-rotator-inline">
                    <span key={wordIndex} className="hero-rotator-word-active">
                      {ROTATING_WORDS[wordIndex]}
                    </span>
                  </span>
                </h1>

                <p className="hero-cinematic-narrative">
                  Mejoramos las condiciones de vida de mujeres, niños y poblaciones indígenas, generando
                  capacidad instalada en las comunidades para que las personas se empoderen de sus proyectos de vida.
                </p>

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

                  <a href="#work" className="hero-btn-cinematic-glass">
                    <span className="btn-play-bullet">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </span>
                    <span>Explorar Programas</span>
                  </a>
                </div>
              </div>

              {/* Bottom Bar: Clean Minimalist Metrics (No heavy boxes) + Scroll Cue */}
              <div className="hero-cinematic-bottom">
                <div className="hero-clean-metrics">
                  <div className="hero-clean-metric-item">
                    <div className="metric-number-bold">+14.500</div>
                    <div className="metric-caption">
                      <strong>Platos Servidos</strong>
                      <span>Nutrición balanceada diaria</span>
                    </div>
                  </div>

                  <div className="hero-metric-separator" />

                  <div className="hero-clean-metric-item">
                    <div className="metric-number-bold">870+</div>
                    <div className="metric-caption">
                      <strong>Niños en Aula</strong>
                      <span>Refuerzo escolar y tutorías</span>
                    </div>
                  </div>

                  <div className="hero-metric-separator" />

                  <div className="hero-clean-metric-item">
                    <div className="metric-number-bold">100%</div>
                    <div className="metric-caption">
                      <strong>Transparencia</strong>
                      <span>Vigilancia DIAN · Régimen RTE</span>
                    </div>
                  </div>
                </div>

                <div className="hero-cinematic-scroll-cue">
                  <a href="#about" className="scroll-cue-link">
                    <span className="scroll-cue-text">DESCUBRIR MANIFIESTO</span>
                    <div className="scroll-cue-track">
                      <div className="scroll-cue-dot" />
                    </div>
                  </a>
                </div>
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
                            <span className="mv-card-badge" style={{ backgroundColor: '#b89814' }}>HORIZONTE 2025+</span>
                            <h3 className="mv-card-title">VISIÓN INSTITUCIONAL</h3>
                          </div>
                          <p className="mv-card-body">
                            Para el año 2025 y hacia el futuro, la Fundación Arca de la Alianza será reconocida por su trabajo en pro de los más necesitados, a través del acompañamiento psicosocial y el fortalecimiento del trabajo comunitario, promoviendo la construcción de redes de apoyo.
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
              </div>
            </div>
          </section>

          {/* 3. FEATURED WORK / PROGRAMAS DESTACADOS (White Card, 100vw x 100vh) */}
          <section ref={workRef} className="section work-section" id="work">
            <div className="featured-work-container">
              <div className="featured-work-header">
                <div className="work-header-left">
                  <div className="work-kicker-tag">PROGRAMAS EN TERRITORIO</div>
                  <h3 className="section-title">
                    ACCIONES REALES, IMPACTO MEDIBLE
                  </h3>
                </div>
                <p className="work-header-desc">
                  Operamos directamente en comunidades vulnerables con programas continuos, trazabilidad en tiempo real y certificación de transparencia.
                </p>
              </div>

              <div className="work-grid-modern">
                {/* Card 1: Comedores Comunitarios (Hero Program) */}
                <div
                  className="work-modern-card card-featured-program"
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className="work-modern-media">
                    <img
                      src="/assets/nutrition_program.jpg"
                      alt="Programa de Nutrición Comunitaria y Seguridad Alimentaria"
                      className="work-modern-img"
                    />
                    <div className="work-badge-overlay">
                      <span className="badge-tag">NUTRICIÓN COMUNITARIA</span>
                      <span className="badge-status-pill">ACTIVO</span>
                    </div>
                  </div>
                  <div className="work-modern-info">
                    <h4 className="work-modern-title">Comedor "Pan de Vida"</h4>
                    <p className="work-modern-excerpt">
                      Raciones calientes diarias y balanceadas para niños, adultos mayores y habitantes de calle en extrema vulnerabilidad.
                    </p>
                    <div className="work-modern-footer">
                      <span className="work-metric-pill">+350 raciones/día</span>
                      <span className="work-action-link">Sumar Apoyo →</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Acompañamiento Psicosocial */}
                <div
                  className="work-modern-card"
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className="work-modern-media">
                    <img
                      src="/assets/psychosocial_program.jpg"
                      alt="Acompañamiento Psicosocial y Salud Emocional"
                      className="work-modern-img"
                    />
                    <div className="work-badge-overlay">
                      <span className="badge-tag">SALUD EMOCIONAL · PSICOSOCIAL</span>
                    </div>
                  </div>
                  <div className="work-modern-info">
                    <h4 className="work-modern-title">Círculos de Resiliencia</h4>
                    <p className="work-modern-excerpt">
                      Orientación, prevención y acompañamiento psicosocial para la salud emocional, fortalecimiento familiar y reconstrucción de proyectos de vida.
                    </p>
                    <div className="work-modern-footer">
                      <span className="work-metric-pill">Apoyo Continuo</span>
                      <span className="work-action-link">Conocer Más →</span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Identidad Cultural & Poblaciones Indígenas */}
                <div
                  className="work-modern-card"
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className="work-modern-media">
                    <img
                      src="/assets/indigenous_program.jpg"
                      alt="Identidad Cultural, Saberes Ancestrales y Poblaciones Indígenas"
                      className="work-modern-img"
                    />
                    <div className="work-badge-overlay">
                      <span className="badge-tag">COMUNIDADES INDÍGENAS</span>
                    </div>
                  </div>
                  <div className="work-modern-info">
                    <h4 className="work-modern-title">Saberes &amp; Tradición</h4>
                    <p className="work-modern-excerpt">
                      Preservación de identidad cultural, impulso a artesanías tradicionales y turismo comunitario responsable con respeto por la diversidad.
                    </p>
                    <div className="work-modern-footer">
                      <span className="work-metric-pill">Patrimonio Vivo</span>
                      <span className="work-action-link">Participar →</span>
                    </div>
                  </div>
                </div>

                {/* Card 4: Educación & Emprendimiento */}
                <div
                  className="work-modern-card"
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className="work-modern-media">
                    <img
                      src="/assets/education_program.jpg"
                      alt="Educación, Niñez y Proyectos Productivos"
                      className="work-modern-img"
                    />
                    <div className="work-badge-overlay">
                      <span className="badge-tag">EDUCACIÓN · AUTONOMÍA</span>
                    </div>
                  </div>
                  <div className="work-modern-info">
                    <h4 className="work-modern-title">Aulas &amp; Emprendimiento</h4>
                    <p className="work-modern-excerpt">
                      Refuerzo pedagógico escolar para erradicar la deserción infantil y formación para el trabajo orientada a mujeres y madres comunitarias.
                    </p>
                    <div className="work-modern-footer">
                      <span className="work-metric-pill">870+ Niños en Aula</span>
                      <span className="work-action-link">Apadrinar →</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. SERVICES SECTION (Ejes de Acción Solidaria - Deep Navy Card) */}
          <section ref={servicesRef} className="section black-card-section" id="services">
            <div className="services-header">
              <div>
                <div className="services-kicker-badge">MODELO DE INTERVENCIÓN SOCIAL</div>
                <h2 className="services-headline">
                  TRANSFORMAMOS REALIDADES
                </h2>
              </div>
              <p className="services-sub">
                Cada pilar opera con metas trazables, profesionales de campo y alianzas estratégicas para asegurar continuidad e impacto real en el territorio.
              </p>
            </div>

            {/* Interactive Services List with Real Program Thumbnails */}
            <div className="services-list" id="services-list">
              {/* 01/ ACOMPAÑAMIENTO PSICOSOCIAL */}
              <div
                className={`service-item ${activeService === '01' ? 'active-hover' : ''}`}
                data-index="01"
                onMouseEnter={() => setActiveService('01')}
                onClick={() => setIsModalOpen(true)}
              >
                <span className="service-num">01/</span>
                <div className="service-name-wrap">
                  <span className="service-name">ACOMPAÑAMIENTO PSICOSOCIAL</span>
                  <span className="service-subtext">Orientación, salud emocional, resiliencia y proyectos de vida</span>
                </div>
                <div className="service-thumb-wrap">
                  <img
                    src="/assets/psychosocial_program.jpg"
                    alt="Círculos de Acompañamiento Psicosocial"
                    className="service-thumb"
                  />
                </div>
              </div>

              {/* 02/ CAPACIDAD INSTALADA & TRABAJO COMUNITARIO */}
              <div
                className={`service-item ${activeService === '02' ? 'active-hover' : ''}`}
                data-index="02"
                onMouseEnter={() => setActiveService('02')}
                onClick={() => setIsModalOpen(true)}
              >
                <span className="service-num">02/</span>
                <div className="service-name-wrap">
                  <span className="service-name">CAPACIDAD INSTALADA &amp; COMUNIDAD</span>
                  <span className="service-subtext">Organización ciudadana, liderazgo social y redes de apoyo</span>
                </div>
                <div className="service-thumb-wrap">
                  <img
                    src="/assets/community_workshop.jpg"
                    alt="Capacidad Instalada y Trabajo Comunitario"
                    className="service-thumb"
                  />
                </div>
              </div>

              {/* 03/ IDENTIDAD CULTURAL & PUEBLOS INDÍGENAS */}
              <div
                className={`service-item ${activeService === '03' ? 'active-hover' : ''}`}
                data-index="03"
                onMouseEnter={() => setActiveService('03')}
                onClick={() => setIsModalOpen(true)}
              >
                <span className="service-num">03/</span>
                <div className="service-name-wrap">
                  <span className="service-name">IDENTIDAD CULTURAL &amp; SABERES ANCESTRALES</span>
                  <span className="service-subtext">Poblaciones indígenas, artesanías y respeto por la diversidad</span>
                </div>
                <div className="service-thumb-wrap">
                  <img
                    src="/assets/indigenous_program.jpg"
                    alt="Identidad Cultural y Saberes Ancestrales"
                    className="service-thumb"
                  />
                </div>
              </div>

              {/* 04/ NUTRICIÓN, EDUCACIÓN & AYUDA HUMANITARIA */}
              <div
                className={`service-item ${activeService === '04' ? 'active-hover' : ''}`}
                data-index="04"
                onMouseEnter={() => setActiveService('04')}
                onClick={() => setIsModalOpen(true)}
              >
                <span className="service-num">04/</span>
                <div className="service-name-wrap">
                  <span className="service-name">NUTRICIÓN, EDUCACIÓN &amp; ASISTENCIA</span>
                  <span className="service-subtext">Comedores comunitarios, refuerzo escolar y auxilio humanitario</span>
                </div>
                <div className="service-thumb-wrap">
                  <img
                    src="/assets/nutrition_program.jpg"
                    alt="Nutrición, Educación y Ayuda Humanitaria"
                    className="service-thumb"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 5. TIMELINE SECTION (Trayectoria e Hitos Reales - White Card) */}
          <section ref={timelineRef} className="section timeline-section" id="timeline">
            <div className="timeline-header">
              <div>
                <div className="timeline-kicker-tag">HISTORIA &amp; EVOLUCIÓN</div>
                <h2 className="timeline-headline">
                  NUESTRA TRAYECTORIA
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

            {/* Timeline Slider Track */}
            <div ref={timelineTrackRef} className="timeline-track-container" id="timeline-scroll">
              {/* Hito 1: 2021 */}
              <div className="timeline-card-col">
                <div className="timeline-img-card">
                  <img
                    src="/assets/nutrition_program.jpg"
                    alt="Constitución Formal Fundación Arca de la Alianza 2021"
                    className="timeline-gift-img"
                  />
                  <div className="timeline-year-chip">2021</div>
                </div>
                <div className="timeline-info">
                  <h3 className="timeline-step-title">
                    CONSTITUCIÓN LEGAL<br />
                    26 DE NOVIEMBRE
                  </h3>
                  <p className="timeline-step-p">
                    El 26 de noviembre de 2021 nace formalmente la Fundación Arca de la Alianza como entidad sin ánimo de lucro (NIT 901.689.340-5), con la misión de generar capacidad instalada en las comunidades.
                  </p>
                </div>
              </div>

              {/* Hito 2: 2022 */}
              <div className="timeline-card-col">
                <div className="timeline-img-card">
                  <img
                    src="/assets/community_workshop.jpg"
                    alt="Desarrollo Comunitario y Redes de Apoyo 2022"
                    className="timeline-gift-img"
                  />
                  <div className="timeline-year-chip">2022</div>
                </div>
                <div className="timeline-info">
                  <h3 className="timeline-step-title">
                    REDES DE APOYO &amp;<br />
                    TRABAJO SOCIAL
                  </h3>
                  <p className="timeline-step-p">
                    Consolidación del modelo de intervención social orientado a mujeres cabezas de hogar, niñez y familias en condiciones de pobreza extrema y vulnerabilidad.
                  </p>
                </div>
              </div>

              {/* Hito 3: 2023 (Tarjeta Heroica de Enfoque) */}
              <div className="timeline-concept-col">
                <div className="concept-black-card">
                  <div className="concept-top-row">
                    <span className="concept-year-badge">2023 — CONSOLIDACIÓN</span>
                    <span className="concept-star">✦</span>
                  </div>
                  <h3 className="concept-card-title">
                    COMEDOR FIJO &amp;<br />
                    AULAS ESCOLARES
                  </h3>
                  <p className="concept-card-p">
                    Inauguración de comedores comunitarios con raciones diarias balanceadas, programas de refuerzo escolar y primeros círculos de acompañamiento psicosocial.
                  </p>
                  <button
                    type="button"
                    className="meet-team-btn"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <span>Sumarse a la Red</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Hito 4: 2024 */}
              <div className="timeline-card-col">
                <div className="timeline-img-card">
                  <img
                    src="/assets/indigenous_program.jpg"
                    alt="Pueblos Indígenas e Identidad Cultural 2024"
                    className="timeline-gift-img"
                  />
                  <div className="timeline-year-chip">2024</div>
                </div>
                <div className="timeline-info">
                  <h3 className="timeline-step-title">
                    IDENTIDAD CULTURAL &amp;<br />
                    PUEBLOS INDÍGENAS
                  </h3>
                  <p className="timeline-step-p">
                    Articulación de programas para la protección de tradiciones, apoyo a artesanías y saberes ancestrales junto a comunidades indígenas y familias vulnerables.
                  </p>
                </div>
              </div>

              {/* Hito 5: 2025/2026 */}
              <div className="timeline-card-col">
                <div className="timeline-img-card">
                  <img
                    src="/assets/psychosocial_program.jpg"
                    alt="Visión 2025 y Acompañamiento Psicosocial Continuo"
                    className="timeline-gift-img"
                  />
                  <div className="timeline-year-chip">2025+</div>
                </div>
                <div className="timeline-info">
                  <h3 className="timeline-step-title">
                    VISIÓN CONSOLIDADA &amp;<br />
                    REDES DE APOYO
                  </h3>
                  <p className="timeline-step-p">
                    Consolidación de la visión institucional como referente en acompañamiento psicosocial, fortalecimiento del trabajo comunitario y empoderamiento de proyectos de vida.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 6. PEOPLE & GOVERNANCE SECTION (Transparencia & Confianza) */}
          <section ref={peopleRef} className="section people-stats-section" id="people">
            <div className="moments-statement">
              <div className="governance-kicker">EQUIPO &amp; TRANSPARENCIA</div>
              <h2 className="moments-headline">
                CREANDO HUELLAS QUE DEJAN HISTORIA
              </h2>
              <div className="moments-team-strip">
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
                  <strong className="team-info-title">Equipo &amp; Voluntariado en Territorio</strong>
                  <span className="team-info-sub">+45 voluntarios comprometidos con el cambio</span>
                </div>
              </div>
              <p className="governance-lead">
                La verdadera transformación social nace del trabajo diario en territorio, con un equipo humano íntegro y absoluta transparencia en cada recurso recibido.
              </p>
            </div>

            {/* 3 Metric & Governance Cards */}
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
                    Habilitados formalmente para emitir certificados de donación con deducción de renta (Estatuto Tributario Art. 125).
                  </p>
                  <div className="card-bottom-action">
                    <span className="action-label">DOCUMENTACIÓN<br />LEGAL AL DÍA</span>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
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
                    SEGURIDAD ALIMENTARIA
                  </span>
                </div>
                <div className="card-colored-body yellow-body">
                  <span className="counter-label-dark">PLATOS DE COMIDA SERVIDOS</span>
                  <div className="counter-large-stat text-dark">
                    +14.500
                  </div>
                  <p className="card-desc-dark">
                    Cero intermediarios. Alimentos preparados directamente en territorio con estándares sanitarios supervisados.
                  </p>
                  <div className="card-bottom-action">
                    <span className="action-label text-dark">TRAZABILIDAD<br />EN CAMPO</span>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
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
                    EDUCACIÓN &amp; FUTURO
                  </span>
                </div>
                <div className="card-colored-body peach-body">
                  <span className="counter-label-light">INFANCIA EN AULAS</span>
                  <div className="counter-large-stat text-gold">
                    870+
                  </div>
                  <p className="card-desc">
                    Niñas y niños con refuerzo escolar diario y dotación de útiles para prevenir la deserción en zonas periurbanas.
                  </p>
                  <div className="card-bottom-action">
                    <span className="action-label">REDUCCIÓN DE<br />DESERCIÓN ESCOLAR</span>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
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

          {/* 6. FOOTER SECTION (Deep Midnight Navy) */}
          <footer ref={footerRef} className="section footer-section" id="contact" style={{ backgroundColor: '#070A18' }}>
            <div className="footer-huge-wordmark">
              <h1 ref={giantMavkaRef} className="giant-mavka" style={{ color: '#ffffff' }}>
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
                <p><strong>Fundación Arca de la Alianza</strong></p>
                <p>NIT: 901.689.340 - 5 · ESAL Social y Comunitaria</p>
                <p>Constituida el 26 de Noviembre de 2021</p>
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
                «Servimos con amor, transformamos con esperanza y construimos juntos un futuro con dignidad y oportunidades para todos».
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
        </main>

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
              FUNDACIÓN ARCA DE LA ALIANZA
            </span>
            <h3 className="modal-title" style={{ color: '#ffffff' }}>
              Unirse o Contactar
            </h3>
            <p className="modal-sub">
              Cuéntanos sobre tu interés: voluntariado, alianzas corporativas, proyectos psicosociales o información institucional.
            </p>

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
                <label className="form-label">Línea de Interés</label>
                <select className="form-input form-select" defaultValue="Alianza Estratégica / Donación Corporativa">
                  <option>Alianza Estratégica / Donación Corporativa</option>
                  <option>Acompañamiento Psicosocial &amp; Salud Emocional</option>
                  <option>Iniciativas con Poblaciones Indígenas &amp; Cultura</option>
                  <option>Seguridad Alimentaria &amp; Comedores Comunitarios</option>
                  <option>Educación Infantil &amp; Emprendimiento de Mujeres</option>
                  <option>Voluntariado en Territorio</option>
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
