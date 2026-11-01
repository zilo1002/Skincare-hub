// 皮肤问题数据 - 完整细化版

export type ProductType = 'drugstore' | 'mid-range' | 'luxury' | 'proxy' | 'essential' | 'medical';

export interface Product {
  name: string;
  price: '$' | '$$' | '$$$';
  type: ProductType;
  keyIngredient?: string;
  usage?: string; // 用法用量
  dosage?: string; // 剂量说明
  skinType?: string; // 适合肤质
  combination?: string; // 搭配建议
  note?: string; // 备注：代购渠道/注意事项等
  homeCare?: string; // 家庭护理建议
}

export interface Solution {
  type: 'home-remedy' | 'natural' | 'product' | 'medical' | 'alternative';
  title: string;
  duration: string;
  cost: '$' | '$$' | '$$$';
  efficacy: 'low' | 'medium' | 'high';
  steps?: string[];
  ingredients?: string[];
  products?: Product[];
  precautions?: string[];
  homeCare?: string[]; // 家庭护理方法
  note?: string; // 补充说明
}

export type Area = 'face' | 'scalp' | 'body' | 'hands' | 'feet' | 'scar' | 'hair';

export interface SkinProblem {
  id: string;
  area: Area;
  subArea?: string; // 细分部位：额头/下巴/鼻子/眼周/脸颊/全脸等
  category: string;
  subCategory?: string; // 细分类型
  cause?: string; // 具体原因
  title: string;
  emoji: string;
  description: string;
  causes: string[];
  symptoms: string[];
  solutions: Solution[];
  prevention: string[];
  whenToSeeDoctor: string;
}

// 肤质类型
export interface SkinType {
  id: string;
  name: string;
  emoji: string;
  description: string;
  characteristics: string[];
  suitableIngredients: string[];
  avoidIngredients: string[];
  tips: string[];
}

// 褒曼16型肤质详细数据
export interface BaumannSkinType {
  id: string;
  code: string; // DSPI, DSPT, etc.
  name: string;
  emoji: string;
  type: 'DS' | 'DR' | 'OS' | 'OR'; // 干敏/干耐/油敏/油耐
  pigmented: boolean; // P/N 色素沉着倾向
  wrinkle: boolean; // W/T 皱纹倾向
  profile: string; // 核心画像
  barrierSymptoms: string[]; // 屏障损伤表现
  repairStrategy: string[]; // 修复策略
  recommendedIngredients: string[]; // 推荐成分
  avoidIngredients: { ingredient: string; reason: string }[]; // 避免成分
  toleranceBuilding: { warning: string; solution: string }[]; // 建立耐受
  amRoutine: { step: number; product: string; keyPoints: string[] }[]; // 早间routine
  pmRoutine: { step: number; product: string; keyPoints: string[] }[]; // 晚间routine
  affordableProducts?: { name: string; price: string; keyPoints: string; where: string }[]; // 平价产品推荐
}

// 自定义肤质类型
export interface CustomSkinType {
  id: string;
  name: string;
  code: string;
  emoji: string;
  type: 'DS' | 'DR' | 'OS' | 'OR';
  pigmented: boolean;
  wrinkle: boolean;
  createdAt: number;
}

// 护肤成分百科
export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  category: '保湿' | '美白' | '抗老' | '控油' | '舒缓' | '去角质' | '抗氧化' | '细胞修护' | '仿生科技' | '植物提取';
  description: string;
  benefits: string[];
  suitableFor: string[];
  usage: string;
  concentration: string;
  sideEffects?: string;
  pairingTips?: string[]; // 搭配建议
  avoidWith?: string[]; // 避免搭配
}

// 皮肤测试问卷 - 褒曼16型肤质测试
export interface TestQuestion {
  id: string;
  question: string;
  dimension: 'dryness' | 'sensitivity' | 'pigmentation' | 'wrinkle'; // 对应维度
  options: {
    text: string;
    // 每道题的选项代表不同的评分方向
    scores: {
      dry: number;      // 干性倾向
      oily: number;     // 油性倾向
      sensitive: number; // 敏感倾向
      resistant: number; // 耐受倾向
      pigmented: number; // 色素倾向
      nonPigmented: number; // 非色素倾向
      wrinkle: number;   // 皱纹倾向
      tight: number;    // 紧致倾向
    };
  }[];
}

export const skinTestQuestions: TestQuestion[] = [
  {
    id: 'q1',
    question: '洗完脸后，不涂任何护肤品，多久会感到紧绷？',
    dimension: 'dryness',
    options: [
      { text: '立即（1-2分钟内）', scores: { dry: 3, oily: 0, sensitive: 2, resistant: 0, pigmented: 1, nonPigmented: 0, wrinkle: 1, tight: 0 } },
      { text: '5-15分钟', scores: { dry: 1, oily: 0, sensitive: 1, resistant: 1, pigmented: 0, nonPigmented: 1, wrinkle: 0, tight: 1 } },
      { text: '30分钟以上甚至不紧绷', scores: { dry: 0, oily: 3, sensitive: 0, resistant: 2, pigmented: 0, nonPigmented: 1, wrinkle: 0, tight: 1 } },
    ]
  },
  {
    id: 'q2',
    question: '你的毛孔状况如何？',
    dimension: 'dryness',
    options: [
      { text: '几乎看不见毛孔，皮肤细腻', scores: { dry: 2, oily: 0, sensitive: 1, resistant: 1, pigmented: 0, nonPigmented: 1, wrinkle: 0, tight: 2 } },
      { text: 'T区毛孔明显，脸颊较细', scores: { dry: 0, oily: 2, sensitive: 0, resistant: 1, pigmented: 1, nonPigmented: 0, wrinkle: 0, tight: 1 } },
      { text: '全脸毛孔都很明显', scores: { dry: 0, oily: 3, sensitive: 0, resistant: 2, pigmented: 1, nonPigmented: 0, wrinkle: 1, tight: 0 } },
    ]
  },
  {
    id: 'q3',
    question: '你的皮肤容易出现红肿、刺痛或瘙痒吗？',
    dimension: 'sensitivity',
    options: [
      { text: '很少，几乎没有', scores: { dry: 0, oily: 0, sensitive: 0, resistant: 3, pigmented: 0, nonPigmented: 1, wrinkle: 0, tight: 1 } },
      { text: '偶尔，特别是在换季或使用新产品时', scores: { dry: 1, oily: 0, sensitive: 2, resistant: 1, pigmented: 1, nonPigmented: 0, wrinkle: 0, tight: 1 } },
      { text: '经常，容易过敏或出现各种不适', scores: { dry: 1, oily: 0, sensitive: 3, resistant: 0, pigmented: 1, nonPigmented: 0, wrinkle: 1, tight: 0 } },
    ]
  },
  {
    id: 'q4',
    question: '使用新产品时，你的皮肤反应通常是？',
    dimension: 'sensitivity',
    options: [
      { text: '适应良好，很少出现问题', scores: { dry: 0, oily: 0, sensitive: 0, resistant: 3, pigmented: 0, nonPigmented: 1, wrinkle: 0, tight: 1 } },
      { text: '偶尔会有轻微刺痒或泛红', scores: { dry: 1, oily: 0, sensitive: 2, resistant: 1, pigmented: 0, nonPigmented: 1, wrinkle: 0, tight: 1 } },
      { text: '经常过敏、刺痛或爆痘', scores: { dry: 1, oily: 0, sensitive: 3, resistant: 0, pigmented: 1, nonPigmented: 0, wrinkle: 1, tight: 0 } },
    ]
  },
  {
    id: 'q5',
    question: '你的皮肤容易产生色斑吗？',
    dimension: 'pigmentation',
    options: [
      { text: '很少，不明显', scores: { dry: 0, oily: 0, sensitive: 0, resistant: 1, pigmented: 0, nonPigmented: 3, wrinkle: 0, tight: 1 } },
      { text: '有一些，但不太明显', scores: { dry: 0, oily: 0, sensitive: 1, resistant: 1, pigmented: 2, nonPigmented: 1, wrinkle: 0, tight: 1 } },
      { text: '很明显，有色斑、痘印或肤色不均', scores: { dry: 1, oily: 0, sensitive: 1, resistant: 1, pigmented: 3, nonPigmented: 0, wrinkle: 1, tight: 0 } },
    ]
  },
  {
    id: 'q6',
    question: '日晒后你的皮肤会怎样？',
    dimension: 'pigmentation',
    options: [
      { text: '会变黑，但很快能恢复', scores: { dry: 0, oily: 0, sensitive: 0, resistant: 2, pigmented: 2, nonPigmented: 1, wrinkle: 0, tight: 1 } },
      { text: '容易留下色斑或晒斑', scores: { dry: 1, oily: 0, sensitive: 1, resistant: 1, pigmented: 3, nonPigmented: 0, wrinkle: 1, tight: 0 } },
      { text: '几乎不变黑或很少变化', scores: { dry: 1, oily: 0, sensitive: 1, resistant: 1, pigmented: 0, nonPigmented: 3, wrinkle: 0, tight: 1 } },
    ]
  },
  {
    id: 'q7',
    question: '你的皮肤出现细纹和皱纹的情况？',
    dimension: 'wrinkle',
    options: [
      { text: '不明显，皮肤较紧致有弹性', scores: { dry: 0, oily: 0, sensitive: 0, resistant: 1, pigmented: 0, nonPigmented: 1, wrinkle: 0, tight: 3 } },
      { text: '眼周有轻微细纹，表情纹开始出现', scores: { dry: 1, oily: 0, sensitive: 1, resistant: 1, pigmented: 1, nonPigmented: 0, wrinkle: 2, tight: 1 } },
      { text: '细纹和皱纹明显，特别是法令纹、眼角', scores: { dry: 2, oily: 0, sensitive: 1, resistant: 1, pigmented: 1, nonPigmented: 0, wrinkle: 3, tight: 0 } },
    ]
  },
  {
    id: 'q8',
    question: '你的皮肤松弛程度如何？',
    dimension: 'wrinkle',
    options: [
      { text: '紧致，弹性好', scores: { dry: 0, oily: 0, sensitive: 0, resistant: 1, pigmented: 0, nonPigmented: 1, wrinkle: 0, tight: 3 } },
      { text: '开始有轻微松弛感', scores: { dry: 1, oily: 0, sensitive: 1, resistant: 1, pigmented: 1, nonPigmented: 0, wrinkle: 2, tight: 1 } },
      { text: '明显松弛，下垂感强', scores: { dry: 2, oily: 0, sensitive: 1, resistant: 1, pigmented: 1, nonPigmented: 0, wrinkle: 3, tight: 0 } },
    ]
  },
  {
    id: 'q9',
    question: '你的皮肤出油状况如何？',
    dimension: 'dryness',
    options: [
      { text: '很少出油，皮肤偏干', scores: { dry: 3, oily: 0, sensitive: 1, resistant: 1, pigmented: 1, nonPigmented: 0, wrinkle: 1, tight: 0 } },
      { text: '额头、鼻子油，但两颊正常或偏干', scores: { dry: 0, oily: 2, sensitive: 0, resistant: 2, pigmented: 0, nonPigmented: 1, wrinkle: 0, tight: 1 } },
      { text: '全脸都容易出油', scores: { dry: 0, oily: 3, sensitive: 0, resistant: 2, pigmented: 0, nonPigmented: 1, wrinkle: 0, tight: 1 } },
    ]
  },
  {
    id: 'q10',
    question: '你的皮肤光泽度如何？',
    dimension: 'dryness',
    options: [
      { text: '偏暗淡，干燥粗糙', scores: { dry: 3, oily: 0, sensitive: 1, resistant: 0, pigmented: 1, nonPigmented: 0, wrinkle: 1, tight: 0 } },
      { text: '有自然光泽，但不油腻', scores: { dry: 0, oily: 0, sensitive: 0, resistant: 2, pigmented: 0, nonPigmented: 2, wrinkle: 0, tight: 2 } },
      { text: '容易泛油光', scores: { dry: 0, oily: 3, sensitive: 0, resistant: 2, pigmented: 0, nonPigmented: 1, wrinkle: 0, tight: 1 } },
    ]
  },
];

// ========== 脸部问题 - 极致细化版 ==========
export const faceProblems: SkinProblem[] = [
  // ==================== 痤疮类（按部位+类型+原因细分）====================
  {
    id: 'face-acne-forehead-closed',
    area: 'face',
    subArea: '额头',
    category: '痤疮',
    subCategory: '闭口粉刺',
    cause: '油脂分泌旺盛',
    title: '额头闭口粉刺',
    emoji: '⚪',
    description: '额头部位因刘海遮挡或油脂分泌旺盛形成的闭合性粉刺。',
    causes: ['刘海刺激', '油脂分泌旺盛', '角化异常', '清洁不彻底'],
    symptoms: ['额头米粒大小丘疹', '无明显开口', '触感粗糙', '光下明显'],
    solutions: [
      {
        type: 'product',
        title: '水杨酸局部点涂',
        duration: '2-4周见效',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: 'Stridex水杨酸棉片(绿盒)', price: '$', type: 'drugstore', keyIngredient: '2%水杨酸', usage: '每晚洁面后，取一片湿敷额头3-5分钟，每周3-4次' },
          { name: '理肤泉K+精华', price: '$$', type: 'mid-range', keyIngredient: '水杨酸+辛酰水杨酸', usage: '每日早晚，取绿豆大小点涂于闭口处，轻轻按摩', note: '局部使用，避免全脸' },
          { name: 'DR.WU杏仁酸精华8%', price: '$$', type: 'mid-range', keyIngredient: '8%杏仁酸', usage: '每晚3-4滴局部涂抹于额头，建立耐受后可每天使用', note: '台湾代购热门产品' },
        ],
        precautions: ['避免刘海遮挡', '不要用手挤压']
      },
      {
        type: 'alternative',
        title: '霍霍巴油按摩法（邪修偏方）',
        duration: '需要坚持',
        cost: '$',
        efficacy: 'medium',
        steps: ['洁面后取2-3滴霍霍巴油', '用指腹轻轻按摩额头闭口处5分钟', '用温热毛巾敷30秒', '再使用温和洁面洗净', '最后做好保湿'],
        precautions: ['按摩力度要轻', '每周2-3次即可']
      }
    ],
    prevention: ['刘海扎起或剪短', '保持额头清洁', '定期去角质'],
    whenToSeeDoctor: '闭口持续增多或发炎'
  },
  {
    id: 'face-acne-tzone-oily',
    area: 'face',
    subArea: '全脸-T区',
    category: '痤疮',
    subCategory: '寻常痤疮',
    cause: '油性肌肤',
    title: 'T区油光+痤疮',
    emoji: '🛢️',
    description: 'T区（额头+鼻子+下巴）油脂分泌旺盛导致的粉刺和痘痘。',
    causes: ['皮脂腺分布密集', '激素影响', '高GI饮食', '熬夜'],
    symptoms: ['额头油光发亮', '鼻头黑头白头', '下巴粉刺', '毛孔粗大'],
    solutions: [
      {
        type: 'product',
        title: '控油祛痘组合（平价版）',
        duration: '持续使用',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: 'The Ordinary水杨酸2%+锌', price: '$', type: 'essential', keyIngredient: '2%水杨酸+1%锌', usage: '每晚3-4滴涂抹于T区，洁面后第一步使用', note: '平价必买，效果直接' },
          { name: '露得清祛痘洁面乳', price: '$', type: 'essential', keyIngredient: '2%水杨酸', usage: '每日2次，取黄豆大小揉搓后清洁面部30秒' },
          { name: 'OXY10班赛凝胶', price: '$', type: 'drugstore', keyIngredient: '10%过氧化苯甲酰', usage: '点涂于红肿痘痘处，每晚一次，初期可能干燥脱皮' },
        ],
        precautions: ['从低浓度开始', '配合保湿', '防晒']
      },
      {
        type: 'product',
        title: '控油祛痘组合（高端版）',
        duration: '持续使用',
        cost: '$$$',
        efficacy: 'high',
        products: [
          { name: '修丽可CLEANSER洁面', price: '$$', type: 'luxury', keyIngredient: '1.5%水杨酸', usage: '每日2次，取适量加水揉搓，温和清洁' },
          { name: 'SK-II神仙水', price: '$$$', type: 'luxury', keyIngredient: 'PITERA', usage: '每日早晚，取足量（约20滴）轻拍于T区，调节油脂分泌', note: '贵但有效，油皮亲妈，建议日上/日代购买' },
          { name: 'La Roche-Posay Effaclar DUO+', price: '$$', type: 'mid-range', keyIngredient: '烟酰胺+吡罗克酮', usage: '每日早晚取适量涂抹于T区和痘痘处', note: '法国药妆，可代购' },
        ],
        precautions: ['神仙水含pitera需坚持使用']
      },
      {
        type: 'medical',
        title: '处方药治疗（严重时）',
        duration: '遵医嘱',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: '阿达帕林凝胶', price: '$', type: 'drugstore', keyIngredient: '0.1%/0.3%阿达帕林', usage: '每晚一次，薄涂于患处，需建立耐受', note: '维A酸类，孕妇禁用' },
          { name: '夫西地酸乳膏', price: '$', type: 'drugstore', keyIngredient: '夫西地酸', usage: '每日2-3次点涂于红肿痘痘处', note: '抗生素类，不宜长期使用' },
        ],
        precautions: ['需医生处方', '抗生素类不宜超过3个月']
      }
    ],
    prevention: ['低GI饮食', '规律作息', '控油保湿平衡'],
    whenToSeeDoctor: '痘痘囊肿或留下明显疤痕'
  },
  {
    id: 'face-acne-chin-hormonal',
    area: 'face',
    subArea: '下巴',
    category: '痤疮',
    subCategory: '成人痤疮',
    cause: '激素波动',
    title: '下巴成人痤疮（激素痘）',
    emoji: '🌙',
    description: '下巴部位反复发作的成人痤疮，与月经周期、压力大、激素变化密切相关。',
    causes: ['雌激素/雄激素失衡', '多囊卵巢综合征', '压力大', '高胰岛素血症'],
    symptoms: ['下巴反复长痘', '经期前加重', '囊肿结节', '下颌线蔓延'],
    solutions: [
      {
        type: 'product',
        title: '控油抑菌+抗炎',
        duration: '持续调理',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: 'The Ordinary烟酰胺10%+锌1%', price: '$', type: 'essential', keyIngredient: '10%烟酰胺+1%锌', usage: '每日1-2次，取3-4滴涂抹于下巴区域', note: '控油抑菌，性价比之王' },
          { name: '理肤泉DUO+乳', price: '$$', type: 'mid-range', keyIngredient: '烟酰胺+水杨酸', usage: '每日2次，取适量点涂于痘痘处' },
          { name: 'PCA Skin Benzoyl Peroxide 5%', price: '$$', type: 'mid-range', keyIngredient: '5%过氧化苯甲酰', usage: '每晚一次点涂，减少炎症' },
        ],
        precautions: ['经期前1-2周加强护理', '保持好心情']
      },
      {
        type: 'product',
        title: '内分泌调理（配合使用）',
        duration: '需长期调理',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: 'Swisse女士复合维生素', price: '$', type: 'drugstore', keyIngredient: 'B族+锌+镁', usage: '每日一片，随餐服用', note: '辅助调理内分泌' },
          { name: 'NOW Foods 肌醇胶囊', price: '$', type: 'proxy', keyIngredient: '肌醇', usage: '每日2g，分两次服用', note: '调节激素，适合多囊，Amazon有售' },
        ],
        precautions: ['严重者需就医检查激素']
      }
    ],
    prevention: ['少吃高GI食物', '保证睡眠', '减压', '适量运动'],
    whenToSeeDoctor: '疑似多囊或痘痘严重影响生活'
  },
  {
    id: 'face-acne-cheek-cystic',
    area: 'face',
    subArea: '脸颊',
    category: '痤疮',
    subCategory: '囊肿痤疮',
    cause: '细菌感染',
    title: '脸颊囊肿结节（重度痤疮）',
    emoji: '🟣',
    description: '脸颊深层囊肿和结节，疼痛明显，易留疤，属于重度痤疮，必须就医。',
    causes: ['痤疮丙酸杆菌深层感染', '免疫反应', '激素严重失衡', '遗传因素'],
    symptoms: ['深层硬结', '红肿疼痛', '化脓', '易留疤'],
    solutions: [
      {
        type: 'medical',
        title: '必须就医治疗',
        duration: '遵医嘱',
        cost: '$$$',
        efficacy: 'high',
        products: [
          { name: '异维A酸（口服）', price: '$$', type: 'drugstore', keyIngredient: '异维A酸', usage: '必须医生处方，剂量按体重计算', note: '重度痤疮首选，副作用大但效果显著' },
          { name: '盐酸多西环素', price: '$', type: 'drugstore', keyIngredient: '多西环素', usage: '遵医嘱，一般每日100-200mg', note: '抗生素疗法，需配合外用药' },
          { name: '壬二酸凝胶15%', price: '$$', type: 'proxy', keyIngredient: '壬二酸', usage: '每日2次全脸涂抹', note: 'Azelaic Acid，可代购，敏感肌可用' },
        ],
        precautions: ['绝对必须就医', '不可自行用药', '异维A酸致畸，育龄期慎用']
      }
    ],
    prevention: ['早发现早治疗', '不要挤压', '防止疤痕'],
    whenToSeeDoctor: '出现囊肿时必须立即就医'
  },
  {
    id: 'face-acne-nose-comedone',
    area: 'face',
    subArea: '鼻子',
    category: '痤疮',
    subCategory: '黑头粉刺',
    cause: '毛孔堵塞',
    title: '鼻部黑头白头',
    emoji: '⚫',
    description: '鼻子部位的黑头和白头，毛孔堵塞的典型表现。',
    causes: ['皮脂分泌旺盛', '角质堆积', '空气氧化'],
    symptoms: ['黑头', '白头', '毛孔粗大', '草莓鼻'],
    solutions: [
      {
        type: 'product',
        title: '水杨酸+清洁面膜',
        duration: '持续护理',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: '宝拉珍选2%水杨酸精华', price: '$$', type: 'mid-range', keyIngredient: '2%水杨酸', usage: '每晚3-4滴涂抹于鼻子，每周2次湿敷3分钟' },
          { name: 'Stridex棉片(红盒加强版)', price: '$', type: 'drugstore', keyIngredient: '2%水杨酸', usage: '每周2-3次湿敷鼻子5分钟', note: '比绿盒更温和但更有效' },
          { name: '科颜氏白泥面膜', price: '$$', type: 'mid-range', keyIngredient: '亚马逊白泥', usage: '每周1次，洁面后厚涂鼻子10分钟洗净', note: '配合水杨酸效果更好' },
        ],
        precautions: ['不要用鼻贴', '配合保湿', '防晒']
      },
      {
        type: 'alternative',
        title: '霍霍巴油去黑头法（邪修）',
        duration: '需要耐心',
        cost: '$',
        efficacy: 'medium',
        steps: ['洁面后取1-2滴霍霍巴油', '用棉签或指腹打圈按摩鼻子5分钟', '会感觉有颗粒析出（黑头）', '用温热毛巾擦拭', '再用水杨酸产品收敛'],
        precautions: ['用纯霍霍巴油，不要混合', '按摩要轻柔', '每周2次即可']
      }
    ],
    prevention: ['定期深层清洁', '控油', '不要挤压'],
    whenToSeeDoctor: '毛孔问题严重影响'
  },

  // ==================== 皱纹老化类（按部位+深度细分）====================
  {
    id: 'face-wrinkle-forehead-expression',
    area: 'face',
    subArea: '额头',
    category: '皱纹',
    subCategory: '动态纹',
    cause: '表情丰富',
    title: '抬头纹（动态纹）',
    emoji: '📜',
    description: '额部肌肉收缩形成的水平纹路，分为动态纹和静态纹。',
    causes: ['反复抬眉', '表情丰富', '紫外线损伤', '胶原流失'],
    symptoms: ['额部横纹', '抬眉时明显', '静态时也存在'],
    solutions: [
      {
        type: 'product',
        title: '抗皱精华+防晒',
        duration: '长期坚持',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: '露得清视黄醇面霜', price: '$', type: 'essential', keyIngredient: '0.1%视黄醇', usage: '每晚取珍珠大小涂抹于额头，避开眼周' },
          { name: 'The Ordinary Buffet+多肽精华', price: '$', type: 'essential', keyIngredient: 'Matrixyl 3000+Argireline', usage: '每日早晚各一次，取3-4滴涂抹于额头', note: '平价多肽，可配合视黄醇' },
          { name: '怡丽丝尔优悦眼霜（面部可用）', price: '$$$', type: 'luxury', keyIngredient: '纯粹视黄醇', usage: '每晚取适量涂抹于皱纹处，需建立耐受', note: '日本销量第一视黄醇产品，可日代购' },
        ],
        precautions: ['视黄醇孕妇禁用', '白天必须防晒']
      },
      {
        type: 'medical',
        title: '医美治疗（严重时）',
        duration: '按疗程',
        cost: '$$$',
        efficacy: 'high',
        products: [
          { name: '保妥适肉毒素', price: '$$$', type: 'luxury', keyIngredient: 'A型肉毒素', usage: '需专业医生注射，一般每3-6个月一次', note: '效果显著，但需找正规机构' },
        ],
        precautions: ['必须去正规医疗机构']
      }
    ],
    prevention: ['减少抬眉习惯', '做好防晒', '25岁后开始抗老'],
    whenToSeeDoctor: '静态纹明显或快速加深'
  },
  {
    id: 'face-wrinkle-eye-crowfeet',
    area: 'face',
    subArea: '眼周',
    category: '皱纹',
    subCategory: '细纹',
    cause: '自然老化',
    title: '鱼尾纹（眼周细纹）',
    emoji: '🐟',
    description: '眼尾部位的细纹，是最早显现的老化迹象之一。',
    causes: ['自然老化', '表情丰富', '眼周皮肤薄', '紫外线'],
    symptoms: ['眼尾放射状细纹', '笑时加深', '逐渐变深'],
    solutions: [
      {
        type: 'product',
        title: '眼周抗皱组合',
        duration: '4-8周见效',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: '欧莱雅紫熨斗眼霜', price: '$$', type: 'mid-range', keyIngredient: '玻色因+咖啡因', usage: '每日2次，取米粒大小点涂眼周，轻轻按摩' },
          { name: '优时颜微笑眼霜', price: '$$', type: 'drugstore', keyIngredient: '六胜肽+类肉毒素', usage: '每日2次，取绿豆大小轻柔点涂眼周', note: '国产抗衰眼霜黑马，六胜肽抗皱+类肉毒素淡纹，适合熬夜党，国货平价精品' },
          { name: '优时颜淡纹精华眼霜', price: '$$', type: 'drugstore', keyIngredient: '视黄醇+玻色因', usage: '每晚一次，取少量建立耐受后可用', note: '国产视黄醇眼霜，A醇抗皱+玻色因紧致，性价比高' },
          { name: '怡丽丝尔优悦眼霜', price: '$$$', type: 'luxury', keyIngredient: '纯粹视黄醇', usage: '每晚一次，取少量点涂眼周，需建立耐受', note: '日本药妆店常有折扣，可代购' },
          { name: 'The Ordinary咖啡因眼精华5%+EGCG', price: '$', type: 'essential', keyIngredient: '5%咖啡因', usage: '每日早晚各一次，取1-2滴点涂眼周', note: '消肿+抗氧化，平价必买' },
        ],
        precautions: ['眼周皮肤薄，用量要少', '按摩要轻柔']
      },
      {
        type: 'product',
        title: '高端抗老眼霜组合',
        duration: '长期使用',
        cost: '$$$',
        efficacy: 'high',
        products: [
          { name: '兰蔻小黑瓶眼霜', price: '$$$', type: 'luxury', keyIngredient: '小黑瓶核心成分+咖啡因', usage: '每日早晚取红豆大小点涂眼周' },
          { name: 'La Mer浓缩修护眼霜', price: '$$$', type: 'luxury', keyIngredient: 'Miracle Broth', usage: '每日早晚取适量点涂眼周，配合按摩棒', note: '贵妇级，可找日上/韩代' },
          { name: '资生堂悦薇眼霜', price: '$$$', type: 'luxury', keyIngredient: '视黄醇+4MSK', usage: '每晚取适量点涂眼周', note: '日系高端抗老眼霜，机场免税店购买划算' },
        ],
        precautions: ['贵价产品建议先试小样']
      }
    ],
    prevention: ['使用眼霜', '做好防晒', '避免夸张表情'],
    whenToSeeDoctor: '细纹快速加深'
  },
  {
    id: 'face-wrinkle-nasolabial',
    area: 'face',
    subArea: '法令纹',
    category: '皱纹',
    subCategory: '深层皱纹',
    cause: '老化下垂',
    title: '法令纹（鼻唇沟）',
    emoji: '〰️',
    description: '从鼻翼延伸至嘴角的皱纹，与面部松弛下垂密切相关。',
    causes: ['苹果肌下垂', '骨骼流失', '胶原流失', '表情习惯'],
    symptoms: ['鼻翼旁深沟', '面部松弛', '显老明显'],
    solutions: [
      {
        type: 'product',
        title: '紧致提升+填充',
        duration: '长期坚持',
        cost: '$$$',
        efficacy: 'medium',
        products: [
          { name: '修丽可AGE面霜', price: '$$$', type: 'luxury', keyIngredient: '30%玻色因', usage: '每日2次，取樱桃大小涂抹于面部，配合提拉按摩', note: '业界最高浓度玻色因，抗老紧致' },
          { name: 'SK-II大红瓶面霜', price: '$$$', type: 'luxury', keyIngredient: 'PITERA+烟酰胺', usage: '每日早晚取指甲盖大小点涂面部五点，轻拍至吸收' },
          { name: 'Olay超红瓶面霜', price: '$$', type: 'mid-range', keyIngredient: '信号肽', usage: '每日2次，配合按摩提拉' },
        ],
        precautions: ['护肤品效果有限，严重时需医美']
      },
      {
        type: 'medical',
        title: '医美填充治疗',
        duration: '按疗程',
        cost: '$$$',
        efficacy: 'high',
        products: [
          { name: '乔雅登玻尿酸填充', price: '$$$', type: 'luxury', keyIngredient: '玻尿酸', usage: '需专业医生注射，效果立竿见影', note: '效果可维持6-12个月' },
        ],
        precautions: ['选择正规医疗机构']
      }
    ],
    prevention: ['早期抗老', '做好防晒', '不要过度减肥'],
    whenToSeeDoctor: '法令纹严重影响外观'
  },
  {
    id: 'face-wrinkle-neck',
    area: 'face',
    subArea: '颈部',
    category: '皱纹',
    subCategory: '颈纹',
    cause: '老化+姿势',
    title: '颈纹',
    emoji: '🦢',
    description: '颈部横向皱纹，与低头习惯和颈部皮肤薄有关。',
    causes: ['低头玩手机', '颈部皮肤薄', '胶原流失', '干燥'],
    symptoms: ['颈部横纹', '颈部松弛', '火鸡脖'],
    solutions: [
      {
        type: 'product',
        title: '颈霜+按摩',
        duration: '长期坚持',
        cost: '$$',
        efficacy: 'medium',
        products: [
          { name: '资生堂悦薇颈霜', price: '$$$', type: 'luxury', keyIngredient: '视黄醇+4MSK', usage: '每日2次，取适量从下往上按摩颈部', note: '日系颈霜经典，日代购买更划算' },
          { name: 'The Ordinary Buffet+多肽', price: '$', type: 'essential', keyIngredient: 'Matrixyl 3000+Argireline', usage: '每日2次，取3-4滴涂抹于颈部并按摩', note: '平价替代，配合保湿产品' },
          { name: 'Clarins美颈霜', price: '$$', type: 'mid-range', keyIngredient: '袋鼠花精粹', usage: '每日早晚从锁骨向下滑动按摩至吸收' },
        ],
        precautions: ['按摩方向要从下往上', '配合保湿']
      }
    ],
    prevention: ['不做低头族', '做好颈部防晒', '使用颈霜'],
    whenToSeeDoctor: '颈纹严重'
  },

  // ==================== 敏感泛红类（按部位+类型细分）====================
  {
    id: 'face-sensitive-cheek-rosacea',
    area: 'face',
    subArea: '脸颊',
    category: '敏感',
    subCategory: '玫瑰痤疮',
    cause: '血管扩张',
    title: '脸颊玫瑰痤疮/红血丝',
    emoji: '🔴',
    description: '脸颊持久性红斑和可见红血丝，是玫瑰痤疮的典型表现，需就医确诊。',
    causes: ['血管扩张', '慢性炎症', '屏障受损', '遗传'],
    symptoms: ['脸颊持久性红斑', '可见红血丝', '遇热/情绪加重', '可能有丘疹'],
    solutions: [
      {
        type: 'product',
        title: '舒缓修护屏障（日常护理）',
        duration: '持续护理',
        cost: '$$',
        efficacy: 'medium',
        products: [
          { name: '雅漾特护霜', price: '$$', type: 'mid-range', keyIngredient: '雅漾活泉水+角鲨烷', usage: '每日2-3次，取适量涂抹于泛红处，轻轻按压', note: '专为敏感肌设计，法国药妆' },
          { name: '理肤泉B5修复霜', price: '$$', type: 'mid-range', keyIngredient: '5%泛醇+积雪草', usage: '每日2次，可厚敷过夜', note: '敏感肌必备，可找法代' },
          { name: '优色林修红霜', price: '$$', type: 'mid-range', keyIngredient: '胀果甘草+泛醇', usage: '每日2次，取适量涂抹于泛红区域', note: '德国药妆，针对红血丝设计' },
          { name: '芙丽芳丝保湿修护霜', price: '$$', type: 'drugstore', keyIngredient: '角鲨烷+烟酰胺', usage: '每日2-3次，取适量厚敷于泛红处', note: '日系无添加敏感肌首选，无香精酒精，性价比高' },
          { name: 'CeraVe适乐肤保湿霜', price: '$', type: 'drugstore', keyIngredient: '3种神经酰胺+MVE缓释技术', usage: '每日2-3次，取适量涂抹于泛红区域', note: '美国皮肤科医生推荐平价品牌，可厚敷' },
          { name: 'Minon氨基酸泡沫面膜', price: '$', type: 'drugstore', keyIngredient: '9种氨基酸', usage: '洁面后敷于泛红脸颊，每周2-3次', note: '日系敏感肌急救首选，快速补水镇静' },
        ],
        precautions: ['温和清洁', '避免极端温度', '必须就医确诊']
      },
      {
        type: 'medical',
        title: '处方药治疗（就医后）',
        duration: '遵医嘱',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: '壬二酸凝胶15%/20%', price: '$$', type: 'proxy', keyIngredient: '壬二酸', usage: '每日1-2次全脸涂抹，玫瑰痤疮首选', note: 'Azelaic Acid，可代购，性价比高' },
          { name: '溴莫尼定凝胶', price: '$$', type: 'medical', keyIngredient: '溴莫尼定', usage: '每日一次点涂于红斑处，可快速退红', note: '处方药，需医生开具' },
        ],
        precautions: ['必须就医确诊', '不可自行用药']
      }
    ],
    prevention: ['避免刺激因素', '物理防晒', '温和护肤'],
    whenToSeeDoctor: '疑似玫瑰痤疮必须就医'
  },
  {
    id: 'face-sensitive-tzone-acne',
    area: 'face',
    subArea: '全脸-T区',
    category: '敏感',
    subCategory: '敏感痘',
    cause: '屏障受损',
    title: 'T区油敏肌（外油内干）',
    emoji: '😣',
    description: 'T区出油但两颊敏感干燥的复杂肌肤状态。',
    causes: ['屏障受损', '水油失衡', '过度清洁', '功效产品叠加'],
    symptoms: ['T区油光但脱皮', '两颊敏感泛红', '用控油产品刺痛', '护肤困难'],
    solutions: [
      {
        type: 'product',
        title: '分区护理+修护',
        duration: '持续调理',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: '珂润保湿水（清爽型）+乳', price: '$$', type: 'mid-range', keyIngredient: '神经酰胺+蓝桉叶', usage: '先用水取硬币大小轻拍，再用1-2泵乳液', note: '日系敏感肌首选，分滋润型和清爽型' },
          { name: 'The Ordinary烟酰胺10%+锌', price: '$', type: 'essential', keyIngredient: '10%烟酰胺', usage: '只涂抹于T区控油，其他区域用B5精华', note: 'T区控油+两颊修护，分区使用' },
          { name: '理肤泉B5精华液', price: '$$', type: 'mid-range', keyIngredient: '10%泛醇', usage: '每日2次，取5-6滴涂抹于干燥敏感区域', note: '可全脸或局部，配合B5霜效果更好' },
        ],
        precautions: ['停用所有功效产品', '只用基础保湿', '分区护理']
      }
    ],
    prevention: ['不要过度清洁', '不要叠加功效产品', '温和护肤'],
    whenToSeeDoctor: '敏感持续加重'
  },

  // ==================== 色斑色素类（按类型+部位细分）====================
  {
    id: 'face-spot-cheek-melasma',
    area: 'face',
    subArea: '颧骨',
    category: '色斑',
    subCategory: '黄褐斑',
    cause: '激素变化',
    title: '颧骨黄褐斑（蝴蝶斑）',
    emoji: '🦋',
    description: '颧骨对称性分布的褐色斑片，与激素变化密切相关。',
    causes: ['雌激素变化', '紫外线', '遗传', '肝功能'],
    symptoms: ['对称性褐斑', '颧骨常见', '边界模糊', '夏季加重'],
    solutions: [
      {
        type: 'product',
        title: '淡斑美白组合',
        duration: '3-6个月见效',
        cost: '$$$',
        efficacy: 'high',
        products: [
          { name: '修丽可发光瓶', price: '$$$', type: 'luxury', keyIngredient: '3%传明酸+1%曲酸+5%烟酰胺', usage: '每日2次，取3-4滴全脸涂抹，重点按摩色斑处', note: '淡斑界天花板，适合顽固色斑' },
          { name: '优色林肽胺1000淡斑霜', price: '$$', type: 'mid-range', keyIngredient: '肽胺密多', usage: '每日2次，取适量点涂于色斑处', note: '德国拜耳研发，淡斑效果显著，可代购' },
          { name: 'Olay淡斑小白瓶', price: '$$', type: 'mid-range', keyIngredient: '5%烟酰胺+1%酰本胺', usage: '每日2次，取2-3滴涂抹于全脸或色斑处', note: '平价淡斑首选，效果经过验证' },
        ],
        precautions: ['激素稳定后效果更好', '必须严格防晒', '可能需要就医处方']
      },
      {
        type: 'medical',
        title: '医美+处方联合治疗',
        duration: '需医生指导',
        cost: '$$$',
        efficacy: 'high',
        products: [
          { name: '氢醌软膏4%', price: '$', type: 'medical', keyIngredient: '氢醌', usage: '遵医嘱，每晚一次点涂于色斑处', note: '淡斑金标准，但需医生处方，不宜长期使用' },
        ],
        precautions: ['氢醌需医生指导', '严格防晒']
      }
    ],
    prevention: ['严格防晒', '避免激素波动', '保持肝健康'],
    whenToSeeDoctor: '黄褐斑建议就医综合治疗'
  },
  {
    id: 'face-spot-nose-freckle',
    area: 'face',
    subArea: '鼻子',
    category: '色斑',
    subCategory: '雀斑/晒斑',
    cause: '黑色素沉着',
    title: '鼻部雀斑/晒斑',
    emoji: '☀️',
    description: '鼻子部位的点状色素沉着，与日晒和遗传有关。',
    causes: ['紫外线', '遗传', '黑色素聚集'],
    symptoms: ['点状褐色斑点', '鼻背常见', '夏季加深'],
    solutions: [
      {
        type: 'product',
        title: '美白淡斑组合',
        duration: '2-4个月',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: '科颜氏淡斑精华', price: '$$', type: 'mid-range', keyIngredient: '3%维C+水杨酸', usage: '每日早晚取3-4滴涂抹于全脸或色斑处', note: '早起使用，需避光保存' },
          { name: '修丽可CE精华', price: '$$$', type: 'luxury', keyIngredient: '15%左旋VC+VE', usage: '早间，取4-5滴涂抹于面部，重点按摩色斑处', note: '抗氧化+美白，早间必备' },
          { name: '乐敦CC精华', price: '$', type: 'proxy', keyIngredient: 'VC+VE', usage: '每晚4-5滴点涂于色斑处，轻轻按摩', note: '日本销量冠军，平价好用，日代购买' },
        ],
        precautions: ['必须配合防晒', 'VC建议避光保存']
      }
    ],
    prevention: ['每日防晒', '避免强光直射', '使用美白产品'],
    whenToSeeDoctor: '色斑突然变化或加深'
  },
  {
    id: 'face-spot-acne-mark',
    area: 'face',
    subArea: '全脸',
    category: '色斑',
    subCategory: '炎症后色素沉着',
    cause: '痘痘愈合',
    title: '痘印（红黑痘印）',
    emoji: '🟤',
    description: '痘痘愈合后留下的深色印记，包括红色和黑色痘印。',
    causes: ['痘痘炎症', '黑色素沉着', '挤压痘痘', '紫外线加深'],
    symptoms: ['红色/黑色印记', '主要在面部', '逐渐淡化', '可能持续数月'],
    solutions: [
      {
        type: 'product',
        title: '美白淡印组合（平价版）',
        duration: '2-4个月',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: 'The Ordinary烟酰胺10%+1%锌', price: '$', type: 'essential', keyIngredient: '10%烟酰胺', usage: '每日1-2次，取3-4滴涂抹于痘印处', note: '平价控油美白，性价比最高' },
          { name: '乐敦CC精华', price: '$', type: 'proxy', keyIngredient: 'VC+VE', usage: '每晚4-5滴点涂于痘印处', note: '平价VC代表，日代购买划算' },
          { name: '理肤泉B5修复霜', price: '$$', type: 'mid-range', keyIngredient: '5%泛醇+积雪草', usage: '每日2次，红色痘印可厚敷', note: '红色痘印首选，促进修复' },
        ],
        precautions: ['防晒防止加深', '不要挤压痘痘', '耐心等待淡化']
      },
      {
        type: 'product',
        title: '美白淡印组合（高端版）',
        duration: '1-3个月',
        cost: '$$$',
        efficacy: 'high',
        products: [
          { name: '修丽可CF精华', price: '$$$', type: 'luxury', keyIngredient: '10%左旋VC+阿魏酸', usage: '早间，取4-5滴涂抹于面部，重点按摩痘印处', note: 'VC天花板，淡印效果显著' },
          { name: 'La Mer浓缩修护精华', price: '$$$', type: 'luxury', keyIngredient: 'Miracle Broth', usage: '每日2次，取2-3滴点涂于痘印处', note: '修护力强，适合顽固痘印' },
        ],
        precautions: ['高端产品建议先试小样']
      }
    ],
    prevention: ['及时治疗痘痘', '不要挤压', '做好防晒'],
    whenToSeeDoctor: '痘印长期不消'
  },

  // ==================== 毛孔黑头类（按部位细分）====================
  {
    id: 'face-pore-nose-large',
    area: 'face',
    subArea: '鼻子',
    category: '毛孔',
    subCategory: '毛孔粗大',
    cause: '油脂撑大',
    title: '鼻部毛孔粗大',
    emoji: '🔍',
    description: '鼻子部位毛孔明显可见，油脂分泌旺盛的典型表现。',
    causes: ['油脂分泌旺盛', '毛孔堵塞', '皮肤老化', '不当挤压'],
    symptoms: ['毛孔呈圆形', '黑头白头', '出油多', '触感粗糙'],
    solutions: [
      {
        type: 'product',
        title: '控油收敛+深层清洁',
        duration: '持续护理',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: 'The Ordinary烟酰胺10%+锌', price: '$', type: 'essential', keyIngredient: '10%烟酰胺+1%锌', usage: '每日1-2次，取3-4滴只涂抹于T区/鼻子', note: '控油收敛，平价有效' },
          { name: '宝拉珍选2%水杨酸精华', price: '$$', type: 'mid-range', keyIngredient: '2%水杨酸', usage: '每周2-3次湿敷鼻子5分钟，疏通毛孔' },
          { name: '科颜氏白泥面膜', price: '$$', type: 'mid-range', keyIngredient: '亚马逊白泥', usage: '每周1-2次，厚涂鼻子10分钟洗净', note: '深层清洁毛孔，配合水杨酸效果更好' },
        ],
        precautions: ['不要用撕拉产品', '配合保湿', '防晒']
      },
      {
        type: 'product',
        title: '收敛紧致（高端版）',
        duration: '长期使用',
        cost: '$$$',
        efficacy: 'medium',
        products: [
          { name: 'SK-II神仙水', price: '$$$', type: 'luxury', keyIngredient: 'PITERA', usage: '每日早晚轻拍于鼻子，调节油脂收敛毛孔', note: '油皮毛孔粗大救星，日上/日代购买' },
          { name: 'Drunk Elephant A-Passioni视黄醇', price: '$$$', type: 'luxury', keyIngredient: '0.1%视黄醇', usage: '每晚一次，取豌豆大小涂抹全脸，紧致毛孔', note: '美国Clean Beauty代表，可美亚购买' },
        ],
        precautions: ['收敛需要耐心', '防晒配合']
      }
    ],
    prevention: ['控油', '定期清洁', '不要挤压'],
    whenToSeeDoctor: '毛孔问题严重'
  },
  {
    id: 'face-pore-cheek-sun',
    area: 'face',
    subArea: '脸颊',
    category: '毛孔',
    subCategory: '老化毛孔',
    cause: '光老化',
    title: '脸颊老化型毛孔（椭圆形）',
    emoji: '⭕',
    description: '脸颊部位因光老化导致毛孔变成椭圆形，皮肤松弛的信号。',
    causes: ['紫外线损伤', '胶原流失', '皮肤松弛', '自然老化'],
    symptoms: ['毛孔呈椭圆形', '下垂感', '法令纹附近明显', '法令纹加深'],
    solutions: [
      {
        type: 'product',
        title: '抗老紧致+防晒',
        duration: '长期坚持',
        cost: '$$$',
        efficacy: 'medium',
        products: [
          { name: '修丽可AGE面霜', price: '$$$', type: 'luxury', keyIngredient: '30%玻色因', usage: '每日2次，取樱桃大小涂抹全脸，配合提拉按摩', note: '业界最高浓度玻色因，抗老紧致首选' },
          { name: 'La Prairie鱼子酱精华', price: '$$$', type: 'luxury', keyIngredient: '鱼子酱提取物', usage: '每日2次，取2-3泵配合提拉按摩', note: '瑞士顶级抗老，可找欧洲代购' },
          { name: 'Olay超红瓶面霜', price: '$$', type: 'mid-range', keyIngredient: '信号肽', usage: '每日2次，配合按摩提拉' },
        ],
        precautions: ['防晒是根本', '需坚持使用']
      }
    ],
    prevention: ['严格防晒', '早期抗老', '使用抗氧化产品'],
    whenToSeeDoctor: '毛孔问题严重影响'
  },

  // ==================== 眼周问题类（细分问题）====================
  {
    id: 'face-eye-darkcircle-vascular',
    area: 'face',
    subArea: '眼周',
    category: '黑眼圈',
    subCategory: '血管型',
    cause: '血液循环不畅',
    title: '黑眼圈（血管型-青色）',
    emoji: '👁️',
    description: '眼下青紫色，由血液循环不畅导致，常见于熬夜人群。',
    causes: ['熬夜', '血液循环不畅', '用眼过度', '鼻炎'],
    symptoms: ['眼下青紫', '晨起明显', '疲劳感', '可能眼袋'],
    solutions: [
      {
        type: 'product',
        title: '咖啡因眼霜+按摩',
        duration: '4-8周见效',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: 'The Ordinary咖啡因眼精华5%+EGCG', price: '$', type: 'essential', keyIngredient: '5%咖啡因', usage: '每日早晚各一次，取1-2滴轻轻点涂眼周，轻轻按摩至吸收', note: '平价消肿淡化黑眼圈必买' },
          { name: 'Sukin无龄肌抗衰老焕活眼霜', price: '$', type: 'drugstore', keyIngredient: '玫瑰果油+维生素E+肽', usage: '每日早晚各一次，取绿豆大小轻柔点涂眼周', note: '澳洲有机平价品牌，用户反馈去黑眼圈效果好，滋润不油腻' },
          { name: '优时颜微笑眼霜', price: '$$', type: 'drugstore', keyIngredient: '六胜肽+类肉毒素', usage: '每日2次，取绿豆大小轻柔点涂眼周', note: '国产抗衰眼霜，六胜肽促进眼周微循环，淡化黑眼圈+紧致眼袋' },
          { name: '悦木之源咖啡因眼霜', price: '$$', type: 'mid-range', keyIngredient: '咖啡因+人参', usage: '每日早晚各一次，取米粒大小点涂眼周', note: '比TO更滋润，适合干皮' },
        ],
        precautions: ['保证睡眠是关键', '配合按摩效果更好', '治疗鼻炎']
      }
    ],
    prevention: ['充足睡眠', '避免睡前喝水', '用眼适度'],
    whenToSeeDoctor: '突然严重或怀疑鼻炎'
  },
  {
    id: 'face-eye-darkcircle-pigment',
    area: 'face',
    subArea: '眼周',
    category: '黑眼圈',
    subCategory: '色素型',
    cause: '黑色素沉着',
    title: '黑眼圈（色素型-棕色）',
    emoji: '🟤',
    description: '眼下棕褐色，由黑色素沉着导致，与遗传和日晒有关。',
    causes: ['黑色素沉着', '日晒', '遗传', '摩擦'],
    symptoms: ['眼下棕褐色', '边界不清', '全年存在', '可能加深'],
    solutions: [
      {
        type: 'product',
        title: '美白眼霜',
        duration: '8-12周见效',
        cost: '$$',
        efficacy: 'medium',
        products: [
          { name: 'Olay小白伞眼霜', price: '$$', type: 'mid-range', keyIngredient: '烟酰胺+泛醇', usage: '每日早晚各一次，取绿豆大小涂抹眼周' },
          { name: '优时颜淡纹精华眼霜', price: '$$', type: 'drugstore', keyIngredient: '视黄醇+玻色因', usage: '每晚一次，取少量点涂眼周淡化色素', note: '国产美白抗衰眼霜，视黄醇促代谢+玻色因紧致，改善色素型黑眼圈' },
          { name: '兰蔻发光眼霜', price: '$$$', type: 'luxury', keyIngredient: '小黑瓶核心成分', usage: '每日早晚各一次，取珍珠大小点涂眼周', note: '淡化黑眼圈效果显著，日上/法代' },
        ],
        precautions: ['防晒保护眼周', '避免摩擦眼周']
      }
    ],
    prevention: ['眼周防晒', '避免揉眼', '使用美白眼霜'],
    whenToSeeDoctor: '色素严重'
  },
  {
    id: 'face-eye-puffiness',
    area: 'face',
    subArea: '眼周',
    category: '眼袋',
    subCategory: '浮肿型',
    cause: '水分潴留',
    title: '眼袋/眼部浮肿',
    emoji: '😴',
    description: '眼下浮肿，与睡眠、饮食和淋巴循环有关。',
    causes: ['睡眠不足', '睡前喝水多', '盐分摄入高', '淋巴循环差'],
    symptoms: ['眼下浮肿', '晨起明显', '可能伴随黑眼圈', '疲劳感'],
    solutions: [
      {
        type: 'home-remedy',
        title: '冷敷+按摩（急救）',
        duration: '即时见效',
        cost: '$',
        efficacy: 'high',
        steps: ['用冰镇的眼罩或冷毛巾敷眼10分钟', '用无名指轻轻按摩眼周（从内眼角到外眼角）', '配合含咖啡因的眼霜效果更好'],
        precautions: ['冷敷时间不宜过长', '按摩要轻柔']
      },
      {
        type: 'product',
        title: '消肿眼霜（日常）',
        duration: '持续使用',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: 'The Ordinary咖啡因眼精华', price: '$', type: 'essential', keyIngredient: '5%咖啡因+EGCG', usage: '每日早晚各一次，取1-2滴点涂眼周', note: '平价消肿必买，配合冷藏使用效果更佳' },
          { name: '优时颜微笑眼霜', price: '$$', type: 'drugstore', keyIngredient: '六胜肽+类肉毒素', usage: '每日2次，取绿豆大小轻柔点涂眼周并按摩', note: '国产消肿紧致眼霜，六胜肽促进淋巴循环，紧致眼袋' },
        ],
        precautions: ['睡前少喝水', '垫高枕头睡觉']
      }
    ],
    prevention: ['睡前少喝水', '减少盐分', '垫高枕头睡觉'],
    whenToSeeDoctor: '眼袋严重或持续浮肿'
  },
  {
    id: 'face-eye-milia',
    area: 'face',
    subArea: '眼周',
    category: '脂肪粒',
    subCategory: '粟丘疹',
    cause: '角化异常',
    title: '眼部脂肪粒（粟丘疹）',
    emoji: '⚪',
    description: '眼周白色小颗粒，是皮脂腺开口处角化异常所致。',
    causes: ['角化异常', '护肤品过于油腻', '眼周微小伤口', '遗传'],
    symptoms: ['眼周白色小颗粒', '不易挤出', '长期存在'],
    solutions: [
      {
        type: 'product',
        title: '温和去角质+轻薄眼霜',
        duration: '需要耐心',
        cost: '$',
        efficacy: 'medium',
        products: [
          { name: '理肤泉B5修复霜', price: '$$', type: 'mid-range', keyIngredient: '5%泛醇', usage: '用B5霜厚敷脂肪粒处，可软化促进排出', note: '有些脂肪粒会慢慢消退' },
        ],
        precautions: ['不要用眼霜过于油腻', '不要自己挑']
      },
      {
        type: 'medical',
        title: '医美处理（顽固）',
        duration: '一次性',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: '针清处理', price: '$', type: 'medical', keyIngredient: '无', usage: '需去正规美容院或医院，用消毒针头挑出', note: '不要自己在家处理，易感染' },
        ],
        precautions: ['找专业人员处理', '做好消毒']
      }
    ],
    prevention: ['使用轻薄眼霜', '眼周定期清洁'],
    whenToSeeDoctor: '脂肪粒严重影响外观'
  },

  // ==================== 干燥缺水类（按部位+程度细分）====================
  {
    id: 'face-dry-tzone-flaking',
    area: 'face',
    subArea: 'T区',
    category: '干燥',
    subCategory: '脱皮',
    cause: '缺水缺油',
    title: 'T区干燥脱皮',
    emoji: '🦎',
    description: 'T区（额头+鼻子）干燥脱皮，是外油内干的典型表现。',
    causes: ['T区油脂但缺水', '不当护肤', '环境影响', '过度清洁'],
    symptoms: ['额头鼻子脱皮', '屏障受损', '紧绷', '可能泛红'],
    solutions: [
      {
        type: 'product',
        title: '分区保湿修护',
        duration: '1-2周见效',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: '珂润保湿水（滋润型）+乳', price: '$$', type: 'mid-range', keyIngredient: '神经酰胺+蓝桉叶', usage: '每日2次，先水后乳，轻拍至吸收', note: '日系敏感肌首选，T区用滋润型' },
          { name: '理肤泉B5精华液', price: '$$', type: 'mid-range', keyIngredient: '10%泛醇', usage: '每日2次，取5-6滴涂抹于干燥区域', note: '修复屏障，缓解脱皮' },
          { name: '凡士林经典修护晶冻', price: '$', type: 'essential', keyIngredient: '100%矿脂', usage: '晚间最后一步，取少量涂抹于脱皮处建立保护膜', note: '平价封层神器，但可能闷痘' },
        ],
        precautions: ['T区仍需控油', '不要用太油腻的面霜']
      }
    ],
    prevention: ['温和清洁', '分区护理', '做好保湿'],
    whenToSeeDoctor: '脱皮严重伴随红肿'
  },
  {
    id: 'face-dry-cheek-tight',
    area: 'face',
    subArea: '脸颊',
    category: '干燥',
    subCategory: '紧绷型',
    cause: '极度缺水',
    title: '脸颊极度干燥紧绷',
    emoji: '🌵',
    description: '两颊皮肤极度缺水，产生明显紧绷感，需要深层保湿。',
    causes: ['严重缺水', '屏障受损', '环境干燥', '不当护肤'],
    symptoms: ['脸颊紧绷', '洁面后明显', '可能刺痛', '缺乏光泽'],
    solutions: [
      {
        type: 'product',
        title: '深层保湿+屏障修护',
        duration: '1-2周见效',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: '珂润浸润保湿霜', price: '$$', type: 'mid-range', keyIngredient: '神经酰胺+蓝桉叶', usage: '每日早晚取适量涂抹于脸颊，严重时可厚敷过夜', note: '日系敏感肌保湿首选' },
          { name: '芙丽芳丝保湿修护面霜', price: '$$', type: 'drugstore', keyIngredient: '角鲨烷+烟酰胺', usage: '每日早晚取适量涂抹于脸颊，可厚敷过夜', note: '日系开架敏感肌首选，无香精酒精，性价比高' },
          { name: '肌研极润保湿面霜', price: '$', type: 'drugstore', keyIngredient: '4重透明质酸', usage: '每日2-3次，取适量涂抹于干燥脸颊', note: '日本平价玻尿酸保湿，珂莱讶/日代购买' },
          { name: '适乐肤C乳', price: '$', type: 'essential', keyIngredient: '3种神经酰胺+透明质酸', usage: '每日早晚各一次，取适量涂抹全脸', note: '平价屏障修护，含3种神经酰胺，美国平价药妆' },
          { name: '理肤泉B5修复霜', price: '$$', type: 'mid-range', keyIngredient: '5%泛醇+积雪草', usage: '每日2-3次，严重时可厚敷过夜', note: '屏障受损首选，可配合B5精华' },
          { name: 'HABA无添加润泽柔肤水（G露）', price: '$$', type: 'drugstore', keyIngredient: '玻尿酸+海盐', usage: '每日3-5层拍打法，充分补水', note: '日本无添加主义，孕妇敏感肌可用，日代购买' },
          { name: 'Minon氨基酸保湿乳液', price: '$$', type: 'drugstore', keyIngredient: '9种氨基酸+玻尿酸', usage: '每日2次，取2-3泵涂抹于脸颊', note: '日系敏感肌经典，质地清爽，日代购买' },
        ],
        precautions: ['不要去角质', '只用温和产品', '用加湿器']
      }
    ],
    prevention: ['避免过度清洁', '用加湿器', '选择温和产品'],
    whenToSeeDoctor: '干燥加重伴随红肿'
  },

  // ==================== 油脂分泌类（按部位细分）====================
  {
    id: 'face-oily-whole',
    area: 'face',
    subArea: '全脸',
    category: '油光',
    subCategory: '大油田',
    cause: '皮脂腺旺盛',
    title: '全脸油光（油性肌肤）',
    emoji: '🛢️',
    description: '全脸容易出油，皮肤泛着油光，毛孔粗大。',
    causes: ['皮脂腺分泌旺盛', '遗传', '激素水平', '饮食影响'],
    symptoms: ['全脸油光', '毛孔粗大', '易长痘', '不易有皱纹'],
    solutions: [
      {
        type: 'product',
        title: '控油清洁+收敛',
        duration: '持续使用',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: '理肤泉清痘净肤洁面', price: '$', type: 'essential', keyIngredient: '水杨酸+甘油', usage: '每日2次，每次取黄豆大小，加水揉搓后清洁面部30秒' },
          { name: 'The Ordinary烟酰胺10%+锌', price: '$', type: 'essential', keyIngredient: '10%烟酰胺+1%锌', usage: '每日1-2次，取3-4滴全脸涂抹控油' },
          { name: 'OXY10班赛凝胶', price: '$', type: 'drugstore', keyIngredient: '10%过氧化苯甲酰', usage: '点涂于红肿痘痘处，每晚一次' },
        ],
        precautions: ['不要过度清洁', '仍需保湿', '防晒']
      },
      {
        type: 'product',
        title: '控油天花板组合',
        duration: '长期使用',
        cost: '$$$',
        efficacy: 'high',
        products: [
          { name: 'SK-II神仙水', price: '$$$', type: 'luxury', keyIngredient: 'PITERA', usage: '每日早晚，取足量（约20滴）轻拍于全脸', note: '调节油脂分泌，油皮亲妈，日上/日代' },
          { name: 'La Roche-Posay Effaclar K+精华', price: '$$', type: 'mid-range', keyIngredient: '水杨酸+辛酰水杨酸', usage: '每日2次，取适量涂抹全脸或T区', note: '理肤泉油皮系列，可法代' },
        ],
        precautions: ['神仙水需坚持使用']
      }
    ],
    prevention: ['控油洁面', '清爽保湿', '定期清洁'],
    whenToSeeDoctor: '伴随严重痘痘'
  },
  {
    id: 'face-oily-shine-forehead',
    area: 'face',
    subArea: '额头',
    category: '油光',
    subCategory: 'T区油光',
    cause: '局部油脂旺盛',
    title: '额头油光发亮',
    emoji: '✨',
    description: '额头部位油脂分泌旺盛，导致油光发亮。',
    causes: ['额部皮脂腺分布', '刘海刺激', '激素影响'],
    symptoms: ['额头油光', '刘海容易油', '妆容易花'],
    solutions: [
      {
        type: 'product',
        title: '局部控油+吸油',
        duration: '即时/持续',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: 'The Ordinary烟酰胺10%+锌', price: '$', type: 'essential', keyIngredient: '10%烟酰胺+1%锌', usage: '每日1-2次，只涂抹于额头区域控油' },
          { name: '苏菲娜控油隔离（台版）', price: '$$', type: 'mid-range', keyIngredient: '控油成分', usage: '日间妆前或单独使用，取适量涂抹于额头', note: '控油隔离冠军，日上/台代购买' },
          { name: 'Innisfree控油散粉', price: '$', type: 'proxy', keyIngredient: '薄荷', usage: '随时用粉扑按压吸油', note: '平价控油，韩代购买' },
        ],
        precautions: ['不要用太厚重产品', '刘海扎起来']
      }
    ],
    prevention: ['控油产品', '刘海扎起', '随身吸油'],
    whenToSeeDoctor: '油光严重失控'
  },

  // ==================== 鼻子特殊问题====================
  {
    id: 'face-nose-rosacea',
    area: 'face',
    subArea: '鼻子',
    category: '敏感',
    subCategory: '酒糟鼻',
    cause: '血管扩张',
    title: '酒糟鼻（鼻部红斑）',
    emoji: '🍷',
    description: '鼻子部位持久性红斑和血管扩张，是玫瑰痤疮在鼻部的表现。',
    causes: ['血管扩张', '玫瑰痤疮', '紫外线', '辛辣食物'],
    symptoms: ['鼻部红斑', '血管扩张', '鼻子增大', '丘疹'],
    solutions: [
      {
        type: 'product',
        title: '舒缓修护（日常）',
        duration: '持续护理',
        cost: '$$',
        efficacy: 'medium',
        products: [
          { name: '优色林修红霜', price: '$$', type: 'mid-range', keyIngredient: '胀果甘草+泛醇', usage: '每日2-3次，取适量涂抹于鼻部泛红处', note: '德国药妆，专为红血丝设计' },
          { name: '理肤泉B5修复霜', price: '$$', type: 'mid-range', keyIngredient: '5%泛醇', usage: '每日2次，可厚敷', note: '修护舒缓' },
        ],
        precautions: ['避免辛辣食物', '防晒', '必须就医确诊']
      },
      {
        type: 'medical',
        title: '就医治疗',
        duration: '遵医嘱',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: '壬二酸凝胶20%', price: '$$', type: 'proxy', keyIngredient: '壬二酸', usage: '遵医嘱，每日1-2次点涂', note: '玫瑰痤疮首选，可找代购' },
        ],
        precautions: ['必须就医', '不可自行用药']
      }
    ],
    prevention: ['避免刺激因素', '不吃辛辣', '严格防晒'],
    whenToSeeDoctor: '疑似酒糟鼻必须就医'
  },
  {
    id: 'face-nose-hyperplasia',
    area: 'face',
    subArea: '鼻子',
    category: '增生',
    subCategory: '酒糟鼻增生期',
    cause: '组织增生',
    title: '鼻赘（严重酒糟鼻）',
    emoji: '🥔',
    description: '酒糟鼻晚期，鼻子变形增大，表面凹凸不平，必须就医。',
    causes: ['严重酒糟鼻', '长期血管扩张', '组织增生'],
    symptoms: ['鼻子增大', '表面凹凸', '变形', '严重影响外观'],
    solutions: [
      {
        type: 'medical',
        title: '必须就医治疗',
        duration: '需手术',
        cost: '$$$',
        efficacy: 'high',
        products: [
          { name: '激光磨削术', price: '$$$', type: 'luxury', keyIngredient: '激光', usage: '需专业皮肤科医生手术', note: '可改善外观，但需多次治疗' },
        ],
        precautions: ['绝对必须就医', '选择正规医院']
      }
    ],
    prevention: ['早期治疗酒糟鼻', '避免恶化'],
    whenToSeeDoctor: '必须立即就医'
  },

  // ==================== 嘴角问题====================
  {
    id: 'face-corner-dark',
    area: 'face',
    subArea: '嘴角',
    category: '暗沉',
    subCategory: '色素沉着',
    title: '嘴角暗沉/黑黑的',
    emoji: '🌑',
    description: '嘴角部位暗沉发黑，影响整体肤色。',
    causes: ['摩擦（舔嘴唇）', '防晒遗漏', '激素变化', '卸妆不彻底'],
    symptoms: ['嘴角发黑', '两侧对称', '不易消退'],
    solutions: [
      {
        type: 'product',
        title: '美白淡印',
        duration: '需要耐心',
        cost: '$',
        efficacy: 'medium',
        products: [
          { name: 'The Ordinary烟酰胺10%+锌', price: '$', type: 'essential', keyIngredient: '10%烟酰胺', usage: '每日2次，取少量点涂于嘴角暗沉处' },
          { name: 'Olay淡斑小白瓶', price: '$$', type: 'mid-range', keyIngredient: '5%烟酰胺+1%酰本胺', usage: '每日2次，取2-3滴点涂于暗沉处' },
        ],
        precautions: ['改掉舔嘴唇习惯', '嘴角也要涂防晒']
      }
    ],
    prevention: ['不要舔嘴唇', '嘴角也要防晒', '彻底卸妆'],
    whenToSeeDoctor: '突然出现或不对称'
  },

  // ==================== 全面部综合问题====================
  {
    id: 'face-dull-combination',
    area: 'face',
    subArea: '全脸',
    category: '暗沉',
    subCategory: '综合暗沉',
    cause: '氧化糖化',
    title: '全面部暗沉发黄',
    emoji: '🟡',
    description: '整体肤色暗沉、发黄、缺乏光泽，与氧化、糖化和角质堆积有关。',
    causes: ['氧化应激', '角质堆积', '熬夜', '糖化', '蓝光伤害'],
    symptoms: ['肤色暗沉', '发黄无光', '质感粗糙', '倦容感'],
    solutions: [
      {
        type: 'product',
        title: '焕肤提亮组合',
        duration: '2-4周见效',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: 'Olay光感小白瓶', price: '$$', type: 'mid-range', keyIngredient: '烟酰胺+抗坏血酸磷酸酯镁', usage: '每日早晚各一次，取2-3滴涂抹于全脸', note: '平价美白提亮首选' },
          { name: 'The Ordinary乳酸10%+透明质酸', price: '$', type: 'essential', keyIngredient: '10%乳酸', usage: '每晚3-4滴，避免眼周，去角质提亮', note: '去角质加速代谢，改善暗沉' },
        ],
        precautions: ['定期去角质', '保证睡眠', '抗氧化内服']
      },
      {
        type: 'product',
        title: '抗氧化抗糖组合（高端）',
        duration: '长期使用',
        cost: '$$$',
        efficacy: 'high',
        products: [
          { name: '修丽可CE精华', price: '$$$', type: 'luxury', keyIngredient: '15%左旋VC+VE', usage: '早间，取4-5滴涂抹全脸，抗氧化', note: '抗氧化黄金标准，早间必备' },
          { name: '醉象马鲁拉油', price: '$$$', type: 'luxury', keyIngredient: '马鲁拉油+VC', usage: '每日早晚各一次，取3-4滴涂抹面部', note: 'Clean Beauty代表，抗氧化养肤，可美亚' },
        ],
        precautions: ['内服抗糖也有帮助']
      }
    ],
    prevention: ['充足睡眠', '抗氧化饮食', '定期去角质'],
    whenToSeeDoctor: '突然严重暗沉'
  },
];

// ========== 所有皮肤问题汇总 ==========
export const skinProblems: SkinProblem[] = [
  ...faceProblems,
  // ==================== 头皮问题 - 细化分类 ====================
  {
    id: 'scalp-dermatitis-seborrheic',
    area: 'scalp',
    category: '皮炎',
    subCategory: '脂溢性皮炎',
    title: '脂溢性皮炎（Seborrheic Dermatitis）',
    emoji: '🔴',
    description: '头皮红斑、油腻、脱屑，常伴有明显瘙痒，与马拉色菌感染密切相关。',
    causes: ['马拉色菌过度繁殖', '皮脂分泌旺盛', '免疫因素', '遗传倾向'],
    symptoms: ['头皮红斑', '油腻性鳞屑', '黄白色片状脱屑', '瘙痒明显', '可能蔓延至额头/耳后'],
    solutions: [
      {
        type: 'product',
        title: '抗真菌治疗（金标准）',
        duration: '2-4周见效，需长期维持',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: '康王酮康唑洗剂2%', price: '$', type: 'essential', keyIngredient: '酮康唑2%', usage: '每周2-3次，取5-10ml涂抹于头皮，按摩3-5分钟后冲洗，症状控制后每周1次维持', skinType: '油性头皮', combination: '可与丝蕴洗发水交替使用', note: '药用洗发水，不可每天用' },
          { name: 'Nizoral仁山利舒', price: '$$', type: 'proxy', keyIngredient: '1%酮康唑', usage: '每周2次，与酮康唑交替用', skinType: '所有头皮', combination: '症状重时先用酮康唑，再用仁山利舒维持', note: '美国版，长庚有售' },
          { name: '露得清T/Sal洗发水', price: '$', type: 'drugstore', keyIngredient: '水杨酸3%', usage: '每日可用，深层清洁头皮', skinType: '油性头皮', combination: '配合酮康唑使用效果更好', note: '温和去角质' },
        ],
        precautions: ['不要抓挠', '用温水洗头', '避免刺激性产品'],
        homeCare: ['用宽齿梳轻柔梳头', '减少压力', '保持头皮清洁干燥']
      },
      {
        type: 'alternative',
        title: '茶树油头皮护理（辅助）',
        duration: '持续使用',
        cost: '$',
        efficacy: 'medium',
        steps: ['在洗发水中加入3-5滴茶树精油', '按摩头皮5分钟后冲洗', '或用茶树油头皮精华液直接涂抹'],
        precautions: ['需稀释后使用', '可能引起过敏']
      }
    ],
    prevention: ['减少高糖高脂饮食', '规律作息减压', '选择温和洗发水', '避免频繁烫染'],
    whenToSeeDoctor: '症状严重、渗液或蔓延至面部'
  },
  {
    id: 'scalp-dermatitis-contact',
    area: 'scalp',
    category: '皮炎',
    subCategory: '接触性皮炎',
    title: '接触性皮炎（过敏/刺激）',
    emoji: '🟠',
    description: '因染发、烫发产品或洗发水成分引起的头皮过敏反应。',
    causes: ['染发剂成分（对苯二胺）', '烫发药水', '洗发水表面活性剂', '护发素香精'],
    symptoms: ['头皮红肿', '灼热感', '瘙痒', '水疱', '渗出'],
    solutions: [
      {
        type: 'product',
        title: '抗炎舒缓护理',
        duration: '症状消失后继续1周',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: '理肤泉B5精华', price: '$$', type: 'mid-range', keyIngredient: '5%泛醇', usage: '头皮红肿处涂抹，每日2次', skinType: '敏感头皮', note: '修复皮肤屏障，法国药妆' },
          { name: '雅漾活泉水喷雾', price: '$', type: 'mid-range', keyIngredient: '活泉水', usage: '清洁头皮后喷洒，有镇静作用', skinType: '所有头皮', note: '随身携带可即时舒缓，法国药妆' },
          { name: 'CeraVe婴儿洗发水', price: '$', type: 'essential', keyIngredient: '无香精配方', usage: '替换现有洗发水，温和清洁', skinType: '敏感头皮', note: '无泪配方，极度温和，美国平价药妆' },
          { name: 'Selsun Gold二硫化硒洗发水', price: '$', type: 'drugstore', keyIngredient: '2.5%二硫化硒', usage: '每周2-3次，按摩头皮3-5分钟后冲洗', skinType: '所有头皮', note: '澳洲经典去屑，适合头皮炎症后护理' },
          { name: '露得清T/Sal洗发水', price: '$', type: 'drugstore', keyIngredient: '水杨酸3%', usage: '每日可用，深层清洁头皮', skinType: '油性头皮', note: '美国平价，水杨酸温和去角质' },
        ],
        precautions: ['立即停用致敏产品', '不要抓挠', '严重时需就医'],
        homeCare: ['冷敷镇静', '避免热风吹头', '暂时不染烫']
      }
    ],
    prevention: ['染发前做皮肤测试', '选择无氨染发剂', '避免频繁更换洗发水'],
    whenToSeeDoctor: '出现水疱、渗液或全身过敏反应'
  },
  {
    id: 'scalp-dermatitis-atopic',
    area: 'scalp',
    category: '皮炎',
    subCategory: '特应性皮炎',
    title: '特应性皮炎（头皮型）',
    emoji: '🟣',
    description: '慢性复发性炎症性皮肤病，头皮表现为干燥、瘙痒、脱屑。',
    causes: ['遗传过敏体质', '皮肤屏障功能障碍', '免疫异常', '环境因素'],
    symptoms: ['头皮干燥脱屑', '剧烈瘙痒', '皮肤增厚（苔藓化）', '反复发作'],
    solutions: [
      {
        type: 'medical',
        title: '阶梯治疗方案',
        duration: '长期管理',
        cost: '$$$',
        efficacy: 'high',
        products: [
          { name: '舒必利溶液（处方）', price: '$$', type: 'medical', keyIngredient: '糖皮质激素', usage: '急性期使用，每日1-2次，症状控制后减量', skinType: '严重者', combination: '配合润肤剂使用', note: '必须医生处方，不宜长期使用' },
          { name: '他克莫司软膏0.1%（非激素）', price: '$$$', type: 'medical', keyIngredient: '他克莫司', usage: '每日2次薄涂，可长期使用', skinType: '慢性期维持', combination: '与激素药膏交替', note: '进口药，需医生处方' },
          { name: '理肤泉ICAPLAST LAIT', price: '$$', type: 'mid-range', keyIngredient: '铜锌+烟酰胺', usage: '清洁头皮后使用，每日2次', skinType: '干燥头皮', combination: '配合药物治疗', note: '法国药妆，专为特应性皮炎设计' },
        ],
        precautions: ['避免热水洗头', '减少精神压力', '注意环境湿度'],
        homeCare: ['用加湿器', '穿透气棉质枕套', '避免已知过敏原']
      }
    ],
    prevention: ['保持头皮湿润', '避免过度清洁', '选择无香产品', '管理压力'],
    whenToSeeDoctor: '症状严重影响生活或出现感染'
  },
  {
    id: 'scalp-psoriasis',
    area: 'scalp',
    category: '皮炎',
    subCategory: '银屑病',
    title: '头皮银屑病（牛皮癣）',
    emoji: '⚪',
    description: '自身免疫性疾病，头皮出现厚层银白色鳞屑，边界清楚。',
    causes: ['免疫系统异常', '遗传因素', '环境触发（感染/压力）'],
    symptoms: ['银白色厚鳞屑', '头皮红斑', '束状发（头发成束）', '瘙痒', '可延伸至发际线'],
    solutions: [
      {
        type: 'medical',
        title: '系统治疗（需皮肤科）',
        duration: '长期管理',
        cost: '$$$',
        efficacy: 'high',
        products: [
          { name: '达力士卡泊三醇搽剂', price: '$$', type: 'medical', keyIngredient: '卡泊三醇', usage: '每日2次涂抹于患处', skinType: '所有', combination: '与激素联合使用效果更好', note: '维生素D衍生物，一线外用药' },
          { name: '适今可吡硫翁锌', price: '$', type: 'medical', keyIngredient: '吡硫翁锌', usage: '喷于患处，每日2-3次', skinType: '所有', note: '可长期使用' },
          { name: 'DERCOS去屑洗发水', price: '$$', type: 'mid-range', keyIngredient: '二硫化硒+维生素E', usage: '每周2-3次，配合药物治疗', skinType: '所有', note: '薇姿专业线，可辅助治疗' },
        ],
        precautions: ['避免抓挠', '温和清洁', '定期复诊'],
        homeCare: ['用温水洗头', '用柔软毛巾轻拍干', '避免外伤（Koebner现象）']
      }
    ],
    prevention: ['减少链球菌感染风险', '管理压力', '保持皮肤湿润'],
    whenToSeeDoctor: '出现症状即需就医确诊'
  },
  {
    id: 'scalp-dandruff-oily',
    area: 'scalp',
    category: '头屑',
    subCategory: '油性头屑',
    title: '油性头屑/马拉色菌',
    emoji: '❄️',
    description: '头皮屑是头皮角质层过快脱落形成的白色或灰色鳞屑。',
    causes: ['马拉色菌过度繁殖', '头皮油腻', '清洁不当'],
    symptoms: ['头皮可见白色鳞屑', '肩部可见头屑', '头皮油腻', '头皮瘙痒'],
    solutions: [
      {
        type: 'product',
        title: '去屑洗发水',
        duration: '持续使用',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: '康王酮康唑洗剂', price: '$', type: 'essential', keyIngredient: '酮康唑', usage: '每周2-3次，取5-10ml涂抹于湿发上，按摩头皮3-5分钟后冲洗', skinType: '油性头皮', combination: '与日常洗发水交替使用', note: '药用去屑，必须交替使用' },
          { name: 'selsun二硫化硒去屑洗发水', price: '$', type: 'essential', keyIngredient: '2.5%二硫化硒', usage: '每周2次，取适量涂抹于头皮，按摩5分钟后冲洗', skinType: '所有头皮', note: '效果强，不宜每天用，用后要冲洗干净' },
          { name: '海飞丝去屑洗发水', price: '$', type: 'drugstore', keyIngredient: '吡硫翁锌', usage: '日常使用，配合酮康唑交替', skinType: '所有头皮', combination: '日常用，一周用1-2次酮康唑', note: '日常维护' },
        ],
        precautions: ['药用洗发水交替使用', '症状改善后减少频率'],
        homeCare: ['每周洗头3-4次', '用温水', '避免护发素接触头皮']
      }
    ],
    prevention: ['使用去屑洗发水', '水温不宜过热', '保持头皮清洁'],
    whenToSeeDoctor: '头屑严重伴红肿'
  },
  {
    id: 'scalp-dandruff-dry',
    area: 'scalp',
    category: '头屑',
    subCategory: '干性头屑',
    title: '干性头屑/雪花头屑',
    emoji: '❅',
    description: '干燥头皮产生的细小白色鳞屑。',
    causes: ['头皮干燥', '频繁烫染', '环境影响'],
    symptoms: ['细小白色鳞屑', '头皮干燥紧绷', '肩部像下雪'],
    solutions: [
      {
        type: 'product',
        title: '保湿去屑',
        duration: '持续使用',
        cost: '$',
        efficacy: 'medium',
        products: [
          { name: '施华蔻羊绒脂洗发水', price: '$$', type: 'mid-range', keyIngredient: '羊绒脂精华', usage: '日常使用，滋润头皮', skinType: '干性头皮', combination: '配合护发素使用', note: '温和保湿' },
          { name: '卡诗滋养润护洗发水', price: '$$$', type: 'luxury', keyIngredient: '菁纯神仙精油', usage: '每周2-3次，深层滋养', skinType: '干性/受损头皮', combination: '配合卡诗发膜效果更好', note: '顶级沙龙线，法代可购' },
        ],
        precautions: ['不要用太强去屑产品', '用温和洗发水'],
        homeCare: ['使用加湿器', '减少吹风机使用', '避免高温造型']
      }
    ],
    prevention: ['用温和洗发水', '减少烫染', '头皮保湿'],
    whenToSeeDoctor: '头屑严重影响'
  },
  {
    id: 'scalp-hairloss-male',
    area: 'scalp',
    category: '脱发',
    subCategory: '雄激素性脱发',
    title: '男性型脱发（雄脱）',
    emoji: '🍃',
    description: '男性最常见的脱发类型，表现为发际线后移和头顶稀疏。',
    causes: ['遗传', '二氢睾酮(DHT)', '激素水平'],
    symptoms: ['发际线M型后移', '头顶变稀', '毛囊萎缩'],
    solutions: [
      {
        type: 'product',
        title: '米诺地尔治疗',
        duration: '3-6个月见效',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: '落健米诺地尔5%溶液', price: '$$', type: 'essential', keyIngredient: '5%米诺地尔', usage: '每日2次，每次1ml喷于头皮脱发区域，轻轻按摩至吸收', skinType: '所有', combination: '可与非那雄胺联合使用', note: 'FDA认证，需持续使用，停用会复脱，有狂脱期是正常' },
          { name: '蔓迪米诺地尔酊5%', price: '$', type: 'drugstore', keyIngredient: '5%米诺地尔', usage: '每日2次，每次1ml涂抹于患处', skinType: '所有', note: '国产平价替代' },
          { name: 'Rogaine foam泡沫剂', price: '$$$', type: 'proxy', keyIngredient: '5%米诺地尔泡沫', usage: '每日1次，每次半盖，涂抹于头皮', skinType: '所有', note: '不含丙二醇，更温和，可美亚购买' },
        ],
        precautions: ['需持续使用', '狂脱期是正常反应', '心脏病/高血压患者慎用'],
        homeCare: ['避免紧绷发型', '减少熬夜', '补充蛋白质和铁']
      },
      {
        type: 'medical',
        title: '口服药物治疗（需就医）',
        duration: '长期',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: '非那雄胺片', price: '$$', type: 'medical', keyIngredient: '非那雄胺1mg', usage: '每日一片，需医生处方', skinType: '男性', combination: '与米诺地尔联合使用效果最佳', note: '男性专用，副作用可能影响性功能，育龄期禁用，停药后3个月可备孕' },
        ],
        precautions: ['必须医生处方', '定期检查', '女性禁用']
      }
    ],
    prevention: ['早发现早治疗', '保持头皮健康', '避免熬夜'],
    whenToSeeDoctor: '出现明显脱发时'
  },
  {
    id: 'scalp-hairloss-female',
    area: 'scalp',
    category: '脱发',
    subCategory: '女性弥漫性脱发',
    title: '女性型脱发（产后/压力大）',
    emoji: '🌸',
    description: '女性常见的弥漫性脱发，与激素变化、压力大、产后有关。',
    causes: ['激素变化', '压力大', '产后', '营养不良'],
    symptoms: ['全头稀疏', '发缝变宽', '洗头掉发多'],
    solutions: [
      {
        type: 'product',
        title: '米诺地尔治疗',
        duration: '3-6个月见效',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: '落健米诺地尔2%溶液', price: '$$', type: 'essential', keyIngredient: '2%米诺地尔', usage: '每日2次，每次1ml涂抹于头皮', skinType: '女性', combination: '配合头皮精华素使用', note: '女性用2%浓度即可，怀孕/哺乳期停用' },
          { name: '霸王防脱洗发水', price: '$', type: 'drugstore', keyIngredient: '中药草本', usage: '每日使用，按摩头皮3-5分钟后冲洗', skinType: '所有', note: '辅助调理，含侧柏叶/何首乌' },
        ],
        precautions: ['需持续使用', '查明原因', '产后脱发一般在6-12个月恢复'],
        homeCare: ['减压', '保证睡眠', '补充复合维生素']
      }
    ],
    prevention: ['减压', '补充营养', '保证睡眠', '温和护理'],
    whenToSeeDoctor: '突然大量脱发或持续超过一年'
  },
  {
    id: 'scalp-oily',
    area: 'scalp',
    category: '油腻',
    subCategory: '头皮油腻',
    title: '头皮油腻/扁塌',
    emoji: '💧',
    description: '头皮皮脂腺分泌旺盛导致头发油腻扁塌。',
    causes: ['皮脂腺分泌过旺', '洗头频率不当', '饮食油腻'],
    symptoms: ['头发一天内油腻', '扁塌无造型', '头皮油腻'],
    solutions: [
      {
        type: 'product',
        title: '控油洗发水',
        duration: '持续使用',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: '海飞丝深层清洁洗发水', price: '$', type: 'essential', keyIngredient: '薄荷清凉配方', usage: '根据需要使用，取适量按摩头皮后冲洗', skinType: '油性头皮', note: '深层清洁但不宜每天用，一周2-3次即可' },
          { name: '露得清深层清洁洗发水', price: '$', type: 'drugstore', keyIngredient: '水杨酸', usage: '每周2次深层清洁', skinType: '油性头皮', combination: '与其他洗发水交替', note: '含水杨酸，帮助疏通毛孔' },
        ],
        precautions: ['不宜每天用控油洗发水', '配合护发素'],
        homeCare: ['清淡饮食', '减少高糖高脂摄入', '规律作息']
      }
    ],
    prevention: ['控油洗发水', '清淡饮食', '规律作息'],
    whenToSeeDoctor: '突然严重出油'
  },
  {
    id: 'scalp-sensitive-itchy',
    area: 'scalp',
    category: '敏感',
    subCategory: '头皮敏感瘙痒',
    title: '头皮敏感/不明原因瘙痒',
    emoji: '🌡️',
    description: '头皮对外界刺激敏感，表现为瘙痒、紧绷、刺痛。',
    causes: ['头皮屏障受损', '精神压力', '换季', '不当护理'],
    symptoms: ['头皮瘙痒', '紧绷感', '刺痛', '干燥脱屑'],
    solutions: [
      {
        type: 'product',
        title: '舒缓修护护理',
        duration: '持续使用',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: '馥绿德雅舒缓精华液', price: '$$$', type: 'luxury', keyIngredient: '植物精华+泛醇', usage: '每日1-2次，直接涂抹于头皮并按摩', skinType: '敏感头皮', combination: '配合温和洗发水', note: '即时舒缓，可急救，法代可购' },
          { name: '康如燕麦身体舒缓洗发水', price: '$$', type: 'mid-range', keyIngredient: '燕麦提取物', usage: '日常使用，温和清洁', skinType: '敏感头皮', note: '法国药妆，极度温和，孕妇可用' },
        ],
        precautions: ['用温水', '避免指甲抓挠', '减少造型产品'],
        homeCare: ['用指腹轻轻按摩', '选择无硅油无香精洗发水', '减少洗头频率']
      }
    ],
    prevention: ['温和护理', '避免刺激性产品', '减少压力'],
    whenToSeeDoctor: '持续不缓解或出现红斑'
  },

  // ==================== 头发问题 - 新增毛发修复分类 ====================
  {
    id: 'hair-damaged',
    area: 'hair',
    category: '受损修复',
    subCategory: '毛鳞片受损',
    title: '受损发质修复（染烫/热损伤）',
    emoji: '💔',
    description: '头发因染烫、紫外线、热造型导致的损伤，发丝毛躁、分叉、失去光泽。',
    causes: ['频繁染烫', '高温造型', '紫外线', '化学处理'],
    symptoms: ['毛躁干枯', '分叉断裂', '失去光泽', '打结难梳理'],
    solutions: [
      {
        type: 'product',
        title: '深层修护组合',
        duration: '持续护理',
        cost: '$$$',
        efficacy: 'high',
        products: [
          { name: 'Olaplex 3号洗前发膜', price: '$$$', type: 'luxury', keyIngredient: '二硫键修复专利', usage: '干发时涂抹，停留至少10分钟，然后正常洗发', skinType: '受损发质', combination: '配合Olaplex 4/5号洗发水效果翻倍', note: '美发界革命性产品，强烈推荐，可美亚或找代购', dosage: '中长发每次用一泵' },
          { name: '卡诗黑钻鱼子酱发膜', price: '$$$', type: 'luxury', keyIngredient: '鱼子酱精华', usage: '洗发后涂抹，停留3-5分钟后冲洗', skinType: '干性受损', combination: '每周1-2次，配合护发精油', note: '顶级沙龙护理，法代购买' },
          { name: '潘婷三分钟奇迹发膜', price: '$', type: 'essential', keyIngredient: '维他命B3+氨基酸', usage: '洗发后涂抹，停留3分钟后冲洗', skinType: '所有发质', note: '平价替代，效果不错' },
        ],
        precautions: ['发膜不要接触头皮', '从发尾开始涂抹'],
        homeCare: ['用宽齿梳梳头', '减少吹风机使用', '使用丝绸枕套']
      },
      {
        type: 'alternative',
        title: '椰子油深层护理（经济实惠）',
        duration: '每周1-2次',
        cost: '$',
        efficacy: 'medium',
        steps: ['将椰子油（固体状）抹在手心搓开', '从发尾开始涂抹，重点关注受损部位', '用浴帽包裹，停留1小时或过夜', '用洗发水洗净（可能需要洗2次）'],
        precautions: ['不要涂到头皮', '用量不宜过多', '油性头皮慎用']
      }
    ],
    prevention: ['减少染烫频率', '使用隔热喷雾', '吹风机距头发15cm以上'],
    whenToSeeDoctor: '突然大量断发'
  },
  {
    id: 'hair-splitends',
    area: 'hair',
    category: '分叉断裂',
    subCategory: '机械损伤',
    title: '分叉/断发修复',
    emoji: '✂️',
    description: '发尾分叉和断裂，多因护理不当和缺乏营养。',
    causes: ['缺乏修剪', '摩擦损伤', '营养不良', '频繁造型'],
    symptoms: ['发尾分叉', '容易断裂', '头发变薄'],
    solutions: [
      {
        type: 'product',
        title: '日常护理+定期修剪',
        duration: '持续护理+每2月修剪',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: '摩洛哥坚果油护发精油', price: '$$', type: 'mid-range', keyIngredient: '摩洛哥坚果油', usage: '半干时取2-3滴涂抹于发尾', skinType: '干性/中性发质', combination: '配合发膜使用', note: '柔顺有光泽，可美亚购买' },
          { name: '爱茉莉护发精油', price: '$', type: 'essential', keyIngredient: '七种精油', usage: '吹干前后各一次，取适量于掌心搓开', skinType: '所有发质', note: '平价大碗，韩代购买' },
        ],
        precautions: ['从发尾开始涂抹', '不要涂到发根'],
        homeCare: ['每6-8周修剪一次发尾', '用丝缎枕套', '避免扎太紧的头发']
      }
    ],
    prevention: ['定期修剪发尾', '使用护发精油', '避免高温'],
    whenToSeeDoctor: '突然出现大量断发'
  },
  {
    id: 'hair-colorprotect',
    area: 'hair',
    category: '护色锁色',
    subCategory: '染后护理',
    title: '染发后护色锁色',
    emoji: '🎨',
    description: '延长染发后的颜色保持时间，防止褪色。',
    causes: ['紫外线', '频繁洗头', '高温造型', '水质影响'],
    symptoms: ['颜色变暗', '变黄/变橙', '失去光泽'],
    solutions: [
      {
        type: 'product',
        title: '专用护色洗护',
        duration: '持续使用',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: 'Olaplex 4号染色洗发水', price: '$$', type: 'luxury', keyIngredient: '专利二硫键修复', usage: '替代普通洗发水，每次取适量清洁', skinType: '染后发质', combination: '配合Olaplex 5号护发素和3号发膜效果最佳', note: '锁色同时修护，可美亚' },
          { name: '卡诗色研洗发水', price: '$$', type: 'mid-range', keyIngredient: '离子聚合技术', usage: '日常使用，保护色素', skinType: '染后发质', note: '法国高端线，法代' },
          { name: 'TSUBAKI丝蓓绮洗发水', price: '$', type: 'essential', keyIngredient: '山茶花精华', usage: '日常使用，滋养修护', skinType: '所有发质', note: '日系开架好物，日代' },
        ],
        precautions: ['用凉水洗头', '减少洗头频率', '使用隔热喷雾'],
        homeCare: ['用冷水冲洗', '戴帽子防晒', '泳池水后及时清洗']
      }
    ],
    prevention: ['用专用护色洗发水', '避免高温', '注意防晒'],
    whenToSeeDoctor: '出现过敏或头发断裂'
  },
  {
    id: 'hair-frizzy',
    area: 'hair',
    category: '毛躁干枯',
    subCategory: '毛躁蓬松',
    title: '毛躁/干枯/静电',
    emoji: '⚡',
    description: '头发毛躁干枯，容易蓬乱和产生静电。',
    causes: ['干燥缺水', '静电', '损伤', '季节变化'],
    symptoms: ['毛躁', '蓬乱', '静电', '失去光泽'],
    solutions: [
      {
        type: 'product',
        title: '深层滋养柔顺',
        duration: '持续护理',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: 'Living Proof柔顺喷雾', price: '$$$', type: 'luxury', keyIngredient: 'OFPMA专利因子', usage: '半干时喷于全头，再吹干', skinType: '毛躁发质', combination: '配合同系列洗发水效果更好', note: '好莱坞明星同款，可美亚', dosage: '中长发每次8-10泵' },
          { name: 'Moroccanoil摩洛哥护发精油', price: '$$', type: 'mid-range', keyIngredient: '摩洛哥坚果油', usage: '干湿发皆可使用，取适量于掌心后涂抹', skinType: '干性/毛躁发质', combination: '配合发膜使用', note: '经典产品，美亚可购', dosage: '中长发2-3泵即可' },
        ],
        precautions: ['从头发中段开始涂', '不要涂到发根'],
        homeCare: ['用丝绸枕套', '用加湿器', '减少干燥环境']
      }
    ],
    prevention: ['使用护发精油', '保持头发水分', '避免频繁洗头'],
    whenToSeeDoctor: '严重干燥或断裂'
  },

  // ==================== 疤痕问题 - 按身体部位分类 ====================
  // 身体疤痕（躯干/四肢）
  {
    id: 'body-scar-hypertrophic',
    area: 'body',
    category: '疤痕',
    subCategory: '增生性疤痕',
    title: '增生性疤痕（身体）',
    emoji: '🔺',
    description: '伤口愈合过程中胶原纤维过度增生，形成凸起于皮肤表面的疤痕，常见于前胸/后背/四肢。',
    causes: ['伤口感染', '伤口张力大', '个人体质', '频繁刺激'],
    symptoms: ['凸起于皮肤', '红色/粉红色', '质地较硬', '可能瘙痒疼痛', '不会超出伤口范围'],
    solutions: [
      {
        type: 'home-remedy',
        title: '家庭护理（辅助）',
        duration: '持续',
        cost: '$',
        efficacy: 'low',
        steps: ['用维生素E胶囊刺破后涂抹疤痕处', '每日按摩5-10分钟促进吸收', '保持疤痕部位滋润'],
        homeCare: ['避免疤痕部位紫外线照射', '穿宽松衣物减少摩擦', '不要抓挠']
      },
      {
        type: 'product',
        title: '硅凝胶治疗（金标准）',
        duration: '3-6个月见效，需持续6-12个月',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: '完美芦荟胶', price: '$', type: 'drugstore', keyIngredient: '芦荟', usage: '每日多次涂抹，保持疤痕滋润', skinType: '所有肤质', note: '平价基础护理，消炎滋润' },
          { name: '康瑞保祛疤膏', price: '$$', type: 'mid-range', keyIngredient: '洋葱提取物', usage: '每日2-3次，按摩至吸收', skinType: '所有肤质', combination: '配合疤痕贴使用', note: '国产经典祛疤产品，价格实惠' },
          { name: '芭克硅凝胶', price: '$$$', type: 'luxury', keyIngredient: '硅凝胶', usage: '伤口愈合后使用，每日2次，取少量涂抹于疤痕处，轻轻按摩30秒至完全干燥', skinType: '所有肤质', combination: '配合疤痕贴使用效果更好', note: '全球销量第一，可海淘', dosage: '薄薄一层即可' },
        ],
        precautions: ['伤口愈合后才用', '需长期坚持', '避免摩擦']
      },
      {
        type: 'medical',
        title: '注射治疗（顽固疤痕）',
        duration: '每月一次，共数次',
        cost: '$$$',
        efficacy: 'high',
        products: [
          { name: '曲安奈德疤痕内注射', price: '$$', type: 'medical', keyIngredient: '曲安奈德', usage: '医生注射入疤痕内', skinType: '所有', note: '激素类，可软化疤痕，需多次治疗' },
        ],
        precautions: ['必须正规医院治疗', '可能出现色素变化', '凹陷风险']
      }
    ],
    prevention: ['伤口及时处理', '避免张力部位', '早期使用疤痕贴'],
    whenToSeeDoctor: '疤痕持续增大或影响功能'
  },
  {
    id: 'scar-keloid',
    area: 'body',
    category: '疤痕',
    subCategory: '增生性疤痕',
    title: '瘢痕疙瘩（身体）',
    emoji: '🔴',
    description: '良性肿瘤样疤痕，会超出原始伤口范围持续生长，有复发倾向。常见于前胸、肩背、耳垂等部位。',
    causes: ['遗传倾向', '深色人种更常见', '伤口感染', '张力大', '频繁摩擦'],
    symptoms: ['超出伤口范围生长', '红色/深褐色', '持续增大', '瘙痒疼痛', '质地坚硬'],
    solutions: [
      {
        type: 'home-remedy',
        title: '家庭护理（辅助缓解）',
        duration: '持续进行',
        cost: '$',
        efficacy: 'low',
        steps: ['用茶树精油稀释后点涂（需配合载体油）', '每日轻轻按摩疤痕边缘', '保持疤痕部位清洁干燥'],
        homeCare: ['穿宽松衣物减少摩擦', '避免疤痕部位紫外线直射', '不要抓挠或刺激疤痕', '使用温和沐浴产品'],
        note: '家庭护理仅能缓解瘙痒，无法根治'
      },
      {
        type: 'product',
        title: '平价产品（控制症状）',
        duration: '长期使用',
        cost: '$',
        efficacy: 'low',
        products: [
          { name: '完美芦荟胶', price: '$', type: 'drugstore', keyIngredient: '芦荟', usage: '每日多次涂抹，保湿止痒', skinType: '所有肤质', note: '基础保湿，缓解瘙痒，便宜大碗' },
          { name: '维生素E乳', price: '$', type: 'drugstore', keyIngredient: '维生素E', usage: '每日2次按摩涂抹疤痕', skinType: '所有肤质', note: '辅助保湿滋润' },
        ],
        precautions: ['平价产品效果有限', '瘢痕疙瘩必须就医']
      },
      {
        type: 'medical',
        title: '综合治疗方案（必须就医）',
        duration: '长期管理',
        cost: '$$$',
        efficacy: 'medium',
        products: [
          { name: '手术切除+术后放疗', price: '$$$', type: 'medical', keyIngredient: '综合治疗', usage: '手术切除后配合浅层X光放疗预防复发', skinType: '所有', note: '单纯手术复发率>50%，必须配合放疗' },
          { name: '曲安奈德疤痕内注射', price: '$$', type: 'medical', keyIngredient: '曲安奈德', usage: '医生注射入疤痕内，每4-6周一次', skinType: '所有', note: '激素类，可软化疤痕，需多次治疗' },
        ],
        precautions: ['必须正规医院治疗', '瘢痕疙瘩极易复发', '不可单纯手术'],
        homeCare: ['术后严格使用硅凝胶产品', '长期随访', '避免外伤']
      }
    ],
    prevention: ['避免不必要的纹身/穿孔', '有家族史者避免外伤', '伤口及时处理', '减少疤痕部位摩擦'],
    whenToSeeDoctor: '出现瘢痕疙瘩或原有增大'
  },
  {
    id: 'scar-atrophic',
    area: 'face',
    category: '疤痕',
    subCategory: '凹陷性疤痕',
    title: '凹陷性疤痕（面部痘疤）',
    emoji: '🔽',
    description: '疤痕组织低于正常皮肤表面，形成凹陷，常见于痘痘或水痘后。面部高发。',
    causes: ['痘痘/水痘感染', '炎症破坏真皮', '处理不当挤压', '遗传因素'],
    symptoms: ['皮肤凹陷', '冰锥型/车厢型/滚轮型', '毛孔粗大错觉', '光线阴影明显'],
    solutions: [
      {
        type: 'home-remedy',
        title: '家庭护理（促进修复）',
        duration: '持续3-6个月',
        cost: '$',
        efficacy: 'low',
        steps: ['用食指指腹每日按摩疤痕处5-10分钟', '配合芦荟胶或面霜进行按摩', '可用蒸汽热敷帮助护肤品吸收', '严格防晒，避免色素沉着'],
        homeCare: ['不要用手挤压痘痘', '使用温和洁面产品', '保持面部水分充足', '外出必须涂抹防晒霜SPF30+'],
        note: '家庭护理可促进皮肤修复，但无法填平已形成的凹陷'
      },
      {
        type: 'product',
        title: '平价产品（辅助修复）',
        duration: '长期使用',
        cost: '$',
        efficacy: 'low',
        products: [
          { name: '完美芦荟胶', price: '$', type: 'drugstore', keyIngredient: '芦荟', usage: '每日2-3次，取适量涂抹按摩', skinType: '所有肤质', note: '消炎保湿，促进愈合，便宜大碗' },
          { name: '维生素E乳', price: '$', type: 'drugstore', keyIngredient: '维生素E', usage: '每晚睡前涂抹疤痕处', skinType: '所有肤质', note: '抗氧化，辅助皮肤修复' },
          { name: '大宝SOD蜜', price: '$', type: 'drugstore', keyIngredient: 'SOD', usage: '每日2次面部保湿', skinType: '干性肤质', note: '平价保湿基础护理' },
        ],
        precautions: ['护肤品无法填平凹陷', '严重者需医美治疗']
      },
      {
        type: 'medical',
        title: '医美治疗（最有效）',
        duration: '多次治疗',
        cost: '$$$',
        efficacy: 'high',
        products: [
          { name: '点阵激光（CO2/饵激光）', price: '$$$', type: 'medical', keyIngredient: '激光', usage: '需3-6次，每次间隔1-2个月', skinType: '所有肤质', note: '剥脱性激光效果最好但恢复期长' },
          { name: '皮下分离术（Subcision）', price: '$$', type: 'medical', usage: '医生操作，松解疤痕纤维', skinType: '滚轮型疤痕', note: '配合填充或激光效果更好' },
          { name: '玻尿酸填充', price: '$$$', type: 'medical', usage: '医生注射，立即改善', skinType: '所有', note: '临时性，需定期维护' },
        ],
        precautions: ['必须找正规医美机构', '恢复期需防晒', '可能需要综合治疗'],
        homeCare: ['严格防晒', '使用修复类护肤品', '耐心等待恢复']
      }
    ],
    prevention: ['不要挤压痘痘', '痘痘及时治疗', '避免水痘抓挠', '正确护肤'],
    whenToSeeDoctor: '凹陷疤痕影响外观'
  },
  {
    id: 'scar-contracture',
    area: 'body',
    category: '疤痕',
    subCategory: '挛缩性疤痕',
    title: '挛缩性疤痕（身体）',
    emoji: '🪢',
    description: '疤痕组织收缩，导致皮肤紧绷，常影响关节活动，常见于烧伤后或大面积创伤后。',
    causes: ['大面积烧伤', '伤口感染', '缝合张力过大', '长期慢性溃疡'],
    symptoms: ['皮肤紧绷', '牵拉变形', '可能影响关节活动', '瘙痒疼痛', '皮肤颜色改变'],
    solutions: [
      {
        type: 'home-remedy',
        title: '家庭护理（辅助缓解）',
        duration: '持续进行',
        cost: '$',
        efficacy: 'low',
        steps: ['用润肤霜每日多次涂抹疤痕部位', '轻柔拉伸疤痕周围皮肤', '浸泡温水后按摩效果更好', '保持疤痕部位滋润'],
        homeCare: ['坚持每天拉伸锻炼', '穿宽松衣物减少摩擦', '避免疤痕部位晒伤', '不要抓挠瘙痒部位'],
        note: '家庭护理可软化疤痕，但严重挛缩必须就医'
      },
      {
        type: 'product',
        title: '平价产品（滋润软化）',
        duration: '长期使用',
        cost: '$',
        efficacy: 'low',
        products: [
          { name: '凡士林经典润肤霜', price: '$', type: 'drugstore', keyIngredient: '矿脂', usage: '每日多次厚涂疤痕部位', skinType: '所有肤质', note: '封闭保湿，软化疤痕' },
          { name: '完美芦荟胶', price: '$', type: 'drugstore', keyIngredient: '芦荟', usage: '每日2-3次涂抹，配合按摩', skinType: '所有肤质', note: '消炎保湿，缓解瘙痒' },
        ],
        precautions: ['严重挛缩必须手术', '家庭护理仅辅助']
      },
      {
        type: 'medical',
        title: '综合治疗（必须就医）',
        duration: '长期治疗',
        cost: '$$$',
        efficacy: 'high',
        products: [
          { name: '手术松解+植皮/皮瓣', price: '$$$', type: 'medical', usage: '医生手术方案', skinType: '所有', note: '严重挛缩必须手术' },
          { name: '压力治疗', price: '$$', type: 'medical', usage: '穿弹力衣/用弹力绷带，持续加压', skinType: '所有', note: '烧伤后必备' },
        ],
        precautions: ['严重影响功能时必须手术', '术后仍需压力治疗'],
        homeCare: ['坚持功能锻炼', '长期使用弹力套', '保持疤痕湿润']
      }
    ],
    prevention: ['烧伤后及时正确处理', '早期压力治疗', '避免伤口感染'],
    whenToSeeDoctor: '出现挛缩或影响活动'
  },
  {
    id: 'scar-superficial',
    area: 'body',
    category: '疤痕',
    subCategory: '表浅性疤痕',
    title: '表浅性疤痕（轻微伤疤）',
    emoji: '📍',
    description: '伤口只涉及表皮或浅层真皮，愈合后形成的平坦疤痕，色泽可能略有改变。可发生于身体任何部位。',
    causes: ['轻微擦伤', '浅层切伤', '抓伤', '轻微烫伤', '蚊虫叮咬'],
    symptoms: ['略低于或平于皮肤', '粉红色或白色', '质地柔软', '一般无不适', '轻微瘙痒'],
    solutions: [
      {
        type: 'home-remedy',
        title: '家庭护理（新疤黄金期）',
        duration: '伤口愈合后2-4个月',
        cost: '$',
        efficacy: 'medium',
        steps: ['伤口愈合后用维生素E胶囊刺破涂抹', '每日按摩疤痕处5-10分钟促进血液循环', '用新鲜芦荟切开直接涂抹疤痕', '保持疤痕部位滋润'],
        homeCare: ['避免疤痕部位紫外线照射', '保持疤痕清洁', '不要抓挠', '新疤期避免辛辣刺激食物'],
        note: '新疤（6个月内）是修复的黄金期，家庭护理效果明显'
      },
      {
        type: 'product',
        title: '平价产品（早期干预最佳）',
        duration: '2-4个月',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: '完美芦荟胶', price: '$', type: 'drugstore', keyIngredient: '芦荟', usage: '每日3-4次，新疤期坚持使用', skinType: '所有肤质', note: '消炎促愈合，新疤首选，便宜大碗' },
          { name: '维生素E乳', price: '$', type: 'drugstore', keyIngredient: '维生素E', usage: '每日2次按摩涂抹疤痕处', skinType: '所有肤质', note: '抗氧化，淡化疤痕色素' },
          { name: '凡士林经典润肤霜', price: '$', type: 'drugstore', keyIngredient: '矿脂', usage: '每日多次厚涂疤痕部位', skinType: '所有肤质', note: '封闭保湿，软化疤痕效果佳' },
        ],
        precautions: ['伤口愈合后才用', '坚持使用是关键', '新疤期效果最好'],
        homeCare: ['避免日晒', '保持疤痕滋润', '不要摩擦抓挠']
      }
    ],
    prevention: ['及时处理伤口', '避免感染', '早期使用祛疤产品', '新疤期注意护理'],
    whenToSeeDoctor: '出现增生或色素异常'
  },
  {
    id: 'scar-pigmentation',
    area: 'face',
    category: '疤痕',
    subCategory: '色素沉着性疤痕',
    title: '色素沉着性疤痕（面部黑印/红印）',
    emoji: '🟤',
    description: '伤口愈合后留下的色素沉着，表现为红色或深褐色的印痕。面部常见，影响美观。',
    causes: ['炎症后色素沉着', '紫外线加深', '抓挠刺激', '痘痘挤压', '不当护肤'],
    symptoms: ['红色/褐色/黑色印迹', '平于皮肤', '可能自行消退', '日晒后加深', '面部高发'],
    solutions: [
      {
        type: 'home-remedy',
        title: '家庭护理（加速淡化）',
        duration: '持续3-6个月',
        cost: '$',
        efficacy: 'medium',
        steps: ['用新鲜柠檬汁稀释（1:3）点涂色素处（晚间）', '每日用化妆棉敷酸奶10分钟', '用维生素C粉混合面霜涂抹', '多喝柠檬水从内抗氧化'],
        homeCare: ['必须严格防晒SPF30+', '用温和洁面产品', '避免摩擦色素处', '不要挤压痘痘', '保持充足睡眠'],
        note: '家庭护理配合防晒效果最好，色素印一般6-12个月可自行消退'
      },
      {
        type: 'product',
        title: '平价产品（美白淡印）',
        duration: '2-6个月',
        cost: '$',
        efficacy: 'medium',
        products: [
          { name: '完美芦荟胶', price: '$', type: 'drugstore', keyIngredient: '芦荟', usage: '每日2-3次，配合美白产品使用', skinType: '所有肤质', note: '消炎舒缓，辅助淡化红印' },
          { name: '维生素E乳', price: '$', type: 'drugstore', keyIngredient: '维生素E', usage: '每晚睡前涂抹色素处', skinType: '所有肤质', note: '抗氧化，淡化色素印' },
          { name: 'VC片碾碎混合面霜', price: '$', type: 'drugstore', keyIngredient: '维生素C', usage: '晚间使用，碾碎1片混合面霜涂抹', skinType: '所有肤质', note: '自制VC美白，便宜有效，注意防晒' },
        ],
        precautions: ['必须防晒（最重要）', '不要抓挠', '耐心等待', '见效慢需坚持']
      },
      {
        type: 'medical',
        title: '医美加速淡化',
        duration: '1-3次',
        cost: '$$$',
        efficacy: 'high',
        products: [
          { name: '光子嫩肤（IPL）', price: '$$$', type: 'medical', usage: '医生操作，针对色素', skinType: '所有肤质', note: '加速色素代谢，效果明显' },
          { name: '果酸换肤', price: '$$', type: 'medical', usage: '医生操作，促进角质代谢', skinType: '非敏感肌', note: '加速色素脱落，需多次' },
        ],
        precautions: ['必须去正规机构', '术后严格防晒', '可能需要多次治疗']
      }
    ],
    prevention: ['严格防晒', '不要挤压痘痘', '及时处理痘痘', '正确护肤'],
    whenToSeeDoctor: '色素沉着超过一年不消退'
  },

  // ==================== 身体毛囊问题 ====================
  {
    id: 'body-follicle-damage',
    area: 'body',
    category: '毛囊受损',
    subCategory: '毛囊炎',
    title: '毛囊受损/毛囊炎',
    emoji: '🔵',
    description: '毛囊因感染、摩擦或不当除毛导致的炎症和损伤。',
    causes: ['细菌感染', '不当除毛（剃刀bumps）', '紧身衣物摩擦', '出汗潮湿'],
    symptoms: ['小红疙瘩', '脓疱', '瘙痒疼痛', '常见于腿部/腋下/比基尼区'],
    solutions: [
      {
        type: 'product',
        title: '抗菌消炎护理',
        duration: '1-2周',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: 'Mario Badescu抗菌液', price: '$$', type: 'mid-range', keyIngredient: '硫磺+炉甘石', usage: '每日2-3次，用棉签点涂于患处', skinType: '所有肤质', note: '消炎杀菌，可用于面部和身体' },
          { name: 'Neutrogena Body Clear身体乳', price: '$', type: 'essential', keyIngredient: '2%水杨酸', usage: '每日2次涂抹于患处', skinType: '所有肤质', combination: '配合抗菌液使用', note: '平价有效' },
          { name: 'The Ordinary水杨酸2%', price: '$', type: 'essential', keyIngredient: '2%水杨酸', usage: '每日1-2次点涂', skinType: '所有肤质', note: '平价大碗，可用于身体' },
        ],
        precautions: ['不要挤压', '保持干燥清洁'],
        homeCare: ['穿透气衣物', '除毛后用凉水冲洗', '用专用除毛产品']
      }
    ],
    prevention: ['正确除毛方式', '避免紧身衣物', '保持干燥', '除毛后用抗菌产品'],
    whenToSeeDoctor: '反复发作或出现囊肿'
  },
  {
    id: 'body-follicle-ingrown',
    area: 'body',
    category: '毛囊受损',
    subCategory: '毛发内生',
    title: '毛发内生（内嵌毛）',
    emoji: '🌀',
    description: '除毛后毛发重新长出时卷曲内生，导致红肿和瘙痒。',
    causes: ['除毛方式不当', '毛发卷曲', '毛孔堵塞', '紧身衣物'],
    symptoms: ['红肿小疙瘩', '脓疱', '瘙痒', '可见内卷毛发'],
    solutions: [
      {
        type: 'product',
        title: '去角质+抗菌',
        duration: '持续护理',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: 'CeraVe SA身体乳', price: '$', type: 'essential', keyIngredient: '0.5%水杨酸+10%尿素', usage: '每日2次，去角质防止内生', skinType: '所有肤质', combination: '配合抗菌产品', note: '温和去角质+保湿' },
          { name: 'Tend Skin除毛后护理液', price: '$$', type: 'proxy', keyIngredient: '水杨酸+甘油', usage: '除毛后涂抹，每日1-2次', skinType: '所有肤质', note: '美国销量第一，可美亚购买' },
        ],
        precautions: ['不要挑破', '避免同一区域频繁除毛'],
        homeCare: ['改变除毛方向', '用锋利干净的剃刀', '除毛前热敷软化毛发']
      }
    ],
    prevention: ['定期去角质', '使用锋利剃刀', '顺着毛发方向剃', '除毛后用凉水冲洗'],
    whenToSeeDoctor: '严重感染或疤痕'
  },

  // ==================== 手足护理 - 优化分类 ====================
  {
    id: 'hands-aging-spot',
    area: 'hands',
    category: '老化',
    subCategory: '色斑',
    title: '手背色斑/老年斑',
    emoji: '🖐️',
    description: '手部皮肤老化出现色斑，与紫外线累积损伤有关。',
    causes: ['紫外线累积', '频繁接触水', '缺乏护理', '自然老化'],
    symptoms: ['手背色斑', '皮肤变薄', '静脉明显'],
    solutions: [
      {
        type: 'product',
        title: '美白淡斑+防晒',
        duration: '需要耐心',
        cost: '$$',
        efficacy: 'medium',
        products: [
          { name: 'Olay淡斑小白瓶', price: '$$', type: 'mid-range', keyIngredient: '5%烟酰胺', usage: '每日2次，取适量（约黄豆大小）涂抹于手背', skinType: '所有肤质', combination: '配合防晒', note: '平价美白精华', dosage: '每次约0.5ml' },
          { name: '理肤泉Anthelios防晒霜', price: '$$', type: 'mid-range', keyIngredient: 'Mexoryl SX+XL', usage: '日间每次涂抹双手，每次约0.5g', skinType: '所有肤质', combination: '配合美白精华', note: '法国专业防晒，可法代', dosage: '每2小时补涂' },
          { name: '科颜氏淡斑精华', price: '$$$', type: 'luxury', keyIngredient: '透明维C+玻色因', usage: '每日2次涂抹', skinType: '所有肤质', note: '温和有效，可涂手部' },
        ],
        precautions: ['手部也要涂防晒', '做家务戴手套'],
        homeCare: ['做家务戴手套', '洗手后涂护手霜', '定期去角质']
      }
    ],
    prevention: ['手部防晒', '戴手套做家务', '及时保湿'],
    whenToSeeDoctor: '异常斑块或快速增大'
  },
  {
    id: 'hands-dry-cracked',
    area: 'hands',
    category: '干燥',
    subCategory: '手部干裂',
    title: '手部干燥/干裂',
    emoji: '🖐️',
    description: '手部皮肤干燥、粗糙、严重时开裂出血。',
    causes: ['频繁洗手', '接触洗涤剂', '天气干燥', '洗手后未及时保湿'],
    symptoms: ['干燥脱皮', '粗糙', '裂纹', '可能出血疼痛'],
    solutions: [
      {
        type: 'product',
        title: '强效保湿修护',
        duration: '每日护理',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: '资生堂尿素护手霜', price: '$', type: 'essential', keyIngredient: '10%尿素', usage: '每次洗手后涂抹，严重时厚敷过夜', skinType: '干性手部', note: '日本平价经典，软化角质效果好，日代购买' },
          { name: '凡士林经典护手霜', price: '$', type: 'drugstore', keyIngredient: '矿脂+甘油', usage: '每次洗手后涂抹，随时补涂', skinType: '所有肤质', note: '国货经典，平价大碗，超市常见' },
          { name: 'G&M澳芝曼绵羊油护手霜', price: '$', type: 'drugstore', keyIngredient: '绵羊油+维生素E', usage: '每日多次，严重时厚敷过夜', skinType: '干性手部', note: '澳洲平价，滋润度高' },
          { name: '贺本清德国小甘菊护手霜', price: '$', type: 'drugstore', keyIngredient: '洋甘菊+甘草酸', usage: '每日多次，随时补涂', skinType: '所有肤质', note: '德国经典平价护手霜，小巧便携' },
          { name: 'CeraVe适乐肤护手霜', price: '$', type: 'drugstore', keyIngredient: '3种神经酰胺+透明质酸', usage: '每次洗手后涂抹', skinType: '敏感性手部', note: '美国平价药妆，修复屏障' },
          { name: '欧舒丹乳木果护手霜', price: '$$', type: 'mid-range', keyIngredient: '20%乳木果油', usage: '每日多次，随时补涂', skinType: '所有肤质', note: '滋润度高，法代购买' },
          { name: '丝塔芙大白罐', price: '$', type: 'essential', keyIngredient: '甜扁桃油+矿脂', usage: '严重干裂时厚敷过夜', skinType: '极干手部', note: '加拿大品牌，平价大碗，全身可用' },
        ],
        precautions: ['用温水洗手', '选择温和洗手液', '戴手套做家务'],
        homeCare: ['睡前厚涂护手霜戴棉手套', '用温水洗手', '保持指甲干燥']
      }
    ],
    prevention: ['每次洗手后涂护手霜', '做家务戴手套', '用温和洗手液'],
    whenToSeeDoctor: '裂纹出血或感染'
  },

  // ==================== 足部问题 - 细化分类 ====================
  {
    id: 'feet-cracked-heel',
    area: 'feet',
    category: '干裂',
    subCategory: '脚跟干裂',
    title: '脚跟干裂/皲裂',
    emoji: '🦶',
    description: '脚跟皮肤增厚、干燥、皲裂，行走时可能疼痛。',
    causes: ['皮肤干燥', '角质过厚', '长期站立', '缺乏护理'],
    symptoms: ['脚跟干燥', '裂纹', '可能出血', '疼痛'],
    solutions: [
      {
        type: 'product',
        title: '尿素霜厚敷+去角质',
        duration: '每晚护理',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: '资生堂尿素护手霜', price: '$', type: 'essential', keyIngredient: '10%尿素', usage: '每晚厚涂于脚跟，穿上棉袜过夜，第二天用浮石轻轻磨去软化角质', skinType: '所有足部', note: '日本平价经典，软化角质效果好，日代购买' },
          { name: '小林制药命の母足跟龟裂软化霜', price: '$', type: 'drugstore', keyIngredient: '尿素+维生素E', usage: '每晚厚涂于脚跟，配合按摩', skinType: '干裂足部', note: '日本平价药妆，小林制药出品' },
          { name: '凡士林经典晶冻', price: '$', type: 'drugstore', keyIngredient: '100%矿脂', usage: '每晚厚涂于脚跟，穿上棉袜过夜', skinType: '所有足部', note: '国货经典，平价封层，超市常见' },
          { name: 'Euroaltederm 40%尿素软膏', price: '$$', type: 'proxy', keyIngredient: '40%尿素', usage: '严重干裂时使用，每周2-3次厚敷', skinType: '严重干裂', note: '超高浓度，适合严重情况，德代可购' },
          { name: 'Dr.scholl防裂脚膜', price: '$$', type: 'mid-range', keyIngredient: '果酸+尿素', usage: '每周1次，敷30分钟后洗净', skinType: '所有足部', note: '懒人福音，美亚可购' },
        ],
        precautions: ['不要强行撕皮', '从低浓度开始', '坚持护理'],
        homeCare: ['穿透气鞋', '避免赤脚走', '定期去角质']
      }
    ],
    prevention: ['每日保湿', '穿透气鞋', '定期护理'],
    whenToSeeDoctor: '裂纹出血或感染'
  },
  {
    id: 'feet-callus',
    area: 'feet',
    category: '干裂',
    subCategory: '厚茧/鸡眼',
    title: '脚部厚茧/鸡眼',
    emoji: '🥔',
    description: '足部长期受压形成的增厚角质，严重的形成鸡眼。',
    causes: ['长期受压', '鞋子不合脚', '走路姿势问题'],
    symptoms: ['局部增厚', '变黄/变硬', '鸡眼有核心', '行走疼痛'],
    solutions: [
      {
        type: 'product',
        title: '水杨酸贴膏/液',
        duration: '1-2周',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: 'Dr.Scholl鸡眼贴', price: '$', type: 'essential', keyIngredient: '40%水杨酸', usage: '贴于患处，每48小时更换', skinType: '所有', note: '药店有售' },
          { name: '水杨酸软膏5%', price: '$', type: 'drugstore', keyIngredient: '5%水杨酸', usage: '每日涂抹，配合磨砂石使用', skinType: '所有', note: '可自行配制' },
        ],
        precautions: ['不要强行剥离', '保护周围皮肤', '糖尿病患者慎用'],
        homeCare: ['穿合适的鞋子', '使用鞋垫减压', '定期护理']
      }
    ],
    prevention: ['穿合脚鞋子', '使用鞋垫', '避免长期站立'],
    whenToSeeDoctor: '疼痛严重或糖尿病患者'
  },
  {
    id: 'feet-athlete',
    area: 'feet',
    category: '干裂',
    subCategory: '真菌感染',
    title: '脚气/足癣',
    emoji: '🦠',
    description: '真菌感染导致的脚部问题，瘙痒、脱皮、水疱。',
    causes: ['真菌感染', '公共环境传染', '脚部潮湿'],
    symptoms: ['瘙痒', '脱皮', '水疱', '趾间浸渍发白'],
    solutions: [
      {
        type: 'product',
        title: '抗真菌治疗',
        duration: '2-4周',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: '达克宁硝酸咪康唑', price: '$', type: 'essential', keyIngredient: '2%咪康唑', usage: '每日2次，涂抹于患处及周围皮肤，连用4周', skinType: '所有', combination: '配合粉剂保持干燥', note: '老牌抗真菌药' },
          { name: '珊瑚癣净', price: '$', type: 'drugstore', keyIngredient: '珊瑚皮提取物+中药成分', usage: '每日1-2次，喷涂或湿敷于患处，连用2-4周', skinType: '所有', note: '中药成分抗真菌，止痒效果好，用户反馈对脚气效果显著' },
          { name: '兰美抒特比萘芬', price: '$', type: 'essential', keyIngredient: '1%特比萘芬', usage: '每日2次，连用1-2周', skinType: '所有', note: '新一代抗真菌，更强效' },
          { name: '足光粉', price: '$', type: 'drugstore', keyIngredient: '中药粉', usage: '泡脚用，每日一次', skinType: '所有', note: '辅助治疗' },
        ],
        precautions: ['坚持用药到痊愈后1周', '消毒鞋袜', '保持干燥'],
        homeCare: ['穿透气鞋袜', '每天换袜子', '公共场所穿拖鞋']
      }
    ],
    prevention: ['保持脚部干燥', '穿透气鞋', '公共场所避免赤脚'],
    whenToSeeDoctor: '反复发作或出现感染'
  },
  {
    id: 'feet-odor',
    area: 'feet',
    category: '干裂',
    subCategory: '足臭',
    title: '脚臭/脚部异味',
    emoji: '😰',
    description: '细菌分解汗液产生的异味。',
    causes: ['出汗多', '细菌繁殖', '鞋袜不透气'],
    symptoms: ['脚部异味', '多汗', '可能伴有脱皮'],
    solutions: [
      {
        type: 'product',
        title: '抗菌控汗',
        duration: '持续使用',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: 'Absorbine Jr.足部喷雾', price: '$$', type: 'proxy', keyIngredient: '薄荷+水杨酸', usage: '每日喷于脚部和鞋内', skinType: '所有', note: '美国销量第一，可美亚' },
          { name: 'Neat Feat足部止汗露', price: '$', type: 'proxy', keyIngredient: '铝盐', usage: '睡前涂抹于干燥脚部', skinType: '多汗足部', note: '新西兰品牌，控制出汗' },
        ],
        precautions: ['保持脚部干燥', '穿透气鞋'],
        homeCare: ['穿透气棉袜', '每天换袜', '鞋子轮换穿保持干燥']
      }
    ],
    prevention: ['保持干燥', '穿透气鞋袜', '使用足部粉剂'],
    whenToSeeDoctor: '伴随红肿或感染'
  },
  {
    id: 'feet-nail-fungus',
    area: 'feet',
    category: '干裂',
    subCategory: '灰指甲',
    title: '灰指甲（甲真菌病）',
    emoji: '💅',
    description: '指甲真菌感染，变色、变厚、变形。',
    causes: ['真菌感染', '足癣蔓延', '指甲外伤'],
    symptoms: ['指甲变黄/变白', '变厚', '易碎', '甲下屑'],
    solutions: [
      {
        type: 'medical',
        title: '口服药物治疗（首选）',
        duration: '3-4个月',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: '斯皮仁诺伊曲康唑', price: '$$', type: 'medical', keyIngredient: '伊曲康唑', usage: '冲击疗法：每日2次，每次2粒，服1周停3周', skinType: '所有', note: '需医生处方，肝功能异常者禁用' },
          { name: '特比萘芬片', price: '$', type: 'medical', keyIngredient: '特比萘芬', usage: '每日250mg，连续12周', skinType: '所有', note: '需医生处方' },
        ],
        precautions: ['需医生处方', '定期检查肝功能', '坚持用药'],
        homeCare: ['配合外用药', '消毒鞋袜', '避免外伤']
      },
      {
        type: 'product',
        title: '外用辅助治疗',
        duration: '长期',
        cost: '$',
        efficacy: 'medium',
        products: [
          { name: '罗每乐盐酸阿莫罗芬甲搽剂', price: '$$', type: 'medical', keyIngredient: '5%阿莫罗芬', usage: '每周1-2次锉薄指甲后涂抹', skinType: '所有', note: '外用首选，可配合口服' },
        ],
        precautions: ['配合口服效果更好', '需长期坚持']
      }
    ],
    prevention: ['及时治疗足癣', '保持脚部干燥', '避免指甲外伤'],
    whenToSeeDoctor: '出现灰指甲症状'
  },

  // ==================== 身体问题 ====================
  {
    id: 'body-keratosis-arm',
    area: 'body',
    category: '鸡皮肤',
    subCategory: '毛囊角化',
    title: '手臂鸡皮肤（毛囊角化症）',
    emoji: '🐔',
    description: '毛囊口角化过度形成的粗糙小颗粒，常见于上臂外侧。',
    causes: ['遗传', '毛囊角化过度', '维生素A缺乏', '皮肤屏障异常'],
    symptoms: ['手臂外侧小颗粒', '粗糙感', '冬季加重', '可能泛红'],
    solutions: [
      {
        type: 'product',
        title: '果酸+尿素组合',
        duration: '2-3个月见效',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: 'NeoStrata芯丝翠果酸身体乳10%', price: '$$', type: 'mid-range', keyIngredient: '10%甘醇酸', usage: '每日2次，取适量（约10ml）涂抹于患处，按摩至吸收', skinType: '所有肤质', combination: '配合尿素产品效果更好', note: '果酸换肤领导者，美代购买', dosage: '每次约10ml' },
          { name: 'CeraVe SA身体乳', price: '$', type: 'essential', keyIngredient: '0.5%水杨酸+10%尿素', usage: '每日2次，沐浴后趁皮肤湿润时涂抹效果更佳', skinType: '所有肤质', note: '平价温和，适合日常使用', dosage: '每次约15ml' },
          { name: 'Alpha Hydrox 12%果酸身体乳', price: '$', type: 'proxy', keyIngredient: '12%甘醇酸', usage: '每晚一次，取适量涂抹于手臂，严重处可厚敷', skinType: '耐受肌肤', note: '美国销量第一果酸身体乳，可美亚', dosage: '每次约15-20ml' },
        ],
        precautions: ['晚间使用', '白天防晒', '需要坚持'],
        homeCare: ['沐浴后3分钟内涂身体乳', '用温水和温和沐浴露', '定期去角质']
      }
    ],
    prevention: ['保持皮肤水分', '定期去角质', '使用温和沐浴产品'],
    whenToSeeDoctor: '严重红肿或感染'
  },
  {
    id: 'body-dryitch-winter',
    area: 'body',
    category: '干燥瘙痒',
    subCategory: '季节性干燥',
    title: '身体皮肤干燥瘙痒（冬季/干皮）',
    emoji: '🦎',
    description: '全身皮肤干燥引起的瘙痒，尤其在冬季或干燥环境。',
    causes: ['皮肤水分流失', '皮脂减少', '频繁洗澡', '环境干燥'],
    symptoms: ['全身干燥', '瘙痒', '鳞屑', '紧绷感'],
    solutions: [
      {
        type: 'product',
        title: '强效保湿身体乳',
        duration: '每日使用',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: 'CeraVe全天候身体乳', price: '$', type: 'essential', keyIngredient: '3种神经酰胺+透明质酸', usage: '沐浴后3分钟内涂抹全身', skinType: '干性/敏感性肌肤', note: '美国平价药妆，3种神经酰胺修复屏障' },
          { name: '丝塔芙大白罐', price: '$', type: 'essential', keyIngredient: '甜扁桃油+矿脂', usage: '每日2-3次，严重时厚敷过夜', skinType: '极干肌肤', note: '加拿大品牌，平价大碗，全身可用' },
          { name: '凡士林倍护精华修护润肤露', price: '$', type: 'drugstore', keyIngredient: '微凝晶冻+烟酰胺', usage: '每日2-3次，取适量涂抹全身', skinType: '所有肤质', note: '国货经典，平价大碗，超市常见' },
          { name: 'G&M澳芝曼绵羊油面霜', price: '$', type: 'drugstore', keyIngredient: '绵羊油+维生素E', usage: '每日2-3次，沐浴后涂抹', skinType: '极干肌肤', note: '澳洲平价万能霜，全身可用' },
          { name: 'Aveeno艾惟诺燕麦身体乳', price: '$', type: 'drugstore', keyIngredient: '燕麦提取物', usage: '每日2次，沐浴后涂抹全身', skinType: '干性/敏感肌', note: '美国平价，燕麦镇定止痒，敏感肌友好' },
          { name: 'Gold Bond高保湿身体乳', price: '$', type: 'drugstore', keyIngredient: '7重保湿成分', usage: '每日2-3次，严重干燥处厚敷', skinType: '极干肌肤', note: '美国平价大碗，高保湿，适合沙漠干皮' },
          { name: '适乐肤A醇身体乳', price: '$$', type: 'mid-range', keyIngredient: '0.1%视黄醇', usage: '每日1-2次，可改善干燥和鸡皮肤', skinType: '所有肤质', note: '抗老+保湿二合一，晚间使用' },
        ],
        precautions: ['沐浴后3分钟内涂', '用温水洗澡', '用加湿器'],
        homeCare: ['减少洗澡频率', '用温水', '使用加湿器', '穿棉质衣物']
      }
    ],
    prevention: ['减少洗澡频率', '用加湿器', '选择温和沐浴产品'],
    whenToSeeDoctor: '严重瘙痒影响睡眠'
  },
  {
    id: 'body-backacne',
    area: 'body',
    category: '背痘',
    subCategory: '毛囊炎',
    title: '背部痘痘（毛囊炎）',
    emoji: '🔙',
    description: '背部油脂分泌旺盛和出汗后清洁不当导致的痘痘。',
    causes: ['皮脂腺丰富', '毛孔堵塞', '出汗后不及时清洁', '衣物摩擦'],
    symptoms: ['背部长痘', '粉刺黑头', '可能疼痛'],
    solutions: [
      {
        type: 'product',
        title: '水杨酸沐浴+喷雾',
        duration: '持续使用',
        cost: '$',
        efficacy: 'high',
        products: [
          { name: 'CeraVe水杨酸沐浴露', price: '$', type: 'essential', keyIngredient: '2%水杨酸', usage: '每日使用，取适量涂抹于背部，按摩3-5分钟后冲洗', skinType: '油性肌肤', combination: '配合果酸身体乳', note: '温和去角质', dosage: '每次约10ml' },
          { name: 'Mario Badescu AHA背部喷雾', price: '$$', type: 'proxy', keyIngredient: 'AHA果酸', usage: '每日喷于背部，轻拍至吸收', skinType: '所有肤质', note: '美国背部祛痘神器，可美亚', dosage: '每个患处喷3-5下' },
        ],
        precautions: ['配合果酸身体乳', '勤换床单'],
        homeCare: ['出汗后及时清洁', '穿透气衣物', '清淡饮食']
      }
    ],
    prevention: ['出汗后及时清洁', '清淡饮食', '定期更换床单'],
    whenToSeeDoctor: '严重囊肿'
  },
  {
    id: 'body-stretchmarks-pregnancy',
    area: 'body',
    category: '妊娠纹',
    subCategory: '妊娠纹',
    title: '妊娠纹/肥胖纹',
    emoji: '📈',
    description: '皮肤快速拉伸导致的弹力纤维断裂，形成紫红色或银白色条纹。',
    causes: ['皮肤快速拉伸', '体重变化', '激素变化', '遗传'],
    symptoms: ['紫红色/银白色条纹', '常见于腹部/大腿/胸部', '略微凹陷'],
    solutions: [
      {
        type: 'product',
        title: '紧致修护（预防/早期）',
        duration: '3-6个月',
        cost: '$$',
        efficacy: 'medium',
        products: [
          { name: "Palmer's妊娠纹霜", price: '$', type: 'essential', keyIngredient: '可可脂+维E+胶原蛋白', usage: '每日2次，取适量（约5-10ml）涂抹于纹路处，按摩至吸收', skinType: '所有肤质', note: '预防妊娠纹经典产品，平价大碗', dosage: '每次约10ml' },
          { name: '娇韵诗身体护理油+抚纹霜', price: '$$$', type: 'luxury', keyIngredient: '植物油+积雪草', usage: '每日2次，先油后霜，配合按摩', skinType: '所有肤质', combination: '油+霜组合效果最佳', note: '法国高端孕期护理，可找法代' },
          { name: 'Mama Mio妊娠纹霜', price: '$$', type: 'mid-range', keyIngredient: 'Cupuacu butter+雷公根', usage: '每日2次，取适量涂抹按摩', skinType: '所有肤质', note: '英国孕期护理品牌，可英代' },
        ],
        precautions: ['早期使用效果更好', '需坚持'],
        homeCare: ['控制体重增长', '保持皮肤弹性', '孕前就开始护理']
      }
    ],
    prevention: ['控制体重增长', '保持皮肤弹性', '孕前就开始护理'],
    whenToSeeDoctor: '纹路严重影响外观'
  },
  {
    id: 'body-scar-acne',
    area: 'body',
    category: '疤痕',
    subCategory: '痘疤/创伤疤',
    title: '疤痕（手术疤/创伤疤/痘疤）',
    emoji: '✒️',
    description: '皮肤受伤后形成的疤痕，包括凸起型和凹陷型。',
    causes: ['皮肤受伤愈合', '手术切口', '痘痘感染', '个人体质'],
    symptoms: ['凸起或凹陷', '颜色不同', '质地改变'],
    solutions: [
      {
        type: 'product',
        title: '硅凝胶疤痕护理',
        duration: '2-6个月',
        cost: '$$',
        efficacy: 'high',
        products: [
          { name: '芭克硅凝胶', price: '$$$', type: 'luxury', keyIngredient: '硅凝胶', usage: '伤口愈合后使用，每日2次，取少量涂抹于疤痕处，轻轻按摩', skinType: '所有肤质', combination: '配合疤痕贴使用', note: '全球销量第一疤痕硅凝胶，可海淘' },
          { name: '美皮护疤痕贴', price: '$$', type: 'mid-range', keyIngredient: '硅凝胶贴', usage: '每日贴敷8-24小时，可重复使用约2周', skinType: '所有肤质', combination: '与凝胶交替使用', note: '贴片型，更适合平整部位' },
          { name: 'Dermatix舒痕凝胶', price: '$$', type: 'mid-range', keyIngredient: '硅凝胶', usage: '每日2次，薄涂于疤痕处', skinType: '所有肤质', note: '澳洲销量第一，可代购' },
        ],
        precautions: ['伤口愈合后才用', '需长期坚持', '陈旧疤痕效果有限'],
        homeCare: ['避免阳光直射疤痕', '保持疤痕滋润']
      }
    ],
    prevention: ['避免阳光直射疤痕', '及时正确护理'],
    whenToSeeDoctor: '疤痕增生或严重影响外观'
  },
];

