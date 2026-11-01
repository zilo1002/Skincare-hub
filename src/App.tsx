import { useState, useMemo, useEffect, useCallback } from 'react'
import './App.css'
import { AuthProvider, useAuth } from './lib/AuthContext'
import AuthModal from './components/AuthModal'
import {
  skinProblems,
  faceProblems,
  areaInfo,
  allAreas,
  getProblemsByArea,
  searchProblems,
  ingredients,
  skinTestQuestions,
  baumannSkinTypes,
  productTypeLabels,
  type SkinProblem,
  type Solution,
  type SkinType,
  type Ingredient,
  type TestQuestion,
  type BaumannSkinType,
  type ProductType,
  type CustomSkinType
} from './data/skinData'
import {
  sampleProducts,
  productCategories
} from './data/products'
import {
  getUserFavorites,
  addFavorite,
  removeFavorite,
  getUserFavoriteSkinTypes,
  addFavoriteSkinType,
  removeFavoriteSkinType,
  getUserCustomSkinTypes,
  addCustomSkinType as addCustomSkinTypeToDB,
  getUserSkinTestResult,
  saveUserSkinTestResult,
  loadUserDataFromSupabase
} from './lib/userDataService'

// 浏览器兼容性检测
const useBrowserInfo = () => {
  const [browserInfo, setBrowserInfo] = useState<{
    isSupported: boolean;
    browser: string;
    version: number;
    os: string;
  }>({ isSupported: true, browser: '', version: 0, os: '' });

  useEffect(() => {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    let version = 0;
    const os = /Mac/i.test(ua) ? 'macOS' :
               /Windows/i.test(ua) ? 'Windows' :
               /iPhone|iPad/i.test(ua) ? 'iOS' :
               /Android/i.test(ua) ? 'Android' : 'Other';

    if (/Edg\//i.test(ua)) {
      browser = 'Edge';
      version = parseInt(ua.match(/Edg\/(\d+)/)?.[1] || '0');
    } else if (/Chrome\//i.test(ua) && !/Chromium\//i.test(ua)) {
      browser = 'Chrome';
      version = parseInt(ua.match(/Chrome\/(\d+)/)?.[1] || '0');
    } else if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) {
      browser = 'Safari';
      version = parseInt(ua.match(/Version\/(\d+)/)?.[1] || '0');
    } else if (/Firefox\//i.test(ua)) {
      browser = 'Firefox';
      version = parseInt(ua.match(/Firefox\/(\d+)/)?.[1] || '0');
    }

    const minVersions: Record<string, number> = {
      'Chrome': 87, // 2020年发布
      'Safari': 14,
      'Edge': 87,
      'Firefox': 78
    };

    const isSupported = minVersions[browser] ? version >= minVersions[browser] : true;
    setBrowserInfo({ isSupported, browser, version, os });
  }, []);

  return browserInfo;
};

// 复制网址功能
const useCopyUrl = () => {
  const [copied, setCopied] = useState(false);

  const copyUrl = useCallback(() => {
    const url = window.location.href;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      // 降级方案
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        alert('复制失败，请手动复制: ' + url);
      }
      document.body.removeChild(textarea);
    }
  }, []);

  return { copied, copyUrl };
};

// LocalStorage hook
const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };
  return [storedValue, setValue] as const;
};

// 成本显示
const CostDisplay = ({ cost }: { cost: '$' | '$$' | '$$$' }) => (
  <span className="cost-indicator">
    {cost === '$' && '💰'}
    {cost === '$$' && '💰💰'}
    {cost === '$$$' && '💰💰💰'}
  </span>
)

// 效果显示
const EfficacyDisplay = ({ efficacy }: { efficacy: string }) => {
  const labels = { low: '低', medium: '中', high: '高' };
  const colors = { low: 'efficacy-low', medium: 'efficacy-medium', high: 'efficacy-high' };
  return (
    <span className={`text-xs font-medium ${colors[efficacy as keyof typeof colors]}`}>
      效果: {labels[efficacy as keyof typeof labels]}
    </span>
  );
};

// 问题卡片
const ProblemCard = ({ problem, onClick, isFavorited, onToggleFavorite }: {
  problem: SkinProblem;
  onClick: () => void;
  isFavorited: boolean;
  onToggleFavorite: () => void;
}) => (
  <div
    onClick={onClick}
    className="bg-white rounded-2xl p-3 sm:p-5 cursor-pointer card-hover border border-gray-100 relative"
  >
    <button
      onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
      className="absolute top-2 sm:top-4 right-2 sm:right-4 text-xl hover:scale-110 transition-transform z-10 touch-target"
    >
      {isFavorited ? '❤️' : '🤍'}
    </button>
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="text-3xl sm:text-4xl">{problem.emoji}</div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm sm:text-lg text-gray-800 mb-1">{problem.title}</h3>
        {problem.subArea && (
          <p className="text-xs text-emerald-600 mb-1">📍 {problem.subArea}</p>
        )}
        <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-3">{problem.description}</p>
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <span className="tag tag-success">{problem.category}</span>
          {problem.subCategory && (
            <span className="tag tag-warning">{problem.subCategory}</span>
          )}
          <span className="text-xs text-gray-400">{problem.solutions.length} 种方案</span>
        </div>
      </div>
    </div>
  </div>
);

