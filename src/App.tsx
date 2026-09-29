/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Shop } from './components/Shop';
import { SkincareQuiz } from './components/SkincareQuiz';
import { HaircareQuiz } from './components/HaircareQuiz';
import { WhyUs } from './components/WhyUs';
import { ImpactCounter } from './components/ImpactCounter';
import { RefillProgram } from './components/RefillProgram';
import { OurStory } from './components/OurStory';
import { Testimonials } from './components/Testimonials';
import { NewsletterContact } from './components/NewsletterContact';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickView } from './components/ProductQuickView';
import { AnalyticsModal } from './components/AnalyticsModal';
import { IngredientGlossaryModal } from './components/IngredientGlossaryModal';
import { CartItem, Product } from './types';
import {
  getStoredCart,
  saveStoredCart,
  getStoredTrees,
  updateAnalytics,
  formatINR
} from './utils/helpers';
import { ShoppingBag, BarChart3, CheckCircle2, Trees, Leaf } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => getStoredCart());
  const [treesCount, setTreesCount] = useState<number>(() => getStoredTrees());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [glossaryKeyword, setGlossaryKeyword] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    saveStoredCart(cart);
  }, [cart]);

  // Page view tracker on initial mount
  useEffect(() => {
    const sessionKey = 'bnb_visited_session';
    const isNewSession = !sessionStorage.getItem(sessionKey);
    if (isNewSession) {
      sessionStorage.setItem(sessionKey, '1');
      updateAnalytics((prev) => ({
        ...prev,
        pageViews: prev.pageViews + 1,
        uniqueVisitors: prev.uniqueVisitors + 1
      }));
    } else {
      updateAnalytics((prev) => ({
        ...prev,
        pageViews: prev.pageViews + 1
      }));
    }

    const handleTreeEvent = (e: any) => {
      setTreesCount(e.detail);
    };
    window.addEventListener('bnb_trees_updated', handleTreeEvent);
    return () => window.removeEventListener('bnb_trees_updated', handleTreeEvent);
  }, []);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleOpenGlossary = (keyword?: string) => {
    setGlossaryKeyword(keyword || null);
    setIsGlossaryOpen(true);
  };

  const handleAddToCart = (product: Product, quantity = 1, isRefill = false) => {
    updateAnalytics((prev) => ({
      ...prev,
      productClicks: prev.productClicks + 1
    }));

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && !!item.isRefill === isRefill
      );

      if (existingIndex > -1) {
        const next = [...prevCart];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prevCart, { product, quantity, isRefill }];
      }
    });

    const price = isRefill ? Math.round(product.price * 0.5) : product.price;
    showToast(`Added ${product.name.split(' ')[0]} (${formatINR(price)}) to your bag 🌱`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number, isRefill = false) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, isRefill);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && !!item.isRefill === isRefill
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, isRefill = false) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && !!item.isRefill === isRefill)
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleTreePlanted = (newTreesCount: number) => {
    setTreesCount(getStoredTrees());
    showToast(`Congratulations! ${newTreesCount} native tree(s) planted in your name 🌱`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C3325] flex flex-col font-sans selection:bg-[#E8C4BE] selection:text-[#162A1F]">
      {/* Top Sticky Navigation */}
      <Navbar
        cartCount={totalCartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenGlossary={() => handleOpenGlossary()}
      />

      {/* Main Single Page Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero treesCount={treesCount} />

        {/* 2. Shop Section */}
        <Shop
          onAddToCart={handleAddToCart}
          onOpenQuickView={(p) => setQuickViewProduct(p)}
          onOpenIngredientGlossary={(k) => handleOpenGlossary(k)}
        />

        {/* 3. Skincare Diagnostic Quiz */}
        <SkincareQuiz
          onAddToCart={handleAddToCart}
          onOpenQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* 4. Haircare Diagnostic Quiz */}
        <HaircareQuiz
          onAddToCart={handleAddToCart}
          onOpenQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* 5. Why Blush and Bloom */}
        <WhyUs />

        {/* 6. Our Impact (Tree counter & Reforestation) */}
        <ImpactCounter treesCount={treesCount} />

        {/* 7. Refill Program & Indian Store Locator */}
        <RefillProgram />

        {/* 8. Our Story */}
        <OurStory />

        {/* 9. Testimonials Carousel */}
        <Testimonials />

        {/* 10. Newsletter & Contact Form */}
        <NewsletterContact />
      </main>

      {/* 11. Footer */}
      <Footer
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenGlossary={() => handleOpenGlossary()}
      />

      {/* Product Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenIngredientGlossary={(k) => handleOpenGlossary(k)}
      />

      {/* Slide-In Cart Drawer & Checkout Form */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onTreePlanted={handleTreePlanted}
        onAddToCart={handleAddToCart}
      />

      {/* Analytics Dashboard Modal (Assignment Rubric Topic 5) */}
      <AnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />

      {/* Interactive Ingredient Glossary Modal */}
      <IngredientGlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        initialIngredientId={glossaryKeyword}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
        {/* Ingredient Glossary Floating Pill */}
        <button
          onClick={() => handleOpenGlossary()}
          className="bg-white/95 hover:bg-white text-[#1C3325] text-xs font-semibold px-3.5 py-2 rounded-full shadow-md border border-[#D2DCD4] flex items-center gap-1.5 backdrop-blur-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Explore Botanical Ingredient Glossary"
        >
          <Leaf className="w-3.5 h-3.5 text-[#758A7A]" />
          <span className="hidden sm:inline">Botanical Glossary</span>
        </button>

        {/* Quick Analytics Pill */}
        <button
          onClick={() => setIsAnalyticsOpen(true)}
          className="bg-white/95 hover:bg-white text-[#1C3325] text-xs font-semibold px-3.5 py-2 rounded-full shadow-md border border-[#D2DCD4] flex items-center gap-1.5 backdrop-blur-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Open Live Marketing & Campaign Analytics"
        >
          <BarChart3 className="w-3.5 h-3.5 text-[#2C4836]" />
          <span className="hidden sm:inline">Campaign Analytics</span>
        </button>

        {/* Floating Cart Button with Glow */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative bg-[#1C3325] hover:bg-[#122118] text-[#FAF8F5] p-4 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center border border-white/20 luxury-button-glow cursor-pointer"
          aria-label="View Shopping Cart"
        >
          <ShoppingBag className="w-6 h-6" />
          {totalCartItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#E8C4BE] text-[#162A1F] text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#1C3325] animate-bounce">
              {totalCartItems}
            </span>
          )}
        </button>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1C3325] text-white px-5 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-medium flex items-center gap-2.5 border border-emerald-500/30 animate-fadeIn backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
