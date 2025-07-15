const filterButtons = document.querySelectorAll('.filters button');
const images = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');

let currentIndex = 0; // track which image is open

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    images.forEach(img => {
        const category = img.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
        img.classList.remove('hidden');
        } else {
        img.classList.add('hidden');
        }
    });
    });
});

// LIGHTBOX FUNCTION
// ✅ Open lightbox
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index; // save the clicked image index
    showImage(currentIndex);
    lightbox.style.display = 'flex';
  });
});

// ✅ Show image by index
function showImage(index) {
  const img = images[index];
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
  currentIndex = (currentIndex + 1) % images.length; // loop around
  showImage(currentIndex);
});

// ✅ Previous arrow
prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});