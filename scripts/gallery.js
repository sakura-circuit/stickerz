const gallery = document.getElementById("gallery");

let i = 1;

function loadNextImage() {
    const image = new Image();

    image.src = `../my art/art ${i}/art ${i}.png`;

    image.onload = function () {
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");

        const displayedImage = document.createElement("img");
        displayedImage.src = image.src;
        displayedImage.alt = `Gallery Image ${i}`;

        galleryItem.appendChild(displayedImage);
        gallery.appendChild(galleryItem);

        i++;
        loadNextImage();
    };

    image.onerror = function () {
        // No more artwork found
    };
}

loadNextImage();
