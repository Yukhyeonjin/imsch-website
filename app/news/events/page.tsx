import Link from "next/link"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { getPosts } from "./actions"

export default async function EventsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; category?: string }>
}) {
    try {
        const { page: pageStr, category } = await searchParams
        const page = Number(pageStr) || 1

        const { posts, totalPages } = await getPosts(page, 10, category)

        return (
            <div>
                <div className="bg-slate-900 text-white py-16">
                    <div className="container px-4 md:px-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight">행사와 소식</h1>
                            <p className="mt-3 text-slate-300 text-lg">
                                교회의 다양한 소식과 공지사항을 확인하세요.
                            </p>
                        </div>
                        <Button asChild variant="secondary">
                            <Link href="/news/events/new">글쓰기</Link>
                        </Button>
                    </div>
                </div>

                <div className="container px-4 md:px-6 py-12">
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">번호</TableHead>
                                    <TableHead className="w-[90px]">분류</TableHead>
                                    <TableHead>제목</TableHead>
                                    <TableHead className="w-[100px] text-right">작성자</TableHead>
                                    <TableHead className="w-[100px] text-right">작성일</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            게시글이 없습니다.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    posts.map((post, index) => (
                                        <TableRow key={post.id}>
                                            <TableCell className="font-medium">
                                                {(page - 1) * 10 + index + 1}
                                            </TableCell>
                                            <TableCell>{post.category}</TableCell>
                                            <TableCell>
                                                <Link href={`/news/events/${post.id}`} className="hover:underline">
                                                    {post.title}
                                                </Link>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {post.author.email.split("@")[0]}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {format(post.createdAt, "yyyy.MM.dd", { locale: ko })}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-center space-x-2 pt-8">
                        {page > 1 && (
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/news/events?page=${page - 1}${category ? `&category=${category}` : ""}`}>이전</Link>
                            </Button>
                        )}
                        <span className="text-sm text-muted-foreground">
                            {page} / {totalPages === 0 ? 1 : totalPages}
                        </span>
                        {page < totalPages && (
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/news/events?page=${page + 1}${category ? `&category=${category}` : ""}`}>다음</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        )
    } catch (e: unknown) {
        console.error("EventsPage Error:", e)
        const errorMessage = e instanceof Error ? e.message : String(e)

        return (
            <div className="container py-20">
                <h1 className="text-2xl font-bold text-red-500 mb-4">게시판을 불러올 수 없습니다.</h1>
                <p className="text-muted-foreground mb-4">
                    잠시 후 다시 시도해주세요. 오류가 지속되면 관리자에게 문의하세요.
                </p>
                <pre className="bg-slate-100 p-4 rounded overflow-auto text-xs text-slate-500 max-h-[200px]">
                    {errorMessage}
                </pre>
            </div>
        )
    }
}
