import React, { useState, useEffect, useRef } from "react";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const YOUR_EMAIL = "hrshitshrmaa@gmail.com"; // ← YOUR EMAIL - orders sent here
const WHATSAPP_NUMBER = "+917320039935"; // ← YOUR WHATSAPP NUMBER

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

const CATEGORIES = [
  { icon: "🎁", name: "Gifts",       color: "#FF6B9D" },
  { icon: "👗", name: "Fashion",     color: "#FD79A8" },
  { icon: "📱", name: "Electronics", color: "#4ECDC4" },
  { icon: "🏠", name: "Home",        color: "#6C5CE7" },
  { icon: "💄", name: "Beauty",      color: "#E84393" },
  { icon: "📚", name: "Books",       color: "#FDCB6E" },
  { icon: "⚽", name: "Sports",      color: "#74B9FF" },
  { icon: "🧸", name: "Kids",        color: "#FF7675" },
];

const PRODUCTS = [
  { id: 1,  name: "Luxury Gift Hamper",    price: 49.99,  originalPrice: 79.99,  rating: 4.8, reviews: 1240, category: "Gifts",       emoji: "🎁",  seller: "GiftWorld Co.",   country: "🇺🇸", badge: "Bestseller",   stock: 45,  desc: "Premium curated gift box with chocolates, candles, and self-care items. Perfect for any occasion. Ships from USA warehouse." },
  { id: 2,  name: "Smart Watch Pro X",     price: 129.00, originalPrice: 199.00, rating: 4.6, reviews: 890,  category: "Electronics", emoji: "⌚",  seller: "TechNest Ltd.",   country: "🇨🇳", badge: "Flash Deal",   stock: 23,  desc: "Advanced smartwatch with heart rate, GPS, sleep tracking, and 7-day battery life. Ships worldwide with tracking." },
  { id: 3,  name: "Silk Evening Dress",    price: 64.99,  originalPrice: 89.99,  rating: 4.7, reviews: 567,  category: "Fashion",     emoji: "👗",  seller: "StyleHub Paris",  country: "🇫🇷", badge: "Trending",     stock: 12,  desc: "Elegant silk blend evening dress, available in 12 colors and all international sizes. Free returns within 30 days." },
  { id: 4,  name: "Aromatherapy Gift Set", price: 34.99,  originalPrice: 54.99,  rating: 4.9, reviews: 2103, category: "Beauty",      emoji: "🕯️",  seller: "WellnessWorld",   country: "🇬🇧", badge: "Top Rated",    stock: 88,  desc: "Set of 6 essential oil blends with diffuser. Lavender, eucalyptus, peppermint and more. 100% natural." },
  { id: 5,  name: "Kids Building Set",     price: 42.00,  originalPrice: 60.00,  rating: 4.8, reviews: 734,  category: "Kids",        emoji: "🧱",  seller: "PlayZone Kids",   country: "🇩🇪", badge: "Sale",         stock: 31,  desc: "600-piece building set for ages 7+. Includes 4 mini-figures. Safe, tested, certified." },
  { id: 6,  name: "Wireless Earbuds Pro",  price: 59.99,  originalPrice: 89.99,  rating: 4.5, reviews: 1876, category: "Electronics", emoji: "🎧",  seller: "SoundWave Inc.",  country: "🇰🇷", badge: "Flash Deal",   stock: 67,  desc: "True wireless earbuds with active noise cancellation and 30-hour total battery. IPX5 waterproof." },
  { id: 7,  name: "World Coffee Gift Set", price: 38.50,  originalPrice: 55.00,  rating: 4.7, reviews: 429,  category: "Gifts",       emoji: "☕",  seller: "BeanBox Direct",  country: "🇮🇹", badge: "New",          stock: 55,  desc: "World coffee tour — 8 single-origin roasts from 8 countries, freshly ground and vacuum sealed." },
  { id: 8,  name: "Yoga Mat Premium",      price: 45.00,  originalPrice: 65.00,  rating: 4.6, reviews: 983,  category: "Sports",      emoji: "🧘",  seller: "ZenFit Global",   country: "🇮🇳", badge: "Eco-Friendly", stock: 40,  desc: "Non-slip, eco TPE yoga mat 6mm thick. Alignment lines, carrying strap included. Ships in 2-3 days." },
  { id: 9,  name: "Handbag Leather Tote",  price: 89.99,  originalPrice: 130.00, rating: 4.7, reviews: 342,  category: "Fashion",     emoji: "👜",  seller: "LuxeBags Italy",  country: "🇮🇹", badge: "Premium",      stock: 18,  desc: "Genuine leather tote bag, handcrafted in Italy. Multiple compartments, fits 15\" laptop." },
  { id: 10, name: "Home Diffuser Set",      price: 29.99,  originalPrice: 45.00,  rating: 4.8, reviews: 1567, category: "Home",        emoji: "🏮",  seller: "AromaCo.",        country: "🇺🇸", badge: "Bestseller",   stock: 92,  desc: "Ultrasonic aromatherapy diffuser with 10 essential oils. 7 LED colors, auto shutoff. Perfect for home." },
  { id: 11, name: "Bestseller Novel Pack",  price: 24.99,  originalPrice: 39.99,  rating: 4.9, reviews: 2890, category: "Books",       emoji: "📚",  seller: "BookWorld",       country: "🇬🇧", badge: "Top Rated",    stock: 200, desc: "Pack of 3 international bestselling novels. Genres: thriller, romance, self-help. Shipped in gift wrap." },
  { id: 12, name: "Skincare Glow Kit",      price: 54.99,  originalPrice: 79.99,  rating: 4.6, reviews: 678,  category: "Beauty",      emoji: "✨",  seller: "GlowLab Korea",   country: "🇰🇷", badge: "Trending",     stock: 34,  desc: "Complete 5-step Korean skincare routine. Cleanser, toner, serum, moisturizer, SPF. All skin types." },
];

const AGENTS = [
  { id: "aria", name: "Aria", role: "Shopping Guide",  emoji: "👩‍💼", color: "#FF6B9D", specialty: "fashion, gifts, lifestyle products, finding perfect items for any occasion" },
  { id: "max",  name: "Max",  role: "Tech Expert",     emoji: "🧑‍💻", color: "#4ECDC4", specialty: "electronics, gadgets, gaming, smart devices and technical specifications" },
  { id: "luna", name: "Luna", role: "Deal Hunter",     emoji: "👩‍🎤", color: "#A29BFE", specialty: "discounts, best prices, bundle deals, flash sales and saving money" },
  { id: "raj",  name: "Raj",  role: "Seller Advisor",  emoji: "🧑‍🏫", color: "#00B894", specialty: "selling on GIFT-CART, product listings, shipping, growing your store globally" },
];

