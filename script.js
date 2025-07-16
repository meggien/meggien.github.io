const filterButtons = document.querySelectorAll('.filters button');
const allImages = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');

let visibleImages = Array.from(allImages); // starts with all images visible
let currentIndex = 0; // track which image is open

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    allImages.forEach(img => {
        const category = img.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
        img.classList.remove('hidden');
        } else {
        img.classList.add('hidden');
        }
    });

    visibleImages = Array.from(allImages).filter(img => !img.classList.contains('hidden'));
    });
});

// LIGHTBOX FUNCTION
// ✅ Open lightbox
allImages.forEach((img) => {
  img.addEventListener('click', () => {
    // ✅ Make sure visibleImages is correct before opening
    visibleImages = Array.from(allImages).filter(img => !img.classList.contains('hidden'));

    // ✅ Find this image's index in the *filtered* list
    currentIndex = visibleImages.indexOf(img);

    // ✅ Show it
    showImage(currentIndex);
    lightbox.style.display = 'flex';
  });
});

// ✅ Show image in lightbox
function showImage(index) {
  const img = visibleImages[index];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
}

// ✅ Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// ✅ Click outside to close
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

// ✅ Next arrow
nextBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // avoid closing lightbox
  currentIndex = (currentIndex + 1) % visibleImages.length;
  showImage(currentIndex);
});

// ✅ Previous arrow
prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  showImage(currentIndex);
});