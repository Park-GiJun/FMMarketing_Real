import { Routes, Route } from 'react-router-dom';
import PCHeader from '../components/pc/PCHeader';
import PCFooter from '../components/pc/PCFooter';
import PCHomePage from '../pages/pc/HomePage';
import LoginPage from "../pages/pc/LoginPage";
import RegionPage from "../pages/pc/RegionPage.jsx";

function PCLayout() {
    return (
        <div className="pc-layout">
            <PCHeader />
            <main>
                <Routes>
                    <Route index element={<PCHomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="regions" element={<RegionPage />} />
                    {/* 추가 라우트들 */}
                </Routes>
            </main>
            <PCFooter />
        </div>
    );
}

export default PCLayout;