import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from '../../stores/authStore';

function PCHeader() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const profileMenuRef = useRef(null);
    
    const { isAuthenticated, user, logout } = useAuthStore();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleSearch = () => {
        console.log('Searching for:', searchTerm);
    };
    
    const handleLogout = () => {
        logout();
        navigate('/pc/login');
    };
    
    // Close profile menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    const getDashboardLink = () => {
        if (!user) return '/pc';
        
        switch(user.role) {
            case 'ROLE_ADMIN':
                return '/pc/admin/dashboard';
            case 'ROLE_BLOGGER':
                return '/pc/blogger/dashboard';
            case 'ROLE_STORE':
                return '/pc/store/dashboard';
            default:
                return '/pc';
        }
    };
    
    // Render role-specific navigation items
    const renderRoleBasedNavItems = () => {
        if (!user) return null;
        
        switch(user.role) {
            case 'ROLE_ADMIN':
                return (
                    <>
                        <li>
                            <button
                                onClick={() => handleNavigation('/pc/admin/campaigns')}
                                className="font-medium text-sky-600 hover:text-sky-800 transition-colors"
                            >
                                캠페인 관리
                            </button>
                        </li>
                    </>
                );
            case 'ROLE_BLOGGER':
                return (
                    <>
                        <li>
                            <button
                                onClick={() => handleNavigation('/pc/blogger/campaigns')}
                                className="font-medium text-sky-600 hover:text-sky-800 transition-colors"
                            >
                                참여 가능 캠페인
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavigation('/pc/blogger/applications')}
                                className="font-medium text-sky-600 hover:text-sky-800 transition-colors"
                            >
                                내 지원 현황
                            </button>
                        </li>
                    </>
                );
            case 'ROLE_STORE':
                return (
                    <>
                        <li>
                            <button
                                onClick={() => handleNavigation('/pc/store/campaigns')}
                                className="font-medium text-sky-600 hover:text-sky-800 transition-colors"
                            >
                                캠페인 조회
                            </button>
                        </li>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <header>
            {/* 최상단 메뉴 */}
            <div className="bg-sky-50 py-2 border-b border-sky-100">
                <div className="container mx-auto flex justify-end space-x-4 px-4">
                    <button
                        onClick={() => handleNavigation('/pc/customer-service')}
                        className="text-sm text-sky-600 hover:text-sky-800 transition-colors"
                    >
                        고객센터
                    </button>
                    <button
                        onClick={() => handleNavigation('/pc/ad-inquiry')}
                        className="text-sm text-sky-600 hover:text-sky-800 transition-colors"
                    >
                        광고문의
                    </button>
                </div>
            </div>

            {/* 로고, 검색창 */}
            <div className="container mx-auto py-4 px-4 flex items-center">
                <button
                    onClick={() => handleNavigation('/pc')}
                    className="text-2xl font-bold mr-10 text-sky-700 hover:text-sky-800 transition-colors"
                >
                    FMMarketing
                </button>
                <div className="flex-grow max-w-2xl">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="검색어를 입력하세요"
                            className="w-full p-2 pl-4 pr-10 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-sky-500 hover:text-sky-700 transition-colors"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                
                {/* 로그인/회원가입 또는 프로필 메뉴 */}
                <div className="ml-auto">
                    {!isAuthenticated ? (
                        <div className="space-x-4">
                            <button
                                onClick={() => handleNavigation('/pc/login')}
                                className="text-sm text-sky-600 hover:text-sky-800 transition-colors"
                            >
                                로그인
                            </button>
                            <button
                                onClick={() => handleNavigation('/pc/register')}
                                className="text-sm text-sky-600 hover:text-sky-800 transition-colors"
                            >
                                회원가입
                            </button>
                        </div>
                    ) : (
                        <div className="relative" ref={profileMenuRef}>
                            <button
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                className="flex items-center space-x-2 text-sky-600 hover:text-sky-800 transition-colors"
                            >
                                <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                                    <span className="text-sky-600 font-medium">
                                        {user?.name?.charAt(0) || 'U'}
                                    </span>
                                </div>
                                <span className="text-sm">{user?.name || '사용자'}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            {isProfileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                    <div className="py-1 border-b border-gray-100">
                                        <p className="px-4 py-2 text-sm text-gray-500 font-medium">
                                            {user?.email}
                                        </p>
                                    </div>
                                    <div className="py-1">
                                        <button
                                            onClick={() => {
                                                handleNavigation(getDashboardLink());
                                                setIsProfileMenuOpen(false);
                                            }}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 w-full text-left"
                                        >
                                            대시보드
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleNavigation('/pc/profile');
                                                setIsProfileMenuOpen(false);
                                            }}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 w-full text-left"
                                        >
                                            내 프로필
                                        </button>
                                    </div>
                                    <div className="py-1 border-t border-gray-100">
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsProfileMenuOpen(false);
                                            }}
                                            className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                                        >
                                            로그아웃
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* 메인 내비게이션 */}
            <nav className="bg-white shadow-md border-t border-sky-100">
                <div className="container mx-auto px-4">
                    <ul className="flex space-x-8 py-4">
                        <li>
                            <button
                                onClick={() => handleNavigation('/pc')}
                                className="font-medium text-sky-600 hover:text-sky-800 transition-colors"
                            >
                                홈
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavigation('/pc/regions')}
                                className="font-medium text-sky-600 hover:text-sky-800 transition-colors"
                            >
                                지역
                            </button>
                        </li>
                        
                        {/* Role-specific navigation items */}
                        {renderRoleBasedNavItems()}
                        
                        <li>
                            <button
                                onClick={() => handleNavigation('/pc/campaigns')}
                                className="font-medium text-sky-600 hover:text-sky-800 transition-colors"
                            >
                                캠페인
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default PCHeader;