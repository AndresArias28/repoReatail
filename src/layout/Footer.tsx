import { CreditCard, Phone, Mail, MapPin } from 'lucide-react';
import { APP_CONFIG, BLESS_COLORS } from '../utils/constants';

export function Footer() {
  return (
    <footer id="contacto" className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center" 
                style={{background: `linear-gradient(to right, ${BLESS_COLORS.yellow}, ${BLESS_COLORS.fucsia})`}}
              >
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">{APP_CONFIG.name}</span>
            </div>
            <p className="text-gray-400">
              {APP_CONFIG.description}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Productos</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Bless Card Classic</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bless Card Gold</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bless Card Platinum</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Soporte</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{APP_CONFIG.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{APP_CONFIG.contact.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{APP_CONFIG.contact.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 {APP_CONFIG.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
