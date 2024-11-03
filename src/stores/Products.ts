import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Product } from 'src/types/ProductTypes';
// import { LocalStorage } from 'quasar';

export const useProductStore = defineStore('product', () => {
  const product = ref<Product[]>([
    {
      id: 1,
      name: 'Premium Headphones',
      quantity: 50,
      unit_price: 99.99,
      image: 'headphone.jpg',
    },
    {
      id: 2,
      name: 'Smartwatch Pro',
      quantity: 30,
      unit_price: 149.99,
      image: 'smartwatch.jpg',
    },
    {
      id: 3,
      name: 'Gaming Laptop',
      quantity: 10,
      unit_price: 1299.99,
      image: 'laptop.jpg',
    },
    {
      id: 4,
      name: 'Wireless Earbuds',
      quantity: 100,
      unit_price: 49.99,
      image: 'earbuds.jpg',
    },
    {
      id: 5,
      name: 'Fitness Tracker',
      quantity: 25,
      unit_price: 79.99,
      image: 'fitness-tracker.jpg',
    },
    {
      id: 6,
      name: '4K Smart TV',
      quantity: 15,
      unit_price: 799.99,
      image: 'smarttv.jpg',
    },
    {
      id: 7,
      name: 'Gaming Console',
      quantity: 20,
      unit_price: 299.99,
      image: 'console.jpg',
    },
    {
      id: 8,
      name: 'Smartphone 13 Pro Max',
      quantity: 5,
      unit_price: 999.99,
      image: '13pro.jpg',
    },
    {
      id: 9,
      name: 'Tablet Pro',
      quantity: 30,
      unit_price: 399.99,
      image: 'tablet.jpg',
    },
    {
      id: 10,
      name: 'Digital Camera',
      quantity: 10,
      unit_price: 499.99,
      image: 'camera.jpg',
    },
  ]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function add(new_products: any[]) {
    for (const new_pro of new_products) {
      const { name, unit_price, quantity } = new_pro;
      product.value.unshift({
        name,
        unit_price,
        quantity,
        id: product.value.length + 1,
        image: 'placeholder.png',
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
        product.value.splice(index, 1)
      }
    }

  }

  function find(productId: number) {
    return product.value.find((pr) => pr.id === productId) ?? ({} as Product);
  }

  return {
    product,
    add,
    update,
    del,
    find,
  };
});
