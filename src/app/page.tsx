'use client';

import { useEffect, useState, useRef } from 'react';
import { 
  Brain, 
  Sparkles, 
  Database, 
  MessageSquare, 
  Bot, 
  Cpu,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Zap,
  Target,
  Layers,
  GitBranch,
  FileText,
  Users,
  BookOpen,
  Menu,
  X,
  ArrowUp,
  Copy,
  Check,
  GitCommit,
  MessageCircle,
  Code,
  Lightbulb,
  Clock,
  TrendingUp,
  Quote,
  Award,
  Heart,
  Trophy,
  Star,
  ChevronUp,
  Info,
  Briefcase,
  Wrench,
  Rocket,
  BookMarked,
  ExternalLink,
  User,
  Folder,
  Settings,
  Tags,
  Sun,
  Moon,
  MousePointer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/ThemeToggle';

// 滚动触发动画Hook
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 元素进入视口时触发动画
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // 元素离开视口时重置，以便下次进入时重新触发
          setIsVisible(false);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// 数字滚动动画Hook
function useCountUp(end: number, duration: number = 2000, start: number = 0, shouldStart: boolean = true) {
  const [count, setCount] = useState(start);
  const prevShouldStart = useRef(shouldStart);

  useEffect(() => {
    // 检测shouldStart从false变为true（元素重新进入视口）
    if (shouldStart && !prevShouldStart.current) {
      setCount(start); // 重置计数
    }
    prevShouldStart.current = shouldStart;
    
    if (!shouldStart) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // 使用缓动函数
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(start + (end - start) * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start, shouldStart]);

  return count;
}

// 统计卡片组件
function StatCard({ value, suffix = '', decimals = 0, label, color }: {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  color: 'purple' | 'blue' | 'cyan' | 'green';
}) {
  const { ref, isVisible } = useScrollAnimation();
  const count = useCountUp(value, 2000, 0, isVisible);

  const colorClasses = {
    purple: 'text-purple-500 dark:text-purple-400',
    blue: 'text-blue-500 dark:text-blue-400',
    cyan: 'text-cyan-500 dark:text-cyan-400',
    green: 'text-green-500 dark:text-green-400'
  };

  return (
    <div 
      ref={ref} 
      className={`bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg p-4 transform transition-all duration-500 shadow-sm ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className={`text-3xl font-bold ${colorClasses[color]}`}>
        {decimals > 0 ? count.toFixed(decimals) : count}{suffix}
      </div>
      <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}

// 动画包装组件
function AnimatedSection({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div 
      ref={ref} 
      className={`transform transition-all duration-700 ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// 图片轮播组件
function ImageCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  // ESC键关闭模态框
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      } else if (e.key === 'ArrowLeft' && isModalOpen) {
        setModalIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight' && isModalOpen) {
        setModalIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, images.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
    setIsAutoPlaying(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setIsAutoPlaying(true), 1000);
  };

  const modalGoToPrevious = () => {
    setModalIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const modalGoToNext = () => {
    setModalIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      <div className="relative w-full">
        {/* 主图片容器 */}
        <div className="relative overflow-hidden rounded-xl bg-slate-900/50 border border-slate-700/50">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div 
                key={index} 
                className="w-full flex-shrink-0 cursor-pointer"
                onClick={() => openModal(index)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
                />
              </div>
            ))}
          </div>
          
          {/* 左右箭头 */}
          <button 
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
            aria-label="上一张"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
            aria-label="下一张"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* 指示点 */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-purple-500 w-6' 
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
              aria-label={`跳转到第${index + 1}张图片`}
            />
          ))}
        </div>
      </div>

      {/* 大图模态框 */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          {/* 关闭按钮 */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
            aria-label="关闭"
          >
            <X className="w-6 h-6" />
          </button>

          {/* 图片计数 */}
          <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/10 text-white text-sm">
            {modalIndex + 1} / {images.length}
          </div>

          {/* 左箭头 */}
          <button
            onClick={(e) => { e.stopPropagation(); modalGoToPrevious(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            aria-label="上一张"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* 图片 */}
          <div 
            className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={images[modalIndex].src} 
              alt={images[modalIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* 右箭头 */}
          <button
            onClick={(e) => { e.stopPropagation(); modalGoToNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            aria-label="下一张"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* 底部指示点 */}
          <div className="absolute bottom-6 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setModalIndex(index); }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === modalIndex 
                    ? 'bg-white w-8' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`跳转到第${index + 1}张图片`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [noteModal, setNoteModal] = useState<{ isOpen: boolean; noteId: string | null }>({ isOpen: false, noteId: null });
  
  // 彩蛋气泡状态
  const [showNameEasterEgg, setShowNameEasterEgg] = useState(false);
  const [showPhoneEasterEgg, setShowPhoneEasterEgg] = useState(false);
  const [showEmailEasterEgg, setShowEmailEasterEgg] = useState(false);
  const [showLocationEasterEgg, setShowLocationEasterEgg] = useState(false);
  const [hasClickedName, setHasClickedName] = useState(false); // 是否已点击过名字
  
  // 检测是否为移动设备
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setMounted(true);
    
    // 监听滚动，显示/隐藏回到顶部按钮
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 复制到剪贴板
  const copyToClipboard = async (text: string, item: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(item);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  // 回到顶部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const projects = [
    {
      title: 'MES系统AI分析助手 (Chat BI)',
      period: '2024.08 - 2025.11',
      company: '雀巢大中华区技术部',
      description: '从0到1搭建AI+BI分析平台，通过自然语言对话实现快速数据分析',
      highlights: [
        '设计"自然语言→数据解析→结果可视化→指标追问"的Text2Data全链条',
        '通过Prompt优化，业务问题首答准确率从65%提升至82%',
        'MES日志字段补全率从72%提升至95%',
        'POC结论通过生产环境小流量验证，获准进入二期工程'
      ],
      tech: ['GPT-4', 'Text2Data', 'Prompt Engineering', 'Data Visualization', 'COT'],
      icon: <MessageSquare className="w-6 h-6" />,
      details: {
        challenges: ['生产数据字段缺失严重，影响分析准确性', '业务人员不熟悉SQL，传统BI工具使用门槛高', 'GPT变量解析存在幻觉问题，长尾查询失效'],
        solutions: ['设计COT思维链Prompt，引导模型逐步推理', '构建字段映射库，补全缺失数据', '引入精确匹配+关键词召回+Embedding相似度混合检索'],
        metrics: [
          { label: '准确率提升', value: '65% → 82%' },
          { label: '字段补全率', value: '72% → 95%' },
          { label: 'POC测试样例', value: '20个' }
        ]
      }
    },
    {
      title: '产品手册AI Agent (Neo4j知识图谱增强)',
      period: '2024.08 - 2025.11',
      company: '雀巢大中华区技术部',
      description: '构建基于知识图谱的智能问答系统，实现产品信息实时查询',
      highlights: [
        '基于Neo4j构建乳制品全链路生产知识图谱',
        '完成18类核心业务实体、20种语义关系的抽取',
        '搭建「意图识别-智能检索-精准问答」链路体系',
        '优化后检索召回率达0.87，查询时间从半天缩短至实时'
      ],
      tech: ['Neo4j', 'Knowledge Graph', 'RAG', 'Vector Search', 'Intent Recognition'],
      icon: <Database className="w-6 h-6" />,
      details: {
        challenges: ['产品手册分散在多个系统，查找效率低', '传统关键词检索无法理解语义关系', '业务人员需要快速获取跨品类产品信息'],
        solutions: ['构建知识图谱，建立实体-关系-属性网络', '采用向量检索+关键词检索+图谱检索混合架构', '设计12类细分业务意图的Prompt模板库'],
        metrics: [
          { label: '检索召回率', value: '0.87' },
          { label: '实体类型', value: '18类' },
          { label: '查询效率', value: '半天 → 实时' }
        ]
      }
    },
    {
      title: '开源模型微调 (基于Qwen7B)',
      period: '2024.08 - 2025.11',
      company: '雀巢大中华区技术部',
      description: '使用Easy Dataset和LlamaFactory微调模型用于意图识别',
      highlights: [
        '收集1000条业务语料构建微调数据集',
        '基于Qwen7B进行模型微调',
        '作为意图识别节点提升系统准确性'
      ],
      tech: ['Qwen7B', 'LlamaFactory', 'Fine-tuning', 'Easy Dataset'],
      icon: <Cpu className="w-6 h-6" />,
      details: {
        challenges: ['通用大模型对特定业务意图识别不够准确', '闭源API成本高且数据隐私受限', '需要支持私有化部署'],
        solutions: ['收集1000条业务语料构建高质量训练数据', '使用LlamaFactory框架进行LoRA微调', '部署到本地服务器，保护数据安全'],
        metrics: [
          { label: '训练数据', value: '1000条' },
          { label: '基础模型', value: 'Qwen7B' },
          { label: '微调方法', value: 'LoRA' }
        ]
      }
    },
    {
      title: '宇树机器狗&面壁智能安全巡检方案',
      period: '2024.08 - 2025.11',
      company: '雀巢大中华区技术部',
      description: '联合多部门推进AI巡检升级，设计端到端风险处置闭环',
      highlights: [
        '梳理43项原始需求，通过场景耦合分析合并34%需求',
        '设计三级响应机制实现风险处置闭环',
        '平均事件处置时效从1小时缩短至15分钟'
      ],
      tech: ['Computer Vision', 'Robotics', 'Safety AI', 'Multi-department Collaboration'],
      icon: <Bot className="w-6 h-6" />,
      details: {
        challenges: ['安全、工程、质检三部门需求分散', '传统人工巡检效率低、覆盖不全', '异常事件处置流程冗长'],
        solutions: ['设计跨部门调研问卷，场景耦合分析合并需求', '引入机器狗+CV视觉识别实现自动化巡检', '设计三级响应机制：自动预警→人工复核→快速处置'],
        metrics: [
          { label: '需求合并率', value: '34%' },
          { label: '处置时效', value: '1小时 → 15分钟' },
          { label: '参与部门', value: '3个' }
        ]
      }
    }
  ];

  const skills = {
    'AI技术': [
      '大语言模型(LLM)',
      '提示词工程',
      'RAG检索增强生成',
      '知识图谱(Neo4j)',
      '模型微调(Fine-tuning)',
      'AI Agent开发',
    ],
    '编程技能': [
      'LangChain',
      'PyTorch深度学习',
      'SQL数据库',
      'RPA流程自动化',
    ],
    '产品能力': [
      '产品需求文档(PRD)',
      '原型设计',
      '用户调研与需求挖掘',
      '数据分析与可视化',
    ],
    '工具平台': [
      { 
        name: 'Coze', 
        description: '字节跳动旗下的AI智能体开发平台，支持知识库管理、工作流编排、插件集成等功能。通过可视化界面快速构建AI应用，无需编写代码即可实现复杂的AI业务逻辑，适合快速原型验证和产品落地。' 
      },
      { 
        name: 'Dify', 
        description: '开源的LLM应用开发平台，提供可视化的Agent编排、RAG引擎、工作流设计等功能。支持多种大模型接入，可私有化部署，具备完善的API接口和插件生态，是构建企业级AI应用的首选开源方案。' 
      },
      { 
        name: 'Trae', 
        description: '新一代AI驱动的编程开发工具，支持通过自然语言对话驱动代码生成、项目构建和代码重构。能够理解开发者意图，自动生成高质量的代码实现，大幅提升开发效率，是Vibe Coding的核心实践工具。' 
      },
      { 
        name: 'LlamaFactory', 
        description: '开源的大语言模型微调框架，支持LLaMA、Qwen、ChatGLM等多种主流模型架构。提供丰富的训练方法（LoRA、QLoRA、全量微调等），支持本地化部署和自定义数据集训练，是企业级模型微调的首选工具。' 
      },
      { 
        name: 'Easy Dataset', 
        description: '专为模型微调设计的数据集构建工具，支持多种数据格式转换、数据清洗、数据增强和数据标注功能。能够快速将原始业务数据转化为高质量训练数据集，降低模型微调的数据准备门槛。' 
      },
      { 
        name: 'Power Automate', 
        description: '微软推出的企业级RPA流程自动化平台，支持500+应用连接器和AI Builder功能。通过可视化流程设计器实现业务流程自动化，无需代码即可打通各系统间的数据流转，是企业数字化转型的利器。' 
      }
    ]
  };

  const experience = [
    {
      period: '2024.08 - 2025.11',
      role: 'AI产品经理/应用解决方案',
      company: '雀巢(大中华区技术部数字化中心)',
      location: '北京',
      type: 'work'
    },
    {
      period: '2022.09 - 2024.04',
      role: '人机交互硕士',
      company: '西交利物浦大学',
      location: '苏州',
      type: 'education'
    },
    {
      period: '2015.09 - 2019.06',
      role: '软件工程学士',
      company: '新疆大学',
      location: '乌鲁木齐',
      type: 'education'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950 text-slate-900 dark:text-white">
      {/* Sidebar Menu */}
      {isSidebarOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-r border-slate-200/50 dark:border-slate-700/50 z-50 overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-xl shadow-lg shadow-purple-500/30">
                    R
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">任智韬</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">AI产品经理</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="p-4">
              <div className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-2">快速导航</div>
              <nav className="space-y-1">
                {[
                  { href: '#about', icon: User, label: '关于我' },
                  { href: '#projects', icon: Folder, label: '项目经验' },
                  { href: '#skills', icon: Zap, label: '技能矩阵' },
                  { href: '#works', icon: Bot, label: 'AI作品' },
                  { href: '#ai-process', icon: GitBranch, label: 'AI协作过程' },
                  { href: '#honors', icon: Trophy, label: '荣誉与证书' },
                  { href: '#testimonial', icon: Quote, label: '评价与座右铭' },
                  { href: '#contact', icon: Mail, label: '联系方式' },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Learning Notes Section */}
            <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
              <button
                onClick={() => setExpandedSection(expandedSection === 'notes' ? null : 'notes')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <BookMarked className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                  <span className="text-slate-600 dark:text-slate-300 font-medium">学习笔记</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 dark:text-slate-400 transition-transform ${expandedSection === 'notes' ? 'rotate-180' : ''}`} />
              </button>
              
              {(expandedSection === 'notes' || expandedSection?.startsWith('notes-')) && (
                <div className="mt-2 ml-4 pl-4 border-l border-purple-500/30 space-y-2">
                  {/* 用户标签体系探讨 */}
                  <div>
                    <button
                      onClick={() => setExpandedSection(expandedSection === 'notes-tags' ? 'notes' : 'notes-tags')}
                      className="w-full flex items-center justify-between py-2 text-left"
                    >
                      <div className="flex items-center gap-2">
                        <Tags className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-sm text-slate-300">用户标签体系探讨</span>
                      </div>
                      <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${expandedSection === 'notes-tags' ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSection === 'notes-tags' && (
                      <div className="ml-5 space-y-2 text-xs text-slate-400 border-l border-slate-700/50 pl-3 py-1">
                        <div className="text-purple-400 font-medium mb-1">构建与应用</div>
                        <div className="space-y-1">
                          <div>• 标签分类：用户属性/行为/偏好/分层/风控/商圈</div>
                          <div>• 层级设计：一级类目 → 二级类目 → 三级类目</div>
                          <div>• 落地流程：梳理类目 → 寻找数据 → 选择加工 → 营销应用</div>
                          <div>• 加工方式：SQL语句 / Python代码 / 可视化工具</div>
                          <div className="text-cyan-400 mt-2">💡 案例：美妆品类精准营销标签落地</div>
                        </div>
                        {/* 详细笔记按钮 */}
                        <button
                          onClick={() => setNoteModal({ isOpen: true, noteId: 'tags' })}
                          className="mt-2 flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          <FileText className="w-3 h-3" />
                          <span>查看详细笔记</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 数据仓库分层设计 */}
                  <div>
                    <button
                      onClick={() => setExpandedSection(expandedSection === 'notes-dw' ? 'notes' : 'notes-dw')}
                      className="w-full flex items-center justify-between py-2 text-left"
                    >
                      <div className="flex items-center gap-2">
                        <Database className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-sm text-slate-300">数据仓库分层设计</span>
                      </div>
                      <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${expandedSection === 'notes-dw' ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSection === 'notes-dw' && (
                      <div className="ml-5 space-y-2 text-xs text-slate-400 border-l border-slate-700/50 pl-3 py-1">
                        <div className="text-blue-400 font-medium mb-1">案例解析</div>
                        <div className="space-y-1">
                          <div>• 数据总线三级架构：业务域 → 数据域 → 业务过程</div>
                          <div>• 四层架构：ODS(贴源层) → DWD(明细层) → DWS(汇总层) → DIM(维度层)</div>
                          <div>• ODS层：原始数据入口，格式标准化</div>
                          <div>• DWD层：数据清洗，退化维设计</div>
                          <div>• DWS层：多维度聚合，支撑统计分析</div>
                          <div className="text-cyan-400 mt-2">💡 价值：提升分析效率，保障数据质量</div>
                        </div>
                        {/* 详细笔记按钮 */}
                        <button
                          onClick={() => setNoteModal({ isOpen: true, noteId: 'dw' })}
                          className="mt-2 flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <FileText className="w-3 h-3" />
                          <span>查看详细笔记</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* LangChain Runtime智能助手 */}
                  <div>
                    <button
                      onClick={() => setExpandedSection(expandedSection === 'notes-langchain' ? 'notes' : 'notes-langchain')}
                      className="w-full flex items-center justify-between py-2 text-left"
                    >
                      <div className="flex items-center gap-2">
                        <Bot className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-sm text-slate-300">LangChain Runtime解析</span>
                      </div>
                      <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${expandedSection === 'notes-langchain' ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSection === 'notes-langchain' && (
                      <div className="ml-5 space-y-2 text-xs text-slate-400 border-l border-slate-700/50 pl-3 py-1">
                        <div className="text-green-400 font-medium mb-1">企业员工服务智能助手</div>
                        <div className="space-y-1">
                          <div>• Context：员工身份信息（工号、部门、角色）</div>
                          <div>• Store：对话历史长期存储，实现记忆</div>
                          <div>• Stream Writer：实时进度反馈</div>
                          <div>• 中间件：权限校验、操作日志、PII脱敏</div>
                          <div>• ToolRuntime：工具级身份注入</div>
                          <div className="text-cyan-400 mt-2">💡 解决：重复输入、权限混乱、机器人失忆</div>
                        </div>
                        {/* 详细笔记按钮 */}
                        <button
                          onClick={() => setNoteModal({ isOpen: true, noteId: 'langchain' })}
                          className="mt-2 flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors"
                        >
                          <FileText className="w-3 h-3" />
                          <span>查看详细笔记</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 语雀链接 */}
                  <div className="mt-3 pt-3 border-t border-slate-700/30">
                    <a
                      href="https://www.yuque.com/dashboard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-slate-400 hover:text-purple-400 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>更多学习内容请访问我的个人语雀笔记页面</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Tech Stack Section */}
            <div className="p-4 border-t border-slate-700/50">
              <button
                onClick={() => setExpandedSection(expandedSection === 'tech' ? null : 'tech')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Wrench className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-300">网站技术栈</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedSection === 'tech' ? 'rotate-180' : ''}`} />
              </button>
              
              {expandedSection === 'tech' && (
                <div className="mt-2 ml-4 pl-4 border-l border-slate-700/50 space-y-3">
                  <div>
                    <div className="text-xs text-purple-400 font-medium mb-1.5">前端框架</div>
                    <div className="space-y-1 text-sm text-slate-400">
                      <div>• Next.js 16 / React 19</div>
                      <div>• TypeScript</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-blue-400 font-medium mb-1.5">UI与样式</div>
                    <div className="space-y-1 text-sm text-slate-400">
                      <div>• Tailwind CSS 4</div>
                      <div>• shadcn/ui</div>
                      <div>• Lucide Icons</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-cyan-400 font-medium mb-1.5">AI辅助开发</div>
                    <div className="space-y-1 text-sm text-slate-400">
                      <div>• Coze Code</div>
                      <div>• Vibe Coding</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-green-400 font-medium mb-1.5">核心特性</div>
                    <div className="text-sm text-slate-400">
                      响应式设计 / 滚动动画 / 图片轮播 / 暗色主题
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700/50">
              <div className="text-xs text-slate-500 text-center">
                <div>© 2025 任智韬</div>
                <div className="mt-1">AI辅助编程完成</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Note Detail Modal */}
      {noteModal.isOpen && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setNoteModal({ isOpen: false, noteId: null })}
        >
          {/* 关闭按钮 */}
          <button
            onClick={() => setNoteModal({ isOpen: false, noteId: null })}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
            aria-label="关闭"
          >
            <X className="w-6 h-6" />
          </button>

          {/* 内容区域 */}
          <div 
            className="w-[90vw] max-w-4xl max-h-[85vh] bg-slate-900/95 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 标题栏 */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-700/50 bg-slate-800/50">
              {noteModal.noteId === 'tags' && (
                <>
                  <Tags className="w-5 h-5 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">用户标签体系探讨：构建与应用</h2>
                </>
              )}
              {noteModal.noteId === 'dw' && (
                <>
                  <Database className="w-5 h-5 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">数据仓库分层设计案例解析</h2>
                </>
              )}
              {noteModal.noteId === 'langchain' && (
                <>
                  <Bot className="w-5 h-5 text-green-400" />
                  <h2 className="text-xl font-bold text-white">LangChain Runtime：企业员工服务智能助手</h2>
                </>
              )}
            </div>

            {/* 内容区域 */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-70px)]">
              {/* 用户标签体系 */}
              {noteModal.noteId === 'tags' && (
                <div className="prose prose-invert max-w-none space-y-4 text-sm">
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                    <p className="text-slate-300 leading-relaxed">
                      本文档为《用户标签体系探讨》会议的结构化记录，通过多级标题、表格、流程图等形式，系统梳理标签体系构建、分类、落地及加工等核心内容。
                    </p>
                  </div>
                  
                  <h3 className="text-purple-400 font-bold text-lg">一、标签体系构建背景</h3>
                  <p className="text-slate-300">在数字化业务运营场景中，无论是面向个人用户的精准服务，还是针对企业客户的定向对接，都需要通过一套标准化、体系化的标签体系对目标实体进行精准画像。不同业务领域、不同行业及不同类型的APP，都会基于自身核心业务需求，沉淀出契合专属业务场景的标签体系。</p>
                  
                  <h3 className="text-purple-400 font-bold text-lg">二、标签分类与层级</h3>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                    <div className="grid grid-cols-3 gap-2 text-xs font-medium text-slate-400 border-b border-slate-700/50 pb-2">
                      <span>标签类别</span>
                      <span>核心作用</span>
                      <span>覆盖范围</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-slate-300">
                      <span className="text-purple-400">用户属性</span>
                      <span>界定用户基础特征</span>
                      <span>年龄、性别、城市、职业</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-slate-300">
                      <span className="text-blue-400">用户行为</span>
                      <span>捕捉操作轨迹</span>
                      <span>访问、下单、消费行为</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-slate-300">
                      <span className="text-cyan-400">用户偏好</span>
                      <span>提炼个性化需求</span>
                      <span>品类、物品、时间偏好</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-slate-300">
                      <span className="text-green-400">用户分层</span>
                      <span>实现差异化运营</span>
                      <span>会员等级、生命周期</span>
                    </div>
                  </div>

                  <h3 className="text-purple-400 font-bold text-lg">三、落地流程</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-purple-400 font-medium mb-1">1. 梳理类目体系</div>
                      <div className="text-xs text-slate-400">结合业务场景明确核心需求，梳理全维度标签类目</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-blue-400 font-medium mb-1">2. 寻找对应数据</div>
                      <div className="text-xs text-slate-400">联动数据部门调研，梳理已有数据资源</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-cyan-400 font-medium mb-1">3. 选择加工方式</div>
                      <div className="text-xs text-slate-400">SQL语句 / Python代码 / 可视化工具</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-green-400 font-medium mb-1">4. 营销应用</div>
                      <div className="text-xs text-slate-400">基于标签圈选目标用户，开展定向营销</div>
                    </div>
                  </div>

                  <h3 className="text-purple-400 font-bold text-lg">四、美妆品类案例</h3>
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-purple-400 font-medium">案例效果</span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      圈选"Z世代（18-25岁）+ 彩妆偏好 + 中端价格敏感度"用户<span className="text-purple-400 font-bold">23万</span>，推送618彩妆新品优惠券（满99减30）。
                      转化率达<span className="text-green-400 font-bold">8.6%</span>，较无标签盲推的3.2%提升<span className="text-cyan-400 font-bold">168.75%</span>。
                    </p>
                  </div>
                </div>
              )}

              {/* 数据仓库分层 */}
              {noteModal.noteId === 'dw' && (
                <div className="prose prose-invert max-w-none space-y-4 text-sm">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-slate-300 leading-relaxed">
                      数据仓库采用"自上而下"的核心构建逻辑，从企业整体业务视角统筹数据资源，通过搭建数据总线实现全域数据的分级分类管理。
                    </p>
                  </div>

                  <h3 className="text-blue-400 font-bold text-lg">一、数据总线三级架构</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-400 mb-2">业务域</div>
                      <div className="text-xs text-slate-400">一级架构</div>
                      <div className="text-xs text-slate-300 mt-2">企业宏观业务板块划分</div>
                      <div className="text-xs text-cyan-400 mt-1">如：零售域、供应链域、营销域</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-2">数据域</div>
                      <div className="text-xs text-slate-400">二级架构</div>
                      <div className="text-xs text-slate-300 mt-2">业务域下的细分数据范畴</div>
                      <div className="text-xs text-cyan-400 mt-1">如：线上交易数据域、线下门店数据域</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-cyan-400 mb-2">业务过程</div>
                      <div className="text-xs text-slate-400">三级架构</div>
                      <div className="text-xs text-slate-300 mt-2">具体业务动作序列</div>
                      <div className="text-xs text-cyan-400 mt-1">如：浏览商品、加入购物车、提交订单</div>
                    </div>
                  </div>

                  <h3 className="text-blue-400 font-bold text-lg">二、数据分层详解</h3>
                  <div className="space-y-3">
                    <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-purple-500">
                      <div className="text-purple-400 font-medium mb-1">ODS层（贴源层）</div>
                      <p className="text-xs text-slate-300">数据入口，最小改动，保留原始数据形态，仅做必要格式转换。抽取工具：Kettle、Datax、阿里DTS。</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-blue-500">
                      <div className="text-blue-400 font-medium mb-1">DIM层（维度管理层）</div>
                      <p className="text-xs text-slate-300">存储核心分析维度，拉链表处理实现历史追溯。如：商品类别维度表、用户会员等级拉链表。</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-cyan-500">
                      <div className="text-cyan-400 font-medium mb-1">DWD层（明细层）</div>
                      <p className="text-xs text-slate-300">数据清洗、剔除脏数据、退化维设计生成宽表。产出：订单明细宽表（含商品名称、会员等级等）。</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-green-500">
                      <div className="text-green-400 font-medium mb-1">DWS层（汇总层）</div>
                      <p className="text-xs text-slate-300">多维度聚合，支撑统计分析快速响应。产出：月度省份商品销量汇总表。</p>
                    </div>
                  </div>

                  <h3 className="text-blue-400 font-bold text-lg">三、核心价值</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-purple-400">80%</div>
                      <div className="text-xs text-slate-400">分析效率提升</div>
                      <div className="text-xs text-slate-300 mt-1">2-3小时 → 5-10分钟</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-blue-400">统一</div>
                      <div className="text-xs text-slate-400">数据口径</div>
                      <div className="text-xs text-slate-300 mt-1">减少冗余，避免歧义</div>
                    </div>
                    <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-cyan-400">精准</div>
                      <div className="text-xs text-slate-400">场景匹配</div>
                      <div className="text-xs text-slate-300 mt-1">场景-数据精准匹配</div>
                    </div>
                  </div>
                </div>
              )}

              {/* LangChain Runtime */}
              {noteModal.noteId === 'langchain' && (
                <div className="prose prose-invert max-w-none space-y-4 text-sm">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <p className="text-slate-300 leading-relaxed">
                      以中型互联网公司"员工服务智能助手"为案例，彻底讲透 LangChain Runtime 全流程应用。
                    </p>
                  </div>

                  <h3 className="text-green-400 font-bold text-lg">一、业务场景与痛点</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-purple-400 font-medium mb-2">角色分类</div>
                      <div className="space-y-1 text-xs text-slate-300">
                        <div>• 普通员工：查考勤、问制度、提交报修</div>
                        <div>• 部门主管：查部门考勤汇总</div>
                        <div>• HR管理员：查全公司人事数据</div>
                        <div>• IT管理员：处理权限/设备问题</div>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-red-400 font-medium mb-2">核心痛点</div>
                      <div className="space-y-1 text-xs text-slate-300">
                        <div>• 重复输入身份信息</div>
                        <div>• 权限管控混乱</div>
                        <div>• 机器人"失忆"</div>
                        <div>• 用户体验差、操作无留痕</div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-green-400 font-bold text-lg">二、Runtime组件对应作用</h3>
                  <div className="space-y-2">
                    <div className="bg-slate-800/50 rounded-lg p-3 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400 font-bold text-xs">C</span>
                      </div>
                      <div>
                        <div className="text-purple-400 font-medium">Context（上下文）</div>
                        <p className="text-xs text-slate-300">员工工牌，存储user_id、工号、姓名、部门、角色，Agent启动时确定，全程不变。</p>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-400 font-bold text-xs">S</span>
                      </div>
                      <div>
                        <div className="text-blue-400 font-medium">Store（存储）</div>
                        <p className="text-xs text-slate-300">个人档案柜，长期存储对话历史、常用需求、历史申请记录，关掉页面重开也不会丢失。</p>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-cyan-400 font-bold text-xs">SW</span>
                      </div>
                      <div>
                        <div className="text-cyan-400 font-medium">Stream Writer（流写入器）</div>
                        <p className="text-xs text-slate-300">实时进度屏，推送"正在查您的考勤数据""正在提交报修申请"，实现流式打字输出。</p>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-400 font-bold text-xs">M</span>
                      </div>
                      <div>
                        <div className="text-green-400 font-medium">中间件（before_agent/before_model）</div>
                        <p className="text-xs text-slate-300">安检+前台+日志员，自动做权限校验、动态提示词、操作日志、PII脱敏。</p>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-400 font-bold text-xs">TR</span>
                      </div>
                      <div>
                        <div className="text-orange-400 font-medium">ToolRuntime</div>
                        <p className="text-xs text-slate-300">身份读卡器，让每个工具都能直接拿到员工身份信息，不用手动传参，同时实现工具级精准权限管控。</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-green-400 font-bold text-lg">三、核心工具示例</h3>
                  <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="space-y-2 text-xs text-slate-300">
                      <div><code className="text-purple-400">query_personal_attendance</code>：查询个人考勤（所有角色可用，仅能查自己的）</div>
                      <div><code className="text-blue-400">submit_device_repair</code>：提交设备报修申请</div>
                      <div><code className="text-cyan-400">query_dept_attendance_summary</code>：查询部门考勤汇总（仅部门主管/HR管理员可用）</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-500/20 dark:to-violet-500/20 border border-purple-300 dark:border-purple-500/30 flex items-center justify-center hover:border-purple-400/50 transition-all hover:scale-105"
                aria-label="打开菜单"
              >
                <Menu className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </button>
              <span className="text-lg font-medium text-slate-600 dark:text-slate-300"><span className="text-purple-500 dark:text-purple-400 font-bold">←</span> 更多详细信息</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">关于我</a>
              <a href="#projects" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">项目经验</a>
              <a href="#skills" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">技能矩阵</a>
              <a href="#works" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">AI作品</a>
              <ThemeToggle />
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold" asChild>
                <a href="#contact">
                  <Mail className="w-4 h-4 mr-2" />
                  联系我
                </a>
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button 
                className="text-slate-900 dark:text-white p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <div className="fixed top-[73px] left-0 right-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 z-50 md:hidden">
              <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
                <a 
                  href="#about" 
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  关于我
                </a>
                <a 
                  href="#projects" 
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  项目经验
                </a>
                <a 
                  href="#skills" 
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  技能矩阵
                </a>
                <a 
                  href="#works" 
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  AI作品
                </a>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full text-white font-semibold"
                  asChild
                >
                  <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                    <Mail className="w-4 h-4 mr-2" />
                    联系我
                  </a>
                </Button>
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full filter blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-500/20 dark:to-blue-500/20 border border-purple-200 dark:border-purple-500/30 mb-8">
              <Sparkles className="w-4 h-5 text-purple-500 dark:text-purple-400" />
              <span className="text-sm text-purple-600 dark:text-purple-300">Inspire 2026招聘候选人</span>
            </div>

            {/* Name & Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="relative inline-block">
                <span 
                  className="name-glow-wrapper cursor-pointer group"
                  onClick={() => {
                    if (isMobile) {
                      setShowNameEasterEgg(!showNameEasterEgg);
                      setHasClickedName(true);
                    }
                  }}
                >
                  <span className="name-text name-text-hover hover:scale-110 inline-block transition-transform duration-300">
                    任智韬
                  </span>
                  {/* 彩蛋 Tooltip - PC端hover触发，移动端点击触发 */}
                  <span className={`absolute -top-4 left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none z-10 ${
                    isMobile 
                      ? (showNameEasterEgg ? 'opacity-100 translate-y-0 -top-20' : 'opacity-0 translate-y-0 -top-4')
                      : 'opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:-top-20'
                  }`}>
                    <span className="relative block bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-4 py-3 rounded-lg shadow-lg w-[280px] text-center">
                      🎉 恭喜你发现这个让AI写的网站更有活人感的彩蛋环节~<br/>
                      最后联系方式的位置有3个隐藏彩蛋，<br/>
                      你可以点击页面右上角直接跳转~去发掘吧~
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-8 border-transparent border-t-purple-600"></span>
                    </span>
                  </span>
                </span>
                {/* 箭头悬浮在边框右侧外部 - 仅PC端显示 */}
                {!isMobile && <MousePointer className="absolute left-full top-1/2 -translate-y-1/2 ml-6 name-arrow w-7 h-7 md:w-9 md:h-9" />}
              </span>
            </h1>
            
            {/* 移动端彩蛋提示文字 */}
            {isMobile && !hasClickedName && (
              <p className="text-xs text-purple-500/70 mb-2 animate-pulse">
                ✨ 点击名字发现彩蛋
              </p>
            )}
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-300 mb-2">Riley Ren</p>
            <div className="flex items-center justify-center gap-3 text-lg text-purple-500 dark:text-purple-400 mb-8">
              <Brain className="w-5 h-5" />
              <span>AI产品经理</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <Zap className="w-5 h-5" />
              <span>Vibe Coding实践者</span>
            </div>

            {/* Key Highlights */}
            <div className="grid md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
              <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 hover:border-purple-300 dark:hover:border-purple-500/50 transition-all hover:transform hover:scale-105 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                  <span className="font-semibold text-slate-900 dark:text-white">AI产品探索</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">业务调研、需求挖掘、方案设计</p>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all hover:transform hover:scale-105 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  <span className="font-semibold text-slate-900 dark:text-white">快速原型验证</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">MVP构建、AI工具编排、端到端流程</p>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 hover:border-cyan-300 dark:hover:border-cyan-500/50 transition-all hover:transform hover:scale-105 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <GitBranch className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
                  <span className="font-semibold text-slate-900 dark:text-white">交付落地优化</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">效果评估、数据闭环、持续迭代</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 text-white font-semibold" asChild>
                <a href="#projects">
                  <FileText className="w-5 h-5 mr-2" />
                  查看项目
                </a>
              </Button>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 text-white font-semibold" asChild>
                <a href="#works">
                  <Sparkles className="w-5 h-5 mr-2" />
                  作品展示
                </a>
              </Button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-slate-400 dark:text-slate-500" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Info */}
            <div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="gradient-text-title">
                  关于我
                </span>
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  我是一名专注于AI领域的产品经理，拥有人机交互硕士学位和软件工程背景。
                  在雀巢大中华区技术部数字化中心工作期间，我主导了多个AI产品的从0到1构建，
                  涵盖Chat BI、知识图谱、模型微调、AI Agent等多个方向。
                </p>
                <p>
                  我擅长将业务需求转化为可落地的AI方案，具备扎实的编程基础和快速原型验证能力。
                  能够组合使用代码工具(Trae)与无代码编排平台(Coze、Dify)，
                  快速搭建可跑通、可演示的原型。
                </p>
                <p>
                  我相信AI产品经理不仅要懂业务，更要具备"极致的原型构建力"——
                  能够利用AI工具快速将想法转化为可运行、可感知的底层逻辑与交互界面。
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <StatCard value={79} suffix="→82%" label="检索准确率提升" color="purple" />
                <StatCard value={1000} suffix="+" label="业务语料微调数据集" color="blue" />
                <StatCard value={30} suffix="%" label="Chat BI查询效率提升" color="cyan" />
                <StatCard value={4} label="AI应用落地" color="green" />
              </div>
            </div>

            {/* Right - Timeline */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-500" />
              <div className="space-y-8 pl-12">
                {experience.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border-2 border-purple-500 flex items-center justify-center">
                      {exp.type === 'work' ? (
                        <Users className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                      ) : (
                        <BookOpen className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                      )}
                    </div>
                    <div className="bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg p-4 shadow-sm">
                      <div className="text-sm text-purple-500 dark:text-purple-400 mb-1">{exp.period}</div>
                      <div className="font-semibold text-slate-900 dark:text-white">{exp.role}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{exp.company}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text-title">
                AI项目经验
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              在雀巢大中华区技术部，我主导了多个AI产品的从0到1构建，涵盖数据分析、知识图谱、模型微调等多个方向
            </p>
          </div>

          <div className="grid gap-6">
            {projects.map((project, index) => {
              const isExpanded = expandedProject === index;
              
              return (
                <AnimatedSection key={index} delay={index * 100}>
                  <Card 
                    className={`bg-white/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 hover:border-purple-300 dark:hover:border-purple-500/50 transition-all duration-500 overflow-hidden group shadow-sm ${
                      isExpanded ? 'border-purple-300 dark:border-purple-500/50' : ''
                    }`}
                  >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-500/20 dark:to-blue-500/20 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                          {project.icon}
                        </div>
                        <div>
                          <CardTitle className="text-xl text-slate-900 dark:text-white">{project.title}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <span className="text-purple-600 dark:text-purple-400">{project.period}</span>
                            <span className="text-slate-400 dark:text-slate-600">•</span>
                            <span className="text-slate-600 dark:text-slate-400">{project.company}</span>
                          </CardDescription>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedProject(isExpanded ? null : index)}
                        className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-4 h-4 mr-1" />
                            收起详情
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 mr-1" />
                            查看详情
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">{project.description}</p>
                    <div className="space-y-2 mb-4">
                      {project.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400 mt-2 flex-shrink-0" />
                          <span className="text-slate-700 dark:text-slate-300">{highlight}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* 展开的详细内容 */}
                    {isExpanded && project.details && (
                      <div className="mt-6 space-y-6 pt-6 border-t border-slate-200 dark:border-slate-700/50 animate-in fade-in duration-300">
                        {/* 挑战 */}
                        <div>
                          <h4 className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            遇到的挑战
                          </h4>
                          <ul className="space-y-2">
                            {project.details.challenges.map((challenge, i) => (
                              <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-red-500 dark:bg-red-400 mt-2 flex-shrink-0" />
                                {challenge}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* 解决方案 */}
                        <div>
                          <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                            <Lightbulb className="w-4 h-4" />
                            解决方案
                          </h4>
                          <ul className="space-y-2">
                            {project.details.solutions.map((solution, i) => (
                              <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-green-500 dark:bg-green-400 mt-2 flex-shrink-0" />
                                {solution}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* 关键指标 */}
                        <div>
                          <h4 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-3 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            关键成果
                          </h4>
                          <div className="grid grid-cols-3 gap-3">
                            {project.details.metrics.map((metric, i) => (
                              <div key={i} className="bg-slate-100 dark:bg-slate-700/30 rounded-lg p-3 text-center">
                                <div className="text-lg font-bold text-slate-900 dark:text-white">{metric.value}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{metric.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tech.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-500/20 hover:text-purple-700 dark:hover:text-purple-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text-title">
                技能矩阵
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              作为AI产品经理，我具备跨领域的综合能力，从技术实现到产品设计全覆盖
            </p>
          </div>

          <Tabs defaultValue="工具平台" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 overflow-x-auto">
              <TabsTrigger value="工具平台" className="text-slate-600 dark:text-white data-[state=active]:bg-green-500/20 data-[state=active]:text-green-600 dark:data-[state=active]:text-green-300 text-xs sm:text-sm whitespace-nowrap">工具平台</TabsTrigger>
              <TabsTrigger value="AI技术" className="text-slate-600 dark:text-white data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-300 text-xs sm:text-sm whitespace-nowrap">AI技术</TabsTrigger>
              <TabsTrigger value="产品能力" className="text-slate-600 dark:text-white data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-600 dark:data-[state=active]:text-cyan-300 text-xs sm:text-sm whitespace-nowrap">产品能力</TabsTrigger>
              <TabsTrigger value="编程技能" className="text-slate-600 dark:text-white data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-300 text-xs sm:text-sm whitespace-nowrap">编程技能</TabsTrigger>
            </TabsList>
            
            <TabsContent value="工具平台" className="mt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {skills['工具平台'].map((tool, index) => (
                  <div key={index} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg p-5 hover:border-green-300 dark:hover:border-green-500/30 transition-all shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400" />
                      <span className="text-slate-900 dark:text-white font-semibold text-lg">{tool.name}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{tool.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="AI技术" className="mt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {skills['AI技术'].map((skill, index) => (
                  <div key={index} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg p-4 hover:border-purple-300 dark:hover:border-purple-500/30 transition-all shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400" />
                      <span className="text-slate-900 dark:text-white font-medium">{skill}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="产品能力" className="mt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {skills['产品能力'].map((skill, index) => (
                  <div key={index} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg p-4 hover:border-cyan-300 dark:hover:border-cyan-500/30 transition-all shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                      <span className="text-slate-900 dark:text-white font-medium">{skill}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="编程技能" className="mt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {skills['编程技能'].map((skill, index) => (
                  <div key={index} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-500/30 transition-all shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400" />
                      <span className="text-slate-900 dark:text-white font-medium">{skill}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* AI Works Section */}
      <section id="works" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text-title">
                AI作品展示
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              使用AI工具快速构建的原型和智能体，展现Vibe Coding实践能力
            </p>
          </div>

          {/* Coze Agent Highlight */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-500/10 dark:to-blue-500/10 border border-purple-200 dark:border-purple-500/30 rounded-2xl p-8 hover:border-purple-300 dark:hover:border-purple-400/50 transition-all duration-300 shadow-sm">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* 左侧：文字内容 */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Coze智能体开发</h3>
                    <Badge className="bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-500/30 mt-1">
                      在雀巢已使用相似框架与平台实现相同场景
                    </Badge>
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 italic">
                  由于数据合规性，此处展示仅使用脱敏组件
                </p>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  基于Coze平台搭建多个AI智能体，涵盖知识问答、流程自动化等场景。熟练使用Coze平台进行AI智能体开发，具备以下核心能力：
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400" />
                    <span className="text-slate-700 dark:text-slate-300 text-sm">知识库构建与管理</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400" />
                    <span className="text-slate-700 dark:text-slate-300 text-sm">工作流编排设计</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                    <span className="text-slate-700 dark:text-slate-300 text-sm">提示词模板优化</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400" />
                    <span className="text-slate-700 dark:text-slate-300 text-sm">多工具协同调用</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-500/20 hover:text-purple-700 dark:hover:text-purple-300">
                    Coze
                  </Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-500/20 hover:text-purple-700 dark:hover:text-purple-300">
                    AI Agent
                  </Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-500/20 hover:text-purple-700 dark:hover:text-purple-300">
                    Workflow
                  </Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-500/20 hover:text-purple-700 dark:hover:text-purple-300">
                    Knowledge Base
                  </Badge>
                </div>
              </div>
              
              {/* 右侧：图片轮播 */}
              <div className="lg:w-[400px] w-full flex-shrink-0 group">
                <ImageCarousel 
                  images={[
                    { src: '/coze/coze-1.png', alt: 'Coze智能体开发效果展示1' },
                    { src: '/coze/coze-2.png', alt: 'Coze智能体开发效果展示2' },
                    { src: '/coze/coze-3.png', alt: 'Coze智能体开发效果展示3' }
                  ]} 
                />
              </div>
            </div>
          </div>
          
          {/* Neo4J Knowledge Graph Highlight */}
          <div className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-500/10 dark:to-teal-500/10 border border-cyan-200 dark:border-cyan-500/30 rounded-2xl p-8 hover:border-cyan-300 dark:hover:border-cyan-400/50 transition-all duration-300 mt-8 shadow-sm">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* 左侧：文字内容 */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/30">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Neo4j知识图谱</h3>
                    <Badge className="bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 border-cyan-300 dark:border-cyan-500/30 mt-1">
                      在雀巢已实际落地应用
                    </Badge>
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 italic">
                  知识图谱是AI应用的重要基础设施，可实现结构化知识存储与智能检索
                </p>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  基于Neo4j构建企业级知识图谱，支持多类型实体关系建模与图查询。通过图谱检索增强RAG系统的召回效果，具备以下核心能力：
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                    <span className="text-slate-700 dark:text-slate-300 text-sm">实体关系建模</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400" />
                    <span className="text-slate-700 dark:text-slate-300 text-sm">Cypher查询优化</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400" />
                    <span className="text-slate-700 dark:text-slate-300 text-sm">图谱检索增强RAG</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400" />
                    <span className="text-slate-700 dark:text-slate-300 text-sm">多跳关系推理</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 hover:text-cyan-700 dark:hover:text-cyan-300">
                    Neo4j
                  </Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 hover:text-cyan-700 dark:hover:text-cyan-300">
                    Knowledge Graph
                  </Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 hover:text-cyan-700 dark:hover:text-cyan-300">
                    Cypher
                  </Badge>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 hover:text-cyan-700 dark:hover:text-cyan-300">
                    Graph RAG
                  </Badge>
                </div>
              </div>
              
              {/* 右侧：图片轮播 */}
              <div className="lg:w-[400px] w-full flex-shrink-0 group">
                <ImageCarousel 
                  images={[
                    { src: '/neo4j-1.png', alt: 'Neo4j知识图谱效果展示1' },
                    { src: '/neo4j-2.png', alt: 'Neo4j知识图谱效果展示2' }
                  ]} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Collaboration Process Section */}
      <section id="ai-process" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text-title">
                AI协作过程
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              这个网站是如何诞生的？从想法到上线，我如何借助AI工具实现快速交付
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 1: 产品定义 */}
            <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 hover:border-purple-300 dark:hover:border-purple-500/50 transition-all shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-500/20 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">Step 1</div>
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-white">产品定义</CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400">通过自然语言描述产品愿景</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-lg p-3 text-sm text-slate-700 dark:text-slate-300 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-purple-600 dark:text-purple-400 font-medium">Prompt示例</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    "构建一个AI产品经理个人品牌网站，展示项目经验、技能矩阵、AI作品。采用深色科技风格，体现AI专业性和创新力..."
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>耗时：约5分钟</span>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: 快速原型 */}
            <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center">
                    <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Step 2</div>
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-white">快速原型</CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400">AI生成代码，快速构建MVP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-lg p-3 text-sm text-slate-700 dark:text-slate-300 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <GitBranch className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-blue-600 dark:text-blue-400 font-medium">迭代过程</span>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• AI生成页面结构（导航、Hero、内容区）</li>
                    <li>• 自动创建组件和样式系统</li>
                    <li>• 实时预览，边改边看</li>
                  </ul>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <TrendingUp className="w-3 h-3" />
                  <span>迭代：15+次对话调优</span>
                </div>
              </CardContent>
            </Card>

            {/* Step 3: 体验优化 */}
            <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 hover:border-cyan-300 dark:hover:border-cyan-500/50 transition-all shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">Step 3</div>
                </div>
                <CardTitle className="text-xl text-slate-900 dark:text-white">体验优化</CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400">人工调优，打磨产品细节</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-lg p-3 text-sm text-slate-700 dark:text-slate-300 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-cyan-600 dark:text-cyan-400 font-medium">优化点</span>
                  </div>
                  <ul className="text-xs space-y-1">
                    <li>• 移动端响应式适配</li>
                    <li>• 交互细节（复制、滚动、动画）</li>
                    <li>• 内容层次和信息架构</li>
                  </ul>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Zap className="w-3 h-3" />
                  <span>效率：传统开发节省80%时间</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Insights */}
          <div className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-500/10 dark:to-blue-500/10 border border-purple-200 dark:border-purple-500/30 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              关键洞察
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400 mt-2 flex-shrink-0" />
                <span><strong className="text-slate-900 dark:text-white">结构化表达：</strong>将"深色科技风格"拆解为"深色背景+渐变紫蓝主色+毛玻璃效果"，AI理解更精准</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 mt-2 flex-shrink-0" />
                <span><strong className="text-slate-900 dark:text-white">渐进式交付：</strong>先完成导航+Hero+简介，再逐步叠加技能矩阵、AI作品等模块</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 mt-2 flex-shrink-0" />
                <span><strong className="text-slate-900 dark:text-white">问题即Prompt：</strong>遇到样式问题时，直接描述期望效果而非技术细节，如"希望卡片悬浮时有微光感"</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 mt-2 flex-shrink-0" />
                <span><strong className="text-slate-900 dark:text-white">版本意识：</strong>每次功能迭代后让AI生成版本日志，便于回溯和展示迭代能力</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Version History Section */}
      <section id="version-history" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text-title">
                版本迭代日志
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              从MVP到完整产品，体现快速迭代能力
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-500" />
            
            {/* Version Items */}
            <div className="space-y-8 pl-16">
              {/* v2.0 */}
              <div className="relative">
                <div className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <GitCommit className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-6 hover:border-purple-300 dark:hover:border-purple-500/30 transition-all shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/30">v2.0</Badge>
                    <span className="text-sm text-slate-500 dark:text-slate-400">2025-03-11</span>
                    <Badge variant="outline" className="border-green-300 dark:border-green-500/30 text-green-600 dark:text-green-400">进行中</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">体验优化版</h3>
                  <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>新增AI协作过程展示模块</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>实现移动端响应式菜单</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>添加回到顶部、复制等交互功能</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>版本迭代日志展示</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* v1.1 */}
              <div className="relative">
                <div className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <GitCommit className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-6 hover:border-blue-300 dark:hover:border-blue-500/30 transition-all shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30">v1.1</Badge>
                    <span className="text-sm text-slate-500 dark:text-slate-400">2025-03-11</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">功能完善版</h3>
                  <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>优化技能矩阵展示方式</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>添加工具平台详细描述</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>修复导航跳转功能</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>更新工具列表（新增Dify、Trae）</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* v1.0 */}
              <div className="relative">
                <div className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-green-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <GitCommit className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-6 hover:border-cyan-300 dark:hover:border-cyan-500/30 transition-all shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30">v1.0</Badge>
                    <span className="text-sm text-slate-500 dark:text-slate-400">2025-03-11</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">MVP版本</h3>
                  <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>完成核心页面结构（导航、Hero、内容区）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>基础信息展示（简介、项目、技能、作品）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>响应式布局基础</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-purple-500 dark:text-purple-400 mb-1">3</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">版本迭代</div>
            </div>
            <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-blue-500 dark:text-blue-400 mb-1">20+</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">AI对话轮次</div>
            </div>
            <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-cyan-500 dark:text-cyan-400 mb-1">80%</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">开发效率提升</div>
            </div>
            <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-green-500 dark:text-green-400 mb-1">1天</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">从0到上线</div>
            </div>
          </div>
        </div>
      </section>

      {/* Honors Section */}
      <section id="honors" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text-title">
                荣誉与证书
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              在学习和工作中获得的认可与成就
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {/* 荣誉1 */}
            <Card className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-purple-300 dark:hover:border-purple-500/50 transition-all hover:scale-105 group shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-500/20 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Trophy className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">ACM-ICPC协会副会长</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">新疆大学</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">2016 - 2018</p>
              </CardContent>
            </Card>

            {/* 荣誉2 */}
            <Card className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all hover:scale-105 group shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">亚欧博览会优秀志愿者</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">乌鲁木齐</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">2016</p>
              </CardContent>
            </Card>

            {/* 荣誉3 */}
            <Card className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-300 dark:hover:border-cyan-500/50 transition-all hover:scale-105 group shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Star className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">软件学院先进工作个人</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">新疆大学</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">2015 - 2019</p>
              </CardContent>
            </Card>

            {/* 荣誉4 */}
            <Card className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 hover:border-green-300 dark:hover:border-green-500/50 transition-all hover:scale-105 group shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-500/20 border border-green-200 dark:border-green-500/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-7 h-7 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">雅思 IELTS 6.0</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">英语能力认证</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">可作为工作语言</p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Certifications */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Badge variant="outline" className="border-purple-300 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 px-4 py-2">
              <Award className="w-4 h-4 mr-2" />
              CCTalk产品运营项目证书
            </Badge>
            <Badge variant="outline" className="border-blue-300 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 px-4 py-2">
              <Award className="w-4 h-4 mr-2" />
              CCTalk渠道运营项目证书
            </Badge>
            <Badge variant="outline" className="border-cyan-300 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-300 px-4 py-2">
              <Award className="w-4 h-4 mr-2" />
              CCTalk互联网运营项目证书
            </Badge>
            <Badge variant="outline" className="border-green-300 dark:border-green-500/30 text-green-700 dark:text-green-300 px-4 py-2">
              <FileText className="w-4 h-4 mr-2" />
              CET-4 500分
            </Badge>
          </div>
        </div>
      </section>

      {/* Testimonial & Motto Section */}
      <section id="testimonial" className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial */}
            <Card className="bg-white/5 backdrop-blur-sm border-purple-400/40 shadow-lg shadow-purple-500/10">
              <CardHeader>
                <Quote className="w-10 h-10 text-purple-400" />
              </CardHeader>
              <CardContent>
                <blockquote className="text-lg text-slate-100 italic leading-relaxed mb-6">
                  "智韬在AI产品探索中展现了极强的学习能力和产品思维。他能够快速理解复杂的业务场景，
                  并将需求转化为可落地的AI方案。在多个项目中，他不仅完成了产品设计，
                  更通过快速原型验证了方案的可行性，在管培期内证明了自己作为Super Technical Traine的能力。"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white shadow-lg">
                    JZ
                  </div>
                  <div>
                    <div className="font-semibold text-white">Jinfu.Z</div>
                    <div className="text-sm text-slate-300">Solution Expert Manager (Intelligence Digital Center of Nestle GCR)</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Motto */}
            <Card className="bg-white/5 backdrop-blur-sm border-blue-400/40 shadow-lg shadow-blue-500/10 flex flex-col justify-center">
              <CardContent className="text-center py-8">
                <Heart className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">个人座右铭</h3>
                <p className="text-3xl font-bold gradient-text-motto mb-4">
                  Own Your Attitude
                </p>
                <p className="text-slate-200 max-w-md mx-auto">
                  产品经理不是"想点子的人"，而是"把想法落地的人"。懂一点技术、会一点设计、能写一点代码，不是为了成为全栈，而是为了更快验证想法、更准评估可行性、更有效推动落地。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white/50 dark:bg-transparent">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text-title">
                联系方式
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              期待与您交流AI产品经验与合作机会
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Phone */}
            <div 
              className="bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-6 hover:border-purple-300 dark:hover:border-purple-500/50 transition-all group text-center relative shadow-sm cursor-pointer"
              onClick={() => isMobile && setShowPhoneEasterEgg(!showPhoneEasterEgg)}
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard('+86 13201312361', 'phone');
                }}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600/50 transition-colors z-20"
                aria-label="复制电话号码"
              >
                {copiedItem === 'phone' ? (
                  <Check className="w-4 h-4 text-green-500 dark:text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400 dark:text-slate-400" />
                )}
              </button>
              <a href="tel:+8613201312361" className="block" onClick={(e) => e.stopPropagation()}>
                <Phone className="w-8 h-8 text-purple-500 dark:text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-slate-900 dark:text-white font-medium">电话</div>
                <div className="text-slate-500 dark:text-slate-400 text-sm mt-1">+86 13201312361</div>
              </a>
              {/* 彩蛋 Tooltip - PC端hover触发，移动端点击触发 */}
              <span className={`absolute -top-4 left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none z-10 ${
                isMobile 
                  ? (showPhoneEasterEgg ? 'opacity-100 translate-y-0 -top-24' : 'opacity-0 translate-y-0 -top-4')
                  : 'opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:-top-24'
              }`}>
                <span className="relative block bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-4 py-3 rounded-lg shadow-lg w-[220px] text-center">
                  📷 我也是个摄影爱好者~目前的设备有影石Ace Pro2和索尼ZV-E10M2~
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-8 border-transparent border-t-purple-600"></span>
                </span>
              </span>
            </div>
            
            {/* Email */}
            <div 
              className="bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-6 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all group text-center relative shadow-sm cursor-pointer"
              onClick={() => isMobile && setShowEmailEasterEgg(!showEmailEasterEgg)}
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard('riley013@163.com', 'email');
                }}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600/50 transition-colors z-20"
                aria-label="复制邮箱地址"
              >
                {copiedItem === 'email' ? (
                  <Check className="w-4 h-4 text-green-500 dark:text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400 dark:text-slate-400" />
                )}
              </button>
              <a href="mailto:riley013@163.com" className="block" onClick={(e) => e.stopPropagation()}>
                <Mail className="w-8 h-8 text-blue-500 dark:text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-slate-900 dark:text-white font-medium">邮箱</div>
                <div className="text-slate-500 dark:text-slate-400 text-sm mt-1">riley013@163.com</div>
              </a>
              {/* 彩蛋 Tooltip - PC端hover触发，移动端点击触发 */}
              <span className={`absolute -top-4 left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none z-10 ${
                isMobile 
                  ? (showEmailEasterEgg ? 'opacity-100 translate-y-0 -top-24' : 'opacity-0 translate-y-0 -top-4')
                  : 'opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:-top-24'
              }`}>
                <span className="relative block bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs px-4 py-3 rounded-lg shadow-lg w-[220px] text-center">
                  🏸 我是个羽毛球爱好者，如果我们有幸成为同事，欢迎每周一起约球~
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-8 border-transparent border-t-blue-600"></span>
                </span>
              </span>
            </div>
            
            {/* Location */}
            <div 
              className="bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-6 hover:border-cyan-300 dark:hover:border-cyan-500/50 transition-all group text-center relative shadow-sm cursor-pointer"
              onClick={() => isMobile && setShowLocationEasterEgg(!showLocationEasterEgg)}
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard('北京市朝阳区', 'location');
                }}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600/50 transition-colors z-20"
                aria-label="复制地址"
              >
                {copiedItem === 'location' ? (
                  <Check className="w-4 h-4 text-green-500 dark:text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400 dark:text-slate-400" />
                )}
              </button>
              <div className="block">
                <MapPin className="w-8 h-8 text-cyan-500 dark:text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-slate-900 dark:text-white font-medium">地点</div>
                <div className="text-slate-500 dark:text-slate-400 text-sm mt-1">北京市朝阳区</div>
              </div>
              {/* 彩蛋 Tooltip - PC端hover触发，移动端点击触发 */}
              <span className={`absolute -top-4 left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none z-10 ${
                isMobile 
                  ? (showLocationEasterEgg ? 'opacity-100 translate-y-0 -top-24' : 'opacity-0 translate-y-0 -top-4')
                  : 'opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:-top-24'
              }`}>
                <span className="relative block bg-gradient-to-r from-cyan-600 to-teal-600 text-white text-xs px-4 py-3 rounded-lg shadow-lg w-[220px] text-center">
                  ☕ 重度咖啡爱好者，最喜欢耶加雪菲与酒香意式拼配。
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-8 border-transparent border-t-cyan-600"></span>
                </span>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-transparent">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            © 2025 任智韬 | AI产品经理 | 使用Coze Code构建
          </p>
          <p className="text-slate-400 dark:text-slate-600 text-xs mt-2">
            本网站通过AI辅助编程完成（开发时长1天，20+轮对话迭代），展现了Vibe Coding实践能力
          </p>
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-slate-400 dark:text-slate-600">
            <span>版本 v2.0</span>
            <span>•</span>
            <span>最后更新：2025-03-11</span>
            <span>•</span>
            <span>3次版本迭代</span>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full shadow-lg shadow-purple-500/30 flex items-center justify-center transition-all hover:scale-110 z-50"
          aria-label="回到顶部"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  );
}
