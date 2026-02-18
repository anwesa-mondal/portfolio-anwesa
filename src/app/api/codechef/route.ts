import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const codeChefRes = await fetch("https://cp-rating-api.vercel.app/codechef/blue_coder09");
    if (!codeChefRes.ok) throw new Error("CodeChef fetch failed");
    const codeChefData = await codeChefRes.json();
    return NextResponse.json(codeChefData);
  } catch (error) {
    console.error("CodeChef Stats Error:", error);
    return NextResponse.json({ error: "Failed to fetch CodeChef stats" }, { status: 500 });
  }
}
