    const addToCartButton = document.querySelector('.add-to-cart');
    const buyNowButton = document.querySelector('.buy-now');
    const inputFields = document.querySelector('.input-fields');
    let hideTimer;

    // Function to show input fields with animation
    function showInputFields() {
        inputFields.style.display = 'block'; // Make the container visible
        inputFields.classList.add('visible'); // Trigger the animation class

        // Clear the previous timer (if any)
        clearTimeout(hideTimer);

        // Set a new timer to hide the input fields after 5 seconds
        hideTimer = setTimeout(() => {
            inputFields.classList.remove('visible'); // Remove the animation class
            setTimeout(() => {
                inputFields.style.display = 'none'; // Hide the container after the animation
            }, 500); // Wait for the animation to finish
        }, 5000);
    }

    // Event listeners for buttons
    addToCartButton.addEventListener('click', showInputFields);
    buyNowButton.addEventListener('click', showInputFields);

    // Reset timer when user interacts with the input fields (focus event)
    document.querySelectorAll('.input-fields input').forEach(input => {
        input.addEventListener('focus', () => {
            clearTimeout(hideTimer); // Reset hide timer on focus
        });
    });


    

    document.querySelector(".review-form button").addEventListener("click", function() {
        let reviewText = document.querySelector(".review-form input").value;
        if (reviewText) {
            let newReview = document.createElement("p");
            newReview.innerHTML = `<strong>You:</strong> ${reviewText}`;
            document.querySelector(".reviews .review").appendChild(newReview);
        }
    });
    


    const products = [
        { image: "images/uno.png", name: "Arduino Uno R3", price: "₹ 800.00", link: "UNO.html" },
        { image: "images/NODEMCU.png", name: "NodeMCU", price: "₹ 499.00", link: "ESP.html" },
        { image: "images/raspberry-pi-5.png", name: "Raspberry Pi 5 8GB Model B – Original", price: "₹ 6499.00", link: "pi5.html" },
        { image: "images/raspberry-pi_4-.png", name: "Raspberry-pi 4 4GB Model B", price: "₹ 5499.00", link: "pi4.html" },
        
    ];
    
    const productContainer = document.querySelector('.product-container');
    products.forEach(product => {
        const productHTML = `
            <div class="product">
                <img src="${product.image}" width="150" height="150">
                <a href="${product.link}">
                    <figcaption>${product.name}</figcaption>
                    <p><b>Now ${product.price}</b></p>
                </a>
            </div>`;
        productContainer.innerHTML += productHTML;
    });
    






    
    
    