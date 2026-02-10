import { PrismaClient } from "@prisma/client"

// 임시 조치: 환경 변수 로딩 문제 해결을 위해 URL 하드코딩
// 추후 배포 시 process.env로 복구 예정
const DATABASE_URL = "postgresql://postgres.kuejgffvbkprcmetbpzr:Guswls12%21%40%23%24@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"

const prismaClientSingleton = () => {
    return new PrismaClient({
        datasources: {
            db: {
                url: DATABASE_URL
            }
        }
    })
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma
