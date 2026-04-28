/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types.ts';
import { Button } from './ui/Button.tsx';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export default function Cart({ isOpen, onClose, items, onRemove, onUpdateQuantity }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-surface border-l border-slate-800 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black uppercase text-white pb-1">Your Bag</h2>
                <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">
                  {items.length} {items.length === 1 ? 'Item' : 'Items'} Selected
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-slate-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600">
                    <Trash2 size={32} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">Your bag is empty</h3>
                    <p className="text-slate-500 text-sm">Discover high-performance gear to fill it up.</p>
                  </div>
                  <Button variant="outline" onClick={onClose}>Start Shopping</Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-white font-bold text-sm truncate pr-4">{item.name}</h4>
                        <span className="text-sm font-mono text-white font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-3 uppercase tracking-tighter font-bold">{item.category}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-slate-800 rounded-lg bg-black overflow-hidden">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-3 py-1 hover:bg-slate-900 text-slate-400"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-xs font-mono text-white leading-none flex items-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-3 py-1 hover:bg-slate-900 text-slate-400"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-slate-600 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-slate-800 bg-black/40 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-slate-400 text-sm">
                    <span>Subtotal</span>
                    <span className="font-mono">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-500 text-sm">
                    <span>Shipping</span>
                    <span className="font-bold uppercase text-[10px] tracking-widest">Calculated at next step</span>
                  </div>
                  <div className="pt-4 flex justify-between text-white">
                    <span className="text-xl font-black uppercase tracking-tighter">Total</span>
                    <span className="text-2xl font-mono font-black">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button className="w-full py-5 text-md group">
                    Checkout Now
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    Complimentary 2-Year Nexus Warranty Included
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
