import { Routes, Route } from 'react-router-dom';
import MobileHomePage from '../pages/mobile/HomePage';

function MobileLayout() {
    return (
        <div className="mobile-layout">
            <header className="bg-green-600 text-white p-2">
                <h1>모바일 버전</h1>
            </header>
            <main className="p-2">
                <Routes>
                    <Route path="/" element={<MobileHomePage />} />
                    {/* 추가 라우트 */}
                </Routes>
            </main>
            <footer className="bg-gray-200 p-2 text-center text-sm">
                모바일 버전 푸터
            </footer>
        </div>
    );
}

export default MobileLayout;