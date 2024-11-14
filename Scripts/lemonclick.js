// Initialize variables
let lemonClicks = 0;
let particles = [];
let easteregg = false;
let lemonTrees = 0;
let farmers = 0;
let lemonades = 1;
let ezmode = false;
const lemonTreeBasePrice = 20;  // Example starting price
const farmerBasePrice = 100;  // Example starting price
const lemonadefarmerprice = 60;
const lemonadeprice = 60000;

const Successsound = new Audio('SFX/success.mp3');
const Errorsound = new Audio('SFX/error.mp3');
const LemonCatch = new Audio('SFX/catch.mp3');
const SummonSound = new Audio ('SFX/Notif.mp3');

// Load saved data from localStorage
document.addEventListener('DOMContentLoaded', () => {
    // Load saved data
    loadGameData();

    const img = document.querySelector('.lemon img');
    const hero = document.querySelector('.hero');
    const clickCountDisplay = document.querySelector('.click-count');
    const lemon = document.querySelector('.lemon');
    const shopButtonsContainer = document.querySelector('.shop-buttons-container');
    const lemonImg = document.querySelector('.lemon img');


    if (img && hero && clickCountDisplay) {




        clickCountDisplay.style.display = 'none';

        // Revised click event listener with condition adjustment
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

            // Check if buttons need to be displayed
            if (lemonClicks >= 1 && !easteregg) {
                document.getElementById('hell-yeah').style.visibility = 'hidden';
                unveilsfx.play();
                addButtons(hero, clickCountDisplay);
                easteregg = true;
                hero.style.height = '180vh';

                lemon.style.position = 'absolute';
                lemon.style.top = '60%';
                lemon.style.left = '50%';
                lemon.style.transform = 'translate(-50%, -50%)';
                lemon.style.transition = 'all 1s ease';
                
                setTimeout(() => {
                    lemonImg.style.width = '450px'; // Adjust based on desired scale
                    lemonImg.style.height = '450px'; // Adjust based on desired scale
                    lemonImg.style.transition = 'width 0.5s ease, height 0.5s ease'; // Smooth scaling for width/height
                }, 100);

                // Move lemon to the left after a delay
                setTimeout(() => {
                    lemon.style.left = '0%'; // Adjust to move it to the left middle
                    lemon.style.transform = 'translateY(-50%)';
                }, 100); // Adjust delay if necessary
        
                shopButtonsContainer.style.position = 'absolute';
                shopButtonsContainer.style.top = '300%'; // Move it further down (increased percentage)
                shopButtonsContainer.style.right = '10%';
                

                saveGameData(); // Save easteregg state to localStorage
            }

            createParticles(img);
            saveGameData(); // Save data after each click
        });

        // Load buttons if easteregg is already unlocked
        if (easteregg) {
            addButtons(hero, clickCountDisplay);
            document.getElementById('hell-yeah').style.visibility = 'hidden'; // Hide 'hell-yeah' if easteregg is true
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
    setInterval(autoGenerateLemons, 1000 / 100);
    setInterval(showImage, 60000);

});

// Function to show the image with 30% chance every minute
// Function to create and show the image overlay
function showImage() {
    console.log("Yo the image is rolling rn");
    const randomChance = Math.random();
    
    // Only show image if randomChance is less than or equal to 0.3 (30%)
    if (easteregg) {    
        if (randomChance <= 0.2 || ezmode) {
            console.log("It should show up");
            
            // Create image element dynamically
            const image = document.createElement('img');
            image.id = 'overlayImage';
            image.src = 'Images/image.png';  // Replace with your image URL
            image.alt = 'Random Image';
            
            // Set random size for the image (between 50px and 150px)
            const randomSize = Math.floor(Math.random() * 20) + 160; // Random size between 50px and 150px
            image.style.width = `${randomSize}px`;
            image.style.height = `${randomSize}px`;
            
            // Set random position on the page (within the window's dimensions)
            const randomX = Math.floor(Math.random() * (window.innerWidth - randomSize));
            const randomY = Math.floor(Math.random() * (window.innerHeight - randomSize));
            image.style.position = 'absolute';
            image.style.left = `${randomX}px`;
            image.style.top = `${randomY}px`;
            image.style.animation = 'rock 1s infinite alternate ease-in-out, fade 5s ease';

            // Append image to body
            document.body.appendChild(image);
            
            // Show the image
            image.style.display = 'block';
            SummonSound.play()
            // Set up a timeout to hide the image after 5 seconds
            const imageTimeout = setTimeout(() => {
                if (document.body.contains(image)) { // Check if image is still in the DOM
                    image.style.display = 'none';
                    document.body.removeChild(image); // Remove the image from DOM after it disappears
                }
            }, 5000);
            
            // Set up the click event to log "Hi" and remove the image
            image.addEventListener('click', () => {
                LemonCatch.play()
                console.log('Hi');
                lemonClicks += lemonClicks / 2;
                if (document.body.contains(image)) { // Check if image is still in the DOM
                    image.style.display = 'none';
                    document.body.removeChild(image); // Remove image immediately after click
                }
                clearTimeout(imageTimeout); // Clear timeout to prevent it from running after click
            });
        }
    }
}

