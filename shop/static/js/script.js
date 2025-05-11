// Shopping cart
let cart = [];

// DOM elements
const productsGrid = document.getElementById('products-grid');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const emptyCartMessage = document.getElementById('empty-cart-message');
const cartSummary = document.getElementById('cart-summary');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const quickViewModal = document.getElementById('quick-view-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDescription = document.getElementById('modal-description');
const modalDetails = document.getElementById('modal-details');
const addToCartModalBtn = document.getElementById('add-to-cart-modal');
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckoutBtn = document.getElementById('close-checkout');
const checkoutForm = document.getElementById('checkout-form');
const checkoutSubtotal = document.getElementById('checkout-subtotal');
const checkoutTotal = document.getElementById('checkout-total');
const successModal = document.getElementById('success-modal');
const closeSuccessBtn = document.getElementById('close-success');
const categoryFilter = document.getElementById('category-filter');
const searchInput = document.getElementById('search');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Current product for quick view
let currentProduct = null;

// Initialize the app
function init() {
    renderProducts(products);
    setupEventListeners();
    updateCartCount();
}

// Render products to the grid
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white rounded-lg overflow-hidden shadow-md relative';
        productCard.innerHTML = `
            <div class="relative">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                <button class="quick-view-btn absolute bottom-2 right-2 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm" data-id="${product.id}">
                    <i class="fas fa-eye mr-1"></i> Quick View
                </button>
            </div>
            <div class="p-4">
                <h3 class="font-bold text-lg mb-1">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-2 line-clamp-2">${product.description}</p>
                <div class="flex justify-between items-center">
                    <span class="font-bold text-indigo-600">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart bg-indigo-600 text-white px-3 py-1 rounded-full text-sm" data-id="${product.id}">
                        <i class="fas fa-cart-plus mr-1"></i> Add
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Cart toggle
    cartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
    
    // Quick view modal
    document.addEventListener('click', function(e) {
        if (e.target.closest('.quick-view-btn')) {
            const productId = parseInt(e.target.closest('.quick-view-btn').getAttribute('data-id'));
            openQuickView(productId);
        }
        
        if (e.target.closest('.add-to-cart')) {
            const productId = parseInt(e.target.closest('.add-to-cart').getAttribute('data-id'));
            addToCart(productId);
        }
    });
    
    // Close modal
    closeModalBtn.addEventListener('click', closeQuickView);
    
    // Add to cart from modal
    addToCartModalBtn.addEventListener('click', function() {
        if (currentProduct) {
            addToCart(currentProduct.id);
            closeQuickView();
        }
    });
    
    // Checkout
    checkoutBtn.addEventListener('click', openCheckout);
    closeCheckoutBtn.addEventListener('click', closeCheckout);
    
    // Checkout form submission
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        closeCheckout();
        toggleCart();
        showSuccessModal();
        cart = [];
        updateCart();
    });
    
    // Close success modal
    closeSuccessBtn.addEventListener('click', function() {
        successModal.classList.add('hidden');
    });
    
    // Filter products
    categoryFilter.addEventListener('change', filterProducts);
    searchInput.addEventListener('input', filterProducts);
    
    // Mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
}

// Filter products by category and search
function filterProducts() {
    const category = categoryFilter.value;
    const searchTerm = searchInput.value.toLowerCase();
    
    let filteredProducts = products;
    
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    renderProducts(filteredProducts);
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('translate-x-full');
    cartOverlay.classList.toggle('hidden');
}

// Open quick view modal
function openQuickView(productId) {
    currentProduct = products.find(p => p.id === productId);
    
    if (currentProduct) {
        modalImage.src = currentProduct.image;
        modalTitle.textContent = currentProduct.name;
        modalPrice.textContent = `$${currentProduct.price.toFixed(2)}`;
        modalDescription.textContent = currentProduct.description;
        
        // Render product details
        modalDetails.innerHTML = '';
        for (const [key, value] of Object.entries(currentProduct.details)) {
            const detailItem = document.createElement('div');
            detailItem.className = 'mb-2';
            detailItem.innerHTML = `
                <span class="font-medium">${key}:</span> ${value}
            `;
            modalDetails.appendChild(detailItem);
        }
        
        quickViewModal.classList.remove('hidden');
    }
}

// Close quick view modal
function closeQuickView() {
    quickViewModal.classList.add('hidden');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        updateCart();
        showCartNotification(product.name);
    }
}

// Update cart UI
function updateCart() {
    // Update cart items
    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
        cartSummary.classList.add('hidden');
        cartItemsContainer.innerHTML = '';
    } else {
        emptyCartMessage.classList.add('hidden');
        cartSummary.classList.remove('hidden');
        
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;
        
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'flex items-center py-4 border-b border-gray-200';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                <div class="ml-4 flex-grow">
                    <h4 class="font-medium">${item.name}</h4>
                    <p class="text-indigo-600">$${item.price.toFixed(2)}</p>
                    <div class="flex items-center mt-1">
                        <button class="quantity-btn border rounded w-6 h-6 flex items-center justify-center" data-id="${item.id}" data-action="decrease">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="quantity-btn border rounded w-6 h-6 flex items-center justify-center" data-id="${item.id}" data-action="increase">+</button>
                    </div>
                </div>
                <button class="remove-btn text-red-500 ml-4" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Update totals
        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        cartTotal.textContent = `$${subtotal.toFixed(2)}`;
        checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        checkoutTotal.textContent = `$${subtotal.toFixed(2)}`;
    }
    
    // Update cart count
    updateCartCount();
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const action = this.getAttribute('data-action');
            updateCartItemQuantity(productId, action);
        });
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Update cart item quantity
function updateCartItemQuantity(productId, action) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (action === 'increase') {
            item.quantity += 1;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity -= 1;
        }
        
        updateCart();
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update cart count in header
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Show notification when item is added to cart
function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg flex items-center';
    notification.innerHTML = `
        <i class="fas fa-check-circle mr-2"></i>
        <span>${productName} added to cart</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Open checkout modal
function openCheckout() {
    if (cart.length > 0) {
        checkoutModal.classList.remove('hidden');
        toggleCart();
    }
}

// Close checkout modal
function closeCheckout() {
    checkoutModal.classList.add('hidden');
}

// Show success modal
function showSuccessModal() {
    successModal.classList.remove('hidden');
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);