// ========== 肤质类型数据 ==========
export const skinTypes: SkinType[] = [
  {
    id: 'dry',
    name: '干性皮肤',
    emoji: '🏜️',
    description: '皮脂腺分泌较少，皮肤容易干燥、紧绷。',
    characteristics: ['容易感到紧绷', '换季时容易脱皮', '毛孔细小', '不易长痘但易敏感'],
    suitableIngredients: ['神经酰胺', '透明质酸', '角鲨烷', '泛醇', '甘油', '乳木果油'],
    avoidIngredients: ['酒精', '强效去角质成分', '皂基类洁面'],
    tips: ['使用温和氨基酸洁面', '洗脸水温不宜过热', '护肤后用面霜锁水', '使用加湿器']
  },
  {
    id: 'oily',
    name: '油性皮肤',
    emoji: '🛢️',
    description: '皮脂腺分泌旺盛，皮肤泛油光，毛孔粗大。',
    characteristics: ['全天泛油光', '毛孔粗大', '容易长痘', '不易出现细纹'],
    suitableIngredients: ['水杨酸', '烟酰胺', '锌', '茶树精油', '壬二酸', '果酸'],
    avoidIngredients: ['过于油腻的面霜', '矿物油', '羊毛脂'],
    tips: ['选择控油洁面', '使用清爽型保湿', '定期去角质', '携带吸油纸']
  },
  {
    id: 'combination',
    name: '混合性皮肤',
    emoji: '⚖️',
    description: 'T区油腻，U区干燥，是最常见的肤质。',
    characteristics: ['T区泛油光', 'U区正常或干燥', '额头鼻子易长痘'],
    suitableIngredients: ['水杨酸（局部）', '神经酰胺（两颊）', '透明质酸', '烟酰胺'],
    avoidIngredients: ['过于滋润的全脸产品', '过于刺激的去油产品'],
    tips: ['分区护理', 'T区控油', 'U区加强保湿']
  },
  {
    id: 'sensitive',
    name: '敏感性皮肤',
    emoji: '🌸',
    description: '皮肤屏障功能较弱，容易受到刺激。',
    characteristics: ['容易泛红', '容易瘙痒刺痛', '换季时容易过敏'],
    suitableIngredients: ['神经酰胺', '泛醇', '积雪草', '燕麦', '洋甘菊', '马齿苋'],
    avoidIngredients: ['酒精', '香精', '防腐剂', '果酸', '水杨酸', '维A酸'],
    tips: ['选择无香精无酒精产品', '新品先测试', '不要过度护肤', '物理防晒']
  },
  {
    id: 'normal',
    name: '中性皮肤',
    emoji: '✨',
    description: '理想的皮肤状态，水油平衡。',
    characteristics: ['皮肤状态稳定', '毛孔细小', '光泽有弹性', '不易出问题'],
    suitableIngredients: ['大多数成分都适用', '维生素C', '透明质酸', '肽类'],
    avoidIngredients: ['一般无需避免太多'],
    tips: ['维持现状', '基础保湿防晒', '定期温和去角质']
  }
];

