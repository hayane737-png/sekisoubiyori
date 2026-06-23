const products = [
  {
    id: "tape-stand",
    name: "マステの特等席スタンド",
    category: "tape",
    categoryLabel: "マステ周り",
    description: "お気に入りのマスキングテープを、選びやすく飾れるスタンド。",
    detail:
      "横並びでも積み重ねてもかわいく見える高さに整えました。机の上や棚に置いたとき、柄が自然に目に入る角度です。",
    price: 1800,
    colors: ["#fff8f2", "#edd9cd", "#e6e0d2"],
    shape: "tape",
    soldOut: false,
  },
  {
    id: "lip-holder",
    name: "リップの小さな居場所",
    category: "lip",
    categoryLabel: "リップ周り",
    description: "毎日使うリップを、一本ずつきれいに立てておけるホルダー。",
    detail:
      "朝の支度で手に取りやすく、置いたままでも生活感が出にくい丸みのある形。洗面台にもデスクにもなじみます。",
    price: 1400,
    colors: ["#faf8f5", "#edd9cd", "#c5957a"],
    shape: "lip",
    soldOut: false,
  },
  {
    id: "ring-rest",
    name: "リングレスト",
    category: "accessory",
    categoryLabel: "アクセサリー周り",
    description: "外したリングをそっと預けられる、小さな台座。",
    detail:
      "指輪のカーブに沿うように、やわらかな傾斜をつけました。玄関やベッドサイドの定位置づくりに。",
    price: 1200,
    colors: ["#fffdfb", "#f0ede6", "#edd9cd"],
    shape: "ring",
    soldOut: false,
  },
  {
    id: "mini-tray",
    name: "余白のミニトレイ",
    category: "accessory",
    categoryLabel: "アクセサリー周り",
    description: "ピアスやヘアピンをまとめる、浅めのアクセサリートレイ。",
    detail:
      "底面のゆるやかな凹みで、小物が散らばりにくい設計。白背景の写真にも合う静かな佇まいです。",
    price: 1600,
    colors: ["#faf8f5", "#e6e0d2", "#edd9cd"],
    shape: "tray",
    soldOut: false,
  },
  {
    id: "tape-tower",
    name: "マステタワー",
    category: "tape",
    categoryLabel: "マステ周り",
    description: "縦に重ねて飾れる、コレクション向けのマステ収納。",
    detail:
      "省スペースでも柄が見えるように、柱の太さと台座の安定感を調整しました。複数色で組み合わせても楽しめます。",
    price: 2200,
    colors: ["#fff8f2", "#edd9cd", "#c5957a"],
    shape: "tower",
    soldOut: true,
  },
  {
    id: "brush-cup",
    name: "ブラシとリップのカップ",
    category: "lip",
    categoryLabel: "リップ周り",
    description: "リップ、細いブラシ、ペンをまとめられる軽やかなカップ。",
    detail:
      "縁を薄く、底を少し重めに。見た目は繊細でも倒れにくいバランスを目指しました。",
    price: 1900,
    colors: ["#faf8f5", "#f0ede6", "#edd9cd"],
    shape: "cup",
    soldOut: false,
  },
];

let cart = JSON.parse(localStorage.getItem("sekisoubiyori-cart") || "[]");
let modalProduct = null;
let modalQty = 1;
let couponApplied = false;

const yen = (value) => `¥${value.toLocaleString("ja-JP")}`;

