import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaignStore } from '../../stores/campaignStore';

function CampaignForm({ campaignId, initialData, onSuccess }) {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        storeName: '',
        storeAddress: '',
        applicationDeadline: '',
        reviewDeadline: '',
        requiredBloggerCount: 1,
        imageUrl: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    
    const navigate = useNavigate();
    const { createCampaign, updateCampaign, fetchCampaignDetails, error, clearError } = useCampaignStore();
    
    // Initialize form with campaign data for edit mode
    useEffect(() => {
        if (campaignId) {
            setIsEditMode(true);
            
            if (initialData) {
                populateFormData(initialData);
            } else {
                const fetchCampaign = async () => {
                    const campaign = await fetchCampaignDetails(campaignId);
                    if (campaign) {
                        populateFormData(campaign);
                    }
                };
                
                fetchCampaign();
            }
        }
    }, [campaignId, initialData, fetchCampaignDetails]);
    
    const populateFormData = (campaign) => {
        // Format dates for input fields
        const applicationDate = campaign.applicationDeadline 
            ? new Date(campaign.applicationDeadline).toISOString().substring(0, 16) 
            : '';
        const reviewDate = campaign.reviewDeadline 
            ? new Date(campaign.reviewDeadline).toISOString().substring(0, 16) 
            : '';
            
        setFormData({
            title: campaign.title || '',
            content: campaign.content || '',
            storeName: campaign.storeName || '',
            storeAddress: campaign.storeAddress || '',
            applicationDeadline: applicationDate,
            reviewDeadline: reviewDate,
            requiredBloggerCount: campaign.requiredBloggerCount || 1,
            imageUrl: campaign.imageUrl || ''
        });
    };
    
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        
        // For number inputs, convert the value
        const processedValue = type === 'number' ? parseInt(value, 10) : value;
        
        setFormData(prev => ({
            ...prev,
            [name]: processedValue
        }));
        
        // Clear error for this field when typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };
    
    const validateForm = () => {
        const errors = {};
        const now = new Date();
        
        // Required fields
        if (!formData.title.trim()) errors.title = "제목을 입력해주세요";
        if (!formData.content.trim()) errors.content = "내용을 입력해주세요";
        if (!formData.storeName.trim()) errors.storeName = "매장 이름을 입력해주세요";
        if (!formData.storeAddress.trim()) errors.storeAddress = "매장 주소를 입력해주세요";
        
        // Date validation
        if (!formData.applicationDeadline) {
            errors.applicationDeadline = "신청 마감일을 설정해주세요";
        } else {
            const appDate = new Date(formData.applicationDeadline);
            if (appDate <= now) {
                errors.applicationDeadline = "신청 마감일은 현재 시간 이후로 설정해야 합니다";
            }
        }
        
        if (!formData.reviewDeadline) {
            errors.reviewDeadline = "리뷰 마감일을 설정해주세요";
        } else {
            const reviewDate = new Date(formData.reviewDeadline);
            const appDate = new Date(formData.applicationDeadline);
            if (reviewDate <= now) {
                errors.reviewDeadline = "리뷰 마감일은 현재 시간 이후로 설정해야 합니다";
            }
            if (formData.applicationDeadline && reviewDate <= appDate) {
                errors.reviewDeadline = "리뷰 마감일은 신청 마감일 이후로 설정해야 합니다";
            }
        }
        
        // Number validation
        if (formData.requiredBloggerCount < 1) {
            errors.requiredBloggerCount = "필요한 블로거 수는 최소 1명 이상이어야 합니다";
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            setIsSubmitting(true);
            
            try {
                // Format data for API
                const campaignData = {
                    ...formData,
                    applicationDeadline: new Date(formData.applicationDeadline).toISOString(),
                    reviewDeadline: new Date(formData.reviewDeadline).toISOString()
                };
                
                let result;
                if (isEditMode) {
                    result = await updateCampaign(campaignId, campaignData);
                } else {
                    result = await createCampaign(campaignData);
                }
                
                if (result) {
                    if (onSuccess) {
                        onSuccess(result);
                    } else {
                        navigate(`/pc/admin/campaigns/${result.id}`);
                    }
                }
            } catch (error) {
                console.error("Campaign submission error:", error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };
    
    const handleCancel = () => {
        if (isEditMode) {
            navigate(`/pc/admin/campaigns/${campaignId}`);
        } else {
            navigate('/pc/admin/campaigns');
        }
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-sky-800">
                {isEditMode ? '캠페인 수정' : '새 캠페인 등록'}
            </h2>
            
            {error && (
                <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                    <p className="font-medium">오류가 발생했습니다</p>
                    <p>{error}</p>
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
                        캠페인 제목 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${formErrors.title ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500`}
                        placeholder="캠페인 제목을 입력하세요"
                    />
                    {formErrors.title && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                    )}
                </div>
                
                <div>
                    <label htmlFor="storeName" className="block mb-2 text-sm font-medium text-gray-700">
                        매장 이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="storeName"
                        name="storeName"
                        value={formData.storeName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${formErrors.storeName ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500`}
                        placeholder="매장 이름을 입력하세요"
                    />
                    {formErrors.storeName && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.storeName}</p>
                    )}
                </div>
                
                <div>
                    <label htmlFor="storeAddress" className="block mb-2 text-sm font-medium text-gray-700">
                        매장 주소 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="storeAddress"
                        name="storeAddress"
                        value={formData.storeAddress}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${formErrors.storeAddress ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500`}
                        placeholder="매장 주소를 입력하세요"
                    />
                    {formErrors.storeAddress && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.storeAddress}</p>
                    )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="applicationDeadline" className="block mb-2 text-sm font-medium text-gray-700">
                            신청 마감일 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="datetime-local"
                            id="applicationDeadline"
                            name="applicationDeadline"
                            value={formData.applicationDeadline}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border ${formErrors.applicationDeadline ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500`}
                        />
                        {formErrors.applicationDeadline && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.applicationDeadline}</p>
                        )}
                    </div>
                    
                    <div>
                        <label htmlFor="reviewDeadline" className="block mb-2 text-sm font-medium text-gray-700">
                            리뷰 마감일 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="datetime-local"
                            id="reviewDeadline"
                            name="reviewDeadline"
                            value={formData.reviewDeadline}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border ${formErrors.reviewDeadline ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500`}
                        />
                        {formErrors.reviewDeadline && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.reviewDeadline}</p>
                        )}
                    </div>
                </div>
                
                <div>
                    <label htmlFor="requiredBloggerCount" className="block mb-2 text-sm font-medium text-gray-700">
                        필요 블로거 수 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        id="requiredBloggerCount"
                        name="requiredBloggerCount"
                        min="1"
                        value={formData.requiredBloggerCount}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${formErrors.requiredBloggerCount ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500`}
                    />
                    {formErrors.requiredBloggerCount && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.requiredBloggerCount}</p>
                    )}
                </div>
                
                <div>
                    <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-700">
                        이미지 URL
                    </label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="대표 이미지 URL을 입력하세요 (선택사항)"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        캠페인 대표 이미지 URL을 입력하세요. 입력하지 않으면 기본 이미지가 사용됩니다.
                    </p>
                </div>
                
                <div>
                    <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-700">
                        캠페인 내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        rows="10"
                        value={formData.content}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${formErrors.content ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500`}
                        placeholder="캠페인 상세 내용을 입력하세요..."
                    ></textarea>
                    {formErrors.content && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.content}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                        매장 소개, 메뉴 설명, 블로거에게 바라는 점 등을 자세히 작성해주세요.
                    </p>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-4 py-2 rounded-md text-white ${
                            isSubmitting ? 'bg-sky-400' : 'bg-sky-600 hover:bg-sky-700'
                        } focus:outline-none focus:ring-2 focus:ring-sky-500`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                저장 중...
                            </span>
                        ) : (isEditMode ? '수정하기' : '등록하기')}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CampaignForm;
