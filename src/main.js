/* ==========================================================================
   MAVKA EVENT — Interactive Behaviors & Kinetic Animation Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSlicedTypography();
  initCustomCursor();
  initServicesInteraction();
  initTimelineCarousel();
  initAnimatedCounters();
  initPresentationControls();
  initHeroSparkles();
  initModals();
});

/* ==========================================================================
   1. Kinetic Sliced Typography Engine
   ========================================================================== */
function initSlicedTypography() {
  const heroTitle = document.querySelector('.sliced-title-group');
  if (heroTitle) {
    // Trigger on load with slight delay for wow factor
    setTimeout(() => {
      triggerSlicedGlitch(heroTitle);
    }, 400);

    // Replay on click or hover
    heroTitle.addEventListener('mouseenter', () => {
      triggerSlicedGlitch(heroTitle);
    });
  }

  // Glitch effect on "ORGANIZERS OF EMOTIONAL SUPER EVENTS"
  const statementBlocks = document.querySelectorAll('.sliced-block');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('glitching');
        setTimeout(() => {
          entry.target.classList.remove('glitching');
        }, 1200);
      }
    });
  }, { threshold: 0.25 });

  statementBlocks.forEach(block => observer.observe(block));
}

function triggerSlicedGlitch(element) {
  element.classList.remove('animating');
  // force reflow
  void element.offsetWidth;
  element.classList.add('animating');
  setTimeout(() => {
    element.classList.remove('animating');
  }, 900);
}

/* ==========================================================================
   2. Custom Magnetic Yellow Cursor Follower
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let isHoveringInteractive = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth lerp loop
  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;

    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%) scale(${isHoveringInteractive ? 1 : 0})`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Targets that reveal the yellow arrow cursor (Services list & Work cards)
  const interactiveTargets = document.querySelectorAll('.services-list, .service-item, .work-card, .timeline-cheers-col');

  interactiveTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      isHoveringInteractive = true;
      cursor.classList.add('visible');
    });
    el.addEventListener('mouseleave', () => {
      isHoveringInteractive = false;
      cursor.classList.remove('visible');
    });
  });
}

/* ==========================================================================
   3. Interactive Services List Hover & Dim Effect
   ========================================================================== */
function initServicesInteraction() {
  const serviceItems = document.querySelectorAll('.service-item');
  const cursor = document.getElementById('custom-cursor');

  serviceItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      // Remove default active state from all items
      serviceItems.forEach(i => i.classList.remove('active-hover'));
      item.classList.add('active-hover');

      if (cursor) {
        cursor.style.transform += ' scale(1.15)';
      }
    });

    item.addEventListener('click', () => {
      const serviceName = item.querySelector('.service-name')?.textContent || 'Service';
      openCaseStudyModal(serviceName, `Our specialized ${serviceName.toLowerCase()} unit provides high-touch strategy, world-class production, and bespoke art direction for premier international gatherings.`);
    });
  });
}

/* ==========================================================================
   4. Timeline Horizontal Carousel
   ========================================================================== */
function initTimelineCarousel() {
  const track = document.getElementById('timeline-scroll');
  const prevBtn = document.getElementById('timeline-prev');
  const nextBtn = document.getElementById('timeline-next');
  if (!track) return;

  const scrollStep = 380;

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollStep, behavior: 'smooth' });
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    });
  }

  // Mouse wheel horizontal scroll support
  track.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      track.scrollLeft += e.deltaY;
    }
  }, { passive: false });
}

/* ==========================================================================
   5. Animated Stat Counters (205 -> 304, 2.9 -> 4.9 ★)
   ========================================================================== */
function initAnimatedCounters() {
  const projectsEl = document.getElementById('counter-projects');
  const ratingEl = document.getElementById('counter-rating');
  let animated = false;

  const statsSection = document.querySelector('.metric-cards-container');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateNumber(projectsEl, 0, 304, 1800, 0);
        animateRating(ratingEl, 1.0, 4.9, 1800);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}

function animateNumber(element, start, end, duration, decimals = 0) {
  if (!element) return;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = start + (end - start) * ease;

    element.textContent = current.toFixed(decimals);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = end.toFixed(decimals);
    }
  }

  requestAnimationFrame(update);
}

