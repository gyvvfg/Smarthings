/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'purple' | 'sky' | 'emerald' | 'orange' | 'outline';
}

export const Badge = ({ 
  className = '', 
  variant = 'purple', 
  children,
  ...props 
}: BadgeProps) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border';
  
  const variants = {
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    sky: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    orange: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
    outline: 'border-slate-800 text-slate-500',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
