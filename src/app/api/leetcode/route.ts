import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const leetCodeRes = await fetch("https://alfa-leetcode-api.onrender.com/Coder-crooz-v2/profile");
    if (!leetCodeRes.ok) throw new Error("LeetCode fetch failed");
    const leetCodeData = await leetCodeRes.json();
    return NextResponse.json(leetCodeData);
  } catch (error) {
    console.error("LeetCode Stats Error:", error);
    return NextResponse.json({ error: "Failed to fetch LeetCode stats" }, { status: 500 });
  }
}
