// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []
  static #count = 0

  constructor(img, title, description, category, price) {
    this.id = ++Product.#count //Product.#list.length + 1
    this.img = img
    this.title = title
    this.description = description
    this.category = category
    this.price = price
  }

  static add = (img, title, description, category, price) => {
    const newProdut = new Product(img, title, description, category, price)
    this.#list.push(newProdut) // ?? this ??
  }
  static getList = () => {
    return this.#list
  }

  static getById = (id) => {
    return this.#list.find((product) => product.id === id)
  }

  static getRandomList = (id) => {
    // фільтруємо щоб вилучити той з яким порівнюємо
    const filterdList = this.#list.filter((product) => product.id !== id)
    // sort and mix
    const shuffledList = filterdList.sort(() => Math.random() - 0.5)
    // return first 3 elements
    return shuffledList.slice(0, 3)
  }
}

Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютер Artline Gaming (X43V31) AMD Ryzen 5 3600`,
  `AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 Гб / HDD 1 TБ + SSD 480 ГБ`,
  [
    { id: 1, text: 'Готовий  до відправки' },
    { id: 2, text: 'Топ продаж' },
  ],
  27000,
)

Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютер ProLine Business (B112p19) Intel Core i5 9400F`,
  `Intel Core i5 9400F (2.9 - 4.1 ГГц) / RAM 8 Гб / HDD 1 TБ / Intel UHD Graphics 630`,
  [{ id: 2, text: 'Топ продаж' }],
  20000,
)

Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютер Proline Workstation (W67p03) Intel Xeon E-2226G`,
  `Intel Xeon E-2226G (3.4 - 4.7 ГГц) / RAM 16 Гб / SSD 512 ГБ / nVidia Quadro P620`,
  [{ id: 1, text: 'Готовий  до відправки' }],
  40000,
)
// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-index',

    data: {
      list: Product.getList(),
      // img: 'https://picsum.photos/200/300',
      // title: `Комп'ютер Artline Gaming (X43V31) AMD Ryzen 5 3600`,
      // description: 'AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 Гб / HDD 1 TБ + SSD 480 ГБ',
      // category: [
      //   { id: 1, text: 'Готовий до відправки' },
      //   { id: 2, text: 'Топ продаж' },
      // ],
      // price: '27000',
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',

    data: {
      message: 'Операція успішна',
      info: 'Товар створений',
      link: '/test-path',
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
// router.post Створює нам ще один ентпоїнт

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
