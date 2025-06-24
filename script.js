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

// Hamburger menu toggle logic
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggleButton && navMenu) {
    toggleButton.addEventListener('click', () => {
      navMenu.classList.toggle('nav-menu_visible');
    });
  }
});