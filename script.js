// =============================================
// 積層日和 — script.js
// カート・モーダル・フィルター・アニメーション
// =============================================

let cart = JSON.parse(localStorage.getItem("sekisoubiyori-cart") || "[]");
let modalProduct = null;
let modalQty = 1;
let couponApplied = false;
let memberData = null;

const yen = (v) => `¥${v.toLocaleString("ja-JP")}`;

// ============================================
// 【写真エリア⑤】商品イラスト → 写真への切り替え方法
//
// 現在 art() 関数がSVGイラストを返しています。
// products.js で各商品に image プロパティを追加したら
// 下記のように art() 関数を修正してください。
//
// 修正例）
// const art = (shape, imageUrl) => {
//   if (imageUrl) {
//     return `<img src="${imageUrl}" alt="商品写真"
//              style="width:100%;height:100%;object-fit:cover;" />`;
//   }
//   // imageUrlがない場合はSVGイラストにフォールバック
//   ... 現在のSVGコード ...
// };
//
// ※ art() を呼び出している箇所（renderProducts, renderCart等）も
//   art(p.shape, p.image) のように引数を追加する必要があります。
// ============================================
const art = (shape) => {
  const common = `<rect width="320" height="300" fill="#f4ede5"/><ellipse cx="160" cy="234" rx="84" ry="14" fill="rgba(119,87,67,.10)"/>`;
  const line = `stroke="#b99a86" stroke-width="2.5" stroke-linecap="round" fill="none"`;
  const fill = `fill="#fff8f2" stroke="#b99a86" stroke-width="2.5"`;
  const shapes = {
    tape:  `${common}<path d="M98 105c0-28 23-51 51-51h22c28 0 51 23 51 51v109H98z" ${fill}/><circle cx="134" cy="150" r="25" fill="#edd9cd"/><circle cx="186" cy="150" r="25" fill="#e6e0d2"/><circle cx="134" cy="150" r="10" fill="#fffdfb"/><circle cx="186" cy="150" r="10" fill="#fffdfb"/><path d="M118 213h84M124 98h72" ${line}/>`,
    lip:   `${common}<rect x="92" y="178" width="136" height="58" rx="22" ${fill}/><rect x="118" y="86" width="28" height="116" rx="14" fill="#faf8f5" stroke="#b99a86" stroke-width="2.5"/><rect x="174" y="62" width="28" height="140" rx="14" fill="#edd9cd" stroke="#b99a86" stroke-width="2.5"/><path d="M114 207h92M138 181v54M183 181v54" ${line}/>`,
    ring:  `${common}<path d="M102 194c24-44 92-44 116 0 8 15-3 33-20 33h-76c-17 0-28-18-20-33z" ${fill}/><circle cx="160" cy="151" r="39" fill="#edd9cd" stroke="#b99a86" stroke-width="2.5"/><circle cx="160" cy="151" r="20" fill="#f4ede5"/>`,
    tray:  `${common}<path d="M77 161c0-31 25-56 56-56h54c31 0 56 25 56 56s-25 56-56 56h-54c-31 0-56-25-56-56z" ${fill}/><path d="M111 161c0-14 11-25 25-25h48c14 0 25 11 25 25s-11 25-25 25h-48c-14 0-25-11-25-25z" fill="#f4ede5" stroke="#d2b5a1" stroke-width="1.5"/>`,
    tower: `${common}<rect x="148" y="75" width="24" height="150" rx="12" fill="#fff8f2" stroke="#b99a86" stroke-width="2.5"/><circle cx="160" cy="104" r="32" fill="#edd9cd" stroke="#b99a86" stroke-width="2.5"/><circle cx="160" cy="154" r="32" fill="#e6e0d2" stroke="#b99a86" stroke-width="2.5"/><circle cx="160" cy="104" r="12" fill="#fffdfb"/><circle cx="160" cy="154" r="12" fill="#fffdfb"/><path d="M106 226h108" ${line}/>`,
    cup:   `${common}<path d="M105 111h110l-13 111c-2 13-13 23-27 23h-30c-14 0-25-10-27-23z" ${fill}/><path d="M126 111c8-34 11-55 12-74M158 111c0-32 0-54 5-82M192 111c-3-27-3-49 6-68" ${line}/><path d="M118 145h84" ${line}/>`,
  };
  return `<svg viewBox="0 0 320 300" role="img" aria-label="商品イメージ">${shapes[shape]}</svg>`;
};

const productGrid = document.querySelector("[data-products]");
const cartDrawer  = document.querySelector("[data-cart]");
const scrim       = document.querySelector("[data-scrim]");

