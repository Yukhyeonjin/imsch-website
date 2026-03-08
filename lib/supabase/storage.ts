import { createClient } from "@/lib/supabase/client";

// 파일을 Supabase Storage에 업로드하고 Public URL 반환
export async function uploadFile(
    file: File,
    bucket: string,
    path: string
): Promise<{ url: string; error: string | null }> {
    const supabase = createClient();

    // 고유 파일명 생성 (timestamp + random)
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

    if (error) {
        return { url: "", error: error.message };
    }

    const {
        data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return { url: publicUrl, error: null };
}

// Storage에서 파일 삭제
export async function deleteFile(
    bucket: string,
    filePath: string
): Promise<{ error: string | null }> {
    const supabase = createClient();

    // publicUrl에서 path 추출
    const urlParts = filePath.split(`/storage/v1/object/public/${bucket}/`);
    const path = urlParts.length > 1 ? urlParts[1] : filePath;

    const { error } = await supabase.storage.from(bucket).remove([path]);

    return { error: error?.message ?? null };
}
