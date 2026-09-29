export interface Product {
  id: string;
  name: string;
  category: 'skincare' | 'haircare' | 'body' | 'bundles';
  tagline: string;
  price: number; // in INR
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  size: string;
  refillSavings: number; // e.g. 50%
  description: string;
  keyIngredients: string[];
  skinHairTypes: string[];
  concerns: string[];
  bestFor: string;
  badge?: string;
  accentColor: string;
  botanicalIcon: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isRefill?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    tag: string;
    icon?: string;
  }[];
}

export interface QuizResult {
  title: string;
  subtitle: string;
  description: string;
  doshaOrProfile: string;
  recommendedProductIds: string[];
  ritualSteps: string[];
}

export interface StoreLocation {
  id: string;
  city: string;
  area: string;
  name: string;
  address: string;
  pincode: string;
  phone: string;
  hours: string;
  openHour: number; // 24-hr format e.g. 10.5 for 10:30 AM
  closeHour: number; // 24-hr format e.g. 20.5 for 8:30 PM
  daysClosed?: number[]; // e.g. [1] for Monday
  googleMapsQuery: string;
  refillAvailable: boolean;
  glassDropoff: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  concern: string;
  quote: string;
  rating: number;
  verifiedProduct: string;
  avatarSeed: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  treesPlanted: number;
  paymentMethod: 'cod' | 'upi' | 'card';
  date: string;
}

export interface AnalyticsStats {
  pageViews: number;
  uniqueVisitors: number;
  productClicks: number;
  quizCompletions: number;
  totalOrders: number;
  totalRevenue: number; // In INR towards ₹3,50,000 goal
  treesPlantedTotal: number;
  newsletterSubscribers: number;
  contactInquiries: number;
}
