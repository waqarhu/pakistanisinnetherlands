// Simple client-side search functionality
document.addEventListener('DOMContentLoaded', function() {
  // Search functionality for category page
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('q');
  
  if (searchQuery && window.location.pathname.includes('category')) {
    performSearch(searchQuery);
  }
  
  // WhatsApp contact button (floating)
  addWhatsAppButton();
  
  // Pakistani population counter with monthly auto-update
  initializePakistaniCounter();
  
  // Performance monitoring
  if (window.performance && console.log) {
    // Log page load performance
    window.addEventListener('load', function() {
      setTimeout(function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;
        
        console.log('Performance Metrics:');
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
        console.log('Connect Time: ' + connectTime + 'ms');
        console.log('Render Time: ' + renderTime + 'ms');
      }, 0);
    });
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

function addWhatsAppButton() {
  // Add floating WhatsApp contact button
  const whatsappBtn = document.createElement('a');
  whatsappBtn.href = 'https://wa.me/31684346334'; // Waqar Hussain WhatsApp
  whatsappBtn.target = '_blank';
  whatsappBtn.rel = 'noopener noreferrer';
  whatsappBtn.className = 'whatsapp-float';
  whatsappBtn.innerHTML = '<i class="bi bi-whatsapp"></i>';
  whatsappBtn.setAttribute('aria-label', 'Contact us on WhatsApp');
  whatsappBtn.title = 'Chat with us on WhatsApp';
  
  // Add CSS for WhatsApp button
  const style = document.createElement('style');
  style.textContent = `
    .whatsapp-float {
      position: fixed;
      width: 60px;
      height: 60px;
      bottom: 40px;
      right: 40px;
      background-color: #25d366;
      color: #FFF;
      border-radius: 50px;
      text-align: center;
      font-size: 30px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    .whatsapp-float:hover {
      background-color: #128C7E;
      transform: scale(1.1);
      box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
    }
    @media screen and (max-width: 768px) {
      .whatsapp-float {
        width: 50px;
        height: 50px;
        bottom: 20px;
        right: 20px;
        font-size: 25px;
      }
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(whatsappBtn);
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
