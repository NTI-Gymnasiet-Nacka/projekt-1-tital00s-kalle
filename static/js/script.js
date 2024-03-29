function redirectToCheckout() {
    window.location.href = '/checkout'; 
}

function redirectToProducts(categoryName) {
    window.location.href = '/products?category=' + categoryName;
}


function addToCart(itemName, itemId, itemPrice) {
// This function adds an item to the cart
// If the item already exists in the cart, its quantity is increased by 1. 
// If not, a new entry is added to the cart with the provided item details.
 
    console.log(`Adding to cart: ${itemName}, ID: ${itemId}, Price: ${itemPrice}`);
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let found = cart.find(item => item.id === itemId);
    
    if (found) {
        found.quantity += 1; 
    } 
    
    else {
        cart.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1 });
    }
    sessionStorage.setItem('cart', JSON.stringify(cart)); 
    alert(`${itemName} added to cart`);
}

function updateSliderValue() {
    var minSlider = document.getElementById("minRange");
    var maxSlider = document.getElementById("maxRange");

    // Update display values    
    document.getElementById("minValueDisplay").innerHTML = minSlider.value;
    document.getElementById("maxValueDisplay").innerHTML = maxSlider.value;

    // Send AJAX request with both values
    $.ajax({
        url: "/slider", // Ensure this URL matches your Flask route for handling slider values
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({minValue: minSlider.value, maxValue: maxSlider.value}),
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.log(error);
        }
    });
}      

document.addEventListener('DOMContentLoaded', function() {
    var sortPriceBtn = document.getElementById('sortPriceBtn');
    if (sortPriceBtn) {
        sortPriceBtn.addEventListener('click', function() {
            const urlParams = new URLSearchParams(window.location.search);
            const category = urlParams.get('category');
            if (category) {
                window.location.href = '/products?category=' + category + '&sort=price';
            } else {
                window.location.href = '/products?sort=price'; 
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cart-items-container');
    let totalPrice = 0; 

    if (cart.length > 0) {
        cart.forEach(item => {
            let itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            cartContainer.appendChild(itemElement);

            // Calculate total price
            totalPrice += item.price * item.quantity;
        });

        // Create and display total price element
        let totalPriceElement = document.createElement('p');
        totalPriceElement.className = 'total-price';
        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`; // Format to 2 decimal places
        document.querySelector('.cart-items').appendChild(totalPriceElement);
    } else {
        cartContainer.textContent = 'Your cart is empty.';
    }
});
