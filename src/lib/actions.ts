"use server";
import { revalidatePath } from "next/cache";
import { getDbConnection } from "./db";
import type { Todo } from "./types";

export async function getTodos() {
  const sql = await getDbConnection();
  try {
    const res = await sql`SELECT * FROM todo ORDER BY id DESC`;
    return res;
  } catch (err) {
    console.log(err);
  }
  return [];
}

export async function addTodo(text: string) {
  const sql = await getDbConnection();
  try {
    const res = await sql`INSERT INTO todo (text) VALUES (${text}) RETURNING *`;
    revalidatePath("/");
    return res;
  } catch (err) {
    console.log(err);
  }
  return null;
}

export async function deleteTodo(id: number) {
  const sql = await getDbConnection();
  const res = await sql`DELETE FROM todo WHERE id=${id} RETURNING *`;
  revalidatePath("/");
  return false;
}

export async function toggleTodo(id: number) {
  const sql = await getDbConnection();
  const res = await sql`UPDATE todo SET is_done= NOT is_done where id = ${id}`;
  revalidatePath("/");
  return res;
}
