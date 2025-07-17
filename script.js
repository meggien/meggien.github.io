// Grab DOM elements
const gallery = document.getElementById('gallery');
const paginationContainer = document.getElementById('pagination');
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
    if (categoryType === "serum") {
        categoryTitle.textContent = "Serum & Essence Products"; 
    } else if (categoryType === "facemask") {
        categoryTitle.textContent = "Face Masks";
    } else if (categoryType === "misc") {
        categoryTitle.textContent = "Miscellaneous";
    } else if (categoryType) {
        const formattedCategory = categoryType.charAt(0).toUpperCase() + categoryType.slice(1);
        categoryTitle.textContent = `${formattedCategory} Products`;
    } else {
        categoryTitle.textContent = "All Products";
    }
}

// Pagination settings
const itemsPerPage = 30;
let currentPage = 1;
let totalPages = Math.ceil(displayedProducts.length / itemsPerPage);

// Show products for current page
function renderPage(page) {
  gallery.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageProducts = displayedProducts.slice(start, end);

  pageProducts.forEach((p, index) => {
    const img = document.createElement('img');
    img.src = p.thumbnail || p.image; // use thumbnail if available
    img.alt = p.name;
    img.dataset.full = p.image; // store full-size for lightbox
    img.dataset.index = start + index;
    img.loading = "lazy";

    img.addEventListener('click', () => {
      currentIndex = start + index;
      showImage(currentIndex);
      lightbox.style.display = 'flex';
    });

    gallery.appendChild(img);
  });

  renderPaginationControls();
}

// Render pagination buttons
function renderPaginationControls() {
  paginationContainer.innerHTML = "";

  const prevPageBtn = document.createElement("button");
  prevPageBtn.textContent = "← Prev";
  prevPageBtn.disabled = currentPage === 1;
  prevPageBtn.addEventListener("click", () => changePage(currentPage - 1));

  const nextPageBtn = document.createElement("button");
  nextPageBtn.textContent = "Next →";
  nextPageBtn.disabled = currentPage === totalPages;
  nextPageBtn.addEventListener("click", () => changePage(currentPage + 1));

  const pageInfo = document.createElement("span");
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  paginationContainer.appendChild(prevPageBtn);
  paginationContainer.appendChild(pageInfo);
  paginationContainer.appendChild(nextPageBtn);
}

// Change page
function changePage(newPage) {
  if (newPage >= 1 && newPage <= totalPages) {
    currentPage = newPage;
    renderPage(currentPage);
  }
}

// Show image in lightbox
let currentIndex = 0;
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

// Keyboard support for arrow keys
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') { // only if lightbox is open
    if (e.key === 'ArrowLeft') {
      // Prev image
      currentIndex = (currentIndex - 1 + displayedProducts.length) % displayedProducts.length;
      showImage(currentIndex);
    } else if (e.key === 'ArrowRight') {
      // Next image
      currentIndex = (currentIndex + 1) % displayedProducts.length;
      showImage(currentIndex);
    } else if (e.key === 'Escape') {
      // Close lightbox on ESC
      lightbox.style.display = 'none';
    }
  }
});

// ✅ Initialize first page
renderPage(currentPage);