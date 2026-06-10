export type { IconDefinition, IconCategory } from './types';

export {
  getAllIcons,
  getIconDefinition,
  getIconsByCategory,
  searchIcons,
  findIconKeyByLabel,
  getIconComponent,
  getIconColor,
} from './registry';

export { autoDetectIcon } from './auto-detect';
