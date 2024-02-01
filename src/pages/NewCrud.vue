

<template>
    <q-page padding>

        <q-toolbar class="flex justify-evenly  gap-2  ">
            <q-toolbar-title>
                Products
            </q-toolbar-title>
            <q-btn label="create" color="primary" @click="toggleModal('create')" />
        </q-toolbar>

        <!-- Loading  -->
        <div class="q-pa-md q-gutter-md" v-show="!products.length">
            <q-card class="relative-position " flat bordered>
                <q-card-section class="q-pb-none">
                    <div class="text-h6" v-show="!networkErr"> Loading.. </div>
                    <h4 class="text-red-14  text-center   " v-show="networkErr">Internetga ulanmagansz🤔</h4>
                </q-card-section>

                <q-card-section>
                </q-card-section>

                <q-inner-loading v-show="!networkErr" :showing="products.length ? false : true" label="Please wait..."
                    label-class="text-teal" label-style="font-size: 1.1em" />
            </q-card>
        </div>

        <div class="flex  justify-between q-px-md">

            <q-card style="max-width: 33%; min-width: 300px;" class="shadow-10 q-my-lg " v-for=" product of someProducts "
                v-bind:key="product.id">
                <q-card-section>
                    <q-img :src="`https://picsum.photos/300/200?random=${product.id}}`" loading="lazy"
                        spinner-color="orange">

                        <q-chip color="orange" text-color="white" class="absolute absolute-bottom-right " icon-right="">
                            {{ product.cost }}$
                        </q-chip>
                    </q-img>
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <div class="text-h6  q-mb-sm   text-grey-9 ">
                        {{ product.name_uz.length > 31 ? product.name_uz.slice(0, 30)
                            + ".." : product.name_uz }}
                    </div>

                    <q-separator />

                    <div class="flex items-center  q-mt-sm" style="font-size: 2em">
                        <q-icon name="room" color="red" />
                        <p class="text-subtitle2 q-mb-none q-ml-sm">
                            {{ product.address }}
                        </p>
                    </div>

                    <div class="flex items-center" style="font-size: 2em">
                        <q-icon name="format_size" color="orange" />
                        <p class="text-subtitle2 q-mb-none q-ml-sm">
                            {{ product.productType }}
                        </p>
                    </div>
                </q-card-section>
                <q-card-actions horizontal class="justify-between">
                    <span class="">{{ (new Date(product.created_date)).toISOString().substring(0, 10) }}</span>
                    <div>
                        <q-btn title="bu title atrebutini ozi" rounded icon="delete" color="red-10" flat
                            @click="deleteModalFunc(product)" />
                        <q-btn title="bu title atrebutini ozi" rounded icon="edit" color="yellow-10" flat
                            @click="getOneProduct(product)" />
                    </div>
                </q-card-actions>

            </q-card>

        </div>


        <!-- Pagination -->
        <div class="q-gutter-md" v-show="products.length > 6">
            <q-pagination v-model="current" :max="Math.ceil(products.length / 6)" direction-links push color="primary"
                active-design="push" active-color="orange" />
        </div>


        <!-- create modal -->
        <MyDialog v-if="isActiveModal == 'create'" :title="'Create Modal'">
            <q-card-section>

                <q-form @submit="createProductFunc" class="q-gutter-md">
                    <q-input filled v-model="productNameRef" label="product name " lazy-rules
                        :rules="[(val: any) => isNaN(parseInt(val)) || 'product name must be a string!',
                        (val: any) => (val && val.length) || 'Iltimos maxsulotni nomini kiriting!',
                        (val: any) => !(val.length > 100) || 'Maxsulot nomi maxsimal 100 ta sozdan iborat bolshi mumkin!']" />

                    <q-input filled v-model="addressRef" label="product address " lazy-rules :rules="[(val: any) => (val && val.length) || 'Iltimos maxsulotni addressni kiriting!',
                    (val: any) => isNaN(parseInt(val)) || 'product name must be a string!']" />

                    <q-input filled type="number" v-model="costRef" label="Product cost" lazy-rules
                        :rules="[(val: any) => val && val.length > 0 || 'Iltimos maxsulotni narxini kiriting!']" />
                    <q-select filled v-model="product_typeRef" :options="options" label="select product type "
                        option-label="name_uz" option-value="id" stack-label />
                    <q-card-actions align="center">
                        <q-btn label="Submit" type="submit" color="primary" />
                        <q-btn color="negative" type="reset" label="Cancel" @click="cancelFunc" />
                    </q-card-actions>
                </q-form>
            </q-card-section>
        </MyDialog>
        <!-- edit modal  -->
        <MyDialog v-if="isActiveModal == 'edit'" :title="'Edit Modal'">
            <q-card-section>
                <q-form @submit="editProductFunc" class="q-gutter-md">
                    <q-input filled v-model="editProductNameRef" label="product name " lazy-rules :rules="[
                        (val: any) => isNaN(parseInt(val)) || 'product name must be a string!',
                        (val: any) => (val && val.length) || 'Iltimos maxsulotni nomini kiriting!',
                        (val: any) => !(val.length > 100) || 'Maxsulot nomi maxsimal 100 ta sozdan iborat bolshi mumkin!'
                    ]" />

                    <q-input filled v-model="editAddressRef" label="product address " lazy-rules :rules="[(val: any) => (val && val.length) || 'Iltimos maxsulotni addressni kiriting!',
                    (val: any) => isNaN(parseInt(val)) || 'product name must be a string!']" />

                    <q-input filled type="number" v-model="editCostRef" label="Product cost" lazy-rules
                        :rules="[(val: any) => val && val.length > 0 || 'Iltimos maxsulotni narxini kiriting!']" />
                    <q-select filled v-model="editProduct_typeRef" :options="options" label="select product type "
                        option-label="name_uz" option-value="id" stack-label />
                    <q-card-actions align="center">
                        <q-btn label="Submit" type="submit" color="primary" />
                        <q-btn color="negative" type="reset" label="Cancel" @click="toggleModal('edit')" />
                    </q-card-actions>
                </q-form>
            </q-card-section>
        </MyDialog>

        <!-- delete modal -->
        <MyDialog v-if="isActiveModal == 'delete'" :title="'Delete Modal'">
            <q-card-section>
                <q-toolbar class="">
                    <div class=" text-h6">
                        Siz <b>{{ productOne.name_uz.length > 40 ? productOne.name_uz.slice(0, 40)
                            + ".." : productOne.name_uz }}</b> nomli Mahsulotni ochirmoqchimisz?
                    </div>
                </q-toolbar>

                <q-form @submit="deleteProduct" class="q-gutter-md">

                    <q-card-actions align="center">
                        <q-btn label="Submit" type="submit" color="primary" />
                        <q-btn color="negative" type="reset" label="Cancel" @click="toggleModal('delete')" />
                    </q-card-actions>
                </q-form>
            </q-card-section>
        </MyDialog>

    </q-page>
