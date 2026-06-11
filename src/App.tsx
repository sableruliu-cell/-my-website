import { useState } from 'react';
import { motion } from 'framer-motion';
import KashgarPage from './pages/KashgarPage';
import MapPage from './pages/MapPage';

const heroSection = {
  id: '01',
  title: '新疆 · 丝绸之路',
  subtitle: 'XINJIANG · THE SILK ROAD',
  description: '穿越千年，遇见多元文明',
  featuredSpot: {
    name: '喀什',
    nameEn: 'KASHGAR',
    desc: '丝路重镇，多元文化交融之地',
    desc2: '古老的街巷，诉说着千年的故事',
    image: '1.png'
  }
};

const spots = [
  { id: '02', title: '喀什', subtitle: 'KASHGAR', description: '丝路重镇，多元文化交汇的城市\n充满生活气息的边疆之地', bgImage: '2.png' },
  { id: '03', title: '塔克拉玛干沙漠', subtitle: 'TAKLAMAKAN DESERT', description: '中国最大的沙漠\n神秘而壮阔\n丝绸之路的考验之地', bgImage: 'desert.jpg' },
  { id: '04', title: '吐鲁番', subtitle: 'TURPAN', description: '火洲之地\n历史遗迹与葡萄文化\n交织的人文之地', bgImage: 'turpan.jpg' },
  { id: '05', title: '天山', subtitle: 'TIAN SHAN', description: '世界级的山脉\n雪山、草原、湖泊\n自然的馈赠', bgImage: 'tianshan.jpg' },
  { id: '06', title: '敦煌', subtitle: 'DUNHUANG', description: '艺术宝库\n丝路明珠\n千年的历史回响', bgImage: 'dunhuang.jpg' },
];

type PageType = 'home' | 'spots' | 'kashgar' | 'fieldtrip' | 'archive' | 'map';

const fieldTripData = [
  {
    title: '阿勒泰',
    date: '2026年5月',
    text: '清晨驱车驶入阿勒泰腹地，海拔逐渐抬升，视野豁然开朗。眼前这幅画面正是当地哈萨克牧民世代沿袭的"夏窝子"——高山草甸与原始森林交错带。远处主峰积雪未消，山腰处云杉如墨，层层叠叠向谷底倾泻；近处草场绿得发亮，那是冰川融水滋养的结果。远处的雪山与近处的绿意形成鲜明对比，仿佛大自然在此处打翻了调色盘，每一处色彩都恰到好处。骑马穿行于山间小径，清风拂面，带着松香与青草的气息，让人忘却尘世烦忧。',
    image: './alt.png'
  },
  {
    title: '伊犁',
    date: '2026年5月',
    text: '在实地探访中，骑马穿越草甸是必不可少的体验。跨上健硕的伊犁马，在哈萨克牧民的指引下缓步前行，耳边只有清风穿过松林和远处牛羊的低鸣。这里的山坡线条柔和得像凝固的波浪，随着云朵的移动，光影在山谷间反复横跳，每一帧都是天然的油画。傍晚时分，夕阳将整片草原染成金红色，牧民们赶着羊群归家，炊烟袅袅升起，这便是诗中描绘的世外桃源，让人流连忘返。',
    image: './yl.png'
  },
  {
    title: '果子沟大桥',
    date: '2026年5月',
    text: '如果说那拉提是伊犁的柔美，那么果子沟大桥便是这片土地上最雄浑的工业史诗。作为赛里木湖通往伊犁河谷的必经之路，这座全长700米、主塔高逾200米的大桥，如同一把银色的巨锁，横跨在深邃的峡谷之间。站在观景台上俯瞰，大桥的钢索如琴弦般紧绷，在阳光下闪烁着金属的光泽。峡谷两侧的崖壁陡峭险峻，融雪汇聚成溪流奔涌而下，与大桥的雄伟形成动静结合的壮美画卷。',
    image: './gz.png'
  },
  {
    title: '赛里木湖',
    date: '2026年5月',
    text: '越过果子沟大桥，地势豁然开朗，那一抹浓郁到近乎不真实的湛蓝便跃然眼前。赛里木湖，这颗镶嵌在天山山脉中的"高山明珠"，以其极致的纯净洗涤着每一位造访者的心灵。湖面如镜，倒映着蓝天白云与四周的雪山，远处的水天一色让人分不清哪里是湖哪里是天。湖畔野花遍地，蒙古包零星点缀其间，牧歌悠扬。传说中这是一汪能够映照前世今生的圣湖，无数恋人于此许下誓言，让这片湖水承载了更多浪漫与神秘。',
    image: './h.png'
  },
  {
    title: '那拉提',
    date: '2026年5月',
    text: '如果说赛里木湖是静谧的深蓝，那么那拉提则是伊犁河谷中最热烈、最生动的翠绿。作为世界四大草原之一的亚高山草甸植物区，这里不仅是地理意义上的"高地"，更是无数旅人心中的"治愈之地"。延绵的草原如绿色的海洋，波涛起伏，远处的雪峰在阳光下闪耀，近处的牧马奔腾。哈萨克族的姑娘们穿着鲜艳的服饰，在花海中载歌载舞，游客可以参与其中，体验浓郁的民族风情，让身心在此彻底放松。',
    image: './t.png'
  },
];

