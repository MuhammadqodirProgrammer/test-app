<template>
  <q-page padding>
    <q-div class="display-flex ">

      <q-toolbar-title class="text-center  text-h4 text-teal-3  q-mt-sm  ">
        Products
      </q-toolbar-title>
      <!-- Create Modal -->
      <ProductModal :isShow="modalState">

        <q-toolbar-title class="text-center text-h4 text-bold text-weight-bolder q-mb-sm">
          Create modal
        </q-toolbar-title>

        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input filled v-model="name" label="Your name *" hint="Name and surname" lazy-rules
            :rules="[(val: string | any[]) => val && val.length > 0 || 'Please type something']" />

          <q-input filled type="number" v-model="age" label="Your age *" lazy-rules :rules="[
            (val: string | null) => val !== null && val !== '' || 'Please type your age',
            (val: number) => val > 0 && val < 100 || 'Please type a real age'
          ]" />

          <q-toggle v-model="accept" label="I accept the license and terms" />

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>

      </ProductModal>

    </q-div>

    <div class="q-pa-md">
      <q-markup-table title="Crud uchun table">
        <thead>
          <tr>
            <th class="text-left">T/R</th>
            <th class="text-right">Product Name</th>
            <th class="text-right">Cost</th>
            <th class="text-right">product_type_id</th>
            <th class="text-right">Created Date</th>
            <th class="text-right">Edit</th>
            <th class="text-right">Delete</th>
          </tr>
        </thead>
        <tbody>

          <tr v-for="post in posts" :key="post.id">
            <td class="text-left">{{ post.id }}</td>
            <td class="text-right">{{ post.name_uz }}</td>
            <td class="text-right">{{ post.cost }}</td>
            <td class="text-right">{{ post.product_type_id }}</td>
            <td class="text-right">{{ post.created_date }}</td>
            <td class="text-right"> <q-btn flat round color="red" icon="delete" @click="confirm" /></td>
            <td class="text-right"><q-btn flat round color="accent" icon="edit" /></td>

          </tr>

        </tbody>
      </q-markup-table>
    </div>

    <button @click="postDataFunc">add</button>
    <!-- <q-dialog v-model="customDialogModel" stack-buttons prevent-close @ok="onOk" @cancel="onCancel">
    <span slot="title">Alert</span>
    <span slot="message"><buyer-info></buyer-info></span>
  </q-dialog> -->

  </q-page>
</template>

<script lang="ts">
import { Product, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'src/boot/axios';

import ProductModal from '../components/ProductModal.vue';
import { useQuasar } from 'quasar';





const $q = useQuasar()

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


    const testFunc = () => {
      console.log(this, 'this');

    }
    const showModal = () => {
      modalState.value = true

    };

    const hideModal = () => {
      modalState.value = false
    };


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
    const postDataFunc = async () => {
      try {
        const data = {
          // id: 15646,
          product_type_id: 0,
          name_uz: "nameuz",
          cost: 0,
          address: "adress",
          created_date: 1705992706000
        }
        const resp = await api.post('/product', data)
        console.log(resp.data, 'resp post');
        if (resp.status == 200) {
          getDataFunc()
        }
      } catch (error) {
        console.log(error, 'error');
      }
    }
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
      postDataFunc,
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