let cart = [];

const products = {
    java: {
        name: 'Minecraft Java Edition',
        price: 350000,
        description: `• Full Premium Java Edition Account
• Play on PC, Mac, and Linux
• Access to all Java Edition servers & mods
• Install unlimited mods & resource packs
• Change skins anytime without limits
• Join premium Java servers worldwide
• Regular updates & snapshots access
• Change email & password anytime`,
        features: ['Original Account', '100% Safe', '1 year Warranty', 'Instant Delivery (1-24 hours)']
    },
    bedrock: {
        name: 'Minecraft Bedrock Edition',
        price: 150000,
        description: `• Full Premium Bedrock Edition Account
• Play on Windows 10/11 devices
• Cross-platform play with friends
• Access to Minecraft Marketplace
• Exclusive Bedrock features & add-ons
• Play with mobile & console players
• Built-in achievements system
• Smoother performance optimization`,
        features: ['Original Account', '100% Safe', '1 year Warranty', 'Fast Delivery (1-12 hours)']
    },
    javaAndBedrock: {
        name: 'Minecraft Java & Bedrock Bundle',
        price: 450000,
        description: `• Get both Java & Bedrock Editions
• Play on any supported platform
• Best value bundle package
• Access all Minecraft features
• Full access to both versions
• Maximum gameplay flexibility
• Premium support priority
• Special bundle bonus content`,
        features: ['Original Account', '100% Safe', '1 year Warranty', 'Priority Delivery']
    },
    realm: {
        name: 'Minecraft Realm',
        price: 75000,
        description: `• 1 Month Realm Subscription
• Option to use your own account or our account
• Host your own Minecraft server
• Up to 10 players simultaneously
• Automatic backup system
• Always online world
• No technical setup required
• Cross-platform realm access
• 24/7 world availability
• Full realm management access`,
        features: ['Use Own/Our Account', 'Instant Activation', 'No Setup Needed', '24/7 Support']
    },
    pojav: {
        name: 'PojavLauncher Premium',
        price: 50000,
        description: `• Premium PojavLauncher Account
• Play Java Edition on Android
• Full access to all features
• Support all versions
• Optimized performance
• Custom controls support
• Resource packs compatible
• Mods installation support`,
        features: ['Premium Access', '100% Safe', '6 months Warranty', 'Fast Delivery']
    }
};

function addToCart(productId) {
    const product = products[productId];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: `assets/img/${getProductImage(productId)}`,
            quantity: 1
        });
    }
    
    updateCart();
    updateCartUI();
    
    Swal.fire({
        title: 'Added to Cart!',
        text: `${product.name} has been added to your cart`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#FF8C32',
        cancelButtonColor: '#242424',
        confirmButtonText: 'Continue Shopping',
        cancelButtonText: 'View Cart',
        background: '#1E1E1E',
        color: '#f4f4f4',
        iconColor: '#FF8C32',
        customClass: {
            popup: 'swal-custom',
            confirmButton: 'swal-confirm',
            cancelButton: 'swal-cancel'
        },
        showClass: {
            popup: 'animate__animated animate__fadeInUp animate__faster'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster'
        }
    }).then((result) => {
        if (!result.isConfirmed) {
            // Handle view cart action
            document.querySelector('a[href="#cart"]').click();
        }
    });
}

function getProductImage(productId) {
    switch(productId) {
        case 'java':
            return 'mc-java.webp';
        case 'bedrock':
            return 'mc-be.jpg';
        case 'realm':
            return 'mc-realm.avif';
        case 'javaAndBedrock':
            return 'mc-bundle.jpg';
        case 'pojav':
            return 'pojav.jpg';
        default:
            return '';
    }
}

