const gallery = document.getElementById("gallery");
const imageCount = document.getElementById("image-count");
const imageNumberInput = document.querySelector(".gallery-image-no");
const nextButton = document.querySelector(".gallery-image-next");
const previousButton = document.querySelector(".gallery-image-previous");

let currentImage = 1;
let totalImages = 0;

// Returns the path for an image number
function getImagePath(number) {
    return `../my art/art ${number}/art ${number}.png`;
}

// Check how many images exist
function findTotalImages() {
    let number = 1;

    function checkNextImage() {
        const image = new Image();

        image.onload = function () {
            totalImages = number;

            number++;
            checkNextImage();
        };

        image.onerror = function () {
            imageCount.textContent = totalImages;

            // Set maximum allowed value
            imageNumberInput.max = totalImages;

            loadImage(currentImage);
        };

        image.src = getImagePath(number);
    }

    checkNextImage();
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
        setTimeout(() => {
            const displayedImage = document.createElement("img");

            displayedImage.src = image.src;
            displayedImage.alt = `Gallery Image ${number}`;

            galleryItem.replaceChildren(displayedImage);

            currentImage = number;
            imageNumberInput.value = number;
        }, 500);
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

// Start
findTotalImages();