// ========== 褒曼16型肤质详细数据 ==========
export const baumannSkinTypes: BaumannSkinType[] = [
  // ==================== DS类型（干性敏感） ====================
  {
    id: 'dspw',
    code: 'DSPW',
    name: '干性敏感色素皱纹肌',
    emoji: '🔴',
    type: 'DS',
    pigmented: true,
    wrinkle: true,
    profile: 'DS型肤质是最复杂的肤质类型之一。皮肤屏障受损导致水分流失加剧，同时色素细胞活跃容易产生色斑。皱纹也比同龄人出现得更早更深。这类皮肤既需要修护屏障，又要预防色素沉着和抗衰老。',
    barrierSymptoms: ['洗完脸后立即感到紧绷', '使用护肤品时容易刺痛或灼热', '换季时皮肤容易泛红、瘙痒', '皮肤看起来暗沉无光', '眼角和嘴角出现细纹', '色斑容易加深且难以消退'],
    repairStrategy: ['优先修护皮肤屏障，使用神经酰胺、胆固醇、游离脂肪酸的3:1:1比例产品', '避免一切刺激成分，包括酒精、香精、精油', '严格防晒，优先选择物理防晒剂（氧化锌、二氧化钛）', '色素管理从温和产品开始，如壬二酸、烟酰胺', '抗衰老选择多肽、玻色因等温和成分'],
    recommendedIngredients: ['神经酰胺1/3/6II（屏障修护）', '透明质酸（深层保湿）', '泛醇B5（舒缓修护）', '烟酰胺（美白控油）', '壬二酸（淡斑抗炎）', '玻色因（抗老充盈）', '多肽类（温和抗皱）', '积雪草苷（抗炎修复）'],
    avoidIngredients: [{ ingredient: '高浓度视黄醇', reason: '刺激性强，易加重敏感和色素沉着' }, { ingredient: '高浓度果酸/水杨酸', reason: '过度剥脱会破坏屏障，加重干燥' }, { ingredient: '酒精（乙醇）', reason: '加速水分蒸发，加重干燥敏感' }, { ingredient: '精油', reason: '可能含致敏成分，芳香化合物可能刺激' }, { ingredient: 'VC原型', reason: '低pH值可能刺激敏感皮肤' }],
    toleranceBuilding: [{ warning: '使用新护肤品时出现刺痛', solution: '立即用清水洗掉，等待5-10分钟后再尝试，连续3晚测试后再全脸使用' }, { warning: '壬二酸或烟酰胺初期泛红', solution: '从低浓度开始（壬二酸5%，烟酰胺3%），隔天使用，2-4周后增加频率' }, { warning: '防晒霜导致不适', solution: '选择纯物理防晒，用量从半勺开始逐步增加，给皮肤适应时间' }],
    amRoutine: [{ step: 1, product: '极温和洁面（如CeraVe适乐肤保湿洁面乳）', keyPoints: ['水温28-32度', '15-30秒快速洗完', '如无油腻感可只用温水'] }, { step: 2, product: '保湿喷雾（如理肤泉温和喷雾）', keyPoints: ['选择含泛醇/透明质酸', '用手轻拍不要摩擦'] }, { step: 3, product: '烟酰胺精华（如Olay光感小白瓶3-5%）', keyPoints: ['先在耳后测试', '每次2-3滴即可'] }, { step: 4, product: '保湿霜（如适乐肤C乳含神经酰胺）', keyPoints: ['含胆甾醇和游离脂肪酸', '必要时可叠加透明质酸精华'] }, { step: 5, product: '物理防晒（如EltaMD UV Clear防晒霜SPF46）', keyPoints: ['氧化锌/二氧化钛', '等待2分钟成膜后再上妆'] }],
    pmRoutine: [{ step: 1, product: '温和卸妆（如Farmacy紫雏菊卸妆洁面）', keyPoints: ['选择cream/油状卸妆', '洁面用APG或氨基酸表活'] }, { step: 2, product: '保湿喷雾（如Haba G露润泽柔肤水）', keyPoints: ['让皮肤保持微湿状态'] }, { step: 3, product: '屏障修护精华（如修丽可242面霜+角鲨烷）', keyPoints: ['神经酰胺精华+角鲨烷', '可加入1-2滴面部精华油'] }, { step: 4, product: '保湿霜（如适乐肤C乳含神经酰胺）', keyPoints: ['必要时可厚敷', '可用含有玻色因的面霜'] }, { step: 5, product: '眼霜（如Olay玉龄霜含多肽）', keyPoints: ['轻柔点涂', '避免拉扯'] }],
    affordableProducts: [{ name: 'CeraVe适乐肤保湿洁面乳', price: '¥80-120', keyPoints: '氨基酸表活，温和清洁含神经酰胺', where: '天猫/屈臣氏' }, { name: 'Olay光感小白瓶', price: '¥150-200', keyPoints: '烟酰胺3-5%，美白提亮', where: '天猫/专柜' }, { name: '适乐肤C乳', price: '¥120-150', keyPoints: '含神经酰胺1/3/6II，屏障修护', where: '天猫/屈臣氏' }, { name: '理肤泉B5面膜', price: '¥100-130/5片', keyPoints: '泛醇B5+积雪草，急救舒缓', where: '天猫/专柜' }]
  },
  {
    id: 'dspt',
    code: 'DSPT',
    name: '干性敏感色素紧致肌',
    emoji: '🟠',
    type: 'DS',
    pigmented: true,
    wrinkle: false,
    profile: 'DSPT型肤质的皮肤虽然暂时紧致，但色素问题是主要困扰。屏障受损导致皮肤容易敏感，同时黑色素细胞活跃，色斑容易产生和加深。护肤重点在于预防色素沉着、修护屏障，避免刺激导致色素加重。',
    barrierSymptoms: ['皮肤细腻但容易泛红', '护肤品使用时常有刺痛感', '换季或温差大时皮肤不稳定', '色斑分布不均，难以遮盖', '皮肤看起来不够透亮', '对新产品容易产生不适反应'],
    repairStrategy: ['修护屏障是首位，选择含有神经酰胺、泛醇、燕麦提取物的产品', '温和美白，优先使用壬二酸、烟酰胺、曲酸等相对温和的美白成分', '严格防晒，UVA是色素加深的主要原因', '避免摩擦和刺激，如磨砂、撕拉面膜', '保持皮肤微环境的稳定，避免频繁更换护肤品'],
    recommendedIngredients: ['神经酰胺（屏障修护）', '泛醇B5（舒缓）', '烟酰胺（温和美白）', '壬二酸（淡斑抗炎）', '曲酸（抑制黑色素）', '凝血酸（美白淡斑）', '光甘草定（温和美白）', '燕麦提取物（舒缓）'],
    avoidIngredients: [{ ingredient: '高浓度视黄醇', reason: '初期可能加重色素沉着，需医生指导下使用' }, { ingredient: '高浓度果酸', reason: '过度剥脱破坏屏障，加重敏感' }, { ingredient: 'VC原型（低pH）', reason: '可能刺激敏感皮肤，引起炎症后色素沉着' }, { ingredient: '氢醌', reason: '需要医生处方，自行使用有风险' }, { ingredient: '苯甲酸酯类防腐剂', reason: '部分敏感肌可能对paraben敏感' }],
    toleranceBuilding: [{ warning: '使用美白产品时皮肤泛红', solution: '降低使用频率，从每周2次开始，逐渐增加；选择更低浓度产品' }, { warning: '壬二酸使用初期发痒', solution: '从5%浓度开始，前两周只用5分钟就洗掉，慢慢延长停留时间' }, { warning: '防晒霜闷痘或过敏', solution: '选择无酒精、无香精的物理防晒，或尝试矿物防晒粉' }],
    amRoutine: [{ step: 1, product: '极温和洁面（如CeraVe适乐肤洁面乳）', keyPoints: ['早晨可用温水', '避免皂基洁面'] }, { step: 2, product: '舒缓型爽肤水（如理肤泉蓝水）', keyPoints: ['含燕麦/泛醇', '用手轻拍'] }, { step: 3, product: '烟酰胺精华（如Olay小白瓶5%）', keyPoints: ['5%浓度足够', '在湿润皮肤上使用更好吸收'] }, { step: 4, product: '保湿霜（如适乐肤C乳）', keyPoints: ['霜状质地锁水性好'] }, { step: 5, product: '物理防晒（如EltaMD SPF46）', keyPoints: ['含氧化锌', '2mg/cm²足量使用'] }],
    pmRoutine: [{ step: 1, product: '温和卸妆+洁面（如Farmacy紫雏菊）', keyPoints: ['cream状卸妆更温和', '洁面30秒内完成'] }, { step: 2, product: '舒缓爽肤水（如Haba G露）', keyPoints: ['可湿敷3-5分钟'] }, { step: 3, product: '壬二酸精华（如The Ordinary 10%）', keyPoints: ['壬二酸有美白+抗炎双重功效', '从5%开始，隔天使用'] }, { step: 4, product: '保湿霜（如适乐肤C乳）+2滴面部油', keyPoints: ['角鲨烷或霍霍巴油', '加强锁水'] }, { step: 5, product: '局部淡斑精华（如需）', keyPoints: ['只点在色斑处', '烟酰胺/壬二酸可全脸'] }],
    affordableProducts: [{ name: 'CeraVe适乐肤保湿洁面乳', price: '¥80-120', keyPoints: '氨基酸表活，温和清洁', where: '天猫/屈臣氏' }, { name: 'Olay光感小白瓶', price: '¥150-200', keyPoints: '烟酰胺5%，温和美白', where: '天猫/专柜' }, { name: 'The Ordinary壬二酸凝胶10%', price: '¥70-90', keyPoints: '壬二酸，淡斑抗炎', where: '天猫/淘宝' }, { name: '适乐肤C乳', price: '¥120-150', keyPoints: '含神经酰胺，屏障修护', where: '天猫/屈臣氏' }]
  },
  {
    id: 'dsnw',
    code: 'DSNW',
    name: '干性敏感非色素皱纹肌',
    emoji: '🟡',
    type: 'DS',
    pigmented: false,
    wrinkle: true,
    profile: 'DSNW是最需要耐心护理的肤质。皮肤屏障严重受损导致敏感脆弱，同时胶原蛋白流失快，皱纹问题突出。但由于没有色素沉着困扰，反而可以通过积极修护和抗衰老护理获得明显改善。',
    barrierSymptoms: [
      '皮肤极度干燥，紧绷感强烈',
      '使用护肤品频繁刺痛或灼热',
      '皮肤薄，可见红血丝',
      '换季时皮肤容易过敏起疹',
      '皮肤松弛弹性差',
      '细纹和表情纹明显加深'
    ],
    repairStrategy: [
      '极简护肤，只用必要产品，避免一切刺激',
      '屏障修护是核心，使用含有神经酰胺、胆固醇、脂肪酸的产品',
      '抗老从多肽、玻色因、胜肽类开始，视黄醇需极度谨慎',
      '保湿和锁水并重，使用含有透明质酸、角鲨烷的产品',
      '医美手段如美塑疗法、PRP等可加速改善'
    ],
    recommendedIngredients: [
      '神经酰胺1/3/6II（必用）',
      '胆甾醇（屏障脂质）',
      '游离脂肪酸（屏障脂质）',
      '透明质酸（深层补水）',
      '泛醇B5（舒缓修护）',
      '玻色因（抗老充盈）',
      '多肽类（信号肽/神经肽）',
      '蓝铜胜肽（修护抗老）'
    ],
    avoidIngredients: [
      { ingredient: '所有去角质成分', reason: '包括果酸、水杨酸、酶类、磨砂等' },
      { ingredient: '视黄醇/类视黄醇', reason: '除非在皮肤科医生指导下，否则可能过度刺激' },
      { ingredient: 'VC和酸类美白', reason: '低pH和高刺激性不适合严重敏感' },
      { ingredient: '酒精/香精', reason: '加速屏障破坏' },
      { ingredient: '防腐剂（MIT/CMIT）', reason: '致敏性防腐剂可能引起接触性皮炎' }
    ],
    toleranceBuilding: [
      { warning: '用任何产品都刺痛', solution: '停止所有产品，只用温水洗脸，等待3-5天让皮肤平静，然后用最简单的保湿霜' },
      { warning: '尝试视黄醇时脱皮严重', solution: '放弃视黄醇，改用更温和的补骨脂酚或多肽类抗老' },
      { warning: '防晒霜导致刺激', solution: '硬防晒为主：帽子、口罩、太阳伞；必要时用纯物理防晒矿物粉' }
    ],
    amRoutine: [
      { step: 1, product: '清水/极简洁面（如Vanicream薇霓珂温和洁面）', keyPoints: ['早晨只用温水', '晚上用APG或烷氧基葡糖苷洁面'] },
      { step: 2, product: '喷雾/依克多因水（如依泉等渗喷雾）', keyPoints: ['可用依克多因增强防护'] },
      { step: 3, product: '透明质酸+神经酰胺精华（如修丽可B5+CEGBF）', keyPoints: ['保湿+修护双效'] },
      { step: 4, product: '屏障修护霜（如适乐肤PM夜间保湿乳）', keyPoints: ['含神经酰胺1/3/6II+胆甾醇'] },
      { step: 5, product: '硬防晒+物理防晒（必要时）', keyPoints: ['优先帽子口罩伞', '防晒粉比霜更温和'] }
    ],
    pmRoutine: [
      { step: 1, product: 'cream卸妆（如化妆）+温和洁面（如Vanicream洁面）', keyPoints: ['不化妆时只用洁面'] },
      { step: 2, product: '水或依克多因水（如修丽可ACE精华喷）', keyPoints: ['皮肤微湿时进入下一步'] },
      { step: 3, product: '屏障修护精华（如Korres希腊酸奶精华）', keyPoints: ['神经酰胺+蓝铜胜肽'] },
      { step: 4, product: '保湿霜/睡眠面膜（如La Roche-Posay滋润霜）', keyPoints: ['可厚敷作为睡眠面膜'] },
      { step: 5, product: '面部油（1-2滴，可选）（如Haba角鲨烷油）', keyPoints: ['角鲨烷或霍霍巴油', '加强锁水'] }
    ],
    affordableProducts: [
      { name: '适乐肤C乳', price: '¥120-150', keyPoints: '含神经酰胺1/3/6II，屏障修护经典', where: '天猫/屈臣氏' },
      { name: 'Vanicream薇霓珂洁面乳', price: '¥100-130', keyPoints: 'APG表活，极简配方，无刺激', where: '天猫/Amazon海外' },
      { name: 'The Ordinary蓝铜胜肽精华', price: '¥80-100', keyPoints: '蓝铜胜肽，修护抗老', where: '天猫/淘宝' },
      { name: '理肤泉B5修复霜', price: '¥120-150', keyPoints: '泛醇B5+积雪草，急救修复', where: '天猫/专柜' }
    ]
  },
  {
    id: 'dsnt',
    code: 'DSNT',
    name: '干性敏感非色素紧致肌',
    emoji: '🟢',
    type: 'DS',
    pigmented: false,
    wrinkle: false,
    profile: 'DSNT是干敏肤质中相对幸运的类型。皮肤虽然敏感干燥，但既没有色素沉着困扰，皮肤也保持紧致。护肤重点在于修护屏障、维持稳定，避免一切可能导致敏感的刺激因素。',
    barrierSymptoms: [
      '皮肤细腻但偏干',
      '容易出现紧绷和脱屑',
      '护肤品使用时有轻微刺痛感',
      '环境变化时皮肤容易泛红',
      '皮肤看起来干净透亮（无色斑）',
      '毛孔细小，皮肤质感好'
    ],
    repairStrategy: [
      '以屏障修护为核心，使用神经酰胺、泛醇、燕麦等成分',
      '加强保湿，选择含有透明质酸、甘油、角鲨烷的产品',
      '避免刺激，保持护肤品成分极简',
      '换季时特别注意皮肤稳定',
      '可适当使用医美手段如舒敏之星、水光针改善干燥'
    ],
    recommendedIngredients: [
      '神经酰胺（屏障修护）',
      '泛醇B5（舒缓）',
      '透明质酸（保湿）',
      '燕麦提取物（抗炎）',
      '积雪草（修复）',
      '角鲨烷（锁水）',
      '甘油（吸湿保湿）',
      '依克多因（防护）'
    ],
    avoidIngredients: [
      { ingredient: '高浓度酸类', reason: '果酸、水杨酸等会剥脱角质，加重干燥敏感' },
      { ingredient: '视黄醇', reason: '除非已建立耐受，否则可能刺激' },
      { ingredient: 'VC原型', reason: '低pH值可能刺激敏感皮肤' },
      { ingredient: '酒精/香精', reason: '挥发性和致敏性成分' },
      { ingredient: '皂基洁面', reason: '高pH值破坏屏障酸性环境' }
    ],
    toleranceBuilding: [
      { warning: '换季时皮肤突然泛红', solution: '提前1-2周加强屏障修护，使用更厚重的面霜' },
      { warning: '使用新产品时轻微刺痒', solution: '先在耳后连续测试3晚，如持续刺痒则放弃该产品' },
      { warning: '皮肤对温度变化敏感', solution: '避免极冷极热的水洗脸，室内使用加湿器' }
    ],
    amRoutine: [
      { step: 1, product: '温和洁面/温水（如CeraVe适乐肤洁面乳）', keyPoints: ['早晨可用温水', '晚上用氨基酸/APG洁面'] },
      { step: 2, product: '保湿喷雾（如雅漾活泉喷雾）', keyPoints: ['可用雅漾/理肤泉喷雾'] },
      { step: 3, product: '保湿精华（如修丽可B5透明质酸精华）', keyPoints: ['透明质酸+泛醇'] },
      { step: 4, product: '保湿面霜（如适乐肤C乳）', keyPoints: ['根据季节选择清爽或滋润质地'] },
      { step: 5, product: '防晒（SPF30+）（如EltaMD SPF46）', keyPoints: ['干敏可选物理或物化结合防晒'] }
    ],
    pmRoutine: [
      { step: 1, product: '温和卸妆+洁面（如Farmacy紫雏菊卸妆）', keyPoints: ['不化妆时省去卸妆步骤'] },
      { step: 2, product: '舒缓爽肤水（如Haba G露润泽柔肤水）', keyPoints: ['用手轻拍促进吸收'] },
      { step: 3, product: '屏障修护精华（如CeraVe神经酰胺精华）', keyPoints: ['神经酰胺+燕麦/泛醇'] },
      { step: 4, product: '滋润面霜/睡眠面膜（如La Roche-Posay特安霜）', keyPoints: ['可2-3泵面霜厚敷'] },
      { step: 5, product: '面部油（可选）（如Haba角鲨烷油）', keyPoints: ['干燥时加1-2滴角鲨烷'] }
    ],
    affordableProducts: [
      { name: 'CeraVe适乐肤保湿洁面乳', price: '¥80-120', keyPoints: '氨基酸表活，温和清洁含神经酰胺', where: '天猫/屈臣氏' },
      { name: '雅漾活泉喷雾', price: '¥80-100', keyPoints: '舒缓敏感，随时补水', where: '天猫/药房' },
      { name: '适乐肤C乳', price: '¥120-150', keyPoints: '含神经酰胺1/3/6II，屏障修护', where: '天猫/屈臣氏' },
      { name: '理肤泉B5面膜', price: '¥100-130/5片', keyPoints: '泛醇B5+积雪草，急救舒缓', where: '天猫/专柜' }
    ]
  },

  // ==================== DR类型（干性耐受）====================
  {
    id: 'drpw',
    code: 'DRPW',
    name: '干性耐受色素皱纹肌',
    emoji: '🟤',
    type: 'DR',
    pigmented: true,
    wrinkle: true,
    profile: 'DRPW型肤质的皮肤相对耐受，可以尝试更多功效性产品。主要问题是色素沉着和皱纹，需要在保湿的基础上积极进行美白和抗老护理。这类皮肤可以使用视黄醇等活性成分，效果通常也比较明显。',
    barrierSymptoms: [
      '皮肤干燥，需要加强保湿',
      '细纹和皱纹逐渐明显',
      '色斑分布较广',
      '皮肤弹性下降',
      '眼角、法令纹处皱纹加深',
      '偶尔使用刺激产品也无明显不适'
    ],
    repairStrategy: [
      '保湿是基础，选择含有透明质酸、甘油、神经酰胺的产品',
      '色素管理：可使用维C、烟酰胺、壬二酸、曲酸等成分',
      '抗老：视黄醇、玻色因、补骨脂酚、多肽类均可尝试',
      '防晒是预防色素和皱纹的关键',
      '可考虑医美如皮秒、光子嫩肤改善色素和皱纹'
    ],
    recommendedIngredients: [
      '视黄醇/类视黄醇（抗老首选）',
      '维C及其衍生物（美白抗氧化）',
      '烟酰胺（美白控油）',
      '玻色因（抗老充盈）',
      '壬二酸（淡斑抗炎）',
      '多肽类（信号肽/神经肽）',
      '透明质酸（保湿）',
      '神经酰胺（屏障）'
    ],
    avoidIngredients: [
      { ingredient: '不适合的产品基本没有', reason: 'DR型皮肤耐受性强，但干燥和敏感是两回事，仍需做好保湿' },
      { ingredient: '过度去角质', reason: '每周不超过2次，避免屏障受损' },
      { ingredient: '不使用防晒', reason: '无论用什么美白抗老产品，不防晒都是徒劳' }
    ],
    toleranceBuilding: [
      { warning: '视黄醇初期脱皮泛红', solution: '从0.025%开始，每周2次，1-2月后每晚使用，建立耐受' },
      { warning: '维C原型使用刺痛', solution: '可选更温和的维C衍生物如抗坏血酸葡糖苷、3-O-乙基抗坏血酸' },
      { warning: '美白产品效果不明显', solution: '坚持3个月以上，配合防晒，必要时叠加多种美白成分' }
    ],
    amRoutine: [
      { step: 1, product: '温和洁面（如CeraVe适乐肤氨基酸洁面）', keyPoints: ['氨基酸洁面即可'] },
      { step: 2, product: '维C精华（如修丽可CE/F错误OR强效维C精华15%）', keyPoints: ['15-20%原型VC或衍生物', '干手干脸使用'] },
      { step: 3, product: '保湿精华（如Olay淡斑小白瓶精华）', keyPoints: ['透明质酸+烟酰胺'] },
      { step: 4, product: '保湿霜/抗老霜（如Olay大红瓶面霜含玻色因）', keyPoints: ['含玻色因或肽类'] },
      { step: 5, product: '防晒SPF30-50（如EltaMD SPF46）', keyPoints: ['广谱防晒', '足量使用'] }
    ],
    pmRoutine: [
      { step: 1, product: '卸妆+洁面（如Farmacy紫雏菊卸妆洁面）', keyPoints: ['彻底清洁'] },
      { step: 2, product: '去角质水（可选）（如Pixi发光水5%果酸）', keyPoints: ['每周1-2次', '含低浓度果酸或酵母水'] },
      { step: 3, product: '视黄醇精华（如露得清视黄醇晚霜0.1-0.5%）', keyPoints: ['0.025-0.1%浓度', '避眼周和唇周'] },
      { step: 4, product: '保湿霜（如适乐肤C乳含神经酰胺）', keyPoints: ['神经酰胺+透明质酸'] },
      { step: 5, product: '眼霜（多肽/玻色因）（如Olay玉龄眼霜）', keyPoints: ['抗老眼霜'] }
    ],
    affordableProducts: [
      { name: '露得清视黄醇晚霜', price: '¥100-150', keyPoints: '0.1-0.5%视黄醇，抗皱入门', where: '天猫/屈臣氏' },
      { name: 'Olay光感小白瓶', price: '¥150-200', keyPoints: '烟酰胺5%+SDL美白淡斑', where: '天猫/专柜' },
      { name: 'The Ordinary维C悬浮液23%+HA', price: '¥60-80', keyPoints: '23%原型VC，强效抗氧化', where: '天猫/淘宝' },
      { name: 'Olay大红瓶面霜', price: '¥180-230', keyPoints: '烟酰胺+玻色因，抗老提亮', where: '天猫/专柜' }
    ]
  },
  {
    id: 'drpt',
    code: 'DRPT',
    name: '干性耐受色素紧致肌',
    emoji: '🔵',
    type: 'DR',
    pigmented: true,
    wrinkle: false,
    profile: 'DRPT型肤质状态良好，皮肤紧致有弹性，但色素沉着是主要的美观问题。可以放心尝试各种美白成分，重点在于预防新的色斑产生，同时积极淡化已有的色斑。',
    barrierSymptoms: [
      '皮肤状态相对稳定',
      '主要困扰是色斑',
      '肤色不均',
      '痘印难以消退',
      '日晒后容易变黑',
      '皮肤质感细腻'
    ],
    repairStrategy: [
      '防晒是重中之重，UVA导致色素加深',
      '可积极使用美白成分：维C、烟酰胺、壬二酸、曲酸、凝血酸等',
      '选择含有淡斑成分的精华或面霜',
      '对顽固色斑可考虑医美如皮秒、超皮秒',
      '保持皮肤保湿，维持皮肤健康状态'
    ],
    recommendedIngredients: [
      '维C及其衍生物（美白抗氧化）',
      '烟酰胺（美白控油）',
      '壬二酸（淡斑抗炎）',
      '曲酸（抑制酪氨酸酶）',
      '凝血酸（美白淡斑）',
      '4-丁基间苯二酚（淡斑）',
      '光甘草定（温和美白）',
      '传明酸（美白）'
    ],
    avoidIngredients: [
      { ingredient: '忽视防晒', reason: '任何美白护理都需要防晒配合' },
      { ingredient: '过度摩擦皮肤', reason: '摩擦会导致炎症后色素沉着' },
      { ingredient: '使用三无产品', reason: '可能含有激素或汞等有害成分' }
    ],
    toleranceBuilding: [
      { warning: '维C原型使用刺痛', solution: '从低浓度开始，耐受后增加浓度；或改用更温和的衍生物' },
      { warning: '叠加多种美白成分刺激', solution: '最多2-3种美白成分叠加，避免过度刺激' },
      { warning: '色斑淡化缓慢', solution: '美白需要耐心，通常需要3-6个月才能看到明显效果' }
    ],
    amRoutine: [
      { step: 1, product: '洁面（如CeraVe适乐肤氨基酸洁面）', keyPoints: ['温和洁面即可'] },
      { step: 2, product: '维C精华（如修丽可CE/F强效维C精华）', keyPoints: ['美白抗氧化双重功效'] },
      { step: 3, product: '美白精华（如Olay淡斑小白瓶）', keyPoints: ['烟酰胺+壬二酸或其他'] },
      { step: 4, product: '保湿霜（如适乐肤C乳）', keyPoints: ['轻薄质地即可'] },
      { step: 5, product: '防晒SPF50（如EltaMD SPF46）', keyPoints: ['PA++++', '足量使用，每2小时补涂'] }
    ],
    pmRoutine: [
      { step: 1, product: '卸妆+洁面（如Farmacy紫雏菊卸妆）', keyPoints: ['彻底清洁'] },
      { step: 2, product: '美白精华（加强）（如Olay光感小白瓶）', keyPoints: ['可使用更高浓度或叠加'] },
      { step: 3, product: '壬二酸精华（可选）（如The Ordinary壬二酸10%）', keyPoints: ['全脸使用预防新色斑'] },
      { step: 4, product: '保湿霜（如适乐肤C乳含神经酰胺）', keyPoints: ['含神经酰胺更好'] },
      { step: 5, product: '局部淡斑（顽固色斑）（如Olay淡斑精华）', keyPoints: ['氢醌需医生指导', '或用更高浓度淡斑产品'] }
    ],
    affordableProducts: [
      { name: 'Olay光感小白瓶', price: '¥150-200', keyPoints: '烟酰胺5%+SDL美白淡斑', where: '天猫/专柜' },
      { name: 'The Ordinary壬二酸凝胶10%', price: '¥70-90', keyPoints: '壬二酸淡斑抗炎', where: '天猫/淘宝' },
      { name: 'Olay淡斑小白瓶', price: '¥180-230', keyPoints: '烟酰胺+SDL+有色人种适用', where: '天猫/专柜' },
      { name: '理肤泉K+精华', price: '¥150-180', keyPoints: '水杨酸+辛酰水杨酸，控油淡斑', where: '天猫/专柜' }
    ]
  },
  {
    id: 'drnw',
    code: 'DRNW',
    name: '干性耐受非色素皱纹肌',
    emoji: '🟣',
    type: 'DR',
    pigmented: false,
    wrinkle: true,
    profile: 'DRNW型肤质没有色素问题的困扰，皮肤耐受性好，可以放心使用各种抗衰老成分。主要挑战是保湿和抗皱，需要在保湿的基础上积极进行抗老护理。',
    barrierSymptoms: [
      '皮肤干燥明显',
      '皱纹和细纹突出',
      '皮肤弹性下降',
      '眼角和额头细纹加深',
      '皮肤松弛下垂',
      '使用功效成分相对安全'
    ],
    repairStrategy: [
      '保湿和抗老并重',
      '视黄醇是抗皱金标准，可放心使用',
      '玻色因、胜肽类可增强抗老效果',
      '可考虑医美如热玛吉、射频、超声刀等改善松弛',
      '严格防晒延缓皮肤老化'
    ],
    recommendedIngredients: [
      '视黄醇/类视黄醇（必用）',
      '玻色因（抗老充盈）',
      '多肽类（信号肽/神经肽）',
      '透明质酸（保湿）',
      '神经酰胺（屏障）',
      '辅酶Q10（抗氧化）',
      '麦角硫因（抗氧化）',
      '补骨脂酚（植物A醇）'
    ],
    avoidIngredients: [
      { ingredient: '忽视保湿', reason: 'DR皮肤虽然耐受，但干燥会加重皱纹' },
      { ingredient: '不使用防晒', reason: '紫外线是皮肤老化的主要原因' },
      { ingredient: '过度追求猛药', reason: '视黄醇0.5-1%足矣，更高浓度副作用大' }
    ],
    toleranceBuilding: [
      { warning: '视黄醇使用初期脱皮', solution: '这是正常的A醇化过程，用量减半，延长间隔' },
      { warning: '与酸类产品叠加刺激', solution: '视黄醇不要和果酸、水杨酸等同时使用，分开早晚或间隔日' },
      { warning: '眼周使用视黄醇刺激', solution: '避开眼周，单独使用眼霜' }
    ],
    amRoutine: [
      { step: 1, product: '温和洁面（如CeraVe适乐肤氨基酸洁面）', keyPoints: ['氨基酸表活'] },
      { step: 2, product: '抗氧化精华（如修丽可CE阿魏酸精华）', keyPoints: ['麦角硫因/辅酶Q10'] },
      { step: 3, product: '保湿精华（如修丽可B5透明质酸精华）', keyPoints: ['透明质酸+神经酰胺'] },
      { step: 4, product: '抗老面霜（如Olay大红瓶面霜含玻色因）', keyPoints: ['含玻色因/多肽'] },
      { step: 5, product: '防晒SPF30-50（如EltaMD SPF46）', keyPoints: ['广谱防晒'] }
    ],
    pmRoutine: [
      { step: 1, product: '卸妆+洁面（如Farmacy紫雏菊卸妆洁面）', keyPoints: ['彻底清洁'] },
      { step: 2, product: '去角质（可选）（如Pixi发光水5%果酸）', keyPoints: ['每周1-2次果酸/酶类'] },
      { step: 3, product: '视黄醇精华（如露得清视黄醇晚霜0.25-0.5%）', keyPoints: ['从低浓度开始', '每晚使用后可增加到'] },
      { step: 4, product: '保湿霜（如Olay大红瓶空气霜）', keyPoints: ['滋润型面霜'] },
      { step: 5, product: '眼霜（抗皱）（如Olay玉龄眼霜）', keyPoints: ['含视黄醇或多肽'] }
    ],
    affordableProducts: [
      { name: '露得清视黄醇晚霜', price: '¥100-150', keyPoints: '0.1-0.5%视黄醇，抗皱入门经典', where: '天猫/屈臣氏' },
      { name: 'Olay大红瓶面霜', price: '¥180-230', keyPoints: '烟酰胺+玻色因，抗老充盈', where: '天猫/专柜' },
      { name: 'The Ordinary Buffet多肽精华', price: '¥80-100', keyPoints: 'Matrixyl 3000+Argireline', where: '天猫/淘宝' },
      { name: '修丽可B5透明质酸精华', price: '¥200-250', keyPoints: '透明质酸+维生素B5，深层保湿', where: '天猫/专柜' }
    ]
  },
  {
    id: 'drnt',
    code: 'DRNT',
    name: '干性耐受非色素紧致肌',
    emoji: '⚪',
    type: 'DR',
    pigmented: false,
    wrinkle: false,
    profile: 'DRNT是状态最好的肤质类型之一。皮肤既不敏感也没有色素问题和皱纹困扰。主要目标是维持现状、延缓衰老，保持皮肤的健康和年轻状态。',
    barrierSymptoms: [
      '皮肤状态稳定',
      '主要需求是维持',
      '偶尔干燥',
      '皮肤质感细腻',
      '紧致有弹性',
      '毛孔细致'
    ],
    repairStrategy: [
      '护肤目标以预防为主',
      '基础保湿+抗氧化即可',
      '可偶尔使用视黄醇预防衰老',
      '温和去角质维持皮肤代谢',
      '严格防晒延缓衰老'
    ],
    recommendedIngredients: [
      '透明质酸（保湿）',
      '神经酰胺（维持屏障）',
      '维C（抗氧化预防）',
      '多肽类（预防性抗老）',
      '辅酶Q10（抗氧化）',
      '麦角硫因（抗氧化）',
      '温和果酸（代谢）',
      '补骨脂酚（温和抗老）'
    ],
    avoidIngredients: [
      { ingredient: '过度护肤', reason: '简单有效的routine即可' },
      { ingredient: '频繁更换产品', reason: '找到适合的产品后坚持使用' },
      { ingredient: '不使用防晒', reason: '预防永远大于治疗' }
    ],
    toleranceBuilding: [
      { warning: '尝试新产品时皮肤突然不适', solution: '一次只换一种产品，观察1-2周确认安全' },
      { warning: '换季时皮肤轻微干燥', solution: '增加保湿产品用量或更换更滋润的质地' },
      { warning: '长期不护肤皮肤变差', solution: '坚持基础护肤：清洁+保湿+防晒' }
    ],
    amRoutine: [
      { step: 1, product: '洁面（如CeraVe适乐肤氨基酸洁面）', keyPoints: ['温和洁面'] },
      { step: 2, product: '维C精华（可选）（如修丽可CE阿魏酸精华）', keyPoints: ['抗氧化预防'] },
      { step: 3, product: '保湿精华/乳（如修丽可B5+CEGBF）', keyPoints: ['透明质酸+神经酰胺'] },
      { step: 4, product: '保湿霜（如适乐肤C乳）', keyPoints: ['根据季节调整质地'] },
      { step: 5, product: '防晒SPF30（如EltaMD SPF46）', keyPoints: ['每日使用'] }
    ],
    pmRoutine: [
      { step: 1, product: '卸妆+洁面（如Farmacy紫雏菊卸妆）', keyPoints: ['彻底清洁'] },
      { step: 2, product: '去角质（每周1次）（如Pixi发光水）', keyPoints: ['果酸棉片或酶类'] },
      { step: 3, product: '保湿精华（如The Ordinary Buffet多肽）', keyPoints: ['如有需求可加胜肽精华'] },
      { step: 4, product: '保湿霜/抗老霜（如Olay大红瓶面霜）', keyPoints: ['普通保湿或低浓度A醇'] },
      { step: 5, product: '眼霜（如Olay玉龄眼霜）', keyPoints: ['基础保湿眼霜即可'] }
    ],
    affordableProducts: [
      { name: 'CeraVe适乐肤保湿洁面乳', price: '¥80-120', keyPoints: '氨基酸表活，温和清洁', where: '天猫/屈臣氏' },
      { name: 'Olay光感小白瓶', price: '¥150-200', keyPoints: '烟酰胺抗氧化', where: '天猫/专柜' },
      { name: 'The Ordinary Buffet多肽精华', price: '¥80-100', keyPoints: 'Matrixyl 3000抗老', where: '天猫/淘宝' },
      { name: '适乐肤C乳', price: '¥120-150', keyPoints: '含神经酰胺，基础保湿', where: '天猫/屈臣氏' }
    ]
  },

  // ==================== OS类型（油性敏感）====================
  {
    id: 'ospw',
    code: 'OSPW',
    name: '油性敏感色素皱纹肌',
    emoji: '🔴🟤',
    type: 'OS',
    pigmented: true,
    wrinkle: true,
    profile: 'OSPW是最具挑战性的肤质类型之一。外油内干的矛盾状态，敏感与油腻并存，同时面临色素沉着和皱纹的双重困扰。需要分区护理、精准护肤，在控油和保湿之间找到平衡。',
    barrierSymptoms: [
      'T区油光明显但两颊干燥',
      '使用控油产品刺痛',
      '皮肤泛红敏感',
      '同时有痘痘和色斑',
      '毛孔粗大且有黑头',
      '眼角出现细纹但额头泛油'
    ],
    repairStrategy: [
      '修护屏障是首要任务，油性敏感比干性敏感更难处理',
      '分区护理：T区控油，两颊修复屏障',
      '选择温和的控油成分：烟酰胺、壬二酸',
      '严格防晒，物理防晒剂对敏感肌更友好',
      '色素和皱纹管理需要等屏障稳定后再进行'
    ],
    recommendedIngredients: [
      '烟酰胺（控油+美白+修护）',
      '壬二酸（控油+淡斑+抗炎）',
      '神经酰胺（两颊修护）',
      '泛醇B5（舒缓）',
      '透明质酸（轻薄保湿）',
      '燕麦提取物（舒缓）',
      '多肽类（温和抗老）',
      '依克多因（防护）'
    ],
    avoidIngredients: [
      { ingredient: '高浓度酒精', reason: '虽然控油但加速水分流失，加重外油内干' },
      { ingredient: '高浓度酸类', reason: '过度剥脱破坏屏障，加重敏感' },
      { ingredient: '皂基洁面', reason: '高pH值破坏屏障，刺激皮脂腺分泌更多油脂' },
      { ingredient: '强效去角质产品', reason: '敏感皮肤承受不住' },
      { ingredient: '视黄醇（除非建立耐受）', reason: '可能过度刺激，加重敏感' }
    ],
    toleranceBuilding: [
      { warning: '使用壬二酸时刺痛泛红', solution: '从10%浓度开始，前两周只在晚上使用，每次等皮肤完全干燥后使用' },
      { warning: '烟酰胺导致泛红', solution: '选择纯度高的烟酰胺产品，从3%开始，隔天使用' },
      { warning: '控油产品让皮肤更干更油', solution: '控油和保湿要同步，使用含透明质酸+神经酰胺的控油产品' }
    ],
    amRoutine: [
      { step: 1, product: '温和洁面（APG/氨基酸）（如Vanicream薇霓珂洁面）', keyPoints: ['两颊轻洗，T区可多揉搓'] },
      { step: 2, product: '舒缓爽肤水（分区）（如理肤泉蓝水+T区控油水）', keyPoints: ['两颊可用燕麦水，T区用控油水'] },
      { step: 3, product: '烟酰胺精华（全脸）（如Olay光感小白瓶5%）', keyPoints: ['控油+美白双效', '从5%开始'] },
      { step: 4, product: '分区保湿（如T区适乐肤乳液+两颊C乳）', keyPoints: ['T区用轻薄gel，两颊用cream'] },
      { step: 5, product: '物理防晒（如EltaMD UV Clear SPF46）', keyPoints: ['氧化锌同时控油'] }
    ],
    pmRoutine: [
      { step: 1, product: '温和卸妆+洁面（如Farmacy紫雏菊卸妆）', keyPoints: ['不化妆时可用洁面卸妆'] },
      { step: 2, product: '壬二酸凝胶（T区+色斑）（如The Ordinary壬二酸10%）', keyPoints: ['壬二酸有控油+淡斑功效', '可只点涂或局部使用'] },
      { step: 3, product: '屏障修护精华（两颊）（如CeraVe神经酰胺精华）', keyPoints: ['神经酰胺+泛醇'] },
      { step: 4, product: '轻薄保湿霜（如La Roche-Posay特安乳）', keyPoints: ['含神经酰胺的gel霜'] },
      { step: 5, product: '眼霜（多肽）（如Olay玉龄眼霜）', keyPoints: ['抗老眼霜，避开T区'] }
    ],
    affordableProducts: [
      { name: 'Olay光感小白瓶', price: '¥150-200', keyPoints: '烟酰胺5%控油美白', where: '天猫/专柜' },
      { name: 'The Ordinary壬二酸凝胶10%', price: '¥70-90', keyPoints: '壬二酸控油淡斑', where: '天猫/淘宝' },
      { name: 'CeraVe适乐肤PM夜间乳液', price: '¥100-130', keyPoints: '含神经酰胺，轻薄保湿', where: '天猫/屈臣氏' },
      { name: '适乐肤C乳', price: '¥120-150', keyPoints: '含神经酰胺1/3/6II', where: '天猫/屈臣氏' }
    ]
  },
  {
    id: 'ospt',
    code: 'OSPT',
    name: '油性敏感色素紧致肌',
    emoji: '🔵🟤',
    type: 'OS',
    pigmented: true,
    wrinkle: false,
    profile: 'OSPT型肤质虽然皮肤紧致，但油敏肌带来的出油、泛红、刺痛等问题与色斑并存。需要在温和控油、修护屏障的同时进行色素管理。',
    barrierSymptoms: [
      '皮肤出油但容易泛红',
      '使用护肤品时常有刺痛感',
      '色斑问题突出',
      '肤色不均暗沉',
      '毛孔粗大易堵塞',
      '换季时皮肤不稳定'
    ],
    repairStrategy: [
      '温和控油，避免过度清洁导致代偿性出油',
      '修护屏障，选择含神经酰胺、泛醇的轻薄产品',
      '美白选择相对温和的成分：烟酰胺、壬二酸',
      '防晒以物理防晒剂为主，减少刺激',
      '避免一切可能导致敏感的刺激因素'
    ],
    recommendedIngredients: [
      '烟酰胺（控油+美白）',
      '壬二酸（控油+淡斑）',
      '神经酰胺（修护）',
      '泛醇B5（舒缓）',
      '燕麦提取物（抗炎）',
      '凝血酸（美白）',
      '光甘草定（温和美白）',
      '依克多因（防护）'
    ],
    avoidIngredients: [
      { ingredient: '皂基/SLS洁面', reason: '过度清洁破坏屏障，加重出油' },
      { ingredient: '高浓度酸类', reason: '壬二酸可接受，避免果酸和水杨酸' },
      { ingredient: '酒精/收敛水', reason: '加速水分蒸发，加重外油内干' },
      { ingredient: '原型VC', reason: '低pH值刺激敏感皮肤' },
      { ingredient: '视黄醇', reason: '除非已建立耐受' }
    ],
    toleranceBuilding: [
      { warning: '壬二酸使用刺痛', solution: '从10%开始，前两周只用5分钟洗掉，慢慢延长' },
      { warning: '出油后皮肤暗沉', solution: '使用吸油纸+补水喷雾，控油和补水同步' },
      { warning: '美白精华刺激', solution: '选择无酒精、无香精的敏感肌适用美白产品' }
    ],
    amRoutine: [
      { step: 1, product: '温和洁面（如Vanicream薇霓珂洁面）', keyPoints: ['氨基酸/APG表活', '30秒内完成'] },
      { step: 2, product: '舒缓控油爽肤水（如曼秀雷敦控油爽肤水）', keyPoints: ['烟酰胺+金缕梅'] },
      { step: 3, product: '烟酰胺精华（如Olay光感小白瓶5-10%）', keyPoints: ['5-10%浓度'] },
      { step: 4, product: '轻薄保湿（神经酰胺）（如适乐肤PM乳液）', keyPoints: ['gel状质地'] },
      { step: 5, product: '物理防晒（如EltaMD UV Clear SPF46）', keyPoints: ['氧化锌+二氧化钛'] }
    ],
    pmRoutine: [
      { step: 1, product: '卸妆+洁面（如Farmacy紫雏菊卸妆）', keyPoints: ['不化妆时只用洁面'] },
      { step: 2, product: '壬二酸凝胶（如The Ordinary壬二酸10%）', keyPoints: ['壬二酸控油+淡斑', '点涂或局部'] },
      { step: 3, product: '保湿精华（如修丽可B5透明质酸精华）', keyPoints: ['透明质酸+泛醇'] },
      { step: 4, product: '轻薄保湿霜（如La Roche-Posay特安乳）', keyPoints: ['神经酰胺cream'] },
      { step: 5, product: '局部淡斑（如需要）（如Olay淡斑小白瓶）', keyPoints: ['壬二酸可全脸，烟酰胺点涂'] }
    ],
    affordableProducts: [
      { name: 'Olay光感小白瓶', price: '¥150-200', keyPoints: '烟酰胺5-10%控油美白', where: '天猫/专柜' },
      { name: 'The Ordinary壬二酸凝胶10%', price: '¥70-90', keyPoints: '壬二酸控油淡斑抗炎', where: '天猫/淘宝' },
      { name: '适乐肤PM夜间乳液', price: '¥100-130', keyPoints: '含神经酰胺，轻薄保湿', where: '天猫/屈臣氏' },
      { name: '理肤泉蓝水', price: '¥120-150', keyPoints: '烟酰胺+金缕梅控油舒缓', where: '天猫/专柜' }
    ]
  },
  {
    id: 'osnw',
    code: 'OSNW',
    name: '油性敏感非色素皱纹肌',
    emoji: '🔴🟣',
    type: 'OS',
    pigmented: false,
    wrinkle: true,
    profile: 'OSNW型肤质虽然不会有色素沉着困扰，但外油内干和敏感是主要问题。皮肤出油但屏障受损，需要分区护理，同时关注抗衰老护理。',
    barrierSymptoms: [
      'T区油腻但两颊干燥紧绷',
      '用控油产品刺痛不适',
      '皮肤泛红敏感',
      '眼角出现细纹',
      '法令纹处皮肤松弛',
      '换季时皮肤不稳定'
    ],
    repairStrategy: [
      '分区护理是关键，T区和U区分开处理',
      '屏障修护是首位，选择神经酰胺、泛醇等成分',
      '控油选择温和成分：烟酰胺、壬二酸',
      '抗老选择温和的多肽类，谨慎使用视黄醇',
      '保湿和控油并重，找到皮肤的水油平衡'
    ],
    recommendedIngredients: [
      '烟酰胺（控油+修护）',
      '壬二酸（控油+抗老）',
      '神经酰胺（两颊修护）',
      '泛醇B5（舒缓）',
      '多肽类（抗老）',
      '透明质酸（保湿）',
      '燕麦提取物（抗炎）',
      '玻色因（温和抗老）'
    ],
    avoidIngredients: [
      { ingredient: '皂基洁面', reason: '破坏屏障，代偿性出油' },
      { ingredient: '高浓度酒精', reason: '加速水分流失' },
      { ingredient: '水杨酸/果酸', reason: '剥脱角质加重敏感' },
      { ingredient: '视黄醇（未建立耐受）', reason: '刺激性强' },
      { ingredient: '磨砂/去角质产品', reason: '物理刺激可能损伤屏障' }
    ],
    toleranceBuilding: [
      { warning: 'T区油光无法控制', solution: '用吸油纸按压+补水喷雾，2-3小时后补涂控油精华' },
      { warning: '两颊用任何产品都刺痛', solution: '只用最基础的保湿霜（神经酰胺+透明质酸），等屏障稳定再加其他' },
      { warning: '尝试抗老产品时过敏', solution: '从眼霜开始建立耐受，再逐步扩展到全脸' }
    ],
    amRoutine: [
      { step: 1, product: '温和洁面（如Vanicream薇霓珂洁面）', keyPoints: ['分区洗，T区30秒，U区轻洗'] },
      { step: 2, product: '舒缓爽肤水（如理肤泉蓝水+燕麦水）', keyPoints: ['U区可用燕麦水，T区用控油水'] },
      { step: 3, product: '烟酰胺精华（全脸）（如Olay光感小白瓶5%）', keyPoints: ['从5%开始'] },
      { step: 4, product: '分区保湿（如T区适乐肤PM乳+U区C乳）', keyPoints: ['T区用gel，U区用cream'] },
      { step: 5, product: '物理防晒（如EltaMD UV Clear SPF46）', keyPoints: ['氧化锌有控油效果'] }
    ],
    pmRoutine: [
      { step: 1, product: '温和卸妆+洁面（如Farmacy紫雏菊卸妆）', keyPoints: ['彻底但不过度'] },
      { step: 2, product: '壬二酸凝胶（可选）（如The Ordinary壬二酸10%）', keyPoints: ['壬二酸有温和抗老功效'] },
      { step: 3, product: '屏障修护精华（U区加强）（如CeraVe神经酰胺精华）', keyPoints: ['神经酰胺+泛醇'] },
      { step: 4, product: '分区保湿（如La Roche-Posay特安乳）', keyPoints: ['T区轻薄，两颊滋润'] },
      { step: 5, product: '眼霜（多肽）（如Olay玉龄眼霜）', keyPoints: ['抗老眼霜'] }
    ],
    affordableProducts: [
      { name: 'Olay玉龄眼霜', price: '¥200-250', keyPoints: '多肽抗老眼霜，温和', where: '天猫/专柜' },
      { name: 'CeraVe适乐肤PM乳液', price: '¥100-130', keyPoints: '含神经酰胺，轻薄保湿', where: '天猫/屈臣氏' },
      { name: 'The Ordinary蓝铜胜肽精华', price: '¥80-100', keyPoints: '温和抗老修护', where: '天猫/淘宝' },
      { name: '理肤泉蓝水', price: '¥120-150', keyPoints: '控油舒缓', where: '天猫/专柜' }
    ]
  },
  {
    id: 'osnt',
    code: 'OSNT',
    name: '油性敏感非色素紧致肌',
    emoji: '🟢',
    type: 'OS',
    pigmented: false,
    wrinkle: false,
    profile: 'OSNT型肤质虽然出油和敏感，但既没有色素问题也没有皱纹困扰。皮肤相对紧致，主要挑战是外油内干的矛盾状态和容易敏感的特质。',
    barrierSymptoms: [
      'T区出油明显',
      '两颊容易泛红干燥',
      '用护肤品偶尔刺痛',
      '换季时皮肤不稳定',
      '毛孔粗大',
      '偶尔长痘'
    ],
    repairStrategy: [
      '分区护理是核心，T区控油，U区保湿修护',
      '选择温和的洁面和控油产品',
      '屏障修护是保持皮肤稳定的关键',
      '维持现状，避免过度护肤导致敏感加重',
      '医美如光子嫩肤可改善泛红和毛孔'
    ],
    recommendedIngredients: [
      '烟酰胺（控油+修护）',
      '壬二酸（控油+抗炎）',
      '神经酰胺（修护屏障）',
      '泛醇B5（舒缓）',
      '透明质酸（保湿）',
      '燕麦提取物（抗炎）',
      '依克多因（防护）',
      '金缕梅（控油收敛）'
    ],
    avoidIngredients: [
      { ingredient: '皂基洁面', reason: '高pH值破坏屏障，油脂越洗越多' },
      { ingredient: '高浓度酒精', reason: '加速水分蒸发，加重干燥' },
      { ingredient: '过度去角质', reason: '包括化学和物理去角质' },
      { ingredient: '含SLS/SLES的洁面', reason: '刺激性强' },
      { ingredient: '香精/酒精产品', reason: '可能的刺激源' }
    ],
    toleranceBuilding: [
      { warning: '出油后皮肤暗沉发黄', solution: '用吸油纸+抗氧化精华（含麦角硫因）' },
      { warning: '换季时皮肤突然泛红敏感', solution: '提前换成更温和的护肤品，加强屏障修护' },
      { warning: '护肤品吸收不好', solution: '可能是角质堆积或屏障受损，先修护屏障' }
    ],
    amRoutine: [
      { step: 1, product: '温和洁面（如Vanicream薇霓珂洁面）', keyPoints: ['APG或氨基酸表活'] },
      { step: 2, product: '控油爽肤水（如理肤泉蓝水）', keyPoints: ['烟酰胺+金缕梅'] },
      { step: 3, product: '烟酰胺精华（如Olay光感小白瓶5-10%）', keyPoints: ['控油+修护'] },
      { step: 4, product: '轻薄保湿（如适乐肤PM乳液）', keyPoints: ['gel状，含神经酰胺'] },
      { step: 5, product: '防晒（如EltaMD UV Clear SPF46）', keyPoints: ['物化结合或纯物理'] }
    ],
    pmRoutine: [
      { step: 1, product: '卸妆+洁面（如Farmacy紫雏菊卸妆）', keyPoints: ['不化妆时只用洁面'] },
      { step: 2, product: '舒缓爽肤水（如理肤泉蓝水）', keyPoints: ['燕麦/泛醇型'] },
      { step: 3, product: '壬二酸凝胶（可选）（如The Ordinary壬二酸10%）', keyPoints: ['控油抗炎，每周2-3次'] },
      { step: 4, product: '保湿精华+霜（如修丽可B5+适乐肤C乳）', keyPoints: ['两颊加强'] },
      { step: 5, product: '面部油（仅限干燥区，1滴）（如Haba角鲨烷油）', keyPoints: ['角鲨烷或霍霍巴油'] }
    ],
    affordableProducts: [
      { name: 'Olay光感小白瓶', price: '¥150-200', keyPoints: '烟酰胺控油美白提亮', where: '天猫/专柜' },
      { name: 'The Ordinary壬二酸凝胶10%', price: '¥70-90', keyPoints: '壬二酸控油抗炎', where: '天猫/淘宝' },
      { name: '适乐肤PM乳液', price: '¥100-130', keyPoints: '含神经酰胺，轻薄保湿', where: '天猫/屈臣氏' },
      { name: '理肤泉蓝水', price: '¥120-150', keyPoints: '烟酰胺+金缕梅控油', where: '天猫/专柜' }
    ]
  },

  // ==================== OR类型（油性耐受）====================
  {
    id: 'orpw',
    code: 'ORPW',
    name: '油性耐受色素皱纹肌',
    emoji: '⚫🟤',
    type: 'OR',
    pigmented: true,
    wrinkle: true,
    profile: 'ORPW是油性肤质中需要重点关注抗老和美白的类型。皮肤耐受性好，可以尝试各种功效性成分，但出油和毛孔问题是持续挑战。',
    barrierSymptoms: [
      '全天泛油光',
      '毛孔粗大明显',
      '色斑和痘印',
      '皮肤弹性下降',
      '法令纹和眼角皱纹',
      '肤色暗沉不均'
    ],
    repairStrategy: [
      '控油是基础，选择含有水杨酸、烟酰胺的产品',
      '积极美白：维C、壬二酸、曲酸、凝血酸等',
      '抗老可以使用视黄醇，效果通常明显',
      '抗氧化护理防止油脂氧化导致暗沉',
      '防晒必须严格，减缓色斑和皱纹的产生'
    ],
    recommendedIngredients: [
      '水杨酸（控油疏通）',
      '视黄醇（抗老+控油）',
      '维C及其衍生物（美白抗氧化）',
      '烟酰胺（控油美白）',
      '壬二酸（控油淡斑）',
      '多肽类（抗老）',
      '玻色因（抗老充盈）',
      '酵母提取物（代谢提亮）'
    ],
    avoidIngredients: [
      { ingredient: '过于油腻的产品', reason: '使用后皮肤负担重，可能致痘' },
      { ingredient: '不使用防晒', reason: '出油多更容易忽视防晒，但这恰恰最重要' },
      { ingredient: '用手摸脸/挤痘', reason: '导致色素沉着和疤痕' }
    ],
    toleranceBuilding: [
      { warning: '视黄醇使用初期爆痘', solution: '这是正常的"A醇爆痘期"，继续使用2-4周，配合控油' },
      { warning: '维C原型使用刺痛', solution: '干手干脸使用，或改用衍生物' },
      { warning: '控油产品用后干燥脱皮', solution: '配合保湿，但不要用太滋润的产品' }
    ],
    amRoutine: [
      { step: 1, product: '控油洁面（如CeraVe水杨酸洁面）', keyPoints: ['水杨酸洁面或氨基酸洁面'] },
      { step: 2, product: '去角质水（可选）（如Pixi发光水5%果酸）', keyPoints: ['油皮可用含酸的爽肤水'] },
      { step: 3, product: '维C精华（如修丽可CE阿魏酸精华）', keyPoints: ['抗氧化+美白'] },
      { step: 4, product: '控油精华/乳（如Olay淡斑小白瓶）', keyPoints: ['烟酰胺+壬二酸'] },
      { step: 5, product: '防晒SPF30-50（如EltaMD SPF46）', keyPoints: ['控油型防晒'] }
    ],
    pmRoutine: [
      { step: 1, product: '卸妆+洁面（如Farmacy紫雏菊卸妆）', keyPoints: ['双重清洁（如化妆）'] },
      { step: 2, product: '水杨酸/果酸（每周2-3次）（如Stridex棉片绿盒）', keyPoints: ['疏通毛孔'] },
      { step: 3, product: '视黄醇精华（如露得清视黄醇晚霜）', keyPoints: ['抗老+控油'] },
      { step: 4, product: '控油保湿乳（如理肤泉MAT乳）', keyPoints: ['轻薄质地'] },
      { step: 5, product: '眼霜（如Olay玉龄眼霜）', keyPoints: ['抗老眼霜'] }
    ],
    affordableProducts: [
      { name: '露得清视黄醇晚霜', price: '¥100-150', keyPoints: '视黄醇抗老控油', where: '天猫/屈臣氏' },
      { name: 'Olay淡斑小白瓶', price: '¥180-230', keyPoints: '烟酰胺+SDL美白淡斑', where: '天猫/专柜' },
      { name: 'The Ordinary水杨酸2%+锌', price: '¥30-50', keyPoints: '水杨酸控油疏通', where: '天猫/淘宝' },
      { name: 'Stridex水杨酸棉片（绿盒）', price: '¥60-80', keyPoints: '2%水杨酸控油去角质', where: '天猫/Amazon' }
    ]
  },
  {
    id: 'orpt',
    code: 'ORPT',
    name: '油性耐受色素紧致肌',
    emoji: '⚫🔵',
    type: 'OR',
    pigmented: true,
    wrinkle: false,
    profile: 'ORPT型肤质状态良好，皮肤紧致有弹性。主要挑战是色素沉着问题，如色斑、痘印、肤色不均等。可以积极使用美白成分，同时保持皮肤清爽。',
    barrierSymptoms: [
      '皮肤油腻有光泽',
      '毛孔粗大',
      '色斑/痘印明显',
      '肤色不均暗沉',
      '偶尔长痘',
      '皮肤质感较好'
    ],
    repairStrategy: [
      '控油+美白双管齐下',
      '积极使用美白成分：维C、壬二酸、曲酸、凝血酸等',
      '防晒必须严格，UVA是色素加深的主要原因',
      '可使用酸类加强代谢',
      '顽固色斑可考虑医美皮秒'
    ],
    recommendedIngredients: [
      '水杨酸（控油代谢）',
      '维C及其衍生物（美白抗氧化）',
      '烟酰胺（控油美白）',
      '壬二酸（控油淡斑）',
      '曲酸（抑制黑色素）',
      '凝血酸（美白淡斑）',
      '4-丁基间苯二酚（淡斑）',
      '传明酸（美白）'
    ],
    avoidIngredients: [
      { ingredient: '过于滋润的产品', reason: '导致闭口和痘痘' },
      { ingredient: '不使用防晒', reason: '一切美白努力都白费' },
      { ingredient: '用手挤压色斑/痘痘', reason: '导致炎症后色素沉着' }
    ],
    toleranceBuilding: [
      { warning: '酸类美白刺激', solution: '壬二酸相对温和，可从10%开始；曲酸建议和其他产品搭配' },
      { warning: '叠加多种美白成分刺痛', solution: '最多2-3种，间隔使用（如早上维C，晚上壬二酸）' },
      { warning: '美白效果慢', solution: '坚持3-6个月，配合防晒，顽固色斑考虑医美' }
    ],
    amRoutine: [
      { step: 1, product: '控油洁面', keyPoints: ['水杨酸或氨基酸'] },
      { step: 2, product: '去角质水（可选）', keyPoints: ['含低浓度酸'] },
      { step: 3, product: '维C精华', keyPoints: ['15-20%浓度'] },
      { step: 4, product: '控油保湿乳', keyPoints: ['烟酰胺+壬二酸'] },
      { step: 5, product: '防晒SPF50', keyPoints: ['PA++++，控油型'] }
    ],
    pmRoutine: [
      { step: 1, product: '卸妆+洁面', keyPoints: ['彻底清洁'] },
      { step: 2, product: '壬二酸凝胶/精华', keyPoints: ['全脸控油淡斑'] },
      { step: 3, product: '美白精华（如维C衍生物）', keyPoints: ['叠加或替换壬二酸'] },
      { step: 4, product: '控油保湿霜', keyPoints: ['轻薄质地'] },
      { step: 5, product: '局部淡斑（如需要）', keyPoints: ['点涂高浓度淡斑产品'] }
    ]
  },
  {
    id: 'ornw',
    code: 'ORNW',
    name: '油性耐受非色素皱纹肌',
    emoji: '⚫🟣',
    type: 'OR',
    pigmented: false,
    wrinkle: true,
    profile: 'ORNW型肤质没有色素问题，主要挑战是出油和抗衰老。皮肤耐受性好，可以放心使用视黄醇等抗老成分，重点在于控油和抗皱的平衡。',
    barrierSymptoms: [
      '全天泛油光',
      '毛孔粗大',
      '皮肤弹性下降',
      '皱纹和细纹',
      '法令纹/眼角纹加深',
      '肤色暗沉（油脂氧化）'
    ],
    repairStrategy: [
      '视黄醇是抗皱首选，可放心使用',
      '控油防止油脂氧化导致暗沉',
      '抗氧化护理防止自由基损伤',
      '可考虑医美如热玛吉、射频改善松弛',
      '防晒延缓皮肤老化'
    ],
    recommendedIngredients: [
      '视黄醇/类视黄醇（必用）',
      '水杨酸（控油代谢）',
      '烟酰胺（控油）',
      '多肽类（抗老）',
      '玻色因（抗老）',
      '麦角硫因（抗氧化）',
      '辅酶Q10（抗氧化）',
      '酵母提取物（代谢）'
    ],
    avoidIngredients: [
      { ingredient: '过于油腻的产品', reason: '导致闭口和痘痘' },
      { ingredient: '不使用防晒', reason: '紫外线是衰老的主要原因' },
      { ingredient: '过度清洁', reason: '破坏屏障，导致代偿性出油' }
    ],
    toleranceBuilding: [
      { warning: '视黄醇导致脱皮', solution: '从低浓度开始，建立耐受后增加频率和浓度' },
      { warning: '出油导致肤色暗沉', solution: '用吸油纸+抗氧化精华，早C晚A可同步进行' },
      { warning: '眼周使用视黄醇刺激', solution: '避开眼周，使用专门的眼霜' }
    ],
    amRoutine: [
      { step: 1, product: '控油洁面（如CeraVe水杨酸洁面）', keyPoints: ['水杨酸洁面'] },
      { step: 2, product: '抗氧化精华（如修丽可CE阿魏酸精华）', keyPoints: ['麦角硫因+VC'] },
      { step: 3, product: '控油精华（如Olay光感小白瓶）', keyPoints: ['烟酰胺+壬二酸'] },
      { step: 4, product: '控油保湿乳（如理肤泉MAT乳）', keyPoints: ['轻薄质地'] },
      { step: 5, product: '防晒SPF30-50（如EltaMD SPF46）', keyPoints: ['控油型防晒'] }
    ],
    pmRoutine: [
      { step: 1, product: '卸妆+洁面（如Farmacy紫雏菊卸妆）', keyPoints: ['彻底清洁'] },
      { step: 2, product: '水杨酸（每周2-3次）（如Stridex棉片绿盒）', keyPoints: ['疏通毛孔'] },
      { step: 3, product: '视黄醇精华（如露得清视黄醇晚霜）', keyPoints: ['从0.025%开始'] },
      { step: 4, product: '保湿乳/霜（如Olay大红瓶空气霜）', keyPoints: ['控油但保湿'] },
      { step: 5, product: '眼霜（抗皱）（如Olay玉龄眼霜）', keyPoints: ['视黄醇眼霜或胜肽眼霜'] }
    ],
    affordableProducts: [
      { name: '露得清视黄醇晚霜', price: '¥100-150', keyPoints: '视黄醇抗皱入门', where: '天猫/屈臣氏' },
      { name: 'Olay大红瓶面霜', price: '¥180-230', keyPoints: '烟酰胺+玻色因抗老', where: '天猫/专柜' },
      { name: 'The Ordinary水杨酸2%+锌', price: '¥30-50', keyPoints: '水杨酸控油疏通', where: '天猫/淘宝' },
      { name: 'The Ordinary Buffet多肽精华', price: '¥80-100', keyPoints: 'Matrixyl 3000抗老', where: '天猫/淘宝' }
    ]
  },
  {
    id: 'ornt',
    code: 'ORNT',
    name: '油性耐受非色素紧致肌',
    emoji: '⚫',
    type: 'OR',
    pigmented: false,
    wrinkle: false,
    profile: 'ORNT是皮肤状态较好的油性肤质类型。没有色素和皱纹问题，皮肤紧致有弹性。主要目标是控油维持清爽，同时预防衰老。',
    barrierSymptoms: [
      '皮肤油腻有光泽',
      '毛孔粗大',
      '偶尔长痘',
      '皮肤紧致弹性好',
      '状态相对稳定',
      '肤色透亮'
    ],
    repairStrategy: [
      '控油是核心，选择有效的控油产品',
      '可偶尔使用酸类去角质维持皮肤代谢',
      '抗氧化防止油脂氧化导致暗沉',
      '预防性抗老：可使用低浓度视黄醇或多肽',
      '严格防晒延缓衰老'
    ],
    recommendedIngredients: [
      '水杨酸（控油疏通）',
      '烟酰胺（控油）',
      '壬二酸（控油抗炎）',
      '维C（抗氧化）',
      '多肽类（预防抗老）',
      '补骨脂酚（温和抗老）',
      '酵母提取物（代谢）',
      '金缕梅（收敛控油）'
    ],
    avoidIngredients: [
      { ingredient: '过于滋润的产品', reason: '导致闭口和痘痘' },
      { ingredient: '用手摸脸/挤痘', reason: '导致炎症和痘印' },
      { ingredient: '忽视防晒', reason: '预防衰老的关键' }
    ],
    toleranceBuilding: [
      { warning: '出油导致脱妆', solution: '控油妆前乳+控油粉，定妆喷雾可延长持妆时间' },
      { warning: '长期出油肤色暗沉', solution: '抗氧化精华，早C是油皮好选择' },
      { warning: '使用新产品长痘', solution: '可能是成分致痘，换成无油配方' }
    ],
    amRoutine: [
      { step: 1, product: '控油洁面', keyPoints: ['水杨酸或氨基酸'] },
      { step: 2, product: '控油爽肤水', keyPoints: ['金缕梅+烟酰胺'] },
      { step: 3, product: '维C精华（可选）', keyPoints: ['抗氧化防止暗沉'] },
      { step: 4, product: '控油保湿乳', keyPoints: ['轻薄无油配方'] },
      { step: 5, product: '防晒', keyPoints: ['控油型SPF30-50'] }
    ],
    pmRoutine: [
      { step: 1, product: '卸妆+洁面', keyPoints: ['双重清洁'] },
      { step: 2, product: '水杨酸（每周2-3次）', keyPoints: ['疏通毛孔+控油'] },
      { step: 3, product: '保湿精华（可选）', keyPoints: ['皮肤状态好可省略'] },
      { step: 4, product: '控油保湿乳', keyPoints: ['含控油成分'] },
      { step: 5, product: '眼霜', keyPoints: ['保湿或预防性抗老'] }
    ],
    affordableProducts: [
      { name: 'The Ordinary水杨酸2%+锌', price: '¥30-50', keyPoints: '控油+疏通毛孔', where: '天猫旗舰店/淘宝' },
      { name: '露得清祛痘洁面乳', price: '¥40-60', keyPoints: '2%水杨酸清洁', where: '屈臣氏/天猫' },
      { name: 'OXY10班赛凝胶', price: '¥25-35', keyPoints: '10%过氧化苯甲酰点涂红肿痘', where: '药店/天猫' },
      { name: '曼秀雷敦控油爽肤水', price: '¥60-80', keyPoints: '金缕梅+薄荷控油', where: '屈臣氏/天猫' }
    ]
  }
];

