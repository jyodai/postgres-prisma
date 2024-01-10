import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const DELETE = async (req: Request, { params }) => {
    try {
        const targetId:number = Number(params.id);
        const entry = await prisma.dev_entry.delete({
            where: { id: targetId }
        });

        return NextResponse.json({ message: "削除成功", entry }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ messeage: "削除失敗" }, { status: 500 })
    } finally {
    }
}

export const PATCH = async (req: Request) => {
  try {
    const data = await req.json();
    const targetId = Number(data.id);

    if (!targetId) {
      return NextResponse.json({ 'message': 'ID is required' }, { status: 400 });
    }

    const updatedEntry = await prisma.dev_entry.update({
      where: { id: targetId },
      data: {
        ...data,
        date: new Date(data.date) ,
      },
    });

    return NextResponse.json({ message: '更新成功', updatedEntry }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: '更新失敗', error: error.message }, { status: 500 });
  } finally {
  }
};
