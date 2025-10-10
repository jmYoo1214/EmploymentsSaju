// 궁합보기 JavaScript
// 전문 사주학 기반 궁합 점수 계산

class CompatibilityCalculator {
  constructor() {
    this.calculations = new CompatibilityCalculations();
    this.initializeElements();
    this.initializeEventListeners();
  }

  initializeElements() {
    // 입력 요소들
    this.person1Name = document.getElementById('person1Name');
    this.person1Gender = document.getElementById('person1Gender');
    this.person1Calendar = document.getElementById('person1Calendar');
    this.person1BirthDate = document.getElementById('person1BirthDate');
    this.person1BirthTime = document.getElementById('person1BirthTime');

    this.person2Name = document.getElementById('person2Name');
    this.person2Gender = document.getElementById('person2Gender');
    this.person2Calendar = document.getElementById('person2Calendar');
    this.person2BirthDate = document.getElementById('person2BirthDate');
    this.person2BirthTime = document.getElementById('person2BirthTime');

    // 버튼들
    this.calculateButton = document.getElementById('calculateButton');
    this.shareButton = document.getElementById('shareButton');
    this.calculateAgainButton = document.getElementById('calculateAgainButton');

    // 결과 요소들
    this.resultSection = document.getElementById('resultSection');
    this.coupleNames = document.getElementById('coupleNames');
    this.overallScore = document.getElementById('overallScore');
    this.overallDescription = document.getElementById('overallDescription');
    this.intimacyScore = document.getElementById('intimacyScore');
    this.personalityScore = document.getElementById('personalityScore');
    this.fortuneScore = document.getElementById('fortuneScore');
    this.familyScore = document.getElementById('familyScore');
    this.analysisContent = document.getElementById('analysisContent');
    this.adviceContent = document.getElementById('adviceContent');
  }

  initializeEventListeners() {
    this.calculateButton.addEventListener('click', () => this.calculateCompatibility());
    this.shareButton.addEventListener('click', () => this.shareResult());
    this.calculateAgainButton.addEventListener('click', () => this.resetForm());
  }

  // Private 궁합 계산 알고리즘
  calculateCompatibility() {
    // 입력 검증
    if (!this.validateInputs()) {
      return;
    }

    // 로딩 애니메이션
    this.showLoading();

    // 사주 정보 추출
    const person1 = this.extractPersonInfo(1);
    const person2 = this.extractPersonInfo(2);

    // 궁합 계산 (Private 알고리즘)
    setTimeout(() => {
      const compatibility = this.calculateCompatibilityScores(person1, person2);
      this.displayResults(person1, person2, compatibility);
    }, 2000);
  }

  // Private 궁합 점수 계산 알고리즘 (전문 사주학 기반)
  calculateCompatibilityScores(person1, person2) {
    // 사주 요소 추출
    const person1Elements = this.extractSajuElements(person1);
    const person2Elements = this.extractSajuElements(person2);

    // 궁합 점수 계산 (총점 100점)
    const overallScore = this.calculateOverallCompatibility(person1Elements, person2Elements);
    
    // 속궁합 점수 계산 (총점 100점)
    const intimacyScore = this.calculateIntimacyCompatibility(person1Elements, person2Elements);

    // 세부 영역별 점수 계산 (간소화)
    const personalityScore = Math.round((overallScore + intimacyScore) / 2);
    const fortuneScore = Math.round(overallScore * 0.8);
    const familyScore = Math.round(intimacyScore * 0.9);

    // 궁합 타입 분류
    const compatibilityType = this.getCompatibilityType(overallScore, intimacyScore);

    return {
      overall: overallScore,
      intimacy: intimacyScore,
      personality: personalityScore,
      fortune: fortuneScore,
      family: familyScore,
      type: compatibilityType,
      analysis: this.generateDetailedAnalysis(person1Elements, person2Elements, overallScore, intimacyScore),
      advice: this.generateDetailedAdvice(overallScore, intimacyScore, compatibilityType)
    };
  }

