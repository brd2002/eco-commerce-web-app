// Sample product data
const products = [
    {
        id: 1,
        name: "Smartphone",
        price: 699.99,
        image: "images/smartphone.png",
        description: "Latest model smartphone with advanced features"
    },
    {
        id: 2,
        name: "Laptop",
        price: 999.99,
        image: "images/laptop.jpg",
        description: "Powerful laptop for work and gaming"
    },
    {
        id: 3,
        name: "Headphones",
        price: 199.99,
        image: "images/headphones.jpg",
        description: "Wireless noise-canceling headphones"
    },
    // Add more products as needed
];

// Shopping cart
let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');

// Display products
function displayProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price}</p>
                <p>${product.description}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
        showCartModal();
    }
}

// Update cart
function updateCart() {
    cartCount.textContent = cart.length;
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" width="50">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
            </div>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total.toFixed(2);
}

// Remove from cart
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCart();
    }
}

// Toggle cart modal
document.querySelector('.cart-btn').addEventListener('click', () => {
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
});

// Close cart when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});
// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navButtons = document.querySelector('.nav-buttons');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navButtons.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && 
        !navLinks.contains(e.target) && 
        !navButtons.contains(e.target)) {
        navLinks.classList.remove('active');
        navButtons.classList.remove('active');
    }
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navButtons.classList.remove('active');
    });
});
 
// Initialize
displayProducts();