import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
    const navigate = useNavigate();
    
    const handleGoHome = () => {
        navigate('/');
    };
    
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-sky-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-100 text-sky-500 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-800 mb-2">404</h1>
                <h2 className="text-xl font-semibold text-gray-700 mb-3">페이지를 찾을 수 없습니다</h2>
                
                <p className="text-gray-600 mb-6">
                    요청하신 페이지가 존재하지 않거나, 이동되었거나, 일시적으로 사용할 수 없습니다.
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 justify-center">
                    <button
                        onClick={handleGoBack}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        이전 페이지로
                    </button>
                    
                    <button
                        onClick={handleGoHome}
                        className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors"
                    >
                        홈으로 이동
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;
