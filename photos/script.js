// Sample images - replace these with your own photo paths
const images = [
    "https://khanyai.github.io/photos/analog1.JPG?w=800&h=600&fit=crop",
    "https://khanyai.github.io/photos/analog2.JPG?w=800&h=600&fit=crop",
    "https://khanyai.github.io/photos/digital1.jpg?w=800&h=600&fit=crop",
    "https://khanyai.github.io/photos/digital2.jpg?w=800&h=600&fit=crop",
    "https://khanyai.github.io/photos/digital3.jpg?w=800&h=600&fit=crop",
    "https://khanyai.github.io/photos/digital4.jpg?w=800&h=600&fit=crop",
    "https://khanyai.github.io/photos/digital5.jpg?w=800&h=600&fit=crop",
    "https://khanyai.github.io/photos/digital6.JPG?w=800&h=600&fit=crop",
    "https://khanyai.github.io/photos/digital8.JPG?w=800&h=600&fit=crop",
    "https://khanyai.github.io/photos/digital11.JPG?w=800&h=600&fit=crop",
    "https://khanyai.github.io/photos/digital16.JPG?w=800&h=600&fit=crop",
    "https://khanyai.github.io/photos/digital18.JPG?w=800&h=600&fit=crop"
];

// State management
let visibleImages = [];
let loading = false;
let imageIndex = 0;

// DOM elements
const imageGrid = document.getElementById('imageGrid');
const loadingIndicator = document.getElementById('loadingIndicator');
const scrollTrigger = document.getElementById('scrollTrigger');

// Initialize the page
function init() {
    loadInitialImages();
    setupIntersectionObserver();
}

// Load initial set of images
function loadInitialImages() {
    const initialCount = 8;
    for (let i = 0; i < initialCount && i < images.length; i++) {
        addImageToGrid(images[i], i);
        visibleImages.push(images[i]);
    }
    imageIndex = initialCount;
}

// Add an image to the grid
function addImageToGrid(imageSrc, index) {
    const imageItem = document.createElement('div');
    imageItem.className = 'image-item';
    
    chttps://drive.google.com/drive/folders/1fujvmqEPY8YwztroYgieYGQ-oV7zgpwD?usp=sharingonst img = document.createElement('img');
    img.src = imageSrc;
    img.alt = `Photograph ${index + 1}`;
    img.loading = 'lazy';
    
    
    // Handle case sensitivity for jpg/JPG extensions
    img.onerror = function() {
        if (imageSrc.endsWith('.jpg')) {
            this.src = imageSrc.replace('.jpg', '.JPG');
        } else if (imageSrc.endsWith('.JPG')) {
            this.src = imageSrc.replace('.JPG', '.jpg');
        }
    };
    
    imageItem.appendChild(img);
    imageGrid.appendChild(imageItem);
}

// Load more images
function loadMoreImages() {
        if (loading || imageIndex >= images.length) return;
    
    loading = true;
    loadingIndicator.style.display = 'flex';
    
    // Simulate loading delay
    setTimeout(() => {
        const imagesToAdd = 4;
        for (let i = 0; i < imagesToAdd; i++) {
            const imageToAdd = images[imageIndex % images.length];
            addImageToGrid(imageToAdd, visibleImages.length);
            visibleImages.push(imageToAdd);
            imageIndex++;
        }
        
        loading = false;
        loadingIndicator.style.display = 'none';
    }, 500);
}

// Setup intersection observer for infinite scroll
function setupIntersectionObserver() {
    const options = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !loading) {
            loadMoreImages();
        }
    }, options);
    
    observer.observe(scrollTrigger);
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);