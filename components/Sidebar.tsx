"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
    Menu, Bell, X, ChevronRight, User, BarChart3, Link2 
} from 'lucide-react';

export default function Sidebar() {
    type PanelType = 'menu' | 'notify' | null;
    
        const [activePanel, setActivePanel] = useState<PanelType>(null);
    
        const togglePanel = (panel: Exclude<PanelType, null>) => {
            setActivePanel((prevPanel) => (prevPanel === panel ? null : panel));
    };

    const menuOptions = [
        { name: 'Active Chains', icon: <Link2 size={20} />, href: '/profile/owner/homepage/activechains' },
        { name: 'My Profile', icon: <User size={20} />, href: '/profile/owner/homepage/myprofile' },
        { name: 'Reports', icon: <BarChart3 size={20} />, href: '/profile/owner/homepage/reports' },
    ];

    const notifications = [
        { id: 1, type: 'urgent', title: 'Delayed Handover', desc: 'Batch #402 stuck', time: '12m ago', color: 'bg-red-50 text-red-700' },
        { id: 2, type: 'success', title: 'Payment Released', desc: '₹4,200 sent', time: '2h ago', color: 'bg-emerald-50 text-emerald-700' },
    ];

    return (
        <aside className="relative flex z-50">
            {/* Fixed Vertical Strip */}
            <div className="w-16 bg-brand-900 flex flex-col items-center py-6 gap-8 border-r border-white/10 h-screen">
                <button 
                    onClick={() => togglePanel('menu')}
                    className={`p-3 rounded-xl transition-all ${activePanel === 'menu' ? 'bg-brand-500 text-white' : 'text-brand-300 hover:bg-white/10'}`}
                >
                    <Menu size={24} />
                </button>

                <button 
                    onClick={() => togglePanel('notify')}
                    className={`p-3 rounded-xl transition-all relative ${activePanel === 'notify' ? 'bg-brand-500 text-white' : 'text-brand-300 hover:bg-white/10'}`}
                >
                    <Bell size={24} />
                    {activePanel !== 'notify' && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-brand-900" />}
                </button>

                <div className="mt-auto p-1 bg-brand-700 rounded-full border border-white/10">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-400 to-brand-200" />
                </div>
            </div>

            {/* Slide-out Panels */}
            <AnimatePresence mode="wait">
                {activePanel === 'menu' && (
                    <motion.div key="menu" initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="w-72 bg-white border-r border-brand-100 shadow-2xl h-screen p-8">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="font-black text-2xl tracking-tighter">Options</h2>
                            <X size={20} className="text-brand-300 cursor-pointer" onClick={() => setActivePanel(null)} />
                        </div>
                        <nav className="space-y-2">
                            {menuOptions.map((opt) => (
                                <Link key={opt.name} href={opt.href} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-brand-50 group transition-all">
                                    <div className="text-brand-400 group-hover:text-brand-900">{opt.icon}</div>
                                    <span className="font-bold">{opt.name}</span>
                                    <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}

                {activePanel === 'notify' && (
                    <motion.div key="notify" initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="w-80 bg-white border-r border-brand-100 shadow-2xl h-screen p-6 overflow-y-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="font-bold text-xl">Updates</h2>
                            <X size={20} className="text-brand-300 cursor-pointer" onClick={() => setActivePanel(null)} />
                        </div>
                        <div className="space-y-4">
                            {notifications.map(n => (
                                <div key={n.id} className={`p-4 rounded-2xl border ${n.color}`}>
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">{n.type}</p>
                                    <h4 className="font-bold text-sm">{n.title}</h4>
                                    <p className="text-xs mt-1 opacity-80">{n.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </aside>
    );
}