function showProductDetails(productId) {
    const product = products[productId];
    Swal.fire({
        title: product.name,
        html: `
            <div class="product-detail">
                <p class="product-description">${product.description}</p>
                <div class="product-features">
                    ${product.features?.map(feature => `
                        <div class="feature-item">
                            <i class="fas fa-check"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('') || ''}
                </div>
                <p class="product-price">Rp ${product.price.toLocaleString()}</p>
            </div>
        `,
        background: '#1E1E1E',
        color: '#f4f4f4',
        confirmButtonColor: '#FF8C32',
        confirmButtonText: 'Buy Now',
        showCloseButton: true,
        closeButtonHtml: '<i class="fas fa-times"></i>',
        customClass: {
            popup: 'swal-detail',
            closeButton: 'swal-close-button'
        },
        showClass: {
            popup: 'animate__animated animate__fadeInUp animate__faster'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            addToCart(productId);
        }
    });
}

function updateCart() {
    const cartBadge = document.getElementById('nav-cart-badge');
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart badge
    if (totalQuantity > 0) {
        cartBadge.textContent = totalQuantity;
        cartBadge.style.display = 'flex';
    } else {
        cartBadge.style.display = 'none';
    }
    
    // Save cart to localStorage
    localStorage.setItem('mkshop_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmptyMessage = document.getElementById('cart-empty');
    const cartSummary = document.getElementById('cart-summary');
    
    // Clear current items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartEmptyMessage.style.display = 'flex';
        cartItemsContainer.style.display = 'none';
        cartSummary.style.display = 'none';
        return;
    }
    
    // Show cart items and hide empty message
    cartEmptyMessage.style.display = 'none';
    cartItemsContainer.style.display = 'flex';
    cartSummary.style.display = 'block';
    
    // Add cart items
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">Rp ${item.price.toLocaleString()}</div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="changeQuantity('${item.id}', -1)">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="changeQuantity('${item.id}', 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Update summary
    updateCartSummary();
}

function updateCartSummary() {
    const subtotalElement = document.getElementById('cart-subtotal');
    const discountElement = document.getElementById('cart-discount');
    const totalElement = document.getElementById('cart-total');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = 0; // No discount by default
    const total = subtotal - discount;
    
    subtotalElement.textContent = `Rp ${subtotal.toLocaleString()}`;
    discountElement.textContent = `Rp ${discount.toLocaleString()}`;
    totalElement.textContent = `Rp ${total.toLocaleString()}`;
}

function changeQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity += change;
        
        if (cartItem.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
            updateCartUI();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    updateCartUI();
}

function checkout() {
    if (cart.length === 0) {
        Swal.fire({
            title: 'Empty Cart',
            text: 'Your cart is empty. Please add some products first.',
            icon: 'warning',
            confirmButtonColor: '#FF8C32',
            background: '#1E1E1E',
            color: '#f4f4f4'
        });
        return;
    }
    
    // Get total amount
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    Swal.fire({
        title: 'Checkout',
        html: `
            <div class="checkout-form">
                <p>Total amount: <strong>Rp ${total.toLocaleString()}</strong></p>
                <p>Please fill in your details to complete your purchase:</p>
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" class="swal2-input" placeholder="Enter your full name">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" class="swal2-input" placeholder="Enter your email">
                </div>
                <div class="form-group">
                    <label for="whatsapp">WhatsApp</label>
                    <input type="text" id="whatsapp" class="swal2-input" placeholder="Enter your WhatsApp number">
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Place Order',
        confirmButtonColor: '#FF8C32',
        cancelButtonColor: '#242424',
        background: '#1E1E1E',
        color: '#f4f4f4',
        preConfirm: () => {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const whatsapp = document.getElementById('whatsapp').value;
            
            if (!name || !email || !whatsapp) {
                Swal.showValidationMessage('Please fill in all fields');
            }
            
            return { name, email, whatsapp };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const customerInfo = result.value;
            
            // Simulate order processing
            Swal.fire({
                title: 'Processing Order...',
                html: 'Please wait while we process your order.',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                },
                background: '#1E1E1E',
                color: '#f4f4f4'
            }).then(() => {
                // Save order to history
                saveOrderToHistory(customerInfo, cart, total);
                
                // Send order details to admin via WhatsApp
                sendOrderToAdmin(customerInfo, cart, total);
                
                // Clear cart and show success message
                cart = [];
                updateCart();
                updateCartUI();
                
                Swal.fire({
                    title: 'Order Placed Successfully!',
                    html: 'Your order has been sent to our admin.<br>WhatsApp will open automatically to continue the transaction.',
                    icon: 'success',
                    confirmButtonColor: '#FF8C32',
                    background: '#1E1E1E',
                    color: '#f4f4f4'
                });
            });
        }
    });
}

function saveOrderToHistory(customerInfo, cartItems, totalAmount) {
    // Create order object
    const order = {
        id: generateOrderId(),
        customer: customerInfo,
        items: JSON.parse(JSON.stringify(cartItems)), // Deep copy
        total: totalAmount,
        date: new Date().toISOString()
    };
    
    // Get existing orders from localStorage
    let orderHistory = [];
    try {
        const savedHistory = localStorage.getItem('mkshop_order_history');
        if (savedHistory) {
            orderHistory = JSON.parse(savedHistory);
        }
    } catch (error) {
        console.error('Error loading order history:', error);
    }
    
    // Add new order to history
    orderHistory.push(order);
    
    // Save updated history back to localStorage
    localStorage.setItem('mkshop_order_history', JSON.stringify(orderHistory));
    
    console.log('Order saved to history:', order);
}

