import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';


export const useModal = defineStore('modal', {
  state: () => ({
    isLoading: true,
    isOpen:true,
    filter: 'all' as 'all' | 'finished' | 'unfinished',
  }),
  getters: {
    finishedTodos(state):Boolean {
      return state.isOpen
    },
  

   
  },
  actions: {
    changeState(text: string): void {
     this.$state.isOpen =!this.$state.isOpen
    },

  },
});




















