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
  iconBgColor = 'bg-[#1E88E5]'
}: KPICardProps) {
  const changeColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  }[changeType];

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600">{title}</p>
            <p className="mt-2 text-3xl">{value}</p>
            {change && (
              <p className={`mt-2 text-sm ${changeColor}`}>
                {change}
              </p>
            )}
          </div>
          <div className={`rounded-lg ${iconBgColor} p-3`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
