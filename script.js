// script.js

// Sidebar toggle
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside on smaller screens
document.addEventListener('click', (e) => {
  if (
    sidebar.classList.contains('active') &&
    !sidebar.contains(e.target) &&
    e.target !== menuToggle
  ) {
    sidebar.classList.remove('active');
  }
});

// Search functionality for header and sidebar
const mainSearch = document.getElementById('mainSearch');
const sidebarSearch = document.getElementById('sidebarSearch');

function clearHighlights() {
  document.querySelectorAll('.card').forEach((card) => {
    card.style.boxShadow = '';
    card.style.transform = '';
  });
}

function highlightCards(matchText) {
  clearHighlights();
  const cards = document.querySelectorAll('.card');
  let found = false;
  cards.forEach((card) => {
    if (card.innerText.toLowerCase().includes(matchText.toLowerCase())) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.style.boxShadow = '0 0 18px 5px #4caf50';
      card.style.transform = 'translateY(-8px)';
      found = true;
    }
  });
  return found;
}

function handleSearchInput(query) {
  if (!query.trim()) {
    clearHighlights();
    return;
  }
  const q = query.toLowerCase();

  // Simple keyword matching to sections and cards
  if (q.includes('interest')) {
    location.hash = '#images';
    highlightCards('interest');
  } else if (q.includes('video') || q.includes('tutorial')) {
    location.hash = '#videos';
  } else if (q.includes('download') || q.includes('excel')) {
    location.hash = '#welcome';
  } else {
    clearHighlights();
  }
}

mainSearch.addEventListener('input', (e) => {
  handleSearchInput(e.target.value);
});

sidebarSearch.addEventListener('input', (e) => {
  handleSearchInput(e.target.value);
});