// ========== 护肤成分百科 ==========
export const ingredients: Ingredient[] = [
  {
    id: 'hyaluronic-acid',
    name: '透明质酸',
    emoji: '💧',
    category: '保湿',
    description: '能吸收自身重量1000倍的水分，是最常见的保湿成分。',
    benefits: ['深层保湿', '增加弹性', '减少细纹'],
    suitableFor: ['干性皮肤', '所有肤质'],
    usage: '洁面后第一步使用，可搭配爽肤水',
    concentration: '常见0.1%-2%',
    sideEffects: '极少数人可能过敏'
  },
  {
    id: 'niacinamide',
    name: '烟酰胺',
    emoji: '✨',
    category: '美白',
    description: '维生素B3衍生物，多功能成分。',
    benefits: ['美白淡斑', '控油缩毛孔', '增强屏障', '抗老'],
    suitableFor: ['油性皮肤', '混合性皮肤', '肤色暗沉'],
    usage: '早晚均可，可搭配其他成分',
    concentration: '常见2%-10%',
    sideEffects: '高浓度可能刺痛，需建立耐受'
  },
  {
    id: 'salicylic-acid',
    name: '水杨酸',
    emoji: '🧪',
    category: '去角质',
    description: '脂溶性酸，能深入毛孔清除油脂和老废角质。',
    benefits: ['疏通毛孔', '去角质', '控油抗痘'],
    suitableFor: ['油性皮肤', '痘痘肌肤', '毛孔粗大'],
    usage: '晚间使用，从低浓度开始',
    concentration: '常见0.5%-2%',
    sideEffects: '可能干燥脱皮，敏感肌慎用'
  },
  {
    id: 'retinol',
    name: '视黄醇',
    emoji: '🔄',
    category: '抗老',
    description: '维生素A衍生物，抗老金标准。',
    benefits: ['抗老除皱', '促进胶原', '改善肤色'],
    suitableFor: ['熟龄肌肤', '有抗老需求'],
    usage: '晚间使用，白天必须防晒',
    concentration: '常见0.025%-1%',
    sideEffects: '可能干燥脱皮，孕妇禁用'
  },
  {
    id: 'ceramide',
    name: '神经酰胺',
    emoji: '🧱',
    category: '保湿',
    description: '皮肤屏障的重要组成部分。',
    benefits: ['修复屏障', '深层保湿', '减少敏感'],
    suitableFor: ['干性皮肤', '敏感性皮肤'],
    usage: '早晚均可，是敏感肌必备',
    concentration: '无特定要求',
    sideEffects: '几乎无副作用'
  },
  {
    id: 'vitamin-c',
    name: '维生素C',
    emoji: '🍊',
    category: '美白',
    description: '强效抗氧化剂，能抑制黑色素。',
    benefits: ['美白淡斑', '抗氧化', '促进胶原'],
    suitableFor: ['有色斑', '肤色暗沉'],
    usage: '早间使用，配合防晒更好',
    concentration: '常见5%-20%',
    sideEffects: '高浓度可能刺激'
  },
  {
    id: 'centella',
    name: '积雪草',
    emoji: '🌿',
    category: '舒缓',
    description: '传统草药成分，消炎修复。',
    benefits: ['消炎舒缓', '修复屏障', '促进愈合'],
    suitableFor: ['敏感性皮肤', '痘痘肌肤'],
    usage: '早晚均可，可与其他成分搭配',
    concentration: '成分表中靠前即可',
    sideEffects: '几乎无副作用'
  },
  {
    id: 'tea-tree',
    name: '茶树精油',
    emoji: '🌲',
    category: '控油',
    description: '天然抗菌成分，能有效对抗痘痘。',
    benefits: ['抗菌抗痘', '控油', '消炎'],
    suitableFor: ['痘痘肌肤', '油性皮肤'],
    usage: '点涂在痘痘处，需稀释后使用',
    concentration: '需稀释1%-5%',
    sideEffects: '可能引起过敏'
  },
  {
    id: 'peptides',
    name: '多肽',
    emoji: '🔗',
    category: '抗老',
    description: '氨基酸小分子链，能刺激胶原蛋白生成。',
    benefits: ['促进胶原', '紧致提升', '减少皱纹'],
    suitableFor: ['熟龄肌肤', '有抗老需求'],
    usage: '早晚均可，在精华步骤使用',
    concentration: '常见1%-10%',
    sideEffects: '几乎无副作用'
  },
  {
    id: 'azelaic-acid',
    name: '壬二酸',
    emoji: '🔬',
    category: '控油',
    description: '多功能酸，敏感肌也可以使用。',
    benefits: ['控油', '抗菌抗痘', '美白淡斑'],
    suitableFor: ['痘痘肌肤', '玫瑰痤疮'],
    usage: '早晚均可，白天需配合防晒',
    concentration: '常见10%-20%',
    sideEffects: '少数人可能刺痛'
  },

  // ========== 细胞级抗老 / 信号通信类 ==========
  {
    id: 'exosomes',
    name: '外泌体',
    emoji: '🧬',
    category: '细胞修护',
    description: '细胞分泌的纳米级囊泡，携带修复信号和活性物质，是前沿抗老科技成分。',
    benefits: ['细胞级修复', '促进胶原再生', '调节皮肤微环境', '加速伤口愈合'],
    suitableFor: ['熟龄肌肤', '医美术后', '需要抗老修复'],
    usage: '晚间在精华步骤使用，配合保湿产品',
    concentration: '按产品说明',
    sideEffects: '极少数人可能过敏，高活性成分可能有微干感',
    pairingTips: ['搭配胜肽→外泌体负责下达修复指令，胜肽提供建筑材料', '搭配透明质酸→增强保湿和透皮吸收', '搭配神经酰胺→强化屏障保护'],
    avoidWith: ['高浓度果酸/水杨酸（破坏外泌体囊泡结构）']
  },
  {
    id: 'pdrn',
    name: 'PDRN',
    emoji: '🔧',
    category: '细胞修护',
    description: '多聚脱氧核苷酸，源自三文鱼DNA提取物，具有强大的DNA修复和再生能力。',
    benefits: ['DNA修复', '促进细胞再生', '改善皮肤弹性', '修复屏障'],
    suitableFor: ['医美术后', '敏感肌修复', '老化肌肤'],
    usage: '早晚均可，医美术后连续使用效果佳',
    concentration: '按产品说明',
    sideEffects: '几乎无副作用，极敏感肌肤需测试',
    pairingTips: ['搭配泛醇(B5)+神经酰胺→修复屏障+刺激胶原，适合医美术后', '搭配烟酰胺→协同抗炎、修复光损伤', '搭配低分子透明质酸→提升水合环境，增强PDRN渗透'],
    avoidWith: ['避免与强酸类成分同步骤使用']
  },
  {
    id: 'mini-rna',
    name: 'Mini-RNA',
    emoji: '📡',
    category: '细胞修护',
    description: '5\'-核苷酸复合物，从基因层面调节皮肤细胞活性，精准调控屏障蛋白表达。',
    benefits: ['基因层面调控', '促进屏障蛋白合成', '增强皮肤抵抗力', '改善敏感'],
    suitableFor: ['敏感肌', '屏障受损', '老化肌肤'],
    usage: '晚间在精华步骤使用',
    concentration: '按产品说明',
    sideEffects: '几乎无副作用',
    pairingTips: ['搭配β-葡聚糖→从基因层面调节屏障蛋白，同时舒缓外界刺激', '搭配依克多因→形成基因调控+环境防护组合，适合污染/蓝光防护'],
    avoidWith: []
  },
  {
    id: 'high-purity-peptides',
    name: '高纯胜肽',
    emoji: '💎',
    category: '抗老',
    description: '高纯度多肽成分，包括蓝铜胜肽、乙酰基六肽、三肽-1等，精准靶向抗老。',
    benefits: ['促进胶原合成', '放松肌肉减少动态纹', '紧致提升', '抗氧化'],
    suitableFor: ['熟龄肌肤', '有皱纹困扰', '需要抗老'],
    usage: '早晚均可，在精华步骤使用',
    concentration: '常见1%-10%',
    sideEffects: '几乎无副作用，蓝铜胜肽避免与EDTA共存配方',
    pairingTips: ['搭配玻色因→胜肽促胶原，玻色因促糖胺聚糖，紧致+充盈', '搭配维C衍生物（如乙基维C）→胜肽抗皱，维C提亮+抗氧化，早间可用'],
    avoidWith: ['原型VC（左旋C）长期共存（易失活），但分步涂抹可']
  },
  {
    id: 'nmn',
    name: 'NMN',
    emoji: '⚡',
    category: '抗老',
    description: 'β-烟酰胺单核苷酸，是NAD+的前体，能提升细胞能量代谢，激活长寿蛋白SIRT。',
    benefits: ['提升NAD+水平', '激活长寿蛋白', '改善细胞代谢', '抗老逆龄'],
    suitableFor: ['熟龄肌肤', '需要抗老', '熬夜党'],
    usage: '早间或晚间在精华步骤使用',
    concentration: '按产品说明',
    sideEffects: '极少数人可能轻微发热',
    pairingTips: ['搭配白藜芦醇→激活SIRT长寿蛋白通路，协同抗衰', '搭配辅酶Q10→线粒体层面双重供能，改善细胞代谢', '搭配麦角硫因→清除自由基+提升NAD+，实现抗氧化+抗老闭环'],
    avoidWith: []
  },

  // ========== 仿生科技 / 生物制造类 ==========
  {
    id: 'hme',
    name: '类人源外泌素HME',
    emoji: '🧪',
    category: '仿生科技',
    description: '人工合成的外泌体类似物，模拟天然外泌体的信号传导功能，更稳定可控。',
    benefits: ['细胞通信调节', '促进胶原', '改善垮脸', '修护肌肤'],
    suitableFor: ['垮脸', '松弛', '需要抗老修复'],
    usage: '晚间在精华步骤使用',
    concentration: '按产品说明',
    sideEffects: '几乎无副作用',
    pairingTips: ['搭配稀有人参皂苷CK→一个从细胞通信下手，一个主攻IV型胶原，针对性改善垮脸', '搭配角鲨烷→温和封闭，保护外泌素活性，适合敏感肌抗老'],
    avoidWith: []
  },
  {
    id: 'bio-collagen',
    name: '仿生胶原',
    emoji: '🔄',
    category: '仿生科技',
    description: '通过生物技术合成的类人源胶原蛋白，结构与人体胶原高度相似，生物利用度高。',
    benefits: ['直接补充胶原', '增加皮肤弹性', '减少皱纹', '提升饱满度'],
    suitableFor: ['熟龄肌肤', '需要填充皱纹', '医美术后'],
    usage: '早晚均可，在精华或面霜步骤使用',
    concentration: '按产品说明',
    sideEffects: '几乎无副作用',
    pairingTips: ['搭配三肽-1铜（蓝铜胜肽）→仿生胶原提供骨架，蓝铜胜肽促进沉积，加速修复', '搭配依克多因→保护新生的胶原不被环境压力破坏'],
    avoidWith: []
  },
  {
    id: 'supramolecular',
    name: '超分子共体科技',
    emoji: '⚙️',
    category: '仿生科技',
    description: '通过超分子技术将活性成分稳定结合，提高渗透性和功效，降低刺激性。',
    benefits: ['增强渗透', '降低刺激', '提高稳定性', '增效减毒'],
    suitableFor: ['油痘肌', '敏感肌想用功效成分'],
    usage: '按产品说明使用',
    concentration: '按产品说明',
    sideEffects: '配方稳定，副作用少',
    pairingTips: ['水杨酸+烟酰胺→控油+抗炎，适合油痘肌', '水杨酸+甜菜碱→温和深层疏通毛孔'],
    avoidWith: ['其他高浓度酸类（避免过度剥脱）']
  },
  {
    id: 'recombinant-collagen',
    name: '重组人源化胶原蛋白',
    emoji: '🧬',
    category: '仿生科技',
    description: '通过基因工程技术表达的人源胶原蛋白，与人体100%同源，无免疫排斥。',
    benefits: ['高生物相容性', '深层渗透', '促进胶原自生', '修复屏障'],
    suitableFor: ['敏感肌', '医美术后', '老化肌肤'],
    usage: '早晚均可，可配合导入仪',
    concentration: '按产品说明',
    sideEffects: '几乎无副作用',
    pairingTips: ['搭配甘油葡糖苷→提升皮肤自身保湿因子，促进胶原利用率', '搭配积雪草提取物→修复+抗炎，适合敏感肌填充皱纹'],
    avoidWith: []
  },

  // ========== 植物 / 生物技术融合类 ==========
  {
    id: 'ginsenoside-ck',
    name: '稀有人参皂苷CK',
    emoji: '🌱',
    category: '植物提取',
    description: '人参中稀有成分，是Rb1转化后的代谢产物，分子量小，皮肤渗透性强。',
    benefits: ['促进IV型胶原合成', '紧致提升', '抗氧化', '抗老'],
    suitableFor: ['垮脸', '松弛', '需要提升轮廓'],
    usage: '晚间在精华步骤使用',
    concentration: '按产品说明',
    sideEffects: '几乎无副作用',
    pairingTips: ['搭配玻色因→实验显示两者促胶原通路不同，叠加可提升紧致效率（3.5倍+）', '搭配角鲨烷+神经酰胺→强化屏障，减少高活性成分可能带来的干燥'],
    avoidWith: []
  },
  {
    id: 'bakuchiol',
    name: '补骨脂酚',
    emoji: '🌿',
    category: '抗老',
    description: '植物性A醇替代成分，作用机制类似视黄醇但更温和，适合敏感肌抗老。',
    benefits: ['促进胶原', '减少皱纹', '改善弹性', '温和不刺激'],
    suitableFor: ['敏感肌抗老', '孕妇可用替代A醇', '不耐受A醇人群'],
    usage: '早晚均可，孕妇可用',
    concentration: '常见0.5%-1%',
    sideEffects: '极少数人可能轻微刺痛',
    pairingTips: ['搭配烟酰胺→补骨脂酚模拟A醇抗老，烟酰胺缓解耐受过渡期的不适', '搭配维C→早C晚酚，比早C晚A更温和'],
    avoidWith: ['高浓度A醇（作用机制重叠，增加刺激风险）']
  },
  {
    id: 'ganoderma',
    name: '特色真菌类提取物',
    emoji: '🍄',
    category: '植物提取',
    description: '包括白肉灵芝、金耳提取物等，富含真菌多糖，具有强大保湿和修护能力。',
    benefits: ['长效保湿', '抗氧化', '舒缓修护', '增强屏障'],
    suitableFor: ['敏感肌', '干燥肌肤', '需要修护'],
    usage: '早晚均可',
    concentration: '成分表中靠前效果好',
    sideEffects: '几乎无副作用',
    pairingTips: ['搭配泛醇(B5)→真菌多糖提供长效保湿膜，B5深层渗透修护', '搭配依克多因→双重防护+舒缓，适合敏感肌维稳'],
    avoidWith: []
  },
  {
    id: 'plant-stem-cells',
    name: '植物干细胞培养物',
    emoji: '🌾',
    category: '植物提取',
    description: '通过植物干细胞技术培养的活性成分，富含生长因子和抗氧化物质。',
    benefits: ['促进细胞更新', '抗氧化', '修复受损肌肤', '延缓衰老'],
    suitableFor: ['熟龄肌肤', '需要抗老', '受损肌肤'],
    usage: '早间或晚间在精华步骤使用',
    concentration: '按产品说明',
    sideEffects: '几乎无副作用',
    pairingTips: ['搭配麦角硫因→植物干细胞提供生长因子，麦角硫因清除氧化产物', '搭配二裂酵母发酵产物溶胞物→增强皮肤微生态与自我修复'],
    avoidWith: []
  },

  // ========== 进阶活性物 ==========
  {
    id: 'ergothioneine',
    name: '麦角硫因',
    emoji: '🛡️',
    category: '抗氧化',
    description: '天然抗氧化剂，能再生维C和维E，形成抗氧化网络，是抗氧化金标准成分。',
    benefits: ['超强抗氧化', '再生维C/维E', '抗老', '防护蓝光污染'],
    suitableFor: ['所有肤质', '需要抗氧化', '早间防护'],
    usage: '早间使用，配合防晒效果更好',
    concentration: '常见0.1%-1%',
    sideEffects: '几乎无副作用',
    pairingTips: ['搭配维C+维E→经典抗氧化黄金三角，麦角硫因能再生维C/维E', '搭配硫辛酸→线粒体抗氧化网络全覆盖'],
    avoidWith: []
  },
  {
    id: 'ectoin',
    name: '依克多因',
    emoji: '🏔️',
    category: '舒缓',
    description: '源自沙漠盐碱地的极端微生物提取，具有强大的防护和修护能力。',
    benefits: ['抵御环境污染', '防护蓝光', '深层保湿', '舒缓修护'],
    suitableFor: ['敏感肌', '环境污染严重地区', '需要防护'],
    usage: '早晚均可，特别适合日间',
    concentration: '常见0.5%-2%',
    sideEffects: '几乎无副作用',
    pairingTips: ['搭配泛醇(B5)+神经酰胺→防护+修护+保湿，敏感肌全能组合', '搭配角鲨烷→依克多因形成水合壳，角鲨烷补充皮脂膜，长效抵御干燥'],
    avoidWith: []
  },
  {
    id: 'lipochroman-6',
    name: 'Lipochroman-6',
    emoji: '💫',
    category: '抗氧化',
    description: '高效脂溶性抗氧化剂，能清除过氧亚硝酸盐等脂溶性自由基，防护效果全面。',
    benefits: ['脂溶性自由基清除', '防护环境污染', '抗老', '稳定配方'],
    suitableFor: ['需要全面抗氧化', '污染环境', '早间防护'],
    usage: '早间使用，配合防晒',
    concentration: '按产品说明',
    sideEffects: '几乎无副作用',
    pairingTips: ['搭配维C衍生物→维C处理水溶性自由基，Lipochroman-6处理脂溶性自由基', '搭配阿魏酸→稳定配方，提升整体抗氧化时长'],
    avoidWith: []
  },
  {
    id: 'panthenol',
    name: '泛醇（B5）',
    emoji: '💧',
    category: '保湿',
    description: '维生素B5前体，深层渗透保湿，促进皮肤屏障修复，是百搭修护基座。',
    benefits: ['深层保湿', '促进屏障修复', '舒缓刺激', '增加弹性'],
    suitableFor: ['所有肤质', '敏感肌', '医美术后'],
    usage: '早晚均可，可与其他成分任意搭配',
    concentration: '常见1%-10%',
    sideEffects: '几乎无副作用',
    pairingTips: ['搭配神经酰胺NP+脂肪酸→完美模拟皮脂膜，修复屏障首选', '搭配透明质酸→泛醇促进透明质酸合成酶表达，内源性+外源性补水'],
    avoidWith: ['几乎与所有成分兼容，无特殊禁忌']
  },
  {
    id: 'ceramide-complex',
    name: '角质层神经酰胺复合物',
    emoji: '🧱',
    category: '保湿',
    description: '模拟皮肤角质层的天然脂质组合，包括神经酰胺、胆固醇、游离脂肪酸。',
    benefits: ['完美模拟皮脂膜', '深层修复屏障', '长效保湿', '减少敏感'],
    suitableFor: ['干性皮肤', '敏感性皮肤', '屏障受损'],
    usage: '早晚均可，是敏感肌必备',
    concentration: '按产品说明',
    sideEffects: '几乎无副作用',
    pairingTips: ['搭配胆固醇+游离脂肪酸→严格按照摩尔比（如3:1:1）仿生，修复效率最高', '搭配尿素→神经酰胺补脂质，尿素保湿+促进角质正常脱落'],
    avoidWith: []
  },
  {
    id: 'isorhamnetin',
    name: '异鼠李素',
    emoji: '🌸',
    category: '控油',
    description: '黄酮类植物提取，能从源头抑制皮脂腺活性，双通路控油。',
    benefits: ['抑制皮脂腺活性', '减少油光', '收缩毛孔', '抗炎'],
    suitableFor: ['大油皮', '毛孔粗大', '需要控油'],
    usage: '早晚均可，在精华步骤使用',
    concentration: '按产品说明',
    sideEffects: '几乎无副作用',
    pairingTips: ['搭配烟酰胺→烟酰胺抑制皮脂转运，Isorhamnetin抑制皮脂腺活性，双通路控油', '搭配PCA锌→协同调节皮脂分泌，适合油性皮肤长期使用'],
    avoidWith: []
  },
  {
    id: 'seaweed-extract',
    name: '海藻/高粱籽提取物',
    emoji: '🌊',
    category: '植物提取',
    description: '富含多糖和矿物质，具有保湿、抗氧化、舒缓多重功效。',
    benefits: ['长效保湿', '抗氧化', '舒缓肌肤', '增强屏障'],
    suitableFor: ['所有肤质', '干燥肌肤', '需要舒缓'],
    usage: '早晚均可',
    concentration: '成分表中靠前效果好',
    sideEffects: '几乎无副作用',
    pairingTips: ['搭配β-葡聚糖→舒缓+抗氧化，适合敏感肌抗污染', '搭配低聚果糖→作为益生元，平衡皮肤微生态'],
    avoidWith: []
  },

  // ========== 特殊成分 ==========
  {
    id: 'resveratrol',
    name: '白藜芦醇',
    emoji: '🍇',
    category: '抗氧化',
    description: '葡萄皮提取的天然抗氧化剂，能激活SIRT长寿蛋白，抗老功效显著。',
    benefits: ['激活SIRT蛋白', '抗氧化', '抗炎', '延缓衰老'],
    suitableFor: ['熟龄肌肤', '需要抗老', '抗氧化需求'],
    usage: '晚间使用效果更佳',
    concentration: '常见0.1%-1%',
    sideEffects: '极少数人可能刺激',
    pairingTips: ['搭配NMN→激活SIRT长寿蛋白通路，协同抗衰', '搭配维C→增强抗氧化效果'],
    avoidWith: []
  },
  {
    id: 'coenzyme-q10',
    name: '辅酶Q10',
    emoji: '⚡',
    category: '抗氧化',
    description: '线粒体能量代谢关键辅酶，能为细胞供能，改善代谢，延缓衰老。',
    benefits: ['线粒体供能', '抗氧化', '抗老', '改善皱纹'],
    suitableFor: ['熟龄肌肤', '熬夜党', '需要抗老'],
    usage: '早晚均可',
    concentration: '常见0.02%-0.1%',
    sideEffects: '几乎无副作用',
    pairingTips: ['搭配NMN→线粒体层面双重供能，改善细胞代谢', '搭配麦角硫因→全面抗氧化网络'],
    avoidWith: []
  },
  {
    id: 'bakuchiol-extra',
    name: '三肽-1铜（蓝铜胜肽）',
    emoji: '🔵',
    category: '抗老',
    description: '铜离子+三肽-1复合物，是皮肤伤口愈合和胶原合成的关键信号分子。',
    benefits: ['促进胶原合成', '加速伤口愈合', '抗氧化', '修复受损'],
    suitableFor: ['医美术后', '受损肌肤', '需要抗老'],
    usage: '晚间在精华步骤使用',
    concentration: '常见0.1%-0.5%',
    sideEffects: '几乎无副作用，避免与EDTA共存配方',
    pairingTips: ['搭配仿生胶原→仿生胶原提供骨架，蓝铜胜肽促进沉积，加速修复', '搭配依克多因→保护新生成的胶原不被破坏'],
    avoidWith: ['EDTA螯合剂（破坏铜离子活性）']
  },
  {
    id: 'volufiline',
    name: 'Volufiline',
    emoji: '💫',
    category: '抗老',
    description: '植物来源的脂质复合物，能促进脂肪细胞分化，增加面部容积，填充凹陷。',
    benefits: ['增加面部容积', '填充凹陷', '丰盈轮廓', '改善垮脸'],
    suitableFor: ['面部凹陷', '太阳穴凹陷', '苹果肌扁平', '需要填充'],
    usage: '早晚在凹陷处局部使用',
    concentration: '按产品说明',
    sideEffects: '几乎无副作用',
    pairingTips: ['搭配稀有人参皂苷CK→丰盈+紧致，改善垮脸', '搭配角鲨烷→增强保湿丰盈效果'],
    avoidWith: []
  },

  // ========== 整体搭配逻辑 ==========
  {
    id: 'morning-routine',
    name: '早间搭配原则',
    emoji: '☀️',
    category: '抗氧化',
    description: '早间侧重防护：麦角硫因 + 依克多因 + 维C衍生物 + 防晒',
    benefits: ['抗氧化', '防护蓝光污染', '防晒增效', '日间保湿'],
    suitableFor: ['所有肤质', '日常防护'],
    usage: '早间步骤：洁面→维C→麦角硫因→依克多因→防晒',
    concentration: '',
    sideEffects: '',
    pairingTips: ['维C衍生物打底→麦角硫因→依克多因→防晒霜', '早C晚A是经典搭配，敏感肌可用早C晚酚'],
    avoidWith: []
  },
  {
    id: 'evening-routine',
    name: '晚间搭配原则',
    emoji: '🌙',
    category: '细胞修护',
    description: '晚间侧重修复：外泌体/PDRN + 胜肽 + 神经酰胺复合物',
    benefits: ['细胞级修复', '促进胶原', '屏障修护', '夜间黄金修护期'],
    suitableFor: ['需要抗老', '屏障受损', '熟龄肌肤'],
    usage: '晚间步骤：洁面→PDRN/外泌体→胜肽精华→神经酰胺霜',
    concentration: '',
    sideEffects: '',
    pairingTips: ['PDRN/外泌体→高纯胜肽→神经酰胺复合物', '视黄醇（晚A）可与补骨脂酚交替使用'],
    avoidWith: []
  },
  {
    id: 'sensitive-routine',
    name: '敏感肌抗老搭配',
    emoji: '🌸',
    category: '舒缓',
    description: '敏感肌抗老：补骨脂酚 + 类人源外泌素HME + 泛醇（避免A醇/高浓度酸）',
    benefits: ['温和抗老', '屏障修护', '降低刺激', '敏感肌友好'],
    suitableFor: ['敏感肌抗老', '不耐受A醇', '屏障受损'],
    usage: '早间：泛醇+依克多因；晚间：HME+补骨脂酚+泛醇',
    concentration: '',
    sideEffects: '',
    pairingTips: ['补骨脂酚模拟A醇抗老，但更温和', '类人源外泌素提供细胞通信修复', '泛醇+神经酰胺强化屏障'],
    avoidWith: ['高浓度A醇', '高浓度果酸/水杨酸', '酒精含量高的产品']
  },
  {
    id: 'oily-skin-routine',
    name: '油皮抗老控油搭配',
    emoji: '🛢️',
    category: '控油',
    description: '油皮抗老控油：异鼠李素 + 烟酰胺 + 低浓度超分子水杨酸',
    benefits: ['双通路控油', '缩小毛孔', '抗老', '减少油光'],
    suitableFor: ['油性肌肤', '油痘肌', '毛孔粗大'],
    usage: '早间：烟酰胺+异鼠李素；晚间：超分子水杨酸+烟酰胺',
    concentration: '',
    sideEffects: '',
    pairingTips: ['异鼠李素+烟酰胺双通路控油', '超分子水杨酸温和疏通毛孔', '注意保湿，避免过度干燥'],
    avoidWith: ['过度去角质', '多种酸类叠加']
  },
  {
    id: 'dry-skin-routine',
    name: '干皮抗老充盈搭配',
    emoji: '🏜️',
    category: '抗老',
    description: '干皮抗老充盈：稀有人参皂苷CK + Volufiline + 角鲨烷',
    benefits: ['促胶原紧致', '丰盈填充', '长效保湿', '改善垮脸凹陷'],
    suitableFor: ['干性肌肤', '面部凹陷', '垮脸', '熟龄干皮'],
    usage: '早间：角鲨烷+Volufiline；晚间：人参皂苷CK+角鲨烷+神经酰胺',
    concentration: '',
    sideEffects: '',
    pairingTips: ['稀有人参皂苷CK促IV型胶原，紧致提升', 'Volufiline促进脂肪分化，丰盈填充', '角鲨烷补充皮脂膜，长效保湿'],
    avoidWith: []
  }
];

