"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Plus, Clock, CheckCircle2, TrendingUp, Package,
    Activity, Zap, Bell, X, ChevronRight, Menu,
    User, BarChart3, Link2, ArrowUpRight
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';

export default function OwnerDashboard() {
    // 1. STATE MANAGEMENT
    type PanelType = 'menu' | 'notify' | null;

    const [activePanel, setActivePanel] = useState<PanelType>(null);

    const togglePanel = (panel: Exclude<PanelType, null>) => {
        setActivePanel((prevPanel) => (prevPanel === panel ? null : panel));
    };


    // 2. MOCK DATA
    const menuOptions = [
        { name: 'Active Chains', icon: <Link2 size={20} />, href: 'homepage/activechains' },
        { name: 'My Profile', icon: <User size={20} />, href: 'homepage/myprofile' },
        { name: 'Reports', icon: <BarChart3 size={20} />, href: 'homepage/reports' },
    ];

    const notifications = [
        { id: 1, type: 'urgent', title: 'Delayed Handover', desc: 'Batch #402 stuck at Stitching', time: '12m ago', color: 'bg-red-50 text-red-700 border-red-100' },
        { id: 2, type: 'action', title: 'New Worker Request', desc: 'Arjun K. wants to join Hemming', time: '45m ago', color: 'bg-brand-50 text-brand-700 border-brand-100' },
    ];

    return (
        <div className="min-h-screen bg-brand-50/30 text-brand-900 flex overflow-hidden font-sans">


            {/* --- MAIN DASHBOARD CONTENT --- */}
            <div className="flex-1 h-screen overflow-y-auto">
                <main className="max-w-6xl mx-auto px-8 py-12">

                    {/* TOP ACTION BAR */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-brand-100 pb-10 mb-12">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight">Welcome, Jai</h1>
                            <p className="text-brand-500 font-medium">Efficiency: <span className="text-accent-green font-bold">84%</span></p>
                        </div>
                        <div className="flex gap-3">
                            <Link href="homepage/addtask">
                                <button className="bg-white border border-brand-200 text-brand-900 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:border-brand-500 transition-all shadow-sm">
                                    <Plus size={18} className="text-brand-500" /> Add Task
                                </button>
                            </Link>
                            <Link href="homepage/createchain">
                                <button className="bg-brand-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-700 transition-all shadow-lg">
                                    <Zap size={18} fill="white" /> Start Chain
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* STATS CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                        {[
                            { label: "Active Chains", val: "12", icon: <Package className="text-blue-500" /> },
                            { label: "Verified Units", val: "450", icon: <TrendingUp className="text-brand-600" /> },
                            { label: "Payouts", val: "₹14.2k", icon: <CheckCircle2 className="text-emerald-500" /> },
                            { label: "Efficiency", val: "92%", icon: <Activity className="text-purple-500" /> },
                        ].map((card, i) => (
                            <div key={i} className="bg-white p-6 rounded-[2rem] border border-brand-100 shadow-sm">
                                <div className="p-2 bg-brand-50 w-fit rounded-xl mb-4">{card.icon}</div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-400">{card.label}</p>
                                <h3 className="text-3xl font-black tracking-tighter mt-1">{card.val}</h3>
                            </div>
                        ))}
                    </div>

                    {/* RECENT ACTIVITY */}
                    <section>
                        <h3 className="font-bold text-xl mb-6">Live Production Nodes</h3>
                        <div className="bg-white rounded-[2.5rem] border border-brand-100 overflow-hidden shadow-sm">
                            {[
                                { stage: "Stitching", batch: "#992", status: "Success", units: "120", time: "24m ago" },
                                { stage: "Quality Check", batch: "#988", status: "Verified", units: "85", time: "1h ago" },
                                { stage: "Hemming", batch: "#991", status: "In Progress", units: "200", time: "2h ago" },
                            ].map((item, i) => (
                                <div key={i} className="p-6 flex justify-between items-center border-b last:border-0 border-brand-50 hover:bg-brand-50/50 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-brand-50 text-brand-500 rounded-xl flex items-center justify-center"><Clock size={18} /></div>
                                        <div>
                                            <p className="font-bold">{item.stage} <span className="text-brand-300 ml-2">{item.batch}</span></p>
                                            <p className="text-xs text-brand-400">{item.time}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black">{item.units} Units</p>
                                        <p className="text-[10px] uppercase font-bold text-brand-500">{item.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}