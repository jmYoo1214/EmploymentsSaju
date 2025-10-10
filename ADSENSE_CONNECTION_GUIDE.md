# 🚀 AdSense 연결 완전 가이드

## 📋 1단계: AdSense 계정 생성

### Google AdSense 계정 생성
1. [Google AdSense 웹사이트](https://www.google.com/adsense/) 방문
2. Google 계정으로 로그인
3. "시작하기" 클릭
4. 계정 정보 입력:
   - **국가/지역**: 대한민국
   - **결제 수단**: 계좌 정보 입력
   - **세금 정보**: 필요시 입력

## 📋 2단계: 웹사이트 등록

### 사이트 추가
1. AdSense 대시보드 → "사이트" 메뉴
2. "사이트 추가" 클릭
3. 웹사이트 정보 입력:
   ```
   웹사이트 URL: https://dendilstory.co.kr
   사이트 언어: 한국어
   사이트 카테고리: 기술
   사이트 설명: 직장인을 위한 유용한 도구들
   ```

### 사이트 승인 대기
- AdSense 팀에서 사이트 검토 (1-7일)
- 승인 후 광고 단위 생성 가능

## 📋 3단계: 광고 단위 생성

### 메인 페이지 광고
1. "광고 단위" → "디스플레이 광고" 선택
2. 광고 설정:
   ```
   광고 단위 이름: 메인 배너 광고
   광고 크기: 반응형
   광고 위치: 페이지 상단
   ```

### 기타 페이지 광고
각 페이지별로 광고 단위 생성:
- 점심 뽑기 페이지
- 연봉 계산기 페이지
- 세금 계산기 페이지
- 칼로리 계산기 페이지
- 운세 페이지

## 📋 4단계: 코드 적용

### Publisher ID 확인
AdSense 대시보드에서 Publisher ID 확인 (예: `ca-pub-1234567890123456`)

### HTML 파일 업데이트
각 HTML 파일에서 다음 부분을 실제 값으로 교체:

#### 1. AdSense 스크립트
```html
<!-- 기존 -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
        crossorigin="anonymous"></script>

<!-- 실제 값으로 교체 -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
        crossorigin="anonymous"></script>
```

#### 2. 광고 단위 코드
```html
<!-- 기존 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
     data-ad-slot="YOUR_AD_SLOT_ID"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<!-- 실제 값으로 교체 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-1234567890123456"
     data-ad-slot="9876543210"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
```

## 📋 5단계: 파일별 업데이트

### 업데이트할 파일 목록
1. `main.html` - 메인 페이지
2. `lunch-picker.html` - 점심 뽑기
3. `salary-calculator.html` - 연봉 계산기
4. `tax-calculator.html` - 세금 계산기
5. `calorie-calculator.html` - 칼로리 계산기
6. `fortune.html` - 운세 페이지

### 각 파일에서 교체할 내용
1. `ca-pub-YOUR_PUBLISHER_ID` → 실제 Publisher ID
2. `YOUR_AD_SLOT_ID` → 실제 Ad Slot ID

## 📋 6단계: 테스트 및 확인

### 광고 표시 확인
1. 웹사이트 접속
2. 광고 영역에 광고가 표시되는지 확인
3. 브라우저 개발자 도구에서 오류 확인

### AdSense 대시보드 확인
1. "광고 단위" 메뉴에서 광고 상태 확인
2. "수익" 메뉴에서 수익 현황 확인
3. "보고서" 메뉴에서 성능 분석

## 📋 7단계: 최적화

### 광고 배치 최적화
- 사용자 경험을 해치지 않는 위치에 배치
- 콘텐츠와 명확히 구분
- 과도한 광고 배치 금지

### 성능 모니터링
- 클릭률(CTR) 확인
- 수익 현황 모니터링
- 광고 성능 분석

## 🚨 주의사항

### AdSense 정책 준수
- **클릭 유도 금지**: 사용자에게 광고 클릭을 유도하지 마세요
- **자동 클릭 금지**: 봇이나 스크립트로 광고를 클릭하지 마세요
- **콘텐츠 품질**: 유용하고 고품질의 콘텐츠를 제공하세요

### 광고 배치 가이드라인
- **콘텐츠와 분리**: 광고와 콘텐츠를 명확히 구분
- **과도한 광고 금지**: 페이지에 너무 많은 광고 배치 금지
- **사용자 경험 우선**: 광고가 사용자 경험을 해치지 않도록

## 📊 예상 수익

### 월 방문자 1,000명 기준
- **페이지뷰**: 약 3,000-5,000회
- **예상 수익**: $5-15 (월)
- **CTR**: 1-3% (업계 평균)

### 월 방문자 10,000명 기준
- **페이지뷰**: 약 30,000-50,000회
- **예상 수익**: $50-150 (월)
- **CTR**: 1-3% (업계 평균)

*실제 수익은 트래픽, CTR, CPC 등에 따라 달라질 수 있습니다.*

## 🔗 유용한 링크

- [AdSense 도움말](https://support.google.com/adsense/)
- [AdSense 정책](https://support.google.com/adsense/answer/23921)
- [수익 최적화 가이드](https://support.google.com/adsense/answer/160172)
- [AdSense 대시보드](https://www.google.com/adsense/)

## 📞 문제 해결

### 광고가 표시되지 않는 경우
1. AdSense 승인 상태 확인
2. 코드가 올바르게 적용되었는지 확인
3. 브라우저 개발자 도구에서 오류 확인
4. AdSense 정책 위반 여부 확인

### 수익이 낮은 경우
1. 광고 배치 위치 최적화
2. 콘텐츠 품질 향상
3. 트래픽 증가 방안 모색
4. A/B 테스트를 통한 최적화
