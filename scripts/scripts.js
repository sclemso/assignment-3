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

  
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const product = PRODUCTS.find(p => p.id === id);

    if (product) {
      document.getElementById("detail-img").src   = product.img;
      document.getElementById("detail-img").alt   = product.title;
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
    } else {
      document.querySelector(".detail-layout").innerHTML = "<p>Product not found.</p>";
    }


let quantity = 1;

function changeQty(amount) {
    quantity = Math.max(1, quantity + amount);
    document.getElementById("qty-display").textContent = quantity;
}

const orderBtn = document.getElementById("order-btn");
if (product.cake) {
    orderBtn.textContent = "Place Order";
} else {
    orderBtn.textContent = "Add to Cart";
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
    alert(`Order placed for ${formatted}!`);
    closePopup();
}

document.getElementById("order-popup").addEventListener("click", function(e) {
    if (e.target === this) closePopup();
});