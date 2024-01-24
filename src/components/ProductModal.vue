
<template>
  <q-btn color="primary" label="Button" @click="show" />
  <q-dialog ref="dialog" @hide="onDialogHide">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, eaque?
    <q-card class="q-dialog-plugin  q-pa-lg">


      <q-toolbar-title class="text-center text-h4 text-bold text-weight-bolder q-mb-sm">
        Create modal
      </q-toolbar-title>

      <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input filled v-model="name" label="Your name *" hint="Name and surname" lazy-rules
          :rules="[val=> val && val.length > 0 || 'Please type something']" />
        
        <div>
          <q-btn label="Submit" type="submit" color="primary" @click="onOKClick" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" @click="onCancelClick"  />
        </div>
      </q-form>

      <q-card-actions align="center">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  name: 'ProductModal',
  props: ['test'],

  emits: [
    // REQUIRED
    'ok', 'hide'
  ],

  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide()
    },

    onDialogHide() {
      this.$emit('hide')
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
    }

  }
}
</script>
