// 세금 계산기 JavaScript

// DOM 요소들
const taxType = document.getElementById("taxType");
const amount = document.getElementById("amount");
const incomeType = document.getElementById("incomeType");
const vatType = document.getElementById("vatType");
const deduction = document.getElementById("deduction");
const incomeOptions = document.getElementById("incomeOptions");
const vatOptions = document.getElementById("vatOptions");

// 결과 표시 요소들
const taxAmount = document.getElementById("taxAmount");
const beforeTax = document.getElementById("beforeTax");
const afterTax = document.getElementById("afterTax");
const taxableAmount = document.getElementById("taxableAmount");
const taxRateDisplay = document.getElementById("taxRate");
const deductionAmount = document.getElementById("deductionAmount");
const actualTax = document.getElementById("actualTax");
const taxBurden = document.getElementById("taxBurden");
const taxSaving = document.getElementById("taxSaving");

// 세금 계산기 클래스
class TaxCalculator {
  constructor() {
    this.initializeEventListeners();
    this.calculate();
  }

  initializeEventListeners() {
    [taxType, amount, incomeType, vatType, deduction].forEach((element) => {
      element.addEventListener("input", () => this.calculate());
      element.addEventListener("change", () => this.calculate());
    });

    // 세금 유형 변경 시 옵션 표시/숨김
    taxType.addEventListener("change", () => this.toggleOptions());
  }

  toggleOptions() {
    const selectedType = taxType.value;

    if (selectedType === "income") {
      incomeOptions.style.display = "block";
      vatOptions.style.display = "none";
    } else if (selectedType === "vat") {
      incomeOptions.style.display = "none";
      vatOptions.style.display = "block";
    } else {
      incomeOptions.style.display = "none";
      vatOptions.style.display = "none";
    }
  }

  calculate() {
    try {
      const amountValue = parseFloat(amount.value) || 0;
      const deductionValue = parseFloat(deduction.value) || 0;

      if (amountValue <= 0) {
        this.clearResults();
        return;
      }

      let results = {};

      switch (taxType.value) {
        case "income":
          results = this.calculateIncomeTax(amountValue, deductionValue);
          break;
        case "vat":
          results = this.calculateVAT(amountValue);
          break;
        case "property":
          results = this.calculatePropertyTax(amountValue);
          break;
        case "gift":
          results = this.calculateGiftTax(amountValue, deductionValue);
          break;
      }

      this.displayResults(results, amountValue);
    } catch (error) {
      console.error("계산 오류:", error);
      this.clearResults();
    }
  }

  calculateIncomeTax(income, deduction) {
    const taxableIncome = Math.max(0, income - deduction);

    // 소득세 구간별 계산 (2024년 기준)
    const taxBrackets = [
      { min: 0, max: 12000000, rate: 0.06 },
      { min: 12000000, max: 46000000, rate: 0.15 },
      { min: 46000000, max: 88000000, rate: 0.24 },
      { min: 88000000, max: 150000000, rate: 0.35 },
      { min: 150000000, max: Infinity, rate: 0.42 },
    ];

    let tax = 0;
    let remainingIncome = taxableIncome;

    for (const bracket of taxBrackets) {
      if (remainingIncome <= 0) break;

      const taxableAmount = Math.min(
        remainingIncome,
        bracket.max - bracket.min
      );
      tax += taxableAmount * bracket.rate;
      remainingIncome -= taxableAmount;
    }

    const localTax = tax * 0.1; // 지방소득세
    const totalTax = tax + localTax;
    const afterTax = income - totalTax;
    const taxBurdenRate = (totalTax / income) * 100;

    return {
      tax: Math.round(tax),
      localTax: Math.round(localTax),
      totalTax: Math.round(totalTax),
      beforeTax: income,
      afterTax: Math.round(afterTax),
      taxableAmount: Math.round(taxableIncome),
      taxRate: this.getTaxRate(taxableIncome),
      deduction: deduction,
      taxBurden: Math.round(taxBurdenRate * 100) / 100,
      taxSaving: Math.round(deduction * 0.15), // 공제로 인한 절세 효과
    };
  }

  calculateVAT(amount) {
    const vatTypeValue = vatType.value;
    let supplyAmount, vatAmount, totalAmount;

    if (vatTypeValue === "supply") {
      supplyAmount = amount;
      vatAmount = amount * 0.1;
      totalAmount = amount + vatAmount;
    } else {
      totalAmount = amount;
      supplyAmount = amount / 1.1;
      vatAmount = amount - supplyAmount;
    }

    return {
      tax: Math.round(vatAmount),
      localTax: 0,
      totalTax: Math.round(vatAmount),
      beforeTax: Math.round(supplyAmount),
      afterTax: Math.round(supplyAmount),
      taxableAmount: Math.round(supplyAmount),
      taxRate: "10%",
      deduction: 0,
      taxBurden: Math.round((vatAmount / totalAmount) * 100 * 100) / 100,
      taxSaving: 0,
    };
  }

