import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Product } from 'src/components/models';
import ProductType from 'src/types/Product';



export const useProduct = defineStore('todos', {
  state: () => ({
    isLoading: true,
    modal: 'open',
    products: [] as ProductType[],
    productTypes: [] ,
    filter: 'all' as 'all' | 'finished' | 'unfinished',
  }),
  getters: {
    // finishedTodos(state): Todo[] {
    //   return state.todos.filter((todo) => todo.isFinished);
    // },

    async getterFunc(state) {
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


      return state.products = newArr
    },
  async  getProductTypes(state){
    try {
      const resp = await api.get("product/get-product-types")
      console.log(resp.data, "rypes");
      if (resp.status == 200) {
        return  state.productTypes = resp.data
      }
  } catch (error) {

  }
    }
  },
  actions: {

    async addProduct(product: any): Promise<any> {

      try {
        const resp = await api.post('product', product)
        console.log(resp, 'kreate resp');

        if (resp.status == 200) {
          this.isLoading = false
          // return resp.data
        }
      } catch (error) {
        console.log(error, 'error');
      }

      // this.products.push(product)
    },

    async editProduct(product: ProductType): Promise<any> {
      this.isLoading = true
      try {
        const resp = await api.put(`product`, product)
        console.log(resp, 'edit resppppppppppppppppppppppppp');

        if (resp.status == 200) {
          this.isLoading = false

          return resp.data
        }
      } catch (error) {
        console.log(error, 'error');
      }

      // this.products.push(product)
    },

    async getProduct(): Promise<any> {

      try {
        const resp = await api.get('product')
        console.log(resp.data);


        if (resp.status == 200) {
          this.products = resp.data
          return resp.data
        }
      } catch (error) {
        console.log(error, 'error');
      }
    }

  },
});




















