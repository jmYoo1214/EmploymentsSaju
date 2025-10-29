// 대출 이율 계산기 JavaScript

// 숫자 포맷팅 함수 (천 단위 구분자 추가)
function formatNumberWithCommas(value) {
  if (!value || value === "") return "";
  const cleanValue = value.toString().replace(/[^0-9]/g, "");
  if (cleanValue === "") return "";

  // 큰 숫자도 처리할 수 있도록 BigInt 사용
  try {
    const num = BigInt(cleanValue);
    return num.toLocaleString("ko-KR");
  } catch (e) {
    // BigInt 실패 시 일반 parseInt 사용
    return parseInt(cleanValue).toLocaleString("ko-KR");
  }
}

// 숫자에서 콤마 제거 함수
function removeCommas(value) {
  if (!value) return "";
  return value.toString().replace(/[^0-9]/g, "");
}

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", () => {
  // 입력 필드 이벤트 리스너 추가
  const inputs = document.querySelectorAll("input, select");
  inputs.forEach((input) => {
    input.addEventListener("input", calculateLoan);
    input.addEventListener("change", calculateLoan);
  });

  // 월별 상환금 리스트 버튼 이벤트
  const showScheduleBtn = document.getElementById("showScheduleBtn");
  const hideScheduleBtn = document.getElementById("hideScheduleBtn");
  const scheduleTable = document.getElementById("scheduleTable");

  showScheduleBtn.addEventListener("click", () => {
    scheduleTable.style.display = "block";
    showScheduleBtn.style.display = "none";
    hideScheduleBtn.style.display = "inline-block";
  });

  hideScheduleBtn.addEventListener("click", () => {
    scheduleTable.style.display = "none";
    showScheduleBtn.style.display = "inline-block";
    hideScheduleBtn.style.display = "none";
  });

  // 숫자 입력 필드에 포맷팅 이벤트 추가
  const numberInputs = document.querySelectorAll(
    "#principal, #additionalPayment"
  );
  numberInputs.forEach((input) => {
    // 포커스 아웃 시 포맷팅 적용
    input.addEventListener("blur", (e) => {
      const cleanValue = removeCommas(e.target.value);
      if (cleanValue && cleanValue !== "") {
        e.target.value = formatNumberWithCommas(cleanValue);
      }
    });

    // 포커스 인 시 콤마 제거
    input.addEventListener("focus", (e) => {
      e.target.value = removeCommas(e.target.value);
    });

    // 키보드 이벤트 처리
    input.addEventListener("keydown", (e) => {
      // 숫자, 백스페이스, 삭제, 화살표 키만 허용
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Tab",
        "Enter",
        "Escape",
      ];

      if (allowedKeys.includes(e.key) || (e.key >= "0" && e.key <= "9")) {
        return; // 허용된 키
      }

      e.preventDefault(); // 다른 키는 차단
    });

    // 입력 완료 시 포맷팅 (Enter 키)
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const cleanValue = removeCommas(e.target.value);
        if (cleanValue) {
          e.target.value = formatNumberWithCommas(cleanValue);
        }
        e.target.blur();
      }
    });
  });

  // 초기 계산
  calculateLoan();
});

