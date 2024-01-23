<template>
  <div>
    <h2>Products</h2>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - <button @click="editProduct(product)">Edit</button> - <button
          @click="deleteProduct(product.id)">Delete</button>
      </li>
    </ul>

    <h2>Create / Update Product</h2>
    <form @submit.prevent="saveProduct">
      <label>
        Name:
        <input v-model="productName" required>
      </label>
      <button type="submit">{{ editingProduct ? 'Update' : 'Create' }} Product</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useProductsStore } from '../stores/products';

const productsStore = useProductsStore();
const productName = ref<string>('');
const editingProduct = ref<Product | null>(null);





const products = productsStore.getProducts;

const saveProduct = () => {
  if (editingProduct.value) {
    // Update existing product
    productsStore.updateProduct({ ...editingProduct.value, name: productName.value });
    editingProduct.value = null;
  } else {
    // Create new product
    const newProduct = { id: Date.now(), name: productName.value };
    productsStore.addProduct(newProduct);
  }

  // Clear input field
  productName.value = '';
};

const editProduct = (product: Product) => {
  editingProduct.value = product;
  productName.value = product.name;
};

const deleteProduct = (productId: number) => {
  productsStore.deleteProduct(productId);
};

interface Product {
  id: number;
  name: string;
}
</script>
