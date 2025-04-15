// 행정구역 기반 데이터
export const mockRegionData = [
    // 서울 - 구 단위
    { id: 1, name: '종로구', region: 'seoul', code: '11010', population: 162500 },
    { id: 2, name: '중구', region: 'seoul', code: '11020', population: 134000 },
    { id: 3, name: '용산구', region: 'seoul', code: '11030', population: 244000 },
    { id: 4, name: '성동구', region: 'seoul', code: '11040', population: 312000 },
    { id: 5, name: '광진구', region: 'seoul', code: '11050', population: 372000 },

    // 부산 - 구/군 단위
    { id: 6, name: '중구', region: 'busan', code: '26010', population: 44000 },
    { id: 7, name: '서구', region: 'busan', code: '26020', population: 114000 },
    { id: 8, name: '동구', region: 'busan', code: '26030', population: 89000 },
    { id: 9, name: '영도구', region: 'busan', code: '26040', population: 122000 },
    { id: 10, name: '부산진구', region: 'busan', code: '26050', population: 378000 },

    // 대구 - 구/군 단위
    { id: 11, name: '중구', region: 'daegu', code: '27010', population: 78000 },
    { id: 12, name: '동구', region: 'daegu', code: '27020', population: 345000 },
    { id: 13, name: '서구', region: 'daegu', code: '27030', population: 193000 },
    { id: 14, name: '남구', region: 'daegu', code: '27040', population: 155000 },
    { id: 15, name: '북구', region: 'daegu', code: '27050', population: 442000 },

    // 인천 - 구/군 단위
    { id: 16, name: '중구', region: 'incheon', code: '28010', population: 114000 },
    { id: 17, name: '동구', region: 'incheon', code: '28020', population: 72000 },
    { id: 18, name: '미추홀구', region: 'incheon', code: '28050', population: 419000 },
    { id: 19, name: '연수구', region: 'incheon', code: '28060', population: 346000 },
    { id: 20, name: '남동구', region: 'incheon', code: '28070', population: 535000 },

    // 광주 - 구 단위
    { id: 21, name: '동구', region: 'gwangju', code: '29010', population: 95000 },
    { id: 22, name: '서구', region: 'gwangju', code: '29020', population: 315000 },
    { id: 23, name: '남구', region: 'gwangju', code: '29030', population: 224000 },
    { id: 24, name: '북구', region: 'gwangju', code: '29040', population: 437000 },
    { id: 25, name: '광산구', region: 'gwangju', code: '29050', population: 402000 },

    // 대전 - 구 단위
    { id: 26, name: '동구', region: 'daejeon', code: '30010', population: 238000 },
    { id: 27, name: '중구', region: 'daejeon', code: '30020', population: 256000 },
    { id: 28, name: '서구', region: 'daejeon', code: '30030', population: 492000 },
    { id: 29, name: '유성구', region: 'daejeon', code: '30040', population: 347000 },
    { id: 30, name: '대덕구', region: 'daejeon', code: '30050', population: 189000 },

    // 울산 - 구/군 단위
    { id: 31, name: '중구', region: 'ulsan', code: '31010', population: 234000 },
    { id: 32, name: '남구', region: 'ulsan', code: '31020', population: 341000 },
    { id: 33, name: '동구', region: 'ulsan', code: '31030', population: 174000 },
    { id: 34, name: '북구', region: 'ulsan', code: '31040', population: 195000 },
    { id: 35, name: '울주군', region: 'ulsan', code: '31050', population: 219000 },

    // 세종 - 세종시는 구분 없음 (읍/면/동 있지만 여기서는 생략)
    { id: 36, name: '세종시', region: 'sejong', code: '36110', population: 356000 },

    // 경기도 - 시/군 단위 (일부만 포함)
    { id: 37, name: '수원시', region: 'gyeonggi', code: '41110', population: 1194000 },
    { id: 38, name: '성남시', region: 'gyeonggi', code: '41130', population: 942000 },
    { id: 39, name: '의정부시', region: 'gyeonggi', code: '41150', population: 438000 },
    { id: 40, name: '안양시', region: 'gyeonggi', code: '41170', population: 597000 },
    { id: 41, name: '부천시', region: 'gyeonggi', code: '41190', population: 843000 },

    // 강원특별자치도 - 시/군 단위 (일부만 포함)
    { id: 42, name: '춘천시', region: 'gangwon', code: '42110', population: 281000 },
    { id: 43, name: '원주시', region: 'gangwon', code: '42130', population: 346000 },
    { id: 44, name: '강릉시', region: 'gangwon', code: '42150', population: 214000 },
    { id: 45, name: '동해시', region: 'gangwon', code: '42170', population: 92000 },
    { id: 46, name: '태백시', region: 'gangwon', code: '42190', population: 46000 },

    // 충청북도 - 시/군 단위 (일부만 포함)
    { id: 47, name: '청주시', region: 'chungbuk', code: '43110', population: 846000 },
    { id: 48, name: '충주시', region: 'chungbuk', code: '43130', population: 207000 },
    { id: 49, name: '제천시', region: 'chungbuk', code: '43150', population: 134000 },
    { id: 50, name: '보은군', region: 'chungbuk', code: '43760', population: 33000 },
    { id: 51, name: '옥천군', region: 'chungbuk', code: '43770', population: 51000 },

    // 충청남도 - 시/군 단위 (일부만 포함)
    { id: 52, name: '천안시', region: 'chungnam', code: '44130', population: 631000 },
    { id: 53, name: '공주시', region: 'chungnam', code: '44150', population: 109000 },
    { id: 54, name: '보령시', region: 'chungnam', code: '44180', population: 103000 },
    { id: 55, name: '아산시', region: 'chungnam', code: '44200', population: 302000 },
    { id: 56, name: '서산시', region: 'chungnam', code: '44210', population: 175000 },

    // 전라북도 - 시/군 단위 (일부만 포함)
    { id: 57, name: '전주시', region: 'jeonbuk', code: '45110', population: 655000 },
    { id: 58, name: '군산시', region: 'jeonbuk', code: '45130', population: 274000 },
    { id: 59, name: '익산시', region: 'jeonbuk', code: '45140', population: 290000 },
    { id: 60, name: '정읍시', region: 'jeonbuk', code: '45180', population: 112000 },
    { id: 61, name: '남원시', region: 'jeonbuk', code: '45190', population: 83000 },

    // 전라남도 - 시/군 단위 (일부만 포함)
    { id: 62, name: '목포시', region: 'jeonnam', code: '46110', population: 234000 },
    { id: 63, name: '여수시', region: 'jeonnam', code: '46130', population: 284000 },
    { id: 64, name: '순천시', region: 'jeonnam', code: '46150', population: 278000 },
    { id: 65, name: '나주시', region: 'jeonnam', code: '46170', population: 103000 },
    { id: 66, name: '광양시', region: 'jeonnam', code: '46230', population: 151000 },

    // 경상북도 - 시/군 단위 (일부만 포함)
    { id: 67, name: '포항시', region: 'gyeongbuk', code: '47110', population: 513000 },
    { id: 68, name: '경주시', region: 'gyeongbuk', code: '47130', population: 257000 },
    { id: 69, name: '김천시', region: 'gyeongbuk', code: '47150', population: 142000 },
    { id: 70, name: '안동시', region: 'gyeongbuk', code: '47170', population: 163000 },
    { id: 71, name: '구미시', region: 'gyeongbuk', code: '47190', population: 419000 },

    // 경상남도 - 시/군 단위 (일부만 포함)
    { id: 72, name: '창원시', region: 'gyeongnam', code: '48120', population: 1058000 },
    { id: 73, name: '진주시', region: 'gyeongnam', code: '48170', population: 344000 },
    { id: 74, name: '통영시', region: 'gyeongnam', code: '48220', population: 132000 },
    { id: 75, name: '사천시', region: 'gyeongnam', code: '48240', population: 114000 },
    { id: 76, name: '김해시', region: 'gyeongnam', code: '48250', population: 529000 },

    // 제주특별자치도 - 시 단위
    { id: 77, name: '제주시', region: 'jeju', code: '50110', population: 478000 },
    { id: 78, name: '서귀포시', region: 'jeju', code: '50130', population: 169000 }
];