const PAYMENT_METHODS = [
  { id: "stripe",  label: "Credit / Debit Card", icon: "💳", desc: "Visa, Mastercard, Amex — Powered by Stripe", real: true },
  { id: "paypal",  label: "PayPal",              icon: "🔵", desc: "Pay with your PayPal balance or linked card", real: true },
  { id: "upi",     label: "UPI / GPay / PhonePe",icon: "📱", desc: "India: Pay instantly with any UPI app", real: true },
  { id: "apple",   label: "Apple Pay",           icon: "🍎", desc: "One-tap payment with Face ID / Touch ID", real: true },
  { id: "google",  label: "Google Pay",          icon: "🔵", desc: "Fast checkout with your Google account", real: true },
  { id: "cod",     label: "Cash on Delivery",    icon: "💵", desc: "Pay cash when your order arrives at door", real: true },
  { id: "bank",    label: "Bank Transfer",       icon: "🏦", desc: "Direct bank transfer — details sent by email", real: true },
  { id: "crypto",  label: "Crypto (USDT/BTC)",   icon: "₿",  desc: "Bitcoin, Ethereum, USDT accepted", real: true },
];

// ─── GIFT SCHEME ──────────────────────────────────────────────────────────────
const GIFT_SCHEME = [
  { minOrder: 0,   maxOrder: 29.99,  gift: "🎀 Mystery Sticker Pack",      desc: "A fun surprise sticker pack worth $5",           value: "$5",   tier: "Bronze" },
  { minOrder: 30,  maxOrder: 49.99,  gift: "🕯️ Mini Scented Candle",        desc: "A beautiful scented candle worth $10",           value: "$10",  tier: "Silver" },
  { minOrder: 50,  maxOrder: 79.99,  gift: "☕ Premium Tea/Coffee Sachet",   desc: "World-class tea or coffee gift pack worth $15",  value: "$15",  tier: "Gold" },
  { minOrder: 80,  maxOrder: 119.99, gift: "💄 Mini Beauty Kit",             desc: "Luxury mini skincare/beauty kit worth $20",      value: "$20",  tier: "Platinum" },
  { minOrder: 120, maxOrder: 199.99, gift: "🧴 Full Skincare Set",           desc: "Premium full-size skincare set worth $35",       value: "$35",  tier: "Diamond" },
  { minOrder: 200, maxOrder: 999999, gift: "🎁 Luxury Gift Hamper",          desc: "Exclusive luxury gift hamper worth $60",         value: "$60",  tier: "VIP" },
];

const TIER_COLORS = {
  Bronze:   { bg: "#CD7F3222", color: "#CD7F32", border: "#CD7F3244" },
  Silver:   { bg: "#C0C0C022", color: "#888",    border: "#C0C0C044" },
  Gold:     { bg: "#FFD93D22", color: "#B8860B", border: "#FFD93D66" },
  Platinum: { bg: "#E5E4E222", color: "#666",    border: "#A9A9A944" },
  Diamond:  { bg: "#b9f2ff22", color: "#0099BB", border: "#b9f2ff88" },
  VIP:      { bg: "#FF6B9D22", color: "#FF6B9D", border: "#FF6B9D66" },
};

function getGiftForOrder(total) {
  return GIFT_SCHEME.find(g => total >= g.minOrder && total <= g.maxOrder) || GIFT_SCHEME[0];
}

function getNextGiftTier(total) {
  return GIFT_SCHEME.find(g => g.minOrder > total);
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <span style={{ color: "#FFD93D", fontSize: 13 }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
      <span style={{ color: "#888", fontSize: 11, marginLeft: 4 }}>{rating}</span>
    </span>
  );
}

function GiftCartLogo({ size = 40, showText = true }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: size, height: size,
        background: "linear-gradient(135deg,#FF6B9D,#FF8E53,#FFD93D)",
        borderRadius: size * 0.28, display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: size * 0.52,
        boxShadow: "0 4px 15px rgba(255,107,157,0.5)",
        position: "relative", flexShrink: 0,
      }}>
        🎁
        <div style={{
          position: "absolute", top: -4, right: -4,
          width: size * 0.32, height: size * 0.32,
          background: "#FFD93D", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: size * 0.18, border: "2px solid #fff",
        }}>🛒</div>
      </div>
      {showText && (
        <div>
          <div style={{
            fontFamily: "Georgia, serif", fontWeight: 700, fontSize: size * 0.55,
            background: "linear-gradient(135deg,#FF6B9D,#FF8E53)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px", lineHeight: 1,
          }}>GIFT-CART</div>
          <div style={{ fontSize: size * 0.22, color: "#888", letterSpacing: "2px", textTransform: "uppercase" }}>Shop the World</div>
        </div>
      )}
    </div>
  );
}

// ─── REAL ORDER SYSTEM ────────────────────────────────────────────────────────
function sendRealOrder(orderData) {
  // Sends order via WhatsApp to owner + opens email
  const items = orderData.items.map(i => `${i.emoji} ${i.name} x${i.qty} = $${(i.price * i.qty).toFixed(2)}`).join("\n");
  const msg = `🎁 NEW GIFT-CART ORDER!\n\n👤 Customer: ${orderData.name}\n📧 Email: ${orderData.email}\n📱 Phone: ${orderData.phone}\n📦 Address: ${orderData.address}, ${orderData.city}, ${orderData.country}\n\n🛍️ ITEMS:\n${items}\n\n💰 Total: $${orderData.total}\n💳 Payment: ${orderData.payment}\n\n📋 Order ID: ${orderData.orderId}`;
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g,"")}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, "_blank");
}

