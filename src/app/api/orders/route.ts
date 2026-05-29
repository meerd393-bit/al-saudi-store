import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

let globalOrders: any[] | null = null;
let tableCreated = false;

// Fallback logic when running locally without Postgres
function getMemoryOrders() {
  if (globalOrders) return globalOrders;
  const filePath = path.join(process.cwd(), 'data', 'orders.json');
  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    globalOrders = JSON.parse(fileData);
  } catch (error) {
    globalOrders = [];
  }
  return globalOrders;
}

// Ensure the SQL table exists (for @vercel/postgres fallback)
async function ensureTable() {
  if (tableCreated) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(255) PRIMARY KEY,
        "customerName" VARCHAR(255),
        phone VARCHAR(255),
        address VARCHAR(255),
        product VARCHAR(255),
        color VARCHAR(255),
        amount VARCHAR(255),
        status VARCHAR(255),
        date VARCHAR(255)
      );
    `;
    tableCreated = true;
  } catch (e) {
    console.error("Error creating table:", e);
  }
}

export async function GET() {
  // 1. Try Prisma if DATABASE_URL is defined
  if (process.env.DATABASE_URL) {
    try {
      const orders = await prisma.order.findMany({
        orderBy: {
          date: 'desc',
        },
      });
      return NextResponse.json(orders);
    } catch (e) {
      console.error("Prisma GET error:", e);
    }
  }

  // 2. Try Vercel Postgres fallback
  if (process.env.POSTGRES_URL) {
    try {
      await ensureTable();
      const { rows } = await sql`SELECT * FROM orders ORDER BY date DESC`;
      return NextResponse.json(rows);
    } catch (e) {
      console.error("Vercel Postgres GET error:", e);
    }
  }

  // 3. Try Local Memory / JSON fallback
  const orders = getMemoryOrders() || [];
  const sorted = [...orders].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return NextResponse.json(sorted);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
    
    // 1. Try Prisma if DATABASE_URL is defined
    if (process.env.DATABASE_URL) {
      try {
        const created = await prisma.order.create({
          data: newOrder,
        });
        return NextResponse.json({ success: true, order: created }, { status: 201 });
      } catch (e) {
        console.error("Prisma POST error:", e);
      }
    }

    // 2. Try Vercel Postgres fallback
    if (process.env.POSTGRES_URL) {
      try {
        await ensureTable();
        await sql`
          INSERT INTO orders (id, "customerName", phone, address, product, color, amount, status, date)
          VALUES (${newOrder.id}, ${newOrder.customerName}, ${newOrder.phone}, ${newOrder.address}, ${newOrder.product}, ${newOrder.color}, ${newOrder.amount}, ${newOrder.status}, ${newOrder.date})
        `;
        return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
      } catch (e) {
        console.error("Vercel Postgres POST error:", e);
      }
    }

    // 3. Try Local Memory / JSON fallback
    const orders = getMemoryOrders() || [];
    orders.push(newOrder);
    globalOrders = orders;
    
    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
