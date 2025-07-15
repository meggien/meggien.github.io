const filterButtons = document.querySelectorAll('.filters button');
const images = document.querySelectorAll('.gallery img');

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
images.forEach(img => {
  img.addEventListener('click', () => {
    console.log("🖼 Clicked:", img.src);
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  });
});

// CLOSE LIGHTBOX
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// ALSO close lightbox if you click outside the image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});