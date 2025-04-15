import { useState } from 'react';
import HierarchicalRegionFilter, { regionData } from '../../components/pc/HierarchicalRegionFilter';
import GridGallery from '../../components/pc/GridGallery';

function RegionPage() {
    // 기본값을 '전체'로 설정
    const [selectedRegion, setSelectedRegion] = useState({
        mainRegionId: 'all',
        subRegionId: 'all'
    });

    const handleRegionChange = (region) => {
        setSelectedRegion(region);
    };

    // 현재 선택된 지역 이름 가져오기
    const getSelectedRegionNames = () => {
        // '전체' 케이스 처리
        if (selectedRegion.mainRegionId === 'all') {
            return { mainName: '전체', subName: '' };
        }

        const mainRegion = regionData.find(region => region.id === selectedRegion.mainRegionId);
        if (!mainRegion) return { mainName: '', subName: '' };

        const subRegion = mainRegion.subRegions.find(sub => sub.id === selectedRegion.subRegionId);
        return {
            mainName: mainRegion.name,
            subName: subRegion ? subRegion.name : ''
        };
    };

    const { mainName, subName } = getSelectedRegionNames();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">지역별 정보</h1>

            <div className="mb-6">
                <HierarchicalRegionFilter
                    onRegionChange={handleRegionChange}
                    initialRegion={selectedRegion}  // 초기값 전달
                />

                <div className="mt-4">
                    <p className="text-sm text-gray-600">
                        {selectedRegion.mainRegionId === 'all'
                            ? '전체 지역'
                            : selectedRegion.subRegionId.includes('-all')
                                ? `${mainName} 전체`
                                : `${mainName} > ${subName}`}
                    </p>
                </div>
            </div>

            {/* 지역 정보를 객체 형태로 전달 */}
            <GridGallery selectedRegion={selectedRegion} />
        </div>
    );
}

export default RegionPage;