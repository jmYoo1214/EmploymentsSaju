// DOM 요소들
const salaryType = document.getElementById("salaryType");
const salaryAmount = document.getElementById("salaryAmount");
const workHours = document.getElementById("workHours");
const workDays = document.getElementById("workDays");
const bonus = document.getElementById("bonus");
const taxRate = document.getElementById("taxRate");
const includeTax = document.getElementById("includeTax");

// 결과 표시 요소들
const annualAfterTax = document.getElementById("annualAfterTax");
const monthlyAfterTax = document.getElementById("monthlyAfterTax");
const hourlyAfterTax = document.getElementById("hourlyAfterTax");
const totalWorkHours = document.getElementById("totalWorkHours");
const totalWorkDays = document.getElementById("totalWorkDays");
const bonusAmount = document.getElementById("bonusAmount");

// 공제 내역 요소들
const healthInsurance = document.getElementById("healthInsurance");
const pension = document.getElementById("pension");
const employment = document.getElementById("employment");
const industrialAccident = document.getElementById("industrialAccident");
const totalInsurance = document.getElementById("totalInsurance");
const incomeTax = document.getElementById("incomeTax");
const localIncomeTax = document.getElementById("localIncomeTax");
const totalDeduction = document.getElementById("totalDeduction");

// 계산기 클래스
class SalaryCalculator {
  constructor() {
    this.initializeEventListeners();
    this.calculate();
  }

  initializeEventListeners() {
    // 모든 입력 필드에 이벤트 리스너 추가
    [
      salaryType,
      salaryAmount,
      workHours,
      workDays,
      bonus,
      taxRate,
      includeTax,
    ].forEach((element) => {
      element.addEventListener("input", () => this.calculate());
      element.addEventListener("change", () => this.calculate());
    });
  }

  calculate() {
    try {
      const amount = parseFloat(salaryAmount.value) || 0;
      const hours = parseFloat(workHours.value) || 40;
      const days = parseFloat(workDays.value) || 5;
      const bonusAmount = parseFloat(bonus.value) || 0;
      const tax = parseFloat(taxRate.value) || 13.5;
      const isIncludeTax = includeTax.checked;

      if (amount <= 0) {
        this.clearResults();
        return;
      }

      let results = {};

      switch (salaryType.value) {
        case "annual":
          results = this.calculateFromAnnual(
            amount,
            hours,
            days,
            bonusAmount,
            tax,
            isIncludeTax
          );
          break;
        case "monthly":
          results = this.calculateFromMonthly(
            amount,
            hours,
            days,
            bonusAmount,
            tax,
            isIncludeTax
          );
          break;
        case "hourly":
          results = this.calculateFromHourly(
            amount,
            hours,
            days,
            bonusAmount,
            tax,
            isIncludeTax
          );
          break;
      }

      this.displayResults(results, hours, days, bonusAmount);
    } catch (error) {
      console.error("계산 오류:", error);
      this.clearResults();
    }
  }

  calculateFromAnnual(annual, hours, days, bonus, tax, isIncludeTax) {
    const annualBase = isIncludeTax ? annual / (1 - tax / 100) : annual;
    const monthly = annualBase / 12;
    const hourly = monthly / (hours * days * 4.33); // 4.33주/월

    // 한국 실수령액 계산
    const takeHomePay = SalaryUtils.calculateTakeHomePay(annualBase);
    const monthlyTakeHome = takeHomePay.monthlyTakeHome;
    const hourlyTakeHome = monthlyTakeHome / (hours * days * 4.33);

    return {
      annual: annualBase,
      monthly: monthly,
      hourly: hourly,
      annualAfterTax: takeHomePay.takeHomePay,
      monthlyAfterTax: monthlyTakeHome,
      hourlyAfterTax: hourlyTakeHome,
      // 상세 정보 추가
      insurance: takeHomePay.insurance,
      incomeTax: takeHomePay.incomeTax,
      localIncomeTax: takeHomePay.localIncomeTax,
      totalDeduction: takeHomePay.totalDeduction,
    };
  }

  calculateFromMonthly(monthly, hours, days, bonus, tax, isIncludeTax) {
    const monthlyBase = isIncludeTax ? monthly / (1 - tax / 100) : monthly;
    const annual = monthlyBase * 12;
    const hourly = monthlyBase / (hours * days * 4.33);

    // 한국 실수령액 계산
    const takeHomePay = SalaryUtils.calculateTakeHomePay(annual);
    const monthlyTakeHome = takeHomePay.monthlyTakeHome;
    const hourlyTakeHome = monthlyTakeHome / (hours * days * 4.33);

    return {
      annual: annual,
      monthly: monthlyBase,
      hourly: hourly,
      annualAfterTax: takeHomePay.takeHomePay,
      monthlyAfterTax: monthlyTakeHome,
      hourlyAfterTax: hourlyTakeHome,
      // 상세 정보 추가
      insurance: takeHomePay.insurance,
      incomeTax: takeHomePay.incomeTax,
      localIncomeTax: takeHomePay.localIncomeTax,
      totalDeduction: takeHomePay.totalDeduction,
    };
  }

