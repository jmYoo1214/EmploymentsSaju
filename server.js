const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어
app.use(
  cors({
    origin: [
      "https://dendilstory.co.kr",
      "https://www.dendilstory.co.kr",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// GPT API 연동을 위한 OpenAI 클라이언트 (선택사항)
let openai = null;
if (process.env.OPENAI_API_KEY) {
  try {
    const OpenAI = require("openai");
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    console.log("GPT API 연동이 활성화되었습니다.");
  } catch (error) {
    console.error("OpenAI 클라이언트 초기화 오류:", error);
    openai = null;
  }
} else {
  console.log("GPT API 키가 설정되지 않았습니다. 기본 운세를 사용합니다.");
}

// 운세 데이터
const fortuneData = {
  // 점수별로 분리된 운세 데이터
  overallByScore: {
    5: [
      {
        text: "오늘은 매우 좋은 하루가 될 것입니다. 모든 일이 순조롭게 진행되며 큰 성과를 얻을 수 있습니다.",
        summary:
          "최고의 하루가 기다리고 있습니다.\n모든 일이 순조롭게 진행되며,\n큰 성과와 기쁨을 얻을 수 있는 날입니다.",
      },
      {
        text: "예상치 못한 큰 기회가 찾아올 수 있는 날입니다. 준비된 자에게 행운이 따르니 적극적으로 행동하세요.",
        summary:
          "큰 기회가 찾아오는 날입니다.\n준비된 자에게 행운이 따르며,\n적극적인 행동으로 큰 성공을 얻을 수 있습니다.",
      },
      {
        text: "오늘은 모든 면에서 탁월한 하루입니다. 업무, 재물, 인연 모든 것이 좋은 방향으로 흘러갑니다.",
        summary:
          "모든 면에서 탁월한 하루입니다.\n업무, 재물, 인연 모든 것이 좋은 방향으로 흐르며,\n완벽한 하루를 보낼 수 있습니다.",
      },
    ],
    4: [
      {
        text: "오늘은 전반적으로 좋은 하루가 될 것 같습니다. 긍정적인 마음가짐으로 하면 좋은 결과를 얻을 수 있습니다.",
        summary:
          "전반적으로 좋은 하루입니다.\n긍정적인 마음가짐으로 하면,\n좋은 결과를 얻을 수 있는 날입니다.",
      },
      {
        text: "새로운 기회가 찾아올 수 있는 날입니다. 주변을 살펴보고 기회를 놓치지 마세요.",
        summary:
          "새로운 기회가 찾아올 날입니다.\n주변을 살펴보고 기회를 포착하면,\n좋은 결과를 얻을 수 있습니다.",
      },
      {
        text: "오늘은 안정적이고 평온한 하루입니다. 무리하지 말고 계획대로 진행하면 좋은 결과가 있을 것입니다.",
        summary:
          "안정적이고 평온한 하루입니다.\n무리하지 말고 계획대로 진행하면,\n좋은 결과를 얻을 수 있는 날입니다.",
      },
    ],
    3: [
      {
        text: "오늘은 신중하게 행동하되 긍정적인 마음가짐을 유지하세요. 조금만 노력하면 좋은 결과를 얻을 수 있습니다.",
        summary:
          "신중함과 긍정이 필요한 하루입니다.\n조금만 노력하면 좋은 결과를 얻을 수 있으며,\n긍정적인 마음가짐이 중요합니다.",
      },
      {
        text: "오늘은 휴식을 취하며 내일을 준비하는 것이 좋겠습니다. 무리하지 말고 차근차근 진행하세요.",
        summary:
          "휴식과 준비가 중요한 날입니다.\n무리하지 말고 차근차근 진행하며,\n내일을 위한 준비를 하는 것이 좋겠습니다.",
      },
      {
        text: "조심스럽게 행동하되 긍정적인 마음가짐을 유지하세요. 작은 노력으로도 좋은 변화를 만들 수 있습니다.",
        summary:
          "신중함과 긍정이 필요한 하루입니다.\n작은 노력으로도 좋은 변화를 만들 수 있으며,\n긍정적인 마음가짐을 유지하세요.",
      },
    ],
  },
  // 기존 호환성을 위한 데이터
  overall: [
    "오늘은 전반적으로 좋은 하루가 될 것 같습니다.",
    "새로운 기회가 찾아올 수 있는 날입니다.",
    "조심스럽게 행동하되 긍정적인 마음가짐을 유지하세요.",
    "오늘은 휴식을 취하며 내일을 준비하는 것이 좋겠습니다.",
    "예상치 못한 좋은 소식이 있을 수 있습니다.",
  ],
  overallSummary: [
    "긍정적인 에너지가 넘치는 하루입니다.\n새로운 기회가 찾아올 수 있는 날이며,\n작은 노력으로 큰 성과를 얻을 수 있습니다.",
    "새로운 기회의 문이 열리는 날입니다.\n과감한 도전과 적극적인 자세가 필요하며,\n주변 사람들의 도움을 받을 수 있는 좋은 시기입니다.",
    "신중함과 긍정이 필요한 하루입니다.\n서두르지 말고 차근차근 진행하되,\n긍정적인 마음가짐으로 하루를 시작하세요.",
    "휴식과 준비가 중요한 날입니다.\n오늘은 쉬어가며 내일을 위한 계획을 세우고,\n몸과 마음의 균형을 맞추는 것이 좋겠습니다.",
    "기대 이상의 좋은 소식이 찾아올 날입니다.\n예상치 못한 기회나 좋은 인연이 있을 수 있으니,\n주변을 살펴보고 귀 기울여보세요.",
  ],
  work: [
    "업무에서 좋은 결과를 얻을 수 있습니다.",
    "동료들과의 협력이 중요한 하루입니다.",
    "새로운 프로젝트에 도전해보세요.",
    "기존 업무를 정리하고 정리하는 것이 좋겠습니다.",
    "상사와의 대화에서 좋은 결과를 얻을 수 있습니다.",
  ],
  workSummary: [
    "업무 성과가 빛나는 하루",
    "협력과 소통이 성공의 열쇠",
    "새로운 도전의 기회",
    "체계적인 정리와 마무리가 필요한 날",
    "상사와의 원활한 소통으로 발전 가능",
  ],
  money: [
    "재정 관리에 신경 쓰세요.",
    "예상치 못한 수입이 있을 수 있습니다.",
    "투자보다는 저축에 집중하세요.",
    "소비를 줄이고 절약하는 것이 좋겠습니다.",
    "재정 계획을 세우는 좋은 날입니다.",
  ],
  moneySummary: [
    "신중한 재정 관리가 필요한 하루",
    "예상치 못한 수입의 기회",
    "저축과 안정이 우선",
    "절약과 절제로 재정 안정",
    "미래를 위한 계획 수립의 좋은 날",
  ],
  love: [
    "새로운 만남의 기회가 있을 수 있습니다.",
    "기존 관계에서 발전이 있을 수 있습니다.",
    "솔직한 대화가 필요한 시기입니다.",
    "혼자만의 시간을 갖는 것이 좋겠습니다.",
    "사랑하는 사람과의 시간을 소중히 여기세요.",
  ],
  loveSummary: [
    "새로운 인연의 기회가 찾아올 날",
    "기존 관계가 한 단계 발전할 수 있는 날",
    "솔직한 대화로 관계 개선",
    "혼자만의 시간으로 자신을 돌아보는 날",
    "소중한 사람과의 시간을 더욱 소중히",
  ],
  health: [
    "충분한 휴식을 취하세요.",
    "규칙적인 운동이 도움이 될 것입니다.",
    "스트레스 관리에 신경 쓰세요.",
    "건강한 식단을 유지하세요.",
    "몸의 신호에 귀 기울이세요.",
  ],
  healthSummary: [
    "충분한 휴식으로 에너지 충전",
    "규칙적인 운동으로 건강 관리",
    "스트레스 관리가 중요한 하루",
    "건강한 식단으로 몸을 돌보는 날",
    "몸의 신호에 귀 기울이며 건강 챙기기",
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

// 기본 운세 생성 함수
function generateBasicFortune() {
  const random = Math.random();
  const workIndex = Math.floor(random * fortuneData.work.length);
  const moneyIndex = Math.floor(random * fortuneData.money.length);
  const loveIndex = Math.floor(random * fortuneData.love.length);
  const healthIndex = Math.floor(random * fortuneData.health.length);

  // 별점 생성 (3-5점)
  const overallScore = Math.floor(random * 3) + 3;
  const workScore = Math.floor(random * 3) + 3;
  const moneyScore = Math.floor(random * 3) + 3;
  const loveScore = Math.floor(random * 3) + 3;
  const healthScore = Math.floor(random * 3) + 3;

  // 총점 계산 (100점 만점 기준)
  // 각 점수(3-5점)를 20점 만점으로 변환하여 합산 (점수 × 4)
  const totalScore =
    overallScore * 4 +
    workScore * 4 +
    moneyScore * 4 +
    loveScore * 4 +
    healthScore * 4;

  // 별점에 맞는 운세 선택
  const overallOptions = fortuneData.overallByScore[overallScore];
  const overallSelected =
    overallOptions[Math.floor(random * overallOptions.length)];

  return {
    totalScore: totalScore,
    overall: {
      score: overallScore,
      summary: overallSelected.summary,
      text: overallSelected.text,
    },
    work: {
      score: workScore,
      summary: fortuneData.workSummary[workIndex],
      text: fortuneData.work[workIndex],
    },
    money: {
      score: moneyScore,
      summary: fortuneData.moneySummary[moneyIndex],
      text: fortuneData.money[moneyIndex],
    },
    love: {
      score: loveScore,
      summary: fortuneData.loveSummary[loveIndex],
      text: fortuneData.love[loveIndex],
    },
    health: {
      score: healthScore,
      summary: fortuneData.healthSummary[healthIndex],
      text: fortuneData.health[healthIndex],
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

// GPT를 사용한 운세 생성 함수
async function generateGPTFortune(birthDate, birthTime, gender, calendarType) {
  if (!openai) {
    console.log("GPT API 키가 설정되지 않았습니다. 기본 운세를 생성합니다.");
    return generateBasicFortune();
  }

  try {
    // 12지지 시간 변환
    const timeNames = [
      "자시(23:30-01:29)",
      "축시(01:30-03:29)",
      "인시(03:30-05:29)",
      "묘시(05:30-07:29)",
      "진시(07:30-09:29)",
      "사시(09:30-11:29)",
      "오시(11:30-13:29)",
      "미시(13:30-15:29)",
      "신시(15:30-17:29)",
      "유시(17:30-19:29)",
      "술시(19:30-21:29)",
      "해시(21:30-23:29)",
    ];

    const timeName = timeNames[parseInt(birthTime)] || "알 수 없음";

    // 오늘 날짜 정보
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    const dayOfWeek = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ][today.getDay()];
    const month = today.getMonth() + 1;
    const season =
      month >= 3 && month <= 5
        ? "봄"
        : month >= 6 && month <= 8
        ? "여름"
        : month >= 9 && month <= 11
        ? "가을"
        : "겨울";

    const prompt = `당신은 30년 이상의 경력을 가진 전문 사주명리학자이자 직장인 상담 전문가입니다. 다음 정보를 바탕으로 오늘의 운세를 작성해주세요.

**사주 정보:**
- 출생일: ${birthDate} (${calendarType === "solar" ? "양력" : "음력"})
- 출생시간: ${timeName}
- 성별: ${gender === "male" ? "남성" : "여성"}

**오늘 날짜 정보:**
- 오늘 날짜: ${todayDate} (${dayOfWeek})
- 계절: ${season}
- 월: ${month}월

**사주 분석 지침:**
1. **음양오행 분석**: 출생일과 시간을 바탕으로 일간(日干)의 오행(木火土金水)을 분석하고, 오늘 날짜와의 상생상극 관계를 고려하세요
2. **십성 분석**: 관성(官星), 재성(財星), 인성(印星), 식상(食傷), 비겁(比劫)의 강약을 고려하여 각 영역의 운세를 판단하세요
3. **시간대별 운세**: 출생시간(시주)과 오늘의 시간대별 에너지 흐름을 고려하여 구체적인 행동 지침을 제공하세요
4. **계절 고려**: ${season}철의 특성과 개인의 오행이 조화를 이루는지 분석하세요

**운세 작성 원칙:**
1. **개인화**: 출생일, 출생시간, 성별을 종합적으로 고려하여 개인에게 맞는 운세를 작성하세요
2. **실용성**: 직장인에게 즉시 활용 가능한 구체적인 행동 지침을 포함하세요
3. **균형**: 긍정적이면서도 현실적이며, 과도한 낙관이나 비관을 피하세요
4. **점수 일관성**: 점수와 설명의 긍정 정도가 반드시 일치해야 합니다
   - 5점: 매우 긍정적 (예: "모든 일이 순조롭게 진행", "큰 성과", "완벽한 하루", "기회가 넘치는 날")
   - 4점: 좋은 운세 (예: "전반적으로 좋은 하루", "좋은 결과 기대", "안정적이고 순탄한 하루")
   - 3점: 보통/신중 (예: "신중하게 행동 필요", "휴식과 준비가 중요", "조금만 노력하면 개선")

**각 영역별 작성 가이드:**

1. **직장운 (work)**:
   - 관성(리더십, 책임감)과 재성(경제적 안정)의 관계를 분석
   - 오늘의 업무 효율성, 동료 관계, 상사와의 소통, 프로젝트 진행 상황을 구체적으로 언급
   - 시간대별 업무 추천 (예: "오전에는 계획 수립, 오후에는 실행에 집중")
   - 회의, 협상, 프레젠테이션 등 구체적 상황에 대한 조언 포함

2. **재물운 (money)**:
   - 재성의 강약과 오늘 날짜와의 관계 분석
   - 저축, 투자, 소비, 계약 등 구체적 재정 행동에 대한 조언
   - 금전 거래의 적절한 시간대 제시
   - 재정 관리 팁 포함

3. **연애운 (love)**:
   - 정재(正財) 또는 편재(偏財)의 상태를 고려
   - 기존 관계 발전, 새로운 만남, 소통, 갈등 해소 등 구체적 상황 언급
   - 데이트나 만남의 적절한 시간대와 장소 제안
   - 솔직한 대화나 로맨틱한 제안 등 행동 지침 포함

4. **건강운 (health)**:
   - 오행의 균형과 오늘의 에너지 흐름 분석
   - 운동, 식단, 휴식, 스트레스 관리 등 구체적 건강 관리 방법
   - 주의해야 할 신체 부위나 증상 언급
   - 건강 검진이나 치료의 적절한 시기 제안

5. **전체 운세 (overall)**:
   - 오늘 하루 전체적인 에너지 흐름과 대운세를 종합적으로 설명
   - 사주 이론을 바탕으로 한 개인화된 해석
   - 오늘의 핵심 메시지와 주의사항

**총점 계산:**
- 각 영역 점수(3-5점)를 20점 만점으로 변환하여 합산
- 각 점수 × 4 = 해당 영역 점수 (12-20점)
- 5개 영역 합계 = 총점 (60-100점 범위, 100점 만점)

**응답 형식 (JSON만 반환, 주석 없이):**
{
  "totalScore": 숫자,
  "overall": {
    "score": 3-5,
    "summary": "오늘 하루 전체 운세를 3줄로 요약 (각 줄 20-30자, 줄바꿈은 \\n 사용)",
    "text": "사주 이론을 바탕으로 한 전체 운세 설명 (100-150자). 점수에 맞는 긍정 정도로 작성"
  },
  "work": {
    "score": 3-5,
    "summary": "직장운 한 줄 요약 (15자 이내)",
    "text": "구체적인 직장운 조언 (80-120자). 시간대별 행동 지침 포함",
    "timeGuidance": "시간대별 추천 행동 (예: '오전: 계획 수립, 오후: 실행 집중')"
  },
  "money": {
    "score": 3-5,
    "summary": "재물운 한 줄 요약 (15자 이내)",
    "text": "구체적인 재물운 조언 (80-120자). 저축/투자/소비 등 구체적 행동 포함",
    "action": "오늘 추천하는 재정 행동 (예: '중요한 계약은 오후 2-4시에')"
  },
  "love": {
    "score": 3-5,
    "summary": "연애운 한 줄 요약 (15자 이내)",
    "text": "구체적인 연애운 조언 (80-120자). 관계 발전이나 만남에 대한 구체적 조언 포함",
    "tip": "오늘의 연애 팁 (예: '솔직한 대화가 관계를 개선시킬 수 있는 날')"
  },
  "health": {
    "score": 3-5,
    "summary": "건강운 한 줄 요약 (15자 이내)",
    "text": "구체적인 건강운 조언 (80-120자). 운동, 식단, 휴식 등 구체적 방법 포함",
    "caution": "주의해야 할 건강 사항 (예: '목과 어깨 근육에 주의')"
  },
  "advice": "오늘 하루를 위한 핵심 조언 (50-80자)",
  "lucky": {
    "color": "행운의 색깔 (오행과 조화를 이루는 색)",
    "number": 숫자,
    "direction": "행운의 방향 (팔방위 중 하나)"
  },
  "taboos": ["피해야 할 행동 1", "피해야 할 행동 2"],
  "bestTime": "오늘 가장 좋은 시간대 (예: '오후 2시-4시')",
  "sajuInsight": "사주 이론 기반 오늘의 인사이트 (50-80자, 선택사항)"
}`;

    console.log("GPT API 호출 중...");
    const startTime = Date.now();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "당신은 30년 이상의 경력을 가진 전문 사주명리학자이자 직장인 상담 전문가입니다. 음양오행, 십성, 일간 등 사주 이론을 깊이 이해하고 있으며, 이를 바탕으로 개인화된 운세를 제공합니다. 항상 JSON 형식으로만 응답하세요. **중요 규칙**: 1) 점수와 설명의 긍정 정도가 반드시 일치해야 합니다. 2) 사주 이론을 바탕으로 한 분석을 포함하되, 직장인에게 실용적인 조언을 제공하세요. 3) 구체적인 행동 지침과 시간대별 추천을 포함하세요. 4) 총점 계산: 5개 영역(overall, work, money, love, health)의 점수를 합산하여 totalScore 필드에 포함하세요. 5) 새로운 필드들(timeGuidance, action, tip, caution, taboos, bestTime, sajuInsight)을 적절히 포함하세요.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 2000,
      temperature: 0.7,
      top_p: 0.9,
    });

    const response = completion.choices[0].message.content;
    const endTime = Date.now();

    console.log(`GPT API 응답 완료 (${endTime - startTime}ms)`);
    console.log(`사용된 토큰: ${completion.usage?.total_tokens || "N/A"}`);

    // JSON 파싱 시도
    try {
      // 응답에서 JSON 부분만 추출
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : response;

      const fortune = JSON.parse(jsonString);

      // 점수 유효성 검사
      const validateScore = (score) =>
        Math.max(1, Math.min(5, parseInt(score) || 3));

      // 점수에 맞는 설명 가져오기
      const overallScore = validateScore(fortune.overall?.score);
      const overallOptions = fortuneData.overallByScore[overallScore];
      const overallSelected = overallOptions
        ? overallOptions[Math.floor(Math.random() * overallOptions.length)]
        : null;

      // 점수 계산
      const workScore = validateScore(fortune.work?.score);
      const moneyScore = validateScore(fortune.money?.score);
      const loveScore = validateScore(fortune.love?.score);
      const healthScore = validateScore(fortune.health?.score);

      // 총점 계산 (100점 만점 기준)
      // 각 점수(3-5점)를 20점 만점으로 변환하여 합산 (점수 × 4)
      // GPT에서 제공한 총점이 있으면 사용하고, 없으면 계산
      const totalScore =
        fortune.totalScore ||
        overallScore * 4 +
          workScore * 4 +
          moneyScore * 4 +
          loveScore * 4 +
          healthScore * 4;

      return {
        totalScore: totalScore,
        overall: {
          score: overallScore,
          summary:
            fortune.overall?.summary ||
            overallSelected?.summary ||
            fortuneData.overallSummary[
              Math.floor(Math.random() * fortuneData.overallSummary.length)
            ],
          text:
            fortune.overall?.text ||
            overallSelected?.text ||
            "오늘은 새로운 기회가 찾아올 수 있는 날입니다.",
        },
        work: {
          score: workScore,
          summary:
            fortune.work?.summary ||
            fortuneData.workSummary[
              Math.floor(Math.random() * fortuneData.workSummary.length)
            ],
          text: fortune.work?.text || "업무에서 좋은 결과를 얻을 수 있습니다.",
          timeGuidance: fortune.work?.timeGuidance || null,
        },
        money: {
          score: moneyScore,
          summary:
            fortune.money?.summary ||
            fortuneData.moneySummary[
              Math.floor(Math.random() * fortuneData.moneySummary.length)
            ],
          text: fortune.money?.text || "재정 관리에 신경 쓰세요.",
          action: fortune.money?.action || null,
        },
        love: {
          score: loveScore,
          summary:
            fortune.love?.summary ||
            fortuneData.loveSummary[
              Math.floor(Math.random() * fortuneData.loveSummary.length)
            ],
          text: fortune.love?.text || "새로운 만남의 기회가 있을 수 있습니다.",
          tip: fortune.love?.tip || null,
        },
        health: {
          score: healthScore,
          summary:
            fortune.health?.summary ||
            fortuneData.healthSummary[
              Math.floor(Math.random() * fortuneData.healthSummary.length)
            ],
          text: fortune.health?.text || "충분한 휴식을 취하세요.",
          caution: fortune.health?.caution || null,
        },
        advice: fortune.advice || "긍정적인 마음가짐으로 하루를 시작하세요.",
        lucky: {
          color: fortune.lucky?.color || "파란색",
          number: parseInt(fortune.lucky?.number) || 7,
          direction: fortune.lucky?.direction || "동쪽",
        },
        taboos: fortune.taboos || [],
        bestTime: fortune.bestTime || null,
        sajuInsight: fortune.sajuInsight || null,
      };
    } catch (parseError) {
      console.error("GPT 응답 파싱 오류:", parseError);
      console.error("원본 응답:", response);
      return generateBasicFortune();
    }
  } catch (error) {
    console.error("GPT API 오류:", error);

    // API 키 관련 오류인 경우 더 자세한 로그
    if (error.message && error.message.includes("Bearer")) {
      console.error("API 키 형식 오류: Bearer 토큰이 올바르지 않습니다.");
      console.error("API 키를 확인하고 올바른 형식으로 설정해주세요.");
    } else if (error.status === 401) {
      console.error("API 키 인증 오류: 유효하지 않은 API 키입니다.");
    } else if (error.status === 429) {
      console.error("API 사용량 초과: 잠시 후 다시 시도해주세요.");
    }

    return generateBasicFortune();
  }
}

// API 라우트
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "main.html"));
});

// ads.txt 파일 제공 (Google AdSense 요구사항)
app.get("/ads.txt", (req, res) => {
  res.type("text/plain");
  res.sendFile(path.join(__dirname, "ads.txt"));
});

// robots.txt 파일 제공
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.sendFile(path.join(__dirname, "robots.txt"));
});

