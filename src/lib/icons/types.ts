import { ComponentType } from 'react';

export type IconCategory =
  | 'programming-language'
  | 'framework'
  | 'tool'
  | 'database'
  | 'cloud'
  | 'design'
  | 'country-flag';

export interface IconDefinition {
  key: string;
  category: IconCategory;
  label: string;
  Component: ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>;
  color: string;
  searchTerms: string[];
}
