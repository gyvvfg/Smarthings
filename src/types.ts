/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  stockCount: number;
  category: string;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
