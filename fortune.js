// 운세 페이지 JavaScript

// 전역 변수
let selectedCalendarType = "solar";
let selectedGender = null;
let userBirthDate = null;
let userBirthTime = null;

// 운세 데이터
const fortuneData = {
  overall: [
    "오늘은 전반적으로 좋은 하루가 될 것 같습니다.",
    "새로운 기회가 찾아올 수 있는 날입니다.",
    "조심스럽게 행동하되 긍정적인 마음가짐을 유지하세요.",
    "오늘은 휴식을 취하며 내일을 준비하는 것이 좋겠습니다.",
    "예상치 못한 좋은 소식이 있을 수 있습니다.",
  ],
  work: [
    "업무에서 좋은 결과를 얻을 수 있습니다.",
    "동료들과의 협력이 중요한 하루입니다.",
    "새로운 프로젝트에 도전해보세요.",
    "기존 업무를 정리하고 정리하는 것이 좋겠습니다.",
    "상사와의 대화에서 좋은 결과를 얻을 수 있습니다.",
  ],
  money: [
    "재정 관리에 신경 쓰세요.",
    "예상치 못한 수입이 있을 수 있습니다.",
    "투자보다는 저축에 집중하세요.",
    "소비를 줄이고 절약하는 것이 좋겠습니다.",
    "재정 계획을 세우는 좋은 날입니다.",
  ],
  love: [
    "새로운 만남의 기회가 있을 수 있습니다.",
    "기존 관계에서 발전이 있을 수 있습니다.",
    "솔직한 대화가 필요한 시기입니다.",
    "혼자만의 시간을 갖는 것이 좋겠습니다.",
    "사랑하는 사람과의 시간을 소중히 여기세요.",
  ],
  health: [
    "충분한 휴식을 취하세요.",
    "규칙적인 운동이 도움이 될 것입니다.",
    "스트레스 관리에 신경 쓰세요.",
    "건강한 식단을 유지하세요.",
    "몸의 신호에 귀 기울이세요.",
  ],
  advice: [
    "긍정적인 마음가짐으로 하루를 시작하세요.",
    "작은 것부터 차근차근 해나가세요.",
    "주변 사람들과의 관계를 소중히 여기세요.",
    "새로운 도전을 두려워하지 마세요.",
    "현재에 집중하며 미래를 준비하세요.",
  ],
  lucky: {
    colors: [
      "파란색",
      "빨간색",
      "노란색",
      "초록색",
      "보라색",
      "주황색",
      "분홍색",
      "하늘색",
    ],
    numbers: [1, 3, 7, 9, 11, 13, 17, 21, 23, 27],
    directions: [
      "동쪽",
      "서쪽",
      "남쪽",
      "북쪽",
      "동남쪽",
      "서남쪽",
      "동북쪽",
      "서북쪽",
    ],
  },
};

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", function () {
  initializeEventListeners();
  setDefaultValues();
  checkGPTStatus();
});

// 이벤트 리스너 초기화
function initializeEventListeners() {
  // 달력 구분 버튼
  const calendarButtons = document.querySelectorAll(".calendar-button");
  calendarButtons.forEach((button) => {
    button.addEventListener("click", function () {
      selectCalendarType(this);
    });
  });

  // 성별 버튼
  const genderButtons = document.querySelectorAll(".gender-button");
  genderButtons.forEach((button) => {
    button.addEventListener("click", function () {
      selectGender(this);
    });
  });

  // 운세 보기 버튼
  const fortuneButton = document.getElementById("calculateFortune");
  fortuneButton.addEventListener("click", function () {
    calculateFortune();
  });

  // 출생일 입력
  const birthDateInput = document.getElementById("birthDate");
  birthDateInput.addEventListener("change", function () {
    userBirthDate = this.value;
  });

  // 출생시간 선택
  const birthTimeSelect = document.getElementById("birthTime");
  birthTimeSelect.addEventListener("change", function () {
    userBirthTime = this.value;
  });
}

// 기본값 설정
function setDefaultValues() {
  // 오늘 날짜를 기본값으로 설정
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayString = `${year}-${month}-${day}`;

  document.getElementById("birthDate").value = todayString;
  userBirthDate = todayString;
}

// GPT 연동 상태 확인
async function checkGPTStatus() {
  try {
    const response = await fetch("/api/status");
    const data = await response.json();
    
    // GPT 상태 표시
    const statusElement = document.getElementById("gptStatus");
    if (statusElement) {
      statusElement.textContent = data.message;
      statusElement.className = data.gptEnabled ? "gpt-enabled" : "gpt-disabled";
    }
    
    // 운세 버튼에 GPT 상태 표시
    const fortuneButton = document.getElementById("calculateFortune");
    if (fortuneButton && data.gptEnabled) {
      const buttonText = fortuneButton.querySelector(".button-subtitle");
      if (buttonText) {
        buttonText.textContent = "AI Powered Fortune";
      }
    }
  } catch (error) {
    console.log("GPT 상태 확인 실패:", error);
  }
}

