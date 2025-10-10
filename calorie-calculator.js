// 칼로리 계산기 JavaScript

// 메뉴 데이터베이스
const menuDatabase = {
  korean: [
    {
      name: "김치찌개",
      calories: { small: 250, medium: 350, large: 450 },
      category: "찌개",
    },
    {
      name: "된장찌개",
      calories: { small: 200, medium: 280, large: 360 },
      category: "찌개",
    },
    {
      name: "비빔밥",
      calories: { small: 400, medium: 550, large: 700 },
      category: "밥류",
    },
    {
      name: "불고기",
      calories: { small: 300, medium: 450, large: 600 },
      category: "고기류",
    },
    {
      name: "갈비탕",
      calories: { small: 350, medium: 500, large: 650 },
      category: "국물류",
    },
    {
      name: "냉면",
      calories: { small: 300, medium: 400, large: 500 },
      category: "면류",
    },
    {
      name: "김치전",
      calories: { small: 150, medium: 200, large: 250 },
      category: "전류",
    },
    {
      name: "제육볶음",
      calories: { small: 400, medium: 550, large: 700 },
      category: "볶음류",
    },
  ],
  chinese: [
    {
      name: "짜장면",
      calories: { small: 500, medium: 650, large: 800 },
      category: "면류",
    },
    {
      name: "짬뽕",
      calories: { small: 450, medium: 600, large: 750 },
      category: "면류",
    },
    {
      name: "탕수육",
      calories: { small: 400, medium: 550, large: 700 },
      category: "고기류",
    },
    {
      name: "볶음밥",
      calories: { small: 350, medium: 500, large: 650 },
      category: "밥류",
    },
    {
      name: "짬뽕밥",
      calories: { small: 400, medium: 550, large: 700 },
      category: "밥류",
    },
    {
      name: "군만두",
      calories: { small: 200, medium: 300, large: 400 },
      category: "만두류",
    },
    {
      name: "깐풍기",
      calories: { small: 350, medium: 500, large: 650 },
      category: "고기류",
    },
    {
      name: "마파두부",
      calories: { small: 250, medium: 350, large: 450 },
      category: "두부류",
    },
  ],
  japanese: [
    {
      name: "초밥",
      calories: { small: 300, medium: 450, large: 600 },
      category: "초밥",
    },
    {
      name: "라멘",
      calories: { small: 400, medium: 550, large: 700 },
      category: "면류",
    },
    {
      name: "우동",
      calories: { small: 350, medium: 500, large: 650 },
      category: "면류",
    },
    {
      name: "돈카츠",
      calories: { small: 500, medium: 700, large: 900 },
      category: "튀김류",
    },
    {
      name: "텐동",
      calories: { small: 450, medium: 600, large: 750 },
      category: "튀김류",
    },
    {
      name: "규동",
      calories: { small: 400, medium: 550, large: 700 },
      category: "고기류",
    },
    {
      name: "오니기리",
      calories: { small: 200, medium: 300, large: 400 },
      category: "밥류",
    },
    {
      name: "사시미",
      calories: { small: 150, medium: 250, large: 350 },
      category: "생선류",
    },
  ],
  western: [
    {
      name: "스테이크",
      calories: { small: 400, medium: 600, large: 800 },
      category: "고기류",
    },
    {
      name: "파스타",
      calories: { small: 350, medium: 500, large: 650 },
      category: "면류",
    },
    {
      name: "피자",
      calories: { small: 300, medium: 450, large: 600 },
      category: "피자",
    },
    {
      name: "샐러드",
      calories: { small: 150, medium: 250, large: 350 },
      category: "샐러드",
    },
    {
      name: "햄버거",
      calories: { small: 400, medium: 600, large: 800 },
      category: "햄버거",
    },
    {
      name: "샌드위치",
      calories: { small: 300, medium: 450, large: 600 },
      category: "샌드위치",
    },
    {
      name: "리조또",
      calories: { small: 400, medium: 550, large: 700 },
      category: "밥류",
    },
    {
      name: "그라탕",
      calories: { small: 350, medium: 500, large: 650 },
      category: "그라탕",
    },
  ],
  fastfood: [
    {
      name: "치킨",
      calories: { small: 400, medium: 600, large: 800 },
      category: "튀김류",
    },
    {
      name: "피자",
      calories: { small: 300, medium: 450, large: 600 },
      category: "피자",
    },
    {
      name: "햄버거",
      calories: { small: 400, medium: 600, large: 800 },
      category: "햄버거",
    },
    {
      name: "타코",
      calories: { small: 200, medium: 300, large: 400 },
      category: "타코",
    },
    {
      name: "샐러드",
      calories: { small: 150, medium: 250, large: 350 },
      category: "샐러드",
    },
    {
      name: "프라이",
      calories: { small: 200, medium: 300, large: 400 },
      category: "튀김류",
    },
    {
      name: "나쵸",
      calories: { small: 150, medium: 250, large: 350 },
      category: "스낵",
    },
    {
      name: "핫도그",
      calories: { small: 250, medium: 350, large: 450 },
      category: "핫도그",
    },
  ],
  beverage: [
    {
      name: "콜라",
      calories: { small: 100, medium: 150, large: 200 },
      category: "탄산음료",
    },
    {
      name: "사이다",
      calories: { small: 100, medium: 150, large: 200 },
      category: "탄산음료",
    },
    {
      name: "오렌지주스",
      calories: { small: 120, medium: 180, large: 240 },
      category: "주스",
    },
    {
      name: "사과주스",
      calories: { small: 120, medium: 180, large: 240 },
      category: "주스",
    },
    {
      name: "커피",
      calories: { small: 50, medium: 100, large: 150 },
      category: "커피",
    },
    {
      name: "라떼",
      calories: { small: 150, medium: 250, large: 350 },
      category: "커피",
    },
    {
      name: "아이스티",
      calories: { small: 80, medium: 120, large: 160 },
      category: "차류",
    },
    { name: "물", calories: { small: 0, medium: 0, large: 0 }, category: "물" },
  ],
};

