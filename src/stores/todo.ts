import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

interface Todo {
  text: string;
  id: number;
  isFinished: boolean;
}



export const useTodos = defineStore('todos', {
  state: () => ({
    isLoading: true,
    todos: [] as Todo[],
    filter: 'all' as 'all' | 'finished' | 'unfinished',
    nextId: 0,
  }),
  getters: {
    finishedTodos(state): Todo[] {
      return state.todos.filter((todo) => todo.isFinished);
    },
    unfinishedTodos(state): Todo[] {
      return state.todos.filter((todo) => !todo.isFinished);
    },
    filteredTodos(state): Todo[] {
      if (this.filter === 'finished') {
        return this.finishedTodos;
      } else if (this.filter === 'unfinished') {
        return this.unfinishedTodos;
      }
      return this.todos;
    },

   
  },
  actions: {
    addTodo(text: string): void {
      this.todos.push({ text, id: this.nextId++, isFinished: false });
    },

  },
});




















