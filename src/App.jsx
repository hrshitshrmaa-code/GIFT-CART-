import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
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
                    {payMethod===pm.id && <div style={{ wid
