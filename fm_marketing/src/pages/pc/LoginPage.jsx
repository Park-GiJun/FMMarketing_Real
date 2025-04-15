import { useState } from 'react';

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', formData);
        // 로그인 로직 구현
    };

    const handleSocialLogin = (provider) => {
        console.log(`${provider} login clicked`);
        // 소셜 로그인 로직 구현
    };

    return (
        <div className="min-h-screen bg-sky-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full mx-auto">
                {/* 헤더 */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-sky-800">로그인</h2>
                    <p className="mt-2 text-sm text-sky-600">
                        계정이 없으신가요?{' '}
                        <button onClick={() => console.log('Register clicked')} className="font-medium text-sky-700 hover:text-sky-900 transition-colors">
                            회원가입
                        </button>
                    </p>
                </div>

                {/* 로그인 폼 */}
                <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                이메일
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-sky-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                placeholder="example@email.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                비밀번호
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-sky-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                placeholder="••••••••"
                            />
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
                                onClick={() => console.log('Forgot password clicked')}
                            >
                                비밀번호 찾기
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
                        >
                            로그인
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
                            onClick={() => handleSocialLogin('kakao')}
                            className="w-full flex items-center justify-center py-2 px-4 rounded-md shadow-sm text-gray-900 bg-orange-500 hover:bg-orange-300 transition-colors"
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