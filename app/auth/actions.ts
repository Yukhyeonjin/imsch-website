"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import prisma from "@/lib/prisma"
import { LoginInput, SignupInput } from "@/lib/schemas"

export async function login(data: LoginInput) {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/", "layout")
    redirect("/")
}

export async function signup(data: SignupInput) {
    const supabase = await createClient()

    const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: {
                full_name: data.name,
            }
        }
    })

    if (error) {
        return { error: error.message }
    }

    if (authData.user) {
        try {
            await prisma.profile.create({
                data: {
                    id: authData.user.id,
                    email: data.email,
                    role: "MEMBER", // Default role
                }
            })
        } catch (e) {
            console.error("Failed to create profile:", e)
            // Optional: Consider if we should cleanup auth user or just log error
            // preventing login later if profile missing?
        }
    }

    revalidatePath("/", "layout")
    redirect("/login?message=이메일 인증을 확인해주세요.")
}
