# 인천국제명성교회 웹사이트 (Incheon International Myungsung Church Website)

이 프로젝트는 비용 효율적이고 보안이 강력한 교회 웹사이트 구축을 목표로 합니다.
React, Next.js, Supabase 등 최신 웹 기술을 활용하여 제작되었습니다.

## 🛠 기술 스택 (Tech Stack)

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Deployment**: Vercel

## ✨ 주요 기능 (Features)

- **사용자 인증 (Auth)**: 회원가입, 로그인 (Supabase Auth 연동)
- **반응형 디자인**: 모바일 우선 (Mobile First) 설계
- **교회 소식**: 공지사항 및 뉴스 게시판 (CRUD)
- **주보**: PDF 주보 업로드 및 조회
- **갤러리**: 행사 사진 갤러리

## 🚀 시작하기 (Getting Started)

### 1. 환경 변수 설정 (.env)
프로젝트 루트에 `.env` 파일을 생성하고 다음 변수들을 설정해야 합니다.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_url
```

### 2. 설치 및 실행

```bash
# 의존성 설치
npm install

# 데이터베이스 푸시 (Prisma)
npx prisma db push

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📚 문서 (Documentation)

프로젝트의 상세한 개발 문서와 가이드는 `docs/` 디렉토리에서 확인할 수 있습니다.

- [구현 계획 (Implementation Plan)](docs/IMPLEMENTATION_PLAN.md)
- [작업 목록 (Task List)](docs/TASK.md)
- [Git 규칙 (Git Rules)](docs/GIT_RULES.md)
- [아키텍처 규칙 (Architecture Rules)](docs/ARCHITECTURE_RULES.md)
- [UI 가이드라인 (UI Guidelines)](docs/UI_GUIDELINES.md)
- [보안 정책 (Security Policy)](docs/SECURITY_POLICY.md)

## 🤝 기여 (Contribution)

이 프로젝트는 `feature` 브랜치 워크플로를 따릅니다. 새로운 기능은 `feature/` 브랜치에서 개발 후 `develop`으로 병합됩니다.
자세한 내용은 [Git Rules](docs/GIT_RULES.md)를 참고하세요.
