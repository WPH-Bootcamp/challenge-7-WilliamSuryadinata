import { Todo } from './types';
// TODO: Implementasikan type guards di sini
// Hint: Type guard berguna untuk memastikan tipe data saat runtime

// TODO: Buat fungsi untuk memvalidasi apakah suatu objek adalah To-Do yang valid

// TODO: Buat fungsi helper untuk menampilkan tanggal/waktu dengan format yang bagus

// TODO: Buat fungsi untuk memastikan input dari user adalah string yang valid

export function isValidTodo(obj: unknown): obj is Todo {
  if (typeof obj !== 'object' || obj === null) return false;

  const todo = obj as Record<string, unknown>;
  return (
    typeof todo.id === 'number' &&
    typeof todo.text === 'string' &&
    (todo.status === 'active' || todo.status === 'done')
  );
}

export function isValidTodoArray(arr: unknown): arr is Todo[] {
  return Array.isArray(arr) && arr.every(isValidTodo);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export function isValidStringInput(input: unknown): input is string {
  return typeof input === 'string' && input.trim().length > 0;
}
