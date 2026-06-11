import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface Review {
  name: string;
  location: string;
  rating: number;
  content: string;
  package?: string;
}

interface Spot {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bgImage: string;
  video?: string;
  rating: number;
  tags: string[];
  highlights: string[];
  reviews: Review[];
  localTags: string[];
}

const spots: Spot[] = [
  {
    id: '02',
    title: '喀什',
    subtitle: 'KASHGAR',
    description: '喀什是古丝绸之路的十字路口，千年古城在此交汇。作为西域的明珠，它见证了东西方文明的共振，至今仍保留着最纯粹的西域烟火气。',
    bgImage: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Kashgar%20ancient%20city%20traditional%20architecture%20sunset%20warm%20light&image_size=landscape_16_9',
    rating: 5,
    tags: ['古城遗迹', '多元文化', '丝路风情', '特色美食', '民族手工艺'],
    highlights: ['维吾尔木卡姆', '艾提尕尔清真寺', '喀什古城', '民族舞蹈', '铜器工艺'],
    reviews: [
      {
        name: '王小云',
        location: 'Surabaya, 印尼',
        rating: 5,
        content: '喀什古城的美无可言表，这次旅行让我们既轻松又充满乐趣。',
        package: '尊享套餐',
      },
      {
        name: 'David Johnson',
        location: 'New York, 美国',
        rating: 5,
        content: 'Kashgar is like stepping back in time. The ancient city walls and the bustling bazaar are unforgettable.',
        package: '深度游',
      },
    ],
    localTags: ['艾提尕尔清真寺', '喀什古城', '大巴扎', '香妃墓', '帕米尔高原', '塔什库尔干', '红其拉甫口岸', '达瓦昆沙漠'],
  },
  {
    id: '03',
    title: '塔克拉玛干沙漠',
    subtitle: 'TAKLAMAKAN DESERT',
    description: '塔克拉玛干沙漠是中国最大的沙漠，也是世界第二大流动沙漠。这里沙丘起伏，沙海无垠，是丝绸之路最壮丽的考验之地。',
    bgImage: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Taklamakan%20desert%20sand%20dunes%20sunset%20golden%20light&image_size=landscape_16_9',
    video: '/sm.mp4',
    rating: 5,
    tags: ['沙漠探险', '自然风光', '摄影天堂', '星空观测', '越野穿越'],
    highlights: ['沙漠驼队商旅', '胡杨林', '和田玉雕', '丝路遗迹', '星空观测'],
    reviews: [],
    localTags: ['塔克拉玛干', '胡杨林', '沙漠公路', '尼雅遗址', '阿拉尔', '和田河', '克里雅河', '约特干遗址'],
  },
  {
    id: '04',
    title: '吐鲁番',
    subtitle: 'TURPAN',
    description: '吐鲁番是中国最热的地方，古称火洲。这里有千年的历史遗迹，灿烂的葡萄文化，是东西方文化交织的人文之地。',
    bgImage: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Turpan%20ancient%20city%20grape%20valley%20oasis&image_size=landscape_16_9',
    video: '/t.mp4',
    rating: 4,
    tags: ['历史遗迹', '葡萄文化', '火焰山', '坎儿井', '民俗风情'],
    highlights: ['葡萄节庆', '坎儿井水利', '交河故城', '吐峪沟', '民族歌舞'],
    reviews: [],
    localTags: ['火焰山', '葡萄沟', '交河故城', '坎儿井', '高昌故城', '阿斯塔那古墓', '柏孜克里克千佛洞', '库木塔格沙漠'],
  },
  {
    id: '05',
    title: '天山',
    subtitle: 'TIAN SHAN',
    description: '天山是世界级的山脉，拥有壮丽的雪山、广袤的草原和清澈的湖泊。这里是自然的馈赠，是新疆最美丽的风景线。',
    bgImage: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Tianshan%20mountains%20snow%20peaks%20alpine%20meadows%20lake&image_size=landscape_16_9',
    video: '/ts.mp4',
    rating: 5,
    tags: ['雪山风光', '草原牧场', '湖泊美景', '徒步旅行', '民族风情'],
    highlights: ['哈萨克族马术', '草原那达慕', '天池传说', '游牧文化', '天山岩画'],
    reviews: [],
    localTags: ['天山天池', '博格达峰', '那拉提', '巴音布鲁克', '赛里木湖', '喀拉峻', '禾木村', '五彩滩'],
  },
  {
    id: '06',
    title: '敦煌',
    subtitle: 'DUNHUANG',
    description: '敦煌是丝绸之路上的艺术宝库，以莫高窟壁画闻名于世。这里保存着千年的历史和艺术，是中华文明的瑰宝。',
    bgImage: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Dunhuang%20Mogao%20caves%20desert%20oasis%20ancient%20art&image_size=landscape_16_9',
    video: '/dh.mp4',
    rating: 5,
    tags: ['艺术宝库', '历史遗迹', '壁画艺术', '沙漠绿洲', '丝路文化'],
    highlights: ['敦煌壁画', '莫高窟艺术', '丝路商旅', '藏经洞', '沙洲夜市'],
    reviews: [],
    localTags: ['莫高窟', '月牙泉', '鸣沙山', '雅丹地貌', '玉门关', '阳关', '汉长城', '敦煌古城'],
  },
];

const images: Record<string, string[]> = {
  '02': [
    '/ks1.png',
    '/ks2.png',
    '/ks3.png',
    '/ks4.png',
  ],
  '03': [
    '/sm1.png',
    '/sm2.png',
    '/sm3.png',
    '/sm4.png',
  ],
  '04': [
    '/t1.png',
    '/t2.png',
    '/t3.png',
    '/t4.png',
  ],
  '05': [
    '/ts4.png',
    '/ts3.png',
    '/ts2.png',
    '/ts.png',
  ],
  '06': [
    '/dh.png',
    '/dh2.png',
    '/dh4.png',
    '/dh3.png',
  ],
};

type PageType = 'home' | 'spots' | 'kashgar' | 'fieldtrip' | 'archive' | 'map';

function KashgarPage({ onBack, setCurrentPage }: { onBack: () => void; setCurrentPage: (page: PageType) => void }) {
  const [currentSpotIndex, setCurrentSpotIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const controls = useAnimation();
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const currentSpot = spots[currentSpotIndex];
  const currentImages = images[currentSpot.id] || images['02'];

  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    });
  }, [controls, currentSpotIndex]);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  useEffect(() => {
    setCurrentImageIndex(0);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  }, [currentSpotIndex]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  const handleSpotChange = (index: number) => {
    setCurrentSpotIndex(index);
  };

  const stars = '★'.repeat(currentSpot.rating);

  return (
    <div className="kashgar-page">
      <motion.div 
        className="kashgar-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ 
          backgroundImage: `url(${currentImages[currentImageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <nav className="top-nav">
        <div className="nav-left">
          <span className="logo-cn">新疆</span>
          <span className="logo-en">XINJIANG</span>
        </div>
        <div className="nav-right">
          <button className="nav-item" onClick={onBack}>首页</button>
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

      <div className="kashgar-container">
        <motion.div
          className="left-column"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="spot-title-wrapper" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="page-title">{currentSpot.title}</h1>
          </motion.div>

          <motion.div 
            className="description" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          >
            <p>{currentSpot.description}</p>
          </motion.div>

          <motion.div 
            className="rating-reviews" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          >
            <div className="rating-row">
              <span className="rating-label">推荐指数</span>
              <span className="stars">{stars}</span>
            </div>
            {currentSpot.localTags && currentSpot.localTags.length > 0 && (
              <div className="local-tags">
                <div className="local-tags-title">当地标签</div>
                <div className="local-tags-list">
                  {currentSpot.localTags.map((tag, index) => (
                    <span key={index} className="local-tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}
            {currentSpot.id === '02' && (
              <motion.button
                className="explore-more-btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                onClick={() => window.open('https://www.douyin.com/user/MS4wLjABAAAAhqvJN7g9labfaugMo-k8laMM3s5KH224PKN00C4un9JO74hRFsjTGwVxn4IK09yt?from_tab_name=main', '_blank')}
              >
                探索更多
                <span className="arrow">→</span>
              </motion.button>
            )}
            {currentSpot.id === '03' && (
              <motion.button
                className="explore-more-btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                onClick={() => window.open('https://www.douyin.com/jingxuan/search/%E5%A1%94%E5%85%8B%E6%8B%89%E7%8E%9B%E5%B9%B2%E6%B2%99%E6%BC%A0%E7%AE%80%E4%BB%8B?type=general', '_blank')}
              >
                探索更多
                <span className="arrow">→</span>
              </motion.button>
            )}
            {currentSpot.id === '04' && (
              <motion.button
                className="explore-more-btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                onClick={() => window.open('https://www.douyin.com/user/MS4wLjABAAAAt_kSf0hnHbVZ0feJLoTbg3JvZFkE8rZ6J4v4ENgqFbw?from_tab_name=main', '_blank')}
              >
                探索更多
                <span className="arrow">→</span>
              </motion.button>
            )}
            {currentSpot.id === '05' && (
              <motion.button
                className="explore-more-btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                onClick={() => window.open('https://www.douyin.com/user/MS4wLjABAAAAtixfGdJnNcAx1BoqY36s3khV518fYUeTV9Gz-N52qVk?from_tab_name=main', '_blank')}
              >
                探索更多
                <span className="arrow">→</span>
              </motion.button>
            )}
            {currentSpot.id === '06' && (
              <motion.button
                className="explore-more-btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                onClick={() => window.open('https://www.douyin.com/user/MS4wLjABAAAAhJT01n1aZVGAXjk1fu2ERf0wGuO5NE5eFaK7awYXMzc?from_tab_name=main', '_blank')}
              >
                探索更多
                <span className="arrow">→</span>
              </motion.button>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="center-column"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
        >
          <div className="image-carousel">
            <motion.img
              key={`${currentSpot.id}-${currentImageIndex}`}
              src={currentImages[currentImageIndex]}
              alt={`${currentSpot.title} ${currentImageIndex + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="carousel-image"
            />
            <div className="carousel-overlay">
              <span className="image-caption">{currentSpot.title} · 第 {currentImageIndex + 1} 张</span>
            </div>
            <button className="carousel-btn prev-btn" onClick={prevImage}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="carousel-btn next-btn" onClick={nextImage}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

        <motion.div
          className="right-column"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="video-section" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          >
            <div className="video-container">
              <video
                ref={videoRef}
                className="video-player"
                src={currentSpot.video || '/ks.mp4'}
                poster={currentSpot.bgImage}
                controlsList="nodownload"
              />
              <div className="video-controls">
                <button className="video-play-btn" onClick={toggleVideoPlay}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {isVideoPlaying ? (
                      <>
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </>
                    ) : (
                      <path d="M8 5v14l11-7z" />
                    )}
                  </svg>
                </button>
                <button className="fullscreen-btn" onClick={toggleFullscreen}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 4H4a2 2 0 00-2 2v3m18 0V6a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M4 20h3a2 2 0 002-2v-3" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="video-info">
              <h3 className="video-title">走进{currentSpot.title}</h3>
              <p className="video-desc">探索{currentSpot.title}的独特魅力</p>
            </div>
          </motion.div>

          <motion.div 
            className="highlights" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
          >
            <h3 className="highlights-title">非遗民俗</h3>
            <ul className="highlights-list">
              {currentSpot.highlights.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      <div className="bottom-progress-bar">
        <div className="progress-track">
          {spots.map((spot, index) => (
            <React.Fragment key={spot.id}>
              <button
                className={`progress-item ${index === currentSpotIndex ? 'active' : ''}`}
                onClick={() => handleSpotChange(index)}
              >
                <span className="progress-dot"></span>
                <span className="progress-label">{spot.title}</span>
              </button>
              {index < spots.length - 1 && <div className="progress-line"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default KashgarPage;
