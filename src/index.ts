// TODO: Import readline untuk membaca input dari command line
import * as readline from 'readline';
import {
  addTodo,
  completeTodo,
  deleteTodo,
  listTodos,
  searchTodos,
} from './todoService';
import { isValidStringInput } from './utils';
import { initStorage } from './storage';
// TODO: Import fungsi-fungsi dari todoService

// TODO: Import fungsi-fungsi dari utils (termasuk type guards)

// TODO: Buat fungsi untuk menampilkan menu utama
// Tampilkan opsi seperti:
// 1. Add new todo
// 2. Mark todo as complete
// 3. Delete todo
// 4. List all todos
// 5. Search todos
// 6. Exit

// TODO: Buat fungsi untuk handle input dari user
// Gunakan readline.question untuk menerima input

// TODO: Buat fungsi main yang akan menjalankan aplikasi secara loop
// Hint: Gunakan recursive function atau while loop

// TODO: Jalankan fungsi main

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu(): void {
  console.log('=== TypeScript To-Do App ===');
  console.log('1. Add new todo');
  console.log('2. Mark todo as complete');
  console.log('3. Delete todo');
  console.log('4. List all todos');
  console.log('5. Search todos');
  console.log('6. Exit');
  console.log('============================');
}

function handleInput(): void {
  rl.question('Pilih menu (1-6): ', (choice) => {
    switch (choice.trim()) {
      case '1':
        rl.question('Masukkan teks To-Do baru: ', (text) => {
          if (isValidStringInput(text)) {
            addTodo(text);
          } else {
            console.log('\n Error: Teks To-Do tidak boleh kosong.\n');
          }
          runAppLoop();
        });
        break;

      case '2':
        listTodos();
        rl.question('Masukkan ID To-Do yang sudah selesai: ', (idStr) => {
          const id = parseInt(idStr, 10);
          if (!isNaN(id)) {
            completeTodo(id);
          } else {
            console.log('\n Error: ID harus berupa angka.\n');
          }
          runAppLoop();
        });
        break;

      case '3':
        const currentTodos = listTodos(); // Pastikan list dipanggil dulu

        rl.question(
          'Masukkan ID To-Do yang akan dihapus (atau ketik 0 untuk batal): ',
          (idStr) => {
            if (idStr.trim() === '0') {
              console.log('\n[i] Penghapusan dibatalkan.\n');
              runAppLoop();
              return;
            }

            const id = parseInt(idStr, 10);
            if (!isNaN(id)) {
              deleteTodo(id);
            } else {
              console.log(
                '\n Error: Input tidak valid. Harap masukkan angka ID.\n'
              );
            }
            runAppLoop();
          }
        );
        break;

      case '4':
        listTodos();
        runAppLoop();
        break;

      case '5':
        rl.question('Masukkan kata kunci pencarian: ', (keyword) => {
          if (isValidStringInput(keyword)) {
            searchTodos(keyword);
          } else {
            console.log('\n Error: Kata kunci tidak boleh kosong.\n');
          }
          runAppLoop();
        });
        break;

      case '6':
        console.log(
          '\nTerima kasih telah menggunakan aplikasi ini. Thank you!\n'
        );
        rl.close();
        break;

      default:
        console.log('\n Error: Pilihan tidak valid. Harap pilih angka 1-6.\n');
        runAppLoop();
        break;
    }
  });
}

function runAppLoop(): void {
  showMenu();
  handleInput();
}

function main(): void {
  console.log('\nWelcome to TypeScript To-Do App!');
  console.log('Start building your app here...\n');
  initStorage();

  runAppLoop();
}

main();
