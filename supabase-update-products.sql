-- ============================================
-- 每月更新护肤品数据脚本
-- ============================================
-- 使用说明：
-- 1. 在 Supabase 后台 SQL Editor 中执行此脚本
-- 2. 或者设置定时任务自动执行
-- ============================================

-- 查看当前产品数量
SELECT COUNT(*) as total_products FROM products;

-- 按品牌统计
SELECT brand, COUNT(*) as count FROM products GROUP BY brand ORDER BY count DESC;

-- 按国家统计
SELECT country, COUNT(*) as count FROM products GROUP BY country ORDER BY count DESC;

-- 按分类统计
SELECT category, COUNT(*) as count FROM products GROUP BY category ORDER BY count DESC;

-- 查看最近添加的产品
SELECT name, brand, created_at FROM products ORDER BY created_at DESC LIMIT 10;

-- ============================================
-- 每月更新建议的操作：
-- 1. 删除超过12个月未更新的产品
-- 2. 更新现有产品的评价数量
-- 3. 添加新产品
-- ============================================

-- 示例：删除超过12个月未更新的产品（取消注释执行）
-- DELETE FROM products
-- WHERE updated_at < NOW() - INTERVAL '12 months';

-- 示例：标记产品为需要审核（取消注释执行）
-- UPDATE products SET source = 'pending_review' WHERE source = 'auto_updated';

-- ============================================
-- 添加新产品时请使用以下格式：
-- INSERT INTO products (name, brand, category, price, key_ingredients,
--                       suitable_skin_types, rating, reviews_count, source,
--                       country, is_affordable, description)
-- VALUES ('产品名称', '品牌', '分类', '价格', '核心成分',
--         ARRAY['DS', 'DR'], 评分, 评价数, 'manual', '中国', true, '产品描述');
-- ============================================

-- 创建一个函数来记录更新日志
CREATE TABLE IF NOT EXISTS product_update_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  update_date TIMESTAMPTZ DEFAULT NOW(),
  products_count INT,
  notes TEXT
);

-- 记录本次查看日志
INSERT INTO product_update_log (products_count, notes)
SELECT COUNT(*), 'Monthly check' FROM products;

-- 查看更新日志
SELECT * FROM product_update_log ORDER BY update_date DESC;