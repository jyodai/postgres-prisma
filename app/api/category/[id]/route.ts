import { findEntry } from '@/api/entry';
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

type Params = {
    id: string;
};


export const DELETE = async (req: Request, { params }: { params: Params }) => {
    try {
        const targetId:number = Number(params.id);
        const entry = await prisma.dev_categories.delete({
            where: { id: targetId }
        });

        return NextResponse.json({ message: "削除成功", entry }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ messeage: "削除失敗" }, { status: 500 })
    } finally {
    }
}
