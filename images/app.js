//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousels');
let SliderDom = carouselDom.querySelector('.carousels .list');
let thumbnailBorderDom = document.querySelector('.carousels .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousels .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousels .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousels .thumbnail .item');

    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}






var gallery = document.querySelector('#gallerys');
var getVal = function (elem, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
var getHeight = function (item) { return item.querySelector('.content').getBoundingClientRect().height; };
var resizeAll = function () {
    var altura = getVal(gallery, 'grid-auto-rows');
    var gap = getVal(gallery, 'grid-row-gap');
    gallery.querySelectorAll('.gallerys-item').forEach(function (item) {
        var el = item;
        el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
    });
};
gallery.querySelectorAll('img').forEach(function (item) {
    item.classList.add('byebye');
    if (item.complete) {
        console.log(item.src);
    }
    else {
        item.addEventListener('load', function () {
            var altura = getVal(gallerys, 'grid-auto-rows');
            var gap = getVal(gallerys, 'grid-row-gap');
            var gitem = item.parentElement.parentElement;
            gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
            item.classList.remove('byebye');
        });
    }
});
window.addEventListener('resize', resizeAll);
gallery.querySelectorAll('.gallerys-item').forEach(function (item) {
    item.addEventListener('click', function () {        
        item.classList.toggle('full');        
    });
});




// Wait until the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to key elements in the document
    const gallery = document.getElementById('gallerys');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeButton = document.getElementById('close');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentIndex = 0;  // Track the current image index
    let captionEnabled = true;  // Toggle for showing/hiding captions

    // Add click event listener to the gallery
    gallery.addEventListener('click', e => {
        // Check if the clicked element is an image
        if (e.target.tagName === 'IMG') { 
            const imageSrc = e.target.dataset.image || e.target.src;  // Get image source
            const caption = e.target.dataset.caption || e.target.alt;  // Get image caption
            currentIndex = Array.from(gallery.children).indexOf(e.target);  // Update the current index
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
        const nextIndex = (currentIndex + 1) % gallery.children.length;  // Calculate the next index
        const nextImage = gallery.children[nextIndex].dataset.image || gallery.children[nextIndex].src;  // Get the next image source
        const nextCaption = gallery.children[nextIndex].dataset.caption || gallery.children[nextIndex].alt;  // Get the next image caption
        fadeOut(lightboxImage, 500, () => {  // Fade out the current image
            updateImage(nextImage, nextCaption);  // Update to the next image and caption
            currentIndex = nextIndex;  // Update the current index
        });
    });

    // Add click event listener to the previous button for showing the previous image
    prevButton.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + gallery.children.length) % gallery.children.length;  // Calculate the previous index
        const prevImage = gallery.children[prevIndex].dataset.image || gallery.children[prevIndex].src;  // Get the previous image source
        const prevCaption = gallery.children[prevIndex].dataset.caption || gallery.children[prevIndex].alt;  // Get the previous image caption
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
