import { CAMEL_SVG_PATH } from './CamelPath';

interface CamelIndicatorProps {
  x: number;
  y: number;
  rotation: number;
}

export default function CamelIndicator({ x, y, rotation }: CamelIndicatorProps) {
  return (
    <div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        width: '60px',
        height: '60px',
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        transition: 'transform 0.1s linear',
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      <svg
        viewBox="0 0 4608 4608"
        width="60"
        height="60"
        style={{ overflow: 'visible' }}
      >
        <path
          d={CAMEL_SVG_PATH}
          fill="#8B4513"
          stroke="#5D3A1A"
          strokeWidth="8"
        />
      </svg>
    </div>
  );
}