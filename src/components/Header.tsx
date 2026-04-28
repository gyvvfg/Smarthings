/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag, Search, Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { Badge } from './ui/Badge.tsx';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onGoHome: () => void;
}

export default function Header({ cartCount, onOpenCart, onGoHome }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button 
            onClick={onGoHome}
            className="group flex flex-col items-start"
          >
            <span className="text-2xl font-black text-white tracking-tighter uppercase group-hover:text-brand-purple transition-colors">NEXUS</span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-slate-500 font-bold -mt-1 ml-1 group-hover:text-slate-300 transition-colors">Engineering</span>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            <button className="text-xs uppercase font-bold tracking-widest text-slate-400 hover:text-white transition-colors">Shop</button>
            <button className="text-xs uppercase font-bold tracking-widest text-slate-400 hover:text-white transition-colors">Philosophy</button>
            <button className="text-xs uppercase font-bold tracking-widest text-slate-400 hover:text-white transition-colors">Journal</button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-white transition-colors hidden sm:block">
            <Search size={22} />
          </button>
          
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-slate-400 hover:text-white transition-colors group"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0 right-0 w-4 h-4 bg-brand-purple text-[10px] font-black text-white rounded-full flex items-center justify-center shadow-lg"
              >
                {cartCount}
              </motion.span>
            )}
            <span className="hidden sm:inline-block ml-2 text-xs uppercase font-black tracking-widest translate-y-[1px]">Bag</span>
          </button>

          <button className="md:hidden p-2 text-slate-400 hover:text-white transition-colors">
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
