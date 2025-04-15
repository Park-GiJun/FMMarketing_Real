import Slider from '../../components/pc/Slider';
import GridGallery from '../../components/pc/GridGallery';

function PCHomePage() {
    return (
        <>
            {/* 슬라이더 섹션 */}
            <section className="mb-10">
                <Slider />
            </section>

            {/* 그리드 갤러리 섹션 */}
            <section className="container mx-auto px-4 mb-12">
                <h2 className="text-2xl font-bold mb-6 text-sky-800">최신 콘텐츠</h2>
                <GridGallery />
            </section>
        </>
    );
}

export default PCHomePage;