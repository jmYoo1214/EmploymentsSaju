// AdSense 설정 파일
// 실제 AdSense 계정 정보로 교체하세요

const AdSenseConfig = {
  // Google AdSense Publisher ID (ca-pub-로 시작)
  publisherId: 'ca-pub-YOUR_PUBLISHER_ID',
  
  // 광고 슬롯 ID들
  adSlots: {
    // 메인 페이지 배너 광고
    mainBanner: 'YOUR_MAIN_BANNER_SLOT_ID',
    
    // 사이드바 광고
    sidebar: 'YOUR_SIDEBAR_SLOT_ID',
    
    // 인라인 광고
    inline: 'YOUR_INLINE_SLOT_ID',
    
    // 모바일 광고
    mobile: 'YOUR_MOBILE_SLOT_ID'
  },
  
  // 광고 설정
  settings: {
    // 반응형 광고 사용
    responsive: true,
    
    // 광고 자동 크기 조정
    autoSize: true,
    
    // 광고 로딩 지연 (초)
    loadDelay: 0,
    
    // 광고 새로고침 간격 (초, 0이면 비활성화)
    refreshInterval: 0
  }
};

// AdSense 광고 초기화 함수
function initializeAdSense() {
  if (typeof adsbygoogle !== 'undefined') {
    // 모든 광고 단위 초기화
    (adsbygoogle = window.adsbygoogle || []).push({});
  }
}

// 페이지 로드 시 AdSense 초기화
document.addEventListener('DOMContentLoaded', function() {
  // AdSense 스크립트가 로드된 후 초기화
  if (typeof adsbygoogle !== 'undefined') {
    initializeAdSense();
  } else {
    // AdSense 스크립트 로드 대기
    window.addEventListener('load', initializeAdSense);
  }
});

// AdSense 설정 내보내기
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdSenseConfig;
}
