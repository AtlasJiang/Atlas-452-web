// Atlas

// Object containing the prices of each course
const coursePrices = {
    "Certificate III in Business Administration and Management (BSB30415)": 15,
    "Diploma of Information Technology (IT) Support (ICT50118)": 20,
    "Advanced Diploma of Project Management (BSB60820)": 25,
    "Certificate IV in Hospitality Management (SIT40416)": 30,
    "Diploma of Graphic Design and Digital Media (CUA50720)": 35
};

let cart = {
    "Certificate III in Business Administration and Management (BSB30415)": 0,
    "Diploma of Information Technology (IT) Support (ICT50118)": 0,
    "Advanced Diploma of Project Management (BSB60820)": 0,
    "Certificate IV in Hospitality Management (SIT40416)": 0,
    "Diploma of Graphic Design and Digital Media (CUA50720)": 0
};

document.addEventListener('DOMContentLoaded', function() {
    // Check login status when the page loads, but only for shop.html
    if (window.location.pathname.includes('shop.html')) {
        checkLoginStatus();
    }

    // Event listeners for each course's add and remove buttons
    const courses = document.querySelectorAll('.course');
    courses.forEach(course => {
        const courseId = course.querySelector('h2').textContent; // Get the full course name
        const addButton = course.querySelector('button.add-course');
        const removeButton = course.querySelector('button.remove-course');

        addButton.addEventListener('click', () => {
            const quantityInput = course.querySelector('input[type="text"]');
            const quantity = parseInt(quantityInput.value.trim());
            if (quantity > 0) {
                cart[courseId] += quantity;
                updateCartItems();
                updateTotalPrice();
            } else {
                alert("Please enter a valid quantity.");
            }
        });

        removeButton.addEventListener('click', () => {
            cart[courseId] = 0;
            const quantityInput = course.querySelector('input[type="text"]');
            quantityInput.value = '';
            updateCartItems();
            updateTotalPrice();
        });
    });

    const clearCartButton = document.querySelector('.clear-cart');
    clearCartButton.addEventListener('click', () => {
        Object.keys(cart).forEach(course => cart[course] = 0);
        document.querySelectorAll('.course input[type="text"]').forEach(input => input.value = '');
        updateCartItems();
        updateTotalPrice();
    });

    const checkoutButton = document.querySelector('.checkout');
    checkoutButton.addEventListener('click', () => {
        let totalPrice = 0;
        let message = "You should pay Atlas for:\n";
        Object.keys(cart).forEach(course => {
            if (cart[course] > 0) {
                const coursePrice = coursePrices[course];
                const itemTotal = cart[course] * coursePrice;
                totalPrice += itemTotal;
                message += `${course}: ${cart[course]} x $${coursePrice} = $${itemTotal}\n`;
            }
        });
        message += `Total: $${totalPrice}`;
        alert(message); // Display total price with details
    });

    // Initial rendering of the cart items
    updateCartItems();
    updateTotalPrice();
});

function checkLoginStatus() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        console.log("User is not logged in. Redirecting to login page...");
        window.location.href = 'login.html';
    } else {
        console.log("User is logged in. Access granted.");
    }
}

// Function to render the cart items
function updateCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Clear the container
    let hasItems = false;
    Object.keys(cart).forEach(course => {
        if (cart[course] > 0) {
            hasItems = true;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `<strong>${course}</strong>: ${cart[course]} x $${coursePrices[course]} = $${cart[course] * coursePrices[course]}`;
            cartItemsContainer.appendChild(itemDiv);
        }
    });
    if (!hasItems) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    }
}

// Function to update the total price based on the items in the cart
function updateTotalPrice() {
    let totalPrice = 0;
    Object.keys(cart).forEach(course => totalPrice += cart[course] * coursePrices[course]);
    const totalPriceElement = document.querySelector('.total-price-section h2');
    totalPriceElement.textContent = `Total Price for All Courses: $${totalPrice}`;
}

// Logout functionality
document.getElementById('logoutButton')?.addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn'); // Remove isLoggedIn from localStorage
    window.location.href = 'login.html';
});