/* ── 商品一覧 ── */
function renderProducts(filter = "all") {
  productGrid.innerHTML = products
    .filter((p) => filter === "all" || p.category === filter)
    .map((p) => `
      <article class="product-card ${p.soldOut ? "sold-out" : ""}">
        <button class="product-art" type="button" data-detail="${p.id}" aria-label="${p.name}の詳細を見る">
          ${art(p.shape)}
        </button>
        <div class="product-body">
          <div class="product-meta">
            <span class="tag">${p.categoryLabel}</span>
            <span class="price">${yen(p.price)}</span>
          </div>
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <div class="card-actions">
            <button class="small-button solid" type="button" data-add="${p.id}" ${p.soldOut ? "disabled" : ""}>${p.soldOut ? "入荷通知を受け取る" : "カートに入れる"}</button>
            <button class="small-button" type="button" data-detail="${p.id}">詳細</button>
          </div>
        </div>
      </article>`).join("");
}

/* ── カート ── */
function saveCart() { localStorage.setItem("sekisoubiyori-cart", JSON.stringify(cart)); }

function addToCart(id, qty = 1) {
  const p = products.find((x) => x.id === id);
  if (!p || p.soldOut) return;
  const e = cart.find((x) => x.id === id);
  e ? (e.quantity += qty) : cart.push({ id, quantity: qty });
  saveCart(); renderCart(); openCart();
}

function updateQuantity(id, delta) {
  const item = cart.find((x) => x.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) cart = cart.filter((x) => x.id !== id);
  saveCart(); renderCart();
}

function calcTotals() {
  const items = cart
    .map((e) => ({ ...e, product: products.find((p) => p.id === e.id) }))
    .filter((e) => e.product);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const discount = couponApplied && subtotal > 0 ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal - discount >= 5000 || subtotal === 0 ? 0 : 300;
  const total    = subtotal - discount + shipping;
  return { items, subtotal, discount, shipping, total };
}

function renderCart() {
  const { items, subtotal, discount, shipping, total } = calcTotals();
  const count = items.reduce((s, i) => s + i.quantity, 0);
  document.querySelector("[data-cart-count]").textContent    = count;
  document.querySelector("[data-cart-subtotal]").textContent = couponApplied ? `${yen(subtotal)} - ${yen(discount)}` : yen(subtotal);
  document.querySelector("[data-cart-shipping]").textContent = yen(shipping);
  document.querySelector("[data-cart-total]").textContent    = yen(total);
  document.querySelector("[data-cart-items]").innerHTML = items.length
    ? items.map((item) => `
        <div class="cart-item">
          <div class="cart-thumb">${art(item.product.shape)}</div>
          <div>
            <h3>${item.product.name}</h3>
            <p>${yen(item.product.price)} × ${item.quantity}点</p>
          </div>
          <div class="item-controls">
            <button type="button" data-cart-dec="${item.id}">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-cart-inc="${item.id}">＋</button>
          </div>
        </div>`).join("")
    : `<p style="padding:24px 0;color:var(--mist);font-size:14px">カートは空です。お気に入りの特等席を探してみてください。</p>`;
}

/* ── モーダル ── */
function openModal(id) {
  modalProduct = products.find((p) => p.id === id);
  if (!modalProduct) return;
  modalQty = 1;
  document.querySelector("[data-modal-art]").innerHTML           = art(modalProduct.shape);
  document.querySelector("[data-modal-category]").textContent    = modalProduct.categoryLabel;
  document.querySelector("[data-modal-name]").textContent        = modalProduct.name;
  document.querySelector("[data-modal-price]").textContent       = yen(modalProduct.price);
  document.querySelector("[data-modal-description]").textContent = modalProduct.detail;
  document.querySelector("[data-modal-qty]").textContent         = modalQty;
  document.querySelector("[data-modal-colors]").innerHTML        = modalProduct.colors
    .map((c) => `<span class="color-chip" style="background:${c}"></span>`).join("");
  document.querySelector("[data-modal]").hidden = false;
  document.body.style.overflow = "hidden";
}
function closeModal() {
  document.querySelector("[data-modal]").hidden = true;
  document.body.style.overflow = "";
}

/* ── カートドロワー ── */
function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  scrim.hidden = false;
}
function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  scrim.hidden = true;
  setTimeout(() => {
    const current = cartDrawer.querySelector("[data-cart-step]:not([hidden])");
    if (current && current.dataset.cartStep === "4") {
      cart = []; memberData = null;
      saveCart(); renderCart();
    }
    showStep(1);
  }, 300);
}

