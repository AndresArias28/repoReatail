import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  BarChart3, 
  Package, 
  TrendingUp, 
  Zap, 
  Shield, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin,
  Menu,
  X,
  ShoppingBag,
  LineChart,
  PieChart,
  Sparkles,
  Clock,
  Target
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

// Simple animated counter component
function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  return (
    <span>
      {prefix}{end.toLocaleString()}{suffix}
    </span>
  );
}

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg gradient-bless flex items-center justify-center shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient-bless">
                RetailPro Analytics
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#funcionalidades" className="text-gray-700 hover:text-blue-600 transition-colors">Funcionalidades</a>
              <a href="#beneficios" className="text-gray-700 hover:text-blue-600 transition-colors">Beneficios</a>
              <a href="#casos" className="text-gray-700 hover:text-blue-600 transition-colors">Casos de Uso</a>
              <a href="#contacto" className="text-gray-700 hover:text-blue-600 transition-colors">Contacto</a>
              <Button 
                className="text-white hover:opacity-90"
                style={{background: 'linear-gradient(to right, #0071BC, #662D91)'}}
                onClick={() => navigate('/dashboard')}
              >
                Ir al Dashboard
              </Button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#funcionalidades" className="block px-3 py-2 text-gray-700">Funcionalidades</a>
                <a href="#beneficios" className="block px-3 py-2 text-gray-700">Beneficios</a>
                <a href="#casos" className="block px-3 py-2 text-gray-700">Casos de Uso</a>
                <a href="#contacto" className="block px-3 py-2 text-gray-700">Contacto</a>
                <div className="px-3 py-2">
                  <Button 
                    className="w-full text-white hover:opacity-90"
                    style={{background: 'linear-gradient(to right, #0071BC, #662D91)'}}
                    onClick={() => navigate('/dashboard')}
                  >
                    Ir al Dashboard
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium text-white" style={{background: 'linear-gradient(to right, #0071BC, #662D91)'}}>
                <Sparkles className="w-4 h-4" />
                <span>Plataforma de Análisis Retail Inteligente</span>
              </div>
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                  Optimiza tus ventas con
                  <span className="text-gradient-bless"> datos inteligentes</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Dashboard empresarial para análisis de ventas, inventario y rotación de productos. 
                  Toma decisiones estratégicas basadas en datos en tiempo real.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="text-white text-lg px-8 py-6 hover:opacity-90"
                  style={{background: 'linear-gradient(to right, #FFD400, #F7931E)'}}
                  onClick={() => navigate('/dashboard')}
                >
                  Ir al Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-lg px-8 py-6 border-gray-300 hover:bg-gray-50"
                >
                  Ver Demo en Vivo
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>14 días de prueba gratis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Sin tarjeta de crédito</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Soporte 24/7</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                {/* Mock Dashboard Preview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <h3 className="font-semibold text-gray-900">Dashboard Principal</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                      <div className="text-xs text-blue-600 font-medium mb-1">Ventas del Mes</div>
                      <div className="text-2xl font-bold text-blue-900">$124.5K</div>
                      <div className="text-xs text-green-600 mt-1">↑ 12.5%</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                      <div className="text-xs text-green-600 font-medium mb-1">Productos Vendidos</div>
                      <div className="text-2xl font-bold text-green-900">2,847</div>
                      <div className="text-xs text-green-600 mt-1">↑ 8.2%</div>
                    </div>
                  </div>
                  
                  {/* Chart Preview */}
                  <div className="bg-gray-50 rounded-lg p-4 h-32 flex items-end justify-between space-x-2">
                    <div className="bg-blue-500 rounded-t w-full" style={{height: '60%'}}></div>
                    <div className="bg-blue-500 rounded-t w-full" style={{height: '80%'}}></div>
                    <div className="bg-blue-500 rounded-t w-full" style={{height: '45%'}}></div>
                    <div className="bg-blue-500 rounded-t w-full" style={{height: '90%'}}></div>
                    <div className="bg-blue-500 rounded-t w-full" style={{height: '70%'}}></div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full blur-2xl opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-200 rounded-full blur-2xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Funcionalidades
              <span className="text-gradient-bless"> Poderosas</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Todo lo que necesitas para analizar y optimizar tu negocio retail en una sola plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Análisis de Ventas",
                description: "Compara ventas por categoría, talla, género y periodo de tiempo",
                bgColor: "#0071BC"
              },
              {
                icon: <Package className="w-8 h-8" />,
                title: "Control de Inventario",
                description: "Monitorea stock en tiempo real con alertas automáticas",
                bgColor: "#009245"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Rotación de Productos",
                description: "Identifica productos con mayor y menor rotación",
                bgColor: "#F7931E"
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Recomendaciones IA",
                description: "Sugerencias inteligentes para compras y promociones",
                bgColor: "#662D91"
              }
            ].map((benefit, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center space-y-4">
                  <div 
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform"
                    style={{backgroundColor: benefit.bgColor}}
                  >
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funcionalidades" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Visualiza tus datos como nunca antes
            </h2>
            <p className="text-xl text-gray-600">
              Gráficas interactivas y KPIs en tiempo real para decisiones más inteligentes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <LineChart className="w-8 h-8" />,
                title: "Gráficos Interactivos",
                description: "Barras, líneas y gráficos circulares para comparar categorías, tallas y tendencias",
                bgColor: "#0071BC"
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "KPIs Personalizados",
                description: "Ventas totales, productos más vendidos, nivel de stock y porcentaje de rotación",
                bgColor: "#009245"
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Filtros Dinámicos",
                description: "Filtra por género, mes, rango de fechas, sucursal o ciudad en tiempo real",
                bgColor: "#662D91"
              }
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div 
                    className="w-14 h-14 rounded-lg flex items-center justify-center text-white"
                    style={{backgroundColor: feature.bgColor}}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="casos" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Casos de uso reales
            </h2>
            <p className="text-xl text-gray-600">
              Descubre cómo RetailPro Analytics ayuda a empresas de ropa a crecer
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Optimización de Stock</h3>
                <p className="text-gray-600">
                  "Identificamos que las T-Shirts talla M tenían alta demanda pero bajo stock. 
                  Aumentamos el inventario y las ventas crecieron un 35% en ese segmento."
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-900">María González</div>
                    <div>Gerente de Tienda</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 hover:border-green-300 transition-all">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Promociones Inteligentes</h3>
                <p className="text-gray-600">
                  "La plataforma nos sugirió aplicar descuentos en Jeans XL por baja rotación. 
                  Logramos reducir el inventario obsoleto en un 60% en solo 2 meses."
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-900">Carlos Ramírez</div>
                    <div>Director Comercial</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{background: 'linear-gradient(to right, #0071BC, #662D91)'}}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              ¿Listo para transformar tu negocio retail?
            </h2>
            <p className="text-xl text-blue-100">
              Únete a cientos de empresas que ya optimizan sus ventas e inventario con datos inteligentes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="text-lg px-12 py-6 hover:opacity-90"
                style={{background: 'linear-gradient(to right, #FFD400, #F7931E)', color: '#000'}}
                onClick={() => navigate('/dashboard')}
              >
                Ir al Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-12 py-6"
              >
                Agendar Demo
              </Button>
            </div>
            <p className="text-sm text-blue-200">
              ✓ Sin tarjeta de crédito  ✓ Configuración en 5 minutos  ✓ Soporte en español
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg gradient-bless flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">RetailPro Analytics</span>
              </div>
              <p className="text-gray-400">
                Plataforma de análisis empresarial para optimizar ventas, inventario y rotación de productos en tiempo real.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Plataforma</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Dashboard Principal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Análisis de Ventas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Control de Inventario</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Recomendaciones IA</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recursos</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentación</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutoriales</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contacto</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+52 (55) 1234-5678</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>soporte@retailpro.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Ciudad de México, México</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RetailPro Analytics. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
