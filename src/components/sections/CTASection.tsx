import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { BLESS_COLORS } from '../../utils/constants';

export function CTASection() {
  return (
    <section className="py-16" style={{background: `linear-gradient(to right, ${BLESS_COLORS.blue}, ${BLESS_COLORS.purple})`}}>
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-white">
            ¿Listo para que tu futuro financiero sea bendecido?
          </h2>
          <p className="text-xl text-blue-100">
            Únete a más de 2 millones de usuarios que ya disfrutan de los beneficios de Bless Card
          </p>
          <Button 
            size="lg"
            className="text-black text-lg px-12 py-6"
            style={{background: `linear-gradient(to right, ${BLESS_COLORS.yellow}, ${BLESS_COLORS.orange})`}}
          >
            Solicitar Mi Bless Card Ahora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-sm text-blue-200">
            * Sujeto a aprobación crediticia. Términos y condiciones aplican.
          </p>
        </div>
      </div>
    </section>
  );
}
