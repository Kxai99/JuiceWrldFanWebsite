document.addEventListener('DOMContentLoaded', function() {
    // Size selection functionality
    const sizeElements = document.querySelectorAll('.merch-sizes span');
    
    sizeElements.forEach(function(element) {
        element.addEventListener('click', function() {
            // Remove active class from all size elements in this product
            const parentSizes = this.parentElement.querySelectorAll('span');
            parentSizes.forEach(size => size.classList.remove('active'));
            
            // Add active class to the clicked size
            this.classList.add('active');
        });
    });
    
    // Add to cart button functionality with ripple effect
    const buttons = document.querySelectorAll('.merch-button');
    
    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            // Create the ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            // Position the ripple where the user clicked
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            // Add the ripple to the button
            button.appendChild(ripple);
            
            // Find the product info
            const productCard = button.closest('.merch-item');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.merch-price').textContent;
            
            // Get the selected size if any
            let selectedSize = 'No size selected';
            const activeSize = productCard.querySelector('.merch-sizes span.active');
            if (activeSize) {
                selectedSize = activeSize.textContent;
            }
            
            // Show message about the item being added to cart
            setTimeout(() => {
                alert(`${productName} (${selectedSize}) ${productPrice} has been added to your cart!\n\nNote: This is a demo. No actual purchase will be made.`);
            }, 300);
            
            // Remove the ripple after the animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    const emailInput = document.getElementById('newsletter-email');
    const submitButton = document.getElementById('newsletter-submit');
    
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            // Simple validation
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // Very basic email validation
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate subscription success
            alert('Thank you for subscribing to our newsletter! You\'ll be the first to know about new merchandise and exclusive drops.');
            emailInput.value = '';
        });
    }
    
    // Simple email validation function
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Add a class for page load animation
    const merchItems = document.querySelectorAll('.merch-item');
    
    // Use setTimeout to add animation after a small delay for better effect
    setTimeout(() => {
        merchItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('loaded');
            }, index * 150); // Stagger the animations
        });
    }, 300);
}); 