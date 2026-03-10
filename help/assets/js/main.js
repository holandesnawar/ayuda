// =============================================
// NAWAR — HELP CENTER
// Shared JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  // ── Navbar Scroll Header ──
  const navbar = document.querySelector('.navbar');

  function updateNavbar() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Only apply scroll effect if it's not a "solid" navbar already
  if (!navbar.classList.contains('solid')) {
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Check on load
  }

  // ── Dropdowns Click Behavior ──
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');

    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Close other dropdowns
      dropdowns.forEach(d => {
        if (d !== dropdown) d.classList.remove('open');
      });

      // Toggle current
      dropdown.classList.toggle('open');
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    dropdowns.forEach(d => d.classList.remove('open'));
  });

  // Prevent closing when clicking inside the dropdown menu
  const dropdownMenus = document.querySelectorAll('.nav-dropdown-menu');
  dropdownMenus.forEach(menu => {
    menu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  // ── Mobile Menu ──
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileClose = document.getElementById('mobileClose');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
  }

  function closeMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // ── Hero Search Functional ──
  const heroSearchInput = document.getElementById('heroSearch');
  const heroSearchContainer = document.querySelector('.hero-search');
  const popularTags = document.querySelectorAll('.popular-tag');

  // Hardcoded mini-database of articles for the search (simulating dynamic content)
  const articlesDatabase = [
    { title: 'De vs Het: Guía definitiva', desc: 'Aprende las reglas para saber cuándo usar cada artículo.', url: 'articulo/de-vs-het/', cat: 'Gramática' },
    { title: 'Niet vs Geen: La negación', desc: 'Cómo y cuándo usar cada una de las negaciones en neerlandés.', url: 'articulo/niet-vs-geen/', cat: 'Gramática' },
    { title: 'Verbos Separables', desc: 'Domina los verbos que se parten en dos en la frase.', url: 'articulo/verbos-separables/', cat: 'Gramática' },
    { title: 'Zijn vs Hebben — Guía completa', desc: 'Cuándo usar ser/estar vs haber/tener en neerlandés.', url: 'articulo/diferencia-zijn-hebben/', cat: 'Gramática' },
    { title: 'Omdat vs Want', desc: 'Las dos formas de expresar "porque" y por qué no son iguales.', url: 'articulo/omdat-vs-want/', cat: 'Gramática' },
    { title: 'Vocabulario Supermercado', desc: '60+ palabras esenciales para hacer la compra.', url: 'articulo/vocabulario-supermercado/', cat: 'Vocabulario' },
    { title: 'Vocabulario Farmacia', desc: 'Todo lo que necesitas saber para ir a la apotheek.', url: 'articulo/vocabulario-farmacia/', cat: 'Vocabulario' },
    { title: 'Familia en Neerlandés', desc: 'Vocabulario esencial sobre los miembros de la familia.', url: 'articulo/familia-holandes/', cat: 'Vocabulario' },
    { title: 'Pronunciación G y CH', desc: 'Cómo sonar como un nativo con estos sonidos.', url: 'articulo/pronunciacion-g-ch/', cat: 'Pronunciación' },
    { title: 'Diptongo UI', desc: 'Guía práctica para pronunciar el sonido más difícil.', url: 'articulo/pronunciacion-ui/', cat: 'Pronunciación' },
    { title: 'Cómo acceder al curso', desc: 'Paso a paso para entrar en la plataforma Circle.', url: 'articulo/como-acceder-al-curso/', cat: 'Recursos' },
    { title: 'Cómo usar las flashcards', desc: 'Repetición espaciada para memorizar vocabulario.', url: 'articulo/como-usar-flashcards/', cat: 'Recursos' }
  ];

  // Create results overlay
  const resultsOverlay = document.createElement('div');
  resultsOverlay.className = 'search-results-overlay';
  if (heroSearchContainer) {
    heroSearchContainer.appendChild(resultsOverlay);
  }

  function performSearch(query) {
    if (!query || query.length < 2) {
      resultsOverlay.classList.remove('open');
      return;
    }

    const filtered = articlesDatabase.filter(a =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.desc.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length > 0) {
      resultsOverlay.innerHTML = filtered.map(a => {
        const highlightedTitle = a.title.replace(new RegExp(query, 'gi'), match => `<span class="search-highlight">${match}</span>`);
        return `
          <a href="${a.url}" class="search-result-item">
            <div class="search-result-cat">${a.cat}</div>
            <div class="search-result-title">${highlightedTitle}</div>
          </a>
        `;
      }).join('');
      resultsOverlay.classList.add('open');
    } else {
      resultsOverlay.innerHTML = '<div style="padding: 20px; color: #94a3b8; font-size: 14px;">No se encontraron resultados...</div>';
      resultsOverlay.classList.add('open');
    }
  }

  if (heroSearchInput) {
    heroSearchInput.addEventListener('input', (e) => {
      performSearch(e.target.value.trim());
    });

    // Close results when clicking outside
    document.addEventListener('click', (e) => {
      if (heroSearchContainer && !heroSearchContainer.contains(e.target)) {
        resultsOverlay.classList.remove('open');
      }
    });
  }

  popularTags.forEach(tag => {
    tag.addEventListener('click', () => {
      if (heroSearchInput) {
        heroSearchInput.value = tag.textContent.trim();
        heroSearchInput.focus();
        performSearch(tag.textContent.trim());
      }
    });
  });

  // ── Mini Search focus ──
  const miniSearch = document.getElementById('miniSearch');
  if (miniSearch) {
    miniSearch.addEventListener('click', () => {
      if (heroSearchInput) {
        heroSearchInput.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // ── Active nav link ──
  function setActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && currentPath.includes(href) && href !== 'index.html' && href !== '/') {
        link.classList.add('active');
      }
    });
  }
  setActiveNav();

  // ── TOC active tracking ──
  const tocLinks = document.querySelectorAll('.toc-link');
  if (tocLinks.length > 0) {
    const articleHeadings = document.querySelectorAll('.article-content h2, .article-content h3');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocLinks.forEach(l => l.classList.remove('active'));
          const id = entry.target.getAttribute('id');
          const activeLink = document.querySelector(`.toc-link[href="#${id}"]`);
          if (activeLink) activeLink.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    articleHeadings.forEach(h => observer.observe(h));
  }
});
