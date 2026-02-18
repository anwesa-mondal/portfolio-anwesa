import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const codeforcesRes = await fetch("https://cp-rating-api.vercel.app/codeforces/Coder-crooz-v2");
    if (!codeforcesRes.ok) throw new Error("Codeforces fetch failed");
    const codeforcesData = await codeforcesRes.json();
    return NextResponse.json(codeforcesData);
  } catch (error) {
    console.error("Codeforces Stats Error:", error);
    return NextResponse.json({ error: "Failed to fetch Codeforces stats" }, { status: 500 });
  }
}