  calculateFromHourly(hourly, hours, days, bonus, tax, isIncludeTax) {
    const hourlyBase = isIncludeTax ? hourly / (1 - tax / 100) : hourly;
    const monthly = hourlyBase * hours * days * 4.33;
    const annual = monthly * 12;

    // 한국 실수령액 계산
    const takeHomePay = SalaryUtils.calculateTakeHomePay(annual);
    const monthlyTakeHome = takeHomePay.monthlyTakeHome;
    const hourlyTakeHome = monthlyTakeHome / (hours * days * 4.33);

    return {
      annual: annual,
      monthly: monthly,
      hourly: hourlyBase,
      annualAfterTax: takeHomePay.takeHomePay,
      monthlyAfterTax: monthlyTakeHome,
      hourlyAfterTax: hourlyTakeHome,
      // 상세 정보 추가
      insurance: takeHomePay.insurance,
      incomeTax: takeHomePay.incomeTax,
      localIncomeTax: takeHomePay.localIncomeTax,
      totalDeduction: takeHomePay.totalDeduction,
    };
  }

  displayResults(results, hours, days, bonus) {
    // 실수령액 표시
    annualAfterTax.textContent = this.formatCurrency(results.annualAfterTax);
    monthlyAfterTax.textContent = this.formatCurrency(results.monthlyAfterTax);
    hourlyAfterTax.textContent = this.formatCurrency(results.hourlyAfterTax);

    // 공제 내역 표시
    if (results.insurance) {
      healthInsurance.textContent = this.formatCurrency(
        results.insurance.healthInsurance
      );
      pension.textContent = this.formatCurrency(results.insurance.pension);
      employment.textContent = this.formatCurrency(
        results.insurance.employment
      );
      industrialAccident.textContent = this.formatCurrency(
        results.insurance.industrialAccident
      );
      totalInsurance.textContent = this.formatCurrency(results.insurance.total);
    }

    if (results.incomeTax !== undefined) {
      incomeTax.textContent = this.formatCurrency(results.incomeTax);
    }

    if (results.localIncomeTax !== undefined) {
      localIncomeTax.textContent = this.formatCurrency(results.localIncomeTax);
    }

    if (results.totalDeduction !== undefined) {
      totalDeduction.textContent = this.formatCurrency(results.totalDeduction);
    }

    // 요약 정보 표시
    totalWorkHours.textContent = `${Math.round(hours * days * 52)}시간`;
    totalWorkDays.textContent = `${Math.round(days * 52)}일`;
    bonusAmount.textContent = this.formatCurrency(bonus);

    // 애니메이션 효과
    this.animateResults();
  }

  clearResults() {
    const zeroAmount = "₩0";
    annualAfterTax.textContent = zeroAmount;
    monthlyAfterTax.textContent = zeroAmount;
    hourlyAfterTax.textContent = zeroAmount;

    // 공제 내역 초기화
    healthInsurance.textContent = zeroAmount;
    pension.textContent = zeroAmount;
    employment.textContent = zeroAmount;
    industrialAccident.textContent = zeroAmount;
    totalInsurance.textContent = zeroAmount;
    incomeTax.textContent = zeroAmount;
    localIncomeTax.textContent = zeroAmount;
    totalDeduction.textContent = zeroAmount;

    totalWorkHours.textContent = "0시간";
    totalWorkDays.textContent = "0일";
    bonusAmount.textContent = zeroAmount;
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
    // 실수령액 섹션에 애니메이션 효과
    const takeHomeSection = document.querySelector(".take-home-section");
    if (takeHomeSection) {
      takeHomeSection.style.animation = "none";
      setTimeout(() => {
        takeHomeSection.style.animation = "fadeInUp 0.6s ease-out";
      }, 10);
    }
  }
}

// 유틸리티 함수들
class SalaryUtils {
  static validateInput(value, min = 0, max = Infinity) {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
  }

  // 4대보험료 계산
  static calculateInsurance(annualSalary) {
    // 2024년 기준 4대보험료율
    const healthInsuranceRate = 0.03545; // 건강보험 3.545%
    const pensionRate = 0.045; // 국민연금 4.5%
    const employmentRate = 0.008; // 고용보험 0.8%
    const industrialAccidentRate = 0.007; // 산재보험 0.7%

    // 보험료 상한선 (2024년 기준)
    const maxHealthInsurance = 12000000 * healthInsuranceRate;
    const maxPension = 12000000 * pensionRate;
    const maxEmployment = 12000000 * employmentRate;
    const maxIndustrialAccident = 12000000 * industrialAccidentRate;

    const healthInsurance = Math.min(
      annualSalary * healthInsuranceRate,
      maxHealthInsurance
    );
    const pension = Math.min(annualSalary * pensionRate, maxPension);
    const employment = Math.min(annualSalary * employmentRate, maxEmployment);
    const industrialAccident = Math.min(
      annualSalary * industrialAccidentRate,
      maxIndustrialAccident
    );

    return {
      healthInsurance,
      pension,
      employment,
      industrialAccident,
      total: healthInsurance + pension + employment + industrialAccident,
    };
  }

