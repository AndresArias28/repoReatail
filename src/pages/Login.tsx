import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, LogIn, AlertCircle, ArrowLeft } from 'lucide-react';
import { authService } from '../services/auth.service';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await authService.login({ email, password });
            console.log('Login exitoso:', response);

            if (response.token) {
                // Guardar token en localStorage
                localStorage.setItem('token', response.token);

                // Guardar información del usuario
                if (response.usuario) {
                    localStorage.setItem('user', JSON.stringify(response.usuario));
                }

                // Detectar rol del usuario
                const rol = response.usuario?.rol || 'usuario';
                console.log('🎯 Rol detectado:', rol);

                // Redirigir según el rol
                if (rol.toLowerCase() === 'administrador') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setError(response.message || 'Error al iniciar sesión');
            }
        } catch (err: any) {
            console.error('Error en login:', err);
            setError(err.message || 'Error de conexión con el servidor');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            {/* Login card */}
            <div className="relative w-full max-w-md">
                {/* Gradient border wrapper using Bless Card palette */}
                <div
                    className="rounded-3xl p-[2px] shadow-2xl"
                    style={{
                        background:
                            'linear-gradient(135deg, #FFD400 0%, #F7931E 18%, #009245 36%, #0071BC 54%, #662D91 72%, #ED1E79 90%)',
                    }}
                >
                <div className="rounded-3xl bg-white p-5">
                    {/* Back button */}
                    <div className="mb-2">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                        >
                            <ArrowLeft className="w-4 h-4" /> Volver
                        </button>
                    </div>
                    {/* Logo/Icon */}
                    <div className="flex justify-center mb-4">
                        <div
                            className="p-2.5 rounded-2xl shadow-lg transform hover:scale-110 transition-transform duration-300"
                            style={{
                                background:
                                    'linear-gradient(135deg, #FFD400 0%, #0071BC 50%, #662D91 100%)',
                            }}
                        >
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-center mb-1" style={{ color: '#0071BC' }}>
                        Bienvenido
                    </h2>
                    <p className="text-gray-600 text-center mb-4 text-xs">
                        Ingresa tus credenciales para continuar
                    </p>

                    {/* Error message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <div className="space-y-3">
                        {/* Email input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="w-5 h-5" style={{ color: '#0071BC' }} />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Correo electrónico"
                                className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0071BC] transition-all duration-300"
                            />
                        </div>

                        {/* Password input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="w-5 h-5" style={{ color: '#0071BC' }} />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                className="w-full pl-12 pr-12 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0071BC] transition-all duration-300"
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-all"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>

                        {/* Remember me & Forgot password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer transition-all">
                                <input
                                    type="checkbox"
                                    className="mr-2 w-4 h-4 rounded"
                                />
                                Recuérdame
                            </label>
                            <button
                                className="text-gray-600 hover:text-gray-800 transition-all font-medium"
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>

                        {/* Submit button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full text-white font-semibold py-2.5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                            style={{ background: 'linear-gradient(90deg, #0071BC 0%, #662D91 100%)' }}
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-3 border-white border-opacity-30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5 mr-2" />
                                    Iniciar Sesión
                                </>
                            )}
                        </button>
                    </div>


                    {/* Divider */}
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2.5 bg-white text-gray-500 text-xs">
                                o continúa con
                            </span>
                        </div>
                    </div>

                    {/* Social login buttons */}
                    <div className="grid grid-cols-2 gap-2.5">
                        <button className="py-2 px-4 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:border-gray-300 transition-all duration-300 transform hover:scale-105 text-xs">
                            Google
                        </button>
                        <button className="py-2 px-4 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:border-gray-300 transition-all duration-300 transform hover:scale-105 text-xs">
                            GitHub
                        </button>
                    </div>

                    {/* Sign up link */}
                    <p className="text-center text-gray-600 mt-4 text-xs">
                        ¿No tienes cuenta?{' '}
                        <button className="text-[#0071BC] font-semibold hover:underline transition-all">
                            Regístrate aquí
                        </button>
                    </p>


                </div>
                </div>
            </div>
        </div>
    );
}

export { Login };