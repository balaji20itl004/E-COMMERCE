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
    


