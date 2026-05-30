import { useState, useEffect, useRef } from "react";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
];

const AGENTS = [
  { id: "aria", name: "Aria", role: "Shopping Guide", emoji: "👩‍💼", color: "#FF6B9D", specialty: "fashion, gifts, lifestyle" },
  { id: "max",  name: "Max",  role: "Tech Expert",    emoji: "🧑‍💻", color: "#4ECDC4", specialty: "electronics, gadgets, gaming" },
  { id: "luna", name: "Luna", role: "Deal Hunter",    emoji: "👩‍🎤", color: "#FFE66D", specialty: "discounts, bundles, flash sales" },
  { id: "raj",  name: "Raj",  role: "Seller Advisor", emoji: "🧑‍🏫", color: "#A29BFE", specialty: "selling, listings, shipping" },
];

const CATEGORIES = [
  { icon: "🎁", name: "Gifts",       color: "#FF6B9D" },
  { icon: "👗", name: "Fashion",     color: "#FD79A8" },
  { icon: "📱", name: "Electronics", color: "#4ECDC4" },
  { icon: "🏠", name: "Home",        color: "#6C5CE7" },
  { icon: "🍎", name: "Grocery",     color: "#00B894" },
  { icon: "💄", name: "Beauty",      color: "#E84393" },
  { icon: "📚", name: "Books",       color: "#FDCB6E" },
  { icon: "⚽", name: "Sports",      color: "#74B9FF" },
  { icon: "🧸", name: "Kids",        color: "#FF7675" },
  { icon: "🌱", name: "Garden",      color: "#55EFC4" },
];

const PRODUCTS = [
  { id: 1, name: "Luxury Gift Hamper", price: 49.99,  originalPrice: 79.99,  rating: 4.8, reviews: 1240, category: "Gifts",       emoji: "🎁",  seller: "GiftWorld Co.",  country: "🇺🇸", badge: "Bestseller",   desc: "Premium curated gift box with chocolates, candles, and self-care items. Perfect for any occasion." },
  { id: 2, name: "Smart Watch Pro",    price: 129.00, originalPrice: 199.00, rating: 4.6, reviews: 890,  category: "Electronics", emoji: "⌚",  seller: "TechNest Ltd.",  country: "🇨🇳", badge: "Flash Deal",   desc: "Advanced smartwatch with heart rate, GPS, sleep tracking, and 7-day battery life." },
  { id: 3, name: "Silk Evening Dress", price: 64.99,  originalPrice: 89.99,  rating: 4.7, reviews: 567,  category: "Fashion",     emoji: "👗",  seller: "StyleHub Paris", country: "🇫🇷", badge: "Trending",     desc: "Elegant silk blend evening dress, available in 12 colors and all international sizes." },
  { id: 4, name: "Aromatherapy Set",   price: 34.99,  originalPrice: 54.99,  rating: 4.9, reviews: 2103, category: "Beauty",      emoji: "🕯️",  seller: "WellnessWorld",  country: "🇬🇧", badge: "Top Rated",    desc: "Set of 6 essential oil blends with diffuser. Lavender, eucalyptus, and more." },
  { id: 5, name: "Kids LEGO City Set", price: 42.00,  originalPrice: 60.00,  rating: 4.8, reviews: 734,  category: "Kids",        emoji: "🧱",  seller: "PlayZone Kids",  country: "🇩🇪", badge: "Sale",         desc: "600-piece LEGO city building set for ages 7+. Includes 4 mini-figures." },
  { id: 6, name: "Wireless Earbuds",   price: 59.99,  originalPrice: 89.99,  rating: 4.5, reviews: 1876, category: "Electronics", emoji: "🎧",  seller: "SoundWave Inc.", country: "🇰🇷", badge: "Flash Deal",   desc: "True wireless earbuds with active noise cancellation and 30-hour total battery." },
  { id: 7, name: "Coffee Gift Set",    price: 38.50,  originalPrice: 55.00,  rating: 4.7, reviews: 429,  category: "Gifts",       emoji: "☕",  seller: "BeanBox Direct", country: "🇮🇹", badge: "New",          desc: "World coffee tour — 8 single-origin roasts from 8 countries, freshly ground." },
  { id: 8, name: "Yoga Mat Premium",   price: 45.00,  originalPrice: 65.00,  rating: 4.6, reviews: 983,  category: "Sports",      emoji: "🧘",  seller: "ZenFit Global",  country: "🇮🇳", badge: "Eco-Friendly", desc: "Non-slip, eco TPE yoga mat 6mm thick. Alignment lines, carrying strap included." },
];

