import { useState, useEffect, useRef } from 'react';

// 전체 지역 데이터 추가
const allRegion = {
    id: 'all',
    name: '전체',
    subRegions: [
        { id: 'all', name: '전체' }
    ]
};

const regionData = [
    allRegion, // 전체 지역 옵션 추가
    {
        id: 'seoul',
        name: '서울',
        subRegions: [
            { id: 'seoul-all', name: '전체' },
            { id: 'gangnam-seocho', name: '강남/서초' },
            { id: 'songpa-jamsil', name: '송파/잠실' },
            { id: 'hongdae-mapo', name: '홍대/마포' },
            { id: 'gangbuk-dobong', name: '강북/도봉' },
            { id: 'yeouido-yeongdeungpo', name: '여의도/영등포' },
            { id: 'guro-gumcheon', name: '구로/금천' },
            { id: 'gwangjin-seongdong', name: '광진/성동' },
            { id: 'seongbuk-nowon', name: '성북/노원' },
            { id: 'jongno-junggu', name: '종로/중구/명동' },
            { id: 'gangseo-yangcheon', name: '강서/양천' },
            { id: 'dongjak-gwanak', name: '동작/관악' },
            { id: 'eunpyeong-seodaemun', name: '은평/서대문' },
            { id: 'jungnang-dongdaemun', name: '중랑/동대문' }
        ]
    },
    {
        id: 'gyeonggi-incheon',
        name: '경기-인천',
        subRegions: [
            { id: 'gyeonggi-incheon-all', name: '전체' },
            { id: 'ilsan-paju', name: '일산/파주' },
            { id: 'namyangju-guri-하남', name: '남양주/구리/하남' },
            { id: 'yongin-seongnam-gwangju', name: '용인/성남/광주' },
            { id: 'incheon-bucheon', name: '인천/부천' },
            { id: 'suwon', name: '수원' }
        ]
    },
    {
        id: 'gangwon',
        name: '강원',
        subRegions: [
            { id: 'gangwon-all', name: '전체' },
            { id: 'sokcho-yangyang-goseong', name: '속초/양양/고성' },
            { id: 'chuncheon-hongcheon-pyeongchang', name: '춘천/홍천/평창' },
            { id: 'others', name: '기타' }
        ]
    },
    {
        id: 'daejeon-chungcheong',
        name: '대전-충청',
        subRegions: [
            { id: 'daejeon-chungcheong-all', name: '전체' },
            { id: 'daejeon-sejong', name: '대전/세종' },
            { id: 'chungcheongbukdo', name: '충청북도' },
            { id: 'chungcheongnamdo', name: '충청남도' }
        ]
    },
    {
        id: 'daegu-gyeongbuk',
        name: '대구-경북',
        subRegions: [
            { id: 'daegu-gyeongbuk-all', name: '전체' },
            { id: 'daegu', name: '대구' },
            { id: 'gyeongbuk', name: '경북' }
        ]
    },
    {
        id: 'busan-gyeongnam',
        name: '부산-경남',
        subRegions: [
            { id: 'busan-gyeongnam-all', name: '전체' },
            { id: 'busan', name: '부산' },
            { id: 'ulsan', name: '울산' },
            { id: 'gyeongnam', name: '경남' }
        ]
    },
    {
        id: 'gwangju-jeonla',
        name: '광주-전라',
        subRegions: [
            { id: 'gwangju-jeonla-all', name: '전체' },
            { id: 'gwangju', name: '광주' },
            { id: 'jeonbukdo', name: '전라북도' },
            { id: 'jeonnamdo', name: '전라남도' }
        ]
    }
];

function HierarchicalRegionFilter({ onRegionChange, initialRegion = { mainRegionId: 'all', subRegionId: 'all' } }) {
    const [selectedMainRegion, setSelectedMainRegion] = useState(initialRegion.mainRegionId);
    const [selectedSubRegion, setSelectedSubRegion] = useState(initialRegion.subRegionId);
    const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const selectedMainRegionData = regionData.find(region => region.id === selectedMainRegion) || allRegion;

    // 드롭다운 외부 클릭 감지를 위한 이벤트 핸들러
    useEffect(() => {
        function handleClickOutside(event) {
            // buttonRef가 클릭된 경우는 무시 (toggleMainDropdown에서 처리)
            if (buttonRef.current && buttonRef.current.contains(event.target)) {
                return;
            }

            // 드롭다운 외부 클릭 시 닫기
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMainDropdownOpen(false);
            }
        }

        // 이벤트 리스너 추가
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // 컴포넌트 언마운트 시 이벤트 리스너 제거
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMainRegionSelect = (regionId) => {
        if (regionId === selectedMainRegion) {
            // 같은 메인 지역을 다시 클릭한 경우, 드롭다운만 닫음
            setIsMainDropdownOpen(false);
            return;
        }

        setSelectedMainRegion(regionId);

        // 메인 지역 변경 시 해당 지역의 기본 서브 지역 선택
        let subRegionId;
        if (regionId === 'all') {
            subRegionId = 'all';
        } else {
            subRegionId = `${regionId}-all`;
        }

        setSelectedSubRegion(subRegionId);
        setIsMainDropdownOpen(false);

        // 상위 컴포넌트로 변경 이벤트 전달
        onRegionChange({
            mainRegionId: regionId,
            subRegionId: subRegionId
        });
    };

    const handleSubRegionSelect = (subRegionId) => {
        if (subRegionId === selectedSubRegion) return; // 같은 서브 지역 재선택 무시

        setSelectedSubRegion(subRegionId);

        // 상위 컴포넌트로 변경 이벤트 전달
        onRegionChange({
            mainRegionId: selectedMainRegion,
            subRegionId: subRegionId
        });
    };

    const toggleMainDropdown = (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        setIsMainDropdownOpen(!isMainDropdownOpen);
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden relative">
            <div className="flex border-b border-gray-200">
                <div className="relative flex-1">
                    {/* 메인 지역 선택 드롭다운 */}
                    <button
                        ref={buttonRef}
                        type="button"
                        className="w-full py-3 px-4 text-left font-medium hover:bg-gray-50 focus:outline-none flex justify-between items-center"
                        onClick={toggleMainDropdown}
                    >
                        <span>{selectedMainRegionData?.name}</span>
                        <svg
                            className={`h-5 w-5 text-gray-400 transition-transform ${isMainDropdownOpen ? 'rotate-180' : ''}`}
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path d="M7 7l3 3 3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* 드롭다운 메뉴 */}
                    {isMainDropdownOpen && (
                        <div
                            ref={dropdownRef}
                            className="absolute left-0 right-0 z-20 bg-white shadow-lg max-h-60 overflow-auto border border-gray-200 mt-1 rounded"
                            onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
                        >
                            {regionData.map((region) => (
                                <button
                                    key={region.id}
                                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                                        selectedMainRegion === region.id ? 'bg-blue-50 font-medium text-blue-600' : ''
                                    }`}
                                    onClick={() => handleMainRegionSelect(region.id)}
                                >
                                    {region.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-px bg-gray-200"></div>

                {/* 선택된 메인 지역의 서브 지역을 표시하는 버튼 */}
                <div className="flex-[2] overflow-x-auto whitespace-nowrap py-2 px-2">
                    {selectedMainRegionData?.subRegions.map((subRegion) => (
                        <button
                            key={subRegion.id}
                            className={`px-3 py-1 mx-1 rounded-full text-sm ${
                                selectedSubRegion === subRegion.id
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            onClick={() => handleSubRegionSelect(subRegion.id)}
                        >
                            {subRegion.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HierarchicalRegionFilter;
export { regionData, allRegion };