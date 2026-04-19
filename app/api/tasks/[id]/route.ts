import { NextResponse } from "next/server";
import { updateTask, deleteTask } from "@/lib/store";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    const body = await req.json();
    const task = updateTask(id, body.title, body.done);
    if (!task) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(task);
}

export async function DELETE(_: Request, { params }: {params: { id: string } }) {
    const id = parseInt(params.id);
    const success = deleteTask(id);
    if (!success) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted" });
}