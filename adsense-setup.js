// AdSense 설정 및 초기화 스크립트
// 실제 AdSense 계정 정보로 교체하세요

const AdSenseSetup = {
  // AdSense Publisher ID (ca-pub-로 시작)
  publisherId: 'ca-pub-4538397115317215',
  
  // 광고 슬롯 ID들
  adSlots: {
    mainBanner: 'YOUR_MAIN_BANNER_SLOT_ID',
    lunchPicker: 'YOUR_LUNCH_PICKER_SLOT_ID',
    salaryCalculator: 'YOUR_SALARY_CALCULATOR_SLOT_ID',
    taxCalculator: 'YOUR_TAX_CALCULATOR_SLOT_ID',
    calorieCalculator: 'YOUR_CALORIE_CALCULATOR_SLOT_ID',
    fortune: 'YOUR_FORTUNE_SLOT_ID'
  },
  
  // AdSense 초기화
  initialize: function() {
    // AdSense 스크립트 로드 확인
    if (typeof adsbygoogle !== 'undefined') {
      this.loadAds();
    } else {
      // AdSense 스크립트 로드 대기
      window.addEventListener('load', () => {
        this.loadAds();
      });
    }
  },
  
  // 광고 로드
  loadAds: function() {
    try {
      // 모든 광고 단위 초기화
      (adsbygoogle = window.adsbygoogle || []).push({});
      console.log('AdSense 광고가 성공적으로 로드되었습니다.');
    } catch (error) {
      console.error('AdSense 광고 로드 중 오류:', error);
    }
  },
  
  // 특정 페이지의 광고 설정
  setupPageAds: function(pageName) {
    const slotId = this.adSlots[pageName];
    if (slotId && slotId !== 'YOUR_' + pageName.toUpperCase() + '_SLOT_ID') {
      // 실제 광고 슬롯 ID가 설정된 경우
      return {
        'data-ad-client': this.publisherId,
        'data-ad-slot': slotId,
        'data-ad-format': 'auto',
        'data-full-width-responsive': 'true'
      };
    }
    return null;
  },
  
  // 광고 성능 모니터링
  monitorPerformance: function() {
    // AdSense 이벤트 리스너
    if (typeof adsbygoogle !== 'undefined') {
      adsbygoogle.push({
        google_ad_client: this.publisherId,
        enable_page_level_ads: true
      });
    }
  }
};

// 페이지 로드 시 AdSense 초기화
document.addEventListener('DOMContentLoaded', function() {
  AdSenseSetup.initialize();
});

// 전역에서 사용할 수 있도록 설정
window.AdSenseSetup = AdSenseSetup;