// 달력 구분 선택
function selectCalendarType(button) {
  // 모든 달력 버튼에서 active 클래스 제거
  document.querySelectorAll(".calendar-button").forEach((btn) => {
    btn.classList.remove("active");
  });

  // 선택된 버튼에 active 클래스 추가
  button.classList.add("active");
  selectedCalendarType = button.dataset.value;
}

// 성별 선택
function selectGender(button) {
  // 모든 성별 버튼에서 active 클래스 제거
  document.querySelectorAll(".gender-button").forEach((btn) => {
    btn.classList.remove("active");
  });

  // 선택된 버튼에 active 클래스 추가
  button.classList.add("active");
  selectedGender = button.dataset.value;
}

// 운세 계산
async function calculateFortune() {
  // 입력 검증
  if (!validateInputs()) {
    return;
  }

  // 로딩 상태 표시
  showLoadingState();

  try {
    // 서버 API 호출
    const response = await fetch("/api/fortune", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        birthDate: userBirthDate,
        birthTime: userBirthTime,
        gender: selectedGender,
        calendarType: selectedCalendarType,
        useGPT: true, // GPT 사용 여부 (서버에서 GPT API 키가 설정되어 있으면 사용)
      }),
    });

    if (!response.ok) {
      throw new Error("서버 오류가 발생했습니다.");
    }

    const data = await response.json();

    if (data.success) {
      displayFortune(data.fortune);
      saveFortuneResult(data.fortune);
    } else {
      throw new Error(data.error || "운세 계산에 실패했습니다.");
    }
  } catch (error) {
    console.error("운세 계산 오류:", error);

    // 오류 발생 시 기본 운세 생성
    const fortune = generateFortune();
    displayFortune(fortune);
    saveFortuneResult(fortune);

    showAlert("서버 연결에 실패했습니다. 기본 운세를 표시합니다.");
  } finally {
    hideLoadingState();
  }
}

// 입력 검증
function validateInputs() {
  const birthDate = document.getElementById("birthDate").value;
  const birthTime = document.getElementById("birthTime").value;

  if (!birthDate) {
    showAlert("출생일을 선택해주세요.");
    return false;
  }

  if (!birthTime) {
    showAlert("출생시간을 선택해주세요.");
    return false;
  }

  if (!selectedGender) {
    showAlert("성별을 선택해주세요.");
    return false;
  }

  return true;
}

