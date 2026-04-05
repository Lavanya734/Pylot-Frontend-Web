"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, MapPin, Phone, Award, Briefcase, ChevronDown, Bell } from 'lucide-react';

// Enhanced Indian Mock Data
const MOCK_WORKERS = [
    { id: 1, name: "Ananya Sharma", skill: "Master Tailor", rating: 4.9, exp: 12, dist: 1.2, loc: "Malviya Nagar, Delhi", gender: "female", available: true, phone: "+91 98710 XXXXX" },
    { id: 2, name: "Rajesh Kupte", skill: "Leather Artisan", rating: 4.7, exp: 8, dist: 3.5, loc: "Dharavi, Mumbai", gender: "male", available: true, phone: "+91 98200 XXXXX" },
    { id: 3, name: "Priya Das", skill: "Zardozi Specialist", rating: 4.8, exp: 15, dist: 0.8, loc: "Barabazar, Kolkata", gender: "female", available: false, phone: "+91 94330 XXXXX" },
    { id: 4, name: "Arjun Verma", skill: "Dyeing Master", rating: 4.5, exp: 6, dist: 5.2, loc: "Sanganer, Jaipur", gender: "male", available: true, phone: "+91 96110 XXXXX" },
    { id: 5, name: "Sunita Reddy", skill: "Quality Auditor", rating: 4.9, exp: 10, dist: 2.1, loc: "Peenya, Bengaluru", gender: "female", available: true, phone: "+91 80500 XXXXX" },
];

export default function MarketplacePage() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-brand-50/30 text-brand-900 font-sans flex flex-col">

            {/* Search Header Strip */}
            <div className="bg-white border-b border-brand-100 sticky top-0 z-40 px-6 py-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-grow w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search for 'Hand-embroidery', 'Leather' or 'Quality check'..."
                            className="w-full bg-brand-50/50 border border-brand-100 pl-12 pr-4 py-3 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="hidden md:flex items-center gap-2 bg-brand-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-brand-800 transition-all">
                        Find Partners
                    </button>
                </div>
            </div>

            <div className="flex flex-1 max-w-7xl mx-auto w-full">

                {/* SIDEBAR: Filters */}
                <aside className="hidden lg:block w-72 p-8 border-r border-brand-100 bg-white/50 backdrop-blur-sm">
                    <div className="sticky top-28">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-heading font-bold text-lg flex items-center gap-2">
                                <Filter size={18} /> Filters
                            </h2>
                            <button className="text-[10px] font-black uppercase tracking-widest text-brand-500">Reset</button>
                        </div>

                        <div className="space-y-8">
                            {/* Category Filter */}
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-400 mb-4">Industrial Skill</p>
                                <div className="space-y-2">
                                    {['Textiles', 'Leatherwork', 'Metalwork', 'Electronics', 'Logistics'].map(cat => (
                                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-brand-200 text-brand-600 focus:ring-brand-500" />
                                            <span className="text-sm font-medium text-brand-800 group-hover:text-brand-600 transition-colors">{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Distance Filter */}
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-400 mb-4">Distance Range</p>
                                <input type="range" className="w-full h-1.5 bg-brand-100 rounded-lg appearance-none cursor-pointer accent-brand-600" />
                                <div className="flex justify-between mt-2 text-[10px] font-bold text-brand-400">
                                    <span>0km</span>
                                    <span>50km</span>
                                </div>
                            </div>

                            {/* Verification Toggle */}
                            <div className="p-4 bg-brand-900 rounded-2xl text-white">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-[10px] font-bold uppercase">Pylot Verified</p>
                                    <div className="w-8 h-4 bg-brand-500 rounded-full relative">
                                        <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full" />
                                    </div>
                                </div>
                                <p className="text-[10px] opacity-60 leading-relaxed italic">Only show workers with QR handover history.</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* MAIN: Results Feed */}
                <main className="flex-1 p-6 lg:p-10">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-2xl font-heading font-bold">Recommended Partners</h2>
                            <p className="text-sm text-brand-800/40 font-medium">Showing top rated workers near your location</p>
                        </div>
                        <div className="flex items-center gap-2 bg-white border border-brand-100 px-4 py-2 rounded-xl text-xs font-bold text-brand-700 cursor-pointer">
                            Sort by: Distance <ChevronDown size={14} />
                        </div>
                    </div>

                    <div className="grid gap-6">
                        <AnimatePresence>
                            {MOCK_WORKERS.map((worker, index) => (
                                <motion.div
                                    key={worker.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative bg-white border border-brand-100 rounded-[2.5rem] p-6 hover:shadow-2xl hover:border-brand-300 transition-all cursor-pointer flex flex-col md:flex-row gap-8 overflow-hidden"
                                >
                                    {/* Avatar Area */}
                                    <div className="relative">
                                        <div className={`w-24 h-24 rounded-3xl overflow-hidden border-4 border-brand-50 shadow-inner
                      ${worker.gender === 'female' ? 'bg-rose-50' : 'bg-sky-50'}`}>

                                            <img
                                                src={
                                                    worker.gender === 'female'
                                                        ? 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png'
                                                        : 'https://cdn-icons-png.flaticon.com/512/4140/4140051.png'
                                                }
                                                alt={worker.name}
                                                className="w-full h-full object-contain p-2"
                                            />
                                        </div>
                                        {worker.available && (
                                            <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full shadow-lg">
                                                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Worker Info */}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                                            <div>
                                                <h3 className="text-xl font-heading font-bold text-brand-900 group-hover:text-brand-600 transition-colors">
                                                    {worker.name}
                                                </h3>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-brand-500 text-xs font-black uppercase tracking-widest flex items-center gap-1">
                                                        <Briefcase size={12} /> {worker.skill}
                                                    </span>
                                                    <span className="w-1 h-1 bg-brand-200 rounded-full" />
                                                    <span className="text-brand-400 text-xs font-bold flex items-center gap-1">
                                                        <Award size={12} /> {worker.exp} Years Exp.
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1 bg-brand-50 px-3 py-1.5 rounded-full text-brand-700">
                                                <Star size={14} className="fill-brand-500 text-brand-500" />
                                                <span className="text-sm font-black">{worker.rating}</span>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2 text-xs text-brand-800/60 font-medium">
                                                    <MapPin size={14} className="text-brand-300" /> {worker.loc}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-brand-800/60 font-medium">
                                                    <div className="w-3.5 text-brand-300 font-bold">📏</div> {worker.dist} km from your factory
                                                </div>
                                            </div>

                                            <div className="flex md:justify-end items-center gap-3">
                                                <button className="flex-1 md:flex-none border border-brand-200 hover:border-brand-500 px-5 py-2.5 rounded-xl text-xs font-black transition-all">
                                                    View Portfolio
                                                </button>
                                                <button className="flex-1 md:flex-none bg-brand-900 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-brand-600 transition-all flex items-center justify-center gap-2">
                                                    <Bell size={14} /> Send Request
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
}