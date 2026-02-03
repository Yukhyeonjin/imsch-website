# 🛠 Git Rules & Convention

프로젝트의 일관성 있는 이력 관리와 원활한 협업을 위해 아래 규칙을 준수해주세요.

## 1. Branch Strategy (브랜치 전략)
Git Flow 방식을 기본으로 하며, 아래 명명 규칙을 따릅니다.
*   **master**: 제품으로 출시될 수 있는 브랜치
*   **develop**: 다음 출시 버전을 개발하는 브랜치
*   **feature/`기능명`**: 기능 개발 브랜치 (예: `feature/login-page`)

## 2. Commit Message Convention (커밋 메시지 규칙)
커밋 메시지는 [Conventional Commits](https://www.conventionalcommits.org) 형식을 따릅니다.

**작성 규칙:**
- **type**: 반드시 **영문 소문자**를 사용합니다.
- **subject**: **한글/영문 혼합** 사용이 가능합니다. (명확한 내용 전달 권장)

<type>: <subject>

[optional body]
