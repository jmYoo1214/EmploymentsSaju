// 궁합보기 JavaScript
// Private 알고리즘으로 궁합 점수 계산

class CompatibilityCalculator {
  constructor() {
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

  // Private 궁합 점수 계산 알고리즘
  calculateCompatibilityScores(person1, person2) {
    // 사주 요소 추출
    const person1Elements = this.extractSajuElements(person1);
    const person2Elements = this.extractSajuElements(person2);

    // 각 영역별 점수 계산
    const intimacyScore = this.calculateIntimacyScore(person1Elements, person2Elements);
    const personalityScore = this.calculatePersonalityScore(person1Elements, person2Elements);
    const fortuneScore = this.calculateFortuneScore(person1Elements, person2Elements);
    const familyScore = this.calculateFamilyScore(person1Elements, person2Elements);

    // 전체 궁합 점수 계산 (가중평균)
    const overallScore = Math.round(
      (intimacyScore * 0.4) + 
      (personalityScore * 0.3) + 
      (fortuneScore * 0.2) + 
      (familyScore * 0.1)
    );

    return {
      overall: overallScore,
      intimacy: intimacyScore,
      personality: personalityScore,
      fortune: fortuneScore,
      family: familyScore,
      analysis: this.generateAnalysis(person1Elements, person2Elements),
      advice: this.generateAdvice(overallScore, intimacyScore, personalityScore)
    };
  }

  // Private 사주 요소 추출
  extractSajuElements(person) {
    const birthDate = new Date(person.birthDate);
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    const hour = parseInt(person.birthTime);

    // 간지 계산 (간단화된 버전)
    const ganji = this.calculateGanji(year, month, day, hour);
    
    return {
      year: ganji.year,
      month: ganji.month,
      day: ganji.day,
      hour: ganji.hour,
      gender: person.gender,
      calendar: person.calendar,
      age: new Date().getFullYear() - year
    };
  }

  // Private 간지 계산
  calculateGanji(year, month, day, hour) {
    // 간지 배열
    const gan = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
    const ji = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

    // 간지 계산 (간단화된 알고리즘)
    const yearGan = gan[year % 10];
    const yearJi = ji[year % 12];
    const monthGan = gan[(month + 2) % 10];
    const monthJi = ji[(month + 2) % 12];
    const dayGan = gan[(day + 1) % 10];
    const dayJi = ji[(day + 1) % 12];
    const hourGan = gan[(hour + 1) % 10];
    const hourJi = ji[hour % 12];

    return {
      year: yearGan + yearJi,
      month: monthGan + monthJi,
      day: dayGan + dayJi,
      hour: hourGan + hourJi
    };
  }

  // Private 속궁합 점수 계산
  calculateIntimacyScore(person1, person2) {
    let score = 50; // 기본 점수

    // 일지 궁합 (가장 중요)
    const dayCompatibility = this.getDayCompatibility(person1.day, person2.day);
    score += dayCompatibility * 30;

    // 시지 궁합
    const hourCompatibility = this.getHourCompatibility(person1.hour, person2.hour);
    score += hourCompatibility * 20;

    // 성별 조합 보너스
    if (person1.gender !== person2.gender) {
      score += 10;
    }

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

  // 분석 및 조언 생성
  generateAnalysis(person1, person2) {
    const analysis = [];
    
    analysis.push(`<div class="analysis-item">
      <h4>📅 사주 정보</h4>
      <p><strong>첫 번째 사람:</strong> ${person1.year}년 ${person1.month}월 ${person1.day}일 ${person1.hour}시</p>
      <p><strong>두 번째 사람:</strong> ${person2.year}년 ${person2.month}월 ${person2.day}일 ${person2.hour}시</p>
    </div>`);

    analysis.push(`<div class="analysis-item">
      <h4>🔍 궁합 분석</h4>
      <p>두 분의 사주를 종합적으로 분석한 결과, 다양한 측면에서의 궁합을 확인할 수 있습니다.</p>
    </div>`);

    return analysis.join('');
  }

  generateAdvice(overallScore, intimacyScore, personalityScore) {
    let advice = [];

    if (overallScore >= 80) {
      advice.push("💖 매우 좋은 궁합입니다! 서로를 잘 이해하고 조화롭게 지낼 수 있을 것입니다.");
    } else if (overallScore >= 70) {
      advice.push("💕 좋은 궁합입니다. 서로의 차이점을 인정하고 보완해 나가면 더욱 좋은 관계가 될 것입니다.");
    } else if (overallScore >= 60) {
      advice.push("🤝 보통의 궁합입니다. 서로의 장점을 살리고 단점을 보완하는 노력이 필요합니다.");
    } else {
      advice.push("💪 궁합이 다소 어려울 수 있지만, 서로에 대한 이해와 노력으로 좋은 관계를 만들어 갈 수 있습니다.");
    }

    if (intimacyScore >= 80) {
      advice.push("❤️ 속궁합이 매우 좋습니다. 깊은 정신적 교감이 가능할 것입니다.");
    }

    if (personalityScore >= 80) {
      advice.push("🤝 성격궁합이 좋습니다. 서로의 성격이 잘 맞을 것입니다.");
    }

    return advice.join('<br><br>');
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
