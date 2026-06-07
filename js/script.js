/* CODEZZY - Main JavaScript */
(function () {
  'use strict';

  const SEARCH_DATA = [
    { title: 'Python for Beginners', url: 'programming.html', category: 'Programming' },
    { title: 'HTML & CSS Fundamentals', url: 'web-development.html', category: 'Web Development' },
    { title: 'Introduction to Cyber Security', url: 'cyber-security.html', category: 'Cyber Security' },
    { title: 'Machine Learning Basics', url: 'ai-ml.html', category: 'AI & ML' },
    { title: 'OSI Model Explained', url: 'networking.html', category: 'Networking' },
    { title: 'Linux Commands Cheat Sheet', url: 'linux.html', category: 'Linux' },
    { title: 'Cloud Computing Overview', url: 'cloud-computing.html', category: 'Cloud' },
    { title: 'Domain & Hosting Guide', url: 'domain-hosting.html', category: 'Hosting' },
    { title: 'GPA Calculator Tool', url: 'tools.html', category: 'Tools' },
    { title: 'Interview Preparation', url: 'career-guidance.html', category: 'Career' },
    { title: 'JavaScript Projects', url: 'projects.html', category: 'Projects' },
    { title: 'All Tutorials', url: 'tutorials.html', category: 'Tutorials' },
    { title: 'Blog Articles', url: 'blog.html', category: 'Blog' },
    { title: 'Free Resources', url: 'resources.html', category: 'Resources' },
    { title: 'FAQ', url: 'faq.html', category: 'Help' },
    { title: 'C Programming', url: 'programming.html', category: 'Programming' },
    { title: 'Ethical Hacking Basics', url: 'cyber-security.html', category: 'Cyber Security' },
    { title: 'AWS Cloud Basics', url: 'cloud-computing.html', category: 'Cloud' },
    { title: 'React Introduction', url: 'web-development.html', category: 'Web Development' },
    { title: 'Neural Networks Guide', url: 'ai-ml.html', category: 'AI & ML' }
  ];

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initLoader();
    initTheme();
    initHeader();
    initMobileNav();
    initSearch();
    initScrollTop();
    initCounters();
    initFAQ();
    initNewsletter();
    initNewsletterPopup();
    initFadeIn();
    initAuthForms();
    initTools();
    initTutorialFilter();
    initBlogTabs();
    setActiveNav();
  }

  /* Page Loader */
  function initLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 400);
    });
    setTimeout(() => loader.classList.add('hidden'), 3000);
  }

  /* Dark Mode */
  function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const saved = localStorage.getItem('codezzy-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('codezzy-theme', next);
        updateThemeIcon(toggle, next);
      });
      updateThemeIcon(toggle, document.documentElement.getAttribute('data-theme') || 'light');
    }
  }

  function updateThemeIcon(btn, theme) {
    btn.innerHTML = theme === 'dark' ? '&#9728;' : '&#9790;';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  /* Sticky Header */
  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  /* Mobile Navigation */
  function initMobileNav() {
    const toggle = document.getElementById('mobile-toggle');
    const nav = document.getElementById('mobile-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* Search */
  function initSearch() {
    const inputs = document.querySelectorAll('.search-box input, #global-search');
    inputs.forEach(input => {
      const box = input.closest('.search-box') || input.parentElement;
      let results = box.querySelector('.search-results');
      if (!results) {
        results = document.createElement('div');
        results.className = 'search-results';
        box.appendChild(results);
      }
      input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        if (q.length < 2) { results.classList.remove('active'); return; }
        const matches = SEARCH_DATA.filter(item =>
          item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
        ).slice(0, 6);
        if (matches.length === 0) {
          results.innerHTML = '<div class="search-result-item">No results found</div>';
        } else {
          results.innerHTML = matches.map(m =>
            `<a href="${m.url}" class="search-result-item">${m.title}<small>${m.category}</small></a>`
          ).join('');
        }
        results.classList.add('active');
      });
      document.addEventListener('click', e => {
        if (!box.contains(e.target)) results.classList.remove('active');
      });
    });
  }

  /* Scroll to Top */
  function initScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* Counter Animation */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  /* FAQ Accordion */
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item.active').forEach(i => {
          i.classList.remove('active');
          i.querySelector('.faq-answer').style.maxHeight = '0';
        });
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
    const faqSearch = document.getElementById('faq-search');
    if (faqSearch) {
      faqSearch.addEventListener('input', () => {
        const q = faqSearch.value.toLowerCase();
        document.querySelectorAll('.faq-item').forEach(item => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(q) ? '' : 'none';
        });
      });
    }
  }

  /* Newsletter */
  function initNewsletter() {
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]');
        if (!email || !validateEmail(email.value)) {
          showToast('Please enter a valid email address.');
          return;
        }
        showToast('Thank you for subscribing to CODEZZY!');
        email.value = '';
        localStorage.setItem('codezzy-subscribed', 'true');
        const popup = document.getElementById('newsletter-popup');
        if (popup) popup.classList.remove('visible');
      });
    });
  }

  /* Newsletter Popup */
  function initNewsletterPopup() {
    const popup = document.getElementById('newsletter-popup');
    if (!popup || localStorage.getItem('codezzy-subscribed') || localStorage.getItem('codezzy-popup-dismissed')) return;
    setTimeout(() => popup.classList.add('visible'), 8000);
    const close = popup.querySelector('.popup-close');
    if (close) {
      close.addEventListener('click', () => {
        popup.classList.remove('visible');
        localStorage.setItem('codezzy-popup-dismissed', 'true');
      });
    }
  }

  /* Fade In Animation */
  function initFadeIn() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    elements.forEach(el => observer.observe(el));
  }

  /* Auth Forms */
  function initAuthForms() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', e => {
        e.preventDefault();
        let valid = true;
        const email = loginForm.querySelector('#login-email');
        const password = loginForm.querySelector('#login-password');
        valid = validateField(email, validateEmail) && valid;
        valid = validateField(password, v => v.length >= 6, 'Password must be at least 6 characters') && valid;
        if (valid) showToast('Login successful! Welcome to CODEZZY.');
      });
      const togglePw = loginForm.querySelector('.password-toggle-btn');
      if (togglePw) {
        togglePw.addEventListener('click', () => {
          const input = loginForm.querySelector('#login-password');
          const isPassword = input.type === 'password';
          input.type = isPassword ? 'text' : 'password';
          togglePw.textContent = isPassword ? '&#128065;' : '&#128584;';
        });
      }
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      const pwInput = registerForm.querySelector('#register-password');
      const strengthFill = document.getElementById('strength-fill');
      const strengthText = document.getElementById('strength-text');
      if (pwInput && strengthFill) {
        pwInput.addEventListener('input', () => {
          const strength = getPasswordStrength(pwInput.value);
          const colors = ['#ef4444', '#f59e0b', '#eab308', '#84cc16', '#10b981'];
          const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
          strengthFill.style.width = (strength + 1) * 20 + '%';
          strengthFill.style.background = colors[strength];
          if (strengthText) strengthText.textContent = pwInput.value ? labels[strength] : '';
        });
      }
      registerForm.addEventListener('submit', e => {
        e.preventDefault();
        let valid = true;
        const name = registerForm.querySelector('#register-name');
        const email = registerForm.querySelector('#register-email');
        const password = registerForm.querySelector('#register-password');
        const confirm = registerForm.querySelector('#register-confirm');
        valid = validateField(name, v => v.trim().length >= 2, 'Name is required') && valid;
        valid = validateField(email, validateEmail) && valid;
        valid = validateField(password, v => v.length >= 8, 'Password must be at least 8 characters') && valid;
        if (confirm && password.value !== confirm.value) {
          showError(confirm, 'Passwords do not match');
          valid = false;
        }
        if (valid) showToast('Registration successful! Welcome to CODEZZY.');
      });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', e => {
        e.preventDefault();
        let valid = true;
        const name = contactForm.querySelector('#contact-name');
        const email = contactForm.querySelector('#contact-email');
        const message = contactForm.querySelector('#contact-message');
        valid = validateField(name, v => v.trim().length >= 2) && valid;
        valid = validateField(email, validateEmail) && valid;
        valid = validateField(message, v => v.trim().length >= 10, 'Message must be at least 10 characters') && valid;
        if (valid) {
          showToast('Message sent successfully! We will get back to you soon.');
          contactForm.reset();
        }
      });
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateField(input, validator, msg) {
    const error = input.parentElement.querySelector('.form-error') || input.closest('.form-group')?.querySelector('.form-error');
    const valid = validator(input.value);
    if (error) {
      error.textContent = msg || 'This field is invalid';
      error.classList.toggle('visible', !valid);
    }
    input.style.borderColor = valid ? '' : 'var(--danger)';
    return valid;
  }

  function showError(input, msg) {
    const error = input.closest('.form-group')?.querySelector('.form-error');
    if (error) { error.textContent = msg; error.classList.add('visible'); }
    input.style.borderColor = 'var(--danger)';
  }

  function getPasswordStrength(pw) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^a-zA-Z0-9]/.test(pw)) score++;
    return Math.min(score, 4);
  }

  /* Student Tools */
  function initTools() {
    initGPACalculator();
    initPercentageCalculator();
    initAgeCalculator();
    initPasswordGenerator();
    initQRGenerator();
    initUnitConverter();
  }

  function initGPACalculator() {
    const form = document.getElementById('gpa-form');
    if (!form) return;
    const container = document.getElementById('gpa-courses');
    const addBtn = document.getElementById('add-course');
    if (addBtn) addBtn.addEventListener('click', () => addCourseRow(container));
    form.addEventListener('submit', e => {
      e.preventDefault();
      const rows = container.querySelectorAll('.gpa-row');
      let totalCredits = 0, totalPoints = 0;
      rows.forEach(row => {
        const grade = parseFloat(row.querySelector('.gpa-grade').value);
        const credits = parseFloat(row.querySelector('.gpa-credits').value);
        if (!isNaN(grade) && !isNaN(credits) && credits > 0) {
          totalCredits += credits;
          totalPoints += grade * credits;
        }
      });
      const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
      document.getElementById('gpa-result').textContent = gpa;
    });
    if (container && container.children.length === 0) addCourseRow(container);
  }

  function addCourseRow(container) {
    const row = document.createElement('div');
    row.className = 'form-row gpa-row';
    row.innerHTML = `
      <div class="form-group"><label>Grade (0-10)</label><input type="number" class="gpa-grade" min="0" max="10" step="0.1" placeholder="8.5"></div>
      <div class="form-group"><label>Credits</label><input type="number" class="gpa-credits" min="1" max="10" placeholder="3"></div>`;
    container.appendChild(row);
  }

  function initPercentageCalculator() {
    const form = document.getElementById('percentage-form');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const obtained = parseFloat(document.getElementById('marks-obtained').value);
      const total = parseFloat(document.getElementById('marks-total').value);
      if (isNaN(obtained) || isNaN(total) || total <= 0) {
        showToast('Please enter valid marks.');
        return;
      }
      const pct = ((obtained / total) * 100).toFixed(2);
      document.getElementById('percentage-result').textContent = pct + '%';
      const grades = ['F', 'D', 'C', 'B', 'B+', 'A', 'A+'];
      const thresholds = [0, 35, 50, 60, 70, 80, 90];
      let grade = 'F';
      for (let i = thresholds.length - 1; i >= 0; i--) {
        if (pct >= thresholds[i]) { grade = grades[i]; break; }
      }
      document.getElementById('grade-result').textContent = 'Grade: ' + grade;
    });
  }

  function initAgeCalculator() {
    const form = document.getElementById('age-form');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const dob = new Date(document.getElementById('dob').value);
      if (isNaN(dob.getTime())) { showToast('Please enter a valid date.'); return; }
      const now = new Date();
      let years = now.getFullYear() - dob.getFullYear();
      let months = now.getMonth() - dob.getMonth();
      let days = now.getDate() - dob.getDate();
      if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
      if (months < 0) { years--; months += 12; }
      document.getElementById('age-result').textContent = `${years} years, ${months} months, ${days} days`;
    });
  }

  function initPasswordGenerator() {
    const form = document.getElementById('password-form');
    if (!form) return;
    const output = document.getElementById('password-output');
    const generate = () => {
      const length = parseInt(document.getElementById('pw-length').value) || 16;
      const upper = document.getElementById('pw-upper').checked;
      const lower = document.getElementById('pw-lower').checked;
      const numbers = document.getElementById('pw-numbers').checked;
      const symbols = document.getElementById('pw-symbols').checked;
      let chars = '';
      if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
      if (numbers) chars += '0123456789';
      if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
      if (!chars) { showToast('Select at least one character type.'); return; }
      let password = '';
      const array = new Uint32Array(length);
      crypto.getRandomValues(array);
      for (let i = 0; i < length; i++) password += chars[array[i] % chars.length];
      output.textContent = password;
    };
    form.addEventListener('submit', e => { e.preventDefault(); generate(); });
    const copyBtn = document.getElementById('copy-password');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (output.textContent) {
          navigator.clipboard.writeText(output.textContent).then(() => showToast('Password copied!'));
        }
      });
    }
    generate();
  }

  function initQRGenerator() {
    const form = document.getElementById('qr-form');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const text = document.getElementById('qr-text').value.trim();
      if (!text) { showToast('Please enter text or URL.'); return; }
      const canvas = document.getElementById('qr-canvas');
      generateQR(canvas, text);
    });
  }

  function generateQR(canvas, text) {
    const ctx = canvas.getContext('2d');
    const size = 200;
    canvas.width = size;
    canvas.height = size;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    const moduleCount = 25;
    const moduleSize = size / moduleCount;
    let hash = 0;
    for (let i = 0; i < text.length; i++) hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
    ctx.fillStyle = '#1e1b4b';
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        const isFinder = (row < 7 && col < 7) || (row < 7 && col >= moduleCount - 7) || (row >= moduleCount - 7 && col < 7);
        if (isFinder) {
          const inOuter = row === 0 || row === 6 || col === 0 || col === 6 || row === moduleCount - 7 || col === moduleCount - 7;
          const inInner = (row >= 2 && row <= 4 && col >= 2 && col <= 4) || (row >= 2 && row <= 4 && col >= moduleCount - 5 && col <= moduleCount - 3) || (row >= moduleCount - 5 && row <= moduleCount - 3 && col >= 2 && col <= 4);
          if (inOuter || inInner) ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
        } else {
          const seed = (hash + row * moduleCount + col) & 0x7fffffff;
          if (seed % 3 !== 0) ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
        }
      }
    }
  }

  function initUnitConverter() {
    const form = document.getElementById('unit-form');
    if (!form) return;
    const conversions = {
      'km-mi': v => v * 0.621371, 'mi-km': v => v * 1.60934,
      'kg-lb': v => v * 2.20462, 'lb-kg': v => v * 0.453592,
      'c-f': v => (v * 9/5) + 32, 'f-c': v => (v - 32) * 5/9,
      'm-ft': v => v * 3.28084, 'ft-m': v => v * 0.3048,
      'gb-mb': v => v * 1024, 'mb-gb': v => v / 1024
    };
    form.addEventListener('submit', e => {
      e.preventDefault();
      const value = parseFloat(document.getElementById('unit-value').value);
      const type = document.getElementById('unit-type').value;
      if (isNaN(value) || !conversions[type]) { showToast('Enter a valid value.'); return; }
      document.getElementById('unit-result').textContent = conversions[type](value).toFixed(4);
    });
  }

  /* Tutorial Filter */
  function initTutorialFilter() {
    const tags = document.querySelectorAll('.filter-tag');
    const cards = document.querySelectorAll('[data-category]');
    if (!tags.length) return;
    tags.forEach(tag => {
      tag.addEventListener('click', () => {
        tags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        const cat = tag.getAttribute('data-filter');
        cards.forEach(card => {
          card.style.display = (cat === 'all' || card.getAttribute('data-category') === cat) ? '' : 'none';
        });
      });
    });
    const categorySelect = document.getElementById('category-filter');
    if (categorySelect) {
      categorySelect.addEventListener('change', () => {
        const cat = categorySelect.value;
        cards.forEach(card => {
          card.style.display = (cat === 'all' || card.getAttribute('data-category') === cat) ? '' : 'none';
        });
      });
    }
  }

  /* Blog Tabs */
  function initBlogTabs() {
    const tabs = document.querySelectorAll('.blog-tab');
    if (!tabs.length) return;
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.getAttribute('data-tab');
        document.querySelectorAll('[data-blog-type]').forEach(card => {
          card.style.display = (filter === 'all' || card.getAttribute('data-blog-type') === filter) ? '' : 'none';
        });
      });
    });
  }

  /* Active Nav Link */
  function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .mobile-nav a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) link.classList.add('active');
    });
  }

  /* Toast Notification */
  function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(100px);background:var(--text);color:var(--bg);padding:14px 28px;border-radius:50px;font-size:0.9rem;font-weight:500;z-index:10001;transition:transform 0.4s ease;box-shadow:var(--shadow-lg);';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.transform = 'translateX(-50%) translateY(0)';
    setTimeout(() => { toast.style.transform = 'translateX(-50%) translateY(100px)'; }, 3000);
  }

  window.CODEZZY = { showToast };
})();
