<template>
  <q-dialog :model-value="myDialog.$state.isOpen" persistent  >

    <q-card style="width: 500px; max-width: 100%; ">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>
         {{ title }}
        </q-toolbar-title>
        <q-btn icon="close" flat @click="closeModal" />
      </q-toolbar>

      <slot></slot>

    </q-card>

  </q-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,

} from 'vue';
import { useDialogStore } from "../stores/modal"



export default defineComponent({
  name: 'DialogComponent',
  props: {
    title: {
      type: String,
      required: true
    },
  },
  setup(props) {
    const myDialog = useDialogStore();

    const test = ref(true)
    console.log(test.value, "testing");
    console.log(myDialog.$state.isOpen, "myDialog.$state.isOpen tttttttttttttttt");

    const closeModal = () => {
      myDialog.$state.isOpen = !myDialog.$state.isOpen
    }

    return { ...props, closeModal, myDialog, test };
  },
});
</script>
