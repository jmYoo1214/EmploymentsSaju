# Google AdSense 설정 가이드

## 📋 AdSense 계정 설정

### 1. Google AdSense 계정 생성

1. [Google AdSense 웹사이트](https://www.google.com/adsense/) 방문
2. Google 계정으로 로그인
3. "시작하기" 클릭하여 AdSense 계정 생성

### 2. 웹사이트 등록

1. AdSense 대시보드에서 "사이트" 메뉴 클릭
2. "사이트 추가" 버튼 클릭
3. 웹사이트 정보 입력:
   - **웹사이트 URL**: `https://dendilstory.co.kr`
   - **사이트 언어**: 한국어
   - **사이트 카테고리**: 기술 또는 비즈니스
   - **사이트 설명**: "직장인을 위한 유용한 도구들"

### 3. AdSense 코드 발급

1. "광고 단위" 메뉴로 이동
2. "디스플레이 광고" 선택
3. 광고 설정:
   - **광고 크기**: 반응형 (권장)
   - **광고 이름**: "메인 배너 광고"
   - **광고 위치**: 페이지 상단

## 🔧 프로젝트 설정

### 1. Publisher ID 교체

`main.html`과 `lunch-picker.html`에서 다음 부분을 찾아 실제 Publisher ID로 교체:

```html
<!-- 기존 -->
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
  crossorigin="anonymous"
></script>

<!-- 실제 Publisher ID로 교체 -->
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
  crossorigin="anonymous"
></script>
```

### 2. 광고 슬롯 ID 교체

각 페이지의 광고 단위에서 다음 부분을 실제 슬롯 ID로 교체:

```html
<!-- 기존 -->
<ins
  class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
  data-ad-slot="YOUR_AD_SLOT_ID"
  data-ad-format="auto"
  data-full-width-responsive="true"
></ins>

<!-- 실제 값으로 교체 -->
<ins
  class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-1234567890123456"
  data-ad-slot="9876543210"
  data-ad-format="auto"
  data-full-width-responsive="true"
></ins>
```

## 📱 광고 배치 전략

### 1. 메인 페이지 (`main.html`)

- **위치**: 도구 카드들 아래
- **크기**: 728x90 (데스크톱), 320x50 (모바일)
- **타입**: 반응형 배너 광고

### 2. 점심 뽑기 페이지 (`lunch-picker.html`)

- **위치**: 결과 섹션 아래
- **크기**: 300x250 (사각형)
- **타입**: 디스플레이 광고

### 3. 기타 페이지들

- 연봉 계산기, 세금 계산기, 칼로리 계산기, 운세 페이지에도 동일하게 적용

## 🚀 배포 및 테스트

### 1. 코드 업데이트

```bash
# 변경사항 커밋
git add .
git commit -m "Add Google AdSense integration"
git push origin main
```

### 2. AdSense 승인 대기

- AdSense 팀에서 사이트 검토 (보통 1-7일)
- 승인 후 광고가 실제로 표시됨

### 3. 광고 성능 모니터링

- AdSense 대시보드에서 클릭률(CTR) 확인
- 수익 및 노출수 모니터링
- 광고 배치 최적화

## ⚠️ 주의사항

### 1. AdSense 정책 준수

- **클릭 유도 금지**: 사용자에게 광고 클릭을 유도하지 마세요
- **자동 클릭 금지**: 봇이나 스크립트로 광고를 클릭하지 마세요
- **콘텐츠 품질**: 유용하고 고품질의 콘텐츠를 제공하세요

### 2. 광고 배치 가이드라인

- **콘텐츠와 분리**: 광고와 콘텐츠를 명확히 구분하세요
- **과도한 광고 금지**: 페이지에 너무 많은 광고를 배치하지 마세요
- **사용자 경험 우선**: 광고가 사용자 경험을 해치지 않도록 하세요

### 3. 수익 최적화 팁

- **A/B 테스트**: 다양한 광고 위치와 크기 테스트
- **반응형 디자인**: 모바일과 데스크톱에서 최적화
- **콘텐츠 업데이트**: 정기적으로 새로운 콘텐츠 추가

## 📊 예상 수익

### 월 방문자 1,000명 기준

- **페이지뷰**: 약 3,000-5,000회
- **예상 수익**: $5-15 (월)
- **CTR**: 1-3% (업계 평균)

### 월 방문자 10,000명 기준

- **페이지뷰**: 약 30,000-50,000회
- **예상 수익**: $50-150 (월)
- **CTR**: 1-3% (업계 평균)

_실제 수익은 트래픽, CTR, CPC 등에 따라 달라질 수 있습니다._

## 🔗 유용한 링크

- [AdSense 도움말](https://support.google.com/adsense/)
- [AdSense 정책](https://support.google.com/adsense/answer/23921)
- [수익 최적화 가이드](https://support.google.com/adsense/answer/160172)
- [AdSense 대시보드](https://www.google.com/adsense/)
