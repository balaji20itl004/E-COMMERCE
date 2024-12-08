function updateProfilePicture(event) {
    const file = event.target.files[0];
    const profileImg = document.getElementById('profile-img');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}



let paymentList = [];

// Function to display saved payment methods
function displayPayments() {
const paymentContainer = document.getElementById('payment-list');
paymentContainer.innerHTML = ''; // Clear existing content

if (paymentList.length === 0) {
paymentContainer.innerHTML = '<li>No saved payment methods.</li>';
return;
}

paymentList.forEach((payment, index) => {
const li = document.createElement('li');
li.classList.add('payment-item');
li.innerHTML = `
    <p><strong>${payment.type} **** ${payment.last4}</strong></p>
    <p>Expires: ${payment.expiry}</p>
    <button class="edit-btn" onclick="editPayment(${index})">Edit</button>
    <button class="remove-btn" onclick="removePayment(${index})">Remove</button>
`;
paymentContainer.appendChild(li);
});
}

// Function to add a new payment method
document.getElementById('payment-form').addEventListener('submit', function (event) {
event.preventDefault();

const cardNumber = document.getElementById('card-number').value;
const expiryDate = document.getElementById('expiry-date').value;
const cardHolderName = document.getElementById('card-holder-name').value;

const newPayment = {
type: 'Card', // Assuming card type, can be extended for other types
last4: cardNumber.slice(-4),
expiry: expiryDate,
holderName: cardHolderName,
};

paymentList.push(newPayment);
displayPayments();
this.reset(); // Clear the form after submission
});

// Function to remove a payment method by index
function removePayment(index) {
if (confirm('Are you sure you want to remove this payment method?')) {
paymentList.splice(index, 1);
displayPayments();
}
}

// Function to edit a payment method by index
function editPayment(index) {
const payment = paymentList[index];
document.getElementById('card-number').value = `**** **** **** ${payment.last4}`;
document.getElementById('expiry-date').value = payment.expiry;
document.getElementById('card-holder-name').value = payment.holderName;

// Remove the existing payment to replace it with the updated one
removePayment(index);
}

// Initialize the display when the page loads
document.addEventListener('DOMContentLoaded', displayPayments);
