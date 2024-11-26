import { defineStore } from 'pinia';
import { inject, ref } from 'vue';
import { Product } from 'src/types/ProductTypes';
import { SessionStorage } from 'quasar';
// import { LocalStorage } from 'quasar';

export const useProductStore = defineStore('product', () => {
  const api = inject('api');
  const product = ref<Product[]>([]);

  async function initialize() {
    try {
    } catch (error) {}

    fetch(`${api}/products/all`, {
      headers: {
        authKey: SessionStorage.getItem('authorisation-key') ?? '',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          return (product.value = data.data);
        }
      })
      .catch((error) => console.log(error));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function add(new_products: any[]) {
    for (const new_pro of new_products) {
      product.value.unshift({
        ...new_pro,
        image: null,
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function update(new_products: any) {
    const { name, unit_price, quantity, id } = new_products;
    const prod = product.value.find((pr) => pr.id == id) ?? ({} as Product);
    prod.name = name;
    prod.unit_price = unit_price;
    prod.quantity = quantity;
    return;
  }

  function del(id: number) {
    for (let index = 0; index < product.value.length; index++) {
      if (product.value[index].id === id) {
        product.value.splice(index, 1);
      }
    }
  }

  function find(productId: number) {
    return product.value.find((pr) => pr.id === productId) ?? ({} as Product);
  }

  function updateImg(id: number, filename: string) {
    for (const pr of product.value) {
      if (pr.id == id) {
        return (pr.image = filename);
      }
    }
  }

  initialize();

  return {
    product,
    add,
    update,
    del,
    find,
    initialize,
    updateImg,
  };
});
