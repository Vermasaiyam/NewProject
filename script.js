// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class based on scroll position
    if (currentScroll > header.offsetHeight) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scrolling down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
const successModal = document.getElementById('successModal');
const closeModal = document.querySelector('.close-modal');

function showModal() {
    successModal.classList.add('show');
    document.body.classList.add('modal-open');
}

function hideModal() {
    successModal.classList.remove('show');
    document.body.classList.remove('modal-open');
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    showModal();
});

closeModal.addEventListener('click', hideModal);

window.addEventListener('click', function(e) {
    if (e.target === successModal) {
        hideModal();
    }
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.feature-card, .pricing-card, .testimonial').forEach(el => {
    observer.observe(el);
});

// Add CSS class for animation
const style = document.createElement('style');
style.textContent = `
    .feature-card, .pricing-card, .testimonial {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .feature-card.animate, .pricing-card.animate, .testimonial.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style); 

// Video Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.querySelector('.video-container');
    const video = videoContainer.querySelector('video');
    let isFirstPlay = true;

    videoContainer.addEventListener('click', function() {
        if (video.paused) {
            // If it's the first play, load the video
            if (isFirstPlay) {
                video.load();
                isFirstPlay = false;
            }
            video.play();
            videoContainer.classList.add('playing');
        } else {
            video.pause();
            videoContainer.classList.remove('playing');
        }
    });

    // Hide overlay when video ends
    video.addEventListener('ended', function() {
        videoContainer.classList.remove('playing');
        isFirstPlay = true; // Reset for next play
    });

    // Update overlay when video is played/paused
    video.addEventListener('play', function() {
        videoContainer.classList.add('playing');
    });

    video.addEventListener('pause', function() {
        videoContainer.classList.remove('playing');
    });

    // Handle video errors
    video.addEventListener('error', function() {
        console.error('Error playing video');
        videoContainer.classList.remove('playing');
        isFirstPlay = true;
    });
});

// Testimonial Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const dots = document.querySelectorAll('.slider-dots .dot');
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;

    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show selected testimonial and activate dot
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    // Add click event listeners to dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
        });
    });

    // Auto-advance slider every 5 seconds
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }, 5000);
});