import { AnalyticsStats, CartItem } from '../types';

export const INITIAL_TREES = 14820;
export const TARGET_REVENUE = 350000;

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function getStoredTrees(): number {
  try {
    const stored = localStorage.getItem('bnb_trees_planted');
    if (stored) {
      const num = parseInt(stored, 10);
      if (!isNaN(num) && num >= INITIAL_TREES) return num;
    }
  } catch {
    // fallback
  }
  return INITIAL_TREES;
}

export function incrementStoredTrees(count: number): number {
  try {
    const current = getStoredTrees();
    const updated = current + count;
    localStorage.setItem('bnb_trees_planted', updated.toString());
    window.dispatchEvent(new CustomEvent('bnb_trees_updated', { detail: updated }));
    return updated;
  } catch {
    return INITIAL_TREES + count;
  }
}

export function getStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem('bnb_cart');
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }
  return [];
}

export function saveStoredCart(cart: CartItem[]): void {
  try {
    localStorage.setItem('bnb_cart', JSON.stringify(cart));
  } catch (err) {
    console.error('Failed to save cart to localStorage', err);
  }
}

export function getStoredAnalytics(): AnalyticsStats {
  try {
    const raw = localStorage.getItem('bnb_analytics');
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }

  // Realistic baseline matching the assignment PDF objectives
  return {
    pageViews: 1420,
    uniqueVisitors: 890,
    productClicks: 412,
    quizCompletions: 168,
    totalOrders: 54,
    totalRevenue: 84620, // progressing towards ₹3,50,000 goal
    treesPlantedTotal: INITIAL_TREES,
    newsletterSubscribers: 284,
    contactInquiries: 38
  };
}

export function updateAnalytics(updater: (prev: AnalyticsStats) => AnalyticsStats): AnalyticsStats {
  try {
    const current = getStoredAnalytics();
    const next = updater(current);
    localStorage.setItem('bnb_analytics', JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('bnb_analytics_updated', { detail: next }));
    return next;
  } catch {
    const current = getStoredAnalytics();
    return updater(current);
  }
}