type ArchiveCategory = 'food' | 'craft' | 'architecture' | 'dialect' | 'music' | 'specialty' | 'fruit' | 'culture';

interface ArchiveItem {
  id: string;
  name: string;
  category: ArchiveCategory;
  categoryLabel: string;
  summary: string;
  price?: string;
  location?: string;
  tip?: string;
  image: string;
  exploreLink?: string;
}

const archiveData: ArchiveItem[] = [
  {
    id: 'archive-1',
    name: '新疆大盘鸡',
    category: 'food',
    categoryLabel: '美食',
    summary: '鸡肉爽滑麻辣，土豆软糯，皮带面是灵魂。',
    price: '￥80-120',
    location: '沙湾/夜市',
    tip: '记得加皮带面',
    image: './dpj.png',
    exploreLink: 'https://baike.so.com/doc/5405978-5643773.html'
  },
  {
    id: 'archive-2',
    name: '红柳烤肉',
    category: 'food',
    categoryLabel: '美食',
    summary: '肥瘦相间，外焦里嫩，红柳清香。',
    price: '￥6-12',
    location: '喀什古城',
    tip: '认准红柳枝',
    image: './kr.png',
    exploreLink: 'https://baike.so.com/doc/25783232-26919328.html'
  },
  {
    id: 'archive-3',
    name: '艾德莱斯绸',
    category: 'craft',
    categoryLabel: '手工艺',
    summary: '手工扎染，色彩浓郁，丝路瑰宝。',
    price: '￥50-300',
    location: '和田/大巴扎',
    tip: '区分真丝与人造丝',
    image: './sc.png',
    exploreLink: 'https://baike.so.com/doc/5754166-5966927.html'
  },
  {
    id: 'archive-4',
    name: '英吉沙小刀',
    category: 'craft',
    categoryLabel: '手工艺',
    summary: '国家级非遗，造型精美，工艺精湛。',
    price: '￥100-上千元',
    location: '英吉沙县',
    tip: '需邮寄，无法登机',
    image: './dao.png',
    exploreLink: 'https://baike.so.com/doc/5724208-32316329.html'
  },
  {
    id: 'archive-5',
    name: '阿以旺民居',
    category: 'architecture',
    categoryLabel: '建筑',
    summary: '喀什地标，黄土建筑，冬暖夏凉。',
    price: '免费',
    location: '高台民居',
    tip: '尊重居民隐私',
    image: './ju.png',
    exploreLink: 'https://baike.so.com/doc/1855075-1961808.html'
  },
  {
    id: 'archive-6',
    name: '新疆话指南',
    category: 'dialect',
    categoryLabel: '方言',
    summary: '劳道=厉害，勺子=笨蛋，歪江=哎呀。',
    price: '免费',
    location: '日常交流',
    tip: '语气上扬更地道',
    image: './hua.png',
    exploreLink: 'https://baike.so.com/doc/7891533-8165628.html'
  },
  {
    id: 'archive-7',
    name: '吐鲁番葡萄',
    category: 'fruit',
    categoryLabel: '瓜果',
    summary: '日照充足，天山雪水灌溉，甜度爆表。',
    price: '￥5-15',
    location: '葡萄沟',
    tip: '7-9月最甜，可直邮',
    image: './pt.png',
    exploreLink: 'https://baike.so.com/doc/3887072-4080233.html'
  },
  {
    id: 'archive-8',
    name: '麦西热甫',
    category: 'culture',
    categoryLabel: '文化',
    summary: '民族文化盛宴，歌舞游艺一体。',
    price: '免费',
    location: '喀什百年茶馆',
    tip: '听到鼓声即可加入',
    image: './mai.png',
    exploreLink: 'https://baike.so.com/doc/6553225-6766973.html'
  },
];

