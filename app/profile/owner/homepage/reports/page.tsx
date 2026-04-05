"use client";

import React from 'react';
import { 
    IndianRupee, Users, Clock, Zap, 
    Target, AlertTriangle, ShieldCheck, 
    ArrowRight, Globe, Factory, Microscope
} from 'lucide-react';

export default function DetailedReportsPage() {
    return (
        <div className="space-y-10 pb-20">
            {/* --- HEADER --- */}
            <header>
                <h1 className="text-4xl font-black tracking-tighter text-brand-900">Resource & Insight Ledger</h1>
                <p className="text-brand-500 font-medium mt-2 flex items-center gap-2">
                    <Globe size={16} /> Cumulative Data: March 01 — March 31, 2026
                </p>
            </header>

            {/* --- SECTION 1: TOTAL RESOURCE CONSUMPTION --- */}
            <section>
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-brand-400 mb-6 flex items-center gap-2">
                    <div className="h-px w-8 bg-brand-200" /> Total Resources Used
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: "Capital Deployed", val: "₹4,82,500", detail: "Wages + Materials", icon: <IndianRupee />, color: "text-emerald-600" },
                        { label: "Workforce", val: "142 Workers", detail: "Across 4 Nodes", icon: <Users />, color: "text-blue-600" },
                        { label: "Production Time", val: "1,240 Hours", detail: "Active Floor Time", icon: <Clock />, color: "text-amber-600" },
                        { label: "Energy / Infra", val: "840 kWh", detail: "Unit Operations", icon: <Zap />, color: "text-purple-600" },
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-brand-100 p-6 rounded-[2rem] shadow-sm group hover:border-brand-900 transition-all">
                            <div className={`p-3 bg-brand-50 rounded-2xl w-fit mb-4 ${item.color}`}>{item.icon}</div>
                            <h3 className="text-2xl font-black tracking-tight">{item.val}</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-brand-400 mt-1">{item.label}</p>
                            <div className="h-px w-full bg-brand-50 my-3" />
                            <p className="text-xs font-medium text-brand-500">{item.detail}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- SECTION 2: GAINED INSIGHTS (The "Why") --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Efficiency Insights */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-brand-400 flex items-center gap-2">
                        <div className="h-px w-8 bg-brand-200" /> Strategic Insights
                    </h2>
                    
                    <div className="space-y-4">
                        {[
                            { 
                                title: "Bottleneck Detected: Hemming", 
                                desc: "Production slows by 18% during the Hemming stage due to manual thread-loading. Suggesting automated dispensers.",
                                type: "critical",
                                icon: <AlertTriangle className="text-red-500" />
                            },
                            { 
                                title: "High-Performance Node: Jaipur Unit 2", 
                                desc: "This unit consistently delivers 12% above target with a 0.2% rejection rate. Best practices should be replicated.",
                                type: "success",
                                icon: <ShieldCheck className="text-emerald-500" />
                            },
                            { 
                                title: "Material Wastage Reduction", 
                                desc: "AI-assisted cutting patterns have saved approximately ₹22,000 in raw fabric this month.",
                                type: "info",
                                icon: <Target className="text-blue-500" />
                            }
                        ].map((insight, i) => (
                            <div key={i} className="bg-white/80 backdrop-blur-md border border-brand-100 p-6 rounded-[2.5rem] flex gap-5 items-start hover:shadow-md transition-all">
                                <div className="mt-1">{insight.icon}</div>
                                <div>
                                    <h4 className="font-bold text-brand-900">{insight.title}</h4>
                                    <p className="text-sm text-brand-500 mt-1 leading-relaxed">{insight.desc}</p>
                                    <button className="mt-3 text-[10px] font-black uppercase tracking-widest text-brand-900 flex items-center gap-1 hover:gap-2 transition-all">
                                        View Action Plan <ArrowRight size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Node Health Sidebar */}
                <div className="space-y-6">
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-brand-400 flex items-center gap-2">
                        <div className="h-px w-8 bg-brand-200" /> Node Health
                    </h2>
                    <div className="bg-brand-900 text-white p-8 rounded-[3rem] shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-xl mb-6">Quality Audit</h3>
                            <div className="space-y-6">
                                {[
                                    { label: "Fabric Quality", score: "98%" },
                                    { label: "Stitching Durability", score: "94%" },
                                    { label: "Color Fastness", score: "91%" },
                                    { label: "Packaging Integrity", score: "100%" },
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-tighter">
                                            <span>{stat.label}</span>
                                            <span>{stat.score}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-brand-400" style={{ width: stat.score }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                    </div>
                </div>
            </div>

            {/* --- SECTION 3: RELEVANT EXTRAS (Unit Comparisons) --- */}
            <section className="bg-white border border-brand-100 rounded-[3rem] p-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h3 className="font-black text-2xl tracking-tight">Supply Chain Velocity</h3>
                        <p className="text-brand-500 text-sm">Time taken from raw material to finished product.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-brand-50 p-2 rounded-2xl">
                        <div className="px-4 py-2 bg-white rounded-xl text-xs font-black shadow-sm">Global Avg: 14 Days</div>
                        <div className="px-4 py-2 text-brand-900 text-xs font-black">Your Avg: 11.2 Days</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-start gap-4 p-6 bg-brand-50/50 rounded-2xl border border-dashed border-brand-200">
                        <div className="p-3 bg-white rounded-xl shadow-sm"><Factory size={20} /></div>
                        <div>
                            <h4 className="font-bold text-sm">Manufacturer Efficiency</h4>
                            <p className="text-xs text-brand-500 mt-1 italic">"Nodes in the Northern region are showing 4% higher throughput but use 7% more energy."</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-6 bg-brand-50/50 rounded-2xl border border-dashed border-brand-200">
                        <div className="p-3 bg-white rounded-xl shadow-sm"><Microscope size={20} /></div>
                        <div>
                            <h4 className="font-bold text-sm">R&D Opportunity</h4>
                            <p className="text-xs text-brand-500 mt-1 italic">"Recycled polyester blend nodes have a higher 'Ease of Stitch' score than pure synthetics."</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}