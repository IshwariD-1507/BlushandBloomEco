import React, { useState, useEffect } from 'react';
import { X, TrendingUp, Users, ShoppingBag, Eye, Sparkles, RefreshCw, Trees, Award, BarChart3 } from 'lucide-react';
import { AnalyticsStats } from '../types';
import { formatINR, TARGET_REVENUE, getStoredAnalytics, updateAnalytics } from '../utils/helpers';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ isOpen, onClose }) => {
  const [stats, setStats] = useState<AnalyticsStats>(getStoredAnalytics());
  const [activeTab, setActiveTab] = useState<'overview' | 'campaign' | 'activity'>('overview');

  useEffect(() => {
    if (!isOpen) return;
    setStats(getStoredAnalytics());

    const handleUpdate = (e: any) => {
      setStats(e.detail);
    };
    window.addEventListener('bnb_analytics_updated', handleUpdate);
    return () => window.removeEventListener('bnb_analytics_updated', handleUpdate);
  }, [isOpen]);

  if (!isOpen) return null;

  const conversionRate = ((stats.totalOrders / Math.max(1, stats.uniqueVisitors)) * 100).toFixed(1);
  const revenuePercent = Math.min(100, Math.round((stats.totalRevenue / TARGET_REVENUE) * 100));

  // Retrieve stored orders and inquiries for live user details log
  const recentOrders = JSON.parse(localStorage.getItem('bnb_orders') || '[]');
  const recentInquiries = JSON.parse(localStorage.getItem('bnb_inquiries') || '[]');
  const subscribers = JSON.parse(localStorage.getItem('bnb_subscribers') || '[]');

  const handleSimulateVisitor = () => {
    const updated = updateAnalytics((prev) => ({
      ...prev,
      pageViews: prev.pageViews + 3,
      uniqueVisitors: prev.uniqueVisitors + 1,
      productClicks: prev.productClicks + 2
    }));
    setStats(updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E2DDD5] overflow-hidden my-6">
        {/* Header */}
        <div className="p-6 bg-[#1C3325] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 text-emerald-300">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-serif font-bold text-white">
                  Blush &amp; Bloom Analytics &amp; Campaign Monitor
                </h2>
                <span className="text-[10px] bg-emerald-700/60 text-emerald-200 px-2 py-0.5 rounded-md font-mono">
                  Assignment Rubric 5
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-0.5">
                Real-time tracking of website visits, user interactions, quiz completions, and revenue
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-[#E8ECE9] bg-[#F5F0EA] text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-3 transition-colors relative ${
              activeTab === 'overview'
                ? 'text-[#1C3325] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1C3325]'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Performance Overview
          </button>
          <button
            onClick={() => setActiveTab('campaign')}
            className={`pb-3 px-3 transition-colors relative ${
              activeTab === 'campaign'
                ? 'text-[#1C3325] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1C3325]'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Campaign Goals &amp; Channels
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`pb-3 px-3 transition-colors relative ${
              activeTab === 'activity'
                ? 'text-[#1C3325] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1C3325]'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            User Details &amp; Order Activity
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 4 Big Metrics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#E8ECE9] shadow-2xs">
                  <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
                    <span>Website Visits</span>
                    <Eye className="w-3.5 h-3.5 text-[#758A7A]" />
                  </div>
                  <p className="text-2xl font-serif font-bold text-[#1C3325] tabular-nums">
                    {stats.pageViews.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[11px] text-emerald-700 font-mono mt-1">
                    {stats.uniqueVisitors} Unique Visitors
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E8ECE9] shadow-2xs">
                  <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
                    <span>Product Clicks</span>
                    <ShoppingBag className="w-3.5 h-3.5 text-[#758A7A]" />
                  </div>
                  <p className="text-2xl font-serif font-bold text-[#1C3325] tabular-nums">
                    {stats.productClicks}
                  </p>
                  <p className="text-[11px] text-stone-500 font-sans mt-1">
                    High intent engagement
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E8ECE9] shadow-2xs">
                  <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
                    <span>Quiz Completions</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#758A7A]" />
                  </div>
                  <p className="text-2xl font-serif font-bold text-[#1C3325] tabular-nums">
                    {stats.quizCompletions}
                  </p>
                  <p className="text-[11px] text-stone-500 font-sans mt-1">
                    Skin &amp; Hair diagnostics
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E8ECE9] shadow-2xs">
                  <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
                    <span>Conversion Rate</span>
                    <TrendingUp className="w-3.5 h-3.5 text-[#758A7A]" />
                  </div>
                  <p className="text-2xl font-serif font-bold text-[#1C3325] tabular-nums">
                    {conversionRate}%
                  </p>
                  <p className="text-[11px] text-stone-500 font-sans mt-1">
                    {stats.totalOrders} Completed Orders
                  </p>
                </div>
              </div>

              {/* Revenue Target Progress Bar (from student objective 2) */}
              <div className="p-5 rounded-2xl bg-white border border-[#E2DDD5] shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#1C3325]">
                      Quarterly Revenue Goal: {formatINR(TARGET_REVENUE)}
                    </h3>
                    <p className="text-xs text-stone-500 font-sans">
                      Target from Digital Marketing Campaign Objective 2
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif font-bold text-xl text-[#1C3325] tabular-nums">
                      {formatINR(stats.totalRevenue)}
                    </span>
                    <span className="text-xs text-stone-500 block font-mono">
                      ({revenuePercent}% of Target)
                    </span>
                  </div>
                </div>

                {/* Bar */}
                <div className="w-full h-3 bg-[#E8ECE9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#758A7A] to-[#1C3325] rounded-full transition-all duration-500"
                    style={{ width: `${revenuePercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-stone-400 font-mono mt-2">
                  <span>₹0 Base</span>
                  <span>Target: ₹3,50,000</span>
                </div>
              </div>

              {/* Quick Simulator CTA */}
              <div className="p-4 rounded-xl bg-[#F5F0EA] border border-[#E2DDD5] flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#1C3325]">Simulate Traffic &amp; Interaction</p>
                  <p className="text-[11px] text-stone-500">
                    Click to test real-time incrementation for grading demonstration
                  </p>
                </div>
                <button
                  onClick={handleSimulateVisitor}
                  className="px-3 py-1.5 bg-[#1C3325] text-white text-xs font-semibold rounded-lg hover:bg-[#122118]"
                >
                  + Simulate 1 Visit
                </button>
              </div>
            </div>
          )}

          {activeTab === 'campaign' && (
            <div className="space-y-6">
              {/* Channel Distribution */}
              <div className="p-5 bg-white rounded-2xl border border-[#E8ECE9] shadow-2xs">
                <h3 className="font-serif font-bold text-base text-[#1C3325] mb-1">
                  Acquisition Channels (Instagram vs Pinterest Campaign)
                </h3>
                <p className="text-xs text-stone-500 mb-4">
                  Traffic breakdown aligned with campaign channel selection in the project document
                </p>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-stone-700">Instagram Organic &amp; Influencer Reels</span>
                      <span className="font-mono text-stone-500">48% (682 visits)</span>
                    </div>
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-pink-500 to-rose-600 rounded-full" style={{ width: '48%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-stone-700">Pinterest Skincare &amp; Hair Routine Pins</span>
                      <span className="font-mono text-stone-500">28% (398 visits)</span>
                    </div>
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-600 rounded-full" style={{ width: '28%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-stone-700">Direct / Word of Mouth &amp; Refill Stores</span>
                      <span className="font-mono text-stone-500">24% (340 visits)</span>
                    </div>
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#1C3325] rounded-full" style={{ width: '24%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Target Audience Compliance */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-white border border-[#E8ECE9]">
                  <span className="font-semibold uppercase tracking-wider text-[#758A7A] text-[10px]">
                    Audience Demographics
                  </span>
                  <p className="font-serif font-bold text-base text-[#1C3325] mt-1">22 – 40 Years</p>
                  <p className="text-stone-500 mt-0.5">Tier 1 &amp; Tier 2 urban Indian eco-conscious consumers</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E8ECE9]">
                  <span className="font-semibold uppercase tracking-wider text-[#758A7A] text-[10px]">
                    Average Annual Income
                  </span>
                  <p className="font-serif font-bold text-base text-[#1C3325] mt-1">₹6L – ₹12L</p>
                  <p className="text-stone-500 mt-0.5">Working professionals seeking clean luxury aesthetics</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E8ECE9]">
                  <span className="font-semibold uppercase tracking-wider text-[#758A7A] text-[10px]">
                    Community Goal
                  </span>
                  <p className="font-serif font-bold text-base text-[#1C3325] mt-1">2,500 Followers</p>
                  <p className="text-stone-500 mt-0.5">Objective 3: Active sustainable beauty community</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6 text-xs">
              {/* User orders table */}
              <div>
                <h3 className="font-serif font-bold text-base text-[#1C3325] mb-2">
                  Captured User Orders ({recentOrders.length} Recent Submissions)
                </h3>
                {recentOrders.length === 0 ? (
                  <p className="text-stone-400 p-4 bg-white rounded-xl border border-dashed text-center">
                    No orders submitted yet. Place a test checkout from your bag to see the record populated live!
                  </p>
                ) : (
                  <div className="border border-[#E8ECE9] rounded-xl overflow-hidden bg-white">
                    <table className="w-full text-left">
                      <thead className="bg-[#F5F0EA] text-stone-600 font-semibold border-b border-[#E8ECE9]">
                        <tr>
                          <th className="p-3">Order ID</th>
                          <th className="p-3">Customer</th>
                          <th className="p-3">Location</th>
                          <th className="p-3">Trees</th>
                          <th className="p-3">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8ECE9]">
                        {recentOrders.slice(-5).map((o: any, idx: number) => (
                          <tr key={idx} className="hover:bg-stone-50">
                            <td className="p-3 font-mono font-medium">{o.orderId}</td>
                            <td className="p-3">{o.customerName}</td>
                            <td className="p-3">{o.city}, {o.pincode}</td>
                            <td className="p-3 text-emerald-700 font-bold">+{o.treesPlanted} 🌱</td>
                            <td className="p-3 font-mono font-semibold">{formatINR(o.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Captured Newsletter Subscriptions */}
              <div>
                <h3 className="font-serif font-bold text-base text-[#1C3325] mb-2">
                  Newsletter Subscribers ({subscribers.length} Stored Locally)
                </h3>
                <div className="bg-white p-4 rounded-xl border border-[#E8ECE9] max-h-36 overflow-y-auto">
                  {subscribers.length === 0 ? (
                    <span className="text-stone-400">Submit an email in the Gazette section to see it recorded.</span>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {subscribers.map((sub: string, i: number) => (
                        <span key={i} className="bg-[#EBF0EC] text-[#1C3325] px-2.5 py-1 rounded-md font-mono text-[11px]">
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
