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
        <tbody v-if="posts.length">

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

    <!-- Loading  -->
    <div class="q-pa-md q-gutter-md" v-show="!posts.length">
      <q-card class="relative-position " flat bordered>
        <q-card-section class="q-pb-none">
          <div class="text-h6">Get Products </div>
        </q-card-section>

        <q-card-section>
        </q-card-section>

        <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal"
          label-style="font-size: 1.1em" />
      </q-card>
    </div>






    <!-- create modal -->
    <ProductModal :title="' Create modal'" :modalName="'create'">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input filled v-model="productNameRef" label="product name " lazy-rules
          :rules="[(val: string) => (val && val.length) || 'Iltimos maxsulotni nomini kiriting!', (val: string) => typeof +val !== 'string' || 'Product name must be a string!']" />

        <q-input filled v-model="addressRef" label="product address " lazy-rules
          :rules="[(val: string) => (val && val.length) || 'Iltimos maxsulotni addressni kiriting!', (val: string) => typeof +val !== 'string' || 'Product name must be a string!']" />


        <q-input filled type="number" v-model="costRef" label="Product cost" lazy-rules
          :rules="[(val: number) => val && val > 0 || 'Iltimos maxsulotni narxini kiriting!']" />
        <q-select filled v-model="product_typeRef" :options="options" label="select product type " option-label="name_uz"
          option-value="id" stack-label />
        <q-card-actions align="center">
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn color="negative" type="reset" label="Cancel" @click="cancelFunc" v-close-popup />
        </q-card-actions>
      </q-form>
    </ProductModal>
    
  </q-page>
</template>

<script lang="ts">
import { Product } from 'components/models';
import { defineComponent, ref, onMounted, } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import CreateDialogComponent from 'src/components/product-modal/CreateDialogComponent.vue';
import EditDialogComponent from 'src/components/product-modal/EditDialogComponent.vue';

import { storeToRefs } from 'pinia'
import { useProduct } from 'src/stores/products';
import ProductType from 'src/types/Product';
import ProductModal from 'src/components/ProductModal.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { CreateDialogComponent, EditDialogComponent, ProductModal },
  emits: [
    // REQUIRED
    'ok', 'hide'
  ],
  data() {
    return {
      showDialog: false,
    }
  },
  methods: {


  },
  setup() {
    const $q = useQuasar()
    const posts = ref<ProductType[]>([]);
    // product state
    const productStore = useProduct()
    const {  getProductTypes } = storeToRefs(productStore)
    // loading 
    const visible = ref(true)
   
    const costRef = ref('')
    const productNameRef = ref('')
    const product_typeRef = ref('')
    const addressRef = ref('')
    const options = ref([])
    const showSimulatedReturnData = ref(false)

    const data = ref('Initial data');
    const updateData = () => {
      alert(data.value)
      data.value = 'Updated data';
    };


    function confirm(id: number) {
      $q.dialog({
        title: 'Productni o\'chirish',
        message: 'Siz bu productni ochirmoqchimisz?',
        cancel: true,
        persistent: false
      }).onOk(async () => {
        try {
          const resp = await api.delete(`/product/${id}`,)
          if (resp.status == 200) {
            alert(resp.data)
            getDataFunc()
          }
        } catch (error) {
          console.log(error);
        }
      })
    }
    onMounted(async() => {
      getDataFunc()

      const getTypes = await getProductTypes.value
      options.value = getTypes
    })

    const getDataFunc = async () => {

      const respProducts = await api.get('product')


const resp = (await api.get('product/get-product-types')).data
const newArr: any = []
respProducts.data.filter((product: ProductType) => {
  resp.filter((productType: Product) => {
    if (productType.id == product.product_type_id) {
      newArr.push({ ...product, productType: productType.name_uz })
    }
  })

})
      posts.value = newArr


    }
    const postDataFunc = async (data: ProductType[]) => {
      try {
        const resp = await api.post('/product', data)
       await productStore.addProduct(data)
        if (resp.status == 200) {
         await  getDataFunc()
        }
      } catch (error) {
        console.log(error, 'error');
      }
    }

    const editChangeData = (allProduct: ProductType[]) => {
      posts.value = allProduct
    }

    const onSubmit = async (evt: any) => {
      evt.preventDefault();

      const currentDate = new Date()
      const productData = {
        product_type_id: product_typeRef.value?.id,
        name_uz: productNameRef.value,
        cost: +costRef.value,
        address: addressRef.value,
        created_date: currentDate,
      };

    
    const resp = await api.post('/product', productData)
        if (resp.status == 200) {
           getDataFunc()
        }
   

    }


    return {
      visible,
      posts,
      confirm,
      postDataFunc,
      getDataFunc,
      editChangeData,
      showSimulatedReturnData,
      onSubmit,
      product_typeRef,
      productNameRef,
      addressRef,
      costRef,
      updateData,
      options,
      showTextLoading() {
        visible.value = false
        showSimulatedReturnData.value = true
      },


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