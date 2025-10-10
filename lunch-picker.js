// 점심 뽑기 JavaScript

// 메뉴 데이터베이스 (칼로리 계산기와 동일)
const menuDatabase = {
  korean: [
    {
      name: "김치찌개",
      calories: { small: 250, medium: 350, large: 450 },
      category: "찌개",
      emoji: "🥘",
    },
    {
      name: "된장찌개",
      calories: { small: 200, medium: 280, large: 360 },
      category: "찌개",
      emoji: "🍲",
    },
    {
      name: "비빔밥",
      calories: { small: 400, medium: 550, large: 700 },
      category: "밥류",
      emoji: "🍚",
    },
    {
      name: "불고기",
      calories: { small: 300, medium: 450, large: 600 },
      category: "고기류",
      emoji: "🥩",
    },
    {
      name: "갈비탕",
      calories: { small: 350, medium: 500, large: 650 },
      category: "국물류",
      emoji: "🍖",
    },
    {
      name: "냉면",
      calories: { small: 300, medium: 400, large: 500 },
      category: "면류",
      emoji: "🍜",
    },
    {
      name: "김치전",
      calories: { small: 150, medium: 200, large: 250 },
      category: "전류",
      emoji: "🥞",
    },
    {
      name: "제육볶음",
      calories: { small: 400, medium: 550, large: 700 },
      category: "볶음류",
      emoji: "🍳",
    },
  ],
  chinese: [
    {
      name: "짜장면",
      calories: { small: 500, medium: 650, large: 800 },
      category: "면류",
      emoji: "🍜",
    },
    {
      name: "짬뽕",
      calories: { small: 450, medium: 600, large: 750 },
      category: "면류",
      emoji: "🍲",
    },
    {
      name: "탕수육",
      calories: { small: 400, medium: 550, large: 700 },
      category: "고기류",
      emoji: "🥩",
    },
    {
      name: "볶음밥",
      calories: { small: 350, medium: 500, large: 650 },
      category: "밥류",
      emoji: "🍚",
    },
    {
      name: "짬뽕밥",
      calories: { small: 400, medium: 550, large: 700 },
      category: "밥류",
      emoji: "🍚",
    },
    {
      name: "군만두",
      calories: { small: 200, medium: 300, large: 400 },
      category: "만두류",
      emoji: "🥟",
    },
    {
      name: "깐풍기",
      calories: { small: 350, medium: 500, large: 650 },
      category: "고기류",
      emoji: "🍗",
    },
    {
      name: "마파두부",
      calories: { small: 250, medium: 350, large: 450 },
      category: "두부류",
      emoji: "🧈",
    },
  ],
  japanese: [
    {
      name: "초밥",
      calories: { small: 300, medium: 450, large: 600 },
      category: "초밥",
      emoji: "🍣",
    },
    {
      name: "라멘",
      calories: { small: 400, medium: 550, large: 700 },
      category: "면류",
      emoji: "🍜",
    },
    {
      name: "우동",
      calories: { small: 350, medium: 500, large: 650 },
      category: "면류",
      emoji: "🍜",
    },
    {
      name: "돈카츠",
      calories: { small: 500, medium: 700, large: 900 },
      category: "튀김류",
      emoji: "🍖",
    },
    {
      name: "텐동",
      calories: { small: 450, medium: 600, large: 750 },
      category: "튀김류",
      emoji: "🍤",
    },
    {
      name: "규동",
      calories: { small: 400, medium: 550, large: 700 },
      category: "고기류",
      emoji: "🍱",
    },
    {
      name: "오니기리",
      calories: { small: 200, medium: 300, large: 400 },
      category: "밥류",
      emoji: "🍙",
    },
    {
      name: "사시미",
      calories: { small: 150, medium: 250, large: 350 },
      category: "생선류",
      emoji: "🐟",
    },
  ],
  western: [
    {
      name: "스테이크",
      calories: { small: 400, medium: 600, large: 800 },
      category: "고기류",
      emoji: "🥩",
    },
    {
      name: "파스타",
      calories: { small: 350, medium: 500, large: 650 },
      category: "면류",
      emoji: "🍝",
    },
    {
      name: "피자",
      calories: { small: 300, medium: 450, large: 600 },
      category: "피자",
      emoji: "🍕",
    },
    {
      name: "샐러드",
      calories: { small: 150, medium: 250, large: 350 },
      category: "샐러드",
      emoji: "🥗",
    },
    {
      name: "햄버거",
      calories: { small: 400, medium: 600, large: 800 },
      category: "햄버거",
      emoji: "🍔",
    },
    {
      name: "샌드위치",
      calories: { small: 300, medium: 450, large: 600 },
      category: "샌드위치",
      emoji: "🥪",
    },
    {
      name: "리조또",
      calories: { small: 400, medium: 550, large: 700 },
      category: "밥류",
      emoji: "🍚",
    },
    {
      name: "그라탕",
      calories: { small: 350, medium: 500, large: 650 },
      category: "그라탕",
      emoji: "🧀",
    },
  ],
  fastfood: [
    {
      name: "치킨",
      calories: { small: 400, medium: 600, large: 800 },
      category: "튀김류",
      emoji: "🍗",
    },
    {
      name: "피자",
      calories: { small: 300, medium: 450, large: 600 },
      category: "피자",
      emoji: "🍕",
    },
    {
      name: "햄버거",
      calories: { small: 400, medium: 600, large: 800 },
      category: "햄버거",
      emoji: "🍔",
    },
    {
      name: "타코",
      calories: { small: 200, medium: 300, large: 400 },
      category: "타코",
      emoji: "🌮",
    },
    {
      name: "샐러드",
      calories: { small: 150, medium: 250, large: 350 },
      category: "샐러드",
      emoji: "🥗",
    },
    {
      name: "프라이",
      calories: { small: 200, medium: 300, large: 400 },
      category: "튀김류",
      emoji: "🍟",
    },
    {
      name: "나쵸",
      calories: { small: 150, medium: 250, large: 350 },
      category: "스낵",
      emoji: "🌽",
    },
    {
      name: "핫도그",
      calories: { small: 250, medium: 350, large: 450 },
      category: "핫도그",
      emoji: "🌭",
    },
  ],
  beverage: [
    {
      name: "콜라",
      calories: { small: 100, medium: 150, large: 200 },
      category: "탄산음료",
      emoji: "🥤",
    },
    {
      name: "사이다",
      calories: { small: 100, medium: 150, large: 200 },
      category: "탄산음료",
      emoji: "🥤",
    },
    {
      name: "오렌지주스",
      calories: { small: 120, medium: 180, large: 240 },
      category: "주스",
      emoji: "🍊",
    },
    {
      name: "사과주스",
      calories: { small: 120, medium: 180, large: 240 },
      category: "주스",
      emoji: "🍎",
    },
    {
      name: "커피",
      calories: { small: 50, medium: 100, large: 150 },
      category: "커피",
      emoji: "☕",
    },
    {
      name: "라떼",
      calories: { small: 150, medium: 250, large: 350 },
      category: "커피",
      emoji: "☕",
    },
    {
      name: "아이스티",
      calories: { small: 80, medium: 120, large: 160 },
      category: "차류",
      emoji: "🧊",
    },
    {
      name: "물",
      calories: { small: 0, medium: 0, large: 0 },
      category: "물",
      emoji: "💧",
    },
  ],
};

