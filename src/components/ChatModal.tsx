'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/lib/store';
import { X, Send, Sparkles, MapPin, QrCode, ShieldCheck } from 'lucide-react';

interface ChatModalProps {
  requestId: string | null;
  onClose: () => void;
  onOpenQR: (mode: 'pickup' | 'return') => void;
}

const QUICK_REPLIES = [
  'Is this still available?',
  'Can we meet at the Central Library Safe Point?',
  'What time works best for pickup?',
  'Ready with the QR code at the safe point!',
  'Please bring the carrying case / original cables.'
];

export function ChatModal({ requestId, onClose, onOpenQR }: ChatModalProps) {
  const { messages, sendMessage, requests, currentUser } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const request = requests.find(r => r.id === requestId);
  const reqMessages = messages.filter(m => m.request_id === requestId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [reqMessages]);

  if (!request) return null;

  const otherPersonName = currentUser.user_id === request.owner_id ? request.borrower_name : request.owner_name;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(request.id, inputText.trim());
    setInputText('');
  };

  const handleQuickReply = (text: string) => {
    sendMessage(request.id, text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-8 relative flex flex-col h-[600px] max-h-[92vh]">
        {/* Header */}
        <div className="p-3.5 px-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm border border-emerald-300">
              {otherPersonName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold text-slate-900">{otherPersonName}</h3>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <p className="text-[11px] text-slate-500 truncate max-w-[200px]">{request.item_title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {request.status === 'approved' && (
              <button
                onClick={() => onOpenQR('pickup')}
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Pickup QR</span>
              </button>
            )}
            {request.status === 'active' && (
              <button
                onClick={() => onOpenQR('return')}
                className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Return QR</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Safety Note */}
        <div className="bg-emerald-50/80 px-4 py-1.5 text-[11px] text-emerald-800 border-b border-emerald-100 flex items-center gap-2">
          <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
          <span>Keep interactions safe: meet at designated campus Safe Points. Phone numbers are protected.</span>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40">
          {reqMessages.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No messages yet. Send a quick hello to coordinate pickup time and safe point!
            </div>
          ) : (
            reqMessages.map((msg) => {
              const isMe = msg.sender_id === currentUser.user_id;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs shadow-xs leading-relaxed ${isMe ? 'bg-emerald-600 text-white rounded-tr-xs' : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'}`}
                  >
                    <p className="font-semibold text-[10px] mb-0.5 opacity-80">{msg.sender_name}</p>
                    <p>{msg.body}</p>
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Reply Chips */}
        <div className="p-2 border-t border-slate-100 bg-white overflow-x-auto whitespace-nowrap flex gap-1.5">
          {QUICK_REPLIES.map((reply, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickReply(reply)}
              className="text-[10px] font-medium px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-full border border-slate-200 transition-colors shrink-0"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input box */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message to coordinate handover..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-500 bg-slate-50 focus:bg-white"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs disabled:opacity-40 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
