// Autocomplete + Search Memory
document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("search-bar");
  const autocompleteBox = document.getElementById("autocomplete-box");

  const suggestions = [
    "How to reset the calculator",
    "How to import my own data",
    "How to plot graphs",
    "How to use the tax calculator",
    "How to convert currencies",
    "How to download the calculator"
  ];

  const previousSearch = localStorage.getItem("lastSearch");
  if (previousSearch) {
    searchBar.value = previousSearch;
  }

  searchBar.addEventListener("input", () => {
    const input = searchBar.value.toLowerCase();
    autocompleteBox.innerHTML = "";

    if (input === "") {
      autocompleteBox.style.display = "none";
      return;
    }

    const filtered = suggestions.filter(s => s.toLowerCase().includes(input));
    filtered.forEach(match => {
      const div = document.createElement("div");
      div.textContent = match;
      div.classList.add("suggestion-item");
      div.onclick = () => {
        searchBar.value = match;
        autocompleteBox.style.display = "none";
        localStorage.setItem("lastSearch", match);
      };
      autocompleteBox.appendChild(div);
    });

    autocompleteBox.style.display = filtered.length ? "block" : "none";
  });
});

// Disable right-click and shortcuts
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

document.addEventListener('keydown', function (e) {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && e.key === 'I') ||
    (e.ctrlKey && e.key === 'u')
  ) {
    e.preventDefault();
  }
});