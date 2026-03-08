"use client";

import { useCallback, useState } from "react";
import { Upload, X, FileIcon, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
    accept?: string; // e.g. "image/*", ".pdf"
    maxSize?: number; // MB 단위, 기본 5MB
    onFileSelect: (file: File) => void;
    onFileRemove?: () => void;
    preview?: boolean; // 이미지 미리보기 표시 여부
    className?: string;
}

export function FileUpload({
    accept = "image/*",
    maxSize = 5,
    onFileSelect,
    onFileRemove,
    preview = true,
    className,
}: FileUploadProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setError(null);

            // 파일 크기 검증
            if (file.size > maxSize * 1024 * 1024) {
                setError(`파일 크기는 ${maxSize}MB 이하여야 합니다.`);
                return;
            }

            setSelectedFile(file);
            onFileSelect(file);

            // 이미지 미리보기
            if (preview && file.type.startsWith("image/")) {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
            }
        },
        [maxSize, onFileSelect, preview]
    );

    const handleRemove = useCallback(() => {
        setSelectedFile(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        setError(null);
        onFileRemove?.();
    }, [previewUrl, onFileRemove]);

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (!file) return;

            setError(null);

            if (file.size > maxSize * 1024 * 1024) {
                setError(`파일 크기는 ${maxSize}MB 이하여야 합니다.`);
                return;
            }

            setSelectedFile(file);
            onFileSelect(file);

            if (preview && file.type.startsWith("image/")) {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
            }
        },
        [maxSize, onFileSelect, preview]
    );

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }, []);

    return (
        <div className={cn("space-y-2", className)}>
            {!selectedFile ? (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
                >
                    <input
                        type="file"
                        accept={accept}
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                        <p className="text-sm font-medium">
                            클릭하여 파일을 선택하거나 드래그하세요
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            최대 {maxSize}MB
                        </p>
                    </label>
                </div>
            ) : (
                <div className="border rounded-lg p-4">
                    {previewUrl ? (
                        <div className="relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={previewUrl}
                                alt="미리보기"
                                className="w-full max-h-64 object-contain rounded"
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 h-7 w-7"
                                onClick={handleRemove}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {selectedFile.type.startsWith("image/") ? (
                                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                ) : (
                                    <FileIcon className="h-8 w-8 text-muted-foreground" />
                                )}
                                <div>
                                    <p className="text-sm font-medium">
                                        {selectedFile.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {(
                                            selectedFile.size /
                                            1024 /
                                            1024
                                        ).toFixed(2)}{" "}
                                        MB
                                    </p>
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={handleRemove}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
