import { Users, DollarSign, TrendingUp, Award } from 'lucide-react';
import { AnimatedCounter } from '../../hooks/useAnimatedCounter';
import { BLESS_COLORS } from '../../utils/constants';

export function StatsSection() {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: 2500000,
      suffix: "+",
      label: "Usuarios Activos",
      color: `linear-gradient(to right, ${BLESS_COLORS.yellow}, ${BLESS_COLORS.orange})`
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      number: 850000000,
      prefix: "$",
      suffix: "M",
      label: "En Cashback Pagado",
      color: `linear-gradient(to right, ${BLESS_COLORS.fucsia}, ${BLESS_COLORS.purple})`
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: 98,
      suffix: "%",
      label: "Satisfacción del Cliente",
      color: `linear-gradient(to right, ${BLESS_COLORS.green}, ${BLESS_COLORS.blue})`
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: 15,
      suffix: "+",
      label: "Premios Ganados",
      color: `linear-gradient(to right, ${BLESS_COLORS.purple}, ${BLESS_COLORS.fucsia})`
    }
  ];

  return (
    <section className="py-16" style={{background: `linear-gradient(to right, ${BLESS_COLORS.green}, ${BLESS_COLORS.blue})`}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Números que hablan por sí solos
          </h2>
          <p className="text-xl text-green-100">
            La confianza de millones de usuarios nos respalda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{background: stat.color}}
              >
                {stat.icon}
              </div>
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter 
                  end={stat.number} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-green-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
