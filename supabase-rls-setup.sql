-- ========================================
-- SkinCare Hub RLS (Row Level Security) 配置
-- 在 Supabase SQL Editor 中执行此脚本
-- ========================================

-- 启用 RLS
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorite_skin_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_custom_skin_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- ========================================
-- user_favorites 表策略
-- ========================================
DROP POLICY IF EXISTS "用户只能查看自己的收藏" ON user_favorites;
DROP POLICY IF EXISTS "用户只能添加自己的收藏" ON user_favorites;
DROP POLICY IF EXISTS "用户只能删除自己的收藏" ON user_favorites;

CREATE POLICY "用户只能查看自己的收藏" ON user_favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户只能添加自己的收藏" ON user_favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户只能删除自己的收藏" ON user_favorites
  FOR DELETE USING (auth.uid() = user_id);

-- ========================================
-- user_favorite_skin_types 表策略
-- ========================================
DROP POLICY IF EXISTS "用户只能查看自己的肤质收藏" ON user_favorite_skin_types;
DROP POLICY IF EXISTS "用户只能添加自己的肤质收藏" ON user_favorite_skin_types;
DROP POLICY IF EXISTS "用户只能删除自己的肤质收藏" ON user_favorite_skin_types;

CREATE POLICY "用户只能查看自己的肤质收藏" ON user_favorite_skin_types
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户只能添加自己的肤质收藏" ON user_favorite_skin_types
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户只能删除自己的肤质收藏" ON user_favorite_skin_types
  FOR DELETE USING (auth.uid() = user_id);

-- ========================================
-- user_custom_skin_types 表策略
-- ========================================
DROP POLICY IF EXISTS "用户只能查看自己的自定义肤质" ON user_custom_skin_types;
DROP POLICY IF EXISTS "用户只能添加自己的自定义肤质" ON user_custom_skin_types;
DROP POLICY IF EXISTS "用户只能删除自己的自定义肤质" ON user_custom_skin_types;

CREATE POLICY "用户只能查看自己的自定义肤质" ON user_custom_skin_types
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户只能添加自己的自定义肤质" ON user_custom_skin_types
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户只能删除自己的自定义肤质" ON user_custom_skin_types
  FOR DELETE USING (auth.uid() = user_id);

-- ========================================
-- user_profiles 表策略
-- ========================================
DROP POLICY IF EXISTS "用户只能查看自己的资料" ON user_profiles;
DROP POLICY IF EXISTS "用户只能更新自己的资料" ON user_profiles;

CREATE POLICY "用户只能查看自己的资料" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "用户只能更新自己的资料" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- ========================================
-- 验证 RLS 配置
-- ========================================
SELECT
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('user_favorites', 'user_favorite_skin_types', 'user_custom_skin_types', 'user_profiles');
