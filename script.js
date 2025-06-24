const searchInput = document.getElementById('search-bar');
const suggestionsBox = document.getElementById('suggestions');

const suggestions = [
  "How to switch to a different page?",
  "How to use the navigation center?",
  "How to verify the calculation?",
  "How to clear all the input information?",
  "How to convert currencies?",
  "How to convert the interest?"
];

// script.js

// Toggle sidebar open/close
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

// Handle search functionality
function handleSearch(query) {
  const q = query.toLowerCase().trim();

  // Simple example of search keywords directing to a section
  if (q.includes('interest') || q.includes('calculate interest')) {
    location.href = '#images';
    highlightCard('Interest Calculation');
  } else if (q.includes('video') || q.includes('how to use')) {
    location.href = '#videos';
  } else if (q.includes('download') || q.includes('excel')) {
    location.href = '#welcome';
  }
}

// Optional: Highlight or scroll to specific image block
function highlightCard(title) {
  const cards = document.querySelectorAll('.instruction-card');
  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    if (text.includes(title.toLowerCase())) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.style.boxShadow = '0 0 15px 5px #00acc1';
      setTimeout(() => {
        card.style.boxShadow = '';
      }, 2000);
    }
  });
}

// Optional: Show details popup or modal
function showDetails(promptName) {
  alert(`You selected: ${promptName}\n(More interactive detail can be built here later.)`);
}