function FieldTripPage({ setCurrentPage }: { setCurrentPage: (page: PageType) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitDirection, setExitDirection] = useState<'right' | 'left'>('right');
  const touchStartX = { current: 0 };

  const goToNext = () => {
    if (isAnimating || currentIndex >= fieldTripData.length - 1) return;
    setExitDirection('right');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(false);
    }, 600);
  };

  const goToPrev = () => {
    if (isAnimating || currentIndex <= 0) return;
    setExitDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => prev - 1);
      setIsAnimating(false);
    }, 600);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex > 0) {
        goToPrev();
      } else if (diff < 0 && currentIndex < fieldTripData.length - 1) {
        goToNext();
      }
    }
  };

  const getCardPosition = (index: number) => {
    const offset = index - currentIndex;
    if (offset === 0) return 'top';
    if (offset > 0) return 'behind';
    return 'bottom';
  };

  const currentImage = fieldTripData[currentIndex].image;

  return (
    <div className="field-trip-page">
      <motion.div 
        className="field-trip-bg"
        initial={{ opacity: 0.5 }}
        animate={{ 
          opacity: 0.5,
          backgroundImage: `url(${currentImage})`
        }}
        transition={{ duration: 0.8 }}
      />
      
      <nav className="top-nav">
        <div className="nav-left">
          <span className="logo-cn">新疆</span>
          <span className="logo-en">XINJIANG</span>
        </div>
        <div className="nav-right">
          <button className="nav-item" onClick={() => setCurrentPage('home')}>首页</button>
          <button className="nav-item" onClick={() => setCurrentPage('kashgar')}>文化解码</button>
          <button className="nav-item active">实地探访</button>
          <button className="nav-item" onClick={() => setCurrentPage('archive')}>风物档案</button>
          <button className="nav-item" onClick={() => setCurrentPage('map')}>互动地图</button>
          <button className="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div 
        className="card-stack-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="card-stack">
          {fieldTripData.map((trip, index) => {
            const position = getCardPosition(index);
            const isExiting = isAnimating && position === 'top';
            
            return (
              <motion.div 
                key={index}
                className={`stack-card ${position === 'top' ? 'active' : ''}`}
                initial={position === 'top' ? { 
                  scale: 1, 
                  y: 0, 
                  x: 0, 
                  rotate: 0,
                  opacity: 1,
                  zIndex: fieldTripData.length
                } : position === 'behind' ? {
                  scale: 0.95,
                  y: 30,
                  x: 0,
                  rotate: 0,
                  opacity: 0.85,
                  zIndex: fieldTripData.length - index
                } : {
                  scale: 0.85,
                  y: 60,
                  x: 15,
                  rotate: 2,
                  opacity: 0.6,
                  zIndex: index + 1
                }}
                animate={isExiting ? exitDirection === 'right' ? {
                  scale: 0.85,
                  x: 80,
                  y: -30,
                  rotate: 8,
                  opacity: 0,
                  zIndex: 1
                } : {
                  scale: 0.85,
                  x: -80,
                  y: -30,
                  rotate: -8,
                  opacity: 0,
                  zIndex: 1
                } : position === 'top' ? {
                  scale: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  opacity: 1,
                  zIndex: fieldTripData.length
                } : position === 'behind' ? {
                  scale: 0.95,
                  y: 30,
                  x: 0,
                  rotate: 0,
                  opacity: 0.85,
                  zIndex: fieldTripData.length - index
                } : {
                  scale: 0.85,
                  y: 60,
                  x: 15,
                  rotate: 2,
                  opacity: 0.6,
                  zIndex: index + 1
                }}
                transition={{ 
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                  duration: 0.6
                }}
              >
                <div className="stack-card-inner">
                  <div className="card-content">
                    <div className="card-left">
                      <div className="card-number">{String(index + 1).padStart(2, '0')}</div>
                      <h2 className="card-title">{trip.title}</h2>
                      <div className="card-rating">
                        <span className="star">★</span>
                        <span className="star">★</span>
                        <span className="star">★</span>
                        <span className="star">★</span>
                        <span className="star">★</span>
                      </div>
                      <div className="card-date">{trip.date}</div>
                      <p className="card-text">{trip.text}</p>
                    </div>
                    <div className="card-right">
                      <div className="card-image-frame">
                        <img src={trip.image} alt={trip.title} className="card-image" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="page-navigation">
        <button 
          className={`nav-btn prev ${currentIndex === 0 ? 'disabled' : ''}`} 
          onClick={goToPrev}
          disabled={currentIndex === 0 || isAnimating}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="page-dots">
          {fieldTripData.map((_, index) => (
            <button 
              key={index} 
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                if (index === currentIndex || isAnimating) return;
                setExitDirection(index > currentIndex ? 'right' : 'left');
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsAnimating(false);
                }, 600);
              }}
            />
          ))}
        </div>

        <button 
          className={`nav-btn next ${currentIndex === fieldTripData.length - 1 ? 'disabled' : ''}`} 
          onClick={goToNext}
          disabled={currentIndex === fieldTripData.length - 1 || isAnimating}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="page-title-indicator">
        <span className="current-title">{fieldTripData[currentIndex].title}</span>
        <span className="page-count">{currentIndex + 1} / {fieldTripData.length}</span>
      </div>
    </div>
  );
}

