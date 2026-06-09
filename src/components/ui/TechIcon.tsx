'use client';

import { autoDetectIcon } from '@/lib/icons/auto-detect';
import { getIconDefinition } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { Wrench } from 'lucide-react';

interface TechIconProps {
  name: string;
  /** If provided, use this exact icon key instead of auto-detecting from name */
  iconKey?: string;
  className?: string;
  showLabel?: boolean;
  /** Show a generic Wrench icon as fallback when no brand icon is found (default: true) */
  showDefault?: boolean;
}

export function TechIcon({ name, iconKey, className, showLabel, showDefault = true }: TechIconProps) {
  // If iconKey is provided, use it directly; otherwise auto-detect from name
  const icon = iconKey ? getIconDefinition(iconKey) : autoDetectIcon(name);

  const iconClass = cn('flex-shrink-0', className || 'w-4 h-4');

  // No brand icon match: use Wrench default or render text-only fallback
  if (!icon) {
    if (showDefault) {
      const iconElement = <Wrench className={iconClass} aria-label={name} />;
      if (showLabel) {
        return (
          <span className="inline-flex items-center gap-1.5">
            {iconElement}
            <span>{name}</span>
          </span>
        );
      }
      return iconElement;
    }

    if (showLabel) {
      return <span>{name}</span>;
    }
    return null;
  }

  const { Component, color, label } = icon;

  const iconElement = (
    <Component
      className={iconClass}
      style={{ color }}
      aria-label={label}
    />
  );

  if (showLabel) {
    return (
      <span className="inline-flex items-center gap-1.5">
        {iconElement}
        <span>{name}</span>
      </span>
    );
  }

  return iconElement;
}
