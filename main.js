// 직장인 놀이터 메인 페이지 JavaScript

// 오늘의 팁 데이터
const dailyTips = [
  "연봉 협상 시에는 연봉뿐만 아니라 복리후생, 근무환경, 성장 가능성도 함께 고려해보세요!",
  "퇴직금은 평균임금의 30일분이므로, 마지막 3개월 평균임금을 미리 계산해보세요.",
  "4대보험료는 매년 상한선이 변경되므로, 정기적으로 확인하는 것이 좋습니다.",
  "연차는 1년에 15일부터 시작하여 2년마다 1일씩 증가합니다. 미리 계획을 세워보세요!",
  "세금 계산 시 기본공제, 추가공제, 표준공제를 모두 고려하면 절세 효과가 큽니다.",
  "급여명세서를 꼼꼼히 확인하여 잘못된 공제나 지급이 없는지 점검해보세요.",
  "직장 내 스트레스 관리가 중요합니다. 적절한 휴식과 취미 활동을 추천합니다.",
  "연봉 인상 요청 시에는 구체적인 성과와 기여도를 정량적으로 제시해보세요.",
  "퇴사 시 미사용 연차는 모두 정산받을 수 있으니, 미리 확인해보세요.",
  "직장 내 네트워킹은 업무 성과만큼 중요합니다. 동료들과의 관계를 소중히 여기세요.",
];

// 랜덤 팁 선택
function getRandomTip() {
  const randomIndex = Math.floor(Math.random() * dailyTips.length);
  return dailyTips[randomIndex];
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", () => {
  // 오늘의 팁 설정
  const tipElement = document.getElementById("dailyTip");
  if (tipElement) {
    tipElement.textContent = getRandomTip();
  }

  // 카드 호버 효과 개선
  const toolCards = document.querySelectorAll(".tool-card");
  toolCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (!card.classList.contains("coming-soon")) {
        card.style.transform = "translateY(-10px) scale(1.02)";
      }
    });

    card.addEventListener("mouseleave", () => {
      if (!card.classList.contains("coming-soon")) {
        card.style.transform = "translateY(0) scale(1)";
      }
    });
  });

  // 준비중인 카드 클릭 방지
  const comingSoonCards = document.querySelectorAll(".coming-soon");
  comingSoonCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      showComingSoonMessage();
    });
  });
});

// 준비중 메시지 표시
function showComingSoonMessage() {
  // 기존 메시지가 있다면 제거
  const existingMessage = document.querySelector(".coming-soon-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // 새 메시지 생성
  const message = document.createElement("div");
  message.className = "coming-soon-message";
  message.innerHTML = `
    <div class="message-content">
      <h3>🚧 준비중입니다!</h3>
      <p>더 나은 서비스를 위해 열심히 개발 중입니다.</p>
      <button onclick="this.parentElement.parentElement.remove()">확인</button>
    </div>
  `;

  // 스타일 추가
  message.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-out;
  `;

  const messageContent = message.querySelector(".message-content");
  messageContent.style.cssText = `
    background: white;
    padding: 30px;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease-out;
  `;

  const button = message.querySelector("button");
  button.style.cssText = `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    margin-top: 15px;
  `;

  // CSS 애니메이션 추가
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { transform: translateY(30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(message);

  // 3초 후 자동 제거
  setTimeout(() => {
    if (message.parentElement) {
      message.remove();
    }
  }, 3000);
}

// 키보드 단축키
document.addEventListener("keydown", (e) => {
  // 숫자 키로 도구 바로가기
  if (e.key >= "1" && e.key <= "6") {
    const toolCards = document.querySelectorAll(".tool-card:not(.coming-soon)");
    const index = parseInt(e.key) - 1;
    if (toolCards[index]) {
      toolCards[index].click();
    }
  }

  // H 키로 홈으로 이동
  if (e.key.toLowerCase() === "h") {
    window.location.href = "main.html";
  }
});

// 페이지 로드 애니메이션
window.addEventListener("load", () => {
  const cards = document.querySelectorAll(".tool-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";

    setTimeout(() => {
      card.style.transition = "all 0.6s ease-out";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
});

// 스크롤 효과
window.addEventListener("scroll", () => {
  const cards = document.querySelectorAll(".tool-card");
  const windowHeight = window.innerHeight;

  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < windowHeight * 0.8) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});

// 로컬 스토리지에 방문 기록 저장
function saveVisitHistory() {
  const visitHistory = JSON.parse(localStorage.getItem("visitHistory") || "[]");
  const today = new Date().toDateString();

  if (!visitHistory.includes(today)) {
    visitHistory.push(today);
    localStorage.setItem("visitHistory", JSON.stringify(visitHistory));
  }
}

// 페이지 방문 시 기록 저장
saveVisitHistory();
