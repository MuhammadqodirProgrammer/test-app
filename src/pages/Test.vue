<template>
  <q-page padding>

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, veritatis!
<ProductModal>
  hello
</ProductModal>
  </q-page>
</template>

<script lang="ts">
import { Product, Meta } from 'components/models';
import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'src/boot/axios';

import ProductModal from '../components/ProductModal.vue';
import { useQuasar } from 'quasar';






const name = ref(null)
const age = ref(null)
const accept = ref(false)
const modalState = ref(false)











export default defineComponent({
  name: 'IndexPage',
  components: { ProductModal },
  emits: [
    // REQUIRED
    'ok', 'hide'
  ],
  methods: {
    onOk() {
      alert('hi')
    },
    onCancel() {
      alert('cancle')
    },
    handler() {
      // this.customDialogModel = true
    },

  },
  setup() {
    const $q = useQuasar()
    const posts = ref<Product[]>([]);
    const meta = ref<Meta>({
      totalCount: 1200
    });
    function confirm() {
      $q.dialog({
        title: 'Confirm',
        message: 'Would you like to turn on the wifi?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }


   const testFunc =()=> {
      console.log(this, 'this');

    }
    // const showModal = () => {
    //   modalState.value = true

    // };

    // const hideModal = () => {
    //   modalState.value = false
    // };


    onMounted(() => {
      getDataFunc()
      testFunc()
    })



    const getDataFunc = async () => {
      try {
        const resp = await api.get('product')
        console.log(resp.data, 'resp');
        if (resp.status == 200) {
          posts.value = resp.data
        }
      } catch (error) {
        console.log(error, 'error');
      }
    }
    // const postDataFunc = async () => {
    //   try {
    //     const data = {
    //       id: posts.value[posts.value.length - 1].id + 1,
    //       title: 'string',
    //       author: 'string',
    //       content: 'string'
    //     }

    //     const resp = await api.get('/posts')
    //     console.log(resp.data, 'resp');
    //     if (resp.status == 200) {
    //       posts.value = resp.data
    //     }
    //   } catch (error) {
    //     console.log(error, 'error');
    //   }
    // }
    return {
      posts,
      meta,
      expanded: ref(false),
      confirm,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
      modalState,
      name,
      age,
      accept,

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },

      onReset() {
        name.value = null
        age.value = null
        accept.value = false
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