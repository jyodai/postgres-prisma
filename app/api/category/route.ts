import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
    try {
        const categories = await prisma.dev_categories.findMany();

        return NextResponse.json({categories},{ status: 200 })
    } catch (error) {
        return NextResponse.json({ messeage: "Error" },{ status: 500 })
    } finally {
    }
}