function showStep(n) {
  document.querySelectorAll("[data-cart-step]").forEach((el) => {
    el.hidden = el.dataset.cartStep !== String(n);
  });
  document.querySelectorAll(".step-dot").forEach((dot) => {
    const s = parseInt(dot.dataset.step);
    dot.classList.toggle("active", s === n);
    dot.classList.toggle("done", s < n);
  });
  const ind = document.querySelector("[data-step-indicator]");
  if (ind) ind.hidden = n === 4;
}

function renderConfirmStep() {
  const { items, subtotal, discount, shipping, total } = calcTotals();
  document.querySelector("[data-confirm-items]").innerHTML = items.map((item) => `
    <div class="cart-item confirm-item">
      <div class="cart-thumb">${art(item.product.shape)}</div>
      <div><h3>${item.product.name}</h3><p>${yen(item.product.price)} × ${item.quantity}点</p></div>
      <strong>${yen(item.product.price * item.quantity)}</strong>
    </div>`).join("");
  document.querySelector("[data-confirm-subtotal]").textContent = couponApplied ? `${yen(subtotal)} - ${yen(discount)}` : yen(subtotal);
  document.querySelector("[data-confirm-shipping]").textContent = yen(shipping);
  document.querySelector("[data-confirm-total]").textContent    = yen(total);
  if (memberData) {
    const pay = { card: "クレジットカード", paypay: "PayPay", bank: "銀行振込" };
    document.querySelector("[data-confirm-info]").innerHTML = `
      <strong>お届け先・お支払い</strong>
      ${memberData.fullName} 様<br>
      〒${memberData.postal} ${memberData.address}${memberData.address2 ? " " + memberData.address2 : ""}<br>
      ${memberData.phone} / ${memberData.email}<br>
      お支払い: ${pay[memberData.payment] || memberData.payment}`;
  }
}

/* ── イベント ── */
document.addEventListener("click", (e) => {
  if (e.target.matches("[data-scrim]")) { closeCart(); return; }
  const t = e.target.closest("button, a");
  if (!t) return;
  if (t.matches("[data-add]"))         addToCart(t.dataset.add);
  if (t.matches("[data-detail]"))      openModal(t.dataset.detail);
  if (t.matches("[data-cart-open]"))   openCart();
  if (t.matches("[data-cart-close]"))  closeCart();
  if (t.matches("[data-modal-close]")) closeModal();
  if (t.matches("[data-modal-add]") && modalProduct) { addToCart(modalProduct.id, modalQty); closeModal(); }
  if (t.matches("[data-qty-minus]"))   { modalQty = Math.max(1, modalQty - 1); document.querySelector("[data-modal-qty]").textContent = modalQty; }
  if (t.matches("[data-qty-plus]"))    { modalQty++; document.querySelector("[data-modal-qty]").textContent = modalQty; }
  if (t.matches("[data-cart-dec]"))    updateQuantity(t.dataset.cartDec, -1);
  if (t.matches("[data-cart-inc]"))    updateQuantity(t.dataset.cartInc, 1);
  if (t.matches("[data-apply-coupon]")) {
    const inp = document.querySelector('input[name="coupon"]');
    couponApplied = inp.value.trim().toUpperCase() === "SEKISO10";
    inp.value = couponApplied ? "SEKISO10" : "";
    renderCart();
  }
  if (t.dataset.goStep) {
    const n = parseInt(t.dataset.goStep);
    if (n === 2 && !cart.length) return;
    showStep(n);
  }
  if (t.matches("[data-skip-member]")) { renderConfirmStep(); showStep(3); }
  if (t.matches("[data-place-order]")) showStep(4);
});

document.querySelector("[data-member-form]").addEventListener("submit", (e) => {
  e.preventDefault();
  memberData = Object.fromEntries(new FormData(e.currentTarget).entries());
  renderConfirmStep(); showStep(3);
});

document.querySelectorAll("[data-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
});

document.querySelector("[data-contact-form]").addEventListener("submit", (e) => {
  e.preventDefault(); e.currentTarget.reset();
  document.querySelector("[data-contact-note]").textContent = "お問い合わせありがとうございます。実運用では自動返信メールを送信します。";
});

window.addEventListener("scroll", () => {
  document.querySelector("[data-header]").classList.toggle("scrolled", window.scrollY > 20);
});

const observer = new IntersectionObserver(
  (entries) => entries.forEach((en) => { if (en.isIntersecting) en.target.classList.add("visible"); }),
  { threshold: 0, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".section-reveal").forEach((el) => observer.observe(el));

requestAnimationFrame(() => {
  document.querySelectorAll(".section-reveal").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("visible");
  });
});

renderProducts();
renderCart();
