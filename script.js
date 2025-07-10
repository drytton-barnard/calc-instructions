// ===== Search Bar Suggestions =====
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

// ===== Hamburger Menu Toggle =====
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!toggleButton || !navMenu) return;

  toggleButton.addEventListener('click', () => {
    const isVisible = navMenu.classList.toggle('nav-menu_visible');
    toggleButton.setAttribute('aria-expanded', isVisible);
  });

  // Close menu on link click (better UX)
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('nav-menu_visible')) {
        navMenu.classList.remove('nav-menu_visible');
        toggleButton.setAttribute('aria-expanded', false);
      }
    });
  });

  // Load dynamic media galleries on pictures.html and videos.html
  if (document.getElementById('image-gallery')) {
    loadImageGallery();
  }
  if (document.getElementById('video-gallery')) {
    loadVideoGallery();
  }
});

// ===== Simulated AI Data Store =====
// This simulates your AI knowledge base and media assets
const aiKnowledgeBase = [
  {
    questionKeywords: ['switch', 'page', 'navigate'],
    answer: 'To switch to a different page, use the navigation menu at the top or click links provided in the content.',
    images: [
      {
        src: 'media/switch-page-example.png',
        caption: 'Navigation menu example showing page switching.'
      }
    ],
    videos: [
      {
        src: 'media/switch-page-demo.mp4',
        caption: 'Video tutorial on how to switch pages smoothly.'
      }
    ]
  },
  {
    questionKeywords: ['calculate', 'annuity'],
    answer: 'To calculate the annuity, input the principal amount, interest rate, and duration into the calculator and press calculate.',
    images: [
      {
        src: 'media/annuity-calculation.png',
        caption: 'Screenshot of annuity input fields.'
      }
    ],
    videos: [
      {
        src: 'media/annuity-video-tutorial.mp4',
        caption: 'Step-by-step video on annuity calculation.'
      }
    ]
  },
  {
    questionKeywords: ['clear', 'input', 'information'],
    answer: 'To clear all input information, press the "Clear" button on the calculator interface.',
    images: [
      {
        src: 'media/clear-input-example.png',
        caption: 'Clear button location on the calculator.'
      }
    ],
    videos: [
      {
        src: 'media/clear-input-video.mp4',
        caption: 'Video showing how to clear input fields.'
      }
    ]
  }
  // Add more question-answer-image-video objects here as needed
];

// ===== AI Assistant Query Handler =====
document.getElementById('ai-submit')?.addEventListener('click', () => {
  const queryInput = document.getElementById('ai-question');
  const question = queryInput.value.trim().toLowerCase();
  const textEl = document.getElementById('ai-text');
  const imgEl = document.getElementById('ai-image');
  const linksContainer = document.getElementById('ai-links');

  if (!question) {
    alert('Please enter a question.');
    return;
  }

  textEl.textContent = 'Thinking...';
  imgEl.src = '';
  linksContainer.innerHTML = '';

  // Find best matching answer by keywords
  const matched = aiKnowledgeBase.find(item =>
    item.questionKeywords.some(keyword => question.includes(keyword))
  );

  if (matched) {
    // Show answer text
    textEl.textContent = matched.answer;

    // Show first image (if any)
    if (matched.images.length) {
      imgEl.src = matched.images[0].src;
      imgEl.alt = matched.images[0].caption;
      imgEl.style.display = 'block';
    } else {
      imgEl.style.display = 'none';
    }

    // Generate clickable links to videos and pictures pages with captions
    linksContainer.innerHTML = '';

    if (matched.videos.length) {
      const videosHeader = document.createElement('h3');
      videosHeader.textContent = 'Related Videos:';
      linksContainer.appendChild(videosHeader);

      matched.videos.forEach((video, i) => {
        const link = document.createElement('a');
        link.href = 'videos.html#video-' + i;
        link.textContent = video.caption;
        link.classList.add('ai-link');
        link.style.display = 'block';
        link.style.marginBottom = '8px';
        linksContainer.appendChild(link);
      });
    }

    if (matched.images.length) {
      const picsHeader = document.createElement('h3');
      picsHeader.textContent = 'Related Pictures:';
      linksContainer.appendChild(picsHeader);

      matched.images.forEach((image, i) => {
        const link = document.createElement('a');
        link.href = 'pictures.html#image-' + i;
        link.textContent = image.caption;
        link.classList.add('ai-link');
        link.style.display = 'block';
        link.style.marginBottom = '8px';
        linksContainer.appendChild(link);
      });
    }
  } else {
    textEl.textContent = "Sorry, I don't have an answer for that yet. Please try another question.";
    imgEl.style.display = 'none';
  }
});

// ===== Load Images on pictures.html dynamically =====
function loadImageGallery() {
  const gallery = document.getElementById('image-gallery');
  gallery.innerHTML = '';

  // Collect all unique images from the AI knowledge base
  const images = [];
  aiKnowledgeBase.forEach(item => {
    item.images.forEach(img => {
      if (!images.find(i => i.src === img.src)) images.push(img);
    });
  });

  if (!images.length) {
    gallery.textContent = 'No images available yet.';
    return;
  }

  images.forEach((img, idx) => {
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.caption;
    imgEl.id = 'image-' + idx;
    imgEl.className = 'media-image';
    gallery.appendChild(imgEl);

    const caption = document.createElement('p');
    caption.textContent = img.caption;
    caption.style.marginBottom = '2rem';
    caption.style.fontStyle = 'italic';
    gallery.appendChild(caption);
  });
}

// ===== Load Videos on videos.html dynamically =====
function loadVideoGallery() {
  const gallery = document.getElementById('video-gallery');
  gallery.innerHTML = '';

  // Collect all unique videos from the AI knowledge base
  const videos = [];
  aiKnowledgeBase.forEach(item => {
    item.videos.forEach(video => {
      if (!videos.find(v => v.src === video.src)) videos.push(video);
    });
  });

  if (!videos.length) {
    gallery.textContent = 'No videos available yet.';
    return;
  }

  videos.forEach((video, idx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'video-wrapper';
    wrapper.id = 'video-' + idx;

    const videoEl = document.createElement('video');
    videoEl.controls = true;
    videoEl.src = video.src;
    videoEl.type = 'video/mp4';
    videoEl.style.borderRadius = '12px';

    const caption = document.createElement('p');
    caption.textContent = video.caption;
    caption.style.marginTop = '0.5rem';
    caption.style.fontStyle = 'italic';

    wrapper.appendChild(videoEl);
    wrapper.appendChild(caption);
    gallery.appendChild(wrapper);
  });
}