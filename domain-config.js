// 도메인 설정 파일
const DomainConfig = {
  // 프로덕션 도메인
  production: "https://dendilstory.co.kr",

  // 개발 도메인
  development: "http://localhost:3000",

  // 현재 환경에 따른 도메인 반환
  getCurrentDomain: function () {
    if (process.env.NODE_ENV === "production") {
      return this.production;
    }
    return this.development;
  },

  // CORS 설정용 도메인 목록
  allowedOrigins: [
    "https://dendilstory.co.kr",
    "https://www.dendilstory.co.kr",
    "http://localhost:3000",
  ],
};

// 서버에서 사용할 수 있도록 내보내기
if (typeof module !== "undefined" && module.exports) {
  module.exports = DomainConfig;
}
