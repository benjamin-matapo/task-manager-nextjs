import { NextResponse } from "next/server";
import { getTasks, createTask } from "@/lib/store";

export async function GET() {
    return NextResponse.json(getTasks());
}

export async function POST(req: Request) {
    const { title } = await req.json();
    if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });
    return NextResponse.json(createTask(title), { status: 201 });
}