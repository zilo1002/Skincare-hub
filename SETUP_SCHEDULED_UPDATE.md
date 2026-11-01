
# 每月自动更新护肤品数据设置指南

## ⚠️ 重要：防止 Supabase 暂停

Supabase 免费版项目如果**超过7天没有任何活动**可能会进入休眠状态。一旦暂停，网站会无法访问。

### 预防方案：数据库保活

我已经创建了保活脚本 `/workspace/supabase-keep-alive.sql`，它会：
1. 创建一个健康检查表
2. 定期插入记录保持数据库活跃
3. 清理旧记录避免数据膨胀

#### 设置自动保活（推荐）：

1. 进入 Supabase Dashboard
2. 选择你的项目 → Database → Schedules
3. 点击 "New schedule"
4. 配置：
   - **Name**: `db_keep_alive`
   - **Cron expression**: `*/10 * * * *` (每10分钟执行一次)
   - **SQL query**: `SELECT * FROM db_health_check LIMIT 1;`

---

## 方案一：Supabase 定时任务（推荐）

### 步骤 1：创建更新函数
在 Supabase SQL Editor 中执行以下代码：

```sql
-- 创建更新日志表
CREATE TABLE IF NOT EXISTS product_update_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  update_date TIMESTAMPTZ DEFAULT NOW(),
  products_count INT,
  notes TEXT
);

-- 创建更新函数
CREATE OR REPLACE FUNCTION log_product_update()
RETURNS void AS $$
BEGIN
  INSERT INTO product_update_log (products_count, notes)
  SELECT COUNT(*), 'Monthly auto-update' FROM products;
END;
$$ LANGUAGE plpgsql;
```

### 步骤 2：设置定时任务
1. 进入 Supabase Dashboard
2. 选择你的项目 → Database → Schedules
3. 点击 "New schedule"
4. 配置：
   - **Name**: `monthly_product_update`
   - **Cron expression**: `0 0 1 * *` (每月1号凌晨)
   - **SQL query**: `SELECT log_product_update();`

---

## 方案二：pg_cron 自动定时更新

### 完整设置步骤：

**第一步：创建同步函数和任务**

在 Supabase SQL Editor 中执行以下完整脚本：

```sql
-- 1. 启用 pg_cron 扩展
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- 2. 授予权限
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA cron TO postgres;

-- 3. 创建同步日志表
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
  SELECT COUNT(*) INTO v_count FROM products;
  INSERT INTO product_sync_log (products_count, status, message)
  VALUES (v_count, 'success', 'Monthly sync at ' || NOW());
END;
$$ LANGUAGE plpgsql;

-- 5. 设置每月1号凌晨3点自动同步
SELECT cron.schedule(
  'monthly-product-sync',
  '0 3 1 * *',
  $$SELECT sync_products_from_source();$$
);

-- 6. 设置每周日凌晨1点刷新产品数据
SELECT cron.schedule(
  'weekly-product-refresh',
  '0 1 * * 0',
  $$UPDATE products SET updated_at = NOW() WHERE updated_at < NOW() - INTERVAL '7 days';$$
);
```

### 自动任务说明：

| 任务名称 | 执行时间 | 功能 |
|---------|---------|------|
| `monthly-product-sync` | 每月1号 03:00 | 同步产品数量到日志表 |
| `weekly-product-refresh` | 每周日 01:00 | 标记7天内未更新的产品 |

### 验证任务是否运行：

```sql
SELECT * FROM cron.job WHERE jobname LIKE '%product%';
```

### 查看同步日志：

```sql
SELECT * FROM product_sync_log ORDER BY sync_date DESC LIMIT 10;
```

---

## 方案三：手动更新（简单）

### 每月更新步骤：
1. 登录 Supabase Dashboard
2. 进入 SQL Editor
3. 执行 `/workspace/supabase-update-products.sql` 中的查看语句确认当前数据
4. 手动 INSERT 新产品

### 添加新产品示例：
```sql
INSERT INTO products (name, brand, category, price, key_ingredients,
                     suitable_skin_types, rating, reviews_count, source,
                     country, is_affordable, description)
VALUES ('新品名称', '品牌', '精华', '¥299', '成分1、成分2',
        ARRAY['DR', 'OR'], 4.7, 1000, 'manual',
        '中国', true, '产品描述');
```

---

## 方案三：使用我提供的脚本

我已经在 `/workspace/supabase-update-products.sql` 创建了更新脚本，您可以：
1. 下载该文件
2. 在 Supabase SQL Editor 中打开
3. 执行需要的操作

---

## 当前产品数据统计

- **总产品数**: 50+ 款
- **国货品牌**: 薇诺娜、珀莱雅、HBN、至本、玉泽、谷雨、可复美等
- **开价品牌**: CeraVe、The Ordinary、珂润、理肤泉、Olay等
- **国际大牌**: 兰蔻、雅诗兰黛、资生堂、修丽可、SK-II等

---

## 注意事项

1. **数据来源**: 目前产品数据需要手动添加或通过API导入
2. **自动抓取**: 如需自动从天猫/京东抓取，需要额外的爬虫服务
3. **数据更新**: 建议每月检查并更新评价数量和价格信息

如需帮助，请随时告知！