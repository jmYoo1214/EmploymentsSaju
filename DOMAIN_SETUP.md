# dendilstory.co.kr 도메인 연결 체크리스트

## ✅ Railway 설정

- [ ] Railway 프로젝트에 `dendilstory.co.kr` 도메인 추가
- [ ] SSL 인증서 자동 발급 확인
- [ ] 도메인 상태가 "Active"인지 확인

## ✅ DNS 설정 (도메인 등록업체)

### CNAME 레코드 설정

```
Type: CNAME
Name: www
Value: [Railway에서 제공하는 도메인]
TTL: 300
```

### A 레코드 설정 (선택사항)

```
Type: A
Name: @
Value: [Railway에서 제공하는 IP 주소]
TTL: 300
```

## ✅ 연결 테스트

### 1. DNS 전파 확인

```bash
# DNS 전파 상태 확인
nslookup dendilstory.co.kr
dig dendilstory.co.kr
```

### 2. 웹사이트 접속 테스트

- [ ] `https://dendilstory.co.kr` 정상 접속
- [ ] `https://www.dendilstory.co.kr` 정상 접속
- [ ] SSL 인증서 정상 작동 (자물쇠 아이콘)
- [ ] 모든 페이지 정상 로드

### 3. 기능 테스트

- [ ] 메인 페이지 정상 표시
- [ ] 연봉 계산기 작동
- [ ] 점심 뽑기 작동
- [ ] 운세 서비스 작동
- [ ] 모든 링크 정상 작동

## ✅ SEO 및 성능 최적화

### 1. 메타 태그 업데이트

```html
<meta property="og:url" content="https://dendilstory.co.kr" />
<meta property="og:site_name" content="직장인 놀이터" />
```

### 2. 사이트맵 생성 (선택사항)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dendilstory.co.kr/</loc>
    <lastmod>2024-12-09</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dendilstory.co.kr/salary-calculator.html</loc>
    <lastmod>2024-12-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

## ✅ 보안 설정

### 1. HTTPS 강제 리다이렉트

Railway에서 자동으로 HTTPS 리다이렉트 설정

### 2. 보안 헤더 추가 (선택사항)

```javascript
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});
```

## ✅ 모니터링 설정

### 1. Google Analytics (선택사항)

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

### 2. Uptime 모니터링 (선택사항)

- UptimeRobot
- Pingdom
- StatusCake

## 🚨 문제 해결

### DNS 전파 지연

- DNS 전파는 최대 48시간 소요 가능
- `dig` 명령어로 전파 상태 확인

### SSL 인증서 문제

- Railway에서 자동 발급되므로 수동 설정 불필요
- 도메인 연결 후 5-10분 대기

### CORS 오류

- 서버의 CORS 설정에 새 도메인 추가 확인
- 브라우저 캐시 클리어

## 📞 지원

문제가 발생하면:

1. Railway 대시보드에서 로그 확인
2. DNS 설정 재확인
3. 브라우저 개발자 도구에서 오류 확인
