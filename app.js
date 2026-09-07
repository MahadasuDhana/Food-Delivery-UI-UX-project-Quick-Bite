const restaurants = [
  {id:1, name:"Crust & Co.", cuisine:"Pizza", category:"Pizza", rating:4.8, time:"25–30 min", price:"₹₹", emoji:"🍕", items:["Margherita Pizza","Farmhouse Pizza","Garlic Bread"]},
  {id:2, name:"Burger Lab", cuisine:"Burgers", category:"Burgers", rating:4.6, time:"20–25 min", price:"₹₹", emoji:"🍔", items:["Classic Burger","Cheese Burger","French Fries"]},
  {id:3, name:"Spice Route", cuisine:"Indian", category:"Indian", rating:4.7, time:"30–35 min", price:"₹₹", emoji:"🍛", items:["Paneer Biryani","Butter Chicken","Naan"]},
  {id:4, name:"Sweet Theory", cuisine:"Desserts", category:"Desserts", rating:4.9, time:"15–20 min", price:"₹", emoji:"🍰", items:["Chocolate Cake","Brownie","Cheesecake"]},
  {id:5, name:"Wok Works", cuisine:"Asian", category:"Asian", rating:4.5, time:"25–30 min", price:"₹₹", emoji:"🍜", items:["Noodles","Fried Rice","Manchurian"]},
  {id:6, name:"Green Bowl", cuisine:"Healthy", category:"Healthy", rating:4.6, time:"20–25 min", price:"₹₹", emoji:"🥗", items:["Power Bowl","Avocado Salad","Smoothie"]}
];

const categories = ["All","Pizza","Burgers","Indian","Desserts","Asian","Healthy"];
let cart = [];

function renderCategories(active="All") {
  document.getElementById("categories").innerHTML = categories.map(c =>
    `<button class="category ${c===active?"active":""}" onclick="filterCategory('${c}')">${c}</button>`
  ).join("");
}

function renderRestaurants(list=restaurants) {
  const grid = document.getElementById("restaurantGrid");
  grid.innerHTML = list.length ? list.map(r => `
    <article class="restaurant">
      <div class="food-image">${r.emoji}</div>
      <div class="restaurant-info">
        <h3>${r.name}</h3>
        <div class="meta"><span>★ ${r.rating}</span><span>${r.cuisine}</span><span>${r.time}</span></div>
        <div class="card-bottom">
          <span>${r.price}</span>
          <button class="add-btn" onclick="addToCart(${r.id})">+ Add</button>
        </div>
      </div>
    </article>
  `).join("") : "<p>No restaurants found. Try another search.</p>";
}

function filterCategory(category) {
  renderCategories(category);
  const list = category === "All" ? restaurants : restaurants.filter(r => r.category === category);
  renderRestaurants(list);
  document.getElementById("restaurants").scrollIntoView({behavior:"smooth"});
}

function searchFood() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const list = restaurants.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.cuisine.toLowerCase().includes(q) ||
    r.items.some(item => item.toLowerCase().includes(q))
  );
  renderCategories("All");
  renderRestaurants(q ? list : restaurants);
}

function showAll() {
  document.getElementById("searchInput").value = "";
  filterCategory("All");
}

function addToCart(id) {
  const r = restaurants.find(x => x.id === id);
  cart.push({name:r.items[0], restaurant:r.name, price:199});
  updateCart();
  showToast(`${r.items[0]} added to cart`);
}

function updateCart() {
  document.getElementById("cartCount").textContent = cart.length;
  document.getElementById("cartItems").innerHTML = cart.length
    ? cart.map((x,i)=>`<div class="cart-line"><span>${x.name}<small> · ${x.restaurant}</small></span><strong>₹${x.price}</strong></div>`).join("")
    : "<p>Your cart is empty.</p>";
  const total = cart.reduce((sum,x)=>sum+x.price,0);
  document.getElementById("cartTotal").textContent = `₹${total}`;
}

function openCart() {
  updateCart();
  document.getElementById("cartModal").classList.remove("hidden");
}
function closeCart() {
  document.getElementById("cartModal").classList.add("hidden");
}
function checkout() {
  if (!cart.length) return showToast("Add an item before checkout");
  cart = [];
  updateCart();
  closeCart();
  showToast("Order placed successfully!");
}
function showToast(message) {
  const t = document.getElementById("toast");
  t.textContent = message;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"), 2200);
}
document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("searchInput").addEventListener("keydown", e => {
  if(e.key === "Enter") searchFood();
});

renderCategories();
renderRestaurants();
updateCart();