function generateOrderId() {
    // Generate a unique order ID based on timestamp and random number
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
}

function sendOrderToAdmin(customerInfo, cartItems, totalAmount) {
    // Admin WhatsApp number - using the actual admin number from the site
    const adminNumber = "6285156547742"; // Format: country code (62) + nomor tanpa 0 di depan
    
    // Create order summary text
    let orderSummary = `*NEW ORDER RECEIVED*\n\n`;
    orderSummary += `*Customer Information*\n`;
    orderSummary += `Name: ${customerInfo.name}\n`;
    orderSummary += `Email: ${customerInfo.email}\n`;
    orderSummary += `WhatsApp: ${customerInfo.whatsapp}\n\n`;
    
    orderSummary += `*Order Details*\n`;
    cartItems.forEach((item, index) => {
        orderSummary += `${index+1}. ${item.name} - ${item.quantity}x Rp ${item.price.toLocaleString()} = Rp ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    orderSummary += `\n*Total Amount: Rp ${totalAmount.toLocaleString()}*\n\n`;
    orderSummary += `Order received on: ${new Date().toLocaleString('id-ID')}`;
    
    // Create WhatsApp link
    const whatsappLink = `https://wa.me/${adminNumber}?text=${encodeURIComponent(orderSummary)}`;
    
    // Open WhatsApp link for admin in new tab
    window.open(whatsappLink, '_blank');
    
    // Email notification feature (commented as it requires EmailJS to be set up)
    /*
    // Using EmailJS service (would require adding the EmailJS library)
    emailjs.send("service_id", "template_id", {
        to_email: "arydianprtma@gmail.com",
        subject: "New Order Received",
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_whatsapp: customerInfo.whatsapp,
        order_details: cartItems.map(item => `${item.name} - ${item.quantity}x Rp ${item.price.toLocaleString()}`).join("\n"),
        total_amount: `Rp ${totalAmount.toLocaleString()}`,
        order_date: new Date().toLocaleString('id-ID')
    }).then(
        function(response) {
            console.log("Email sent to admin", response);
        },
        function(error) {
            console.log("Failed to send email to admin", error);
        }
    );
    */
    
    // No need to show the additional option to contact admin anymore since
    // we're already opening WhatsApp automatically
}

const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

const menu = document.querySelector('nav ul');
const menuBtn = document.querySelector('.menu-btn');

function toggleMenu() {
    menu.classList.toggle('active');
    event.stopPropagation();
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (menu.classList.contains('active') && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
        menu.classList.remove('active');
    }
});

// Prevent menu close when clicking inside menu
menu.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Close menu on link click
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if it's open
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
            
            // Smooth scroll to the target element
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Reveal animation on scroll
const revealElements = document.querySelectorAll('.reveal-on-scroll');

function revealOnScroll() {
    for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            revealElements[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', revealOnScroll);

// Enhance product cards with hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.classList.add('card-hover');
    });
    
    card.addEventListener('mouseleave', function() {
        this.classList.remove('card-hover');
    });
});

// Add active class to current navigation link based on scroll position
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.remove('active');
            }
        });
    });
}

// Animasi pada tiap huruf di logo MKSHOPMC
function animateLetters() {
    const letters = document.querySelectorAll('.hero h1 span');
    
    letters.forEach((letter, index) => {
        // Tambahkan delay untuk tiap huruf
        letter.style.animationDelay = `${index * 0.1}s`;
        
        // Tambahkan class untuk animasi munculnya tiap huruf
        letter.classList.add('letter-animation');
        
        // Tambahkan event listener untuk efek hover
        letter.addEventListener('mouseover', function() {
            this.style.color = '#FF5733';
            this.style.transform = 'translateY(-15px) rotateY(20deg)';
            this.style.textShadow = '0 15px 25px rgba(0,0,0,0.6)';
            this.style.transition = 'all 0.3s ease';
        });
        
        letter.addEventListener('mouseout', function() {
            this.style.color = '';
            this.style.transform = '';
            this.style.textShadow = '';
        });
    });
    
    // Tambahkan random "glow" pada huruf secara acak
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * letters.length);
        const letter = letters[randomIndex];
        
        letter.classList.add('letter-glow');
        
        setTimeout(() => {
            letter.classList.remove('letter-glow');
        }, 800);
    }, 2000);
}

// Load cart from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedCart = localStorage.getItem('mkshop_cart');
    
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCart();
            updateCartUI();
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
        }
    }
    
    // Add event listener to checkout button
    document.getElementById('checkout-btn').addEventListener('click', checkout);
    
    // Other initializations
    highlightNavOnScroll();
    revealOnScroll();
    animateLetters();
    
    // Check for admin panel
    checkForAdminPanel();
});

