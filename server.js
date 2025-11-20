const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// 프록시 뒤에서 실행될 경우 IP 주소를 올바르게 가져오기 위해 설정
app.set("trust proxy", true);

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
    // API 키에서 공백 및 특수 문자 제거
    let apiKey = process.env.OPENAI_API_KEY.trim();

    // 모든 공백 문자 제거 (일반 공백, 줄바꿈, 탭 등)
    apiKey = apiKey.replace(/\s+/g, "");

    // 디버깅: API 키 정보 확인 (보안을 위해 일부만 출력)
    console.log(`API 키 길이: ${apiKey.length}`);
    console.log(`API 키 시작 부분: ${apiKey.substring(0, 10)}...`);
    console.log(`API 키 첫 3글자: "${apiKey.substring(0, 3)}"`);
    console.log(
      `API 키 첫 3글자 코드: ${apiKey
        .substring(0, 3)
        .split("")
        .map((c) => c.charCodeAt(0))
        .join(",")}`
    );
    console.log(`'sk-'로 시작하는지 확인: ${apiKey.startsWith("sk-")}`);

    // API 키 형식 검증 (sk- 또는 sk-proj-로 시작해야 함)
    if (!apiKey.startsWith("sk-")) {
      console.error(
        "API 키 형식 오류: OpenAI API 키는 'sk-'로 시작해야 합니다."
      );
      console.error(`실제 API 키 시작 부분: "${apiKey.substring(0, 15)}"`);
      console.error(
        `API 키 첫 글자: "${apiKey.charAt(0)}" (코드: ${apiKey.charCodeAt(0)})`
      );
      openai = null;
    } else {
      openai = new OpenAI({
        apiKey: apiKey,
      });
      console.log("GPT API 연동이 활성화되었습니다.");
    }
  } catch (error) {
    console.error("OpenAI 클라이언트 초기화 오류:", error);
    openai = null;
  }
} else {
  console.log("GPT API 키가 설정되지 않았습니다. 기본 운세를 사용합니다.");
}

// GPT 운세 캐시 (하루 단위)
const fortuneCache = new Map();

// 한국 시간대(KST) 기준 날짜 가져오기 헬퍼 함수
function getKSTDate() {
  const now = new Date();
  const kstOffset = 9 * 60; // UTC+9 (분 단위)
  const kstTime = new Date(
    now.getTime() + (kstOffset - now.getTimezoneOffset()) * 60000
  );
  return kstTime.toISOString().split("T")[0];
}

// 캐시 키 생성 함수
function generateCacheKey(birthDate, birthTime, gender, calendarType, req) {
  // 한국 시간대(KST, UTC+9) 기준으로 오늘 날짜를 가져옴
  const today = getKSTDate();

  // 생년월일 기반으로만 캐싱 (같은 생년월일은 하루에 한 번만)
  // IP/User-Agent는 매번 달라질 수 있어서 제외
  return `${birthDate}-${birthTime}-${gender}-${calendarType}-${today}`;
}

// 캐시 정리 함수 (하루가 지난 캐시 삭제)
function cleanExpiredCache() {
  const today = getKSTDate();
  const keysToDelete = [];

  for (const [key, value] of fortuneCache.entries()) {
    // 캐시 키에서 날짜 추출 (마지막 부분)
    const cacheDate = key.split("-").slice(-1)[0];
    if (cacheDate !== today) {
      keysToDelete.push(key);
    }
  }

  keysToDelete.forEach((key) => fortuneCache.delete(key));
  if (keysToDelete.length > 0) {
    console.log(`만료된 캐시 ${keysToDelete.length}개 삭제됨`);
  }
  console.log(`현재 캐시 크기: ${fortuneCache.size}개`);
}

