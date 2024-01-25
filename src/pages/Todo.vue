<template>
  <q-page padding>
    <label><input v-model="filter" type="radio" value="all"> All</label>
    <label><input v-model="filter" type="radio" value="finished"> Finished</label>
    <label><input v-model="filter" type="radio" value="unfinished"> Unfinished</label>
    <hr>
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input v-model="todo.isFinished" type="checkbox">
        {{ todo.text }}
      </li>
    </ul>
    <label>
      New Todo:
      <input v-model="newTodoText" type="text" @keypress.enter="addTodo">
    </label>
    <button :disabled="!newTodoText" @click="addTodo">Add</button>


  
  </q-page>
</template>



<script lang="ts">
import { defineComponent } from 'vue';


import { storeToRefs } from 'pinia'
import { useTodos } from 'src/stores/todo';

import { useQuasar } from 'quasar'
import { ref, watch ,inject } from 'vue';
import { useProduct } from 'src/stores/products';
export default defineComponent({
  name: 'TodoPage',
  components: {  },
  emits: [
    // REQUIRED
    'ok', 'hide'
  ],
  data() {
    return {
      showDialog: false,
      productName: '',
      cost: '',
      address: '',
      product_type: '',
      options: [],
      isToggled: false
    }
  },
  methods: {

  },
  setup() {


    const todosStore = useTodos()
    const { filter, filteredTodos } = storeToRefs(todosStore)


    const newTodoText = ref('')
    function addTodo() {
      if (!newTodoText.value) {
        return
      }

      todosStore.addTodo(newTodoText.value)
      newTodoText.value = ''
    }

    return {
      addTodo,
      newTodoText,
      filteredTodos,
      filter,
      onOKClick() {
        return this
      }
    };
  }

});
</script> 

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 350px;
}
</style>