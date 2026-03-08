"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { FileUpload } from "@/components/common/FileUpload";
import { uploadFile } from "@/lib/supabase/storage";
import { createGalleryItem } from "../actions";

export default function NewGalleryPage() {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!file) {
            toast.error("이미지를 선택해주세요.");
            return;
        }
        if (!title.trim()) {
            toast.error("제목을 입력해주세요.");
            return;
        }

        setIsLoading(true);

        try {
            // 1. Storage에 이미지 업로드
            const { url, error: uploadError } = await uploadFile(file, "gallery", "images");
            if (uploadError) {
                toast.error(`업로드 실패: ${uploadError}`);
                setIsLoading(false);
                return;
            }

            // 2. DB에 갤러리 항목 생성
            const result = await createGalleryItem({
                title: title.trim(),
                description: description.trim() || undefined,
                imageUrl: url,
                date: date || undefined,
            });

            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success("사진이 등록되었습니다.");
            }
        } catch {
            toast.error("오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container py-12 px-4 md:px-6">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>사진 등록</CardTitle>
                    <CardDescription>갤러리에 새 사진을 등록합니다.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>이미지</Label>
                            <FileUpload
                                accept="image/*"
                                maxSize={10}
                                onFileSelect={(f) => setFile(f)}
                                onFileRemove={() => setFile(null)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="title">제목</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="사진 제목"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">설명 (선택)</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="사진에 대한 설명"
                                className="min-h-[100px]"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="date">날짜 (선택)</Label>
                            <Input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                        >
                            취소
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "등록 중..." : "등록하기"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
