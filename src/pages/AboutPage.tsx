import { motion } from 'framer-motion';

type PageType = 'home' | 'spots' | 'kashgar' | 'culture' | 'about' | 'fieldtrip' | 'archive';

function AboutPage({ onBack, setCurrentPage }: { onBack: () => void; setCurrentPage: (page: PageType) => void }) {
  const facts = [
    { number: '166', unit: '万平方公里', label: '总面积' },
    { number: '25', unit: '个', label: '世居民族' },
    { number: '61', unit: '个', label: '边境口岸' },
    { number: '56', unit: '处', label: '国家A级景区' },
  ];

  const regions = [
    {
      id: '1',
      name: '北疆',
      description: '草原与雪山的交响',
      features: ['阿尔泰山', '天山天池', '那拉提草原', '喀纳斯湖'],
    },
    {
      id: '2',
      name: '南疆',
      description: '沙漠与绿洲的诗篇',
      features: ['塔克拉玛干', '喀什古城', '和田玉', '千佛洞'],
    },
    {
      id: '3',
      name: '东疆',
      description: '火焰与葡萄的故乡',
      features: ['吐鲁番', '火焰山', '葡萄沟', '哈密瓜'],
    },
  ];

  return (
    <div className="about-page">
      <nav className="top-nav">
        <div className="nav-left">
          <span className="logo-cn">新疆</span>
          <span className="logo-en">XINJIANG</span>
        </div>
        <div className="nav-right">
          <button className="nav-item" onClick={onBack}>首页</button>
          <button className="nav-item" onClick={() => setCurrentPage('kashgar')}>文化解码</button>
          <button className="nav-item" onClick={() => setCurrentPage('fieldtrip')}>实地探访</button>
          <button className="nav-item" onClick={() => setCurrentPage('archive')}>风物档案</button>
          <button className="nav-item" onClick={() => setCurrentPage('culture')}>丝路文化</button>
          <button className="nav-item active">关于新疆</button>
          <button className="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <motion.div
        className="about-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="section-number">02</span>
          <h1 className="page-title">关于新疆</h1>
          <p className="description">
            新疆维吾尔自治区，位于中国西北边陲，是中国陆地面积最大的省级行政区。
            这里既有壮丽的自然风光，也有多元的民族文化，是一片充满魅力的土地。
          </p>
        </motion.div>

        <motion.div
          className="facts-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="facts-grid">
            {facts.map((fact, index) => (
              <motion.div
                key={fact.label}
                className="fact-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <span className="fact-number">{fact.number}</span>
                <span className="fact-unit">{fact.unit}</span>
                <span className="fact-label">{fact.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="regions-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="section-title">三大地理区域</h2>
          <div className="regions-grid">
            {regions.map((region, index) => (
              <motion.div
                key={region.id}
                className="region-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.15 }}
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="region-name">{region.name}</h3>
                <p className="region-desc">{region.description}</p>
                <ul className="region-features">
                  {region.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="about-footer"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="footer-image">
            <img
              src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Xinjiang%20panoramic%20landscape%20mountains%20desert%20grassland%20lake&image_size=landscape_16_9"
              alt="新疆全景"
            />
          </div>
          <div className="footer-content">
            <h2 className="footer-title">走进新疆</h2>
            <p className="footer-desc">
              新疆是一个多民族聚居的地方，各民族在这里和谐共处，共同创造了灿烂的文化。
              从雄伟的天山到辽阔的草原，从神秘的沙漠到富饶的绿洲，新疆的每一寸土地都散发着独特的魅力。
              欢迎您来新疆，感受这片土地的神奇与壮美。
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AboutPage;
