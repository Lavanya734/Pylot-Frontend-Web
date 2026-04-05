import { div } from "framer-motion/client";
import { Globe } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex items-center justify-center">

    

    <nav className=" w-[90%] max-w-6xl z-50">
        <div className="bg-brand-900/95 backdrop-blur-lg border border-white/10 px-6 py-3 rounded-2xl flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-3 ">
            {/* The Logo Icon */}
            <div className="w-8 h-8  bg-brand-50 rounded-lg flex items-center justify-center">
              <img src="/logo.png" alt="Pylot Logo" className="w-7 h-7 object-contain rounded-lg" />
            </div>

            {/* The Brand Name */}
            <a href="/">

            <span className="text-2xl font-heading font-bold text-white tracking-tight">
              pylot
            </span>
            </a>
          </div>
          <div className="hidden md:flex gap-8 font-medium text-brand-100/80">

            <a href="/profile/owner/homepage" className="hover:text-white transition-colors">Home</a>
            <a href="/#features" className="hover:text-white transition-colors">Features</a>
            <a href="/#agents" className="hover:text-white transition-colors">AI Agents</a>
            <a href="/marketplace" className="hover:text-white transition-colors">Marketplace</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-1 text-sm font-medium text-white border border-white/20 px-3 py-1 rounded-full hover:bg-white/10">
              <Globe size={14} /> हिन्दी
            </button>
            <button className="bg-brand-500 text-white px-5 py-2 rounded-xl font-bold hover:bg-brand-400 transition-all text-sm shadow-lg">
              Sign Up / Login
            </button>
          </div>
        </div>
      </nav>
      </div>
  );
}