// sitemap.xml 파일 제공
app.get("/sitemap.xml", (req, res) => {
  res.type("application/xml");
  res.sendFile(path.join(__dirname, "sitemap.xml"));
});

// GPT 연동 상태 확인 API
app.get("/api/status", (req, res) => {
  res.json({
    gptEnabled: !!openai,
    timestamp: new Date().toISOString(),
    message: openai
      ? "GPT API 연동이 활성화되었습니다."
      : "GPT API 연동이 비활성화되었습니다.",
  });
});

// 운세 계산 API
app.post("/api/fortune", async (req, res) => {
  try {
    const {
      birthDate,
      birthTime,
      gender,
      calendarType,
      useGPT = false,
    } = req.body;

    // 입력 검증
    if (!birthDate || !birthTime || !gender || !calendarType) {
      return res.status(400).json({
        error: "모든 필수 정보를 입력해주세요.",
      });
    }

    let fortune;

    if (useGPT && openai) {
      fortune = await generateGPTFortune(
        birthDate,
        birthTime,
        gender,
        calendarType
      );
    } else {
      fortune = generateBasicFortune();
    }

    res.json({
      success: true,
      fortune: fortune,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("운세 계산 오류:", error);
    res.status(500).json({
      error: "운세 계산 중 오류가 발생했습니다.",
    });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`http://localhost:${PORT}에서 확인하세요.`);

  if (openai) {
    console.log("GPT API 연동이 활성화되었습니다.");
  } else {
    console.log(
      "GPT API 연동이 비활성화되었습니다. (OPENAI_API_KEY를 설정하세요)"
    );
  }
});
