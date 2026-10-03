/* ========================================
   GLOBAL VARIABLES (EASY TO EDIT)
   ======================================== */
// Change this to your actual WhatsApp Number (Include country code, no + or spaces)
const WHATSAPP_NUMBER = "918220356787"; 

// Change this to your Instagram profile link
const INSTAGRAM_LINK = "https://www.instagram.com/sri_shadima_aari_creation/";

/* ========================================
   INITIAL SETUP
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    
    // Update contact numbers dynamically on the page
    const phoneDisplays = document.querySelectorAll('.phone-display');
    phoneDisplays.forEach(el => {
        el.textContent = "+91 82203 56787"; 
    });

    // Update Instagram links dynamically
    const instaLinks = document.querySelectorAll('.instagram-link');
    instaLinks.forEach(el => {
        el.href = INSTAGRAM_LINK;
    });

    /* ========================================
       WHATSAPP DIRECT BUTTONS
       ======================================== */
    const whatsappButtons = document.querySelectorAll('.whatsapp-direct');
    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const message = encodeURIComponent("Hello Sri Sadima Aari Creations, I am interested in your beautiful premium collections.");
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
        });
    });

    /* ========================================
       MOBILE HAMBURGER MENU
       ======================================== */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-link, .btn-nav-order');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    /* ========================================
       NAVBAR SCROLL EFFECT
       ======================================== */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ========================================
       SCROLL REVEAL ANIMATION
       ======================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeSections = document.querySelectorAll('.fade-in-section');
    fadeSections.forEach(section => {
        observer.observe(section);
    });

    /* ========================================
       MASONRY GALLERY FILTERING
       ======================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const masonryItems = document.querySelectorAll('.masonry-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            masonryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    /* ========================================
       LIGHTBOX (GALLERY IMAGE ZOOM)
       ======================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    let currentImageIndex = 0;
    let visibleImages = [];

    // Combine images from Masonry Gallery and Instagram Feed
    const allGalleryImages = document.querySelectorAll('.masonry-item img, .insta-grid img, .lux-cat-card img, .strip-item img');

    // Open Lightbox
    allGalleryImages.forEach((img) => {
        img.addEventListener('click', () => {
            // Find currently visible images across masonry (ignore hidden ones due to filter)
            visibleImages = Array.from(document.querySelectorAll('.masonry-item img'))
                                 .filter(img => img.parentElement.style.display !== 'none');
            
            // If the clicked image isn't in masonry, just make a temp array with that image
            if (!visibleImages.includes(img)) {
                visibleImages = [img];
            }

            currentImageIndex = visibleImages.indexOf(img);
            showLightboxImage(currentImageIndex);
            lightbox.classList.add('active');
        });
    });

    // Close Lightbox
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // Close Lightbox when clicking outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Next Image
    lightboxNext.addEventListener('click', () => {
        if(visibleImages.length <= 1) return;
        currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
        showLightboxImage(currentImageIndex);
    });

    // Previous Image
    lightboxPrev.addEventListener('click', () => {
        if(visibleImages.length <= 1) return;
        currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
        showLightboxImage(currentImageIndex);
    });

    function showLightboxImage(index) {
        if (visibleImages.length > 0 && index >= 0 && index < visibleImages.length) {
            lightboxImg.src = visibleImages[index].src;
        }
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        } else if (e.key === 'ArrowRight' && visibleImages.length > 1) {
            currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
            showLightboxImage(currentImageIndex);
        } else if (e.key === 'ArrowLeft' && visibleImages.length > 1) {
            currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
            showLightboxImage(currentImageIndex);
        }
    });

    /* ========================================
       CUSTOM ORDER FORM -> WHATSAPP
       ======================================== */
    const orderForm = document.getElementById('order-form');
    
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name')?.value || 'Not specified';
        const phone = document.getElementById('phone')?.value || 'Not specified';
        const product = document.getElementById('product')?.value || 'Not specified';
        const occasion = document.getElementById('occasion')?.value || 'Not specified';
        const color = document.getElementById('color')?.value || 'Not specified';
        const requirements = document.getElementById('requirements')?.value || 'None';

        // Format message
        const message = `*✨ New Custom Order Inquiry ✨*%0A%0A` +
                        `*Name:* ${name}%0A` +
                        `*Phone:* ${phone}%0A` +
                        `*Product:* ${product}%0A` +
                        `*Occasion:* ${occasion}%0A` +
                        `*Preferred Color:* ${color}%0A` +
                        `*Requirements:* ${requirements}%0A%0A` +
                        `I would love to know the pricing and process. (I will attach reference images here if needed).`;

        // Open WhatsApp
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
        
        // Reset form
        orderForm.reset();
    });

    /* ========================================
       PARALLAX SCROLL FOR BACKGROUNDS
       ======================================== */
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const floralBg = document.querySelector('.floral-bg-overlay');
        if (floralBg) {
            floralBg.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
});