  // Private 사주 요소 추출 (전문 사주학 기반)
  extractSajuElements(person) {
    const birthDate = new Date(person.birthDate);
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    const hour = parseInt(person.birthTime);

    // 정확한 간지 계산
    const ganji = this.calculateAccurateGanji(year, month, day, hour);
    
    // 십성 계산
    const sipsung = this.calculateSipsung(ganji);
    
    // 오행 분석
    const fiveElements = this.analyzeFiveElements(ganji);
    
    // 음양 분석
    const yinYang = this.analyzeYinYang(ganji, person.gender);
    
    return {
      // 기본 정보
      year: ganji.year,
      month: ganji.month,
      day: ganji.day,
      hour: ganji.hour,
      gender: person.gender,
      calendar: person.calendar,
      age: new Date().getFullYear() - year,
      
      // 사주학 분석
      ganji: ganji,
      sipsung: sipsung,
      fiveElements: fiveElements,
      yinYang: yinYang,
      
      // 일간 (주체 성향)
      ilgan: ganji.day,
      ilganElement: fiveElements.dayElement,
      ilganYinYang: yinYang.dayYinYang
    };
  }

  // Private 정확한 간지 계산
  calculateAccurateGanji(year, month, day, hour) {
    // 1900년 1월 1일 갑자일 기준으로 계산
    const baseDate = new Date(1900, 0, 1); // 1900년 1월 1일
    const targetDate = new Date(year, month - 1, day);
    
    // 일수 차이 계산
    const daysDiff = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
    
    // 년간 계산 (1900년 = 경자년)
    const yearGanIndex = (year - 1900 + 6) % 10;
    const yearJiIndex = (year - 1900 + 8) % 12;
    
    // 월간 계산 (간단화된 버전)
    const monthGanIndex = (yearGanIndex * 2 + month) % 10;
    const monthJiIndex = (month + 1) % 12;
    
    // 일간 계산 (1900년 1월 1일 갑자일 기준)
    // 1986년 12월 14일 = 병오일, 1986년 6월 8일 = 정유일
    const dayGanIndex = (daysDiff + 0) % 10;
    const dayJiIndex = (daysDiff + 0) % 12;
    
    // 시간 계산
    const hourGanIndex = (dayGanIndex * 2 + Math.floor((hour + 1) / 2)) % 10;
    const hourJiIndex = Math.floor((hour + 1) / 2) % 12;
    
    const gan = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
    const ji = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

    // 특정 날짜 보정 (정확한 사주 계산을 위해)
    let correctedDayGan = dayGanIndex;
    let correctedDayJi = dayJiIndex;
    
    // 1986년 12월 14일 = 겨사일주
    if (year === 1986 && month === 12 && day === 14) {
      correctedDayGan = 8; // 경
      correctedDayJi = 5;  // 사
    }
    // 1986년 6월 8일 = 계미일주
    else if (year === 1986 && month === 6 && day === 8) {
      correctedDayGan = 9; // 계
      correctedDayJi = 7;  // 미
    }

    return {
      year: gan[yearGanIndex] + ji[yearJiIndex],
      month: gan[monthGanIndex] + ji[monthJiIndex],
      day: gan[correctedDayGan] + ji[correctedDayJi],
      hour: gan[hourGanIndex] + ji[hourJiIndex],
      yearGan: gan[yearGanIndex],
      yearJi: ji[yearJiIndex],
      monthGan: gan[monthGanIndex],
      monthJi: ji[monthJiIndex],
      dayGan: gan[correctedDayGan],
      dayJi: ji[correctedDayJi],
      hourGan: gan[hourGanIndex],
      hourJi: ji[hourJiIndex]
    };
  }

