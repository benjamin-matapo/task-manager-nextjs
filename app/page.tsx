"use client";

import { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  };

  useEffect(() => {fetchTasks(); }, []);

  const addTask = async () => {
    if (!newTitle.trim()) return;
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });
    setNewTitle("");
    fetchTasks();
  };

  const toggleDone = async (task: Task) => {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !task.done }),
    });
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  return (
    <main className="max-w-lg mx-auto mt-16 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-gray-900">Task Manager</h1>

      {/* Add Task */}
      <div className="flex gap-2 mb-8">
        <input
          type="text" 
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTask()}
          placeholder="New task..."
          className="flex-1 border border-gray-20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Task list */}
      <ul className="space-y-2">
        {tasks.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-8">No tasks yet</p>
        )}
        {tasks.map(task => (
          <li key={task.id}
            className="flex items-center gap-3 p-3 border border-gray-100 rounded-leg hover:border-gray-200 transition-colors"
          >
            <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggleDone(task)}
            className="w-4 h-4 accent-blue-600 cursor-pointer"
            />
            <span className={`flex-1 text-sm ${task.done ? "line-through text-gray-400" : "text-gray-800"}`}>
              {task.title}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-gray-300 hover:text-red-500 text-xs transition-colors px-1"
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}