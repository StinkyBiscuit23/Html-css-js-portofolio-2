// DUAL FILTER FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
  const typeFilterButtons = document.querySelectorAll('.type-filter-btn');
  const formatFilterButtons = document.querySelectorAll('.format-filter-btn');
  const videoCards = document.querySelectorAll('.video-card');
  
  let activeTypeFilter = 'all';
  let activeFormatFilter = 'all';

  // Type Filter (Video Editing / Filmmaking)
  typeFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all type buttons
      typeFilterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      activeTypeFilter = button.getAttribute('data-type-filter');
      applyFilters();
    });
  });

  // Format Filter (Short/Long/Other)
  formatFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all format buttons
      formatFilterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      activeFormatFilter = button.getAttribute('data-format-filter');
      applyFilters();
    });
  });

  // Apply both filters
  function applyFilters() {
    videoCards.forEach(card => {
      const cardType = card.getAttribute('data-type');
      const cardFormat = card.getAttribute('data-format');
      
      const typeMatch = activeTypeFilter === 'all' || cardType === activeTypeFilter;
      const formatMatch = activeFormatFilter === 'all' || cardFormat === activeFormatFilter;
      
      if (typeMatch && formatMatch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
});