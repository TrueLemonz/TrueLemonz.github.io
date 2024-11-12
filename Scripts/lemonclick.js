// Initialize variables
let lemonClicks = 0;
let particles = [];
let easteregg = false;
let lemonTrees = 0;
let farmers = 0;

// Load saved data from localStorage
document.addEventListener('DOMContentLoaded', () => {
    // Load saved data
    loadGameData();

    const img = document.querySelector('.lemon img');
    const hero = document.querySelector('.hero');
    const clickCountDisplay = document.querySelector('.click-count');

    if (img && hero && clickCountDisplay) {
        clickCountDisplay.style.display = 'none';

        img.addEventListener('click', () => {
            console.log('Image clicked');
            const sound = new Audio('SFX/clickSFX.mp3');
            const unveilsfx = new Audio('SFX/unveil.mp3');
            lemonClicks += 1;
            console.log(lemonClicks);
            sound.play();
            clickCountDisplay.textContent = lemonClicks.toFixed(1);

            if (lemonClicks > 9) {
                clickCountDisplay.style.display = 'block';
            }

            if (lemonClicks === 10 && easteregg === false) {
                unveilsfx.play();
                addButtons(hero, clickCountDisplay);
                easteregg = true;
                hero.style.height = '120vh';
            }

            createParticles(img);
            saveGameData(); // Save data after each click
        });

        // Load buttons if easteregg is already unlocked
        if (easteregg) {
            addButtons(hero, clickCountDisplay);
        }

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

    // Start the automatic lemon generation
    setInterval(autoGenerateLemons, 1000 / 10);
});

// Save game data to localStorage
function saveGameData() {
    localStorage.setItem('lemonClicks', lemonClicks);
    localStorage.setItem('lemonTrees', lemonTrees);
    localStorage.setItem('farmers', farmers);
    localStorage.setItem('easteregg', easteregg);
}

// Load game data from localStorage
function loadGameData() {
    lemonClicks = parseFloat(localStorage.getItem('lemonClicks')) || 0;
    lemonTrees = parseInt(localStorage.getItem('lemonTrees')) || 0;
    farmers = parseInt(localStorage.getItem('farmers')) || 0;
    easteregg = localStorage.getItem('easteregg') === 'true';
}

function autoGenerateLemons() {
    // Add lemons for each lemon tree (1 per second)
    lemonClicks += lemonTrees / 10;
    // Add lemons for each farmer (10 per second)
    lemonClicks += (farmers * 10) / 10;

    // Update the display
    const clickCountDisplay = document.querySelector('.click-count');
    if (clickCountDisplay) {
        clickCountDisplay.textContent = lemonClicks.toFixed(1);
    }

    // Update the button colors based on the current lemon count
    updateButtonColors();
}

function updateButtonColors() {
    const shopButtons = document.querySelectorAll('.shop');
    if (shopButtons.length >= 2) {
        const price1 = getFarmerPrice();
        const price2 = getLemonTreePrice();

        // Button 1 (farmer)
        if (lemonClicks < price1) {
            shopButtons[0].style.backgroundColor = '#8B0000'; // Dark red if not enough lemons
            shopButtons[0].style.pointerEvents = 'none'; // Disable hover effect and click
        } else {
            shopButtons[0].style.backgroundColor = ''; // Reset to default color
            shopButtons[0].style.pointerEvents = 'auto'; // Enable hover and click
        }

        // Button 2 (lemon tree)
        if (lemonClicks < price2) {
            shopButtons[1].style.backgroundColor = '#8B0000'; // Dark red if not enough lemons
            shopButtons[1].style.pointerEvents = 'none'; // Disable hover effect and click
        } else {
            shopButtons[1].style.backgroundColor = ''; // Reset to default color
            shopButtons[1].style.pointerEvents = 'auto'; // Enable hover and click
        }
    }
}

function createParticles(img) {
    if (particles.length >= 60) {
        const oldestParticle = particles.shift();
        oldestParticle.remove();
    }

    for (let i = 0; i < Math.random() + 3; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        document.body.appendChild(particle);

        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 14 + 18;

        const rect = img.getBoundingClientRect();
        const startX = rect.left + window.scrollX + rect.width / 2;
        const startY = (rect.top + window.scrollY) * 1.4;

        const offsetX = Math.cos(angle) * speed;
        const offsetY = Math.sin(angle) * speed;

        const rotation = Math.random() * 360;

        particle.style.position = 'absolute';
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.width = '5px';
        particle.style.height = '5px';
        particle.style.backgroundColor = 'yellow';
        particle.style.borderRadius = '50%';
        particle.style.opacity = '1';
        particle.style.transition = 'all 1s ease-out';
        particle.style.transform = `rotate(${rotation}deg)`;

        particle.style.left = `${startX + offsetX}px`;
        particle.style.top = `${startY + offsetY}px`;

        const fallDuration = 1000;
        let startTime = Date.now();

        const animateFall = () => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / fallDuration, 1);

            particle.style.left = `${startX + offsetX}px`;
            particle.style.top = `${startY + offsetY + progress * 300}px`;
            particle.style.opacity = 1 - progress;

            if (progress < 1) {
                requestAnimationFrame(animateFall);
            } else {
                particles.splice(particles.indexOf(particle), 1);
                particle.remove();
            }
        };

        animateFall();

        particles.push(particle);
    }
}

