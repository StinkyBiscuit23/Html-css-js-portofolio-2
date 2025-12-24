// ===========================================
// VIDEO FILTER SYSTEM - DUAL FILTER (TYPE + FORMAT)
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
  // Get all elements
  const videoCards = document.querySelectorAll('.video-card');
  const typeFilterButtons = document.querySelectorAll('.type-filter-btn');
  const formatFilterButtons = document.querySelectorAll('.format-filter-btn');
  
  // Function to update active button styling
  function updateActiveButtons(buttons, activeButton) {
    buttons.forEach(btn => {
      btn.classList.remove('active');
      btn.style.backgroundColor = 'transparent';
      btn.style.color = '#000000';
    });
    activeButton.classList.add('active');
    activeButton.style.backgroundColor = '#000000';
    activeButton.style.color = '#ffffff';
  }
  
  // Function to filter videos based on active filters
  function filterVideos() {
    // Get active filters
    const activeType = document.querySelector('.type-filter-btn.active').getAttribute('data-type-filter');
    const activeFormat = document.querySelector('.format-filter-btn.active').getAttribute('data-format-filter');
    
    // Counter for visible cards
    let visibleCount = 0;
    
    // Loop through all video cards
    videoCards.forEach(card => {
      // Get card attributes (support multiple types with space separation)
      const cardTypes = card.getAttribute('data-type').split(' ');
      const cardFormat = card.getAttribute('data-format');
      
      // Check if card matches TYPE filter
      const typeMatches = activeType === 'all' || 
                         cardTypes.includes(activeType) || 
                         cardTypes.some(type => type.includes(activeType));
      
      // Check if card matches FORMAT filter
      const formatMatches = activeFormat === 'all' || 
                           cardFormat === activeFormat;
      
      // Show or hide card based on both filters
      if (typeMatches && formatMatches) {
        card.style.display = 'block';
        card.style.opacity = '0';
        
        // Fade in animation
        setTimeout(() => {
          card.style.transition = 'opacity 0.5s ease, transform 0.3s ease';
          card.style.opacity = '1';
        }, 10);
        
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Optional: Show message if no videos match
    const videoGrid = document.querySelector('.video-grid');
    let noResultsMessage = videoGrid.querySelector('.no-results-message');
    
    if (visibleCount === 0) {
      if (!noResultsMessage) {
        noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'no-results-message';
        noResultsMessage.innerHTML = `
          <p>No videos found matching the selected filters.</p>
          <button class="reset-filters">Show All Videos</button>
        `;
        videoGrid.appendChild(noResultsMessage);
        
        // Add event listener to reset button
        noResultsMessage.querySelector('.reset-filters').addEventListener('click', function() {
          document.querySelector('.type-filter-btn[data-type-filter="all"]').click();
          document.querySelector('.format-filter-btn[data-format-filter="all"]').click();
        });
      }
      noResultsMessage.style.display = 'block';
    } else if (noResultsMessage) {
      noResultsMessage.style.display = 'none';
    }
  }
  
  // TYPE FILTER BUTTONS - Event listeners
  typeFilterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      updateActiveButtons(typeFilterButtons, this);
      
      // Apply filters
      filterVideos();
      
      // Optional: Add subtle animation to button
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
  
  // FORMAT FILTER BUTTONS - Event listeners
  formatFilterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      updateActiveButtons(formatFilterButtons, this);
      
      // Apply filters
      filterVideos();
      
      // Optional: Add subtle animation to button
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
  
  // Initialize with "All Work" and "All Formats" active
  document.querySelector('.type-filter-btn[data-type-filter="all"]').classList.add('active');
  document.querySelector('.format-filter-btn[data-format-filter="all"]').classList.add('active');
  
  // Set initial active button styles
  document.querySelectorAll('.type-filter-btn.active, .format-filter-btn.active').forEach(btn => {
    btn.style.backgroundColor = '#000000';
    btn.style.color = '#ffffff';
  });
  
  // Run initial filter
  filterVideos();
  
  // Optional: Add keyboard navigation for accessibility
  document.addEventListener('keydown', function(e) {
    const activeTypeButton = document.querySelector('.type-filter-btn.active');
    const activeFormatButton = document.querySelector('.format-filter-btn.active');
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      // Get current filter group
      const isTypeButtonFocused = document.activeElement.classList.contains('type-filter-btn');
      const buttons = isTypeButtonFocused ? typeFilterButtons : formatFilterButtons;
      const currentIndex = Array.from(buttons).indexOf(document.activeElement);
      
      if (currentIndex !== -1) {
        let nextIndex;
        if (e.key === 'ArrowRight') {
          nextIndex = (currentIndex + 1) % buttons.length;
        } else {
          nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        }
        
        buttons[nextIndex].focus();
        buttons[nextIndex].click();
      }
    }
  });
});

// ===========================================
// SMOOTH SCROLL FOR NAVBAR LINKS
// ===========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Calculate position (accounting for fixed navbar)
      const navbarHeight = document.querySelector('nav').offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight;
      
      // Smooth scroll
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===========================================
// NAVBAR BACKGROUND ON SCROLL
// ===========================================

window.addEventListener('scroll', function() {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    nav.style.backdropFilter = 'blur(10px)';
  } else {
    nav.style.backgroundColor = '#000000';
    nav.style.backdropFilter = 'none';
  }
});

// ===========================================
// VIDEO CARD HOVER EFFECTS ENHANCEMENT
// ===========================================

document.querySelectorAll('.video-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.zIndex = '10';
    this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.zIndex = '1';
  });
});
