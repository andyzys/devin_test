import { useState, useEffect, useCallback } from 'react';
import { Message } from '@arco-design/web-react';
import { trackSkuSwitch } from '../../../utils/tracker';
import type { SkuDimension, SkuInfo } from '../../../types';
import './SkuSelector.less';

interface SkuSelectorProps {
  productId: string;
  dimensions: SkuDimension[];
  skuList: SkuInfo[];
  selectedSku: SkuInfo | null;
  onSkuChange: (sku: SkuInfo | null) => void;
}

const SkuSelector: React.FC<SkuSelectorProps> = ({
  productId,
  dimensions,
  skuList,
  selectedSku,
  onSkuChange,
}) => {
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>({});

  const findSku = useCallback(
    (specs: Record<string, string>): SkuInfo | null => {
      if (Object.keys(specs).length !== dimensions.length) return null;
      const specIds = dimensions.map((d) => specs[d.id]);
      return skuList.find((sku) =>
        sku.specIds.length === specIds.length &&
        specIds.every((id) => sku.specIds.includes(id))
      ) ?? null;
    },
    [dimensions, skuList]
  );

  const isOptionAvailable = useCallback(
    (dimensionId: string, optionId: string): boolean => {
      const testSpecs = { ...selectedSpecs, [dimensionId]: optionId };
      const selectedDimIds = Object.keys(testSpecs);
      return skuList.some((sku) => {
        const match = selectedDimIds.every((dimId) => {
          const dim = dimensions.find((d) => d.id === dimId);
          if (!dim) return true;
          return sku.specIds.includes(testSpecs[dimId]);
        });
        return match && sku.stock > 0;
      });
    },
    [selectedSpecs, dimensions, skuList]
  );

  useEffect(() => {
    const sku = findSku(selectedSpecs);
    onSkuChange(sku);
    if (sku) {
      const specNames = dimensions.map((d) => {
        const opt = d.options.find((o) => o.id === selectedSpecs[d.id]);
        return opt?.name ?? '';
      }).join('/');
      trackSkuSwitch(productId, sku.skuId, specNames);
    }
  }, [selectedSpecs, findSku, dimensions, productId, onSkuChange]);

  const handleOptionClick = (dimensionId: string, optionId: string) => {
    if (!isOptionAvailable(dimensionId, optionId)) {
      Message.warning('该规格组合暂无库存');
      return;
    }
    setSelectedSpecs((prev) => {
      if (prev[dimensionId] === optionId) {
        const next = { ...prev };
        delete next[dimensionId];
        return next;
      }
      return { ...prev, [dimensionId]: optionId };
    });
  };

  return (
    <div className="sku-selector">
      {dimensions.map((dim) => (
        <div key={dim.id} className="sku-dimension">
          <div className="sku-dimension-title">{dim.name}</div>
          <div className="sku-options">
            {dim.options.map((opt) => {
              const isSelected = selectedSpecs[dim.id] === opt.id;
              const available = isOptionAvailable(dim.id, opt.id);
              return (
                <div
                  key={opt.id}
                  className={`sku-option ${isSelected ? 'selected' : ''} ${!available ? 'disabled' : ''}`}
                  onClick={() => handleOptionClick(dim.id, opt.id)}
                >
                  {opt.imageUrl && (
                    <img src={opt.imageUrl} alt={opt.name} className="sku-option-img" />
                  )}
                  <span>{opt.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {selectedSku && (
        <div className="sku-stock-info">
          {selectedSku.stock > 0
            ? `库存 ${selectedSku.stock} 件`
            : '暂时缺货'}
        </div>
      )}
    </div>
  );
};

export default SkuSelector;
