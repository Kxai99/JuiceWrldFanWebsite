document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to album cards
    const albumCards = document.querySelectorAll('.album-card');
    
    albumCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add a subtle scale effect
            this.style.transform = 'translateY(-10px) scale(1.03)';
            this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.5)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset to original state
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Album hover sound effect (commented out to avoid autoplay issues)
    /* 
    const hoverSound = new Audio('assets/sounds/hover-sound.mp3');
    albumCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            hoverSound.play();
        });
    });
    */
    
    // Animate timeline items on scroll
    function checkTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const triggerBottom = window.innerHeight * 0.8;
        
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < triggerBottom) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Check timeline on load and scroll
    window.addEventListener('load', checkTimeline);
    window.addEventListener('scroll', checkTimeline);
}); 