// randomize-stats.js

document.addEventListener("DOMContentLoaded", function () {
  function animateText(element, targetValue) {
    const possibleText = "0123456789"; // Characters to cycle through
    const cycleInterval = 75; // Increase value for a longer animation (milliseconds)
    const changeInterval = 100; // Time interval between numbers (milliseconds)

    let currentText = "";
    let animationFinished = false;

    const cycleIntervalId = setInterval(() => {
      currentText = currentText + possibleText.charAt(Math.floor(Math.random() * possibleText.length));
      element.textContent = currentText;

      if (currentText.length >= targetValue.length) {
        clearInterval(cycleIntervalId);
        const interval = setInterval(() => {
          currentText = targetValue;
          element.textContent = currentText;
          clearInterval(interval);
        }, changeInterval);
      }
    }, cycleInterval);
  }

  function randomizeStats() {
    const spotifyStreamElement = document.querySelector(".box:nth-child(1) .stream-number");
    const soundcloudStreamElement = document.querySelector(".box:nth-child(2) .stream-number");
    const youtubeViewElement = document.querySelector(".box:nth-child(3) .stream-number");

    animateText(spotifyStreamElement, "30B+");
    animateText(soundcloudStreamElement, "26B");
    animateText(youtubeViewElement, "5.9B");
  }

  randomizeStats();
});
