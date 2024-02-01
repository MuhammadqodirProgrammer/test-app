import { defineStore } from 'pinia';


export const useDialogStore = defineStore('modal', {
  state: () => ({
    isOpen:false,
  }),
  getters: {
  },
  actions: {
    changeState(text: string): void {
     this.$state.isOpen =this.$state.isOpen ? false :true
    },

  },
});




















