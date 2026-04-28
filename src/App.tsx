/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header.tsx';
import ProductDetail from './components/ProductDetail.tsx';
import Cart from './components/Cart.tsx';
import { PRODUCTS } from './data.ts';
import { Product, CartItem } from './types.ts';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from './components/ui/Badge.tsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'pdp' | 'home'>('pdp');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    // Show high-impact internal notification
    setNotification(`${product.name} added to bag`);
    setIsCartOpen(true);
    
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-purple/30">
      <Header 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onGoHome={() => setCurrentPage('pdp')}
      />

      <main className="flex-1">
        {currentPage === 'pdp' && (
          <ProductDetail 
            product={PRODUCTS[0]} 
            onAddToCart={handleAddToCart}
          />
        )}
        
        {/* Placeholder for Homepage / Collection in Phase 3 */}
        {currentPage === 'home' && (
          <div className="max-w-7xl mx-auto px-6 py-20 text-center">
            <h2 className="text-4xl mb-4">Welcome to Nexus</h2>
            <p className="text-slate-500 uppercase tracking-widest font-bold">Engineering high-performance gear</p>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800 py-12 px-6 bg-black/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-black uppercase text-white mb-6">NEXUS Labs</h3>
            <p className="text-slate-500 max-w-sm mb-6 grayscale hover:grayscale-0 transition-all">
              We design tools for the physical and digital avant-garde. Our obsession is the intersection of material science and human potential.
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-brand-purple transition-colors cursor-pointer">
                <span className="text-[10px] uppercase font-bold">IG</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-brand-purple transition-colors cursor-pointer">
                <span className="text-[10px] uppercase font-bold">TW</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-400 mb-6 font-mono">Operations</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <li className="hover:text-white cursor-pointer transition-colors">Manifesto</li>
              <li className="hover:text-white cursor-pointer transition-colors">Partnerships</li>
              <li className="hover:text-white cursor-pointer transition-colors">Warranty</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-400 mb-6 font-mono">Newsletter</h4>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="EMAIL ADDRESS"
                className="w-full bg-slate-900/50 border border-slate-800 px-4 py-3 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-brand-purple transition-all"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-brand-purple uppercase tracking-[0.2em] hover:text-white transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-600">
            © 2026 Nexus Engineering Labs.
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-slate-600">
            <span>Security Status: <span className="text-emerald-500">Verified</span></span>
            <span>Uptime: <span className="text-sky-400 font-mono">99.99%</span></span>
          </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

      {/* Global Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 glass-panel border-brand-purple/50 rounded-full shadow-2xl flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-brand-purple animate-ping" />
            <span className="text-xs font-black uppercase text-white tracking-widest">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
