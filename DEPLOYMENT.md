# 🚀 운영 환경 배포 가이드

## 환경변수 설정

### 1. OpenAI API 키 발급

1. [OpenAI Platform](https://platform.openai.com/)에 가입
2. API Keys 섹션에서 새 키 생성
3. 생성된 키를 복사 (sk-로 시작)

### 2. 호스팅 플랫폼별 환경변수 설정

#### Vercel

1. Vercel Dashboard → 프로젝트 선택
2. Settings → Environment Variables
3. Name: `OPENAI_API_KEY`
4. Value: `sk-your-actual-api-key-here`
5. Environment: Production, Preview, Development 모두 선택
6. Save 후 Redeploy

#### Netlify

1. Netlify Dashboard → Site Settings
2. Environment Variables
3. Add Variable
4. Key: `OPENAI_API_KEY`
5. Value: `sk-your-actual-api-key-here`
6. Save 후 Deploy

#### Heroku

```bash
heroku config:set OPENAI_API_KEY=sk-your-actual-api-key-here
```

#### AWS Lambda

1. Lambda Console → Function 선택
2. Configuration → Environment Variables
3. Edit → Add Environment Variable
4. Key: `OPENAI_API_KEY`
5. Value: `sk-your-actual-api-key-here`

### 3. 배포 후 확인

배포 완료 후 다음 URL로 GPT 상태를 확인하세요:

```
https://your-domain.com/api/status
```

정상 응답 예시:

```json
{
  "gptEnabled": true,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "message": "GPT API 연동이 활성화되었습니다."
}
```

## 문제 해결

### GPT가 비활성화된 경우

1. 환경변수가 올바르게 설정되었는지 확인
2. API 키가 유효한지 확인
3. 서버 로그에서 오류 메시지 확인
4. 재배포 실행

### 기본 운세 사용

GPT API 키가 설정되지 않은 경우, 자동으로 기본 운세 데이터를 사용합니다.
사용자 경험에는 영향을 주지 않습니다.

## 보안 주의사항

- `.env` 파일은 절대 Git에 커밋하지 마세요
- API 키는 환경변수로만 관리하세요
- 프로덕션 환경에서는 HTTPS를 사용하세요