// 대출 이율 계산 함수
function calculateLoan() {
  try {
    // 입력값 가져오기
    const principal =
      parseFloat(removeCommas(document.getElementById("principal").value)) || 0;
    const interestRate =
      parseFloat(document.getElementById("interestRate").value) || 0;
    const period = parseFloat(document.getElementById("period").value) || 0;
    // 이자 계산주기는 월 1회로 고정
    const compoundFrequency = 12;
    const additionalPayment =
      parseFloat(
        removeCommas(document.getElementById("additionalPayment").value)
      ) || 0;
    const additionalPaymentMonth =
      parseInt(document.getElementById("additionalPaymentMonth").value) || 0;
    const calculationType = document.getElementById("calculationType").value;

    // 디버깅용 로그
    console.log("입력값:", {
      principal,
      interestRate,
      period,
      additionalPayment,
      additionalPaymentMonth,
      calculationType,
    });

    // 입력값 검증 (큰 숫자도 처리 가능하도록)
    if (principal <= 0 || interestRate < 0 || period <= 0) {
      clearResults();
      return;
    }

    // 숫자가 너무 큰 경우 경고
    if (principal > 1e15 || monthlyDeposit > 1e15) {
      console.warn(
        "입력된 숫자가 매우 큽니다. 계산 결과가 부정확할 수 있습니다."
      );
    }

    let finalAmount, totalEarnings, interestEarnings, compoundEffect;

    if (calculationType === "simple") {
      // 원금균등상환 계산
      const result = calculateEqualPrincipalPayment(
        principal,
        interestRate,
        period,
        additionalPayment,
        additionalPaymentMonth
      );
      finalAmount = result.finalAmount;
      totalEarnings = result.totalEarnings;
      interestEarnings = result.interestEarnings;
      // 원금균등상환에서는 상환 방식 효과가 없음 (기준이므로)
      compoundEffect = 0;
    } else if (calculationType === "comparison") {
      // 원리금균등상환 vs 원금균등상환 비교
      const compoundResult = calculateEqualPayment(
        principal,
        interestRate,
        period,
        compoundFrequency,
        additionalPayment,
        additionalPaymentMonth
      );
      const simpleResult = calculateEqualPrincipalPayment(
        principal,
        interestRate,
        period,
        additionalPayment,
        additionalPaymentMonth
      );

      finalAmount = compoundResult.finalAmount;
      totalEarnings = compoundResult.totalEarnings;
      interestEarnings = compoundResult.interestEarnings;
      compoundEffect = compoundResult.finalAmount - simpleResult.finalAmount;

      // 비교 섹션 표시
      showComparison(compoundResult, simpleResult);
    } else {
      // 원리금균등상환 계산 (기본)
      const result = calculateEqualPayment(
        principal,
        interestRate,
        period,
        compoundFrequency,
        additionalPayment,
        additionalPaymentMonth
      );
      finalAmount = result.finalAmount;
      totalEarnings = result.totalEarnings;
      interestEarnings = result.interestEarnings;
      compoundEffect = result.compoundEffect;

      // 비교 섹션 숨기기
      hideComparison();
    }

    // 총 대출금은 원금만 (월 추가 상환액은 별도)
    const totalInvestment = principal;

    // 디버깅용 로그
    console.log("계산 결과:", {
      finalAmount,
      totalEarnings,
      totalInvestment,
      interestEarnings,
    });

    // 월별 상환금 리스트 생성
    generateScheduleTable(
      principal,
      interestRate,
      period,
      calculationType,
      additionalPayment,
      additionalPaymentMonth
    );

    // 결과 업데이트
    updateResults({
      finalAmount,
      totalEarnings,
      totalInvestment,
      interestEarnings,
      compoundEffect,
      months: period,
      principal,
      interestRate,
    });
  } catch (error) {
    console.error("계산 오류:", error);
    clearResults();
  }
}

