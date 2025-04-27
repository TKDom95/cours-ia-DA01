// Fonctionnalités JavaScript pour le site web des cours sur l'IA

// Mode sombre/clair
document.addEventListener('DOMContentLoaded', function() {
  // Vérifier si l'utilisateur a déjà une préférence enregistrée
  const darkModePreference = localStorage.getItem('darkMode');
  
  // Appliquer le mode sombre si préféré
  if (darkModePreference === 'true') {
    document.body.classList.add('dark-mode');
    updateThemeToggleIcon(true);
  }
  
  // Ajouter un écouteur d'événement au bouton de basculement
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
      updateThemeToggleIcon(isDarkMode);
    });
  }
  
  // Mettre à jour l'icône du bouton de basculement
  function updateThemeToggleIcon(isDarkMode) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      if (isDarkMode) {
        themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
      } else {
        themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
      }
    }
  }
}) ;

// Filtre de recherche
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      filterContent(searchTerm);
    });
  }
  
  function filterContent(searchTerm) {
    // Éléments à filtrer (sections de cours, ateliers, etc.)
    const contentElements = document.querySelectorAll('.searchable');
    
    contentElements.forEach(element => {
      const text = element.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        element.style.display = '';
        // Mettre en surbrillance les termes de recherche
        highlightSearchTerm(element, searchTerm);
      } else {
        element.style.display = 'none';
      }
    });
    
    // Afficher un message si aucun résultat
    const noResultsMessage = document.getElementById('no-results-message');
    if (noResultsMessage) {
      const visibleElements = Array.from(contentElements).filter(el => el.style.display !== 'none');
      noResultsMessage.style.display = visibleElements.length === 0 ? 'block' : 'none';
    }
  }
  
  function highlightSearchTerm(element, searchTerm) {
    if (searchTerm.length < 3) return; // Ne pas mettre en surbrillance les termes trop courts
    
    const originalHTML = element.getAttribute('data-original-html');
    if (!originalHTML) {
      element.setAttribute('data-original-html', element.innerHTML);
    }
    
    let html = originalHTML || element.innerHTML;
    const regex = new RegExp(searchTerm, 'gi');
    const highlightedHTML = html.replace(regex, match => `<mark>${match}</mark>`);
    
    element.innerHTML = highlightedHTML;
  }
  
  // Réinitialiser la recherche
  const resetButton = document.getElementById('reset-search');
  if (resetButton) {
    resetButton.addEventListener('click', function() {
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.value = '';
        
        // Restaurer le contenu original
        const contentElements = document.querySelectorAll('.searchable');
        contentElements.forEach(element => {
          element.style.display = '';
          const originalHTML = element.getAttribute('data-original-html');
          if (originalHTML) {
            element.innerHTML = originalHTML;
          }
        });
        
        // Masquer le message "aucun résultat"
        const noResultsMessage = document.getElementById('no-results-message');
        if (noResultsMessage) {
          noResultsMessage.style.display = 'none';
        }
      }
    });
  }
});

// Animations
document.addEventListener('DOMContentLoaded', function() {
  // Animation des titres
  animateElements('.animate-title', 'animate-fadeIn');
  
  // Animation des éléments au défilement
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  // Observer les éléments qui doivent être animés au défilement
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-slideUp');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  function animateElements(selector, animationClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      // Ajouter un délai progressif pour une animation en cascade
      setTimeout(() => {
        element.classList.add(animationClass);
      }, 100 * index);
    });
  }
});

// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuButton && navLinks) {
    mobileMenuButton.addEventListener('click', function() {
      navLinks.classList.toggle('show');
    });
    
    // Fermer le menu mobile lors du clic sur un lien
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('show');
      });
    });
  }
});

// Marquer les liens de navigation actifs
document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname;
  
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = link.getAttribute('href');
    
    if (linkPath === currentPath || 
        (linkPath !== 'index.html' && currentPath.includes(linkPath))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Initialisation des composants au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  // Ajouter la classe 'loaded' au body pour les animations d'entrée
  document.body.classList.add('loaded');
});
