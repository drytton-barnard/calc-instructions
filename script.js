// script.js

// ================== Hamburger Menu ==================

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!toggleButton || !navMenu) return;

  // Toggle navigation menu visibility and update ARIA attributes
  toggleButton.addEventListener('click', () => {
    const isVisible = navMenu.classList.toggle('nav-menu_visible');
    toggleButton.setAttribute('aria-expanded', isVisible);
  });

  // Close menu when any nav link is clicked for better UX
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('nav-menu_visible')) {
        navMenu.classList.remove('nav-menu_visible');
        toggleButton.setAttribute('aria-expanded', 'false');
      }
    });
  });
});

// ================== Upload Section Toggle with Password ==================

/**
 * Toggles visibility of all upload sections with id 'uploadSection'.
 * Shows if currently hidden, hides if shown.
 * Requires password "27056".
 */
function toggleUploadSections() {
  const uploadSections = document.querySelectorAll('#uploadSection');
  if (uploadSections.length === 0) return;

  // Prompt for password
  const enteredPassword = prompt("Enter upload password:");
  if (enteredPassword !== "27056") {
    alert("Incorrect password.");
    return;
  }

  // Toggle display for each upload section
  uploadSections.forEach(section => {
    if (section.style.display === "flex") {
      section.style.display = "none";
    } else {
      section.style.display = "flex";
    }
  });
}

// ================== Disable Keys and Context Menu ==================

/**
 * Blocks keys for F11, F12, Ctrl+Shift+I and disables right-click.
 */
function blockRestrictedKeys(e) {
  // Disable F11 (fullscreen)
  if (e.key === "F11") {
    e.preventDefault();
    alert("Fullscreen mode is disabled on this site.");
  }

  // Disable Developer Tools shortcuts:
  // F12 or Ctrl+Shift+I (Cmd+Shift+I on Mac)
  const isCtrlShiftI = e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i");
  const isCmdShiftI = e.metaKey && e.shiftKey && (e.key === "I" || e.key === "i");
  if (e.key === "F12" || isCtrlShiftI || isCmdShiftI) {
    e.preventDefault();
    alert("Developer tools are disabled on this site.");
  }
}

// Disable right-click context menu globally
function disableContextMenu(e) {
  e.preventDefault();
}

// ================== Global Keydown Listener ==================

document.addEventListener("keydown", (e) => {
  // Ctrl+5 or Cmd+5 toggles upload section
  if ((e.ctrlKey || e.metaKey) && e.key === "5") {
    e.preventDefault();
    toggleUploadSections();
  }

  blockRestrictedKeys(e);
});

// Disable context menu everywhere
document.addEventListener("contextmenu", disableContextMenu);


// ================== Optional: Upload Handling (if you want to add centralized JS for uploads) ==================

// This would be expanded if you want to centralize file upload previews or validation,
// but since the upload logic is included inline in each page, we leave this part empty.
// You can add shared helper functions here for file reading or UI updates.