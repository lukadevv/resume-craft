import { ReactNode } from 'react';

interface BackgroundLayerProps {
  children: ReactNode;
  imageUrl?: string;
  gradient?: string;
  overlayColor?: string;
  className?: string;
}

export function BackgroundLayer({
  children,
  imageUrl,
  gradient,
  overlayColor = 'rgba(15, 15, 15, 0.75)',
  className = '',
}: BackgroundLayerProps) {
  const backgroundLayers: string[] = [];
  if (gradient) {
    backgroundLayers.push(gradient);
  }
  if (imageUrl) {
    backgroundLayers.push(`url(${imageUrl})`);
  }

  const backgroundStyle =
    backgroundLayers.length > 0
      ? {
          backgroundImage: backgroundLayers.join(', '),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {};

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: gradient,
          ...backgroundStyle,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: overlayColor, mixBlendMode: 'multiply' }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
