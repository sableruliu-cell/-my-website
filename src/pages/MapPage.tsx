import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BASE_URL = '/-my-website/';

interface MapLocation {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  top: string;
  left: string;
}

interface CustomMarker {
  id: string;
  name: string;
  top: string;
  left: string;
}

const mapLocations: MapLocation[] = [
  {
    id: 'altay',
    name: '阿勒泰',
    subtitle: 'ALTAY',
    description: '清晨的阿勒泰，仿佛世界初开。这里没有城市的喧嚣，只有喀纳斯湖深邃的碧波和禾木村尖顶木屋中升起的缕缕炊烟。',
    image: BASE_URL + 'alt.png',
    top: '25%',
    left: '58%'
  },
  {
    id: 'kashi',
    name: '喀什',
    subtitle: 'KASHGAR',
    description: '喀什噶尔，丝绸之路南道的重镇，东西方文化交汇的十字路口。老城中的每一条小巷都诉说着千年的故事。',
    image: BASE_URL + 'ks4.png',
    top: '78%',
    left: '28%'
  },
  {
    id: 'urumqi',
    name: '乌鲁木齐',
    subtitle: 'URUMQI',
    description: '乌鲁木齐，古丝绸之路新北道上的重要城市，是连接东西方的重要枢纽，也是新疆的政治、经济和文化中心。',
    image: BASE_URL + 'wu.png',
    top: '38%',
    left: '56%'
  },
  {
    id: 'ili',
    name: '伊犁',
    subtitle: 'YILI',
    description: '伊犁，是被上苍偏爱的地方。初夏的那拉提草原，绿茵如毯，野花烂漫，牛羊在悠闲地吃草。',
    image: BASE_URL + 'yl.png',
    top: '52%',
    left: '38%'
  },
  {
    id: 'turpan',
    name: '吐鲁番',
    subtitle: 'TURPAN',
    description: '吐鲁番，中国最热的地方，火焰山、葡萄沟、坎儿井，这里的每一处都闪耀着古代文明的光芒。',
    image: BASE_URL + 't2.png',
    top: '42%',
    left: '68%'
  },
  {
    id: 'korla',
    name: '库尔勒',
    subtitle: 'KORLA',
    description: '库尔勒，因盛产香梨而得名，是丝绸之路中道的重要节点，孔雀河穿城而过，风光秀丽。',
    image: BASE_URL + 'le.png',
    top: '62%',
    left: '56%'
  },
  {
    id: 'hami',
    name: '哈密',
    subtitle: 'HAMI',
    description: '哈密，新疆的东大门，古丝绸之路的首站。哈密瓜名扬天下，回王陵诉说着历史的沧桑。',
    image: BASE_URL + 'ha.png',
    top: '40%',
    left: '76%'
  },
  {
    id: 'sailimu',
    name: '赛里木湖',
    subtitle: 'SAILIMU LAKE',
    description: '塞里木湖，是上帝在大地洒下的一滴眼泪。初见她，就被那无法用语言形容的深邃、纯净且具有魔力的蓝色所吸引。',
    image: BASE_URL + 'h.png',
    top: '44%',
    left: '38%'
  }
];

type PageType = 'home' | 'spots' | 'kashgar' | 'fieldtrip' | 'archive' | 'map';

