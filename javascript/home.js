const searchInput = document.getElementById("search");
const productGrid = document.querySelector(".product-grid");
const slider1 = document.querySelector(".slider");
const productCards = productGrid.querySelectorAll(".product-card");
const clearSearchButton = document.getElementById("clear-search");
const slider = document.querySelector('.slider .list');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const dots = document.querySelectorAll('.dots li');

// Listen for input in the search bar
searchInput.addEventListener("input", (event) => {
    const query = event.target.value.trim().toLowerCase();
    let hasResults = false;

    // Loop through all products and show/hide based on the query
    productCards.forEach(card => {
        const productName = card.getAttribute("data-name").toLowerCase();
        if (productName.includes(query)) {
            card.style.display = "block"; // Show matching product
            hasResults = true; // At least one product matches
        } else {
            card.style.display = "none"; // Hide non-matching product
        }
    });

    // Hide slider if no matching products or query is empty
    slider1.style.display = hasResults ? "none" : "block"; // Hide if no results, show otherwise
});

// Clear search functionality
// Clear search functionality
clearSearchButton.addEventListener("click", () => {
    searchInput.value = ""; // Clear the input field
    productCards.forEach(card => (card.style.display = "block")); // Show all products
    slider1.style.display = "block"; // Show the slider again
    clearSearchButton.style.display = "none"; // Hide the clear button
    searchInput.focus(); // Bring focus back to the search input
});

// Ensure the clear button visibility is handled dynamically
searchInput.addEventListener("input", () => {
    clearSearchButton.style.display = searchInput.value.trim() ? "inline" : "none"; // Show if input is not empty
});



// Initial setup for clear button visibility
clearSearchButton.style.display = searchInput.value.trim() ? "inline" : "none";



// Track the current slide
let currentIndex = 0;

// Function to update the slider position
function updateSlider() {
    const totalSlides = slider.children.length;
    const slideWidth = slider.children[0].offsetWidth;
    const offset = -(currentIndex * slideWidth);
    
    // Move the slider to the new position
    slider.style.transform = `translateX(${offset}px)`;

    // Update the dots to reflect the current slide
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Function for previous slide
prevButton.addEventListener('click', () => {
    const totalSlides = slider.children.length;
    currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
    updateSlider();
});

// Function for next slide
nextButton.addEventListener('click', () => {
    const totalSlides = slider.children.length;
    currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
    updateSlider();
});

// Function for dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
    });
});

// Initial setup to show the first slide
updateSlider();

// Optional: Auto slide after every 3 seconds
setInterval(() => {
    nextButton.click();
}, 3000); // Change slide every 3 seconds




// Global variables
let cart = [];
const cartCount = document.getElementById('cart-count');
const cartMenu = document.getElementById('cart-menu');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const cartIcon = document.querySelector('.sticky-cart-icon');
const overlay = document.getElementById('overlay');

// Function to update cart count and total price
function updateCart() {
    // Update the cart count
    cartCount.textContent = cart.length;

    // Update the cart items list
    cartItems.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('li');
        
        // Create the cart item structure with quantity and price
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>₹${item.price}</span>
            <span>
                <button class="decrease" data-index="${index}">-</button>
                ${item.quantity}
                <button class="increase" data-index="${index}">+</button>
            </span>
            <span>₹${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove" data-index="${index}">Remove</button>
        `;
        
        cartItems.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    // Update the total price
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Function to handle "Add to Cart" click
function addToCart(event) {
    const productCard = event.target.closest('.product-card');
    const productName = productCard.querySelector('figcaption').textContent;
    const productPrice = parseFloat(productCard.querySelector('.discount-price').textContent.replace('₹', '').trim());

    // Check if product is already in the cart
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        // If product exists, increase the quantity
        existingProduct.quantity++;
    } else {
        // Otherwise, add the product with quantity 1
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    // Update the cart UI
    updateCart();
}

// Function to increase product quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

// Function to decrease product quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        updateCart();
    }
}

// Function to remove product from cart
function removeProduct(index) {
    cart.splice(index, 1);
    updateCart();
}

// Function to view cart (show cart menu)
function viewCart() {
    cartMenu.style.display = 'block';
    overlay.style.display = 'block';
}

// Function to close the cart menu
function closeCart() {
    cartMenu.style.display = 'none';
    overlay.style.display = 'none';
}

// Event listeners for add to cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// Event listeners for cart item quantity adjustments and removal
cartItems.addEventListener('click', function(event) {
    const target = event.target;

    if (target.classList.contains('increase')) {
        const index = target.getAttribute('data-index');
        increaseQuantity(index);
    } else if (target.classList.contains('decrease')) {
        const index = target.getAttribute('data-index');
        decreaseQuantity(index);
    } else if (target.classList.contains('remove')) {
        const index = target.getAttribute('data-index');
        removeProduct(index);
    }
});

// Event listeners for view and close cart
document.getElementById('checkout').addEventListener('click', function () {
    alert('Proceeding to checkout...');
    // Additional checkout logic can be added here
});

document.getElementById('close-cart').addEventListener('click', closeCart);

// Overlay click to close cart
overlay.addEventListener('click', closeCart);

// Optional: Make the cart icon always visible
cartIcon.addEventListener('click', viewCart);



// Function to add the product to the cart
function addToCart(event) {
    const productCard = event.target.closest('.product-card');
    const productName = productCard.querySelector('figcaption').textContent;
    let productPriceText = productCard.querySelector('.discount-price').textContent.trim();
    
    // Remove non-numeric characters like '₹' and spaces
    const productPrice = parseFloat(productPriceText.replace(/[^\d.-]/g, ''));

    if (isNaN(productPrice)) {
        console.error("Invalid price format for product: " + productName);
        return; // Exit if price is not valid
    }

    // Check if product is already in the cart
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        // If product exists, increase the quantity
        existingProduct.quantity++;
    } else {
        // Otherwise, add the product with quantity 1
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    // Update the cart UI
    updateCart();
}

// Function to update the cart UI
function updateCart() {
    // Update the cart count
    cartCount.textContent = cart.length;

    // Update the cart items list
    cartItems.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('li');
        
        // Calculate the total price for each item (price * quantity)
        const itemTotal = (item.price * item.quantity).toFixed(2);
    
        cartItem.innerHTML = `
            <span class="product-name">${item.name}</span> 
            <span class="product-price">₹${item.price}</span> 
            <span class="quantity">
                <button class="decrease" data-index="${index}">-</button>
                ${item.quantity}
                <button class="increase" data-index="${index}">+</button>
            </span>
            <span class="item-total">₹${itemTotal}</span>
            <button class="remove" data-index="${index}">
                <i class="fas fa-trash"></i> 
            </button>
        `;
        
        cartItems.appendChild(cartItem);
    
        // Add this item’s total price to the overall total
        totalPrice += item.price * item.quantity;
    });
    
    // Update the total price after iterating over all cart items
    document.getElementById("total-price").textContent = `Total Price: ₹${totalPrice.toFixed(2)}`;
    

    // Update the total price
    totalPriceElement.textContent = totalPrice.toFixed(2);
}



