import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
interface ProductType {
  id: number;
  title: string;
  // Boshqa xususiyatlarni qo'shing
}
export const useProductsStore = defineStore('counter', {
  state: (): { products: ProductType[] } => ({
    products: [],
  }),
  getters: {
    getProducts(): ProductType[] {
      return this.products;
    },
  },

  actions: {
    async fetchProducts(): Promise<void> {
      try {
        const response = await api.get('products');
      console.log(response);
      
        // this.setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },


    async createProduct(productData: { title: string }): Promise<void> {
      try {
        const response = await api.post('products')
        console.log(response);

        // const createdProduct: ProductType = await response.json();
        // this.addProduct(createdProduct);
      } catch (error) {
        console.error('Error creating product:', error);
      }
    },

    mutations: {


      setProducts(products: ProductType[]): void {
        this.products = [];
      },

      addProduct(product: ProductType): void {
        // this.products = [...this.products, product];

        this.products = [...this.products];

      },
    }

  }
});






// export const useProductsStore = defineStore('products', {
//   state: ()=> ({
//     products: [],
//   }),
//   actions: {
//     async fetchProducts(): Promise<void> {
//       try {
//         const response = await fetch('');
//         const data: Product[] = await response.json();
//         this.setProducts(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     },
//     async createProduct(productData: { title: string }): Promise<void> {
//       try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(productData),
//         });
//         const createdProduct: Product = await response.json();
//         this.addProduct(createdProduct);
//       } catch (error) {
//         console.error('Error creating product:', error);
//       }
//     },
//   },
//   getters: {
//     getProducts(): Product[] {
//       return this.products;
//     },
//   },
//   mutations: {
//     setProducts(products: Product[]): void {
//       this.products = products;
//     },
//     addProduct(product: Product): void {
//       this.products = [...this.products, product];
//     },
//   },
// });

