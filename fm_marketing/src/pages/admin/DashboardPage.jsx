import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useCampaignStore } from '../../stores/campaignStore';
import { useApplicationStore } from '../../stores/applicationStore';

function AdminDashboardPage() {
    const { user } = useAuthStore();
    const { campaigns, isLoading: campaignsLoading, fetchCampaigns } = useCampaignStore();
    const { applications, isLoading: applicationsLoading, fetchCampaignApplications } = useApplicationStore();
    
    const [stats, setStats] = useState({
        totalCampaigns: 0,
        activeCampaigns: 0,
        pendingApplications: 0,
        totalStores: 0,
        totalBloggers: 0
    });

    useEffect(() => {
        // Fetch campaigns data
        fetchCampaigns();
        
        // For demonstration, fetch applications for the first campaign if available
        if (campaigns.length > 0) {
            fetchCampaignApplications(campaigns[0].id);
        }
        
        // Mock statistics data (in a real app, this would come from API)
        setStats({
            totalCampaigns: 24,
            activeCampaigns: 12,
            pendingApplications: 47,
            totalStores: 15,
            totalBloggers: 86
        });
    }, [fetchCampaigns]);

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">관리자 대시보드</h1>
                <p className="text-gray-600">안녕하세요, {user?.name || '관리자'}님! 오늘의 현황을 확인하세요.</p>
            </div>
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-sky-100 text-sky-600 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">전체 캠페인</p>
                            <p className="text-xl font-semibold">{stats.totalCampaigns}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">활성 캠페인</p>
                            <p className="text-xl font-semibold">{stats.activeCampaigns}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">대기 중인 지원</p>
                            <p className="text-xl font-semibold">{stats.pendingApplications}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">등록된 매장</p>
                            <p className="text-xl font-semibold">{stats.totalStores}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">등록된 블로거</p>
                            <p className="text-xl font-semibold">{stats.totalBloggers}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Recent Campaigns */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">최근 캠페인</h2>
                    <Link 
                        to="/pc/admin/campaigns" 
                        className="text-sky-600 hover:text-sky-800 text-sm font-medium"
                    >
                        모두 보기
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    제목
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    매장
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    신청 기한
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    신청/승인
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    상태
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {campaignsLoading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        데이터를 불러오는 중...
                                    </td>
                                </tr>
                            ) : campaigns.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        등록된 캠페인이 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                campaigns.slice(0, 5).map((campaign) => (
                                    <tr key={campaign.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link 
                                                to={`/pc/admin/campaigns/${campaign.id}`}
                                                className="text-sky-600 hover:text-sky-800 font-medium"
                                            >
                                                {campaign.title}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                            {campaign.storeName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                            {new Date(campaign.applicationDeadline).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                            {campaign.appliedCount} / {campaign.approvedCount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${new Date(campaign.applicationDeadline) > new Date() 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-gray-100 text-gray-800'}`}
                                            >
                                                {new Date(campaign.applicationDeadline) > new Date() ? '모집중' : '모집완료'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Recent Applications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">최근 지원자</h2>
                    <Link 
                        to="/pc/admin/applications" 
                        className="text-sky-600 hover:text-sky-800 text-sm font-medium"
                    >
                        모두 보기
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    블로거
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    캠페인
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    신청일
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    상태
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    관리
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {applicationsLoading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        데이터를 불러오는 중...
                                    </td>
                                </tr>
                            ) : applications.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        지원자가 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                applications.slice(0, 5).map((application) => (
                                    <tr key={application.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 bg-sky-100 rounded-full flex items-center justify-center">
                                                    <span className="text-sky-600 font-medium">
                                                        {application.bloggerName?.charAt(0) || 'B'}
                                                    </span>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 font-medium">{application.bloggerName}</p>
                                                    <p className="text-gray-500 text-xs">{application.bloggerEmail}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                            {application.campaignTitle}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                            {new Date(application.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${application.status === 'PENDING' 
                                                    ? 'bg-yellow-100 text-yellow-800' 
                                                    : application.status === 'APPROVED' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : application.status === 'REJECTED'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-blue-100 text-blue-800'}`}
                                            >
                                                {application.status === 'PENDING' 
                                                    ? '대기중' 
                                                    : application.status === 'APPROVED' 
                                                    ? '승인됨' 
                                                    : application.status === 'REJECTED'
                                                    ? '거절됨'
                                                    : '완료됨'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <Link 
                                                to={`/pc/admin/applications/${application.id}`}
                                                className="text-sky-600 hover:text-sky-800 mr-3"
                                            >
                                                보기
                                            </Link>
                                            {application.status === 'PENDING' && (
                                                <>
                                                    <button 
                                                        className="text-green-600 hover:text-green-800 mr-3"
                                                        onClick={() => console.log(`Approve application ${application.id}`)}
                                                    >
                                                        승인
                                                    </button>
                                                    <button 
                                                        className="text-red-600 hover:text-red-800"
                                                        onClick={() => console.log(`Reject application ${application.id}`)}
                                                    >
                                                        거절
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardPage;