import { motion } from 'framer-motion';

type PageType = 'home' | 'spots' | 'kashgar' | 'culture' | 'about' | 'fieldtrip' | 'archive';

function CulturePage({ onBack, setCurrentPage }: { onBack: () => void; setCurrentPage: (page: PageType) => void }) {
  const cultures = [
    {
      id: '1',
      title: '龟兹乐舞',
      subtitle: 'KUCI DANCE',
      description: '龟兹乐舞是古代西域最著名的乐舞艺术，融合了印度、波斯和中原文化，是丝绸之路上的艺术瑰宝。',
      image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20Chinese%20dance%20performance%20traditional%20costume&image_size=landscape_16_9',
    },
    {
      id: '2',
      title: '木卡姆艺术',
      subtitle: 'MUQAM',
      description: '十二木卡姆是维吾尔族的传统音乐瑰宝，被列入世界非物质文化遗产，是丝路文化的活化石。',
      image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Uighur%20traditional%20music%20performance%20instruments&image_size=landscape_16_9',
    },
    {
      id: '3',
      title: '壁画艺术',
      subtitle: 'MURAL ART',
      description: '敦煌莫高窟壁画是世界上规模最大、内容最丰富的艺术宝库，记录了千年丝路的辉煌历史。',
      image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Dunhuang%20Mogao%20caves%20murals%20ancient%20art&image_size=landscape_16_9',
    },
    {
      id: '4',
      title: '玉石文化',
      subtitle: 'JADE CULTURE',
      description: '和田玉是中国四大名玉之一，产自昆仑山脉，自古以来就是丝绸之路重要的贸易商品。',
      image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20jade%20carving%20ancient%20treasure&image_size=landscape_16_9',
    },
  ];

  return (
    <div className="culture-page">
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
          <button className="nav-item active">丝路文化</button>
          <button className="nav-item" onClick={() => setCurrentPage('about')}>关于新疆</button>
          <button className="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <motion.div
        className="culture-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="culture-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="section-number">01</span>
          <h1 className="page-title">丝路文化</h1>
          <p className="description">
            丝绸之路不仅是商贸之路，更是文化交流之路。新疆作为丝路的核心枢纽，
            融合了东西方文明的精华，孕育了独特而灿烂的文化遗产。
          </p>
        </motion.div>

        <div className="culture-grid">
          {cultures.map((culture, index) => (
            <motion.div
              key={culture.id}
              className="culture-card"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.15 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="culture-image">
                <img src={culture.image} alt={culture.title} />
              </div>
              <div className="culture-content">
                <span className="culture-subtitle">{culture.subtitle}</span>
                <h3 className="culture-title">{culture.title}</h3>
                <p className="culture-desc">{culture.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="culture-highlight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="highlight-image">
            <img
              src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Silk%20Road%20ancient%20caravan%20camels%20desert%20sunset&image_size=landscape_16_9"
              alt="丝绸之路"
            />
          </div>
          <div className="highlight-content">
            <h2 className="highlight-title">千年丝路</h2>
            <p className="highlight-desc">
              两千多年前，张骞出使西域，开辟了连接东西方的丝绸之路。
              这条横跨亚欧大陆的商道，不仅促进了商品的流通，更见证了文化的交融、艺术的碰撞。
              新疆，作为丝路的核心地带，承载着无数传奇故事。
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CulturePage;
