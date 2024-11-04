document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector(".header");

    // Delay for the initial full-screen view, then shrink the header
    setTimeout(() => {
        header.classList.add("shrink");
    }, 1000); // Adjust the delay time (in milliseconds) as needed
});