const art = (shape) => {
  const common = `<rect width="320" height="300" rx="0" fill="#f4ede5"/><ellipse cx="160" cy="234" rx="84" ry="14" fill="rgba(119,87,67,.12)"/>`;
  const line = `stroke="#b99a86" stroke-width="3" stroke-linecap="round" fill="none"`;
  const fill = `fill="#fff8f2" stroke="#b99a86" stroke-width="3"`;
  const shapes = {
    tape: `${common}<path d="M98 105c0-28 23-51 51-51h22c28 0 51 23 51 51v109H98z" ${fill}/><circle cx="134" cy="150" r="25" fill="#edd9cd"/><circle cx="186" cy="150" r="25" fill="#e6e0d2"/><circle cx="134" cy="150" r="10" fill="#fffdfb"/><circle cx="186" cy="150" r="10" fill="#fffdfb"/><path d="M118 213h84M124 98h72" ${line}/>`,
    lip: `${common}<rect x="92" y="178" width="136" height="58" rx="22" ${fill}/><rect x="118" y="86" width="28" height="116" rx="14" fill="#faf8f5" stroke="#b99a86" stroke-width="3"/><rect x="174" y="62" width="28" height="140" rx="14" fill="#edd9cd" stroke="#b99a86" stroke-width="3"/><path d="M114 207h92M138 181v54M183 181v54" ${line}/>`,
    ring: `${common}<path d="M102 194c24-44 92-44 116 0 8 15-3 33-20 33h-76c-17 0-28-18-20-33z" ${fill}/><circle cx="160" cy="151" r="39" fill="#edd9cd" stroke="#b99a86" stroke-width="3"/><circle cx="160" cy="151" r="20" fill="#f4ede5"/>`,
    tray: `${common}<path d="M77 161c0-31 25-56 56-56h54c31 0 56 25 56 56s-25 56-56 56h-54c-31 0-56-25-56-56z" ${fill}/><path d="M111 161c0-14 11-25 25-25h48c14 0 25 11 25 25s-11 25-25 25h-48c-14 0-25-11-25-25z" fill="#f4ede5" stroke="#d2b5a1" stroke-width="2"/>`,
    tower: `${common}<rect x="148" y="75" width="24" height="150" rx="12" fill="#fff8f2" stroke="#b99a86" stroke-width="3"/><circle cx="160" cy="104" r="32" fill="#edd9cd" stroke="#b99a86" stroke-width="3"/><circle cx="160" cy="154" r="32" fill="#e6e0d2" stroke="#b99a86" stroke-width="3"/><circle cx="160" cy="104" r="12" fill="#fffdfb"/><circle cx="160" cy="154" r="12" fill="#fffdfb"/><path d="M106 226h108" ${line}/>`,
    cup: `${common}<path d="M105 111h110l-13 111c-2 13-13 23-27 23h-30c-14 0-25-10-27-23z" ${fill}/><path d="M126 111c8-34 11-55 12-74M158 111c0-32 0-54 5-82M192 111c-3-27-3-49 6-68" ${line}/><path d="M118 145h84" ${line}/>`,
  };
  return `<svg viewBox="0 0 320 300" role="img" aria-label="商品イメージ">${shapes[shape]}</svg>`;
};

const productGrid = document.querySelector("[data-products]");
const cartDrawer = document.querySelector("[data-cart]");
const scrim = document.querySelector("[data-scrim]");

function renderProducts(filter = "all") {
  productGrid.innerHTML = products
    .filter((product) => filter === "all" || product.category === filter)
    .map(
      (product) => `
      <article class="product-card ${product.soldOut ? "sold-out" : ""}">
        <button class="product-art" type="button" data-detail="${product.id}" aria-label="${product.name}の詳細を見る">
          ${art(product.shape)}
        </button>
        <div class="product-body">
          <div class="product-meta">
            <span class="tag">${product.categoryLabel}</span>
            <span class="price">${yen(product.price)}</span>
          </div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="card-actions">
            <button class="small-button solid" type="button" data-add="${product.id}" ${product.soldOut ? "disabled" : ""}>${product.soldOut ? "入荷通知を受け取る" : "カートに入れる"}</button>
            <button class="small-button" type="button" data-detail="${product.id}">詳細</button>
          </div>
        </div>
      </article>`
    )
    .join("");
}

function saveCart() {
  localStorage.setItem("sekisoubiyori-cart", JSON.stringify(cart));
}

function addToCart(productId, quantity = 1) {
  const product = products.find((item) => item.id === productId);
  if (!product || product.soldOut) return;
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }
  saveCart();
  renderCart();
  openCart();
}

function updateQuantity(productId, delta) {
  const item = cart.find((entry) => entry.id === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter((entry) => entry.id !== productId);
  }
  saveCart();
  renderCart();
}

