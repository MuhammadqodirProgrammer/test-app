


<template>
  <q-btn color="primary" label="Button" @click="show" />
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin  q-pa-lg">


      <slot></slot>

      <q-card-actions align="center">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import {onMounted} from "vue"
export default {
  props: {
    // onOKClick: onOKClick,
    // show:showModal 
        isShow: {
            type: Boolean,
            required: true,
        },
        // favoriteMoviesCount: {
        //     type: Number,
        //     required: true,
        // }
  },

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
      this.$emit('ok' )
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick() {
      // we just need to hide the dialog
      this.hide()
    }
   
  }
}
</script>
