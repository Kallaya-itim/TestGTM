// ---------------------- ฟังก์ชันคุกกี้ ----------------------
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cname = name + "=";
  const decoded = decodeURIComponent(document.cookie);
  const ca = decoded.split(';');
  for (let c of ca) {
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
  }
  return "";
}

// ---------------------- ระบบตะกร้า ----------------------
let cart = [];

// โหลดตะกร้าจาก localStorage
function loadCart() {
  const stored = localStorage.getItem("cart");
  if (stored) cart = JSON.parse(stored);
  renderCart();
}

// บันทึกตะกร้า
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  renderCart();
  saveLastViewed(name); // จดจำสินค้าล่าสุดใน cookie
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price} บาท`;
    cartItems.appendChild(li);
  });

  document.getElementById("total").textContent = "รวม: " + total + " บาท";
}

function checkout() {
  if (cart.length === 0) {
    alert("ตะกร้าว่างเปล่า");
    return;
  }
  alert("สั่งซื้อสำเร็จ! ขอบคุณที่ใช้บริการ");
  cart = [];
  saveCart();
  renderCart();
}

// ---------------------- ฟังก์ชันคุกกี้เพิ่มเติม ----------------------
// ภาษา
function changeLanguage(lang) {
  setCookie("lang", lang, 7);
  alert("เปลี่ยนภาษาเป็น: " + lang);
}

// ธีม
function toggleTheme() {
  let theme = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", theme);
  setCookie("theme", theme, 30);
}

// โหลดธีมและภาษา
function loadPreferences() {
  const lang = getCookie("lang");
  if (lang) console.log("ภาษาที่เลือก: " + lang);

  const theme = getCookie("theme");
  if (theme) document.body.setAttribute("data-theme", theme);

  const lastViewed = getCookie("last_viewed");
  if (lastViewed) console.log("สินค้าที่ดูล่าสุด: " + lastViewed);
}

// สินค้าที่ดูล่าสุด
function saveLastViewed(productName) {
  setCookie("last_viewed", productName, 3);
}

// ---------------------- เริ่มต้น ----------------------
loadCart();
loadPreferences();
