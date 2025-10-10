// 궁합 계산 세부 함수들 (전문 사주학 기반)

class CompatibilityCalculations {
  // 오행 상생/상극 계산 (25%)
  calculateFiveElementCompatibility(person1, person2) {
    const element1 = person1.fiveElements.dayElement;
    const element2 = person2.fiveElements.dayElement;
    
    // 오행 상생 관계
    const sangsaengTable = {
      '목화': 10, '화토': 10, '토금': 10, '금수': 10, '수목': 10,
      '목금': -10, '화수': -10, '토목': -10, '금화': -10, '수토': -10
    };
    
    const key1 = element1 + element2;
    const key2 = element2 + element1;
    
    let score = sangsaengTable[key1] || sangsaengTable[key2] || 0;
    
    // 추가 오행 조화도 계산
    const harmony = this.calculateElementHarmony(person1.fiveElements, person2.fiveElements);
    score += harmony;
    
    return Math.max(0, Math.min(100, 50 + score));
  }

  // 일간(日干) 궁합 계산 (20%)
  calculateIlganCompatibility(person1, person2) {
    const ilgan1 = person1.ilgan;
    const ilgan2 = person2.ilgan;
    
    // 일간 궁합표 (전통 사주학)
    const ilganCompatibility = {
      '갑정': 90, '정갑': 90, '을병': 85, '병을': 85,
      '무기': 80, '기무': 80, '경임': 75, '임경': 75,
      '신계': 70, '계신': 70,
      '갑갑': 60, '을을': 60, '병병': 60, '정정': 60,
      '무무': 60, '기기': 60, '경경': 60, '신신': 60,
      '임임': 60, '계계': 60
    };
    
    const key1 = ilgan1 + ilgan2;
    const key2 = ilgan2 + ilgan1;
    
    let score = ilganCompatibility[key1] || ilganCompatibility[key2] || 50;
    
    // 음양 조화 보너스
    if (person1.ilganYinYang !== person2.ilganYinYang) {
      score += 10;
    }
    
    return Math.max(0, Math.min(100, score));
  }

