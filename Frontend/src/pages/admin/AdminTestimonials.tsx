import React, { useState } from 'react';
import { Quote, Plus, Trash2, Star, X } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { TestimonialItem } from '../../types';

export const AdminTestimonials: React.FC = () => {
  const { testimonials, addTestimonial, deleteTestimonial } = usePortfolioData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [source, setSource] = useState('National Classical Journal');
  const [rating, setRating] = useState(5);
  const [date, setDate] = useState('2024');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quote.trim() || !author.trim()) return;

    const newTest: TestimonialItem = {
      id: `TEST-${Date.now()}`,
      quote: quote.trim(),
      author: author.trim(),
      source: source.trim(),
      rating,
      date: date.trim(),
    };

    addTestimonial(newTest);
    setQuote('');
    setAuthor('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#20222a] gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#c8a251] font-semibold">
            CRITICAL ACCLAIM & PRESS
          </span>
          <h1 className="text-2xl font-serif text-white">
            Reviews & Endorsements ({testimonials.length})
          </h1>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-[#c8a251] hover:bg-[#d6b25f] text-[#0b0c0e] font-semibold text-xs rounded-lg uppercase tracking-wider transition-all flex items-center gap-2 shadow-md self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Press Review</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-xl bg-[#141518] border border-[#23252e] flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Quote className="w-6 h-6 text-[#c8a251]" />
                <div className="flex items-center gap-1">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#c8a251] fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs font-serif italic text-[#cacedd] leading-relaxed">
                "{item.quote}"
              </p>
            </div>

            <div className="pt-3 border-t border-[#1e2028] flex items-center justify-between">
              <div>
                <h4 className="text-xs font-semibold text-white">{item.author}</h4>
                <p className="text-[11px] text-[#717686]">{item.source}</p>
              </div>
              <button
                onClick={() => {
                  if (confirm(`Remove review by ${item.author}?`)) {
                    deleteTestimonial(item.id);
                  }
                }}
                className="p-1.5 rounded bg-red-950/30 hover:bg-red-900/50 text-red-300 border border-red-800/40"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#16171c] border border-[#272933] rounded-xl p-6 text-white space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-[#23252f]">
              <h3 className="text-xl font-serif">Add Press Review</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#8e93a3] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8e93a3] mb-1">Quote / Excerpt *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter critic praise quote..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8e93a3] mb-1">Critic / Author *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. London Arts Chronicle"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#8e93a3] mb-1">Publication / Source</label>
                  <input
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8e93a3] mb-1">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value) || 5)}
                    className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#8e93a3] mb-1">Date / Issue</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#1b1d24] border border-[#2c2f3a] rounded-lg p-2 text-white"
                  />
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#c8a251] text-[#0b0c0e] font-semibold rounded-lg uppercase tracking-wider"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