// 解决方案类型标签
const SolutionTypeLabel = ({ type }: { type: string }) => {
  const types: Record<string, { label: string; icon: string; color: string }> = {
    'home-remedy': { label: '家庭疗法', icon: '🏠', color: 'bg-amber-50 text-amber-700' },
    'natural': { label: '天然成分', icon: '🌿', color: 'bg-green-50 text-green-700' },
    'product': { label: '产品推荐', icon: '💄', color: 'bg-emerald-50 text-emerald-700' },
    'medical': { label: '医学治疗', icon: '🏥', color: 'bg-red-50 text-red-700' },
    'alternative': { label: '偏方/邪修', icon: '🔮', color: 'bg-purple-50 text-purple-700' }
  };
  const t = types[type] || { label: type, icon: '📋', color: 'bg-gray-50 text-gray-700' };
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${t.color}`}>
      {t.icon} {t.label}
    </span>
  );
};

// 解决方案卡片（带用量说明）
const SolutionCard = ({ solution }: { solution: Solution }) => (
  <div className="bg-gray-50 rounded-2xl p-6">
    <div className="flex items-start justify-between mb-4">
      <div>
        <SolutionTypeLabel type={solution.type} />
        <h4 className="font-semibold text-gray-800 mt-2 text-lg">{solution.title}</h4>
      </div>
      <div className="text-right">
        <CostDisplay cost={solution.cost} />
        <div className="text-xs text-gray-400 mt-1">{solution.duration}</div>
      </div>
    </div>
    <div className="mb-4">
      <EfficacyDisplay efficacy={solution.efficacy} />
    </div>

    {solution.steps && solution.steps.length > 0 && (
      <div className="mb-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">操作步骤：</h5>
        <ol className="step-list text-sm text-gray-600">
          {solution.steps.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      </div>
    )}

    {solution.products && solution.products.length > 0 && (
      <div className="mb-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">推荐产品：</h5>
        <div className="space-y-3">
          {solution.products.map((product, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{product.name}</div>
                  <div className="text-xs text-gray-500">{product.keyIngredient}</div>
                </div>
                <div className="text-right">
                  <CostDisplay cost={product.price} />
                  <div className={`text-xs font-medium mt-0.5 ${productTypeLabels[product.type as ProductType]?.color || 'text-gray-400'}`}>
                    {productTypeLabels[product.type as ProductType]?.label || product.type}
                  </div>
                </div>
              </div>
              {product.usage && (
                <div className="bg-blue-50 rounded-lg p-3 mt-2">
                  <div className="text-xs font-medium text-blue-700 mb-1">💊 用法用量</div>
                  <p className="text-xs text-blue-600">{product.usage}</p>
                </div>
              )}
              {product.note && (
                <div className="bg-amber-50 rounded-lg p-2 mt-2">
                  <p className="text-xs text-amber-700">{product.note}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {solution.precautions && solution.precautions.length > 0 && (
      <div className="bg-amber-50 rounded-xl p-3">
        <div className="text-xs font-medium text-amber-700 mb-1">⚠️ 注意</div>
        <p className="text-xs text-amber-600">{solution.precautions.join(' · ')}</p>
      </div>
    )}
  </div>
);

// 详情模态框
const DetailModal = ({ problem, onClose }: { problem: SkinProblem; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onClick={onClose}>
    <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
      <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{problem.emoji}</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{problem.title}</h2>
              <p className="text-gray-500 text-sm mt-1">
                {areaInfo[problem.area as keyof typeof areaInfo]?.name} · {problem.category}
                {problem.subCategory && ` · ${problem.subCategory}`}
              </p>
              {problem.subArea && (
                <p className="text-xs text-emerald-600 mt-1">📍 细分部位: {problem.subArea}</p>
              )}
              {problem.cause && (
                <p className="text-xs text-amber-600 mt-0.5">🔍 主要原因: {problem.cause}</p>
              )}
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
            ✕
          </button>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <section>
          <h3 className="font-semibold text-lg text-gray-800 mb-3">问题概述</h3>
          <p className="text-gray-600">{problem.description}</p>
        </section>
        <section>
          <h3 className="font-semibold text-lg text-gray-800 mb-3">常见成因</h3>
          <div className="flex flex-wrap gap-2">
            {problem.causes.map((cause, i) => (
              <span key={i} className="px-3 py-1.5 bg-gray-50 rounded-full text-sm text-gray-600">{cause}</span>
            ))}
          </div>
        </section>
        <section>
          <h3 className="font-semibold text-lg text-gray-800 mb-4">解决方案</h3>
          <div className="space-y-4">
            {problem.solutions.map((sol, i) => <SolutionCard key={i} solution={sol} />)}
          </div>
        </section>
        <section className="bg-emerald-50 rounded-2xl p-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">日常预防</h3>
          <div className="space-y-2">
            {problem.prevention.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-gray-600">
                <span className="text-emerald-500">✓</span> {item}
              </div>
            ))}
          </div>
        </section>
        <section className="bg-amber-50 rounded-2xl p-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">何时就医</h3>
          <p className="text-gray-600">{problem.whenToSeeDoctor}</p>
        </section>
        <div className="text-xs text-gray-400 text-center py-4 border-t">
          本网站内容仅供参考，不能替代专业医疗建议。
        </div>
      </div>
    </div>
  </div>
);

// 肤质卡片
const SkinTypeCard = ({ skinType, isSelected, onClick }: {
  skinType: SkinType;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`p-5 rounded-2xl cursor-pointer transition-all border-2 ${
      isSelected ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 bg-white hover:border-emerald-200'
    }`}
  >
    <div className="text-4xl mb-3">{skinType.emoji}</div>
    <h3 className="font-semibold text-lg text-gray-800">{skinType.name}</h3>
    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{skinType.description}</p>
    {isSelected && (
      <div className="mt-3 pt-3 border-t border-emerald-200">
        <p className="text-xs font-medium text-emerald-700 mb-2">适合成分：</p>
        <div className="flex flex-wrap gap-1">
          {skinType.suitableIngredients.slice(0, 3).map((ing, i) => (
            <span key={i} className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs">{ing}</span>
          ))}
        </div>
      </div>
    )}
  </div>
);

// 成分百科卡片
const IngredientCard = ({ ingredient, onClick }: {
  ingredient: Ingredient;
  onClick: () => void;
}) => {
  const categoryColors: Record<string, string> = {
    '保湿': 'from-blue-400 to-cyan-400',
    '美白': 'from-purple-400 to-pink-400',
    '抗老': 'from-orange-400 to-red-400',
    '控油': 'from-green-400 to-teal-400',
    '舒缓': 'from-green-300 to-emerald-400',
    '去角质': 'from-yellow-400 to-orange-400',
    '抗氧化': 'from-rose-400 to-pink-400'
  };

  return (
    <div onClick={onClick} className="bg-white rounded-2xl p-5 cursor-pointer card-hover border border-gray-100">
      <div className="text-4xl mb-3">{ingredient.emoji}</div>
      <h3 className="font-semibold text-lg text-gray-800 mb-2">{ingredient.name}</h3>
      <div className={`inline-block px-3 py-1 bg-gradient-to-r ${categoryColors[ingredient.category]} rounded-full text-xs font-medium text-white mb-3`}>
        {ingredient.category}
      </div>
      <p className="text-gray-500 text-sm line-clamp-2">{ingredient.description}</p>
    </div>
  );
};

// 详情模态框（肤质和成分）
const InfoModal = ({ type, data, onClose }: {
  type: 'skintype' | 'ingredient';
  data: SkinType | Ingredient | null;
  onClose: () => void;
}) => {
  if (!data) return null;
  const isSkinType = type === 'skintype';
  const skinType = data as SkinType;
  const ingredient = data as Ingredient;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{isSkinType ? skinType.emoji : ingredient.emoji}</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{isSkinType ? skinType.name : ingredient.name}</h2>
                {isSkinType && <p className="text-gray-500 text-sm mt-1">肤质特点</p>}
                {!isSkinType && <p className="text-gray-500 text-sm mt-1">{ingredient.category}</p>}
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">✕</button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {isSkinType ? (
            <>
              <section>
                <h3 className="font-semibold text-lg text-gray-800 mb-3">肤质特点</h3>
                <div className="space-y-2">
                  {skinType.characteristics.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>{c}
                    </div>
                  ))}
                </div>
              </section>
              <section className="bg-emerald-50 rounded-2xl p-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-3">适合成分</h3>
                <div className="flex flex-wrap gap-2">
                  {skinType.suitableIngredients.map((ing, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white rounded-full text-sm text-emerald-700">{ing}</span>
                  ))}
                </div>
              </section>
              <section className="bg-red-50 rounded-2xl p-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-3">应避免成分</h3>
                <div className="flex flex-wrap gap-2">
                  {skinType.avoidIngredients.map((ing, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white rounded-full text-sm text-red-600">{ing}</span>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="font-semibold text-lg text-gray-800 mb-3">护理建议</h3>
                <div className="space-y-2">
                  {skinType.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 text-gray-600">
                      <span className="text-blue-500">💡</span> {tip}
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <>
              <section>
                <h3 className="font-semibold text-lg text-gray-800 mb-3">成分介绍</h3>
                <p className="text-gray-600">{ingredient.description}</p>
              </section>
              <section>
                <h3 className="font-semibold text-lg text-gray-800 mb-3">主要功效</h3>
                <div className="grid grid-cols-2 gap-2">
                  {ingredient.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>{b}
                    </div>
                  ))}
                </div>
              </section>
              <section className="bg-blue-50 rounded-2xl p-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-3">适用肤质</h3>
                <div className="flex flex-wrap gap-2">
                  {ingredient.suitableFor.map((s, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white rounded-full text-sm text-blue-700">{s}</span>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="font-semibold text-lg text-gray-800 mb-3">使用方法</h3>
                <p className="text-gray-600">{ingredient.usage}</p>
              </section>
              <div className="flex gap-4 text-sm">
                <div className="bg-gray-50 rounded-xl p-4 flex-1">
                  <span className="font-medium text-gray-700">浓度：</span>{ingredient.concentration}
                </div>
                {ingredient.sideEffects && (
                  <div className="bg-amber-50 rounded-xl p-4 flex-1">
                    <span className="font-medium text-amber-700">注意事项：</span>{ingredient.sideEffects}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// 皮肤测试问卷
const SkinTest = ({ onComplete }: { onComplete: () => void }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const { user } = useAuth();

  const question = skinTestQuestions[currentQ];

  const calculateResult = (allAnswers: number[]): string => {
    const scores = {
      dry: 0, oily: 0, sensitive: 0, resistant: 0, pigmented: 0, nonPigmented: 0, wrinkle: 0, tight: 0
    };

    allAnswers.forEach((answerIndex, qIndex) => {
      const q = skinTestQuestions[qIndex];
      const option = q.options[answerIndex];
      scores.dry += option.scores.dry;
      scores.oily += option.scores.oily;
      scores.sensitive += option.scores.sensitive;
      scores.resistant += option.scores.resistant;
      scores.pigmented += option.scores.pigmented;
      scores.nonPigmented += option.scores.nonPigmented;
      scores.wrinkle += option.scores.wrinkle;
      scores.tight += option.scores.tight;
    });

    // 计算四个维度
    const isDry = scores.dry > scores.oily;
    const isSensitive = scores.sensitive > scores.resistant;
    const isPigmented = scores.pigmented > scores.nonPigmented;
    const hasWrinkle = scores.wrinkle > scores.tight;

    // 16型肤质代码
    let code = '';
    if (isDry) code += 'DS';
    else code += 'DR';

    if (isSensitive) code += 'S';
    else code += 'R';

    if (isPigmented) code += 'P';
    else code += 'N';

    if (hasWrinkle) code += 'W';
    else code += 'T';

    return code;
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQ < skinTestQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const result = calculateResult(newAnswers);
      localStorage.setItem('skin-test-result', result);
      localStorage.setItem('test-completed', 'true');
      // 如果用户已登录，同步到Supabase
      if (user) {
        saveUserSkinTestResult(user.id, result);
      }
      onComplete();
    }
  };

  const progressPercent = ((currentQ + 1) / skinTestQuestions.length) * 100;

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🧪</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">褒曼16型肤质测试</h2>
        <p className="text-gray-500">回答以下问题，找到你的专属肤质类型</p>
        {/* 官网提示 */}
        <p className="text-xs text-gray-400 mt-2">
          如需完整测试题，请进入肤质页面添加自定义肤质上方褒曼医生官网测试
          <span className="text-amber-500">（国内需要外接VPN节点支持）</span>
        </p>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">{currentQ + 1}/{skinTestQuestions.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-6">
          {question.dimension === 'dryness' && '💧 油脂与水分'}
          {question.dimension === 'sensitivity' && '🌸 敏感与耐受'}
          {question.dimension === 'pigmentation' && '🎨 色素沉着'}
          {question.dimension === 'wrinkle' && '⏰ 皱纹与紧致'}
        </h3>
        <p className="text-xl text-gray-700 mb-8">{question.question}</p>
        <div className="space-y-3">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="w-full p-4 text-left rounded-xl border-2 border-gray-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// 16型肤质详细结果展示
const BaumannResult = ({ code, onClose }: { code: string; onClose: () => void }) => {
  const skinType = baumannSkinTypes.find(t => t.code === code);

  if (!skinType) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onClick={onClose}>
        <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8" onClick={e => e.stopPropagation()}>
          <p className="text-center text-gray-600">未找到匹配的肤质类型</p>
          <button onClick={onClose} className="mt-4 w-full btn-primary">关闭</button>
        </div>
      </div>
    );
  }

  const typeLabels = {
    'DS': { label: '干性敏感', color: 'bg-red-100 text-red-700', icon: '🔴' },
    'DR': { label: '干性耐受', color: 'bg-orange-100 text-orange-700', icon: '🟠' },
    'OS': { label: '油性敏感', color: 'bg-purple-100 text-purple-700', icon: '🟣' },
    'OR': { label: '油性耐受', color: 'bg-gray-100 text-gray-700', icon: '⚫' },
  };

  const typeInfo = typeLabels[skinType.type];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 modal-backdrop overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-3xl w-full max-w-4xl my-8" onClick={e => e.stopPropagation()}>
        {/* 头部 */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-3xl p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="text-6xl">{skinType.emoji}</div>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
              ✕
            </button>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{skinType.code}</div>
            <h2 className="text-2xl font-bold mb-2">{skinType.name}</h2>
            <span className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm ${typeInfo.color}`}>
              {typeInfo.icon} {typeInfo.label}
              <span className="mx-2">|</span>
              {skinType.pigmented ? '🎨 有色素倾向' : '✨ 无色素倾向'}
              <span className="mx-2">|</span>
              {skinType.wrinkle ? '⏰ 有皱纹倾向' : '💪 紧致'}
            </span>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* 核心画像 */}
          <section>
            <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">📋</span> 核心画像
            </h3>
            <p className="text-gray-600 leading-relaxed">{skinType.profile}</p>
          </section>

          {/* 屏障损伤表现 */}
          <section className="bg-red-50 rounded-2xl p-6">
            <h3 className="font-bold text-lg text-red-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">⚠️</span> 屏障损伤表现
            </h3>
            <ul className="space-y-2">
              {skinType.barrierSymptoms.map((symptom, i) => (
                <li key={i} className="flex items-start gap-2 text-red-700">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
                  {symptom}
                </li>
              ))}
            </ul>
          </section>

          {/* 修复策略 */}
          <section className="bg-emerald-50 rounded-2xl p-6">
            <h3 className="font-bold text-lg text-emerald-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">💡</span> 修复策略
            </h3>
            <ul className="space-y-2">
              {skinType.repairStrategy.map((strategy, i) => (
                <li key={i} className="flex items-start gap-2 text-emerald-700">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"></span>
                  {strategy}
                </li>
              ))}
            </ul>
          </section>

          {/* 推荐成分 */}
          <section className="bg-blue-50 rounded-2xl p-6">
            <h3 className="font-bold text-lg text-blue-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">🧬</span> 推荐成分
            </h3>
            <div className="flex flex-wrap gap-2">
              {skinType.recommendedIngredients.map((ing, i) => (
                <span key={i} className="px-3 py-1.5 bg-white rounded-full text-sm text-blue-700 border border-blue-200">
                  {ing}
                </span>
              ))}
            </div>
          </section>

          {/* 避免成分 */}
          <section className="bg-red-100 rounded-2xl p-6">
            <h3 className="font-bold text-lg text-red-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">❌</span> 避免成分
            </h3>
            <div className="space-y-3">
              {skinType.avoidIngredients.map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-3 border border-red-200">
                  <div className="font-medium text-red-700">❌ {item.ingredient}</div>
                  <div className="text-sm text-red-600 mt-1">{item.reason}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 建立耐受 */}
          <section className="bg-amber-50 rounded-2xl p-6">
            <h3 className="font-bold text-lg text-amber-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">⚠️</span> 建立耐受指南
            </h3>
            <div className="space-y-3">
              {skinType.toleranceBuilding.map((item, i) => (
                <div key={i} className="bg-amber-100 rounded-xl p-3">
                  <div className="font-medium text-amber-900">⚠️ {item.warning}</div>
                  <div className="text-sm text-amber-700 mt-1">✅ {item.solution}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 早间护理 */}
          <section className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6">
            <h3 className="font-bold text-lg text-orange-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">☀️</span> 早间护理 Routine
            </h3>
            <div className="space-y-4">
              {skinType.amRoutine.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-orange-800">{step.product}</div>
                    <ul className="mt-1 space-y-1">
                      {step.keyPoints.map((point, j) => (
                        <li key={j} className="text-sm text-orange-600 flex items-start gap-1">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 晚间护理 */}
          <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6">
            <h3 className="font-bold text-lg text-purple-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🌙</span> 晚间护理 Routine
            </h3>
            <div className="space-y-4">
              {skinType.pmRoutine.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-purple-800">{step.product}</div>
                    <ul className="mt-1 space-y-1">
                      {step.keyPoints.map((point, j) => (
                        <li key={j} className="text-sm text-purple-600 flex items-start gap-1">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 平价产品推荐 */}
          {skinType.affordableProducts && skinType.affordableProducts.length > 0 && (
            <section className="bg-green-50 rounded-2xl p-6">
              <h3 className="font-bold text-lg text-green-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">💚</span> 平价产品推荐
              </h3>
              <div className="space-y-3">
                {skinType.affordableProducts.map((product, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-green-200">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-green-800">{product.name}</div>
                      <div className="text-green-600 font-bold text-sm">{product.price}</div>
                    </div>
                    <div className="text-sm text-green-700 mb-1">💡 {product.keyPoints}</div>
                    <div className="text-xs text-green-600">📍 购买渠道：{product.where}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

// 主应用
function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'problems' | 'skintype' | 'ingredients' | 'favorites' | 'test' | 'products'>('home');
  const [selectedArea, setSelectedArea] = useState<string>('face');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProblem, setSelectedProblem] = useState<SkinProblem | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<typeof sampleProducts[0] | null>(null);
  const [productFilter, setProductFilter] = useState<string>('all');
  const [selectedSkinType, setSelectedSkinType] = useState<SkinType | null>(null);
  const [selectedBaumannResult, setSelectedBaumannResult] = useState<string | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResult, setTestResult] = useState('');
  const [dismissedWarning, setDismissedWarning] = useLocalStorage<boolean>('browser-warning-dismissed', false);
  const [customSkinTypes, setCustomSkinTypes] = useState<CustomSkinType[]>([]);
  const [favoriteSkinTypes, setFavoriteSkinTypes] = useState<string[]>([]);
  const [showAddSkinType, setShowAddSkinType] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { user, signOut } = useAuth();

  const browserInfo = useBrowserInfo();
  const { copied, copyUrl } = useCopyUrl();

  // 加载用户数据
  useEffect(() => {
    const loadUserData = async () => {
      // 先加载本地数据
      const localFavorites = localStorage.getItem('skincare-favorites');
      const localTestCompleted = localStorage.getItem('test-completed');
      const localTestResult = localStorage.getItem('skin-test-result');
      const localCustomSkinTypes = localStorage.getItem('custom-skin-types');
      const localFavoriteSkinTypes = localStorage.getItem('favorite-skin-types');

      if (localFavorites) setFavorites(JSON.parse(localFavorites));
      if (localTestCompleted === 'true') setTestCompleted(true);
      if (localTestResult) setTestResult(localTestResult);
      if (localCustomSkinTypes) setCustomSkinTypes(JSON.parse(localCustomSkinTypes));
      if (localFavoriteSkinTypes) setFavoriteSkinTypes(JSON.parse(localFavoriteSkinTypes));

      // 如果用户已登录，从Supabase加载数据
      if (user) {
        const userData = await loadUserDataFromSupabase(user.id);
        if (userData.favorites.length > 0) setFavorites(userData.favorites);
        if (userData.favoriteSkinTypes.length > 0) setFavoriteSkinTypes(userData.favoriteSkinTypes);
        if (userData.customSkinTypes.length > 0) setCustomSkinTypes(userData.customSkinTypes);
        if (userData.testResult) {
          setTestResult(userData.testResult);
          setTestCompleted(true);
        }
      }
    };

    loadUserData();
  }, [user]);

  // 监听数据同步事件
  useEffect(() => {
    const handleDataSynced = async () => {
      if (user) {
        const userData = await loadUserDataFromSupabase(user.id);
        setFavorites(userData.favorites);
        setFavoriteSkinTypes(userData.favoriteSkinTypes);
        setCustomSkinTypes(userData.customSkinTypes);
        if (userData.testResult) {
          setTestResult(userData.testResult);
          setTestCompleted(true);
        }
      }
    };

    window.addEventListener('userDataSynced', handleDataSynced);
    return () => window.removeEventListener('userDataSynced', handleDataSynced);
  }, [user]);

  // 监听用户退出事件，清空用户数据
  useEffect(() => {
    const handleUserSignedOut = () => {
      setFavorites([]);
      setFavoriteSkinTypes([]);
      setCustomSkinTypes([]);
      setTestResult('');
      setTestCompleted(false);
    };

    window.addEventListener('userSignedOut', handleUserSignedOut);
    return () => window.removeEventListener('userSignedOut', handleUserSignedOut);
  }, [user]);

  const toggleFavorite = async (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(newFavorites);

    // 同时保存到本地
    localStorage.setItem('skincare-favorites', JSON.stringify(newFavorites));

    // 如果用户已登录，同步到Supabase
    if (user) {
      if (favorites.includes(id)) {
        await removeFavorite(user.id, id);
      } else {
        await addFavorite(user.id, id);
      }
    }
  };

  const toggleFavoriteSkinType = async (id: string) => {
    const newFavorites = favoriteSkinTypes.includes(id)
      ? favoriteSkinTypes.filter(f => f !== id)
      : [...favoriteSkinTypes, id];
    setFavoriteSkinTypes(newFavorites);

    // 同时保存到本地
    localStorage.setItem('favorite-skin-types', JSON.stringify(newFavorites));

    // 如果用户已登录，同步到Supabase
    if (user) {
      if (favoriteSkinTypes.includes(id)) {
        await removeFavoriteSkinType(user.id, id);
      } else {
        await addFavoriteSkinType(user.id, id);
      }
    }
  };

  const addCustomSkinType = async (skinType: Omit<CustomSkinType, 'id' | 'createdAt'>) => {
    if (user) {
      // 用户已登录，保存到Supabase
      const newSkinType = await addCustomSkinTypeToDB(user.id, skinType);
      if (newSkinType) {
        setCustomSkinTypes(prev => [...prev, newSkinType]);
        // 同步到本地
        const localData = JSON.parse(localStorage.getItem('custom-skin-types') || '[]');
        localData.push(newSkinType);
        localStorage.setItem('custom-skin-types', JSON.stringify(localData));
      }
    } else {
      // 用户未登录，只保存到本地
      const newSkinType: CustomSkinType = {
        ...skinType,
        id: `custom-${Date.now()}`,
        createdAt: Date.now()
      };
      setCustomSkinTypes(prev => [...prev, newSkinType]);
      const localData = JSON.parse(localStorage.getItem('custom-skin-types') || '[]');
      localData.push(newSkinType);
      localStorage.setItem('custom-skin-types', JSON.stringify(localData));
    }
  };

  const filteredProblems = useMemo(() => {
    let problems = selectedArea === 'all'
      ? skinProblems
      : getProblemsByArea(selectedArea);
    if (searchQuery.trim()) {
      problems = searchProblems(searchQuery);
    }
    return problems;
  }, [selectedArea, searchQuery]);

  const favoriteProblems = useMemo(() => {
    return skinProblems.filter(p => favorites.includes(p.id));
  }, [favorites]);

  return (
    <div className="min-h-screen bg-botanical">
      {/* 浏览器兼容性提示 */}
      {!browserInfo.isSupported && !dismissedWarning && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <div className="text-sm">
                <p className="font-medium text-amber-800">浏览器兼容性问题</p>
                <p className="text-amber-600">
                  检测到您使用的是 {browserInfo.browser} {browserInfo.version}，部分功能可能无法正常使用。
                  建议升级到最新版本以获得最佳体验。
                </p>
              </div>
            </div>
            <button
              onClick={() => setDismissedWarning(true)}
              className="text-amber-600 hover:text-amber-800 text-xl flex-shrink-0"
              aria-label="关闭提示"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 头部 */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 safe-area-top">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-2xl sm:text-3xl">🌿</div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold gradient-text">SkinCare Hub</h1>
                <p className="text-xs text-gray-400 hidden sm:block">科学护肤 · 温和呵护</p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={copyUrl}
                className="px-2 sm:px-3 py-2 rounded-full text-sm font-medium transition-all bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center gap-1 touch-target"
                title="复制网址"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span className="hidden sm:inline">{copied ? '已复制!' : '分享'}</span>
                <span className="sm:hidden">{copied ? '✓' : '📤'}</span>
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-2 sm:px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 touch-target ${
                  activeTab === 'favorites' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>❤️</span>
                <span className="hidden sm:inline">收藏</span>
                <span className="bg-white/20 px-1.5 rounded-full text-xs">{favorites.length}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 首页 */}
      {activeTab === 'home' && (
        <div className="py-4 sm:py-8 px-3 sm:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              找到最适合你的
              <span className="gradient-text"> 护肤方案</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8">
              收录 {skinProblems.length} 种皮肤问题 · {baumannSkinTypes.length} 种肤质 · {ingredients.length} 种护肤成分
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {[
                { id: 'problems', label: '问题百科', icon: '📚', desc: '浏览所有皮肤问题' },
                { id: 'test', label: '肤质测试', icon: '🧪', desc: '了解你的肤质' },
                { id: 'skintype', label: '肤质指南', icon: '📖', desc: '查看肤质详情' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as typeof activeTab)}
                  className="bg-white rounded-2xl p-4 sm:p-6 text-left card-hover border border-gray-100 touch-target"
                >
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-1">{item.label}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm">{item.desc}</p>
                </button>
              ))}
            </div>

            {/* 热门问题 */}
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 text-left">🔥 常见问题</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {faceProblems.slice(0, 6).map((problem, i) => (
                <div key={problem.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <ProblemCard
                    problem={problem}
                    onClick={() => setSelectedProblem(problem)}
                    isFavorited={favorites.includes(problem.id)}
                    onToggleFavorite={() => toggleFavorite(problem.id)}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('problems')}
              className="mt-4 sm:mt-6 btn-secondary"
            >
              查看全部问题 →
            </button>
          </div>
        </div>
      )}

      {/* 测试问卷 */}
      {activeTab === 'test' && (
        <SkinTest onComplete={() => {
          const result = localStorage.getItem('skin-test-result') || '';
          setTestResult(result);
          setTestCompleted(true);
          setActiveTab('skintype');
          setTimeout(() => setSelectedBaumannResult(result), 100);
        }} />
      )}

      {/* 问题百科 */}
      {activeTab === 'problems' && (
        <div className="pb-16">
          <section className="max-w-2xl mx-auto px-4 mb-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </section>

          <section className="max-w-6xl mx-auto px-4 mb-6">
            <div className="flex area-tabs-scroll">
              <button onClick={() => setSelectedArea('all')} className={`px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap ${selectedArea === 'all' ? 'bg-emerald-500 text-white' : 'bg-white text-gray-600'}`}>
                🌐 全部
              </button>
              {allAreas.map(area => (
                <button key={area} onClick={() => setSelectedArea(area)} className={`px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap ${selectedArea === area ? 'bg-emerald-500 text-white' : 'bg-white text-gray-600'}`}>
                  {areaInfo[area].icon} {areaInfo[area].name}
                </button>
              ))}
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedArea === 'all' ? '所有问题' : `${areaInfo[selectedArea as keyof typeof areaInfo]?.name}问题`}
              </h3>
              <span className="text-sm text-gray-400">{filteredProblems.length} 个问题</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProblems.map((problem, index) => (
                <div key={problem.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <ProblemCard
                    problem={problem}
                    onClick={() => setSelectedProblem(problem)}
                    isFavorited={favorites.includes(problem.id)}
                    onToggleFavorite={() => toggleFavorite(problem.id)}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* 肤质测试/指南 */}
      {activeTab === 'skintype' && (
        <div className="pb-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <button onClick={() => setActiveTab('test')} className="btn-primary mb-4">
                🧪 {testCompleted ? '重新测试' : '开始肤质测试'}
              </button>
              {testResult && (
                <div className="mt-4 p-4 bg-emerald-50 rounded-2xl inline-block">
                  <p className="text-emerald-700 font-medium">您的肤质类型：{testResult}</p>
                  <p className="text-emerald-600 text-sm mt-1">
                    {baumannSkinTypes.find(t => t.code === testResult)?.name}
                  </p>
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-800 mb-2 mt-4">了解你的肤质</h3>
              <p className="text-gray-500 text-sm">点击卡片查看详细护理指南，可收藏或添加自定义肤质</p>
            </div>

            {/* 褒曼医生16型肤质测试官网提示 */}
            <div className="mb-6 text-center">
              <p className="text-xs text-gray-400 mb-1">褒曼医生16型肤质测试</p>
              <a
                href="https://skintypesolutions.com/pages/skin-type-quiz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-600 hover:text-emerald-700 underline"
              >
                官网完整测试 →
              </a>
            </div>

            {/* 添加自定义肤质按钮 */}
            <div className="mb-6 flex justify-center">
              <button
                onClick={() => setShowAddSkinType(true)}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-medium hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span className="text-xl">➕</span> 添加自定义肤质
              </button>
            </div>

            {/* 16型褒曼肤质分类 */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">按类型筛选</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { type: 'DS', label: '干性敏感', icon: '🔴', color: 'from-red-400 to-rose-500' },
                  { type: 'DR', label: '干性耐受', icon: '🟠', color: 'from-orange-400 to-amber-500' },
                  { type: 'OS', label: '油性敏感', icon: '🟣', color: 'from-purple-400 to-pink-500' },
                  { type: 'OR', label: '油性耐受', icon: '⚫', color: 'from-gray-500 to-slate-600' },
                ].map(item => (
                  <button
                    key={item.type}
                    onClick={() => {
                      const firstOfType = baumannSkinTypes.find(t => t.type === item.type);
                      if (firstOfType) setSelectedBaumannResult(firstOfType.code);
                    }}
                    className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white hover:scale-105 transition-transform`}
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-xs opacity-80 mt-1">
                      {baumannSkinTypes.filter(t => t.type === item.type).length} 种类型
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 收藏的肤质 */}
            {favoriteSkinTypes.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  ❤️ 我的收藏肤质 ({favoriteSkinTypes.length})
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[...baumannSkinTypes.filter(t => favoriteSkinTypes.includes(t.id)), ...customSkinTypes.filter(t => favoriteSkinTypes.includes(t.id))].map((skinType, index) => (
                    <div
                      key={skinType.id}
                      className={`animate-fade-in-up p-5 rounded-2xl cursor-pointer transition-all border-2 ${
                        testResult === skinType.code
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-pink-300 bg-pink-50 hover:border-pink-400 hover:shadow-lg'
                      }`}
                      onClick={() => 'code' in skinType ? setSelectedBaumannResult(skinType.code) : null}
                    >
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavoriteSkinType(skinType.id); }}
                        className="float-right text-xl hover:scale-110 transition-transform"
                      >
                        ❤️
                      </button>
                      <div className="text-4xl mb-3">{skinType.emoji}</div>
                      <div className="font-bold text-lg text-gray-800">{(skinType as any).code || (skinType as any).name}</div>
                      <div className="text-sm text-gray-600 mb-2">{'name' in skinType ? skinType.name : '自定义肤质'}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 16型肤质卡片 */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">褒曼16型肤质</h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {baumannSkinTypes.map((skinType, index) => (
                  <div
                    key={skinType.id}
                    className={`animate-fade-in-up p-5 rounded-2xl cursor-pointer transition-all border-2 relative ${
                      testResult === skinType.code
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-100 bg-white hover:border-emerald-200 hover:shadow-lg'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setSelectedBaumannResult(skinType.code)}
                  >
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFavoriteSkinType(skinType.id); }}
                      className="absolute top-3 right-3 text-xl hover:scale-110 transition-transform"
                    >
                      {favoriteSkinTypes.includes(skinType.id) ? '❤️' : '🤍'}
                    </button>
                    <div className="text-4xl mb-3">{skinType.emoji}</div>
                    <div className="font-bold text-lg text-gray-800">{skinType.code}</div>
                    <div className="text-sm text-gray-600 mb-2">{skinType.name}</div>
                    <div className="flex gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        skinType.type === 'DS' ? 'bg-red-100 text-red-700' :
                        skinType.type === 'DR' ? 'bg-orange-100 text-orange-700' :
                        skinType.type === 'OS' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {skinType.type}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs ${skinType.pigmented ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                        {skinType.pigmented ? 'P' : 'N'}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs ${skinType.wrinkle ? 'bg-blue-100 text-blue-700' : 'bg-cyan-100 text-cyan-700'}`}>
                        {skinType.wrinkle ? 'W' : 'T'}
                      </span>
                    </div>
                    {testResult === skinType.code && (
                      <div className="mt-3 pt-3 border-t border-emerald-200">
                        <p className="text-xs font-medium text-emerald-700">✓ 您的肤质类型</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 自定义肤质 */}
            {customSkinTypes.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">自定义肤质 ({customSkinTypes.length})</h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {customSkinTypes.map((skinType, index) => (
                    <div
                      key={skinType.id}
                      className="animate-fade-in-up p-5 rounded-2xl cursor-pointer transition-all border-2 border-purple-200 bg-purple-50 hover:border-purple-400 hover:shadow-lg relative"
                      onClick={() => setSelectedBaumannResult(skinType.code)}
                    >
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavoriteSkinType(skinType.id); }}
                        className="absolute top-3 right-3 text-xl hover:scale-110 transition-transform"
                      >
                        {favoriteSkinTypes.includes(skinType.id) ? '❤️' : '🤍'}
                      </button>
                      <div className="text-4xl mb-3">{skinType.emoji}</div>
                      <div className="font-bold text-lg text-gray-800">{skinType.name}</div>
                      <div className="text-sm text-gray-600 mb-2">{skinType.code}</div>
                      <div className="flex gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          skinType.type === 'DS' ? 'bg-red-100 text-red-700' :
                          skinType.type === 'DR' ? 'bg-orange-100 text-orange-700' :
                          skinType.type === 'OS' ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {skinType.type}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs ${skinType.pigmented ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                          {skinType.pigmented ? 'P' : 'N'}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs ${skinType.wrinkle ? 'bg-blue-100 text-blue-700' : 'bg-cyan-100 text-cyan-700'}`}>
                          {skinType.wrinkle ? 'W' : 'T'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 成分百科 */}
      {activeTab === 'ingredients' && (
        <div className="pb-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-2">护肤成分百科</h3>
              <p className="text-gray-500 text-sm">了解常见成分的功效和使用方法</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {ingredients.map((ingredient, index) => (
                <div key={ingredient.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <IngredientCard ingredient={ingredient} onClick={() => setSelectedIngredient(ingredient)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 收藏 */}
      {activeTab === 'favorites' && (
        <div className="pb-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-2">我的收藏</h3>
              <p className="text-gray-500 text-sm">收藏你关注的皮肤问题</p>
            </div>

            {favoriteProblems.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">💝</div>
                <p className="text-gray-500 mb-4">还没有收藏任何问题</p>
                <button onClick={() => setActiveTab('problems')} className="btn-primary">去浏览问题</button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteProblems.map((problem, index) => (
                  <div key={problem.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <ProblemCard
                      problem={problem}
                      onClick={() => setSelectedProblem(problem)}
                      isFavorited={true}
                      onToggleFavorite={() => toggleFavorite(problem.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 护肤品推荐 */}
      {activeTab === 'products' && (
        <div className="pb-20 sm:pb-16">
          <div className="max-w-6xl mx-auto px-3 sm:px-4">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">💄 护肤品推荐</h3>
              <p className="text-gray-500 text-xs sm:text-sm">精选国货好物 + 开价品牌</p>
            </div>

            {/* 分类筛选 */}
            <div className="mb-4 sm:mb-6">
              <div className="flex gap-2 justify-start overflow-x-auto scroll-x pb-2 -mx-3 px-3 sm:justify-center sm:flex-wrap sm:overflow-visible">
                <button
                  onClick={() => setProductFilter('all')}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap ${productFilter === 'all' ? 'bg-emerald-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  全部
                </button>
                <button
                  onClick={() => setProductFilter('chinese')}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap ${productFilter === 'chinese' ? 'bg-red-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  🇨🇳 国货之光
                </button>
                <button
                  onClick={() => setProductFilter('affordable')}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap ${productFilter === 'affordable' ? 'bg-emerald-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  💰 开价好物
                </button>
                {productCategories.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => setProductFilter(cat.name)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap ${productFilter === cat.name ? 'bg-purple-500 text-white' : 'bg-white text-gray-600'}`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 产品列表 */}
            <div className="product-card-grid">
              {sampleProducts
                .filter(p => {
                  if (productFilter === 'all') return true;
                  if (productFilter === 'chinese') return p.country === '中国';
                  if (productFilter === 'affordable') return p.is_affordable;
                  return p.category === productFilter;
                })
                .map((product, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedProduct(product)}
                    className="bg-white rounded-2xl p-3 sm:p-4 cursor-pointer card-hover border border-gray-100 animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-2xl sm:text-3xl">
                        {product.category === '洁面' && '🧴'}
                        {product.category === '爽肤水' && '💧'}
                        {product.category === '精华' && '✨'}
                        {product.category === '面霜' && '🧴'}
                        {product.category === '眼霜' && '👁️'}
                        {product.category === '防晒' && '☀️'}
                        {product.category === '面膜' && '📦'}
                        {product.category === '彩妆' && '💄'}
                        {product.category === '套装' && '🎁'}
                        {product.category === '底妆' && '🎨'}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-600 text-sm sm:text-base">{product.price}</div>
                        {product.is_affordable && <span className="text-xs bg-emerald-100 text-emerald-700 px-1 rounded">开价</span>}
                      </div>
                    </div>
                    <div className="font-medium text-gray-800 text-sm sm:text-base mb-1">{product.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500 mb-2">{product.brand}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-xs sm:text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-gray-400 hidden xs:inline">({product.reviews_count}条评价)</span>
                      {product.country === '中国' && <span className="text-xs bg-red-100 text-red-600 px-1 rounded">国货</span>}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* 底部导航 - 6个按钮可左右滑动 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 safe-area-bottom">
        <div className="max-w-6xl mx-auto">
          <div className="flex area-tabs-scroll py-2 px-1">
            {[
              { id: 'home', label: '首页', icon: '🏠' },
              { id: 'problems', label: '问题', icon: '📚' },
              { id: 'test', label: '测试', icon: '🧪' },
              { id: 'skintype', label: '肤质', icon: '📖' },
              { id: 'products', label: '好物', icon: '💄' },
              { id: 'user', label: user ? '账户' : '登录', icon: user ? '👤' : '🔐' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'user') {
                    if (user) {
                      if (confirm('确定要退出登录吗？')) {
                        signOut();
                      }
                    } else {
                      setShowAuthModal(true);
                    }
                  } else {
                    setActiveTab(item.id as typeof activeTab)
                  }
                }}
                className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all touch-target flex-shrink-0 min-w-[60px] ${
                  activeTab === item.id ? 'text-emerald-600 bg-emerald-50' : 'text-gray-400'
                }`}
              >
                <span className="text-lg sm:text-xl">{item.icon}</span>
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 底部 */}
      <footer className="bg-gray-800 text-white py-8 px-4 pb-24">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="text-2xl">🌿</div>
            <span className="font-bold">SkinCare Hub</span>
          </div>
          <p className="text-gray-400 text-sm mb-2">本网站内容仅供参考，不能替代专业医疗建议</p>
          <p className="text-gray-500 text-xs">© 2024 SkinCare Hub</p>
        </div>
      </footer>

      {/* 模态框 */}
      {selectedProblem && <DetailModal problem={selectedProblem} onClose={() => setSelectedProblem(null)} />}
      {selectedBaumannResult && <BaumannResult code={selectedBaumannResult} onClose={() => setSelectedBaumannResult(null)} />}
      {selectedSkinType && <InfoModal type="skintype" data={selectedSkinType} onClose={() => setSelectedSkinType(null)} />}
      {selectedIngredient && <InfoModal type="ingredient" data={selectedIngredient} onClose={() => setSelectedIngredient(null)} />}
      {showAddSkinType && <AddSkinTypeModal onClose={() => setShowAddSkinType(false)} onAdd={addCustomSkinType} />}
      {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">
                    {selectedProduct.category === '洁面' && '🧴'}
                    {selectedProduct.category === '爽肤水' && '💧'}
                    {selectedProduct.category === '精华' && '✨'}
                    {selectedProduct.category === '面霜' && '🧴'}
                    {selectedProduct.category === '眼霜' && '👁️'}
                    {selectedProduct.category === '防晒' && '☀️'}
                    {selectedProduct.category === '面膜' && '📦'}
                    {selectedProduct.category === '彩妆' && '💄'}
                    {selectedProduct.category === '套装' && '🎁'}
                    {selectedProduct.category === '底妆' && '🎨'}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{selectedProduct.name}</h2>
                    <p className="text-gray-500 text-sm">{selectedProduct.brand}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedProduct(null)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 text-xl">⭐</span>
                  <span className="text-lg font-bold">{selectedProduct.rating}</span>
                  <span className="text-gray-400">({selectedProduct.reviews_count}条评价)</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-emerald-600">{selectedProduct.price}</span>
                  {selectedProduct.is_affordable && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">开价好物</span>}
                </div>
              </div>

              <div className="flex gap-2">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{selectedProduct.category}</span>
                {selectedProduct.country === '中国' && <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">🇨🇳 国货</span>}
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-medium text-blue-800 mb-2">💡 核心成分</h4>
                <p className="text-blue-700">{selectedProduct.key_ingredients}</p>
              </div>

              <div className="bg-emerald-50 rounded-xl p-4">
                <h4 className="font-medium text-emerald-800 mb-2">✨ 产品特点</h4>
                <p className="text-emerald-700">{selectedProduct.description}</p>
              </div>

              {selectedProduct.suitable_skin_types.length > 0 && (
                <div className="bg-purple-50 rounded-xl p-4">
                  <h4 className="font-medium text-purple-800 mb-2">适用肤质</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.suitable_skin_types.map((type, i) => (
                      <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">{type}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-amber-50 rounded-xl p-4">
                <p className="text-amber-700 text-sm">⚠️ 建议先购买小样试用，确认适合后再购买正装</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 添加自定义肤质弹窗
const AddSkinTypeModal = ({ onClose, onAdd }: { onClose: () => void; onAdd: (skinType: Omit<CustomSkinType, 'id' | 'createdAt'>) => void }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [emoji, setEmoji] = useState('😊');
  const [type, setType] = useState<'DS' | 'DR' | 'OS' | 'OR'>('DR');
  const [pigmented, setPigmented] = useState(false);
  const [wrinkle, setWrinkle] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !code.trim()) {
      alert('请填写肤质名称和代码');
      return;
    }
    onAdd({ name, code: code.toUpperCase(), emoji, type, pigmented, wrinkle });
    onClose();
  };

  const typeOptions = [
    { value: 'DS', label: '干性敏感', color: 'bg-red-100 text-red-700' },
    { value: 'DR', label: '干性耐受', color: 'bg-orange-100 text-orange-700' },
    { value: 'OS', label: '油性敏感', color: 'bg-purple-100 text-purple-700' },
    { value: 'OR', label: '油性耐受', color: 'bg-gray-100 text-gray-700' }
  ];

  const emojiOptions = ['😊', '😟', '😤', '🤔', '✨', '🌟', '💪', '🧐', '🥰', '😴', '🤩', '💧'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">➕</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">添加自定义肤质</h2>
                <p className="text-gray-500 text-sm mt-1">创建你的专属肤质类型</p>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              ✕
            </button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {/* 肤质名称 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">肤质名称 *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="例如：我的混合肌"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none"
            />
          </div>

          {/* 肤质代码 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">肤质代码 *</label>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              placeholder="例如：DRPW"
              maxLength={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">4位代码，如：DSNW、ORPT</p>
          </div>

          {/* Emoji选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">选择图标</label>
            <div className="flex flex-wrap gap-2">
              {emojiOptions.map(e => (
                <button
                  key={e}
                  onClick={() => setEmoji(e)}
                  className={`w-12 h-12 text-2xl rounded-xl border-2 transition-all ${
                    emoji === e ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* 肤质类型 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">基本类型</label>
            <div className="grid grid-cols-2 gap-2">
              {typeOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setType(opt.value as 'DS' | 'DR' | 'OS' | 'OR')}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    type === opt.value ? `${opt.color} border-current` : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 色素和皱纹倾向 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">特征标记</label>
            <div className="flex gap-4">
              <button
                onClick={() => setPigmented(!pigmented)}
                className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                  pigmented ? 'bg-yellow-100 border-yellow-500 text-yellow-700' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {pigmented ? '🎨 有色素倾向' : '○ 无色素倾向'}
              </button>
              <button
                onClick={() => setWrinkle(!wrinkle)}
                className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                  wrinkle ? 'bg-blue-100 border-blue-500 text-blue-700' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {wrinkle ? '⏰ 有皱纹倾向' : '○ 无皱纹倾向'}
              </button>
            </div>
          </div>

          <button onClick={handleSubmit} className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:shadow-lg transition-all">
            保存肤质
          </button>
        </div>
      </div>
    </div>
  );
};

// 搜索组件
const SearchBar = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div className="relative">
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="搜索皮肤问题..."
      className="w-full px-5 py-3 pl-12 rounded-full bg-white border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
    />
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
  </div>
);

export default App
