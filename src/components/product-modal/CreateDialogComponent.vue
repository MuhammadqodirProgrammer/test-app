<template>
    <q-dialog v-model="showDialog">
        <q-card class="  q-pa-lg" style="width:480px; max-width:100%">

            <q-toolbar>
                <q-toolbar-title class="text-center text-h4 text-bold text-weight-bolder q-mb-sm">
                    Create modal
                </q-toolbar-title>
                <!-- <q-btn flat icon="close" v-close-popup /> -->
            </q-toolbar>


            <q-form @submit="onOKClick" class="q-gutter-md">
                <q-input filled v-model="productName" label="product name " lazy-rules
                    :rules="[val => (val && val.length) || 'Iltimos maxsulotni nomini kiriting!', val => typeof +val !== 'string' || 'Product name must be a string!']" />

                <q-input filled v-model="address" label="product address " lazy-rules
                    :rules="[val => (val && val.length) || 'Iltimos maxsulotni addressni kiriting!', val => typeof +val !== 'string' || 'Product name must be a string!']" />


                <q-input filled type="number" v-model="cost" label="Product cost" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Iltimos maxsulotni narxini kiriting!']" />
                <q-select filled v-model="product_type" :options="options" label="select product type "
                    option-label="name_uz" option-value="id" stack-label />
                <q-card-actions align="center">
                    <q-btn label="Submit" type="submit" color="primary" />
                    <q-btn color="negative" type="reset" label="Cancel" @click="cancelFunc" v-close-popup />
                    <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" v-close-popup /> -->
                </q-card-actions>
            </q-form>

        </q-card>

    </q-dialog>
    <q-btn color="primary" label="Cteate Product" @click="showDialog = true" />
</template>

<script>
import { api } from 'src/boot/axios';
export default {

    name: "CreateDialogComponent",
    props: {

    },
    data() {
        return {
            showDialog: false,
            productName: "",
            cost: '',
            address: "",
            product_type: '',
            options: []
        }
    },
    methods: {
        async onOKClick(evt) {
            evt.preventDefault();

            const currentDate = new Date()
            const data = {
                product_type_id: this.product_type.id,
                name_uz: this.productName,
                cost: this.cost,
                address: this.address,
                created_date: currentDate
            }
            // (this.product_type  && this.cost && this.address) ? this.showDialog = false : alert("Please enter value all inputs")
            this.showDialog = false
            this.$emit('sendDataEvent', data);


        },
        cancelFunc() {
            this.product_type = ''
            this.productName = ''
            this.cost = ''
            this.address = ''
        }
    },

    async created() {
        try {
            const resp = await api.get("product/get-product-types")
            console.log(resp.data, "rypes");
            if (resp.status == 200) {
                this.options = resp.data
            }
        } catch (error) {

        }
    },
}
</script>

<style lang="scss" scoped></style>