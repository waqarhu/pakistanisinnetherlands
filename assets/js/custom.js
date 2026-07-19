// Simple client-side search functionality
document.addEventListener('DOMContentLoaded', function() {
  // Search functionality for category page
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('q');
  
  if (searchQuery && window.location.pathname.includes('category')) {
    performSearch(searchQuery);
  }
  
  // Floating request forms for community group access
  addGroupRequestLinks();
  
  // Pakistani population counter with monthly auto-update
  initializePakistaniCounter();
  
  // Initialize interactive map
  initializePopulationMap();
  
  // Performance monitoring (silent - only track, don't log)
  if (window.performance) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        // Store metrics silently for analytics if needed
        window.sitePerformance = {
          pageLoad: pageLoadTime,
          connect: perfData.responseEnd - perfData.requestStart,
          render: perfData.domComplete - perfData.domLoading
        };
      }, 0);
    }, { once: true });
  }
});

function performSearch(query) {
  const posts = document.querySelectorAll('.post-entry, .post-list');
  const searchTerm = query.toLowerCase();
  let resultsFound = 0;
  
  posts.forEach(post => {
    const text = post.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      post.style.display = '';
      resultsFound++;
    } else {
      post.style.display = 'none';
    }
  });
  
  // Show search results message
  const pageTitle = document.querySelector('.page-title h1');
  if (pageTitle) {
    pageTitle.textContent = `Search Results for "${query}" (${resultsFound} found)`;
  }
}

function addGroupRequestLinks() {
  const linksWrapper = document.createElement('div');
  linksWrapper.className = 'group-request-float';
  linksWrapper.setAttribute('aria-label', 'Community group request forms');

  linksWrapper.innerHTML = `
    <p class="group-request-title mb-2"><i class="bi bi-people"></i> Request Group Join</p>
    <a href="https://forms.gle/Ls4Tfb7eS9sNbuWf7" target="_blank" rel="noopener noreferrer" class="group-request-link">IT Group</a>
    <a href="https://forms.gle/tUGJHEeGKrA77j4a8" target="_blank" rel="noopener noreferrer" class="group-request-link">Students Group</a>
    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdx5BfcFroE6vaHB1AFJQ9KIUigVia8_KJqgHuQvYRTb1MPUw/viewform" target="_blank" rel="noopener noreferrer" class="group-request-link">Pakistani in Netherlands</a>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .group-request-float {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #ffffff;
      border: 1px solid #dfe5eb;
      border-radius: 12px;
      padding: 12px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      max-width: 240px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .group-request-title {
      font-size: 14px;
      font-weight: 700;
      color: #212529;
      margin: 0;
    }
    .group-request-link {
      display: block;
      text-decoration: none;
      background: #00a859;
      color: #fff;
      padding: 8px 10px;
      border-radius: 8px;
      text-align: center;
      font-size: 13px;
      font-weight: 600;
      transition: background-color 0.2s ease;
    }
    .group-request-link:hover {
      background: #008f4c;
      color: #fff;
    }
    @media screen and (max-width: 768px) {
      .group-request-float {
        left: 12px;
        right: 12px;
        bottom: 12px;
        max-width: none;
      }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(linksWrapper);
}

// Form submission handling with Formspree
const forms = document.querySelectorAll('form[action*="formspree"]');
forms.forEach(form => {
  form.addEventListener('submit', function(e) {
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Re-enable after submission
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 3000);
  });
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Lazy load images with fallback for older browsers
if ('loading' in HTMLImageElement.prototype) {
  // Browser supports lazy loading natively
  console.log('Native lazy loading supported');
} else {
  // Fallback for older browsers
  const images = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Analytics event tracking (when GA is configured)
function trackEvent(category, action, label) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
}

// Track newsletter signups
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function() {
    trackEvent('Newsletter', 'signup', 'Homepage Newsletter');
  });
}

// Track outbound links
document.querySelectorAll('a[href^="http"]').forEach(link => {
  if (!link.href.includes(window.location.hostname)) {
    link.addEventListener('click', function() {
      trackEvent('Outbound Link', 'click', this.href);
    });
  }
});

// Handle placeholder links (social media, etc.)
document.addEventListener('DOMContentLoaded', function() {
  // Find all links that point to "#" 
  const placeholderLinks = document.querySelectorAll('a[href="#"]');
  
  placeholderLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Check if it's a social media link
      const isSocialLink = this.classList.contains('twitter') || 
                          this.classList.contains('facebook') || 
                          this.classList.contains('instagram') || 
                          this.classList.contains('linkedin');
      
      if (isSocialLink) {
        // Show a friendly message for social media links
        alert('Our social media pages are coming soon! Follow us to stay updated with the Pakistani community in Netherlands.');
      } else {
        // For other placeholder links, show generic message
        alert('This section is under construction. Please check back soon!');
      }
    });
  });
});

// Pakistani Population Counter with Monthly Auto-Update
function initializePakistaniCounter() {
  const counterElement = document.getElementById('pakistani-counter');
  if (!counterElement) return;
  
  // Base population as of January 2024
  const basePopulation = 55000;
  const baseYear = 2024;
  const baseMonth = 1; // January
  
  // Average monthly growth (estimated 0.8% per month = ~10% yearly)
  const monthlyGrowthRate = 0.008;
  
  // Calculate current population based on months passed
  function calculateCurrentPopulation() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 0-11 -> 1-12
    
    // Calculate months passed since base date
    const monthsPassed = (currentYear - baseYear) * 12 + (currentMonth - baseMonth);
    
    // Calculate population with compound growth
    const currentPopulation = Math.round(basePopulation * Math.pow(1 + monthlyGrowthRate, monthsPassed));
    
    return currentPopulation;
  }
  
  // Animate counter from 0 to target value
  function animateCounter(target) {
    let current = 0;
    const increment = Math.ceil(target / 100);
    const duration = 2000; // 2 seconds
    const stepTime = duration / (target / increment);
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counterElement.textContent = current.toLocaleString('en-US');
    }, stepTime);
  }
  
  // Initialize counter
  const currentPopulation = calculateCurrentPopulation();
  
  // Check if counter is visible, then animate
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && counterElement.textContent === '0') {
        animateCounter(currentPopulation);
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(counterElement);
}

// Interactive Population Map
function initializePopulationMap() {
  const cityMarkers = document.querySelectorAll('.city-marker');
  
  cityMarkers.forEach(marker => {
    marker.addEventListener('click', function() {
      const city = this.getAttribute('data-city');
      const population = this.getAttribute('data-population');
      
      alert(`${city}\n\nEstimated Pakistani Population: ${parseInt(population).toLocaleString()}\n\nOne of the major hubs for the Pakistani community in Netherlands with mosques, halal restaurants, and Pakistani grocery stores.`);
    });
    
    // Add hover effect info
    marker.addEventListener('mouseenter', function() {
      this.style.cursor = 'pointer';
    });
  });
}
