import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getEntry } from '@/api/entry'

export const GET = async (req: Request) => {
    try {
        const entries = await getEntry();
        return NextResponse.json({entries},{ status: 200 })
    } catch (error) {
        return NextResponse.json({ messeage: "Error" },{ status: 500 })
    } finally {
    }
}

export const POST = async (req: Request) => {
  const data = await req.json();
  data.date = new Date(data.date);
  try {
    await prisma.dev_entry.create({
      data,
    });

    return NextResponse.json({ 'message' : 'success' },{ status: 200 })
  } catch (error) {
    return NextResponse.json({ 'message' : 'failuer' },{ status: 500 })
  } finally {
  }
}
