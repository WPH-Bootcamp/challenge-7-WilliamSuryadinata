// TODO: Import tipe-tipe yang sudah didefinisikan di types.ts

// TODO: Import fungsi storage untuk baca/tulis file

// TODO: Buat fungsi untuk menambahkan To-Do baru
// - Generate id yang unik (bisa pakai timestamp atau counter)
// - Pastikan text tidak kosong
// - Set default status sebagai active

// TODO: Buat fungsi untuk menandai To-Do sebagai selesai
// - Cari To-Do berdasarkan id
// - Ubah statusnya menjadi completed
// - Handle kasus jika id tidak ditemukan

// TODO: Buat fungsi untuk menghapus To-Do
// - Filter To-Do berdasarkan id
// - Handle kasus jika id tidak ditemukan

// TODO: Buat fungsi untuk menampilkan semua To-Do
// - Tampilkan dengan format yang rapi
// - Tambahkan status [ACTIVE] atau [DONE] di depan setiap To-Do
// - Berikan nomor urut untuk memudahkan user memilih

// TODO: Buat fungsi untuk mencari To-Do berdasarkan keyword

import { Todo } from './types';
import { readTodos, saveTodos } from './storage';
import { formatDateTime } from './utils';

export function addTodo(text: string): void {
  const todos = readTodos();

  const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

  const newTodo: Todo = {
    id: newId,
    text: text.trim(),
    status: 'active',
    createdAt: formatDateTime(new Date()),
  };

  todos.push(newTodo);
  saveTodos(todos);
  console.log(`\n Berhasil: to-Do "${newTodo.text}" telah ditambahkan!\n`);
}

export function completeTodo(id: number): void {
  const todos = readTodos();
  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex !== -1) {
    todos[todoIndex].status = 'done';
    saveTodos(todos);
    console.log(`\n Berhasil: To-Do ID ${id} ditandai sebagai selesai!\n`);
  } else {
    console.log(`\n Error: To-Do dengan ID ${id} tidak ditemukan.\n`);
  }
}

export function deleteTodo(id: number): void {
  const todos = readTodos();
  const filteredTodos = todos.filter((t) => t.id !== id);

  if (filteredTodos.length !== todos.length) {
    saveTodos(filteredTodos);
    console.log(`\n Berhasil: To-Do ID ${id} telah dihapus!\n`);
  } else {
    console.log(`\n Error: To-Do dengan ID ${id} tidak ditemukan.\n`);
  }
}

export function listTodos(): void {
  const todos = readTodos();
  if (todos.length === 0) {
    console.log('\n📝 To-Do List masih kosong.\n');
    return;
  }

  console.log('\n--- Daftar To-Do ---');
  todos.forEach((todo) => {
    const statusTag = todo.status === 'active' ? '[ACTIVE]' : '[DONE]  ';
    console.log(`${statusTag} ${todo.id}. ${todo.text}`);
  });
  console.log('--------------------\n');
}

export function searchTodos(keyword: string): void {
  const todos = readTodos();
  const filtered = todos.filter((t) =>
    t.text.toLowerCase().includes(keyword.toLowerCase())
  );

  if (filtered.length === 0) {
    console.log(`\n Tidak ditemukan To-Do dengan kata kunci "${keyword}".\n`);
    return;
  }

  console.log(`\n--- Hasil Pencarian: "${keyword}" ---`);
  filtered.forEach((todo) => {
    const statusTag = todo.status === 'active' ? '[ACTIVE]' : '[DONE]  ';
    console.log(`${statusTag} ${todo.id}. ${todo.text}`);
  });
  console.log('---------------------------------\n');
}
