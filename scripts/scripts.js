let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateBadge();
}

function addToCart(product, quantity, pickupDate = null) {
    const existing = cart.find(item => item.id === product.id);
    if (existing && !pickupDate) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            img: product.img,
            quantity: quantity,
            pickupDate: pickupDate
        });
    }
    saveCart();
}

function updateBadge() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById("cart-badge");
    if (badge) {
        badge.textContent = total;
        badge.style.display = total > 0 ? "flex" : "none";
    }
}

const PRODUCTS = [
  { id: "1", 
    title: "Natural Rainbow",         
    price: "$96.00", 
    img: "/assets/natural-rainbow.jpg",
    serve: "Serves 15-20",
    cake: true },
  { id: "2", 
        title: "Custom Ice Cream Cake",   
        price: "$96.00", 
        img: "/assets/custom-cake.jpg",
      serve: "Serves 15-20",
      cake: true },
      { id: "3", 
        title: "Almond Butter (460g)",    
        price: "$13.00", 
        img: "/assets/almond.jpg",
        cake: false },
      { id: "4", 
        title: "Strawberry Jam (460g)",   
        price: "$13.00", 
        img: "/assets/strawberry.jpg",
      cake: false },
      { id: "5", 
        title: "Peanut Butter (460g)",    
        price: "$13.00", 
        img: "/assets/peanut.jpg",
        cake: false },
      { id: "6", 
        title: "Paper Gift Voucher",      
        price: "$20.00", 
        img: "/assets/voucher.jpg",
        cake: false },
      { id: "7", 
        title: "'Natural' Embroided Cap", 
        price: "$35.00", 
        img: "/assets/cap.jpg",
        cake: false },
      { id: "8", 
        title: "Kid's Melon Brim Hat",    
        price: "$40.00", 
        img: "/assets/hat.jpg",
        cake: false },
    ];

    let quantity = 1;

function getCartTotal() {
    return cart.reduce((sum, item) => {
        return sum + parseFloat(item.price.replace("$", "")) * item.quantity;
    }, 0);
}

function changeQty(amount) {
    quantity = Math.max(1, quantity + amount);
    document.getElementById("qty-display").textContent = quantity;
}

function openPopup() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById("pickup-date").min = tomorrow.toISOString().split("T")[0];
    document.getElementById("order-popup").classList.add("show");
}

function closePopup() {
    document.getElementById("order-popup").classList.remove("show");
}