  calculatePropertyTax(propertyValue) {
    // 재산세 계산 (간단한 예시)
    let tax = 0;
    if (propertyValue <= 60000000) {
      tax = propertyValue * 0.001;
    } else if (propertyValue <= 120000000) {
      tax = 60000 + (propertyValue - 60000000) * 0.002;
    } else {
      tax = 180000 + (propertyValue - 120000000) * 0.004;
    }

    return {
      tax: Math.round(tax),
      localTax: 0,
      totalTax: Math.round(tax),
      beforeTax: propertyValue,
      afterTax: propertyValue,
      taxableAmount: propertyValue,
      taxRate: this.getPropertyTaxRate(propertyValue),
      deduction: 0,
      taxBurden: Math.round((tax / propertyValue) * 100 * 100) / 100,
      taxSaving: 0,
    };
  }

  calculateGiftTax(giftValue, deduction) {
    const taxableAmount = Math.max(0, giftValue - deduction);

    // 증여세 계산 (간단한 예시)
    let tax = 0;
    if (taxableAmount <= 100000000) {
      tax = taxableAmount * 0.1;
    } else if (taxableAmount <= 500000000) {
      tax = 10000000 + (taxableAmount - 100000000) * 0.2;
    } else {
      tax = 90000000 + (taxableAmount - 500000000) * 0.3;
    }

    return {
      tax: Math.round(tax),
      localTax: 0,
      totalTax: Math.round(tax),
      beforeTax: giftValue,
      afterTax: giftValue - tax,
      taxableAmount: Math.round(taxableAmount),
      taxRate: this.getGiftTaxRate(taxableAmount),
      deduction: deduction,
      taxBurden: Math.round((tax / giftValue) * 100 * 100) / 100,
      taxSaving: Math.round(deduction * 0.1),
    };
  }

  getTaxRate(income) {
    if (income <= 12000000) return "6%";
    if (income <= 46000000) return "15%";
    if (income <= 88000000) return "24%";
    if (income <= 150000000) return "35%";
    return "42%";
  }

  getPropertyTaxRate(value) {
    if (value <= 60000000) return "0.1%";
    if (value <= 120000000) return "0.2%";
    return "0.4%";
  }

  getGiftTaxRate(value) {
    if (value <= 100000000) return "10%";
    if (value <= 500000000) return "20%";
    return "30%";
  }

  displayResults(results, originalAmount) {
    // 세금 표시
    taxAmount.textContent = this.formatCurrency(results.totalTax);
    beforeTax.textContent = this.formatCurrency(results.beforeTax);
    afterTax.textContent = this.formatCurrency(results.afterTax);

    // 세금 상세 표시
    taxableAmount.textContent = this.formatCurrency(results.taxableAmount);
    taxRateDisplay.textContent = results.taxRate;
    deductionAmount.textContent = this.formatCurrency(results.deduction);
    actualTax.textContent = this.formatCurrency(results.totalTax);

    // 요약 정보 표시
    taxBurden.textContent = `${results.taxBurden}%`;
    taxSaving.textContent = this.formatCurrency(results.taxSaving);

    // 애니메이션 효과
    this.animateResults();
  }

  clearResults() {
    const zeroAmount = "₩0";
    taxAmount.textContent = zeroAmount;
    beforeTax.textContent = zeroAmount;
    afterTax.textContent = zeroAmount;
    taxableAmount.textContent = zeroAmount;
    taxRateDisplay.textContent = "0%";
    deductionAmount.textContent = zeroAmount;
    actualTax.textContent = zeroAmount;
    taxBurden.textContent = "0%";
    taxSaving.textContent = zeroAmount;
  }

  formatCurrency(amount) {
    if (isNaN(amount) || amount === 0) return "₩0";

    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(amount));
  }

  animateResults() {
    const takeHomeSection = document.querySelector(".take-home-section");
    if (takeHomeSection) {
      takeHomeSection.style.animation = "none";
      setTimeout(() => {
        takeHomeSection.style.animation = "fadeInUp 0.6s ease-out";
      }, 10);
    }
  }
}

// 입력 검증
function validateInputs() {
  const amountValue = amount.value;
  const deductionValue = deduction.value;

  // 금액 검증
  if (amountValue && !isValidNumber(amountValue, 0)) {
    amount.style.borderColor = "#e53e3e";
    return false;
  } else {
    amount.style.borderColor = "#e2e8f0";
  }

  // 공제액 검증
  if (deductionValue && !isValidNumber(deductionValue, 0)) {
    deduction.style.borderColor = "#e53e3e";
    return false;
  } else {
    deduction.style.borderColor = "#e2e8f0";
  }

  return true;
}

function isValidNumber(value, min = 0, max = Infinity) {
  const num = parseFloat(value);
  return !isNaN(num) && num >= min && num <= max;
}

// 입력 필드에 실시간 검증 추가
[amount, deduction].forEach((input) => {
  input.addEventListener("input", validateInputs);
});

// 계산기 초기화
document.addEventListener("DOMContentLoaded", () => {
  const calculator = new TaxCalculator();

  // 페이지 로드 시 기본값으로 계산
  calculator.calculate();

  // 입력 필드 포커스 시 전체 선택
  [amount, deduction].forEach((input) => {
    input.addEventListener("focus", () => {
      input.select();
    });
  });
});

// 키보드 단축키
document.addEventListener("keydown", (e) => {
  // Enter 키로 계산 실행
  if (e.key === "Enter") {
    e.preventDefault();
    document.querySelector(".calculator-section").scrollIntoView({
      behavior: "smooth",
    });
  }

  // Escape 키로 입력 필드 초기화
  if (e.key === "Escape") {
    amount.value = "";
    amount.focus();
  }
});
