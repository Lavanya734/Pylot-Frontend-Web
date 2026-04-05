"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronRight,
    MapPin,
    Package,
    User,
    Clock,
    CheckCircle2,
    ArrowRight,
    MoreHorizontal
} from 'lucide-react';

export default function ActiveChainsPage() {
    const chains = [
        {
            id: "CH-992",
            name: "Organic Cotton Polos",
            units: 1200,
            started: "Oct 12",
            nodes: [
                { label: "Spinning", status: "complete" },
                { label: "Dyeing", status: "complete" },
                { label: "Stitching", status: "active", worker: "Rajesh K." },
                { label: "Quality", status: "pending" },
                { label: "Shipping", status: "pending" },
            ]
        },
        {
            id: "CH-845",
            name: "Silk Scarves Batch B",
            units: 450,
            started: "Oct 14",
            nodes: [
                { label: "Weaving", status: "complete" },
                { label: "Printing", status: "active", worker: "Anita Sahay" },
                { label: "Finishing", status: "pending" },
                { label: "Store", status: "pending" },
            ]
        },



        {
            id: "CH-104",
            name: "Full-Grain Leather Totes",
            units: 85,
            started: "Oct 15",
            nodes: [
                { label: "Tanning", status: "complete" },
                { label: "Cutting", status: "complete" },
                { label: "Edge Paint", status: "active", worker: "Vikram Singh" },
                { label: "Assembly", status: "pending" },
                { label: "Packing", status: "pending" },
            ]
        },
        {
            id: "CH-421",
            name: "SMD Circuit Boards (v2.1)",
            units: 2400,
            started: "Oct 16",
            nodes: [
                { label: "Pick-Place", status: "complete" },
                { label: "Reflow", status: "active", worker: "Sonia Mehta" },
                { label: "AOI Test", status: "pending" },
            ]
        },
        {
            id: "CH-773",
            name: "Embroidered Pashmina",
            units: 30,
            started: "Oct 10",
            nodes: [
                { label: "Base Weave", status: "complete" },
                { label: "Tracing", status: "complete" },
                { label: "Embroidery", status: "complete" },
                { label: "Washing", status: "active", worker: "Karan Johar" },
                { label: "Ironing", status: "pending" },
            ]
        },
        {
            id: "CH-339",
            name: "Brass Door Handles",
            units: 600,
            started: "Oct 17",
            nodes: [
                { label: "Casting", status: "active", worker: "Amitav B." },
                { label: "Polishing", status: "pending" },
                { label: "Engraving", status: "pending" },
                { label: "QC", status: "pending" },
            ]
        }
    ];


    ;

    return (
        <div className="min-h-screen bg-brand-50/30 p-6 lg:p-10">
            <header className="max-w-5xl mx-auto mb-10">
                <h1 className="text-4xl font-heading font-black text-brand-900 tracking-tight mb-2">
                    Active Production Chains
                </h1>
                <p className="text-brand-800/50 font-medium">
                    Track real-time handovers and node status across your industry.
                </p>
            </header>

            <div className="max-w-5xl mx-auto space-y-6">
                {chains.map((chain, idx) => (
                    <motion.div
                        key={chain.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group bg-white rounded-[2.5rem] border border-brand-100 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all cursor-pointer overflow-hidden"
                    >
                        <div className="p-8">
                            {/* Card Header */}
                            <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-brand-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                            ID: {chain.id}
                                        </span>
                                        <span className="text-brand-400 text-sm font-medium flex items-center gap-1">
                                            <Clock size={14} /> Started {chain.started}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-heading font-bold text-brand-900">{chain.name}</h3>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black uppercase text-brand-400 tracking-widest">Volume</p>
                                        <p className="text-xl font-black text-brand-900">{chain.units} <span className="text-sm font-medium opacity-50">Units</span></p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-400 group-hover:bg-brand-900 group-hover:text-white transition-colors">
                                        <ChevronRight size={24} />
                                    </div>
                                </div>
                            </div>

                            {/* --- THE ACTUAL CHAIN VISUAL --- */}
                            <div className="relative flex items-center justify-between mt-12 mb-4 px-2">
                                {/* Background Connecting Line */}
                                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-100 -translate-y-1/2 z-0" />

                                {chain.nodes.map((node, i) => (
                                    <div key={i} className="relative z-10 flex flex-col items-center">
                                        {/* Node Circle */}
                                        <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500
                      ${node.status === 'complete' ? 'bg-accent-green border-white text-white' :
                                                node.status === 'active' ? 'bg-brand-600 border-white text-white scale-125 shadow-lg shadow-brand-200' :
                                                    'bg-white border-brand-100 text-brand-200'}
                    `}>
                                            {node.status === 'complete' ? <CheckCircle2 size={18} /> : <span className="text-xs font-bold">{i + 1}</span>}
                                        </div>

                                        {/* Node Label */}
                                        <div className="absolute -top-10 whitespace-nowrap text-center">
                                            <p className={`text-[10px] font-black uppercase tracking-tighter ${node.status === 'active' ? 'text-brand-600' : 'text-brand-400'}`}>
                                                {node.label}
                                            </p>
                                        </div>

                                        {/* Active Stage Indicator */}
                                        {node.status === 'active' && (
                                            <div className="absolute -bottom-12 whitespace-nowrap bg-brand-50 border border-brand-100 px-3 py-1 rounded-lg">
                                                <p className="text-[10px] text-brand-900 font-bold flex items-center gap-1">
                                                    <User size={10} className="text-brand-500" /> {node.worker}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Status Bar */}
                        <div className="bg-brand-50/50 px-8 py-4 flex justify-between items-center border-t border-brand-100">
                            <div className="flex items-center gap-4 text-xs font-bold text-brand-800/60">
                                <span className="flex items-center gap-1"><MapPin size={14} className="text-brand-400" /> Current Location: Jaipur Hub</span>
                                <span className="w-1 h-1 bg-brand-200 rounded-full" />
                                <span className="flex items-center gap-1"><Package size={14} className="text-brand-400" /> Next Node: Quality Control</span>
                            </div>
                            <button className="text-brand-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                                Full Details <ArrowRight size={14} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Stats Footer */}
            <footer className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-brand-900 text-white p-6 rounded-[2rem] flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Ongoing Handovers</p>
                        <h4 className="text-2xl font-black">24 Nodes</h4>
                    </div>
                    <div className="p-3 bg-white/10 rounded-2xl"><MoreHorizontal /></div>
                </div>
                {/* Additional stats cards could go here */}
            </footer>
        </div>
    );
}