import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id;
    const filePath = path.join(process.cwd(), 'data', 'orders.json');
    
    let fileData = '[]';
    try {
      fileData = fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      // ignore
    }
    
    const orders = JSON.parse(fileData);
    const updatedOrders = orders.filter((order: any) => order.id !== orderId);
    
    fs.writeFileSync(filePath, JSON.stringify(updatedOrders, null, 2));
    
    return NextResponse.json({ success: true, message: 'Order deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}
