// TODO: Definisikan tipe data untuk To-Do item di sini
// Hint: To-Do sebaiknya memiliki id, text, dan status completed

// TODO: Buat interface untuk To-Do item

// TODO: Buat tipe untuk status To-Do (active/done)

// TODO: Buat tipe untuk fungsi-fungsi yang akan digunakan

export type TodoStatus = 'active' | 'done';

export interface Todo {
  id: number;
  text: string;
  status: TodoStatus;
  createdAt: string;
}

export interface TodoService {
  addTodo: (text: string) => void;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  listTodos: () => void;
  searchTodos: (keyword: string) => void;
}
