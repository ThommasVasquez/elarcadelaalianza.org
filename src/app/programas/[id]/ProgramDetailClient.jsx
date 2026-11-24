'use client';

import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function ProgramDetailClient({
  program,
  allPrograms,
  binacionalInfo,
  legalDocs,
  filosofia,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLineInterest, setModalLineInterest] = useState(program?.title || 'Donación General');
  const [copiedBank, setCopiedBank] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [activeLegalDocKey, setActiveLegalDocKey] = useState('privacidad');

  const cursorRef = useRef(null);

  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Magnetic custom cursor tracking
    const cursor = cursorRef.current;
    const onMouseMove = (e) => {
      if (!cursor) return;
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const handleCopyBankAccount = () => {
    const textToCopy = `Banco: ${binacionalInfo.usa.bancoOficial.banco}\nChecking Account: ${binacionalInfo.usa.bancoOficial.numeroCuenta}\nRouting: ${binacionalInfo.usa.bancoOficial.routingNumber}\nTitular: ${binacionalInfo.usa.razonSocial} (EIN: ${binacionalInfo.usa.ein})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 3000);
  };

  const openLegalDocument = (key) => {
    setActiveLegalDocKey(key);
    setLegalModalOpen(true);
  };

  const otherPrograms = allPrograms.filter((p) => p.id !== program.id);

  return (
    <div className="site-root-container">
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
          <a href="/#hero" className="brand-logo">
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
            <a href="/#about" className="nav-item">Identidad</a>
            <a href="/#work" className="nav-item active-nav">Programas</a>
            <a href="/#services" className="nav-item">Dimensiones</a>
            <a href="/#timeline" className="nav-item">Trayectoria</a>
            <a href="/#people" className="nav-item">Gobierno</a>
            <a href="/#contact" className="nav-item">Contacto</a>
          </div>
          <button
            type="button"
            className="navbar-btn"
            onClick={() => {
              setModalLineInterest(program.title);
              setIsModalOpen(true);
            }}
          >
            <span>Sumar Apoyo</span>
            <svg
              className="navbar-btn-icon"
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
          </button>
        </nav>
      </header>

      {/* Main Dedicated Program Content */}
      <main className="program-detail-page">
        <div className="program-detail-container">
          {/* Breadcrumb Navigation Row */}
          <div className="program-breadcrumb-bar">
            <a href="/#work" className="breadcrumb-back-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Volver a Programas</span>
            </a>
            <div className="breadcrumb-path">
              <span>Inicio</span>
              <span className="breadcrumb-sep">/</span>
              <span>Programas</span>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">{program.title}</span>
            </div>
          </div>

          {/* Program Monumental Header */}
          <header className="program-hero-header">
            <div className="program-kicker-row">
              <span className="statement-kicker-dot" />
              <span className="program-tag-badge">{program.tag}</span>
              <span className="program-chip-badge">✦ {program.chip}</span>
            </div>

            <h1 className="program-page-title">
              {program.title.toUpperCase()}
            </h1>

            {program.quote && (
              <p className="program-hero-quote">
                {program.quote}
              </p>
            )}

            {/* Quick Specs Grid */}
            <div className="program-specs-ribbon">
              <div className="spec-card-item">
                <span className="spec-item-icon">👥</span>
                <div className="spec-item-text">
                  <span className="spec-item-label">Beneficiarios</span>
                  <span className="spec-item-val">{program.beneficiaries}</span>
                </div>
              </div>

              <div className="spec-card-item">
                <span className="spec-item-icon">⏱️</span>
                <div className="spec-item-text">
                  <span className="spec-item-label">Periodicidad</span>
                  <span className="spec-item-val">{program.frequency}</span>
                </div>
              </div>

              <div className="spec-card-item">
                <span className="spec-item-icon">📍</span>
                <div className="spec-item-text">
                  <span className="spec-item-label">Territorio</span>
                  <span className="spec-item-val">{program.coverage}</span>
                </div>
              </div>

              <div className="spec-card-item spec-card-gold">
                <span className="spec-item-icon">✦</span>
                <div className="spec-item-text">
                  <span className="spec-item-label">Impacto Clave</span>
                  <span className="spec-item-val">{program.metricHighlight || 'Acción Social Directa'}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Split Detail Showcase */}
          <section className="program-content-split">
            {/* Left Column: Visual Media & Quick Support Box */}
            <div className="program-left-col">
              <div className="program-media-frame">
                <img
                  src={program.img}
                  alt={program.title}
                  className="program-main-photo"
                />
                <div className="program-photo-scrim" />

                <div className="program-floating-badge">
                  <span>LINEA DE ACCIÓN OFICIAL</span>
                </div>
              </div>

              {/* Direct Support Card with Bank Info */}
              <div className="program-support-box">
                <div className="support-box-header">
                  <span style={{ fontSize: '20px' }}>🇺🇸</span>
                  <div>
                    <h4 className="support-box-title">Canal Bancario Oficial (EE.UU.)</h4>
                    <p className="support-box-sub">Arca de la Alianza Inc. · Regions Bank Florida</p>
                  </div>
                </div>

                <div className="support-box-data">
                  <div className="data-row">
                    <span>Checking Account:</span>
                    <strong className="code-text">{binacionalInfo.usa.bancoOficial.numeroCuenta}</strong>
                  </div>
                  <div className="data-row">
                    <span>Routing Number:</span>
                    <strong>{binacionalInfo.usa.bancoOficial.routingNumber}</strong>
                  </div>
                  <div className="data-row">
                    <span>EIN Federal:</span>
                    <strong>{binacionalInfo.usa.ein}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyBankAccount}
                  className="support-copy-btn"
                >
                  {copiedBank ? '✓ ¡Datos Bancarios Copiados!' : 'Copiar Datos Regions Bank'}
                </button>
              </div>
            </div>

            {/* Right Column: Mission Story, Strategic Pillars & Actions */}
            <div className="program-right-col">
              <div className="program-narrative-card">
                <div className="statement-kicker-row" style={{ marginBottom: '8px' }}>
                  <span className="statement-kicker-dot" />
                  <span className="statement-kicker-text">OBJETIVO MISIONAL EN TERRITORIO</span>
                </div>
                <h3 className="section-narrative-title">
                  Propósito y Acción Comunitaria
                </h3>
                <p className="section-narrative-p">
                  {program.desc}
                </p>

                {/* Strategic Pillars */}
                {program.pillars && program.pillars.length > 0 && (
                  <div className="program-pillars-block">
                    <h4 className="pillars-block-title">
                      Ejes de Intervención Directa
                    </h4>
                    <div className="pillars-list">
                      {program.pillars.map((pillar, pIdx) => (
                        <div key={pIdx} className="pillar-item-row">
                          <span className="pillar-check-badge">0{pIdx + 1}</span>
                          <span className="pillar-text">{pillar}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Transparency / Tax note */}
                <div className="program-compliance-note">
                  <div className="compliance-icon">⚖️</div>
                  <div className="compliance-text">
                    <strong>Gestión Ética &amp; Certificación Tributaria:</strong> Los recursos aportados a este programa cuentan con trazabilidad transparente y son auditados conforme al Régimen Tributario Especial (DIAN en Colombia) y estatutos 501(c) en Florida, Estados Unidos.
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="program-cta-group">
                  <button
                    type="button"
                    className="program-primary-cta"
                    onClick={() => {
                      setModalLineInterest(program.title);
                      setIsModalOpen(true);
                    }}
                  >
                    <span>Sumar Apoyo a este Programa</span>
                    <span className="cta-arrow">↗</span>
                  </button>

                  <a
                    href={`https://wa.me/573181101131?text=Hola,%20quisiera%20sumar%20apoyo%20o%20conocer%20más%20del%20programa%20${encodeURIComponent(program.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="program-whatsapp-cta"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span>Consultar por WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Other Programs Showcase Carousel */}
          <section className="program-explore-others">
            <div className="explore-header">
              <div className="statement-kicker-row">
                <span className="statement-kicker-dot" />
                <span className="statement-kicker-text">ACCIÓN SOCIAL CONTINUA</span>
              </div>
              <h3 className="explore-title">
                EXPLORAR OTROS{' '}
                <span className="statement-serif-word">PROGRAMAS OFICIALES.</span>
              </h3>
            </div>

            <div className="other-programs-grid">
              {otherPrograms.map((other, idx) => (
                <a
                  key={other.id}
                  href={`/programas/${other.id}/`}
                  className="other-program-card"
                >
                  <div className="other-card-media">
                    <img src={other.img} alt={other.title} />
                    <span className="other-card-tag">{other.tag.split('·')[0].trim()}</span>
                  </div>
                  <div className="other-card-content">
                    <h4 className="other-card-title">{other.title}</h4>
                    <p className="other-card-desc">{other.desc}</p>
                    <span className="other-card-link">
                      <span>Ver Programa</span>
                      <span>→</span>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* ==========================================================================
          7. FOOTER SECTION: CONTACTO & POLÍTICAS (Preserved Exactly As Requested)
          ========================================================================== */}
      <footer className="section footer-section" id="contact" style={{ backgroundColor: '#070A18', position: 'relative', height: 'auto', minHeight: 'auto', overflow: 'visible' }}>
        <div className="footer-huge-wordmark">
          <h1 className="giant-mavka" style={{ color: '#ffffff' }}>
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
              {binacionalInfo.colombia.razonSocial}
            </h3>
            <p style={{ fontSize: '12px', color: '#A1A8C5', lineHeight: '1.5', marginBottom: '10px' }}>
              NIT: {binacionalInfo.colombia.nit}<br />
              {binacionalInfo.colombia.direccion}
            </p>
            <a href={`mailto:${binacionalInfo.colombia.correo}`} className="contact-link email-link" style={{ color: '#E7CD54' }}>
              {binacionalInfo.colombia.correo}
            </a>
            <a href={`tel:${binacionalInfo.colombia.telefono.replace(/\s+/g, '')}`} className="contact-link phone-link">
              {binacionalInfo.colombia.telefono}
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
              {binacionalInfo.usa.razonSocial}
            </h3>
            <p style={{ fontSize: '12px', color: '#A1A8C5', lineHeight: '1.5', marginBottom: '10px' }}>
              EIN: {binacionalInfo.usa.ein}<br />
              Registro: {binacionalInfo.usa.registro} (Florida Active)
            </p>
            <a href={`mailto:${binacionalInfo.usa.correo}`} className="contact-link email-link" style={{ color: '#E7CD54' }}>
              {binacionalInfo.usa.correo}
            </a>
            <a href={`tel:${binacionalInfo.usa.telefono.replace(/\s+/g, '')}`} className="contact-link phone-link">
              {binacionalInfo.usa.telefono}
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
            {filosofia}
          </div>
          <button
            type="button"
            className="banner-meet-btn"
            style={{ backgroundColor: '#E7CD54', color: '#101633', fontWeight: '800' }}
            onClick={() => {
              setModalLineInterest(program.title);
              setIsModalOpen(true);
            }}
          >
            Sumar Apoyo
          </button>
        </div>
      </footer>

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
            {legalDocs[activeLegalDocKey] && (
              <div className="legal-modal-body">
                <h2 className="legal-doc-title">
                  {legalDocs[activeLegalDocKey].title}
                </h2>
                <div className="legal-doc-subtitle">
                  {legalDocs[activeLegalDocKey].subtitle}
                </div>

                <div>
                  {legalDocs[activeLegalDocKey].articles.map((art) => (
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

                <div className="legal-modal-footer">
                  <button
                    type="button"
                    className="legal-close-action-btn"
                    onClick={() => setLegalModalOpen(false)}
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
                <option value={program.title}>Programa: {program.title}</option>
                <option value="Donación / Aporte General">Donación Económica General</option>
                <option value="Donación Colombia">Donación en Colombia (NIT 901.689.340-5)</option>
                <option value="Donación USA">Donación en Estados Unidos (Regions Bank)</option>
                <option value="Mamita Déjalo Latir">Programa: Mamita Déjalo Latir</option>
                <option value="El Niño De Belén">Programa: El Niño De Belén</option>
                <option value="Dando Amor a Amigos de la Calle">Programa: Amigos de la Calle (Nutrición &amp; Cena)</option>
                <option value="Banco de Ropa & Casi New">Campaña: Banco de Ropa &amp; Casi New</option>
                <option value="Misioneros & Parroquias">Iniciativa: Misioneros &amp; Parroquias</option>
                <option value="Turismo Misionero con Propósito">Programa: Turismo Misionero con Propósito</option>
                <option value="Escuela de Formación y Oficios">Programa: Escuela de Formación y Oficios</option>
                <option value="Construcción Centro Integral">Proyecto: Construcción Centro Integral</option>
                <option value="Voluntariado en Territorio">Voluntariado (Nacional / Internacional)</option>
                <option value="Certificados y Transparencia">Certificado de Donación / Beneficio Tributario</option>
              </select>

              <textarea rows={3} placeholder="¿Cómo te gustaría colaborar o en qué podemos apoyarte?" className="form-input textarea-input"></textarea>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', margin: '4px 0' }}>
                <input type="checkbox" id="privacy-consent-program" required style={{ marginTop: '3px' }} />
                <label htmlFor="privacy-consent-program" style={{ fontSize: '11.5px', color: '#A1A8C5' }}>
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
