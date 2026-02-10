---
description: 기능 구현을 위한 표준 워크플로 (Standard Feature Implementation Flow)
---

# Feature Implementation Cycle

이 워크플로는 기능 개발 시 일관성을 유지하고 실수를 방지하기 위해 사용됩니다.

## 1. 계획 및 준비 (Plan & Prep)
- [ ] `docs/TASK.md`를 확인하고 작업 상태를 `[/]`로 업데이트합니다.
- [ ] `develop` 브랜치에서 최신 상태를 pull 합니다.
- [ ] `feature/기능명` 브랜치를 생성합니다. (예: `git checkout -b feature/board-crud`)

## 2. 구현 (Implementation)
- **UI**: `docs/UI_GUIDELINES.md`를 준수하며 Shadcn UI 컴포넌트를 활용합니다.
- **Logic**: Server Actions(`app/actions.ts` 등)를 통해 백엔드 로직을 구현합니다.
- **Auth**: `lib/supabase/server.ts`를 사용하여 보안 검증을 수행합니다.

## 3. 검증 (Verification) // turbo
- [ ] `npm run build` 명령어로 타입 및 빌드 오류를 확인합니다.
- [ ] (가능한 경우) 브라우저를 통해 UI 반응형 상태를 확인합니다.

## 4. 마무리 (Finalize)
- [ ] **서버 상태 확인 (필수)**: UI 확인 전 개발 서버(`npm run dev`)가 실행 중인지 반드시 확인하고, 꺼져있다면 실행합니다.
- [ ] **UI 확인 (필수)**: UI 변경 시 `start URL` 명령으로 브라우저를 열어 사용자가 확인하게 합니다.
- [ ] **승인 요청**: 커밋할 파일과 메시지를 사용자에게 보고하고 승인을 받습니다.
- [ ] **문서 현행화**: 기능 추가/변경에 따른 `README.md` 및 `docs/*.md` 업데이트를 수행합니다.
- [ ] 커밋 메시지 규칙 준수: `<type>: <subject (한영 혼합)>`
- [ ] `develop` 브랜치로 병합하고 `feature` 브랜치를 삭제합니다.
- [ ] `docs/TASK.md` 상태를 `[x]`로 업데이트합니다.