// Show the image every 1 minute (60000 milliseconds)
setInterval(showImage, 60000);


// Function to handle click on the image
function handleClick() {
    console.log('Hi');
    document.getElementById('myImage').style.display = 'none'; // Hide image immediately on click
}

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
    easteregg = localStorage.getItem('easteregg') === 'false';
}

function autoGenerateLemons() {
    // Add lemons for each lemon tree (1 per second)
    lemonClicks += (((lemonTrees * 8)) * (lemonades /*aha*/) / 100);
    // Add lemons for each farmer (10 per second)
    lemonClicks += ((((farmers * 20)*((lemonTrees/10)+1))) * (lemonades /*aha*/) / 100);

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
    saveGameData();
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

        // Button 3 (lemonade)
        if (lemonClicks < lemonadeprice) {
            shopButtons[2].style.backgroundColor = '#8B0000'; // Dark red if not enough lemons
            shopButtons[2].style.pointerEvents = 'none'; // Disable hover effect and click
        }
        if (farmers < lemonadefarmerprice) {
            shopButtons[2].style.backgroundColor = '#8B0000'; // Dark red if not enough lemons
            shopButtons[2].style.pointerEvents = 'none'; // Disable hover effect and click
        } else {
            shopButtons[2].style.backgroundColor = ''; // Reset to default color
            shopButtons[2].style.pointerEvents = 'auto'; // Enable hover and click
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
        const speed = Math.random() * 28 + 36;

        const rect = img.getBoundingClientRect();
        const startX = rect.left + window.scrollX + rect.width / 2;
        const startY = ((rect.top + window.scrollY) * 1.4)+240;

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

function updateStatusBoxContainer() {
    let statusBoxContainer = document.querySelector('.status-box-container');
    if (!statusBoxContainer) {
        statusBoxContainer = document.createElement('div');
        statusBoxContainer.classList.add('status-box-container');

        const hero = document.querySelector('.hero');
        if (hero) {
            hero.appendChild(statusBoxContainer);
            console.log('Status box container added to hero');
        } else {
            console.error("Hero section not found, unable to add status box container.");
        }
    }
    return statusBoxContainer;
}

function updateFarmerBox() {
    const statusBoxContainer = updateStatusBoxContainer();

    let farmerBox = document.getElementById('farmerBox');
    if (!farmerBox) {
        farmerBox = document.createElement('div');
        farmerBox.id = 'farmerBox';
        farmerBox.classList.add('status-box');
        statusBoxContainer.appendChild(farmerBox);
    }

    // Clear existing content
    farmerBox.innerHTML = '';

    // Create an image for the farmer box
    const farmerImage = document.createElement('img');
    farmerImage.src = 'Images/lessgo.png'; // Replace with the actual farmer image path
    farmerImage.alt = 'Farmer';                 // Optional alt text for the image
    farmerImage.style.width = '40px';           // Set the desired width
    farmerImage.style.height = '40px';          // Set the desired height
    farmerImage.style.marginRight = '10px';     // Optional spacing between the image and the text

    // Create a text node for the number of farmers
    const farmerCountText = document.createTextNode(`x ${farmers}`);

    // Append both the image and text to the farmerBox
    farmerBox.appendChild(farmerImage);
    farmerBox.appendChild(farmerCountText);
}

function updateTreeBox() {
    let treeBox = document.getElementById('treeBox');
    
    // Only create treeBox if it doesn't already exist
    if (!treeBox) {
        treeBox = document.createElement('div');
        treeBox.id = 'treeBox';
        treeBox.style.border = '2px solid #333';
        treeBox.style.padding = '10px';
        treeBox.style.backgroundColor = '#f0f0f0';
        
        const statusBoxContainer = document.querySelector('.status-box-container'); // Select the container
        if (statusBoxContainer) {
            statusBoxContainer.appendChild(treeBox); // Append treeBox to statusBoxContainer
            console.log('Tree box created and added to the status-box-container');
        } else {
            console.error("Status box container not found, unable to add tree box.");
        }
    }

    // Clear any existing content in treeBox
    treeBox.innerHTML = '';

    // Create an image element for the tree
    const treeImage = document.createElement('img');
    treeImage.src = 'Images/lessgooo.png';  // Replace with the actual image path
    treeImage.alt = 'Lemon Tree';            // Optional alt text for the image
    treeImage.style.width = '40px';          // Set the desired width
    treeImage.style.height = '40px';         // Set the desired height
    treeImage.style.marginRight = '10px';    // Optional spacing between the image and the text

    // Create a text node for the number of trees
    const treeCountText = document.createTextNode(`x ${lemonTrees}`);

    // Append both the image and text to the treeBox
    treeBox.appendChild(treeImage);
    treeBox.appendChild(treeCountText);
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
    // Function to update or add the farmer box

    // Modify shopButton1 event listener to call updateFarmerBox when a farmer is added
    shopButton1.addEventListener('click', () => {
        saveGameData();
        const price = getFarmerPrice();
        if (lemonClicks >= price) {
            lemonClicks -= price;
            farmers += 1;
            Successsound.play();
            clickCountDisplay.textContent = lemonClicks.toFixed(1);
            updateButtonPrices(); // Update after purchase
            shopButton1.style.backgroundColor = ''; // Reset color
            farmerCounter.textContent = `Lemons generated per second: ${Math.floor((((farmers * 20) * ((lemonTrees / 10) + 1)) * lemonades))}`;

            // Update or create farmer box
            updateFarmerBox();
        } else {
            console.log('Not enough lemons for farmer!');
            Errorsound.play();
            shopButton1.style.backgroundColor = 'red'; // Turn button red
        }
    });


    // Button 2: Purchase lemon tree
    shopButton2.addEventListener('click', () => {
        saveGameData();
        const price = getLemonTreePrice();
        if (lemonClicks >= price) {
            lemonClicks -= price;
            lemonTrees += 1;
            Successsound.play();
            clickCountDisplay.textContent = lemonClicks.toFixed(1);
            updateButtonPrices(); // Update after purchase
            shopButton2.style.backgroundColor = ''; // Reset color
            lemonTreeCounter.textContent = `Lemons generated per second: ${Math.floor(((lemonTrees * 8) * lemonades))}`;
            farmerCounter.textContent = `Lemons generated per second: ${Math.floor((((farmers * 20) * ((lemonTrees / 10) + 1)) * lemonades))}`;

            updateTreeBox();
        } else {
            console.log('Not enough lemons for lemon tree!');
            Errorsound.play();
            shopButton2.style.backgroundColor = 'red'; // Turn button red
        }
    });



    //lemonade
    const makeLemonadeButtonContainer = document.createElement('div');
    makeLemonadeButtonContainer.classList.add('shop-button-container');

    const makeLemonadeButton = document.createElement('button');
    makeLemonadeButton.classList.add('shop');
    makeLemonadeButton.textContent = 'Make Lemonade (Cost: 60,000 lemons, 60 farmers)';

    makeLemonadeButtonContainer.appendChild(makeLemonadeButton);
    shopButtonsContainer.appendChild(makeLemonadeButtonContainer);

    makeLemonadeButton.addEventListener('click', () => {
        if (lemonClicks >= 60000 && farmers >= 60) {
            lemonClicks -= 60000;
            farmers -= 60;
            Successsound.play();
            clickCountDisplay.textContent = lemonClicks.toFixed(1);
            farmerCounter.textContent = `Farmers: ${farmers}`;
            alert('You made lemonade!');
            lemonades ++;
            updateButtonPrices();
        } else {
            console.log('Not enough resources to make lemonade!');
            Errorsound.play();
            makeLemonadeButton.style.backgroundColor = 'red'; // Turn button red
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
    updateButtonColors();
}

