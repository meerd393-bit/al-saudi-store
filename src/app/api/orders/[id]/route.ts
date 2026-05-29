import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const orderId = params.id;
    
    if (process.env.POSTGRES_URL) {
      await sql`DELETE FROM orders WHERE id = ${orderId}`;
    } else {
      // Fallback for local dev
      const filePath = path.join(process.cwd(), 'data', 'orders.json');
      try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        const orders = JSON.parse(fileData);
        const updatedOrders = orders.filter((order: any) => order.id !== orderId);
        fs.writeFileSync(filePath, JSON.stringify(updatedOrders, null, 2));
      } catch (e) {
        // ignore
      }
    }
    
    return NextResponse.json({ success: true, message: 'Order deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}