// ─── CHECKOUT MODAL ───────────────────────────────────────────────────────────
function CheckoutModal({ cartItems, cartTotal, onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [payMethod, setPayMethod] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [orderId] = useState("GC-" + Math.random().toString(36).slice(2,8).toUpperCase());
  const [addr, setAddr] = useState({ name:"", email:"", phone:"", address:"", city:"", country:"", zip:"" });
  const [errors, setErrors] = useState({});

  const tax = cartTotal * 0.08;
  const shipping = cartTotal > 50 ? 0 : 4.99;
  const grandTotal = (cartTotal + tax + shipping).toFixed(2);

  const validate = () => {
    const e = {};
    if (!addr.name.trim()) e.name = "Required";
    if (!addr.email.includes("@")) e.email = "Valid email required";
    if (!addr.phone.trim()) e.phone = "Required";
    if (!addr.address.trim()) e.address = "Required";
    if (!addr.city.trim()) e.city = "Required";
    if (!addr.country.trim()) e.country = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      // Send real WhatsApp notification to owner
      sendRealOrder({
        ...addr,
        items: cartItems,
        total: grandTotal,
        payment: PAYMENT_METHODS.find(p => p.id === payMethod)?.label,
        orderId,
      });
      setStep(5);
    }, 2000);
  };

  const Field = ({ placeholder, field, type = "text" }) => (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={addr[field]}
        onChange={e => setAddr(a => ({ ...a, [field]: e.target.value }))}
        style={{
          border: `2px solid ${errors[field] ? "#FF6B9D" : "#f0f0f0"}`,
          borderRadius: 12, padding: "12px 14px", fontSize: 14,
          outline: "none", width: "100%", background: "#FAFAFA",
        }}
        onFocus={e => e.target.style.borderColor = "#FF6B9D"}
        onBlur={e => e.target.style.borderColor = errors[field] ? "#FF6B9D" : "#f0f0f0"}
      />
      {errors[field] && <div style={{ color: "#FF6B9D", fontSize: 11, marginTop: 2 }}>{errors[field]}</div>}
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 3000, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      onClick={e => e.target === e.currentTarget && step < 5 && onClose()}>
      <div style={{ width: "100%", maxWidth: 520, background: "#fff", borderRadius: "28px 28px 0 0", maxHeight: "94vh", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 -12px 60px rgba(0,0,0,0.3)" }}>

        {/* Header */}
        <div style={{ padding: "18px 22px", background: "linear-gradient(135deg,#FF6B9D,#FF8E53)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 17 }}>
              {step===1?"📦 Delivery Details":step===2?"💳 Payment Method":step===3?"✅ Confirm Order":"🎉 Order Placed!"}
            </div>
            {step < 4 && <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, marginTop: 2 }}>Step {step} of 3</div>}
          </div>
          {step < 4 && <button onClick={onClose} style={{ background: "rgba(255,255,255,0.25)", border: "none", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", color: "#fff", fontSize: 16 }}>✕</button>}
        </div>

        {/* Progress */}
        {step < 4 && (
          <div style={{ display: "flex", padding: "10px 22px 0", gap: 6 }}>
            {[1,2,3].map(s => <div key={s} style={{ flex: 1, height: 4, borderRadius: 4, background: s <= step ? "linear-gradient(90deg,#FF6B9D,#FF8E53)" : "#f0f0f0", transition: "all 0.4s" }} />)}
          </div>
        )}

        <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px 28px" }}>

          {/* STEP 1: ADDRESS */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ background: "#F0FFF8", border: "1px solid #b2f5d6", borderRadius: 12, padding: "10px 14px", fontSize: 13, color: "#00875A", fontWeight: 600 }}>
                🔒 Your details are private and used only to deliver your order
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Field placeholder="Full Name *" field="name" />
                <Field placeholder="Phone / WhatsApp *" field="phone" />
              </div>
              <Field placeholder="Email Address *" field="email" type="email" />
              <Field placeholder="Street Address *" field="address" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Field placeholder="City *" field="city" />
                <Field placeholder="ZIP / PIN Code" field="zip" />
              </div>
              <Field placeholder="Country *" field="country" />

              {/* Order Summary */}
              <div style={{ background: "#FFF5F8", borderRadius: 16, padding: 14, marginTop: 4 }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>🛍️ Order Summary</div>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5, color: "#555" }}>
                    <span>{item.emoji} {item.name} ×{item.qty}</span>
                    <span style={{ fontWeight: 600 }}>${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px dashed #FFD0E0", paddingTop: 8, marginTop: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 3 }}><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 3 }}><span>Shipping</span><span style={{ color: shipping===0?"#00B894":"#555" }}>{shipping===0?"FREE 🎉":`$${shipping.toFixed(2)}`}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 6 }}><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16, color: "#FF6B9D" }}><span>Total</span><span>${grandTotal}</span></div>
                </div>
              </div>

              <button onClick={() => validate() && setStep(2)} style={{ background: "linear-gradient(135deg,#FF6B9D,#FF8E53)", color: "#fff", border: "none", borderRadius: 16, padding: "15px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
                Continue to Payment →
              </button>
            </div>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ background: "#F0FFF8", border: "1px solid #b2f5d6", borderRadius: 12, padding: "10px 14px", fontSize: 13, color: "#00875A", fontWeight: 600 }}>
                🔒 All payment methods are 100% secure. Choose what works for you!
              </div>
              {PAYMENT_METHODS.map(pm => (
                <button key={pm.id} onClick={() => setPayMethod(pm.id)} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  border: `2px solid ${payMethod===pm.id?"#FF6B9D":"#f0f0f0"}`,
                  borderRadius: 16, padding: "13px 16px",
                  background: payMethod===pm.id?"#FFF5F8":"#fff",
                  cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                }}>
                  <div style={{ fontSize: 26, width: 36, textAlign: "center" }}>{pm.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>{pm.label}</div>
                    <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{pm.desc}</div>
                  </div>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${payMethod===pm.id?"#FF6B9D":"#ddd"}`, background: payMethod===pm.id?"#FF6B9D":"#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {payMethod===pm.id && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
                  </div>
                </button>
              ))}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4, alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "#aaa" }}>Secured by:</span>
                {["🔒 SSL","⚡ Stripe","🔵 PayPal","₿ Crypto"].map(b => <span key={b} style={{ background: "#f5f5f5", borderRadius: 8, padding: "3px 8px", fontSize: 11, fontWeight: 600, color: "#555" }}>{b}</span>)}
              </div>
              <button onClick={() => payMethod && setStep(3)} style={{ background: payMethod?"linear-gradient(135deg,#FF6B9D,#FF8E53)":"#f0f0f0", color: payMethod?"#fff":"#bbb", border: "none", borderRadius: 16, padding: "15px", fontWeight: 800, fontSize: 15, cursor: payMethod?"pointer":"not-allowed", transition: "all 0.3s" }}>
                Review Order →
              </button>
              <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "#aaa", fontSize: 13, cursor: "pointer" }}>← Back</button>
            </div>
          )}

          {/* STEP 3: CONFIRM */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: "#F8F9FF", borderRadius: 16, padding: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>📦 Delivering To</div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>
                  <b>{addr.name}</b> · {addr.phone}<br/>
                  {addr.address}, {addr.city}, {addr.country} {addr.zip}<br/>
                  📧 {addr.email}
                </div>
              </div>
              <div style={{ background: "#F8F9FF", borderRadius: 16, padding: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>💳 Payment</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{PAYMENT_METHODS.find(p=>p.id===payMethod)?.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{PAYMENT_METHODS.find(p=>p.id===payMethod)?.label}</span>
                </div>
              </div>
              <div style={{ background: "#FFF5F8", borderRadius: 16, padding: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>🛍️ Your Items</div>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 24 }}>{item.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: "#aaa" }}>Qty: {item.qty} · Seller: {item.seller} {item.country}</div>
                    </div>
                    <span style={{ fontWeight: 700, color: "#FF6B9D" }}>${(item.price*item.qty).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px dashed #FFD0E0", paddingTop: 10, marginTop: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 17, color: "#FF6B9D" }}><span>Grand Total</span><span>${grandTotal}</span></div>
                </div>
              </div>

              <div style={{ background: "#FFF9E6", border: "1px solid #FFD93D", borderRadius: 12, padding: "12px 14px", fontSize: 12, color: "#886600", lineHeight: 1.6 }}>
                ℹ️ After placing your order, you will receive a <b>WhatsApp confirmation</b> from us. For card/bank payments, payment details will be sent to your email within 10 minutes.
              </div>

              <button onClick={handlePay} disabled={processing} style={{
                background: processing?"#f0f0f0":"linear-gradient(135deg,#00B894,#00CEC9)",
                color: processing?"#aaa":"#fff", border: "none", borderRadius: 16,
                padding: "16px", fontWeight: 800, fontSize: 16, cursor: processing?"not-allowed":"pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              }}>
                {processing ? (
                  <><div style={{ width: 18, height: 18, border: "3px solid #ddd", borderTopColor: "#FF6B9D", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />Processing...</>
                ) : `✅ Place Order — $${grandTotal}`}
              </button>
              <button onClick={() => setStep(2)} style={{ background: "none", border: "none", color: "#aaa", fontSize: 13, cursor: "pointer" }}>← Change Payment</button>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 5 && (
            <div style={{ textAlign: "center", padding: "10px 0 20px" }}>
              <div style={{ fontSize: 72, marginBottom: 12 }}>🎉</div>
              <h2 style={{ fontFamily: "Georgia,serif", color: "#1a1a2e", margin: "0 0 8px" }}>Order Placed!</h2>
              <p style={{ color: "#666", fontSize: 14, margin: "0 0 6px" }}>Order ID: <b style={{ color: "#FF6B9D" }}>{orderId}</b></p>
              <p style={{ color: "#666", fontSize: 13, margin: "0 0 20px", lineHeight: 1.6 }}>
                A WhatsApp message was sent to confirm your order. Confirmation email will arrive at <b>{addr.email}</b> within 10 minutes.
              </p>
              <div style={{ background: "#F0FFF8", borderRadius: 20, padding: 18, marginBottom: 20 }}>
                <div style={{ color: "#00B894", fontWeight: 800, fontSize: 15, marginBottom: 12 }}>✅ What happens next?</div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 2, textAlign: "left" }}>
                  1️⃣ We confirm your order within 1 hour<br/>
                  2️⃣ Payment instructions sent to your email<br/>
                  3️⃣ Seller ships your product in 1-3 days<br/>
                  4️⃣ You receive tracking number by WhatsApp<br/>
                  5️⃣ Product delivered to your door 📦
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => { onSuccess(); onClose(); }} style={{ flex: 1, background: "linear-gradient(135deg,#FF6B9D,#FF8E53)", color: "#fff", border: "none", borderRadius: 16, padding: "13px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Continue Shopping 🛍️</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── AI AGENT CHAT ────────────────────────────────────────────────────────────
function AgentChat({ agent, product, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const greeting = product
      ? `Hi! I'm ${agent.name}, your ${agent.role} at GIFT-CART! 🎉 I see you're looking at **${product.name}** — great choice! It's from ${product.seller} and has ${product.reviews.toLocaleString()} reviews with a ${product.rating} rating. What would you like to know?`
      : `Hi! I'm ${agent.name}, your ${agent.role} at GIFT-CART! I can help you find the perfect products, compare prices, and answer any questions. What are you looking for today?`;
    setMessages([{ role: "assistant", text: greeting }]);
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(m => [...m, { role: "user", text: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          system: `You are ${agent.name}, a friendly AI sales agent for GIFT-CART — a global e-commerce marketplace. Your role: ${agent.role}. Specialty: ${agent.specialty}. ${product ? `Customer is viewing: "${product.name}" priced at $${product.price} (was $${product.originalPrice}). Seller: ${product.seller}. ${product.desc}` : ""} Be warm, helpful, conversational. Use emojis. Keep responses to 2-3 sentences max. Help customers buy. GIFT-CART ships worldwide, accepts all payment methods, has 30-day returns.`,
          messages: [...messages.map(m => ({ role: m.role==="user"?"user":"assistant", content: m.text })), { role: "user", content: userMsg }],
        }),
      });
      const data = await res.json();
      const reply = data.content?.find(b => b.type==="text")?.text || "I'm having trouble connecting right now. Please try again or contact us on WhatsApp!";
      setMessages(m => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", text: "Connection issue! Please WhatsApp us directly for help 😊" }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 2000, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ width: "100%", maxWidth: 480, background: "#fff", borderRadius: "24px 24px 0 0", height: "78vh", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 -8px 40px rgba(0,0,0,0.2)" }}>
        <div style={{ padding: "14px 18px", background: `linear-gradient(135deg,${agent.color}22,${agent.color}11)`, borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg,${agent.color},${agent.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{agent.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{agent.name}</div>
            <div style={{ fontSize: 11, color: "#00B894", fontWeight: 600 }}>● Online now</div>
          </div>
          <button onClick={onClose} style={{ background: "#f0f0f0", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role==="user"?"flex-end":"flex-start" }}>
              {m.role==="assistant" && <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${agent.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, marginRight: 8, flexShrink: 0 }}>{agent.emoji}</div>}
              <div style={{ maxWidth: "80%", background: m.role==="user"?`linear-gradient(135deg,#FF6B9D,#FF8E53)`:"#F8F8FF", color: m.role==="user"?"#fff":"#1a1a2e", borderRadius: m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px", padding: "10px 13px", fontSize: 13, lineHeight: 1.5 }}>{m.text}</div>
            </div>
          ))}
          {loading && <div style={{ display: "flex", gap: 5, padding: "8px" }}>{[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: agent.color, animation: `bounce 1s ${i*0.2}s infinite` }} />)}</div>}
          <div ref={bottomRef} />
        </div>
        {messages.length === 1 && (
          <div style={{ padding: "0 14px 8px", display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Is this in stock?","What's the delivery time?","Can I get a discount?","Tell me more"].map(s => (
              <button key={s} onClick={() => setInput(s)} style={{ background: "#F0F4FF", border: "1px solid #E0E7FF", color: "#6C5CE7", borderRadius: 20, padding: "5px 12px", fontSize: 11, cursor: "pointer", fontWeight: 500 }}>{s}</button>
            ))}
          </div>
        )}
        <div style={{ padding: "10px 14px", borderTop: "1px solid #f0f0f0", display: "flex", gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter" && send()}
            placeholder={`Ask ${agent.name}...`}
            style={{ flex: 1, border: "2px solid #f0f0f0", borderRadius: 20, padding: "10px 14px", fontSize: 13, outline: "none" }}
            onFocus={e => e.target.style.borderColor = agent.color}
            onBlur={e => e.target.style.borderColor = "#f0f0f0"} />
          <button onClick={send} style={{ background: `linear-gradient(135deg,${agent.color},#FF8E53)`, border: "none", borderRadius: 20, padding: "10px 16px", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 16 }}>→</button>
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ product, onChat, onAddCart, onBuyNow }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", position: "relative", transition: "transform 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.transform="translateY(-4px)"}
      onMouseLeave={e => e.currentTarget.style.transform=""}>
      {product.badge && (
        <div style={{ position: "absolute", top: 10, left: 10, zIndex: 2, background: product.badge==="Flash Deal"?"linear-gradient(135deg,#FF6B9D,#FF8E53)":product.badge==="Bestseller"?"linear-gradient(135deg,#6C5CE7,#A29BFE)":product.badge==="Top Rated"?"linear-gradient(135deg,#00B894,#55EFC4)":"linear-gradient(135deg,#FFD93D,#FDCB6E)", color: product.badge==="Eco-Friendly"?"#1a1a2e":"#fff", borderRadius: 20, padding: "3px 10px", fontSize: 10, fontWeight: 700 }}>{product.badge}</div>
      )}
      <button onClick={() => setWished(!wished)} style={{ position: "absolute", top: 8, right: 10, zIndex: 2, background: "none", border: "none", cursor: "pointer", fontSize: 20, filter: wished?"none":"grayscale(1)" }}>❤️</button>
      <div style={{ height: 140, background: "linear-gradient(135deg,#FFF5F8,#FFF9F0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 68 }}>{product.emoji}</div>
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ fontSize: 10, color: "#aaa", marginBottom: 2 }}>{product.country} {product.seller}</div>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#1a1a2e", marginBottom: 4, lineHeight: 1.3 }}>{product.name}</div>
        <Stars rating={product.rating} />
        <div style={{ fontSize: 10, color: "#aaa", marginTop: 1 }}>({product.reviews.toLocaleString()} reviews) · {product.stock} left</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 8 }}>
          <span style={{ fontSize: 17, fontWeight: 800, color: "#FF6B9D" }}>${product.price}</span>
          <span style={{ fontSize: 11, color: "#ccc", textDecoration: "line-through" }}>${product.originalPrice}</span>
          <span style={{ background: "#FFF0F5", color: "#FF6B9D", fontSize: 10, fontWeight: 700, borderRadius: 10, padding: "1px 6px" }}>{discount}% OFF</span>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
          <button onClick={() => { setAdded(true); onAddCart(product); setTimeout(()=>setAdded(false),1500); }} style={{ flex: 1, background: added?"linear-gradient(135deg,#00B894,#55EFC4)":"linear-gradient(135deg,#FF6B9D,#FF8E53)", color: "#fff", border: "none", borderRadius: 10, padding: "8px 0", fontWeight: 700, fontSize: 11, cursor: "pointer", transition: "all 0.3s" }}>{added?"✓ Added!":"Add to Cart"}</button>
          <button onClick={() => onBuyNow(product)} style={{ flex: 1, background: "#1a1a2e", color: "#fff", border: "none", borderRadius: 10, padding: "8px 0", fontWeight: 700, fontSize: 11, cursor: "pointer" }}>Buy Now</button>
        </div>
        <button onClick={() => onChat(product)} style={{ width: "100%", marginTop: 6, background: "#F0F4FF", color: "#6C5CE7", border: "none", borderRadius: 10, padding: "7px", fontWeight: 600, fontSize: 11, cursor: "pointer" }}>💬 Ask AI Agent</button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function GiftCartApp() {
  const [tab, setTab] = useState("home");
  const [cart, setCart] = useState([]);
  const [chatAgent, setChatAgent] = useState(null);
  const [chatProduct, setChatProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState(null);
  const [showSeller, setShowSeller] = useState(false);
  const [notification, setNotification] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState(null);
  const [lang, setLang] = useState("en");

  const notify = msg => { setNotification(msg); setTimeout(() => setNotification(null), 2500); };

  const addToCart = product => {
    setCart(c => {
      const ex = c.find(i => i.id===product.id);
      return ex ? c.map(i => i.id===product.id?{...i,qty:i.qty+1}:i) : [...c,{...product,qty:1}];
    });
    notify(`${product.emoji} Added to cart!`);
  };

  const buyNow = product => {
    setCheckoutItems([{...product, qty:1}]);
    setShowCheckout(true);
  };

  const cartCount = cart.reduce((s,i) => s+i.qty, 0);
  const cartTotal = cart.reduce((s,i) => s+i.price*i.qty, 0);

  const filtered = PRODUCTS.filter(p => {
    const ms = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const mc = !selectedCat || p.category===selectedCat;
    return ms && mc;
  });

  return (
    <div style={{ fontFamily: "Helvetica Neue,Arial,sans-serif", background: "#FAFAFA", minHeight: "100vh", maxWidth: 900, margin: "0 auto" }}>
      <style>{`
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes slideIn{from{transform:translateY(-20px);opacity:0}to{transform:translateY(0);opacity:1}}
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#FF6B9D;border-radius:10px}
      `}</style>

      {/* NOTIFICATION */}
      {notification && <div style={{ position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)", background: "#1a1a2e", color: "#fff", padding: "11px 22px", borderRadius: 50, zIndex: 9999, fontSize: 13, fontWeight: 600, animation: "slideIn 0.3s ease", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", whiteSpace: "nowrap" }}>{notification}</div>}

      {/* HEADER */}
      <div style={{ background: "#fff", padding: "12px 16px", borderBottom: "1px solid #F0F0F0", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <GiftCartLogo size={32} />
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <select value={lang} onChange={e=>setLang(e.target.value)} style={{ border: "1px solid #f0f0f0", borderRadius: 20, padding: "5px 8px", fontSize: 11, background: "#fff", outline: "none", cursor: "pointer" }}>
              {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
            </select>
            <button onClick={() => setShowCart(!showCart)} style={{ background: "linear-gradient(135deg,#FF6B9D,#FF8E53)", border: "none", borderRadius: 20, padding: "7px 12px", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
              🛒 {cartCount>0 && <span style={{ background: "#FFD93D", color: "#1a1a2e", borderRadius: "50%", width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>{cartCount}</span>}
            </button>
          </div>
        </div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search gifts, electronics, fashion worldwide..."
          style={{ width: "100%", border: "2px solid #F0F0F0", borderRadius: 20, padding: "9px 18px", fontSize: 13, outline: "none", background: "#FAFAFA" }}
          onFocus={e=>e.target.style.borderColor="#FF6B9D"} onBlur={e=>e.target.style.borderColor="#f0f0f0"} />
      </div>

      {/* CART DRAWER */}
      {showCart && (
        <div style={{ position: "fixed", top: 0, right: 0, width: 300, height: "100vh", background: "#fff", zIndex: 500, boxShadow: "-8px 0 40px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "18px 16px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Your Cart 🛒</div>
            <button onClick={() => setShowCart(false)} style={{ background: "#f0f0f0", border: "none", borderRadius: "50%", width: 30, height: 30, cursor: "pointer" }}>✕</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
            {cart.length===0 ? (
              <div style={{ textAlign: "center", padding: 40, color: "#aaa" }}>
                <div style={{ fontSize: 44 }}>🛒</div>
                <p>Cart is empty</p>
                <button onClick={() => { setShowCart(false); setTab("shop"); }} style={{ background: "linear-gradient(135deg,#FF6B9D,#FF8E53)", color: "#fff", border: "none", borderRadius: 20, padding: "9px 18px", cursor: "pointer", fontWeight: 600 }}>Start Shopping</button>
              </div>
            ) : cart.map(item => (
              <div key={item.id} style={{ display: "flex", gap: 10, marginBottom: 12, padding: 10, background: "#FAFAFA", borderRadius: 14 }}>
                <div style={{ fontSize: 28 }}>{item.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 12 }}>{item.name}</div>
                  <div style={{ color: "#FF6B9D", fontWeight: 700, fontSize: 13 }}>${item.price} × {item.qty}</div>
                  <div style={{ fontSize: 10, color: "#aaa" }}>{item.seller}</div>
                </div>
                <button onClick={() => setCart(c=>c.filter(i=>i.id!==item.id))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#aaa" }}>🗑️</button>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div style={{ padding: 14, borderTop: "1px solid #f0f0f0" }}>
              {cartTotal <= 50 && <div style={{ fontSize: 11, color: "#888", marginBottom: 8 }}>Add ${(50-cartTotal).toFixed(2)} more for <b style={{ color: "#00B894" }}>FREE shipping!</b></div>}
              {cartTotal > 50 && <div style={{ fontSize: 11, color: "#00B894", fontWeight: 600, marginBottom: 8 }}>✅ You qualify for FREE shipping!</div>}
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16, marginBottom: 12, color: "#FF6B9D" }}>
                <span>Total</span><span>${cartTotal.toFixed(2)}</span>
              </div>
              <button onClick={() => { setCheckoutItems(null); setShowCheckout(true); setShowCart(false); }} style={{ width: "100%", background: "linear-gradient(135deg,#FF6B9D,#FF8E53)", color: "#fff", border: "none", borderRadius: 14, padding: "14px", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                🔒 Secure Checkout
              </button>
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                {["💳","🔵","📱","💵","₿"].map(i => <span key={i} style={{ fontSize: 16 }}>{i}</span>)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TABS */}
      <div style={{ display: "flex", background: "#fff", borderBottom: "1px solid #f0f0f0", position: "sticky", top: 88, zIndex: 90 }}>
        {[{id:"home",label:"🏠 Home"},{id:"shop",label:"🛍 Shop"},{id:"agents",label:"🤖 AI Help"},{id:"sellers",label:"🌍 Sell"},{id:"about",label:"ℹ️ About"}].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "11px 4px", border: "none", background: "none", fontWeight: tab===t.id?700:400, color: tab===t.id?"#FF6B9D":"#888", fontSize: 11, cursor: "pointer", borderBottom: tab===t.id?"3px solid #FF6B9D":"3px solid transparent", transition: "all 0.2s" }}>{t.label}</button>
        ))}
      </div>

      {/* ── HOME ── */}
      {tab==="home" && (
        <div style={{ padding: "18px 14px" }}>
          {/* Hero */}
          <div style={{ background: "linear-gradient(135deg,#FF6B9D,#FF8E53,#FFD93D)", borderRadius: 24, padding: "26px 22px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: -10, top: -10, fontSize: 100, opacity: 0.15 }}>🎁</div>
            <div style={{ position: "relative" }}>
              <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 11, fontWeight: 600, letterSpacing: 2, marginBottom: 6, textTransform: "uppercase" }}>🌍 Real Products · Real Delivery · Worldwide</div>
              <h1 style={{ color: "#fff", fontFamily: "Georgia,serif", fontSize: 24, margin: "0 0 8px", lineHeight: 1.2 }}>Find the Perfect Gift<br/>Delivered to Your Door</h1>
              <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, margin: "0 0 16px" }}>Real sellers · Real products · Secure payments · Worldwide shipping</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={() => setTab("shop")} style={{ background: "#fff", color: "#FF6B9D", border: "none", borderRadius: 20, padding: "9px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Shop Now →</button>
                <button onClick={() => setTab("agents")} style={{ background: "rgba(255,255,255,0.25)", color: "#fff", border: "1px solid rgba(255,255,255,0.5)", borderRadius: 20, padding: "9px 16px", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>🤖 AI Agents</button>
              </div>
            </div>
          </div>

          {/* Trust Bar */}
          <div style={{ background: "#1a1a2e", borderRadius: 18, padding: "14px 18px", marginBottom: 18, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ color: "#FFD93D", fontWeight: 700, fontSize: 12 }}>🔒 Why Buy on GIFT-CART?</span>
            {["✅ Real Products","🚚 Worldwide Shipping","💳 Secure Payments","↩️ 30-Day Returns","📞 WhatsApp Support"].map(t => (
              <span key={t} style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 500 }}>{t}</span>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 20 }}>
            {[{n:"180+",label:"Countries",e:"🌍"},{n:"2M+",label:"Products",e:"📦"},{n:"500K+",label:"Sellers",e:"🏪"},{n:"10M+",label:"Happy Buyers",e:"😊"}].map(s => (
              <div key={s.n} style={{ background: "#fff", borderRadius: 16, padding: "12px 6px", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 20 }}>{s.e}</div>
                <div style={{ fontWeight: 800, fontSize: 14, color: "#1a1a2e" }}>{s.n}</div>
                <div style={{ fontSize: 10, color: "#aaa" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Categories */}
          <div style={{ fontFamily: "Georgia,serif", fontSize: 18, color: "#1a1a2e", marginBottom: 12, fontWeight: 700 }}>Shop by Category</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 22 }}>
            {CATEGORIES.map(cat => (
              <button key={cat.name} onClick={() => { setSelectedCat(cat.name); setTab("shop"); }} style={{ background: "#fff", border: "2px solid #f0f0f0", borderRadius: 16, padding: "12px 4px", cursor: "pointer", textAlign: "center", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=cat.color; e.currentTarget.style.transform="scale(1.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="#f0f0f0"; e.currentTarget.style.transform=""; }}>
                <div style={{ fontSize: 22 }}>{cat.icon}</div>
                <div style={{ fontSize: 10, color: "#666", marginTop: 3, fontWeight: 600 }}>{cat.name}</div>
              </button>
            ))}
          </div>

          {/* Featured */}
          <div style={{ fontFamily: "Georgia,serif", fontSize: 18, color: "#1a1a2e", marginBottom: 12, fontWeight: 700 }}>🔥 Today's Best Deals</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14 }}>
            {PRODUCTS.slice(0,4).map(p => <ProductCard key={p.id} product={p} onChat={prod=>{setChatAgent(AGENTS[0]);setChatProduct(prod);}} onAddCart={addToCart} onBuyNow={buyNow} />)}
          </div>

          {/* Payment Banner */}
          <div style={{ marginTop: 22, background: "linear-gradient(135deg,#F8F9FF,#F0F4FF)", borderRadius: 20, padding: "18px 20px", border: "1px solid #E0E7FF" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 10 }}>💳 We Accept All Payment Methods Worldwide</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["💳 Visa/MC","🔵 PayPal","📱 UPI","🍎 Apple Pay","🔵 Google Pay","💵 Cash","🏦 Bank","₿ Crypto"].map(p => (
                <span key={p} style={{ background: "#fff", border: "1px solid #E0E7FF", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600, color: "#4C5A8C" }}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SHOP ── */}
      {tab==="shop" && (
        <div style={{ padding: "16px 14px" }}>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 16, paddingBottom: 4 }}>
            <button onClick={() => setSelectedCat(null)} style={{ background: !selectedCat?"linear-gradient(135deg,#FF6B9D,#FF8E53)":"#fff", color: !selectedCat?"#fff":"#888", border: "2px solid " + (!selectedCat?"transparent":"#f0f0f0"), borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>All</button>
            {CATEGORIES.map(cat => (
              <button key={cat.name} onClick={() => setSelectedCat(selectedCat===cat.name?null:cat.name)} style={{ background: selectedCat===cat.name?`${cat.color}22`:"#fff", color: selectedCat===cat.name?cat.color:"#888", border: "2px solid "+(selectedCat===cat.name?cat.color:"#f0f0f0"), borderRadius: 20, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>{cat.icon} {cat.name}</button>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#aaa", marginBottom: 12 }}>{filtered.length} products found {selectedCat&&<span style={{ color: "#FF6B9D", fontWeight: 600 }}>in {selectedCat}</span>}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14 }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} onChat={prod=>{setChatAgent(AGENTS[0]);setChatProduct(prod);}} onAddCart={addToCart} onBuyNow={buyNow} />)}
          </div>
          {filtered.length===0 && <div style={{ textAlign: "center", padding: 60, color: "#aaa" }}><div style={{ fontSize: 48 }}>🔍</div><p>No products found. Try a different search!</p></div>}
        </div>
      )}

      {/* ── AI AGENTS ── */}
      {tab==="agents" && (
        <div style={{ padding: "18px 14px" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 44, marginBottom: 8 }}>🤖</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 22, color: "#1a1a2e", fontWeight: 700, marginBottom: 8 }}>Your AI Shopping Team</div>
            <p style={{ color: "#888", fontSize: 13 }}>Available 24/7 in 8 languages. Ask anything — products, prices, delivery, selling!</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 14, marginBottom: 28 }}>
            {AGENTS.map(agent => (
              <div key={agent.id} style={{ background: "#fff", borderRadius: 22, padding: "22px 16px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow=`0 12px 32px ${agent.color}33`; }}
                onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.07)"; }}>
                <div style={{ width: 62, height: 62, borderRadius: "50%", background: `linear-gradient(135deg,${agent.color},${agent.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 12px", boxShadow: `0 6px 20px ${agent.color}44` }}>{agent.emoji}</div>
                <div style={{ fontWeight: 800, fontSize: 16, color: "#1a1a2e", marginBottom: 3 }}>{agent.name}</div>
                <div style={{ fontSize: 11, color: agent.color, fontWeight: 600, marginBottom: 6 }}>{agent.role}</div>
                <div style={{ fontSize: 11, color: "#aaa", marginBottom: 14, lineHeight: 1.4 }}>Expert in {agent.specialty.split(",")[0]}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, marginBottom: 12 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00B894" }} />
                  <span style={{ fontSize: 11, color: "#00B894", fontWeight: 600 }}>Online now</span>
                </div>
                <button onClick={() => { setChatAgent(agent); setChatProduct(null); }} style={{ background: `linear-gradient(135deg,${agent.color},${agent.color}99)`, color: "#fff", border: "none", borderRadius: 18, padding: "8px 16px", fontWeight: 700, fontSize: 12, cursor: "pointer", width: "100%" }}>Chat with {agent.name}</button>
              </div>
            ))}
          </div>

          {/* WhatsApp Support */}
          <div style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", borderRadius: 20, padding: "20px 22px", display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ fontSize: 40 }}>💬</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Need Human Support?</div>
              <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, marginBottom: 12 }}>Chat directly with our team on WhatsApp — orders, tracking, returns, anything!</div>
              <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g,"")}?text=Hi! I need help with GIFT-CART`, "_blank")} style={{ background: "#fff", color: "#25D366", border: "none", borderRadius: 20, padding: "9px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>📱 WhatsApp Us</button>
            </div>
          </div>
        </div>
      )}

      {/* ── SELL ── */}
      {tab==="sellers" && (
        <div style={{ padding: "18px 14px" }}>
          <div style={{ background: "linear-gradient(135deg,#6C5CE7,#A29BFE)", borderRadius: 24, padding: "26px 22px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: -10, top: -10, fontSize: 100, opacity: 0.15 }}>🌍</div>
            <div style={{ position: "relative" }}>
              <h2 style={{ color: "#fff", fontFamily: "Georgia,serif", fontSize: 22, margin: "0 0 8px" }}>Sell Your Products<br/>to the World 🌍</h2>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, margin: "0 0 16px" }}>List your products on GIFT-CART and reach buyers in 180+ countries. We handle payments, you handle shipping!</p>
              <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g,"")}?text=Hi! I want to become a seller on GIFT-CART. My products: `, "_blank")} style={{ background: "#fff", color: "#6C5CE7", border: "none", borderRadius: 20, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>📱 Register via WhatsApp →</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12, marginBottom: 22 }}>
            {[{icon:"🌍",title:"180+ Countries",desc:"Reach global buyers instantly"},{icon:"💰",title:"Keep 90%",desc:"We only take 10% commission"},{icon:"📱",title:"WhatsApp Setup",desc:"Register in minutes via WhatsApp"},{icon:"🚚",title:"You Ship",desc:"Use any courier you prefer"},{icon:"💳",title:"Weekly Payouts",desc:"Get paid to your bank weekly"},{icon:"🤖",title:"AI Agents",desc:"Our AI sells for you 24/7"}].map(b => (
              <div key={b.title} style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{b.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#1a1a2e", marginBottom: 3 }}>{b.title}</div>
                <div style={{ fontSize: 11, color: "#aaa" }}>{b.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#FFF5F8", borderRadius: 20, padding: "20px 22px", border: "1px solid #FFD0E0" }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e", marginBottom: 14 }}>📋 How to Start Selling</div>
            {["WhatsApp us with your product details and photos","We review and approve your listing within 24 hours","Your products go live on GIFT-CART worldwide","Customers order and pay — we notify you instantly","You ship directly to the customer with any courier","We send your payment every week to your bank!"].map((s,i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#FF6B9D,#FF8E53)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{i+1}</div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.5, paddingTop: 4 }}>{s}</div>
              </div>
            ))}
            <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g,"")}?text=Hi! I want to sell on GIFT-CART!`, "_blank")} style={{ width: "100%", background: "linear-gradient(135deg,#25D366,#128C7E)", color: "#fff", border: "none", borderRadius: 16, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 6 }}>💬 Start Selling via WhatsApp</button>
          </div>
        </div>
      )}

      {/* ── ABOUT ── */}
      {tab==="about" && (
        <div style={{ padding: "18px 14px" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <GiftCartLogo size={60} />
            <p style={{ color: "#888", fontSize: 13, marginTop: 12, lineHeight: 1.7 }}>GIFT-CART is a global marketplace connecting buyers and sellers worldwide. We make shopping safe, simple, and delivered to your door anywhere on Earth.</p>
          </div>
          {[{icon:"📦",title:"Real Products",desc:"Every product on GIFT-CART is from a verified real seller. We check quality and authenticity before approving listings."},{icon:"🔒",title:"Secure Payments",desc:"All payments go through secure channels. Card payments via Stripe SSL encryption. Your financial data is never stored."},{icon:"🚚",title:"Worldwide Delivery",desc:"We ship to 180+ countries. Sellers ship directly to you using verified courier partners with real tracking numbers."},{icon:"↩️",title:"30-Day Returns",desc:"Not happy? Return any product within 30 days for a full refund. No questions asked. Customer satisfaction guaranteed."},{icon:"💬",title:"WhatsApp Support",desc:"Our team is available on WhatsApp for order support, tracking, returns, and any questions. Real humans, fast replies."},{icon:"💰",title:"How We Earn",desc:"We charge sellers a small 10% commission on each sale. Buyers pay no extra fees. Transparent and fair pricing always."}].map(item => (
            <div key={item.title} style={{ background: "#fff", borderRadius: 18, padding: "18px 20px", marginBottom: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", gap: 14 }}>
              <div style={{ fontSize: 30, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e", marginBottom: 5 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
          <div style={{ background: "#1a1a2e", borderRadius: 20, padding: "20px 22px", textAlign: "center", marginTop: 8 }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>📞 Contact Us</div>
            <div style={{ color: "#aaa", fontSize: 13, marginBottom: 14 }}>For orders, support, or becoming a seller:</div>
            <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g,"")}`, "_blank")} style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", color: "#fff", border: "none", borderRadius: 20, padding: "11px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>💬 WhatsApp: {WHATSAPP_NUMBER}</button>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <CheckoutModal
          cartItems={checkoutItems || cart}
          cartTotal={(checkoutItems||cart).reduce((s,i)=>s+i.price*i.qty,0)}
          onClose={() => { setShowCheckout(false); setCheckoutItems(null); }}
          onSuccess={() => { setCart([]); setCheckoutItems(null); }}
        />
      )}

      {/* AGENT CHAT */}
      {chatAgent && <AgentChat agent={chatAgent} product={chatProduct} onClose={() => { setChatAgent(null); setChatProduct(null); }} />}

      {/* FLOATING BUTTONS */}
      <div style={{ position: "fixed", bottom: 20, right: 16, zIndex: 200, display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
        <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g,"")}?text=Hi GIFT-CART! I need help.`, "_blank")} style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", border: "none", borderRadius: "50%", width: 44, height: 44, fontSize: 22, cursor: "pointer", boxShadow: "0 4px 16px rgba(37,211,102,0.5)" }}>💬</button>
        <button onClick={() => { setChatAgent(AGENTS[0]); setChatProduct(null); }} style={{ background: "linear-gradient(135deg,#FF6B9D,#FF8E53)", border: "none", borderRadius: 26, padding: "11px 16px", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", boxShadow: "0 6px 24px rgba(255,107,157,0.5)", display: "flex", alignItems: "center", gap: 6 }}>🤖 AI Help</button>
      </div>
    </div>
  );
}
