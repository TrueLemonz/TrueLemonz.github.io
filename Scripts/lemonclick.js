let lemonClicks = 0;

document.addEventListener('DOMContentLoaded', () => {
    const img = document.querySelector('.lemon img');
    const hero = document.querySelector('.hero');
    const clickCountDisplay = document.querySelector('.click-count'); // Get the click count display element

    if (img && hero && clickCountDisplay) {
        // Initially hide the click count
        clickCountDisplay.style.display = 'none';

        img.addEventListener('click', () => {
            console.log('Image clicked');
            const sound = new Audio('SFX/clickSFX.mp3');
            const unveilsfx = new Audio('SFX/unveil.mp3');
            lemonClicks += 1;
            console.log(lemonClicks);
            sound.play();
            clickCountDisplay.textContent = lemonClicks;

            // Show the click count if lemonClicks is greater than 0
            if (lemonClicks > 10) {
                clickCountDisplay.style.display = 'block';
            }
            if (lemonClicks === 10) {
                unveilsfx.play();
            }
        });

        img.addEventListener('mousedown', () => {
            console.log('Mouse down');
            img.style.border = '5px solid rgba(255, 0, 0, 0.002)';
            img.style.transform = 'scale(0.9)';
        });

        img.addEventListener('mouseup', () => {
            console.log('Mouse up');
            img.style.border = '';
            img.style.transform = 'scale(1)';
        });

        img.addEventListener('mouseleave', () => {
            console.log('Mouse leave');
            img.style.border = '';
            img.style.transform = 'scale(1)';
        });
    } else {
        console.log('Image or Hero section not found');
    }
});
