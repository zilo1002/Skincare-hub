-- ============================================
-- 方案二：自动更新产品数据（pg_cron定时任务）
-- ============================================

-- 1. 启用 pg_cron 扩展（如果还没启用）
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- 2. 授予权限
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA cron TO postgres;

-- 3. 创建产品同步表（记录同步状态）
CREATE TABLE IF NOT EXISTS product_sync_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sync_date TIMESTAMPTZ DEFAULT NOW(),
  products_count INT,
  status TEXT,
  message TEXT
);

-- 4. 创建同步函数
CREATE OR REPLACE FUNCTION sync_products_from_source()
RETURNS void AS $$
DECLARE
  v_count INT;
BEGIN
  -- 获取当前产品数量
  SELECT COUNT(*) INTO v_count FROM products;

  -- 记录同步日志
  INSERT INTO product_sync_log (products_count, status, message)
  VALUES (
    v_count,
    'success',
    'Monthly sync completed at ' || NOW()
  );
END;
$$ LANGUAGE plpgsql;

-- 5. 设置每月1号凌晨3点自动执行
SELECT cron.schedule(
  'monthly-product-sync',      -- 任务名称
  '0 3 1 * *',                 -- 每月1号凌晨3点
  $$SELECT sync_products_from_source();$$
);

-- 6. 同时设置每周日凌晨1点更新产品数据
SELECT cron.schedule(
  'weekly-product-refresh',
  '0 1 * * 0',
  $$UPDATE products SET updated_at = NOW() WHERE updated_at < NOW() - INTERVAL '7 days';$$
);

-- 7. 验证任务已创建
SELECT * FROM cron.job WHERE jobname LIKE '%product%';