// 매 시간마다 캐시 정리 (자정에 정리되도록)
setInterval(cleanExpiredCache, 60 * 60 * 1000); // 1시간마다
cleanExpiredCache(); // 시작 시 한 번 실행

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
async function generateGPTFortune(
  birthDate,
  birthTime,
  gender,
  calendarType,
  req
) {
  if (!openai) {
    console.log("GPT API 키가 설정되지 않았습니다. 기본 운세를 생성합니다.");
    return generateBasicFortune();
  }

  // 캐시 키 생성 (브라우저/IP 정보 포함)
  const cacheKey = generateCacheKey(
    birthDate,
    birthTime,
    gender,
    calendarType,
    req
  );

  // 캐시 확인
  if (fortuneCache.has(cacheKey)) {
    console.log(`✅ 캐시 히트! 운세 결과를 가져옵니다. (키: ${cacheKey})`);
    const cachedFortune = fortuneCache.get(cacheKey);
    return cachedFortune;
  }

  console.log(
    `❌ 캐시 미스. GPT API 호출합니다. (키: ${cacheKey}, 현재 캐시 크기: ${fortuneCache.size})`
  );

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

    // 오늘 날짜 정보 (한국 시간대 기준)
    const todayDate = getKSTDate();
    // 한국 시간대 기준으로 날짜 객체 생성
    const now = new Date();
    const kstOffset = 9 * 60; // UTC+9 (분 단위)
    const kstTime = new Date(
      now.getTime() + (kstOffset - now.getTimezoneOffset()) * 60000
    );
    const dayOfWeek = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ][kstTime.getUTCDay()];
    const month = kstTime.getUTCMonth() + 1;
    const season =
      month >= 3 && month <= 5
        ? "봄"
        : month >= 6 && month <= 8
        ? "여름"
        : month >= 9 && month <= 11
        ? "가을"
        : "겨울";

    const prompt = `사주명리학자로서 다음 정보로 오늘의 운세를 작성하세요.

사주: ${birthDate}(${
      calendarType === "solar" ? "양력" : "음력"
    }), ${timeName}, ${gender === "male" ? "남성" : "여성"}
오늘: ${todayDate}(${dayOfWeek}), ${season}철

규칙:
- 점수(3-5)와 설명 긍정도 일치
- 각 영역 60-80자로 간결하게
- 실용적 조언 포함

JSON만 반환:
{
  "totalScore": 숫자(60-100),
  "overall": {"score": 3-5, "summary": "3줄 요약(각 20자)", "text": "전체 운세 80자"},
  "work": {"score": 3-5, "summary": "15자", "text": "직장운 60자", "timeGuidance": "시간대 추천"},
  "money": {"score": 3-5, "summary": "15자", "text": "재물운 60자", "action": "재정 행동"},
  "love": {"score": 3-5, "summary": "15자", "text": "연애운 60자", "tip": "연애 팁"},
  "health": {"score": 3-5, "summary": "15자", "text": "건강운 60자", "caution": "주의사항"},
  "advice": "핵심 조언 50자",
  "lucky": {"color": "색깔", "number": 숫자, "direction": "방향"},
  "taboos": ["행동1", "행동2"],
  "bestTime": "시간대",
  "sajuInsight": "인사이트 50자"
}`;

    console.log("GPT API 호출 중...");
    const startTime = Date.now();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "전문 사주명리학자. JSON만 반환. 점수와 설명 긍정도 일치. 간결하고 실용적 조언.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 1200,
      temperature: 0.7,
      top_p: 0.9,
    });

    const response = completion.choices[0].message.content;
    const endTime = Date.now();

    console.log(`✅ GPT API 응답 완료 (${endTime - startTime}ms)`);
    console.log(`사용된 토큰: ${completion.usage?.total_tokens || "N/A"}`);
    console.log(`응답 길이: ${response?.length || 0}자`);
    console.log(`응답 미리보기: ${response?.substring(0, 100) || "없음"}...`);

    // JSON 파싱 시도
    try {
      // 응답에서 JSON 부분만 추출
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : response;

      if (!jsonString) {
        throw new Error("JSON 응답을 찾을 수 없습니다.");
      }

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

      // 캐시에 저장 (result가 유효한 경우에만)
      try {
        if (result && typeof result === "object" && result.totalScore) {
          fortuneCache.set(cacheKey, result);
          console.log(
            `💾 캐시 저장 완료! (키: ${cacheKey}, 캐시 크기: ${fortuneCache.size}, totalScore: ${result.totalScore})`
          );
        } else {
          console.error(`❌ 캐시 저장 실패: result가 유효하지 않습니다.`, {
            hasResult: !!result,
            isObject: typeof result === "object",
            hasTotalScore: result?.totalScore,
            resultKeys: result ? Object.keys(result) : [],
          });
        }
      } catch (cacheError) {
        console.error(`❌ 캐시 저장 중 에러 발생:`, cacheError);
      }

      return result;
    } catch (parseError) {
      console.error("GPT 응답 파싱 오류:", parseError);
      console.error("원본 응답:", response);
      console.error(`❌ 파싱 에러로 인해 캐시 저장하지 않음 (키: ${cacheKey})`);
      return generateBasicFortune();
    }
  } catch (error) {
    console.error("GPT API 오류:", error);
    console.error("에러 타입:", error.constructor.name);
    console.error("에러 메시지:", error.message);
    console.error(`❌ API 에러로 인해 캐시 저장하지 않음 (키: ${cacheKey})`);

    // API 키 관련 오류인 경우 더 자세한 로그
    if (error.message && error.message.includes("Bearer")) {
      console.error("API 키 형식 오류: Bearer 토큰이 올바르지 않습니다.");
      console.error("API 키를 확인하고 올바른 형식으로 설정해주세요.");
      console.error("API 키는 'sk-'로 시작해야 하며 공백이 없어야 합니다.");
    } else if (error.status === 401) {
      console.error("API 키 인증 오류: 유효하지 않은 API 키입니다.");
    } else if (error.status === 429) {
      console.error("API 사용량 초과: 잠시 후 다시 시도해주세요.");
    } else if (error.cause) {
      console.error("연결 오류:", error.cause.message);
    }

    console.log("기본 운세로 폴백합니다.");
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
    let usedGPT = false;

    if (useGPT && openai) {
      try {
        fortune = await generateGPTFortune(
          birthDate,
          birthTime,
          gender,
          calendarType,
          req
        );
        usedGPT = true;
      } catch (error) {
        console.error("GPT 운세 생성 실패, 기본 운세로 폴백:", error);
        fortune = generateBasicFortune();
        usedGPT = false;
      }
    } else {
      if (useGPT && !openai) {
        console.log("GPT API가 비활성화되어 있습니다. 기본 운세를 사용합니다.");
      }
      fortune = generateBasicFortune();
      usedGPT = false;
    }

    res.json({
      success: true,
      fortune: fortune,
      usedGPT: usedGPT,
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
