/**
 * Cursor & UI Interactions for Trilok Industries
 * Features:
 * 1. High-precision Magnetic Cursor & Follower Ring with state morphing.
 * 2. 3D Card Tilt Physics with Specular Glare following exact cursor coords.
 * 3. Dynamic Magnetic Pull for all buttons & badges.
 * 4. Interactive Infrastructure Table Search & Filter for all 28 machines.
 * 5. Full Enquiry Form Validation & Submission Modal with confetti.
 * 6. Product Detail Modal & Quick Quote pre-filling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Custom Smooth Cursor with Morphing States
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }
  });

  function renderCursor() {
    // Easing for follower ring
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    if (cursorRing) {
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    }
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Add hover classes for interactive elements
  const interactives = document.querySelectorAll('button, a, input, select, textarea, .card-3d, .clickable');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });

  // 2. 3D Card Tilt Physics with Dynamic Specular Glare
  const tiltCards = document.querySelectorAll('.card-3d');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update CSS variables for specular lighting
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Calculate 3D tilt angles
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = (centerY - y) / 12; // tilt around X axis
      const tiltY = (x - centerX) / 12; // tilt around Y axis

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // 3. Magnetic Pull on Buttons
  const magneticButtons = document.querySelectorAll('.btn-magnetic');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate3d(${x * 0.28}px, ${y * 0.28}px, 0)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate3d(0, 0, 0)';
    });
  });

  // 4. Hero Category Cards Switcher
  const heroCards = document.querySelectorAll('.hero-category-card');
  heroCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      heroCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // 5. Technical Showcase Tabs
  const specTabs = document.querySelectorAll('.spec-tab-btn');
  const specPanes = document.querySelectorAll('.spec-pane');
  specTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      specTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      specPanes.forEach(pane => {
        if (pane.id === target) {
          pane.classList.remove('hidden');
          pane.classList.add('active');
        } else {
          pane.classList.add('hidden');
          pane.classList.remove('active');
        }
      });
    });
  });

  // 6. Infrastructure Dynamic Search & Table Filter
  const infraSearch = document.getElementById('infra-search-input');
  const infraTableBody = document.getElementById('infra-table-body');
  const infraCountBadge = document.getElementById('infra-count-badge');

  function renderInfraTable(items) {
    if (!infraTableBody) return;
    infraTableBody.innerHTML = items.map((item, idx) => `
      <tr class="border-b border-slate-100 hover:bg-amber-50/40 transition-colors">
        <td class="py-3 px-4 text-xs font-mono font-bold text-amber-600">${item.sl < 10 ? '0' + item.sl : item.sl}</td>
        <td class="py-3 px-4">
          ${item.photo ? `
            <a href="${item.photo}" target="_blank" title="View Machine Photo" class="inline-block relative group">
              <img src="${item.photo}" alt="${item.machine}" class="w-12 h-9 object-cover rounded border border-slate-200 group-hover:scale-125 transition-transform shadow-sm">
            </a>
          ` : `<span class="text-[10px] text-slate-400 font-mono">Shop Floor</span>`}
        </td>
        <td class="py-3 px-4 font-semibold text-slate-900">${item.machine}</td>
        <td class="py-3 px-4 text-xs font-mono text-slate-600 bg-slate-50/50 rounded">${item.specs}</td>
        <td class="py-3 px-4 text-sm text-slate-700">${item.make}</td>
        <td class="py-3 px-4 text-xs font-bold text-slate-900">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800">${item.qty}</span>
        </td>
      </tr>
    `).join('');

    if (infraCountBadge) {
      infraCountBadge.textContent = `${items.length} Machines Listed`;
    }
  }

  const getInfraData = () => {
    return (window.TRILOK_DATA && window.TRILOK_DATA.infrastructure) ? window.TRILOK_DATA.infrastructure : [];
  };

  renderInfraTable(getInfraData());

  if (infraSearch) {
    infraSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const list = getInfraData();
      const filtered = list.filter(item => 
        item.machine.toLowerCase().includes(query) ||
        item.specs.toLowerCase().includes(query) ||
        item.make.toLowerCase().includes(query)
      );
      renderInfraTable(filtered);
    });
  }

  // 7. Modals: Enquiry Modal & Product Detail Modal
  const enquiryModal = document.getElementById('enquiry-modal');
  const productModal = document.getElementById('product-detail-modal');
  const openEnquiryButtons = document.querySelectorAll('.open-enquiry-modal');
  const closeModalButtons = document.querySelectorAll('.close-modal');

  openEnquiryButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefillProduct = btn.dataset.product || '';
      const subjectInput = document.getElementById('modal-enquiry-subject');
      if (subjectInput && prefillProduct) {
        subjectInput.value = prefillProduct;
      }
      if (enquiryModal) {
        enquiryModal.classList.remove('hidden');
        enquiryModal.classList.add('flex');
      }
    });
  });

  closeModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (enquiryModal) {
        enquiryModal.classList.add('hidden');
        enquiryModal.classList.remove('flex');
      }
      if (productModal) {
        productModal.classList.add('hidden');
        productModal.classList.remove('flex');
      }
    });
  });

  // Close on backdrop click
  window.addEventListener('click', (e) => {
    if (e.target === enquiryModal) {
      enquiryModal.classList.add('hidden');
      enquiryModal.classList.remove('flex');
    }
    if (e.target === productModal) {
      productModal.classList.add('hidden');
      productModal.classList.remove('flex');
    }
  });

  // 8. Product Detail Modal Inspection
  const inspectProductButtons = document.querySelectorAll('.inspect-product-btn');
  inspectProductButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prodId = btn.dataset.id;
      const product = ((window.TRILOK_DATA && window.TRILOK_DATA.products) || []).find(p => p.id === prodId);
      if (!product || !productModal) return;

      document.getElementById('modal-product-title').textContent = product.name;
      document.getElementById('modal-product-category').textContent = product.category;
      document.getElementById('modal-product-desc').textContent = product.shortDesc;

      const modalImg = document.getElementById('modal-product-image');
      if (modalImg && product.image) {
        modalImg.src = product.image;
        modalImg.alt = product.name;
      }

      const specsContainer = document.getElementById('modal-product-specs');
      if (specsContainer) {
        specsContainer.innerHTML = Object.entries(product.specs).map(([key, val]) => `
          <div class="flex justify-between items-center py-2 border-b border-slate-100">
            <span class="text-xs uppercase tracking-wider text-slate-500 font-medium">${key}</span>
            <span class="text-sm font-semibold text-slate-900">${val}</span>
          </div>
        `).join('');
      }

      const featuresContainer = document.getElementById('modal-product-features');
      if (featuresContainer) {
        featuresContainer.innerHTML = product.features.map(f => `
          <li class="flex items-start text-sm text-slate-700">
            <span class="text-amber-500 mr-2">✓</span>
            <span>${f}</span>
          </li>
        `).join('');
      }

      const ctaBtn = document.getElementById('modal-product-quote-cta');
      if (ctaBtn) {
        ctaBtn.dataset.product = product.name;
      }

      productModal.classList.remove('hidden');
      productModal.classList.add('flex');
      if (window.lucide) lucide.createIcons();
    });
  });

  // Gallery Card Click to View Photo in Modal
  const galleryCards = document.querySelectorAll('#gallery .card-3d');
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('h4') ? card.querySelector('h4').textContent : 'Machinery Photo';
      const desc = card.querySelector('span') ? card.querySelector('span').textContent : '';

      if (!productModal || !img) return;

      document.getElementById('modal-product-title').textContent = title;
      document.getElementById('modal-product-category').textContent = 'Equipment Archive & Factory Evidence';
      document.getElementById('modal-product-desc').textContent = desc;

      const modalImg = document.getElementById('modal-product-image');
      if (modalImg) {
        modalImg.src = img.src;
        modalImg.alt = title;
      }

      const specsContainer = document.getElementById('modal-product-specs');
      if (specsContainer) {
        specsContainer.innerHTML = `
          <div class="flex justify-between items-center py-2 border-b border-slate-100">
            <span class="text-xs uppercase tracking-wider text-slate-500 font-medium">Source:</span>
            <span class="text-sm font-semibold text-slate-900">M/s. Trilok Industries Workshop Archive</span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-slate-100">
            <span class="text-xs uppercase tracking-wider text-slate-500 font-medium">Location:</span>
            <span class="text-sm font-semibold text-slate-900">B/15 Industrial Estate, Kalunga</span>
          </div>
        `;
      }

      const featuresContainer = document.getElementById('modal-product-features');
      if (featuresContainer) {
        featuresContainer.innerHTML = `
          <li class="flex items-start text-sm text-slate-700">
            <span class="text-amber-500 mr-2">✓</span>
            <span>Verified field installation manufactured and erected by Trilok Industries.</span>
          </li>
        `;
      }

      const ctaBtn = document.getElementById('modal-product-quote-cta');
      if (ctaBtn) {
        ctaBtn.dataset.product = title;
      }

      productModal.classList.remove('hidden');
      productModal.classList.add('flex');
      if (window.lucide) lucide.createIcons();
    });
  });

  // 9. Toast Notification Engine
  function showToast(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white border border-amber-500/40 rounded-xl p-4 shadow-2xl flex items-center gap-3 transform translate-y-20 opacity-0 transition-all duration-300';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold flex-shrink-0">✓</div>
      <div class="text-sm font-medium leading-relaxed">${message}</div>
    `;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 4500);
  }
  window.showAppToast = showToast;

  // 10. Smooth Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // =========================================================================
  // 11. SCROLLSPY & RUNNING MINIATURE HEAVY VEHICLE TRACKER
  // =========================================================================
  const navCarrier = document.getElementById('nav-heavy-vehicle-carrier');
  const vehicleWrapper = document.getElementById('nav-vehicle-wrapper');
  const desktopNav = document.getElementById('desktop-nav');
  const navLinks = Array.from(document.querySelectorAll('.nav-section-link'));

  let currentActiveIndex = 0;
  let lastScrollY = window.scrollY;
  let movementTimeout = null;

  function updateVehiclePosition(activeLink, isScrollingUp) {
    if (!navCarrier || !activeLink || !desktopNav) return;

    const navRect = desktopNav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    
    // Calculate center of the link relative to desktopNav container
    const targetX = (linkRect.left - navRect.left) + (linkRect.width / 2) - 18;

    navCarrier.style.transform = `translateX(${targetX}px)`;

    // Directional orientation: face left when scrolling up, face right when scrolling down
    if (vehicleWrapper) {
      if (isScrollingUp) {
        vehicleWrapper.classList.add('face-left');
      } else {
        vehicleWrapper.classList.remove('face-left');
      }
    }

    // Trigger wheel rolling animation while in motion
    navCarrier.classList.add('is-driving');
    if (vehicleWrapper) vehicleWrapper.classList.add('vehicle-driving');

    clearTimeout(movementTimeout);
    movementTimeout = setTimeout(() => {
      navCarrier.classList.remove('is-driving');
      if (vehicleWrapper) vehicleWrapper.classList.remove('vehicle-driving');
    }, 450);
  }

  function setActiveNavLink(targetLink, isScrollingUp) {
    if (!targetLink) return;
    navLinks.forEach(link => link.classList.remove('active'));
    targetLink.classList.add('active');
    updateVehiclePosition(targetLink, isScrollingUp);
  }

  // Section targets for ScrollSpy in exact page scroll sequence
  const sectionTargets = [
    { id: 'home', el: document.getElementById('home') },
    { id: 'products', el: document.getElementById('products') },
    { id: 'gallery', el: document.getElementById('gallery') },
    { id: 'about', el: document.getElementById('about') },
    { id: 'infrastructure', el: document.getElementById('infrastructure') },
    { id: 'clients', el: document.getElementById('clients') },
    { id: 'quality', el: document.getElementById('quality') },
    { id: 'contact', el: document.getElementById('contact') }
  ];

  function handleScrollSpy() {
    const scrollPosition = window.scrollY + 180;
    const isScrollingUp = window.scrollY < lastScrollY - 2;
    const isScrollingDown = window.scrollY > lastScrollY + 2;

    // Dynamically orient vehicle while user is scrolling
    if (vehicleWrapper) {
      if (isScrollingUp) {
        vehicleWrapper.classList.add('face-left');
      } else if (isScrollingDown) {
        vehicleWrapper.classList.remove('face-left');
      }
    }
    lastScrollY = window.scrollY;

    let activeIdx = 0;
    for (let i = 0; i < sectionTargets.length; i++) {
      const sec = sectionTargets[i];
      if (sec.el) {
        const top = sec.el.offsetTop;
        const height = sec.el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          activeIdx = i;
          break;
        }
        if (scrollPosition >= top) {
          activeIdx = i;
        }
      }
    }

    // Bottom of page detection for contact section
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 70) {
      activeIdx = sectionTargets.length - 1;
    }

    if (activeIdx !== currentActiveIndex && navLinks[activeIdx]) {
      const goingUp = activeIdx < currentActiveIndex;
      currentActiveIndex = activeIdx;
      setActiveNavLink(navLinks[activeIdx], goingUp);
    }
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(handleScrollSpy);
  }, { passive: true });

  // On page load or resize, position vehicle on currently active link
  setTimeout(() => {
    const activeLink = document.querySelector('.nav-section-link.active') || navLinks[0];
    if (activeLink) updateVehiclePosition(activeLink, false);
  }, 200);

  window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.nav-section-link.active') || navLinks[0];
    if (activeLink) updateVehiclePosition(activeLink, false);
  });

  // Clicking a nav link smoothly animates the vehicle
  navLinks.forEach((link, idx) => {
    link.addEventListener('click', (e) => {
      const isUp = idx < currentActiveIndex;
      currentActiveIndex = idx;
      setActiveNavLink(link, isUp);
    });
  });
});
