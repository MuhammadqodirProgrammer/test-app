<template>
    <q-dialog v-model="showDialog">
        <q-card class="  q-pa-lg" style="width:480px; max-width:100%">

            <q-toolbar>
                <q-toolbar-title class="text-center text-h4 text-bold text-weight-bolder q-mb-sm">
                    Create modal
                </q-toolbar-title>
            </q-toolbar>


            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <q-input filled v-model="productName" label="product name " lazy-rules
                    :rules="[val => (val && val.length) && (typeof val =='string') > 0 || 'Iltimos maxsulotni nomini kiriting!']" />

                <q-input filled v-model="address" label="product address " lazy-rules
                    :rules="[val => (val && val.length) && (typeof val =='string') > 0 || 'Iltimos maxsulotni addressni kiriting!']" />


                <q-input filled type="number" v-model="cost" label="Product cost" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Iltimos maxsulotni narxini kiriting!']" />
                <q-select filled v-model="product_type_id" :options="options" label="select product type " stack-label />
                <q-card-actions align="center">
                    <q-btn label="Submit" type="submit" color="primary" @click="onOKClick" />
                    <q-btn color="negative" type="reset" label="Cancel" @click="onCancelClick" v-close-popup />
                </q-card-actions>
            </q-form>



        </q-card>

    </q-dialog>
    <q-btn flat round color="accent" icon="edit" @click="editModalFunc(oneProduct)" />

</template>

<script>
import { api } from 'src/boot/axios';
import { storeToRefs } from 'pinia'
import { useTodos } from 'src/stores/products';
// import ProductType from 'src/types/Product';
export default {

    name: "EditDilogComponent",
    props: {
        oneProduct: Object
    },
    data() {
        return {
            showDialog: false,
            productName: this.oneProduct.name_uz,
            cost: this.oneProduct.cost,
            address: this.oneProduct.address,
            product_type_id: this.oneProduct.product_type_id,
            options: [
                1, 2, 3
            ],
            productId: this.oneProduct.id

        }
    },
    methods: {
        async onOKClick(evt) {
            evt.preventDefault();

            const currentDate = new Date()
            const data = {
                id: this.productId,
                product_type_id: this.product_type_id,
                name_uz: this.productName,
                cost: this.cost,
                address: this.address,
                created_date: currentDate
            }
            // (this.product_type_id && this.productName && this.cost && this.address) ? this.showDialog = false : alert("Please enter value all inputs")

            const todosStore = useTodos()

            await todosStore.editProduct(data)
            const getAllProducts = await todosStore.getProduct()
      const resp = (await api.get("product/get-product-types")).data
      let newArr = []
      getAllProducts.filter((product) => {
        resp.filter((productType) => {
          if (productType.id == product.product_type_id) {
            newArr.push({ ...product, productType: productType.name_uz })
          }
        })
        
      })
      console.log(newArr, "prduct");
          this.$emit("editProductData", newArr)
          if (!todosStore.isLoading) return this.showDialog =false

        },

        async editModalFunc(oneProduct) {
            this.showDialog = true
        }

    },
}
</script>

<style lang="scss" scoped></style>