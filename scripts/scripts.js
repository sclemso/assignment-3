const PRODUCTS = [
      { id: "1", title: "Natural Rainbow",         price: "$96.00", img: "/assets/natural-rainbow.jpg" },
      { id: "2", title: "Custom Ice Cream Cake",   price: "$96.00", img: "/assets/custom-cake.jpg" },
      { id: "3", title: "Almond Butter (460g)",    price: "$13.00", img: "/assets/almond.jpg" },
      { id: "4", title: "Strawberry Jam (460g)",   price: "$13.00", img: "/assets/strawberry.jpg" },
      { id: "5", title: "Peanut Butter (460g)",    price: "$13.00", img: "/assets/peanut.jpg" },
      { id: "6", title: "Paper Gift Voucher",      price: "$20.00", img: "/assets/voucher.jpg" },
      { id: "7", title: "'Natural' Embroided Cap", price: "$35.00", img: "/assets/cap.jpg" },
      { id: "8", title: "Kid's Melon Brim Hat",    price: "$40.00", img: "/assets/hat.jpg" },
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
    } else {
      document.querySelector(".detail-layout").innerHTML = "<p>Product not found.</p>";
    }