import { useState, useRef } from 'react';
import { Carousel, Image } from '@arco-design/web-react';
import { IconPlayArrow, IconFullscreen } from '@arco-design/web-react/icon';
import { trackBannerClick, trackVideoPlay } from '../../../utils/tracker';
import type { MediaItem } from '../../../types';
import './BannerSection.less';

interface BannerSectionProps {
  productId: string;
  mediaList: MediaItem[];
  sellingPoints: string[];
}

const PLACEHOLDER_IMG = 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22400%22%3E%3Crect%20fill%3D%22%23f0f0f0%22%20width%3D%22400%22%20height%3D%22400%22%2F%3E%3Ctext%20fill%3D%22%23999%22%20x%3D%22150%22%20y%3D%22210%22%20font-size%3D%2220%22%3E%E5%9B%BE%E7%89%87%E5%8A%A0%E8%BD%BD%E5%A4%B1%E8%B4%A5%3C%2Ftext%3E%3C%2Fsvg%3E';

const BannerSection: React.FC<BannerSectionProps> = ({ productId, mediaList, sellingPoints }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  const handleMediaClick = (item: MediaItem, index: number) => {
    trackBannerClick(productId, item.id, item.type, index);
  };

  const handleVideoPlay = (item: MediaItem) => {
    trackVideoPlay(productId, item.id);
  };

  const handleVideoFullscreen = (mediaId: string) => {
    const video = videoRefs.current.get(mediaId);
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src = PLACEHOLDER_IMG;
  };

  const sortedMedia = [...mediaList].sort((a, b) => a.sort - b.sort);

  return (
    <div className="banner-section">
      <Carousel
        animation="slide"
        showArrow="hover"
        indicatorPosition="outer"
        onChange={(index) => setCurrentIndex(index)}
        style={{ height: '375px' }}
      >
        {sortedMedia.map((item, index) => (
          <div
            key={item.id}
            className="banner-slide"
            onClick={() => handleMediaClick(item, index)}
          >
            {item.type === 'video' ? (
              <div className="banner-video-wrapper">
                <video
                  ref={(el) => {
                    if (el) videoRefs.current.set(item.id, el);
                  }}
                  src={item.url}
                  poster={item.coverUrl}
                  playsInline
                  muted
                  autoPlay={index === currentIndex}
                  loop
                  onPlay={() => handleVideoPlay(item)}
                  className="banner-video"
                />
                <div className="video-controls">
                  <span className="video-play-icon">
                    <IconPlayArrow />
                  </span>
                  <span
                    className="video-fullscreen-icon"
                    onClick={(e) => { e.stopPropagation(); handleVideoFullscreen(item.id); }}
                  >
                    <IconFullscreen />
                  </span>
                </div>
              </div>
            ) : (
              <Image
                src={item.url}
                alt={`商品图片 ${index + 1}`}
                width="100%"
                height={375}
                style={{ objectFit: 'cover' }}
                error={<img src={PLACEHOLDER_IMG} alt="加载失败" style={{ width: '100%', height: '375px', objectFit: 'cover' }} />}
                onError={handleImageError}
                preview={true}
              />
            )}
          </div>
        ))}
      </Carousel>

      <div className="banner-indicator">
        {currentIndex + 1} / {sortedMedia.length}
      </div>

      {sellingPoints.length > 0 && (
        <div className="selling-points">
          {sellingPoints.map((point, idx) => (
            <span key={idx} className="selling-point-item">
              {point}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerSection;