// 활동량 계수
const activityMultipliers = {
  sedentary: 1.2, // 거의 운동 안함
  light: 1.375, // 가벼운 운동
  moderate: 1.55, // 보통 운동
  active: 1.725, // 적극적 운동
  "very-active": 1.9, // 매우 적극적 운동
};

// DOM 요소들
const gender = document.getElementById("gender");
const age = document.getElementById("age");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const activity = document.getElementById("activity");
const menuItems = document.getElementById("menuItems");
const selectedMenuList = document.getElementById("selectedMenuList");
const totalCalories = document.getElementById("totalCalories");
const dailyCalories = document.getElementById("dailyCalories");
const lunchCalories = document.getElementById("lunchCalories");
const calorieRatio = document.getElementById("calorieRatio");
const calorieAnalysis = document.getElementById("calorieAnalysis");

// 선택된 메뉴 저장
let selectedMenus = [];
let currentCategory = "korean";

// 칼로리 계산기 클래스
class CalorieCalculator {
  constructor() {
    this.initializeEventListeners();
    this.loadMenuItems("korean");
    this.calculate();
  }

  initializeEventListeners() {
    // 개인 정보 입력 필드들
    [gender, age, weight, height, activity].forEach((element) => {
      element.addEventListener("input", () => this.calculate());
      element.addEventListener("change", () => this.calculate());
    });

    // 카테고리 탭 버튼들
    document.querySelectorAll(".tab-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const category = e.target.dataset.category;
        this.switchCategory(category);
      });
    });
  }

  switchCategory(category) {
    // 탭 버튼 활성화 상태 변경
    document.querySelectorAll(".tab-button").forEach((btn) => {
      btn.classList.remove("active");
    });
    document
      .querySelector(`[data-category="${category}"]`)
      .classList.add("active");

    // 메뉴 아이템 로드
    this.loadMenuItems(category);
    currentCategory = category;
  }

  loadMenuItems(category) {
    const menus = menuDatabase[category] || [];
    menuItems.innerHTML = "";

    if (menus.length === 0) {
      menuItems.innerHTML = "<p>해당 카테고리에 메뉴가 없습니다.</p>";
      return;
    }

    menus.forEach((menu) => {
      const menuItem = document.createElement("div");
      menuItem.className = "menu-item";
      menuItem.innerHTML = `
        <div class="menu-info">
          <h4>${menu.name}</h4>
          <p class="menu-category">${menu.category}</p>
        </div>
        <div class="menu-actions">
          <select class="portion-size" data-menu="${menu.name}">
            <option value="small">소 (${menu.calories.small}kcal)</option>
            <option value="medium">중 (${menu.calories.medium}kcal)</option>
            <option value="large">대 (${menu.calories.large}kcal)</option>
          </select>
          <button class="add-menu-btn" data-menu="${menu.name}">추가</button>
        </div>
      `;

      // 추가 버튼 이벤트 리스너
      const addBtn = menuItem.querySelector(".add-menu-btn");
      addBtn.addEventListener("click", () => {
        const portionSize = menuItem.querySelector(".portion-size").value;
        this.addMenu(menu.name, portionSize, menu.calories[portionSize]);
      });

      menuItems.appendChild(menuItem);
    });
  }

  addMenu(menuName, portionSize, calories) {
    const existingMenu = selectedMenus.find(
      (menu) => menu.name === menuName && menu.portionSize === portionSize
    );

    if (existingMenu) {
      existingMenu.quantity += 1;
    } else {
      selectedMenus.push({
        name: menuName,
        portionSize: portionSize,
        calories: calories,
        quantity: 1,
      });
    }

    this.updateSelectedMenuList();
    this.calculate();
  }

  removeMenu(index) {
    selectedMenus.splice(index, 1);
    this.updateSelectedMenuList();
    this.calculate();
  }

  updateSelectedMenuList() {
    if (selectedMenus.length === 0) {
      selectedMenuList.innerHTML =
        '<p class="empty-message">메뉴를 선택해주세요</p>';
      return;
    }

    selectedMenuList.innerHTML = selectedMenus
      .map(
        (menu, index) => `
      <div class="selected-menu-item">
        <div class="menu-details">
          <span class="menu-name">${menu.name} (${this.getPortionSizeText(
          menu.portionSize
        )})</span>
          <span class="menu-calories">${
            menu.calories * menu.quantity
          }kcal</span>
        </div>
        <div class="menu-controls">
          <span class="quantity">${menu.quantity}개</span>
          <button class="remove-btn" onclick="calculator.removeMenu(${index})">×</button>
        </div>
      </div>
    `
      )
      .join("");
  }

  getPortionSizeText(portionSize) {
    const sizeMap = {
      small: "소",
      medium: "중",
      large: "대",
    };
    return sizeMap[portionSize] || portionSize;
  }

  calculate() {
    try {
      // 개인 정보 가져오기
      const userGender = gender.value;
      const userAge = parseInt(age.value) || 30;
      const userWeight = parseFloat(weight.value) || 70;
      const userHeight = parseFloat(height.value) || 170;
      const userActivity = activity.value;

      // BMR 계산 (Mifflin-St Jeor 공식)
      let bmr;
      if (userGender === "male") {
        bmr = 10 * userWeight + 6.25 * userHeight - 5 * userAge + 5;
      } else {
        bmr = 10 * userWeight + 6.25 * userHeight - 5 * userAge - 161;
      }

      // 일일 권장 칼로리 계산
      const dailyCalorieNeeds = Math.round(
        bmr * activityMultipliers[userActivity]
      );
      const lunchCalorieNeeds = Math.round(dailyCalorieNeeds * 0.3); // 점심은 하루 칼로리의 30%

      // 선택된 메뉴의 총 칼로리 계산
      const totalMenuCalories = selectedMenus.reduce((total, menu) => {
        return total + menu.calories * menu.quantity;
      }, 0);

      // 칼로리 비율 계산
      const caloriePercentage =
        lunchCalorieNeeds > 0
          ? Math.round((totalMenuCalories / lunchCalorieNeeds) * 100)
          : 0;

      // 결과 표시
      this.displayResults({
        totalCalories: totalMenuCalories,
        dailyCalories: dailyCalorieNeeds,
        lunchCalories: lunchCalorieNeeds,
        calorieRatio: caloriePercentage,
        userInfo: {
          gender: userGender,
          age: userAge,
          weight: userWeight,
          height: userHeight,
          activity: userActivity,
        },
      });
    } catch (error) {
      console.error("계산 오류:", error);
      this.clearResults();
    }
  }

  displayResults(results) {
    totalCalories.textContent = `${results.totalCalories} kcal`;
    dailyCalories.textContent = `${results.dailyCalories} kcal`;
    lunchCalories.textContent = `${results.lunchCalories} kcal`;
    calorieRatio.textContent = `${results.calorieRatio}%`;

    // 칼로리 분석 업데이트
    this.updateCalorieAnalysis(results);
  }

  updateCalorieAnalysis(results) {
    let analysis = "";

    if (results.totalCalories === 0) {
      analysis = "<p>개인 정보를 입력하고 메뉴를 선택해주세요</p>";
    } else {
      const { totalCalories, lunchCalories, calorieRatio } = results;

      if (calorieRatio <= 80) {
        analysis = `
          <div class="analysis-good">
            <h4>✅ 적절한 칼로리</h4>
            <p>점심 권장 칼로리 대비 ${calorieRatio}%로 적절한 양입니다.</p>
          </div>
        `;
      } else if (calorieRatio <= 120) {
        analysis = `
          <div class="analysis-warning">
            <h4>⚠️ 약간 높은 칼로리</h4>
            <p>점심 권장 칼로리 대비 ${calorieRatio}%로 약간 높습니다. 저녁 식사량을 조절해보세요.</p>
          </div>
        `;
      } else {
        analysis = `
          <div class="analysis-danger">
            <h4>🚨 높은 칼로리</h4>
            <p>점심 권장 칼로리 대비 ${calorieRatio}%로 매우 높습니다. 메뉴를 조절하거나 운동을 고려해보세요.</p>
          </div>
        `;
      }

      // 추가 팁
      analysis += `
        <div class="analysis-tips">
          <h4>💡 건강한 점심 팁</h4>
          <ul>
            <li>단백질과 채소를 충분히 섭취하세요</li>
            <li>과도한 탄수화물 섭취를 피하세요</li>
            <li>식후 30분 정도 가벼운 산책을 해보세요</li>
            <li>충분한 수분 섭취를 잊지 마세요</li>
          </ul>
        </div>
      `;
    }

    calorieAnalysis.innerHTML = analysis;
  }

  clearResults() {
    totalCalories.textContent = "0 kcal";
    dailyCalories.textContent = "0 kcal";
    lunchCalories.textContent = "0 kcal";
    calorieRatio.textContent = "0%";
    calorieAnalysis.innerHTML =
      "<p>개인 정보를 입력하고 메뉴를 선택해주세요</p>";
  }
}

// 계산기 초기화
let calculator;
document.addEventListener("DOMContentLoaded", () => {
  calculator = new CalorieCalculator();
});

// 키보드 단축키
document.addEventListener("keydown", (e) => {
  // Enter 키로 계산 실행
  if (e.key === "Enter") {
    e.preventDefault();
    calculator.calculate();
  }

  // Escape 키로 선택된 메뉴 초기화
  if (e.key === "Escape") {
    selectedMenus = [];
    calculator.updateSelectedMenuList();
    calculator.calculate();
  }
});

// 입력 필드 포커스 시 전체 선택
[age, weight, height].forEach((input) => {
  input.addEventListener("focus", () => {
    input.select();
  });
});

