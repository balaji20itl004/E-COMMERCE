document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const cardHolder = document.getElementById('card-holder').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiryDate = document.getElementById('expiry-date').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    const billingAddress = document.getElementById('billing-address').value.trim();
    const country = document.getElementById('country').value;

    if (!cardHolder || !cardNumber || !expiryDate || !cvv || !billingAddress || !country) {
        alert('Please fill in all required fields.');
        return;
    }

    if (!/^[0-9]{16}$/.test(cardNumber)) {
        alert('Invalid card number. Please enter a 16-digit number.');
        return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        alert('Invalid expiry date. Please use the MM/YY format.');
        return;
    }

    if (!/^[0-9]{3}$/.test(cvv)) {
        alert('Invalid CVV. Please enter a 3-digit number.');
        return;
    }

    alert('Payment processed successfully!');
});