function addButtons(hero, clickCountDisplay) {
    const shopButtonsContainer = document.createElement('div');
    shopButtonsContainer.classList.add('shop-buttons-container');
    hero.appendChild(shopButtonsContainer);

    // Create the "farmer" button and counter container
    const shopButton1Container = document.createElement('div');
    shopButton1Container.classList.add('shop-button-container');
    
    const shopButton1 = document.createElement('button');
    shopButton1.classList.add('shop');
    const farmerImage = document.createElement('img');
    farmerImage.src = 'Images/lessgo.png';
    farmerImage.style.width = '40px';
    farmerImage.style.height = '40px';
    shopButton1.appendChild(farmerImage);
    const farmerText = document.createElement('span');
    farmerText.textContent = `Purchase farmer (Price: ${getFarmerPrice()} lemons)`;
    shopButton1.appendChild(farmerText);
    shopButton1Container.appendChild(shopButton1);

    // Create and append the farmer counter
    const farmerCounter = document.createElement('div');
    farmerCounter.classList.add('entity-count');
    farmerCounter.textContent = `Farmers: ${farmers}`;
    shopButton1Container.appendChild(farmerCounter);

    shopButtonsContainer.appendChild(shopButton1Container);

    // Create the "lemon tree" button and counter container
    const shopButton2Container = document.createElement('div');
    shopButton2Container.classList.add('shop-button-container');
    
    const shopButton2 = document.createElement('button');
    shopButton2.classList.add('shop');
    const treeImage = document.createElement('img');
    treeImage.src = 'Images/lessgooo.png';
    treeImage.style.width = '40px';
    treeImage.style.height = '40px';
    shopButton2.appendChild(treeImage);
    const treeText = document.createElement('span');
    treeText.textContent = `Purchase lemon tree (Price: ${getLemonTreePrice()} lemons)`;
    shopButton2.appendChild(treeText);
    shopButton2Container.appendChild(shopButton2);

    // Create and append the lemon tree counter
    const lemonTreeCounter = document.createElement('div');
    lemonTreeCounter.classList.add('entity-count');
    lemonTreeCounter.textContent = `Lemon Trees: ${lemonTrees}`;
    shopButton2Container.appendChild(lemonTreeCounter);

    shopButtonsContainer.appendChild(shopButton2Container);

    // Style the buttons container
    const allButtonsContainers = [shopButton1Container, shopButton2Container];
    allButtonsContainers.forEach(container => {
        container.style.marginBottom = '1em'; // Space between button and counter
        container.style.textAlign = 'center'; // Center button and counter
    });

    // Style the buttons
    const allButtons = [shopButton1, shopButton2];
    allButtons.forEach(button => {
        button.style.width = '450px';
        button.style.height = '80px';
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
        button.style.gap = '10px';
    });

    // Button 1: Purchase farmer
    shopButton1.addEventListener('click', () => {
        const price = getFarmerPrice();
        if (lemonClicks >= price) {
            lemonClicks -= price;
            farmers += 1;
            Successsound.play();
            clickCountDisplay.textContent = lemonClicks.toFixed(1);
            updateButtonPrices();
            shopButton1.style.backgroundColor = ''; // Reset color
            farmerCounter.textContent = `Farmers: ${farmers}`; // Update counter
        } else {
            console.log('Not enough lemons for farmer!');
            Errorsound.play();
            shopButton1.style.backgroundColor = 'red'; // Turn button red
        }
    });

    // Button 2: Purchase lemon tree
    shopButton2.addEventListener('click', () => {
        const price = getLemonTreePrice();
        if (lemonClicks >= price) {
            lemonClicks -= price;
            lemonTrees += 1;
            Successsound.play();
            clickCountDisplay.textContent = lemonClicks.toFixed(1);
            updateButtonPrices();
            shopButton2.style.backgroundColor = ''; // Reset color
            lemonTreeCounter.textContent = `Lemon Trees: ${lemonTrees}`; // Update counter
        } else {
            console.log('Not enough lemons for lemon tree!');
            Errorsound.play();
            shopButton2.style.backgroundColor = 'red'; // Turn button red
        }
    });

    // Check if buttons need to be red based on initial lemon count
    const price1 = getFarmerPrice();
    const price2 = getLemonTreePrice();
    if (lemonClicks < price1) {
        shopButton1.style.backgroundColor = 'red';
    }
    if (lemonClicks < price2) {
        shopButton2.style.backgroundColor = 'red';
    }
}


function getLemonTreePrice() {
    return Math.round(lemonTreeBasePrice * Math.pow(1.15, lemonTrees));
}

function getFarmerPrice() {
    return Math.round(farmerBasePrice * Math.pow(1.15, farmers));
}

function updateButtonPrices() {
    // Find the buttons by their class and update their text and images
    const shopButtons = document.querySelectorAll('.shop');
    if (shopButtons.length >= 2) {
        // Update button 1 (farmer)
        shopButtons[0].textContent = '';  // Clear current text
        const farmerImage = document.createElement('img');
        farmerImage.src = 'Images/lessgo.png';
        farmerImage.style.width = '40px';
        farmerImage.style.height = '40px';
        shopButtons[0].appendChild(farmerImage);
        shopButtons[0].appendChild(document.createTextNode(`Purchase farmer (Price: ${getFarmerPrice()} lemons)`));

        // Update button 2 (lemon tree)
        shopButtons[1].textContent = '';  // Clear current text
        const treeImage = document.createElement('img');
        treeImage.src = 'Images/lessgooo.png';
        treeImage.style.width = '40px';
        treeImage.style.height = '40px';
        shopButtons[1].appendChild(treeImage);
        shopButtons[1].appendChild(document.createTextNode(`Purchase lemon tree (Price: ${getLemonTreePrice()} lemons)`));
    }
}
