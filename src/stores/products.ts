import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import ProductType from 'src/types/Product';

interface Todo {
  text: string;
  id: number;
  isFinished: boolean;
}



export const useTodos = defineStore('todos', {
  state: () => ({
    isLoading: true,
    todos: [] as Todo[],
    products: [] as ProductType[],
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
    async addProduct(product: ProductType): Promise<any> {

      try {
        const resp = await api.post('product', product)
        console.log(resp, "kreate resp");

        if (resp.status == 200) {
          this.isLoading = false
          // return resp.data
        }
      } catch (error) {
        console.log(error, 'error');
      }

      // this.products.push(product)
    },

    async editProduct(product: ProductType): Promise<any> {
      this.isLoading = true
      try {
        const resp = await api.put(`product`, product)
        console.log(resp, "edit resppppppppppppppppppppppppp");

        if (resp.status == 200) {
          this.isLoading = false
          
          // return resp.data
        }
      } catch (error) {
        console.log(error, 'error');
      }

      // this.products.push(product)
    },

    async getProduct(): Promise<any> {

      try {
        const resp = await api.get('product')
        console.log(resp.data);
       

        if (resp.status == 200) {
        this.products = resp.data
          return resp.data
        }
      } catch (error) {
        console.log(error, 'error');
      }
    }

  },
});




















