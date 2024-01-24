<template>
  <q-page padding>
    <div class=" items-center justify-center flex ">

      <q-toolbar-title class=" text-h4 text-teal-3   ">
        Products
      </q-toolbar-title>
      <CreateDialogComponent @sendDataEvent="postDataFunc" />
    </div>
    <div class="q-pa-md">
      <q-markup-table title="Crud uchun table">
        <thead>
          <tr>
            <th class="text-left">T/R</th>
            <th class="text-center">Product Name</th>
            <th class="text-center">Cost</th>
            <th class="text-center">Adress</th>
            <th class="text-center">product_type_id</th>
            <th class="text-center">Created Date</th>
            <th class="text-center">Edit</th>
            <th class="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>

          <tr v-for="( post, inx ) in  posts " :key="post.id">
            <td class="text-left">{{ inx + 1 }}</td>
            <td class="text-center">{{ post.name_uz }}</td>
            <td class="text-center">{{ post.cost }}</td>
            <td class="text-center">{{ post.address }}</td>
            <td class="text-center">{{ post.productType }}</td>
            <td class="text-center">{{ (new Date(post.created_date)).toISOString().substring(0, 10) }}</td>
            <td class="text-center"> <q-btn flat round color="red" icon="delete" @click="confirm(post.id)" /></td>
            <td class="text-center">
              <EditDialogComponent :key="post.id" :oneProduct="post" @editProductData="editChangeData" />
            </td>
          </tr>

        </tbody>
      </q-markup-table>
    </div>
    <q-toolbar-title v-if="!posts.length" class=" text-h4 text-red-3  text-center  ">
      No Products ☹
    </q-toolbar-title>
    <Loading/>
  </q-page>
</template>

<script lang="ts">
import { Product } from 'components/models';

import { defineComponent, ref, onMounted, onUpdated } from 'vue';
import { api } from 'src/boot/axios';

// import ProductModal from '../components/ProductModal.vue';
import { useQuasar } from 'quasar';
import CreateDialogComponent from 'src/components/product-modal/CreateDialogComponent.vue';
import EditDialogComponent from 'src/components/product-modal/EditDialogComponent.vue';
import { computed } from 'vue';

import { storeToRefs } from 'pinia'
import { useTodos } from 'src/stores/products';
import ProductType from 'src/types/Product';
import Loading from 'src/components/Loading.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { CreateDialogComponent, EditDialogComponent, Loading },
  emits: [
    // REQUIRED
    'ok', 'hide'
  ],
  methods: {
    receiveData(data: any) {
      console.log(data, "data          --------"); // "Salom, Dunyo!"
    }
  },
  setup() {
    const $q = useQuasar()
    const posts = ref<ProductType[]>([]);

    const todosStore = useTodos()
    const { filter, filteredTodos } = storeToRefs(todosStore)



    function confirm(id: number) {
      $q.dialog({
        title: 'Productni o\'chirish',
        message: 'Siz bu productni ochirmoqchimisz?',
        cancel: true,
        persistent: false
      }).onOk(async () => {
        try {
          const resp = await api.delete(`/product/${id}`,)
          console.log(resp, 'resp delete');
          if (resp.status == 200) {
            alert(resp.data)
            getDataFunc()
          }
        } catch (error) {
          console.log(error);
        }
      })
    }
    onMounted(() => {
      getDataFunc()

    })

    const getDataFunc = async () => {

      const getAllProducts = await todosStore.getProduct()
      const resp = (await api.get("product/get-product-types")).data
      let newArr: any = []
      getAllProducts.filter((product: ProductType) => {
        resp.filter((productType: Product) => {
          if (productType.id == product.product_type_id) {
            newArr.push({ ...product, productType: productType.name_uz })
          }
        })
        
      })
      console.log(newArr, "prduct");
      posts.value = newArr
    }
    const postDataFunc = async (data: ProductType[]) => {
      try {

        const resp = await api.post('/product', data)
        console.log(resp.data, 'resp post');
        if (resp.status == 200) {
          getDataFunc()
        }

        // todosStore.addProduct(data)


      } catch (error) {
        console.log(error, 'error');
      }
    }

    const editChangeData = (allProduct: ProductType[]) => {
      posts.value = allProduct
    }
    return {
      posts,
      confirm,
      postDataFunc,
      getDataFunc,
      editChangeData

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