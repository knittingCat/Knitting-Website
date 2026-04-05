/* ── NAVIGATION ── */
const hamburger = document.querySelector('.nav-hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('open'));
  });
  // Close on nav link click (mobile)
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// Highlight active nav link based on page filename
(function() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html') ||
        (page === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── LESSON ACCORDIONS ── */
document.querySelectorAll('.lesson-header').forEach(header => {
  header.addEventListener('click', () => {
    const card = header.closest('.lesson-card');
    const isOpen = card.classList.contains('open');

    // Close all
    document.querySelectorAll('.lesson-card.open').forEach(c => c.classList.remove('open'));

    // Toggle clicked (open if was closed)
    if (!isOpen) card.classList.add('open');
  });
});

/* ── STITCH FILTER ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const stitchCards = document.querySelectorAll('.stitch-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const level = btn.dataset.filter;
    stitchCards.forEach(card => {
      if (level === 'all' || card.dataset.level === level) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
