'use client';

import { useState } from 'react';

export default function Modals({
  selectedCase,
  setSelectedCase,
  isConsultationOpen,
  setIsConsultationOpen,
  prefilledService,
}) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: prefilledService?.title || 'FULL PRODUCTION',
    guests: '100-500',
    details: '',
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsConsultationOpen(false);
    }, 2500);
  };

  return (
    <>
      {/* Case Study Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#141416] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedCase(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-lg transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-black uppercase rounded-full bg-[#FFD152] text-black">
                {selectedCase.category}
              </span>
              <span className="text-sm text-zinc-400 font-bold">{selectedCase.year}</span>
              <span className="text-sm text-zinc-400 font-bold">• {selectedCase.location}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {selectedCase.title}
            </h2>

            <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-6 bg-black">
              <img
                src={selectedCase.image}
                alt={selectedCase.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-6">
              {selectedCase.description}
            </p>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
              <div>
                <span className="block text-xs uppercase text-zinc-400 font-bold">Attendance</span>
                <span className="text-lg font-black text-white">{selectedCase.guests}</span>
              </div>
              <div>
                <span className="block text-xs uppercase text-zinc-400 font-bold">Concept Rating</span>
                <span className="text-lg font-black text-[#FFD152]">5.0 / 5.0 ★</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedCase(null);
                  setIsConsultationOpen(true);
                }}
                className="flex-1 py-3 px-6 rounded-full bg-[#FFD152] text-black font-extrabold text-sm uppercase hover:bg-white transition-colors"
              >
                Plan a Similar Event ↗
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Consultation Modal */}
      {isConsultationOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#141416] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsConsultationOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-lg transition-colors"
            >
              ✕
            </button>

            <div className="mb-6">
              <span className="text-xs uppercase font-black tracking-widest text-[#FFD152]">
                ✦ DIRECT INQUIRY
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                LET&apos;S ORCHESTRATE YOUR EVENT
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                Tell us your vision. We respond with a bespoke concept within 24 hours.
              </p>
            </div>

            {formSubmitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#FFD152] text-black flex items-center justify-center text-3xl font-bold mb-4 animate-bounce">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-white">INQUIRY RECEIVED!</h3>
                <p className="text-zinc-400 mt-2 text-sm">
                  Our Lead Stage Director is preparing your preliminary brief right now.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-zinc-400 mb-1">
                    Your Name / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Vance / Apex Global"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFD152]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-zinc-400 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFD152]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-zinc-400 mb-1">
                      Phone / Telegram
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFD152]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-zinc-400 mb-1">
                      Event Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#1c1c20] border border-white/15 text-white focus:outline-none focus:border-[#FFD152]"
                    >
                      <option value="EVENT MANAGEMENT">01/ EVENT MANAGEMENT</option>
                      <option value="CORPORATE GATHERINGS">02/ CORPORATE GATHERINGS</option>
                      <option value="CONFERENCES & SUMMITS">03/ CONFERENCES & SUMMITS</option>
                      <option value="BRAND MARKETING ACTIVATIONS">04/ BRAND ACTIVATIONS</option>
                      <option value="PRIVATE CELEBRATION">05/ PRIVATE CELEBRATION</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold text-zinc-400 mb-1">
                      Estimated Guests
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#1c1c20] border border-white/15 text-white focus:outline-none focus:border-[#FFD152]"
                    >
                      <option value="Under 100">50 - 100 Guests</option>
                      <option value="100-500">100 - 500 Guests</option>
                      <option value="500-2000">500 - 2,000 Guests</option>
                      <option value="2000+">2,000+ Attendees</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-zinc-400 mb-1">
                    Event Vision & Date
                  </label>
                  <textarea
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Date, preferred location, key artists or vibe ideas..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFD152]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#FFD152] text-black font-black uppercase text-sm tracking-wider hover:bg-white transition-colors"
                >
                  Submit Inquiry • Request Brief ↗
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
