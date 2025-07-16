// Grab DOM elements
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');
const categoryTitle = document.getElementById('category-title');

// Get ?type= from URL
const params = new URLSearchParams(window.location.search);
const categoryType = params.get('type');

// If a category is in URL, filter; otherwise show all
let displayedProducts = categoryType
  ? products.filter(p => p.category === categoryType)
  : products;

// Set title dynamically if there's a title element
if (categoryTitle) {
  categoryTitle.textContent = categoryType
    ? categoryType.toUpperCase() + " Products"
    : "All Products";
}

let currentIndex = 0;

// Build gallery
displayedProducts.forEach((p, index) => {
  const img = document.createElement('img');
  img.src = p.image;
  img.alt = p.name;
  img.dataset.index = index;

  img.addEventListener('click', () => {
    currentIndex = index;
    showImage(currentIndex);
    lightbox.style.display = 'flex';
  });

  gallery.appendChild(img);
});

function showImage(index) {
  const p = displayedProducts[index];
  lightboxImg.src = p.image;
  lightboxImg.alt = p.name;
}

// Lightbox close
closeBtn.addEventListener('click', () => lightbox.style.display = 'none');

// Prev/Next navigation
prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + displayedProducts.length) % displayedProducts.length;
  showImage(currentIndex);
});
nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % displayedProducts.length;
  showImage(currentIndex);
});

// Close when clicking outside image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.style.display = 'none';
});






// const filterButtons = document.querySelectorAll('.filters button');
// const allImages = document.querySelectorAll('.gallery img');
// const lightbox = document.getElementById('lightbox');
// const lightboxImg = document.getElementById('lightbox-img');
// const closeBtn = document.querySelector('.lightbox .close');
// const prevBtn = document.querySelector('.lightbox .prev');
// const nextBtn = document.querySelector('.lightbox .next');

// let visibleImages = Array.from(allImages); // starts with all images visible
// let currentIndex = 0; // track which image is open

// filterButtons.forEach(button => {
//     button.addEventListener('click', () => {
//     const filter = button.getAttribute('data-filter');

//     allImages.forEach(img => {
//         const category = img.getAttribute('data-category');
//         if (filter === 'all' || category === filter) {
//         img.classList.remove('hidden');
//         } else {
//         img.classList.add('hidden');
//         }
//     });

//     visibleImages = Array.from(allImages).filter(img => !img.classList.contains('hidden'));
//     });
// });

// // LIGHTBOX FUNCTION
// // ✅ Open lightbox
// allImages.forEach((img) => {
//   img.addEventListener('click', () => {
//     // ✅ Make sure visibleImages is correct before opening
//     visibleImages = Array.from(allImages).filter(img => !img.classList.contains('hidden'));

//     // ✅ Find this image's index in the *filtered* list
//     currentIndex = visibleImages.indexOf(img);

//     // ✅ Show it
//     showImage(currentIndex);
//     lightbox.style.display = 'flex';
//   });
// });

// // ✅ Show image in lightbox
// function showImage(index) {
//   const img = visibleImages[index];
//   lightboxImg.src = img.src;
//   lightboxImg.alt = img.alt;
// }

// // ✅ Close lightbox
// closeBtn.addEventListener('click', () => {
//   lightbox.style.display = 'none';
// });

// // ✅ Click outside to close
// lightbox.addEventListener('click', (e) => {
//   if (e.target === lightbox) {
//     lightbox.style.display = 'none';
//   }
// });

// // ✅ Next arrow
// nextBtn.addEventListener('click', (e) => {
//   e.stopPropagation(); // avoid closing lightbox
//   currentIndex = (currentIndex + 1) % visibleImages.length;
//   showImage(currentIndex);
// });

// // ✅ Previous arrow
// prevBtn.addEventListener('click', (e) => {
//   e.stopPropagation();
//   currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
//   showImage(currentIndex);
// });








// const gallery = document.getElementById('gallery');
//     const lightbox = document.getElementById('lightbox');
//     const lightboxImg = document.getElementById('lightbox-img');
//     const closeBtn = document.querySelector('.lightbox .close');
//     const prevBtn = document.querySelector('.lightbox .prev');
//     const nextBtn = document.querySelector('.lightbox .next');

//     let currentIndex = 0;

//     // Create gallery
//     products.forEach((p, index) => {
//       const img = document.createElement('img');
//       img.src = p.image;
//       img.alt = p.name;
//       img.dataset.index = index;

//       img.addEventListener('click', () => {
//         currentIndex = index;
//         showImage(currentIndex);
//         lightbox.style.display = 'flex';
//       });

//       gallery.appendChild(img);
//     });

//     function showImage(index) {
//       const p = products[index];
//       lightboxImg.src = p.image;
//       lightboxImg.alt = p.name;
//     }

//     // Lightbox close
//     closeBtn.addEventListener('click', () => lightbox.style.display = 'none');

//     // Prev/Next
//     prevBtn.addEventListener('click', (e) => {
//       e.stopPropagation();
//       currentIndex = (currentIndex - 1 + products.length) % products.length;
//       showImage(currentIndex);
//     });
//     nextBtn.addEventListener('click', (e) => {
//       e.stopPropagation();
//       currentIndex = (currentIndex + 1) % products.length;
//       showImage(currentIndex);
//     });

//     // Click outside closes
//     lightbox.addEventListener('click', (e) => {
//       if (e.target === lightbox) lightbox.style.display = 'none';
//     });