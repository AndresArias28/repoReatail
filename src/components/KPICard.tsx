import { Card, CardContent } from './ui/card';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  iconBgColor?: string;
}

export function KPICard({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = 'neutral',
  iconBgColor = '#0071BC'
}: KPICardProps) {
  const changeColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  }[changeType];

  // Check if iconBgColor is a hex color or a Tailwind class
  const isHexColor = iconBgColor.startsWith('#');

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600">{title}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
            {change && (
              <p className={`mt-2 text-sm ${changeColor}`}>
                {change}
              </p>
            )}
          </div>
          <div 
            className={`rounded-lg p-3 ${!isHexColor ? iconBgColor : ''}`}
            style={isHexColor ? { backgroundColor: iconBgColor } : {}}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
