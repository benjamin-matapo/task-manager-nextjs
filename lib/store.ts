export interface Task {
    id: number;
    title: string;
    done: boolean;
}

// Module-level - persists across requests while server runs
let tasks: Task[] = [];
let nextId = 1;

export function getTasks(): Task[] {
    return tasks;
}

export function createTask(title: string): Task {
    const task: Task = { id: nextId++, title, done: false };
    tasks.push(task);
    return task;
}

export function updateTask(id: number, title?: string, done?: boolean): Task | null {
    const task = tasks.find(t => t.id === id);
    if (!task) return null;
    if (title != undefined) task.title = title;
    if (done !== undefined) task.done = done;
    return task;
}

export function deleteTask(id: number): boolean {
    const before = tasks.length;
    tasks = tasks.filter(t => t.id !== id);
    return tasks.length < before;
}