function ArchivePage({ setCurrentPage }: { setCurrentPage: (page: PageType) => void }) {
  const [activeCategory, setActiveCategory] = useState<ArchiveCategory | 'all'>('all');

  const categories: { key: ArchiveCategory | 'all'; label: string }[] = [
    { key: 'all', label: '全部' },
    { key: 'food', label: '特色美食' },
    { key: 'craft', label: '手工艺品' },
    { key: 'architecture', label: '传统建筑' },
    { key: 'dialect', label: '地道方言' },
    { key: 'culture', label: '民族文化' },
  ];

  const filteredData = activeCategory === 'all' 
    ? archiveData 
    : archiveData.filter(item => item.category === activeCategory);

  return (
    <div className="modern-luxury-archive">
      <nav className="top-nav">
        <div className="nav-left">
          <span className="logo-cn">新疆</span>
          <span className="logo-en">XINJIANG</span>
        </div>
        <div className="nav-right">
          <button className="nav-item" onClick={() => setCurrentPage('home')}>首页</button>
          <button className="nav-item" onClick={() => setCurrentPage('kashgar')}>文化解码</button>
          <button className="nav-item" onClick={() => setCurrentPage('fieldtrip')}>实地探访</button>
          <button className="nav-item active">风物档案</button>
          <button className="nav-item" onClick={() => setCurrentPage('map')}>互动地图</button>
          <button className="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className="luxury-archive-content">

        <motion.div 
          className="luxury-filter-tabs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`luxury-filter-tab ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <motion.div 
          className="luxury-grid-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          key={activeCategory}
        >
          {filteredData.map((item, index) => (
            <motion.div
              key={item.id}
              className="luxury-grid-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="luxury-card-image-wrapper">
                <img src={item.image} alt={item.name} className="luxury-card-image" />
                <div className="luxury-card-overlay"></div>
                <span className="luxury-category-tag">[ {item.categoryLabel} ]</span>
                <button 
                  className="luxury-explore-btn"
                  onClick={() => {
                    if (item.exploreLink) {
                      window.open(item.exploreLink, '_blank');
                    }
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="luxury-card-text-content">
                  <h3 className="luxury-card-title">{item.name}</h3>
                  <p className="luxury-card-summary">{item.summary}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function App() {
  const [activeSpotIndex, setActiveSpotIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const currentSpot = spots[activeSpotIndex];

  const renderHomePage = () => (
    <div className="portfolio-container">
      <nav className="top-nav">
        <div className="nav-left">
          <span className="logo-cn">新疆</span>
          <span className="logo-en">XINJIANG</span>
        </div>
        <div className="nav-right">
          <button className="nav-item active">首页</button>
          <button className="nav-item" onClick={() => setCurrentPage('kashgar')}>文化解码</button>
          <button className="nav-item" onClick={() => setCurrentPage('fieldtrip')}>实地探访</button>
          <button className="nav-item" onClick={() => setCurrentPage('archive')}>风物档案</button>
          <button className="nav-item" onClick={() => setCurrentPage('map')}>互动地图</button>
          <button className="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className="sections-wrapper">
        <motion.section
          key="hero"
          className="fullscreen-section hero-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="section-inner">
            <div className="hero-left">
              <div className="vertical-nav">
                <span className="vert-num">01</span>
                <div className="vert-line"></div>
                <span className="vert-num">06</span>
              </div>
            </div>

            <div className="hero-center">
              <span className="section-number">{heroSection.id}</span>
              <h1 className="hero-main-heading">{heroSection.title}</h1>
              <span className="sub-heading">{heroSection.subtitle}</span>
              <p className="section-description">{heroSection.description}</p>
            </div>

            <div className="hero-footer">
              <button className="scroll-hint" onClick={() => setCurrentPage('kashgar')}>
                <div className="mouse-icon">
                  <svg viewBox="0 0 24 36" fill="none">
                    <rect x="1" y="1" width="22" height="34" rx="11" stroke="currentColor" strokeWidth="1.5"/>
                    <line x1="12" y1="8" x2="12" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="scroll-text">SCROLL</span>
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );

  const renderSpotsPage = () => (
    <div className="spots-container">
      <nav className="top-nav">
        <div className="nav-left">
          <span className="logo-cn">新疆</span>
          <span className="logo-en">XINJIANG</span>
        </div>
        <div className="nav-right">
          <button className="nav-item" onClick={() => setCurrentPage('home')}>首页</button>
          <button className="nav-item active">文化解码</button>
          <button className="nav-item" onClick={() => setCurrentPage('fieldtrip')}>实地探访</button>
          <button className="nav-item" onClick={() => setCurrentPage('archive')}>风物档案</button>
          <button className="nav-item" onClick={() => setCurrentPage('map')}>互动地图</button>
          <button className="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <motion.section
        className="spot-section"
        style={{ backgroundImage: `url(${currentSpot.bgImage})` }}
        key={currentSpot.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-inner">
          <div className="spot-content-block">
            <span className="section-number">{currentSpot.id}</span>
            <h1 className="spot-main-heading">{currentSpot.title}</h1>
            <span className="sub-heading">{currentSpot.subtitle}</span>
            <p className="section-description">{currentSpot.description}</p>
            {currentSpot.id === '02' && (
              <button className="explore-btn" onClick={() => setCurrentPage('kashgar')}>
                了解更多 →
              </button>
            )}
          </div>
        </div>
      </motion.section>

      <div className="bottom-progress-bar">
        <div className="progress-track">
          {spots.map((spot, index) => (
            <button
              key={spot.id}
              className={`progress-item ${index === activeSpotIndex ? 'active' : ''}`}
              onClick={() => setActiveSpotIndex(index)}
            >
              <span className="progress-dot"></span>
              <span className="progress-label">{spot.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (currentPage === 'kashgar') {
    return <KashgarPage onBack={() => setCurrentPage('home')} setCurrentPage={setCurrentPage} />;
  }

  if (currentPage === 'fieldtrip') {
    return <FieldTripPage setCurrentPage={setCurrentPage} />;
  }

  if (currentPage === 'archive') {
    return <ArchivePage setCurrentPage={setCurrentPage} />;
  }

  if (currentPage === 'map') {
    return <MapPage setCurrentPage={setCurrentPage} />;
  }

  if (currentPage === 'spots') {
    return renderSpotsPage();
  }

  return renderHomePage();
}

export default App;