import { supabase } from './supabase';

// 产品类型定义
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  key_ingredients: string;
  suitable_skin_types: string[];
  rating: number;
  reviews_count: number;
  source: string;
  country: string;
  is_affordable: boolean;
  image_url: string;
  purchase_url: string;
  description: string;
  created_at: string;
  updated_at: string;
}

// 获取所有产品
export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('获取产品失败:', err);
    return [];
  }
}

// 获取分类产品
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('rating', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('获取分类产品失败:', err);
    return [];
  }
}

// 搜索产品
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,brand.ilike.%${query}%,category.ilike.%${query}%`)
      .order('rating', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('搜索产品失败:', err);
    return [];
  }
}

// 按肤质获取推荐产品
export async function getProductsForSkinType(skinTypeCode: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .contains('suitable_skin_types', [skinTypeCode])
      .eq('is_affordable', true)
      .order('rating', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('获取肤质推荐失败:', err);
    return [];
  }
}

// 获取最新产品
export async function getLatestProducts(limit: number = 20): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('获取最新产品失败:', err);
    return [];
  }
}

// 获取热门产品（高评分）
export async function getPopularProducts(limit: number = 20): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('rating', { ascending: false })
      .order('reviews_count', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('获取热门产品失败:', err);
    return [];
  }
}

// 获取国货产品
export async function getChineseProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('country', '中国')
      .order('rating', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('获取国货产品失败:', err);
    return [];
  }
}

// 获取开价品牌
export async function getAffordableProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_affordable', true)
      .order('rating', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('获取开价产品失败:', err);
    return [];
  }
}

// 获取所有分类
export async function getCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('category');

    if (error) throw error;
    const categories = [...new Set(data?.map(p => p.category) || [])];
    return categories;
  } catch (err) {
    console.error('获取分类失败:', err);
    return [];
  }
}