"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_WORKERS, NearbyWorker } from '../data/mockUsers';

export default function MarketplacePage() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">

            {/* SECTION 1: HEADER & SEARCH */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">

                    {/* Brand Logo Area */}
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <div className="h-6 w-6 bg-white rounded-full flex items-center justify-center">
                                <div className="h-2 w-2 bg-blue-600 rounded-full" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">pylot</h1>
                    </div>

                    {/* Aesthetic Search Bar */}
                    <div className="relative flex-grow max-w-md">
                        <input
                            type="text"
                            placeholder="Search by skill or name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-100 border-none px-5 py-3 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </header>

            {/* SECTION 2: RESULTS */}
            <main className="max-w-6xl mx-auto px-6 py-10">

                {/* Filter/Sort Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-lg font-bold">Nearby Results</h2>
                        <p className="text-sm text-slate-500">Found {MOCK_WORKERS.length} workers in your area</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition">Sort by: Distance</button>
                    </div>
                </div>

                {/* Results List */}
                <div className="grid gap-6">
                    <AnimatePresence>
                        {MOCK_WORKERS.map((worker, index) => (
                            <motion.div
                                key={worker.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}


                                whileHover={{
                                    y: -5,        // Lift up slightly
                                    scale: 1.02,   // Grow a tiny bit
                                    transition: { duration: 0.2 }
                                }}

                                // Color & Border transition via Tailwind
                                className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm cursor-pointer transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-6 group hover:border-blue-500 hover:bg-blue-50/30 hover:shadow-xl"
                            >

                                {/* User Photo Placeholder (Left) */}
                                <div className="h-20 w-20 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:shadow-lg transition-all duration-300">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-10 w-10 text-blue-400 group-hover:text-white transition-colors duration-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>

                                {/* User Details (Right) */}
                                <div className="flex-grow w-full">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                {/* Text color changes on group hover */}
                                                <h3 className="text-xl font-bold group-hover:text-blue-700 transition-colors">
                                                    {worker.name}
                                                </h3>
                                                {worker.isAvailable && (
                                                    <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                                                )}
                                            </div>
                                            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
                                                {worker.skillType || "General Professional"}
                                            </p>
                                        </div>

                                        <div className="text-left sm:text-right">
                                            <div className="flex items-center sm:justify-end gap-1 text-yellow-500 font-bold text-lg">
                                                <span>{worker.rating.toFixed(1)}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>
                                            <p className="text-xs text-slate-400 font-medium">{worker.experienceYears || 0} years exp.</p>
                                        </div>
                                    </div>

                                    <hr className="my-4 border-slate-50" />

                                    <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
                                        <div className="flex items-center gap-4 text-slate-500">
                                            <span className="flex items-center gap-1.5">
                                                📍 {worker.address || "Location Hidden"}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                📏 {worker.distanceKm} km away
                                            </span>
                                        </div>
                                        <button className="bg-blue-500 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm">
                                            Contact: {worker.phone}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}