// 원리금균등상환 계산 함수
function calculateEqualPayment(
  principal,
  annualRate,
  months,
  compoundFrequency,
  additionalPayment,
  additionalPaymentMonth
) {
  const rate = annualRate / 100;
  const monthlyRate = rate / 12;

  // 원리금균등상환 계산
  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    // 원리금균등상환 공식: P * [r(1+r)^n] / [(1+r)^n - 1]
    const numerator =
      principal * (monthlyRate * Math.pow(1 + monthlyRate, months));
    const denominator = Math.pow(1 + monthlyRate, months) - 1;
    monthlyPayment = numerator / denominator;
  } else {
    monthlyPayment = principal / months;
  }

  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;

  // 추가 상환액 처리 (특정 월에만 적용)
  let totalAdditionalPayment = 0;
  if (
    additionalPayment > 0 &&
    additionalPaymentMonth > 0 &&
    additionalPaymentMonth <= months
  ) {
    totalAdditionalPayment = additionalPayment;
  }

  const finalAmount = totalPayment + totalAdditionalPayment;
  const totalInvestment = principal;
  const totalEarnings = totalInterest;
  const interestEarnings = totalInterest;

  // 원금균등상환과의 차이 계산
  const equalPrincipalResult = calculateEqualPrincipalPayment(
    principal,
    annualRate,
    months,
    additionalPayment,
    additionalPaymentMonth
  );
  const compoundEffect = finalAmount - equalPrincipalResult.finalAmount;

  return {
    finalAmount,
    totalEarnings,
    interestEarnings,
    compoundEffect,
    totalInvestment,
    monthlyPayment,
  };
}

// 원금균등상환 계산 함수
function calculateEqualPrincipalPayment(
  principal,
  annualRate,
  months,
  additionalPayment,
  additionalPaymentMonth
) {
  const rate = annualRate / 100;
  const monthlyRate = rate / 12;

  // 원금균등상환 계산
  const monthlyPrincipal = principal / months;
  let totalInterest = 0;
  let remainingPrincipal = principal;

  for (let month = 1; month <= months; month++) {
    const monthlyInterest = remainingPrincipal * monthlyRate;
    totalInterest += monthlyInterest;
    remainingPrincipal -= monthlyPrincipal;
  }

  const totalPayment = principal + totalInterest;

  // 추가 상환액 처리 (특정 월에만 적용)
  let totalAdditionalPayment = 0;
  if (
    additionalPayment > 0 &&
    additionalPaymentMonth > 0 &&
    additionalPaymentMonth <= months
  ) {
    totalAdditionalPayment = additionalPayment;
  }

  const finalAmount = totalPayment + totalAdditionalPayment;
  const totalInvestment = principal;
  const totalEarnings = totalInterest;
  const interestEarnings = totalInterest;

  return {
    finalAmount,
    totalEarnings,
    interestEarnings,
    totalInvestment,
    monthlyPrincipal,
  };
}

// 결과 업데이트 함수
function updateResults(results) {
  const {
    finalAmount,
    totalEarnings,
    totalInvestment,
    interestEarnings,
    compoundEffect,
    months,
    principal,
    interestRate,
  } = results;

  // 기본 결과 업데이트
  document.getElementById("finalAmount").textContent =
    formatCurrency(finalAmount);
  document.getElementById("totalEarnings").textContent =
    formatCurrency(totalEarnings);
  // 이자율은 연이율로 표시 (입력한 이자율)
  document.getElementById("returnRate").textContent =
    formatPercentage(interestRate);

  // 상세 내역 업데이트
  document.getElementById("totalInvestment").textContent =
    formatCurrency(totalInvestment);
  document.getElementById("interestEarnings").textContent =
    formatCurrency(interestEarnings);

  // 상환 방식 효과 표시 (원금균등상환에서는 기준이므로 0)
  const compoundEffectElement = document.getElementById("compoundEffect");
  if (compoundEffect === 0) {
    compoundEffectElement.textContent = "기준 방식";
    compoundEffectElement.style.color = "#666";
    compoundEffectElement.style.fontStyle = "italic";
  } else {
    compoundEffectElement.textContent = formatCurrency(compoundEffect);
    compoundEffectElement.style.color = "";
    compoundEffectElement.style.fontStyle = "";
  }

  document.getElementById("annualReturn").textContent =
    formatPercentage(interestRate);

  // 요약 업데이트
  const compoundBenefitElement = document.getElementById("compoundBenefit");
  if (compoundEffect === 0) {
    compoundBenefitElement.textContent = "기준 방식";
    compoundBenefitElement.style.color = "#666";
    compoundBenefitElement.style.fontStyle = "italic";
  } else {
    compoundBenefitElement.textContent = formatCurrency(compoundEffect);
    compoundBenefitElement.style.color = "";
    compoundBenefitElement.style.fontStyle = "";
  }

  document.getElementById("goalAchievement").textContent = formatPercentage(
    (finalAmount / (principal * 2)) * 100
  );
}

