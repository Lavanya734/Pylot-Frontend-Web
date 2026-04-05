"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';


import { 
  Zap, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Settings2, 
  Calendar, 
  Layers, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function CreateChainPage() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: '', workerType: 'Tailor', estimatedDays: 2 },
  ]);

  const addTask = () => {
    setTasks([...tasks, { id: Date.now(), title: '', workerType: 'General', estimatedDays: 1 }]);
  };

  const removeTask = (id:number) => {
    if (tasks.length > 1) setTasks(tasks.filter(t => t.id !== id));
  };

  const handleSubmit = (e : React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate system generating UUID and preparing QR handovers
    setTimeout(() => {
      setLoading(false);
      alert("Chain Generated! Preparing Worker Matching...");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-brand-50/30 text-brand-900 pb-20">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-brand-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/profile/owner/homepage">
          <button className="flex items-center gap-2 text-brand-500 font-bold text-sm hover:text-brand-900 transition-colors">
            <ArrowLeft size={18} /> Back to Dashboard
          </button>
          </Link>
          
          <div className="flex items-center gap-2">
             <span className="text-[10px] font-black uppercase tracking-widest text-brand-400">System Status:</span>
             <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-accent-green">
               <div className="w-1.5 h-1.5 bg-accent-green rounded-full animate-pulse" /> Ready
             </span>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-12">
        <header className="mb-10">
          <div className="w-12 h-12 bg-brand-900 rounded-2xl flex items-center justify-center text-white mb-4 shadow-xl shadow-brand-200">
            <Zap size={24} fill="currentColor" />
          </div>
          <h1 className="text-4xl font-heading font-black tracking-tighter">Initialize New Chain</h1>
          <p className="text-brand-800/50 font-medium mt-2">Define your production nodes. Pylot will handle the handovers.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Basic Info */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-brand-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-brand-50 rounded-lg text-brand-600"><Settings2 size={20}/></div>
              <h2 className="font-heading font-bold text-xl">General Details</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-400 ml-1">Chain / Project Name</label>
                <input 
                  required
                  placeholder="e.g. Summer Silk Collection #04"
                  className="w-full bg-brand-50 border-none px-5 py-4 rounded-2xl text-sm focus:ring-2 focus:ring-brand-500/20 transition-all outline-none font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-400 ml-1">Expected Completion</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-300" size={18} />
                  <input 
                    type="date"
                    className="w-full bg-brand-50 border-none pl-12 pr-5 py-4 rounded-2xl text-sm focus:ring-2 focus:ring-brand-500/20 transition-all outline-none font-bold"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Task Mapping (The Task[] Relation) */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-brand-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-50 rounded-lg text-brand-600"><Layers size={20}/></div>
                <h2 className="font-heading font-bold text-xl">Production Nodes (Tasks)</h2>
              </div>
              <button 
                type="button"
                onClick={addTask}
                className="text-xs font-black uppercase tracking-widest bg-brand-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-brand-600 transition-all"
              >
                <Plus size={14} /> Add Node
              </button>
            </div>

            <div className="space-y-4">
              {tasks.map((task, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={task.id} 
                  className="flex items-end gap-4 bg-brand-50/50 p-4 rounded-3xl border border-brand-100/50 group"
                >
                  <div className="flex-grow grid md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-widest text-brand-400">Process Name</label>
                      <input 
                        placeholder="e.g. Stitching"
                        className="w-full bg-white border border-brand-100 px-4 py-3 rounded-xl text-xs font-bold outline-none focus:border-brand-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-widest text-brand-400">Required Skill</label>
                      <select className="w-full bg-white border border-brand-100 px-4 py-3 rounded-xl text-xs font-bold outline-none appearance-none">
                        <option>Tailoring</option>
                        <option>Embroidery</option>
                        <option>Quality Control</option>
                        <option>Logistics</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-widest text-brand-400">Est. Duration (Days)</label>
                      <input 
                        type="number"
                        defaultValue={task.estimatedDays}
                        className="w-full bg-white border border-brand-100 px-4 py-3 rounded-xl text-xs font-bold outline-none"
                      />
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => removeTask(task.id)}
                    className="p-3 text-brand-200 hover:text-red-500 transition-colors mb-1"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-brand-50 rounded-[2rem] border-2 border-dashed border-brand-200 flex items-center justify-center">
              <p className="text-xs font-medium text-brand-400 text-center">
                Nodes will be linked sequentially. Each node will generate a <span className="text-brand-600 font-bold">unique QR Code</span> for verification.
              </p>
            </div>
          </section>

          {/* Submission Area */}
          <div className="flex flex-col gap-4">
            <button 
              disabled={loading}
              className={`w-full py-6 rounded-[2rem] font-heading font-black text-xl tracking-tight transition-all flex items-center justify-center gap-3 shadow-2xl shadow-brand-200
                ${loading ? 'bg-brand-400 cursor-not-allowed' : 'bg-brand-600 hover:bg-brand-900 text-white'}
              `}
            >
              {loading ? (
                <>Building Chain Infrastructure...</>
              ) : (
                <>Create Production Chain <ChevronRight size={24}/></>
              )}
            </button>
            <p className="text-center text-[10px] font-bold text-brand-400 uppercase tracking-widest">
              By submitting, you agree to Pylot's Smart-Contract node distribution.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}