const gallery = document.getElementById("gallery");
const imageCount = document.getElementById("image-count");
const imageNumberInput = document.querySelector(".gallery-image-no");
const nextButton = document.querySelector(".gallery-image-next");
const previousButton = document.querySelector(".gallery-image-previous");

// Set the total number of images here
const TOTAL_IMAGES = 53;

let currentImage = 1;
let totalImages = TOTAL_IMAGES;

// Returns the path for an image number
function getImagePath(number) {
    return `data/my art/art ${number}/art ${number}.png`;
}

// Display an image
function loadImage(number) {
    const image = new Image();

    // Create the gallery structure immediately
    gallery.innerHTML = "";

    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");

    // Loading message
    const loadingMessage = document.createElement("div");
    loadingMessage.classList.add("image-loading");

    loadingMessage.innerHTML = '<div class="loader"></div>';

    galleryItem.appendChild(loadingMessage);
    gallery.appendChild(galleryItem);

    image.onload = function () {
        const displayedImage = document.createElement("img");

        displayedImage.src = image.src;
        displayedImage.alt = `Gallery Image ${number}`;

        galleryItem.replaceChildren(displayedImage);

        currentImage = number;
        imageNumberInput.value = number;
    };

    image.onerror = function () {
        loadingMessage.textContent = "Unable to load image.";
    };

    image.src = getImagePath(number);
}

// Next image
nextButton.addEventListener("click", function () {
    if (currentImage < totalImages) {
        loadImage(currentImage + 1);
    }
});

// Previous image
previousButton.addEventListener("click", function () {
    if (currentImage > 1) {
        loadImage(currentImage - 1);
    }
});

// Load typed image when Enter is pressed
imageNumberInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        let number = parseInt(imageNumberInput.value, 10);

        if (isNaN(number)) {
            return;
        }

        // Keep number inside valid range
        if (number < 1) {
            number = 1;
        }

        if (number > totalImages) {
            number = totalImages;
        }

        loadImage(number);
    }
});

// Mark current menu item as active
function markMenu() {
    const link = document.querySelector(".menu a");
    link.classList.add("active");
}

// Start
imageCount.textContent = totalImages;
imageNumberInput.max = totalImages;

markMenu();
loadImage(currentImage);
