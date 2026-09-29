import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Copy, Sparkles, MessageSquare } from 'lucide-react';
import { updateAnalytics } from '../utils/helpers';

export const NewsletterContact: React.FC = () => {
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCity, setContactCity] = useState('');
  const [contactSubject, setContactSubject] = useState('Product Inquiries & Advice');
  const [contactMessage, setContactMessage] = useState('');
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;

    try {
      const stored = JSON.parse(localStorage.getItem('bnb_subscribers') || '[]');
      if (!stored.includes(newsletterEmail)) {
        stored.push(newsletterEmail);
        localStorage.setItem('bnb_subscribers', JSON.stringify(stored));
      }
    } catch {
      // fallback
    }

    updateAnalytics((prev) => ({
      ...prev,
      newsletterSubscribers: prev.newsletterSubscribers + 1
    }));

    setNewsletterSuccess(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('ECOBLOOM15');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!contactName.trim()) errors.name = 'Please provide your full name';
    if (!contactEmail.trim() || !contactEmail.includes('@'))
      errors.email = 'Valid email is required';
    if (!contactMessage.trim() || contactMessage.length < 10)
      errors.message = 'Please share at least 10 characters in your message';

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }

    setContactErrors({});

    try {
      const existingInquiries = JSON.parse(localStorage.getItem('bnb_inquiries') || '[]');
      existingInquiries.push({
        id: Date.now(),
        name: contactName,
        email: contactEmail,
        city: contactCity || 'India',
        subject: contactSubject,
        message: contactMessage,
        date: new Date().toISOString()
      });
      localStorage.setItem('bnb_inquiries', JSON.stringify(existingInquiries));
    } catch {
      // fallback
    }

    updateAnalytics((prev) => ({
      ...prev,
      contactInquiries: prev.contactInquiries + 1
    }));

    setContactSuccess(true);
    setContactName('');
    setContactEmail('');
    setContactCity('');
    setContactMessage('');
  };

  return (
    <section id="contact" className="py-20 bg-[#F4EFEB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section: Banner Style */}
        <div className="bg-[#1C3325] text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2C4836] rounded-full blur-3xl opacity-50 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">
              The Botanical Gazette
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
              Join Our Conscious Community &amp; Receive 15% Off
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm font-sans leading-relaxed">
              Receive seasonal harvest dispatches, Ayurvedic skin care tips, and exclusive access to new refill batch launches.
            </p>

            {!newsletterSuccess ? (
              <form onSubmit={handleNewsletterSubmit} className="pt-2 max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-stone-400 border border-white/20 focus:outline-hidden focus:border-emerald-400 text-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#E8C4BE] hover:bg-[#D4A59D] text-[#162A1F] font-semibold text-sm rounded-xl transition-all shadow-md active:scale-95"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-[11px] text-stone-400 mt-2 font-mono">
                  No spam ever. Unsubscribe with 1-click anytime.
                </p>
              </form>
            ) : (
              <div className="bg-white/10 border border-white/20 p-5 rounded-2xl max-w-md mx-auto mt-4 backdrop-blur-md animate-fadeIn">
                <div className="flex items-center justify-center gap-2 text-emerald-300 mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-semibold text-sm">Welcome to Blush &amp; Bloom!</span>
                </div>
                <p className="text-xs text-stone-200">
                  Use coupon code at checkout for 15% off your first order:
                </p>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="font-mono text-base font-bold bg-white text-[#1C3325] px-3 py-1 rounded-md">
                    ECOBLOOM15
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="p-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-md text-xs flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Form & Botanical Helpdesk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs uppercase tracking-widest text-[#758A7A] font-semibold">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C3325]">
              Botanical Consultation &amp; Refill Queries
            </h2>
            <p className="text-stone-600 text-sm font-sans leading-relaxed">
              Have a question about which formulation suits your skin barrier, or want to partner with us
              as a zero-waste refill sanctuary in your Indian city? Our in-house botanists respond within 24 hours.
            </p>

            <div className="pt-4 space-y-3 text-xs sm:text-sm text-stone-700 font-sans">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5]">
                <p className="font-serif font-bold text-[#1C3325] text-base">Direct Botanical Desk</p>
                <p className="text-stone-500 text-xs mt-0.5">care@blushandbloomeco.in</p>
                <p className="text-stone-500 text-xs font-mono mt-0.5">+91 (020) 2615 3302</p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5]">
                <p className="font-serif font-bold text-[#1C3325] text-base">Sustainability &amp; Refill Partnerships</p>
                <p className="text-stone-500 text-xs mt-0.5">refill@blushandbloomeco.in</p>
                <p className="text-stone-500 text-xs mt-0.5">Mumbai · Bengaluru · Pune · Delhi NCR</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[#FAF8F5] p-8 sm:p-10 rounded-3xl border border-[#E2DDD5] shadow-md">
              {contactSuccess ? (
                <div className="text-center py-10 space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 bg-[#EBF0EC] text-[#2C4836] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#1C3325]">
                    Message Received With Gratitude 🌱
                  </h3>
                  <p className="text-stone-600 text-sm max-w-md mx-auto font-sans leading-relaxed">
                    Thank you for reaching out. One of our formulation specialists will review your skin query and email you back within 24 business hours.
                  </p>
                  <button
                    onClick={() => setContactSuccess(false)}
                    className="mt-4 px-6 py-2.5 bg-[#1C3325] text-white text-xs font-semibold rounded-xl"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Swara Mulik"
                        className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#D2DCD4] text-xs text-[#1C3325] focus:outline-hidden focus:border-[#758A7A]"
                      />
                      {contactErrors.name && (
                        <p className="text-[11px] text-rose-600 mt-1">{contactErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="e.g. swara@example.com"
                        className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#D2DCD4] text-xs text-[#1C3325] focus:outline-hidden focus:border-[#758A7A]"
                      />
                      {contactErrors.email && (
                        <p className="text-[11px] text-rose-600 mt-1">{contactErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={contactCity}
                        onChange={(e) => setContactCity(e.target.value)}
                        placeholder="e.g. Pune, Maharashtra"
                        className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#D2DCD4] text-xs text-[#1C3325] focus:outline-hidden focus:border-[#758A7A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Subject
                      </label>
                      <select
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#D2DCD4] text-xs text-[#1C3325] focus:outline-hidden focus:border-[#758A7A]"
                      >
                        <option value="Product Inquiries & Advice">Product Inquiries &amp; Advice</option>
                        <option value="Refill Station Information">Refill Station Information</option>
                        <option value="Bulk / Festive Gifting Hamper">Bulk / Festive Gifting Hamper</option>
                        <option value="Press / Influencer Collaboration">Press / Influencer Collaboration</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Share your skin condition, routine questions, or store partnership proposals..."
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#D2DCD4] text-xs text-[#1C3325] focus:outline-hidden focus:border-[#758A7A]"
                    />
                    {contactErrors.message && (
                      <p className="text-[11px] text-rose-600 mt-1">{contactErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1C3325] hover:bg-[#122118] text-[#FAF8F5] text-xs sm:text-sm font-medium rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Formulation Lab</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