const SELLERS = [
  { name: "GiftWorld Co.",  country: "🇺🇸", rating: 4.9, sales: "12K+", verified: true },
  { name: "TechNest Ltd.",  country: "🇨🇳", rating: 4.7, sales: "45K+", verified: true },
  { name: "StyleHub Paris", country: "🇫🇷", rating: 4.8, sales: "8K+",  verified: true },
  { name: "WellnessWorld",  country: "🇬🇧", rating: 4.9, sales: "21K+", verified: true },
];

const PAYMENT_METHODS = [
  { id: "card",   label: "Credit / Debit Card", icon: "💳", desc: "Visa, Mastercard, Amex, UnionPay" },
  { id: "paypal", label: "PayPal",              icon: "🅿️", desc: "Pay with your PayPal balance or linked card" },
  { id: "apple",  label: "Apple Pay",           icon: "🍎", desc: "One-tap payment with Face ID / Touch ID" },
  { id: "google", label: "Google Pay",          icon: "🔵", desc: "Fast checkout with your Google account" },
  { id: "stripe", label: "Stripe",              icon: "⚡", desc: "Secure global payments powered by Stripe" },
  { id: "crypto", label: "Crypto",              icon: "₿",  desc: "Bitcoin, Ethereum, USDT & more" },
  { id: "cod",    label: "Cash on Delivery",    icon: "💵", desc: "Pay when your order arrives at your door" },
  { id: "bank",   label: "Bank Transfer",       icon: "🏦", desc: "Direct transfer from your bank account" },
];

// ─── LOGO ─────────────────────────────────────────────────────────────────────
function GiftCartLogo({ size = 40, showText = true }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: size, height: size,
        background: "linear-gradient(135deg, #FF6B9D 0%, #FF8E53 50%, #FFD93D 100%)",
        borderRadius: size * 0.28,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: size * 0.52,
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
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}>🛒</div>
      </div>
      {showText && (
        <div>
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700, fontSize: size * 0.55,
            background: "linear-gradient(135deg, #FF6B9D, #FF8E53)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px", lineHeight: 1,
          }}>GIFT-CART</div>
          <div style={{ fontSize: size * 0.22, color: "#888", fontFamily: "Helvetica Neue, sans-serif", letterSpacing: "2px", textTransform: "uppercase" }}>Shop the World</div>
        </div>
      )}
    </div>
  );
}

