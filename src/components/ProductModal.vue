
<template>
  <q-btn  v-show=" modalName =='create'" color="primary" label="Create Product" @click="show" />
  <q-btn v-show="modalName=='edit'" flat round color="accent" icon="edit" @click="show" />
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin  q-pa-lg">
      <q-toolbar-title class="text-center text-h4 text-bold text-weight-bolder q-mb-sm">
        {{ title }}
      </q-toolbar-title>
      <slot></slot>

      <!-- <q-card-actions align="center">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions> -->
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  name: 'ProductModal',
  props: ['title','modalName'],

  emits: [
    // REQUIRED
    'ok', 'hide'
  ],

  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show()

      console.log(title, "ttjifa");

    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide()
    },

    onDialogHide() {
      this.$emit('hide')
    },
    test() {
      console.log(btnData, "btnData");
    },
    onOKClick() {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })
      console.log("send message")
      // then hiding dialog
      this.hide()
    },

    onCancelClick() {
      this.hide()
    },

    setup(props) {
      // props.myObjectProp ni o'zgartirish huquqiga ega bo'lgan ref
      const myObject = ref(props.myObjectProp);
      // props.myObjectProp o'zgarganda shu o'zgarishni boshqa funksiya orqali ko'rish
      console.log(myObject, "myObject myObject");
      watch(() => props.myObjectProp, (newValue) => {
        myObject.value = newValue;
      });
      // myObject ni o'zgartirish
      const changeMyObject = () => {
        myObject.value.name = 'Alice';
      };
      return {
        myObject,
        changeMyObject,
      };
    },

  }
}
</script>