function checkForAdminPanel() {
    // Check if URL has #admin hash
    if (window.location.hash === '#admin') {
        showAdminPanel();
    }
    
    // Listen for hash changes
    window.addEventListener('hashchange', function() {
        if (window.location.hash === '#admin') {
            showAdminPanel();
        } else {
            hideAdminPanel();
        }
    });
    
    // Close admin panel button
    const closeAdminBtn = document.getElementById('close-admin');
    if (closeAdminBtn) {
        closeAdminBtn.addEventListener('click', function() {
            hideAdminPanel();
            window.location.hash = ''; // Remove hash from URL
        });
    }
}

function showAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    adminPanel.classList.add('visible');
    loadOrderHistory();
}

function hideAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    adminPanel.classList.remove('visible');
}

function loadOrderHistory() {
    const ordersContainer = document.getElementById('orders-container');
    const noOrdersElement = ordersContainer.querySelector('.no-orders');
    
    // Get order history from localStorage
    let orderHistory = [];
    try {
        const savedHistory = localStorage.getItem('mkshop_order_history');
        if (savedHistory) {
            orderHistory = JSON.parse(savedHistory);
        }
    } catch (error) {
        console.error('Error loading order history:', error);
    }
    
    // Clear existing orders (except no-orders message)
    Array.from(ordersContainer.children).forEach(child => {
        if (!child.classList.contains('no-orders')) {
            ordersContainer.removeChild(child);
        }
    });
    
    // Show/hide no orders message
    if (orderHistory.length === 0) {
        noOrdersElement.style.display = 'block';
        return;
    } else {
        noOrdersElement.style.display = 'none';
    }
    
    // Sort orders by date, newest first
    orderHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Add order cards
    orderHistory.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        
        // Format date
        const orderDate = new Date(order.date);
        const formattedDate = orderDate.toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        orderCard.innerHTML = `
            <div class="order-header">
                <div class="order-id">${order.id}</div>
                <div class="order-date">${formattedDate}</div>
            </div>
            <div class="order-customer">
                <h4>Customer Information</h4>
                <div class="customer-info">
                    <div>
                        <span class="label">Name</span>
                        <span>${order.customer.name}</span>
                    </div>
                    <div>
                        <span class="label">Email</span>
                        <span>${order.customer.email}</span>
                    </div>
                    <div>
                        <span class="label">WhatsApp</span>
                        <span>${order.customer.whatsapp}</span>
                    </div>
                </div>
            </div>
            <div class="order-items">
                <h4>Order Items</h4>
                ${order.items.map(item => `
                    <div class="order-item">
                        <span>${item.name} × ${item.quantity}</span>
                        <span>Rp ${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">
                Total: Rp ${order.total.toLocaleString()}
            </div>
            <div class="order-actions">
                <button class="admin-btn secondary" onclick="contactCustomer('${order.customer.whatsapp}')">Contact Customer</button>
                <button class="admin-btn primary" onclick="markOrderAsCompleted('${order.id}')">Mark as Completed</button>
            </div>
        `;
        
        ordersContainer.appendChild(orderCard);
    });
}

function contactCustomer(whatsapp) {
    // Clean up the number format
    const cleanNumber = whatsapp.replace(/\D/g, '');
    const formattedNumber = cleanNumber.startsWith('0') ? '62' + cleanNumber.substring(1) : cleanNumber;
    
    // Create WhatsApp link
    const whatsappLink = `https://wa.me/${formattedNumber}`;
    
    // Open in new tab
    window.open(whatsappLink, '_blank');
}

function markOrderAsCompleted(orderId) {
    // Get order history
    let orderHistory = [];
    try {
        const savedHistory = localStorage.getItem('mkshop_order_history');
        if (savedHistory) {
            orderHistory = JSON.parse(savedHistory);
        }
    } catch (error) {
        console.error('Error loading order history:', error);
        return;
    }
    
    // Find the order
    const orderIndex = orderHistory.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
        console.error('Order not found:', orderId);
        return;
    }
    
    // Mark order as completed (in a real app, you'd have a status field)
    orderHistory[orderIndex].completed = true;
    orderHistory[orderIndex].completedDate = new Date().toISOString();
    
    // Save updated history
    localStorage.setItem('mkshop_order_history', JSON.stringify(orderHistory));
    
    // Reload order history
    loadOrderHistory();
    
    // Show success message
    Swal.fire({
        title: 'Order Completed!',
        text: `Order ${orderId} has been marked as completed.`,
        icon: 'success',
        confirmButtonColor: '#FF8C32',
        background: '#1E1E1E',
        color: '#f4f4f4'
    });
}