// DOM 요소들
const pickButton = document.getElementById("pickButton");
const resultSection = document.getElementById("resultSection");
const resultCard = document.getElementById("resultCard");
const pickAgainButton = document.getElementById("pickAgainButton");
const addToCalculatorButton = document.getElementById("addToCalculatorButton");
const historySection = document.getElementById("historySection");
const historyList = document.getElementById("historyList");
const clearHistoryButton = document.getElementById("clearHistoryButton");

// 새로운 UI 요소들 (DOM 로드 후에 초기화)
let portionSlider, portionIcon, portionText, totalMenus, selectedCategories, spinningDice;

// 뽑기 기록 저장
let pickHistory = JSON.parse(localStorage.getItem("lunchPickHistory") || "[]");

// 점심 뽑기 클래스
class LunchPicker {
  constructor() {
    this.initializeElements();
    this.initializeEventListeners();
    this.loadHistory();
  }

  initializeElements() {
    // DOM 요소들 초기화
    portionSlider = document.getElementById("portionSlider");
    portionIcon = document.getElementById("portionIcon");
    portionText = document.getElementById("portionText");
    totalMenus = document.getElementById("totalMenus");
    selectedCategories = document.getElementById("selectedCategories");
    spinningDice = document.querySelector(".spinning-dice");
  }

