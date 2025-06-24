// script.js

const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const globalSearch = document.getElementById('global-search');
const sidebarSearch = document.getElementById('sidebar-search');
const allCards = document.querySelectorAll('.card');

// Function to open sidebar
function openSidebar() {
  sidebar.classList.add('active');
  overlay.classList.add('active');
}

// Function to close sidebar
function closeSidebar() {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
}

// Toggle sidebar open/close on button click
menuToggle.addEventListener('click', () => {
  if (sidebar.classList.contains('active')) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

// Close sidebar if click outside sidebar or on overlay
overlay.addEventListener('click', closeSidebar);

// Close sidebar on link click (for mobile UX)
sidebar.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeSidebar);
});

// Search function filters cards live
function filterCards(query) {
  const q = query.trim().toLowerCase();
  if (!q) {
    // Show all cards if no query
    allCards.forEach((card) => {
      card.style.display = '';
      card.style.boxShadow = '';
      card.style.transform = '';
    });
    return;
  }

  let foundAny = false;

  allCards.forEach((card) => {
    const keywords = card.getAttribute('data-keywords') || '';
    const textContent = card.innerText.toLowerCase();

    if (keywords.toLowerCase().includes(q) || textContent.includes(q)) {
      card.style.display = '';
      card.style.boxShadow = '0 0 15px 5px #56ab2f';
      card.style.transform = 'translateY(-6px)';
      foundAny = true;
    } else {
      card.style.display = 'none';
      card.style.boxShadow = '';
      card.style.transform = '';
    }
  });

  // Optionally scroll to first visible card
  if (foundAny) {
    const firstVisible = Array.from(allCards).find((card) => card.style.display !== 'none');
    if (firstVisible) {
      firstVisible.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

// Handle search input on both inputs
globalSearch.addEventListener('input', (e) => {
  filterCards(e.target.value);
  // Also copy input to sidebar search for consistency
  sidebarSearch.value = e.target.value;
});

sidebarSearch.addEventListener('input', (e) => {
  filterCards(e.target.value);
  // Also copy input to global search for consistency
  globalSearch.value = e.target.value;
});