function Stars({ rating }) {
  return (
    <span style={{ color: "#FFD93D", fontSize: 13 }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
      <span style={{ color: "#888", fontSize: 11, marginLeft: 4 }}>{rating}</span>
    </span>
  );
}

// ─── PAYMENT CHECKOUT MODAL ────────────────────────────────────────────────────
function CheckoutModal({ cartItems, cartTotal, onClose, onSuccess }) {
  const [step, setStep] = useState(1); // 1=address, 2=payment method, 3=card details, 4=confirm, 5=success
  const [payMethod, setPayMethod] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [addr, setAddr] = useState({ name: "", email: "", phone: "", address: "", city: "", country: "", zip: "" });
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", holder: "" });
  const [errors, setErrors] = useState({});

  const tax = cartTotal * 0.08;
  const shipping = cartTotal > 50 ? 0 : 4.99;
  const grandTotal = cartTotal + tax + shipping;

  const formatCard = (val) => val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (val) => {
    const d = val.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  };

  const validateAddr = () => {
    const e = {};
    if (!addr.name.trim()) e.name = "Required";
    if (!addr.email.includes("@")) e.email = "Valid email required";
    if (!addr.address.trim()) e.address = "Required";
    if (!addr.city.trim()) e.city = "Required";
    if (!addr.country.trim()) e.country = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = () => {
    if (payMethod === "card" && (!card.number || !card.expiry || !card.cvv || !card.holder)) {
      setErrors({ card: "Please fill in all card details" });
      return;
    }
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setStep(5); }, 2200);
  };

  const inp = (placeholder, field, obj, setObj, fmt) => (
    <input
      placeholder={placeholder}
      value={obj[field]}
      onChange={e => setObj(o => ({ ...o, [field]: fmt ? fmt(e.target.value) : e.target.value }))}
      style={{
        border: `2px solid ${errors[field] ? "#FF6B9D" : "#f0f0f0"}`,
        borderRadius: 12, padding: "11px 14px", fontSize: 14, outline: "none",
        width: "100%", background: "#FAFAFA", transition: "border-color 0.2s",
      }}
      onFocus={e => e.target.style.borderColor = "#FF6B9D"}
      onBlur={e => e.target.style.borderColor = errors[field] ? "#FF6B9D" : "#f0f0f0"}
    />
  );

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)",
      zIndex: 2000, display: "flex", alignItems: "flex-end", justifyContent: "center",
    }} onClick={e => e.target === e.currentTarget && step !== 5 && onClose()}>
      <div style={{
        width: "100%", maxWidth: 520,
        background: "#fff", borderRadius: "28px 28px 0 0",
        maxHeight: "92vh", display: "flex", flexDirection: "column",
        overflow: "hidden", boxShadow: "0 -12px 60px rgba(0,0,0,0.25)",
        animation: "slideUp 0.35s cubic-bezier(.22,.61,.36,1)",
      }}>

        {/* ── HEADER ── */}
        <div style={{
          padding: "18px 22px 14px",
          background: "linear-gradient(135deg,#FF6B9D,#FF8E53)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 18, fontFamily: "'Playfair Display',serif" }}>
              {step === 1 ? "📦 Delivery Address"
               : step === 2 ? "💳 Payment Method"
               : step === 3 ? "🔐 Card Details"
               : step === 4 ? "✅ Confirm Order"
               : "🎉 Order Confirmed!"}
            </div>
            {step < 5 && <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 2 }}>Step {step} of 4</div>}
          </div>
          {step < 5 && (
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.25)", border: "none", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", color: "#fff", fontSize: 16 }}>✕</button>
          )}
        </div>

        {/* ── STEP INDICATOR ── */}
        {step < 5 && (
          <div style={{ display: "flex", padding: "12px 22px 0", gap: 6 }}>
            {[1,2,3,4].map(s => (
              <div key={s} style={{
                flex: 1, height: 4, borderRadius: 4,
                background: s <= step ? "linear-gradient(90deg,#FF6B9D,#FF8E53)" : "#f0f0f0",
                transition: "all 0.4s",
              }} />
            ))}
          </div>
        )}

        <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px 24px" }}>

          {/* ── STEP 1: ADDRESS ── */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>{inp("Full Name *", "name", addr, setAddr)}{errors.name && <div style={{ color: "#FF6B9D", fontSize: 11, marginTop: 2 }}>{errors.name}</div>}</div>
                <div>{inp("Phone Number", "phone", addr, setAddr)}</div>
              </div>
              <div>{inp("Email Address *", "email", addr, setAddr)}{errors.email && <div style={{ color: "#FF6B9D", fontSize: 11, marginTop: 2 }}>{errors.email}</div>}</div>
              <div>{inp("Street Address *", "address", addr, setAddr)}{errors.address && <div style={{ color: "#FF6B9D", fontSize: 11, marginTop: 2 }}>{errors.address}</div>}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>{inp("City *", "city", addr, setAddr)}{errors.city && <div style={{ color: "#FF6B9D", fontSize: 11, marginTop: 2 }}>{errors.city}</div>}</div>
                <div>{inp("ZIP / Postal Code", "zip", addr, setAddr)}</div>
              </div>
              <div>{inp("Country *", "country", addr, setAddr)}{errors.country && <div style={{ color: "#FF6B9D", fontSize: 11, marginTop: 2 }}>{errors.country}</div>}</div>

              {/* Order summary mini */}
              <div style={{ background: "#FFF5F8", borderRadius: 16, padding: 14, marginTop: 6 }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: "#1a1a2e" }}>Order Summary</div>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6, color: "#555" }}>
                    <span>{item.emoji} {item.name} ×{item.qty}</span>
                    <span style={{ fontWeight: 600 }}>${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px dashed #FFD0E0", paddingTop: 8, marginTop: 4 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 4 }}>
                    <span>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 4 }}>
                    <span>Shipping</span><span style={{ color: shipping === 0 ? "#00B894" : "#555" }}>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 6 }}>
                    <span>Tax (8%)</span><span>${tax.toFixed(2)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 15, color: "#FF6B9D" }}>
                    <span>Total</span><span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button onClick={() => { if (validateAddr()) setStep(2); }} style={{
                background: "linear-gradient(135deg,#FF6B9D,#FF8E53)", color: "#fff",
                border: "none", borderRadius: 16, padding: "14px", fontWeight: 700,
                fontSize: 15, cursor: "pointer", marginTop: 4,
              }}>Continue to Payment →</button>
            </div>
          )}

          {/* ── STEP 2: PAYMENT METHOD ── */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ color: "#888", fontSize: 13, margin: "0 0 6px" }}>Choose how you'd like to pay. All payments are secured with 256-bit SSL encryption. 🔒</p>
              {PAYMENT_METHODS.map(pm => (
                <button key={pm.id} onClick={() => setPayMethod(pm.id)} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  border: `2px solid ${payMethod === pm.id ? "#FF6B9D" : "#f0f0f0"}`,
                  borderRadius: 16, padding: "14px 16px",
                  background: payMethod === pm.id ? "#FFF5F8" : "#fff",
                  cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                  boxShadow: payMethod === pm.id ? "0 4px 20px rgba(255,107,157,0.15)" : "none",
                }}>
                  <div style={{ fontSize: 28, width: 40, textAlign: "center" }}>{pm.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>{pm.label}</div>
                    <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{pm.desc}</div>
                  </div>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%",
                    border: `2px solid ${payMethod === pm.id ? "#FF6B9D" : "#ddd"}`,
                    background: payMethod === pm.id ? "#FF6B9D" : "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>{payMethod === pm.id && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}</div>
                </button>
              ))}

              {/* Accepted cards logos row */}
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, color: "#aaa" }}>Accepted:</span>
                {["VISA","MC","AMEX","PayPal","Stripe","₿"].map(logo => (
                  <div key={logo} style={{ background: "#f5f5f5", borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 700, color: "#555" }}>{logo}</div>
                ))}
              </div>

              <button onClick={() => { if (!payMethod) return; payMethod === "card" ? setStep(3) : setStep(4); }} style={{
                background: payMethod ? "linear-gradient(135deg,#FF6B9D,#FF8E53)" : "#f0f0f0",
                color: payMethod ? "#fff" : "#bbb",
                border: "none", borderRadius: 16, padding: "14px", fontWeight: 700, fontSize: 15,
                cursor: payMethod ? "pointer" : "not-allowed", marginTop: 4,
                transition: "all 0.3s",
              }}>Continue →</button>

              <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "#aaa", fontSize: 13, cursor: "pointer" }}>← Back to Address</button>
            </div>
          )}

          {/* ── STEP 3: CARD DETAILS ── */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Card preview */}
              <div style={{
                background: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)",
                borderRadius: 20, padding: "24px 22px", color: "#fff",
                position: "relative", overflow: "hidden", minHeight: 160,
              }}>
                <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                <div style={{ position: "absolute", bottom: -30, left: 60, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,107,157,0.1)" }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24, position: "relative" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 16, color: "#FF6B9D" }}>GIFT-CART</div>
                  <div style={{ fontSize: 22 }}>💳</div>
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 18, letterSpacing: 3, marginBottom: 16, position: "relative" }}>
                  {card.number || "•••• •••• •••• ••••"}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, position: "relative" }}>
                  <div>
            
