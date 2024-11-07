let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll) {
        // Scroll down: hide header
        document.querySelector('header').style.top = '-80px'; // Adjust value if needed
    } else {
        // Scroll up: show header
        document.querySelector('header').style.top = '0';
    }
    lastScroll = currentScroll;
});
