<template>
    <q-page padding>
  
  
  
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" flat bordered>
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
  
          <q-card-section>
            <div class="text-overline text-orange-9">Overline</div>
            <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
            <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </div>
          </q-card-section>
  
          <q-card-actions>
            <q-btn flat color="primary" label="Share" />
            <q-btn flat color="secondary" label="Book" />
  
            <q-space />
  
            <q-btn color="grey" round flat dense :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded" />
          </q-card-actions>
  
          <q-slide-transition>
            <div v-show="expanded">
              <q-separator />
              <q-card-section class="text-subtitle2">
                {{ lorem }}
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>
      </div>
  
  
  
    </q-page>
  </template>
  
  <script lang="ts">
  import { Product, Meta } from 'components/models';
  import ExampleComponent from 'components/ExampleComponent.vue';
  import { defineComponent, ref, onMounted } from 'vue';
  import { api } from 'src/boot/axios';
  import { error } from 'console';
  
  export default defineComponent({
    name: 'IndexPage',
    components: {},
  
    setup() {
      const posts = ref<Product[]>([]);
      const meta = ref<Meta>({
        totalCount: 1200
      });
  
      onMounted(() => {
        getDataFunc()
  
  
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
            id: posts.value[posts.value.length - 1].id + 1,
            title: 'string',
            author: 'string',
            content: 'string'
          }
  
          const resp = await api.get('/posts')
          console.log(resp.data, 'resp');
          if (resp.status == 200) {
            posts.value = resp.data
          }
        } catch (error) {
          console.log(error, 'error');
        }
      }
      return {
        posts, meta, expanded: ref(false),
        lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
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