"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3, Wallet, History, ShieldCheck,
    MapPin, Briefcase, ArrowUpRight, Settings, 
    Phone, Mail, Calendar, TrendingUp
} from 'lucide-react';
import { MOCK_OWNER } from '@/app/data/mockOwners';

export default function OwnerProfilePage() {
    const user = MOCK_OWNER;

    // Mock data for the graph
    const monthlyData = [40, 70, 45, 90, 65, 80, 95];

    return (
        <div className="min-h-screen bg-[#F4F7FE] text-slate-900 font-sans antialiased">
            {/* COMPACT NAV-STYLE HEADER */}
            <div className="bg-[#001D66] pb-32 pt-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex items-center gap-6">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="relative"
                            >
                                <div className="h-24 w-24 bg-white rounded-2xl p-1 shadow-xl">
                                    <div className="h-full w-full bg-indigo-50 rounded-xl flex items-center justify-center text-3xl font-bold text-indigo-600">
                                        {user.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 border-4 border-[#001D66] w-8 h-8 rounded-full flex items-center justify-center">
                                    <ShieldCheck className="h-4 w-4 text-white" />
                                </div>
                            </motion.div>

                            <div>
                                <h1 className="text-3xl font-bold text-white mb-1">{user.name}</h1>
                                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-blue-200/70 text-sm">
                                    <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                                        <Briefcase className="h-4 w-4" /> {user.business_name}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="h-4 w-4" /> {user.address || "Mumbai, India"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl border border-white/10 transition-all flex items-center gap-2">
                                <Settings className="h-4 w-4" />
                                <span className="text-sm font-semibold">Settings</span>
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT GRID */}
            <main className="max-w-7xl mx-auto px-6 -mt-20 pb-20">
                <div className="grid grid-cols-12 gap-6">
                    
                    {/* LEFT COLUMN: 8 Units */}
                    <div className="col-span-12 lg:col-span-8 space-y-6">
                        
                        {/* INSIGHT CARDS WITH MINI-GRAPHS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard 
                                label="Total Investment" 
                                value={`₹${user.total_spent.toLocaleString()}`}
                                trend="+12.5%"
                                color="blue"
                                icon={<Wallet />}
                            />
                            <StatCard 
                                label="Active Hires" 
                                value={user.total_transactions.toString()}
                                trend="+3"
                                color="amber"
                                icon={<History />}
                            />
                            <StatCard 
                                label="Credit Limit" 
                                value={`₹${(user.credit_limit || 0) / 1000}k`}
                                trend="Stable"
                                color="emerald"
                                icon={<BarChart3 />}
                            />
                        </div>

                        {/* DATA VISUALIZATION SECTION */}
                        <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800">Operational Insights</h3>
                                    <p className="text-sm text-slate-500">Spending and engagement trend for the last 6 months</p>
                                </div>
                                <select className="bg-slate-50 border border-slate-200 text-sm font-medium px-4 py-2 rounded-xl outline-none">
                                    <option>Last 6 Months</option>
                                    <option>Yearly</option>
                                </select>
                            </div>
                            
                            {/* SVG GRAPH REPRESENTATION */}
                            <div className="h-64 w-full mt-4 flex items-end justify-between gap-2 px-2">
                                {monthlyData.map((val, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                                        <div className="w-full relative flex flex-col justify-end h-48">
                                            <motion.div 
                                                initial={{ height: 0 }}
                                                animate={{ height: `${val}%` }}
                                                transition={{ delay: i * 0.1, duration: 1 }}
                                                className={`w-full max-w-[40px] mx-auto rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 group-hover:from-indigo-600 transition-all relative`}
                                            >
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                    ₹{val}k
                                                </div>
                                            </motion.div>
                                        </div>
                                        <span className="text-[11px] font-bold text-slate-400 uppercase">
                                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* DETAILS LIST */}
                        <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60">
                            <h3 className="text-xl font-bold text-slate-800 mb-8">Account Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                <InfoRow icon={<Phone />} label="Phone" value={user.phone} />
                                <InfoRow icon={<Mail />} label="Email" value="contact@enterprise.com" />
                                <InfoRow icon={<Calendar />} label="Member Since" value="January 2024" />
                                <InfoRow icon={<TrendingUp />} label="Business Model" value={user.business_type} />
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN: 4 Units (Sidebar) */}
                    <div className="col-span-12 lg:col-span-4 space-y-(-10) space-y-10">
                        <div className="bg-[#001D66] rounded-3xl p-8 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h4 className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">Quick Actions</h4>
                                <div className="space-y-3">
                                    <SidebarButton label="Create New Project" primary />
                                    <SidebarButton label="Workforce Analytics" />
                                    <SidebarButton label="Invoices & Tax" />
                                </div>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60">
                            <h4 className="font-bold text-slate-800 mb-6">Trust & Verification</h4>
                            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                                <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                    <ShieldCheck className="h-6 w-6 text-emerald-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">Aadhaar Verified</p>
                                    <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">KYC Complete</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

/* --- REFINED MINI COMPONENTS --- */

function StatCard({ label, value, trend, icon, color }: any) {
    const colors: any = {
        blue: "text-blue-600 bg-blue-50",
        amber: "text-amber-600 bg-amber-50",
        emerald: "text-emerald-600 bg-emerald-50"
    };

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-4 ${colors[color]}`}>
                {React.cloneElement(icon, { size: 22 })}
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
            <div className="flex items-end justify-between">
                <h4 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h4>
                <span className={`text-[10px] px-2 py-1 rounded-md font-bold ${trend.includes('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                    {trend}
                </span>
            </div>
        </div>
    );
}

function InfoRow({ icon, label, value }: any) {
    return (
        <div className="flex items-center gap-4">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                {React.cloneElement(icon, { size: 18 })}
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
                <p className="text-sm font-bold text-slate-700">{value}</p>
            </div>
        </div>
    );
}

function SidebarButton({ label, primary = false }: any) {
    return (
        <button className={`w-full py-4 px-6 rounded-2xl text-sm font-bold flex items-center justify-between group transition-all ${
            primary ? 'bg-blue-500 text-white hover:bg-blue-400' : 'bg-white/10 text-blue-100 hover:bg-white/20 border border-white/10'
        }`}>
            {label}
            <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
    );
}