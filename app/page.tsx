"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Globe, ShieldCheck, Zap, MessageSquare, Truck, Layers } from 'lucide-react';

export default function HomePage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };


  return (
    <div className="min-h-screen font-sans selection:bg-brand-200 bg-brand-50/30 overflow-x-hidden text-brand-900 relative">
      {/* Bg doodle */}
      <div
        className="absolute inset-0 z-0 opacity-[0.8] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#1a5fff 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* --- Hero Section --- */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 bg-white">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-200/40 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-sky-light/30 blur-[120px]" />
        </div>

        {/* Tagline and intro */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial="initial" animate="animate" variants={fadeIn}>
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-brand-700 uppercase bg-brand-100 rounded-lg">
              Next-Gen MSME Infrastructure
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-brand-900 mb-6 leading-[1.1]">
              Just <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">Pylot</span> It.
            </h1>
            <p className="text-lg md:text-xl text-brand-800/70 mb-10 leading-relaxed">
              The AI backbone for India's small industries. Coordinate workers, track goods with QR verification, and automate payments—all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-brand-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-brand-700 transition-all flex items-center gap-2 shadow-xl shadow-brand-200 group">
                Start Production <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-brand-900 border border-brand-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-brand-50 transition-all">
                View Marketplace
              </button>
            </div>
          </motion.div>

          {/* --- Production Chain visual --- */}
          <motion.div
            className="relative h-[400px] lg:h-[500px] bg-gradient-to-br from-brand-200 to-brand-100 rounded-[2.5rem] border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative flex items-center justify-between w-full px-6 sm:px-12 z-10">
              {/* Box 1: Stitching */}
              <motion.div
                className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col items-center gap-3 w-28 sm:w-32 border-2 border-brand-200"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-600">
                  <Layers size={24} />
                </div>
                <span className="font-heading font-bold text-brand-900 text-[10px] sm:text-xs uppercase tracking-wider text-center">Stitching</span>
              </motion.div>

              {/* Connecting Line */}
              <div className="flex-1 px-2 relative">
                <svg width="100%" height="20" viewBox="0 0 100 20" fill="none">
                  <motion.path
                    d="M0 10 H100"
                    stroke="white"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                  />
                  <motion.circle
                    cx="0" cy="10" r="4" fill="#3d86ff"
                    animate={{ cx: [0, 100] }}
                    transition={{ delay: 1.1, duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </svg>
                <motion.div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-400 text-[8px] sm:text-[10px] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest whitespace-nowrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  Verified Handover
                </motion.div>
              </div>

              {/* Box 2: Hemming */}
              <motion.div
                className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col items-center gap-3 w-28 sm:w-32 border-2 border-brand-200"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-100 rounded-full flex items-center justify-center text-accent-green">
                  <CheckCircle size={24} />
                </div>
                <span className="font-heading font-bold text-brand-900 text-[10px] sm:text-xs uppercase tracking-wider text-center">Hemming</span>
              </motion.div>
            </div>

            {/* Labels and Patterns */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />
            <div className="absolute bottom-8 left-0 w-full text-center px-4">
              <p className="text-blue/80 font-heading font-medium text-base sm:text-lg italic">
                "Production Chain Live: Real-time visibility"
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold">Built for Indian Industry</h2>
          <div className="h-1.5 w-20 bg-brand-500 mx-auto mt-4 rounded-full" />
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            { t: "QR Handovers", d: "QR/OTP-based verification at every goods transfer ensures no disputes.", i: <CheckCircle className="text-accent-green" /> },
            { t: "Live Tracking", d: "Real-time updates on work progress across the entire production chain.", i: <Truck className="text-brand-500" /> },
            { t: "Paytm Integrated", d: "Automated payments linked directly to verified delivery milestones.", i: <Zap className="text-brand-400" /> }
          ].map((feature, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="bg-white p-8 rounded-3xl border border-brand-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mb-6">{feature.i}</div>
              <h4 className="font-heading font-bold text-xl mb-3">{feature.t}</h4>
              <p className="text-brand-800/60 leading-relaxed text-sm">{feature.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- AI Agents Section --- */}
      <section id="agents" className="py-32 bg-brand-900 rounded-[4rem] mx-4 px-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none scale-150" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')` }} />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Automated by AI Agents</h2>
          <p className="text-brand-200/60 mb-16 max-w-2xl mx-auto">Powered by Gemini for intelligent reasoning and task management.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { n: "Matching Agent", d: "AI-powered worker discovery and matching based on task and location.", i: <MessageSquare /> },
              { n: "Pricing Agent", d: "AI assists in negotiations to arrive at a fair market price.", i: <ShieldCheck /> },
              { n: "Quality Agent", d: "Automated checks ensure verified shipment tracking.", i: <Zap /> },
              { n: "Lang Bot", d: "Multilingual chatbot supports communication in local languages.", i: <Globe /> }
            ].map((agent, i) => (
              <div key={i} className="group bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-brand-500 transition-all cursor-default">
                <div className="text-brand-300 group-hover:text-white mb-4 transition-colors">{agent.i}</div>
                <h3 className="font-heading font-bold text-xl text-white mb-2">{agent.n}</h3>
                <p className="text-brand-100/60 group-hover:text-white/80 text-sm leading-relaxed">{agent.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto border-t border-brand-200 pt-10">
          <div className="font-heading font-black text-3xl text-brand-900 mb-4 tracking-tighter">py<span className="text-brand-500">lot</span></div>
          <p className="text-brand-800/50 mb-8 max-w-md mx-auto italic">"Building transparency and trust for India's small industries."</p>
          <div className="flex justify-center gap-12 mb-10 grayscale opacity-40 contrast-125">
            <span className="font-black text-2xl">Paytm</span>
            <span className="font-black text-2xl">DigiLocker</span>
          </div>
          <p className="text-brand-900 font-bold text-[10px] uppercase tracking-[0.3em]">© 2026 PYLOT TECHNOLOGY GROUP</p>
        </div>
      </footer>
    </div>
  );
}