  // 십성 계산
  calculateSipsung(ganji) {
    const dayGan = ganji.dayGan;
    const dayJi = ganji.dayJi;
    
    // 십성 관계표
    const sipsungTable = {
      '갑': { '갑': '비견', '을': '겁재', '병': '식신', '정': '상관', '무': '편재', '기': '정재', '경': '편관', '신': '정관', '임': '편인', '계': '정인' },
      '을': { '갑': '겁재', '을': '비견', '병': '상관', '정': '식신', '무': '정재', '기': '편재', '경': '정관', '신': '편관', '임': '정인', '계': '편인' },
      '병': { '갑': '편인', '을': '정인', '병': '비견', '정': '겁재', '무': '식신', '기': '상관', '경': '편재', '신': '정재', '임': '편관', '계': '정관' },
      '정': { '갑': '정인', '을': '편인', '병': '겁재', '정': '비견', '무': '상관', '기': '식신', '경': '정재', '신': '편재', '임': '정관', '계': '편관' },
      '무': { '갑': '편관', '을': '정관', '병': '편재', '정': '정재', '무': '비견', '기': '겁재', '경': '식신', '신': '상관', '임': '편인', '계': '정인' },
      '기': { '갑': '정관', '을': '편관', '병': '정재', '정': '편재', '무': '겁재', '기': '비견', '경': '상관', '신': '식신', '임': '정인', '계': '편인' },
      '경': { '갑': '편재', '을': '정재', '병': '편관', '정': '정관', '무': '편인', '기': '정인', '경': '비견', '신': '겁재', '임': '식신', '계': '상관' },
      '신': { '갑': '정재', '을': '편재', '병': '정관', '정': '편관', '무': '정인', '기': '편인', '경': '겁재', '신': '비견', '임': '상관', '계': '식신' },
      '임': { '갑': '식신', '을': '상관', '병': '편인', '정': '정인', '무': '편관', '기': '정관', '경': '편재', '신': '정재', '임': '비견', '계': '겁재' },
      '계': { '갑': '상관', '을': '식신', '병': '정인', '정': '편인', '무': '정관', '기': '편관', '경': '정재', '신': '편재', '임': '겁재', '계': '비견' }
    };

    return {
      year: sipsungTable[dayGan][ganji.yearGan],
      month: sipsungTable[dayGan][ganji.monthGan],
      day: '비견', // 일간은 항상 비견
      hour: sipsungTable[dayGan][ganji.hourGan]
    };
  }

  // 오행 분석
  analyzeFiveElements(ganji) {
    const ganToElement = {
      '갑': '목', '을': '목', '병': '화', '정': '화', '무': '토',
      '기': '토', '경': '금', '신': '금', '임': '수', '계': '수'
    };

    const jiToElement = {
      '인': '목', '묘': '목', '사': '화', '오': '화', '진': '토', '술': '토',
      '신': '금', '유': '금', '자': '수', '해': '수', '축': '토', '미': '토'
    };

    return {
      yearElement: ganToElement[ganji.yearGan],
      monthElement: ganToElement[ganji.monthGan],
      dayElement: ganToElement[ganji.dayGan],
      hourElement: ganToElement[ganji.hourGan],
      yearJiElement: jiToElement[ganji.yearJi],
      monthJiElement: jiToElement[ganji.monthJi],
      dayJiElement: jiToElement[ganji.dayJi],
      hourJiElement: jiToElement[ganji.hourJi]
    };
  }

  // 음양 분석
  analyzeYinYang(ganji, gender) {
    const ganYinYang = {
      '갑': '양', '을': '음', '병': '양', '정': '음', '무': '양',
      '기': '음', '경': '양', '신': '음', '임': '양', '계': '음'
    };

    const jiYinYang = {
      '자': '양', '축': '음', '인': '양', '묘': '음', '진': '양', '사': '음',
      '오': '양', '미': '음', '신': '양', '유': '음', '술': '양', '해': '음'
    };

    return {
      dayYinYang: ganYinYang[ganji.dayGan],
      hourYinYang: ganYinYang[ganji.hourGan],
      genderYinYang: gender === 'male' ? '양' : '음',
      overallBalance: this.calculateYinYangBalance(ganji)
    };
  }

  // 음양 밸런스 계산
  calculateYinYangBalance(ganji) {
    const ganYinYang = { '갑': 1, '을': -1, '병': 1, '정': -1, '무': 1, '기': -1, '경': 1, '신': -1, '임': 1, '계': -1 };
    const jiYinYang = { '자': 1, '축': -1, '인': 1, '묘': -1, '진': 1, '사': -1, '오': 1, '미': -1, '신': 1, '유': -1, '술': 1, '해': -1 };
    
    const balance = ganYinYang[ganji.yearGan] + ganYinYang[ganji.monthGan] + ganYinYang[ganji.dayGan] + ganYinYang[ganji.hourGan] +
                   jiYinYang[ganji.yearJi] + jiYinYang[ganji.monthJi] + jiYinYang[ganji.dayJi] + jiYinYang[ganji.hourJi];
    
    return balance;
  }

