import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

// Layouts
import PCLayout from '../layouts/PCLayout';
import MobileLayout from '../layouts/MobileLayout';

// Auth and Common Pages
import LoginPage from '../pages/pc/LoginPage';
import RegisterPage from '../pages/pc/RegisterPage';
import HomePage from '../pages/pc/HomePage';
import RegionPage from '../pages/pc/RegionPage';
import UnauthorizedPage from '../pages/common/UnauthorizedPage';
import NotFoundPage from '../pages/common/NotFoundPage';

// Protected Route Component
import ProtectedRoute from '../components/common/ProtectedRoute';

// Admin Pages
import AdminDashboardPage from '../pages/admin/DashboardPage';
import AdminCampaignListPage from '../pages/admin/CampaignListPage';
import AdminCampaignDetailPage from '../pages/admin/CampaignDetailPage';
import AdminCampaignFormPage from '../pages/admin/CampaignFormPage';
import AdminApplicationListPage from '../pages/admin/ApplicationListPage';

// Blogger Pages
import BloggerDashboardPage from '../pages/blogger/DashboardPage';
import BloggerApplicationListPage from '../pages/blogger/ApplicationListPage';
import BloggerCampaignListPage from '../pages/blogger/CampaignListPage';
import BloggerSubmitReviewPage from '../pages/blogger/SubmitReviewPage';

// Store Pages
import StoreDashboardPage from '../pages/store/DashboardPage';
import StoreCampaignListPage from '../pages/store/CampaignListPage';
import StoreReviewListPage from '../pages/store/ReviewListPage';

function AppRoutes() {
    const [isClient, setIsClient] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    // Prevent hydration issues by only rendering after client-side mount
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Don't render anything during initial SSR/hydration
    if (!isClient) return null;

    return (
        <Routes>
            {/* Initial redirect based on device */}
            <Route
                path="/"
                element={<Navigate to={isMobile ? "/m" : "/pc"} replace />}
            />

            {/* PC Routes */}
            <Route path="/pc/*" element={<PCLayout />}>
                {/* Public Routes */}
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="regions" element={<RegionPage />} />
                <Route path="unauthorized" element={<UnauthorizedPage />} />
                
                {/* Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
                    <Route path="admin/dashboard" element={<AdminDashboardPage />} />
                    <Route path="admin/campaigns" element={<AdminCampaignListPage />} />
                    <Route path="admin/campaigns/new" element={<AdminCampaignFormPage />} />
                    <Route path="admin/campaigns/:id" element={<AdminCampaignDetailPage />} />
                    <Route path="admin/campaigns/:id/edit" element={<AdminCampaignFormPage />} />
                    <Route path="admin/campaigns/:id/applications" element={<AdminApplicationListPage />} />
                </Route>
                
                {/* Blogger Routes */}
                <Route element={<ProtectedRoute allowedRoles={['ROLE_BLOGGER']} />}>
                    <Route path="blogger/dashboard" element={<BloggerDashboardPage />} />
                    <Route path="blogger/applications" element={<BloggerApplicationListPage />} />
                    <Route path="blogger/campaigns" element={<BloggerCampaignListPage />} />
                    <Route path="blogger/campaigns/:id/review" element={<BloggerSubmitReviewPage />} />
                </Route>
                
                {/* Store Routes */}
                <Route element={<ProtectedRoute allowedRoles={['ROLE_STORE']} />}>
                    <Route path="store/dashboard" element={<StoreDashboardPage />} />
                    <Route path="store/campaigns" element={<StoreCampaignListPage />} />
                    <Route path="store/campaigns/:id/reviews" element={<StoreReviewListPage />} />
                </Route>
                
                {/* 404 for PC */}
                <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Mobile Routes */}
            <Route path="/m/*" element={<MobileLayout />}>
                {/* Mobile routes would go here */}
                <Route index element={<div>Mobile Home</div>} />
                {/* 404 for Mobile */}
                <Route path="*" element={<div>Mobile 404</div>} />
            </Route>
            
            {/* Catch-all 404 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRoutes;
