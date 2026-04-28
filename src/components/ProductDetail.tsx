/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShieldCheck, Truck, RotateCcw, Zap, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types.ts';
import { Button } from './ui/Button.tsx';
import { Badge } from './ui/Badge.tsx';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetail({ product, onAddToCart }: ProductDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after the main CTA scrolls out of view
      setIsStickyVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Image Section */}
      <div className="space-y-6">
        <div className="glass-card aspect-square overflow-hidden relative group">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              src={product.images[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          
          {product.isNew && (
            <Badge variant="purple" className="absolute top-6 left-6 px-4 py-2 text-sm shadow-xl">
              New Arrival
            </Badge>
          )}

          {product.images.length > 1 && (
            <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeImageIndex === i ? 'bg-brand-purple w-8' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-4">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImageIndex(i)}
              className={`glass-card aspect-square overflow-hidden transition-all p-1 ${
                activeImageIndex === i ? 'border-brand-purple ring-2 ring-brand-purple/20' : 'hover:border-slate-600'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover rounded-xl" />
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col">
        <div className="mb-6 flex flex-wrap gap-3 items-center">
          <Badge variant="sky">Trusted by 10k+ users</Badge>
          <div className="flex items-center gap-1 text-orange-400">
            <Star size={16} fill="currentColor" />
            <span className="font-mono font-bold">{product.rating}</span>
            <span className="text-slate-500 text-xs ml-1">({product.reviewCount} reviews)</span>
          </div>
        </div>

        <h1 className="text-5xl lg:text-7xl mb-4 leading-[0.95]">{product.name}</h1>
        
        <div className="flex items-baseline gap-4 mb-8">
          <span className="text-4xl font-mono font-black text-white">${product.price}</span>
          <span className="text-slate-500 line-through font-mono tracking-tighter decoration-slate-600 text-xl font-bold">
            ${(product.price * 1.25).toFixed(2)}
          </span>
          <Badge variant="emerald">Save 20%</Badge>
        </div>

        <p className="text-slate-400 text-lg leading-relaxed mb-8 border-l-2 border-slate-800 pl-6">
          {product.description}
        </p>

        {/* Urgency Element */}
        <div className="glass-panel p-4 rounded-xl border-l-4 border-orange-500 mb-8 flex items-center gap-4 animate-pulse">
          <Zap className="text-orange-500 fill-orange-500" size={24} />
          <div>
            <p className="text-white font-bold text-sm">High Demand: Selling Fast!</p>
            <p className="text-slate-400 text-xs">Only {product.stockCount} left in stock. Don't miss out.</p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {product.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
              <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-purple">
                <ShieldCheck size={14} />
              </div>
              {feature}
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="space-y-4 mb-12">
          <Button 
            onClick={() => onAddToCart(product)}
            className="w-full py-6 text-lg group"
          >
            <ShoppingCart className="mr-3 group-hover:translate-x-1 transition-transform" size={24} />
            Add to Bag — Secure Checkout
          </Button>
          
          <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-slate-500 px-2">
            <div className="flex items-center gap-2"><Truck size={14} /> Free Express Shipping</div>
            <div className="flex items-center gap-2"><RotateCcw size={14} /> 30-Day Free Returns</div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="pt-8 border-t border-slate-800">
          <p className="text-[10px] uppercase font-bold text-slate-600 tracking-[0.3em] mb-6 text-center">Guaranteed Secure Payments</p>
          <div className="flex justify-center items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all cursor-default">
            <span className="font-mono text-xs border border-slate-700 px-2 py-1 rounded">VISA</span>
            <span className="font-mono text-xs border border-slate-700 px-2 py-1 rounded">MASTERCARD</span>
            <span className="font-mono text-xs border border-slate-700 px-2 py-1 rounded">AMEX</span>
            <span className="font-mono text-xs border border-slate-700 px-2 py-1 rounded">APPLE PAY</span>
          </div>
        </div>
      </div>

      {/* Sticky Conversion Bar */}
      <AnimatePresence>
        {isStickyVisible && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 inset-x-0 z-50 glass-panel border-t border-slate-800 py-4 px-6 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
              <div className="hidden sm:flex items-center gap-4">
                <img src={product.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <h4 className="text-sm font-bold truncate max-w-[200px]">{product.name}</h4>
                  <p className="text-brand-purple font-mono font-bold">${product.price}</p>
                </div>
              </div>
              
              <div className="flex-1 sm:max-w-md flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <p className="text-[10px] uppercase text-orange-500 font-black">Stock Running Low</p>
                  <p className="text-xs text-slate-400">Order in next <span className="text-white font-mono">02:14:55</span></p>
                </div>
                <Button 
                  onClick={() => onAddToCart(product)}
                  className="flex-1 py-4 h-full"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
