# Development Lessons Learned & Troubleshooting Guide

이 문서는 개발 과정에서 발생했던 주요 에러들과 그 해결 방법, 그리고 앞으로 준수해야 할 코딩 가이드를 정리합니다.

## 1. Next.js 15+ & Turbopack 호환성

### 1-1. Async Page Parameters
Next.js 15부터 Page 컴포넌트의 `params`와 `searchParams` prop은 **비동기(Promise)**로 처리해야 합니다.

**[Incorrect]**
```tsx
export default function Page({ params, searchParams }: { 
  params: { id: string }, 
  searchParams: { page: string } 
}) {
  const id = params.id; // Error: params is Promise
}
```

**[Correct]**
```tsx
export default async function Page({ params, searchParams }: { 
  params: Promise<{ id: string }>, 
  searchParams: Promise<{ page?: string }> 
}) {
  const { id } = await params;
  const { page } = await searchParams;
}
```

### 1-2. Environment Variables & Turbopack
`npm run dev` (Turbopack) 환경에서 `process.env` 로딩 순서 문제로 Prisma Client 초기화 시 DB URL이 undefined가 되는 경우가 있습니다.
이를 방지하기 위해 `lib/prisma.ts` 등 민감한 초기화 파일에서는 안전장치를 둬야 합니다.

**[Solution]**
- `require("dotenv").config()`를 명시적으로 호출하거나,
- Vercel 배포 시 `postinstall` 스크립트 확인

---

## 2. Vercel Deployment

### 2-1. Prisma Generation
Vercel 배포 시 Prisma Client가 생성되지 않아 런타임 에러가 발생할 수 있습니다.
`package.json`의 `scripts`에 반드시 다음을 포함해야 합니다.

```json
"scripts": {
  "postinstall": "prisma generate"
}
```

---

## 3. TypeScript Strictness

### 3-1. No `any`
`any` 타입 사용은 런타임 에러를 유발할 수 있으므로 엄격히 금지합니다.
`unknown`을 사용하고 타입 가드(Type Guard)를 통해 안전하게 처리하세요.

**[Incorrect]**
```ts
try {
  // ...
} catch (e: any) {
  console.log(e.message);
}
```

**[Correct]**
```ts
try {
  // ...
} catch (e: unknown) {
  const message = e instanceof Error ? e.message : String(e);
  console.log(message);
}
```

---

## 4. UI Library (Shadcn UI)

### 4-1. Component Installation
새로운 컴포넌트를 코드에 import하기 전에 반드시 해당 컴포넌트 파일이 존재하는지 확인해야 합니다.
- `npx shadcn@latest add [component-name]` 명령어로 설치

---

## 5. Next.js 13+ App Router

### 5-1. Server Actions & Redirect
Server Action 내에서 `redirect()` 함수를 호출하면 내부적으로 에러를 throw하여 리디렉션을 수행합니다.
따라서 `try-catch` 블록 안에서 `redirect()`를 호출하면 리디렉션이 차단되거나 에러로 오인될 수 있습니다.
`redirect()`는 반드시 `try-catch` 블록 **외부**에서 호출하세요.
