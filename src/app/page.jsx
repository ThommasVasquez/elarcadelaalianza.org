'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default function MavkaPage() {
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
        color: ['#FFD152', '#FFFFFF', '#68B2FF', '#FFBA8C'][Math.floor(Math.random() * 4)],
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
              x: (i % 2 === 0 ? -30 : 30),
              scrollTrigger: {
                trigger: b,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            });
            gsap.to(bot, {
              x: (i % 2 === 0 ? 30 : -30),
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
        cards.forEach((card, idx) => {
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

      // G. FOOTER GIANT MAVKA WORDMARK REVEAL
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
      {/* Custom Interactive Magnetic Yellow Arrow Cursor */}
      <div ref={cursorRef} id="custom-cursor" className="custom-cursor">
        <svg
          className="cursor-arrow"
          width="24"
          height="24"
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
      </div>

      {/* Presentation Mode Toggle Header Bar (Dribbble Frame / Full View) */}
      <div className="presentation-controls">
        <div className="controls-left">
          <span className="pulse-indicator"></span>
          <span className="controls-title">MAVKA EVENT STUDIO — NEXT.JS + GSAP</span>
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
            {isFrameMode ? 'Dribbble Frame' : 'Full Browser'}
          </button>
        </div>
      </div>

      {/* Main Outer Container (Mockup Bezel Frame as in Dribbble Video) */}
      <div id="mockup-frame" className={`mockup-frame ${!isFrameMode ? 'full-mode' : ''}`}>
        <div className="inner-viewport" id="viewport">
          {/* Floating Fixed Pill Navbar */}
          <header className="navbar-wrapper">
            <nav className="pill-navbar" id="navbar">
              <a href="#hero" className="brand-logo">
                <span className="logo-bold">mavka</span>
                <span className="logo-sep">|</span>
                <span className="logo-light">Studio</span>
              </a>
              <div className="nav-links">
                <a href="#about" className="nav-item">
                  About
                </a>
                <a href="#services" className="nav-item">
                  Why Us?
                </a>
                <a href="#contact" className="nav-item">
                  Contacts
                </a>
              </div>
              <button
                type="button"
                className="nav-contact-btn"
                onClick={() => setIsModalOpen(true)}
              >
                Contact Us
                <svg
                  className="phone-icon"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </button>
            </nav>
          </header>

          {/* 1. HERO SECTION (Dark) */}
          <section ref={heroRef} className="section hero-section" id="hero">
            <div className="hero-header-meta">
              <span className="hero-tag">EVENT STUDIO</span>
            </div>

            {/* Massive Title with Sliced Kinetic Typography Effect */}
            <div className="hero-title-container" id="hero-title-trigger">
              <div ref={heroTitleRef} className="sliced-title-group animating" data-title="MAVKA EVENT">
                <h1 className="hero-main-title">MAVKA EVENT</h1>
                <div className="slice slice-top" aria-hidden="true">
                  MAVKA EVENT
                </div>
                <div className="slice slice-mid" aria-hidden="true">
                  MAVKA EVENT
                </div>
                <div className="slice slice-bottom" aria-hidden="true">
                  MAVKA EVENT
                </div>
              </div>
              <div className="hero-subtitle-meta">
                ORGANIZERS OF EMOTIONAL
                <br />
                AND UNFORGETTABLE EVENTS
              </div>
            </div>

            {/* Hero Illustration Artwork Container */}
            <div className="hero-stage">
              <img
                ref={heroArtworkRef}
                src="/assets/hero_clean_art.png"
                alt="Mavka Event festive celebration illustration with delicacies, blue tablet invitation, confetti and cocktails"
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
                <div className="sliced-block glitching" data-text="ORGANIZERS OF">
                  <h2 className="statement-line">ORGANIZERS OF</h2>
                  <div className="slice slice-top">ORGANIZERS OF</div>
                  <div className="slice slice-bottom">ORGANIZERS OF</div>
                </div>
                <div className="sliced-block glitching" data-text="EMOTIONAL">
                  <h2 className="statement-line">EMOTIONAL</h2>
                  <div className="slice slice-top">EMOTIONAL</div>
                  <div className="slice slice-bottom">EMOTIONAL</div>
                </div>
                <div className="sliced-block glitching" data-text="SUPER EVENTS">
                  <h2 className="statement-line">SUPER EVENTS</h2>
                  <div className="slice slice-top">SUPER EVENTS</div>
                  <div className="slice slice-bottom">SUPER EVENTS</div>
                </div>
              </div>
              <div className="statement-description">
                <p>
                  We are a team of professionals creating unique events for you. Whether it is a corporate event, wedding or
                  festival, we strive to make every event special.
                </p>
              </div>
            </div>

            {/* Featured Work Grid */}
            <div ref={workRef} className="featured-work-container" id="work">
              <h3 className="section-title">
                FEATURED
                <br />
                WORK
              </h3>

              <div className="work-grid">
                {/* Left Column Card: Holiday Magic Festival */}
                <div
                  className="work-card large-card holiday-magic-card"
                  data-work="holiday-magic"
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className="card-media-wrapper">
                    <img src="/assets/work_holiday_magic.png" alt="Holiday Magic Festival" className="card-img" />
                  </div>
                </div>

                {/* Right Column Top Card: TeamTrek */}
                <div className="work-card teamtrek-card" data-work="teamtrek" onClick={() => setIsModalOpen(true)}>
                  <div className="card-media-wrapper">
                    <img
                      src="/assets/work_teamtrek.png"
                      alt="TeamTrek: A Journey to Collective Inspiration"
                      className="card-img"
                    />
                  </div>
                </div>

                {/* Mid text block */}
                <div className="work-text-block">
                  <h4 className="work-text-title">
                    HOW WE TAKE YOUR
                    <br />
                    BUSINESS TO THE
                  </h4>
                  <p className="work-text-p">
                    We are a team of professionals creating unique events for you. Whether it is a corporate event, wedding or
                    festival, we strive to make every event special.
                  </p>
                </div>

                {/* Right Column Mid Card: Influence 360 */}
                <div className="work-card influence-card" data-work="influence" onClick={() => setIsModalOpen(true)}>
                  <div className="card-media-wrapper">
                    <img
                      src="/assets/work_influence.png"
                      alt="Influence 360: Insider Summit for Influencers"
                      className="card-img"
                    />
                  </div>
                </div>

                {/* Right Column Bottom Card: Innovation Summit */}
                <div className="work-card innovation-card" data-work="innovation" onClick={() => setIsModalOpen(true)}>
                  <div className="card-media-wrapper">
                    <img
                      src="/assets/work_innovation.png"
                      alt="Innovation Summit: Inspiration and Progress"
                      className="card-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. SERVICES SECTION (Black Card) */}
          <section ref={servicesRef} className="section black-card-section" id="services">
            <div className="services-header">
              <h2 className="services-headline">
                WE TURN EVENTS
                <br />
                INTO REALITY!
              </h2>
              <p className="services-sub">
                Our experienced professionals are dedicated to creating immersive and interactive experiences that connect
                brands with customers in unique and creative ways.
              </p>
            </div>

            {/* Interactive Services List with Thumbnails */}
            <div className="services-list" id="services-list">
              {/* 01/ MANAGEMENT */}
              <div
                className={`service-item ${activeService === '01' ? 'active-hover' : ''}`}
                data-index="01"
                onMouseEnter={() => setActiveService('01')}
                onClick={() => setIsModalOpen(true)}
              >
                <span className="service-num">01/</span>
                <div className="service-name-wrap">
                  <span className="service-name">MANAGEMENT</span>
                </div>
                <div className="service-thumb-wrap">
                  <img src="/assets/service_cake.png" alt="Event Management" className="service-thumb" />
                </div>
              </div>

              {/* 02/ CORPORATE */}
              <div
                className={`service-item ${activeService === '02' ? 'active-hover' : ''}`}
                data-index="02"
                onMouseEnter={() => setActiveService('02')}
                onClick={() => setIsModalOpen(true)}
              >
                <span className="service-num">02/</span>
                <div className="service-thumb-wrap">
                  <img src="/assets/service_martini.png" alt="Corporate Events" className="service-thumb" />
                </div>
                <div className="service-name-wrap">
                  <span className="service-name">CORPORATE</span>
                </div>
              </div>

              {/* 03/ CONFERENCE */}
              <div
                className={`service-item ${activeService === '03' ? 'active-hover' : ''}`}
                data-index="03"
                onMouseEnter={() => setActiveService('03')}
                onClick={() => setIsModalOpen(true)}
              >
                <span className="service-num">03/</span>
                <div className="service-name-wrap">
                  <span className="service-name">CONFERENCE</span>
                </div>
                <div className="service-thumb-wrap">
                  <img src="/assets/service_conf.png" alt="Conferences and Seminars" className="service-thumb" />
                </div>
              </div>

              {/* 04/ MARKETING */}
              <div
                className={`service-item ${activeService === '04' ? 'active-hover' : ''}`}
                data-index="04"
                onMouseEnter={() => setActiveService('04')}
                onClick={() => setIsModalOpen(true)}
              >
                <span className="service-num">04/</span>
                <div className="service-thumb-wrap">
                  <img src="/assets/service_disco.png" alt="Marketing Experiences" className="service-thumb" />
                </div>
                <div className="service-name-wrap">
                  <span className="service-name">MARKETING</span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. TIMELINE SECTION (White Card) */}
          <section ref={timelineRef} className="section timeline-section" id="timeline">
            <div className="timeline-header">
              <h2 className="timeline-headline">OUR TIMELINE</h2>
              <div className="carousel-nav-arrows">
                <button
                  type="button"
                  className="arrow-btn"
                  onClick={handleTimelinePrev}
                  aria-label="Previous timeline slide"
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
                  aria-label="Next timeline slide"
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
                  <img src="/assets/timeline_gift.png" alt="Research & Consultation" className="timeline-gift-img" />
                </div>
                <div className="timeline-info">
                  <h3 className="timeline-step-title">
                    RESEARCH AND
                    <br />
                    CONSULTATION
                  </h3>
                  <p className="timeline-step-p">
                    Conducting meetings with the client to discuss goals, budget and wishes. Preparing a preliminary concept
                    and estimating costs.
                  </p>
                </div>
              </div>

              {/* Giant Cheering Hands Card */}
              <div className="timeline-cheers-col">
                <img
                  src="/assets/timeline_cheers.png"
                  alt="Celebration cheers with cocktail toast"
                  className="timeline-cheers-img"
                />
              </div>

              {/* Planning and Concept Card */}
              <div className="timeline-concept-col">
                <div className="concept-black-card">
                  <h3 className="concept-card-title">
                    PLANNING
                    <br />
                    AND CONCEPT
                    <br />
                    CREATION
                  </h3>
                  <p className="concept-card-p">
                    Development of a detailed event plan, including the choice of venue, theme, program and structure of the
                    event.
                  </p>
                  <button type="button" className="meet-team-btn" onClick={() => setIsModalOpen(true)}>
                    Meet the Team
                    <svg
                      className="phone-icon"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Step 3 & 4 */}
              <div className="timeline-card-col">
                <div className="timeline-info" style={{ marginTop: '40px' }}>
                  <h3 className="timeline-step-title">
                    PRODUCTION &amp;
                    <br />
                    STAGE MANAGEMENT
                  </h3>
                  <p className="timeline-step-p">
                    Live supervision, synchronized audiovisual lighting design, vendor management, and flawless hospitality
                    execution on event day.
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
                <span className="moments-row">CREATING</span>
                <span className="moments-row">MOMENTS THAT LEAVE</span>
                <span className="moments-row inline-portraits-row">
                  <span className="moments-word">A M</span>
                  <span className="portrait-avatar portrait-1" title="Elena — Creative Director">
                    <img src="/assets/portrait_1.png" alt="Team Creative Director with red headphones" />
                  </span>
                  <span className="moments-word">RK IN M</span>
                  <span className="portrait-avatar portrait-2" title="Sarah — Lead Event Producer">
                    <img src="/assets/portrait_2.png" alt="Lead Event Producer" />
                  </span>
                  <span className="moments-word">M</span>
                  <span className="portrait-avatar portrait-3" title="Maya — Experience Designer">
                    <img src="/assets/portrait_3.png" alt="Experience Designer" />
                  </span>
                  <span className="moments-word">ORY</span>
                </span>
              </h2>
            </div>

            {/* 3 Colored Metric Cards */}
            <div className="metric-cards-container">
              {/* Card 1: Blog (Purple) */}
              <div className="stat-card-wrapper card-blog">
                <div className="card-black-roof">
                  <span className="capsule-tag">BLOG</span>
                </div>
                <div className="card-colored-body purple-body">
                  <p className="card-desc">We offer a variety of activities for all ages and interests.</p>
                  <div className="card-bottom-action">
                    <span className="action-label">
                      OUR LATEST
                      <br />
                      ARTICLES
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="circle-action-btn"
                      aria-label="Read latest articles"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: Success Projects (Yellow) */}
              <div className="stat-card-wrapper card-success">
                <div className="card-black-roof">
                  <span className="capsule-tag">SUCCESS</span>
                </div>
                <div className="card-colored-body yellow-body">
                  <span className="counter-label">
                    CLOSED
                    <br />
                    PROJECT
                  </span>
                  <div className="counter-value" id="counter-projects">
                    {projectsCount}
                  </div>
                </div>
              </div>

              {/* Card 3: Confidence / Rating (Peach) */}
              <div className="stat-card-wrapper card-confidence">
                <div className="card-black-roof">
                  <span className="capsule-tag">CONFIDENCE</span>
                </div>
                <div className="card-colored-body peach-body">
                  <div className="rating-value" id="counter-rating">
                    {ratingCount}
                    <span className="star-glyph">★</span>
                  </div>
                  <span className="rating-sub">
                    OUR RATING
                    <br />
                    ON THE GOOGLE
                    <br />
                    REVIEWS
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 6. FOOTER SECTION (Deep Black) */}
          <footer ref={footerRef} className="section footer-section" id="contact">
            <div className="footer-huge-wordmark">
              <h1 ref={giantMavkaRef} className="giant-mavka">
                MAVKA
              </h1>
            </div>

            <div className="footer-cards-grid">
              {/* Social Networks Card */}
              <div className="footer-card">
                <h3 className="footer-card-title">
                  FOLLOW US ON SOCIAL
                  <br />
                  NETWORKS
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
                  {/* TikTok */}
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="TikTok"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.11V9.4a6.33 6.33 0 0 0-.86-.06A6.34 6.34 0 0 0 3.1 15.68a6.34 6.34 0 0 0 10.82 4.48c1.37-1.37 2.08-3.23 2.08-5.17V8.53a8.21 8.21 0 0 0 3.59.81V6.69z" />
                    </svg>
                  </a>
                  {/* X / Twitter */}
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="X (Twitter)"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Contact Us Card */}
              <div className="footer-card">
                <h3 className="footer-card-title">CONTACT US</h3>
                <a href="mailto:HELLO@MAVKA.COM" className="contact-link email-link">
                  HELLO@MAVKA.COM
                </a>
                <a href="tel:+1195234567" className="contact-link phone-link">
                  +1 195 234 567
                </a>
              </div>
            </div>

            {/* Bottom Footer Details */}
            <div className="footer-meta-row">
              <form
                className="newsletter-capsule"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for subscribing to MAVKA!');
                }}
              >
                <input type="email" placeholder="Subscribe to our newsletter" required className="newsletter-input" />
                <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>

              <div className="footer-address">
                <p>Franciszka Klimczaka</p>
                <p>10G,Warsaw, 02-972,Poland</p>
                <p className="vat-no">VAT No.: PL1182123340</p>
              </div>
            </div>

            {/* Bottom Banner (Book a Meet) */}
            <div className="footer-banner-bar">
              <div className="banner-asterisk">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="2" x2="12" y2="22"></line>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                  <line x1="19.07" y1="4.93" x2="4.93" y2="19.07"></line>
                </svg>
              </div>
              <div className="banner-text">Want to start a project? We collaborate with ambitious brands and people</div>
              <button
                type="button"
                className="banner-meet-btn"
                onClick={() => setIsModalOpen(true)}
              >
                Book a meet
                <svg
                  className="phone-icon"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
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
          <div className="modal-card">
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close dialog"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <span className="capsule-tag">EVENT STUDIO</span>
            <h3 className="modal-title">Book a Consultation</h3>
            <p className="modal-sub">
              Tell us about your event vision, dates, and ideas. Our team will tailor a concept for you.
            </p>

            <form
              className="modal-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you! Our director will contact you within 24 hours.');
                setIsModalOpen(false);
              }}
            >
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" required placeholder="Alex Vance" className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Email or Phone</label>
                <input type="text" required placeholder="alex@company.com" className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Event Category</label>
                <select className="form-input form-select" defaultValue="Corporate Events">
                  <option>Corporate Events</option>
                  <option>Conference & Summit</option>
                  <option>Brand Marketing Activation</option>
                  <option>Private Celebration</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Your Vision / Dates</label>
                <textarea rows={3} placeholder="Tell us about the location, guest count..." className="form-input"></textarea>
              </div>

              <button type="submit" className="form-submit-btn">
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
