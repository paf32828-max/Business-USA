import {
  BarChart3,
  CalendarRange,
  Compass,
  Globe,
  Layers,
  Share2,
  Target,
  TrendingUp,
} from 'lucide-react';
import type { ServiceIconKey } from '@/lib/business-config';

export function ServiceIcon({
  icon,
  className = 'w-5 h-5',
}: {
  icon: ServiceIconKey;
  className?: string;
}) {
  switch (icon) {
    case 'compass':
      return <Compass className={className} aria-hidden="true" />;
    case 'share':
      return <Share2 className={className} aria-hidden="true" />;
    case 'layers':
      return <Layers className={className} aria-hidden="true" />;
    case 'trending':
      return <TrendingUp className={className} aria-hidden="true" />;
    case 'calendar':
      return <CalendarRange className={className} aria-hidden="true" />;
    case 'globe':
      return <Globe className={className} aria-hidden="true" />;
    case 'target':
      return <Target className={className} aria-hidden="true" />;
    case 'chart':
      return <BarChart3 className={className} aria-hidden="true" />;
    default:
      return <Compass className={className} aria-hidden="true" />;
  }
}
