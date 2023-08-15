// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class User {
  static #list = []

  constructor(email, login, password) {
    this.email = email
    this.login = login
    this.password = password
    this.id = new Date().getTime()
  }

  verifyPassword = (password) => (this.password = password)

  static add = (user) => {
    this.#list.push(user)
  }

  static getList = () => {
    return this.#list
  }

  static getById = (id) => this.#list.find((user) => user.id === id)

  static deleteById = (id) => {
    const index = this.#list.findIndex((user) => user.id === id)
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }
  static updateById = (id, { email }) => {
    const user = this.getById(id)
    if (user) {
      this.update(user, data)
      return true
    } else return false
  }

  static update = (user, { email }) => {
    if (email) {
      user.email = email
    }
  }
}

class Product {
  static #list = [
    {
      id: 10000,
      name: 'Сумка',
      price: '250',
      description: 'Класна сумка з прибасбасами і цепочкою',
      createDate: 'Wed, 02 Aug 2023 15:11:38 GMT',
    },
    {
      id: 10001,
      name: 'Пальто',
      price: '50',
      description: 'Гарне тепле пальто на пуговках',
      createDate: 'Wed, 02 Aug 2023 15:12:38 GMT',
    },
    {
      id: 10002,
      name: 'Куртка',
      price: '40',
      description: 'Добра шкіряна косуха з каманами',
      createDate: 'Wed, 02 Aug 2023 15:13:38 GMT',
    },
  ]

  constructor(name, price, description) {
    this.id = Math.floor(Math.random() * 90000) + 10000
    this.name = name
    this.price = price
    this.description = description
    this.createDate = new Date().toUTCString()
  }

  static getList = () => {
    return this.#list
  }
  static add = (product) => {
    this.#list.push(product)
    return true
  }
  static getById = (id) => this.#list.find((product) => product.id === id)

  static deleteById = (id) => {
    const index = this.#list.findIndex((product) => product.id === id)
    //console.log('index: ', index)
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }
  static updateById = (id, data) => {
    const product = this.getById(Number(id))
    //console.log('updateById product', product)
    if (product) {
      this.update(product, data)
      return true
    } else {
      return false
    }
  }

  // static update = (product, data) => {
  //   for (const key in data) {
  //     if (product.hasOwnProperty(key)) {
  //       product[key] = data[key]
  //       //console.log(product[key], data[key])
  //     }
  //   }
  // }
  static update = (product, { id, name, price, description }) => {
    product.id = Number(id)
    product.name = name
    product.price = Number(price)
    product.description = description
    product.createDate = new Date().toUTCString()
  }
  // static saveToLocalStorage() {
  //   const productsString = JSON.stringify(this.#list)
  //   localStorage.setItem('products', productsString)
  // }

  // static loadFromLocalStorage() {
  //   const productsString = localStorage.getItem('products')
  //   if (productsString) {
  //     this.#list = JSON.parse(productsString)
  //   }
  // }
}

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/user-index', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = User.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('user-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'user-index',

    data: {
      users: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
// router.post Створює нам ще один ентпоїнт

router.post('/user-create', function (req, res) {
  const { email, login, password } = req.body
  const user = new User(email, login, password)
  User.add(user)
  //console.log(User.getList())

  res.render('user-success', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'user-success',
    info: 'Користувач створений',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.get('/user-delete', function (req, res) {
  const { id } = req.query
  User.deleteById(Number(id))

  res.render('user-success', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'user-success',
    info: 'Користувача видалено',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.post('/user-update', function (req, res) {
  const { email, password, id } = req.body
  let result = false
  const user = User.getById(Number(id))

  if (user.verifyPassword(password)) {
    User.update(user, { email })
    result = true
  }

  res.render('user-success', {
    style: 'user-success',
    info: result ? 'Дані оновлені' : 'Сталася помилка',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.get('/product-create', function (req, res) {
  res.render('product-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-create',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body
  const product = new Product(name, price, description)
  let result = false
  result = Product.add(product)

  //console.log(Product.add(product))
  //Product.saveToLocalStorage()

  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',
    title: result ? 'Успішне виконання дії' : 'Сталася помилка',
    info: result ? 'Створено новий товар' : 'Товар не створено',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.get('/product-list', function (req, res) {
  // res.render генерує нам HTML сторінку
  //Product.loadFromLocalStorage()
  const list = Product.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-list',

    data: {
      products: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.get('/product-edit', function (req, res) {
  const { id } = req.query

  //
  let product = Product.getById(Number(id))

  // if (!product) {
  //   // Handle the case where the product is not found by redirecting to an error page or displaying an error message.
  //   res.render('error', {
  //     style: 'error',
  //     errorMessage: 'Product not found',
  //   })
  //   return
  // }

  //Product.updateById(product, { name, price, id, description })

  res.render('product-edit', {
    id: Number(product.id),
    name: product.name,
    price: Number(product.price),
    description: product.description,
    createDate: product.createDate,
    style: 'product-edit',
    //info: 'Товар оновлено',
  })

  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.post('/product-edit', function (req, res) {
  const { id, name, price, description } = req.body
  console.debug('req.body: ', id, name, price, description)
  let result = false
  const product = Product.getById(Number(id))
  //console.debug('ROUTER, PRODUCT By ID: ', product)
  // if (id > 9999 && id < 100000) alert('ID має бути вд 10000 до 99999')
  // else if (getList.some((product) => product.id === id)) alert('Таке ID вже існує. Виберіть інше ID')
  // // && product !== this.product
  // else {

  result = Product.updateById(id, { id, name, price, description })
  //}

  res.render('alert', {
    style: 'alert',
    title: result ? 'Успішне виконання дії' : 'Сталася помилка',
    info: result ? 'Дані оновлені' : 'Товару не знайдено',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.get('/product-delete', function (req, res) {
  const { id } = req.query
  let productDeleted = false

  productDeleted = Product.deleteById(Number(id))

  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',
    title: productDeleted ? 'Успішне виконання дії' : 'Сталася помилка',
    info: productDeleted ? 'Товар видалено' : 'Товару не знайдено',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
