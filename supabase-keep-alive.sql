-- ============================================
-- Supabase 数据库保活脚本
-- 防止免费版因长期无活动而暂停
-- ============================================
-- 使用说明：
-- 1. 在 Supabase 后台 SQL Editor 中执行此脚本
-- 2. 或设置定时任务每10分钟执行一次
-- ============================================

-- 创建一个简单的健康检查表（如果不存在）
CREATE TABLE IF NOT EXISTS db_health_check (
  id SERIAL PRIMARY KEY,
  check_time TIMESTAMPTZ DEFAULT NOW(),
  is_alive BOOLEAN DEFAULT true
);

-- 插入健康检查记录
INSERT INTO db_health_check (is_alive) VALUES (true);

-- 清理旧记录（保留最近100条）
DELETE FROM db_health_check
WHERE id NOT IN (SELECT id FROM db_health_check ORDER BY check_time DESC LIMIT 100);

-- 查询当前数据库状态（保持活跃）
SELECT
  'Database is alive and healthy' as status,
  NOW() as current_time,
  (SELECT COUNT(*) FROM db_health_check) as health_check_count;