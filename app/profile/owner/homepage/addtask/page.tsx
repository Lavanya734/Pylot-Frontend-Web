"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { 
  ArrowLeft, 
  User, 
  IndianRupee, 
  Package, 
  Clock, 
  FileText, 
  CheckCircle2,
  AlertCircle,
  Search
} from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

export default function AddTaskPage() {
  const [loading, setLoading] = useState(false);

  // Mock Workers for the assignment dropdown
  const workers = [
    { id: 'w1', name: 'Ananya Sharma', skill: 'Master Tailor' },
    { id: 'w2', name: 'Rajesh Kupte', skill: 'Leather Artisan' },
    { id: 'w3', name: 'Sunita Reddy', skill: 'Quality Auditor' },
  ];

  const handleSubmit = (e : React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Task successfully assigned to worker!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-50/30 text-brand-900 pb-20">
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-brand-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/profile/owner/homepage">
            <button className="flex items-center gap-2 text-brand-500 font-bold text-sm hover:text-brand-900 transition-colors">
              <ArrowLeft size={18} /> Back to Dashboard
            </button>
          </Link>
          <div className="px-4 py-1 bg-brand-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
            New Work Order
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-12">
        <header className="mb-10">
          <h1 className="text-4xl font-heading font-black tracking-tighter">Create Task</h1>
          <p className="text-brand-800/50 font-medium mt-2">Assign a specific work order to a verified worker in your network.</p>
    
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">

          
          {/* Section 1: Worker Assignment */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-brand-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-brand-50 rounded-lg text-brand-600"><User size={20}/></div>
              <h2 className="font-heading font-bold text-xl">Assign Worker</h2>
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-400 ml-1">Select Verified Worker (worker_id)</label>
              <div className="relative">
                <select 
                  required
                  className="w-full bg-brand-50 border-none px-5 py-4 rounded-2xl text-sm focus:ring-2 focus:ring-brand-500/20 transition-all outline-none font-bold appearance-none"
                >
                  <option value="">Select a worker...</option>
                  {workers.map(w => (
                    <option key={w.id} value={w.id}>{w.name} — {w.skill}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Search size={16} className="text-brand-400" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Task Specifications */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-brand-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-brand-50 rounded-lg text-brand-600"><FileText size={20}/></div>
              <h2 className="font-heading font-bold text-xl">Job Specifications</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-400 ml-1">Category</label>
                <input 
                  required
                  placeholder="e.g. Stitching, Tanning"
                  className="w-full bg-brand-50 border-none px-5 py-4 rounded-2xl text-sm font-bold outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-400 ml-1">Quantity (Units)</label>
                <div className="relative">
                  <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" size={18} />
                  <input 
                    type="number"
                    placeholder="0"
                    className="w-full bg-brand-50 border-none pl-12 pr-5 py-4 rounded-2xl text-sm font-bold outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-400 ml-1">Payment (INR)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" size={18} />
                  <input 
                    type="number"
                    placeholder="Total amount"
                    className="w-full bg-brand-50 border-none pl-12 pr-5 py-4 rounded-2xl text-sm font-bold outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-400 ml-1">Duration (Hours)</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" size={18} />
                  <input 
                    type="number"
                    placeholder="Time to complete"
                    className="w-full bg-brand-50 border-none pl-12 pr-5 py-4 rounded-2xl text-sm font-bold outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-400 ml-1">Description / Special Instructions</label>
              <textarea 
                rows={3}
                placeholder="Details about quality, material handling, or finish..."
                className="w-full bg-brand-50 border-none px-5 py-4 rounded-2xl text-sm font-bold outline-none resize-none"
              />
            </div>
          </section>

          {/* Section 3: Status Summary */}
          <div className="flex items-center gap-4 p-6 bg-brand-900 rounded-[2rem] text-white">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="text-accent-green" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Initial Status</p>
              <p className="text-sm font-bold">Assigned & Pending Handover</p>
            </div>
            <div className="ml-auto text-right">
              <AlertCircle size={20} className="text-brand-400" />
            </div>
          </div>

          <button 
            disabled={loading}
            className={`w-full py-6 rounded-[2.5rem] font-heading font-black text-xl tracking-tight transition-all
              ${loading ? 'bg-brand-400 cursor-not-allowed' : 'bg-brand-600 hover:bg-brand-900 text-white shadow-xl shadow-brand-200'}
            `}
          >
            {loading ? "Dispatching Work Order..." : "Confirm & Assign Task"}
          </button>
        </form>
      </main>
    </div>
  );
}