</template>
  
<script lang="ts">
import { api } from 'src/boot/axios';
import MyDialog from 'src/components/MyDialog.vue';
import { useProduct } from 'src/stores/products';
import ProductType from 'src/types/Product';
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useDialogStore } from '../stores/modal'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
export default defineComponent({
    name: 'Lesson2Page',
    components: { MyDialog },
    setup() {

        onMounted(async () => {
            getProductFunc()
            const getTypes = await getProductTypes.value
            options.value = getTypes
        })
        const $q = useQuasar()

        const options = ref([])
        const products = ref<ProductType[]>([])
        const someProducts = ref<ProductType[]>([])
        const productOne = ref<ProductType>({
            id: undefined,
            product_type_id: 0,
            name_uz: '',
            cost: 0,
            address: '',
            created_date: 0,
            productType: ''
        })
        // create refs
        const costRef = ref('')
        const productNameRef = ref('')
        const product_typeRef = ref('')
        const addressRef = ref('')
        const current = ref(1)
        // edit refs
        const editCostRef = ref('')
        const editProductNameRef = ref('')
        const editProduct_typeRef = ref('')
        const editAddressRef = ref('')

        const networkErr = ref(false)
        // product state
        const productStore = useProduct()
        const { getProductTypes } = storeToRefs(productStore)
        const isActiveModal = ref('create')
        const myDialog = useDialogStore()

        watch(current, (newCurrent) => {
            someProducts.value = products.value.slice((newCurrent * 6 - 6), 6 * newCurrent)
        })

        //toggle  Modal function
        const toggleModal = (modalName: string) => {
            isActiveModal.value = modalName
            myDialog.$state.isOpen ? myDialog.$state.isOpen = false : myDialog.$state.isOpen = true
        }

        // getter Functions
        const getProductFunc = async () => {
            const respProducts = await api.get('product').catch(test => {
                if (test.code == 'ERR_NETWORK') {
                    networkErr.value = true
                }
            })
            const resp = (await api.get('product/get-product-types')).data

            const newArr = respProducts?.data?.reduce((accumulator: ProductType[], product: ProductType) => {
                const productType = resp.find((productType: any) => productType.id === product.product_type_id);
                if (productType) {
                    accumulator.push({ ...product, productType: productType.name_uz });
                }
                return accumulator;
            }, []);

            products.value = newArr.length ? newArr : respProducts?.data
            someProducts.value = products.value.slice((current.value * 6 - 6), 6 * current.value)

        }
        const getOneProduct = async (product: ProductType) => {
            editCostRef.value = product.cost;
            editProductNameRef.value = product.name_uz;
            editProduct_typeRef.value = product.productType;
            editAddressRef.value = product.address;
            toggleModal('edit')
            productOne.value = product


        }
        //  notification function
        const notifyFunc = (color: string, message: string, icon: string) => {
            $q.notify({
                message: message,
                color: color,
                position: 'top-right',
                icon: icon,
                timeout: 1000
            })
        }

        // create Functions
        const createProductFunc = async () => {
            const currentDate = new Date()
            const data = {
                product_type_id: +product_typeRef?.value?.id,
                name_uz: productNameRef.value,
                cost: +costRef.value,
                address: addressRef.value,
                created_date: currentDate,
            }

            const resp = await api.post('/product', data)
            if (resp.status == 200) {
                toggleModal('create')
                getProductFunc()
                notifyFunc('positive', 'Succesfully created', 'check')

            }
        }
        // edit Functions
        const editProductFunc = async () => {
            const data = {
                id: productOne.value.id,
                product_type_id: +editProduct_typeRef?.value?.id || productOne.value.product_type_id,
                name_uz: editProductNameRef.value || productOne.value.name_uz,
                cost: +editCostRef.value || productOne.value.cost,
                address: editAddressRef.value || productOne.value.address,
                created_date: productOne.value.created_date,
            }
            const resp = await api.put('/product', data)
            console.log(resp, 'created_dateа')
            if (resp.status == 200) {
                toggleModal('edit')
                getProductFunc()
                notifyFunc('positive', 'Succesfully edited', 'check')

            }
        }
        const cancelFunc = () => {
            myDialog.$state.isOpen = false
            costRef.value = ''; productNameRef.value = ''; product_typeRef.value = ''; addressRef.value = '';
        }

        // delete Functions
        const deleteModalFunc = (product: ProductType) => {
            toggleModal('delete')
            productOne.value = product
        }
        const deleteProduct = async () => {
            const resp = await api.delete(`/product/${productOne.value?.id}`)
            console.log(resp.data, "delete");
            if (resp.status == 200) {
                getProductFunc()
                toggleModal('delete');
                notifyFunc('negative', 'Succesfully deleted', 'delete')
            }

        }





        return {
            isActiveModal,
            toggleModal,
            options,
            productOne, someProducts,
            products, current,
            costRef, productNameRef, product_typeRef, addressRef, networkErr,
            editCostRef, editProductNameRef, editProduct_typeRef, editAddressRef,
            createProductFunc, cancelFunc, editProductFunc, getOneProduct, deleteModalFunc, deleteProduct,

        };
    }
});
</script>
  