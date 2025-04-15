import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useApplicationStore } from '../../stores/applicationStore';

function BloggerDashboardPage() {
    const { user } = useAuthStore();
    const { applications, isLoading, fetchMyApplications } = useApplicationStore();
    
    const [stats, setStats] = useState({
        totalApplications: 0,
        approvedApplications: 0,
        pendingApplications: 0,
        completedReviews: 0
    });

    useEffect(() => {
        fetchMyApplications();
        
        // This would normally be calculated from the applications data
        setStats({
            totalApplications: 15,
            approvedApplications: 7,
            pendingApplications: 5,
            completedReviews: 3
        });
    }, [fetchMyApplications]);

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">블로거 대시보드</h1>
                <p className="text-gray-600">안녕하세요, {user?.name || '블로거'}님! 캠페인 참여 현황을 확인하세요.</p>
            </div>
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-sky-100 text-sky-600 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">전체 지원</p>
                            <p className="text-xl font-semibold">{stats.totalApplications}</p>
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
                            <p className="text-sm text-gray-500">승인됨</p>
                            <p className="text-xl font-semibold">{stats.approvedApplications}</p>
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
                            <p className="text-sm text-gray-500">대기중</p>
                            <p className="text-xl font-semibold">{stats.pendingApplications}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">작성한 리뷰</p>
                            <p className="text-xl font-semibold">{stats.completedReviews}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">빠른 액션</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link 
                        to="/pc/blogger/campaigns"
                        className="bg-sky-50 hover:bg-sky-100 p-4 rounded-lg flex items-center text-sky-700 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span>신규 캠페인 찾기</span>
                    </Link>
                    
                    <Link 
                        to="/pc/blogger/applications"
                        className="bg-green-50 hover:bg-green-100 p-4 rounded-lg flex items-center text-green-700 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span>지원 현황 보기</span>
                    </Link>
                    
                    <Link 
                        to="/pc/blogger/profile"
                        className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg flex items-center text-purple-700 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>내 프로필 수정</span>
                    </Link>
                </div>
            </div>
            
            {/* My Applications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">최근 지원 현황</h2>
                    <Link 
                        to="/pc/blogger/applications" 
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
                                    캠페인
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    매장
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    신청일
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    상태
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    액션
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        데이터를 불러오는 중...
                                    </td>
                                </tr>
                            ) : applications.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        아직 지원한 캠페인이 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                applications.slice(0, 5).map((application) => (
                                    <tr key={application.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link 
                                                to={`/pc/blogger/campaigns/${application.campaignId}`}
                                                className="text-sky-600 hover:text-sky-800 font-medium"
                                            >
                                                {application.campaignTitle}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                            {application.storeName}
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
                                            {application.status === 'APPROVED' && !application.reviewUrl && (
                                                <Link 
                                                    to={`/pc/blogger/campaigns/${application.campaignId}/review`}
                                                    className="text-sky-600 hover:text-sky-800"
                                                >
                                                    리뷰 작성
                                                </Link>
                                            )}
                                            {application.status === 'COMPLETED' && (
                                                <a 
                                                    href={application.reviewUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sky-600 hover:text-sky-800"
                                                >
                                                    리뷰 보기
                                                </a>
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

export default BloggerDashboardPage;