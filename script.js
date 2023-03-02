const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages =0;
let photosArray = [];

// Unsplash API
let countPhotosDisplayed = 5;
const apiKey = '_lv6WV6Y4iWSh4wJWTpMkahQkNM7VQBvpweDa2CjE_E';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${countPhotosDisplayed}`;

// Check if all images were loaded 
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        countPhotosDisplayed = 20;
    }

}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, Attributes) {
    for (const key in Attributes) {
        element.setAttribute(key, Attributes[key]);
    }
}

// Create Elements for Links & Photos, Add to DOM 
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create  <a> to link to unsplash 
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            titile: photo.alt_description,
        });
        // Event listener, check when each is finished loading 
        img.addEventListener('load', imageLoaded);
        // Put <img> inside the <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// GET photos from Unsplash API 
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos(); 
    } catch (error) {
        console.log(error);
    }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false; 
        getPhotos();
    }
});

// On load
getPhotos();