// ========== 辅助函数 ==========
export const getAllProblems = () => skinProblems;
export const getProblemsByArea = (area: string) => skinProblems.filter(p => p.area === area);
export const getProblemsByCategory = (area: string, category: string) =>
  skinProblems.filter(p => p.area === area && p.category === category);
export const getProblemById = (id: string) => skinProblems.find(p => p.id === id);
export const searchProblems = (query: string) => {
  const q = query.toLowerCase();
  return skinProblems.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.subCategory?.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
};

// ========== 部位信息 ==========
export const areaInfo = {
  face: { name: '脸部', icon: '👩', color: 'from-pink-500 to-rose-500' },
  scalp: { name: '头皮/头发', icon: '💆', color: 'from-purple-500 to-violet-500' },
  body: { name: '身体', icon: '🧘', color: 'from-teal-500 to-emerald-500' },
  hands: { name: '手部', icon: '🖐️', color: 'from-amber-500 to-orange-500' },
  feet: { name: '足部', icon: '🦶', color: 'from-cyan-500 to-blue-500' },
  hair: { name: '毛发修复', icon: '💇', color: 'from-yellow-500 to-amber-500' }
};

export const allAreas = ['face', 'scalp', 'body', 'hands', 'feet', 'hair'] as const;

// ========== 分类统计 ==========
export const problemCategories = {
  face: ['痤疮', '皱纹', '敏感', '色斑', '毛孔', '黑眼圈', '眼袋', '脂肪粒', '干燥', '油光', '暗沉', '疤痕'],
  scalp: ['皮炎', '头屑', '脱发', '油腻', '敏感', '瘙痒'],
  hair: ['受损修复', '染烫修复', '分叉断裂', '毛躁干枯', '护色锁色'],
  body: ['鸡皮肤', '干燥瘙痒', '背痘', '妊娠纹', '毛囊炎', '毛囊受损', '疤痕'],
  hands: ['老化', '干燥', '色斑', '倒刺', '疤痕'],
  feet: ['干裂', '厚茧', '鸡眼', '灰指甲', '足臭', '疤痕'],
};

// 产品类型中文显示
export const productTypeLabels: Record<ProductType, { label: string; color: string }> = {
  'drugstore': { label: '平价', color: 'text-gray-500' },
  'mid-range': { label: '中端', color: 'text-blue-500' },
  'luxury': { label: '高端', color: 'text-purple-500' },
  'proxy': { label: '代购', color: 'text-amber-500' },
  'essential': { label: '必买', color: 'text-emerald-500' },
  'medical': { label: '处方', color: 'text-red-500' },
};