// 비교 결과 표시 함수
function showComparison(compoundResult, simpleResult) {
  const comparisonSection = document.getElementById("comparisonSection");
  comparisonSection.style.display = "block";

  document.getElementById("compoundFinal").textContent = formatCurrency(
    compoundResult.finalAmount
  );
  document.getElementById("compoundEarnings").textContent = formatCurrency(
    compoundResult.totalEarnings
  );
  document.getElementById("simpleFinal").textContent = formatCurrency(
    simpleResult.finalAmount
  );
  document.getElementById("simpleEarnings").textContent = formatCurrency(
    simpleResult.totalEarnings
  );
  document.getElementById("compoundAdvantage").textContent = formatCurrency(
    compoundResult.finalAmount - simpleResult.finalAmount
  );
}

// 비교 섹션 숨기기 함수
function hideComparison() {
  const comparisonSection = document.getElementById("comparisonSection");
  comparisonSection.style.display = "none";
}

// 월별 상환금 테이블 생성 함수
function generateScheduleTable(
  principal,
  annualRate,
  months,
  calculationType,
  additionalPayment,
  additionalPaymentMonth
) {
  const scheduleTableBody = document.getElementById("scheduleTableBody");
  if (!scheduleTableBody) return;

  // 테이블 초기화
  scheduleTableBody.innerHTML = "";

  const monthlyRate = annualRate / 100 / 12;
  let remainingPrincipal = principal;
  let totalPayment = 0;
  let totalInterest = 0;

  if (calculationType === "simple") {
    // 원금균등상환
    const monthlyPrincipal = principal / months;

    for (let month = 1; month <= months; month++) {
      const monthlyInterest = remainingPrincipal * monthlyRate;
      let monthlyPayment = monthlyPrincipal + monthlyInterest;

      // 추가 상환액이 해당 월에 적용되는지 확인
      if (month === additionalPaymentMonth && additionalPayment > 0) {
        monthlyPayment += additionalPayment;
      }

      totalPayment += monthlyPayment;
      totalInterest += monthlyInterest;

      const row = scheduleTableBody.insertRow();
      row.innerHTML = `
        <td>${month}</td>
        <td>${formatCurrency(monthlyPayment)}</td>
        <td>${formatCurrency(monthlyPrincipal)}</td>
        <td>${formatCurrency(monthlyInterest)}</td>
        <td>${formatCurrency(
          Math.max(0, remainingPrincipal - monthlyPrincipal)
        )}</td>
      `;

      remainingPrincipal -= monthlyPrincipal;
    }
  } else {
    // 원리금균등상환
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      const numerator =
        principal * (monthlyRate * Math.pow(1 + monthlyRate, months));
      const denominator = Math.pow(1 + monthlyRate, months) - 1;
      monthlyPayment = numerator / denominator;
    } else {
      monthlyPayment = principal / months;
    }

    for (let month = 1; month <= months; month++) {
      const monthlyInterest = remainingPrincipal * monthlyRate;
      const monthlyPrincipalPayment = monthlyPayment - monthlyInterest;
      let totalMonthlyPayment = monthlyPayment;

      // 추가 상환액이 해당 월에 적용되는지 확인
      if (month === additionalPaymentMonth && additionalPayment > 0) {
        totalMonthlyPayment += additionalPayment;
      }

      totalPayment += totalMonthlyPayment;
      totalInterest += monthlyInterest;

      const row = scheduleTableBody.insertRow();
      row.innerHTML = `
        <td>${month}</td>
        <td>${formatCurrency(totalMonthlyPayment)}</td>
        <td>${formatCurrency(monthlyPrincipalPayment)}</td>
        <td>${formatCurrency(monthlyInterest)}</td>
        <td>${formatCurrency(
          Math.max(0, remainingPrincipal - monthlyPrincipalPayment)
        )}</td>
      `;

      remainingPrincipal -= monthlyPrincipalPayment;
    }
  }

  // 총계 행 추가
  const totalRow = scheduleTableBody.insertRow();
  totalRow.innerHTML = `
    <td><strong>총계</strong></td>
    <td><strong>${formatCurrency(totalPayment)}</strong></td>
    <td><strong>${formatCurrency(principal)}</strong></td>
    <td><strong>${formatCurrency(totalInterest)}</strong></td>
    <td><strong>₩0</strong></td>
  `;
}

