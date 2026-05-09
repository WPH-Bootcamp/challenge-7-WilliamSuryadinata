import * as fs from 'fs';
import * as path from 'path';
import { Todo } from './types';
import { isValidTodoArray } from './utils';

// TODO: Definisikan path file untuk menyimpan data To-Do

// TODO: Buat fungsi untuk membaca To-Do dari file
// Hint: Gunakan try-catch untuk handle error saat membaca file

// TODO: Buat fungsi untuk menyimpan To-Do ke file
// Hint: Jangan lupa konversi ke JSON string sebelum disimpan

// TODO: Buat fungsi untuk inisialisasi storage (buat file kosong jika belum ada)

const Data_Dir = path.join(__dirname, '..', 'data');
const File_Path = path.join(Data_Dir, 'todos.json');

export function initStorage(): void {
  try {
    if (!fs.existsSync(Data_Dir)) {
      fs.mkdirSync(Data_Dir, { recursive: true });
    }
    if (!fs.existsSync(File_Path)) {
      saveTodos([]);
    }
  } catch (error) {
    console.error('Gagal inisialisasi storage:', error);
  }
}

export function readTodos(): Todo[] {
  try {
    if (!fs.existsSync(File_Path)) {
      initStorage();
      return [];
    }
    const data = fs.readFileSync(File_Path, 'utf-8');
    const parsed = JSON.parse(data);

    if (isValidTodoArray(parsed)) {
      return parsed;
    } else {
      console.error(
        'Format data di todos.json tidak valid. Mengembalikan array kosong.'
      );
      return [];
    }
  } catch (error) {
    console.error('Error saat membaca file todos.json:', error);
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  try {
    const jsonString = JSON.stringify(todos, null, 2);
    fs.writeFileSync(File_Path, jsonString, 'utf-8');
  } catch (error) {
    console.error('Error saat menyimpan ke todos.json:', error);
  }
}
