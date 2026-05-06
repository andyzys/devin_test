import { Modal, Message } from '@arco-design/web-react';
import { IconCopy, IconImage } from '@arco-design/web-react/icon';
import { trackShare } from '../../../utils/tracker';
import './SharePanel.less';

interface SharePanelProps {
  visible: boolean;
  productId: string;
  onClose: () => void;
}

const SHARE_CHANNELS = [
  { key: 'wechat', label: '微信', icon: '💬' },
  { key: 'moments', label: '朋友圈', icon: '🌐' },
  { key: 'weibo', label: '微博', icon: '📢' },
  { key: 'qq', label: 'QQ', icon: '💭' },
];

const SharePanel: React.FC<SharePanelProps> = ({ visible, productId, onClose }) => {
  const handleShareChannel = (channel: string) => {
    trackShare(productId, channel);
    Message.info(`${channel} 分享功能开发中`);
    onClose();
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/ecommerce-detail/${productId}`;
    navigator.clipboard.writeText(url).then(() => {
      trackShare(productId, 'copy_link');
      Message.success('链接已复制');
      onClose();
    }).catch(() => {
      Message.error('复制失败');
    });
  };

  const handleGeneratePoster = () => {
    trackShare(productId, 'poster');
    Message.info('海报生成功能开发中');
  };

  return (
    <Modal
      title="分享商品"
      visible={visible}
      onCancel={onClose}
      footer={null}
      className="share-panel-modal"
      unmountOnExit
    >
      <div className="share-panel">
        <div className="share-channels">
          {SHARE_CHANNELS.map((ch) => (
            <div
              key={ch.key}
              className="share-channel-item"
              onClick={() => handleShareChannel(ch.key)}
            >
              <span className="channel-icon">{ch.icon}</span>
              <span className="channel-label">{ch.label}</span>
            </div>
          ))}
        </div>
        <div className="share-actions">
          <div className="share-action-item" onClick={handleCopyLink}>
            <IconCopy />
            <span>复制链接</span>
          </div>
          <div className="share-action-item" onClick={handleGeneratePoster}>
            <IconImage />
            <span>生成海报</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SharePanel;
