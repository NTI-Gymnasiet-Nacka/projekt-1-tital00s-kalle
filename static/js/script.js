function redirectToCheckout() {
    window.location.href = '/checkout'; 
}

function redirectToProducts(categoryName) {
    window.location.href = '/products?category=' + categoryName;
}

function addToCart(itemName, itemId, itemPrice) {
    console.log(`Adding to cart: ${itemName}, ID: ${itemId}, Price: ${itemPrice}`);
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let found = cart.find(item => item.id === itemId);
    if (found) {
        found.quantity += 1; 
    } else {
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