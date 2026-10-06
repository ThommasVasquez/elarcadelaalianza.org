'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ServicesSection({ onSelectService }) {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);
  const previewRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);
  const [activeTitle, setActiveTitle] = useState('');

  const services = [
    {
      num: '01',
      title: 'EVENT MANAGEMENT',
      desc: 'End-to-end production, technical staging, VIP protocol, artist booking, and high-precision timeline execution.',
      tags: ['FULL DIRECTION', 'SOUND & LIGHT', 'VIP GUESTS', 'SECURITY'],
      image: '/assets/service_cake.png',
      color: '#FFD152',
    },
    {
      num: '02',
      title: 'CORPORATE GATHERINGS',
      desc: 'Annual galas, milestone jubilees, leadership retreats, and offsites designed to forge lifelong team loyalty.',
      tags: ['RETREATS', 'GALAS', 'AWARD CEREMONIES', 'TEAM QUESTS'],
      image: '/assets/service_martini.png',
      color: '#FFBA8C',
    },
    {
      num: '03',
      title: 'CONFERENCES & SUMMITS',
      desc: 'Multi-stream keynote auditoriums, interactive exhibition zones, hybrid streaming, and networking lounges.',
      tags: ['TECH SUMMITS', 'HYBRID STREAMS', 'EXPO STAGING', 'APP SYNC'],
      image: '/assets/service_conf.png',
      color: '#68B2FF',
    },
    {
      num: '04',
      title: 'BRAND MARKETING ACTIVATIONS',
      desc: 'Viral pop-ups, immersive brand experiences, product unveilings, and experiential influencer environments.',
      tags: ['POP-UP HUBS', 'INFLUENCER NIGHTS', '3D MAPPING', 'VIRAL STUNTS'],
      image: '/assets/service_disco.png',
      color: '#7C5CFC',
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const preview = previewRef.current;
    if (!section) return;

    // Header reveal
    gsap.fromTo(
      section.querySelector('.section-header'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      }
    );

    // GSAP ScrollTrigger highlight on scroll
    rowsRef.current.forEach((row, idx) => {
      if (!row) return;

      ScrollTrigger.create({
        trigger: row,
        start: 'top 65%',
        end: 'bottom 45%',
        onEnter: () => row.classList.add('scroll-active'),
        onLeave: () => row.classList.remove('scroll-active'),
        onEnterBack: () => row.classList.add('scroll-active'),
        onLeaveBack: () => row.classList.remove('scroll-active'),
      });

      gsap.fromTo(
        row,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: idx * 0.1,
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
          },
        }
      );
    });

    // Floating preview mouse tracking
    if (preview) {
      const xTo = gsap.quickTo(preview, 'x', { duration: 0.3, ease: 'power3' });
      const yTo = gsap.quickTo(preview, 'y', { duration: 0.3, ease: 'power3' });

      const handleMouseMove = (e) => {
        xTo(e.clientX + 20);
        yTo(e.clientY - 80);
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  const handleMouseEnter = (srv) => {
    setActiveImage(srv.image);
    setActiveTitle(srv.title);
    if (previewRef.current) {
      gsap.to(previewRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.5)' });
    }
  };

  const handleMouseLeave = () => {
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        scale: 0.7,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => setActiveImage(null),
      });
    }
  };

  return (
    <section id="services" ref={sectionRef} className="services-section card-stack-section">
      <div className="section-header">
        <div className="section-tag-wrapper">
          <span className="section-dot"></span>
          <span className="section-tag">SERVICES</span>
        </div>
        <h2 className="section-title">
          WHAT WE DELIVER <span className="text-muted-bracket">[ 04 ]</span>
        </h2>
        <p className="section-subtitle">
          Precision execution combined with artistic vision across four core disciplines.
        </p>
      </div>

      <div className="services-list" onMouseLeave={handleMouseLeave}>
        {services.map((srv, index) => (
          <div
            key={srv.num}
            ref={(el) => (rowsRef.current[index] = el)}
            className="service-row"
            data-cursor="pointer"
            onMouseEnter={() => handleMouseEnter(srv)}
            onClick={() => onSelectService(srv)}
          >
            <div className="service-row-left">
              <span className="service-number">{srv.num}/</span>
              <h3 className="service-name">{srv.title}</h3>
            </div>

            <div className="service-row-center">
              <p className="service-brief">{srv.desc}</p>
              <div className="service-tags">
                {srv.tags.map((t) => (
                  <span key={t} className="service-tag-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="service-row-right">
              <div className="service-arrow-circle" style={{ borderColor: srv.color }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cursor Image Preview */}
      <div
        ref={previewRef}
        className="floating-service-preview pointer-events-none fixed z-50 overflow-hidden rounded-2xl shadow-2xl opacity-0 scale-75"
        style={{ left: 0, top: 0, width: '220px', height: '170px' }}
      >
        {activeImage && (
          <div className="relative w-full h-full bg-[#1c1c20] p-2 border border-white/20 rounded-2xl flex flex-col items-center justify-center">
            <img src={activeImage} alt={activeTitle} className="w-full h-28 object-contain drop-shadow-md" />
            <span className="text-[10px] font-black tracking-wider text-[#FFD152] uppercase mt-1">
              {activeTitle}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
