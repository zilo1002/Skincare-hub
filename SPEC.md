
# SkinCare Hub - 全方位护肤指南网站

## 1. Concept & Vision

**SkinCare Hub** 是一个专业、温暖且值得信赖的皮肤护理百科全书。网站以"科学护肤，温和呵护"为理念，为用户提供从青春期到成熟肌的全生命周期皮肤问题解决方案。界面如同一本精心设计的美容杂志，融合植物元素的清新感与医学护肤的专业性，让人感受到被温柔对待。

## 2. Design Language

### Aesthetic Direction
**"Botanical Clinical"** — 结合植物疗愈感与医学专业感的独特风格。如同走进一间高端植物SPA与皮肤科诊所的结合体。

### Color Palette
```
Primary:     #2D5A4A (Forest Green - 治愈、信任)
Secondary:   #E8D5C4 (Warm Beige - 温柔、舒适)
Accent:      #D4A574 (Golden Sand - 活力、自然)
Background:  #FDFBF8 (Cream White - 洁净、温和)
Text Dark:   #1A1A1A
Text Light:  #6B6B6B
Success:     #7BA38F (Sage Green)
Warning:     #E6B89C (Peach)
```

### Typography
- **Headings**: Cormorant Garamond (elegant, editorial)
- **Body**: Nunito Sans (friendly, readable)
- **Accents**: 思源宋体 (for Chinese content elegance)

### Spatial System
- 基础单位: 8px
- 大量留白，呼吸感强
- 卡片圆角: 16px
- 阴影: 柔和的层叠阴影 (0 4px 20px rgba(0,0,0,0.06))

### Motion Philosophy
- 入场动画: 轻柔的淡入上移，400ms ease-out
- 悬停效果: 微妙的缩放(1.02)和阴影加深
- 页面切换: 平滑的内容过渡
- 滚动视差: 装饰性植物元素的轻微浮动

### Visual Assets
- **Icons**: 自定义线性图标，植物主题
- **Images**: 高质量护肤成分、皮肤状态、护理过程图片
- **Decorative**: 手绘植物插图作为装饰元素
- **Patterns**: 细腻的叶脉纹理背景

## 3. Layout & Structure

### 页面结构
```
┌─────────────────────────────────────────────┐
│  Header: Logo + 导航 + 搜索栏                │
├─────────────────────────────────────────────┤
│  Hero: 动态标语 + 快速问题入口               │
├─────────────────────────────────────────────┤
│  Body Areas: 脸部 | 头皮 | 身体 (Tab切换)   │
├─────────────────────────────────────────────┤
│  Problem Categories Grid                    │
│  (根据部位动态显示问题类型)                  │
├─────────────────────────────────────────────┤
│  Featured Solutions (轮播)                  │
├─────────────────────────────────────────────┤
│  Tips & Tricks Section                       │
├─────────────────────────────────────────────┤
│  Footer: 免责声明 + 联系方式                  │
└─────────────────────────────────────────────┘
```

### 问题分类架构
**脸部 (Face)**
- 痘痘/痤疮
- 皱纹/细纹
- 干燥/脱皮
- 油光/毛孔
- 敏感/泛红
- 色斑/暗沉
- 黑眼圈

**头皮 (Scalp)**
- 头屑/鳞屑
- 瘙痒/敏感
- 油腻/扁塌
- 脱发/稀疏
- 干燥/毛躁

**身体 (Body)**
- 鸡皮肤/毛囊角化
- 妊娠纹
- 干燥瘙痒
- 背痘
- 手肘/膝盖粗糙
- 腋下暗沉

### 响应式策略
- Desktop: 4列卡片网格
- Tablet: 2-3列
- Mobile: 单列，全宽卡片

## 4. Features & Interactions

### 核心功能

#### 1. 问题导航系统
- 部位选择器 (脸部/头皮/身体)
- 问题类型筛选
- 严重程度选择 (轻度/中度/重度)
- 皮肤类型标记 (干性/油性/混合/敏感)

#### 2. 解决方案详情页
- 问题概述 (原因、症状)
- 家庭疗法 (分步骤说明)
- 天然成分推荐
- 产品建议 (平价+高端)
- 预防措施
- 何时就医提示

#### 3. 搜索功能
- 智能联想
- 热门搜索标签
- 最近浏览记录

#### 4. 个人皮肤档案
- 记录皮肤类型
- 保存关注的问题
- 收藏解决方案

### 交互细节

#### Hover States
- 卡片: 上浮 + 阴影加深 + 边框高亮
- 按钮: 背景色加深 + 微缩放
- 导航项: 下划线动画滑入

#### Loading States
- 骨架屏动画
- 皮肤纹理背景加载动画

#### Empty States
- 友好的插图 + 引导文案
- 快速入门建议

## 5. Component Inventory

### Navigation
- **Header**: 固定顶部，半透明毛玻璃效果，滚动时加深
- **Mobile Nav**: 汉堡菜单，侧滑抽屉

### Cards
- **Problem Card**: 图标 + 标题 + 简介 + 难度标签
- **Solution Card**: 步骤预览 + 预计时间 + 成本指数
- **Ingredient Card**: 成分图 + 功效标签

### Buttons
- **Primary**: 森林绿背景，白色文字，圆角pill形状
- **Secondary**: 透明背景，森林绿边框
- **Ghost**: 文字链接样式

### Form Elements
- **Search Input**: 圆角，带放大镜图标
- **Select/Dropdown**: 自定义样式，动画展开
- **Checkbox/Toggle**: 植物主题设计

### Feedback
- **Toast**: 底部弹出，成功/警告/错误样式
- **Modal**: 居中弹窗，毛玻璃背景

## 6. Technical Approach

### Framework
- React 18 + Vite
- TypeScript
- Tailwind CSS

### State Management
- React Context for global state
- LocalStorage for persistence

### Data Structure
```typescript
interface SkinProblem {
  id: string;
  area: 'face' | 'scalp' | 'body';
  category: string;
  title: string;
  description: string;
  causes: string[];
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'severe';
  skinTypes: ('dry' | 'oily' | 'combination' | 'sensitive')[];
  solutions: Solution[];
  prevention: string[];
  whenToSeeDoctor: string;
}

interface Solution {
  type: 'home-remedy' | 'natural' | 'product';
  title: string;
  duration: string;
  cost: '$' | '$$' | '$$$';
  steps?: string[];
  ingredients?: string[];
  products?: Product[];
  efficacy: 'low' | 'medium' | 'high';
}
```

### Key Implementation
- CSS Grid + Flexbox 布局
- Intersection Observer 实现滚动动画
- 自定义 hooks 管理数据
- 响应式图片处理
