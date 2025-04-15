/**
 * 디바이스 타입에 따른 경로를 생성하는 유틸리티 함수
 * @param {string} path - 기본 경로
 * @param {boolean} isMobile - 모바일 여부
 * @returns {string} 디바이스에 맞는 전체 경로
 */
export const getDevicePath = (path, isMobile) => {
    const basePrefix = isMobile ? '/m' : '/pc';
    // 이미 /로 시작하는 경우 처리
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${basePrefix}${normalizedPath}`;
};