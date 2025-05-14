document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "TrustBook Pro", price: 1200 },
    { id: 2, name: "SmartTrust Watch", price: 299 },
    { id: 3, name: "TrustPhone X", price: 899 }
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  // Render products on the homepage
  if (productList) {
    products.forEach(product => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(div);
    });
  }

  window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    saveCart();
    renderCart();
  };

  window.removeFromCart = function(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  };

  function renderCart() {
    if (!cartItems || !cartTotal) return;
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.name} - $${item.price} 
        <button onclick="removeFromCart(${index})">Remove</button>`;
      cartItems.appendChild(li);
      total += item.price;
    });
    cartTotal.textContent = `Total: $${total}`;
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  const themeToggle = document.getElementById("toggle-theme");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }

  // Email validation
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const msg = document.getElementById("email-msg");
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      msg.textContent = valid ? "Valid Email Submitted!" : "Please enter a valid email.";
      msg.style.color = valid ? "green" : "red";
    });
  }

  renderCart();
});










