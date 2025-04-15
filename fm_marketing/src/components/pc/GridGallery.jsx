import { useState, useEffect } from 'react';

function GridGallery({ selectedRegion = 'all' }) { // 기본값을 'all'로 변경
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [imageErrors, setImageErrors] = useState({});
    const [filteredItems, setFilteredItems] = useState([]);

    // 샘플 갤러리 아이템 (실제로는 API를 통해 가져올 수 있음)
    const galleryItems = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        imageUrl: `/api/placeholder/300/200?text=Item${i+1}`,
        title: `아이템 ${i + 1}`,
        description: `이미지 ${i + 1}에 대한 간단한 설명입니다.`,
        regionCode: getRandomRegionCode() // 랜덤 지역 코드 할당 (실제로는 API 데이터에서 가져옴)
    }));

    // 지역 필터에 따라 아이템 필터링
    useEffect(() => {
        let regionCode;

        // selectedRegion이 객체인 경우와 문자열인 경우를 모두 처리
        if (typeof selectedRegion === 'object' && selectedRegion !== null) {
            regionCode = selectedRegion.subRegionId;
        } else {
            regionCode = selectedRegion;
        }

        if (regionCode === 'all') {
            // 모든 지역인 경우 (최상위 '전체' 선택) - 모든 아이템 표시
            setFilteredItems(galleryItems);
        } else if (regionCode.endsWith('-all')) {
            // 특정 대분류의 '전체' 선택의 경우 (예: 'seoul-all')
            const mainRegionPrefix = regionCode.split('-all')[0];
            const filtered = galleryItems.filter(item =>
                item.regionCode.startsWith(mainRegionPrefix) ||
                item.regionCode === mainRegionPrefix
            );
            setFilteredItems(filtered);
        } else {
            // 특정 하위 지역 선택의 경우
            const filtered = galleryItems.filter(item =>
                item.regionCode === regionCode ||
                item.regionCode.startsWith(`${regionCode}-`)
            );
            setFilteredItems(filtered);
        }

        setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
    }, [selectedRegion]);

    // 페이지네이션 계산
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemClick = (itemId) => {
        console.log(`Item ${itemId} clicked`);
    };

    const handleImageError = (itemId) => {
        setImageErrors(prev => ({ ...prev, [itemId]: true }));
    };

    // 내용이 없을 경우 메시지 표시
    if (filteredItems.length === 0) {
        return (
            <div className="p-6 bg-sky-50 text-center py-20">
                <p className="text-lg text-gray-500">선택한 지역에 대한 정보가 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-sky-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentItems.map((item) => (
                    <div
                        key={item.id}
                        className="cursor-pointer group"
                        onClick={() => handleItemClick(item.id)}
                    >
                        <div className="overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="relative aspect-[3/2] overflow-hidden bg-white">
                                {!imageErrors[item.id] && (
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        onError={() => handleImageError(item.id)}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold mb-2 text-sky-600 group-hover:text-sky-700 transition-colors">{item.title}</h3>
                                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                                <p className="text-xs text-gray-500 mt-2">지역코드: {item.regionCode}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-12 mb-6">
                    <nav className="inline-flex rounded-md shadow">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-l-md border border-sky-200 bg-white text-sky-600 hover:bg-sky-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            이전
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(page => (
                                page === 1 ||
                                page === totalPages ||
                                Math.abs(page - currentPage) <= 2
                            ))
                            .map((page, index, array) => {
                                if (index > 0 && page - array[index - 1] > 1) {
                                    return (
                                        <span key={`ellipsis-${page}`} className="px-3 py-1 border-t border-b border-sky-200 bg-white text-sky-600">
                                            ...
                                        </span>
                                    );
                                }

                                return (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-1 border border-sky-200 ${
                                            currentPage === page
                                                ? 'bg-sky-100 text-sky-700 font-medium'
                                                : 'bg-white text-sky-600 hover:bg-sky-50'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-r-md border border-sky-200 bg-white text-sky-600 hover:bg-sky-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            다음
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
}

function getRandomRegionCode() {
    const mainRegions = ['seoul', 'gyeonggi-incheon', 'gangwon', 'daejeon-chungcheong', 'daegu-gyeongbuk', 'busan-gyeongnam', 'gwangju-jeonla'];

    const subRegions = {
        'seoul': ['gangnam-seocho', 'songpa-jamsil', 'hongdae-mapo', 'gangbuk-dobong', 'gwangjin-seongdong'],
        'gyeonggi-incheon': ['ilsan-paju', 'namyangju-guri-하남', 'yongin-seongnam-gwangju', 'incheon-bucheon', 'suwon'],
        'gangwon': ['sokcho-yangyang-goseong', 'chuncheon-hongcheon-pyeongchang', 'others'],
        'daejeon-chungcheong': ['daejeon-sejong', 'chungcheongbukdo', 'chungcheongnamdo'],
        'daegu-gyeongbuk': ['daegu', 'gyeongbuk'],
        'busan-gyeongnam': ['busan', 'ulsan', 'gyeongnam'],
        'gwangju-jeonla': ['gwangju', 'jeonbukdo', 'jeonnamdo']
    };

    const mainRegion = mainRegions[Math.floor(Math.random() * mainRegions.length)];
    const subRegionArray = subRegions[mainRegion];
    const subRegion = subRegionArray[Math.floor(Math.random() * subRegionArray.length)];

    return subRegion;
}

export default GridGallery;