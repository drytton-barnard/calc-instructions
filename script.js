// Search bar suggestions logic
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

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const input = searchInput.value.toLowerCase();
    suggestionsBox.innerHTML = "";

    if (!input) {
      suggestionsBox.style.display = "none";
      return;
    }

    const filtered = suggestions.filter(s => s.toLowerCase().includes(input));
    filtered.forEach(match => {
      const li = document.createElement("li");
      li.textContent = match;
      li.onclick = () => {
        searchInput.value = match;
        suggestionsBox.innerHTML = "";
        suggestionsBox.style.display = "none";
      };
      suggestionsBox.appendChild(li);
    });

    suggestionsBox.style.display = filtered.length ? "block" : "none";
  });
}

// Hamburger menu toggle logic with ARIA updates
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!toggleButton || !navMenu) return;

  toggleButton.addEventListener('click', () => {
    const isVisible = navMenu.classList.toggle('nav-menu_visible');
    toggleButton.setAttribute('aria-expanded', isVisible);
  });

  // Close menu on link click (for smoother UX)
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('nav-menu_visible')) {
        navMenu.classList.remove('nav-menu_visible');
        toggleButton.setAttribute('aria-expanded', false);
      }
    });
  });
});