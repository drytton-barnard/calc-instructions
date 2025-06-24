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

let selectedIndex = -1;

function showSuggestions(filtered) {
  suggestionsBox.innerHTML = '';
  filtered.forEach((item, i) => {
    const li = document.createElement('li');
    li.textContent = item;
    li.onclick = () => {
      searchInput.value = item;
      suggestionsBox.style.display = 'none';
      showContent(item);
    };
    suggestionsBox.appendChild(li);
  });
  suggestionsBox.style.display = filtered.length ? 'block' : 'none';
  selectedIndex = -1;
}

function clearSuggestions() {
  suggestionsBox.innerHTML = '';
  suggestionsBox.style.display = 'none';
}

function showContent(topic) {
  const content = document.querySelector('main');
  content.innerHTML = `
    <h2>${topic}</h2>
    <p>This is the help section for <strong>${topic}</strong>. You can expand this with examples, videos, and screenshots.</p>
  `;
}

searchInput.addEventListener('input', () => {
  const val = searchInput.value.toLowerCase().trim();
  if (!val) return clearSuggestions();
  const filtered = suggestions.filter(s => s.toLowerCase().includes(val));
  showSuggestions(filtered);
});

searchInput.addEventListener('keydown', (e) => {
  const items = suggestionsBox.querySelectorAll('li');
  if (!items.length) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedIndex = (selectedIndex + 1) % items.length;
    updateSelected(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedIndex = (selectedIndex - 1 + items.length) % items.length;
    updateSelected(items);
  } else if (e.key === 'Enter') {
    if (selectedIndex >= 0) {
      e.preventDefault();
      items[selectedIndex].click();
    }
  } else if (e.key === 'Escape') {
    clearSuggestions();
  }
});

function updateSelected(items) {
  items.forEach((el, i) => {
    el.setAttribute('aria-selected', i === selectedIndex);
    if (i === selectedIndex) el.scrollIntoView({ block: 'nearest' });
  });
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-container')) clearSuggestions();
});