function MapPage({ setCurrentPage }: { setCurrentPage: (page: PageType) => void }) {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation>(mapLocations[0]);
  const [customMarkers, setCustomMarkers] = useState<CustomMarker[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const handleMarkerClick = (location: MapLocation) => {
    setSelectedLocation(location);
  };

  const handleMapClick = (e: React.MouseEvent) => {
    if (!mapContainerRef.current) return;
    
    const target = e.target as HTMLElement;
    if (target.classList.contains('map-marker') || 
        target.classList.contains('marker-pulse') ||
        target.classList.contains('marker-icon') ||
        target.classList.contains('custom-marker') ||
        target.classList.contains('custom-marker-pulse')) {
      return;
    }

    const rect = mapContainerRef.current.getBoundingClientRect();
    const leftPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const topPercent = ((e.clientY - rect.top) / rect.height) * 100;

    const markerName = prompt('请输入自定义标记名称：');
    if (markerName && markerName.trim()) {
      const newMarker: CustomMarker = {
        id: `custom-${Date.now()}`,
        name: markerName.trim(),
        top: `${topPercent}%`,
        left: `${leftPercent}%`
      };
      setCustomMarkers(prev => [...prev, newMarker]);
    }
  };

  const removeCustomMarker = (id: string) => {
    setCustomMarkers(prev => prev.filter(marker => marker.id !== id));
  };

  return (
    <div className="interactive-map-page">
      <nav className="top-nav">
        <div className="nav-left">
          <span className="logo-cn">新疆</span>
          <span className="logo-en">XINJIANG</span>
        </div>
        <div className="nav-right">
          <button className="nav-item" onClick={() => setCurrentPage('home')}>首页</button>
          <button className="nav-item" onClick={() => setCurrentPage('kashgar')}>文化解码</button>
          <button className="nav-item" onClick={() => setCurrentPage('fieldtrip')}>实地探访</button>
          <button className="nav-item" onClick={() => setCurrentPage('archive')}>风物档案</button>
          <button className="nav-item active">互动地图</button>
          <button className="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className="interactive-map-section">
        <div className="map-content-wrapper">
          <div className="map-left-panel">
            <div className="location-info">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedLocation.id}
                  className="location-image-wrapper"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <img 
                    src={selectedLocation.image} 
                    alt={selectedLocation.name} 
                    className="location-image"
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="location-details">
                <div className="location-marker-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <h2 className="location-name">{selectedLocation.name}</h2>
                <p className="location-desc">{selectedLocation.description}</p>
                <button className="explore-btn">探索更多 →</button>
              </div>
            </div>
          </div>

          <div className="map-right-panel">
            <h1 className="map-title">游玩地图</h1>
            <div 
              className="map-container" 
              ref={mapContainerRef}
              onClick={handleMapClick}
            >
              <img 
                src="新疆维吾尔自治区_HD.png" 
                alt="新疆地图" 
                className="map-image"
              />

              {mapLocations.map((location) => (
                <div
                  key={location.id}
                  className={`map-marker ${selectedLocation.id === location.id ? 'active' : ''}`}
                  style={{ top: location.top, left: location.left }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkerClick(location);
                  }}
                >
                  <div className="marker-icon">
                    <img src={location.image} alt={location.name} className="marker-thumb" />
                  </div>
                  <div className="marker-coordinates">
                    <span>{location.name.split(' · ')[0]}</span>
                  </div>
                </div>
              ))}

              {customMarkers.map((marker) => (
                <div
                  key={marker.id}
                  className="custom-marker"
                  style={{ top: marker.top, left: marker.left }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="custom-marker-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20v-6m0 0l-3 3m3-3l3 3"/>
                    </svg>
                  </div>
                  <span className="custom-marker-label">{marker.name}</span>
                  <button 
                    className="marker-remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCustomMarker(marker.id);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="disclaimer-section">
      <div className="disclaimer-content">
        <div className="disclaimer-left">
          <h4 className="disclaimer-title">内容来源声明</h4>
          <div className="source-item">
            <span className="source-label">图片素材来源：</span>
            <span className="source-value">新疆文旅官方网站、百度图片</span>
          </div>
          <div className="source-item">
            <span className="source-label">景点信息素材：</span>
            <span className="source-value">新疆文化和旅游厅官网、携程旅行网</span>
          </div>
        </div>
        <div className="disclaimer-right">
          <h4 className="disclaimer-title">文字内容参考来源</h4>
          <div className="source-item">
            <span className="source-value">《中国国家地理》新疆特刊</span>
          </div>
          <div className="source-item">
            <span className="source-value">新疆维吾尔自治区人民政府官方网站</span>
          </div>
          <div className="source-item">
            <span className="source-value">新疆生产建设兵团文化体育广电和旅游局</span>
          </div>
        </div>
      </div>
      <div className="disclaimer-footer">
        <p>本网站所有图片素材来源于公开网络平台，仅用于文化展示与学术交流目的。如涉及版权问题，请联系我们。文字内容综合参考公开学术文献、政府文旅部门及非遗保护机构整理编写。</p>
      </div>
    </div>
    </div>
  );
}

export default MapPage;
