# 직장인 놀이터 (EmploymentsSaju)

직장인을 위한 유용한 도구들을 모아놓은 웹 서비스입니다.

## 🎯 개발 철학

**바이브 코딩** - 개발자와 사용자 모두가 즐거운 코딩 경험을 추구합니다.
실용적이면서도 재미있는 기능들로 일상에 활력을 불어넣는 것이 우리의 목표입니다.

## 🚀 주요 기능

- **연봉 계산기**: 실수령액을 정확하게 계산
- **세금 계산기**: 다양한 세금 계산 및 비교
- **오늘의 운세**: 사주 기반 운세 확인 (GPT 연동 가능)
- **급여 비교**: 업계별, 직급별 급여 비교 (준비중)
- **퇴직금 계산기**: 퇴직금 미리 계산 (준비중)
- **연차 계산기**: 연차 사용일 및 잔여일 계산 (준비중)

## 🎨 UI 개선사항

### 운세 페이지

- **달력 구분 버튼**: 양력/음력 선택을 위한 아름다운 카드형 버튼
- **성별 선택 버튼**: 남성/여성 선택을 위한 직관적인 UI
- **운세 보기 버튼**: 애니메이션과 호버 효과가 적용된 메인 버튼
- **반응형 디자인**: 모바일과 데스크톱에서 모두 최적화된 경험

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **AI Integration**: OpenAI GPT API (선택사항)
- **Styling**: Custom CSS with modern animations

## 📦 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정 (선택사항)

GPT 연동을 원한다면 `.env` 파일을 생성하고 OpenAI API 키를 설정하세요:

```bash
cp env.example .env
```

`.env` 파일에 다음 내용을 추가:

```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

#### OpenAI API 키 발급 방법:

1. [OpenAI 웹사이트](https://platform.openai.com/)에 가입
2. [API Keys 페이지](https://platform.openai.com/api-keys)에서 새 키 생성
3. 생성된 키를 `.env` 파일에 복사
4. 서버 재시작

### 3. 서버 실행

```bash
# 개발 모드
npm run dev

# 프로덕션 모드
npm start
```

### 4. 브라우저에서 확인

```
http://localhost:3000
```

## 🔮 GPT 연동 방법

### 1. OpenAI API 키 발급

1. [OpenAI 웹사이트](https://platform.openai.com/)에 가입
2. API 키 발급
3. `.env` 파일에 API 키 설정

### 2. GPT 연동 활성화

서버가 실행되면 자동으로 GPT API 키를 감지하고 연동합니다.

### 3. 운세 생성 방식

- **GPT 연동 시**: 사주 정보를 바탕으로 GPT가 개인화된 운세 생성
- **GPT 미연동 시**: 미리 정의된 운세 데이터에서 랜덤 선택

### 4. 💰 비용 정보 (2024년 기준)

- **GPT-3.5-turbo 요금**:
  - 입력 토큰: $0.0015 per 1K tokens
  - 출력 토큰: $0.002 per 1K tokens
- **예상 비용**:
  - 운세 1회: 약 $0.001-0.002 (1-2원)
  - 월 1,000회: 약 $1-2 (1,000-2,000원)
  - 월 10,000회: 약 $10-20 (10,000-20,000원)
- **비용 절약 팁**: GPT 연동이 비활성화되어도 기본 운세 서비스 이용 가능

## 📱 사용법

### 운세 보기

1. 출생일 선택
2. 양력/음력 선택
3. 출생시간 선택 (12지지)
4. 성별 선택
5. "운세 보기" 버튼 클릭

### 연봉 계산

1. 연봉 입력
2. 4대보험 자동 계산
3. 실수령액 확인

## 🎨 디자인 특징

- **그라데이션 배경**: 보라색 계열의 아름다운 그라데이션
- **글래스모피즘**: 반투명 효과와 블러 처리
- **애니메이션**: 부드러운 호버 효과와 로딩 애니메이션
- **반응형**: 모든 디바이스에서 최적화된 경험
- **접근성**: 키보드 네비게이션 지원

## 🔧 개발자 정보

- **개발자**: Your Name
- **버전**: 1.0.0
- **라이선스**: MIT

## 📝 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.
