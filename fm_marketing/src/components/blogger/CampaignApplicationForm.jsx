import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplicationStore } from '../../stores/applicationStore';

function CampaignApplicationForm({ campaignId, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        blogUrl: '',
        reason: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const navigate = useNavigate();
    const { applyToCampaign, error, clearError } = useApplicationStore();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear specific field error when typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };
    
    const validateForm = () => {
        const errors = {};
        
        if (!formData.blogUrl.trim()) {
            errors.blogUrl = "블로그 URL을 입력해주세요";
        } else if (!/^(http|https):\/\/[^ "]+$/.test(formData.blogUrl)) {
            errors.blogUrl = "유효한 URL 형식이 아닙니다";
        }
        
        if (!formData.reason.trim()) {
            errors.reason = "지원 이유를 입력해주세요";
        } else if (formData.reason.length < 30) {
            errors.reason = "지원 이유는 최소 30자 이상 작성해주세요";
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            setIsSubmitting(true);
            
            try {
                const result = await applyToCampaign(campaignId, formData);
                if (result) {
                    if (onSuccess) {
                        onSuccess(result);
                    } else {
                        navigate('/pc/blogger/applications');
                    }
                }
            } catch (error) {
                console.error("Application submission error:", error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-sky-800">캠페인 지원하기</h2>
            
            {error && (
                <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                    <p className="font-medium">지원 중 오류가 발생했습니다</p>
                    <p>{error}</p>
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="blogUrl" className="block mb-2 text-sm font-medium text-gray-700">
                        블로그 URL
                    </label>
                    <input
                        type="text"
                        id="blogUrl"
                        name="blogUrl"
                        value={formData.blogUrl}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${formErrors.blogUrl ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500`}
                        placeholder="https://blog.naver.com/yourblog"
                    />
                    {formErrors.blogUrl && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.blogUrl}</p>
                    )}
                </div>
                
                <div className="mb-6">
                    <label htmlFor="reason" className="block mb-2 text-sm font-medium text-gray-700">
                        지원 이유
                    </label>
                    <textarea
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        rows="6"
                        className={`w-full px-3 py-2 border ${formErrors.reason ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500`}
                        placeholder="이 캠페인에 지원하게 된 이유와 블로그 활동 내역을 자세히 작성해주세요..."
                    ></textarea>
                    {formErrors.reason && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.reason}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                        최소 30자 이상 작성해주세요. 지원 이유와 블로그 활동 경험을 상세히 기술할수록
                        지원 승인율이 높아집니다.
                    </p>
                </div>
                
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onCancel}
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
                                제출 중...
                            </span>
                        ) : '지원하기'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CampaignApplicationForm;
