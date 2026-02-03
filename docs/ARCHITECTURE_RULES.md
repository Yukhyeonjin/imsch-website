# Architecture Rules

## 폴더 구조 규칙
- app/route 기반 유지
- api/는 서버 액션 또는 route.ts만 사용
- lib/에는 외부 의존성 래퍼만 위치

## 데이터 접근 규칙
- DB 직접 접근 금지 (Prisma Repository만 사용)
- 클라이언트에서 Supabase Admin SDK 사용 금지