// 알림 표시
function showAlert(message) {
  // 기존 알림이 있다면 제거
  const existingAlert = document.querySelector(".alert-message");
  if (existingAlert) {
    existingAlert.remove();
  }

  // 새 알림 생성
  const alert = document.createElement("div");
  alert.className = "alert-message";
  alert.innerHTML = `
    <div class="alert-content">
      <div class="alert-icon">⚠️</div>
      <div class="alert-text">${message}</div>
      <button class="alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;

  // 스타일 적용
  alert.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    animation: slideInRight 0.3s ease-out;
  `;

  const alertContent = alert.querySelector(".alert-content");
  alertContent.style.cssText = `
    background: #ff6b6b;
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
    min-width: 300px;
  `;

  const alertClose = alert.querySelector(".alert-close");
  alertClose.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    margin-left: auto;
  `;

  // CSS 애니메이션 추가
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(alert);

  // 3초 후 자동 제거
  setTimeout(() => {
    if (alert.parentElement) {
      alert.remove();
    }
  }, 3000);
}

// 로딩 상태 표시
function showLoadingState() {
  const fortuneButton = document.getElementById("calculateFortune");
  const buttonContent = fortuneButton.querySelector(".button-content");

  fortuneButton.classList.add("loading");
  buttonContent.innerHTML = `
    <div class="button-icon">⏳</div>
    <div class="button-text">
      <span class="button-title">운세 계산 중...</span>
      <span class="button-subtitle">잠시만 기다려주세요</span>
    </div>
    <div class="loading-spinner"></div>
  `;
}

// 로딩 상태 숨기기
function hideLoadingState() {
  const fortuneButton = document.getElementById("calculateFortune");
  const buttonContent = fortuneButton.querySelector(".button-content");

  fortuneButton.classList.remove("loading");
  buttonContent.innerHTML = `
    <div class="button-icon">🔮</div>
    <div class="button-text">
      <span class="button-title">운세 보기</span>
      <span class="button-subtitle">Get Your Fortune</span>
    </div>
    <div class="button-arrow">→</div>
  `;
}

// 운세 생성
function generateFortune() {
  const random = Math.random();

  return {
    overall: {
      score: Math.floor(random * 3) + 3, // 3-5점
      text: fortuneData.overall[
        Math.floor(random * fortuneData.overall.length)
      ],
    },
    work: {
      score: Math.floor(random * 3) + 3,
      text: fortuneData.work[Math.floor(random * fortuneData.work.length)],
    },
    money: {
      score: Math.floor(random * 3) + 3,
      text: fortuneData.money[Math.floor(random * fortuneData.money.length)],
    },
    love: {
      score: Math.floor(random * 3) + 3,
      text: fortuneData.love[Math.floor(random * fortuneData.love.length)],
    },
    health: {
      score: Math.floor(random * 3) + 3,
      text: fortuneData.health[Math.floor(random * fortuneData.health.length)],
    },
    advice: fortuneData.advice[Math.floor(random * fortuneData.advice.length)],
    lucky: {
      color:
        fortuneData.lucky.colors[
          Math.floor(random * fortuneData.lucky.colors.length)
        ],
      number:
        fortuneData.lucky.numbers[
          Math.floor(random * fortuneData.lucky.numbers.length)
        ],
      direction:
        fortuneData.lucky.directions[
          Math.floor(random * fortuneData.lucky.directions.length)
        ],
    },
  };
}

// 운세 표시
function displayFortune(fortune) {
  // 플레이스홀더 숨기기
  const placeholder = document.getElementById("fortunePlaceholder");
  placeholder.style.display = "none";

  // 결과 섹션 표시
  const resultSection = document.getElementById("fortuneResult");
  resultSection.style.display = "block";

  // 점수 표시 함수
  function displayScore(score) {
    return "★".repeat(score) + "☆".repeat(5 - score);
  }

  // 운세 결과 업데이트
  document.getElementById("overallScore").textContent = displayScore(
    fortune.overall.score
  );
  document.getElementById("overallFortune").textContent = fortune.overall.text;

  document.getElementById("workScore").textContent = displayScore(
    fortune.work.score
  );
  document.getElementById("workFortune").textContent = fortune.work.text;

  document.getElementById("moneyScore").textContent = displayScore(
    fortune.money.score
  );
  document.getElementById("moneyFortune").textContent = fortune.money.text;

  document.getElementById("loveScore").textContent = displayScore(
    fortune.love.score
  );
  document.getElementById("loveFortune").textContent = fortune.love.text;

  document.getElementById("healthScore").textContent = displayScore(
    fortune.health.score
  );
  document.getElementById("healthFortune").textContent = fortune.health.text;

  document.getElementById("dailyAdvice").textContent = fortune.advice;

  document.getElementById("luckyColor").textContent = fortune.lucky.color;
  document.getElementById("luckyNumber").textContent = fortune.lucky.number;
  document.getElementById("luckyDirection").textContent =
    fortune.lucky.direction;

  // 애니메이션 효과
  animateFortuneResult();
}

// 운세 결과 애니메이션
function animateFortuneResult() {
  const fortuneCards = document.querySelectorAll(".fortune-card");

  fortuneCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {
      card.style.transition = "all 0.6s ease-out";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// GPT API 연동을 위한 함수 (향후 구현)
async function getGPTFortune(birthDate, birthTime, gender, calendarType) {
  // TODO: GPT API 연동 구현
  // 현재는 기본 운세 데이터를 반환
  return generateFortune();
}

// 운세 결과 저장 (로컬 스토리지)
function saveFortuneResult(fortune) {
  const fortuneHistory = JSON.parse(
    localStorage.getItem("fortuneHistory") || "[]"
  );
  const today = new Date().toDateString();

  const newFortune = {
    date: today,
    birthDate: userBirthDate,
    birthTime: userBirthTime,
    gender: selectedGender,
    calendarType: selectedCalendarType,
    fortune: fortune,
  };

  fortuneHistory.unshift(newFortune);

  // 최대 30개까지만 저장
  if (fortuneHistory.length > 30) {
    fortuneHistory.splice(30);
  }

  localStorage.setItem("fortuneHistory", JSON.stringify(fortuneHistory));
}

// 키보드 단축키
document.addEventListener("keydown", function (e) {
  // Enter 키로 운세 계산
  if (e.key === "Enter") {
    calculateFortune();
  }

  // Escape 키로 결과 숨기기
  if (e.key === "Escape") {
    const resultSection = document.getElementById("fortuneResult");
    const placeholder = document.getElementById("fortunePlaceholder");

    if (resultSection.style.display !== "none") {
      resultSection.style.display = "none";
      placeholder.style.display = "block";
    }
  }
});

// 페이지 로드 애니메이션
window.addEventListener("load", function () {
  const inputGroups = document.querySelectorAll(".input-group");

  inputGroups.forEach((group, index) => {
    group.style.opacity = "0";
    group.style.transform = "translateY(20px)";

    setTimeout(() => {
      group.style.transition = "all 0.6s ease-out";
      group.style.opacity = "1";
      group.style.transform = "translateY(0)";
    }, index * 100);
  });
});
