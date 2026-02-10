# 주보(Bulletin) 및 파일 업로드 구현 계획

게시판(Board) 기능에 이어 주보 업로드 및 조회 기능을 구현합니다.
Supabase Storage의 `files` 버킷을 사용하여 PDF 파일을 업로드하고, `Bulletin` 모델에 메타데이터를 저장합니다.

## User Review Required
- **Supabase Storage**: `files` 버킷이 `Public`으로 설정되어 있어야 합니다. (이미 요청함)
- **URL**: `/bulletin` 경로를 사용합니다.

## Proposed Changes

### Libs
#### [NEW] [storage.ts](file:///e:/Yuk/workspace/msch/lib/supabase/storage.ts)
- `uploadFile(file: File, bucket: string, path: string)`: 파일을 Supabase Storage에 업로드하고 Public URL을 반환하는 함수.
- **Note**: Server Action에서 호출하거나, Client에서 직접 호출할 수 있음. 보안을 위해 Server Action 내부에서 처리 권장.

### Components
#### [NEW] [FileUpload.tsx](file:///e:/Yuk/workspace/msch/components/ui/file-upload.tsx)
- 파일 선택 및 미리보기를 제공하는 UI 컴포넌트
- `input type="file"`, Drag & Drop 지원 (가능하면)

### Bulletin Feature (`app/bulletin`)
#### [NEW] [actions.ts](file:///e:/Yuk/workspace/msch/app/bulletin/actions.ts)
- `createBulletin(data: FormData)`: 파일 업로드 및 DB 저장 처리
- `getBulletins(page, limit)`: 주보 목록 조회
- `deleteBulletin(id, pdfUrl)`: 주보 및 파일 삭제

#### [NEW] [page.tsx](file:///e:/Yuk/workspace/msch/app/bulletin/page.tsx)
- 주보 목록 표시 (Grid 또는 List)
- 최근 주보 강조 표시
- PDF 다운로드/보기 링크 제공

#### [NEW] [new/page.tsx](file:///e:/Yuk/workspace/msch/app/bulletin/new/page.tsx)
- 주보 등록 폼 (제목, 날짜, PDF 파일)

### Navigation
- `lib/constants.ts`: `/bulletin` 링크 추가 (이미 헤더에는 없지만 추가 필요)

## Verification Plan
1. **Upload**: PDF 파일을 선택하고 '등록' 버튼 클릭 시 업로드 성공 여부 확인.
2. **Download**: 목록에서 주보 클릭 시 PDF가 열리거나 다운로드되는지 확인.
3. **Delete**: 삭제 시 DB 데이터와 Storage 파일이 모두 삭제되는지 확인.