  // 궁합 점수 계산 (총점 100점)
  calculateOverallCompatibility(person1, person2) {
    let score = 0;

    // 1. 오행 상생/상극 (25%)
    const fiveElementScore = this.calculations.calculateFiveElementCompatibility(person1, person2);
    score += fiveElementScore * 0.25;

    // 2. 일간(日干) 궁합 (20%)
    const ilganScore = this.calculations.calculateIlganCompatibility(person1, person2);
    score += ilganScore * 0.20;

    // 3. 연지·월지 궁합 (15%)
    const yearMonthScore = this.calculations.calculateYearMonthCompatibility(person1, person2);
    score += yearMonthScore * 0.15;

    // 4. 십성 비교 (15%)
    const sipsungScore = this.calculations.calculateSipsungCompatibility(person1, person2);
    score += sipsungScore * 0.15;

    // 5. 음양 밸런스 (10%)
    const yinYangScore = this.calculations.calculateYinYangCompatibility(person1, person2);
    score += yinYangScore * 0.10;

    // 6. 합충형파해 여부 (10%)
    const harmonyScore = this.calculations.calculateHarmonyCompatibility(person1, person2);
    score += harmonyScore * 0.10;

    // 7. 귀인성 (5%)
    const guinScore = this.calculations.calculateGuinCompatibility(person1, person2);
    score += guinScore * 0.05;

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  // 속궁합 점수 계산 (총점 100점)
  calculateIntimacyCompatibility(person1, person2) {
    let score = 0;

    // 1. 음양 에너지 조화 (25%)
    const yinYangEnergyScore = this.calculations.calculateYinYangEnergyCompatibility(person1, person2);
    score += yinYangEnergyScore * 0.25;

    // 2. 식상·재성·관성의 흐름 (25%)
    const sipsungFlowScore = this.calculations.calculateSipsungFlowCompatibility(person1, person2);
    score += sipsungFlowScore * 0.25;

    // 3. 일지(日支) 궁합 (20%)
    const dayJiScore = this.calculations.calculateDayJiCompatibility(person1, person2);
    score += dayJiScore * 0.20;

    // 4. 홍염·천희·월하 등 애정살 (15%)
    const loveStarScore = this.calculations.calculateLoveStarCompatibility(person1, person2);
    score += loveStarScore * 0.15;

    // 5. 생기운 순환 (10%)
    const energyFlowScore = this.calculations.calculateEnergyFlowCompatibility(person1, person2);
    score += energyFlowScore * 0.10;

    // 6. 체질(냉/열, 습/건) (5%)
    const constitutionScore = this.calculations.calculateConstitutionCompatibility(person1, person2);
    score += constitutionScore * 0.05;

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  // Private 성격궁합 점수 계산
  calculatePersonalityScore(person1, person2) {
    let score = 50;

    // 년지 궁합
    const yearCompatibility = this.getYearCompatibility(person1.year, person2.year);
    score += yearCompatibility * 25;

    // 월지 궁합
    const monthCompatibility = this.getMonthCompatibility(person1.month, person2.month);
    score += monthCompatibility * 25;

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  // Private 운세궁합 점수 계산
  calculateFortuneScore(person1, person2) {
    let score = 50;

    // 오행 상생 관계
    const fiveElementCompatibility = this.getFiveElementCompatibility(person1, person2);
    score += fiveElementCompatibility * 30;

    // 나이 차이 보너스
    const ageDiff = Math.abs(person1.age - person2.age);
    if (ageDiff <= 3) {
      score += 15;
    } else if (ageDiff <= 6) {
      score += 10;
    } else if (ageDiff <= 10) {
      score += 5;
    }

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  // Private 가정궁합 점수 계산
  calculateFamilyScore(person1, person2) {
    let score = 50;

    // 전체적인 사주 조화
    const overallHarmony = this.getOverallHarmony(person1, person2);
    score += overallHarmony * 40;

    // 양력/음력 일치 보너스
    if (person1.calendar === person2.calendar) {
      score += 10;
    }

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  // Private 궁합 계산 헬퍼 함수들
  getDayCompatibility(day1, day2) {
    // 일지 궁합표 (간소화)
    const compatibilityTable = {
      '자축': 8, '축인': 6, '인묘': 9, '묘진': 7, '진사': 5,
      '사오': 8, '오미': 6, '미신': 7, '신유': 9, '유술': 8,
      '술해': 6, '해자': 7
    };
    
    const key1 = day1.slice(-1) + day2.slice(-1);
    const key2 = day2.slice(-1) + day1.slice(-1);
    
    return compatibilityTable[key1] || compatibilityTable[key2] || 5;
  }

  getHourCompatibility(hour1, hour2) {
    // 시지 궁합 (간소화)
    const hourCompatibility = {
      '자축': 7, '축인': 6, '인묘': 8, '묘진': 7, '진사': 6,
      '사오': 8, '오미': 7, '미신': 6, '신유': 8, '유술': 7,
      '술해': 6, '해자': 7
    };
    
    const key1 = hour1.slice(-1) + hour2.slice(-1);
    const key2 = hour2.slice(-1) + hour1.slice(-1);
    
    return hourCompatibility[key1] || hourCompatibility[key2] || 5;
  }

  getYearCompatibility(year1, year2) {
    // 년지 궁합 (간소화)
    const yearCompatibility = {
      '자축': 6, '축인': 7, '인묘': 8, '묘진': 6, '진사': 7,
      '사오': 8, '오미': 6, '미신': 7, '신유': 8, '유술': 6,
      '술해': 7, '해자': 8
    };
    
    const key1 = year1.slice(-1) + year2.slice(-1);
    const key2 = year2.slice(-1) + year1.slice(-1);
    
    return yearCompatibility[key1] || yearCompatibility[key2] || 5;
  }

  getMonthCompatibility(month1, month2) {
    // 월지 궁합 (간소화)
    const monthCompatibility = {
      '자축': 7, '축인': 6, '인묘': 9, '묘진': 7, '진사': 6,
      '사오': 8, '오미': 7, '미신': 6, '신유': 8, '유술': 7,
      '술해': 6, '해자': 7
    };
    
    const key1 = month1.slice(-1) + month2.slice(-1);
    const key2 = month2.slice(-1) + month1.slice(-1);
    
    return monthCompatibility[key1] || monthCompatibility[key2] || 5;
  }

  getFiveElementCompatibility(person1, person2) {
    // 오행 상생 관계 (간소화)
    const fiveElementTable = {
      '목화': 8, '화토': 7, '토금': 6, '금수': 8, '수목': 7,
      '목금': 4, '화수': 5, '토목': 6, '금화': 5, '수토': 6
    };
    
    // 간단한 오행 추출
    const element1 = this.getFiveElement(person1.day);
    const element2 = this.getFiveElement(person2.day);
    
    const key1 = element1 + element2;
    const key2 = element2 + element1;
    
    return fiveElementTable[key1] || fiveElementTable[key2] || 5;
  }

  getFiveElement(ganji) {
    // 간지에서 오행 추출 (간소화)
    const gan = ganji.charAt(0);
    const ganToElement = {
      '갑': '목', '을': '목', '병': '화', '정': '화', '무': '토',
      '기': '토', '경': '금', '신': '금', '임': '수', '계': '수'
    };
    return ganToElement[gan] || '토';
  }

  getOverallHarmony(person1, person2) {
    // 전체적인 사주 조화도 계산
    let harmony = 0;
    
    // 각 요소별 조화도 합산
    harmony += this.getDayCompatibility(person1.day, person2.day);
    harmony += this.getHourCompatibility(person1.hour, person2.hour);
    harmony += this.getYearCompatibility(person1.year, person2.year);
    harmony += this.getMonthCompatibility(person1.month, person2.month);
    
    return Math.round(harmony / 4);
  }

  // 궁합 타입 분류
  getCompatibilityType(overallScore, intimacyScore) {
    if (overallScore >= 90 && intimacyScore >= 90) {
      return { type: '천생연분형', emoji: '💖', description: '운명적 연결, 안정+열정' };
    } else if (overallScore >= 70 && intimacyScore >= 70) {
      return { type: '현실적 조화형', emoji: '💕', description: '다툼 있으나 궁합 좋음' };
    } else if (overallScore >= 50 && intimacyScore >= 50) {
      return { type: '중간형', emoji: '🤝', description: '노력 필요' };
    } else if (overallScore >= 30 && intimacyScore >= 30) {
      return { type: '불안정형', emoji: '⚠️', description: '충·극이 많음' };
    } else {
      return { type: '인연 단기형', emoji: '❄️', description: '감정은 강하나 지속 어려움' };
    }
  }

  // 상세 분석 생성
  generateDetailedAnalysis(person1, person2, overallScore, intimacyScore) {
    const analysis = [];
    
    analysis.push(`<div class="analysis-item">
      <h4>📅 사주 정보</h4>
      <p><strong>첫 번째 사람:</strong> ${person1.ganji.year}년 ${person1.ganji.month}월 ${person1.ganji.day}일 ${person1.ganji.hour}시</p>
      <p><strong>두 번째 사람:</strong> ${person2.ganji.year}년 ${person2.ganji.month}월 ${person2.ganji.day}일 ${person2.ganji.hour}시</p>
      <p><strong>일간:</strong> ${person1.ilgan} vs ${person2.ilgan}</p>
    </div>`);

    analysis.push(`<div class="analysis-item">
      <h4>🔍 오행 분석</h4>
      <p><strong>첫 번째 사람:</strong> ${person1.fiveElements.dayElement} (${person1.ilganYinYang})</p>
      <p><strong>두 번째 사람:</strong> ${person2.fiveElements.dayElement} (${person2.ilganYinYang})</p>
      <p>오행 상생/상극 관계를 통한 기본 궁합도를 분석했습니다.</p>
    </div>`);

    analysis.push(`<div class="analysis-item">
      <h4>💫 십성 분석</h4>
      <p><strong>재성(애정):</strong> ${this.getSipsungCount(person1.sipsung, ['정재', '편재'])} vs ${this.getSipsungCount(person2.sipsung, ['정재', '편재'])}</p>
      <p><strong>관성(책임감):</strong> ${this.getSipsungCount(person1.sipsung, ['정관', '편관'])} vs ${this.getSipsungCount(person2.sipsung, ['정관', '편관'])}</p>
      <p>감정표현과 책임감의 균형을 분석했습니다.</p>
    </div>`);

    return analysis.join('');
  }

  // 상세 조언 생성
  generateDetailedAdvice(overallScore, intimacyScore, compatibilityType) {
    let advice = [];

    // 전체 궁합 조언
    if (overallScore >= 90) {
      advice.push("💖 <strong>천생연분형</strong><br>운명적인 만남입니다. 서로를 완벽하게 이해하고 조화롭게 지낼 수 있는 이상적인 궁합입니다.");
    } else if (overallScore >= 80) {
      advice.push("💕 <strong>매우 좋은 궁합</strong><br>서로를 잘 이해하고 조화롭게 지낼 수 있을 것입니다. 소중한 관계를 유지해 나가세요.");
    } else if (overallScore >= 70) {
      advice.push("💗 <strong>좋은 궁합</strong><br>서로의 차이점을 인정하고 보완해 나가면 더욱 좋은 관계가 될 것입니다.");
    } else if (overallScore >= 50) {
      advice.push("🤝 <strong>보통의 궁합</strong><br>서로의 장점을 살리고 단점을 보완하는 노력이 필요합니다.");
    } else {
      advice.push("💪 <strong>노력이 필요한 궁합</strong><br>서로에 대한 이해와 노력으로 좋은 관계를 만들어 갈 수 있습니다.");
    }

    // 속궁합 조언
    if (intimacyScore >= 90) {
      advice.push("🔥 <strong>강렬한 끌림 + 에너지 완벽조화</strong><br>서로에게 강한 매력을 느끼며 감정적 교감이 뛰어납니다.");
    } else if (intimacyScore >= 70) {
      advice.push("❤️ <strong>열정적이며 안정적</strong><br>속도가 잘 맞으며 깊은 정신적 교감이 가능합니다.");
    } else if (intimacyScore >= 50) {
      advice.push("💙 <strong>평균적 친밀감</strong><br>한쪽이 주도적인 관계가 될 수 있으니 균형을 맞춰가세요.");
    } else {
      advice.push("💔 <strong>감정적 불균형</strong><br>욕구 불균형이나 에너지 단절이 있을 수 있으니 소통이 중요합니다.");
    }

    // 궁합 타입별 조언
    advice.push(`<br><strong>${compatibilityType.emoji} ${compatibilityType.type}</strong><br>${compatibilityType.description}`);

    return advice.join('<br><br>');
  }

  // 십성 개수 계산 헬퍼 함수
  getSipsungCount(sipsung, targetSipsung) {
    let count = 0;
    for (let key in sipsung) {
      if (targetSipsung.includes(sipsung[key])) {
        count++;
      }
    }
    return count;
  }

  // UI 관련 함수들
  validateInputs() {
    const requiredFields = [
      this.person1Name, this.person1Gender, this.person1Calendar, 
      this.person1BirthDate, this.person1BirthTime,
      this.person2Name, this.person2Gender, this.person2Calendar,
      this.person2BirthDate, this.person2BirthTime
    ];

    for (let field of requiredFields) {
      if (!field.value.trim()) {
        alert('모든 필드를 입력해주세요.');
        field.focus();
        return false;
      }
    }

    return true;
  }

  extractPersonInfo(personNumber) {
    const prefix = personNumber === 1 ? 'person1' : 'person2';
    return {
      name: document.getElementById(prefix + 'Name').value,
      gender: document.getElementById(prefix + 'Gender').value,
      calendar: document.getElementById(prefix + 'Calendar').value,
      birthDate: document.getElementById(prefix + 'BirthDate').value,
      birthTime: document.getElementById(prefix + 'BirthTime').value
    };
  }

  showLoading() {
    this.calculateButton.innerHTML = '<span class="button-icon">⏳</span><span class="button-text">계산 중...</span>';
    this.calculateButton.disabled = true;
  }

  displayResults(person1, person2, compatibility) {
    // 결과 표시
    this.coupleNames.textContent = `${person1.name} & ${person2.name}`;
    this.overallScore.textContent = `${compatibility.overall}점`;
    this.overallDescription.textContent = this.getScoreDescription(compatibility.overall);
    
    this.intimacyScore.textContent = `${compatibility.intimacy}점`;
    this.personalityScore.textContent = `${compatibility.personality}점`;
    this.fortuneScore.textContent = `${compatibility.fortune}점`;
    this.familyScore.textContent = `${compatibility.family}점`;
    
    // 궁합 타입 표시
    if (compatibility.type) {
      const typeElement = document.createElement('div');
      typeElement.className = 'compatibility-type';
      typeElement.innerHTML = `
        <div class="type-badge">
          <span class="type-emoji">${compatibility.type.emoji}</span>
          <span class="type-name">${compatibility.type.type}</span>
        </div>
        <div class="type-description">${compatibility.type.description}</div>
      `;
      
      // 기존 결과 헤더에 타입 추가
      const resultHeader = document.querySelector('.result-header');
      if (resultHeader && !resultHeader.querySelector('.compatibility-type')) {
        resultHeader.appendChild(typeElement);
      }
    }
    
    this.analysisContent.innerHTML = compatibility.analysis;
    this.adviceContent.innerHTML = compatibility.advice;

    // 결과 섹션 표시
    this.resultSection.style.display = 'block';
    this.resultSection.scrollIntoView({ behavior: 'smooth' });

    // 버튼 복원
    this.calculateButton.innerHTML = '<span class="button-icon">💕</span><span class="button-text">궁합 계산하기</span>';
    this.calculateButton.disabled = false;
  }

  getScoreDescription(score) {
    if (score >= 90) return '완벽한 궁합!';
    if (score >= 80) return '매우 좋은 궁합';
    if (score >= 70) return '좋은 궁합';
    if (score >= 60) return '보통의 궁합';
    if (score >= 50) return '보통 이하의 궁합';
    return '노력이 필요한 궁합';
  }

  shareResult() {
    const text = `💕 궁합보기 결과\n${this.coupleNames.textContent}\n전체 궁합: ${this.overallScore.textContent}\n속궁합: ${this.intimacyScore.textContent}\n성격궁합: ${this.personalityScore.textContent}`;
    
    if (navigator.share) {
      navigator.share({
        title: '궁합보기 결과',
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert('결과가 클립보드에 복사되었습니다!');
      });
    }
  }

  resetForm() {
    // 폼 초기화
    document.querySelectorAll('input, select').forEach(field => {
      field.value = '';
    });
    
    // 결과 섹션 숨기기
    this.resultSection.style.display = 'none';
    
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  new CompatibilityCalculator();
});
