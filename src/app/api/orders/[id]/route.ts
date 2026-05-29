import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const orderId = params.id;
    
    // 1. Try Prisma if DATABASE_URL is defined
    if (process.env.DATABASE_URL) {
      try {
        await prisma.order.delete({
          where: { id: orderId },
        });
        return NextResponse.json({ success: true, message: 'Order deleted' });
      } catch (e) {
        console.error("Prisma DELETE error:", e);
      }
    }

    // 2. Try Vercel Postgres fallback
    if (process.env.POSTGRES_URL) {
      try {
        await sql`DELETE FROM orders WHERE id = ${orderId}`;
        return NextResponse.json({ success: true, message: 'Order deleted' });
      } catch (e) {
        console.error("Vercel Postgres DELETE error:", e);
      }
    }
    
    // 3. Fallback for local dev
    const filePath = path.join(process.cwd(), 'data', 'orders.json');
    try {
      const fileData = fs.readFileSync(filePath, 'utf8');
      const orders = JSON.parse(fileData);
      const updatedOrders = orders.filter((order: any) => order.id !== orderId);
      fs.writeFileSync(filePath, JSON.stringify(updatedOrders, null, 2));
    } catch (e) {
      // ignore
    }
    
    return NextResponse.json({ success: true, message: 'Order deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}