  // 연지·월지 궁합 계산 (15%)
  calculateYearMonthCompatibility(person1, person2) {
    let score = 50;
    
    // 연지 궁합
    const yearCompatibility = this.calculateJiCompatibility(person1.ganji.yearJi, person2.ganji.yearJi);
    score += yearCompatibility * 0.6;
    
    // 월지 궁합
    const monthCompatibility = this.calculateJiCompatibility(person1.ganji.monthJi, person2.ganji.monthJi);
    score += monthCompatibility * 0.4;
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  // 십성 비교 계산 (15%)
  calculateSipsungCompatibility(person1, person2) {
    let score = 50;
    
    // 재성(애정) 비교
    const jaeScore = this.compareSipsung(person1.sipsung, person2.sipsung, ['정재', '편재']);
    score += jaeScore * 0.3;
    
    // 관성(책임감) 비교
    const gwanScore = this.compareSipsung(person1.sipsung, person2.sipsung, ['정관', '편관']);
    score += gwanScore * 0.3;
    
    // 식상(표현력) 비교
    const sikScore = this.compareSipsung(person1.sipsung, person2.sipsung, ['식신', '상관']);
    score += sikScore * 0.2;
    
    // 인성(이해심) 비교
    const inScore = this.compareSipsung(person1.sipsung, person2.sipsung, ['정인', '편인']);
    score += inScore * 0.2;
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  // 음양 밸런스 계산 (10%)
  calculateYinYangCompatibility(person1, person2) {
    let score = 50;
    
    // 음양 조화도
    const balance1 = person1.yinYang.overallBalance;
    const balance2 = person2.yinYang.overallBalance;
    
    // 음양 균형이 좋을수록 높은 점수
    const balanceDiff = Math.abs(balance1 - balance2);
    if (balanceDiff <= 2) {
      score += 20;
    } else if (balanceDiff <= 4) {
      score += 10;
    } else {
      score -= 10;
    }
    
    // 성별 음양 조화
    if (person1.gender !== person2.gender) {
      score += 15;
    } else {
      score -= 5;
    }
    
    return Math.max(0, Math.min(100, score));
  }

  // 합충형파해 계산 (10%)
  calculateHarmonyCompatibility(person1, person2) {
    let score = 50;
    
    // 합(合) 관계 확인
    const hapScore = this.checkHapRelation(person1.ganji, person2.ganji);
    score += hapScore;
    
    // 충(沖) 관계 확인
    const chungScore = this.checkChungRelation(person1.ganji, person2.ganji);
    score += chungScore;
    
    // 형(刑) 관계 확인
    const hyeongScore = this.checkHyeongRelation(person1.ganji, person2.ganji);
    score += hyeongScore;
    
    return Math.max(0, Math.min(100, score));
  }

  // 귀인성 계산 (5%)
  calculateGuinCompatibility(person1, person2) {
    let score = 50;
    
    // 천을귀인 확인
    const cheoneulScore = this.checkCheoneulGuin(person1.ganji, person2.ganji);
    score += cheoneulScore;
    
    // 홍염귀인 확인
    const hongyeomScore = this.checkHongyeomGuin(person1.ganji, person2.ganji);
    score += hongyeomScore;
    
    return Math.max(0, Math.min(100, score));
  }

  // 속궁합 세부 계산 함수들

  // 음양 에너지 조화 (25%)
  calculateYinYangEnergyCompatibility(person1, person2) {
    let score = 50;
    
    // 일간 음양 조화
    if (person1.ilganYinYang !== person2.ilganYinYang) {
      score += 25;
    } else {
      score -= 10;
    }
    
    // 시간 음양 조화
    if (person1.yinYang.hourYinYang !== person2.yinYang.hourYinYang) {
      score += 15;
    }
    
    // 성별과 일간 음양 조화
    const gender1Yang = person1.gender === 'male';
    const gender2Yang = person2.gender === 'male';
    const ilgan1Yang = person1.ilganYinYang === '양';
    const ilgan2Yang = person2.ilganYinYang === '양';
    
    if ((gender1Yang && !ilgan1Yang) || (!gender1Yang && ilgan1Yang)) {
      score += 10; // 성별과 일간 음양이 반대면 조화
    }
    
    return Math.max(0, Math.min(100, score));
  }

  // 식상·재성·관성 흐름 (25%)
  calculateSipsungFlowCompatibility(person1, person2) {
    let score = 50;
    
    // 재성(애정) 흐름
    const jaeFlow = this.calculateSipsungFlow(person1.sipsung, person2.sipsung, ['정재', '편재']);
    score += jaeFlow * 0.4;
    
    // 관성(책임감) 흐름
    const gwanFlow = this.calculateSipsungFlow(person1.sipsung, person2.sipsung, ['정관', '편관']);
    score += gwanFlow * 0.3;
    
    // 식상(표현력) 흐름
    const sikFlow = this.calculateSipsungFlow(person1.sipsung, person2.sipsung, ['식신', '상관']);
    score += sikFlow * 0.3;
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  // 일지(日支) 궁합 (20%)
  calculateDayJiCompatibility(person1, person2) {
    return this.calculateJiCompatibility(person1.ganji.dayJi, person2.ganji.dayJi);
  }

  // 애정살 계산 (15%)
  calculateLoveStarCompatibility(person1, person2) {
    let score = 50;
    
    // 홍염귀인 확인
    const hongyeom = this.checkHongyeomGuin(person1.ganji, person2.ganji);
    score += hongyeom;
    
    // 천희귀인 확인
    const cheonhui = this.checkCheonhuiGuin(person1.ganji, person2.ganji);
    score += cheonhui;
    
    // 월하노인 확인
    const wolha = this.checkWolhaGuin(person1.ganji, person2.ganji);
    score += wolha;
    
    return Math.max(0, Math.min(100, score));
  }

  // 생기운 순환 (10%)
  calculateEnergyFlowCompatibility(person1, person2) {
    let score = 50;
    
    // 오행 순환 확인
    const elementFlow = this.checkElementFlow(person1.fiveElements, person2.fiveElements);
    score += elementFlow;
    
    // 십성 순환 확인
    const sipsungFlow = this.checkSipsungFlow(person1.sipsung, person2.sipsung);
    score += sipsungFlow;
    
    return Math.max(0, Math.min(100, score));
  }

  // 체질 상성 (5%)
  calculateConstitutionCompatibility(person1, person2) {
    let score = 50;
    
    // 오행 체질 분석
    const constitution1 = this.analyzeConstitution(person1.fiveElements);
    const constitution2 = this.analyzeConstitution(person2.fiveElements);
    
    // 체질 조화도
    const harmony = this.calculateConstitutionHarmony(constitution1, constitution2);
    score += harmony;
    
    return Math.max(0, Math.min(100, score));
  }

  // 헬퍼 함수들

  calculateElementHarmony(fiveElements1, fiveElements2) {
    let harmony = 0;
    
    // 각 오행별 조화도 계산
    const elements1 = [fiveElements1.yearElement, fiveElements1.monthElement, fiveElements1.dayElement, fiveElements1.hourElement];
    const elements2 = [fiveElements2.yearElement, fiveElements2.monthElement, fiveElements2.dayElement, fiveElements2.hourElement];
    
    for (let i = 0; i < elements1.length; i++) {
      const compatibility = this.getElementCompatibility(elements1[i], elements2[i]);
      harmony += compatibility;
    }
    
    return Math.round(harmony / 4);
  }

  getElementCompatibility(element1, element2) {
    const compatibility = {
      '목화': 10, '화토': 10, '토금': 10, '금수': 10, '수목': 10,
      '목금': -10, '화수': -10, '토목': -10, '금화': -10, '수토': -10,
      '목목': 5, '화화': 5, '토토': 5, '금금': 5, '수수': 5
    };
    
    const key1 = element1 + element2;
    const key2 = element2 + element1;
    
    return compatibility[key1] || compatibility[key2] || 0;
  }

  calculateJiCompatibility(ji1, ji2) {
    // 12지지 궁합표
    const jiCompatibility = {
      '자축': 8, '축인': 6, '인묘': 9, '묘진': 7, '진사': 5,
      '사오': 8, '오미': 6, '미신': 7, '신유': 9, '유술': 8,
      '술해': 6, '해자': 7
    };
    
    const key1 = ji1 + ji2;
    const key2 = ji2 + ji1;
    
    return (jiCompatibility[key1] || jiCompatibility[key2] || 5) * 10;
  }

  compareSipsung(sipsung1, sipsung2, targetSipsung) {
    let score = 0;
    
    for (let sipsung of targetSipsung) {
      const count1 = this.countSipsung(sipsung1, sipsung);
      const count2 = this.countSipsung(sipsung2, sipsung);
      
      // 십성 개수가 비슷하면 조화
      const diff = Math.abs(count1 - count2);
      if (diff <= 1) {
        score += 15;
      } else if (diff <= 2) {
        score += 10;
      } else {
        score += 5;
      }
    }
    
    return Math.min(50, score);
  }

  countSipsung(sipsung, target) {
    let count = 0;
    for (let key in sipsung) {
      if (sipsung[key] === target) count++;
    }
    return count;
  }

  checkHapRelation(ganji1, ganji2) {
    // 6합 관계 확인
    const hapTable = {
      '자축': 10, '인해': 10, '묘술': 10, '진유': 10, '사신': 10, '오미': 10
    };
    
    const keys = [
      ganji1.yearJi + ganji2.yearJi,
      ganji1.monthJi + ganji2.monthJi,
      ganji1.dayJi + ganji2.dayJi,
      ganji1.hourJi + ganji2.hourJi
    ];
    
    let score = 0;
    for (let key of keys) {
      const reverseKey = key[1] + key[0];
      if (hapTable[key] || hapTable[reverseKey]) {
        score += 5;
      }
    }
    
    return Math.min(20, score);
  }

  checkChungRelation(ganji1, ganji2) {
    // 6충 관계 확인
    const chungTable = {
      '자오': -10, '축미': -10, '인신': -10, '묘유': -10, '진술': -10, '사해': -10
    };
    
    const keys = [
      ganji1.yearJi + ganji2.yearJi,
      ganji1.monthJi + ganji2.monthJi,
      ganji1.dayJi + ganji2.dayJi,
      ganji1.hourJi + ganji2.hourJi
    ];
    
    let score = 0;
    for (let key of keys) {
      const reverseKey = key[1] + key[0];
      if (chungTable[key] || chungTable[reverseKey]) {
        score -= 5;
      }
    }
    
    return Math.max(-20, score);
  }

  checkHyeongRelation(ganji1, ganji2) {
    // 3형 관계 확인 (간소화)
    const hyeongTable = {
      '자묘': -5, '묘자': -5, '인사신': -5, '사인신': -5, '신사인': -5,
      '진술미': -5, '술진미': -5, '미진술': -5, '오유': -5, '유오': -5
    };
    
    // 간소화된 형 관계 확인
    let score = 0;
    const ji1 = ganji1.dayJi;
    const ji2 = ganji2.dayJi;
    
    if (hyeongTable[ji1 + ji2] || hyeongTable[ji2 + ji1]) {
      score -= 5;
    }
    
    return Math.max(-10, score);
  }

  checkCheoneulGuin(ganji1, ganji2) {
    // 천을귀인 확인 (간소화)
    const cheoneulTable = {
      '갑': '축', '을': '자', '병': '해', '정': '유', '무': '신',
      '기': '미', '경': '오', '신': '사', '임': '묘', '계': '인'
    };
    
    const guin1 = cheoneulTable[ganji1.dayGan];
    const guin2 = cheoneulTable[ganji2.dayGan];
    
    if (ganji2.dayJi === guin1 || ganji1.dayJi === guin2) {
      return 10;
    }
    
    return 0;
  }

  checkHongyeomGuin(ganji1, ganji2) {
    // 홍염귀인 확인 (간소화)
    const hongyeomTable = {
      '갑': '오', '을': '사', '병': '진', '정': '묘', '무': '인',
      '기': '해', '경': '술', '신': '유', '임': '신', '계': '축'
    };
    
    const guin1 = hongyeomTable[ganji1.dayGan];
    const guin2 = hongyeomTable[ganji2.dayGan];
    
    if (ganji2.dayJi === guin1 || ganji1.dayJi === guin2) {
      return 15;
    }
    
    return 0;
  }

  checkCheonhuiGuin(ganji1, ganji2) {
    // 천희귀인 확인 (간소화)
    const cheonhuiTable = {
      '갑': '해', '을': '자', '병': '축', '정': '인', '무': '묘',
      '기': '진', '경': '사', '신': '오', '임': '미', '계': '신'
    };
    
    const guin1 = cheonhuiTable[ganji1.dayGan];
    const guin2 = cheonhuiTable[ganji2.dayGan];
    
    if (ganji2.dayJi === guin1 || ganji1.dayJi === guin2) {
      return 10;
    }
    
    return 0;
  }

  checkWolhaGuin(ganji1, ganji2) {
    // 월하노인 확인 (간소화)
    const wolhaTable = {
      '갑': '유', '을': '신', '병': '오', '정': '사', '무': '진',
      '기': '묘', '경': '인', '신': '해', '임': '자', '계': '축'
    };
    
    const guin1 = wolhaTable[ganji1.dayGan];
    const guin2 = wolhaTable[ganji2.dayGan];
    
    if (ganji2.dayJi === guin1 || ganji1.dayJi === guin2) {
      return 8;
    }
    
    return 0;
  }

  calculateSipsungFlow(sipsung1, sipsung2, targetSipsung) {
    let score = 0;
    
    for (let sipsung of targetSipsung) {
      const count1 = this.countSipsung(sipsung1, sipsung);
      const count2 = this.countSipsung(sipsung2, sipsung);
      
      // 십성 흐름이 원활하면 높은 점수
      if (count1 > 0 && count2 > 0) {
        score += 20;
      } else if (count1 > 0 || count2 > 0) {
        score += 10;
      }
    }
    
    return Math.min(50, score);
  }

  checkElementFlow(fiveElements1, fiveElements2) {
    // 오행 순환 확인
    const elements1 = [fiveElements1.yearElement, fiveElements1.monthElement, fiveElements1.dayElement, fiveElements1.hourElement];
    const elements2 = [fiveElements2.yearElement, fiveElements2.monthElement, fiveElements2.dayElement, fiveElements2.hourElement];
    
    let flow = 0;
    for (let i = 0; i < elements1.length; i++) {
      const compatibility = this.getElementCompatibility(elements1[i], elements2[i]);
      if (compatibility > 0) {
        flow += 5;
      }
    }
    
    return Math.min(20, flow);
  }

  checkSipsungFlow(sipsung1, sipsung2) {
    // 십성 순환 확인
    let flow = 0;
    
    const sipsungTypes = ['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'];
    
    for (let type of sipsungTypes) {
      const count1 = this.countSipsung(sipsung1, type);
      const count2 = this.countSipsung(sipsung2, type);
      
      if (count1 > 0 && count2 > 0) {
        flow += 2;
      }
    }
    
    return Math.min(15, flow);
  }

  analyzeConstitution(fiveElements) {
    // 체질 분석 (간소화)
    const elements = [fiveElements.yearElement, fiveElements.monthElement, fiveElements.dayElement, fiveElements.hourElement];
    
    const elementCount = {};
    for (let element of elements) {
      elementCount[element] = (elementCount[element] || 0) + 1;
    }
    
    // 가장 많은 오행이 체질
    let maxCount = 0;
    let constitution = '토';
    
    for (let element in elementCount) {
      if (elementCount[element] > maxCount) {
        maxCount = elementCount[element];
        constitution = element;
      }
    }
    
    return {
      type: constitution,
      balance: this.calculateElementBalance(elementCount)
    };
  }

  calculateElementBalance(elementCount) {
    const total = Object.values(elementCount).reduce((sum, count) => sum + count, 0);
    const max = Math.max(...Object.values(elementCount));
    return max / total;
  }

  calculateConstitutionHarmony(constitution1, constitution2) {
    const compatibility = {
      '목화': 15, '화토': 15, '토금': 15, '금수': 15, '수목': 15,
      '목금': -10, '화수': -10, '토목': -10, '금화': -10, '수토': -10,
      '목목': 5, '화화': 5, '토토': 5, '금금': 5, '수수': 5
    };
    
    const key1 = constitution1.type + constitution2.type;
    const key2 = constitution2.type + constitution1.type;
    
    let score = compatibility[key1] || compatibility[key2] || 0;
    
    // 밸런스 조화도
    const balanceDiff = Math.abs(constitution1.balance - constitution2.balance);
    if (balanceDiff <= 0.2) {
      score += 10;
    } else if (balanceDiff <= 0.4) {
      score += 5;
    }
    
    return Math.min(30, score);
  }
}

// 전역에서 사용할 수 있도록 내보내기
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CompatibilityCalculations;
} else {
  window.CompatibilityCalculations = CompatibilityCalculations;
}
