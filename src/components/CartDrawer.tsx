import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Check, Trees, ShieldCheck, Sparkles, Tag, Truck } from 'lucide-react';
import { CartItem, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { formatINR, incrementStoredTrees, updateAnalytics } from '../utils/helpers';
import { ProductIllustration } from './BotanicalArtwork';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, isRefill?: boolean) => void;
  onRemoveItem: (productId: string, isRefill?: boolean) => void;
  onClearCart: () => void;
  onTreePlanted: (count: number) => void;
  onAddToCart?: (product: Product, quantity?: number, isRefill?: boolean) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onTreePlanted,
  onAddToCart
}) => {
  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Checkout modal state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState<{ orderId: string; trees: number; total: number } | null>(null);

  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi'>('upi');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  // Pricing calculations
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => {
    const unitPrice = item.isRefill ? Math.round(item.product.price * 0.5) : item.product.price;
    return acc + unitPrice * item.quantity;
  }, 0);

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const FREE_SHIPPING_THRESHOLD = 999;
  const isFreeShippingUnlocked = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const shipping = isFreeShippingUnlocked || subtotal === 0 ? 0 : 99;
  const finalTotal = subtotal - discountAmount + shipping;

  // 1-Click Cross-Sell Candidate: pick an item not in cart, or default to Vetiver Mist / Sandalwood Polish
  const crossSellProduct =
    PRODUCTS.find(
      (p) => !cart.some((item) => item.product.id === p.id) && (p.id === 'prod-vetiver-moringa-mist' || p.id === 'prod-sandalwood-polish')
    ) || PRODUCTS[4];

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'ECOBLOOM15') {
      setDiscountPercent(15);
      setCouponMessage({ text: '15% Eco Welcome discount applied!', isError: false });
    } else if (cleanCode === 'REFILL50') {
      setDiscountPercent(20);
      setCouponMessage({ text: '20% Circularity bonus discount applied!', isError: false });
    } else {
      setCouponMessage({ text: 'Invalid promo code. Try "ECOBLOOM15"', isError: true });
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!customerName.trim()) errors.name = 'Please enter your name';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10)
      errors.phone = 'Valid 10-digit mobile number required';
    if (!address.trim()) errors.address = 'Delivery address required';
    if (!city.trim()) errors.city = 'City required';
    if (!pincode.trim() || pincode.length !== 6) errors.pincode = 'Valid 6-digit Indian pincode required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    const newOrderId = `BNB-${Math.floor(100000 + Math.random() * 900000)}`;
    const treesGained = totalItemCount;

    // Update global persistent tree count
    incrementStoredTrees(treesGained);
    onTreePlanted(treesGained);

    // Update marketing analytics
    updateAnalytics((prev) => ({
      ...prev,
      totalOrders: prev.totalOrders + 1,
      totalRevenue: prev.totalRevenue + finalTotal,
      treesPlantedTotal: prev.treesPlantedTotal + treesGained
    }));

    // Record order in localStorage
    try {
      const orders = JSON.parse(localStorage.getItem('bnb_orders') || '[]');
      orders.push({
        orderId: newOrderId,
        customerName,
        phone,
        email,
        address,
        city,
        pincode,
        itemsCount: totalItemCount,
        total: finalTotal,
        treesPlanted: treesGained,
        date: new Date().toLocaleDateString('en-IN')
      });
      localStorage.setItem('bnb_orders', JSON.stringify(orders));
    } catch {
      // fallback
    }

    setOrderComplete({
      orderId: newOrderId,
      trees: treesGained,
      total: finalTotal
    });

    onClearCart();
  };

  const handleFinish = () => {
    setIsCheckingOut(false);
    setOrderComplete(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#E2DDD5]">
          {/* Header */}
          <div className="p-5 border-b border-[#E8ECE9] flex items-center justify-between bg-[#F5F0EA]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1C3325]" />
              <h2 className="text-lg font-serif font-bold text-[#1C3325]">Your Botanical Bag</h2>
              <span className="text-xs bg-[#1C3325] text-white px-2 py-0.5 rounded-full font-mono font-semibold">
                {totalItemCount}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {orderComplete ? (
              // Order confirmation screen
              <div className="py-8 text-center space-y-5 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#EBF0EC] text-[#2C4836] flex items-center justify-center mx-auto border-2 border-[#758A7A]">
                  <Trees className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-widest text-[#758A7A] font-semibold">
                    Order Confirmed #{orderComplete.orderId}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#1C3325]">
                    Thank you, {customerName}!
                  </h3>
                </div>

                {/* Tree Impact Celebration Banner */}
                <div className="p-4 rounded-2xl bg-[#1C3325] text-white space-y-1 text-center shadow-md">
                  <p className="text-lg font-serif font-bold text-emerald-300">
                    🌱 {orderComplete.trees} Native Tree{orderComplete.trees > 1 ? 's' : ''} Planted In Your Name!
                  </p>
                  <p className="text-xs text-stone-300">
                    Through our partnership with SankalpTaru, your order funds living saplings in the Western Ghats.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E8ECE9] text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Total Paid:</span>
                    <span className="font-bold text-[#1C3325]">{formatINR(orderComplete.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Shipping to:</span>
                    <span className="text-stone-700">{city}, {pincode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Est. Dispatch:</span>
                    <span className="text-stone-700 font-medium">Tomorrow (Plastic-Free Pack)</span>
                  </div>
                </div>

                <button
                  onClick={handleFinish}
                  className="w-full py-3 bg-[#1C3325] text-white text-sm font-semibold rounded-xl hover:bg-[#122118] transition-colors"
                >
                  Continue Exploring
                </button>
              </div>
            ) : isCheckingOut ? (
              // Checkout form screen
              <div className="space-y-5 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8ECE9]">
                  <h3 className="text-base font-serif font-bold text-[#1C3325]">
                    Delivery &amp; Payment Details
                  </h3>
                  <button
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-[#758A7A] hover:underline"
                  >
                    Back to Bag
                  </button>
                </div>

                <form onSubmit={handlePlaceOrder} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ishwari Deshmukh"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-[#D2DCD4] focus:outline-hidden focus:border-[#758A7A]"
                    />
                    {formErrors.name && <p className="text-[11px] text-rose-600 mt-0.5">{formErrors.name}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">Mobile (10 Digits) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-[#D2DCD4] focus:outline-hidden focus:border-[#758A7A]"
                      />
                      {formErrors.phone && <p className="text-[11px] text-rose-600 mt-0.5">{formErrors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="For tracking receipt"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-[#D2DCD4] focus:outline-hidden focus:border-[#758A7A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Street Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="Apartment, building, street"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-[#D2DCD4] focus:outline-hidden focus:border-[#758A7A]"
                    />
                    {formErrors.address && <p className="text-[11px] text-rose-600 mt-0.5">{formErrors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">City *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Pune"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-[#D2DCD4] focus:outline-hidden focus:border-[#758A7A]"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">Pincode *</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="411001"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-[#D2DCD4] focus:outline-hidden focus:border-[#758A7A]"
                      />
                      {formErrors.pincode && <p className="text-[11px] text-rose-600 mt-0.5">{formErrors.pincode}</p>}
                    </div>
                  </div>

                  {/* Payment selection */}
                  <div className="pt-2">
                    <label className="block text-stone-700 font-medium mb-1.5">Payment Method</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-2.5 rounded-lg border text-left flex items-center justify-between ${
                          paymentMethod === 'upi'
                            ? 'border-[#1C3325] bg-[#EBF0EC] font-semibold text-[#1C3325]'
                            : 'border-stone-200 bg-white text-stone-600'
                        }`}
                      >
                        <span>UPI / NetBanking</span>
                        {paymentMethod === 'upi' && <span className="w-2 h-2 rounded-full bg-[#1C3325]" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-2.5 rounded-lg border text-left flex items-center justify-between ${
                          paymentMethod === 'cod'
                            ? 'border-[#1C3325] bg-[#EBF0EC] font-semibold text-[#1C3325]'
                            : 'border-stone-200 bg-white text-stone-600'
                        }`}
                      >
                        <span>Cash on Delivery</span>
                        {paymentMethod === 'cod' && <span className="w-2 h-2 rounded-full bg-[#1C3325]" />}
                      </button>
                    </div>
                  </div>

                  {/* Summary row */}
                  <div className="mt-4 p-3.5 rounded-xl bg-[#F5F0EA] border border-[#E2DDD5] space-y-1.5">
                    <div className="flex justify-between text-stone-600">
                      <span>Order Subtotal:</span>
                      <span className="font-mono">{formatINR(subtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Circularity Promo ({discountPercent}%):</span>
                        <span className="font-mono">-{formatINR(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-stone-600">
                      <span>Carbon-Neutral Shipping:</span>
                      <span className="font-mono">{shipping === 0 ? 'FREE' : formatINR(shipping)}</span>
                    </div>
                    <div className="flex justify-between font-serif font-bold text-sm text-[#1C3325] pt-1.5 border-t border-[#E8ECE9]">
                      <span>Final Amount:</span>
                      <span className="font-mono">{formatINR(finalTotal)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#1C3325] hover:bg-[#122118] text-white text-sm font-semibold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
                  >
                    <span>Confirm Order · {formatINR(finalTotal)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : cart.length === 0 ? (
              // Empty cart
              <div className="h-full flex flex-col items-center justify-center text-center py-16 text-stone-500">
                <ShoppingBag className="w-12 h-12 text-stone-300 mb-3" />
                <p className="font-serif font-bold text-lg text-[#1C3325]">Your bag is empty</p>
                <p className="text-xs text-stone-500 mt-1 max-w-xs font-sans">
                  Explore our cold-pressed elixirs and refillable hair oils to begin your zero-waste ritual.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-6 py-2.5 bg-[#1C3325] text-white text-xs font-semibold rounded-xl"
                >
                  Explore Dispensary
                </button>
              </div>
            ) : (
              // Cart items list with Dynamic Free Shipping Progress Bar
              <div className="space-y-4">
                {/* Dynamic Free Shipping Progress Bar */}
                <div className="p-3.5 rounded-2xl bg-[#EBF0EC] border border-[#D2DCD4] text-xs text-[#2C4836] shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    {isFreeShippingUnlocked ? (
                      <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                        <span>Unlocked Free Carbon-Neutral Shipping!</span>
                      </span>
                    ) : (
                      <span className="font-medium flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#758A7A]" />
                        <span>Add <strong className="font-semibold text-[#1C3325]">{formatINR(remainingForFreeShipping)}</strong> more to unlock Free Shipping</span>
                      </span>
                    )}
                    <span className="font-mono text-[11px] font-bold text-[#1C3325]">
                      {shippingProgress}%
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full h-2 bg-[#D2DCD4] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isFreeShippingUnlocked
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-500 shadow-xs'
                          : 'bg-gradient-to-r from-[#758A7A] to-[#1C3325]'
                      }`}
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-[#E8ECE9]">
                  {cart.map((item) => {
                    const unitPrice = item.isRefill
                      ? Math.round(item.product.price * 0.5)
                      : item.product.price;
                    return (
                      <div key={`${item.product.id}-${item.isRefill ? 'refill' : 'jar'}`} className="py-3.5 flex gap-3">
                        <div className="w-16 h-18 bg-[#F5F0EA] rounded-xl overflow-hidden shrink-0 relative">
                          <ProductIllustration
                            type={item.product.category}
                            accent={item.product.accentColor}
                            name={item.product.name}
                            size={item.product.size}
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between">
                              <h4 className="text-xs font-serif font-bold text-[#1C3325] line-clamp-1">
                                {item.product.name}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(item.product.id, item.isRefill)}
                                className="text-stone-400 hover:text-rose-600 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-stone-500 font-mono mt-0.5">
                              <span>{item.product.size}</span>
                              {item.isRefill && (
                                <span className="text-[#758A7A] font-semibold bg-[#EBF0EC] px-1.5 py-0.2 rounded">
                                  Refill (50% Off)
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-[#D2DCD4] rounded-lg bg-white text-xs">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, item.quantity - 1, item.isRefill)
                                }
                                className="px-2 py-0.5 text-stone-600 hover:text-stone-900"
                              >
                                -
                              </button>
                              <span className="px-2 font-mono font-medium">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, item.quantity + 1, item.isRefill)
                                }
                                className="px-2 py-0.5 text-stone-600 hover:text-stone-900"
                              >
                                +
                              </button>
                            </div>

                            <span className="font-serif font-bold text-sm text-[#1C3325] tabular-nums">
                              {formatINR(unitPrice * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 1-Click Cross-Sell Module */}
                {crossSellProduct && onAddToCart && (
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#F4EFEB] to-[#FAF8F5] border border-[#D2DCD4] shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#758A7A] font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#758A7A]" />
                        <span>Botanical Companion Offer</span>
                      </span>
                      <span className="text-[10px] bg-[#E8C4BE] text-[#162A1F] px-2 py-0.5 rounded-full font-semibold">
                        Popular Add-On
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 bg-white rounded-lg overflow-hidden shrink-0 border border-[#E8ECE9]">
                        <ProductIllustration
                          type={crossSellProduct.category}
                          accent={crossSellProduct.accentColor}
                          name={crossSellProduct.name}
                          size={crossSellProduct.size}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-serif font-bold text-[#1C3325] truncate">
                          {crossSellProduct.name}
                        </p>
                        <p className="text-[10px] text-stone-500 truncate">
                          {crossSellProduct.tagline}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-serif font-bold text-[#1C3325]">
                            {formatINR(crossSellProduct.price)}
                          </span>
                          {crossSellProduct.originalPrice && (
                            <span className="text-[10px] text-stone-400 line-through">
                              {formatINR(crossSellProduct.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => onAddToCart(crossSellProduct, 1, false)}
                        className="px-3 py-1.5 bg-[#1C3325] hover:bg-[#122118] text-white text-xs font-semibold rounded-lg shrink-0 shadow-xs active:scale-95 transition-all flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="pt-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Promo code (e.g. ECOBLOOM15)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 bg-white rounded-lg border border-[#D2DCD4] text-xs uppercase placeholder:normal-case font-mono focus:outline-hidden focus:border-[#758A7A]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-[#FAF8F5] border border-[#D2DCD4] hover:bg-[#EBF0EC] text-xs font-semibold rounded-lg text-[#1C3325]"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMessage && (
                    <p
                      className={`text-[11px] mt-1 ${
                        couponMessage.isError ? 'text-rose-600' : 'text-emerald-700'
                      }`}
                    >
                      {couponMessage.text}
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Footer actions when cart has items */}
          {cart.length > 0 && !isCheckingOut && !orderComplete && (
            <div className="p-5 border-t border-[#E8ECE9] bg-[#F5F0EA] space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono font-medium">{formatINR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount:</span>
                    <span className="font-mono">-{formatINR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-mono">{shipping === 0 ? 'FREE' : formatINR(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm font-serif font-bold text-[#1C3325] pt-2 border-t border-[#E2DDD5]">
                  <span>Total (inc. GST):</span>
                  <span className="font-mono">{formatINR(finalTotal)}</span>
                </div>
              </div>

              {/* Tree planting note */}
              <div className="p-2.5 rounded-lg bg-[#EBF0EC] flex items-center justify-center gap-1.5 text-xs text-[#2C4836] font-medium">
                <Trees className="w-3.5 h-3.5 text-[#758A7A]" />
                <span>Plants {totalItemCount} native tree{totalItemCount > 1 ? 's' : ''} with this order</span>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 bg-[#1C3325] hover:bg-[#122118] text-[#FAF8F5] font-semibold text-sm rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
