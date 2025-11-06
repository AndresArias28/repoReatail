import { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, LogIn } from 'lucide-react';

 function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            console.log('Login:', { email, password });
            alert(`¡Bienvenido! Email: ${email}`);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-4">
            {/* Animated background circles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            </div>

            {/* Login card */}
            <div className="relative w-full max-w-md">
                <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white border-opacity-20">
                    {/* Logo/Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-4 rounded-2xl shadow-lg transform hover:scale-110 transition-transform duration-300">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl font-bold text-white text-center mb-2">
                        Bienvenido
                    </h2>
                    <p className="text-white text-opacity-70 text-center mb-8">
                        Ingresa tus credenciales para continuar
                    </p>

                    {/* Form */}
                    <div className="space-y-6">
                        {/* Email input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="w-5 h-5 text-white text-opacity-50" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Correo electrónico"
                                className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 transition-all duration-300"
                            />
                        </div>

                        {/* Password input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="w-5 h-5 text-white text-opacity-50" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                className="w-full pl-12 pr-12 py-4 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 transition-all duration-300"
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-white text-opacity-50 hover:text-opacity-100 transition-all"
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
                            <label className="flex items-center text-white text-opacity-70 hover:text-opacity-100 cursor-pointer transition-all">
                                <input
                                    type="checkbox"
                                    className="mr-2 w-4 h-4 rounded"
                                />
                                Recuérdame
                            </label>
                            <button
                                className="text-white text-opacity-70 hover:text-opacity-100 transition-all font-medium"
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>

                        {/* Submit button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
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

          
                </div>
            </div>
        </div>
    );
}

export  {Login};