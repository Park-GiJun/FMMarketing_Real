import { useState } from 'react';
import { Link } from 'react-router-dom';
import CampaignApplicationForm from '../blogger/CampaignApplicationForm';

function CampaignDetailView({ campaign, userRole, alreadyApplied, applicationStatus }) {
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    
    // Format dates for display
    const formatDate = (dateString) => {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };
    
    const handleApplyClick = () => {
        setShowApplicationForm(true);
    };
    
    const handleApplicationSuccess = () => {
        setShowApplicationForm(false);
        // Trigger page refresh or data refetch
        window.location.reload();
    };
    
    const handleApplicationCancel = () => {
        setShowApplicationForm(false);
    };
    
    // Check if the campaign is still open for applications
    const isApplicationOpen = () => {
        if (!campaign.applicationDeadline) return false;
        
        const deadline = new Date(campaign.applicationDeadline);
        const now = new Date();
        return deadline > now;
    };
    
    // Determine the status text and class for display
    const getApplicationStatusText = () => {
        if (!applicationStatus) return null;
        
        switch(applicationStatus) {
            case 'PENDING':
                return { text: '심사 중', class: 'bg-yellow-100 text-yellow-800' };
            case 'APPROVED':
                return { text: '승인됨', class: 'bg-green-100 text-green-800' };
            case 'REJECTED':
                return { text: '거절됨', class: 'bg-red-100 text-red-800' };
            case 'COMPLETED':
                return { text: '완료됨', class: 'bg-blue-100 text-blue-800' };
            default:
                return { text: applicationStatus, class: 'bg-gray-100 text-gray-800' };
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Campaign header with image */}
            <div className="relative h-64 bg-sky-100">
                {campaign.imageUrl ? (
                    <img 
                        src={campaign.imageUrl} 
                        alt={campaign.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/api/placeholder/1200/400?text=NoImage';
                        }}
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-sky-100 text-sky-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
                
                {/* Overlay with campaign title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h1 className="text-white text-2xl md:text-3xl font-bold">{campaign.title}</h1>
                    <p className="text-white/90 mt-1">{campaign.storeName} - {campaign.storeAddress}</p>
                </div>
            </div>
            
            {/* Campaign details */}
            <div className="p-6">
                {/* Status badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isApplicationOpen() ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                        {isApplicationOpen() ? '모집중' : '모집마감'}
                    </span>
                    
                    <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-sm font-medium">
                        모집인원: {campaign.requiredBloggerCount}명
                    </span>
                    
                    {applicationStatus && (
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getApplicationStatusText().class}`}>
                            {getApplicationStatusText().text}
                        </span>
                    )}
                </div>
                
                {/* Key information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">신청 마감일</h3>
                        <p className="text-gray-900">{formatDate(campaign.applicationDeadline)}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">리뷰 작성 마감일</h3>
                        <p className="text-gray-900">{formatDate(campaign.reviewDeadline)}</p>
                    </div>
                </div>
                
                {/* Campaign content */}
                <div className="prose max-w-none mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">캠페인 상세 내용</h2>
                    <div className="whitespace-pre-wrap text-gray-700">
                        {campaign.content}
                    </div>
                </div>
                
                {/* Action buttons */}
                <div className="border-t pt-6 flex flex-wrap justify-between items-center">
                    <div className="flex items-center space-x-2 text-gray-600 text-sm">
                        <span>
                            지원자: {campaign.appliedCount}/{campaign.requiredBloggerCount}명
                        </span>
                        <span>•</span>
                        <span>
                            승인: {campaign.approvedCount}명
                        </span>
                        <span>•</span>
                        <span>
                            리뷰 완료: {campaign.reviewCount}명
                        </span>
                    </div>
                    
                    <div className="mt-4 sm:mt-0">
                        {userRole === 'ROLE_BLOGGER' && (
                            <>
                                {alreadyApplied ? (
                                    applicationStatus === 'APPROVED' && !showApplicationForm ? (
                                        <Link
                                            to={`/pc/blogger/campaigns/${campaign.id}/review`}
                                            className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors"
                                        >
                                            리뷰 작성하기
                                        </Link>
                                    ) : (
                                        <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md">
                                            {applicationStatus === 'PENDING' ? '심사중' : 
                                             applicationStatus === 'REJECTED' ? '지원 거절됨' : 
                                             applicationStatus === 'COMPLETED' ? '완료됨' : '지원완료'}
                                        </span>
                                    )
                                ) : (
                                    <>
                                        {isApplicationOpen() ? (
                                            showApplicationForm ? null : (
                                                <button
                                                    onClick={handleApplyClick}
                                                    className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors"
                                                >
                                                    지원하기
                                                </button>
                                            )
                                        ) : (
                                            <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md">
                                                모집 마감
                                            </span>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                        
                        {userRole === 'ROLE_ADMIN' && (
                            <Link
                                to={`/pc/admin/campaigns/${campaign.id}/edit`}
                                className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors"
                            >
                                캠페인 수정
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Application form (conditionally rendered) */}
            {showApplicationForm && (
                <div className="p-6 border-t border-gray-200">
                    <CampaignApplicationForm 
                        campaignId={campaign.id}
                        onSuccess={handleApplicationSuccess}
                        onCancel={handleApplicationCancel}
                    />
                </div>
            )}
        </div>
    );
}

export default CampaignDetailView;
