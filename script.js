// 1) MOBILE MENU TOGGLE (existing)
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
  });
}

// 2) SUBCHAPTERS TOGGLE (existing)
const subchaptersToggle = document.getElementById('subchaptersToggle');
const subchaptersContent = document.getElementById('subchaptersContent');

if (subchaptersToggle && subchaptersContent) {
  const subchaptersArrow = subchaptersToggle.querySelector('.toggle-arrow');
  let isSubchaptersOpen = true;
  
  subchaptersToggle.addEventListener('click', () => {
    isSubchaptersOpen = !isSubchaptersOpen;
    const isReferencesPage = subchaptersContent.classList.contains('references-subchapters');
    
    if (isReferencesPage) {
      if (isSubchaptersOpen) {
        subchaptersContent.classList.remove('closed');
        subchaptersContent.classList.add('open');
      } else {
        subchaptersContent.classList.remove('open');
        subchaptersContent.classList.add('closed');
      }
    } else {
      subchaptersContent.style.display = isSubchaptersOpen ? 'grid' : 'none';
    }
    
    if (subchaptersArrow) {
      subchaptersArrow.textContent = isSubchaptersOpen ? '▼' : '▶';
    }
  });
}

// 3) Advanced EMBEDDING LOGIC
// Only apply background screenshot effect on pages with .references-subchapters container
document.querySelectorAll('.references-subchapters .chapter-card').forEach(card => {
  const urlToEmbed = card.dataset.url;
  if (urlToEmbed) {
    // Helper function: Attempts to load screenshot from primary (WordPress mShots) and secondary (Thum.io) services.
    function getScreenshot(url) {
      return new Promise((resolve, reject) => {
        // Primary: WordPress mShots
        const mShotsUrl = 'https://s.wordpress.com/mshots/v1/' + encodeURIComponent(url) + '?w=1200&h=800';
        const img = new Image();
        img.src = mShotsUrl;
        img.onload = () => resolve(mShotsUrl);
        img.onerror = () => {
          // Secondary: Thum.io
          const thumUrl = 'https://image.thum.io/get/width/1200/' + encodeURIComponent(url);
          const img2 = new Image();
          img2.src = thumUrl;
          img2.onload = () => resolve(thumUrl);
          img2.onerror = () => reject('Both screenshot services failed.');
        };
      });
    }

    getScreenshot(urlToEmbed)
      .then(screenshotUrl => {
        // Set the screenshot as the background image for the card
        card.style.backgroundImage = `url(${screenshotUrl})`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
        card.style.position = 'relative';
        
        // Create a semi-transparent dark overlay for text readability
        const overlay = document.createElement('div');
        overlay.className = 'card-overlay';
        card.prepend(overlay);
      })
      .catch(err => {
        console.error("Failed to load screenshot for " + urlToEmbed, err);
      });
  }
});
// ... (existing mobile menu and subchapter toggle code)

// =======================
// FADE-IN ON SCROLL ANIMATION
// =======================
document.addEventListener("DOMContentLoaded", function() {
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});