  // 소득세 계산 (2024년 기준)
  static calculateIncomeTax(annualSalary) {
    // 소득공제
    const basicDeduction = 1500000; // 기본공제
    const additionalDeduction = 1500000; // 추가공제 (근로소득자)
    const standardDeduction = Math.min(annualSalary * 0.2, 3000000); // 표준공제 (최대 300만원)

    const totalDeduction =
      basicDeduction + additionalDeduction + standardDeduction;
    const taxableIncome = Math.max(0, annualSalary - totalDeduction);

    // 소득세 구간별 계산
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

    return Math.round(tax);
  }

  // 지방소득세 계산 (소득세의 10%)
  static calculateLocalIncomeTax(incomeTax) {
    return Math.round(incomeTax * 0.1);
  }

  // 실수령액 계산
  static calculateTakeHomePay(annualSalary) {
    const insurance = this.calculateInsurance(annualSalary);
    const incomeTax = this.calculateIncomeTax(annualSalary);
    const localIncomeTax = this.calculateLocalIncomeTax(incomeTax);

    const totalDeduction = insurance.total + incomeTax + localIncomeTax;
    const takeHomePay = annualSalary - totalDeduction;

    return {
      annualSalary,
      insurance,
      incomeTax,
      localIncomeTax,
      totalDeduction,
      takeHomePay,
      monthlyTakeHome: Math.round(takeHomePay / 12),
      hourlyTakeHome: Math.round(takeHomePay / 12 / 4.33 / 40), // 주 40시간 기준
    };
  }

  // 한국 세금 계산 (기존 함수 개선)
  static getKoreanTaxBrackets() {
    return [
      { min: 0, max: 12000000, rate: 6 },
      { min: 12000000, max: 46000000, rate: 15 },
      { min: 46000000, max: 88000000, rate: 24 },
      { min: 88000000, max: 150000000, rate: 35 },
      { min: 150000000, max: Infinity, rate: 42 },
    ];
  }

  static calculateProgressiveTax(income) {
    const brackets = this.getKoreanTaxBrackets();
    let tax = 0;
    let remainingIncome = income;

    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;

      const taxableAmount = Math.min(
        remainingIncome,
        bracket.max - bracket.min
      );
      tax += taxableAmount * (bracket.rate / 100);
      remainingIncome -= taxableAmount;
    }

    return tax;
  }
}

// 입력 검증
function validateInputs() {
  const amount = salaryAmount.value;
  const hours = workHours.value;
  const days = workDays.value;
  const tax = taxRate.value;

  // 금액 검증
  if (amount && !SalaryUtils.validateInput(amount, 0)) {
    salaryAmount.style.borderColor = "#e53e3e";
    return false;
  } else {
    salaryAmount.style.borderColor = "#e2e8f0";
  }

  // 근무시간 검증
  if (hours && !SalaryUtils.validateInput(hours, 1, 168)) {
    workHours.style.borderColor = "#e53e3e";
    return false;
  } else {
    workHours.style.borderColor = "#e2e8f0";
  }

  // 근무일수 검증
  if (days && !SalaryUtils.validateInput(days, 1, 7)) {
    workDays.style.borderColor = "#e53e3e";
    return false;
  } else {
    workDays.style.borderColor = "#e2e8f0";
  }

  // 세율 검증
  if (tax && !SalaryUtils.validateInput(tax, 0, 100)) {
    taxRate.style.borderColor = "#e53e3e";
    return false;
  } else {
    taxRate.style.borderColor = "#e2e8f0";
  }

  return true;
}

// 입력 필드에 실시간 검증 추가
[salaryAmount, workHours, workDays, taxRate].forEach((input) => {
  input.addEventListener("input", validateInputs);
});

// 계산기 초기화
document.addEventListener("DOMContentLoaded", () => {
  const calculator = new SalaryCalculator();

  // 페이지 로드 시 기본값으로 계산
  calculator.calculate();

  // 입력 필드 포커스 시 전체 선택
  [salaryAmount, workHours, workDays, bonus, taxRate].forEach((input) => {
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
    salaryAmount.value = "";
    salaryAmount.focus();
  }
});

// 반응형 디자인을 위한 리사이즈 이벤트
window.addEventListener("resize", () => {
  // 모바일에서 레이아웃 조정
  if (window.innerWidth <= 768) {
    document.body.classList.add("mobile-layout");
  } else {
    document.body.classList.remove("mobile-layout");
  }
});

// 초기 모바일 레이아웃 체크
if (window.innerWidth <= 768) {
  document.body.classList.add("mobile-layout");
}
