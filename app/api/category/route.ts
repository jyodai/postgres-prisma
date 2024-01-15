import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getCategory } from '@/api/category'

export const GET = async (req: Request) => {
    try {
        const categories = await getCategory();

        return NextResponse.json({categories},{ status: 200 })
    } catch (error) {
        return NextResponse.json({ messeage: "Error" },{ status: 500 })
    } finally {
    }
}
