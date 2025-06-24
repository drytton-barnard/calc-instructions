// script.js

// Sidebar toggle button functionality
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Search handling: simple keyword-based navigation
const mainSearch = document.getElementById('mainSearch');
const sidebarSearch = document.getElementById('sidebarSearch');

function searchHandler(query) {
  const q = query.toLowerCase().trim();

  if (q.includes('interest') || q.includes('calculate interest')) {
    location.hash = '#images';
    highlightCard('How to calculate interest');
  } else if (q.includes('video') || q.includes('tutorial')) {
    location.hash = '#videos';
  } else if (q.includes('download') || q.includes('excel')) {
    location.hash = '#welcome';
  } else {
    // No match or empty, do nothing or clear highlights
    clearHighlights();
  }
}

function highlightCard(text) {
  clearHighlights();
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    if (card.innerText.toLowerCase().includes(text.toLowerCase())) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.style.boxShadow = '0 0 12px 4px #00796b';
      setTimeout(() => {
        card.style.boxShadow = '';
      }, 2500);
    }
  });
}

function clearHighlights() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.boxShadow = '';
  });
}

// Attach search event listeners
mainSearch.addEventListener('input', (e) => {
  searchHandler(e.target.value);
});

sidebarSearch.addEventListener('input', (e) => {
  searchHandler(e.target.value);
});
