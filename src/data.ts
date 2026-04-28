/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types.ts';

export const PRODUCTS: Product[] = [
  {
    id: 'nexus-ultra-watch',
    name: 'Nexus Ultra Smartwatch',
    price: 399.99,
    description: 'The ultimate wearable for peak performance and style. Featuring a titanium chassis and our most advanced health-monitoring sensors.',
    features: [
      '72-hour Battery Life',
      'Advanced ECG Monitoring',
      'Waterproof up to 100m',
      'Satellite Emergency SOS',
      'Always-on Titanium Display'
    ],
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508685096489-7aac29a21bad?q=80&w=2000&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 1240,
    stockCount: 15,
    category: 'Electronics',
    isNew: true
  },
  {
    id: 'nexus-buds-pro',
    name: 'Nexus Buds Pro',
    price: 199.99,
    description: 'Immersive sound, absolute silence. Our next-gen noise-canceling technology adapts to your environment in real-time.',
    features: [
      'Active Noise Cancellation',
      'Spatial 3D Audio',
      'IPX4 Water Resistance',
      'Fast Wireless Charging',
      'Multi-device Pairing'
    ],
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=2010&auto=format&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 856,
    stockCount: 42,
    category: 'Electronics'
  }
];
