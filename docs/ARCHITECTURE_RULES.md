# Architecture Rules

## 폴더 구조 규칙
- app/route 기반 유지
- api/는 서버 액션 또는 route.ts만 사용
- lib/에는 외부 의존성 래퍼만 위치

## 데이터 접근 규칙
- DB 직접 접근 금지 (Prisma Repository만 사용)
- 클라이언트에서 Supabase Admin SDK 사용 금지
- 클라이언트에서 Supabase Admin SDK 사용 금지

## 로직/뷰 분리 규칙 (Headless UI)
- 추후 전면적인 디자인 개편(Overhaul)이 예정되어 있으므로, **비즈니스 로직과 UI를 엄격히 분리**한다.
- 데이터 페칭 및 가공 로직은 React Hook 또는 Server Actions로 분리하여 재사용성을 높인다.
- 뷰(View) 컴포넌트는 오직 데이터 표시(Presentation) 역할만 수행한다.
