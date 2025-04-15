function PCFooter() {
    const handleNavigation = (path) => {
        console.log(`Navigating to: ${path}`);
        // 실제 네비게이션 로직은 여기에 구현
    };

    return (
        <footer className="bg-sky-50 text-sky-900 py-8 border-t border-sky-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-sky-800">FMMarketing</h3>
                        <p className="text-sm text-sky-600">
                            체험단 신청
                        </p>
                        <p className="text-sm text-sky-600">
                            서비스 소개
                        </p>
                        <p className="text-sm text-sky-600">
                            이용약관
                        </p>
                        <p className="text-sm text-sky-600">
                            개인정보처리방침
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-sky-800">회사 정보</h3>
                        <ul className="space-y-2 text-sm text-sky-600">
                            <li>
                                <button
                                    onClick={() => handleNavigation('/pc/about')}
                                    className="hover:text-sky-800 transition-colors"
                                >
                                    회사 소개
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleNavigation('/pc/terms')}
                                    className="hover:text-sky-800 transition-colors"
                                >
                                    이용약관
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleNavigation('/pc/privacy')}
                                    className="hover:text-sky-800 transition-colors"
                                >
                                    개인정보처리방침
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-sky-800">고객 지원</h3>
                        <ul className="space-y-2 text-sm text-sky-600">
                            <li>
                                <button
                                    onClick={() => handleNavigation('/pc/customer-service')}
                                    className="hover:text-sky-800 transition-colors"
                                >
                                    고객센터
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleNavigation('/pc/faq')}
                                    className="hover:text-sky-800 transition-colors"
                                >
                                    자주 묻는 질문
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleNavigation('/pc/contact')}
                                    className="hover:text-sky-800 transition-colors"
                                >
                                    문의하기
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-sky-800">연락처</h3>
                        <ul className="space-y-2 text-sm text-sky-600">
                            <li>이메일: withusg777@withusg.co.kr</li>
                            <li>전화: 031-570-2941</li>
                            <li>주소: 경기도 남양주시 순화궁로 249, 2동 5F 엠521호</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-sky-200 text-center text-sm text-sky-500">
                    &copy; {new Date().getFullYear()} FMMarketing. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default PCFooter;