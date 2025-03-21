document.addEventListener('DOMContentLoaded', function() {
    // Section navigation functionality
    const navLinks = document.querySelectorAll('.about-nav-link');
    const sections = document.querySelectorAll('.about-section');
    
    // Function to activate a specific section
    function activateSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Show the selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.classList.add('active');
        }
        
        // Activate the corresponding nav link
        const selectedLink = document.querySelector(`.about-nav-link[href="#${sectionId}"]`);
        if (selectedLink) {
            selectedLink.classList.add('active');
        }
        
        // Update URL hash without scrolling
        history.pushState(null, null, `#${sectionId}`);
    }
    
    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            activateSection(sectionId);
        });
    });
    
    // Check for hash in URL on page load
    if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        activateSection(sectionId);
    } else {
        // Activate the first section by default
        const firstSectionId = sections[0].id;
        activateSection(firstSectionId);
    }
    
    // Smooth scroll to documentary section when button is clicked
    const documentaryButtons = document.querySelectorAll('.documentary-button');
    documentaryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // First activate the section if needed
                const parentSection = targetElement.closest('.about-section');
                if (parentSection && !parentSection.classList.contains('active')) {
                    activateSection(parentSection.id);
                }
                
                // Then scroll to the specific element
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate sections when they become visible
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elementsToAnimate = entry.target.querySelectorAll('.legacy-point, .timeline-entry');
                elementsToAnimate.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(30px)';
                        
                        // Force reflow
                        void el.offsetWidth;
                        
                        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 150);
                });
                
                // Stop observing once the animation is done
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Start observing visible sections
    document.querySelectorAll('.about-section.active').forEach(section => {
        sectionObserver.observe(section);
    });
}); 