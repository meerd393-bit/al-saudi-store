import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper to get orders
function getOrders() {
  const filePath = path.join(process.cwd(), 'data', 'orders.json');
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    return [];
  }
}

// GET all orders
export async function GET() {
  const orders = getOrders();
  // Sort by date descending (newest first)
  orders.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return NextResponse.json(orders);
}

// POST new order
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'orders.json');
    
    const orders = getOrders();
    const newOrder = {
      id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: body.customerName,
      phone: body.phone,
      address: body.address,
      product: body.product,
      color: body.color,
      amount: '519 ر.س',
      status: 'قيد المعالجة',
      date: new Date().toISOString()
    };
    
    orders.push(newOrder);
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));
    
    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
