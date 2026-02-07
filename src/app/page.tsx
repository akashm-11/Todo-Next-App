import { getTodos } from "@/lib/actions";
import TodoList from "@/components/todo-list";
import AddTodoForm from "@/components/add-todo-form";
export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch todos using server action
  const todos = await getTodos();
  return (
    <main className="flex flex-col justify-center-safe items-center min-h-screen bg-amber-50">
      <div className="max-w-md mx-auto bg-rose-200 rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-6 uppercase text-center">
          Todo List
        </h1>
        <AddTodoForm />
        <TodoList initialTodos={todos} />
      </div>
    </main>
  );
}
