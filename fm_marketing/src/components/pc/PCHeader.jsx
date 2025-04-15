import { useState } from 'react';
import {useNavigate} from "react-router-dom";

function PCHeader() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleSearch = () => {
        console.log('Searching for:', searchTerm);
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
                <div className="ml-auto space-x-4">
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
                        <li>
                            <button
                                onClick={() => handleNavigation('/pc/products')}
                                className="font-medium text-sky-600 hover:text-sky-800 transition-colors"
                            >
                                제품
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleNavigation('/pc/reporters')}
                                className="font-medium text-sky-600 hover:text-sky-800 transition-colors"
                            >
                                기자단
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default PCHeader;