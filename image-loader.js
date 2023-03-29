const images = [
  "./images/image-product-1.jpg",
  "./images/image-product-2.jpg",
  "./images/image-product-3.jpg",
  "./images/image-product-4.jpg",
];

const thumbnails = [
  "./images/image-product-1-thumbnail.jpg",
  "./images/image-product-2-thumbnail.jpg",
  "./images/image-product-3-thumbnail.jpg",
  "./images/image-product-4-thumbnail.jpg",
];

const previewImages = document.querySelectorAll(".preview-image");
const mainImage = document.querySelector(".current-image");
const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");

let currentIndex = 0;
mainImage.setAttribute("src", images[currentIndex]);
previewImages[currentIndex].classList.add("active");


previewImages.forEach((previewImage, index) => {
  previewImage.setAttribute("src", thumbnails[index]);

  previewImage.addEventListener("click", () => {
    mainImage.setAttribute("src", images[index]);

    previewImages.forEach((previewImage) => {
      previewImage.classList.remove("active");
    });

    previewImage.classList.add("active");

    currentIndex = index;
  });
});

leftArrow.addEventListener('click', () => {
  
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  mainImage.src = images[currentIndex];
});

rightArrow.addEventListener('click', () => {
  
  currentIndex = (currentIndex + 1) % images.length;
  mainImage.src = images[currentIndex];
});

const lightBoxCont = document.querySelector('.lightbox')
const lightBoxWrap = document.createElement("div");
lightBoxWrap.classList.add("lightbox-wrapper");


lightBoxWrap.innerHTML += `
      <div class="images-section">
      <a class='close-btn'><svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#69707D" fill-rule="evenodd"/></svg></a>
      <div class="main-image">
      <a class="left"><svg width="12" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg></a>
          <img
            src=""
            alt="product-image"
            class="current-image"
          />
          <a class="right"><svg width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg></a>
        </div>

        <div class="preview-images">
          <img
            src=""
            alt="preview-image"
            class="preview-image"
          />
          <img
            src=""
            alt="preview-image"
            class="preview-image"
          />
          <img
            src=""
            alt="preview-image"
            class="preview-image"
          />
          <img
            src=""
            alt="preview-image"
            class="preview-image"
          />
        </div>
      </div>
`;

lightBoxCont.appendChild(lightBoxWrap)

mainImage.addEventListener('click', () => {

  lightBoxCont.classList.remove('hidden');

  const lightboxImages = lightBoxWrap.querySelectorAll('.preview-image');
  const lightboxMainImage = lightBoxWrap.querySelector('.current-image');

  for (let i = 0; i < images.length; i++) {
    lightboxImages[i].setAttribute('src', thumbnails[i]);
    lightboxImages[i].addEventListener('click', () => {
      lightboxMainImage.setAttribute('src', images[i]);
    });
  }

  lightboxMainImage.setAttribute('src', images[0]);
})

const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', () => {

  lightBoxCont.classList.add('hidden')

  const lightboxImages = lightBoxWrap.querySelectorAll('.preview-image');
  const lightboxMainImage = lightBoxWrap.querySelector('.current-image');

  for (let i = 0; i < images.length; i++) {
    lightboxImages[i].setAttribute('src', '');
  }

  lightboxMainImage.setAttribute('src', '');
})


const left = lightBoxWrap.querySelector('.left');
const right = lightBoxWrap.querySelector('.right');


left.addEventListener('click', () => {
  const lightboxMainImage = lightBoxWrap.querySelector('.current-image');

  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxMainImage.src = images[currentIndex];
});

right.addEventListener('click', () => {
  const lightboxMainImage = lightBoxWrap.querySelector('.current-image');

  currentIndex = (currentIndex + 1) % images.length;
  lightboxMainImage.src = images[currentIndex];
});