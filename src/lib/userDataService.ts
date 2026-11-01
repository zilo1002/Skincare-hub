import { supabase } from './supabase';
import type { CustomSkinType } from '../data/skinData';

// 获取用户收藏的皮肤问题
export async function getUserFavorites(userId: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('user_favorites')
      .select('problem_id')
      .eq('user_id', userId);

    if (error) throw error;
    return data?.map(item => item.problem_id) || [];
  } catch (err) {
    console.error('获取收藏失败:', err);
    return [];
  }
}

// 获取收藏（带分页）
export async function getUserFavoritesPaginated(
  userId: string,
  page: number = 1,
  limit: number = 20
): Promise<{ data: string[]; total: number; page: number; totalPages: number }> {
  try {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from('user_favorites')
      .select('problem_id', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    const result = data?.map(item => item.problem_id) || [];
    const total = count || 0;

    return {
      data: result,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  } catch (err) {
    console.error('获取收藏失败:', err);
    return { data: [], total: 0, page, totalPages: 0 };
  }
}

// 添加收藏
export async function addFavorite(userId: string, problemId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_favorites')
      .insert({ user_id: userId, problem_id: problemId });

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('添加收藏失败:', err);
    return false;
  }
}

// 删除收藏
export async function removeFavorite(userId: string, problemId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', userId)
      .eq('problem_id', problemId);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('删除收藏失败:', err);
    return false;
  }
}

// 获取用户收藏的肤质
export async function getUserFavoriteSkinTypes(userId: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('user_favorite_skin_types')
      .select('skin_type_id')
      .eq('user_id', userId);

    if (error) throw error;
    return data?.map(item => item.skin_type_id) || [];
  } catch (err) {
    console.error('获取收藏肤质失败:', err);
    return [];
  }
}

// 添加收藏肤质
export async function addFavoriteSkinType(userId: string, skinTypeId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_favorite_skin_types')
      .insert({ user_id: userId, skin_type_id: skinTypeId });

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('添加收藏肤质失败:', err);
    return false;
  }
}

// 删除收藏肤质
export async function removeFavoriteSkinType(userId: string, skinTypeId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_favorite_skin_types')
      .delete()
      .eq('user_id', userId)
      .eq('skin_type_id', skinTypeId);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('删除收藏肤质失败:', err);
    return false;
  }
}

// 获取用户自定义肤质
export async function getUserCustomSkinTypes(userId: string): Promise<CustomSkinType[]> {
  try {
    const { data, error } = await supabase
      .from('user_custom_skin_types')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('获取自定义肤质失败:', err);
    return [];
  }
}

// 添加自定义肤质
export async function addCustomSkinType(userId: string, skinType: Omit<CustomSkinType, 'id' | 'createdAt'>): Promise<CustomSkinType | null> {
  try {
    const newSkinType = {
      user_id: userId,
      name: skinType.name,
      code: skinType.code,
      emoji: skinType.emoji,
      type: skinType.type,
      pigmented: skinType.pigmented,
      wrinkle: skinType.wrinkle
    };

    const { data, error } = await supabase
      .from('user_custom_skin_types')
      .insert(newSkinType)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('添加自定义肤质失败:', err);
    return null;
  }
}

// 删除自定义肤质
export async function deleteCustomSkinType(userId: string, skinTypeId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_custom_skin_types')
      .delete()
      .eq('user_id', userId)
      .eq('id', skinTypeId);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('删除自定义肤质失败:', err);
    return false;
  }
}

// 获取用户肤质测试结果
export async function getUserSkinTestResult(userId: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('test_result')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data?.test_result || null;
  } catch (err) {
    console.error('获取测试结果失败:', err);
    return null;
  }
}

// 保存用户肤质测试结果
export async function saveUserSkinTestResult(userId: string, testResult: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        test_result: testResult,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('保存测试结果失败:', err);
    return false;
  }
}

// 同步localStorage数据到Supabase（首次登录时）
export async function syncLocalStorageToSupabase(userId: string): Promise<void> {
  try {
    // 获取本地收藏
    const localFavorites = localStorage.getItem('skincare-favorites');
    if (localFavorites) {
      const favorites: string[] = JSON.parse(localFavorites);
      for (const fav of favorites) {
        await addFavorite(userId, fav);
      }
    }

    // 获取本地收藏肤质
    const localFavoriteSkinTypes = localStorage.getItem('favorite-skin-types');
    if (localFavoriteSkinTypes) {
      const favs: string[] = JSON.parse(localFavoriteSkinTypes);
      for (const fav of favs) {
        await addFavoriteSkinType(userId, fav);
      }
    }

    // 获取本地自定义肤质
    const localCustomSkinTypes = localStorage.getItem('custom-skin-types');
    if (localCustomSkinTypes) {
      const types: CustomSkinType[] = JSON.parse(localCustomSkinTypes);
      for (const type of types) {
        await addCustomSkinType(userId, type);
      }
    }

    // 获取测试结果
    const localTestResult = localStorage.getItem('skin-test-result');
    if (localTestResult) {
      await saveUserSkinTestResult(userId, localTestResult);
    }

    console.log('数据同步成功');
  } catch (err) {
    console.error('数据同步失败:', err);
  }
}

// 从Supabase获取用户数据（覆盖localStorage）
export async function loadUserDataFromSupabase(userId: string): Promise<{
  favorites: string[];
  favoriteSkinTypes: string[];
  customSkinTypes: CustomSkinType[];
  testResult: string | null;
}> {
  try {
    const [favorites, favoriteSkinTypes, customSkinTypes, testResult] = await Promise.all([
      getUserFavorites(userId),
      getUserFavoriteSkinTypes(userId),
      getUserCustomSkinTypes(userId),
      getUserSkinTestResult(userId)
    ]);

    return { favorites, favoriteSkinTypes, customSkinTypes, testResult };
  } catch (err) {
    console.error('加载用户数据失败:', err);
    return { favorites: [], favoriteSkinTypes: [], customSkinTypes: [], testResult: null };
  }
}