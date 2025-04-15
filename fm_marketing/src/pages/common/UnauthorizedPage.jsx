import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

function UnauthorizedPage() {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    
    const handleGoBack = () => {
        navigate(-1);
    };
    
    const handleGoToDashboard = () => {
        // Redirect to the appropriate dashboard based on user role
        if (user) {
            if (user.role === 'ROLE_ADMIN') {
                navigate('/pc/admin/dashboard');
            } else if (user.role === 'ROLE_BLOGGER') {
                navigate('/pc/blogger/dashboard');
            } else if (user.role === 'ROLE_STORE') {
                navigate('/pc/store/dashboard');
            } else {
                navigate('/pc');
            }
        } else {
            navigate('/pc');
        }
    };

    return (
        <div className="min-h-screen bg-sky-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-800 mb-3">접근 권한이 없습니다</h1>
                
                <p className="text-gray-600 mb-6">
                    이 페이지에 접근할 수 있는 권한이 없습니다. 필요한 권한이 없거나 잘못된 경로로 접근하셨습니다.
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 justify-center">
                    <button
                        onClick={handleGoBack}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        이전 페이지로
                    </button>
                    
                    <button
                        onClick={handleGoToDashboard}
                        className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors"
                    >
                        대시보드로 이동
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UnauthorizedPage;
