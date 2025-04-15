import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const navigate = useNavigate();
    const { login, error, isAuthenticated, user, clearError } = useAuthStore();
    
    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated && user) {
            // Redirect based on role
            switch (user.role) {
                case 'ROLE_ADMIN':
                    navigate('/pc/admin/dashboard');
                    break;
                case 'ROLE_BLOGGER':
                    navigate('/pc/blogger/dashboard');
                    break;
                case 'ROLE_STORE':
                    navigate('/pc/store/dashboard');
                    break;
                default:
                    navigate('/pc');
            }
        }
    }, [isAuthenticated, user, navigate]);
    
    // Clear any auth errors when component mounts or unmounts
    useEffect(() => {
        clearError();
        return () => clearError();
    }, [clearError]);

    const validateForm = () => {
        const errors = {};
        
        if (!formData.email.trim()) {
            errors.email = "이메일을 입력해주세요";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "유효한 이메일 형식이 아닙니다";
        }
        
        if (!formData.password) {
            errors.password = "비밀번호를 입력해주세요";
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Clear specific error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            setIsSubmitting(true);
            
            try {
                await login(formData.email, formData.password);
                // Redirect happens in the useEffect above if login is successful
            } catch (error) {
                console.error("Login error:", error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleSocialLogin = (provider) => {
        console.log(`${provider} 로그인 시도`);
        // 소셜 로그인 구현
    };
    
    const handleRegister = () => {
        navigate('/pc/register');
    };

    return (
        <div className="min-h-screen bg-sky-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full mx-auto">
                {/* 헤더 */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-sky-800">로그인</h2>
                    <p className="mt-2 text-sm text-sky-600">
                        계정이 없으신가요?{' '}
                        <button 
                            onClick={handleRegister} 
                            className="font-medium text-sky-700 hover:text-sky-900 transition-colors"
                        >
                            회원가입
                        </button>
                    </p>
                </div>

                {/* 로그인 폼 */}
                <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
                            {error}
                        </div>
                    )}
                
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                이메일
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${formErrors.email ? 'border-red-300' : 'border-sky-200'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
                                placeholder="example@email.com"
                            />
                            {formErrors.email && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                비밀번호
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${formErrors.password ? 'border-red-300' : 'border-sky-200'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
                                placeholder="••••••••"
                            />
                            {formErrors.password && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-sky-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    로그인 상태 유지
                                </label>
                            </div>

                            <button
                                type="button"
                                className="text-sm font-medium text-sky-700 hover:text-sky-900 transition-colors"
                                onClick={() => navigate('/pc/forgot-password')}
                            >
                                비밀번호 찾기
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white 
                                ${isSubmitting ? 'bg-sky-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700'} 
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    처리 중...
                                </span>
                            ) : '로그인'}
                        </button>
                    </form>

                    {/* 구분선 */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">또는</span>
                            </div>
                        </div>
                    </div>

                    {/* 소셜 로그인 버튼 */}
                    <div className="mt-6 space-y-4">
                        <button
                            onClick={() => handleSocialLogin('naver')}
                            className="w-full flex items-center justify-center py-2 px-4 rounded-md shadow-sm text-white bg-[#03C75A] hover:bg-[#02b350] transition-colors"
                        >
                            네이버 아이디로 시작하기
                        </button>
                        <button
                            onClick={() => handleSocialLogin('kakao')}
                            className="w-full flex items-center justify-center py-2 px-4 rounded-md shadow-sm text-gray-900 bg-[#FEE500] hover:bg-[#FDD800] transition-colors"
                        >
                            카카오 아이디로 시작하기
                        </button>
                        <button
                            onClick={handleRegister}
                            className="w-full flex items-center justify-center py-2 px-4 rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 transition-colors"
                        >
                            회원가입
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;