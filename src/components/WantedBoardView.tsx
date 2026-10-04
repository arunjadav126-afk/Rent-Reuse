'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Search, PlusCircle, Sparkles, CheckCircle2, Clock, Calendar, ArrowRight, X } from 'lucide-react';

export function WantedBoardView() {
  const { wantedPosts, createWantedPost, categories, currentUser, items } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0].id);
  const [neededFrom, setNeededFrom] = useState(new Date().toISOString().split('T')[0]);
  const [neededUntil, setNeededUntil] = useState('2026-11-30');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createWantedPost({
      title,
      description,
      category_id: categoryId,
      needed_from: neededFrom,
      needed_until: neededUntil
    });

    setSuccess(true);
    setTimeout(() => {
      setShowModal(false);
      setSuccess(false);
      setTitle('');
      setDescription('');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
            Campus Matching Board
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
            Can't find what you need? Post a Wanted Request
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Seniors and classmates receive instant notifications whenever they list an item matching your post.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 shrink-0 active:scale-95 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post a Wanted Request</span>
        </button>
      </div>

      {/* Wanted Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wantedPosts.map((post) => {
          const cat = categories.find(c => c.id === post.category_id);
          const matchingItems = items.filter(i => i.category_id === post.category_id && i.status === 'available');

          return (
            <div
              key={post.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between hover:border-emerald-300 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.user_avatar}
                      alt={post.user_name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{post.user_name}</h4>
                      <p className="text-[10px] text-slate-400">{post.department} • Year {post.year}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                    {cat?.name || 'General'}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 mt-3">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {post.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Needed: {post.needed_from} to {post.needed_until}</span>
                </div>
              </div>

              {/* Matching Items Alert pill */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                {matchingItems.length > 0 ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{matchingItems.length} matching items currently listed!</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">Waiting for senior listing...</span>
                )}

                <span className="text-[10px] text-slate-400">
                  Posted {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Post Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Post What You Need on Campus
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {success ? (
              <div className="p-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900">Request Published!</h4>
                <p className="text-xs text-slate-500">We'll alert you the moment a senior lists a matching item.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">What do you need?</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Scientific Calculator Casio fx-991EX for Endsems"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Needed Until</label>
                    <input
                      type="date"
                      value={neededUntil}
                      onChange={(e) => setNeededUntil(e.target.value)}
                      className="w-full text-xs p-2 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Additional details (course, dates, preferred hostel)</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Need it specifically for MA101 tutorial sessions in Oct/Nov..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                  >
                    Publish Wanted Post
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