  initializeEventListeners() {
    // 뽑기 버튼
    pickButton.addEventListener("click", () => this.pickLunch());

    // 다시 뽑기 버튼
    pickAgainButton.addEventListener("click", () => this.pickLunch());

    // 칼로리 계산기로 이동 버튼
    addToCalculatorButton.addEventListener("click", () => {
      const selectedMenu = this.getCurrentResult();
      if (selectedMenu) {
        // 선택된 메뉴 정보를 URL 파라미터로 전달
        const params = new URLSearchParams({
          menu: selectedMenu.name,
          category: selectedMenu.category,
          portion: this.getSelectedPortion(),
        });
        window.location.href = `calorie-calculator.html?${params.toString()}`;
      }
    });

    // 기록 지우기 버튼
    clearHistoryButton.addEventListener("click", () => this.clearHistory());

    // 카테고리 체크박스 변경 시
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        this.updatePickButton();
        this.updateCategoryCounts();
        this.updateStats();
      });
    });

    // 포션 슬라이더 변경 시
    if (portionSlider) {
      portionSlider.addEventListener("input", () =>
        this.updatePortionDisplay()
      );
    }

    // 카테고리 카드 클릭 시
    document.querySelectorAll(".category-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.type !== "checkbox") {
          const checkbox = card.querySelector('input[type="checkbox"]');
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event("change"));
        }
      });
    });
  }

  getSelectedCategories() {
    const categories = [];
    document
      .querySelectorAll('input[type="checkbox"]:checked')
      .forEach((checkbox) => {
        categories.push(checkbox.id);
      });
    return categories;
  }

  getSelectedPortion() {
    if (portionSlider) {
      const value = parseInt(portionSlider.value);
      const portions = ["small", "medium", "large"];
      return portions[value] || "medium";
    }
    const selectedPortion = document.querySelector(
      'input[name="portion"]:checked'
    );
    return selectedPortion ? selectedPortion.value : "medium";
  }

  updatePortionDisplay() {
    if (!portionSlider || !portionIcon || !portionText) return;

    const value = parseInt(portionSlider.value);
    const portions = [
      { size: "소", desc: "가벼운 식사", icon: "🥗" },
      { size: "중", desc: "보통 식사", icon: "🍽️" },
      { size: "대", desc: "든든한 식사", icon: "🍖" },
    ];

    const portion = portions[value];
    portionIcon.textContent = portion.icon;
    portionText.textContent = `${portion.size} (${portion.desc})`;

    // 슬라이더 라벨 업데이트
    document.querySelectorAll(".slider-label").forEach((label, index) => {
      label.classList.toggle("active", index === value);
    });
  }

  updateCategoryCounts() {
    Object.keys(menuDatabase).forEach((category) => {
      const countElement = document.getElementById(`${category}-count`);
      if (countElement) {
        const count = menuDatabase[category].length;
        countElement.textContent = `${count}개`;
      }
    });
  }

  updateStats() {
    const selectedCategoriesList = this.getSelectedCategories();
    const totalMenuCount = selectedCategoriesList.reduce((total, category) => {
      return (
        total + (menuDatabase[category] ? menuDatabase[category].length : 0)
      );
    }, 0);

    if (totalMenus) {
      totalMenus.textContent = `${totalMenuCount}개`;
    }

    if (selectedCategories) {
      selectedCategories.textContent = `${selectedCategoriesList.length}개`;
    }
  }

  updatePickButton() {
    const selectedCategories = this.getSelectedCategories();
    if (selectedCategories.length === 0) {
      pickButton.disabled = true;
      pickButton.querySelector(".button-text").textContent =
        "카테고리를 선택해주세요";
    } else {
      pickButton.disabled = false;
      pickButton.querySelector(".button-text").textContent = "점심 뽑기!";
    }
  }

  pickLunch() {
    const selectedCategories = this.getSelectedCategories();
    const selectedPortion = this.getSelectedPortion();

    if (selectedCategories.length === 0) {
      alert("최소 하나의 카테고리를 선택해주세요!");
      return;
    }

    // 선택된 카테고리에서 사용 가능한 메뉴 수집
    const availableMenus = [];
    selectedCategories.forEach((category) => {
      if (menuDatabase[category]) {
        menuDatabase[category].forEach((menu) => {
          availableMenus.push({
            ...menu,
            categoryName: category,
          });
        });
      }
    });

    if (availableMenus.length === 0) {
      alert("선택된 카테고리에 사용 가능한 메뉴가 없습니다!");
      return;
    }

    // 랜덤하게 메뉴 선택
    const randomIndex = Math.floor(Math.random() * availableMenus.length);
    const selectedMenu = availableMenus[randomIndex];

    // 결과 표시
    this.displayResult(selectedMenu, selectedPortion);

    // 기록에 추가
    this.addToHistory(selectedMenu, selectedPortion);

    // 애니메이션 효과
    this.animatePick();
  }

  displayResult(menu, portion) {
    const calories = menu.calories[portion];
    const portionText = this.getPortionText(portion);
    const categoryText = this.getCategoryText(menu.categoryName);

    resultCard.innerHTML = `
      <div class="result-emoji">${menu.emoji}</div>
      <div class="result-content">
        <h3 class="result-name">${menu.name}</h3>
        <p class="result-category">${categoryText} • ${menu.category}</p>
        <div class="result-details">
          <div class="result-detail">
            <span class="detail-label">포션</span>
            <span class="detail-value">${portionText}</span>
          </div>
          <div class="result-detail">
            <span class="detail-label">칼로리</span>
            <span class="detail-value">${calories}kcal</span>
          </div>
        </div>
        <div class="result-message">
          <p>오늘은 <strong>${menu.name}</strong> 어떠세요?</p>
          <p>${this.getRandomMessage(menu.category)}</p>
        </div>
      </div>
    `;

    resultSection.style.display = "block";
    resultSection.scrollIntoView({ behavior: "smooth" });

    // 현재 결과 저장 (칼로리 계산기로 이동할 때 사용)
    this.currentResult = { ...menu, portion };
  }

  getCurrentResult() {
    return this.currentResult;
  }

  getPortionText(portion) {
    const sizeMap = {
      small: "소",
      medium: "중",
      large: "대",
    };
    return sizeMap[portion] || portion;
  }

  getCategoryText(category) {
    const categoryMap = {
      korean: "한식",
      chinese: "중식",
      japanese: "일식",
      western: "양식",
      fastfood: "패스트푸드",
      beverage: "음료",
    };
    return categoryMap[category] || category;
  }

  getRandomMessage(category) {
    const messages = {
      찌개: "따뜻한 국물이 속을 편하게 해줄 거예요!",
      밥류: "든든하게 배를 채워줄 거예요!",
      고기류: "단백질이 풍부해서 에너지가 넘칠 거예요!",
      국물류: "진한 국물이 몸을 따뜻하게 해줄 거예요!",
      면류: "쫄깃한 면발이 기분을 좋게 해줄 거예요!",
      전류: "바삭한 식감이 입맛을 돋워줄 거예요!",
      볶음류: "진한 양념이 입맛을 사로잡을 거예요!",
      초밥: "신선한 재료가 입안에서 톡톡 터질 거예요!",
      튀김류: "바삭한 튀김옷이 기분을 좋게 해줄 거예요!",
      생선류: "신선한 생선이 몸에 좋을 거예요!",
      피자: "치즈의 풍미가 입안 가득 퍼질 거예요!",
      샐러드: "신선한 채소가 몸을 가볍게 해줄 거예요!",
      햄버거: "든든한 한 끼가 될 거예요!",
      샌드위치: "간편하면서도 맛있는 선택이에요!",
      그라탕: "크림의 부드러움이 입안을 감쌀 거예요!",
      만두류: "쫄깃한 피가 기분을 좋게 해줄 거예요!",
      두부류: "부드러운 식감이 마음을 편하게 해줄 거예요!",
      탄산음료: "시원한 탄산이 목을 적셔줄 거예요!",
      주스: "상큼한 과일 맛이 기분을 좋게 해줄 거예요!",
      커피: "향긋한 커피가 잠깐의 휴식을 선사할 거예요!",
      차류: "은은한 향이 마음을 진정시켜줄 거예요!",
      물: "깨끗한 물로 목을 적셔보세요!",
    };

    return messages[category] || "맛있는 식사가 될 거예요!";
  }

  addToHistory(menu, portion) {
    const historyItem = {
      menu: menu.name,
      category: menu.categoryName,
      portion: portion,
      calories: menu.calories[portion],
      emoji: menu.emoji,
      timestamp: new Date().toISOString(),
    };

    pickHistory.unshift(historyItem);

    // 최대 10개까지만 저장
    if (pickHistory.length > 10) {
      pickHistory = pickHistory.slice(0, 10);
    }

    // 로컬 스토리지에 저장
    localStorage.setItem("lunchPickHistory", JSON.stringify(pickHistory));

    // 히스토리 표시 업데이트
    this.loadHistory();
  }

  loadHistory() {
    if (pickHistory.length === 0) {
      historySection.style.display = "none";
      return;
    }

    historySection.style.display = "block";

    historyList.innerHTML = pickHistory
      .map((item, index) => {
        const date = new Date(item.timestamp);
        const timeString = date.toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return `
          <div class="history-item">
            <div class="history-emoji">${item.emoji}</div>
            <div class="history-content">
              <div class="history-name">${item.menu}</div>
              <div class="history-details">
                <span class="history-portion">${this.getPortionText(
                  item.portion
                )}</span>
                <span class="history-calories">${item.calories}kcal</span>
                <span class="history-time">${timeString}</span>
              </div>
            </div>
            <button class="history-pick-again" onclick="picker.pickSpecificMenu('${
              item.menu
            }', '${item.category}', '${item.portion}')">
              다시 뽑기
            </button>
          </div>
        `;
      })
      .join("");
  }

  pickSpecificMenu(menuName, category, portion) {
    // 특정 메뉴를 다시 뽑기
    const menu = menuDatabase[category]?.find((m) => m.name === menuName);
    if (menu) {
      this.displayResult(menu, portion);
      this.addToHistory(menu, portion);
    }
  }

  clearHistory() {
    if (confirm("뽑기 기록을 모두 지우시겠습니까?")) {
      pickHistory = [];
      localStorage.removeItem("lunchPickHistory");
      this.loadHistory();
    }
  }

  animatePick() {
    // 뽑기 버튼 애니메이션
    pickButton.style.transform = "scale(0.95)";
    setTimeout(() => {
      pickButton.style.transform = "scale(1)";
    }, 150);

    // 주사위 회전 애니메이션
    if (spinningDice) {
      spinningDice.style.display = "block";
      spinningDice.style.animation = "spin 1s linear infinite";

      setTimeout(() => {
        spinningDice.style.display = "none";
        spinningDice.style.animation = "none";
      }, 2000);
    }

    // 결과 카드 애니메이션
    resultCard.style.opacity = "0";
    resultCard.style.transform = "translateY(20px) scale(0.9)";
    setTimeout(() => {
      resultCard.style.transition =
        "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
      resultCard.style.opacity = "1";
      resultCard.style.transform = "translateY(0) scale(1)";
    }, 100);

    // 결과 섹션 등장 애니메이션
    resultSection.style.transform = "translateY(30px)";
    resultSection.style.opacity = "0";
    setTimeout(() => {
      resultSection.style.transition = "all 0.5s ease-out";
      resultSection.style.transform = "translateY(0)";
      resultSection.style.opacity = "1";
    }, 50);
  }
}

// 계산기 초기화
let picker;
document.addEventListener("DOMContentLoaded", () => {
  picker = new LunchPicker();
  picker.updatePickButton();
  picker.updateCategoryCounts();
  picker.updateStats();
  picker.updatePortionDisplay();
});

// 키보드 단축키
document.addEventListener("keydown", (e) => {
  // 스페이스바로 뽑기
  if (e.code === "Space" && !e.target.matches("input, textarea")) {
    e.preventDefault();
    picker.pickLunch();
  }

  // Enter 키로 다시 뽑기
  if (e.key === "Enter" && resultSection.style.display !== "none") {
    picker.pickLunch();
  }
});
