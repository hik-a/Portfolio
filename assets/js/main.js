// Function to load HTML components
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const content = await response.text();
            document.getElementById(elementId).innerHTML = content;
            
            // After header loads, run setup scripts
            if (elementId === 'header-placeholder') {
                setActiveLink();
            }
            // After footer loads, set the year
            if (elementId === 'footer-placeholder') {
                document.getElementById('year').innerText = new Date().getFullYear();
            }
        } else {
            console.error(`Failed to load ${filePath}`);
        }
    } catch (error) {
        console.error(`Error loading component: ${error}`);
    }
}

// Function to highlight the current page in the nav
function setActiveLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        // Check if the link href matches the current page
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu Toggle
function toggleMenu() {
    const navList = document.getElementById('nav-list');
    navList.classList.toggle('nav-open');
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    loadComponent('header-placeholder', 'assets/components/header.html');
    loadComponent('footer-placeholder', 'assets/components/footer.html');
});
// ... (Your existing loadComponent functions) ...

// === ADD THIS NEW FUNCTION ===
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));
}

// Update your Event Listener to run animations
document.addEventListener("DOMContentLoaded", () => {
    loadComponent('header-placeholder', 'assets/components/header.html');
    loadComponent('footer-placeholder', 'assets/components/footer.html');
    
    // Initialize animations immediately for hero, then wait for content
    setTimeout(initAnimations, 100); 
});