// 결과 초기화 함수
function clearResults() {
  const resultElements = [
    "finalAmount",
    "totalEarnings",
    "returnRate",
    "totalInvestment",
    "interestEarnings",
    "compoundEffect",
    "annualReturn",
    "compoundBenefit",
    "goalAchievement",
  ];

  resultElements.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      if (
        id.includes("Rate") ||
        id.includes("Return") ||
        id.includes("Achievement")
      ) {
        element.textContent = "0%";
      } else {
        element.textContent = "₩0";
      }
      // 스타일 초기화
      element.style.color = "";
      element.style.fontStyle = "";
    }
  });

  hideComparison();

  // 월별 상환금 테이블 초기화
  const scheduleTableBody = document.getElementById("scheduleTableBody");
  if (scheduleTableBody) {
    scheduleTableBody.innerHTML = "";
  }

  // 월별 상환금 테이블 숨기기
  const scheduleTable = document.getElementById("scheduleTable");
  const showScheduleBtn = document.getElementById("showScheduleBtn");
  const hideScheduleBtn = document.getElementById("hideScheduleBtn");
  if (scheduleTable && showScheduleBtn && hideScheduleBtn) {
    scheduleTable.style.display = "none";
    showScheduleBtn.style.display = "inline-block";
    hideScheduleBtn.style.display = "none";
  }
}

// 통화 포맷 함수
function formatCurrency(amount) {
  if (isNaN(amount) || amount === 0) return "₩0";

  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

// 퍼센트 포맷 함수
function formatPercentage(value) {
  if (isNaN(value) || value === 0) return "0%";

  return new Intl.NumberFormat("ko-KR", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

// 입력값 포맷팅 함수
function formatInput(input) {
  const value = parseFloat(input.value);
  if (!isNaN(value) && value > 0) {
    input.style.borderColor = "#4CAF50";
  } else {
    input.style.borderColor = "#f44336";
  }
}

// 숫자 입력 필드에 포맷팅 적용
document.addEventListener("DOMContentLoaded", () => {
  const numberInputs = document.querySelectorAll('input[type="number"]');
  numberInputs.forEach((input) => {
    input.addEventListener("blur", () => formatInput(input));
  });
});

// 키보드 단축키
document.addEventListener("keydown", (e) => {
  // Enter 키로 계산 실행
  if (e.key === "Enter") {
    calculateLoan();
  }

  // Escape 키로 결과 초기화
  if (e.key === "Escape") {
    clearResults();
  }
});

// 애니메이션 효과
function animateResult(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.transform = "scale(1.1)";
    element.style.transition = "transform 0.3s ease";

    setTimeout(() => {
      element.style.transform = "scale(1)";
    }, 300);
  }
}

// 계산 완료 시 애니메이션 실행
function runCalculationAnimation() {
  const resultElements = ["finalAmount", "totalEarnings", "returnRate"];
  resultElements.forEach((id, index) => {
    setTimeout(() => animateResult(id), index * 100);
  });
}

// 계산 함수에 애니메이션 추가
const originalCalculateLoan = calculateLoan;
calculateLoan = function () {
  originalCalculateLoan();
  setTimeout(runCalculationAnimation, 100);
};
