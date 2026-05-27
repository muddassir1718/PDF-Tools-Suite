import React, { useState } from 'react';
import { Mail, Send, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/Toast';
import { SEO } from '../components/ui/SEO';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const { toasts, showToast, removeToast } = useToast();

  const handleDispatchMail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) {
      showToast('Please fill out all contact fields.', 'warning');
      return;
    }

    // Build a mailto link to handle the client email dispatching directly!
    const subject = encodeURIComponent(`Inquiry from ${name} on PDFTools`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${msg}`);
    const mailto = `mailto:muddassirbillah1718@gmail.com?subject=${subject}&body=${body}`;
    
    showToast('Spawning email dispatch client...', 'success');
    window.location.href = mailto;

    // Reset Form
    setName('');
    setEmail('');
    setMsg('');
  };

  return (
    <div className="font-sans py-8 max-w-xl mx-auto leading-relaxed animate-fadeIn">
      <SEO 
        title="Contact Us - PDFTools Suite" 
        description="Get in touch with support if you encounter any bugs, or want to request custom tools."
        path="/contact"
      />

      <div className="bg-white border border-gray-200 dark:bg-gray-950 dark:border-gray-900 rounded-3xl p-6 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-2 leading-tight flex items-center gap-1.5">
          <Mail className="w-5.5 h-0 hover:animate-pulse text-blue-500" />
          Get in Touch
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
          Encountered a bug? Want to request some additional tools? Fill out the contact card below to spawn your local email client directly!
        </p>

        <form onSubmit={handleDispatchMail} className="space-y-4">
          <div>
            <label className="text-3xs font-black text-gray-450 dark:text-gray-505 uppercase tracking-widest block mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full text-xs py-3 px-4 rounded-xl border border-gray-250 bg-white focus:outline-hidden focus:border-blue-500 dark:border-gray-850 dark:bg-gray-900 dark:text-gray-105"
            />
          </div>

          <div>
            <label className="text-3xs font-black text-gray-450 dark:text-gray-505 uppercase tracking-widest block mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full text-xs py-3 px-4 rounded-xl border border-gray-250 bg-white focus:outline-hidden focus:border-blue-500 dark:border-gray-850 dark:bg-gray-900 dark:text-gray-105"
            />
          </div>

          <div>
            <label className="text-3xs font-black text-gray-450 dark:text-gray-505 uppercase tracking-widest block mb-2">
              Your Message
            </label>
            <textarea
              rows={4}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="What would you like to request or ask?"
              required
              className="w-full text-xs py-3 px-4 rounded-xl border border-gray-250 bg-white focus:outline-hidden focus:border-blue-500 dark:border-gray-850 dark:bg-gray-900 dark:text-gray-105 resize-none"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-900">
            <Button
              type="submit"
              icon={<Send className="w-3.5 h-3.5" />}
              className="w-full rounded-xl"
            >
              Draft Email
            </Button>
          </div>
        </form>
      </div>

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
};
