"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { signupSchema, SignupInput } from "@/lib/schemas"
import { signup } from "@/app/auth/actions"

export function SignupForm() {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
        },
    })

    async function onSubmit(data: SignupInput) {
        setIsLoading(true)
        setError(null)

        try {
            const result = await signup(data)
            if (result?.error) {
                toast.error(result.error)
                setError(result.error)
            } else {
                toast.success("회원가입이 완료되었습니다. 이메일을 확인해주세요.")
            }
        } catch (e) {
            toast.error("회원가입 중 오류가 발생했습니다.")
            setError("회원가입 중 오류가 발생했습니다.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-sm mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">회원가입</CardTitle>
                <CardDescription>
                    새로운 계정을 생성하여 교회 소식을 받아보세요.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">이름</Label>
                        <Input id="name" placeholder="홍길동" {...form.register("name")} />
                        {form.formState.errors.name && (
                            <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">이메일</Label>
                        <Input id="email" type="email" placeholder="example@imsch.or.kr" {...form.register("email")} />
                        {form.formState.errors.email && (
                            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">비밀번호</Label>
                        <Input id="password" type="password" {...form.register("password")} />
                        {form.formState.errors.password && (
                            <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                        <Input id="confirmPassword" type="password" {...form.register("confirmPassword")} />
                        {form.formState.errors.confirmPassword && (
                            <p className="text-sm text-red-500">{form.formState.errors.confirmPassword.message}</p>
                        )}
                    </div>

                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "가입 처리 중..." : "회원가입"}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                    이미 계정이 있으신가요?{" "}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                        로그인
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