function animateRating(element, start, end, duration) {
  if (!element) return;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = (start + (end - start) * ease).toFixed(1);

    element.innerHTML = `${current}<span class="star-glyph">★</span>`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.innerHTML = `${end.toFixed(1)}<span class="star-glyph">★</span>`;
    }
  }

  requestAnimationFrame(update);
}

/* ==========================================================================
   6. Presentation Controls & Auto Tour
   ========================================================================== */
function initPresentationControls() {
  const btnToggle = document.getElementById('btn-toggle-frame');
  const btnReplay = document.getElementById('btn-replay');

  if (btnToggle) {
    btnToggle.addEventListener('click', () => {
      document.body.classList.toggle('full-mode');
      const isFull = document.body.classList.contains('full-mode');
      btnToggle.classList.toggle('active', !isFull);
      btnToggle.innerHTML = isFull
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg> Full Window`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg> Dribbble Frame`;
    });
  }

  if (btnReplay) {
    btnReplay.addEventListener('click', runAutoTour);
  }
}

function runAutoTour() {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const heroTitle = document.querySelector('.sliced-title-group');
  if (heroTitle) triggerSlicedGlitch(heroTitle);

  const sections = ['#about', '#services', '#timeline', '#people', '#contact'];
  let delay = 1600;

  sections.forEach((secId) => {
    setTimeout(() => {
      const el = document.querySelector(secId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, delay);
    delay += 3200;
  });

  // Return to top at the end
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      if (heroTitle) triggerSlicedGlitch(heroTitle);
    }, 1200);
  }, delay + 2000);
}

/* ==========================================================================
   7. Ambient Hero Celebration Sparkles Canvas
   ========================================================================== */
function initHeroSparkles() {
  const canvas = document.getElementById('sparkles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const colors = ['#FFD152', '#7C5CFC', '#FF845E', '#68B2FF', '#FFFFFF'];

  for (let i = 0; i < 35; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.2 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.7 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      pulse: Math.random() * 0.05 + 0.02
    });
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.alpha += p.pulse;

      if (p.alpha > 0.85 || p.alpha < 0.2) p.pulse = -p.pulse;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }
  loop();
}

/* ==========================================================================
   8. Modals & Interactive Actions
   ========================================================================== */
function initModals() {
  const modal = document.getElementById('contact-modal');
  const closeBtn = document.getElementById('modal-close');
  const triggers = [
    document.getElementById('nav-contact-trigger'),
    document.getElementById('banner-book-trigger'),
    document.getElementById('meet-team-trigger')
  ];

  function openModal() {
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  triggers.forEach(btn => {
    if (btn) btn.addEventListener('click', openModal);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Work cards click modal
  const workCards = document.querySelectorAll('.work-card');
  workCards.forEach(card => {
    card.addEventListener('click', () => {
      const workId = card.getAttribute('data-work');
      let title = "Featured Experience";
      let desc = "A multi-sensory brand celebration crafted by Mavka Event with custom art installations, ambient lighting, and bespoke catering.";

      if (workId === 'holiday-magic') {
        title = "Holiday Magic Festival";
        desc = "A winter wonderland gala featuring gourmet sweet stations, immersive star sculptures, live orchestra, and signature festive cocktails.";
      } else if (workId === 'teamtrek') {
        title = "TeamTrek: A Journey to Collective Inspiration";
        desc = "An executive retreat blending analog vinyl listening rooms, botanical mixology workshops, and collaborative leadership summits.";
      } else if (workId === 'influence') {
        title = "Influence 360°: Insider Summit for Influencers";
        desc = "An exclusive gathering for world-class creators and digital tastemakers with podcast recording pods and networking salons.";
      } else if (workId === 'innovation') {
        title = "Innovation Summit: Inspiration and Progress";
        desc = "A state-of-the-art corporate conference connecting industry pioneers with interactive keynote stages and tech showcases.";
      }

      openCaseStudyModal(title, desc);
    });
  });

  // Newsletter form toast
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing to Mavka Event news and invitations!');
      newsletterForm.reset();
    });
  }

  // Consultation form submit
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your consultation request has been received. Our team will contact you shortly.');
      bookingForm.reset();
      closeModal();
    });
  }
}

function openCaseStudyModal(title, description) {
  const modal = document.getElementById('contact-modal');
  const modalTitle = modal?.querySelector('.modal-title');
  const modalSub = modal?.querySelector('.modal-sub');

  if (modalTitle && modalSub) {
    modalTitle.textContent = title;
    modalSub.textContent = description;
  }
  if (modal) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }
}
