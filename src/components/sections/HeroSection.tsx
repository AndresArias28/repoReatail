import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { BLESS_COLORS, APP_CONFIG } from '../../utils/constants';

export function HeroSection() {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span style={{
                  background: `linear-gradient(to right, ${BLESS_COLORS.yellow}, ${BLESS_COLORS.orange}, ${BLESS_COLORS.fucsia})`, 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent', 
                  backgroundClip: 'text'
                }}>
                  Bless
                </span>
                <br />
                <span style={{
                  background: `linear-gradient(to right, ${BLESS_COLORS.blue}, ${BLESS_COLORS.purple})`, 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent', 
                  backgroundClip: 'text'
                }}>
                  Card
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                {APP_CONFIG.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-black text-lg px-8 py-6"
                style={{background: `linear-gradient(to right, ${BLESS_COLORS.yellow}, ${BLESS_COLORS.orange})`}}
              >
                Solicitar Mi Tarjeta
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6"
                style={{borderColor: BLESS_COLORS.blue, color: BLESS_COLORS.blue}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = BLESS_COLORS.blue;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = BLESS_COLORS.blue;
                }}
              >
                Ver Beneficios
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" style={{color: BLESS_COLORS.green}} />
                <span>Sin anualidad primer año</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" style={{color: BLESS_COLORS.green}} />
                <span>Aprobación inmediata</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <div 
                className="w-80 h-48 mx-auto rounded-2xl shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-300"
                style={{background: `linear-gradient(135deg, ${BLESS_COLORS.yellow}, ${BLESS_COLORS.orange}, ${BLESS_COLORS.green}, ${BLESS_COLORS.blue}, ${BLESS_COLORS.purple}, ${BLESS_COLORS.fucsia})`}}
              >
                <div className="absolute inset-4 bg-black/20 rounded-xl"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-2xl font-bold">{APP_CONFIG.name}</div>
                  <div className="text-sm opacity-90">**** **** **** 1234</div>
                </div>
                <div className="absolute top-6 right-6">
                  <div className="w-12 h-8 bg-white/30 rounded"></div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-10 -left-10 w-20 h-20 rounded-full opacity-20 animate-pulse" style={{backgroundColor: BLESS_COLORS.yellow}}></div>
            <div className="absolute bottom-10 -right-10 w-16 h-16 rounded-full opacity-20 animate-pulse" style={{backgroundColor: BLESS_COLORS.fucsia, animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 -right-20 w-12 h-12 rounded-full opacity-20 animate-pulse" style={{backgroundColor: BLESS_COLORS.green, animationDelay: '0.5s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