function confirmOrder() {
    const date = document.getElementById("pickup-date").value;
    if (!date) {
        alert("Please select a date first.");
        return;
    }
    const formatted = new Date(date).toLocaleDateString("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    addToCart(product, quantity, formatted);
    closePopup();
    alert(`${product.title} added! Pickup: ${formatted}`);
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const product = PRODUCTS.find(p => p.id === id);



if (document.getElementById("detail-img")) {
    // only runs on product-detail.html
    if (product) {
        document.getElementById("detail-img").src = product.img;
        document.getElementById("detail-img").alt = product.title;
        document.getElementById("detail-title").textContent = product.title;
        document.getElementById("detail-price").textContent = product.price;
        document.title = product.title;

        const servesEl = document.getElementById("detail-serves");
        if (product.serve) {
            servesEl.textContent = product.serve;
            servesEl.style.display = "block";
        } else {
            servesEl.style.display = "none";
        }

        const orderBtn = document.getElementById("order-btn");
        if (product.cake) {
            orderBtn.textContent = "Place Order";
            orderBtn.onclick = openPopup;
        } else {
            orderBtn.textContent = "Add to Cart";
            orderBtn.onclick = () => {
                addToCart(product, quantity);
                alert(`${product.title} added to cart!`);
            };
        }
    } else {
        document.querySelector(".detail-layout").innerHTML = "<p>Product not found.</p>";
    }
}

const popupEl = document.getElementById("order-popup");
if (popupEl) {
    popupEl.addEventListener("click", function(e) {
        if (e.target === this) closePopup();
    });
}

function openDrawer() {
    renderDrawer();
    document.getElementById("cart-drawer").classList.add("open");
    document.getElementById("cart-overlay").classList.add("open");
}

function closeDrawer() {
    document.getElementById("cart-drawer").classList.remove("open");
    document.getElementById("cart-overlay").classList.remove("open");
}

function renderDrawer() {
    const el = document.getElementById("cart-drawer-items");
    if (cart.length === 0) {
        el.innerHTML = '<p class="drawer-empty">Your cart is empty.</p>';
        return;
    }
    el.innerHTML = cart.map(item => `
        <div class="drawer-item">
            <img src="${item.img}" alt="${item.title}" />
            <div class="drawer-item-info">
                <div class="drawer-item-title">${item.title}</div>
                <div class="drawer-item-sub">
                    Qty: ${item.quantity}
                    ${item.pickupDate ? `· Pickup: ${item.pickupDate}` : ""}
                </div>
            </div>
            <div class="drawer-item-price">${item.price}</div>
        </div>
    `).join("");
}

function renderCartPage() {
    const itemsEl = document.getElementById("cart-items");
    const summaryEl = document.getElementById("cart-summary");
    if (!itemsEl) return; // not on cart page

    if (cart.length === 0) {
        itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty. <a href="/pages/shop.html">Continue shopping</a></p>';
        summaryEl.innerHTML = "";
        return;
    }

    itemsEl.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
        <img src="${item.img}" alt="${item.title}" />
        <div class="cart-item-right">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-price">${item.price}</div>
            ${item.pickupDate ? `<div class="cart-item-sub">Pickup: ${item.pickupDate}</div>` : ""}
            <div class="cart-item-actions">
              <div class="quantity-selector">
                  <button class="qty-btn" onclick="changeCartQty(${index}, -1)">−</button>
                  <span>${item.quantity}</span>
                  <button class="qty-btn" onclick="changeCartQty(${index}, 1)">+</button>
              </div>
              <button class="cart-remove-btn" onclick="removeFromCart(${index})">
                  <img src="/assets/remove.svg" alt="Remove" />
              </button>
            </div>
        </div>
    </div>
    
`).join("");

    const total = getCartTotal();

    summaryEl.innerHTML = `
        <h2>Order Summary</h2>
        <div class="summary-row summary-total">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
        </div>
        <button class="checkout-btn" onclick="location.href='/pages/checkout.html'">Proceed to Checkout</button>
    `;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCartPage();
}

function changeCartQty(index, amount) {
    cart[index].quantity = Math.max(1, cart[index].quantity + amount);
    saveCart();
    renderCartPage();
}

function renderCheckoutTotal() {
    const el = document.getElementById("checkout-total");
    if (!el) return;
    
    el.innerHTML = `
      <span>Total</span>
      <span>$${getCartTotal().toFixed(2)}</span>
`;

}

function placeOrder() {
    const firstName = document.querySelector("input[placeholder='*First Name']")?.value;
    const email = document.querySelector("input[type='email']")?.value;

    localStorage.setItem("checkout-name", firstName);
    localStorage.setItem("checkout-email", email);
    location.href = "/pages/confirm.html";
}

function renderConfirmationPage() {
    const titleEl = document.getElementById("confirmation-title");
    const emailEl = document.getElementById("confirmation-email");
    if (!titleEl) return;

    const name = localStorage.getItem("checkout-name") || "";
    const email = localStorage.getItem("checkout-email") || "";

    titleEl.textContent = `Thank you${name ? ", " + name : ""}!`;
    if (email) {
        emailEl.textContent = `An order confirmation has been sent to your inbox: ${email}`;
    }

    cart = [];
    saveCart();
    updateBadge();
}

updateBadge();
renderCartPage();
renderCheckoutTotal();
renderConfirmationPage();