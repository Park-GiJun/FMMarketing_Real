import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import PCLayout from '../layouts/PCLayout';
import MobileLayout from '../layouts/MobileLayout';

function AppRoutes() {
    const [isClient, setIsClient] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    // 서버 사이드 렌더링(SSR) 문제 방지
    useEffect(() => {
        setIsClient(true);
    }, []);

    // 클라이언트 측에서만 리다이렉션 결정
    if (!isClient) return null;

    return (
        <Routes>
            {/* 초기 경로 리다이렉션 */}
            <Route
                path="/"
                element={<Navigate to={isMobile ? "/m" : "/pc"} replace />}
            />

            {/* PC 라우트 */}
            <Route path="/pc/*" element={<PCLayout />} />

            {/* 모바일 라우트 */}
            <Route path="/m/*" element={<MobileLayout />} />
        </Routes>
    );
}

export default AppRoutes;