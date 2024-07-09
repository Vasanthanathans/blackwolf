// Wait until the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to key elements in the document
    const gallerys = document.getElementById('gallerys');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeButton = document.getElementById('close');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentIndex = 0;  // Track the current image index
    let captionEnabled = true;  // Toggle for showing/hiding captions

    // Add click event listener to the gallery
    gallerys.addEventListener('click', e => {
        // Check if the clicked element is an image
        if (e.target.tagName === 'IMG') { 
            const imageSrc = e.target.dataset.image || e.target.src;  // Get image source
            const caption = e.target.dataset.caption || e.target.alt;  // Get image caption
            currentIndex = Array.from(gallerys.children).indexOf(e.target);  // Update the current index
            updateImage(imageSrc, caption);  // Update the lightbox image and caption
            lightbox.style.display = 'flex';  // Show the lightbox
            fadeIn(lightbox, 500);  // Fade in the lightbox
            document.body.style.overflow = 'hidden';  // Disable page scrolling
        }
    });

    // Add click event listener to the close button
    closeButton.addEventListener('click', () => {
        fadeOut(lightbox, 500, () => {  // Fade out the lightbox
            lightbox.style.display = 'none';  // Hide the lightbox
            document.body.style.overflow = 'auto';  // Enable page scrolling
        });
    });

    // Add click event listener to the lightbox for closing when clicking outside the image
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) {
            fadeOut(lightbox, 500, () => {  // Fade out the lightbox
                lightbox.style.display = 'none';  // Hide the lightbox
                document.body.style.overflow = 'auto';  // Enable page scrolling
            });
        }
    });

    // Add click event listener to the next button for showing the next image
    nextButton.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % gallerys.children.length;  // Calculate the next index
        const nextImage = gallerys.children[nextIndex].dataset.image || gallerys.children[nextIndex].src;  // Get the next image source
        const nextCaption = gallerys.children[nextIndex].dataset.caption || gallerys.children[nextIndex].alt;  // Get the next image caption
        fadeOut(lightboxImage, 500, () => {  // Fade out the current image
            updateImage(nextImage, nextCaption);  // Update to the next image and caption
            currentIndex = nextIndex;  // Update the current index
        });
    });

    // Add click event listener to the previous button for showing the previous image
    prevButton.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + gallerys.children.length) % gallerys.children.length;  // Calculate the previous index
        const prevImage = gallerys.children[prevIndex].dataset.image || gallerys.children[prevIndex].src;  // Get the previous image source
        const prevCaption = gallerys.children[prevIndex].dataset.caption || gallerys.children[prevIndex].alt;  // Get the previous image caption
        fadeOut(lightboxImage, 500, () => {  // Fade out the current image
            updateImage(prevImage, prevCaption);  // Update to the previous image and caption
            currentIndex = prevIndex;  // Update the current index
        });
    });

    // Function to fade in an element
    function fadeIn(element, duration) {
        element.style.opacity = '0';  // Start with opacity 0
        element.style.transition = `opacity ${duration / 1000}s`;  // Set transition duration
        setTimeout(() => {
            element.style.opacity = '1';  // Change opacity to 1 to fade in
        }, 50);  // Delay to ensure the transition is applied
    }

    // Function to fade out an element
    function fadeOut(element, duration, onComplete) {
        element.style.opacity = '1';  // Start with opacity 1
        element.style.transition = `opacity ${duration / 1000}s`;  // Set transition duration
        setTimeout(() => {
            element.style.opacity = '0';  // Change opacity to 0 to fade out
            setTimeout(onComplete, duration);  // Execute callback after the duration
        }, 50);  // Delay to ensure the transition is applied
    }

    // Function to update the caption
    function updateCaption(caption) {
        if (captionEnabled) {
            lightboxCaption.innerHTML = caption;  // Set caption if enabled
        } else {
            lightboxCaption.innerHTML = '';  // Clear caption if disabled
        }
    }

    // Function to update the image and its caption
    function updateImage(src, caption) {
        lightboxImage.src = src;  // Update the image source
        updateCaption(caption);  // Update the caption
        fadeIn(lightboxImage, 500);  // Fade in the new image
    }
});
