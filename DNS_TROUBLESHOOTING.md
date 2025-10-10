# DNS_PROBE_STARTED 오류 해결 가이드

## 🚨 문제 진단

`DNS_PROBE_STARTED` 오류는 다음 중 하나의 문제로 발생합니다:

1. **도메인이 DNS에 등록되지 않음** (NXDOMAIN)
2. **DNS 설정이 잘못됨**
3. **DNS 전파가 완료되지 않음**
4. **Railway 도메인 설정이 완료되지 않음**

## ✅ 해결 단계

### 1. 도메인 등록 상태 확인

**도메인 등록업체에서 확인:**

- `dendilstory.co.kr` 도메인이 활성 상태인지 확인
- 도메인 만료일 확인
- 도메인 상태가 "Active" 또는 "OK"인지 확인

### 2. Railway 도메인 설정 확인

**Railway 대시보드에서:**

1. 프로젝트 → Settings → Domains
2. `dendilstory.co.kr` 도메인이 추가되어 있는지 확인
3. 도메인 상태가 "Active"인지 확인
4. Railway에서 제공하는 실제 도메인 확인 (예: `your-app-name.railway.app`)

### 3. DNS 설정 (도메인 등록업체)

**올바른 DNS 설정:**

#### A. CNAME 레코드 설정 (권장)

```
Type: CNAME
Name: www
Value: [Railway에서 제공하는 실제 도메인]
TTL: 300 (5분)
```

#### B. A 레코드 설정 (대안)

```
Type: A
Name: @
Value: [Railway에서 제공하는 IP 주소]
TTL: 300
```

**중요:** `Value` 필드에는 Railway에서 제공하는 **실제 도메인**을 입력해야 합니다.

### 4. DNS 전파 확인

**전파 상태 확인 명령어:**

```bash
# DNS 전파 확인
nslookup dendilstory.co.kr
dig dendilstory.co.kr

# www 서브도메인 확인
nslookup www.dendilstory.co.kr
dig www.dendilstory.co.kr
```

**정상적인 응답 예시:**

```
dendilstory.co.kr.    300    IN    CNAME    your-app-name.railway.app.
your-app-name.railway.app. 300 IN A        123.456.789.012
```

### 5. 브라우저 캐시 클리어

**DNS 캐시 클리어:**

```bash
# Windows
ipconfig /flushdns

# macOS
sudo dscacheutil -flushcache

# Linux
sudo systemctl restart systemd-resolved
```

**브라우저 캐시 클리어:**

- Chrome: Ctrl+Shift+Delete
- Firefox: Ctrl+Shift+Delete
- Safari: Cmd+Option+E

## 🔍 문제별 해결 방법

### Case 1: NXDOMAIN 오류

**원인:** 도메인이 DNS에 등록되지 않음
**해결:**

1. 도메인 등록업체에서 DNS 설정 확인
2. CNAME 또는 A 레코드 추가
3. 5-10분 대기 후 재확인

### Case 2: DNS 설정은 되었지만 연결 안됨

**원인:** Railway 도메인 설정 미완료
**해결:**

1. Railway에서 도메인 추가
2. SSL 인증서 발급 대기 (5-10분)
3. 도메인 상태가 "Active"인지 확인

### Case 3: 일부 지역에서만 접속 안됨

**원인:** DNS 전파 지연
**해결:**

1. 24-48시간 대기
2. 다른 DNS 서버 사용 (8.8.8.8, 1.1.1.1)
3. VPN 사용하여 테스트

## 🚀 임시 해결 방법

### 1. Railway 도메인으로 직접 접속

```
https://your-app-name.railway.app
```

### 2. hosts 파일 수정 (임시)

**Windows:** `C:\Windows\System32\drivers\etc\hosts`
**macOS/Linux:** `/etc/hosts`

```
# 임시 설정 (Railway IP 주소로 교체)
123.456.789.012 dendilstory.co.kr
123.456.789.012 www.dendilstory.co.kr
```

## 📞 추가 지원

### 1. 도메인 등록업체 문의

- DNS 설정이 올바른지 확인
- 도메인 상태 문의

### 2. Railway 지원

- Railway 대시보드에서 도메인 설정 확인
- 로그에서 오류 메시지 확인

### 3. 온라인 DNS 도구

- [DNS Checker](https://dnschecker.org/)
- [What's My DNS](https://whatsmydns.net/)
- [DNS Propagation Checker](https://www.whatsmydns.net/)

## ⏰ 예상 소요 시간

- **DNS 전파**: 5분 - 48시간
- **SSL 인증서 발급**: 5-10분
- **전체 설정 완료**: 10분 - 1시간

## ✅ 최종 확인

설정이 완료되면 다음이 정상 작동해야 합니다:

1. `https://dendilstory.co.kr` 접속
2. `https://www.dendilstory.co.kr` 접속
3. SSL 인증서 정상 작동 (자물쇠 아이콘)
4. 모든 페이지 정상 로드
