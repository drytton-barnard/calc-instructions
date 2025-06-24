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

searchInput.addEventListener('input', () => {
  const val = searchInput.value.toLowerCase();
  const filtered = suggestions.filter(s => s.toLowerCase().includes(val));
  suggestionsBox.innerHTML = '';
  selectedIndex = -1;

  if (filtered.length === 0 || !val) {
    suggestionsBox.style.display = 'none';
    return;
  }

  filtered.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item;
    li.onclick = () => {
      searchInput.value = item;
      suggestionsBox.style.display = 'none';
      showContent(item);
    };
    suggestionsBox.appendChild(li);
  });

  suggestionsBox.style.display = 'block';
});

searchInput.addEventListener('keydown', (e) => {
  const items = suggestionsBox.querySelectorAll('li');
  if (!items.length) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedIndex = (selectedIndex + 1) % items.length;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedIndex = (selectedIndex - 1 + items.length) % items.length;
  } else if (e.key === 'Enter') {
    if (selectedIndex >= 0) {
      items[selectedIndex].click();
    }
  }

  items.forEach((li, i) => {
    li.setAttribute('aria-selected', i === selectedIndex);
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-container')) {
    suggestionsBox.style.display = 'none';
  }
});

function showContent(topic) {
  document.querySelector('main').innerHTML = `
    <h2>${topic}</h2>
    <p>This section will include detailed help for: <strong>${topic}</strong>.</p>
  `;
}