function renderCart() {
  const items = cart
    .map((entry) => ({ ...entry, product: products.find((product) => product.id === entry.id) }))
    .filter((entry) => entry.product);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = couponApplied && subtotal > 0 ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal - discount >= 5000 || subtotal === 0 ? 0 : 300;
  const total = subtotal - discount + shipping;

  document.querySelector("[data-cart-count]").textContent = count;
  document.querySelector("[data-cart-subtotal]").textContent = couponApplied ? `${yen(subtotal)} - ${yen(discount)}` : yen(subtotal);
  document.querySelector("[data-cart-shipping]").textContent = yen(shipping);
  document.querySelector("[data-cart-total]").textContent = yen(total);
  document.querySelector("[data-cart-items]").innerHTML = items.length
    ? items
        .map(
          (item) => `
          <div class="cart-item">
            <div class="cart-thumb">${art(item.product.shape)}</div>
            <div>
              <h3>${item.product.name}</h3>
              <p>${yen(item.product.price)} / ${item.quantity}点</p>
            </div>
            <div class="item-controls">
              <button type="button" data-cart-dec="${item.id}" aria-label="${item.product.name}を減らす">−</button>
              <span>${item.quantity}</span>
              <button type="button" data-cart-inc="${item.id}" aria-label="${item.product.name}を増やす">＋</button>
            </div>
          </div>`
        )
        .join("")
    : `<p class="form-note">カートは空です。お気に入りの居場所を探してみてください。</p>`;
}

function openModal(productId) {
  modalProduct = products.find((product) => product.id === productId);
  if (!modalProduct) return;
  modalQty = 1;
  document.querySelector("[data-modal-art]").innerHTML = art(modalProduct.shape);
  document.querySelector("[data-modal-category]").textContent = modalProduct.categoryLabel;
  document.querySelector("[data-modal-name]").textContent = modalProduct.name;
  document.querySelector("[data-modal-price]").textContent = yen(modalProduct.price);
  document.querySelector("[data-modal-description]").textContent = modalProduct.detail;
  document.querySelector("[data-modal-qty]").textContent = modalQty;
  document.querySelector("[data-modal-colors]").innerHTML = modalProduct.colors
    .map((color) => `<span class="color-chip" style="background:${color}"></span>`)
    .join("");
  const modal = document.querySelector("[data-modal]");
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.querySelector("[data-modal]").hidden = true;
  document.body.style.overflow = "";
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  scrim.hidden = false;
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  scrim.hidden = true;
}

document.addEventListener("click", (event) => {
  if (event.target.matches("[data-scrim]")) {
    closeCart();
    return;
  }

  const target = event.target.closest("button, a");
  if (!target) return;

  if (target.matches("[data-add]")) addToCart(target.dataset.add);
  if (target.matches("[data-detail]")) openModal(target.dataset.detail);
  if (target.matches("[data-cart-open]")) openCart();
  if (target.matches("[data-cart-close]")) closeCart();
  if (target.matches("[data-modal-close]")) closeModal();
  if (target.matches("[data-modal-add]") && modalProduct) {
    addToCart(modalProduct.id, modalQty);
    closeModal();
  }
  if (target.matches("[data-qty-minus]")) {
    modalQty = Math.max(1, modalQty - 1);
    document.querySelector("[data-modal-qty]").textContent = modalQty;
  }
  if (target.matches("[data-qty-plus]")) {
    modalQty += 1;
    document.querySelector("[data-modal-qty]").textContent = modalQty;
  }
  if (target.matches("[data-cart-dec]")) updateQuantity(target.dataset.cartDec, -1);
  if (target.matches("[data-cart-inc]")) updateQuantity(target.dataset.cartInc, 1);
  if (target.matches("[data-apply-coupon]")) {
    const input = document.querySelector('input[name="coupon"]');
    couponApplied = input.value.trim().toUpperCase() === "SEKISO10";
    input.value = couponApplied ? "SEKISO10" : "";
    renderCart();
  }
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});

document.querySelector("[data-checkout-form]").addEventListener("submit", (event) => {
  event.preventDefault();
  const note = document.querySelector("[data-checkout-note]");
  note.textContent = cart.length
    ? "デモ注文を受け付けました。実運用では決済完了後に確認メールを送信します。"
    : "カートに商品を追加してください。";
});

document.querySelector("[data-contact-form]").addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.reset();
  document.querySelector("[data-contact-note]").textContent =
    "お問い合わせありがとうございます。実運用では自動返信メールを送信します。";
});

window.addEventListener("scroll", () => {
  document.querySelector("[data-header]").classList.toggle("scrolled", window.scrollY > 20);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".section-reveal").forEach((section) => observer.observe(section));

renderProducts();
renderCart();
