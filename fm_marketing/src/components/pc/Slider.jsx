import { useState, useEffect } from 'react';

function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [imageErrors, setImageErrors] = useState({});

    const slides = [
        {
            id: 1,
            imageUrl: '/api/placeholder/1200/400',
            title: '최고의 마케팅 솔루션',
            description: '당신의 비즈니스를 성장시킬 수 있는 최적의 솔루션을 만나보세요.'
        },
        {
            id: 2,
            imageUrl: '/api/placeholder/1200/400',
            title: '전문 마케팅 컨설팅',
            description: '경험 많은 전문가들이 당신의 비즈니스를 분석하고 최적의 전략을 제시합니다.'
        },
        {
            id: 3,
            imageUrl: '/api/placeholder/1200/400',
            title: '성공적인 캠페인 사례',
            description: '다양한 성공 사례를 통해 효과적인 마케팅 전략을 확인하세요.'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const handleImageError = (slideId) => {
        setImageErrors(prev => ({ ...prev, [slideId]: true }));
    };

    return (
        <div className="relative max-w-[1200px] mx-auto px-12">
            {/* Navigation buttons */}
            <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 text-sky-700 hover:text-sky-900 transition-colors duration-200"
                onClick={prevSlide}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sky-700 hover:text-sky-900 transition-colors duration-200"
                onClick={nextSlide}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Slider container */}
            <div className="relative w-full overflow-hidden h-[400px] bg-sky-50 rounded-xl">
                <div
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide) => (
                        <div key={slide.id} className="min-w-full h-full relative bg-sky-50">
                            {!imageErrors[slide.id] && (
                                <img
                                    src={slide.imageUrl}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                    onError={() => handleImageError(slide.id)}
                                />
                            )}
                            <div className="absolute inset-0 bg-sky-900 bg-opacity-30 flex flex-col justify-center px-10">
                                <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">
                                    {slide.title}
                                </h2>
                                <p className="text-xl text-white drop-shadow-md">
                                    {slide.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Slide indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                                currentSlide === index
                                    ? 'bg-sky-100 border-2 border-sky-400'
                                    : 'bg-sky-100 bg-opacity-50 hover:bg-opacity-75'
                            }`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Slider;