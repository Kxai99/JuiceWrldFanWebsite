document.addEventListener('DOMContentLoaded', function () {
    // Enhanced text animation
    function animateText(element, targetValue) {
        // Configuration
        const possibleText = '0123456789' // Characters to cycle through
        const duration = 2000 // Total animation duration in milliseconds
        const initialDelay = 300 // Initial delay before animation starts
        const finalNumberHoldTime = 800 // Time to hold the final number at the end
        const targetLength = targetValue.length

        // Set up initial state
        let currentText = ''
        let animationStarted = false
        let isFinalValueSet = false
        
        // Start with empty string
        element.textContent = ''
        
        // Add a blinking cursor effect during animation
        element.classList.add('animating-stat')
        
        // Calculate total frames and interval
        const framesPerChar = 6 // Approximately how many frames per character
        const totalFrames = targetLength * framesPerChar
        const intervalTime = Math.max(25, (duration - finalNumberHoldTime) / totalFrames)
        
        // Delay the start of animation
        setTimeout(() => {
            animationStarted = true
            
            // Create animation interval
            const animationInterval = setInterval(() => {
                if (currentText.length < targetLength) {
                    // Add random number to the current text
                    currentText += possibleText.charAt(Math.floor(Math.random() * possibleText.length))
                    element.textContent = currentText
                } else if (!isFinalValueSet) {
                    // Set the final value
                    clearInterval(animationInterval)
                    isFinalValueSet = true
                    
                    // Transition to the final value with a slight delay for effect
                    setTimeout(() => {
                        // Apply final value with a highlight effect
                        element.textContent = targetValue
                        element.classList.add('stat-highlight')
                        
                        // Remove highlight class after animation completes
                        setTimeout(() => {
                            element.classList.remove('animating-stat', 'stat-highlight')
                        }, 500)
                    }, 100)
                }
            }, intervalTime)
        }, initialDelay)
    }

    // Animate bars in the chart
    function animateChartBars() {
        const chartBars = document.querySelectorAll('.chart-bar')
        
        if (chartBars.length) {
            chartBars.forEach((bar, index) => {
                // Store the target width
                const targetWidth = bar.style.width
                // Start with 0 width
                bar.style.width = '0%'
                
                // Delay each bar animation by index
                setTimeout(() => {
                    // Animate to target width
                    bar.style.transition = 'width 1.5s cubic-bezier(0.25, 0.8, 0.25, 1)'
                    bar.style.width = targetWidth
                    
                    // Show text after partial animation
                    setTimeout(() => {
                        bar.style.opacity = '1'
                    }, 500)
                }, 500 + (index * 200))
            })
        }
    }
    
    // Animate the achievements section
    function animateAchievements() {
        const achievementItems = document.querySelectorAll('.achievement-item')
        
        if (achievementItems.length) {
            achievementItems.forEach((item, index) => {
                // Start hidden
                item.style.opacity = '0'
                item.style.transform = 'translateY(30px)'
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
                
                // Delay each item animation by index
                setTimeout(() => {
                    item.style.opacity = '1'
                    item.style.transform = 'translateY(0)'
                }, 800 + (index * 150))
            })
        }
    }

    // Main function to randomize stats
    function randomizeStats() {
        const spotifyStreamElement = document.querySelector('.stats-card:nth-child(1) .stream-number')
        const soundcloudStreamElement = document.querySelector('.stats-card:nth-child(2) .stream-number')
        const youtubeViewElement = document.querySelector('.stats-card:nth-child(3) .stream-number')

        if (spotifyStreamElement && soundcloudStreamElement && youtubeViewElement) {
            // Wait for page load to start animations
            setTimeout(() => {
                animateText(spotifyStreamElement, '30B+')
                animateText(soundcloudStreamElement, '26B')
                animateText(youtubeViewElement, '5.9B')
                
                // Animate chart bars and achievements after stats animation
                setTimeout(() => {
                    animateChartBars()
                    animateAchievements()
                }, 1000)
            }, 500)
        }
    }

    // Initialize animations
    randomizeStats()
    
    // Add scroll animation for stats cards
    function animateStatsOnScroll() {
        const statsCards = document.querySelectorAll('.stats-card')
        const windowHeight = window.innerHeight
        
        statsCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top
            
            if (cardPosition < windowHeight * 0.8) {
                card.style.opacity = '1'
                card.style.transform = 'translateY(0)'
            }
        })
    }
    
    // Set initial state for stats cards
    const statsCards = document.querySelectorAll('.stats-card')
    statsCards.forEach(card => {
        card.style.opacity = '0'
        card.style.transform = 'translateY(40px)'
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
    })
    
    // Listen for scroll to trigger animations
    window.addEventListener('scroll', animateStatsOnScroll)
    
    // Trigger initial animation check
    setTimeout(animateStatsOnScroll, 100)
})
